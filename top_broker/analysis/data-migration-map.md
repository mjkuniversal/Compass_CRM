# TopBroker to GoHighLevel — Data Migration Map

Entity-by-entity mapping for migrating data from TopBroker CRM to GoHighLevel. Each section covers the GHL equivalent, field mapping, migration complexity, and data loss risks.

---

## 1. Leads → GHL Contacts

**GHL Equivalent**: Contacts (native entity)
**Migration Complexity**: Medium
**Route count**: 60+ lead-related routes in TopBroker

### Field Mapping

| TopBroker Field | GHL Field | Type | Notes |
|---|---|---|---|
| First Name | `firstName` | Native | Direct map |
| Last Name | `lastName` | Native | Direct map |
| Full Name | `contactName` | Native | Concatenated or direct |
| Phone(s) | `phone` | Native | GHL supports one primary phone; additional phones need custom fields |
| Email(s) | `email` | Native | GHL supports one primary email; additional emails need custom fields |
| Address | `address1` | Native | Direct map |
| City | `city` | Native | Direct map |
| State | `state` | Native | Direct map |
| Zip | `postalCode` | Native | Direct map |
| Date of Birth | `dateOfBirth` | Native | Direct map |
| SSN | (no equivalent) | - | **DATA LOSS RISK** — needs encrypted custom field or external vault |
| Lead Status | Pipeline stage or custom field | Custom | TopBroker statuses must map to GHL pipeline stages |
| Lead Source | `source` | Native | Direct map but loses source metadata (doc instructions, toggle-active) |
| Lead Type(s) | `tags` | Native | Multiple types become tags; loses structured type entity |
| Dead Reason | Custom field or opportunity lost reason | Custom | Only relevant for dead/lost leads |
| Assigned Agent | `assignedTo` | Native | Map TopBroker agent ID to GHL user ID |
| Notes | Contact notes | Native | Direct map but TopBroker notes are richer (flagged, pinned) |
| Tags | `tags` | Native | Direct map |
| Custom Tags | `tags` | Native | Merge with regular tags |
| Created Date | `dateAdded` | Native | Direct map |
| Affiliate | Custom field | Custom | No native affiliate tracking in GHL |

### Sub-Entity Mapping

| TopBroker Sub-Entity | GHL Approach | Data Loss Risk |
|---|---|---|
| Dependants (name, DOB, SSN, medications) | Separate contacts linked via custom field "Primary Contact ID" | HIGH — Loses parent-child integrity. SSN, medications per dependant lost unless custom fields per dependant |
| Medications (per lead + per dependant) | Custom field (text list) or notes | MEDIUM — Loses structured medication records (name, dosage, frequency) |
| Doctors (per lead) | Custom field (text list) or notes | MEDIUM — Loses structured doctor records |
| Files/Documents | Contact file attachments (manual re-upload) | MEDIUM — File metadata (categories, edit history) lost. Binary files need re-upload via API |
| Licenses (per lead) | Custom fields | HIGH — Structured license records (state, number, expiry, type) flatten to text |
| Login Credentials | (cannot migrate) | HIGH — Carrier portal credentials should NOT be stored in GHL. Need external password manager |
| Carriers (per lead) | Custom field `Health Carrier` | MEDIUM — Only one carrier per custom field. Multiple carrier relationships lost unless multiple custom fields created |
| Billing Info | (cannot migrate) | HIGH — No billing storage in GHL |
| Form Submissions | Form submission history (partial) | LOW — Historical submissions rarely queried post-migration |

### Migration Steps

1. Export all leads from TopBroker via API or CSV
2. Map fields per table above
3. Create custom fields in GHL before import: SSN (encrypted), Lead Type, Dead Reason, Affiliate, additional phone/email fields
4. Import via GHL CSV import or API (`POST /contacts`)
5. Separately handle dependants as linked contacts
6. Manually assess medication/doctor data — likely summarize into notes
7. Re-upload critical files via GHL API
8. **Do NOT migrate**: login credentials, billing info

---

## 2. Agents → GHL Users / Sub-Accounts

**GHL Equivalent**: Users (team members) within a Location, or separate Sub-Accounts
**Migration Complexity**: High
**Route count**: 50+ agent-related routes in TopBroker

### Field Mapping

| TopBroker Field | GHL Field | Type | Notes |
|---|---|---|---|
| Agent Name | User name | Native | Direct map |
| Email | User email | Native | Direct map |
| Phone | User phone | Native | Direct map |
| Profile Picture | User avatar | Native | Manual re-upload |
| Active Status | User active/inactive | Native | Direct map |
| Role/Permissions | User role | Native | Map TopBroker roles to GHL permission sets |
| Contract Info | (no equivalent) | - | **DATA LOSS** — agent contract details have no GHL home |
| Working Hours | Calendar availability | Partial | Different format — TopBroker hours are operational, GHL hours are booking-focused |
| Twilio Number | LC Phone number | Partial | May need re-provisioning in GHL's phone system |

