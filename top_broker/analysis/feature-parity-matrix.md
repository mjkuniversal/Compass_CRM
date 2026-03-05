# TopBroker vs GoHighLevel — Feature Parity Matrix

Comprehensive comparison of TopBroker CRM (insurance-specific) against GoHighLevel (generic marketing/CRM platform). Based on analysis of 1,275 TopBroker routes and HWH's production GHL configuration.

**Parity legend:**
- Full — GHL has equivalent functionality
- Partial — GHL has some capability but gaps exist
- None — GHL lacks this entirely
- Custom — achievable in GHL with custom fields/workflows/code

---

## 1. Contact / Lead Management

| Feature Area | TopBroker | GHL | Parity | Migration Notes |
|---|---|---|---|---|
| Basic contact fields (name, phone, email, address, DOB) | Leads with full PII including SSN | Contacts with firstName, lastName, phone, email, address1, city, state, postalCode, dateOfBirth | Full | Direct field mapping. SSN has no GHL equivalent — must use encrypted custom field or external vault |
| Lead statuses | Configurable statuses with dead reasons per agency | Pipeline stages (configurable) | Partial | GHL uses pipeline stages not free-form statuses. Dead reasons require custom fields or lost-reason on opportunities |
| Lead types | Multiple types per lead (CRUD on `/leads/{lead}/types`) | Tags (multi-value) | Custom | Map TopBroker lead types to GHL tags. Loses structured type metadata |
| Lead tags | Agency-level custom tags with tag-based views (`/custom-tags`, `/agencies/{agency}/lead-tags`) | Tags on contacts | Partial | GHL tags are flat strings. TopBroker tags are agency-scoped with dedicated management UI |
| Lead segments | Saved filter views (`/lead-segments`) with criteria-based lists | Smart Lists | Full | GHL Smart Lists provide equivalent saved-filter functionality |
| Dependants | First-class sub-entity on leads (`/leads/{lead}/dependants`) with SSN per dependant | No native dependant model | Custom | Must model as separate contacts linked via custom field or notes. Loses parent-child relationship integrity |
| Medications | Per-lead medication tracking (`/leads/{lead}/medications`) | No native model | Custom | Custom fields or notes. No structured medication list |
| Doctors | Per-lead doctor records (`/leads/{lead}/doctors`) | No native model | Custom | Custom fields or notes. No structured doctor list |
| Lead files/documents | File upload, download, edit per lead (`/leads/{lead}/files`) | Contact-level file attachments | Partial | GHL supports file attachments but lacks the structured file management (edit metadata, categories) |
| Lead licenses | Per-lead license tracking (`/leads/{lead}/licenses`) with bulk update | No native model | None | Insurance-specific. Would need custom objects or external system |
| Lead login credentials | Carrier portal login storage per lead (`/leads/{lead}/login`) with password show | No equivalent | None | Security-sensitive. No GHL equivalent. Would need external password manager integration |
| Lead carriers | Multiple carrier associations per lead (`/leads/{lead}/carriers`) | Custom fields (Health Carrier) | Custom | GHL stores one carrier per custom field. TopBroker supports multiple carrier-lead relationships with metadata |
| Lead policies | Full policy lifecycle — new, active, cancelled, expiring, renew (`/leads/{lead}/new-policy`) | Custom fields (Policy Status, Effective Date) | Custom | GHL has no policy entity. Must flatten to custom fields per policy. Multiple policies per contact require creative workarounds |
| Lead form submissions | Structured form submission history per lead | Form submissions exist but not lead-centric browsing | Partial | GHL tracks form fills but lacks TopBroker's per-lead submission history view |
| Lead billing info | Billing/payment info on leads | No equivalent | None | Would need external billing system |
| Lead source tracking | Dedicated lead source entity with toggle-active, doc instructions | Source field on contacts | Partial | GHL has a source field but no dedicated lead source management with documentation and toggle |
| Lead DNC | Per-lead DNC flag with agency DNC keys and password-protected access | DNC list (basic) | Partial | GHL has basic DNC. TopBroker has agency-level DNC key management with password verification |
| Consent management (SOA) | Scope of Appointment consents — create, fetch, resend, Part 2, Spanish variants | No native SOA | None | Insurance-regulatory requirement. Must build custom with forms + workflows or external tool |
| Lead export | CSV export of leads | Contact CSV export | Full | Both support CSV export |
| Lead SSN storage | Encrypted SSN with password-check gate | No equivalent | None | Would need encrypted custom field with access controls or external vault |

