import { access, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { extname, join } from 'node:path';

const jsFiles = [
  'public/js/config.js',
  'public/js/theme-boot.js',
  'public/js/app.js'
];

const supporterFiles = [
  'public/supporters.json',
  'supporters.example.json'
];

const errors = [];
let donateConfig;

function fail(message) {
  errors.push(message);
}

function checkNodeSyntax(file) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) {
    fail(`${file}: JavaScript syntax check failed\n${result.stderr || result.stdout}`);
  }
}

function isValidUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function isValidPaymentAsset(value) {
  if (typeof value !== 'string' || !value.trim()) return false;
  if (/^https?:\/\//i.test(value)) return isValidUrl(value);
  return !value.includes('\\') && !value.startsWith('/') && extname(value) !== '';
}

async function fileExists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

function isRelativeAsset(value) {
  return typeof value === 'string' && value.trim() && !/^[a-z][a-z0-9+.-]*:/i.test(value) && !value.startsWith('/');
}

function assertPlainObject(value, path) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    fail(`${path} must be an object`);
    return false;
  }
  return true;
}

function validateDonateConfig(config) {
  donateConfig = config;
  if (!assertPlainObject(config, 'DONATE_CONFIG')) return;

  if (assertPlainObject(config.site, 'site')) {
    ['name', 'title', 'description', 'author'].forEach(key => {
      if (typeof config.site[key] !== 'string' || !config.site[key].trim()) {
        fail(`site.${key} must be a non-empty string`);
      }
    });
    ['ogImage', 'canonicalDonate', 'canonicalSupporters'].forEach(key => {
      if (config.site[key] && !isValidUrl(config.site[key])) {
        fail(`site.${key} must be an absolute URL when set`);
      }
    });
  }

  if (assertPlainObject(config.social, 'social')) {
    Object.entries(config.social).forEach(([key, link]) => {
      if (!assertPlainObject(link, `social.${key}`)) return;
      if (typeof link.label !== 'string' || !link.label.trim()) {
        fail(`social.${key}.label must be a non-empty string`);
      }
      if (typeof link.icon !== 'string' || !link.icon.trim()) {
        fail(`social.${key}.icon must be a non-empty Font Awesome class string`);
      }
      const validUrl = typeof link.url === 'string' && (link.url.startsWith('mailto:') || isValidUrl(link.url));
      if (!validUrl) fail(`social.${key}.url must be an absolute URL or mailto link`);
    });
    if (!config.social.x && config.social.twitter) {
      fail('social.twitter is deprecated; add social.x and keep twitter only as a temporary fallback if needed');
    }
  }

  if (assertPlainObject(config.payment, 'payment')) {
    Object.entries(config.payment).forEach(([key, payment]) => {
      if (!assertPlainObject(payment, `payment.${key}`)) return;
      if (!isValidPaymentAsset(payment.qr)) fail(`payment.${key}.qr must be a valid relative asset path or absolute URL`);
      if (typeof payment.hintKey !== 'string' || !payment.hintKey.trim()) {
        fail(`payment.${key}.hintKey must be a non-empty string`);
      }
    });
  }

  if (assertPlainObject(config.theme, 'theme')) {
    ['nightStart', 'nightEnd'].forEach(key => {
      const value = config.theme[key];
      if (!Number.isInteger(value) || value < 0 || value > 23) {
        fail(`theme.${key} must be an integer from 0 to 23`);
      }
    });
  }

  if (assertPlainObject(config.crypto, 'crypto')) {
    Object.entries(config.crypto).forEach(([key, coin]) => {
      if (!assertPlainObject(coin, `crypto.${key}`)) return;
      ['name', 'address', 'icon', 'color'].forEach(field => {
        if (typeof coin[field] !== 'string' || !coin[field].trim()) {
          fail(`crypto.${key}.${field} must be a non-empty string`);
        }
      });
    });
  }

  if (assertPlainObject(config.language, 'language')) {
    if (!Array.isArray(config.language.supported) || config.language.supported.length === 0) {
      fail('language.supported must be a non-empty array');
    }
    if (!config.language.supported?.includes(config.language.default)) {
      fail('language.default must be included in language.supported');
    }
  }

  if (!Array.isArray(config.avatarColors) || config.avatarColors.length === 0) {
    fail('avatarColors must be a non-empty array');
  } else {
    config.avatarColors.forEach((pair, index) => {
      const validPair = Array.isArray(pair) && pair.length === 2 && pair.every(c => /^#[0-9a-f]{6}$/i.test(c));
      if (!validPair) fail(`avatarColors[${index}] must contain two hex colors`);
    });
  }
}

function validateSupporters(data, file, avatarColorCount) {
  if (!Array.isArray(data)) {
    fail(`${file}: root must be an array`);
    return;
  }

  const names = new Set();
  data.forEach((supporter, index) => {
    const path = `${file}[${index}]`;
    if (!assertPlainObject(supporter, path)) return;
    if (typeof supporter.name !== 'string' || !supporter.name.trim()) {
      fail(`${path}.name must be a non-empty string`);
    } else {
      const key = supporter.name.trim().toLowerCase();
      if (names.has(key)) fail(`${path}.name duplicates another supporter name`);
      names.add(key);
    }
    if (supporter.amount !== undefined && (typeof supporter.amount !== 'string' || !supporter.amount.trim())) {
      fail(`${path}.amount must be a non-empty string when set`);
    }
    if (supporter.currency !== undefined && (typeof supporter.currency !== 'string' || !supporter.currency.trim())) {
      fail(`${path}.currency must be a non-empty string when set`);
    }
    if ((supporter.amount === undefined) !== (supporter.currency === undefined)) {
      fail(`${path} must set amount and currency together`);
    }
    if (supporter.colorIdx !== undefined) {
      if (!Number.isInteger(supporter.colorIdx) || supporter.colorIdx < 0) {
        fail(`${path}.colorIdx must be a non-negative integer`);
      } else if (avatarColorCount && supporter.colorIdx >= avatarColorCount) {
        fail(`${path}.colorIdx must be less than avatarColors.length (${avatarColorCount})`);
      }
    }
    if (supporter.avatar !== undefined && !isValidUrl(supporter.avatar)) {
      fail(`${path}.avatar must be an absolute URL when set`);
    }
  });
}

async function validateRelativeAssets(config) {
  if (!config || typeof config !== 'object') return;
  if (config.payment && typeof config.payment === 'object') {
    for (const [key, payment] of Object.entries(config.payment)) {
      if (payment && isRelativeAsset(payment.qr)) {
        const file = join('public', payment.qr);
        if (!await fileExists(file)) fail(`payment.${key}.qr points to a missing file: ${file}`);
      }
    }
  }
  const dataUrl = config.supporters?.dataUrl;
  if (isRelativeAsset(dataUrl)) {
    const file = join('public', dataUrl);
    if (!await fileExists(file)) fail(`supporters.dataUrl points to a missing file: ${file}`);
  }
}

async function validateVersionConsistency() {
  const version = (await readFile('VERSION', 'utf8')).trim();
  const packageJson = JSON.parse(await readFile('package.json', 'utf8'));
  if (packageJson.version !== version) {
    fail(`package.json version (${packageJson.version}) must match VERSION (${version})`);
  }

  const readme = await readFile('README.md', 'utf8');
  if (!readme.includes(`version-${version}-`)) {
    fail(`README badge must include version-${version}-`);
  }

  for (const file of ['public/index.html', 'public/supporters.html']) {
    const html = await readFile(file, 'utf8');
    const assetVersions = [...html.matchAll(/[?&]v=([0-9]+\.[0-9]+\.[0-9]+)/g)].map(match => match[1]);
    if (assetVersions.length === 0) {
      fail(`${file} must include cache-busting ?v=${version} asset URLs`);
    }
    assetVersions.forEach(assetVersion => {
      if (assetVersion !== version) fail(`${file} asset version ${assetVersion} must match VERSION ${version}`);
    });
  }
}

for (const file of jsFiles) {
  checkNodeSyntax(file);
}

const configSource = await readFile('public/js/config.js', 'utf8');
globalThis.window = {};
globalThis.document = undefined;
globalThis.location = undefined;
await import(`data:text/javascript,${encodeURIComponent(configSource)}`);
validateDonateConfig(globalThis.window.DONATE_CONFIG);
await validateRelativeAssets(globalThis.window.DONATE_CONFIG);
await validateVersionConsistency();

const avatarColorCount = Array.isArray(donateConfig?.avatarColors) ? donateConfig.avatarColors.length : 0;

for (const file of supporterFiles) {
  try {
    const data = JSON.parse(await readFile(file, 'utf8'));
    validateSupporters(data, file, avatarColorCount);
  } catch (error) {
    fail(`${file}: ${error.message}`);
  }
}

if (errors.length) {
  console.error(errors.map(error => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log('validate ok');