### Sub-Entity Mapping

| TopBroker Sub-Entity | GHL Approach | Data Loss Risk |
|---|---|---|
| Agent Carriers (carrier assignments, hierarchy, downline) | (cannot migrate) | CRITICAL — Agent-carrier relationships, hierarchies, and downline structures have no GHL representation |
| Agent Licenses (state, number, expiry, type) | (cannot migrate) | CRITICAL — Regulatory data. Must maintain externally (spreadsheet, dedicated compliance tool) |
| Agent Files | (manual re-upload) | MEDIUM — Agent documents need manual handling |
| Agent Notes | (no equivalent) | HIGH — Internal notes about agents are lost |
| Agent Training completion | (no equivalent) | HIGH — Training records lost |
| Account Access delegations | User permissions | PARTIAL — GHL permissions are role-based, not delegation-based |
| Bucket Access | (no equivalent) | CRITICAL — Lead pool access rules are lost |
| HST Credentials | (cannot migrate) | HIGH — HealthSherpa credentials need separate management |
| Credit Balance | (no equivalent) | HIGH — Agent credit/balance data has no GHL home |
| Commission toggle | (no equivalent) | N/A — Commission system doesn't exist in GHL |
| Carrier Agent IDs | (cannot migrate) | HIGH — Needed for commission matching. Must maintain externally |

### Migration Strategy

**Option A — Single Location, agents as team members**:
- Simplest. All agents become Users under one GHL Location.
- Limitation: All agents see all contacts. No bucket-level isolation.
- Best for: Small agencies (< 20 agents) without strict lead ownership.

**Option B — Sub-accounts per agent**:
- Each agent gets their own GHL Location (sub-account).
- Enables per-agent contact isolation and settings.
- Limitation: Cross-agent features (lead sharing, round robin, team reporting) become complex.
- Best for: Independent agents who manage their own books.
- Note: HWH already uses this model (19 agents with GHL sub-accounts per `ghl_credentials.py`).

**Option C — Hybrid**:
- Agency-level Location for shared operations (campaigns, workflows, reporting).
- Sub-accounts for agents who need isolation.
- Most complex to set up but closest to TopBroker's model.

---

## 3. Policies → GHL Custom Fields / Opportunities

**GHL Equivalent**: No native policy entity. Must use Custom Fields on Contacts or Opportunities.
**Migration Complexity**: High
**Route count**: 20+ policy-related routes in TopBroker

### Field Mapping (Policy → Custom Fields on Contact)

| TopBroker Field | GHL Custom Field | Type | Notes |
|---|---|---|---|
| Policy Status (active/cancelled/expiring) | `Policy Status?` | Dropdown | Already exists in HWH GHL config |
| Carrier | `Health Carrier` | Text/Dropdown | Already exists in HWH GHL config |
| Plan Name | `Health Plan Name (base policy)` | Text | Already exists in HWH GHL config |
| Monthly Premium | `Monthly Premium Health Only` | Number | Already exists in HWH GHL config |
| Effective Date | `Effective Date` | Date | Already exists in HWH GHL config |
| Policy Type | `Policy Type(s)` | Multi-select | Already exists in HWH GHL config |
| U65/Medicare | `Is this U65 or Medicare?` | Dropdown | Already exists in HWH GHL config |
| Cancellation Date | (new custom field needed) | Date | Not in current HWH config |
| Renewal Date | (new custom field needed) | Date | Not in current HWH config |
| Policy Number | (new custom field needed) | Text | Not in current HWH config |
| Beneficiaries | (new custom field needed) | Text | Loses structured beneficiary records |

### Multi-Policy Problem

TopBroker supports **multiple policies per lead** (health, dental, ancillary, etc.) as first-class sub-entities. GHL custom fields are single-value per contact.

**Workarounds**:
1. **Primary policy only**: Store the primary/most-recent policy in contact custom fields. Acceptable for simple cases.
2. **Multiple custom field sets**: Create `Health Carrier`, `Dental Carrier`, `Ancillary Carrier`, etc. Works up to 3-4 policy types but becomes unwieldy.
3. **Opportunities as policies**: Create one Opportunity per policy in a "Policies" pipeline. Each opportunity carries custom fields for carrier, plan, premium, dates. Best structural fit but abuses the Opportunity concept.
4. **GHL Custom Objects** (if available on plan): Use GHL's Custom Objects feature to create a Policy object linked to contacts. Best solution if available.

### Data Loss Risks

