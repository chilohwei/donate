/**
 * Donate Page - Configuration
 * 
 * Edit this file to customize your donation page.
 * All configurable options are centralized here for easy maintenance.
 */

window.DONATE_CONFIG = {
    // ========================================
    // Site Information
    // ========================================
    site: {
        name: 'Chiloh',
        title: 'Support Chiloh | Buy Me a Coffee ☕',
        description: 'Support my creative work with a donation.',
        author: 'Chiloh',
        // Optional: absolute URL to a 1200×630 image for Open Graph / Twitter cards
        ogImage: '',
        // Optional: full URLs for <link rel="canonical"> (per-page, set both when using)
        canonicalDonate: '',
        canonicalSupporters: ''
    },

    // ========================================
    // Social Links
    // ========================================
    social: {
        blog: {
            url: 'https://blog.chiloh.com',
            label: 'Blog',
            icon: 'fa-solid fa-blog'
        },
        twitter: {
            url: 'https://x.com/chiloh_wei',
            label: 'Twitter',
            icon: 'fa-brands fa-x-twitter'
        },
        github: {
            url: 'https://github.com/chilohwei',
            label: 'GitHub',
            icon: 'fa-brands fa-github'
        },
        email: {
            url: 'mailto:me@chiloh.com',
            label: 'Email',
            icon: 'fa-solid fa-envelope'
        }
    },

    // ========================================
    // Payment Methods - QR Codes
    // ========================================
    payment: {
        wechat: {
            qr: 'img/wechat.webp',
            hintKey: 'scanWechat'
        },
        alipay: {
            qr: 'img/alipay.webp',
            hintKey: 'scanAlipay'
        },
        paypal: {
            qr: 'img/paypal.webp',
            hintKey: 'scanPaypal'
        }
    },

    // ========================================
    // Crypto Addresses
    // ========================================
    // Four rows cover most donors: on-chain BTC, EVM family (+ ERC/BEP USDT), Tron USDT, Solana (+ SPL USDT same addr).
    crypto: {
        btc: {
            name: 'BTC',
            address: 'bc1qpqchzes0wrhtg5h2rwvh3f6tf5weljetx2adun',
            note: 'Bitcoin on-chain (SegWit).',
            icon: 'fa-brands fa-bitcoin',
            color: 'btc'
        },
        eth: {
            name: 'EVM',
            network: '0x',
            address: '0x797A13aB0398eef748cF6D8C518b0803a14918b1',
            note: 'Same address on ETH / BSC / Polygon / Arb / OP / Base / Avax C-Chain, etc. Choose network & token (e.g. USDT) in your wallet.',
            icon: 'fa-brands fa-ethereum',
            color: 'eth'
        },
        usdtTron: {
            name: 'USDT',
            network: 'TRC-20',
            address: 'TQeEKzMRvAUXEU5tsiPR1GX8WUHdhKUhwg',
            note: 'Tron only — not the same as EVM or Solana.',
            icon: 'fa-solid fa-bolt',
            color: 'trx'
        },
        sol: {
            name: 'Solana',
            address: 'GXTtMhJvbpmdrqSz5x65Hzd6wia5YYwaHdnxCB3PC1HY',
            note: 'SOL & USDT SPL use this address (Phantom / Solana wallets).',
            icon: 'fa-solid fa-sun',
            color: 'sol'
        }
    },

    // ========================================
    // Theme Settings
    // ========================================
    theme: {
        // Used when prefers-color-scheme is unavailable: treat as night (dark) between these hours
        nightStart: 18,
        nightEnd: 6
    },

    // ========================================
    // Language Settings
    // ========================================
    language: {
        // Fallback if no navigator.languages entry matches. UI language follows browser list only (no manual picker).
        default: 'en',
        supported: ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'fr', 'de', 'es', 'it']
    },

    // ========================================
    // Supporters wall — data file (edit supporters.json, then deploy)
    // ========================================
    supporters: {
        // Relative to the HTML page URL (same directory by default)
        dataUrl: 'supporters.json',
        // Optional: extra currency codes treated as crypto on the supporters wall (uppercase), e.g. ['WBTC']
        cryptoCurrencyCodes: []
    },

    // ========================================
    // Avatar Color Palettes
    // Used for generating random avatar backgrounds
    // ========================================
    avatarColors: [
        ['#f97316', '#ea580c'], // Orange
        ['#3b82f6', '#2563eb'], // Blue
        ['#10b981', '#059669'], // Green
        ['#8b5cf6', '#7c3aed'], // Purple
        ['#ec4899', '#db2777'], // Pink
        ['#f59e0b', '#d97706'], // Amber
        ['#06b6d4', '#0891b2'], // Cyan
        ['#6366f1', '#4f46e5'], // Indigo
        ['#ef4444', '#dc2626'], // Red
        ['#84cc16', '#65a30d']  // Lime
    ]
};

(function donateInjectHeadMeta() {
    if (typeof document === 'undefined') return;
    const site = window.DONATE_CONFIG && window.DONATE_CONFIG.site;
    if (!site) return;

    if (site.ogImage) {
        const og = document.createElement('meta');
        og.setAttribute('property', 'og:image');
        og.setAttribute('content', site.ogImage);
        document.head.appendChild(og);
        const twImg = document.createElement('meta');
        twImg.name = 'twitter:image';
        twImg.content = site.ogImage;
        document.head.appendChild(twImg);
        const twCard = document.querySelector('meta[name="twitter:card"]');
        if (twCard) twCard.setAttribute('content', 'summary_large_image');
    }

    if (typeof location === 'undefined' || !location.pathname) return;
    const isSupporters = /supporters\.html$/i.test(location.pathname);
    const canonical = isSupporters ? site.canonicalSupporters : site.canonicalDonate;
    if (canonical) {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = canonical;
        document.head.appendChild(link);
    }
})();


