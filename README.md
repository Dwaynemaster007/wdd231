# WDD 231: Web Frontend Development I

Coursework for **WDD 231 at BYU-Idaho** by Thubelihle Dlamini. It covers responsive layouts, JavaScript modules, the Fetch API, JSON data, forms and web accessibility.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

## Projects

| Project | Folder | Description |
| --- | --- | --- |
| **Course home page** | [`/`](index.html) | My WDD 231 home page with a filterable list of courses and credits |
| **Manzini Chamber of Commerce** | [`chamber/`](chamber/) | A multi-page chamber site with a member directory (grid and list views from JSON), a discover page of Eswatini attractions, a join form and a thank-you page |
| **CryptoPulse** (final project) | [`finalproject/`](finalproject/) | A live cryptocurrency market tracker using the [CoinGecko API](https://www.coingecko.com/en/api), with a watchlist saved in `localStorage`, a learn page and a contact form. [Demo video](https://youtu.be/0N6VPPflo58) |
| **Latter-day prophets** | [`prophets.html`](prophets.html) | Cards built from a remote JSON file with the Fetch API |
| **Week 04 lab** | [`week04/`](week04/) | Temple appointment form exercise |

## Features

- Responsive, mobile-first layouts built with CSS Grid and Flexbox
- ES modules and asynchronous `fetch` calls with error handling
- Data rendered dynamically from JSON files and third-party APIs
- `localStorage` for saving visits and watchlists
- Form handling with URL query parameters on the thank-you pages
- Accessible markup with semantic HTML, alt text and good colour contrast
- Lazy-loaded images in `webp` format

## Run locally

This is a static site, so there's nothing to install.

```bash
git clone https://github.com/Dwaynemaster007/wdd231.git
cd wdd231
npx serve .
```

Then open the address it prints. You can also use the VS Code **Live Server** extension. Pages that use ES modules or `fetch` need a local server and won't work from `file://`.

## Author

**Thubelihle Dlamini**, [GitHub](https://github.com/Dwaynemaster007) · [LinkedIn](https://linkedin.com/in/thubelihledlamini)
