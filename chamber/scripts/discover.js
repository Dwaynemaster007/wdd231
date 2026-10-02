import discoverItems from '../data/discover.mjs';

// ----------------------------------------------------------------------
// Build the 8 discover cards from the JSON data module
// ----------------------------------------------------------------------
const cardContainer = document.querySelector('#discover-cards');

discoverItems.forEach((item, index) => {
    const card = document.createElement('div');
    card.classList.add('discover-card', `card-${index + 1}`);

    card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
            <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button type="button" class="learn-more">Learn More</button>
    `;

    cardContainer.appendChild(card);
});

// Each "Learn More" button simply expands/collapses its own card's
// description for a bit of interactivity without needing a separate page.
cardContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('learn-more')) {
        const card = event.target.closest('.discover-card');
        card.classList.toggle('expanded');
        event.target.textContent = card.classList.contains('expanded') ? 'Show Less' : 'Learn More';
    }
});

// ----------------------------------------------------------------------
// localStorage: last-visit message
// ----------------------------------------------------------------------
const visitMessage = document.querySelector('#visit-message');
const lastVisit = localStorage.getItem('discoverLastVisit');
const now = Date.now();

let message;

if (!lastVisit) {
    message = 'Welcome! Let us know if you have any questions.';
} else {
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysSinceLastVisit = Math.floor((now - Number(lastVisit)) / msPerDay);

    if (daysSinceLastVisit < 1) {
        message = 'Back so soon! Awesome!';
    } else if (daysSinceLastVisit === 1) {
        message = 'You last visited 1 day ago.';
    } else {
        message = `You last visited ${daysSinceLastVisit} days ago.`;
    }
}

visitMessage.textContent = message;

localStorage.setItem('discoverLastVisit', now.toString());
