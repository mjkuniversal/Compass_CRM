# Go High Level — Platform Reference

Comprehensive reference for GHL architecture, API, customization, workflows, and integrations. Extracted from the project CLAUDE.md to keep conversation context lean.

---

## Architecture

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
│   ├── Custom Fields, Custom Values & Custom Objects
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

> Note: GHL does not publicly document their internal stack. The following is inferred from community observations and job postings.

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
| **LC Email** | LeadConnector's built-in email sending service. Alternative to Mailgun/SendGrid/custom SMTP. |
| **Pipeline** | Visual sales process with ordered stages. Opportunities move through stages. |
| **Opportunity** | A deal/potential sale in a pipeline. Has monetary value, stage, and status (open/won/lost/abandoned). |
| **Workflow** | Automation sequence of triggers + actions. Replaced legacy "Campaigns" and "Triggers." |
| **Custom Value** | Location-level variable used in templates via `{{custom_values.name}}`. |
| **Custom Field** | Additional data field on contacts/opportunities beyond system defaults. |
| **Custom Object** | User-defined data object (similar to Salesforce custom objects). Up to 10 per location. Supports associations with Contacts and Opportunities. |
| **Association** | Link between Custom Objects and standard records (Contacts, Opportunities). |
| **Smart List** | Saved dynamic filter/segment of contacts. |
| **Trigger Link** | Trackable link that triggers automations on click. |
| **Conversation AI** | GHL's built-in AI chatbot feature for automated responses in conversations. |
| **SaaS Mode** | Config allowing agencies to resell GHL as their own SaaS with automated billing. |
| **SaaS Configurator** | Tool for setting up SaaS pricing plans and feature gating. |
| **Rebilling** | Marking up and reselling GHL usage costs (phone, email, AI) to sub-accounts. Available in SaaS Pro. |
| **DND** | Do Not Disturb — per-channel opt-out settings (SMS, email, calls, WhatsApp, etc.). |
| **A2P 10DLC** | US regulatory requirement for business SMS messaging. GHL handles registration. |
| **Global Section** | Reusable page section in funnel/website builder, synchronized across all pages using it. |
| **Private Integration** | API key-based access for internal tools. Simpler than Marketplace Apps but not distributable. |
| **Marketplace App** | OAuth-based integration distributed via GHL marketplace. Supports custom actions, pages, tabs. |
| **msgsndr.com** | Default GHL domain for hosted pages (no custom domain). |
| **leadconnectorhq.com** | Domain for GHL API endpoints and system services. |

### Pricing Tiers

| Plan | Price/Month | Key Differences |
|------|-------------|----------------|
| Starter | $97 | 3 sub-accounts, core CRM features |
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

**Private Integration vs Marketplace App**: Use Private Integrations (API key) for internal tools and single-account automation. Use Marketplace Apps (OAuth 2.0) for distributable integrations that serve multiple accounts or need marketplace listing.

### Rate Limits
- **Burst limit**: 100 requests per 10 seconds per Marketplace app per resource (location/company)
- **Daily limit**: 200,000 requests per day per Marketplace app per resource
- Check response headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- Handle rate limits with exponential backoff

### Pagination
Pagination patterns vary by endpoint:
- Most endpoints use `limit` (max 100) + `startAfterId` or `startAfter` cursor-based pagination
- Some endpoints use `limit` + `offset` (older pattern)
- Always check the specific endpoint documentation for the correct pagination parameters
- Response includes metadata like `total`, `count`, or `meta.nextPageUrl` depending on the endpoint

### Key API Endpoint Categories

