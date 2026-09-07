// Populate current year
document.querySelector('#currentyear').textContent = new Date().getFullYear();

// Populate last modified date
document.querySelector('#lastModified').textContent = `Last Modification: ${document.lastModified}`;
