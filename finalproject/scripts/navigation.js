const navButton = document.querySelector("#nav-button");
const navBar = document.querySelector("#nav-bar");

if (navButton && navBar) {
    navButton.addEventListener("click", () => {
        navButton.classList.toggle("show");
        navBar.classList.toggle("show");
    });
}

const yearEl = document.querySelector("#currentyear");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

const modEl = document.querySelector("#lastModified");
if (modEl) {
    modEl.textContent = `Last Modification: ${document.lastModified}`;
}
