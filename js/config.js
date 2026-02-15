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
        author: 'Chiloh'
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
    // Supporters Settings
    // ========================================
    supporters: {
        storageKey: 'donate_supporters'
    },

    // ========================================
    // Supporters Data
    // Manually update after confirming payment.
    // Set to empty array [] if no supporters yet.
    // 
    // Fields:
    //   name     - Supporter name
    //   amount   - Numeric amount (string)
    //   currency - Currency: '$', '¥', '€', 'BTC', 'ETH', 'SOL', 'USDT'
    //   colorIdx - Avatar color index (0-9)
    // ========================================
    mockSupporters: [
        { name: 'Alex Chen', amount: '50.00', currency: '$', colorIdx: 0 },
        { name: '小明', amount: '88.00', currency: '¥', colorIdx: 1 },
        { name: 'Sarah K.', amount: '0.005', currency: 'ETH', colorIdx: 2 },
        { name: '田中太郎', amount: '5000', currency: '¥', colorIdx: 3 },
        { name: 'Mike J.', amount: '0.001', currency: 'BTC', colorIdx: 4 },
        { name: '李华', amount: '66.00', currency: '¥', colorIdx: 5 },
        { name: 'Emma W.', amount: '25.00', currency: '$', colorIdx: 6 },
        { name: '王小红', amount: '128.00', currency: '¥', colorIdx: 7 },
        { name: 'David L.', amount: '2', currency: 'SOL', colorIdx: 8 },
        { name: 'Sophie M.', amount: '20.00', currency: '€', colorIdx: 9 },
        { name: '김민수', amount: '50', currency: 'USDT', colorIdx: 0 },
        { name: 'Anonymous', amount: '15.00', currency: '$', colorIdx: 1 }
    ],

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

