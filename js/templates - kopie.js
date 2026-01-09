// Site Details Tab HTML
function getSiteDetailsHTML() {
    return `
        <h2 class="text-3xl font-semibold text-white mb-4">🏢 Site Details</h2>

        <div class="bg-white/5 rounded-xl p-6 mb-6">
            <h3 class="text-xl font-semibold text-white mb-4">Site Information</h3>
            <div class="grid md:grid-cols-2 gap-4">
                <div>
                    <label class="text-white text-sm mb-2 block">Site Name</label>
                    <input type="text" class="w-full rounded-lg px-4 py-2" placeholder="Main Office" />
                </div>
                <div>
                    <label class="text-white text-sm mb-2 block">Site Code</label>
                    <input type="text" class="w-full rounded-lg px-4 py-2" placeholder="HQ-001" />
                </div>
                <div class="md:col-span-2">
                    <label class="text-white text-sm mb-2 block">Address</label>
                    <textarea rows="3" class="w-full rounded-lg px-4 py-2" placeholder="Street, City, ZIP, Country"></textarea>
                </div>
            </div>
        </div>

        <div class="bg-white/5 rounded-xl p-6 mb-6">
            <h3 class="text-xl font-semibold text-white mb-4">Site Contact Details</h3>
            <div class="grid md:grid-cols-2 gap-4">
                <div>
                    <label class="text-white text-sm mb-2 block">Primary Contact Name</label>
                    <input type="text" class="w-full rounded-lg px-4 py-2" placeholder="John Doe" />
                </div>
                <div>
                    <label class="text-white text-sm mb-2 block">Primary Contact Email</label>
                    <input type="email" class="w-full rounded-lg px-4 py-2" placeholder="john.doe@company.com" />
                </div>
                <div>
                    <label class="text-white text-sm mb-2 block">Primary Contact Phone</label>
                    <input type="tel" class="w-full rounded-lg px-4 py-2" placeholder="+1 234 567 8900" />
                </div>
            </div>
        </div>

        <div class="bg-white/5 rounded-xl p-6 mb-6">
            <h3 class="text-xl font-semibold text-white mb-4">Fiber Details</h3>
            <p class="text-gray-300 mb-4 text-sm">Select the fiber types available at this site:</p>
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 class="text-white font-semibold mb-3">Multi-mode Fiber</h4>
                    <div class="space-y-2">
                        <label class="flex items-center gap-3 text-white cursor-pointer">
                            <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                            <span>OM1</span>
                        </label>
                        <label class="flex items-center gap-3 text-white cursor-pointer">
                            <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                            <span>OM2</span>
                        </label>
                        <label class="flex items-center gap-3 text-white cursor-pointer">
                            <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                            <span>OM3</span>
                        </label>
                        <label class="flex items-center gap-3 text-white cursor-pointer">
                            <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                            <span>OM4</span>
                        </label>
                    </div>
                </div>
                <div>
                    <h4 class="text-white font-semibold mb-3">Single-mode Fiber</h4>
                    <div class="space-y-2">
                        <label class="flex items-center gap-3 text-white cursor-pointer">
                            <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                            <span>OS1</span>
                        </label>
                        <label class="flex items-center gap-3 text-white cursor-pointer">
                            <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                            <span>OS2</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white/5 rounded-xl p-6 mb-6">
            <h3 class="text-xl font-semibold text-white mb-4">IPT Details</h3>
            <div>
                <p class="text-white mb-3 font-semibold">IPT still in use:</p>
                <div class="space-y-2">
                    <div class="flex items-center gap-4">
                        <label class="flex items-center gap-3 text-white cursor-pointer">
                            <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                            <span>Yes</span>
                        </label>
                        <div class="flex items-center gap-3">
                            <label class="flex items-center gap-2 text-white cursor-pointer text-sm">
                                <input type="checkbox" class="h-4 w-4 text-blue-600 rounded" />
                                <span>Paging</span>
                            </label>
                            <label class="flex items-center gap-2 text-white cursor-pointer text-sm">
                                <input type="checkbox" class="h-4 w-4 text-blue-600 rounded" />
                                <span>Gate</span>
                            </label>
                        </div>
                    </div>
                    <label class="flex items-center gap-3 text-white cursor-pointer">
                        <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                        <span>No</span>
                    </label>
                </div>
            </div>
        </div>

        <div class="bg-white/5 rounded-xl p-6 mb-6">
            <h3 class="text-xl font-semibold text-white mb-4">Server & Storage Details</h3>
            <div class="grid md:grid-cols-2 gap-6">
                <!-- Current Section -->
                <div class="bg-white/5 rounded-lg p-4">
                    <h4 class="text-white font-bold text-lg mb-4 border-b border-white/20 pb-2">Current</h4>
                    <!-- Server Subsection -->
                    <div class="mb-4">
                        <h5 class="text-white font-semibold mb-2">Server</h5>
                        <div class="space-y-3 ml-4">
                            <label class="flex items-center gap-3 text-white cursor-pointer">
                                <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                                <span>ST550</span>
                            </label>
                            <div class="flex items-center gap-3">
                                <label class="flex items-center gap-3 text-white cursor-pointer">
                                    <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                                    <span>D3 BUS</span>
                                </label>
                                <div class="flex items-center gap-2">
                                    <input type="number" min="0" class="w-20 bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-sm" placeholder="0" />
                                    <span class="text-white text-sm">nodes</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <label class="flex items-center gap-3 text-white cursor-pointer">
                                    <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                                    <span>D3 MFG</span>
                                </label>
                                <div class="flex items-center gap-2">
                                    <input type="number" min="0" class="w-20 bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-sm" placeholder="0" />
                                    <span class="text-white text-sm">nodes</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <label class="flex items-center gap-3 text-white cursor-pointer">
                                    <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                                    <span>D3 AWA</span>
                                </label>
                                <div class="flex items-center gap-2">
                                    <input type="number" min="0" class="w-20 bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-sm" placeholder="0" />
                                    <span class="text-white text-sm">nodes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Storage Subsection -->
                    <div>
                        <h5 class="text-white font-semibold mb-2">Storage</h5>
                        <div class="space-y-3 ml-4">
                            <label class="flex items-center gap-3 text-white cursor-pointer">
                                <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                                <span>DE4000 BUS</span>
                            </label>
                            <label class="flex items-center gap-3 text-white cursor-pointer">
                                <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                                <span>DE4000 MFG</span>
                            </label>
                            <label class="flex items-center gap-3 text-white cursor-pointer">
                                <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                                <span>DE4000 AWA</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Future Section -->
                <div class="bg-white/5 rounded-lg p-4">
                    <h4 class="text-white font-bold text-lg mb-4 border-b border-white/20 pb-2">Future (estimate)</h4>
                    <!-- Server Subsection -->
                    <div class="mb-4">
                        <h5 class="text-white font-semibold mb-2">Server</h5>
                        <div class="space-y-3 ml-4">
                            <label class="flex items-center gap-3 text-white cursor-pointer">
                                <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                                <span>ST550</span>
                            </label>
                            <div class="flex items-center gap-3">
                                <label class="flex items-center gap-3 text-white cursor-pointer">
                                    <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                                    <span>SR630 BUS</span>
                                </label>
                                <div class="flex items-center gap-2">
                                    <input type="number" min="0" class="w-20 bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-sm" placeholder="0" />
                                    <span class="text-white text-sm">nodes</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <label class="flex items-center gap-3 text-white cursor-pointer">
                                    <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                                    <span>SR630 MFG</span>
                                </label>
                                <div class="flex items-center gap-2">
                                    <input type="number" min="0" class="w-20 bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-sm" placeholder="0" />
                                    <span class="text-white text-sm">nodes</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <label class="flex items-center gap-3 text-white cursor-pointer">
                                    <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                                    <span>SR630 AWA</span>
                                </label>
                                <div class="flex items-center gap-2">
                                    <input type="number" min="0" class="w-20 bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-sm" placeholder="0" />
                                    <span class="text-white text-sm">nodes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Storage Subsection -->
                    <div>
                        <h5 class="text-white font-semibold mb-2">Storage</h5>
                        <div class="space-y-3 ml-4">
                            <label class="flex items-center gap-3 text-white cursor-pointer">
                                <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                                <span>DE4200H BUS</span>
                            </label>
                            <label class="flex items-center gap-3 text-white cursor-pointer">
                                <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                                <span>DE4200H MFG</span>
                            </label>
                            <label class="flex items-center gap-3 text-white cursor-pointer">
                                <input type="checkbox" class="h-5 w-5 text-blue-600 rounded" />
                                <span>DE4200H AWA</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <label class="text-white text-sm mb-2 block">Additional Notes</label>
                <textarea rows="3" class="w-full rounded-lg px-4 py-2" placeholder="Any special requirements or existing infrastructure details..."></textarea>
            </div>
        </div>
    `;
}

