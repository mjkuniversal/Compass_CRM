# Compass CRM — Project Guide

> A fully white-labeled, custom-branded CRM built on the Go High Level (GHL) platform.

---

## Project Overview

**Compass CRM** is a customized Go High Level (GHL) instance designed to deliver a fully branded CRM experience. The goal is to deeply customize the appearance, UX, and functionality of a new GHL account — transforming it from a generic SaaS tool into a polished, agency-branded product.

### Key Objectives
- Full white-label branding (logo, colors, domains, mobile app)
- Custom-designed funnels, websites, and landing pages
- Tailored workflows and automations
- Branded client portal and membership areas
- API integrations and custom app development where needed
- Consistent design system across all touchpoints

---

## Go High Level — Platform Reference

### Architecture

GHL uses a **multi-tenant hierarchical architecture**:

```
Agency Account (Company)
├── Sub-Account 1 (Location)
│   ├── Contacts, Conversations, Calendars
│   ├── Pipelines & Opportunities
│   ├── Workflows & Automations
│   ├── Funnels & Websites
│   ├── Forms, Surveys, Memberships
│   ├── Payments & Products
│   ├── Custom Fields & Custom Values
│   └── Users, Tags, Settings
├── Sub-Account 2 (Location) ...
└── Agency-Level Settings
    ├── White-label branding & SaaS configurator
    ├── Snapshots (templates)
    ├── Billing, domains, marketplace apps
    └── Agency users & permissions
```

**Data isolation**: Each sub-account is a completely independent data silo. Contacts, conversations, pipelines, and workflows do NOT cross sub-account boundaries.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vue.js / React (migrating), Tailwind CSS, TypeScript |
| Backend | Node.js, NestJS, MongoDB, Redis, Elasticsearch |
| Infrastructure | AWS (S3, SES, CloudFront), Kubernetes |
| Telephony | Twilio (via LeadConnector), WebRTC |
| Payments | Stripe Connect, PayPal |
| Email | Mailgun, SendGrid, AWS SES (LC Email) |

### Key Terminology

| Term | Definition |
|------|-----------|
| **Agency Account / Company** | Master account. Controls all sub-accounts, white-labeling, billing, snapshots. `companyId` in API. |
| **Sub-Account / Location** | Individual client account. Contains its own contacts, pipelines, workflows, funnels. `locationId` in API. |
| **Snapshot** | Complete template/backup of a sub-account config (workflows, funnels, pipelines, fields, calendars). Shareable. |
| **LeadConnector (LC)** | White-label brand name for GHL's telephony (LC Phone), email (LC Email), and mobile app. |
| **Pipeline** | Visual sales process with ordered stages. Opportunities move through stages. |
| **Opportunity** | A deal/potential sale in a pipeline. Has monetary value, stage, and status (open/won/lost/abandoned). |
| **Workflow** | Automation sequence of triggers + actions. Replaced legacy "Campaigns" and "Triggers." |
| **Custom Value** | Location-level variable used in templates via `{{custom_values.name}}`. |
| **Custom Field** | Additional data field on contacts/opportunities beyond system defaults. |
| **Smart List** | Saved dynamic filter/segment of contacts. |
| **Trigger Link** | Trackable link that triggers automations on click. |
| **SaaS Mode** | Config allowing agencies to resell GHL as their own SaaS with automated billing. |
| **SaaS Configurator** | Tool for setting up SaaS pricing plans and feature gating. |
| **DND** | Do Not Disturb — per-channel opt-out settings (SMS, email, calls, WhatsApp, etc.). |
| **A2P 10DLC** | US regulatory requirement for business SMS messaging. GHL handles registration. |
| **Global Section** | Reusable page section in funnel/website builder, synchronized across all pages using it. |
| **msgsndr.com** | Default GHL domain for hosted pages (no custom domain). |
| **leadconnectorhq.com** | Domain for GHL API endpoints and system services. |

### Pricing Tiers

| Plan | Price/Month | Key Differences |
|------|-------------|----------------|
| Starter | $97 | 1 sub-account, core CRM features |
| Unlimited | $297 | Unlimited sub-accounts, API access, no white-label |
| SaaS Pro | $497 | White-label, SaaS mode, custom domains, branded app, rebilling |

---

## API Reference

### Base URL & Authentication

```
Base URL: https://services.leadconnectorhq.com
```

