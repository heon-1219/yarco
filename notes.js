document.addEventListener('DOMContentLoaded', () => {
    const notesArea = document.getElementById('notes-area');
    const saveButton = document.getElementById('save-notes');
    const saveStatus = document.getElementById('save-status');
    const storageKey = 'sharedNotes';

    // Load saved notes on page load
    const savedNotes = localStorage.getItem(storageKey);
    if (savedNotes) {
        notesArea.value = savedNotes;
    }

    // Save notes when button is clicked
    saveButton.addEventListener('click', () => {
        localStorage.setItem(storageKey, notesArea.value);
        // Show save confirmation briefly
        saveStatus.style.display = 'block';
        setTimeout(() => {
            saveStatus.style.display = 'none';
        }, 1500); // Hide after 1.5 seconds
    });
}); 