// ----------------------------------------------------------------------
// Weather Display (OpenWeatherMap API)
// ----------------------------------------------------------------------

const weatherApiKey = "5336d6d4e54c929d9d91bfc6e6b20eef";
const weatherCity = "Manzini,SZ";

async function getWeather() {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity}&units=metric&appid=${weatherApiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${weatherCity}&units=metric&appid=${weatherApiKey}`;

    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
    const weatherDisplay = document.querySelector('#weather-display');
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;

    weatherDisplay.innerHTML = `
        <p class="weather-temp">${temperature}&deg;C</p>
        <p class="weather-description">${description}</p>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.querySelector('#forecast-display');

    // The free 5-day/3-hour forecast returns 8 entries per day. Pick the
    // entry closest to midday for each of the next 3 days as a simple
    // daily forecast.
    const middayForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    forecastContainer.innerHTML = '';

    middayForecasts.forEach(item => {
        const forecastDate = new Date(item.dt_txt);
        const dayLabel = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });
        const temperature = Math.round(item.main.temp);

        const dayCard = document.createElement('div');
        dayCard.classList.add('forecast-day');
        dayCard.innerHTML = `
            <p class="forecast-day-label">${dayLabel}</p>
            <p class="forecast-temp">${temperature}&deg;C</p>
        `;
        forecastContainer.appendChild(dayCard);
    });
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

    // Shuffle the eligible members and pick up to 3, so the selection is
    // random on every page render.
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
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener">Website</a>
        `;

        spotlightsContainer.appendChild(card);
    });
}

getWeather();
getMembers();