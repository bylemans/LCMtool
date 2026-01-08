// Check if item is already in basket
function isInBasket(deviceIp, itemName) {
    return orderBasket.some(item => item.deviceIp === deviceIp && item.name === itemName);
}

// Add MDF equipment to basket
function addMDFEquipment(section, itemId, itemName, quantity, isAccessory = false) {
    const type = isAccessory ? `${section}-accessory` : section;
    
    // Remove existing item of same type and name
    orderBasket = orderBasket.filter(item => !(item.type === type && item.name === itemName));

    orderBasket.push({
        id: Date.now() + Math.random(),
        type: type,
        deviceIp: 'MDF',
        name: itemName,
        quantity: parseInt(quantity),
        category: section
    });
    
    updateBasketCount();
    // Re-render MDF tab to update checkmarks
    const mdfTab = document.getElementById('mdf');
    if (mdfTab && !mdfTab.classList.contains('hidden')) {
        loadTabContent('mdf');
    }
}

// Check if MDF item is in basket
function isMDFItemInBasket(itemName) {
    return orderBasket.some(item => item.name === itemName);
}

// Add item to basket
function addToBasket(deviceIp, type, name, quantity) {
    // For transceivers, remove existing same item for same device
    if (type === 'transceiver') {
        orderBasket = orderBasket.filter(item => !(item.deviceIp === deviceIp && item.name === name));
    }
    // For switches, allow multiple different models but remove duplicate of same model
    if (type === 'switch') {
        orderBasket = orderBasket.filter(item => !(item.deviceIp === deviceIp && item.name === name && item.type === 'switch'));
    }

    orderBasket.push({
        id: Date.now() + Math.random(),
        type,
        deviceIp,
        name,
        quantity: parseInt(quantity)
    });
    updateBasketCount();
    renderDeviceResults();
}

// Add switch to basket
function addSwitch(deviceIp, name, qtyId) {
    const qtyInput = document.getElementById(`qty-switch-${qtyId}`);
    const qty = parseInt(qtyInput.value) || 1;
    addToBasket(deviceIp, 'switch', name, qty);
}

// Add transceiver to basket
function addTransceiver(deviceIp, name, qtyId) {
    const qtyInput = document.getElementById(`qty-${qtyId}`);
    const qty = parseInt(qtyInput.value) || 1;
    addToBasket(deviceIp, 'transceiver', name, qty);
}

// Update basket count in tab
function updateBasketCount() {
    const totalItems = orderBasket.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.getElementById('basket-count-tab');
    if (countElement) {
        countElement.textContent = totalItems;
    }
}

// Get basket summary (aggregated by item type)
function getBasketSummary() {
    const summary = {};
    orderBasket.forEach(item => {
        const key = `${item.type}-${item.name}`;
        if (!summary[key]) {
            summary[key] = {
                type: item.type,
                name: item.name,
                total: 0,
                devices: [],
                category: item.category || null
            };
        }
        summary[key].total += item.quantity;

        const deviceLabel = item.deviceIp === 'MDF' ? 'MDF Equipment' : item.deviceIp;
        const existingDevice = summary[key].devices.find(d => d.ip === item.deviceIp);
        if (existingDevice) {
            existingDevice.quantity += item.quantity;
        } else {
            summary[key].devices.push({
                ip: item.deviceIp,
                label: deviceLabel,
                quantity: item.quantity
            });
        }
    });
    return Object.values(summary).sort((a, b) => {
        // Sort by category first (MDF items together), then by type, then by name
        if (a.category && !b.category) return -1;
        if (!a.category && b.category) return 1;
        if (a.category && b.category) {
            const catCompare = a.category.localeCompare(b.category);
            if (catCompare !== 0) return catCompare;
        }
        return a.type.localeCompare(b.type) || a.name.localeCompare(b.name);
    });
}