## 2. Agent / User Management

| Feature Area | TopBroker | GHL | Parity | Migration Notes |
|---|---|---|---|---|
| Agent profiles | Full agent entity with edit, files, notes, trainings | Users with roles | Partial | GHL users are simpler. No per-user file storage, notes, or training tracking |
| Agent carriers | Per-agent carrier assignments with hierarchy, access control, data, downline transfer | No equivalent | None | Insurance-specific. Agent-carrier relationships with commission hierarchies have no GHL equivalent |
| Agent licenses | License tracking per agent with bulk update (`/agents/{agent}/licenses`) | No equivalent | None | Insurance-regulatory requirement. Must track externally |
| Agent training | Agency training modules with resources, per-agent completion tracking | No equivalent | None | Would need LMS integration or custom solution |
| Agent Twilio accounts | Per-agent Twilio provisioning with number management | Twilio integration exists | Partial | GHL has built-in calling/SMS via Twilio but not per-agent number provisioning at TopBroker's granularity |
| Agent account access | Cross-agent account access delegation (`/agents/{agent}/account-access`) | Team member permissions | Partial | GHL has user roles but not the flexible agent-to-agent access delegation |
| Agent bucket access | Per-agent lead pool access with daily limits | No equivalent | None | TopBroker-specific lead distribution mechanism |
| Agent transfer | Transfer all agent data to another agent | No built-in bulk transfer | Custom | Would need API scripting to reassign contacts |
| HST data migration per agent | HealthSherpa data migration tools | No equivalent | None | Insurance-specific integration |
| Commission toggle per agent | Toggle commission tracking on/off | No equivalent | None | Commission system is absent from GHL entirely |
| Agent balance/credits | Per-agent credit system for lead purchases with auto-replenish | No equivalent | None | TopBroker's lead marketplace economy has no GHL parallel |
| Sub-accounts | Agency > Agent hierarchy | Sub-accounts per location | Partial | GHL sub-accounts work differently — location-based, not agent-hierarchy-based |
| Agent impersonation | Admin can login-as any agent | No equivalent | None | Useful for support. GHL lacks this |
| Agent working hours | Per-agent working hours configuration | Calendar availability | Partial | GHL has calendar availability but not the operational working-hours concept TopBroker uses for lead routing |

## 3. Agency / Organization Management

| Feature Area | TopBroker | GHL | Parity | Migration Notes |
|---|---|---|---|---|
| Agency profiles | Full agency entity with billing, notifications, settings | Account/Location settings | Partial | GHL locations are simpler. No multi-agency hierarchy |
| Billing profiles | Multiple billing profiles per agency with Stripe integration | Stripe integration exists | Partial | GHL billing is for the GHL subscription itself, not for agency client billing |
| Dead reasons | Configurable per-agency dead/lost reasons | Lost reason on opportunities | Partial | GHL has lost reasons but they are simpler and not agency-scoped |
| Department skills | Agency department skill configuration | No equivalent | None | Insurance-specific departmental routing |
| Sidebar widgets | Configurable agency dashboard widgets | Dashboard customization (limited) | Partial | GHL dashboard is less configurable than TopBroker's widget system |
| Agency working hours | Business hours per agency | Business hours setting | Full | Both support business hours configuration |
| DNC keys | Agency-level DNC compliance keys with sharing and password protection | Basic DNC | Custom | Would need custom compliance workflow |
| Carrier access control | Per-agency carrier configuration with agent assignments, states, products | No equivalent | None | Entire carrier management layer is absent |
| Email/text settings | Agency-level email and text configuration | Email/SMS settings | Partial | GHL has email/SMS settings but not the agency-scoped configuration TopBroker provides |
| Bucket sharing between agencies | Cross-agency lead pool sharing | No equivalent | None | Multi-agency lead sharing economy |
| Twilio onboarding per agency | Full 10DLC onboarding flow per agency | LC Phone (Twilio-based) | Partial | GHL has phone system but the per-agency Twilio onboarding with 10DLC compliance is more streamlined in TopBroker |
| Notifications | Agency notification management with email validation | Notification settings | Partial | GHL has notifications but less granular agency-level control |

