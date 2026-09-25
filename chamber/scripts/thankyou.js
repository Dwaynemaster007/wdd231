// Parse the form values passed along in the query string (the form on
// join.html uses method="get").
const params = new URLSearchParams(window.location.search);

const firstName = params.get('firstName');
const lastName = params.get('lastName');
const email = params.get('email');
const phone = params.get('phone');
const orgName = params.get('orgName');
const timestamp = params.get('timestamp');

const formattedDate = timestamp
    ? new Date(timestamp).toLocaleString('en-US', {
          dateStyle: 'long',
          timeStyle: 'short',
      })
    : 'Not available';

const resultsContainer = document.querySelector('#results');

resultsContainer.innerHTML = `
    <dt>First Name</dt>
    <dd>${firstName}</dd>

    <dt>Last Name</dt>
    <dd>${lastName}</dd>

    <dt>Email</dt>
    <dd>${email}</dd>

    <dt>Phone</dt>
    <dd>${phone}</dd>

    <dt>Business/Organization</dt>
    <dd>${orgName}</dd>

    <dt>Submitted</dt>
    <dd>${formattedDate}</dd>
`;
