// ----------------------------------------------------------------------
// Weather Display
// ----------------------------------------------------------------------
// NOTE: This uses static placeholder data so the page works without an
// API key. To use live data instead, sign up for a free key at
// openweathermap.org and replace displayWeather() with a fetch() call
// to something like:
//   https://api.openweathermap.org/data/2.5/weather?q=Manzini,SZ&units=metric&appid=YOUR_KEY
// then map the returned fields (main.temp, weather[0].description, etc.)
// into the same HTML structure below.

function displayWeather() {
    const weatherDisplay = document.querySelector('#weather-display');

    const currentWeather = {
        temperature: 24,
        description: "Partly Cloudy",
        high: 27,
        low: 15
    };

    weatherDisplay.innerHTML = `
        <p class="weather-temp">${currentWeather.temperature}&deg;C</p>
        <p>${currentWeather.description}</p>
        <p>High: ${currentWeather.high}&deg;C | Low: ${currentWeather.low}&deg;C</p>
    `;
}

// ----------------------------------------------------------------------
// Business Spotlights
// ----------------------------------------------------------------------
const membersUrl = 'data/members.json';
const spotlightsContainer = document.querySelector('#spotlights-container');

async function getMembers() {
    try {
        const response = await fetch(membersUrl);
        const data = await response.json();
        displaySpotlights(data);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function displaySpotlights(members) {
    // Only silver (2) and gold (3) level members are eligible for a spotlight.
    const eligibleMembers = members.filter(member => member.membershipLevel > 1);

    // Shuffle the eligible members and pick up to 3.
    const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    spotlightsContainer.innerHTML = '';

    selected.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('spotlight-item');

        const levelLabel = member.membershipLevel === 3 ? 'Gold Member' : 'Silver Member';

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="100" height="100">
            <h3>${member.name}</h3>
            <p class="member-level">${levelLabel}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener">Website</a>
        `;

        spotlightsContainer.appendChild(card);
    });
}

displayWeather();
getMembers();
