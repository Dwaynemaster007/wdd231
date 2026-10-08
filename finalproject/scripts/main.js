import { fetchMarketData, formatPrice, formatCompact, formatChange } from "./api.js";
import { isWatched, toggleWatch } from "./storage.js";

const grid = document.querySelector("#coin-grid");
const statusEl = document.querySelector("#market-status");
const dialog = document.querySelector("#coin-dialog");
const dialogBody = document.querySelector("#dialog-body");
const dialogClose = document.querySelector("#dialog-close");

let coinsCache = [];

async function init() {
    statusEl.textContent = "Loading market data…";
    statusEl.classList.remove("error");

    const { coins, source } = await fetchMarketData();
    coinsCache = coins;

    statusEl.textContent = `Showing ${coins.length} coins · ${source}`;
    renderCoins(coins);
}

function renderCoins(coins) {
    grid.innerHTML = "";

    coins.forEach((coin) => {
        const card = document.createElement("article");
        card.className = "coin-card";
        card.dataset.id = coin.id;

        const change = coin.price_change_percentage_24h;
        const changeClass = change >= 0 ? "positive" : "negative";
        const watched = isWatched(coin.id);

        card.innerHTML = `
            <img src="${coin.image}" alt="${coin.name} logo" width="40" height="40" loading="lazy">
            <div class="coin-info">
                <h3>${coin.name}</h3>
                <span class="symbol">${coin.symbol}</span>
            </div>
            <span class="metric value ${changeClass}">${formatChange(change)}</span>
            <div class="coin-metrics">
                <div class="metric">
                    <label>Price</label>
                    <span class="value">${formatPrice(coin.current_price)}</span>
                </div>
                <div class="metric">
                    <label>24h Change</label>
                    <span class="value ${changeClass}">${formatChange(change)}</span>
                </div>
                <div class="metric">
                    <label>Market Cap</label>
                    <span class="value">${formatCompact(coin.market_cap)}</span>
                </div>
                <div class="metric">
                    <label>Volume</label>
                    <span class="value">${formatCompact(coin.total_volume)}</span>
                </div>
            </div>
            <div class="coin-actions">
                <button type="button" class="btn btn-primary btn-sm details-btn" data-id="${coin.id}">Details</button>
                <button type="button" class="btn btn-ghost btn-sm watch-btn" data-id="${coin.id}">
                    ${watched ? "★ Watching" : "☆ Watch"}
                </button>
            </div>
        `;

        grid.appendChild(card);
    });
}

grid.addEventListener("click", (event) => {
    const detailsBtn = event.target.closest(".details-btn");
    const watchBtn = event.target.closest(".watch-btn");

    if (detailsBtn) {
        const coin = coinsCache.find((c) => c.id === detailsBtn.dataset.id);
        if (coin) openDialog(coin);
    }

    if (watchBtn) {
        const id = watchBtn.dataset.id;
        const nowWatched = toggleWatch(id);
        watchBtn.textContent = nowWatched ? "★ Watching" : "☆ Watch";
    }
});

function openDialog(coin) {
    const change = coin.price_change_percentage_24h;
    const changeClass = change >= 0 ? "positive" : "negative";

    dialogBody.innerHTML = `
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.5rem;">
            <img src="${coin.image}" alt="" width="48" height="48" style="border-radius:50%;">
            <div>
                <h2 id="dialog-title">${coin.name}</h2>
                <span class="symbol">${coin.symbol.toUpperCase()} · Rank #${coin.market_cap_rank ?? "—"}</span>
            </div>
        </div>
        <div class="dialog-metrics">
            <p><strong>Price:</strong> ${formatPrice(coin.current_price)}</p>
            <p><strong>24h Change:</strong> <span class="${changeClass}">${formatChange(change)}</span></p>
            <p><strong>Market Cap:</strong> ${formatCompact(coin.market_cap)}</p>
            <p><strong>24h Volume:</strong> ${formatCompact(coin.total_volume)}</p>
            <p><strong>24h High:</strong> ${formatPrice(coin.high_24h)}</p>
            <p><strong>24h Low:</strong> ${formatPrice(coin.low_24h)}</p>
        </div>
        <p style="font-size:0.85rem;color:#6b7280;">
            Market cap reflects total value of circulating supply. Volume shows how much traded in 24 hours.
            Price alone does not tell the full story — size and liquidity matter.
        </p>
    `;

    if (typeof dialog.showModal === "function") {
        dialog.showModal();
    } else {
        dialog.setAttribute("open", "");
    }
}

dialogClose?.addEventListener("click", () => {
    dialog.close();
});

dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
});

init();
