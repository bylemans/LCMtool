// Tab Management
function setActiveTab(tabId) {
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.add('hidden');
    });
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const tabPane = document.getElementById(tabId);
    const tabButton = document.getElementById(`tab-${tabId}`);
    
    if (tabPane) tabPane.classList.remove('hidden');
    if (tabButton) tabButton.classList.add('active');

    // Load tab content if not already loaded
    if (tabPane && !tabPane.dataset.loaded) {
        loadTabContent(tabId);
        tabPane.dataset.loaded = 'true';
    }

    if (tabId === 'bom-lease') {
        renderBasket();
    }
}

// Load tab content dynamically
function loadTabContent(tabId) {
    const tabPane = document.getElementById(tabId);
    if (!tabPane) return;

    switch(tabId) {
        case 'site-details':
            tabPane.innerHTML = getSiteDetailsHTML();
            break;
        case 'checklist':
            tabPane.innerHTML = getChecklistHTML();
            break;
        case 'switches':
            tabPane.innerHTML = getSwitchesHTML();
            break;
        case 'mdf':
            tabPane.innerHTML = getMDFHTML();
            break;
        case 'wifi':
            tabPane.innerHTML = getWiFiHTML();
            break;
        case 'cabling-sfp':
            tabPane.innerHTML = getCablingHTML();
            break;
        case 'rack-power':
            tabPane.innerHTML = getRackPowerHTML();
            break;
        case 'bom-lease':
            tabPane.innerHTML = getBOMLeaseHTML();
            break;
        case 'bom-purchase':
            tabPane.innerHTML = getBOMPurchaseHTML();
            break;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setActiveTab('site-details');
    initializeSectionStatuses();
});

// Toggle command output visibility
function toggleCommandOutput(ip) {
    const safeIp = ip.replace(/\./g, '-');
    const outputDiv = document.getElementById(`output-${safeIp}`);
    const toggleBtn = document.getElementById(`toggle-btn-${safeIp}`);
    
    if (!outputDiv || !toggleBtn) return;
    
    if (outputDiv.classList.contains('hidden')) {
        outputDiv.classList.remove('hidden');
        toggleBtn.textContent = '▼ Hide Commands';
    } else {
        outputDiv.classList.add('hidden');
        toggleBtn.textContent = '▶ Show Commands';
    }
}

