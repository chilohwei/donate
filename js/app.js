/**
 * Donate Page - Application Logic
 * With Dark Mode & Mock Data
 * 
 * Configuration is loaded from config.js (window.DONATE_CONFIG)
 */

(function() {
    'use strict';

    // Load configuration from config.js
    const SITE_CONFIG = window.DONATE_CONFIG || {};
    
    // Internal config shortcuts
    const CONFIG = {
        payment: SITE_CONFIG.payment || {},
        crypto: SITE_CONFIG.crypto || {},
        storageKey: SITE_CONFIG.supporters?.storageKey || 'donate_supporters',
        themeKey: SITE_CONFIG.theme?.storageKey || 'donate_theme',
        supportedLangs: SITE_CONFIG.language?.supported || ['en'],
        defaultLang: SITE_CONFIG.language?.default || 'en',
        nightStart: SITE_CONFIG.theme?.nightStart || 18,
        nightEnd: SITE_CONFIG.theme?.nightEnd || 6
    };

    // Avatar Color Palettes
    const AVATAR_COLORS = SITE_CONFIG.avatarColors || [
        ['#f97316', '#ea580c'],
        ['#3b82f6', '#2563eb']
    ];

    // Mock Supporters Data
    const MOCK_SUPPORTERS = SITE_CONFIG.mockSupporters || [];

    // i18n Translations
    const I18N = {
        en: {
            greeting: 'Hi, friend',
            headline: 'Thank You for Your Support',
            message: 'Every bit of kindness fuels my journey.<br>Your support makes creation meaningful.',
            viewSupporters: 'View Supporters',
            wechat: 'WeChat', alipay: 'Alipay',
            scanWechat: 'Scan with WeChat', scanAlipay: 'Scan with Alipay',
            doneDonate: 'I have donated',
            copy: 'Copy', copied: 'Copied!',
            leaveMarkDesc: 'Leave your mark',
            namePlaceholder: 'Your name (optional)',
            msgPlaceholder: 'Your message...',
            submit: 'Submit', skip: 'Skip', submitted: 'Sent!',
            backHome: 'Back',
            supportersTitle: 'Supporters Wall',
            supportersNote: 'Unranked · Updated every Friday',
            beSupporter: 'Become a Supporter',
            fundsTitle: 'Where Your Support Goes',
            fundServer: 'Server & Hosting',
            fundServerDesc: 'Keep the blog and projects running 24/7',
            fundResearch: 'Research & Tools',
            fundResearchDesc: 'APIs, software, and learning resources',
            fundContent: 'Content Creation',
            fundContentDesc: 'More tutorials, articles, and open source',
            fundCoffee: 'Coffee & Energy',
            fundCoffeeDesc: 'Fuel for late-night coding sessions'
        },
        'zh-CN': {
            greeting: 'Hi, 朋友',
            headline: '感谢你的支持',
            message: '每一份心意，都是我前行的动力。<br>你的支持让创作更有意义。',
            viewSupporters: '查看支持者',
            wechat: '微信', alipay: '支付宝',
            scanWechat: '打开微信扫一扫', scanAlipay: '打开支付宝扫一扫',
            doneDonate: '我已赞赏',
            copy: '复制', copied: '已复制!',
            leaveMarkDesc: '留下你的印记',
            namePlaceholder: '你的名字（可选）',
            msgPlaceholder: '想说的话...',
            submit: '提交', skip: '跳过', submitted: '已发送!',
            backHome: '返回',
            supportersTitle: '支持者墙',
            supportersNote: '排名不分先后 · 每周五手动更新',
            beSupporter: '成为支持者',
            fundsTitle: '款项用途',
            fundServer: '服务器托管',
            fundServerDesc: '保持博客和项目 24/7 在线运行',
            fundResearch: '研究与工具',
            fundResearchDesc: 'API 服务、软件订阅和学习资源',
            fundContent: '内容创作',
            fundContentDesc: '更多教程、文章和开源项目',
            fundCoffee: '咖啡续命',
            fundCoffeeDesc: '深夜写代码的能量来源'
        },
        'zh-TW': {
            greeting: 'Hi, 朋友',
            headline: '感謝你的支持',
            message: '每一份心意，都是我前行的動力。<br>你的支持讓創作更有意義。',
            viewSupporters: '查看支持者',
            wechat: '微信', alipay: '支付寶',
            scanWechat: '打開微信掃一掃', scanAlipay: '打開支付寶掃一掃',
            doneDonate: '我已贊賞',
            copy: '複製', copied: '已複製!',
            leaveMarkDesc: '留下你的印記',
            namePlaceholder: '你的名字（可選）',
            msgPlaceholder: '想說的話...',
            submit: '提交', skip: '跳過', submitted: '已發送!',
            backHome: '返回',
            supportersTitle: '支持者牆',
            supportersNote: '排名不分先後 · 每週五手動更新',
            beSupporter: '成為支持者',
            fundsTitle: '款項用途',
            fundServer: '伺服器託管',
            fundServerDesc: '保持部落格和專案 24/7 在線運行',
            fundResearch: '研究與工具',
            fundResearchDesc: 'API 服務、軟體訂閱和學習資源',
            fundContent: '內容創作',
            fundContentDesc: '更多教程、文章和開源專案',
            fundCoffee: '咖啡續命',
            fundCoffeeDesc: '深夜寫程式的能量來源'
        },
        ja: {
            greeting: 'こんにちは',
            headline: 'ご支援ありがとうございます',
            message: 'すべての優しさが私の旅の糧となります。<br>あなたのサポートが創作に意味を与えます。',
            viewSupporters: 'サポーター一覧',
            wechat: 'WeChat', alipay: 'Alipay',
            scanWechat: 'WeChatでスキャン', scanAlipay: 'Alipayでスキャン',
            doneDonate: '寄付しました',
            copy: 'コピー', copied: 'コピー済!',
            leaveMarkDesc: '足跡を残す',
            namePlaceholder: 'お名前（任意）',
            msgPlaceholder: 'メッセージ...',
            submit: '送信', skip: 'スキップ', submitted: '送信済!',
            backHome: '戻る',
            supportersTitle: 'サポーター',
            supportersNote: '順不同 · 毎週金曜日に更新',
            beSupporter: 'サポーターになる',
            fundsTitle: 'ご支援の使い道',
            fundServer: 'サーバー・ホスティング',
            fundServerDesc: 'ブログとプロジェクトを24時間稼働',
            fundResearch: 'リサーチ・ツール',
            fundResearchDesc: 'API、ソフトウェア、学習リソース',
            fundContent: 'コンテンツ制作',
            fundContentDesc: 'チュートリアル、記事、オープンソース',
            fundCoffee: 'コーヒー代',
            fundCoffeeDesc: '深夜コーディングのエネルギー源'
        },
        ko: {
            greeting: '안녕하세요',
            headline: '지원해 주셔서 감사합니다',
            message: '모든 친절함이 제 여정의 원동력이 됩니다.<br>당신의 지원이 창작에 의미를 부여합니다.',
            viewSupporters: '서포터 보기',
            wechat: 'WeChat', alipay: 'Alipay',
            scanWechat: 'WeChat으로 스캔', scanAlipay: 'Alipay로 스캔',
            doneDonate: '기부했습니다',
            copy: '복사', copied: '복사됨!',
            leaveMarkDesc: '흔적을 남기세요',
            namePlaceholder: '이름 (선택)',
            msgPlaceholder: '메시지...',
            submit: '제출', skip: '건너뛰기', submitted: '전송됨!',
            backHome: '뒤로',
            supportersTitle: '서포터',
            supportersNote: '순서 무관 · 매주 금요일 업데이트',
            beSupporter: '서포터 되기',
            fundsTitle: '후원금 사용처',
            fundServer: '서버 및 호스팅',
            fundServerDesc: '블로그와 프로젝트 24시간 운영',
            fundResearch: '연구 및 도구',
            fundResearchDesc: 'API, 소프트웨어, 학습 자료',
            fundContent: '콘텐츠 제작',
            fundContentDesc: '튜토리얼, 글, 오픈소스 프로젝트',
            fundCoffee: '커피 충전',
            fundCoffeeDesc: '밤새 코딩하는 에너지원'
        },
        fr: {
            greeting: 'Bonjour',
            headline: 'Merci pour votre soutien',
            message: 'Chaque geste de gentillesse alimente mon parcours.<br>Votre soutien donne un sens a la creation.',
            viewSupporters: 'Voir les supporters',
            wechat: 'WeChat', alipay: 'Alipay',
            scanWechat: 'Scanner avec WeChat', scanAlipay: 'Scanner avec Alipay',
            doneDonate: 'J\'ai fait un don',
            copy: 'Copier', copied: 'Copie!',
            leaveMarkDesc: 'Laissez votre marque',
            namePlaceholder: 'Votre nom (optionnel)',
            msgPlaceholder: 'Votre message...',
            submit: 'Envoyer', skip: 'Passer', submitted: 'Envoye!',
            backHome: 'Retour',
            supportersTitle: 'Supporters',
            supportersNote: 'Non classé · Mis à jour chaque vendredi',
            beSupporter: 'Devenir supporter',
            fundsTitle: 'Utilisation des fonds',
            fundServer: 'Serveur et hébergement',
            fundServerDesc: 'Maintenir le blog et les projets 24/7',
            fundResearch: 'Recherche et outils',
            fundResearchDesc: 'APIs, logiciels et ressources',
            fundContent: 'Création de contenu',
            fundContentDesc: 'Tutoriels, articles et open source',
            fundCoffee: 'Café et énergie',
            fundCoffeeDesc: 'Carburant pour coder tard le soir'
        },
        de: {
            greeting: 'Hallo',
            headline: 'Danke fur Ihre Unterstutzung',
            message: 'Jede Freundlichkeit treibt meine Reise an.<br>Ihre Unterstutzung gibt der Kreation Bedeutung.',
            viewSupporters: 'Unterstutzer anzeigen',
            wechat: 'WeChat', alipay: 'Alipay',
            scanWechat: 'Mit WeChat scannen', scanAlipay: 'Mit Alipay scannen',
            doneDonate: 'Ich habe gespendet',
            copy: 'Kopieren', copied: 'Kopiert!',
            leaveMarkDesc: 'Hinterlassen Sie Ihre Spur',
            namePlaceholder: 'Ihr Name (optional)',
            msgPlaceholder: 'Ihre Nachricht...',
            submit: 'Senden', skip: 'Uberspringen', submitted: 'Gesendet!',
            backHome: 'Zuruck',
            supportersTitle: 'Unterstutzer',
            supportersNote: 'Nicht sortiert · Jeden Freitag aktualisiert',
            beSupporter: 'Unterstutzer werden',
            fundsTitle: 'Verwendung der Mittel',
            fundServer: 'Server & Hosting',
            fundServerDesc: 'Blog und Projekte rund um die Uhr betreiben',
            fundResearch: 'Forschung & Tools',
            fundResearchDesc: 'APIs, Software und Lernressourcen',
            fundContent: 'Inhaltserstellung',
            fundContentDesc: 'Tutorials, Artikel und Open Source',
            fundCoffee: 'Kaffee & Energie',
            fundCoffeeDesc: 'Treibstoff fur nachtliche Coding-Sessions'
        },
        es: {
            greeting: 'Hola',
            headline: 'Gracias por tu apoyo',
            message: 'Cada gesto de amabilidad impulsa mi viaje.<br>Tu apoyo da significado a la creacion.',
            viewSupporters: 'Ver seguidores',
            wechat: 'WeChat', alipay: 'Alipay',
            scanWechat: 'Escanear con WeChat', scanAlipay: 'Escanear con Alipay',
            doneDonate: 'He donado',
            copy: 'Copiar', copied: 'Copiado!',
            leaveMarkDesc: 'Deja tu huella',
            namePlaceholder: 'Tu nombre (opcional)',
            msgPlaceholder: 'Tu mensaje...',
            submit: 'Enviar', skip: 'Saltar', submitted: 'Enviado!',
            backHome: 'Volver',
            supportersTitle: 'Seguidores',
            supportersNote: 'Sin clasificar · Actualizado cada viernes',
            beSupporter: 'Ser seguidor',
            fundsTitle: 'Uso de los fondos',
            fundServer: 'Servidor y alojamiento',
            fundServerDesc: 'Mantener el blog y proyectos 24/7',
            fundResearch: 'Investigación y herramientas',
            fundResearchDesc: 'APIs, software y recursos de aprendizaje',
            fundContent: 'Creación de contenido',
            fundContentDesc: 'Tutoriales, artículos y código abierto',
            fundCoffee: 'Café y energía',
            fundCoffeeDesc: 'Combustible para sesiones nocturnas'
        },
        it: {
            greeting: 'Ciao',
            headline: 'Grazie per il tuo supporto',
            message: 'Ogni gesto di gentilezza alimenta il mio viaggio.<br>Il tuo supporto da significato alla creazione.',
            viewSupporters: 'Vedi sostenitori',
            wechat: 'WeChat', alipay: 'Alipay',
            scanWechat: 'Scansiona con WeChat', scanAlipay: 'Scansiona con Alipay',
            doneDonate: 'Ho donato',
            copy: 'Copia', copied: 'Copiato!',
            leaveMarkDesc: 'Lascia il tuo segno',
            namePlaceholder: 'Il tuo nome (opzionale)',
            msgPlaceholder: 'Il tuo messaggio...',
            submit: 'Invia', skip: 'Salta', submitted: 'Inviato!',
            backHome: 'Indietro',
            supportersTitle: 'Sostenitori',
            supportersNote: 'Non classificato · Aggiornato ogni venerdì',
            beSupporter: 'Diventa sostenitore',
            fundsTitle: 'Utilizzo dei fondi',
            fundServer: 'Server e hosting',
            fundServerDesc: 'Mantenere blog e progetti attivi 24/7',
            fundResearch: 'Ricerca e strumenti',
            fundResearchDesc: 'API, software e risorse di apprendimento',
            fundContent: 'Creazione di contenuti',
            fundContentDesc: 'Tutorial, articoli e open source',
            fundCoffee: 'Caffè ed energia',
            fundCoffeeDesc: 'Carburante per sessioni notturne'
        }
    };

    // State
    let currentLang = CONFIG.defaultLang;

    // Utils
    const $ = s => document.querySelector(s);
    const $$ = s => document.querySelectorAll(s);

    const escapeHtml = str => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    };

    const formatDate = date => {
        const d = new Date(date);
        const pad = n => String(n).padStart(2, '0');
        return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };

    const getInitial = name => {
        if (!name) return 'A';
        const char = name.charAt(0);
        return /[\u4e00-\u9fa5]/.test(char) ? char : char.toUpperCase();
    };

    const getText = key => (I18N[currentLang] || I18N.en)[key] || key;

    // Theme - Time-based auto switching
    function isNightTime() {
        const hour = new Date().getHours();
        // Night time based on config (default: 18:00 - 06:00)
        return hour >= CONFIG.nightStart || hour < CONFIG.nightEnd;
    }

    function getAutoTheme() {
        return isNightTime() ? 'dark' : 'light';
    }

    function initTheme() {
        const saved = localStorage.getItem(CONFIG.themeKey);
        if (saved) {
            // User has manually set a preference
            document.documentElement.dataset.theme = saved;
        } else {
            // Auto theme based on time
            document.documentElement.dataset.theme = getAutoTheme();
        }
        updateThemeIcon();
        
        // Schedule theme check every hour
        scheduleThemeCheck();
    }

    function scheduleThemeCheck() {
        // Check every hour if no manual preference is set
        setInterval(() => {
            if (!localStorage.getItem(CONFIG.themeKey)) {
                const newTheme = getAutoTheme();
                if (document.documentElement.dataset.theme !== newTheme) {
                    document.documentElement.dataset.theme = newTheme;
                    updateThemeIcon();
                }
            }
        }, 60 * 60 * 1000); // Check every hour
    }

    function toggleTheme() {
        const current = document.documentElement.dataset.theme || getAutoTheme();
        const newTheme = current === 'dark' ? 'light' : 'dark';
        
        document.documentElement.dataset.theme = newTheme;
        localStorage.setItem(CONFIG.themeKey, newTheme);
        updateThemeIcon();
    }

    function resetToAutoTheme() {
        // Remove manual preference and use auto theme
        localStorage.removeItem(CONFIG.themeKey);
        document.documentElement.dataset.theme = getAutoTheme();
        updateThemeIcon();
    }

    function updateThemeIcon() {
        const btn = $('#themeToggle');
        if (!btn) return;
        
        const icon = btn.querySelector('i');
        const currentTheme = document.documentElement.dataset.theme || getAutoTheme();
        const isDark = currentTheme === 'dark';
        
        // Show sun icon in dark mode (to switch to light), moon icon in light mode (to switch to dark)
        icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    // Language
    function detectLanguage() {
        const saved = localStorage.getItem('donate_lang');
        if (saved && CONFIG.supportedLangs.includes(saved)) return saved;
        
        const browserLang = navigator.language;
        if (browserLang.startsWith('zh')) {
            return browserLang.includes('TW') || browserLang.includes('HK') ? 'zh-TW' : 'zh-CN';
        }
        for (const lang of CONFIG.supportedLangs) {
            if (browserLang.startsWith(lang.split('-')[0])) return lang;
        }
        return CONFIG.defaultLang;
    }

    function applyLanguage(lang) {
        currentLang = lang;
        const texts = I18N[lang] || I18N.en;
        
        $$('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (texts[key]) el.innerHTML = texts[key];
        });
        
        $$('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (texts[key]) el.placeholder = texts[key];
        });
        
        document.documentElement.lang = lang;
    }

    // Render Social Links from config
    function renderSocialLinks() {
        const container = $('#socialLinks');
        if (!container || !SITE_CONFIG.social) return;
        
        container.innerHTML = '';
        Object.values(SITE_CONFIG.social).forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.className = 'social-link';
            a.dataset.tooltip = link.label;
            if (!link.url.startsWith('mailto:')) {
                a.target = '_blank';
                a.rel = 'noopener';
            }
            a.innerHTML = `<i class="${link.icon}"></i>`;
            container.appendChild(a);
        });
    }

    // Render Crypto Addresses from config
    function renderCryptoAddresses() {
        const container = $('#cryptoStage');
        if (!container || !SITE_CONFIG.crypto) return;
        
        container.innerHTML = '';
        Object.values(SITE_CONFIG.crypto).forEach(coin => {
            const row = document.createElement('div');
            row.className = 'crypto-row';
            row.dataset.address = coin.address;
            
            const nameHtml = coin.network 
                ? `${coin.name} <span class="tag">${coin.network}</span>` 
                : coin.name;
            
            row.innerHTML = `
                <i class="${coin.icon} crypto-icon ${coin.color}"></i>
                <div class="crypto-info">
                    <span class="crypto-name">${nameHtml}</span>
                    <code class="crypto-addr">${coin.address}</code>
                </div>
                <i class="fa-regular fa-copy copy-icon"></i>
            `;
            container.appendChild(row);
        });
    }

    // Home Page
    function initHomePage() {
        // Render dynamic content from config
        renderSocialLinks();
        renderCryptoAddresses();
        
        const payTabs = $$('.pay-tab');
        const qrStage = $('#qrStage');
        const cryptoStage = $('#cryptoStage');
        const qrImage = $('#qrImage');
        const qrFrame = $('.qr-frame');
        const qrHint = $('#qrHint');
        
        // Theme toggle (works on both pages)
        const themeToggle = $('#themeToggle');
        themeToggle?.addEventListener('click', toggleTheme);
        
        if (!payTabs.length) return;

        // Preload QR images
        Object.values(CONFIG.payment).forEach(p => {
            const img = new Image();
            img.src = p.qr;
        });

        // Tab switching
        payTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const id = tab.dataset.id;
                payTabs.forEach(t => t.classList.toggle('active', t.dataset.id === id));

                if (id === 'crypto') {
                    qrStage.classList.add('hidden');
                    cryptoStage.classList.add('visible');
                } else {
                    const config = CONFIG.payment[id];
                    qrStage.dataset.type = id;
                    
                    // Loading state
                    qrFrame.classList.add('loading');
                    qrImage.style.opacity = '0';
                    
                    const img = new Image();
                    img.onload = () => {
                        qrImage.src = config.qr;
                        qrImage.style.opacity = '1';
                        qrFrame.classList.remove('loading');
                    };
                    img.src = config.qr;
                    
                    qrHint.textContent = getText(config.hintKey);
                    qrStage.classList.remove('hidden');
                    cryptoStage.classList.remove('visible');
                }
            });
        });

        // Init QR type
        qrStage.dataset.type = 'wechat';

        // Crypto copy
        $$('.crypto-row').forEach(row => {
            row.addEventListener('click', () => {
                const address = row.dataset.address;
                const icon = row.querySelector('.copy-icon');
                
                navigator.clipboard.writeText(address).then(() => {
                    row.classList.add('copied');
                    icon.className = 'fa-solid fa-check copy-icon';
                    
                    setTimeout(() => {
                        row.classList.remove('copied');
                        icon.className = 'fa-regular fa-copy copy-icon';
                    }, 2000);
                });
            });
        });
    }

    // Supporters Page
    function initSupportersPage() {
        const grid = $('#supportersGrid');
        const emptyState = $('#emptyState');
        const supporterCount = $('#supporterCount span');
        const pageCta = $('#pageCta');
        
        if (!grid) return;

        // Get stored supporters, merge with mock data if empty
        let stored = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]');
        
        // If no real supporters, use mock data
        if (stored.length === 0) {
            stored = MOCK_SUPPORTERS;
        }

        if (supporterCount) supporterCount.textContent = stored.length;

        emptyState?.classList.remove('visible');

        // Use fragment for better performance
        const fragment = document.createDocumentFragment();
        
        stored.forEach((s, index) => {
            const card = document.createElement('article');
            card.className = 'supporter-card';
            
            // Get avatar color
            const colorIdx = s.colorIdx !== undefined ? s.colorIdx : (index % AVATAR_COLORS.length);
            const colors = AVATAR_COLORS[colorIdx];
            const avatarStyle = `--avatar-bg: linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
            
            // Avatar
            const avatarHtml = s.avatar 
                ? `<div class="supporter-avatar"><img src="${s.avatar}" alt="${escapeHtml(s.name)}" loading="lazy"></div>`
                : `<div class="supporter-avatar" style="${avatarStyle}">${escapeHtml(getInitial(s.name))}</div>`;

            // Amount display - use currency from data
            let amountHtml = '';
            if (s.amount && s.currency) {
                const cryptoCurrencies = ['BTC', 'ETH', 'SOL', 'USDT'];
                const isCrypto = cryptoCurrencies.includes(s.currency);
                const amountDisplay = isCrypto 
                    ? `${s.amount} ${s.currency}`  // Crypto: "0.005 ETH"
                    : `${s.currency}${s.amount}`;  // Fiat: "¥88.00" or "$50.00"
                const cryptoClass = isCrypto ? ' crypto' : '';
                amountHtml = `<span class="supporter-amount${cryptoClass}">${escapeHtml(amountDisplay)}</span>`;
            }

            // Simplified badge layout: Avatar + Name + Amount
            card.innerHTML = `
                ${avatarHtml}
                <span class="supporter-name">${escapeHtml(s.name)}</span>
                ${amountHtml}
            `;
            fragment.appendChild(card);
        });
        
        grid.appendChild(fragment);
    }

    // Init
    initTheme();
    currentLang = detectLanguage();
    applyLanguage(currentLang);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initHomePage();
            initSupportersPage();
        });
    } else {
        initHomePage();
        initSupportersPage();
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (!localStorage.getItem(CONFIG.themeKey)) {
            updateThemeIcon();
        }
    });

})();
