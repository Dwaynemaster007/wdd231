const params = new URLSearchParams(window.location.search);

const fields = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "topic", label: "Topic" },
    { key: "message", label: "Message" },
    { key: "timestamp", label: "Submitted" },
];

const results = document.querySelector("#results");

const rows = fields
    .map(({ key, label }) => {
        let value = params.get(key) || "—";
        if (key === "timestamp" && params.get(key)) {
            value = new Date(params.get(key)).toLocaleString("en-US", {
                dateStyle: "long",
                timeStyle: "short",
            });
        }
        return `<dt>${label}</dt><dd>${escapeHtml(value)}</dd>`;
    })
    .join("");

results.innerHTML = rows;

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
