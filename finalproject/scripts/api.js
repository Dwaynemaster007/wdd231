/**
 * CryptoPulse data layer
 * Primary: CoinGecko public markets API
 * Fallback: local JSON module when the network request fails
 */

import fallbackCoins from "../data/coins.mjs";

const API_URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false";

/**
 * Fetch market data. Uses try/catch for robust async error handling.
 * @returns {Promise<{coins: Array, source: string}>}
 */
export async function fetchMarketData() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("API returned empty data");
        }

        return {
            coins: data.map(normalizeCoin),
            source: "CoinGecko API (live)",
        };
    } catch (error) {
        console.warn("Live API failed, using local fallback:", error.message);
        return {
            coins: fallbackCoins.map(normalizeCoin),
            source: "Local fallback data",
        };
    }
}

function normalizeCoin(coin) {
    return {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image,
        current_price: coin.current_price,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        market_cap: coin.market_cap,
        total_volume: coin.total_volume,
        market_cap_rank: coin.market_cap_rank,
        high_24h: coin.high_24h ?? null,
        low_24h: coin.low_24h ?? null,
    };
}

export function formatPrice(value) {
    if (value == null || Number.isNaN(value)) return "—";
    if (value >= 1) {
        return value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
        });
    }
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 6,
    });
}

export function formatCompact(value) {
    if (value == null || Number.isNaN(value)) return "—";
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 2,
    }).format(value);
}

export function formatChange(value) {
    if (value == null || Number.isNaN(value)) return "—";
    const sign = value > 0 ? "+" : "";
    return `${sign}${value.toFixed(2)}%`;
}
