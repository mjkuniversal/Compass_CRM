# TopBroker CRM — Data Model

Entity relationships reverse-engineered from URL routes (1,275) and confirmed via authenticated Playwright crawl (53 Inertia page responses).

> **For actual field-level schemas** (types, sample values, enums), see `field-schemas.md` — 1,330 lines extracted from runtime Inertia props.

## Entity Relationship Diagram

```
                            ┌──────────────────────┐
                            │       AGENCY          │
                            │  (top-level org)      │
                            └──────────┬────────────┘
          ┌────────────┬───────────┬───┴───┬──────────┬──────────┬───────────────┐
          │            │           │       │          │          │               │
          v            v           v       v          v          v               v
     ┌─────────┐ ┌─────────┐ ┌────────┐ ┌──────┐ ┌───────┐ ┌────────┐  ┌─────────────┐
     │  AGENT  │ │ BUCKET  │ │CARRIER │ │ LEAD │ │ROUND  │ │CAMPAIGN│  │ COMMISSION  │
     │         │ │         │ │        │ │ TAG  │ │ROBIN  │ │(Email/ │  │ STATEMENT   │
     └────┬────┘ └────┬────┘ └────────┘ └──────┘ │GROUP  │ │ Text)  │  └──────┬──────┘
          │           │                           └───┬───┘ └───┬────┘         │
          │           │                               │         │              │
          │      ┌────┴─────┐                    ┌────┴───┐     │         ┌────┴─────┐
          │      │  LEADS   │                    │ AGENTS │     │         │ ENTRIES  │
          │      │ (pooled) │                    │(member)│     │         │ OVERRIDES│
          │      └──────────┘                    └────────┘     │         │ SUMMARY  │
          │                                                     │         └──────────┘
          │           ┌──────────────────────────────────┐      │
          │           │            LEAD                  │      │
          │           │   (contact / prospect)           │◄─────┘
          │           └──────────────┬───────────────────┘   (campaign
          │                         │                        targeting)
          │    ┌──────┬──────┬──────┼──────┬──────┬──────┬──────┐
          │    │      │      │      │      │      │      │      │
          │    v      v      v      v      v      v      v      v
          │ ┌──────┐┌────┐┌─────┐┌─────┐┌────┐┌─────┐┌────┐┌──────┐
          │ │DEPEND││FILE││MEDI-││DOCT-││NOTE││QUOT-││TAG ││FORM  │
          │ │ANT  ││    ││CATION││OR   ││    ││SHEET││    ││SUBMN │
          │ └──────┘└────┘└─────┘└─────┘└────┘└──┬──┘└────┘└──────┘
          │                                      │
          │                                 ┌────┴─────┐
          │                                 │   PLAN   │
          │                                 └────┬─────┘
          │                                      │
          │                                 ┌────┴─────┐
          │                                 │ PRODUCT  │
          │                                 └────┬─────┘
          │                                 ┌────┴─────┐
          │                                 │ QA/TEXT  │
          │                                 │ BULLETS  │
          │                                 └──────────┘
          │
          │    ┌───────────────────────────────────────────┐
          └───►│         AUTOMATION                        │
               │  (conditions, tasks, templates)           │
               └───────────────────────────────────────────┘

     ┌──────────────────────┐
     │  RECRUITING LEAD     │  (separate pipeline)
     │  Sources, Locations, │
     │  Tasks, Custom Tags  │
     └──────────────────────┘
```

## Entity Details

### 1. Agency (top-level organization)

**Business purpose**: The tenant/organization. Agencies are the billing unit in TopBroker's multi-tenant SaaS model.

**Relationships**:
- Has many: Agents, Buckets, Carriers, Lead Tags, Dead Reasons, Department Skills, Bookmarks, Working Hours, Training, Billing Profiles, Notifications, DNC Keys, Twilio Settings, Stripe Keys, Sidebar Widgets, Email Settings, Text Settings, QSP Categories

**Confirmed fields**: 30 top-level + 56 nested in `settings` object (see `field-schemas.md` §4-5)
- Identity: name, owner name, phone, email, address, UUID, domain
- Billing: billing_option (`agency`/`agent`), per_agent_fee ($25), free_look_period, Stripe keys
- Commissions: commissions_enabled, calendar PDF/URL, link text
- Settings (56): missed appt handling, DNC automation, grace pulls, 5 notification email lists, 7 white-label colors, feature toggles

---

### 2. Agent (user / member of agency)

**Business purpose**: An insurance agent or staff member who works leads, makes sales, and earns commissions.

**Relationships**:
- Belongs to: Agency
- Has many: Carriers (with hierarchy, downline data, transfer-downline), Licenses, Files, Notes, Training records, Bucket Access rules, Account Access rules, Cards, Credits, Twilio Account
- Has one: Contract Info, Stripe Keys, HST Data Migration config

