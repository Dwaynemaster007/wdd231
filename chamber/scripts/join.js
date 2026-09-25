// Set the hidden timestamp field to the current date and time as soon as
// the form is loaded into the browser.
const timestampField = document.querySelector('#timestamp');
const now = new Date();
timestampField.value = now.toISOString();

// Wire up each "Learn More" button to open its matching modal dialog.
const learnMoreButtons = document.querySelectorAll('.learn-more-btn');

learnMoreButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.querySelector(`#${modalId}`);
        if (modal) {
            modal.showModal();
        }
    });
});

// Wire up each modal's close button.
const closeButtons = document.querySelectorAll('.close-modal');

closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const modal = button.closest('dialog');
        if (modal) {
            modal.close();
        }
    });
});