| Category | Endpoints |
|----------|----------|
| Contacts | CRUD, search, bulk (create/update/delete), tasks, notes, tags, followers |
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
| Blogs | Blog post management, categories |
| Courses/Memberships | Course CRUD, enrollments, progress tracking |
| Custom Objects | Object definitions, records, associations with contacts/opportunities |
| Snapshots | Snapshot management, sharing |
| Email/SMS Templates | Template CRUD |
| Trigger Links | Management via API |

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
blogs.readonly / blogs.write
courses.readonly / courses.write
objects.readonly / objects.write
snapshots.readonly / snapshots.write
businesses.readonly / businesses.write
socialplanner/post.readonly / socialplanner/post.write
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
  "dnd": true, "dndSettings": { "Call|Email|SMS|WhatsApp|FB": { "status": "active|inactive" } },
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
  "type": "TYPE_PHONE|TYPE_EMAIL|TYPE_SMS|TYPE_FB|TYPE_INSTAGRAM|TYPE_WHATSAPP|TYPE_LIVE_CHAT",
  "assignedTo": "userId", "unreadCount": 0
}
// Messages have: direction (inbound|outbound), status, body, attachments, meta
```

### Webhook Events

| Category | Events |
|----------|--------|
| Contact | Create, Update, Delete, DND Update, Tag Added/Removed |
| Opportunity | Create, Update, Delete, Stage Change, Status Change |
| Appointment | Create, Update, Delete, Status Change (confirmed/showed/no-show/cancelled) |
| Conversation | New message (inbound/outbound) |
| Task | Create, Update, Delete, Completed |
| Forms/Surveys | Submission |
| Invoice | Created, Updated, Sent, Paid, Voided, Partially Paid |
| Order | Submitted, Completed |
| Subscription | Created, Updated, Cancelled |
| Note | Create, Update, Delete |
| Membership | New signup, Lesson completed, Course completed |
| Call | Completed (with recording URL, duration, status) |
| Workflow | Contact entered, Contact exited |
| Email/SMS | Sent, Delivered, Opened, Clicked, Bounced, Complained, Unsubscribed |
| User | Created, Updated, Deleted |
| Location | Created, Updated |

**Webhook best practices**:
- Verify webhook signatures for security
- Implement idempotency (deduplicate by event ID) when processing webhooks
- GHL retries failed webhook deliveries — ensure your handler returns 2xx promptly
- Monitor delivery via the webhook logs dashboard in the developer portal

### Error Handling
- API errors return JSON with `statusCode`, `message`, and optional `error` fields
- Common status codes: `400` (bad request), `401` (unauthorized), `403` (forbidden/scope missing), `404` (not found), `422` (validation), `429` (rate limited)
- On `429`, use the `X-RateLimit-Reset` header to determine retry timing
- Phone numbers must be E.164 format (`+1XXXXXXXXXX`) — malformed numbers cause silent failures

---

## Design & Customization System

### Customization Control Matrix

| Area | Control Level | What's Possible |
|------|:------------:|----------------|
| Funnel/Website Pages | **High** | Full HTML/CSS/JS, custom elements, responsive, Google Fonts, animations |
| Blog Pages | **Medium-High** | Custom CSS, tracking code; fixed post template structure |
| Forms & Surveys | **Medium-High** | Custom CSS field, field/label/button styling, multi-step, conditional logic |
| Email Templates | **Medium** | Drag-and-drop builder + HTML editor, constrained by email client rendering |
| Chat Widget | **Medium** | Colors, icon, position, header, bubble colors, avatar, greeting |
| Calendar Widget | **Low-Medium** | Primary color, header text, logo; fixed grid layout |
| Client Portal | **Low-Medium** | Logo, colors, custom domain, nav items; fixed layout structure |
| Invoice/Proposal Templates | **Low-Medium** | Logo, colors, content blocks; fixed layout |
| Membership/Courses | **Low** | Content flexibility, thumbnails, modules; fixed page structure |
| CRM Backend | **Low** | Logo, favicon, accent color, dark mode; NO custom CSS injection |
| Mobile App | **Low** | App name, icon, splash screen, accent color; fixed UI structure |
| Navigation | **Very Low** | Hide items, add custom menu links; no reorder, no icon change |

### White-Label Branding Checklist

| Element | Changeable | Notes |
|---------|:----------:|-------|
| Logo (sidebar) | Yes | SVG/PNG, transparent bg, ~250x60px |
| Favicon | Yes | ICO/PNG for browser tabs |
| Primary accent color | Yes | Buttons, links, active states throughout CRM |
| Login page | Partial | Logo, background image, colors, text; fixed form layout |
| Loading/splash screen (web) | Yes | Custom logo displayed during CRM loading |
| Custom domain | Yes | `app.yourdomain.com` replaces GHL URLs |
| Custom CNAME for tracking links | Yes | Brand-consistent shared link domains |
| Desktop app | Yes | Custom name, icon, splash screen (Electron wrapper) |
| Mobile app | Yes | Custom app name, icon, splash, colors; requires Apple Dev ($99/yr) + Google Play ($25) |
| System emails | Yes | Custom domain, logo, branding via SMTP/Mailgun |
| Email signature defaults | Yes | Default signatures for sub-accounts |
| Support link | Yes | Redirect "?" help to your support |
| Terms of Service / Privacy links | Yes | Configurable in SaaS settings |
| Onboarding wizard | Partial | Customizable in SaaS mode for new sub-accounts |
| Powered-by / attribution text | Partial | Hidden on SaaS Pro via CSS (`.hl-powered-by { display: none; }`); not removable in all contexts |
| Navigation labels | No | Fixed labels (can hide items) |
| Navigation icons | No | Standard icon set |
| Navigation order | No | Fixed order; custom items appear at bottom |
| Backend fonts | No | System default (Inter/system) |
| Notification sounds | No | Not customizable |
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
| Blog Custom CSS | Blog pages | CSS | Blog > Settings > Custom CSS |
| Membership Head/Body Code | Membership area | HTML/CSS/JS | Membership > Settings > Tracking Code |
| Custom Code Element | Where placed | HTML/CSS/JS | Drag "Custom JS/HTML" onto page |
| Section/Element Classes | Per element | CSS class names | Element settings > Custom Classes / ID |
| Form Custom CSS | Single form | CSS | Form Builder > Styles > Custom CSS |
| Survey Custom CSS | Single survey | CSS | Survey Builder > Styles > Custom CSS |
| Chat Widget | Widget instance | Limited CSS | Conversations > Chat Widget > Customization |
| Email HTML Editor | Single email | HTML/inline CSS | Email Builder > Source Code view |
| Custom Menu (iframe) | Menu item | Full webpage | Settings > Custom Menu Links |

**No CSS injection available for**: CRM backend dashboard, settings pages, SaaS configurator, agency dashboard, calendar booking widget internals, or invoice/proposal templates.

### CSS Best Practices

**Use namespaced CSS Variables for Brand Consistency:**
```css
:root {
  /* Brand colors */
  --compass-primary: #your-color;
  --compass-secondary: #your-color;
  --compass-accent: #your-color;

  /* Semantic colors */
  --compass-success: #22c55e;
  --compass-warning: #f59e0b;
  --compass-error: #ef4444;
  --compass-info: #3b82f6;

  /* Text colors */
  --compass-text-primary: #1a1a2e;
  --compass-text-secondary: #64748b;

  /* Surface colors */
  --compass-bg: #ffffff;
  --compass-surface: #f8fafc;

  /* Typography */
  --compass-font-heading: 'Your Heading Font', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --compass-font-body: 'Your Body Font', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* Spacing scale (base 8px) */
  --compass-space-1: 4px;
  --compass-space-2: 8px;
  --compass-space-3: 12px;
  --compass-space-4: 16px;
  --compass-space-6: 24px;
  --compass-space-8: 32px;
  --compass-space-12: 48px;
  --compass-space-16: 64px;

  /* Borders & Shadows */
  --compass-radius: 8px;
  --compass-radius-lg: 12px;
  --compass-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --compass-shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --compass-shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}
