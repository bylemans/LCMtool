// Check if item is already in basket
function isInBasket(deviceIp, itemName) {
    return orderBasket.some(item => item.deviceIp === deviceIp && item.name === itemName);
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
                devices: []
            };
        }
        summary[key].total += item.quantity;

        const existingDevice = summary[key].devices.find(d => d.ip === item.deviceIp);
        if (existingDevice) {
            existingDevice.quantity += item.quantity;
        } else {
            summary[key].devices.push({
                ip: item.deviceIp,
                quantity: item.quantity
            });
        }
    });
    return Object.values(summary).sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
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
    container.innerHTML = `
        <div class="space-y-6">
            ${summary.map(item => `
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
                                <span class="text-blue-300 font-mono">${device.ip}</span>
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
            `).join('')}
        </div>
    `;
}

// Generate PDF/HTML export
function generatePDF() {
    if (orderBasket.length === 0) {
        alert('BOM is empty. Nothing to export.');
        return;
    }

    const summary = getBasketSummary();
    let pdfContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>LCM Network Order - ${new Date().toLocaleDateString()}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
                h1 { color: #1e40af; border-bottom: 3px solid #1e40af; padding-bottom: 10px; }
                h2 { color: #374151; margin-top: 30px; background: #f3f4f6; padding: 10px; border-radius: 4px;}
                .item-section { margin: 20px 0; padding: 15px; border: 1px solid #ccc; border-radius: 4px; }
                .total { font-size: 18px; font-weight: bold; color: #059669; }
                table { width: 100%; border-collapse: collapse; margin: 10px 0; }
                th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background: #e5e7eb; font-weight: bold; }
                .date { color: #6b7280; font-size: 14px; margin-bottom: 20px; }
            </style>
        </head>
        <body>
            <h1>LCM Network Equipment Order (Lease BOM)</h1>
            <p class="date">Generated: ${new Date().toLocaleString()}</p>
    `;

    summary.forEach(item => {
        pdfContent += `
            <div class="item-section">
                <h2>${item.name}</h2>
                <p><strong>Type:</strong> ${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
                <p class="total">Total Quantity: ${item.total}</p>
                <h3>Deployment Summary:</h3>
                <table>
                    <tr>
                        <th>Device IP</th>
                        <th>Quantity</th>
                    </tr>
        `;

        item.devices.forEach(device => {
            pdfContent += `
                    <tr>
                        <td>${device.ip}</td>
                        <td>${device.quantity}</td>
                    </tr>
            `;
        });

        pdfContent += `
                </table>
            </div>
        `;
    });

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