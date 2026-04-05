# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2026-04-05

### Changed

- Deployment switched to **Cloudflare Workers Builds** (dashboard-connected CI/CD); GitHub Actions deploy job removed.
- CI now runs validation only (JSON + JS syntax checks) on push and PR.
- README deployment docs updated accordingly.

## [1.0.2] - 2026-04-05

### Changed

- QR images migrated from remote S3 to **`public/img/`** (same-origin, WebP, −59% size): zero cross-origin overhead, edge-served by Workers.
- Removed infinite `cardBreathe` animation on payment card — reduces GPU compositing load.
- Supporter cards and fund items now enter via **IntersectionObserver** instead of hard-coded `nth-child` animation delays.
- Font Awesome consolidated to single `all.min.css`; external stylesheets (FA + Google Fonts) loaded **non-blocking** (`media="print" onload`).
- `prefers-reduced-motion` rule enhanced: suppresses `scroll-behavior`, `animation-iteration-count`, and background `will-change`.

### Added

- `public/js/theme-boot.js` — shared FOUC-prevention + early `<html lang>` detection, replacing duplicated inline scripts in both HTML files.
- Smooth **theme transition** on OS light/dark switch (`theme-transitioning` class → 0.4 s crossfade).
- QR switch **crossfade** with `imgShowsQrAlready()` skip — no flash when returning to the already-displayed image.
- `focus-visible` outlines on pay tabs, crypto rows, CTA buttons, and back button.
- Toast gets `backdrop-filter: blur` + spring easing.
- Icon class and crypto accent **allow-list sanitisation** (`sanitizeFontAwesomeClasses`, `sanitizeCryptoRowAccent`).
- Supporter wall crypto codes extended (TRX, BNB, MATIC, …) with config override `supporters.cryptoCurrencyCodes`.
- `twitter:card` auto-upgraded to `summary_large_image` when `site.ogImage` is set.
- CI step: `node --check` on all three JS files.
- `<noscript>` bilingual (EN + CN) on both pages.
- `<link rel="prefetch">` between the two pages for faster navigation.

### Removed

- Dead i18n keys: `switchToDark`, `switchToLight`, `languageMenu` (no longer in UI).
- External S3 image URLs and related `donateInjectQrHints` preconnect/preload IIFE.
- Separate Font Awesome CSS files (fontawesome + solid + regular + brands → single `all.min.css`).

### Fixed

- Meta description / keywords / OG now match current crypto lineup (EVM 0x, TRC-20, Solana) instead of legacy "BTC, ETH, SOL, USDT".
- `twitter:description` synced with `og:description` on index page.
- Missing `qrAlt` translations added for FR, DE, ES, IT.
- `zh-TW` `qrLoadError` corrected to Traditional Chinese.

## [1.0.1] - 2026-04-04

### Changed

- Crypto deposit addresses updated (BTC SegWit & Taproot, EVM 0x, Solana, USDT SPL / TRC-20) with per-row **network** tags and **`note`** hints in config.
- TRON **USDT (TRC-20)** row with dedicated styling (`--trx`); SegWit BTC row labeled vs Taproot.

### Added

- Optional `note` on `crypto` entries; rendered as `.crypto-hint` under the address (escaped for safety).

## [1.0.0] - 2026-04-04

### Added

- Donation page with WeChat, Alipay, PayPal QR tabs and crypto address list (copy + toast).
- Supporters wall driven by `public/supporters.json` with empty / load-error states and example template at repo root.
- Nine-language i18n, theme toggle (system / time fallback / manual), language switcher.
- Accessibility: tab roles and keyboard navigation for payment methods, ARIA on controls and crypto rows.
- Optional Open Graph / Twitter image and canonical URLs via `public/js/config.js` `site.*`.
- GitHub Actions: validate `supporters.json`; deploy to Cloudflare Workers on push to `main` (`cloudflare/wrangler-action`).
- `VERSION` file and this changelog.

### Changed

- Static assets live under `public/`; Workers config serves only `./public` (repo root files are not publicly exposed).
- Social link hover colors use `data-brand` keys instead of tooltip text; crypto row styles use `data-coin` (no `:has()` dependency).
- README documents local dev (`serve public`), structure, and required GitHub secrets for deploy.

### Fixed

- Supporter fetch uses normal HTTP caching; loading failure shows a distinct message vs. empty wall.
- Mobile safe-area padding for supporters page no longer overridden by a duplicate media rule.
- QR hero image no longer uses `loading="lazy"` (above-the-fold).

### Removed

- Unused modal / form / legacy toast CSS.

[1.0.3]: https://github.com/chilohwei/donate/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/chilohwei/donate/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/chilohwei/donate/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/chilohwei/donate/releases/tag/v1.0.0