```

**Always use fallback values** when referencing CSS variables:
```css
color: var(--compass-primary, #1a73e8);
```

**Host a centralized stylesheet** on a CDN and `<link>` it in every funnel/website's global tracking code for cross-property consistency. Version it (e.g., `compass-v2.3.css`) to manage cache-busting.

**Font loading**: Use `font-display: swap` in `@font-face` declarations to avoid flash of invisible text (FOIT).

**Common class targets**: `.hl-form-input`, `.hl-form-label`, `.hl-form-button`, `.hl-page-preview--content`, `.hl-powered-by`

**Specificity management**: Match or slightly exceed GHL's selector specificity. Reserve `!important` as a last resort — most styling can be achieved with more specific selectors.

**Dark mode**: GHL supports dark mode in the CRM backend. If any custom CSS could appear in dark mode contexts, use `@media (prefers-color-scheme: dark)` or GHL's dark mode class to provide appropriate color overrides.

**Animation performance**: Use `transform` and `opacity` for animations — avoid animating layout properties (`width`, `height`, `top`, `left`). Respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

**Print styles**: For pages users may print (invoices, reports), include `@media print` rules.

**Caveats**:
- GHL uses dynamically generated class names in some areas — inspect via DevTools
- Class names may change on platform updates without notice
- Some elements render dynamically after page load — may require `!important` or delayed application
- jQuery is loaded by default on GHL pages
- iFrame-embedded widgets (chat, calendar on external sites) cannot be styled from the parent page

### Page Builder Elements

**Layout**: Sections, Rows, Columns (1/2, 1/3, 2/3, 1/4, 3/4)
**Content**: Headline, Sub-headline, Paragraph, Image, Video (YouTube/Vimeo/Wistia/HTML5), Button, Divider, Spacer, Icon, Carousel, Lists, Nav Menu, Logo, Tabs/Content Switcher
**Lead Capture**: Form, Survey, Calendar embed, Two-step order form
**Commerce**: Order form, Pricing table, Countdown timer, Progress bar, Coupon
**Social**: Testimonials, FAQ/Accordion, Social sharing, Google Maps, Reviews
**Advanced**: Custom JS/HTML block, iFrame embed, Trigger links, Popup/Modal, Sticky bars, Image lightbox, Anchor links, Back to top button, Cookie consent banner
**Blog**: Blog post list, Post content, Categories, Tags, Author bio
**Membership**: Drip content blocks, Lesson navigation, Completion tracking

**Responsive**: Desktop/Tablet/Mobile views with per-breakpoint styling, hide/show per device, column stacking (left-to-right becomes top-to-bottom on mobile).

- **Breakpoints**: ~768px (tablet), ~480px (mobile) — verify exact values via DevTools for custom media queries
- **Font scaling**: GHL does NOT auto-scale fonts for mobile — each text element needs manual mobile font size adjustment
- **Per-device spacing**: Padding and margin can be set per device in the builder (avoids needing CSS media queries for basic spacing)
- **Hidden elements**: `display: none` only — hidden elements still load in the DOM (affects performance and SEO)
- **Images**: Responsive by default (`max-width: 100%`), but background images on sections need manual responsive handling
- Custom media queries via CSS for finer control

**Typography**: Google Fonts integration + `@font-face` custom uploads. Use `font-display: swap` for custom fonts. No global type scale — set per element or define via custom CSS. Recommended type scale ratio: 1.25 (Major Third) or 1.333 (Perfect Fourth).

**Colors**: HEX/RGB/HSL picker, opacity/alpha, gradients, saved color palette (not design tokens — changing a swatch doesn't update all instances).

### Design Token Mapping Across Touchpoints

How brand CSS variables map to each GHL area:

| Token | Funnel/Website | Forms | Email | Chat Widget | Calendar | Client Portal |
|-------|---------------|-------|-------|-------------|----------|--------------|
| `--compass-primary` | Button bg, links, accents | Submit button bg | CTA button bg | Header bg, bubble color | Accent color | Accent color |
| `--compass-secondary` | Secondary buttons | — | Secondary CTA | — | — | — |
| `--compass-text-primary` | Body text | Label text | Body text | Message text | — | Body text |
| `--compass-font-heading` | Headings via CSS | — | Heading (limited) | — | — | — |
| `--compass-font-body` | Body text via CSS | Input text via CSS | Safe font fallback | — | — | — |
| `--compass-radius` | Button/card radius | Input/button radius | Button radius | — | — | — |

**Email templates require a separate approach**: Email CSS is inline-only, does not support CSS variables, flexbox, or grid in most email clients. Use a max-width of 600px, email-safe fonts (Arial, Helvetica, Georgia, Times New Roman), and test across clients. Email templates cannot share the centralized stylesheet.

### Accessibility Guidelines

GHL has significant accessibility gaps. Supplement with custom code where possible:

**Forms** (highest impact):
- GHL forms often lack proper `<label>` associations — add via custom code:
  ```html
  <script>
  document.querySelectorAll('.hl-form-input').forEach(input => {
    const label = input.closest('.hl-form-group')?.querySelector('.hl-form-label');
    if (label && input.id) label.setAttribute('for', input.id);
  });
  </script>
  ```
- Add `aria-required="true"` to required fields
- Ensure error messages are associated with fields via `aria-describedby`

**Color contrast**: WCAG AA minimums — 4.5:1 for normal text, 3:1 for large text (18px+ or 14px+ bold). Test with browser DevTools contrast checker or axe DevTools extension.

**Touch targets**: Minimum 44x44px for interactive elements (WCAG 2.5.5). GHL default button sizes sometimes fall below this on mobile.

**Images**: Always set meaningful alt text. Use `alt=""` explicitly for decorative images.

**Links and buttons**: Use descriptive text — avoid "Click Here" or bare "Learn More" without context.

**Language attribute**: Set `lang` attribute on `<html>` via custom head code:
```html
<html lang="en">
```

**Focus management**: GHL's multi-step forms and modals have poor focus trapping. Custom JS may be needed for proper keyboard navigation.

**Motion**: Respect `prefers-reduced-motion` in all custom animations (see CSS Best Practices).

**Skip navigation**: Add to custom funnel/website pages via custom head code for keyboard users.

### Image and Media Guidelines

- **Formats**: Prefer WebP with JPEG/PNG fallback. Use SVG for logos and icons.
- **Compression**: Target < 200KB per image. Use tools like Squoosh or ImageOptim.
- **Lazy loading**: Add `loading="lazy"` to below-fold images via custom code.
- **Logo variants needed**: Full logo, icon-only, light background, dark background
- **Key dimensions**: Sidebar logo (~250x60px), favicon (32x32 + 180x180 for Apple touch), OG/social preview (1200x630), email header (600px wide max)

---

## Workflows & Automations

### Trigger Categories

| Category | Key Triggers |
|----------|-------------|
| Contact | Created, Changed, Tag Added/Removed, DND Updated, Birthday, Inactive (no activity for X days) |
| Communication | Inbound Message, Customer Replied, Call Status Changed |
| Opportunity | Status Changed, Stage Changed, Created, Stale |
| Calendar | Booked, Confirmed, Showed, No-Show, Cancelled, Rescheduled |
| Task | Task Created, Task Completed, Task Overdue |
| Forms/Surveys | Submitted |
| Payments | Invoice events, Order Submitted, Payment Received |
| E-commerce | Product Purchased, Cart Abandoned |
| Membership | Signup, Lesson Completed, Course Completed, Login |
| External | Inbound Webhook, Custom Webhook (marketplace app) |
| Scheduling | Date/Time Based, Recurring |

### Action Categories

| Category | Key Actions |
|----------|------------|
| Communication | Send SMS/MMS, Send Email, Internal Notification, Review Request, Voicemail Drop, IVR Call, Facebook/Instagram/WhatsApp Message, Live Chat |
| CRM | Create/Update Contact, Add/Remove Tag, Create/Update Opportunity, Assign User, Add to Smart List, Set DND, Delete Contact, Add Note, Create Task |
| Flow Control | If/Else branching, Wait (duration), Wait Until (event), Go To, Goal Event, Trigger Sub-workflow |
| External | HTTP Webhook (GET/POST/PUT/PATCH/DELETE with response mapping), Google Sheets, Slack, Zapier/Make triggers |
| Data | Math Operations, Set Custom Field, Number/Date Formatter |
| AI | OpenAI/ChatGPT action, Conversation AI toggle per contact, Custom model actions |
| Payments | Create/Send Invoice |
| Membership | Grant/Revoke Offer Access, Enroll in Course, Mark Lesson Complete |
| Manual | Pause workflow and require human action before continuing |

---

## Communication Channels

| Channel | Integration | Notes |
|---------|------------|-------|
| SMS/MMS | LC Phone (built-in Twilio) or BYO Twilio | A2P 10DLC required for US. Pay-per-message. |
| Email | LC Email, Mailgun, SendGrid, or custom SMTP | Domain verification (DKIM/SPF/DMARC). IMAP sync for two-way. |
| WhatsApp | WhatsApp Cloud API (via Meta) | Template messages for outbound; 24hr session window for free-form. |
| Facebook Messenger | Facebook Business Page connection | Two-way. Comment-to-DM automations. |
| Instagram DM | Instagram Business/Creator account | Two-way. Story mention triggers. |
| Live Chat | Native webchat widget | Embeddable JS snippet. Modes: live, SMS-connect, email-connect. |
| Phone (Voice) | LC Phone / Twilio | Inbound routing, IVR, call recording/transcription, power dialer, voicemail drops, missed-call text-back. WebRTC browser calling. |
| Reviews | Native review request system | Request and manage reviews across Google, Facebook. |

> **Note**: Google Business Messages was sunset July 2024. Use WhatsApp or SMS for Google Business Profile communication.

---

## Integration Ecosystem

### Marketplace Apps
- **Custom Workflow Actions**: New action types in the workflow builder
- **Custom Pages (iFrame)**: Apps render inside GHL sidebar as iFrames, receiving `locationId`, `companyId`, `userId` context
- **Custom Tabs**: Add tabs to contact, opportunity, and other record detail views
- **App Cards**: Embedded widgets within the CRM dashboard
- **Custom Fields**: Apps can define custom fields on records
- **SSO**: GHL provides SSO tokens for embedded app authentication
- **Webhook Subscriptions**: React to platform events

### External Integrations
- **Native**: Google (Calendar, Ads, Analytics, GMB), Facebook (Ads, Messenger, IG), TikTok, Stripe, QuickBooks, Shopify, WordPress, Outlook/Microsoft (Calendar, Email), Twilio (BYO), Yext
- **Zapier**: 5000+ apps, triggers/actions for contacts, opportunities, appointments, forms, payments
- **Make.com**: Similar coverage with more complex scenario building
- **Direct API**: Build custom integrations using OAuth 2.0 or API keys
- **Official SDK**: `https://github.com/GoHighLevel/highlevel-api-sdk`

### Snapshots
Snapshots capture a full sub-account configuration for reuse:
- Workflows, funnels/websites, pipelines, custom fields/values
- Calendars, forms, surveys, email templates
- Settings and integrations config
- Shareable via snapshot links or marketplace
- **Use snapshots as the design baseline** — encode visual consistency through builder settings (not just CSS), since CSS can break on platform updates but builder-set values persist

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
| API Documentation | https://marketplace.gohighlevel.com/docs/ |
| Developer Portal | https://developers.gohighlevel.com/ |
| Marketplace | https://marketplace.gohighlevel.com/ |
| API Base URL | https://services.leadconnectorhq.com |
| API SDK (GitHub) | https://github.com/GoHighLevel/highlevel-api-sdk |
| Support Docs | https://support.gohighlevel.com/ |
| Ideas / Changelog | https://ideas.gohighlevel.com/ |
| Status Page | https://status.gohighlevel.com/ |
