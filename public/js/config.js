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
            network: 'SegWit',
            address: 'bc1qpqchzes0wrhtg5h2rwvh3f6tf5weljetx2adun',
            note: 'Native SegWit (BIP84 P2WPKH).',
            icon: 'fa-brands fa-bitcoin',
            color: 'btc'
        },
        btcTaproot: {
            name: 'BTC',
            network: 'Taproot',
            address: 'bc1pa26d29z4y0elcg0s3qraddusd5kuyqkpm3jqyy5ve69sjt07x7fst7dzfm',
            note: 'Taproot (BIP86 key-path only).',
            icon: 'fa-brands fa-bitcoin',
            color: 'btc'
        },
        eth: {
            name: 'ETH',
            network: 'EVM',
            address: '0x797A13aB0398eef748cF6D8C518b0803a14918b1',
            note: 'Same 0x on ETH, BSC, Polygon, Arb, OP, Base, Avalanche C-Chain, etc. USDT ERC-20 / BEP-20 — pick the chain in your wallet.',
            icon: 'fa-brands fa-ethereum',
            color: 'eth'
        },
        sol: {
            name: 'SOL',
            address: 'GXTtMhJvbpmdrqSz5x65Hzd6wia5YYwaHdnxCB3PC1HY',
            note: 'SLIP-0010 Ed25519; Phantom-compatible. USDT SPL shares this address.',
            icon: 'fa-solid fa-sun',
            color: 'sol'
        },
        usdtSpl: {
            name: 'USDT',
            network: 'SPL',
            address: 'GXTtMhJvbpmdrqSz5x65Hzd6wia5YYwaHdnxCB3PC1HY',
            note: 'Solana SPL only — not Tron TRC-20.',
            icon: 'fa-solid fa-dollar-sign',
            color: 'usdt'
        },
        usdtTron: {
            name: 'USDT',
            network: 'TRC-20',
            address: 'TQeEKzMRvAUXEU5tsiPR1GX8WUHdhKUhwg',
            note: 'Tron network only — different chain from Solana / EVM.',
            icon: 'fa-solid fa-bolt',
            color: 'trx'
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

