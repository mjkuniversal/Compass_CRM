#!/usr/bin/env node
const fs = require('fs');
const out = [];

// Sale listing report - has actual lead/sale records
const slr = require('./raw/pages/report-sale-listing.json');
out.push('=== SALE LISTING REPORT ===');
out.push('Component: ' + slr.component);
const shared = ['errors','extra','auth','ziggy','flash','currentAgency','agencySharesBuckets','stripe_public_key','stripe_global_public_key','unreadMessagesCount','unreadRecruitingMessagesCount','newLeadsCount','newStatementsCount','csrf_token','productCategories','agency_domain_agency','ui_customization','pendingEmailBlastsCount','failedHstAuthentication','forcedHstPasswordChange','features','googleAccountTokenExpired','microsoftAccountTokenExpired'];
for (const k of Object.keys(slr.props)) {
  if (shared.includes(k)) continue;
  const v = slr.props[k];
  if (v === null) { out.push(k + ' | null'); continue; }
  if (Array.isArray(v)) {
    out.push(k + ' | array[' + v.length + ']');
  } else if (typeof v === 'object') {
    const keys = Object.keys(v);
    out.push(k + ' | object{' + keys.length + '}: ' + keys.slice(0, 5).join(', '));
    if (v.data && Array.isArray(v.data)) out.push('  data length: ' + v.data.length);
  } else {
    out.push(k + ' | ' + typeof v + ' = ' + String(v).substring(0, 80));
  }
}

// Check if leads data exists
if (slr.props.leads && slr.props.leads.data && slr.props.leads.data.length > 0) {
  const lead = slr.props.leads.data[0];
  out.push('');
  out.push('=== LEAD/SALE RECORD FIELDS ===');
  out.push('keys: ' + Object.keys(lead).join(', '));
  for (const [k, v] of Object.entries(lead)) {
    if (['ssn','email','phone','mobile_phone','home_phone','work_phone'].includes(k)) {
      out.push('  ' + k + ': [REDACTED]');
      continue;
    }
    if (v === null) out.push('  ' + k + ': null');
    else if (typeof v === 'object' && !Array.isArray(v)) {
      out.push('  ' + k + ': object{' + Object.keys(v).length + '} ' + Object.keys(v).slice(0, 8).join(', '));
    }
    else if (Array.isArray(v)) {
      let line = '  ' + k + ': array[' + v.length + ']';
      if (v.length > 0 && typeof v[0] === 'object') line += ' keys: ' + Object.keys(v[0]).join(', ');
      out.push(line);
    }
    else out.push('  ' + k + ': ' + typeof v + ' = ' + String(v).substring(0, 100));
  }

  // Check nested sale object
  if (lead.sales && Array.isArray(lead.sales) && lead.sales.length > 0) {
    const sale = lead.sales[0];
    out.push('');
    out.push('=== SALE RECORD FIELDS (nested) ===');
    out.push('keys: ' + Object.keys(sale).join(', '));
    for (const [k, v] of Object.entries(sale)) {
      if (v === null) out.push('  ' + k + ': null');
      else if (typeof v === 'object' && !Array.isArray(v)) {
        out.push('  ' + k + ': object{' + Object.keys(v).length + '} ' + Object.keys(v).slice(0, 8).join(', '));
      }
      else if (Array.isArray(v)) out.push('  ' + k + ': array[' + v.length + ']');
      else out.push('  ' + k + ': ' + typeof v + ' = ' + String(v).substring(0, 100));
    }
  }
}

// Agent-carrier report has carrier-level data
const acr = require('./raw/pages/report-agent-carrier.json');
out.push('');
out.push('=== AGENT-CARRIER REPORT CARRIERS ===');
out.push('carriers count: ' + (acr.props.carriers ? acr.props.carriers.length : 0));
if (acr.props.carriers && acr.props.carriers.length > 0) {
  out.push('carrier[0]: ' + JSON.stringify(acr.props.carriers[0]));
  out.push('carrier[1]: ' + JSON.stringify(acr.props.carriers[1]));
}

// Initial props
const ip = require('./raw/pages/_initial-props.json');
out.push('');
out.push('=== INITIAL PROPS ===');
out.push('keys: ' + Object.keys(ip).join(', '));
if (ip.props) out.push('props keys: ' + Object.keys(ip.props).join(', '));

// Lead sources index - source detail
const lsi = require('./raw/pages/lead-sources-index.json');
if (lsi.props.sources && lsi.props.sources.data && lsi.props.sources.data.length > 0) {
  out.push('');
  out.push('=== LEAD SOURCE (sources index) FIELDS ===');
  const src = lsi.props.sources.data[0];
  for (const [k, v] of Object.entries(src)) {
    if (v === null) out.push('  ' + k + ': null');
    else if (typeof v === 'object') out.push('  ' + k + ': ' + JSON.stringify(v).substring(0, 100));
    else out.push('  ' + k + ': ' + typeof v + ' = ' + String(v).substring(0, 80));
  }
}

// Action schedule detail
const as = require('./raw/pages/action-schedules.json');
if (as.props.schedules && as.props.schedules.data && as.props.schedules.data.length > 0) {
  out.push('');
  out.push('=== ACTION SCHEDULE SAMPLE ===');
  as.props.schedules.data.slice(0, 3).forEach(s => out.push(JSON.stringify(s)));
}

// Email template detail
const et = require('./raw/pages/email-templates.json');
if (et.props.emailTemplates && et.props.emailTemplates.data && et.props.emailTemplates.data.length > 0) {
  out.push('');
  out.push('=== EMAIL TEMPLATE FIELDS ===');
  const tmpl = et.props.emailTemplates.data[0];
  for (const [k, v] of Object.entries(tmpl)) {
    if (v === null) out.push('  ' + k + ': null');
    else if (typeof v === 'string') out.push('  ' + k + ': string (len=' + v.length + ') = ' + v.substring(0, 60));
    else out.push('  ' + k + ': ' + typeof v + ' = ' + String(v).substring(0, 60));
  }
}

// Meetings
const mt = require('./raw/pages/meetings.json');
out.push('');
out.push('=== MEETINGS ===');
for (const k of Object.keys(mt.props)) {
  if (shared.includes(k)) continue;
  const v = mt.props[k];
  if (v === null) { out.push(k + ' | null'); continue; }
  if (Array.isArray(v)) {
    let line = k + ' | array[' + v.length + ']';
    if (v.length > 0 && typeof v[0] === 'object') line += ' keys: ' + Object.keys(v[0]).join(', ');
    out.push(line);
  } else if (typeof v === 'object') {
    out.push(k + ' | object{' + Object.keys(v).length + '}');
  } else {
    out.push(k + ' | ' + typeof v + ' = ' + String(v).substring(0, 80));
  }
}

// Tasks
const tk = require('./raw/pages/tasks.json');
out.push('');
out.push('=== TASKS ===');
for (const k of Object.keys(tk.props)) {
  if (shared.includes(k)) continue;
  const v = tk.props[k];
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

fs.writeFileSync('raw/leads-data.txt', out.join('\n'));
console.log('Written ' + out.length + ' lines');
