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
    'dummy'
];