// Toggle section collapse
function toggleSection(sectionId) {
    const content = document.getElementById(`content-${sectionId}`);
    const arrow = document.getElementById(`arrow-${sectionId}`);

    if (!content || !arrow) return;

    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        arrow.textContent = '▼';
    } else {
        content.classList.add('hidden');
        arrow.textContent = '▶';
    }
}

// Update section status based on checkboxes
function updateSectionStatus(sectionId) {
    const content = document.getElementById(`content-${sectionId}`);
    const statusIcon = document.getElementById(`status-${sectionId}`);
    
    if (!content || !statusIcon) return;
    
    const checkboxes = content.querySelectorAll('input[type="checkbox"]');

    let totalChecked = 0;
    checkboxes.forEach(cb => {
        if (cb.checked) totalChecked++;
    });

    if (totalChecked === checkboxes.length) {
        statusIcon.textContent = '✅';
    } else if (totalChecked > 0) {
        statusIcon.textContent = '⚠️';
    } else {
        statusIcon.textContent = '❌';
    }
}

// Initialize all section statuses
function initializeSectionStatuses() {
    const allSections = [...CHECKLIST_SECTIONS, ...MDF_SECTIONS];
    allSections.forEach(sectionId => {
        const content = document.getElementById(`content-${sectionId}`);
        if (content) {
            updateSectionStatus(sectionId);
        }
    });
}