**Confirmed fields**: 52 fields (see `field-schemas.md` §3)
- Identity: first_name, last_name, email, title, address, city, state_id, zip, birthday, company
- Phones: office_phone, call_forwarding_number, mobile_phone, sms_number, area_code
- Status: is_active, inactive_at, last_login, roles
- Licensing: npn_number, SSN, tax_id
- Financial: stripe_id, pm_type, pm_last_four, has_commissions, skip_billing, force_agent_pay
- Integration: google_account, microsoft_account, hst_authentication, api_key
- Legacy: legacy_id, legacy_migration_at, from_lead_id

**Key actions**:
- `toggle-active` — Enable/disable agent
- `provision-twilio` — Set up Twilio for agent
- `authorize-autoreplenish` — Enable automatic credit top-up

---

### 3. Lead (contact / prospect)

**Business purpose**: A person who may purchase insurance. The central entity — almost everything in the system connects to or operates on leads.

**Relationships**:
- Has many: Dependants (with SSN), Medications, Doctors, Files, Carriers, Licenses, Tags, Notes, Types, Quotesheets, Form Submissions, Login Credentials, New Policies/Transactions
- Belongs to: Bucket (source), Agent (assigned)

**Confirmed fields**: See `field-schemas.md` §29 (Leads Search page: 42 props) and §6 (8 statuses)
- Identity: first name, last name, email, phone, SSN, DOB, company, language (8 options)
- Address: address, city, state (52 states), zip
- Statuses: Uncontacted, Contacted, Sold, Disconnected, Missed Appt, Cancelled, Unreachable, Dead
- Sub-entities: dependants, medications, doctors, files, carriers, licenses, tags, notes, types, quotesheets, form submissions, login credentials, policies
- Tracking: 1 source in this account (Referral), lead_custom_tags, dead_reasons (DNC, Not Interested, Already Purchased)

**Key actions**:
- `compose-email` / `send-sms` — Outbound communication
- `DNC` — Add to Do Not Contact list
- `transfer` — Transfer lead to another agent
- `refer-to-department` — Route to a department
- `change-source` — Update lead source attribution
- `mark-phone-valid` — Verify phone number
- `hst-lock-check` — Check HST lock status
- `expire-ignore` — Expire or ignore lead
- `renew-policy` — Trigger policy renewal
- `update-affiliate` — Change affiliate attribution

---

### 4. Bucket (lead pool)

**Business purpose**: A container for leads that controls distribution and access. Agents pull leads from buckets. Think of it as a queue or inventory pool.

**Relationships**:
- Belongs to: Agency (agency buckets) or Agent (personal buckets)
- Has many: Leads, Access rules, Import sessions
- Types: Agency Buckets, Personal Buckets, HST Buckets

**Confirmed fields**: 25 fields per bucket (see `field-schemas.md` §13)
- Identity: name, type_code (0=purchase, 1=click-to-dial), agency_id
- Distribution: distribution_method, stale_lead_action, selling_price, daily_limit
- Access: sharing rules, daily limits per agent
- Stats: 634 total buckets visible, 24 agency-level

**Key actions**:
- `click-to-dial` — Initiate call to next lead
- `purchase-lead` — Agent buys a lead from bucket
- `discard-lead` — Return lead to pool
- `contacted` / `dead` / `disconnected` / `sold-leads` — Lead status transitions within bucket

**Sharing model**:
- Agency Bucket Sharing — Share buckets across agencies
- Agent Bucket Sharing — Share buckets between agents

---

### 5. Quotesheet (quote presentation)

**Business purpose**: A formatted quote document sent to leads showing insurance plan options. Quotesheets are the primary sales tool.

**Relationships**:
- Belongs to: Lead
- Has many: Plans (ordered) -> Products (ordered, movable)
- QS Products have: QA Bullets (ordered), Text Bullets (ordered)

**Estimated fields**:
- Identity: name, UUID (for public URLs)
- Presentation: email template, logo
- Plans: ordered list of plans, each containing ordered products
- Products: QA bullets (ordered), text bullets (ordered)
- Templates: plan templates (agency-level and global, each with products)

**Key actions**:
- `send` — Send quotesheet to lead (with email validation)
- Public view: `/go/qsx/{uuid}` — Shareable link (no auth required)

---

### 6. Automation

**Business purpose**: Rule-based workflow engine. Triggers fire on events, conditions filter, and tasks execute actions (send email, assign lead, etc.).

**Relationships**:
- Has many: Conditions (comparison-based, trigger-based), Tasks
- Can be created from templates

**Estimated fields**:
- Identity: name, description
- Configuration: is-agency flag, add-new-agents flag
- Conditions: entity type, comparison operator, trigger type
- Tasks: action type, parameters
- Schedule: hours, sync settings

**Key actions**:
- `sync-users` — Sync automation user assignments
- `update-hours` / `update-name` — Modify automation properties
- Toggle active/inactive

**Automation entity types** (from `/api/automatable_entities/{entity}`):
- Each entity type exposes its own set of tasks and triggers

---

### 7. Campaign (Email or Text)

**Business purpose**: Drip marketing sequences. Send scheduled emails or texts to leads matching certain criteria.

**Relationships**:
- Has: Criteria (targeting rules), Details, Messages (sequence), Sending Times
- Types: Email Campaign, Text Campaign
- Targets: Leads (with per-lead enable/disable)

