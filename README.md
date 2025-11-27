# Donate Page

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
  - Crypto: BTC, ETH, SOL, USDT (TRC-20)

- **Supporters Wall**
  - Badge-style compact cards
  - Multi-currency display
  - Animated entry effects

- **Modern UI/UX**
  - Light & Dark mode (auto-switches at night)
  - Smooth animations & transitions
  - Fully responsive design

- **Internationalization (i18n)**
  - English, Simplified Chinese, Traditional Chinese
  - Japanese, Korean
  - French, German, Spanish, Italian

## Tech Stack

| Category | Technology |
|----------|------------|
| Markup | HTML5 |
| Styling | CSS3 (Variables, Flexbox, Grid, Animations) |
| Logic | Vanilla JavaScript (ES6+) |
| Icons | Font Awesome 6 |
| Fonts | Inter, Playfair Display |

## Project Structure

```
donate/
├── index.html          # Main donation page
├── supporters.html     # Supporters wall
├── css/
│   └── style.css       # All styles (light/dark themes)
├── js/
│   ├── config.js       # Configuration (addresses, social links)
│   └── app.js          # Main application logic
├── .gitignore
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
python3 -m http.server 8080
# or
npx serve .
```

3. Open http://localhost:8080 in your browser.

## Configuration

Edit `js/config.js` to customize:

```javascript
window.DONATE_CONFIG = {
    // Site info
    site: {
        name: 'Your Name',
        title: 'Support Me | Buy Me a Coffee'
    },
    
    // Social links
    social: {
        blog: { url: 'https://your-blog.com', ... },
        twitter: { url: 'https://x.com/your_handle', ... },
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
    
    // Mock supporters (for demo)
    mockSupporters: [
        { name: 'Supporter', amount: '10.00', currency: '$', colorIdx: 0 },
        // ...
    ]
};
```

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Chiloh** - [@chilohwei](https://github.com/chilohwei)

- Blog: [blog.chiloh.com](https://blog.chiloh.com)
- Twitter: [@chiloh_wei](https://x.com/chiloh_wei)

