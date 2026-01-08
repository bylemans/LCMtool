// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Switch Models
const SWITCH_MODELS = [
    { id: 'ex4100-48mp', name: 'EX4100-48MP' },
    { id: 'ex4100-24mp', name: 'EX4100-24MP' },
    { id: 'ex4000-12mp', name: 'EX4000-12MP' },
    { id: 'ex4650-48y', name: 'EX4650-48Y' },
    { id: 'ex4000-24t', name: 'EX4000-24T' }
];

// Transceiver Types
const TRANSCEIVER_TYPES = [
    { id: 'sfp-1g-sx-c', name: 'SFP-1G-SX-C' },
    { id: 'sfpp-10g-sr-c', name: 'SFPP-10G-SR-C' },
    { id: 'sfp-1g-lx-c', name: 'SFP-1G-LX-C' },
    { id: 'sfpp-10g-lr-c', name: 'SFPP-10G-LR-C' },
    { id: 'sfp-1g-t', name: 'SFP-1G-T' },
    { id: 'sfpp-10g-t', name: 'SFPP-10G-T' }
];

// Global State
let deviceResults = [];
let orderBasket = [];

// Checklist Sections Configuration
const CHECKLIST_SECTIONS = [
    'pre-checks',
    'design-bom',
    'sfps',
    'cabling',
    'rack-power-checklist',
    'idfs'
];

// MDF Sections Configuration
const MDF_SECTIONS = [
    'wan-switches',
    'routers',
    'firewalls',
    'core-switches',
    'cabling-kit'
];

// MDF Equipment Configuration
const MDF_EQUIPMENT = {
    wan_switches: {
        main: [
            { 
                id: 'ex4000-12mp', 
                name: 'Juniper EX4000-12MP', 
                defaultQty: 2,
                image: 'https://via.placeholder.com/200x150/1e3a8a/ffffff?text=EX4000-12MP'
            }
        ],
        accessories: [
            { id: 'sfp-1g-sx-c', name: 'SFP-1G-SX-C', type: '1G' },
            { id: 'sfp-10g-sr', name: 'SFP-10G-SR', type: '10G' },
            { id: 'sfp-1g-lx-c', name: 'SFP-1G-LX-C', type: '1G' },
            { id: 'sfp-10g-lr', name: 'SFP-10G-LR', type: '10G' }
        ]
    },
    routers: {
        main: [
            { 
                id: 'c8200-1n-4t', 
                name: 'Cisco C8200-1N-4T', 
                defaultQty: 2,
                image: 'https://via.placeholder.com/200x150/1e3a8a/ffffff?text=C8200-1N-4T'
            },
            { 
                id: 'c8300-1n1s-6t', 
                name: 'Cisco C8300-1N1S-6T', 
                defaultQty: 1,
                image: 'https://via.placeholder.com/200x150/1e3a8a/ffffff?text=C8300-1N1S-6T'
            }
        ],
        accessories: [
            { id: 'glc-te', name: 'Cisco GLC-TE=', defaultQty: 2 }
        ]
    },
    firewalls: {
        main: [
            { 
                id: 'pa-1410', 
                name: 'Palo Alto PA-1410', 
                defaultQty: 2,
                image: 'https://via.placeholder.com/200x150/1e3a8a/ffffff?text=PA-1410'
            },
            { 
                id: 'pa-460', 
                name: 'Palo Alto PA-460', 
                defaultQty: 2,
                image: 'https://via.placeholder.com/200x150/1e3a8a/ffffff?text=PA-460'
            }
        ],
        accessories: []
    },
    core_switches: {
        main: [
            { 
                id: 'ex4650-48y-afo', 
                name: 'Juniper EX4650-48Y-AFO', 
                defaultQty: 2,
                image: 'https://via.placeholder.com/200x150/1e3a8a/ffffff?text=EX4650-48Y-AFO'
            }
        ],
        accessories: [
            { id: 'sfp-1g-sx-c', name: 'SFP-1G-SX-C', type: '1G' },
            { id: 'sfp-1g-lx-c', name: 'SFP-1G-LX-C', type: '1G' },
            { id: 'sfp-1g-t', name: 'SFP-1G-T', type: '1G' },
            { id: 'sfp-10g-sr', name: 'SFP-10G-SR', type: '10G' },
            { id: 'sfp-10g-lr', name: 'SFP-10G-LR', type: '10G' },
            { id: 'sfp-10g-t', name: 'SFP-10G-T', type: '10G' }
        ]
    },
    cabling_kit: {
        main: [
            { id: 'kit-1-standard', name: 'Kit 1 (Standard Length)', defaultQty: 1 },
            { id: 'kit-2-longer', name: 'Kit 2 (Longer Length)', defaultQty: 1 }
        ],
        accessories: []
    }
};