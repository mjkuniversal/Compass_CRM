# Top Broker — Reverse Engineering

Insurance-specific SaaS CRM at `apps.topbrokercrm.com`. Reverse engineering to plan prospect migration to GHL.

**Status**: Route analysis + authenticated crawl complete. Field schemas extracted.
**Purpose**: Demonstrate GHL feature parity (or identify gaps) for prospect agency migration

## Tech Stack

Laravel + Inertia.js + Sanctum + Stripe + Twilio + Horizon (queues) + Google/Microsoft OAuth

## Entity Model (40+ entities, 1,275 routes)

- **Core**: Leads (15 sub-resources), Agents (52 fields), Agencies (30 + 56 settings), Buckets (lead pools)
- **Sales**: Quotesheets (plans → products → QA/text bullets), 3 Carriers, 62 Products, 22 Categories, Round Robin
- **Comms**: Text Inbox (Twilio SMS/MMS), Email/Text Campaigns, Email Blasts, Autoresponders, Templates
- **Automation**: Automations (conditions + tasks + triggers), 30 Action Schedules, User Automations
- **Finance**: Commission Statements (3 role levels), Credit-based lead marketplace ($3-$60/lead)
- **Recruiting**: Full sub-CRM with 7 statuses (Recruit → Licensed)
- **Reports**: 30+ types (agent-carrier, commission, bucket-pull, custom, etc.)
- **Distribution**: 634 buckets, 38 starting points (4 types: assign, text, bucket, round-robin)

## Key Findings

- 52% of TopBroker features have **no GHL equivalent** — see `analysis/gap-analysis.md`
- 1,021 agents in this agency, 8 lead statuses, 8 languages
- Agency settings: 56-field config object controlling behavior, notifications, theming
- Balance system: 9.8MB payload sends full user records — performance antipattern

## Crawler

```bash
TB_EMAIL=x TB_PASSWORD=y node crawl.js [--headed]
```

Captures Inertia page props (JSON), screenshots, and HAR files.

## Artifacts

```
top_broker/
├── raw/routes/ziggy-routes.txt        # 1,275 raw routes from Ziggy
├── raw/routes/entities-summary.md     # Grouped entity inventory (~100 entities)
├── raw/pages/*.json                   # 53 Inertia page props (field schemas)
├── raw/screenshots/*.png              # 72 page screenshots
├── raw/har/full-session.har           # 305MB HAR capture
├── api/README.md                      # Tech stack, auth, API surface
├── api/endpoints.md                   # All 1,275 routes by entity
├── data-model/README.md               # Entity relationships + ASCII diagram
├── data-model/field-schemas.md        # 1,330 lines — actual field types from props
├── analysis/feature-parity-matrix.md  # TB vs GHL (170 features)
├── analysis/data-migration-map.md     # Entity mapping + field migration
├── analysis/gap-analysis.md           # 10 critical gaps + recommendations
├── crawl.js                           # Playwright crawler
└── inspect-props.js                   # Props inspection utility
```

## Next Steps

- [ ] Test vendor API with minimal payloads (`POST /api/{vendor_key}/leads`)
- [ ] Cross-reference with `../hwh-crm/IMPLEMENTATION_PLAN.md`
- [ ] Deep-dive into automation builder (needs admin access)
- [ ] Capture quotesheet builder UI (no leads to create one from yet)

## Gotchas

- Reverse engineering only — no production dependencies on TopBroker
- Vendor key is POST-only; cannot read existing data via API
- Commission system is the hardest gap — buy dedicated tool, don't build
- Agent-level account (not admin) — 403 on: agencies, agency_carriers, bob-upload, sale-sharing, lead-redirect, hst-bucket-sync
- Credentials in env vars only — never in tracked files

## Hive Teams

| Team | Lead | Use For |
|------|------|---------|
| Research | research-lead | API analysis, data model mapping |
| Full-Stack | fullstack-lead | Schema comparison with hwh-crm |
