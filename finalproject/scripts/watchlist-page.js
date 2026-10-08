import { fetchMarketData, formatPrice, formatCompact, formatChange } from "./api.js";
import { getWatchlist, toggleWatch, clearWatchlist } from "./storage.js";

const grid = document.querySelector("#watchlist-grid");
const statusEl = document.querySelector("#watchlist-status");
const clearBtn = document.querySelector("#clear-watchlist");

async function init() {
    const ids = getWatchlist();

    if (ids.length === 0) {
        statusEl.textContent = "Your watchlist is empty.";
        grid.innerHTML = `
            <div class="empty-state content-card wide">
                <p>No coins saved yet.</p>
                <p><a class="action action-fill" href="index.html">Browse the market</a></p>
            </div>
        `;
        return;
    }

    statusEl.textContent = "Loading watched coins…";

    const { coins, source } = await fetchMarketData();
    const watched = coins.filter((c) => ids.includes(c.id));
    const missing = ids.filter((id) => !watched.some((c) => c.id === id));

    statusEl.textContent = `${watched.length} coin(s) on your watchlist · ${source}`;
    if (missing.length) {
        statusEl.textContent += ` · ${missing.length} saved id(s) not in current top list`;
    }

    grid.innerHTML = "";

    if (watched.length === 0) {
        grid.innerHTML = `
            <div class="empty-state content-card wide">
                <p>Saved coins are not in the current market snapshot.</p>
                <p><a class="action action-fill" href="index.html">Back to market</a></p>
            </div>
        `;
        return;
    }

    watched.forEach((coin) => {
        const change = coin.price_change_percentage_24h;
        const changeClass = change >= 0 ? "positive" : "negative";
        const card = document.createElement("article");
        card.className = "coin-card";
        card.innerHTML = `
            <div class="coin-top">
                <img src="${coin.image}" alt="${coin.name} logo" width="40" height="40" loading="lazy">
                <div class="coin-info">
                    <h3>${coin.name}</h3>
                    <span class="symbol">${coin.symbol}</span>
                </div>
                <span class="coin-change ${changeClass}">${formatChange(change)}</span>
            </div>
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
                <button type="button" class="action action-quiet action-compact remove-btn" data-id="${coin.id}">Remove</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

grid.addEventListener("click", (event) => {
    const removeBtn = event.target.closest(".remove-btn");
    if (!removeBtn) return;
    toggleWatch(removeBtn.dataset.id);
    init();
});

clearBtn?.addEventListener("click", () => {
    clearWatchlist();
    init();
});

init();
