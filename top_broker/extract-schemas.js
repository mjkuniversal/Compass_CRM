#!/usr/bin/env node
/**
 * Extract comprehensive field schemas from all captured Inertia page props.
 * Outputs structured JSON for each entity type.
 */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'raw/pages');

function load(name) {
  const fp = path.join(dir, name);
  if (!fs.existsSync(fp)) return null;
  return JSON.parse(fs.readFileSync(fp, 'utf-8'));
}

function describeValue(v) {
  if (v === null || v === undefined) return { type: 'null', sample: 'null' };
  if (Array.isArray(v)) {
    if (v.length === 0) return { type: 'array', sample: '[]' };
    return { type: `array[${v.length}]`, sample: `[${typeof v[0]}...]` };
  }
  if (typeof v === 'object') {
    const keys = Object.keys(v);
    return { type: `object{${keys.length}}`, sample: keys.slice(0, 5).join(', ') + (keys.length > 5 ? '...' : '') };
  }
  if (typeof v === 'string') {
    // Redact PII patterns
    let s = v;
    if (/\d{3}-\d{2}-\d{4}/.test(s)) s = '***-**-****';
    if (/@/.test(s) && s.length > 5) s = '***@***.***';
    if (/^\d{10,}$/.test(s)) s = '**********';
    if (s.length > 100) s = s.substring(0, 100) + '...';
    return { type: 'string', sample: s };
  }
  return { type: typeof v, sample: String(v) };
}

function extractFields(obj, redactFields = []) {
  const fields = [];
  for (const [k, v] of Object.entries(obj)) {
    const desc = describeValue(v);
    if (redactFields.includes(k)) {
      desc.sample = '[REDACTED]';
    }
    fields.push({ field: k, ...desc });
  }
  return fields;
}

const output = {};

// 1. Dashboard - User, Agency, Product Categories
const dashboard = load('dashboard.json');
if (dashboard) {
  output.user = extractFields(dashboard.props.user, ['ssn', 'social_security', 'password']);
  output.currentAgency = extractFields(dashboard.props.currentAgency);
  output.productCategories = dashboard.props.productCategories;

  // Dashboard-specific props
  output.dashboardProps = Object.keys(dashboard.props).map(k => {
    const v = dashboard.props[k];
    const desc = describeValue(v);
    return { prop: k, ...desc };
  });
}

// 2. Leads Index - statuses, products, carriers, dead_reasons, lead_sources
const leads = load('leads-index.json');
if (leads) {
  output.leadsProps = Object.keys(leads.props).map(k => {
    const v = leads.props[k];
    const desc = describeValue(v);
    return { prop: k, ...desc };
  });

  if (leads.props.all_statuses) output.allStatuses = leads.props.all_statuses;
  if (leads.props.all_statuses_recruiting) output.allStatusesRecruiting = leads.props.all_statuses_recruiting;
  if (leads.props.products) {
    output.products = leads.props.products;
    if (leads.props.products.length > 0) {
      output.productFields = extractFields(leads.props.products[0]);
    }
  }
  if (leads.props.carriers) output.carriers = leads.props.carriers;
  if (leads.props.dead_reasons) output.deadReasons = leads.props.dead_reasons;
  if (leads.props.lead_sources) {
    output.leadSources = leads.props.lead_sources;
    if (leads.props.lead_sources.length > 0) {
      output.leadSourceFields = extractFields(leads.props.lead_sources[0]);
    }
  }
}

// 3. Buckets
const buckets = load('buckets-index.json');
if (buckets) {
  output.bucketsProps = Object.keys(buckets.props).map(k => {
    const v = buckets.props[k];
    const desc = describeValue(v);
    return { prop: k, ...desc };
  });
  if (buckets.props.buckets && buckets.props.buckets.length > 0) {
    output.bucketFields = extractFields(buckets.props.buckets[0]);
  }
}

// 4. Round Robin
const rr = load('round-robin-index.json');
if (rr) {
  output.roundRobinProps = Object.keys(rr.props).map(k => {
    const v = rr.props[k];
    const desc = describeValue(v);
    return { prop: k, ...desc };
  });
  if (rr.props.groups && rr.props.groups.data && rr.props.groups.data.length > 0) {
    output.roundRobinGroupFields = extractFields(rr.props.groups.data[0]);
  } else if (rr.props.groups && Array.isArray(rr.props.groups) && rr.props.groups.length > 0) {
    output.roundRobinGroupFields = extractFields(rr.props.groups[0]);
  }
}

