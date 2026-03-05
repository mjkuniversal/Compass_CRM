#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'raw/pages');

function load(name) {
  const fp = path.join(dir, name);
  if (!fs.existsSync(fp)) return null;
  return JSON.parse(fs.readFileSync(fp, 'utf-8'));
}

const shared = ['errors','extra','auth','ziggy','flash','currentAgency','agencySharesBuckets','stripe_public_key','stripe_global_public_key','unreadMessagesCount','unreadRecruitingMessagesCount','newLeadsCount','newStatementsCount','csrf_token','productCategories','agency_domain_agency','ui_customization','pendingEmailBlastsCount','failedHstAuthentication','forcedHstPasswordChange','features','googleAccountTokenExpired','microsoftAccountTokenExpired'];

function pageSpecific(data) {
  const result = [];
  for (const k of Object.keys(data.props)) {
    if (shared.includes(k)) continue;
    const v = data.props[k];
    if (v === null) { result.push(k + ' | null'); continue; }
    if (Array.isArray(v)) {
      let line = k + ' | array[' + v.length + ']';
      if (v.length > 0 && typeof v[0] === 'object' && v[0] !== null) line += ' keys: ' + Object.keys(v[0]).join(', ');
      else if (v.length > 0) line += ' sample: ' + JSON.stringify(v.slice(0, 3));
      result.push(line);
    } else if (typeof v === 'object') {
      const keys = Object.keys(v);
      let line = k + ' | object{' + keys.length + '}: ' + keys.slice(0, 10).join(', ');
      if (v.data && Array.isArray(v.data) && v.data.length > 0) {
        line += '\n  data[0] keys: ' + Object.keys(v.data[0]).join(', ');
      }
      result.push(line);
    } else {
      result.push(k + ' | ' + typeof v + ' = ' + String(v).substring(0, 80));
    }
  }
  return result;
}

const out = [];

// Text Inbox
out.push('=== TEXT INBOX ===');
const ti = load('text-inbox.json');
if (ti) pageSpecific(ti).forEach(l => out.push(l));

// Marketplace
out.push('\n=== MARKETPLACE ===');
const mp = load('marketplace.json');
if (mp) pageSpecific(mp).forEach(l => out.push(l));

// Balance Management
out.push('\n=== BALANCE MANAGEMENT ===');
const bm = load('balance-management.json');
if (bm) pageSpecific(bm).forEach(l => out.push(l));

// Commission Statements
out.push('\n=== COMMISSION STATEMENTS ===');
const cs = load('commission-statements.json');
if (cs) pageSpecific(cs).forEach(l => out.push(l));

// User Automations
out.push('\n=== USER AUTOMATIONS ===');
const ua = load('user-automations.json');
if (ua) pageSpecific(ua).forEach(l => out.push(l));

// Reports
const reportFiles = ['report-agency.json', 'report-agent.json', 'report-agent-carrier.json',
  'report-sale-listing.json', 'report-lead-sources.json', 'report-commission-carriers.json',
  'report-bucket-pull.json', 'report-products.json', 'report-last-login.json'];
for (const rf of reportFiles) {
  out.push('\n=== ' + rf.toUpperCase() + ' ===');
  const r = load(rf);
  if (r) pageSpecific(r).forEach(l => out.push(l));
}

// Text inbox message sample
out.push('\n=== TEXT INBOX MESSAGE SAMPLE ===');
if (ti && ti.props.textInboxes && ti.props.textInboxes.data && ti.props.textInboxes.data.length > 0) {
  const msg = ti.props.textInboxes.data[0];
  out.push('textInbox[0] keys: ' + Object.keys(msg).join(', '));
  for (const [k, v] of Object.entries(msg)) {
    if (v === null) out.push('  ' + k + ': null');
    else if (typeof v === 'object' && !Array.isArray(v)) out.push('  ' + k + ': object{' + Object.keys(v).length + '} ' + Object.keys(v).slice(0, 8).join(', '));
    else if (Array.isArray(v)) out.push('  ' + k + ': array[' + v.length + ']');
    else out.push('  ' + k + ': ' + typeof v + ' = ' + String(v).substring(0, 60));
  }
}

// Marketplace entries sample
out.push('\n=== MARKETPLACE ENTRY SAMPLE ===');
if (mp && mp.props.entries && mp.props.entries.data && mp.props.entries.data.length > 0) {
  const entry = mp.props.entries.data[0];
  out.push('entry[0] keys: ' + Object.keys(entry).join(', '));
  for (const [k, v] of Object.entries(entry)) {
    if (v === null) out.push('  ' + k + ': null');
    else if (typeof v === 'object' && !Array.isArray(v)) out.push('  ' + k + ': object{' + Object.keys(v).length + '} ' + Object.keys(v).slice(0, 8).join(', '));
    else if (Array.isArray(v)) out.push('  ' + k + ': array[' + v.length + ']');
    else out.push('  ' + k + ': ' + typeof v + ' = ' + String(v).substring(0, 100));
  }
}

