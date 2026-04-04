/**
 * Donate Page - Application Logic
 * Supporter list is loaded from supporters.json (see config.js supporters.dataUrl).
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
        themeKey: SITE_CONFIG.theme?.storageKey || 'donate_theme',
        langKey: SITE_CONFIG.language?.storageKey || 'donate_lang',
        supportedLangs: SITE_CONFIG.language?.supported || ['en'],
        defaultLang: SITE_CONFIG.language?.default || 'en',
        nightStart: SITE_CONFIG.theme?.nightStart || 18,
        nightEnd: SITE_CONFIG.theme?.nightEnd || 6
    };

    const LANG_LABELS = {
        en: 'English',
        'zh-CN': '简体中文',
        'zh-TW': '繁體中文',
        ja: '日本語',
        ko: '한국어',
        fr: 'Français',
        de: 'Deutsch',
        es: 'Español',
        it: 'Italiano'
    };

    // Avatar Color Palettes
    const AVATAR_COLORS = SITE_CONFIG.avatarColors || [
        ['#f97316', '#ea580c'],
        ['#3b82f6', '#2563eb']
    ];

    // i18n Translations
    const I18N = {
        en: {
            greeting: 'Hi, friend',
            headline: 'Support My Work',
            message: 'Every contribution helps keep projects and writing going.<br>Thank you for being here.',
            viewSupporters: 'View Supporters',
            wechat: 'WeChat', alipay: 'Alipay', paypal: 'PayPal', crypto: 'Crypto',
            scanWechat: 'Scan with WeChat', scanAlipay: 'Scan with Alipay', scanPaypal: 'Scan with PayPal',
            backHome: 'Back',
            supportersTitle: 'Supporters Wall',
            supportersNote: 'Unranked · Updated every Friday',
            supportersEmpty: 'No supporters on the wall yet—thank you for considering support.',
            supportersLoadError: 'Unable to load supporter data. Please try again later.',
            beSupporter: 'Become a Supporter',
            fundsTitle: 'Where Your Support Goes',
            fundServer: 'Server & Hosting',
            fundServerDesc: 'Keep the blog and projects running 24/7',
            fundResearch: 'Research & Tools',
            fundResearchDesc: 'APIs, software, and learning resources',
            fundContent: 'Content Creation',
            fundContentDesc: 'More tutorials, articles, and open source',
            fundCoffee: 'Coffee & Energy',
            fundCoffeeDesc: 'Fuel for late-night coding sessions',
            switchToDark: 'Switch to dark mode',
            switchToLight: 'Switch to light mode',
            payMethodTabs: 'Payment methods',
            languageMenu: 'Language',
            copyAddressFailed: 'Could not copy address',
            addressCopied: 'Address copied!',
            copyCryptoAddress: 'Copy address',
            qrAlt: 'Payment QR code'
        },
        'zh-CN': {
            greeting: 'Hi, 朋友',
            headline: '支持我的创作',
            message: '每一份支持都能让项目与内容走得更远。<br>感谢你的停留与心意。',
            viewSupporters: '查看支持者',
            wechat: '微信', alipay: '支付宝', paypal: 'PayPal', crypto: '加密货币',
            scanWechat: '打开微信扫一扫', scanAlipay: '打开支付宝扫一扫', scanPaypal: '打开 PayPal 扫一扫',
            backHome: '返回',
            supportersTitle: '支持者墙',
            supportersNote: '排名不分先后 · 每周五手动更新',
            supportersEmpty: '墙上还没有支持者—感谢你愿意考虑支持。',
            supportersLoadError: '无法加载支持者数据，请稍后重试。',
            beSupporter: '成为支持者',
            fundsTitle: '款项用途',
            fundServer: '服务器托管',
            fundServerDesc: '保持博客和项目 24/7 在线运行',
            fundResearch: '研究与工具',
            fundResearchDesc: 'API 服务、软件订阅和学习资源',
            fundContent: '内容创作',
            fundContentDesc: '更多教程、文章和开源项目',
            fundCoffee: '咖啡续命',
            fundCoffeeDesc: '深夜写代码的能量来源',
            switchToDark: '切换到深色模式',
            switchToLight: '切换到浅色模式',
            payMethodTabs: '支付方式',
            languageMenu: '语言',
            copyAddressFailed: '无法复制地址',
            addressCopied: '地址已复制！',
            copyCryptoAddress: '复制地址',
            qrAlt: '付款二维码'
        },
        'zh-TW': {
            greeting: 'Hi, 朋友',
            headline: '支持我的創作',
            message: '每一份支持都能讓專案與內容走得更遠。<br>感謝你的停留與心意。',
            viewSupporters: '查看支持者',
            wechat: '微信', alipay: '支付寶', paypal: 'PayPal', crypto: '加密貨幣',
            scanWechat: '打開微信掃一掃', scanAlipay: '打開支付寶掃一掃', scanPaypal: '打開 PayPal 掃一掃',
            backHome: '返回',
            supportersTitle: '支持者牆',
            supportersNote: '排名不分先後 · 每週五手動更新',
            supportersEmpty: '牆上還沒有支持者—感謝你願意考慮支持。',
            supportersLoadError: '無法載入支持者資料，請稍後再試。',
            beSupporter: '成為支持者',
            fundsTitle: '款項用途',
            fundServer: '伺服器託管',
            fundServerDesc: '保持部落格和專案 24/7 在線運行',
            fundResearch: '研究與工具',
            fundResearchDesc: 'API 服務、軟體訂閱和學習資源',
            fundContent: '內容創作',
            fundContentDesc: '更多教程、文章和開源專案',
            fundCoffee: '咖啡續命',
            fundCoffeeDesc: '深夜寫程式的能量來源',
            switchToDark: '切換到深色模式',
            switchToLight: '切換到淺色模式',
            payMethodTabs: '付款方式',
            languageMenu: '語言',
            copyAddressFailed: '無法複製地址',
            addressCopied: '地址已複製！',
            copyCryptoAddress: '複製地址',
            qrAlt: '付款 QR Code'
        },
        ja: {
            greeting: 'こんにちは',
            headline: '創作を支援する',
            message: 'ご支援はプロジェクトと発信を続ける力になります。<br>ここまで読んでくださりありがとうございます。',
            viewSupporters: 'サポーター一覧',
            wechat: 'WeChat', alipay: 'Alipay', paypal: 'PayPal', crypto: '暗号資産',
            scanWechat: 'WeChatでスキャン', scanAlipay: 'Alipayでスキャン', scanPaypal: 'PayPalでスキャン',
            backHome: '戻る',
            supportersTitle: 'サポーター',
            supportersNote: '順不同 · 毎週金曜日に更新',
            supportersEmpty: 'まだサポーターはいません—ご検討ありがとうございます。',
            supportersLoadError: 'サポーターデータを読み込めませんでした。後でもう一度お試しください。',
            beSupporter: 'サポーターになる',
            fundsTitle: 'ご支援の使い道',
            fundServer: 'サーバー・ホスティング',
            fundServerDesc: 'ブログとプロジェクトを24時間稼働',
            fundResearch: 'リサーチ・ツール',
            fundResearchDesc: 'API、ソフトウェア、学習リソース',
            fundContent: 'コンテンツ制作',
            fundContentDesc: 'チュートリアル、記事、オープンソース',
            fundCoffee: 'コーヒー代',
            fundCoffeeDesc: '深夜コーディングのエネルギー源',
            switchToDark: 'ダークモードに切り替え',
            switchToLight: 'ライトモードに切り替え',
            payMethodTabs: '支払い方法',
            languageMenu: '言語',
            copyAddressFailed: 'コピーできませんでした',
            addressCopied: 'アドレスをコピーしました！',
            copyCryptoAddress: 'アドレスをコピー',
            qrAlt: '決済QRコード'
        },
        ko: {
            greeting: '안녕하세요',
            headline: '제 작업 후원하기',
            message: '모든 후원은 프로젝트와 글을 이어가는 힘이 됩니다.<br>읽어 주셔서 감사합니다.',
            viewSupporters: '서포터 보기',
            wechat: 'WeChat', alipay: 'Alipay', paypal: 'PayPal', crypto: '크립토',
            scanWechat: 'WeChat으로 스캔', scanAlipay: 'Alipay로 스캔', scanPaypal: 'PayPal로 스캔',
            backHome: '뒤로',
            supportersTitle: '서포터',
            supportersNote: '순서 무관 · 매주 금요일 업데이트',
            supportersEmpty: '아직 서포터가 없습니다—후원을 고려해 주셔서 감사합니다.',
            supportersLoadError: '서포터 데이터를 불러올 수 없습니다. 나중에 다시 시도해 주세요.',
            beSupporter: '서포터 되기',
            fundsTitle: '후원금 사용처',
            fundServer: '서버 및 호스팅',
            fundServerDesc: '블로그와 프로젝트 24시간 운영',
            fundResearch: '연구 및 도구',
            fundResearchDesc: 'API, 소프트웨어, 학습 자료',
            fundContent: '콘텐츠 제작',
            fundContentDesc: '튜토리얼, 글, 오픈소스 프로젝트',
            fundCoffee: '커피 충전',
            fundCoffeeDesc: '밤새 코딩하는 에너지원',
            switchToDark: '다크 모드로 전환',
            switchToLight: '라이트 모드로 전환',
            payMethodTabs: '결제 수단',
            languageMenu: '언어',
            copyAddressFailed: '복사할 수 없습니다',
            addressCopied: '주소가 복사되었습니다!',
            copyCryptoAddress: '주소 복사',
            qrAlt: '결제 QR 코드'
        },
        fr: {
            greeting: 'Bonjour',
            headline: 'Soutenez mon travail',
            message: 'Chaque geste aide à faire vivre projets et contenus.<br>Merci d\'être passé(e) par ici.',
            viewSupporters: 'Voir les supporters',
            wechat: 'WeChat', alipay: 'Alipay', paypal: 'PayPal', crypto: 'Crypto',
            scanWechat: 'Scanner avec WeChat', scanAlipay: 'Scanner avec Alipay', scanPaypal: 'Scanner avec PayPal',
            backHome: 'Retour',
            supportersTitle: 'Supporters',
            supportersNote: 'Non classé · Mis à jour chaque vendredi',
            supportersEmpty: 'Pas encore de soutiens affichés—merci d\'envisager un don.',
            supportersLoadError: 'Impossible de charger les données. Veuillez réessayer plus tard.',
            beSupporter: 'Devenir supporter',
            fundsTitle: 'Utilisation des fonds',
            fundServer: 'Serveur et hébergement',
            fundServerDesc: 'Maintenir le blog et les projets 24/7',
            fundResearch: 'Recherche et outils',
            fundResearchDesc: 'APIs, logiciels et ressources',
            fundContent: 'Création de contenu',
            fundContentDesc: 'Tutoriels, articles et open source',
            fundCoffee: 'Café et énergie',
            fundCoffeeDesc: 'Carburant pour coder tard le soir',
            switchToDark: 'Passer en mode sombre',
            switchToLight: 'Passer en mode clair',
            payMethodTabs: 'Moyens de paiement',
            languageMenu: 'Langue',
            copyAddressFailed: 'Impossible de copier l\'adresse',
            addressCopied: 'Adresse copiée !',
            copyCryptoAddress: 'Copier l\'adresse'
        },
        de: {
            greeting: 'Hallo',
            headline: 'Unterstütze meine Arbeit',
            message: 'Jede Unterstützung hilft, Projekte und Texte am Laufen zu halten.<br>Danke, dass du hier bist.',
            viewSupporters: 'Unterstützer anzeigen',
            wechat: 'WeChat', alipay: 'Alipay', paypal: 'PayPal', crypto: 'Krypto',
            scanWechat: 'Mit WeChat scannen', scanAlipay: 'Mit Alipay scannen', scanPaypal: 'Mit PayPal scannen',
            backHome: 'Zurück',
            supportersTitle: 'Unterstützer',
            supportersNote: 'Nicht sortiert · Jeden Freitag aktualisiert',
            supportersEmpty: 'Noch keine Einträge—danke, dass du eine Unterstützung erwägst.',
            supportersLoadError: 'Unterstützerdaten konnten nicht geladen werden. Bitte später erneut versuchen.',
            beSupporter: 'Unterstützer werden',
            fundsTitle: 'Verwendung der Mittel',
            fundServer: 'Server & Hosting',
            fundServerDesc: 'Blog und Projekte rund um die Uhr betreiben',
            fundResearch: 'Forschung & Tools',
            fundResearchDesc: 'APIs, Software und Lernressourcen',
            fundContent: 'Inhaltserstellung',
            fundContentDesc: 'Tutorials, Artikel und Open Source',
            fundCoffee: 'Kaffee & Energie',
            fundCoffeeDesc: 'Treibstoff für nächtliche Coding-Sessions',
            switchToDark: 'Zum Dunkelmodus wechseln',
            switchToLight: 'Zum Hellmodus wechseln',
            payMethodTabs: 'Zahlungsmethoden',
            languageMenu: 'Sprache',
            copyAddressFailed: 'Adresse konnte nicht kopiert werden',
            addressCopied: 'Adresse kopiert!',
            copyCryptoAddress: 'Adresse kopieren'
        },
        es: {
            greeting: 'Hola',
            headline: 'Apoya mi trabajo',
            message: 'Cada aporte ayuda a mantener proyectos y contenido.<br>Gracias por pasarte por aquí.',
            viewSupporters: 'Ver seguidores',
            wechat: 'WeChat', alipay: 'Alipay', paypal: 'PayPal', crypto: 'Cripto',
            scanWechat: 'Escanear con WeChat', scanAlipay: 'Escanear con Alipay', scanPaypal: 'Escanear con PayPal',
            backHome: 'Volver',
            supportersTitle: 'Seguidores',
            supportersNote: 'Sin clasificar · Actualizado cada viernes',
            supportersEmpty: 'Aún no hay apoyos en el muro—gracias por plantearlo.',
            supportersLoadError: 'No se pudieron cargar los datos. Inténtalo más tarde.',
            beSupporter: 'Ser seguidor',
            fundsTitle: 'Uso de los fondos',
            fundServer: 'Servidor y alojamiento',
            fundServerDesc: 'Mantener el blog y proyectos 24/7',
            fundResearch: 'Investigación y herramientas',
            fundResearchDesc: 'APIs, software y recursos de aprendizaje',
            fundContent: 'Creación de contenido',
            fundContentDesc: 'Tutoriales, artículos y código abierto',
            fundCoffee: 'Café y energía',
            fundCoffeeDesc: 'Combustible para sesiones nocturnas',
            switchToDark: 'Modo oscuro',
            switchToLight: 'Modo claro',
            payMethodTabs: 'Métodos de pago',
            languageMenu: 'Idioma',
            copyAddressFailed: 'No se pudo copiar la dirección',
            addressCopied: '¡Dirección copiada!',
            copyCryptoAddress: 'Copiar dirección'
        },
        it: {
            greeting: 'Ciao',
            headline: 'Sostieni il mio lavoro',
            message: 'Ogni contributo aiuta progetti e contenuti.<br>Grazie per essere qui.',
            viewSupporters: 'Vedi sostenitori',
            wechat: 'WeChat', alipay: 'Alipay', paypal: 'PayPal', crypto: 'Crypto',
            scanWechat: 'Scansiona con WeChat', scanAlipay: 'Scansiona con Alipay', scanPaypal: 'Scansiona con PayPal',
            backHome: 'Indietro',
            supportersTitle: 'Sostenitori',
            supportersNote: 'Non classificato · Aggiornato ogni venerdì',
            supportersEmpty: 'Ancora nessun sostenitore in elenco—grazie per averlo considerato.',
            supportersLoadError: 'Impossibile caricare i dati. Riprova più tardi.',
            beSupporter: 'Diventa sostenitore',
            fundsTitle: 'Utilizzo dei fondi',
            fundServer: 'Server e hosting',
            fundServerDesc: 'Mantenere blog e progetti attivi 24/7',
            fundResearch: 'Ricerca e strumenti',
            fundResearchDesc: 'API, software e risorse di apprendimento',
            fundContent: 'Creazione di contenuti',
            fundContentDesc: 'Tutorial, articoli e open source',
            fundCoffee: 'Caffè ed energia',
            fundCoffeeDesc: 'Carburante per sessioni notturne',
            switchToDark: 'Tema scuro',
            switchToLight: 'Tema chiaro',
            payMethodTabs: 'Metodi di pagamento',
            languageMenu: 'Lingua',
            copyAddressFailed: 'Impossibile copiare l\'indirizzo',
            addressCopied: 'Indirizzo copiato!',
            copyCryptoAddress: 'Copia indirizzo'
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

    const getInitial = name => {
        if (!name) return 'A';
        const char = name.charAt(0);
        return /[\u4e00-\u9fa5]/.test(char) ? char : char.toUpperCase();
    };

    const getText = key => {
        const loc = I18N[currentLang] || I18N.en;
        return loc[key] || I18N.en[key] || key;
    };

    function sanitizeSupporterAvatarUrl(url) {
        if (typeof url !== 'string') return '';
        const raw = url.trim();
        if (!raw) return '';
        try {
            const u = new URL(raw, window.location.href);
            if (u.protocol === 'https:') return u.href;
            if (u.protocol === 'http:' && window.location.protocol === 'http:') return u.href;
            return '';
        } catch {
            return '';
        }
    }

    async function copyTextToClipboard(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                return true;
            }
        } catch (e) {
            console.warn('[donate] Clipboard API failed:', e);
        }
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            const ok = document.execCommand('copy');
            document.body.removeChild(ta);
            if (!ok) throw new Error('execCommand returned false');
            return true;
        } catch (e2) {
            console.error('[donate] Fallback copy failed:', e2);
            return false;
        }
    }

    function showToast(message) {
        let el = $('#appToast');
        if (!el) {
            el = document.createElement('div');
            el.id = 'appToast';
            el.className = 'app-toast';
            el.setAttribute('role', 'status');
            el.setAttribute('aria-live', 'polite');
            document.body.appendChild(el);
        }
        el.textContent = message;
        el.classList.add('visible');
        clearTimeout(showToast._t);
        showToast._t = setTimeout(() => el.classList.remove('visible'), 2800);
    }

    function updateCryptoRowsA11y() {
        $$('.crypto-row').forEach(row => {
            const name = row.dataset.coinName || '';
            row.setAttribute('aria-label', `${getText('copyCryptoAddress')}: ${name}`);
        });
    }

    function refreshChromeI18n() {
        updateThemeButton();
        const tablist = $('#payTablist');
        if (tablist) tablist.setAttribute('aria-label', getText('payMethodTabs'));
        const sel = $('#langSelect');
        if (sel) {
            sel.setAttribute('aria-label', getText('languageMenu'));
            if (CONFIG.supportedLangs.includes(currentLang)) sel.value = currentLang;
        }
        updateCryptoRowsA11y();

        const qrImg = $('#qrImage');
        if (qrImg) qrImg.alt = getText('qrAlt');
    }

    function initLanguageSwitcher() {
        const sel = $('#langSelect');
        if (!sel || sel.dataset.langInit === '1') return;
        sel.dataset.langInit = '1';
        sel.textContent = '';
        CONFIG.supportedLangs.forEach(code => {
            const opt = document.createElement('option');
            opt.value = code;
            opt.textContent = LANG_LABELS[code] || code;
            sel.appendChild(opt);
        });
        const lang = CONFIG.supportedLangs.includes(currentLang) ? currentLang : CONFIG.defaultLang;
        sel.value = lang;
        sel.addEventListener('change', () => {
            const v = sel.value;
            if (!CONFIG.supportedLangs.includes(v)) return;
            localStorage.setItem(CONFIG.langKey, v);
            applyLanguage(v);
        });
    }

    // Theme - Smart auto switching
    // Priority: 1) User manual choice  2) System prefers-color-scheme  3) Time-based fallback
    const darkMq = window.matchMedia('(prefers-color-scheme: dark)');

    function getAutoTheme() {
        // System preference is supported and has a value
        if (darkMq.media !== 'not all') return darkMq.matches ? 'dark' : 'light';
        // Fallback: time-based (night = dark)
        const h = new Date().getHours();
        return (h >= CONFIG.nightStart || h < CONFIG.nightEnd) ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        document.documentElement.dataset.theme = theme;
        // Update meta theme-color for mobile browser chrome
        let meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) { meta = document.createElement('meta'); meta.name = 'theme-color'; document.head.appendChild(meta); }
        meta.content = theme === 'dark' ? '#0a0a0a' : '#fefefe';
        updateThemeButton();
    }

    function initTheme() {
        const saved = localStorage.getItem(CONFIG.themeKey);
        applyTheme(saved || getAutoTheme());

        // React to system preference changes in real-time (only when no manual choice)
        darkMq.addEventListener('change', () => {
            if (!localStorage.getItem(CONFIG.themeKey)) applyTheme(getAutoTheme());
        });
    }

    function toggleTheme() {
        const current = document.documentElement.dataset.theme || getAutoTheme();
        const next = current === 'dark' ? 'light' : 'dark';
        // If new theme matches auto, clear manual override; otherwise save it
        if (next === getAutoTheme()) {
            localStorage.removeItem(CONFIG.themeKey);
        } else {
            localStorage.setItem(CONFIG.themeKey, next);
        }
        applyTheme(next);
    }

    function updateThemeButton() {
        const btn = $('#themeToggle');
        if (!btn) return;
        const icon = btn.querySelector('i');
        const isDark = (document.documentElement.dataset.theme || getAutoTheme()) === 'dark';
        if (icon) icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        btn.setAttribute('aria-label', isDark ? getText('switchToLight') : getText('switchToDark'));
    }

    // Language - detect from navigator.languages (full preference list)
    function detectLanguage() {
        const saved = localStorage.getItem(CONFIG.langKey);
        if (saved && CONFIG.supportedLangs.includes(saved)) return saved;

        // navigator.languages returns all user-preferred languages in order
        // e.g. ['zh-TW', 'zh', 'en-US', 'en', 'ja']
        const candidates = navigator.languages || [navigator.language];

        for (const lang of candidates) {
            // Chinese: distinguish zh-TW/zh-HK (Traditional) vs zh-CN/zh (Simplified)
            if (lang.startsWith('zh')) {
                return /TW|HK|Hant/i.test(lang) ? 'zh-TW' : 'zh-CN';
            }
            // Exact match first (e.g. 'ja' matches 'ja', 'ko' matches 'ko')
            const prefix = lang.split('-')[0];
            const match = CONFIG.supportedLangs.find(s => s === lang || s.split('-')[0] === prefix);
            if (match) return match;
        }
        return CONFIG.defaultLang;
    }

    function applyLanguage(lang) {
        currentLang = lang;
        const texts = I18N[lang] || I18N.en;

        $$('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const val = texts[key] || I18N.en[key];
            if (val) el.innerHTML = val;
        });

        $$('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            const val = texts[key] || I18N.en[key];
            if (val) el.placeholder = val;
        });

        document.documentElement.lang = lang;

        refreshChromeI18n();
    }

    // Render Social Links from config
    function renderSocialLinks() {
        const container = $('#socialLinks');
        if (!container || !SITE_CONFIG.social) return;
        
        container.innerHTML = '';
        Object.entries(SITE_CONFIG.social).forEach(([key, link]) => {
            const a = document.createElement('a');
            a.href = link.url;
            a.className = 'social-link';
            a.dataset.tooltip = link.label;
            a.dataset.brand = key;
            a.setAttribute('aria-label', link.label);
            if (!link.url.startsWith('mailto:')) {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            }
            a.innerHTML = `<i class="${link.icon}" aria-hidden="true"></i>`;
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
            row.dataset.coinName = coin.name;
            row.dataset.coin = coin.color;
            row.setAttribute('role', 'button');
            row.setAttribute('tabindex', '0');
            row.setAttribute('aria-label', `${getText('copyCryptoAddress')}: ${coin.name}`);
            
            const nameHtml = coin.network 
                ? `${coin.name} <span class="tag">${coin.network}</span>` 
                : coin.name;
            
            row.innerHTML = `
                <i class="${coin.icon} crypto-icon ${coin.color}" aria-hidden="true"></i>
                <div class="crypto-info">
                    <span class="crypto-name">${nameHtml}</span>
                    <code class="crypto-addr">${coin.address}</code>
                </div>
                <i class="fa-regular fa-copy copy-icon" aria-hidden="true"></i>
            `;
            container.appendChild(row);
        });
    }

    // Home Page — payment panel & crypto
    function initHomePage() {
        renderSocialLinks();
        renderCryptoAddresses();

        const payTabs = $$('.pay-tab');
        const payTablist = $('#payTablist');
        const qrStage = $('#qrStage');
        const cryptoStage = $('#cryptoStage');
        const paymentPanel = $('#payment-panel');
        const qrImage = $('#qrImage');
        const qrFrame = $('.qr-frame');
        const qrHint = $('#qrHint');

        if (!payTabs.length) return;

        const updateQr = id => {
            const payCfg = CONFIG.payment[id];
            if (!payCfg || !qrStage || !qrFrame || !qrImage || !qrHint) return;

            qrStage.dataset.type = id;

            qrFrame.classList.add('loading');
            qrImage.style.opacity = '0';

            const img = new Image();
            img.onload = () => {
                qrImage.src = payCfg.qr;
                qrImage.style.opacity = '1';
                qrFrame.classList.remove('loading');
            };
            img.src = payCfg.qr;

            qrHint.textContent = getText(payCfg.hintKey);
        };

        function setActivePayTab(activeId) {
            payTabs.forEach(t => {
                const on = t.dataset.id === activeId;
                t.classList.toggle('active', on);
                t.setAttribute('aria-selected', on ? 'true' : 'false');
                t.tabIndex = on ? 0 : -1;
            });
            const activeBtn = document.getElementById(`pay-tab-${activeId}`);
            if (paymentPanel && activeBtn) {
                paymentPanel.setAttribute('aria-labelledby', activeBtn.id);
            }
        }

        function activatePayTab(id) {
            setActivePayTab(id);
            if (id === 'crypto') {
                qrStage?.classList.add('hidden');
                cryptoStage?.classList.add('visible');
            } else {
                updateQr(id);
                qrStage?.classList.remove('hidden');
                cryptoStage?.classList.remove('visible');
            }
        }

        Object.values(CONFIG.payment).forEach(p => {
            const img = new Image();
            img.src = p.qr;
        });

        payTabs.forEach(tab => {
            tab.addEventListener('click', () => activatePayTab(tab.dataset.id));
        });

        payTablist?.addEventListener('keydown', e => {
            if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
            e.preventDefault();
            const tabs = [...payTabs];
            const i = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
            const dir = e.key === 'ArrowRight' ? 1 : -1;
            const next = (i + dir + tabs.length) % tabs.length;
            tabs[next].focus();
            activatePayTab(tabs[next].dataset.id);
        });

        const defaultPayId = CONFIG.payment.wechat ? 'wechat' : Object.keys(CONFIG.payment)[0];
        if (defaultPayId) {
            activatePayTab(defaultPayId);
        }

        async function onCryptoRowActivate(row) {
            const address = row.dataset.address;
            const icon = row.querySelector('.copy-icon');
            const ok = await copyTextToClipboard(address);
            if (!ok) {
                showToast(getText('copyAddressFailed'));
                return;
            }
            showToast(getText('addressCopied'));
            row.classList.add('copied');
            if (icon) icon.className = 'fa-solid fa-check copy-icon';
            setTimeout(() => {
                row.classList.remove('copied');
                if (icon) icon.className = 'fa-regular fa-copy copy-icon';
            }, 2000);
        }

        $$('.crypto-row').forEach(row => {
            row.addEventListener('click', () => { void onCryptoRowActivate(row); });
            row.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    void onCryptoRowActivate(row);
                }
            });
        });
    }

    function isValidSupporterRecord(s) {
        if (!s || typeof s !== 'object') return false;
        if (typeof s.name !== 'string') return false;
        return s.name.trim().length > 0;
    }

    async function loadSupportersFromJson() {
        const dataUrl = SITE_CONFIG.supporters?.dataUrl || 'supporters.json';
        const res = await fetch(dataUrl);
        if (!res.ok) {
            throw new Error(`${dataUrl}: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
            throw new Error(`${dataUrl}: root must be a JSON array`);
        }
        return data.filter(isValidSupporterRecord);
    }

    // Supporters Page
    async function initSupportersPage() {
        const grid = $('#supportersGrid');
        const emptyState = $('#emptyState');
        const emptyMsg = emptyState?.querySelector('.empty-message');
        const supporterCount = $('#supporterCount span');

        if (!grid) return;

        let stored = [];
        let loadError = false;
        try {
            stored = await loadSupportersFromJson();
        } catch (e) {
            console.error('[donate] Failed to load supporter list:', e);
            stored = [];
            loadError = true;
        }

        if (supporterCount) supporterCount.textContent = String(stored.length);

        if (stored.length === 0) {
            if (loadError && emptyMsg) {
                emptyMsg.textContent = getText('supportersLoadError');
            }
            emptyState?.classList.add('visible');
        } else {
            emptyState?.classList.remove('visible');
        }

        const fragment = document.createDocumentFragment();

        stored.forEach((s, index) => {
            const card = document.createElement('article');
            card.className = 'supporter-card';

            const displayName = s.name.trim();
            const colorIdx = s.colorIdx !== undefined ? s.colorIdx : (index % AVATAR_COLORS.length);
            const colors = AVATAR_COLORS[colorIdx];
            const avatarStyle = `--avatar-bg: linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;

            const avatarUrl = sanitizeSupporterAvatarUrl(s.avatar);
            const avatarHtml = avatarUrl
                ? `<div class="supporter-avatar"><img src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(displayName)}" width="32" height="32" loading="lazy"></div>`
                : `<div class="supporter-avatar" style="${avatarStyle}">${escapeHtml(getInitial(displayName))}</div>`;

            let amountHtml = '';
            if (s.amount && s.currency) {
                const cryptoCurrencies = ['BTC', 'ETH', 'SOL', 'USDT'];
                const isCrypto = cryptoCurrencies.includes(s.currency);
                const amountDisplay = isCrypto
                    ? `${s.amount} ${s.currency}`
                    : `${s.currency}${s.amount}`;
                const cryptoClass = isCrypto ? ' crypto' : '';
                amountHtml = `<span class="supporter-amount${cryptoClass}">${escapeHtml(amountDisplay)}</span>`;
            }

            card.innerHTML = `
                ${avatarHtml}
                <span class="supporter-name">${escapeHtml(displayName)}</span>
                ${amountHtml}
            `;
            fragment.appendChild(card);
        });

        grid.textContent = '';
        grid.appendChild(fragment);
    }

    // Init
    currentLang = detectLanguage();
    initTheme();

    function onReady() {
        $('#themeToggle')?.addEventListener('click', toggleTheme);
        initLanguageSwitcher();
        applyLanguage(currentLang);
        initHomePage();
        void initSupportersPage();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onReady);
    } else {
        onReady();
    }

    // System theme listener is now handled inside initTheme()

})();