// 5. Text Inbox
const textInbox = load('text-inbox.json');
if (textInbox) {
  output.textInboxProps = Object.keys(textInbox.props).map(k => {
    const v = textInbox.props[k];
    const desc = describeValue(v);
    return { prop: k, ...desc };
  });
}

// 6. Marketplace
const marketplace = load('marketplace.json');
if (marketplace) {
  output.marketplaceProps = Object.keys(marketplace.props).map(k => {
    const v = marketplace.props[k];
    const desc = describeValue(v);
    return { prop: k, ...desc };
  });
}

// 7. Balance Management
const balance = load('balance-management.json');
if (balance) {
  output.balanceManagementProps = Object.keys(balance.props).map(k => {
    const v = balance.props[k];
    const desc = describeValue(v);
    return { prop: k, ...desc };
  });
}

// 8. Commission Statements
const comm = load('commission-statements.json');
if (comm) {
  output.commissionStatementsProps = Object.keys(comm.props).map(k => {
    const v = comm.props[k];
    const desc = describeValue(v);
    return { prop: k, ...desc };
  });
}

// 9. User Automations
const auto = load('user-automations.json');
if (auto) {
  output.automationProps = Object.keys(auto.props).map(k => {
    const v = auto.props[k];
    const desc = describeValue(v);
    return { prop: k, ...desc };
  });
}

// 10. Reports
const reportFiles = ['report-agency.json', 'report-agent.json', 'report-agent-carrier.json',
  'report-sale-listing.json', 'report-lead-sources.json', 'report-commission-carriers.json',
  'report-bucket-pull.json', 'report-products.json', 'report-last-login.json'];

output.reports = {};
for (const rf of reportFiles) {
  const r = load(rf);
  if (r) {
    const name = rf.replace('.json', '');
    output.reports[name] = Object.keys(r.props).map(k => {
      const v = r.props[k];
      const desc = describeValue(v);
      return { prop: k, ...desc };
    });
  }
}

// 11. Auth object (shared)
if (dashboard && dashboard.props.auth) {
  output.auth = extractFields(dashboard.props.auth);
}

// 12. Shared props analysis
const allFiles = fs.readdirSync(dir).filter(f => f.endsWith('.json') && !f.startsWith('_'));
const propCounts = {};
for (const f of allFiles) {
  const d = load(f);
  if (d && d.props) {
    for (const k of Object.keys(d.props)) {
      propCounts[k] = (propCounts[k] || 0) + 1;
    }
  }
}
output.sharedPropsFrequency = Object.entries(propCounts)
  .sort((a, b) => b[1] - a[1])
  .map(([prop, count]) => ({ prop, count, total: allFiles.length }));

// Additional pages
const agentsIndex = load('agents-index.json');
if (agentsIndex) {
  output.agentsIndexProps = Object.keys(agentsIndex.props).map(k => {
    const v = agentsIndex.props[k];
    const desc = describeValue(v);
    return { prop: k, ...desc };
  });
  if (agentsIndex.props.agents && agentsIndex.props.agents.data && agentsIndex.props.agents.data.length > 0) {
    output.agentListFields = extractFields(agentsIndex.props.agents.data[0]);
  }
}

const leadsCreate = load('leads-create.json');
if (leadsCreate) {
  output.leadsCreateProps = Object.keys(leadsCreate.props).map(k => {
    const v = leadsCreate.props[k];
    const desc = describeValue(v);
    return { prop: k, ...desc };
  });
}

const leadSourcesIndex = load('lead-sources-index.json');
if (leadSourcesIndex) {
  output.leadSourcesIndexProps = Object.keys(leadSourcesIndex.props).map(k => {
    const v = leadSourcesIndex.props[k];
    const desc = describeValue(v);
    return { prop: k, ...desc };
  });
}

const userSettings = load('user-settings.json');
if (userSettings) {
  output.userSettingsProps = Object.keys(userSettings.props).map(k => {
    const v = userSettings.props[k];
    const desc = describeValue(v);
    return { prop: k, ...desc };
  });
}

const actionSchedules = load('action-schedules.json');
if (actionSchedules) {
  output.actionSchedulesProps = Object.keys(actionSchedules.props).map(k => {
    const v = actionSchedules.props[k];
    const desc = describeValue(v);
    return { prop: k, ...desc };
  });
}

fs.writeFileSync(path.join(__dirname, 'raw', 'extracted-schemas.json'), JSON.stringify(output, null, 2));
console.log('Written to raw/extracted-schemas.json');
console.log('Sections:', Object.keys(output).join(', '));
