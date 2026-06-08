import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, mkdirSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve('public');
const outDir = resolve('screenshots');
const port = Number(process.env.PORT || 4173);
const host = '127.0.0.1';

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml; charset=utf-8'
};

let serverStarted = false;

function localPathFromUrl(url) {
  const pathname = new URL(url, `http://${host}:${port}`).pathname;
  const requested = pathname === '/' ? '/index.html' : pathname;
  const file = normalize(join(root, requested));
  if (!file.startsWith(root)) return '';
  return file;
}

const server = createServer(async (req, res) => {
  const file = localPathFromUrl(req.url || '/');
  if (!file || !existsSync(file)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, {
      'content-type': contentTypes[extname(file)] || 'application/octet-stream',
      'cache-control': 'no-store'
    });
    res.end(body);
  } catch {
    res.writeHead(500);
    res.end('Server error');
  }
});

async function listen() {
  await new Promise((resolveListen, rejectListen) => {
    server.once('error', rejectListen);
    server.listen(port, host, () => {
      serverStarted = true;
      server.off('error', rejectListen);
      resolveListen();
    });
  });
}

async function closeServer() {
  if (!serverStarted) return;
  await new Promise(resolveClose => {
    server.close(() => {
      serverStarted = false;
      resolveClose();
    });
  });
}

async function run() {
  let chromium;
  try {
    ({ chromium } = await import('@playwright/test'));
  } catch {
    throw new Error('Playwright is not installed. Run npm install first.');
  }

  await listen();
  mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const cases = [
    { name: 'home-desktop', path: '/', viewport: { width: 1440, height: 960 } },
    { name: 'home-mobile', path: '/', viewport: { width: 390, height: 844 } },
    { name: 'supporters-desktop', path: '/supporters.html', viewport: { width: 1440, height: 960 } },
    { name: 'supporters-mobile', path: '/supporters.html', viewport: { width: 390, height: 844 } }
  ];

  try {
    for (const testCase of cases) {
      const context = await browser.newContext({
        locale: 'en-US',
        viewport: testCase.viewport
      });
      const page = await context.newPage();
      const pageErrors = [];
      page.on('pageerror', error => pageErrors.push(error));

      await page.goto(`http://${host}:${port}${testCase.path}`, { waitUntil: 'networkidle' });
      if (pageErrors.length) throw pageErrors[0];

      const visibleText = await page.locator('body').innerText();
      if (!visibleText.trim()) throw new Error(`${testCase.name}: body rendered without text`);

      const brokenImages = await page.evaluate(() => {
        return [...document.images]
          .filter(img => img.complete && img.naturalWidth === 0)
          .map(img => img.currentSrc || img.src);
      });
      if (brokenImages.length) {
        throw new Error(`${testCase.name}: broken image(s): ${brokenImages.join(', ')}`);
      }

      await page.screenshot({ path: join(outDir, `${testCase.name}.png`), fullPage: true });

      if (testCase.path === '/') {
        const xHref = await page.locator('.social-link[data-brand="x"]').getAttribute('href');
        if (xHref !== 'https://x.com/chilohwei') {
          throw new Error(`${testCase.name}: X link mismatch (${xHref})`);
        }
        const qrLoaded = await page.locator('#qrImage').evaluate(img => img.complete && img.naturalWidth > 0);
        if (!qrLoaded) throw new Error(`${testCase.name}: initial QR image did not load`);

        await page.locator('.pay-tab[data-id="crypto"]').click();
        const rows = await page.locator('.crypto-row').count();
        if (rows === 0) throw new Error(`${testCase.name}: crypto rows did not render`);
        await page.screenshot({ path: join(outDir, `${testCase.name}-crypto.png`), fullPage: true });
      }

      await context.close();
    }
  } finally {
    await browser.close();
    await closeServer();
  }

  console.log(`visual smoke ok: ${outDir}`);
}

run().catch(error => {
  void closeServer();
  console.error(error.message);
  process.exit(1);
});
