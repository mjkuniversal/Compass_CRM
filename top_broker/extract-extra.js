#!/usr/bin/env node
const fs = require('fs');
const out = [];

// Lead types
const lsi = require('./raw/pages/lead-sources-index.json');
out.push('=== LEAD TYPES ===');
if (lsi.props.leadTypes) lsi.props.leadTypes.forEach(t => out.push(JSON.stringify(t)));

// Starting points
out.push('');
out.push('=== STARTING POINTS ===');
if (lsi.props.startingPoints) lsi.props.startingPoints.forEach(s => out.push(JSON.stringify(s)));

// Languages
const lc = require('./raw/pages/leads-create.json');
out.push('');
out.push('=== LANGUAGES ===');
if (lc.props.languages) lc.props.languages.forEach(l => out.push(JSON.stringify(l)));

// Timezones
const us = require('./raw/pages/user-settings.json');
out.push('');
out.push('=== TIMEZONES ===');
if (us.props.timezones) us.props.timezones.forEach(t => out.push(JSON.stringify(t)));

// Calendar colors
const cal = require('./raw/pages/calendar.json');
out.push('');
out.push('=== CALENDAR COLORS (first 5) ===');
if (cal.props.colors) cal.props.colors.slice(0, 5).forEach(c => out.push(JSON.stringify(c)));
out.push('total colors: ' + (cal.props.colors ? cal.props.colors.length : 0));

// Lead search page specific
const leads = require('./raw/pages/leads-index.json');
out.push('');
out.push('=== LEAD SEARCH PAGE SPECIFIC ===');
const shared = ['errors','extra','auth','ziggy','flash','currentAgency','agencySharesBuckets','stripe_public_key','stripe_global_public_key','unreadMessagesCount','unreadRecruitingMessagesCount','newLeadsCount','newStatementsCount','csrf_token','productCategories','agency_domain_agency','ui_customization','pendingEmailBlastsCount','failedHstAuthentication','forcedHstPasswordChange','features','googleAccountTokenExpired','microsoftAccountTokenExpired'];
for (const k of Object.keys(leads.props)) {
  if (shared.includes(k)) continue;
  const v = leads.props[k];
  if (v === null) { out.push(k + ' | null'); continue; }
  if (Array.isArray(v)) {
    out.push(k + ' | array[' + v.length + ']');
  } else if (typeof v === 'object') {
    const keys = Object.keys(v);
    out.push(k + ' | object{' + keys.length + '}: ' + keys.slice(0, 5).join(', '));
  } else {
    out.push(k + ' | ' + typeof v + ' = ' + String(v).substring(0, 80));
  }
}

// Products by category
out.push('');
out.push('=== PRODUCTS BY CATEGORY ===');
const cats = require('./raw/pages/dashboard.json').props.productCategories;
const catMap = {};
cats.forEach(c => { catMap[c.id] = c.title; });
const products = leads.props.products;
const grouped = {};
products.forEach(p => {
  const cat = catMap[p.category_id] || 'Unknown(' + p.category_id + ')';
  if (!grouped[cat]) grouped[cat] = [];
  grouped[cat].push(p.name);
});
for (const [cat, names] of Object.entries(grouped)) {
  out.push(cat + ' (' + names.length + '): ' + names.slice(0, 5).join(', ') + (names.length > 5 ? '...' : ''));
}

// Carrier names
out.push('');
out.push('=== ALL CARRIER NAMES ===');
const carriers = leads.props.carriers;
carriers.forEach(c => {
  out.push('id=' + c.id + ' carrier_id=' + c.carrier_id + ' name=' + (c.carrier && c.carrier.carrier ? c.carrier.carrier : 'unknown'));
});

// Lead sources count
out.push('');
out.push('lead_sources count: ' + leads.props.lead_sources.length);

// New lead statuses (leads-create)
out.push('');
out.push('=== NEW LEAD STATUSES (from leads-create) ===');
if (lc.props.all_statuses) lc.props.all_statuses.forEach(s => out.push(JSON.stringify(s)));

// Automation samples
const ua = require('./raw/pages/user-automations.json');
out.push('');
out.push('=== AUTOMATION SAMPLES ===');
if (ua.props.automations && ua.props.automations.data && ua.props.automations.data.length > 0) {
  ua.props.automations.data.slice(0, 3).forEach(a => out.push(JSON.stringify(a)));
}