// Balance management details
out.push('\n=== BALANCE MANAGEMENT DETAILS ===');
if (bm) {
  for (const k of ['credit_cards', 'available_credits', 'low_balance_settings', 'autoreplenish_payment_settings', 'transfers']) {
    const v = bm.props[k];
    if (v === null || v === undefined) { out.push(k + ': null'); continue; }
    if (Array.isArray(v)) {
      out.push(k + ': array[' + v.length + ']');
      if (v.length > 0 && typeof v[0] === 'object') {
        out.push('  keys: ' + Object.keys(v[0]).join(', '));
      }
    } else if (typeof v === 'object') {
      out.push(k + ': object{' + Object.keys(v).length + '} keys: ' + Object.keys(v).join(', '));
      if (v.data && Array.isArray(v.data) && v.data.length > 0) {
        out.push('  data[0] keys: ' + Object.keys(v.data[0]).join(', '));
        // Show field values of first item
        for (const [fk, fv] of Object.entries(v.data[0])) {
          if (fv === null) out.push('    ' + fk + ': null');
          else if (typeof fv === 'object') out.push('    ' + fk + ': ' + (Array.isArray(fv) ? 'array[' + fv.length + ']' : 'object'));
          else out.push('    ' + fk + ': ' + typeof fv + ' = ' + String(fv).substring(0, 60));
        }
      }
    } else {
      out.push(k + ': ' + typeof v + ' = ' + String(v));
    }
  }
}

// Carrier details
out.push('\n=== CARRIER DETAIL FIELDS ===');
const leads = load('leads-index.json');
if (leads && leads.props.carriers && leads.props.carriers.length > 0) {
  const c = leads.props.carriers[0];
  out.push('carrier keys: ' + Object.keys(c).join(', '));
  for (const [k, v] of Object.entries(c)) {
    if (k === 'agency_notes') { out.push('  ' + k + ': string (HTML, length=' + (v ? v.length : 0) + ')'); continue; }
    if (v === null) out.push('  ' + k + ': null');
    else if (typeof v === 'object' && !Array.isArray(v)) {
      out.push('  ' + k + ': object{' + Object.keys(v).length + '} ' + Object.keys(v).join(', '));
    }
    else if (Array.isArray(v)) out.push('  ' + k + ': array[' + v.length + ']');
    else out.push('  ' + k + ': ' + typeof v + ' = ' + String(v).substring(0, 60));
  }
  // Nested carrier object
  if (c.carrier && typeof c.carrier === 'object') {
    out.push('  carrier.carrier (nested): ' + JSON.stringify(c.carrier));
  }
}

// Agency settings
out.push('\n=== AGENCY SETTINGS (56 fields) ===');
const dashboard = load('dashboard.json');
if (dashboard && dashboard.props.currentAgency && dashboard.props.currentAgency.settings) {
  const settings = dashboard.props.currentAgency.settings;
  for (const [k, v] of Object.entries(settings)) {
    if (v === null) out.push(k + ' | null');
    else if (typeof v === 'object') out.push(k + ' | object');
    else out.push(k + ' | ' + typeof v + ' | ' + String(v).substring(0, 80));
  }
}

// Features / feature flags
out.push('\n=== FEATURE FLAGS ===');
if (dashboard && dashboard.props.features) {
  out.push(JSON.stringify(dashboard.props.features, null, 2));
}

// UI customization
out.push('\n=== UI CUSTOMIZATION ===');
if (dashboard && dashboard.props.ui_customization) {
  out.push(JSON.stringify(dashboard.props.ui_customization, null, 2));
}

// Dashboard specific (widgets, etc.)
out.push('\n=== DASHBOARD SPECIFIC ===');
if (dashboard) pageSpecific(dashboard).forEach(l => out.push(l));

// User roles
out.push('\n=== USER ROLES ===');
if (dashboard && dashboard.props.user && dashboard.props.user.roles) {
  out.push(JSON.stringify(dashboard.props.user.roles, null, 2));
}

// tb_subscription
out.push('\n=== USER SUBSCRIPTION ===');
if (dashboard && dashboard.props.user && dashboard.props.user.tb_subscription) {
  out.push(JSON.stringify(dashboard.props.user.tb_subscription, null, 2));
}