## 4. Lead Distribution (Buckets)

| Feature Area | TopBroker | GHL | Parity | Migration Notes |
|---|---|---|---|---|
| Agency buckets | Lead pools with access control, daily limits, import | No equivalent | None | Core TopBroker differentiator. GHL has no lead-pool concept |
| Personal buckets | Per-agent private lead pools | No equivalent | None | Part of the bucket system |
| Click-to-dial from bucket | Pull lead from bucket and auto-dial | No equivalent | None | Integrated lead-purchase-and-call workflow |
| Lead purchase from bucket | Credit-based lead purchasing | No equivalent | None | TopBroker's internal lead marketplace |
| Bucket import | Import leads directly into buckets with duplicate/failed/merge handling | CSV import to contacts | Custom | GHL import lacks bucket targeting and the sophisticated dedup |
| HST bucket sync | Sync HealthSherpa leads into buckets | No equivalent | None | Insurance-specific |
| Daily limits | Per-agent daily lead pull limits per bucket | No equivalent | None | Lead distribution throttling |
| Bucket sharing | Share buckets between agencies with billing | No equivalent | None | Multi-agency lead economy |

## 5. Round Robin & Lead Routing

| Feature Area | TopBroker | GHL | Parity | Migration Notes |
|---|---|---|---|---|
| Round robin groups | Groups with agent assignments, state filtering, distribution log, lead programs | Round robin assignment in workflows | Partial | GHL has basic round robin in workflow actions. TopBroker's is far more sophisticated with state-based routing, distribution logging, and lead program integration |
| State-based routing | Route leads to agents licensed in specific states | No native state routing | Custom | Would need custom workflow with conditional branching per state |
| Distribution log | Full audit trail of lead assignments | No equivalent | None | Important for compliance and dispute resolution |
| Lead program integration | Round robin groups tied to lead source programs | No equivalent | None | Insurance lead vendor integration |

## 6. Communication

| Feature Area | TopBroker | GHL | Parity | Migration Notes |
|---|---|---|---|---|
| Email campaigns | Criteria-based email campaigns with messages, sending times, reports | Email campaigns | Full | GHL has robust email campaign functionality |
| Text/SMS campaigns | Criteria-based text campaigns with messages, sending times | SMS campaigns | Full | GHL has SMS campaign support |
| Email blasts | Email blasts with admin approve/decline workflow | Email broadcasts | Partial | GHL has broadcasts but lacks the approval workflow |
| Email templates | Templates with per-lead preview and merge fields | Email templates | Full | Both support templates with personalization |
| Text templates | Templates with per-lead preview | SMS templates | Full | Both support SMS templates |
| Voicemail scripts | Voicemail drop scripts with preview | Voicemail drops (via Twilio) | Partial | GHL has ringless voicemail but lacks structured script management |
| Email signatures | Per-user email signatures | Email signatures | Full | Both support signatures |
| Text signatures | Per-user text signatures | No dedicated text signature | Custom | Would need to append signature text in templates |
| Text inbox | Unified SMS inbox with archive, grab lead, transfer to agent/bucket, send to RR | Conversations (unified inbox) | Partial | GHL Conversations handles SMS but lacks the lead-grab, bucket-transfer, and RR-send actions specific to insurance lead workflows |
| Autoresponders (sequence) | Sequence-based autoresponder chains with per-message toggle | Workflow sequences | Full | GHL workflows can replicate sequence-based autoresponders |
| Autoresponders (status) | Status-change-triggered autoresponders | Workflow triggers on status change | Full | GHL workflow triggers can fire on pipeline stage changes |
| Appointment reminders | Appointment reminder configuration | Calendar reminders | Full | Both support appointment reminders |

## 7. Automation & Workflows

