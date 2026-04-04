# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[1.0.1]: https://github.com/chilohwei/donate/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/chilohwei/donate/releases/tag/v1.0.0
