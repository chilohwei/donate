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
            qr: 'https://chilohdata.s3.bitiful.net/wechat.png',
            hintKey: 'scanWechat'
        },
        alipay: {
            qr: 'https://chilohdata.s3.bitiful.net/zfb.png',
            hintKey: 'scanAlipay'
        },
        paypal: {
            qr: 'https://s3.bitiful.net/chilohdata/uPic/paypal.jpg',
            hintKey: 'scanPaypal'
        }
    },

    // ========================================
    // Crypto Addresses
    // ========================================
    crypto: {
        btc: {
            name: 'BTC',
            address: 'bc1qm67zc7wvmft8facyzrdzwzjw3g44xql2jgkt2x',
            icon: 'fa-brands fa-bitcoin',
            color: 'btc'
        },
        eth: {
            name: 'ETH',
            address: '0x60d8E57244632C3D30E920B32241D2551e643547',
            icon: 'fa-brands fa-ethereum',
            color: 'eth'
        },
        sol: {
            name: 'SOL',
            address: 'Cud6QkndsBo2tD7RgZWqujtNa3SJk1srBNWMNh3vR2SQ',
            icon: 'fa-solid fa-sun',
            color: 'sol'
        },
        usdt: {
            name: 'USDT',
            network: 'TRC20',
            address: 'TFvA3o3TT3WEfdiHUuyioihMaSzjki9byX',
            icon: 'fa-solid fa-dollar-sign',
            color: 'usdt'
        }
    },

    // ========================================
    // Theme Settings
    // ========================================
    theme: {
        // Night mode time range (24-hour format)
        nightStart: 18,  // 6 PM
        nightEnd: 6,     // 6 AM
        // Storage key for theme preference
        storageKey: 'donate_theme'
    },

    // ========================================
    // Language Settings
    // ========================================
    language: {
        default: 'en',
        supported: ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'fr', 'de', 'es', 'it'],
        storageKey: 'donate_lang'
    },

    // ========================================
    // Supporters wall — data file (edit supporters.json, then deploy)
    // ========================================
    supporters: {
        // Relative to the HTML page URL (same directory by default)
        dataUrl: 'supporters.json'
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