- **Policy history**: TopBroker tracks policy lifecycle (new → active → cancelled → renewed). GHL custom fields are point-in-time snapshots with no history.
- **Multiple policies**: Only one set of policy fields per contact unless using workarounds above.
- **Beneficiaries**: Structured beneficiary data per policy/transaction is lost.
- **HST sync status**: Post-sale sync and lock-check status per policy is lost.
- **Temp policies**: Temporary policy records during enrollment process have no GHL equivalent.
- **Policy-level transactions**: Commission-linked transactions per policy are lost.

---

## 4. Quotesheets → (No GHL Equivalent)

**GHL Equivalent**: None
**Migration Complexity**: N/A (cannot migrate — functionality doesn't exist)
**Route count**: 40+ quotesheet-related routes in TopBroker

### What Would Be Lost

| TopBroker Component | Impact |
|---|---|
| Quotesheet templates (plan configurations) | Must recreate in external quoting tool |
| Historical quotesheets sent to leads | No migration path — archive as PDFs if needed |
| Plan products with QA/text bullets | Product comparison content is lost |
| Quotesheet email templates | Can recreate as GHL email templates but without quotesheet merge fields |
| Public quotesheet links (UUID-based) | Links become dead — no GHL equivalent |
| Client plan selection tracking | Cannot track which plans a client viewed/selected |

### Recommended Approach

Do NOT attempt to migrate quotesheets into GHL. Instead:
1. Archive historical quotesheets as PDFs attached to contacts
2. Evaluate dedicated insurance quoting tools (e.g., Quotit, HealthSherpa quoting, carrier-specific tools)
3. Build custom quoting micro-app if volume justifies it (see `hwh-crm` plans)

---

## 5. Commission Statements → (No GHL Equivalent)

**GHL Equivalent**: None
**Migration Complexity**: N/A (cannot migrate — functionality doesn't exist)
**Route count**: 50+ commission-related routes in TopBroker

### What Would Be Lost

| TopBroker Component | Impact |
|---|---|
| Commission statement history | Must maintain in spreadsheets or dedicated commission tool |
| Override structures | Hierarchical commission splits are lost |
| Personal production detail | Agent production records are lost |
| Carrier agent ID mappings | Must maintain in external spreadsheet |
| Failed/duplicate row handling | Commission processing workflows are lost |
| Scheduled publish workflow | No automation for commission releases |
| Client payout history | Payment tracking per client is lost |
| Commission carrier reports | Reporting is lost |
| Agent commission files | Documents need separate storage |

### Recommended Approach

Commission management MUST be handled outside GHL:
1. **Spreadsheet-based**: Continue using Excel/Google Sheets for commission processing. Simple but error-prone at scale.
2. **Dedicated commission tool**: AgentSync, Commissions Inc, or similar insurance commission platforms.
3. **Custom build**: Part of `hwh-crm` roadmap — build commission module that integrates with GHL contacts via API.
4. **HWH's current AV calculation** (`e123-data-parsing/skills/parse_to_dealtracker.py → calculate_av()`) could serve as foundation for custom commission logic.

---

## 6. Buckets → (No GHL Equivalent)

**GHL Equivalent**: None. Closest concept is pipeline stages or Smart Lists with manual assignment.
**Migration Complexity**: High (conceptual redesign required)

### Mapping Approach

| TopBroker Bucket Concept | GHL Workaround | Adequacy |
|---|---|---|
| Agency lead pool (bucket) | Pipeline stage "Unassigned" + Smart List filter | Poor — No access control, no daily limits, no purchase model |
| Lead purchase from bucket | Workflow trigger to assign lead + manual tracking | Poor — No credit-based purchase mechanism |
| Click-to-dial from bucket | Power Dialer on Smart List | Partial — GHL has power dialer but without bucket context |
| Daily pull limits | (no equivalent) | None — Cannot throttle lead access per agent |
| Bucket imports with dedup | CSV import with basic dedup | Partial — GHL dedup is email/phone only |
| Personal buckets | Per-agent Smart Lists | Partial — No access isolation |
| HST bucket sync | (no equivalent) | None |

### Data Loss Risks

- **Lead pool structure**: Which leads were in which buckets is lost
- **Access control rules**: Who could access which pool is lost
- **Pull history**: Record of which agent pulled which lead when is lost
- **Credit/billing**: Lead purchase credits and transaction history is lost
- **Daily limit configurations**: Per-agent throttling rules are lost

---

## 7. Automations → GHL Workflows

**GHL Equivalent**: Workflows (triggers, conditions, actions)
**Migration Complexity**: High (manual rebuild required)

### Mapping Approach

| TopBroker Automation Component | GHL Workflow Equivalent | Notes |
|---|---|---|
| Trigger conditions | Workflow triggers | GHL triggers are different — contact-event-based rather than entity-comparison-based |
| Comparison conditions | Workflow conditions (If/Else) | Generally mappable but insurance-specific conditions (carrier change, policy status) need custom triggers via webhooks |
| Tasks (actions) | Workflow actions | GHL has rich action library (email, SMS, wait, webhook, etc.) |
| Per-agent sync | Workflow enrollment per user | Different model — GHL enrolls contacts, TopBroker syncs automations to agents |
| Agency toggle | Workflow on/off per location | Similar concept |
| Hours restrictions | Time-based conditions in workflow | GHL supports time windows |
| Templates | Workflow recipes/templates | Both support saving as templates |

### What Cannot Be Automatically Migrated

Automations MUST be manually rebuilt in GHL. There is no import format. The process:
1. Document each TopBroker automation's logic (trigger, conditions, actions)
2. Identify GHL trigger equivalent (or webhook if insurance-specific)
3. Rebuild conditions and actions in GHL workflow builder
4. Test with sample contacts before going live

---

## 8. Communication Templates → GHL Templates

**GHL Equivalent**: Email Templates, SMS Templates
**Migration Complexity**: Low-Medium

### Field Mapping

| TopBroker Template Element | GHL Equivalent | Notes |
|---|---|---|
| Email template body (HTML) | Email template body | Direct copy. May need to update merge field syntax (`{{lead.first_name}}` → `{{contact.first_name}}`) |
| Text template body | SMS template body | Direct copy with merge field updates |
| Voicemail scripts | Voicemail drop recordings | Must re-record — script text cannot auto-convert to audio |
| Email signatures | Email signature settings | Manual recreation |
| Text signatures | (append to templates) | No dedicated text signature — append to SMS templates |
| Template previews | Template preview | Both support preview |
| Quotesheet email templates | (no equivalent) | Quotesheet merge fields won't work in GHL |
| Recruiting templates | Regular templates with recruiting tags | Lose separation between sales and recruiting templates |

### Merge Field Translation

| TopBroker Merge Field (estimated) | GHL Merge Field |
|---|---|
| `{{lead.first_name}}` | `{{contact.first_name}}` |
| `{{lead.last_name}}` | `{{contact.last_name}}` |
| `{{lead.email}}` | `{{contact.email}}` |
| `{{lead.phone}}` | `{{contact.phone}}` |
| `{{agent.name}}` | `{{user.name}}` |
| `{{agent.phone}}` | `{{user.phone}}` |
| `{{agent.email}}` | `{{user.email}}` |
| `{{agency.name}}` | `{{location.name}}` |
| Insurance-specific fields | Custom field merge tags — must create and map |

---

## 9. Reports → (Mostly No Equivalent)

**GHL Equivalent**: Dashboard widgets, basic reporting
**Migration Complexity**: N/A (reports are views, not data — cannot be migrated)

### Mapping Summary

| TopBroker Report Category | GHL Coverage | Action |
|---|---|---|
| Sales/revenue reports | Partial — opportunity revenue | Rebuild with GHL reporting or external BI |
| Agent performance reports | Minimal | Build in external BI (Google Data Studio, Metabase) |
| Commission reports (8 types) | None | Part of external commission system |
| Bucket/distribution reports | None | No data source in GHL |
| Lead source reports | Partial — source attribution | Use GHL's attribution reporting |
| Custom reports | Partial — limited customization | External BI tool recommended |
| Compliance reports (state, last-login, DNC) | None | Build custom or use compliance tool |
| Insurance-specific (grace-pull, agent-carrier, split-sale) | None | External system required |

---

## Migration Sequencing Recommendation

| Phase | Entities | Effort | Dependency |
|---|---|---|---|
| 1. Foundation | GHL Location setup, custom fields, pipeline stages, user accounts | 1-2 weeks | None |
| 2. Contacts | Leads → Contacts (primary fields only) | 1 week | Phase 1 |
| 3. Policies | Policy data → Contact custom fields (primary policy per contact) | 1-2 weeks | Phase 2 |
| 4. Communication | Email/SMS templates with merge field translation | 1 week | Phase 1 |
| 5. Workflows | Rebuild automations in GHL | 2-4 weeks | Phases 1-4 |
| 6. Campaigns | Recreate email/SMS campaigns | 1 week | Phases 4-5 |
| 7. Dependants | Dependant contacts with linkage | 1-2 weeks | Phase 2 |
| 8. Documents | Critical file re-upload | 1-2 weeks | Phase 2 |
| **Total estimated**: **8-14 weeks** for data migration. Does NOT include building replacements for missing features (commissions, quotesheets, buckets, recruiting). |