| Feature Area | TopBroker | GHL | Parity | Migration Notes |
|---|---|---|---|---|
| Automations | Conditions (comparison + trigger), tasks, templates, per-agent sync, agency toggle, hours | Workflows (triggers, conditions, actions) | Partial | GHL workflows are powerful but TopBroker automations have insurance-specific triggers (lead status, carrier assignment, policy events) that would need custom webhook integration |
| Action schedules | Predefined action sequences with maps, copy, toggle-active | Workflow sequences | Partial | GHL workflows can replicate but lack the map/schedule visualization |
| User automations | Per-user personal automations with duplicate and toggle | Personal workflow folders | Partial | GHL supports workflow organization but not the same per-user automation ownership model |
| Automation templates | Shared automation templates across agency | Workflow templates/recipes | Full | GHL has workflow templates and a marketplace |

## 8. Quotesheets

| Feature Area | TopBroker | GHL | Parity | Migration Notes |
|---|---|---|---|---|
| Quotesheet builder | Multi-plan quotesheets with products, QA/text bullets, reorder, templates | No equivalent | None | Core insurance sales tool. No GHL equivalent. Would need custom app or third-party quoting tool |
| Quotesheet plans | Plans with multiple products, move up/down, copy | No equivalent | None | Part of quotesheet system |
| Quotesheet plan templates | Reusable plan templates with product configurations | No equivalent | None | Part of quotesheet system |
| Quotesheet email templates | Specialized email templates for sending quotes | Email templates (generic) | Custom | Could use GHL email templates but lose quotesheet-specific merge fields and formatting |
| Quotesheet logo | Agency/agent branding on quotesheets | No equivalent | None | Part of quotesheet system |
| Quotesheet send & track | Send quotesheet to lead with tracking (UUID-based public links, thank-you page, selection tracking) | No equivalent | None | Interactive quote delivery with client selection tracking |
| QA/Text bullets | Structured Q&A and text bullets per product with reorder | No equivalent | None | Insurance product comparison content |
| Quotesheet categories | Agency and global quotesheet product categories | No equivalent | None | Product organization for quoting |

## 9. Commission Tracking

| Feature Area | TopBroker | GHL | Parity | Migration Notes |
|---|---|---|---|---|
| Admin commission statements | Create, publish, schedule-publish, entries, overrides, personal production, export | No equivalent | None | Full commission management system. GHL has zero commission functionality |
| Agency-admin statements | Agency-level commission statement view, search, export | No equivalent | None | Part of commission system |
| Agent statements | Agent-level statements with search, export, files, client payout history | No equivalent | None | Part of commission system |
| Commission entries | Individual commission line items with CRUD, duplicate/failed row handling | No equivalent | None | Part of commission system |
| Carrier agent IDs | Map agents to carrier-specific agent identifiers | No equivalent | None | Required for commission matching |
| Overrides | Commission override tracking and detail views | No equivalent | None | Hierarchical commission structures |
| Commission calendar PDF | Publishable commission calendar | No equivalent | None | Agent-facing commission schedule |
| Commission carriers report | Carrier-level commission reporting | No equivalent | None | Part of commission system |

## 10. Carrier Management

| Feature Area | TopBroker | GHL | Parity | Migration Notes |
|---|---|---|---|---|
| Agency carriers | Per-agency carrier setup with products, brochures, states, agent assignments, training resources | Custom fields (Health Carrier) | None | GHL stores carrier as a text field. TopBroker has a full carrier entity with products, state availability, agent access, and training materials |
| Manage carriers (global) | System-wide carrier management with products, QS products, QA/text bullets | No equivalent | None | Platform-level carrier catalog |
| Carrier products | Products per carrier with active toggle, agency bucks, multiplier | No equivalent | None | Insurance product catalog |
| Carrier brochures | Upload and manage carrier brochures | No equivalent | None | Sales collateral management |
| Carrier training resources | Per-carrier training materials | No equivalent | None | Carrier-specific agent education |
| Carrier states | State availability per carrier | No equivalent | None | Regulatory compliance — carriers are state-licensed |
| Request carriers | Agency can request carrier access | No equivalent | None | Carrier onboarding workflow |
| MGAs | Managing General Agent entities | No equivalent | None | Insurance distribution hierarchy |

## 11. Recruiting

