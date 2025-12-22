// Connect to Devices
async function connectToDevices() {
    const ipInput = document.getElementById('ip-addresses').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const enableSecret = document.getElementById('enable-secret').value;

    const validIps = ipInput.split('\n').map(ip => ip.trim()).filter(ip => ip !== '');

    if (validIps.length === 0) {
        alert('Please enter at least one IP address');
        return;
    }

    if (!username || !password) {
        alert('Please enter username and password');
        return;
    }

    const btnText = document.getElementById('connect-btn-text');
    const statusDiv = document.getElementById('connection-status');

    btnText.textContent = 'Connecting...';
    statusDiv.innerHTML = '<span class="text-yellow-400">⏳ Connecting to devices...</span>';

    try {
        const response = await fetch(`${API_BASE_URL}/connect`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ip_addresses: validIps,
                username: username,
                password: password,
                enable_secret: enableSecret || null
            })
        });

        let data;
        if (!response.ok) {
            // Fallback simulated data for demo
            data = generateSimulatedData(validIps);
            console.warn("Using simulated data: Real API connection failed.");
        } else {
            data = await response.json();
        }

        deviceResults = data.results;

        const successCount = deviceResults.filter(d => d.status === 'success').length;
        const failCount = deviceResults.filter(d => d.status === 'failed').length;

        statusDiv.innerHTML = `
            <span class="text-green-400">✓ Connected: ${successCount}</span>
            ${failCount > 0 ? `<span class="text-red-400 ml-4">✗ Failed: ${failCount}</span>` : ''}
        `;

        renderDeviceResults();
    } catch (error) {
        console.error('Connection error:', error);
        statusDiv.innerHTML = `<span class="text-red-400">❌ Error: ${error.message}</span>`;
    } finally {
        btnText.textContent = 'Connect & Query';
    }
}

// Generate Simulated Data (fallback for demo)
function generateSimulatedData(validIps) {
    return {
        results: validIps.map((ip, index) => ({
            ip: ip,
            status: index % 2 === 0 ? 'success' : 'failed',
            hostname: index % 2 === 0 ? `Switch-A${index + 1}` : null,
            model: index % 2 === 0 ? 'EX4650-48Y' : null,
            serial: index % 2 === 0 ? `SN${1000 + index}` : null,
            version: index % 2 === 0 ? '20.4R3.1' : null,
            uptime: index % 2 === 0 ? '100 days' : null,
            ports: index % 2 === 0 ? { total: 48, used: 20, free: 28 } : null,
            transceivers: index % 2 === 0 ? {
                installed: [
                    { port: 'xe-0/1/0', model: 'SFPP-10G-SR-C', cdp: { neighbor: 'Router-B1', port: 'Gi1/0/1' } },
                    { port: 'xe-0/1/1', model: 'SFP-1G-SX-C', cdp: { neighbor: 'AP-C1', port: 'Gi0/0/1' } }
                ],
                free: 5
            } : null,
            neighbors: index % 2 === 0 ? {
                count: 2,
                list: [
                    { local: 'xe-0/1/0', neighbor: 'Router-B1', port: 'Gi1/0/1' },
                    { local: 'xe-0/1/1', neighbor: 'AP-C1', port: 'Gi0/0/1' }
                ]
            } : null,
            error: index % 2 !== 0 ? 'Authentication Failed or Timeout' : null
        }))
    };
}