// Lead sources index page
out.push('\n=== LEAD SOURCES INDEX ===');
const lsi = load('lead-sources-index.json');
if (lsi) pageSpecific(lsi).forEach(l => out.push(l));

// Action schedules
out.push('\n=== ACTION SCHEDULES ===');
const as = load('action-schedules.json');
if (as) pageSpecific(as).forEach(l => out.push(l));

// Agents index
out.push('\n=== AGENTS INDEX ===');
const ai = load('agents-index.json');
if (ai) pageSpecific(ai).forEach(l => out.push(l));
if (ai && ai.props.agents && ai.props.agents.data && ai.props.agents.data.length > 0) {
  out.push('agent[0] keys: ' + Object.keys(ai.props.agents.data[0]).join(', '));
  for (const [k, v] of Object.entries(ai.props.agents.data[0])) {
    if (k === 'email') out.push('  ' + k + ': [REDACTED]');
    else if (v === null) out.push('  ' + k + ': null');
    else if (typeof v === 'object' && !Array.isArray(v)) out.push('  ' + k + ': object{' + Object.keys(v).length + '} ' + Object.keys(v).slice(0, 8).join(', '));
    else if (Array.isArray(v)) out.push('  ' + k + ': array[' + v.length + ']');
    else out.push('  ' + k + ': ' + typeof v + ' = ' + String(v).substring(0, 60));
  }
}

// Sale listing report detail
out.push('\n=== SALE LISTING REPORT DETAIL ===');
const slr = load('report-sale-listing.json');
if (slr && slr.props.leads && slr.props.leads.data && slr.props.leads.data.length > 0) {
  const lead = slr.props.leads.data[0];
  out.push('lead keys: ' + Object.keys(lead).join(', '));
  for (const [k, v] of Object.entries(lead)) {
    if (v === null) out.push('  ' + k + ': null');
    else if (typeof v === 'object' && !Array.isArray(v)) out.push('  ' + k + ': object{' + Object.keys(v).length + '} ' + Object.keys(v).slice(0, 8).join(', '));
    else if (Array.isArray(v)) out.push('  ' + k + ': array[' + v.length + ']' + (v.length > 0 && typeof v[0] === 'object' ? ' keys: ' + Object.keys(v[0]).join(', ') : ''));
    else out.push('  ' + k + ': ' + typeof v + ' = ' + String(v).substring(0, 80));
  }
}

// Leads create (new lead form fields)
out.push('\n=== LEADS CREATE ===');
const lc = load('leads-create.json');
if (lc) pageSpecific(lc).forEach(l => out.push(l));

// Calendar
out.push('\n=== CALENDAR ===');
const cal = load('calendar.json');
if (cal) pageSpecific(cal).forEach(l => out.push(l));

// User settings
out.push('\n=== USER SETTINGS ===');
const us = load('user-settings.json');
if (us) pageSpecific(us).forEach(l => out.push(l));

// Email templates
out.push('\n=== EMAIL TEMPLATES ===');
const et = load('email-templates.json');
if (et) pageSpecific(et).forEach(l => out.push(l));
if (et && et.props.emailTemplates && et.props.emailTemplates.data && et.props.emailTemplates.data.length > 0) {
  const tmpl = et.props.emailTemplates.data[0];
  out.push('template[0] keys: ' + Object.keys(tmpl).join(', '));
}

// Leads index - lead record (if present)
out.push('\n=== LEAD RECORD SAMPLE ===');
if (leads && leads.props.leads && leads.props.leads.data && leads.props.leads.data.length > 0) {
  const lead = leads.props.leads.data[0];
  out.push('lead[0] keys: ' + Object.keys(lead).join(', '));
  for (const [k, v] of Object.entries(lead)) {
    if (['ssn','email','phone','mobile_phone','home_phone','work_phone'].includes(k)) { out.push('  ' + k + ': [REDACTED]'); continue; }
    if (v === null) out.push('  ' + k + ': null');
    else if (typeof v === 'object' && !Array.isArray(v)) out.push('  ' + k + ': object{' + Object.keys(v).length + '} ' + Object.keys(v).slice(0, 8).join(', '));
    else if (Array.isArray(v)) out.push('  ' + k + ': array[' + v.length + ']' + (v.length > 0 && typeof v[0] === 'object' ? ' keys: ' + Object.keys(v[0]).join(', ') : ''));
    else out.push('  ' + k + ': ' + typeof v + ' = ' + String(v).substring(0, 80));
  }
}

fs.writeFileSync(path.join(__dirname, 'raw', 'all-page-data.txt'), out.join('\n'));
console.log('Written ' + out.length + ' lines to raw/all-page-data.txt');