| Feature Area | TopBroker | GHL | Parity | Migration Notes |
|---|---|---|---|---|
| Recruiting leads | Full recruiting CRM — leads, sources, locations, stats, pending-contracting list | No native recruiting | None | Would need a separate pipeline or sub-account in GHL |
| Recruiting action schedules | Follow-up sequences for recruiting leads | Workflow sequences | Custom | Could build recruiting workflows in GHL but lose the dedicated recruiting UI |
| Recruiting email/text/voicemail templates | Communication templates specific to recruiting | Templates (generic) | Custom | Could create recruiting-tagged templates in GHL |
| Recruiting custom tags | Tags specific to recruiting pipeline | Tags (shared namespace) | Custom | Would share tag namespace with sales contacts |
| Recruiting tasks | Task management for recruiting activities | Tasks | Partial | GHL has tasks but not recruiting-specific task types |
| Recruiting sources | Track where recruiting leads come from | Source field | Partial | Less structured than TopBroker's dedicated source entity |
| Recruiting locations | Office/location management for recruiting | No equivalent | None | Physical location tracking for recruiting |
| Recruiting manager report | Dedicated recruiting analytics | No equivalent | None | Would need custom reporting |

## 12. Book of Business Upload

| Feature Area | TopBroker | GHL | Parity | Migration Notes |
|---|---|---|---|---|
| BOB upload sessions | Session-based upload with progress tracking | CSV import | Custom | GHL CSV import is simpler. No session management |
| Duplicate handling | Detect and resolve duplicate leads during upload | Basic dedup on email/phone | Partial | GHL dedup is basic. TopBroker has interactive duplicate resolution |
| Missing data handling | Flag and resolve rows with missing required fields | No equivalent | None | Upload validation and resolution workflow |
| Unmatched transactions | Handle transactions that don't match existing leads | No equivalent | None | Insurance-specific — matching policies to contacts |
| Upload templates | Downloadable templates for standardized upload | No equivalent | Custom | Could provide CSV template externally |
| Carrier assignment during upload | Assign carrier to uploaded records | No equivalent | None | Insurance-specific upload workflow |
| Complete stats | Post-upload statistics and export | No equivalent | None | Upload quality reporting |
| Policy imports | Dedicated policy import with CRUD | No equivalent | None | Insurance-specific |

## 13. Reports & Analytics

| Feature Area | TopBroker | GHL | Parity | Migration Notes |
|---|---|---|---|---|
| Agency report | Agency-level performance with data/export | Dashboard reporting | Partial | GHL has dashboards but not insurance-specific agency reports |
| Agent report | Per-agent performance metrics | Basic user reporting | Partial | GHL reporting is marketing-focused, not agent-performance-focused |
| Agent-carrier report | Agent performance by carrier | No equivalent | None | Insurance-specific cross-tabulation |
| Agent efficiency report | Agent productivity metrics | No equivalent | None | Insurance-specific |
| Agent lead follow-up report | Follow-up compliance tracking | No equivalent | None | Lead follow-up accountability |
| Agent states report | Agent activity by state with export/print | No equivalent | None | Geographic performance analysis |
| Billing report | Agency billing analysis | Billing dashboard (GHL subscription only) | None | TopBroker's billing report tracks agency client billing, not SaaS subscription |
| Bucket pull report | Lead pull activity from buckets with click-to-call data | No equivalent | None | Bucket system reporting |
| Commission carriers report | Commission by carrier breakdown | No equivalent | None | Part of commission system |
| Custom reports | User-configurable reports with column selection, ordering, data/export | Custom reporting (limited) | Partial | GHL has some custom reporting but less flexible than TopBroker's column-picker approach |
| Grace pull report | Policy grace period tracking with log details | No equivalent | None | Insurance-specific — tracks policies at risk of lapse |
| Last login report | Agent last-login tracking with sale info | No equivalent | None | Agent activity monitoring |
| Lead rejection report | Rejected lead analysis | No equivalent | None | Lead quality tracking |
| Lead sources report | Lead source performance with bad-phone, dead, leads, sales breakdowns | Source reporting (basic) | Partial | GHL has source attribution but not the granular sub-reports |
| Lead status ratio report | Conversion funnel by status with drill-down | Pipeline reporting | Partial | GHL pipeline reports show conversion but not with TopBroker's ratio analysis |
| Negative balance report | Agents with negative credit balances | No equivalent | None | Part of credit/billing system |
| Product report | Product-level performance analysis | No equivalent | None | Insurance product analytics |
| Recruiting manager report | Recruiting pipeline analytics | No equivalent | None | Part of recruiting system |
| Referral user report | Referral tracking with per-lead sales detail | Attribution reporting | Partial | GHL has basic attribution but not referral-specific with commission detail |
| Round robin report | Lead distribution analysis | No equivalent | None | Part of RR system |
| Sale listing report | Sales report with data/export | Revenue reporting (basic) | Partial | GHL has revenue on opportunities but not insurance-structured sale listings |
| Sales credit report | Sales credit analysis with product breakdown | No equivalent | None | Insurance-specific compensation tracking |
| Split sale report | Split sale tracking between agents | No equivalent | None | Insurance-specific — when two agents share a sale |
| State report | Sales/activity by state | No equivalent | None | Geographic compliance and performance |
| HST email report | HealthSherpa email activity | No equivalent | None | Integration-specific |
| Bad phone credit report | Bad phone number tracking for lead credit | No equivalent | None | Lead quality and credit adjustment |
| BDC report | Business Development Center metrics | No equivalent | None | Insurance-specific call center metrics |
| Agency bucket sharing report | Cross-agency bucket activity | No equivalent | None | Part of bucket sharing system |
| Agency bucks / credit report | Agency credit/bucks tracking | No equivalent | None | Part of credit system |
| Bucket autoresponder report | Autoresponder performance per bucket | Workflow reporting | Partial | GHL has workflow analytics but not bucket-scoped |

