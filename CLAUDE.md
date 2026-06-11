# Compass CRM

White-labeled CRM built on Go High Level (GHL). Planning phase — will be active soon.

## Key Objectives

- Full white-label branding (logo, colors, domains, mobile app)
- Custom funnels, websites, landing pages, workflows
- Branded client portal, membership areas, email templates
- API integrations and custom app development
- Consistent design system across all touchpoints

## File Structure

```
Compass_CRM/
├── CLAUDE.md
├── docs/
│   └── ghl-reference.md    # Full GHL platform reference (API, CSS, data models, etc.)
├── top_broker/              # TopBroker CRM reverse engineering (field schemas, gap analysis)
├── src/                     # Custom integrations/apps
├── assets/
│   ├── logos/               # Logo variants (full, icon, light-bg, dark-bg)
│   └── images/
└── .gitignore
```

## GHL Platform Reference

See `docs/ghl-reference.md` for the complete GHL reference including:
- Architecture, terminology, pricing tiers
- API (auth, endpoints, rate limits, pagination, data models, webhooks, scopes)
- Design & customization (control matrix, branding checklist, CSS injection points, page builder)
- CSS best practices, design tokens, accessibility guidelines
- Workflows & automations (triggers, actions)
- Communication channels, integration ecosystem, reporting

## Important URLs

| Resource | URL |
|----------|-----|
| GHL Login | https://app.gohighlevel.com/ |
| API Docs | https://marketplace.gohighlevel.com/docs/ |
| API Base | https://services.leadconnectorhq.com |
| SDK | https://github.com/GoHighLevel/highlevel-api-sdk |
| Status | https://status.gohighlevel.com/ |

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `GHL_API_KEY` | Private Integration API key |
| `GHL_CLIENT_ID` | Marketplace App OAuth client ID |
| `GHL_CLIENT_SECRET` | Marketplace App OAuth client secret |
| `GHL_LOCATION_ID` | Sub-account (location) identifier |

## Critical Gotchas

- **Always include `Version: 2021-07-28` header** in API requests — omitting it causes silent failures or unexpected responses
- **Phone numbers must be E.164** (`+1XXXXXXXXXX`) — malformed numbers cause silent failures
- **Sub-accounts are fully isolated** — contacts, conversations, pipelines do NOT cross boundaries
- **GHL class names change on platform updates** — custom CSS targeting `.hl-*` classes can break without notice; audit after every GHL update
- **No CSS injection into CRM backend** — only funnels, websites, forms, blogs, and email support custom CSS
- **Email templates cannot use CSS variables** — inline-only CSS, email-safe fonts, 600px max-width
- **GHL does NOT auto-scale fonts for mobile** — set mobile font sizes manually per element
- **Hidden elements still load in DOM** — `display: none` affects performance and SEO
- **Rate limits**: 100 req/10s burst, 200k/day per app per resource — use exponential backoff

## Development Conventions

- Store API keys in environment variables, never in code
- Pin to a specific API `Version` header value; test before upgrading
- Handle rate limits with exponential backoff
- Verify webhook signatures; implement idempotency (deduplicate by event ID)
- Clear, descriptive naming; comment only where logic is not self-evident
- Prefer simple, direct solutions over abstractions

## GHL Customization Workflow

1. **White-label first** — branding, domains, logos before building pages
2. **Snapshot-based onboarding** — master snapshot with branded templates; builder settings survive CSS breakage
3. **Centralized CSS** — host brand stylesheet on CDN, link in all funnels/websites, version filenames for cache-busting
4. **Component library** — reusable global sections (header, hero, CTA, footer, etc.)
5. **Test responsively** — preview all breakpoints; fix with custom CSS media queries
6. **Accessibility audit** — axe DevTools, contrast ratios, keyboard nav, form labels
7. **Audit after GHL updates** — platform updates can break custom CSS

## Design Principles

- **Brand consistency** across all touchpoints
- **Trust and credibility** — clean layouts, professional visual weight
- **Mobile-first** — most end-user interactions happen on mobile
- **Visual hierarchy** — clear, scannable layouts with obvious CTAs
- **Accessibility** — WCAG AA contrast (4.5:1 text, 3:1 large text), semantic HTML, keyboard nav
- **Performance** — minimal custom JS, lazy-load resources, optimize images (WebP, <200KB)
- **Progressive enhancement** — core functionality works without JS