// Remove item from basket
function removeItemFromBasket(deviceIp, name) {
    orderBasket = orderBasket.filter(item => !(item.deviceIp === deviceIp && item.name === name));
    updateBasketCount();
    renderDeviceResults();
    renderBasket();
}

// Render basket contents
function renderBasket() {
    const container = document.getElementById('basket-content');
    if (!container) return;

    if (orderBasket.length === 0) {
        container.innerHTML = '<p class="text-gray-400 text-center py-8">Your BOM is empty. Add items from the Switches, MDF, or WiFi tabs.</p>';
        return;
    }

    const summary = getBasketSummary();
    
    // Group items by category
    const mdfItems = summary.filter(item => item.category);
    const switchItems = summary.filter(item => !item.category && item.type === 'switch');
    const transceiverItems = summary.filter(item => !item.category && item.type === 'transceiver');
    const otherItems = summary.filter(item => !item.category && item.type !== 'switch' && item.type !== 'transceiver');
    
    let html = '<div class="space-y-6">';
    
    // MDF Equipment Section
    if (mdfItems.length > 0) {
        html += '<div class="border-b border-white/20 pb-4">';
        html += '<h3 class="text-xl font-bold text-white mb-4">🏢 MDF Equipment</h3>';
        html += '<div class="space-y-4">';
        
        mdfItems.forEach(item => {
            const typeLabel = item.type.includes('accessory') 
                ? `${item.category} - Accessory` 
                : item.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            
            html += `
                <div class="bg-white/5 rounded-lg p-4">
                    <div class="flex justify-between items-center mb-3 pb-3 border-b border-white/10">
                        <div>
                            <div class="text-white font-bold text-lg">${item.name}</div>
                            <div class="text-sm text-gray-400">${typeLabel}</div>
                        </div>
                        <div class="text-green-400 font-bold text-xl">
                            Total: ${item.total}
                        </div>
                    </div>
                    <div class="space-y-2">
                        ${item.devices.map(device => `
                            <div class="flex justify-between items-center text-sm bg-white/10 rounded p-2">
                                <span class="text-blue-300 font-mono">${device.label}</span>
                                <span class="text-white">Qty: ${device.quantity}</span>
                                <button
                                    onclick="removeItemFromBasket('${device.ip}', '${item.name}')"
                                    class="text-red-400 hover:text-red-500 text-xs px-2 py-1 rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        html += '</div></div>';
    }
    
    // Switches Section
    if (switchItems.length > 0) {
        html += '<div class="border-b border-white/20 pb-4">';
        html += '<h3 class="text-xl font-bold text-white mb-4">🔀 Switches</h3>';
        html += '<div class="space-y-4">';
        
        switchItems.forEach(item => {
            html += `
                <div class="bg-white/5 rounded-lg p-4">
                    <div class="flex justify-between items-center mb-3 pb-3 border-b border-white/10">
                        <div>
                            <div class="text-white font-bold text-lg">${item.name}</div>
                            <div class="text-sm text-gray-400 capitalize">${item.type}</div>
                        </div>
                        <div class="text-green-400 font-bold text-xl">
                            Total: ${item.total}
                        </div>
                    </div>
                    <h4 class="text-white text-md mb-2">Required for:</h4>
                    <div class="space-y-2">
                        ${item.devices.map(device => `
                            <div class="flex justify-between items-center text-sm bg-white/10 rounded p-2">
                                <span class="text-blue-300 font-mono">${device.label}</span>
                                <span class="text-white">Qty: ${device.quantity}</span>
                                <button
                                    onclick="removeItemFromBasket('${device.ip}', '${item.name}')"
                                    class="text-red-400 hover:text-red-500 text-xs px-2 py-1 rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        html += '</div></div>';
    }
    
    // Transceivers Section
    if (transceiverItems.length > 0) {
        html += '<div class="border-b border-white/20 pb-4">';
        html += '<h3 class="text-xl font-bold text-white mb-4">📡 Transceivers</h3>';
        html += '<div class="space-y-4">';
        
        transceiverItems.forEach(item => {
            html += `
                <div class="bg-white/5 rounded-lg p-4">
                    <div class="flex justify-between items-center mb-3 pb-3 border-b border-white/10">
                        <div>
                            <div class="text-white font-bold text-lg">${item.name}</div>
                            <div class="text-sm text-gray-400 capitalize">${item.type}</div>
                        </div>
                        <div class="text-green-400 font-bold text-xl">
                            Total: ${item.total}
                        </div>
                    </div>
                    <h4 class="text-white text-md mb-2">Required for:</h4>
                    <div class="space-y-2">
                        ${item.devices.map(device => `
                            <div class="flex justify-between items-center text-sm bg-white/10 rounded p-2">
                                <span class="text-blue-300 font-mono">${device.label}</span>
                                <span class="text-white">Qty: ${device.quantity}</span>
                                <button
                                    onclick="removeItemFromBasket('${device.ip}', '${item.name}')"
                                    class="text-red-400 hover:text-red-500 text-xs px-2 py-1 rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        html += '</div></div>';
    }
    
    // Other Items Section
    if (otherItems.length > 0) {
        html += '<div>';
        html += '<h3 class="text-xl font-bold text-white mb-4">📦 Other Equipment</h3>';
        html += '<div class="space-y-4">';
        
        otherItems.forEach(item => {
            html += `
                <div class="bg-white/5 rounded-lg p-4">
                    <div class="flex justify-between items-center mb-3 pb-3 border-b border-white/10">
                        <div>
                            <div class="text-white font-bold text-lg">${item.name}</div>
                            <div class="text-sm text-gray-400 capitalize">${item.type}</div>
                        </div>
                        <div class="text-green-400 font-bold text-xl">
                            Total: ${item.total}
                        </div>
                    </div>
                    <h4 class="text-white text-md mb-2">Required for:</h4>
                    <div class="space-y-2">
                        ${item.devices.map(device => `
                            <div class="flex justify-between items-center text-sm bg-white/10 rounded p-2">
                                <span class="text-blue-300 font-mono">${device.label}</span>
                                <span class="text-white">Qty: ${device.quantity}</span>
                                <button
                                    onclick="removeItemFromBasket('${device.ip}', '${item.name}')"
                                    class="text-red-400 hover:text-red-500 text-xs px-2 py-1 rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        html += '</div></div>';
    }
    
    html += '</div>';
    container.innerHTML = html;
}

// Generate PDF/HTML export
function generatePDF() {
    if (orderBasket.length === 0) {
        alert('BOM is empty. Nothing to export.');
        return;
    }

    const summary = getBasketSummary();
    
    // Group items by category
    const mdfItems = summary.filter(item => item.category);
    const switchItems = summary.filter(item => !item.category && item.type === 'switch');
    const transceiverItems = summary.filter(item => !item.category && item.type === 'transceiver');
    const otherItems = summary.filter(item => !item.category && item.type !== 'switch' && item.type !== 'transceiver');
    
    let pdfContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>LCM Network Order - ${new Date().toLocaleDateString()}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
                h1 { color: #1e40af; border-bottom: 3px solid #1e40af; padding-bottom: 10px; }
                h2 { color: #374151; margin-top: 30px; background: #f3f4f6; padding: 10px; border-radius: 4px;}
                h3 { color: #1e40af; margin-top: 20px; font-size: 18px; }
                .item-section { margin: 20px 0; padding: 15px; border: 1px solid #ccc; border-radius: 4px; }
                .total { font-size: 18px; font-weight: bold; color: #059669; }
                table { width: 100%; border-collapse: collapse; margin: 10px 0; }
                th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background: #e5e7eb; font-weight: bold; }
                .date { color: #6b7280; font-size: 14px; margin-bottom: 20px; }
                .category-header { background: #dbeafe; padding: 8px; margin-top: 20px; border-left: 4px solid #1e40af; }
            </style>
        </head>
        <body>
            <h1>LCM Network Equipment Order (Lease BOM)</h1>
            <p class="date">Generated: ${new Date().toLocaleString()}</p>
    `;

    // MDF Equipment Section
    if (mdfItems.length > 0) {
        pdfContent += '<div class="category-header"><h2>🏢 MDF Equipment</h2></div>';
        
        mdfItems.forEach(item => {
            const typeLabel = item.type.includes('accessory') 
                ? `${item.category} - Accessory` 
                : item.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            
            pdfContent += `
                <div class="item-section">
                    <h3>${item.name}</h3>
                    <p><strong>Category:</strong> ${typeLabel}</p>
                    <p class="total">Total Quantity: ${item.total}</p>
                    <h4>Deployment Summary:</h4>
                    <table>
                        <tr>
                            <th>Location</th>
                            <th>Quantity</th>
                        </tr>
            `;

            item.devices.forEach(device => {
                pdfContent += `
                        <tr>
                            <td>${device.label}</td>
                            <td>${device.quantity}</td>
                        </tr>
                `;
            });

            pdfContent += `
                    </table>
                </div>
            `;
        });
    }

    // Switches Section
    if (switchItems.length > 0) {
        pdfContent += '<div class="category-header"><h2>🔀 Switches</h2></div>';
        
        switchItems.forEach(item => {
            pdfContent += `
                <div class="item-section">
                    <h3>${item.name}</h3>
                    <p><strong>Type:</strong> Switch</p>
                    <p class="total">Total Quantity: ${item.total}</p>
                    <h4>Deployment Summary:</h4>
                    <table>
                        <tr>
                            <th>Device IP</th>
                            <th>Quantity</th>
                        </tr>
            `;

            item.devices.forEach(device => {
                pdfContent += `
                        <tr>
                            <td>${device.label}</td>
                            <td>${device.quantity}</td>
                        </tr>
                `;
            });

            pdfContent += `
                    </table>
                </div>
            `;
        });
    }

    // Transceivers Section
    if (transceiverItems.length > 0) {
        pdfContent += '<div class="category-header"><h2>📡 Transceivers</h2></div>';
        
        transceiverItems.forEach(item => {
            pdfContent += `
                <div class="item-section">
                    <h3>${item.name}</h3>
                    <p><strong>Type:</strong> Transceiver</p>
                    <p class="total">Total Quantity: ${item.total}</p>
                    <h4>Deployment Summary:</h4>
                    <table>
                        <tr>
                            <th>Device IP</th>
                            <th>Quantity</th>
                        </tr>
            `;

            item.devices.forEach(device => {
                pdfContent += `
                        <tr>
                            <td>${device.label}</td>
                            <td>${device.quantity}</td>
                        </tr>
                `;
            });

            pdfContent += `
                    </table>
                </div>
            `;
        });
    }

    // Other Items Section
    if (otherItems.length > 0) {
        pdfContent += '<div class="category-header"><h2>📦 Other Equipment</h2></div>';
        
        otherItems.forEach(item => {
            pdfContent += `
                <div class="item-section">
                    <h3>${item.name}</h3>
                    <p><strong>Type:</strong> ${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
                    <p class="total">Total Quantity: ${item.total}</p>
                    <h4>Deployment Summary:</h4>
                    <table>
                        <tr>
                            <th>Location</th>
                            <th>Quantity</th>
                        </tr>
            `;

            item.devices.forEach(device => {
                pdfContent += `
                        <tr>
                            <td>${device.label}</td>
                            <td>${device.quantity}</td>
                        </tr>
                `;
            });

            pdfContent += `
                    </table>
                </div>
            `;
        });
    }

    pdfContent += `
        </body>
        </html>
    `;

    const blob = new Blob([pdfContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lcm-network-bom-${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("BOM exported as an HTML file. You can print/save this as a PDF from your browser's print menu.");
}