// Checklist Tab HTML - COMPLETE
function getChecklistHTML() {
    return `
        <h2 class="text-3xl font-semibold text-white mb-4">📋 Design Checklist</h2>

        <!-- PRE-checks / PRE-work -->
        <div class="bg-white/5 rounded-xl mb-4">
            <div class="flex justify-between items-center p-4 cursor-pointer hover:bg-white/10 transition-all collapsible-section" onclick="toggleSection('pre-checks')">
                <div class="flex items-center gap-3">
                    <span id="status-pre-checks" class="text-2xl status-icon">❌</span>
                    <h2 class="text-xl font-semibold text-white">PRE-checks / PRE-work</h2>
                </div>
                <span id="arrow-pre-checks" class="text-white text-2xl">▼</span>
            </div>
            <div id="content-pre-checks" class="p-6 pt-0">
                <ul class="space-y-3 text-white">
                    <li><label><input type="checkbox" onchange="updateSectionStatus('pre-checks')"> Gather fiber details (MM type) for 10G options</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('pre-checks')"> Gather MDF pictures (room, racks, devices)</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('pre-checks')"> Gather all MDF UPS info</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('pre-checks')"> Validate network diagram is up to date</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('pre-checks')"> Check SRV requirements w/ich SRV team (current & future)</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('pre-checks')"> Check if IPT is still used</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('pre-checks')"> Check if VEdge is in scope or already replaced</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('pre-checks')"> Check if FW refresh is in scope</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('pre-checks')"> Check which other LCM's are ongoing or scheduled soon</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('pre-checks')"> Switch port analysis performed on all L2/L3 switches?</label></li>
                </ul>
            </div>
        </div>

        <!-- Added to Design & BOM? -->
        <div class="bg-white/5 rounded-xl mb-4">
            <div class="flex justify-between items-center p-4 cursor-pointer hover:bg-white/10 transition-all collapsible-section" onclick="toggleSection('design-bom')">
                <div class="flex items-center gap-3">
                    <span id="status-design-bom" class="text-2xl status-icon">❌</span>
                    <h2 class="text-xl font-semibold text-white">Added to Design & BOM?</h2>
                </div>
                <span id="arrow-design-bom" class="text-white text-2xl">▼</span>
            </div>
            <div id="content-design-bom" class="p-6 pt-0">
                <ul class="space-y-3 text-white">
                    <li><label><input type="checkbox" onchange="updateSectionStatus('design-bom')"> L2 switch added to remove users ports from core?</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('design-bom')"> Spare switch added?</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('design-bom')"> Spare switch is a 48P?</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('design-bom')"> 2 WAN switches added to the BOM?</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('design-bom')"> 2 Cisco C8200 routers added to the BOM for dual DIA?</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('design-bom')"> 2x Cisco SFP's added per router?</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('design-bom')"> Cisco C8200 or C8300 needed for IPT?</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('design-bom')"> Does the site already have a Meraki camera and probe?</label></li>
                </ul>
            </div>
        </div>

        <!-- SFP's -->
        <div class="bg-white/5 rounded-xl mb-4">
            <div class="flex justify-between items-center p-4 cursor-pointer hover:bg-white/10 transition-all collapsible-section" onclick="toggleSection('sfps')">
                <div class="flex items-center gap-3">
                    <span id="status-sfps" class="text-2xl status-icon">❌</span>
                    <h2 class="text-xl font-semibold text-white">SFP's</h2>
                </div>
                <span id="arrow-sfps" class="text-white text-2xl">▼</span>
            </div>
            <div id="content-sfps" class="p-6 pt-0">
                <ul class="space-y-3 text-white">
                    <li><label><input type="checkbox" onchange="updateSectionStatus('sfps')"> 10G SFP's for IDF uplinks (where possible)</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('sfps')"> SFP count for core switches</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('sfps')"> SFP count for access switches</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('sfps')"> SFP's needed for ISP input on WAN switches?</label></li>
                </ul>
            </div>
        </div>

        <!-- Cabling -->
        <div class="bg-white/5 rounded-xl mb-4">
            <div class="flex justify-between items-center p-4 cursor-pointer hover:bg-white/10 transition-all collapsible-section" onclick="toggleSection('cabling')">
                <div class="flex items-center gap-3">
                    <span id="status-cabling" class="text-2xl status-icon">❌</span>
                    <h2 class="text-xl font-semibold text-white">Cabling</h2>
                </div>
                <span id="arrow-cabling" class="text-white text-2xl">▼</span>
            </div>
            <div id="content-cabling" class="p-6 pt-0">
                <ul class="space-y-3 text-white">
                    <li><label><input type="checkbox" onchange="updateSectionStatus('cabling')"> Verify and modify CABLING tab</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('cabling')"> Modify cable lengths according to future position in the racks</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('cabling')"> Storage cables needed?</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('cabling')"> Patch cords for IDF's needed?</label></li>
                </ul>
            </div>
        </div>

        <!-- Rack & Power -->
        <div class="bg-white/5 rounded-xl mb-4">
            <div class="flex justify-between items-center p-4 cursor-pointer hover:bg-white/10 transition-all collapsible-section" onclick="toggleSection('rack-power-checklist')">
                <div class="flex items-center gap-3">
                    <span id="status-rack-power-checklist" class="text-2xl status-icon">❌</span>
                    <h2 class="text-xl font-semibold text-white">Rack & Power</h2>
                </div>
                <span id="arrow-rack-power-checklist" class="text-white text-2xl">▼</span>
            </div>
            <div id="content-rack-power-checklist" class="p-6 pt-0">
                <ul class="space-y-3 text-white">
                    <li><label><input type="checkbox" onchange="updateSectionStatus('rack-power-checklist')"> Verified the sizing of the UPS</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('rack-power-checklist')"> Rack replacement needed?</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('rack-power-checklist')"> Extra PDU's needed?</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('rack-power-checklist')"> Other accessories needed?</label></li>
                </ul>
            </div>
        </div>

        <!-- IDF's -->
        <div class="bg-white/5 rounded-xl mb-4">
            <div class="flex justify-between items-center p-4 cursor-pointer hover:bg-white/10 transition-all collapsible-section" onclick="toggleSection('idfs')">
                <div class="flex items-center gap-3">
                    <span id="status-idfs" class="text-2xl status-icon">❌</span>
                    <h2 class="text-xl font-semibold text-white">IDF's</h2>
                </div>
                <span id="arrow-idfs" class="text-white text-2xl">▼</span>
            </div>
            <div id="content-idfs" class="p-6 pt-0">
                <ul class="space-y-3 text-white">
                    <li><label><input type="checkbox" onchange="updateSectionStatus('idfs')"> Normal power cords or UPS power cords needed?</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('idfs')"> Patch cords needed for clean-up?</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('idfs')"> UPS'es in IDF's that need to be replaced?</label></li>
                </ul>
            </div>
        </div>
    `;
}