**Private App (API Key)**:
```
Authorization: Bearer {api_key}
Version: 2021-07-28
```

**Marketplace App (OAuth 2.0)**:
```
# 1. Redirect to authorize
https://marketplace.gohighlevel.com/oauth/chooselocation
  ?response_type=code&redirect_uri={uri}&client_id={id}&scope={scopes}

# 2. Exchange code for token
POST https://services.leadconnectorhq.com/oauth/token
Content-Type: application/x-www-form-urlencoded
client_id={id}&client_secret={secret}&grant_type=authorization_code&code={code}

# 3. Use token
Authorization: Bearer {access_token}
Version: 2021-07-28

# 4. Refresh
grant_type=refresh_token&refresh_token={token}
```

### Rate Limits
- ~100-200 requests/minute per location (varies by endpoint)
- Check response headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

### Key API Endpoint Categories

| Category | Endpoints |
|----------|----------|
| Contacts | CRUD, search, bulk, tasks, notes, tags, followers |
| Conversations | List, create, messages (send/receive), update |
| Opportunities | CRUD, pipeline stages, followers, search |
| Calendars | CRUD calendars, events/appointments, free slots |
| Locations | CRUD locations, settings, custom fields, custom values, tags, templates |
| Users | CRUD, search |
| Workflows | List, add/remove contacts |
| Funnels | List funnels, pages, redirects |
| Forms | List, submissions |
| Surveys | List, submissions |
| Payments | Orders, transactions, subscriptions, invoices, products, prices |
| Media | Upload, list, delete files |
| Companies | CRUD company records |
| Social Planner | CRUD posts, categories |
| SaaS | Company/location SaaS config |

### OAuth Scopes (Key)

```
contacts.readonly / contacts.write
conversations.readonly / conversations.write
conversations/message.readonly / conversations/message.write
opportunities.readonly / opportunities.write
calendars.readonly / calendars.write
calendars/events.readonly / calendars/events.write
locations.readonly / locations.write
locations/customFields.readonly / locations/customFields.write
locations/customValues.readonly / locations/customValues.write
locations/tags.readonly / locations/tags.write
users.readonly / users.write
workflows.readonly
forms.readonly / forms.write
surveys.readonly
funnels.readonly / funnels.write
medias.readonly / medias.write
payments.readonly / payments.write
invoices.readonly / invoices.write
companies.readonly / companies.write
saas/company.readonly / saas/company.write
saas/location.readonly / saas/location.write
```

### Core Data Models

**Contact**:
```json
{
  "id": "string",
  "locationId": "string",
  "firstName": "string", "lastName": "string", "name": "string",
  "email": "string", "phone": "string (E.164)",
  "address1": "string", "city": "string", "state": "string",
  "postalCode": "string", "country": "string",
  "companyName": "string", "website": "string", "timezone": "string",
  "dnd": true, "dndSettings": { "Call|Email|SMS|WhatsApp|GMB|FB": { "status": "active|inactive" } },
  "tags": ["string"], "source": "string",
  "dateOfBirth": "YYYY-MM-DD", "assignedTo": "userId",
  "customFields": [{ "id": "string", "key": "string", "value": "any" }],
  "attributionSource": { "utmSource": "", "utmMedium": "", "utmCampaign": "", "gclid": "", "fbclid": "" },
  "dateAdded": "ISO8601", "dateUpdated": "ISO8601"
}
```

**Opportunity**:
```json
{
  "id": "string", "locationId": "string", "name": "string",
  "pipelineId": "string", "pipelineStageId": "string",
  "status": "open|won|lost|abandoned",
  "monetaryValue": 5000.00, "currency": "USD",
  "contactId": "string", "assignedTo": "userId",
  "customFields": [], "tags": [], "source": "string"
}
```

**Conversation / Message**:
```json
{
  "id": "string", "locationId": "string", "contactId": "string",
  "type": "TYPE_PHONE|TYPE_EMAIL|TYPE_SMS|TYPE_FB|TYPE_INSTAGRAM|TYPE_WHATSAPP|TYPE_GMB|TYPE_LIVE_CHAT",
  "assignedTo": "userId", "unreadCount": 0
}
// Messages have: direction (inbound|outbound), status, body, attachments, meta
```

### Webhook Events
Contact: Create, Update, Delete, DND, Tag
Opportunity: Create, Update, Delete, Stage Change, Status Change
Appointment: Create, Update, Delete, Status Change
Conversation: New message (inbound/outbound)
Forms/Surveys: Submission
Payments: Invoice events, order, subscription changes
Note: Create, Update, Delete

