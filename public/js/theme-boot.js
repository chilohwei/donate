/**
 * Early boot: theme (FOUC) + html[lang] before CSS/app.js.
 * Must load immediately after config.js. Logic mirrors app.js getAutoTheme + detectLanguage.
 */
(function () {
    'use strict';
    try {
        var cfg = window.DONATE_CONFIG || {};
        var t = cfg.theme;
        var nightStart = t && t.nightStart != null ? t.nightStart : 18;
        var nightEnd = t && t.nightEnd != null ? t.nightEnd : 6;
        var mq = window.matchMedia('(prefers-color-scheme: dark)');
        var dark = mq.media !== 'not all'
            ? mq.matches
            : (function () {
                var h = new Date().getHours();
                return h >= nightStart || h < nightEnd;
            })();
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');

        var meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'theme-color');
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', dark ? '#0a0a0a' : '#fefefe');

        var langCfg = cfg.language || {};
        var supported = langCfg.supported || ['en'];
        var defaultLang = langCfg.default || 'en';
        var candidates = navigator.languages || [navigator.language || defaultLang];
        var initialLang = defaultLang;

        for (var i = 0; i < candidates.length; i++) {
            var lang = candidates[i];
            if (!lang) continue;
            if (lang.indexOf('zh') === 0) {
                initialLang = /TW|HK|Hant/i.test(lang) ? 'zh-TW' : 'zh-CN';
                break;
            }
            var prefix = lang.split('-')[0];
            var matched = null;
            for (var j = 0; j < supported.length; j++) {
                var s = supported[j];
                if (s === lang || s.split('-')[0] === prefix) {
                    matched = s;
                    break;
                }
            }
            if (matched) {
                initialLang = matched;
                break;
            }
        }
        document.documentElement.lang = initialLang;
    } catch (e) {
        console.error('[donate] theme-boot:', e);
    }
})();