// Switches Tab HTML - COMPLETE
function getSwitchesHTML() {
    return `
        <h2 class="text-3xl font-semibold text-white mb-4">🔀 Switch survey</h2>

        <div class="bg-white/5 rounded-xl p-6 mb-6">
            <h3 class="text-2xl font-semibold text-white mb-4">Device Credentials</h3>
            <div class="grid md:grid-cols-3 gap-4">
                <div>
                    <label class="text-white text-sm mb-2 block">Username</label>
                    <input type="text" id="username" placeholder="admin" class="w-full rounded-lg px-4 py-2" />
                </div>
                <div>
                    <label class="text-white text-sm mb-2 block">Password</label>
                    <input type="password" id="password" placeholder="••••••••" class="w-full rounded-lg px-4 py-2" />
                </div>
                <div>
                    <label class="text-white text-sm mb-2 block">Enable Secret (optional)</label>
                    <input type="password" id="enable-secret" placeholder="••••••••" class="w-full rounded-lg px-4 py-2" />
                </div>
            </div>
        </div>

        <div class="bg-white/5 rounded-xl p-6 mb-6">
            <h3 class="text-2xl font-semibold text-white mb-4">Device IP Addresses (Switches)</h3>
            <textarea id="ip-addresses" placeholder="Enter IP addresses (one per line)&#10;10.0.10.1&#10;10.0.10.2&#10;10.0.10.8" rows="6" class="w-full rounded-lg px-4 py-3 font-mono"></textarea>
            <div class="flex gap-3 mt-4">
                <button onclick="connectToDevices()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
                    ▶ <span id="connect-btn-text">Connect & Query</span>
                </button>
                <div id="connection-status" class="flex items-center text-white text-sm"></div>
            </div>
        </div>

        <div id="device-results"></div>
    `;
}

