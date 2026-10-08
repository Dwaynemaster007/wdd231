/** Watchlist helpers using localStorage */

const STORAGE_KEY = "cryptopulse-watchlist";

export function getWatchlist() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function saveWatchlist(ids) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function isWatched(id) {
    return getWatchlist().includes(id);
}

export function toggleWatch(id) {
    const list = getWatchlist();
    const index = list.indexOf(id);
    if (index === -1) {
        list.push(id);
    } else {
        list.splice(index, 1);
    }
    saveWatchlist(list);
    return list.includes(id);
}

export function clearWatchlist() {
    localStorage.removeItem(STORAGE_KEY);
}
