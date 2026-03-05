#!/usr/bin/env node
/**
 * TopBroker CRM Crawler — Authenticated exploration via Playwright
 *
 * Usage: TB_EMAIL=x TB_PASSWORD=y node crawl.js [--headed]
 *
 * Captures:
 *   raw/har/         — HAR files per navigation group
 *   raw/pages/       — Inertia page props (JSON) per route
 *   raw/screenshots/ — PNG screenshots of key pages
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'https://apps.topbrokercrm.com';
const EMAIL = process.env.TB_EMAIL;
const PASSWORD = process.env.TB_PASSWORD;
const HEADED = process.argv.includes('--headed');

if (!EMAIL || !PASSWORD) {
  console.error('Usage: TB_EMAIL=x TB_PASSWORD=y node crawl.js [--headed]');
  process.exit(1);
}

// Directories
const DIRS = ['raw/har', 'raw/pages', 'raw/screenshots'];
DIRS.forEach(d => fs.mkdirSync(path.join(__dirname, d), { recursive: true }));

// Pages to visit — grouped by priority
// Each entry: [route_path, friendly_name]
const PAGES = [
  // Core entity list pages (capture Inertia props = field schemas)
  ['/dashboard', 'dashboard'],
  ['/leads', 'leads-index'],
  ['/leads/create', 'leads-create'],
  ['/agents', 'agents-index'],
  ['/agents/create', 'agents-create'],
  ['/agencies', 'agencies-index'],
  ['/buckets', 'buckets-index'],
  ['/buckets/create', 'buckets-create'],

  // Sales
  ['/agency_carriers', 'carriers-index'],
  ['/lead-sources', 'lead-sources-index'],
  ['/rr_groups', 'round-robin-index'],
  ['/sale-sharing/mount', 'sale-sharing'],
  ['/leaderboard', 'leaderboard'],

  // Communication
  ['/text-inbox', 'text-inbox'],
  ['/email-campaigns', 'email-campaigns'],
  ['/text-campaigns', 'text-campaigns'],
  ['/email-blasts', 'email-blasts'],
  ['/email-templates', 'email-templates'],
  ['/text-templates', 'text-templates'],
  ['/voicemail-scripts', 'voicemail-scripts'],
  ['/email-signature', 'email-signature'],
  ['/text-signature', 'text-signature'],

  // Automation
  ['/automations', 'automations-index'],
  ['/automations/create', 'automations-create'],
  ['/action-schedules', 'action-schedules'],
  ['/user-automations', 'user-automations'],
  ['/autoresponders_sequence', 'autoresponders-sequence'],

  // Commission & Finance
  ['/commission-statements', 'commission-statements'],
  ['/admin/commission-statements', 'admin-commission-statements'],
  ['/balance-management', 'balance-management'],

  // Recruiting
  ['/recruiting-leads', 'recruiting-leads'],
  ['/recruiting-sources', 'recruiting-sources'],
  ['/recruiting-locations', 'recruiting-locations'],
  ['/recruiting-tasks', 'recruiting-tasks'],

  // Operations
  ['/calendar', 'calendar'],
  ['/meetings', 'meetings'],
  ['/tasks', 'tasks'],
  ['/team-directory', 'team-directory'],
  ['/agency-training', 'agency-training'],
  ['/bookmarks', 'bookmarks'],
  ['/timeoff', 'timeoff'],

  // Import
  ['/bob-upload', 'bob-upload'],
  ['/policy-imports', 'policy-imports'],
  ['/lead-capture', 'lead-capture'],

  // Config & Admin
  ['/api-keys', 'api-keys'],
  ['/user-settings/general', 'user-settings'],
  ['/custom-tags', 'custom-tags'],
  ['/lead-segments', 'lead-segments'],
  ['/lead-forms', 'lead-forms'],
  ['/lead-redirect-configs', 'lead-redirect'],
  ['/blacklist', 'blacklist'],
  ['/agent-form', 'agent-forms'],

  // Reports
  ['/report/agency', 'report-agency'],
  ['/report/agent', 'report-agent'],
  ['/report/agent-carrier', 'report-agent-carrier'],
  ['/report/sale-listing', 'report-sale-listing'],
  ['/report/lead-sources', 'report-lead-sources'],
  ['/report/lead-status-ratio', 'report-lead-status-ratio'],
  ['/report/commission-carriers', 'report-commission-carriers'],
  ['/report/bucket-pull', 'report-bucket-pull'],
  ['/report/custom-reports', 'report-custom'],
  ['/report/products', 'report-products'],
  ['/report/last-login', 'report-last-login'],

  // Marketplace & Integrations
  ['/marketplace', 'marketplace'],
  ['/google-account', 'google-account'],
  ['/microsoft-account', 'microsoft-account'],
  ['/hst-bucket-sync', 'hst-bucket-sync'],
];

async function main() {
  console.log(`Starting TopBroker crawl (${PAGES.length} pages)...`);
  console.log(`Mode: ${HEADED ? 'headed (visible browser)' : 'headless'}`);

  const browser = await chromium.launch({
    headless: !HEADED,
    executablePath: process.env.CHROME_PATH || '/home/mk/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome',
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordHar: {
      path: path.join(__dirname, 'raw/har/full-session.har'),
      mode: 'full',
      urlFilter: /apps\.topbrokercrm\.com/,
    },
  });

  const page = await context.newPage();

  // Intercept Inertia responses to capture page props
  const pageProps = {};
  page.on('response', async (response) => {
    const url = response.url();
    const headers = response.headers();
    // Inertia responses have x-inertia header or are JSON with component/props
    if (headers['x-inertia'] || (url.includes('topbrokercrm.com') && headers['content-type']?.includes('json'))) {
      try {
        const body = await response.json();
        if (body.component || body.props) {
          const routePath = new URL(url).pathname;
          pageProps[routePath] = body;
          console.log(`  [inertia] Captured props for ${routePath} (component: ${body.component})`);
        }
      } catch (e) {
        // Not JSON, skip
      }
    }
  });

  // === LOGIN ===
  console.log('\n--- Logging in ---');

  // Navigate to login page (CSRF cookie is set automatically by Laravel on page load)
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });

  // Fetch CSRF cookie via Sanctum endpoint (204 response, just sets the cookie)
  console.log('Fetching CSRF cookie...');
  await page.evaluate(async () => {
    await fetch('/sanctum/csrf-cookie', { credentials: 'same-origin' });
  });
  await page.screenshot({ path: path.join(__dirname, 'raw/screenshots/login.png') });

  // Check if already logged in (redirected to dashboard)
  if (!page.url().includes('/login')) {
    console.log(`Already logged in (at ${page.url()})`);
  } else {
    // Fill login form
    await page.fill('input[type="email"], input[name="email"]', EMAIL);
    await page.fill('input[type="password"], input[name="password"]', PASSWORD);
    await page.screenshot({ path: path.join(__dirname, 'raw/screenshots/login-filled.png') });

    // Submit and wait for navigation
    console.log('Submitting login...');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 30000 }).catch(() => null),
      page.click('button[type="submit"]'),
    ]);

    // Give it a moment for any redirects
    await page.waitForTimeout(2000);
    console.log(`Post-submit URL: ${page.url()}`);
    await page.screenshot({ path: path.join(__dirname, 'raw/screenshots/post-submit.png') });

    // Check for 2FA
    if (page.url().includes('verify2fa')) {
      console.log('\n*** 2FA REQUIRED ***');
      console.log('The account has 2FA enabled. Run with --headed and complete 2FA manually.');
      await page.screenshot({ path: path.join(__dirname, 'raw/screenshots/2fa-prompt.png') });
      await browser.close();
      process.exit(2);
    }

    // Check if still on login page (bad credentials)
    if (page.url().includes('/login')) {
      // Look for actual error text in the page
      const pageText = await page.textContent('body');
      const hasError = pageText.includes('credentials') || pageText.includes('incorrect')
        || pageText.includes('invalid') || pageText.includes('failed');
      console.log(`Still on login page. Error detected: ${hasError}`);

      // Try to get specific error message
      const errorEl = await page.$('[class*="text-red"], [class*="alert"], [role="alert"]');
      if (errorEl) {
        const errorText = (await errorEl.textContent()).trim();
        if (errorText) console.log(`Error message: ${errorText}`);
      }
      await page.screenshot({ path: path.join(__dirname, 'raw/screenshots/login-error.png') });
      await browser.close();
      process.exit(3);
    }

    console.log(`Login successful! URL: ${page.url()}`);
    await page.screenshot({ path: path.join(__dirname, 'raw/screenshots/post-login.png') });
  }

  // === EXTRACT INITIAL PAGE DATA ===
  // Inertia.js embeds page data in the initial HTML as JSON in a data-page attribute
  const initialProps = await page.evaluate(() => {
    const el = document.getElementById('app');
    if (el && el.dataset.page) {
      try { return JSON.parse(el.dataset.page); } catch { return null; }
    }
    return null;
  });

  if (initialProps) {
    fs.writeFileSync(
      path.join(__dirname, 'raw/pages/_initial-props.json'),
      JSON.stringify(initialProps, null, 2)
    );
    console.log(`Saved initial Inertia props (component: ${initialProps.component})`);
  }

  // === CRAWL PAGES ===
  let visited = 0;
  let errors = 0;

  for (const [route, name] of PAGES) {
    try {
      console.log(`\n[${++visited}/${PAGES.length}] ${route} → ${name}`);

      // Navigate with Inertia-compatible headers
      const response = await page.goto(`${BASE}${route}`, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

      const status = response?.status() || 'unknown';
      const finalUrl = page.url();
      console.log(`  Status: ${status} | URL: ${finalUrl}`);

      // Extract Inertia page props from the DOM
      const props = await page.evaluate(() => {
        // Method 1: data-page attribute on #app
        const app = document.getElementById('app');
        if (app && app.dataset.page) {
          try { return JSON.parse(app.dataset.page); } catch {}
        }
        // Method 2: __page on the Inertia app instance
        if (window.__page) return window.__page;
        return null;
      });

      if (props) {
        fs.writeFileSync(
          path.join(__dirname, `raw/pages/${name}.json`),
          JSON.stringify(props, null, 2)
        );
        console.log(`  Saved props (component: ${props.component}, ${Object.keys(props.props || {}).length} prop keys)`);
      }

      // Screenshot
      await page.screenshot({
        path: path.join(__dirname, `raw/screenshots/${name}.png`),
        fullPage: false,
      });

      // Rate limiting — be polite
      await page.waitForTimeout(500);

    } catch (err) {
      errors++;
      console.log(`  ERROR: ${err.message}`);
      try {
        await page.screenshot({
          path: path.join(__dirname, `raw/screenshots/${name}-error.png`),
        });
      } catch {}
    }
  }

  // === SAVE COLLECTED INERTIA RESPONSES ===
  if (Object.keys(pageProps).length > 0) {
    fs.writeFileSync(
      path.join(__dirname, 'raw/pages/_xhr-inertia-responses.json'),
      JSON.stringify(pageProps, null, 2)
    );
    console.log(`\nSaved ${Object.keys(pageProps).length} XHR Inertia responses`);
  }

  // === CLOSE & SAVE HAR ===
  await context.close();
  await browser.close();

  console.log(`\n=== Crawl Complete ===`);
  console.log(`Visited: ${visited}/${PAGES.length}`);
  console.log(`Errors: ${errors}`);
  console.log(`HAR: raw/har/full-session.har`);
  console.log(`Props: raw/pages/*.json`);
  console.log(`Screenshots: raw/screenshots/*.png`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