// Helper function to generate MDF equipment table
function generateMDFEquipmentTable(section, config) {
    let html = '<div class="bg-white/5 rounded-lg p-4 mt-4">';
    
    // Main items
    if (config.main && config.main.length > 0) {
        html += '<div class="space-y-4 mb-6">';
        config.main.forEach(item => {
            const inBasket = isMDFItemInBasket(item.name, section);
            html += `
                <div class="bg-white/10 rounded-lg p-4 flex gap-4 items-start">
                    ${item.image ? `
                    <div class="flex-shrink-0 bg-white/5 rounded-lg p-2 flex items-center justify-center" style="width: 200px; height: 150px;">
                        <img src="${item.image}" alt="${item.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;" class="rounded" />
                    </div>
                    ` : ''}
                    <div class="flex-1">
                        <div class="flex justify-between items-start mb-3">
                            <div>
                                <h5 class="text-white font-semibold text-lg flex items-center gap-2">
                                    ${item.name}
                                    ${inBasket ? '<span class="text-green-400 text-sm">✓ In BOM</span>' : ''}
                                </h5>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <label class="text-white text-sm">Quantity:</label>
                            <input 
                                type="number" 
                                min="0" 
                                value="${item.defaultQty || 1}" 
                                id="qty-${section}-${item.id}"
                                class="w-20 bg-white/10 text-white border border-white/20 rounded px-3 py-2 text-sm"
                            />
                            <button 
                                onclick="addMDFEquipment('${section}', '${item.id}', '${item.name}', document.getElementById('qty-${section}-${item.id}').value, false)"
                                class="px-6 py-2 rounded text-sm font-semibold transition-all ${inBasket ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white"
                            >
                                ${inBasket ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    }
    
    // Accessories
    if (config.accessories && config.accessories.length > 0) {
        html += '<div class="border-t border-white/20 pt-4 mt-4">';
        html += '<h5 class="text-white font-semibold mb-3">Accessories</h5>';
        
        // Check if accessories have types (for grouping like 1G/10G SFPs)
        const hasTypes = config.accessories.some(acc => acc.type);
        
        if (hasTypes) {
            // Group by type
            const types = [...new Set(config.accessories.map(acc => acc.type))];
            html += '<div class="grid md:grid-cols-2 gap-4">';
            
            types.forEach(type => {
                const items = config.accessories.filter(acc => acc.type === type);
                html += `
                    <div class="bg-white/5 rounded-lg p-3">
                        <h6 class="text-white font-semibold mb-3 text-sm">${type} SFPs</h6>
                        <div class="space-y-2">
                `;
                
                items.forEach(acc => {
                    const inBasket = isMDFItemInBasket(acc.name, section);
                    html += `
                        <div class="flex justify-between items-center text-sm">
                            <div class="flex items-center gap-2">
                                <button 
                                    onclick="addMDFEquipment('${section}', '${acc.id}', '${acc.name}', document.getElementById('qty-${section}-acc-${acc.id}').value, true)"
                                    class="px-3 py-1 rounded text-xs transition-all ${inBasket ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white"
                                >
                                    Add
                                </button>
                                <input 
                                    type="number" 
                                    min="0" 
                                    value="${acc.defaultQty || 0}" 
                                    id="qty-${section}-acc-${acc.id}"
                                    class="w-16 bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-xs"
                                />
                                <span class="text-white flex items-center gap-2">
                                    ${acc.name}
                                    ${inBasket ? '<span class="text-green-400 text-xs">✓</span>' : ''}
                                </span>
                            </div>
                        </div>
                    `;
                });
                
                html += `
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
        } else {
            // No types, list normally
            html += '<div class="space-y-2">';
            config.accessories.forEach(acc => {
                const inBasket = isMDFItemInBasket(acc.name, section);
                html += `
                    <div class="flex justify-between items-center bg-white/5 rounded p-2">
                        <div class="flex items-center gap-2">
                            <button 
                                onclick="addMDFEquipment('${section}', '${acc.id}', '${acc.name}', document.getElementById('qty-${section}-acc-${acc.id}').value, true)"
                                class="px-4 py-1 rounded text-xs transition-all ${inBasket ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white"
                            >
                                Add
                            </button>
                            <input 
                                type="number" 
                                min="0" 
                                value="${acc.defaultQty || 0}" 
                                id="qty-${section}-acc-${acc.id}"
                                class="w-16 bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-sm"
                            />
                            <span class="text-white text-sm flex items-center gap-2">
                                ${acc.name}
                                ${inBasket ? '<span class="text-green-400 text-xs">✓</span>' : ''}
                            </span>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
        }
        
        html += '</div>';
    }
    
    html += '</div>';
    return html;
}

// MDF Tab HTML - COMPLETE with L2 Mgmt Switch
function getMDFHTML() {
    return `
        <h2 class="text-3xl font-semibold text-white mb-4">🏢 MDF</h2>

        <!-- WAN Switches -->
        <div class="bg-white/5 rounded-xl mb-4">
            <div class="flex justify-between items-center p-4 cursor-pointer hover:bg-white/10 transition-all collapsible-section" onclick="toggleSection('wan-switches')">
                <div class="flex items-center gap-3">
                    <span id="status-wan-switches" class="text-2xl status-icon">❌</span>
                    <h2 class="text-xl font-semibold text-white">WAN Switches</h2>
                </div>
                <span id="arrow-wan-switches" class="text-white text-2xl">▼</span>
            </div>
            <div id="content-wan-switches" class="p-6 pt-0">
                ${generateMDFEquipmentTable('wan-switches', MDF_EQUIPMENT.wan_switches)}
                <div class="bg-white/5 rounded-lg p-4 mt-4">
                    <ul class="space-y-3 text-white">
                        <li><label><input type="checkbox" onchange="updateSectionStatus('wan-switches')"> 2 WAN switches added as part of the new NW design</label></li>
                        <li><label><input type="checkbox" onchange="updateSectionStatus('wan-switches')"> Checked if ISP input(s) need fiber ports and SFP's added accordingly</label></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Routers -->
        <div class="bg-white/5 rounded-xl mb-4">
            <div class="flex justify-between items-center p-4 cursor-pointer hover:bg-white/10 transition-all collapsible-section" onclick="toggleSection('routers')">
                <div class="flex items-center gap-3">
                    <span id="status-routers" class="text-2xl status-icon">❌</span>
                    <h2 class="text-xl font-semibold text-white">Routers</h2>
                </div>
                <span id="arrow-routers" class="text-white text-2xl">▼</span>
            </div>
            <div id="content-routers" class="p-6 pt-0">
                ${generateMDFEquipmentTable('routers', MDF_EQUIPMENT.routers)}
                <div class="bg-white/5 rounded-lg p-4 mt-4">
                    <ul class="space-y-3 text-white">
                        <li><label><input type="checkbox" onchange="updateSectionStatus('routers')"> 2 Cisco C8200 routers added to the BOM for dual DIA</label></li>
                        <li><label><input type="checkbox" onchange="updateSectionStatus('routers')"> 2 Cisco SFP's added per router</label></li>
                        <li><label><input type="checkbox" onchange="updateSectionStatus('routers')"> Cisco C8200 or C8300 needed for IPT?</label></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Firewalls -->
        <div class="bg-white/5 rounded-xl mb-4">
            <div class="flex justify-between items-center p-4 cursor-pointer hover:bg-white/10 transition-all collapsible-section" onclick="toggleSection('firewalls')">
                <div class="flex items-center gap-3">
                    <span id="status-firewalls" class="text-2xl status-icon">❌</span>
                    <h2 class="text-xl font-semibold text-white">Firewalls</h2>
                </div>
                <span id="arrow-firewalls" class="text-white text-2xl">▼</span>
            </div>
            <div id="content-firewalls" class="p-6 pt-0">
                ${generateMDFEquipmentTable('firewalls', MDF_EQUIPMENT.firewalls)}
                <div class="bg-white/5 rounded-lg p-4 mt-4">
                    <ul class="space-y-3 text-white">
                        <li><label><input type="checkbox" onchange="updateSectionStatus('firewalls')"> Verified FW refresh is in scope</label></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Core Switches -->
        <div class="bg-white/5 rounded-xl mb-4">
            <div class="flex justify-between items-center p-4 cursor-pointer hover:bg-white/10 transition-all collapsible-section" onclick="toggleSection('core-switches')">
                <div class="flex items-center gap-3">
                    <span id="status-core-switches" class="text-2xl status-icon">❌</span>
                    <h2 class="text-xl font-semibold text-white">Core Switches</h2>
                </div>
                <span id="arrow-core-switches" class="text-white text-2xl">▼</span>
            </div>
            <div id="content-core-switches" class="p-6 pt-0">
                ${generateMDFEquipmentTable('core-switches', MDF_EQUIPMENT.core_switches)}
                <div class="bg-white/5 rounded-lg p-4 mt-4">
                    <ul class="space-y-3 text-white">
                        <li><label><input type="checkbox" onchange="updateSectionStatus('core-switches')"> Verified the site size and added core switches accordingly (Large = 3, Medium = 2)</label></li>
                        <li><label><input type="checkbox" onchange="updateSectionStatus('core-switches')"> SFP requirements calculated</label></li>
                        <li><label><input type="checkbox" onchange="updateSectionStatus('core-switches')"> Tried to upgrade uplink SFP's to 10G (where possible)</label></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- L2 Mgmt Switch -->
        <div class="bg-white/5 rounded-xl mb-4">
            <div class="flex justify-between items-center p-4 cursor-pointer hover:bg-white/10 transition-all collapsible-section" onclick="toggleSection('l2-mgmt-switch')">
                <div class="flex items-center gap-3">
                    <span id="status-l2-mgmt-switch" class="text-2xl status-icon">❌</span>
                    <h2 class="text-xl font-semibold text-white">L2 Mgmt Switch</h2>
                </div>
                <span id="arrow-l2-mgmt-switch" class="text-white text-2xl">▼</span>
            </div>
            <div id="content-l2-mgmt-switch" class="p-6 pt-0">
                ${generateMDFEquipmentTable('l2-mgmt-switch', MDF_EQUIPMENT.l2_mgmt_switch)}
                <div class="bg-white/5 rounded-lg p-4 mt-4">
                    <ul class="space-y-3 text-white">
                        <li><label><input type="checkbox" onchange="updateSectionStatus('l2-mgmt-switch')"> L2 management switch added to isolate management traffic</label></li>
                        <li><label><input type="checkbox" onchange="updateSectionStatus('l2-mgmt-switch')"> Verified port count is sufficient for all devices</label></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Cabling Kit -->
        <div class="bg-white/5 rounded-xl mb-4">
            <div class="flex justify-between items-center p-4 cursor-pointer hover:bg-white/10 transition-all collapsible-section" onclick="toggleSection('cabling-kit')">
                <div class="flex items-center gap-3">
                    <span id="status-cabling-kit" class="text-2xl status-icon">❌</span>
                    <h2 class="text-xl font-semibold text-white">Cabling Kit</h2>
                </div>
                <span id="arrow-cabling-kit" class="text-white text-2xl">▼</span>
            </div>
            <div id="content-cabling-kit" class="p-6 pt-0">
                <ul class="space-y-3 text-white mb-4">
                    <li><label><input type="checkbox" onchange="updateSectionStatus('cabling-kit')"> Cabling requirements assessed</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('cabling-kit')"> Cable lengths verified</label></li>
                    <li><label><input type="checkbox" onchange="updateSectionStatus('cabling-kit')"> Kit quantities calculated</label></li>
                </ul>
                ${generateMDFEquipmentTable('cabling-kit', MDF_EQUIPMENT.cabling_kit)}
                <div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-4">
                    <p class="text-blue-200 text-sm">
                        <strong>Note:</strong> Cable details will be filled in from the Cabling & SFP tab based on your specific requirements.
                    </p>
                </div>
            </div>
        </div>
    `;
}

// WiFi Tab HTML
function getWiFiHTML() {
    return `
        <h2 class="text-3xl font-semibold text-white mb-4">🛜 WiFi</h2>
        <div class="bg-white/5 rounded-xl p-6">
            <p class="text-gray-300">WiFi functionality will be here</p>
        </div>
    `;
}

// Cabling Tab HTML
function getCablingHTML() {
    return `
        <h2 class="text-3xl font-semibold text-white mb-4">➰ Cabling & SFP</h2>
        <div class="bg-white/5 rounded-xl p-6">
            <p class="text-gray-300">Cabling functionality will be here</p>
        </div>
    `;
}

// Rack & Power Tab HTML
function getRackPowerHTML() {
    return `
        <h2 class="text-3xl font-semibold text-white mb-4">🔌 Rack & Power</h2>
        <div class="bg-white/5 rounded-xl p-6">
            <p class="text-gray-300">Rack & Power functionality will be here</p>
        </div>
    `;
}

// BOM Lease Tab HTML
function getBOMLeaseHTML() {
    return `
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-bold text-white">🛒 Bill of Materials (BOM) - Lease</h2>
            <button onclick="renderBasket()" class="relative bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg">
                🔄 Refresh BOM
            </button>
        </div>

        <div id="basket-content" class="bg-white/5 rounded-xl p-6 min-h-[40vh] mb-4">
            <p class="text-gray-400 text-center py-8">Your BOM is empty. Add items from the Switches, MDF, or WiFi tabs.</p>
        </div>

        <div class="border-t border-white/10 p-4 bg-white/5 rounded-xl">
            <div class="flex gap-3">
                <button onclick="generatePDF()" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                    📄 Export to PDF/HTML
                </button>
                <button class="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all">
                    Submit Lease Order
                </button>
            </div>
        </div>
    `;
}

// BOM Purchase Tab HTML
function getBOMPurchaseHTML() {
    return `
        <h2 class="text-3xl font-semibold text-white mb-4">🛒 BOM Purchase</h2>
        <div class="bg-white/5 rounded-xl p-6">
            <p class="text-gray-300">BOM Purchase functionality will be here</p>
        </div>
    `;
}