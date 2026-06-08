# Donate Page

![Version](https://img.shields.io/badge/version-1.0.4-22c55e?style=flat-square)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Font Awesome](https://img.shields.io/badge/Font%20Awesome-528DD7?logo=fontawesome&logoColor=white)](https://fontawesome.com/)

A beautiful, modern donation page with multiple payment methods and a supporters wall.

![Light Mode](https://img.shields.io/badge/Theme-Light-f9fafb?style=flat-square)
![Dark Mode](https://img.shields.io/badge/Theme-Dark-1f2937?style=flat-square)
![Responsive](https://img.shields.io/badge/Responsive-Yes-10b981?style=flat-square)
![i18n](https://img.shields.io/badge/Languages-9-8b5cf6?style=flat-square)

## Features

- **Multiple Payment Methods**
  - WeChat Pay (QR Code)
  - Alipay (QR Code)
  - PayPal (QR Code)
  - Crypto: Bitcoin (SegWit), EVM (0x address / multi-chain), USDT (TRC-20), Solana (+ SPL USDT)

- **Supporters Wall**
  - Badge-style compact cards
  - Multi-currency display
  - Animated entry effects

- **Modern UI/UX**
  - Light & dark follow **`prefers-color-scheme`** (OS/browser setting); optional time-based fallback when unsupported
  - Smooth animations & transitions
  - Fully responsive design

- **Internationalization (i18n)**
  - Language follows **`navigator.languages`** (first supported locale; zh split to `zh-CN` / `zh-TW` by script hint)
  - English, Simplified Chinese, Traditional Chinese, Japanese, Korean, French, German, Spanish, Italian

## Tech Stack

| Category | Technology |
|----------|------------|
| Markup | HTML5 |
| Styling | CSS3 (Variables, Flexbox, Grid, `content-visibility`, Animations) |
| Logic | Vanilla JavaScript (ES6+) |
| Icons | Font Awesome 6 (fontawesome + solid + regular + brands CSS) |
| Fonts | Inter, Playfair Display |

## Project Structure

```
donate/
├── public/                     # Served by Cloudflare Workers (static assets)
│   ├── index.html
│   ├── supporters.html
│   ├── supporters.json
│   ├── css/style.css
│   └── js/config.js, theme-boot.js, app.js
├── supporters.example.json
├── VERSION                     # SemVer (bump + sync HTML ?v= query + badge when releasing)
├── CHANGELOG.md
├── .github/workflows/ci.yml    # validate supporters.json; deploy Workers on push to main
├── wrangler.jsonc
├── .gitignore
├── LICENSE
└── README.md
```

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/chilohwei/donate.git
cd donate
```

2. Start a local server:
```bash
npm run dev
# or
python3 -m http.server 8080 -d public
```

3. Open http://localhost:8080 in your browser.

## Continuous deployment (Cloudflare Workers)

Deployment is handled by **Cloudflare Workers Builds** (connected via the Cloudflare dashboard). Pushes to `main` auto-deploy.

GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) runs **validation only** via `npm run validate`: supporter data schema checks, donation config checks, and `node --check` on all JS files. Pull requests and pushes to `main` both trigger validation.

Run the same checks locally:

```bash
npm run validate
```

Optional visual smoke checks use Playwright and write screenshots to `screenshots/`:

```bash
npm install
npm run test:visual
```

## Configuration

Edit `public/js/config.js` to customize:

```javascript
window.DONATE_CONFIG = {
    // Site info (ogImage + canonical* inject <meta>/<link> when set — see head load of config.js)
    site: {
        name: 'Your Name',
        title: 'Support Me | Buy Me a Coffee',
        ogImage: '',
        canonicalDonate: '',
        canonicalSupporters: ''
    },
    
    // Social links
    social: {
        blog: { url: 'https://your-blog.com', ... },
        x: { url: 'https://x.com/your_handle', ... },
        // ...
    },
    
    // Payment QR codes
    payment: {
        wechat: { qr: 'https://your-wechat-qr.png' },
        alipay: { qr: 'https://your-alipay-qr.png' }
    },
    
    // Crypto addresses
    crypto: {
        btc: { address: 'your-btc-address', ... },
        eth: { address: 'your-eth-address', ... },
        // ...
    },
    
    // Optional: supporters.json URL and extra crypto ticker codes for wall styling
    supporters: {
        dataUrl: 'supporters.json',
        cryptoCurrencyCodes: []
    }
};
```

Edit **`public/supporters.json`** after you confirm a payment (see **`supporters.example.json`**). Each entry:

| Field | Required | Notes |
|-------|----------|--------|
| `name` | yes | Display name; use `"Anonymous"` if needed |
| `amount` | no | String, e.g. `"88.00"` |
| `currency` | no | Fiat prefix: `"$"`, `"¥"`, `"€"` or crypto codes: `"BTC"`, `"ETH"`, `"SOL"`, `"USDT"`, `"TRX"`, etc. (see `supporters.cryptoCurrencyCodes` in config for extras) |
| `colorIdx` | no | `0`–`9` for avatar gradient (see `avatarColors` in config) |
| `avatar` | no | Image URL for photo avatar |

Omit `amount` / `currency` to show name only.

## Screenshots

### Light Mode
<img src="https://img.shields.io/badge/Preview-Light%20Mode-fef3c7?style=for-the-badge" alt="Light Mode">

### Dark Mode
<img src="https://img.shields.io/badge/Preview-Dark%20Mode-292524?style=for-the-badge" alt="Dark Mode">

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome | Latest |
| Firefox | Latest |
| Safari | Latest |
| Edge | Latest |

## Release Checklist

1. Update `VERSION`, `package.json`, cache-busting `?v=` query strings in HTML, and the README version badge.
2. Update `CHANGELOG.md` with user-facing changes.
3. Run `npm run validate`.
4. Run `npm run test:visual` and review the screenshots in `screenshots/`.
5. Commit the release changes, tag the version, and push to `main` so Cloudflare Workers Builds can deploy.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Chiloh** - [@chilohwei](https://github.com/chilohwei)

- Blog: [blog.chiloh.com](https://blog.chiloh.com)
- X: [@chilohwei](https://x.com/chilohwei)