---

## Design & Customization System

### Customization Control Matrix

| Area | Control Level | What's Possible |
|------|:------------:|----------------|
| Funnel/Website Pages | **High** | Full HTML/CSS/JS, custom elements, responsive, Google Fonts, animations |
| Forms & Surveys | **Medium-High** | Custom CSS field, field/label/button styling, multi-step, conditional logic |
| Email Templates | **Medium** | Drag-and-drop builder + HTML editor, constrained by email client rendering |
| Chat Widget | **Medium** | Colors, icon, position, header, bubble colors, avatar, greeting |
| Calendar Widget | **Low-Medium** | Primary color, header text, logo; fixed grid layout |
| Client Portal | **Low-Medium** | Logo, colors, custom domain, nav items; fixed layout structure |
| Membership/Courses | **Low** | Content flexibility, thumbnails, modules; fixed page structure |
| CRM Backend | **Low** | Logo, favicon, accent color, dark mode; NO custom CSS injection |
| Navigation | **Very Low** | Hide items, add custom menu links; no reorder, no icon change |
| Mobile App | **Low** | App name, icon, splash screen, accent color; fixed UI structure |

### White-Label Branding Checklist

| Element | Changeable | Notes |
|---------|:----------:|-------|
| Logo (sidebar) | Yes | SVG/PNG, transparent bg, ~250x60px |
| Favicon | Yes | ICO/PNG for browser tabs |
| Primary accent color | Yes | Buttons, links, active states throughout CRM |
| Login page | Partial | Logo, background image, colors, text; fixed form layout |
| Custom domain | Yes | `app.yourdomain.com` replaces GHL URLs |
| Desktop app | Yes | Custom name, icon, splash screen (Electron wrapper) |
| Mobile app | Yes | Custom app name, icon, splash, colors; requires Apple Dev ($99/yr) + Google Play ($25) |
| System emails | Yes | Custom domain, logo, branding via SMTP/Mailgun |
| Support link | Yes | Redirect "?" help to your support |
| Navigation labels | No | Fixed labels (can hide items) |
| Navigation icons | No | Standard icon set |
| Navigation order | No | Fixed order; custom items appear at bottom |
| Backend fonts | No | System default (Inter/system) |
| Error messages | No | Some may still reference HighLevel |

### CSS Injection Points Map

| Location | Scope | Supports | Access Path |
|----------|-------|----------|-------------|
| Funnel Page Custom CSS | Single page | CSS | Funnel > Page > Settings > Custom CSS |
| Funnel Page Head Code | Single page | HTML/CSS/JS | Funnel > Page > Settings > Tracking Code > Head |
| Funnel Page Body Code | Single page | HTML/CSS/JS | Funnel > Page > Settings > Tracking Code > Body |
| Funnel-Level Tracking | All funnel pages | HTML/CSS/JS | Funnel > Settings > Tracking Code |
| Website Page Custom CSS | Single page | CSS | Website > Page > Settings > Custom CSS |
| Website Global Code | All website pages | HTML/CSS/JS | Website > Settings > Tracking Code |
| Custom Code Element | Where placed | HTML/CSS/JS | Drag "Custom JS/HTML" onto page |
| Section/Element Classes | Per element | CSS class names | Element settings > Custom Classes / ID |
| Form Custom CSS | Single form | CSS | Form Builder > Styles > Custom CSS |
| Survey Custom CSS | Single survey | CSS | Survey Builder > Styles > Custom CSS |
| Chat Widget | Widget instance | Limited CSS | Conversations > Chat Widget > Customization |
| Email HTML Editor | Single email | HTML/inline CSS | Email Builder > Source Code view |
| Custom Menu (iframe) | Menu item | Full webpage | Settings > Custom Menu Links |

**No CSS injection available for**: CRM backend dashboard, settings pages, SaaS configurator, agency dashboard, or calendar booking widget internals.

### CSS Best Practices

**Use CSS Variables for Brand Consistency:**
```css
:root {
  --brand-primary: #your-color;
  --brand-secondary: #your-color;
  --brand-accent: #your-color;
  --font-heading: 'Your Heading Font', sans-serif;
  --font-body: 'Your Body Font', sans-serif;
  --spacing-unit: 8px;
  --border-radius: 8px;
}
```

