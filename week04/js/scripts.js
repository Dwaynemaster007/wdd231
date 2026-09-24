// Get query string from current URL
const currentUrl = window.location.href;
const formData = currentUrl.split('?')[1];

if (formData) {
  // Create URLSearchParams object
  const showInfo = new URLSearchParams(window.location.search);

  // Retrieve specific form field values using .get('name')
  const fname = showInfo.get('fname');
  const email = showInfo.get('email');

  // Display values on page
  document.querySelector('#results').textContent = `Thank you, ${fname}! We sent a confirmation to ${email}.`;
}