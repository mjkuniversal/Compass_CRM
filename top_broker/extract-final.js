#!/usr/bin/env node
const fs = require('fs');
const out = [];

// Text inbox - check textInboxes structure
const ti = require('./raw/pages/text-inbox.json');
out.push('=== TEXT INBOX DETAIL ===');
if (ti.props.textInboxes) {
  const tis = ti.props.textInboxes;
  if (tis.data && tis.data.length > 0) {
    out.push('textInboxes.data[0] keys: ' + Object.keys(tis.data[0]).join(', '));
    const msg = tis.data[0];
    for (const [k, v] of Object.entries(msg)) {
      if (['phone','email'].includes(k)) { out.push('  ' + k + ': [REDACTED]'); continue; }
      if (v === null) out.push('  ' + k + ': null');
      else if (typeof v === 'object' && !Array.isArray(v)) out.push('  ' + k + ': object{' + Object.keys(v).length + '} ' + Object.keys(v).slice(0, 10).join(', '));
      else if (Array.isArray(v)) out.push('  ' + k + ': array[' + v.length + ']');
      else out.push('  ' + k + ': ' + typeof v + ' = ' + String(v).substring(0, 80));
    }
  } else {
    out.push('textInboxes.data length: 0 (empty)');
  }
}

// Messages
if (ti.props.messages) {
  out.push('');
  out.push('messages keys: ' + Object.keys(ti.props.messages).join(', '));
  if (ti.props.messages.data && ti.props.messages.data.length > 0) {
    out.push('messages.data[0] keys: ' + Object.keys(ti.props.messages.data[0]).join(', '));
  } else {
    out.push('messages.data length: ' + (ti.props.messages.data ? ti.props.messages.data.length : 'n/a'));
  }
}

// Bucket fields from text-inbox (it has 634 buckets)
const bucket0 = ti.props.buckets && ti.props.buckets.length > 0 ? ti.props.buckets[0] : null;
if (bucket0) {
  out.push('');
  out.push('=== BUCKET FIELDS (from text-inbox.json) ===');
  out.push('keys: ' + Object.keys(bucket0).join(', '));
  for (const [k, v] of Object.entries(bucket0)) {
    if (v === null) out.push('  ' + k + ': null');
    else out.push('  ' + k + ': ' + typeof v + ' = ' + String(v).substring(0, 80));
  }
}

// RR Group fields from text-inbox (it has 12 groups)
const rr0 = ti.props.rrGroups && ti.props.rrGroups.length > 0 ? ti.props.rrGroups[0] : null;
if (rr0) {
  out.push('');
  out.push('=== ROUND ROBIN GROUP FIELDS (from text-inbox.json) ===');
  out.push('keys: ' + Object.keys(rr0).join(', '));
  for (const [k, v] of Object.entries(rr0)) {
    if (v === null) out.push('  ' + k + ': null');
    else if (typeof v === 'object') out.push('  ' + k + ': ' + JSON.stringify(v).substring(0, 150));
    else out.push('  ' + k + ': ' + typeof v + ' = ' + String(v).substring(0, 80));
  }
}

// Commission statement - check for deeper data
const cs = require('./raw/pages/commission-statements.json');
out.push('');
out.push('=== COMMISSION STATEMENT FILTERED_BY ===');
if (cs.props.filtered_by) {
  out.push(JSON.stringify(cs.props.filtered_by, null, 2));
}

// Balance management - low_balance_settings, autoreplenish, transfers detail
const bm = require('./raw/pages/balance-management.json');
out.push('');
out.push('=== BALANCE MANAGEMENT LOW BALANCE SETTINGS ===');
if (bm.props.low_balance_settings && bm.props.low_balance_settings.data) {
  out.push('data: ' + JSON.stringify(bm.props.low_balance_settings.data).substring(0, 500));
}
out.push('');
out.push('=== BALANCE MANAGEMENT AUTOREPLENISH ===');
if (bm.props.autoreplenish_payment_settings && bm.props.autoreplenish_payment_settings.data) {
  out.push('data: ' + JSON.stringify(bm.props.autoreplenish_payment_settings.data).substring(0, 500));
}
out.push('');
out.push('=== BALANCE MANAGEMENT TRANSFERS ===');
if (bm.props.transfers && bm.props.transfers.data && Array.isArray(bm.props.transfers.data) && bm.props.transfers.data.length > 0) {
  out.push('data[0] keys: ' + Object.keys(bm.props.transfers.data[0]).join(', '));
  const t = bm.props.transfers.data[0];
  for (const [k, v] of Object.entries(t)) {
    if (v === null) out.push('  ' + k + ': null');
    else if (typeof v === 'object') out.push('  ' + k + ': object ' + Object.keys(v).slice(0, 5).join(', '));
    else out.push('  ' + k + ': ' + typeof v + ' = ' + String(v).substring(0, 80));
  }
} else {
  out.push('transfers data: ' + JSON.stringify(bm.props.transfers).substring(0, 300));
}

// Lead forms
const lf = require('./raw/pages/lead-forms.json');
out.push('');
out.push('=== LEAD FORMS ===');
const shared = ['errors','extra','auth','ziggy','flash','currentAgency','agencySharesBuckets','stripe_public_key','stripe_global_public_key','unreadMessagesCount','unreadRecruitingMessagesCount','newLeadsCount','newStatementsCount','csrf_token','productCategories','agency_domain_agency','ui_customization','pendingEmailBlastsCount','failedHstAuthentication','forcedHstPasswordChange','features','googleAccountTokenExpired','microsoftAccountTokenExpired'];
for (const k of Object.keys(lf.props)) {
  if (shared.includes(k)) continue;
  const v = lf.props[k];
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

// Custom tags
const ct = require('./raw/pages/custom-tags.json');
out.push('');
out.push('=== CUSTOM TAGS ===');
for (const k of Object.keys(ct.props)) {
  if (shared.includes(k)) continue;
  const v = ct.props[k];
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

// Campaigns
const ec = require('./raw/pages/email-campaigns.json');
out.push('');
out.push('=== EMAIL CAMPAIGNS ===');
for (const k of Object.keys(ec.props)) {
  if (shared.includes(k)) continue;
  const v = ec.props[k];
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

// Autoresponders
const ar = require('./raw/pages/autoresponders-sequence.json');
out.push('');
out.push('=== AUTORESPONDERS ===');
for (const k of Object.keys(ar.props)) {
  if (shared.includes(k)) continue;
  const v = ar.props[k];
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

fs.writeFileSync('raw/final-data.txt', out.join('\n'));
console.log('Written ' + out.length + ' lines');
