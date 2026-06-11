# TopBroker CRM — API & Tech Stack

Base URL: `https://apps.topbrokercrm.com`

> **Data sources**: Route analysis (1,275 Ziggy routes) + authenticated Playwright crawl (53 pages of Inertia props). For actual runtime field schemas, see `../data-model/field-schemas.md`.

## Tech Stack (confirmed from route analysis + crawl)

| Layer | Technology | Evidence |
|-------|-----------|----------|
| **Framework** | Laravel (PHP) | Ziggy route generation, Inertia.js SSR |
| **Auth** | Laravel Sanctum | CSRF cookie at `/sanctum/csrf-cookie`, API tokens, session-based |
| **Payment** | Stripe | Webhooks, setup intents, invoices, subscription billing (agency/agent/super-admin) |
| **Communication** | Twilio | Voice + SMS, provisioning, webhooks, messaging services, 10DLC onboarding (business info, address, authorized rep) |
| **Queues** | Laravel Horizon | Jobs dashboard at `/horizon/*` |
| **Calendar** | Google Calendar/Gmail OAuth, Microsoft Calendar OAuth | OAuth flows for both providers |
| **File Upload** | Froala editor | Image/file upload at `/api/froala/*` |
| **Debug** | Laravel Debugbar | `/_debugbar/*` (dev only) |
| **Error Handling** | Ignition | `/_ignition/*` |
| **EULA** | Custom flow | `/agree-to-eula`, `/eula` |

## Auth Patterns

### Session-Based Auth
- `POST /login` — Standard login
- `POST /logout` — Logout
- CSRF token via Sanctum (`GET /sanctum/csrf-cookie`)

### Two-Factor Authentication
- `POST /verify2fa` — 2FA verification step
- `POST /confirm-password` — Password confirmation gate

### API Keys
- `/api-keys` — CRUD for API key management
- Vendor keys used for lead ingestion (see Vendor API below)

### Impersonation (admin feature)
- `GET /impersonate/user/{user}` — Start impersonating a user
- `GET /impersonate/end` — Stop impersonating
- `GET /login-as/{other_user}` — Login as another user
- `GET /login-as/leave` — Return to own account

## Vendor / Public API Endpoints

**Important**: The API key we have (`tb_...`) is a vendor key for lead ingestion — POST-only to `/api/{vendor_key}/leads`. It does NOT provide read access to the full API.

### Lead Ingestion
| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/{vendor_key}/leads` | Lead ingestion (vendor key auth) |
| `POST` | `/api/leadcloud/lead` | LeadCloud integration |
| `POST` | `/api/rtb` | Real-time bidding |
| `GET` | `/api/check-duplicate-leads` | Duplicate lead checking |

### Sales Reporting
| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/sales` | Sales reporting |

### Consent Management
| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/consents-create` | Create consent record |
| `POST` | `/api/consents-fetch/{lead}` | Fetch consent for a lead |
| `POST` | `/api/soa-consents-create` | SOA (Scope of Appointment) consent |
| `POST` | `/api/spanish-consents-create` | Spanish-language consent |
| `POST` | `/api/spanish-soa-consents-create` | Spanish SOA consent |

### Lead Operations
| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/grab-lead/{lead}` | Grab/claim a lead |
| `POST` | `/api/hst/credit-transfer` | HST credit transfer |

### Search
| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/action-search` | Search actions |
| `GET` | `/api/agents-search` | Search agents |
| `GET` | `/api/user-email-check` | Check email availability |
| `GET` | `/internal/keyword-search` | Internal keyword search |
| `GET` | `/super-search` | Global search |

### Automation
| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/automatable_entities/{entity}/tasks` | List tasks for an automatable entity |
| `GET` | `/api/automatable_entities/{entity}/triggers` | List triggers for an automatable entity |

### Miscellaneous
| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/lead-logins/{leadLogin}/show-password` | Retrieve lead login password |

### Documentation Pages (in-app)
- `/docs/feed-api` — Feed API documentation
- `/docs/incoming-sales` — Incoming sales data format
- `/docs/bucket-lead-upload` — Bucket lead upload instructions

## Internal API Patterns

Routes follow Laravel resource conventions:

```
/agencies/{agency}/agents                    → index, store
/agencies/{agency}/agents/{agent}            → show, update, destroy
/agencies/{agency}/agents/{agent}/carriers   → nested resource
```

Most internal endpoints use Inertia.js (server-rendered SPA), not JSON API responses. The vendor API endpoints listed above are the true REST/JSON endpoints.

## Inertia.js Response Pattern

All internal pages use Inertia.js SSR. Page data is embedded in `#app[data-page]` as JSON:

```json
{
  "component": "Leads/Create",
  "props": { /* 27 prop keys including form field schemas */ },
  "url": "/leads/create"
}
```

Every page includes 23 shared props (auth, currentAgency, ziggy, flash, productCategories, ui_customization, feature flags). See `../data-model/field-schemas.md` §1 for the full shared props specification.

**Crawler**: `TB_EMAIL=x TB_PASSWORD=y node ../crawl.js` captures all page props to `../raw/pages/*.json`.

## Key Observations for woxom-crm

1. **Vendor key pattern** is elegant — each vendor gets a unique key baked into the URL path, no header auth needed for lead POST.
2. **Consent management** is a first-class concern with dedicated endpoints, including Spanish-language variants and SOA-specific flows.
3. **Impersonation** has two separate systems (impersonate + login-as), suggesting the feature evolved over time. woxom-crm should unify this.
4. **Twilio 10DLC** onboarding is deeply integrated — business info, address, and authorized rep collection built into the platform.
5. **Stripe billing** is tiered — separate subscription flows for agencies, agents, and super-admin, suggesting a multi-tenant SaaS model.
6. **Shared payload bloat** — 23 props on every page, including the full Ziggy route map. Balance management page sends 9.8MB with 4,986 full user records.
7. **Agency settings** is a 56-field nested object controlling behavior, notifications, theming, Stripe keys, and feature toggles.