## 14. Calendar & Tasks

| Feature Area | TopBroker | GHL | Parity | Migration Notes |
|---|---|---|---|---|
| Calendar events | CRUD calendar events | Calendar | Full | Both have full calendar functionality |
| Calendar sharing | Share calendars between agents with bulk update | Calendar sharing | Full | GHL supports calendar sharing |
| Google Calendar sync | OAuth-based Google Calendar integration | Google Calendar integration | Full | Both support Google Calendar sync |
| Microsoft Calendar sync | OAuth-based Microsoft Calendar integration | No native Microsoft Calendar | Partial | GHL focuses on Google. Microsoft sync may need Zapier |
| Mobile calendar | Mobile calendar view with API key access and link sharing | Mobile app with calendar | Full | GHL mobile app includes calendar |
| Meetings | Meeting scheduling with expiration | Calendar booking | Full | GHL has robust booking/scheduling |
| Tasks | Task management with CRUD | Tasks | Full | Both have task management |
| Todo list | Personal todo list with update | No dedicated todo | Partial | GHL tasks can serve as todos but lack the dedicated lightweight todo interface |
| Time off | Time off tracking and management | Calendar blocking | Partial | GHL can block calendar time but has no formal time-off system |
| Personal appointments | Appointments with mark-complete | Appointments | Full | Both support appointments |

## 15. Integrations

| Feature Area | TopBroker | GHL | Parity | Migration Notes |
|---|---|---|---|---|
| Twilio (voice/SMS) | Deep Twilio integration — provisioning, webhooks, messaging service, 10DLC, per-agent/agency | Built-in phone system (Twilio-based) | Partial | GHL's phone system is Twilio-based but abstracts away direct Twilio control. Less granular than TopBroker |
| Google (Calendar, Gmail, OAuth) | Full Google integration | Google Calendar + Gmail integration | Full | Both integrate with Google services |
| Microsoft (Calendar, OAuth) | Microsoft Calendar integration | Limited Microsoft support | Partial | GHL's Microsoft integration is less mature |
| HealthSherpa (HST) | Deep HST integration — credentials, bucket sync, data migration, lock check, post-sale sync, credit transfer | No equivalent | None | Insurance-specific enrollment platform. Critical for ACA business |
| Marketplace | Integration marketplace | GHL marketplace | Partial | Different ecosystems. TopBroker marketplace is insurance-focused |
| Real-time bidding (RTB) | Per-source RTB for lead purchasing with all-states option | No equivalent | None | Lead marketplace integration for buying leads in real-time |
| Stripe billing | Agency/agent subscription billing with invoices, SA subscriptions | Stripe for payments | Partial | GHL uses Stripe for client payments. TopBroker uses Stripe for platform billing — different use case |
| API keys | User-manageable API keys | API access | Full | Both provide API access |
| Froala editor | Rich text editing with image/file upload | Built-in editor | Full | Both have rich text editing |
| LeadCloud | Lead vendor feed integration | No equivalent | None | Insurance lead vendor API |