// Render device results
function renderDeviceResults() {
    const container = document.getElementById('device-results');
    if (!container) return;

    if (deviceResults.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = deviceResults.map((device, index) => {
        if (device.status === 'failed') {
            return getFailedDeviceHTML(device);
        }
        return getSuccessDeviceHTML(device, index);
    }).join('');
}

// Get failed device HTML
function getFailedDeviceHTML(device) {
    return `
        <div class="bg-red-900/20 border border-red-500 rounded-xl p-6 mb-6 device-card">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-2xl font-bold text-white">${device.ip}</h3>
                    <p class="text-red-300">Connection Failed</p>
                </div>
                <span class="bg-red-600 text-white px-4 py-1 rounded-full text-sm">Failed</span>
            </div>
            <div class="text-red-200">
                <strong>Error:</strong> ${device.error}
            </div>
        </div>
    `;
}

// Get successful device HTML
function getSuccessDeviceHTML(device, index) {
    const safeIp = device.ip.replace(/\./g, '-');
    const hasTransceivers = device.transceivers && device.transceivers.installed.length > 0;
    const hasNeighbors = !!device.neighbors && (device.neighbors.count > 0 || (device.neighbors.list?.length ?? 0) > 0);

    return `
        <div class="bg-white/5 rounded-xl p-6 mb-6 device-card">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-2xl font-bold text-white">${device.hostname}</h3>
                    <p class="text-blue-300">${device.ip}</p>
                </div>
                <div class="flex items-center gap-2">
                    <button
                        id="toggle-btn-${safeIp}"
                        onclick="toggleCommandOutput('${device.ip}')"
                        class="bg-slate-600 hover:bg-slate-700 text-white px-4 py-1 rounded text-sm transition-all"
                    >
                        ▼ Hide Commands
                    </button>
                    <span class="bg-green-600 text-white px-4 py-1 rounded-full text-sm">Connected</span>
                </div>
            </div>

            <div id="output-${safeIp}" class="bg-black/30 rounded-lg p-4 mb-4 font-mono text-sm">
                ${getCommandOutputHTML(device, hasTransceivers, hasNeighbors)}
            </div>

            <div class="grid md:grid-cols-2 gap-4">
                ${getSwitchSelectionHTML(device, index)}
                ${getTransceiverSelectionHTML(device, index)}
            </div>
        </div>
    `;
}

// Get command output HTML
function getCommandOutputHTML(device, hasTransceivers, hasNeighbors) {
    return `
        <div class="text-green-400 mb-2">show version</div>
        <div class="text-gray-300 ml-4">
            Model: ${device.model}<br/>
            Serial Number: ${device.serial}<br/>
            Version: ${device.version}<br/>
            Uptime: ${device.uptime}
        </div>
        <div class="text-green-400 mt-3 mb-2">show interfaces status</div>
        <div class="text-gray-300 ml-4">
            Total Ports: ${device.ports.total}<br/>
            Active Ports: ${device.ports.used}<br/>
            Available Ports: ${device.ports.free}
        </div>
        <div class="text-green-400 mt-3 mb-2">show inventory (transceivers)</div>
        <div class="text-gray-300 ml-4">
            ${hasTransceivers ? device.transceivers.installed.map(trans => `
                <div class="mb-2 pb-2 border-b border-gray-700 last:border-b-0">
                    Port: ${trans.port}<br/>
                    Model: ${trans.model}
                </div>
            `).join('') : '<div class="text-gray-500">No transceivers detected</div>'}
        </div>
        <div class="text-green-400 mt-3 mb-2">show cdp neighbor</div>
        <div class="text-gray-300 ml-4">
            ${hasNeighbors
                ? (device.neighbors?.list ?? []).map(n => `
                    <div class="mb-2 pb-2 border-b border-gray-700 last:border-b-0">
                    Local Port: ${n.local}<br/>
                    Neighbor Device: ${n.neighbor}<br/>
                    Neighbor Port: ${n.port}
                    </div>
                `).join('')
            : '<div class="text-gray-500">No CDP neighbors detected</div>'}
        </div>
    `;
}

// Get switch selection HTML
function getSwitchSelectionHTML(device, index) {
    return `
        <div class="bg-white/5 rounded-lg p-4">
            <h4 class="text-white font-semibold mb-3">🔄 Replacement Switch</h4>
            ${SWITCH_MODELS.map(model => {
                const inBasket = isInBasket(device.ip, model.name);
                return `
                    <div class="flex justify-between items-center mb-2 text-white text-sm">
                        <div class="flex items-center gap-2">
                            <input
                                type="number"
                                min="1"
                                max="20"
                                value="1"
                                id="qty-switch-${model.id}-${index}"
                                class="w-16 bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-sm"
                            />
                            <span class="flex items-center gap-2">
                                ${model.name}
                                ${inBasket ? '<span class="text-green-400">✓</span>' : ''}
                            </span>
                        </div>
                        <button
                            onclick="addSwitch('${device.ip}', '${model.name}', '${model.id}-${index}')"
                            class="px-4 py-1 rounded text-xs transition-all ${inBasket ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}"
                        >
                            Add
                        </button>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// Get transceiver selection HTML
function getTransceiverSelectionHTML(device, index) {
    return `
        <div class="bg-white/5 rounded-lg p-4">
            <h4 class="text-white font-semibold mb-3">📡 Add Transceivers</h4>
            ${TRANSCEIVER_TYPES.map(trans => {
                const inBasket = isInBasket(device.ip, trans.name);
                return `
                    <div class="flex justify-between items-center mb-2">
                        <div class="flex items-center gap-2">
                            <input
                                type="number"
                                min="1"
                                max="20"
                                value="1"
                                id="qty-${trans.id}-${index}"
                                class="w-16 bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-sm"
                            />
                            <span class="text-white text-sm flex items-center gap-2">
                                ${trans.name}
                                ${inBasket ? '<span class="text-green-400">✓</span>' : ''}
                            </span>
                        </div>
                        <button
                            onclick="addTransceiver('${device.ip}', '${trans.name}', '${trans.id}-${index}')"
                            class="px-4 py-1 rounded text-xs text-white transition-all ${inBasket ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}"
                        >
                            Add
                        </button>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}