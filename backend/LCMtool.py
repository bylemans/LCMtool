from flask import Flask, request, jsonify
from flask_cors import CORS
from netmiko import ConnectHandler
import datetime
import logging
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
import json
 
app = Flask(__name__)
CORS(app)  # Enable CORS for web requests
 
# Configure logging
logging.basicConfig(
    filename='api_logging.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
 
# Show commands to run (CDP only)
SHOW_COMMANDS = [
    'show version',
    'show interfaces status',
    'show inventory',
    'show cdp neighbors',
    'show cdp neighbors detail'
]
 
# -----------------------------
# Parsing utilities
# -----------------------------
 
def parse_show_version(output: str):
    """Parse show version output (Cisco IOS/IOS-XE mostly)."""
    if not output:
        return {
            'model': 'Unknown',
            'serial': 'Unknown',
            'version': 'Unknown',
            'uptime': 'Unknown',
            'hostname': 'Unknown'
        }
 
    model_match = (
        re.search(r"Model number\s*:\s*(\S+)", output)
        or re.search(r"[Cc]isco\s+(\S+)\s+\(", output)
    )
    serial_match = (
        re.search(r"System serial number\s*:\s*(\S+)", output)
        or re.search(r"Processor board ID\s+(\S+)", output)
    )
    version_match = re.search(r"Version\s+([^,\n]+)", output)
    uptime_match = re.search(r"uptime is\s+(.+?)\n", output)
    hostname_match = re.search(r"^(\S+)\s+uptime is", output, flags=re.MULTILINE)
 
    return {
        'model': model_match.group(1) if model_match else 'Unknown',
        'serial': serial_match.group(1) if serial_match else 'Unknown',
        'version': version_match.group(1).strip() if version_match else 'Unknown',
        'uptime': uptime_match.group(1).strip() if uptime_match else 'Unknown',
        'hostname': hostname_match.group(1) if hostname_match else 'Unknown'
    }
 
 
def parse_interfaces_status(output: str):
    """Parse 'show interfaces status' to estimate total/active/free ports."""
    if not output:
        return {'total': 0, 'used': 0, 'free': 0}
 
    lines = output.split('\n')
 
    port_patterns = [
        r'^(Gi|Fa|Te|Eth|Et)\d+/\d+(?:/\d+)?',
        r'^(GigabitEthernet|FastEthernet|TenGigabitEthernet|Ethernet)\d+/\d+(?:/\d+)?',
        r'^Port\s+\d+'
    ]
 
    total_ports = 0
    active_ports = 0
 
    for line in lines:
        s = line.strip()
        is_port = any(re.match(p, s) for p in port_patterns)
        if is_port:
            total_ports += 1
            if any(status in s.lower() for status in ['connected', 'up', 'active']):
                active_ports += 1
 
    if total_ports == 0:
        in_table = False
        for line in lines:
            if 'Port' in line and ('Name' in line or 'Status' in line or 'Vlan' in line):
                in_table = True
                continue
            if in_table and line.strip() and not line.startswith('-'):
                parts = line.split()
                if len(parts) >= 2:
                    total_ports += 1
                    if any(status in line.lower() for status in ['connected', 'up', 'active']):
                        active_ports += 1
 
    if total_ports == 0:
        total_ports = 12
 
    return {'total': total_ports, 'used': active_ports, 'free': total_ports - active_ports}
 
 
def parse_inventory(output: str):
    """Parse inventory for transceivers; returns list of {'port': ..., 'model': ...}."""
    transceivers = []
    if not output:
        return transceivers
 
    lines = output.split('\n')
 
    current_port = None
    for line in lines:
        port_match = re.search(r'^((Gi\S+|Te\S+|Eth\S+|[A-Z][a-z]+\d+/\d+(?:/\d+)?))', line)
        if port_match:
            current_port = port_match.group(1)
            continue
 
        if current_port and re.search(r'(SFP|GBIC|X2|QSFP|CFP)', line, re.IGNORECASE):
            model_match = re.search(r'([A-Z0-9]+-[A-Z0-9-]+[A-Z0-9])', line)
            if model_match:
                model = model_match.group(1)
                if not any(t['port'] == current_port for t in transceivers):
                    transceivers.append({'port': current_port, 'model': model})
 
    if not transceivers:
        for i, line in enumerate(lines):
            if re.search(r'(Gi\S+|Te\S+|Eth\S+)', line) and i + 1 < len(lines):
                port = re.search(r'(Gi\S+|Te\S+|Eth\S+)', line).group(1)
                context = ' '.join(lines[i:i+3])
                model_match = re.search(r'([A-Z0-9]+-[A-Z0-9-]+[A-Z0-9]|SFP-[A-Z0-9-]+)', context)
                if model_match:
                    transceivers.append({'port': port, 'model': model_match.group(1)})
 
    return transceivers
 
# -----------------------------
# CDP neighbor parsing
# -----------------------------
 
def canonical_ifname(name: str) -> str:
    """Normalize long interface names to short tokens for consistent matching."""
    if not name:
        return name
    name = name.replace('GigabitEthernet', 'Gig')
    name = name.replace('FastEthernet', 'Fa')
    name = name.replace('TenGigabitEthernet', 'Te')
    name = name.replace('Ethernet', 'Eth')
    name = name.replace(' ', '')
    return name
 
 
def parse_cdp_neighbors(output_summary: str = '', output_detail: str = ''):
    """
    Parse CDP neighbors from summary ('show cdp neighbors') and detail
    ('show cdp neighbors detail'). Returns a dict keyed by local interface.
    Handles wrapped two-line summary rows seen on IOS-XE (e.g., 9200L).
    """
    neighbors = {}
    summary = output_summary or ''
    detail = output_detail or ''
    combined_lower = (summary + '\n' + detail).lower()
 
    no_msgs = [
        'no cdp neighbors', 'cdp is not enabled', 'cdp not enabled',
        'total cdp entries displayed : 0', 'total cdp entries displayed: 0', '% cdp'
    ]
    if any(m in combined_lower for m in no_msgs):
        return neighbors
 
    if detail.strip():
        blocks = re.split(r'\n-{10,}\n|\n\n+', detail)
        for blk in blocks:
            dev = re.search(r'Device ID:\s*(.+)', blk)
            intf = re.search(r'Interface:\s*([A-Za-z]+[\w/.-]+)', blk)
            rport = re.search(r'Port ID.*:\s*([A-Za-z]+[\w/./-]+)', blk)
            if intf:
                local = canonical_ifname(intf.group(1))
                neighbors[local] = {
                    'neighbor': dev.group(1).strip() if dev else 'Unknown',
                    'port': canonical_ifname(rport.group(1).strip()) if rport else 'Unknown'
                }
 
    if not neighbors and summary.strip():
        lines = summary.splitlines()
        header_idx = -1
        for i, line in enumerate(lines):
            if 'Device ID' in line and ('Local Intrfce' in line or 'Local' in line):
                header_idx = i
                break
        if header_idx != -1:
            i = header_idx + 1
            while i < len(lines):
                dev_line = lines[i].strip()
                if not dev_line or dev_line.startswith('-') or dev_line.lower().startswith('total cdp entries'):
                    i += 1
                    continue
                next_line = lines[i + 1].strip() if (i + 1) < len(lines) else ''
                if next_line and re.search(r'^(Gi|Gig|Fa|Fas|Te|Ten|Eth|Et)\b', next_line, flags=re.IGNORECASE):
                    parts = next_line.split()
                    local_intf = None
                    for j, tok in enumerate(parts):
                        if re.match(r'^(Gi|Gig|Fa|Fas|Te|Ten|Eth|Et)\b', tok, flags=re.IGNORECASE):
                            if j + 1 < len(parts) and re.match(r'^\d+/\d+(?:/\d+)?$', parts[j + 1]):
                                local_intf = canonical_ifname(tok + parts[j + 1])
                            else:
                                local_intf = canonical_ifname(tok)
                            break
                    remote_port = 'Unknown'
                    if len(parts) >= 2:
                        for k in range(len(parts) - 2, -1, -1):
                            if re.match(r'^(Gi|Gig|Fa|Fas|Te|Ten|Eth|Et)\b', parts[k], flags=re.IGNORECASE):
                                if k + 1 < len(parts) and re.match(r'^\d+/\d+(?:/\d+)?$', parts[k + 1]):
                                    remote_port = canonical_ifname(parts[k] + parts[k + 1])
                                    break
                                else:
                                    remote_port = canonical_ifname(parts[k])
                                    break
                        if remote_port == 'Unknown':
                            remote_port = canonical_ifname(parts[-1])
                    if local_intf:
                        neighbors[local_intf] = {
                            'neighbor': dev_line,
                            'port': remote_port
                        }
                    i += 2
                    continue
                parts = (lines[i]).split()
                if len(parts) >= 2:
                    device_id = parts[0]
                    local_intf = None
                    for j in range(1, len(parts)):
                        tok = parts[j]
                        if re.match(r'^(Gi|Gig|Fa|Fas|Te|Ten|Eth|Et)\S*$', tok, flags=re.IGNORECASE):
                            if j + 1 < len(parts) and re.match(r'^\d+/\d+(?:/\d+)?$', parts[j + 1]):
                                local_intf = canonical_ifname(tok + parts[j + 1])
                            else:
                                local_intf = canonical_ifname(tok)
                            break
                    remote_port = canonical_ifname(parts[-1]) if len(parts) >= 2 else 'Unknown'
                    if local_intf:
                        neighbors[local_intf] = {'neighbor': device_id, 'port': remote_port}
                i += 1
 
    return neighbors
 
# -----------------------------
# Connection & API
# -----------------------------
 
def connect_to_device(ipaddr, username, password, enable_secret=None):
    """Connect to a single device and gather information"""
    device = {
        'device_type': 'cisco_ios',
        'host': ipaddr,
        'username': username,
        'password': password,
        'secret': enable_secret,
    }
    logging.info(f"Connecting to {ipaddr}")
    try:
        net_connect = ConnectHandler(**device)
        if enable_secret:
            net_connect.enable()
 
        outputs = {}
        for command in SHOW_COMMANDS:
            logging.info(f"Running command on {ipaddr}: {command}")
            outputs[command] = net_connect.send_command(command, delay_factor=2)
 
        net_connect.disconnect()
 
        for k, v in outputs.items():
            logging.info(f"[{ipaddr}] RAW OUTPUT for '{k}':\n{v}\n--- END ---")
 
        version_info = parse_show_version(outputs.get('show version', ''))
        ports_info = parse_interfaces_status(outputs.get('show interfaces status', ''))
        transceivers_raw = parse_inventory(outputs.get('show inventory', ''))
 
        cdp_neighbors = parse_cdp_neighbors(
            output_summary=outputs.get('show cdp neighbors', ''),
            output_detail=outputs.get('show cdp neighbors detail', '')
        )
 
        # Log parsed neighbors summary
        logging.info(f"[{ipaddr}] Parsed CDP neighbors count: {len(cdp_neighbors)}")
        logging.info(f"[{ipaddr}] CDP neighbors map (first 1000 chars): {json.dumps(cdp_neighbors, indent=2)[:1000]}")
 
        def lookup_neighbor(port_name: str):
            key = canonical_ifname(port_name)
            return (
                cdp_neighbors.get(key)
                or {'neighbor': 'Unknown', 'port': 'Unknown'}
            )
 
        transceivers = []
        for trans in transceivers_raw:
            port = trans['port']
            transceivers.append({
                'port': port,
                'model': trans['model'],
                'cdp': lookup_neighbor(port)
            })
 
        # Build a neighbors list for UI that doesn't depend on transceivers
        neighbor_list = [
            {'local': local, 'neighbor': info.get('neighbor', 'Unknown'), 'port': info.get('port', 'Unknown')}
            for local, info in cdp_neighbors.items()
        ]
 
        result = {
            'ip': ipaddr,
            'status': 'success',
            'hostname': version_info['hostname'],
            'model': version_info['model'],
            'serial': version_info['serial'],
            'version': version_info['version'],
            'uptime': version_info['uptime'],
            'ports': ports_info,
            'transceivers': {
                'installed': transceivers,
                'free': max(0, ports_info['total'] - len(transceivers))
            },
            'neighbors': {
                'cdp': cdp_neighbors,
                'count': len(cdp_neighbors),
                'list': neighbor_list
            },
            'raw_output': {
                **outputs,
                'cdp_sample': (
                    outputs.get('show cdp neighbors', '')[:1000]
                    or outputs.get('show cdp neighbor', '')[:1000]
                    or outputs.get('show cdp neighbors detail', '')[:1000]
                )
            }
        }
        logging.info(f"Successfully gathered data from {ipaddr}")
        return result
 
    except Exception as e:
        error_msg = str(e)
        logging.error(f"Failed to connect to {ipaddr}: {error_msg}")
        return {
            'ip': ipaddr,
            'status': 'failed',
            'error': error_msg
        }
 
@app.route('/api/connect', methods=['POST'])
def connect_devices():
    """API endpoint to connect to devices"""
    data = request.json
    ip_addresses = data.get('ip_addresses', [])
    username = data.get('username', '')
    password = data.get('password', '')
    enable_secret = data.get('enable_secret', None)
 
    if not ip_addresses or not username or not password:
        return jsonify({'error': 'Missing required parameters'}), 400
 
    results = []
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {
            executor.submit(connect_to_device, ip, username, password, enable_secret): ip
            for ip in ip_addresses
        }
        for future in as_completed(futures):
            result = future.result()
            results.append(result)
 
    return jsonify({
        'results': results,
        'timestamp': datetime.datetime.now().isoformat()
    })
 
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy'})
 
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)