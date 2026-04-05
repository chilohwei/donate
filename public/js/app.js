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
            payMethodTabs: 'Payment methods',
            copyAddressFailed: 'Could not copy address',
            addressCopied: 'Address copied!',
            copyCryptoAddress: 'Copy address',
            qrAlt: 'Payment QR code',
            qrLoadError: 'Could not load QR code image'
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
            payMethodTabs: '支付方式',
            copyAddressFailed: '无法复制地址',
            addressCopied: '地址已复制！',
            copyCryptoAddress: '复制地址',
            qrAlt: '付款二维码',
            qrLoadError: '二维码图片加载失败'
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
            payMethodTabs: '付款方式',
            copyAddressFailed: '無法複製地址',
            addressCopied: '地址已複製！',
            copyCryptoAddress: '複製地址',
            qrAlt: '付款 QR Code',
            qrLoadError: '二維碼圖片載入失敗'
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
            payMethodTabs: '支払い方法',
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
            payMethodTabs: '결제 수단',
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
            payMethodTabs: 'Moyens de paiement',
            copyAddressFailed: 'Impossible de copier l\'adresse',
            addressCopied: 'Adresse copiée !',
            copyCryptoAddress: 'Copier l\'adresse',
            qrAlt: 'Code QR de paiement'
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
            payMethodTabs: 'Zahlungsmethoden',
            copyAddressFailed: 'Adresse konnte nicht kopiert werden',
            addressCopied: 'Adresse kopiert!',
            copyCryptoAddress: 'Adresse kopieren',
            qrAlt: 'Zahlungs-QR-Code'
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
            payMethodTabs: 'Métodos de pago',
            copyAddressFailed: 'No se pudo copiar la dirección',
            addressCopied: '¡Dirección copiada!',
            copyCryptoAddress: 'Copiar dirección',
            qrAlt: 'Código QR de pago'
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
            payMethodTabs: 'Metodi di pagamento',
            copyAddressFailed: 'Impossibile copiare l\'indirizzo',
            addressCopied: 'Indirizzo copiato!',
            copyCryptoAddress: 'Copia indirizzo',
            qrAlt: 'Codice QR di pagamento'
        }
    };

    // State
    let currentLang = CONFIG.defaultLang;

    // Utils
    const $ = s => document.querySelector(s);
    const $$ = s => document.querySelectorAll(s);

    function absoluteUrl(url) {
        if (typeof url !== 'string' || !url) return '';
        try {
            return new URL(url, window.location.href).href;
        } catch {
            return '';
        }
    }

    function imgShowsQrAlready(imgEl, qrUrl) {
        if (!imgEl || !qrUrl) return false;
        const want = absoluteUrl(qrUrl);
        if (!want) return false;
        const have = imgEl.currentSrc || imgEl.src;
        if (!have) return false;
        try {
            return new URL(have, window.location.href).href === want;
        } catch {
            return false;
        }
    }

    const escapeHtml = str => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    };

    const FA_CLASS_PART = /^fa-[a-z0-9-]+$/i;
    const CRYPTO_ROW_ACCENT = new Set(['btc', 'eth', 'sol', 'usdt', 'trx']);

    function sanitizeFontAwesomeClasses(classString) {
        if (typeof classString !== 'string') return 'fa-solid fa-link';
        const parts = classString.trim().split(/\s+/).filter(p => FA_CLASS_PART.test(p));
        return parts.length ? parts.join(' ') : 'fa-solid fa-link';
    }

    function sanitizeCryptoRowAccent(raw) {
        if (typeof raw !== 'string') return '';
        const t = raw.trim().toLowerCase();
        return CRYPTO_ROW_ACCENT.has(t) ? t : '';
    }

    function getSupporterCryptoCodes() {
        const defaults = [
            'BTC', 'ETH', 'SOL', 'USDT', 'TRX', 'BNB', 'MATIC', 'POL', 'AVAX', 'DOGE', 'LTC'
        ];
        const set = new Set(defaults);
        const extra = SITE_CONFIG.supporters?.cryptoCurrencyCodes;
        if (Array.isArray(extra)) {
            extra.forEach(c => {
                if (typeof c !== 'string') return;
                const u = c.trim().toUpperCase();
                if (u) set.add(u);
            });
        }
        return set;
    }

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

    function refreshUiI18n() {
        const tablist = $('#payTablist');
        if (tablist) tablist.setAttribute('aria-label', getText('payMethodTabs'));
        updateCryptoRowsA11y();
        const qrImg = $('#qrImage');
        if (qrImg) qrImg.alt = getText('qrAlt');
    }

    // Theme — follows OS light/dark (prefers-color-scheme). Same pattern as color-scheme-aware OS / PWAs.
    // Falls back to time-based night when the media query is unavailable (rare).
    const darkMq = window.matchMedia('(prefers-color-scheme: dark)');

    function getAutoTheme() {
        if (darkMq.media !== 'not all') return darkMq.matches ? 'dark' : 'light';
        const h = new Date().getHours();
        return (h >= CONFIG.nightStart || h < CONFIG.nightEnd) ? 'dark' : 'light';
    }

    function applyTheme(theme, animate) {
        const root = document.documentElement;
        if (animate) {
            root.classList.add('theme-transitioning');
            setTimeout(() => root.classList.remove('theme-transitioning'), 500);
        }
        root.dataset.theme = theme;
        let meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = 'theme-color';
            document.head.appendChild(meta);
        }
        meta.content = theme === 'dark' ? '#0a0a0a' : '#fefefe';
    }

    function initTheme() {
        applyTheme(getAutoTheme(), false);
        darkMq.addEventListener('change', () => {
            applyTheme(getAutoTheme(), true);
        });
    }

    // Language — first match from navigator.languages (BCP 47 order per MDN). No localStorage: always tracks browser/OS preference list.
    function detectLanguage() {
        const candidates = navigator.languages || [navigator.language];

        for (const lang of candidates) {
            if (lang.startsWith('zh')) {
                return /TW|HK|Hant/i.test(lang) ? 'zh-TW' : 'zh-CN';
            }
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

        refreshUiI18n();
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
            a.innerHTML = `<i class="${sanitizeFontAwesomeClasses(link.icon)}" aria-hidden="true"></i>`;
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
            const labelParts = [coin.name, coin.network].filter(Boolean);
            row.dataset.coinName = labelParts.join(' ');
            const accent = sanitizeCryptoRowAccent(coin.color);
            if (accent) row.dataset.coin = accent;
            row.setAttribute('role', 'button');
            row.setAttribute('tabindex', '0');
            const ariaExtra = coin.note ? ` — ${coin.note}` : '';
            row.setAttribute('aria-label', `${getText('copyCryptoAddress')}: ${labelParts.join(' ')}${ariaExtra}`);

            const nameHtml = coin.network
                ? `${escapeHtml(coin.name)} <span class="tag">${escapeHtml(coin.network)}</span>`
                : escapeHtml(coin.name);
            const noteHtml = coin.note
                ? `<p class="crypto-hint">${escapeHtml(coin.note)}</p>`
                : '';

            const iconClasses = sanitizeFontAwesomeClasses(coin.icon);
            row.innerHTML = `
                <i class="${iconClasses} crypto-icon${accent ? ` ${accent}` : ''}" aria-hidden="true"></i>
                <div class="crypto-info">
                    <span class="crypto-name">${nameHtml}</span>
                    <code class="crypto-addr">${escapeHtml(coin.address)}</code>
                    ${noteHtml}
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
            qrHint.textContent = getText(payCfg.hintKey);

            if (imgShowsQrAlready(qrImage, payCfg.qr)) {
                qrFrame.classList.remove('loading');
                qrImage.style.opacity = '1';
                return;
            }

            qrFrame.classList.add('loading');
            qrImage.style.opacity = '0';

            const img = new Image();
            const finishOk = () => {
                qrImage.src = payCfg.qr;
                qrImage.style.opacity = '1';
                qrFrame.classList.remove('loading');
            };
            img.onload = () => {
                if (typeof img.decode === 'function') {
                    img.decode().then(finishOk).catch(finishOk);
                } else {
                    finishOk();
                }
            };
            img.onerror = () => {
                console.error('[donate] QR image failed to load:', payCfg.qr);
                qrFrame.classList.remove('loading');
                qrImage.style.opacity = '1';
                showToast(getText('qrLoadError'));
            };
            img.src = payCfg.qr;
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
                qrStage?.setAttribute('aria-hidden', 'true');
                cryptoStage?.classList.add('visible');
                cryptoStage?.setAttribute('aria-hidden', 'false');
            } else {
                updateQr(id);
                qrStage?.classList.remove('hidden');
                qrStage?.setAttribute('aria-hidden', 'false');
                cryptoStage?.classList.remove('visible');
                cryptoStage?.setAttribute('aria-hidden', 'true');
            }
        }

        Object.values(CONFIG.payment).forEach(p => {
            new Image().src = p.qr;
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
        const supporterCryptoCodes = getSupporterCryptoCodes();

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
                const cur = String(s.currency).toUpperCase();
                const isCrypto = supporterCryptoCodes.has(cur);
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

        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                });
            }, { rootMargin: '40px 0px', threshold: 0.1 });
            grid.querySelectorAll('.supporter-card').forEach(card => io.observe(card));
        } else {
            grid.querySelectorAll('.supporter-card').forEach(card => card.classList.add('visible'));
        }
    }

    function observeScrollReveal() {
        if (!('IntersectionObserver' in window)) {
            $$('.funds-usage, .page-cta, .fund-item').forEach(el => el.classList.add('visible'));
            return;
        }
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            });
        }, { rootMargin: '60px 0px', threshold: 0.1 });
        $$('.funds-usage, .page-cta, .fund-item').forEach(el => io.observe(el));
    }

    // Init
    currentLang = detectLanguage();
    initTheme();

    function onReady() {
        applyLanguage(currentLang);
        initHomePage();
        void initSupportersPage();
        observeScrollReveal();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onReady);
    } else {
        onReady();
    }

})();
