const url = 'data/members.json';
const membersContainer = document.querySelector('#members-container');
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');

async function getMembers() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

const displayMembers = (members) => {
    membersContainer.innerHTML = '';
    members.forEach((member) => {
        let card = document.createElement('section');
        card.classList.add('member-card');
        card.innerHTML = `
            <div class="member-header">
                <h3>${member.name}</h3>
                <p class="tagline">${member.tagline}</p>
            </div>
            <div class="member-body">
                <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy" width="100" height="100">
                <div class="member-info">
                    <p><strong>EMAIL:</strong> ${member.email}</p>
                    <p><strong>PHONE:</strong> ${member.phone}</p>
                    <p><strong>URL:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
                </div>
            </div>
        `;
        membersContainer.appendChild(card);
    });
};

// View Toggle Functionality
gridButton.addEventListener('click', () => {
    membersContainer.classList.add('grid');
    membersContainer.classList.remove('list');
    gridButton.classList.add('active');
    listButton.classList.remove('active');
});

listButton.addEventListener('click', () => {
    membersContainer.classList.add('list');
    membersContainer.classList.remove('grid');
    listButton.classList.add('active');
    gridButton.classList.remove('active');
});

getMembers();