**Estimated fields**:
- Identity: name, type (email/text)
- Criteria: targeting rules, lead filters
- Messages: ordered sequence with content and timing
- Schedule: sending times, frequency
- Status: draft, published, terminated

**Key actions**:
- `publish` — Activate campaign
- `terminate` / `unterminate` — Pause/resume
- Per-lead: `enable` / `disable` / `global-enable` / `global-disable`

---

### 8. Commission Statement

**Business purpose**: Tracks and distributes insurance carrier commission payments to agents. Supports multi-level hierarchies (admin, agency-admin, agent).

**Relationships**:
- Scoped by: Admin, Agency-Admin, or Agent level
- Has many: Entries, Failed Rows, Duplicate Rows, Files per user
- Has: Overrides Detail, Personal Production Detail, Summary

**Estimated fields**:
- Identity: period (month/year), carrier, status
- Data: entries (policy, amount, agent), failed rows, duplicate rows
- Matching: carrier agent IDs, WA IDs, excluded PA IDs
- Rollup: overrides detail, personal production detail, summary

**Key actions**:
- `publish` / `schedule-publish` — Release statement to agents
- `export CSV` — Download for external processing
- Agent matching configuration (carrier agent IDs, WA IDs)

---

### 9. Round Robin Group

**Business purpose**: Distributes leads fairly among a group of agents using round-robin logic. Supports weighted distribution and lead programs.

**Relationships**:
- Has many: Agents (members)
- Per-agent: entries, details, override-states, states-used-option
- Has: Distribution Log, Lead Program

**Confirmed fields**: 20 fields per group (see `field-schemas.md` §14)
- Identity: name, is_active, agency_id
- Distribution: overflow routing (to bucket, RR group, or user), lookback period
- Members: agent list with caps, bad_phone_credit, auto_add_new_agents
- Lead Program: is_active toggle, per-agent subscription pricing

---

### 10. Recruiting Lead (separate pipeline)

**Business purpose**: Tracks prospective agents being recruited to join the agency. Completely separate from insurance sales leads.

**Relationships**:
- Has many: Sources, Locations, Tasks, Custom Tags
- Has: Email Templates, Text Templates, Voicemail Templates
- Has: Action Schedules

**Estimated fields**:
- Identity: name, email, phone, location
- Pipeline: source, status, custom tags
- Outreach: action schedules, template assignments
- Tracking: stats, pending-contracting-list

---

## Supporting Entities (from routes)

| Entity | Parent | Purpose |
|--------|--------|---------|
| **Dependant** | Lead | Family members on a policy (stores SSN) |
| **Medication** | Lead | Current medications for quoting |
| **Doctor** | Lead | Current doctors for network matching |
| **Lead Tag** | Agency, Lead | Categorization labels |
| **Dead Reason** | Agency | Why a lead was marked dead |
| **Department Skill** | Agency | Skills for department-based routing |
| **Carrier** | Agency, Agent, Lead | Insurance carrier appointments |
| **License** | Agent, Lead | State insurance licenses |
| **Training** | Agency, Agent | Training records and materials |
| **Billing Profile** | Agency | Payment profiles for agency billing |
| **DNC Key** | Agency | Do Not Call list management |
| **Bookmark** | Agency | Saved links/shortcuts |
| **QSP Category** | Agency | Quotesheet plan categories |
| **Form Submission** | Lead | Completed form data |
| **Lead Login** | Lead | Portal credentials for leads |
| **Card** | Agent | Payment cards on file |
| **Credit** | Agent | Lead purchase credits |

## Key Observations for woxom-crm

1. **Lead is the hub** — Nearly every feature connects to leads. The data model is radically lead-centric.
2. **Bucket abstraction** is powerful — Decouples lead sourcing/purchasing from lead working. 634 buckets, 38 starting points (4 types: assign, text, bucket, RR).
3. **Quotesheet hierarchy** (Quotesheet -> Plans -> Products -> Bullets) is deep but well-structured. Each level is independently orderable.
4. **Commission engine** is complex — Multi-level (admin/agency/agent), handles failed/duplicate rows, and has carrier agent ID matching. This is a significant build for woxom-crm.
5. **Recruiting is fully separate** — Own pipeline with 7 statuses (Recruit → Licensed), templates, and tracking. Not mixed with sales leads.
6. **Round Robin** is a first-class entity, not just a setting — Has its own distribution log, overflow routing, and lead program subscriptions.
7. **Per-lead campaign control** — Campaigns can be toggled on/off per individual lead, not just globally. This is granular.
8. **HST** = HealthSherpa integration. Has its own bucket type, lock checks, credit transfers, data migration per agent, and product ID mapping.
9. **Shared payload bloat** — 23 props on every page including full Ziggy route map. Balance management page sends 9.8MB (4,986 user records). Performance antipattern to avoid.
10. **Agency settings** is a 56-field nested object — controls behavior, notifications, theming, Stripe, and feature toggles. Far more configurable than it appears from routes alone.