**Host a centralized stylesheet** on a CDN and `<link>` it in every funnel/website's global tracking code for cross-property consistency. Version it (e.g., `styles-v2.3.css`) to manage cache-busting.

**Common class targets**: `.hl-form-input`, `.hl-form-label`, `.hl-form-button`, `.hl-page-preview--content`, `.hl-powered-by`

**Caveats**:
- GHL uses dynamically generated class names in some areas — inspect via DevTools
- Class names may change on platform updates without notice
- Some elements render dynamically after page load — may require `!important` or delayed application
- jQuery is loaded by default on GHL pages
- iFrame-embedded widgets (chat, calendar on external sites) cannot be styled from the parent page

### Page Builder Elements

**Layout**: Sections, Rows, Columns (1/2, 1/3, 2/3, 1/4, 3/4)
**Content**: Headline, Sub-headline, Paragraph, Image, Video (YouTube/Vimeo/Wistia/HTML5), Button, Divider, Spacer, Icon, Carousel, Lists, Nav Menu, Logo
**Lead Capture**: Form, Survey, Calendar embed, Two-step order form
**Commerce**: Order form, Pricing table, Countdown timer, Progress bar, Coupon
**Social**: Testimonials, FAQ/Accordion, Social sharing, Google Maps, Reviews
**Advanced**: Custom JS/HTML block, iFrame embed, Trigger links, Popup/Modal, Sticky bars

**Responsive**: Desktop/Tablet/Mobile views with per-breakpoint styling, hide/show per device, column stacking. Fixed breakpoints (~768px, ~480px). Custom media queries via CSS for finer control.

**Typography**: Google Fonts integration + `@font-face` custom uploads. No global type scale — set per element or via custom CSS.