## 16. Admin & System

| Feature Area | TopBroker | GHL | Parity | Migration Notes |
|---|---|---|---|---|
| User settings (SMTP, profile, alerts, password, 2FA) | Comprehensive user settings | User profile settings | Partial | GHL has basic user settings. TopBroker has SMTP configuration, HST credentials, and granular alert settings |
| Impersonation | Admin login-as-user | No equivalent | None | Support tool for debugging user issues |
| Blacklist | Email/phone blacklist management | DNC/suppression lists | Partial | GHL has suppression but not the structured blacklist with super-admin controls |
| Super admin tools | Email template testing, system-wide blacklist, subscription management | Agency-level admin | Partial | GHL admin is per-location. TopBroker has platform-wide super admin |
| Lead forms with QR codes | Lead capture forms with QR code generation, email, image/PDF download | Forms with QR code | Full | GHL forms support QR code sharing |
| Agent forms | Agent-facing forms with field configuration, submissions, archiving, duplication | Forms | Partial | GHL forms are client-facing. TopBroker has agent-specific form workflows |
| Leaderboard | Agent leaderboard/gamification | No built-in leaderboard | Custom | Could build with GHL reporting or external tool |
| Dashboard widgets | Configurable dashboard with activity stats, call stats, birthdays, task list, widget ordering | Dashboard | Partial | GHL dashboard is less configurable |
| Balance management | Agent credit balance management | No equivalent | None | Part of lead purchase economy |
| Super search | Platform-wide search across all entities | Contact search | Partial | GHL search is contact-focused. TopBroker searches across all entities |
| Filtered states per user | Per-user state filtering for lead visibility | No equivalent | None | Insurance-specific geographic filtering |
| EULA agreement | User EULA acceptance tracking | No equivalent | Custom | Could track via custom field or external system |
| BDC (Business Development Center) | Agent information, available agents per lead, scheduling | No equivalent | None | Insurance call center operations |

---

## Summary Scorecard

| Category | Features Counted | Full | Partial | Custom | None |
|---|---|---|---|---|---|
| Contact/Lead Management | 16 | 2 | 4 | 5 | 5 |
| Agent/User Management | 14 | 0 | 4 | 1 | 9 |
| Agency/Organization | 12 | 1 | 5 | 1 | 5 |
| Lead Distribution (Buckets) | 8 | 0 | 0 | 1 | 7 |
| Round Robin & Routing | 4 | 0 | 1 | 1 | 2 |
| Communication | 12 | 8 | 3 | 1 | 0 |
| Automation & Workflows | 4 | 1 | 3 | 0 | 0 |
| Quotesheets | 8 | 0 | 0 | 1 | 7 |
| Commission Tracking | 8 | 0 | 0 | 0 | 8 |
| Carrier Management | 7 | 0 | 0 | 0 | 7 |
| Recruiting | 8 | 0 | 1 | 3 | 4 |
| Book of Business Upload | 8 | 0 | 1 | 2 | 5 |
| Reports & Analytics | 27 | 0 | 7 | 0 | 20 |
| Calendar & Tasks | 10 | 7 | 2 | 0 | 1 |
| Integrations | 11 | 3 | 4 | 0 | 4 |
| Admin & System | 13 | 2 | 5 | 2 | 4 |
| **TOTAL** | **170** | **24 (14%)** | **40 (24%)** | **18 (11%)** | **88 (52%)** |

**Bottom line**: GHL achieves full parity on only 14% of TopBroker features. Another 24% are partially covered and 11% could be custom-built. Over half (52%) of TopBroker's features have no GHL equivalent at all. The gaps concentrate in insurance-specific domains: commissions, carrier management, quotesheets, lead distribution, and regulatory compliance.
