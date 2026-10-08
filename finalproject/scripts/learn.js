const form = document.querySelector("#contact-form");
const timestampInput = document.querySelector("#timestamp");

if (form && timestampInput) {
    form.addEventListener("submit", () => {
        timestampInput.value = new Date().toISOString();
    });
}