**Colors**: HEX/RGB/HSL picker, opacity/alpha, gradients, saved color palette (not design tokens — changing a swatch doesn't update all instances).

---

## Workflows & Automations

### Trigger Categories

| Category | Key Triggers |
|----------|-------------|
| Contact | Created, Changed, Tag Added/Removed, DND Updated, Birthday |
| Communication | Inbound Message, Customer Replied, Call Status Changed |
| Opportunity | Status Changed, Stage Changed, Created, Stale |
| Calendar | Booked, Confirmed, Showed, No-Show, Cancelled, Rescheduled |
| Forms/Surveys | Submitted |
| Payments | Invoice events, Order Submitted, Payment Received |
| Membership | Signup, Lesson Completed, Login |
| External | Inbound Webhook, Custom Webhook (marketplace app) |
| Scheduling | Date/Time Based, Recurring |

### Action Categories

| Category | Key Actions |
|----------|------------|
| Communication | Send SMS/MMS, Send Email, Internal Notification, Review Request, Voicemail Drop, IVR Call, Facebook/Instagram/WhatsApp/GMB Message, Live Chat |
| CRM | Create/Update Contact, Add/Remove Tag, Create/Update Opportunity, Assign User, Add to Smart List, Set DND, Delete Contact, Add Note, Create Task |
| Flow Control | If/Else branching, Wait (duration), Wait Until (event), Go To, Goal Event |
| External | HTTP Webhook (GET/POST/PUT/PATCH/DELETE with response mapping), Google Sheets, Slack, Zapier/Make triggers |
| Data | Math Operations, Set Custom Field, Number/Date Formatter |
| AI | OpenAI/ChatGPT action, Conversation AI toggle |
| Payments | Create/Send Invoice |
| Membership | Grant/Revoke Offer Access, Enroll in Course |

---

## Communication Channels

| Channel | Integration | Notes |
|---------|------------|-------|
| SMS/MMS | LC Phone (built-in Twilio) or BYO Twilio | A2P 10DLC required for US. Pay-per-message. |
| Email | LC Email, Mailgun, SendGrid, or custom SMTP | Domain verification (DKIM/SPF/DMARC). IMAP sync for two-way. |
| WhatsApp | WhatsApp Business API (via Meta) | Template messages for outbound; 24hr session window for free-form. |
| Facebook Messenger | Facebook Business Page connection | Two-way. Comment-to-DM automations. |
| Instagram DM | Instagram Business/Creator account | Two-way. Story mention triggers. |
| Google Business Messages | Google Business Profile | Two-way. Check current availability (Google sunsetting some features). |
| Live Chat | Native webchat widget | Embeddable JS snippet. Modes: live, SMS-connect, email-connect. |
| Phone (Voice) | LC Phone / Twilio | Inbound routing, IVR, call recording/transcription, power dialer, voicemail drops, missed-call text-back. WebRTC browser calling. |

---

## Integration Ecosystem

### Marketplace Apps
- **Custom Workflow Actions**: New action types in the workflow builder
- **Custom Pages (iFrame)**: Apps render inside GHL sidebar as iFrames, receiving `locationId`, `companyId`, `userId` context
- **Custom Tabs**: Add tabs to contact/opportunity detail views
- **SSO**: GHL provides SSO tokens for embedded app authentication
- **Webhook Subscriptions**: React to platform events

### External Integrations
- **Native**: Google (Calendar, Ads, Analytics, GMB), Facebook (Ads, Messenger, IG), Stripe, QuickBooks, Shopify, WordPress
- **Zapier**: 5000+ apps, triggers/actions for contacts, opportunities, appointments, forms, payments
- **Make.com**: Similar coverage with more complex scenario building
- **Direct API**: Build custom integrations using OAuth 2.0 or API keys

### Snapshots
Snapshots capture a full sub-account configuration for reuse:
- Workflows, funnels/websites, pipelines, custom fields/values
- Calendars, forms, surveys, email templates
- Settings and integrations config
- Shareable via snapshot links or marketplace

---

## Reporting & Analytics

- **Dashboard**: Opportunity value/count, conversion rates, appointment stats, task completion, contact growth
- **Pipeline**: Win/loss rates, deal cycle time, stage velocity, revenue forecasting, source attribution
- **Conversations**: Message volume by channel, response times, agent performance
- **Appointments**: Show/no-show/cancellation rates, bookings by calendar/team member
- **Campaigns**: Email open/click/bounce/unsubscribe rates, SMS delivery
- **Calls**: Volume, duration, missed rate, outcomes by team member
- **Attribution**: First-touch, multi-touch, UTM tracking, GCLID/FBCLID, call tracking numbers
- **Ad Integration**: Google Ads + Facebook Ads cost/clicks/impressions/conversions
- **Export**: CSV from UI, full API pagination (max 100/page), real-time webhook push to external systems

---

## Important URLs

| Resource | URL |
|----------|-----|
| GHL Platform Login | https://app.gohighlevel.com/ |
| API Documentation | https://highlevel.stoplight.io/docs/integrations |
| Developer Portal | https://developers.gohighlevel.com/ |
| Marketplace | https://marketplace.gohighlevel.com/ |
| API Base URL | https://services.leadconnectorhq.com |
| Support Docs | https://support.gohighlevel.com/ |
| Ideas / Changelog | https://ideas.gohighlevel.com/ |
| Status Page | https://status.gohighlevel.com/ |

---

## Development Conventions

### File Structure
```
Compass_CRM/
├── CLAUDE.md              # This file — project guide and reference
├── src/                   # Source code for custom integrations/apps
├── .gitignore
└── .idea/                 # IDE config
```

### Code Style
- Use clear, descriptive variable and function names
- Comment only where logic isn't self-evident
- Prefer simple, direct solutions over abstractions
- When interacting with GHL API, always include the `Version` header
- Handle rate limits gracefully with exponential backoff
- Store API keys and secrets in environment variables, never in code

### GHL Customization Workflow
1. **White-label first** — Set up branding, domains, logos before building pages
2. **Snapshot-based onboarding** — Create a master snapshot with all branded templates
3. **Centralized CSS** — Host brand stylesheet on CDN, link in all funnels/websites
4. **Component library** — Build reusable global sections (hero, CTA, testimonial, footer)
5. **Test responsively** — Always preview desktop, tablet, and mobile; fix with custom CSS media queries
6. **Version CSS** — Use versioned filenames for cache-busting
7. **Audit after GHL updates** — Platform updates can break custom CSS (class name changes)

### Design Principles for Compass CRM
- **Brand consistency** across all touchpoints — funnels, forms, emails, portal, chat
- **Mobile-first** — Most end-user interactions happen on mobile
- **Accessibility** — GHL has significant a11y gaps; supplement with semantic HTML, proper contrast ratios (WCAG AA: 4.5:1 for text, 3:1 for large text), alt text, and keyboard navigation in custom code
- **Performance** — Keep custom JS minimal; lazy-load external resources
- **Progressive enhancement** — Core functionality should work without JS; enhance with it