// Text templates
const tt = require('./raw/pages/text-templates.json');
out.push('');
out.push('=== TEXT TEMPLATES ===');
for (const k of Object.keys(tt.props)) {
  if (shared.includes(k)) continue;
  const v = tt.props[k];
  if (v === null) { out.push(k + ' | null'); continue; }
  if (Array.isArray(v)) {
    let line = k + ' | array[' + v.length + ']';
    if (v.length > 0 && typeof v[0] === 'object') line += ' keys: ' + Object.keys(v[0]).join(', ');
    out.push(line);
  } else if (typeof v === 'object') {
    const keys = Object.keys(v);
    let line = k + ' | object{' + keys.length + '}: ' + keys.slice(0, 5).join(', ');
    if (v.data && Array.isArray(v.data) && v.data.length > 0)
      line += '\n  data[0] keys: ' + Object.keys(v.data[0]).join(', ');
    out.push(line);
  } else {
    out.push(k + ' | ' + typeof v + ' = ' + String(v).substring(0, 80));
  }
}

// Voicemail scripts
const vs = require('./raw/pages/voicemail-scripts.json');
out.push('');
out.push('=== VOICEMAIL SCRIPTS ===');
for (const k of Object.keys(vs.props)) {
  if (shared.includes(k)) continue;
  const v = vs.props[k];
  if (v === null) { out.push(k + ' | null'); continue; }
  if (Array.isArray(v)) {
    let line = k + ' | array[' + v.length + ']';
    if (v.length > 0 && typeof v[0] === 'object') line += ' keys: ' + Object.keys(v[0]).join(', ');
    out.push(line);
  } else if (typeof v === 'object') {
    const keys = Object.keys(v);
    let line = k + ' | object{' + keys.length + '}: ' + keys.slice(0, 5).join(', ');
    if (v.data && Array.isArray(v.data) && v.data.length > 0)
      line += '\n  data[0] keys: ' + Object.keys(v.data[0]).join(', ');
    out.push(line);
  } else {
    out.push(k + ' | ' + typeof v + ' = ' + String(v).substring(0, 80));
  }
}

// XHR responses
out.push('');
out.push('=== XHR INERTIA RESPONSES ===');
try {
  const xhr = require('./raw/pages/_xhr-inertia-responses.json');
  if (Array.isArray(xhr)) {
    xhr.forEach((r, i) => out.push(i + ': component=' + r.component + ' url=' + r.url));
  } else {
    out.push('keys: ' + Object.keys(xhr).join(', '));
    out.push('sample: ' + JSON.stringify(xhr).substring(0, 500));
  }
} catch(e) { out.push('Error: ' + e.message); }

// Marketplace entry fields detail
out.push('');
out.push('=== MARKETPLACE ENTRY DETAIL ===');
const mp = require('./raw/pages/marketplace.json');
if (mp.props.entries && Array.isArray(mp.props.entries) && mp.props.entries.length > 0) {
  const e = mp.props.entries[0];
  for (const [k, v] of Object.entries(e)) {
    out.push('  ' + k + ': ' + (v === null ? 'null' : typeof v === 'object' ? JSON.stringify(v).substring(0, 100) : typeof v + '=' + String(v).substring(0, 80)));
  }
} else {
  out.push('entries is not a direct array, checking structure...');
  out.push('type: ' + typeof mp.props.entries + ', isArray: ' + Array.isArray(mp.props.entries));
  if (mp.props.entries && typeof mp.props.entries === 'object') {
    out.push('keys: ' + Object.keys(mp.props.entries).join(', '));
  }
}

// purchaseBucketsAccess detail
out.push('');
out.push('=== PURCHASE BUCKET ACCESS SAMPLE ===');
if (mp.props.purchaseBucketsAccess && mp.props.purchaseBucketsAccess.length > 0) {
  out.push(JSON.stringify(mp.props.purchaseBucketsAccess[0], null, 2));
}

// clickToDialBucketsAccess detail
out.push('');
out.push('=== CLICK TO DIAL BUCKET ACCESS SAMPLE ===');
if (mp.props.clickToDialBucketsAccess && mp.props.clickToDialBucketsAccess.length > 0) {
  out.push(JSON.stringify(mp.props.clickToDialBucketsAccess[0], null, 2));
}

fs.writeFileSync('raw/extra-data.txt', out.join('\n'));
console.log('Written ' + out.length + ' lines');
