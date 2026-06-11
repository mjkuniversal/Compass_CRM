# TopBroker CRM — Field Schemas (from Inertia Page Props)

Extracted from runtime Inertia.js page responses captured 2026-03-05. This is the actual data model as served to the browser, not inferred from routes.

**Source**: `/raw/pages/*.json` — 49 page captures across all major CRM sections.

---

## Table of Contents

1. [Shared Props (Every Page)](#1-shared-props-every-page)
2. [Auth Object](#2-auth-object)
3. [User/Agent Fields](#3-useragent-fields)
4. [Agency Fields](#4-agency-fields)
5. [Agency Settings](#5-agency-settings)
6. [Lead Statuses](#6-lead-statuses)
7. [Product Categories](#7-product-categories)
8. [Products](#8-products)
9. [Carriers](#9-carriers)
10. [Dead Reasons](#10-dead-reasons)
11. [Lead Source Fields](#11-lead-source-fields)
12. [Lead Types](#12-lead-types)
13. [Bucket Fields](#13-bucket-fields)
14. [Round Robin Group Fields](#14-round-robin-group-fields)
15. [Marketplace / Lead Purchase](#15-marketplace--lead-purchase)
16. [Balance Management](#16-balance-management)
17. [Commission Statements](#17-commission-statements)
18. [Automation Fields](#18-automation-fields)
19. [Text Inbox](#19-text-inbox)
20. [Email Templates](#20-email-templates)
21. [Text Templates](#21-text-templates)
22. [Action Schedules](#22-action-schedules)
23. [Tasks](#23-tasks)
24. [Lead Forms](#24-lead-forms)
25. [Calendar](#25-calendar)
26. [Voicemail Scripts](#26-voicemail-scripts)
27. [Report Schemas](#27-report-schemas)
28. [Agents Index (List View)](#28-agents-index-list-view)
29. [Leads Search Page](#29-leads-search-page)
30. [User Settings](#30-user-settings)
31. [Starting Points](#31-starting-points)
32. [Reference Enums](#32-reference-enums)
33. [Feature Flags & UI Customization](#33-feature-flags--ui-customization)

---

## 1. Shared Props (Every Page)

These 23 props appear on **all 49 captured pages** — the Inertia "shared data" injected server-side via `HandleInertiaRequests` middleware.

| Prop | Type | Description |
|------|------|-------------|
| `errors` | object | Laravel validation errors |
| `extra` | object | Extra flash data |
| `auth` | object{18} | Auth/permissions object (see section 2) |
| `ziggy` | object | Ziggy route helper config (all named routes + params) |
| `flash` | object | Flash messages |
| `currentAgency` | object{30} | Current agency with settings (see section 4) |
| `agencySharesBuckets` | boolean | Whether agency shares buckets across agents |
| `stripe_public_key` | string | Stripe publishable key for agency billing |
| `stripe_global_public_key` | string | Stripe publishable key for platform-level billing |
| `unreadMessagesCount` | number | Badge count for text inbox |
| `unreadRecruitingMessagesCount` | number | Badge count for recruiting messages |
| `newLeadsCount` | number | Badge count for new unworked leads |
| `newStatementsCount` | number | Badge count for new commission statements |
| `csrf_token` | string | Laravel CSRF token |
| `productCategories` | array[22] | All product categories (see section 7) |
| `agency_domain_agency` | null/object | Custom domain config if white-labeled |
| `ui_customization` | object{7} | White-label theming overrides (see section 33) |
| `pendingEmailBlastsCount` | number | Badge count for pending blasts |
| `failedHstAuthentication` | boolean | HST integration auth failure flag |
| `forcedHstPasswordChange` | boolean | HST forced password change flag |
| `features` | object | Feature flags (see section 33) |
| `googleAccountTokenExpired` | boolean | Google OAuth token expiry flag |
| `microsoftAccountTokenExpired` | boolean | Microsoft OAuth token expiry flag |

---

## 2. Auth Object

18 keys providing permission/capability flags for the current user session.

| Field | Type | Sample/Description |
|-------|------|-------------------|
| `user` | object{52} | Full user record (see section 3) |
| `impersonating` | boolean | `false` — admin impersonation active |
| `is_super_admin` | boolean | `false` — platform-level admin |
| `is_agency_admin` | boolean | `false` — agency owner/admin |
| `bookmarks` | array | User's personal bookmarks |
| `agency_bookmarks` | array | Agency-level shared bookmarks |
| `ip` | string | `104.6.75.119` — client IP |
| `agency_av_enabled` | number | `1` — annualized value tracking enabled |
| `agency_premium_credits_enabled` | number | `0` — premium credit system |
| `hasActiveSubscription` | boolean | `true` — valid TB subscription |
| `hst_available` | boolean | `false` — HST integration available |
| `agency_hidden_nav_items` | array | Nav items hidden by agency admin |
| `has_2fa_enabled` | null/boolean | Two-factor authentication status |
| `lead_files_2fa_valid` | boolean | `true` — 2FA validated for file access |
| `bdc_available` | boolean | `false` — BDC (Business Dev Center) feature |
| `bdc_is_scheduler` | boolean | `false` — BDC scheduler role |
| `timezone` | string | `America/Chicago` — resolved timezone name |
| `timezone_region_name` | string | `Central` — display name |

---

## 3. User/Agent Fields

52 fields from `dashboard.json` -> `props.user`. This is the full user model as returned by the API.

| Field | Type | Sample/Description |
|-------|------|-------------------|
| `id` | number | `8359` |
| `first_name` | string | `Michael` |
| `last_name` | string | `Kopek` |
| `email` | string | [REDACTED] |
| `title` | string | `Associate` |
| `address` | string | `1062 Havenbrook Lane` |
| `city` | string | `Frisco` |
| `state_id` | string | `54` — FK to states table |
| `zip` | string | `75036` |
| `office_phone` | string | [REDACTED] |
| `call_forwarding_number` | string | [REDACTED] |
| `mobile_phone` | string | [REDACTED] |
| `area_code` | string | `469` — used for SMS number provisioning |
| `sms_number` | null/string | Twilio SMS number |
| `time_zone` | string | `2` — FK to timezones (2 = Central) |
| `is_active` | boolean | `true` |
| `inactive_at` | null/string | Timestamp when deactivated |
| `profile_pic` | null/string | Upload path for profile photo |
| `leader_id` | null/number | FK to parent agent (upline) |
| `billing_profile_id` | null/number | FK to billing profile |
| `email_verified_at` | null/string | Email verification timestamp |
| `created_at` | string | `2025-09-10T21:17:02.000000Z` |
| `updated_at` | string | `2026-03-05T15:31:12.000000Z` |
| `stripe_id` | null/string | Stripe customer ID |
| `pm_type` | null/string | Payment method type (card brand) |
| `pm_last_four` | null/string | Last 4 digits of payment method |
| `trial_ends_at` | null/string | Trial expiration date |
| `profile_picture` | null/string | Alternate profile picture field |
| `birthday` | null/string | Agent birthday (for birthday emails) |
| `npn_number` | null/string | National Producer Number (insurance license) |
| `legacy_id` | null/number | ID from previous system |
| `legacy_migration_at` | null/string | Migration timestamp |
| `last_login` | string | `2026-03-05T15:31:12.000000Z` |
| `force_agent_pay` | number | `0` — force agent to pay own subscription |
| `api_key` | string | `229A7A24B22548BF` — per-user API key |
| `calendar_sharing_link` | null/string | Public calendar share URL |
| `company` | null/string | Agent's company name |
| `tax_id` | null/string | Tax identification number |
| `ssn` | null/string | Social Security Number [REDACTED] |
| `from_lead_id` | null/number | If agent was recruited, the lead record ID |
| `has_commissions` | number | `0` — has commission statements |
| `skip_billing` | number | `0` — exempt from billing |
| `full_name` | string | `Michael Kopek` — computed |
| `birthday_literal` | null/string | Formatted birthday string |
| `roles` | array[1] | Role objects (see below) |
| `google_account` | null/object | Google OAuth connection |
| `microsoft_account` | null/object | Microsoft OAuth connection |
| `tb_subscription` | object{9} | TopBroker subscription (see below) |
| `agencies` | array[1] | Agency memberships |
| `bookmarks` | array | User bookmarks |
| `hst_authentication` | null/object | HST integration auth |
| `user_settings` | null/object | User-specific settings |

### User Role Object

| Field | Type | Sample |
|-------|------|--------|
| `id` | number | `1` |
| `name` | string | `Agent` |
| `guard_name` | string | `web` |
| `created_at` | string | timestamp |
| `updated_at` | string | timestamp |
| `pivot.model_type` | string | `App\Models\User` |
| `pivot.model_id` | number | `8359` |
| `pivot.role_id` | number | `1` |

### TB Subscription Object

| Field | Type | Sample |
|-------|------|--------|
| `id` | number | `3516` |
| `agency_id` | null/number | null if user-billed |
| `user_id` | number | `8359` |
| `status` | string | `active` |
| `expires_at` | string | `2026-04-01T03:59:59.000000Z` |
| `suspended_at` | null/string | Suspension timestamp |
| `suspension_override_expires_at` | null/string | Grace period end |
| `created_at` | string | timestamp |
| `updated_at` | string | timestamp |

---

## 4. Agency Fields

30 fields from `dashboard.json` -> `props.currentAgency`.

| Field | Type | Sample/Description |
|-------|------|-------------------|
| `id` | number | `217` |
| `name` | string | `Compass Health Consultants` |
| `created_at` | string | `2024-01-26T23:14:59.000000Z` |
| `updated_at` | string | `2025-04-03T18:13:22.000000Z` |
| `hst_agency` | number | `1` — HST integration enabled |
| `owner_first_name` | null/string | Agency owner first name |
| `owner_last_name` | null/string | Agency owner last name |
| `phone` | null/string | Agency phone |
| `email` | null/string | Agency email |
| `address` | null/string | Agency address |
| `city` | null/string | Agency city |
| `state_id` | null/string | FK to states |
| `zip` | null/string | Agency zip |
| `area_code` | null/string | Area code for Twilio provisioning |
| `time_zone` | null/string | Agency timezone |
| `free_look_period` | string | `90` — days for free-look/cancellation |
| `billing_option` | string | `agency` — `agency` or `agent` billing |
| `billing_per_agent_fee` | number | `25` — monthly per-agent fee |
| `billing_start_date` | string | `2024-03-01T05:00:00.000000Z` |
| `logo` | string | `public/files/HBDTaZ3B...` — agency logo path |
| `legacy_id` | number | `17` |
| `legacy_migration_at` | string | `2024-01-26 18:14:51` |
| `uuid` | string | `77e9bcb0-bcb7-4108-ab6b-...` — public UUID |
| `domain` | null/string | Custom white-label domain |
| `commissions_enabled` | number | `1` — commission tracking feature |
| `commissions_calendar_link_text` | null/string | Custom link text |
| `commissions_calendar_pdf` | null/string | PDF upload path |
| `commissions_calendar_url` | null/string | External calendar URL |
| `commissions_calendar_url_link_text` | null/string | Custom URL link text |
| `settings` | object{56} | Agency settings (see section 5) |

---

## 5. Agency Settings

56 fields nested under `currentAgency.settings`. Controls agency-wide behavior, notifications, theming, and feature toggles.

| Field | Type | Sample/Description |
|-------|------|-------------------|
| `id` | number | `12` |
| `agency_id` | number | `217` |
| `support_person_id` | number | `1720` — FK to support user |
| `missed_appt_hours` | string | `0` — hours before missed appointment trigger |
| `missed_appt_bucket_id` | null/number | Bucket to move missed appointments |
| `only_agent_history` | number | `0` — restrict history to own agent only |
| `require_notes_on_dead` | number | `0` — force notes when marking lead dead |
| `birthday_email_subject` | string | `Happy Birthday [firstname]` |
| `birthday_email_body` | string | HTML email body with `[firstname]` merge tag |
| `quotesheet_subject` | string | `Your Customized Health Quotes` |
| `quotesheet_body` | string | HTML body |
| `appointment_subject` | string | `Your Appointment Reminder...` |
| `appointment_body` | string | HTML body |
| `currency` | string | `C` — currency code |
| `allow_agent_questionnaire` | number | `1` |
| `color_1` | string | `#000000` — brand color 1 |
| `color_2` | string | `#737373` — brand color 2 |
| `color_3` | string | `#7c8d91` — brand color 3 |
| `color_4` | string | `#97b1b8` — brand color 4 |
| `stripe_public_key` | string | Stripe publishable key (agency-owned) |
| `stripe_secret_key` | string | Stripe secret key (agency-owned) |
| `stripe_webhook_secret_key` | string | Stripe webhook secret |
| `created_at` | string | timestamp |
| `updated_at` | string | timestamp |
| `default_action_schedule_id` | number | `94` — default action schedule for new sources |
| `lock_email_templates` | number | `0` — prevent agents from editing email templates |
| `lock_text_templates` | number | `0` — prevent agents from editing text templates |
| `show_admin_lead_sources` | number | `0` — show admin sources to agents |
| `disconnected_phone_noti` | string | `[]` — JSON array of emails for disconnected phone notifications |
| `dead_lead_noti` | string | `[]` — JSON array of emails for dead lead notifications |
| `first_agent_sale_noti` | string | `["email@example.com"]` — notify on first sale |
| `split_sale_noti` | string | `["email@example.com"]` — notify on split sales |
| `carrier_contract_request_noti` | string | `["email@example.com"]` — notify on contract requests |
| `pending_contracting_noti` | null/string | Contracting notification emails |
| `grace_pulls_enabled` | number | `1` — allow grace period pulls from buckets |
| `grace_pulls_on_weekends` | number | `0` — allow grace pulls on weekends |
| `av_enabled` | number | `1` — annualized value calculations enabled |
| `premium_credits_enabled` | number | `0` — premium credit system |
| `rank_by_all_categories` | number | `1` — rank agents across all product categories |
| `delegate_carrier_product_control` | number | `1` — let sub-agents manage carrier products |
| `ui_color_1` | null/string | White-label primary color |
| `ui_color_2` | null/string | White-label secondary color |
| `ui_login_background_color` | null/string | Login page background |
| `ui_topbar_background_color` | null/string | Top nav background |
| `ui_topbar_foreground_color` | null/string | Top nav text color |
| `logo` | null/string | White-label logo |
| `logo_without_text` | null/string | White-label icon-only logo |
| `use_ui_customizations` | number | `0` — enable white-label theming |
| `agents_visible_on_manage_pa_ids` | number | `1` — show agent IDs in management |
| `dashboard_hidden_widgets` | null/string | JSON array of hidden widget IDs |
| `hidden_nav_items` | null/string | JSON array of hidden navigation items |
| `bdc_enabled` | number | `1` — Business Development Center feature |
| `require_2fa_for_files` | number | `0` — require 2FA to access lead files |
| `auto_update_to_dnc_text` | number | `0` — auto-mark DNC on STOP texts |
| `default_agent_form_logo_url` | null/string | Default logo for agent forms |
| `give_credits_for_renewals` | number | `0` — issue credits for renewal policies |

---

## 6. Lead Statuses

### Commercial Statuses (8)

| ID | Name | Button Label | Category |
|----|------|-------------|----------|
| 1 | Uncontacted | Uncontacted | commercial |
| 2 | Contacted | Contacted | commercial |
| 6 | Sold | Log a Sale | commercial |
| 7 | Disconnected Number | Disconnected Number | commercial |
| 9 | Missed Appointment | Missed Appointment | commercial |
| 11 | Cancelled | Cancelled | commercial |
| 13 | Unreachable | Unreachable | commercial |
| 8 | Dead | Dead | any |

### Recruiting Statuses (7)

| ID | Name | Button Label | Category |
|----|------|-------------|----------|
| 31 | Recruit | Recruit | recruitment |
| 32 | Pending Contracting | Pending Contracting | recruitment |
| 33 | In Contracting | In Contracting | recruitment |
| 34 | Agent | Agent | recruitment |
| 35 | Rejected | Rejected | recruitment |
| 36 | Contacted/Interview | Contacted/Interview | recruitment |
| 8 | Dead | Dead | any |

### Status Object Schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Status ID |
| `name` | string | Internal name |
| `logical_order` | null/number | Sort order |
| `created_at` | string | Timestamp |
| `updated_at` | string | Timestamp |
| `lead_category` | string | `commercial`, `recruitment`, or `any` |
| `button_label` | string | UI button text |

**Note**: Status ID 8 (Dead) has `lead_category: "any"` and appears in both commercial and recruiting pipelines.

---

## 7. Product Categories

22 categories. Each has a per-agency settings object controlling visibility and calculation permissions.

| ID | Title |
|----|-------|
| 1 | Accident |
| 2 | Accident/CI Combo |
| 3 | Annuity |
| 4 | Association Benefits |
| 5 | Critical Illness |
| 6 | Dental/Vision |
| 7 | Disability |
| 8 | Fixed Benefit |
| 9 | Group Health |
| 10 | Group Supplement |
| 11 | Health Sharing Plan |
| 12 | Life Insurance |
| 13 | Long Term Care |
| 14 | Major Medical |
| 15 | MEC |
| 16 | Medicare Advantage |
| 17 | Medicare Supplement |
| 18 | Other |
| 19 | P&C |
| 20 | Prescription |
| 21 | Short Term |
| 22 | Health Matching Account |

### Category Settings (per agency)

| Field | Type | Description |
|-------|------|-------------|
| `product_category_id` | number | FK to category |
| `can_see` | number | `0`/`1` — visible to agency agents |
| `can_calculate` | number | `0`/`1` — include in AV calculations |

---

## 8. Products

62 products in this agency (4,006 products visible in sale-listing report across all carriers). 21 fields per product.

| Field | Type | Sample/Description |
|-------|------|-------------------|
| `id` | number | `71675` |
| `agency_carrier_id` | number | `3215` — FK to agency_carriers |
| `name` | string | `LIFEX - 2500 Classic` |
| `multiplier` | number | `12` — annualization multiplier (months) |
| `category_id` | number | `9` — FK to product_categories |
| `default_mga_id` | null/number | Default MGA (Managing General Agent) |
| `collect_end_date` | number | `0` — whether to collect policy end date |
| `show_renew_button` | number | `1` — show renewal button on policies |
| `track_assisted_sales` | number | `0` — track assisted/split sales |
| `policy_numbers` | number | `1` — number of policy numbers required |
| `policy_expiring_schedule_id` | null/number | Action schedule for expiring policies |
| `policy_expiring_days_prior` | number | `0` — days before expiry to trigger |
| `points` | null/number | Points awarded per sale |
| `agency_bucks_issued_on_submit` | string | `40.00` — credits charged to agent on sale submission |
| `is_active` | number | `1` |
| `created_at` | string | Timestamp |
| `updated_at` | string | Timestamp |
| `master_carrier_product_id` | number | `4434` — FK to global product catalog |
| `hst_product_id` | null/number | HST integration product mapping |
| `legacy_id` | null/number | Previous system ID |
| `legacy_migration_at` | null/string | Migration timestamp |

### Products by Category (this agency)

| Category | Count | Examples |
|----------|-------|---------|
| Group Health | 18 | LIFEX - 2500 Classic, LIFEX - 3500 Classic, LIFEX - 3500 HSA... |
| Major Medical | 25 | PRIME ENROLL - Copay 4500, PRIME ENROLL - HSA 3500... |
| Dental/Vision | 8 | LIFEX - Humana Dental, Solstice PPO, Solstice DHMO... |
| MEC | 5 | PRIME ENROLL - MVP Basic, MVP Value, MVP Advantage... |
| Accident | 2 | BRECKPOINT ACCIDENT 5K, BRECKPOINT ACCIDENT 10K |
| Critical Illness | 2 | BRECKPOINT CRITICAL ILLNESS 10K, 20K |
| Fixed Benefit | 1 | ENROLL PRIME - Med Performance |
| Prescription | 1 | TransparentPrice RX |

---

## 9. Carriers

Agency-carrier junction table. 3 carriers for this agency (210 carriers visible in sale-listing report). 10 fields per agency-carrier record.

| Field | Type | Sample/Description |
|-------|------|-------------------|
| `id` | number | `3215` — agency_carrier ID (junction table PK) |
| `carrier_id` | number | `477` — FK to master carriers table |
| `agency_id` | number | `217` |
| `has_access` | number | `1` — agency has access to this carrier |
| `default_mga_id` | number | `19` — default MGA for this carrier |
| `allow_agents_to_request_contract` | number | `0` — self-service contracting |
| `agency_notes` | string | HTML — carrier-specific notes/instructions (can be very large) |
| `created_at` | string | Timestamp |
| `updated_at` | string | Timestamp |
| `carrier` | object{2} | Nested carrier: `{id, carrier}` where `carrier` is the name string |

### Master Carrier Object (nested)

| Field | Type | Sample |
|-------|------|--------|
| `id` | number | `477` |
| `carrier` | string | `LIFEX RESEARCH CORP` |

### Carriers in This Agency

| agency_carrier_id | carrier_id | Name |
|--------------------|------------|------|
| 3215 | 477 | LIFEX RESEARCH CORP |
| 1618 | 370 | ENROLL PRIME |
| 2671 | 438 | TransparentPrice RX |

### Agent-Carrier Report Carriers (220 master carriers, samples)

`ACA - GENERIC`, `AETNA (GROUP)`, etc. — global carrier catalog is much larger than per-agency list.

---

## 10. Dead Reasons

3 global dead reasons. Agencies can potentially add custom reasons.

| ID | Name | Is Global | Agency ID |
|----|------|-----------|-----------|
| 1 | DNC | 1 | null |
| 2 | Not Interested | 1 | null |
| 3 | Already Purchased | 1 | null |

### Dead Reason Object Schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Reason ID |
| `is_global` | number | `1` = system-wide, `0` = agency-specific |
| `agency_id` | null/number | Owning agency (null if global) |
| `name` | string | Display name |
| `created_at` | string | Timestamp |
| `updated_at` | string | Timestamp |
| `legacy_id` | null/number | Previous system ID |
| `legacy_migration_at` | null/string | Migration timestamp |

---

## 11. Lead Source Fields

49 fields per lead source. Lead sources define how leads enter the system and what happens to them.

| Field | Type | Sample/Description |
|-------|------|-------------------|
| `id` | number | `17192` |
| `user_id` | number | `8359` — owning agent |
| `agency_id` | number | `217` |
| `active` | number | `1` |
| `vendor` | string | `Referral` — vendor/provider name |
| `label` | string | `Referral` — display label |
| `label_searchable_to_sub_agents` | number | `0` — visible to downline agents |
| `lead_type_id` | number | `1` — FK to lead_types (Health) |
| `cost_per_lead` | string | `0.00` — cost charged per lead |
| `notify_agency_when_dead` | number | `0` |
| `starting_point_type_id` | string | `X` — distribution starting point type |
| `starting_point_subtype_id` | number | `0` — sub-type (bucket/RR group ID) |
| `give_bad_phone_credit` | number | `0` — auto-credit for bad phone leads |
| `timeframe_bad_phone_credit` | number | `0` — minutes before bad phone credit eligible |
| `give_already_purchased_credit` | number | `0` — auto-credit for already purchased |
| `created_at` | string | Timestamp |
| `updated_at` | string | Timestamp |
| `action_schedule_id` | number | `94` — FK to action_schedules |
| `vendor_key` | string | `9D5D20AEA0` — API key for lead posting |
| `bad_phone_action` | null/string | Action to take on bad phone |
| `bad_phone_action_user_id` | null/number | Reassign to user |
| `bad_phone_action_bucket_id` | null/number | Move to bucket |
| `dead_action` | null/string | Action on dead lead |
| `dead_action_user_id` | null/number | Reassign dead lead to user |
| `dead_action_bucket_id` | null/number | Move dead lead to bucket |
| `rtb_active` | number | `0` — real-time bidding active |
| `legacy_id` | null/number | Previous system ID |
| `legacy_rsourceid` | null/number | Previous system source ID |
| `legacy_migration_at` | null/string | Migration timestamp |
| `hard_time_limit` | null/number | Hard time limit for working lead |
| `hard_time_limit_action` | null/string | Action when hard time limit hit |
| `htl_user_id` | null/number | Reassign to user on hard time limit |
| `htl_bucket_id` | null/number | Move to bucket on hard time limit |
| `timeframe_already_purchased_credit` | number | `0` |
| `rtb_daily_overflow_cap` | number | `0` — RTB daily cap |
| `rtb_weekly_overflow_cap` | number | `0` — RTB weekly cap |
| `weekly_dispo_email` | null/string | Weekly disposition report email |
| `send_dispo_type` | null/string | Disposition email type |
| `lead_category` | string | `commercial` or `recruitment` |
| `representing_agency` | null/object | Agency represented (for multi-agency) |
| `notify_duplicates` | number | `0` — notify on duplicate leads |
| `duplicate_notification_emails` | null/string | Emails for duplicate notification |
| `enable_24hr_duplicate_check` | number | `1` — check dupes within 24 hours |
| `hst_in_name` | number | `0` — include HST in lead name |
| `show_to_other_agents` | number | `0` — visible to other agents |
| `starting_point_name` | string | `Assign To Me` — resolved display name |
| `timeframe_bad_phone_credit_hr` | string | `0` — hours for bad phone credit |
| `timeframe_already_purchased_credit_hr` | string | `0` — hours for already purchased credit |
| `vendor_label` | string | `Referral: Referral` — computed display label |

### Lead Source Summary View (from sources index)

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Source ID |
| `vendor` | string | Vendor name |
| `label` | string | Source label |
| `lead_type_name` | string | `Health` — resolved type name |
| `lead_type_id` | number | FK to lead_types |
| `api_code` | string | API posting key |
| `cost_per_lead` | string | Cost per lead |
| `active` | number | Active flag |
| `starting_point` | string | Starting point display name |
| `action_schedule_id` | number | FK to action_schedules |
| `action_schedule_name` | string | Resolved schedule name |
| `rtb_active` | number | Real-time bidding flag |
| `representing_agency` | null/object | Multi-agency representation |

---

## 12. Lead Types

5 lead types that categorize lead sources.

| ID | Name |
|----|------|
| 1 | Health |
| 2 | Group |
| 3 | Auto |
| 4 | Life |
| 5 | Medicare |

---

## 13. Bucket Fields

25 fields per bucket. Buckets are lead pools that agents pull from. 634 buckets visible in text-inbox data; 24 agency-level buckets in lead-sources-index.

| Field | Type | Sample/Description |
|-------|------|-------------------|
| `id` | number | `183` |
| `user_id` | number | `4729` — owner user ID |
| `is_agency` | number | `1` — agency-level bucket |
| `agency_id` | number | `217` |
| `name` | string | `***HST Aged Leads` — display name |
| `type` | string | `1` — bucket type (`0` = standard purchase, `1` = click-to-dial) |
| `distribution_per_hour` | number | `0` — leads distributed per hour |
| `distribution_method` | string | `S` — distribution method (S = self-serve) |
| `selling_price` | number | `0` — price per lead pull |
| `allow_transfer` | number | `0` — allow agent-to-agent transfer |
| `tooltip` | null/string | Tooltip text shown to agents |
| `click_to_dial_script` | null/string | Script shown during click-to-dial |
| `hours_until_stale` | number | `0` — hours before lead becomes stale |
| `action_on_stale` | string | `0\|0` — stale action (pipe-delimited: action\|target_id) |
| `deleted_at` | null/string | Soft delete timestamp |
| `created_at` | string | Timestamp |
| `updated_at` | string | Timestamp |
| `delayed_dist_rrg_id` | null/number | Round robin group for delayed distribution |
| `new_agents_daily_limit` | number | `50` — daily pull limit for new agents |
| `legacy_id` | number | `106` — previous system ID |
| `legacy_migration_at` | string | Migration timestamp |
| `stale_lead_action` | null/string | Action when lead goes stale |
| `stale_lead_action_bucket_id` | null/number | Move stale leads to bucket |
| `stale_lead_action_user_id` | null/number | Reassign stale leads to user |
| `stale_lead_action_rrg_id` | null/number | Route stale leads to RR group |

### Bucket Access (from marketplace)

When agents access buckets, access records track daily limits:

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Access record ID |
| `bucket_id` | number | FK to buckets |
| `user_id` | number | FK to users |
| `daily_limit` | number | Max pulls per day |
| `created_at` | string | Timestamp |
| `updated_at` | string | Timestamp |
| `bucket` | object | Full bucket object (with `available_leads_count` and `purchased_leads_today` added) |

### Bucket Config Values

- `possible_hours_until_stale`: 1-2260 (integer range)
- `possibleBucketAccessValues`: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 9999]

---

## 14. Round Robin Group Fields

20 fields per group. 12 round robin groups in this agency. Groups distribute leads to agents based on caps and schedules.

| Field | Type | Sample/Description |
|-------|------|-------------------|
| `id` | number | `25` |
| `user_id` | number | `4729` — owner |
| `agency_id` | number | `217` |
| `rr_group_name` | string | `Compass Funnel Leads` |
| `overflow_label` | string | `` — display label for overflow |
| `overflow_options` | string | `B` — overflow target type (B = bucket, R = RR group, U = user) |
| `overflow_bucket_id` | number | `295` — where overflow leads go |
| `overflow_rrg_id` | null/number | Alternate overflow to another RR group |
| `overflow_user_id` | null/number | Alternate overflow to a user |
| `initial_action_timeframe` | number | `120` — minutes for initial action |
| `lookback` | string | `weekSF` — lookback period for cap calculation |
| `credit_bad_phones` | number | `1` — credit agent for bad phone leads |
| `created_at` | string | Timestamp |
| `updated_at` | string | Timestamp |
| `legacy_id` | number | `10` |
| `legacy_migration_at` | string | Migration timestamp |
| `auto_add_new_agents_enabled` | number | `0` — auto-add new agents to group |
| `auto_add_new_agents_weekly_cap` | number | `0` — weekly cap for auto-added agents |
| `auto_add_new_agents_daily_cap` | number | `0` — daily cap for auto-added agents |
| `auto_add_new_agents_cost_per_lead` | number | `0` — cost per lead for auto-added agents |

---

## 15. Marketplace / Lead Purchase

Component: `LeadMarketPlace/Index` — 40 total props (17 page-specific). Where agents manage their lead program subscriptions.

### Page-Specific Props

| Prop | Type | Description |
|------|------|-------------|
| `allStates` | array[52] | All US states + territories: `{id, code, name}` |
| `loggedInUserLicensedStates` | array | States where logged-in user is licensed |
| `licensedStates` | array | Licensed states for selected user |
| `statesUsedAsDistributionFilter` | array | States used as distribution filters |
| `purchaseBucketsAccess` | array[12] | Purchase bucket access records (see section 13) |
| `clickToDialBucketsAccess` | array[2] | Click-to-dial bucket access records |
| `agents` | array[1] | Agents list: `{id, first_name, last_name, full_name, birthday_literal}` |
| `selectedUser` | object{56} | Full user object for selected agent |
| `showStatesForSelectedUser` | boolean | Whether to show state filter |
| `showPurchaseButton` | boolean | Whether purchase button is visible |
| `totalCreditAmount` | string | `-50.00` — agent's credit balance |
| `availableHstCredit` | null/number | HST credit balance |
| `availableAndAllowedNegativeCredits` | number | `-50` — allowed negative balance |
| `entries` | array[4] | Lead program entries (see below) |
| `weekly_cap` | array[59] | Possible weekly cap values (0-58) |
| `daily_cap` | array[59] | Possible daily cap values (0-58) |
| `externalAgenciesBucketsAvailable` | boolean | External agency bucket access |

### Marketplace Entry (Lead Program Subscription)

| Field | Type | Sample/Description |
|-------|------|-------------------|
| `id` | number | `11881` |
| `rr_group_id` | number | `31` — FK to round_robin_groups |
| `user_id` | number | `8359` — subscribed agent |
| `state_id` | null/number | State filter |
| `weekly_cap` | number | `0` — weekly lead cap (0 = unlimited) |
| `daily_cap` | number | `0` — daily lead cap (0 = unlimited) |
| `override_actsched_id` | null/number | Override action schedule |
| `override_source_id` | null/number | Override source |
| `source_label_overide` | null/string | Override source label |
| `lead_owner_price` | number | `19` — price per lead to agent |
| `old_weekly_cap` | number | `0` — previous weekly cap |
| `old_daily_cap` | number | `0` — previous daily cap |
| `bucket_id` | null/number | Associated bucket |
| `created_at` | string | Timestamp |
| `updated_at` | string | Timestamp |
| `states_used` | string | `lead_marketplace_states` — which states config to use |
| `is_active` | number | `1` |
| `hide_from_lead_programs` | number | `0` — hidden from agent marketplace |
| `legacy_id` | null/number | Previous system ID |
| `legacy_migration_at` | null/string | Migration timestamp |
| `round_robin_group` | object | Nested RR group object |

---

## 16. Balance Management

Component: `AgentBalanceManagement/Index` — 32 total props (9 page-specific). 9.8MB response due to full agent list with all fields.

### Page-Specific Props

| Prop | Type | Description |
|------|------|-------------|
| `type` | string | `agency` — balance management context |
| `ownerUser` | null/object | Owner user (for agency billing) |
| `user` | object{52} | Current user |
| `agents` | array[4986] | **All agency agents** with full user fields (causes large response) |
| `credit_cards` | array | Stored payment methods |
| `available_credits` | string | `-50.00` — current credit balance |
| `low_balance_settings` | object | Low balance alert config (see below) |
| `autoreplenish_payment_settings` | object | Auto-replenish config (see below) |
| `transfers` | object | Credit transfer history (paginated) |

### Low Balance Settings

| Field | Type | Description |
|-------|------|-------------|
| `low_balance_threshold` | null/number | Dollar amount to trigger alert |
| `notify_low_balance` | number | `0` — enable low balance notifications |

### Auto-Replenish Settings

| Field | Type | Description |
|-------|------|-------------|
| `autoreplenish_authorized` | number | `0` — enable auto-replenish |
| `autoreplenish_amount` | null/number | Amount to replenish |
| `autoreplenish_balance_threshold` | null/number | Threshold to trigger replenish |
| `autoreplenish_max_daily_amount` | null/number | Max daily auto-replenish |

---

## 17. Commission Statements

Component: `CommissionStatements/Agent/Index` — 34 total props (11 page-specific).

### Page-Specific Props

| Prop | Type | Description |
|------|------|-------------|
| `logo` | string | Agency logo path |
| `filtered_by` | object{7} | Current filter state (see below) |
| `years` | array[6] | Available years: `[2021, 2022, 2023, 2024, 2025, 2026]` |
| `viewNew` | boolean | `false` — viewing new statements flag |
| `requiresCommissionsAuthorization` | boolean | `false` — needs auth to view |
| `commissionsCalendarHtmlContent` | null/string | HTML content for calendar |
| `commissionsCalendarLinkText` | string | `Commissions Calendar` |
| `commissionsCalendarPdfUrl` | null/string | Calendar PDF download URL |
| `commissionsCalendarPdfLinkText` | string | `Commissions Calendar` |
| `commissionsCalendarUrl` | null/string | External calendar URL |
| `commissionsCalendarUrlLinkText` | string | `View Calendar` |

### Filter Object

| Field | Type | Description |
|-------|------|-------------|
| `from` | null/string | Date range start |
| `to` | null/string | Date range end |
| `year` | number | `2026` — selected year |
| `include_personal_production` | boolean | Include own production |
| `chart_show_team_overrides` | string | `N` — show team overrides in chart |
| `chart_show_career` | string | `N` — show career total in chart |
| `agent_selected` | null/number | Selected agent filter |

---

## 18. Automation Fields

Component: `Automation/Index` — 29 total props (6 page-specific).

### Page-Specific Props

| Prop | Type | Description |
|------|------|-------------|
| `automations` | object{3} | Paginated: `{data, links, meta}` |
| `canUpdate` | boolean | `false` — can current user edit automations |
| `showIsActive` | boolean | `true` — show active toggle |
| `showRoute` | string | `user-automations.show` — Laravel route name |
| `createRoute` | string | `user-automations.create` — Laravel route name |
| `showIsAgency` | boolean | `true` — show agency-level flag |

### Automation Object

| Field | Type | Sample |
|-------|------|--------|
| `id` | number | `19` |
| `agency_id` | number | `217` |
| `name` | string | `Expiring Policy Notification` |
| `is_ready` | boolean | `true` |
| `is_active` | boolean | `true` |
| `is_agency` | boolean | `true` |
| `can_update` | boolean | `false` |

---

## 19. Text Inbox

Component: `TextInbox/Index` — 38 total props (15 page-specific).

### Page-Specific Props

| Prop | Type | Description |
|------|------|-------------|
| `leadCategory` | string | `commercial` |
| `textInboxes` | object{3} | Paginated SMS conversations: `{data, links, meta}` |
| `textInboxTotalCount` | number | `0` — total conversation count |
| `selectedTextInbox` | null/object | Currently selected conversation |
| `messages` | object{1} | Messages for selected conversation: `{data}` |
| `agentSmsNumber` | string | `+14698125045` — agent's Twilio number |
| `mmsSupported` | boolean | `true` — MMS capable |
| `disconnectedPhoneStatusId` | number | `7` — status ID for disconnected |
| `deadStatusId` | number | `8` — status ID for dead |
| `buckets` | array[634] | All accessible buckets |
| `rrGroups` | array[12] | All round robin groups |
| `searchQuery` | null/string | Current search query |
| `dncReasonId` | number | `1` — dead reason ID for DNC |
| `notInterestedReasonId` | number | `2` — dead reason ID for Not Interested |
| `alreadyPurchasedReasonId` | number | `3` — dead reason ID for Already Purchased |

---

## 20. Email Templates

Component: `EmailTemplates/Index` — 28 total props (5 page-specific).

### Page-Specific Props

| Prop | Type | Description |
|------|------|-------------|
| `leadCategory` | string | `commercial` |
| `emailTemplates` | object{3} | Paginated templates |
| `user_is_admin` | boolean | `false` |
| `can_edit` | boolean | `true` |
| `search` | null/string | Search query |

### Email Template Object

| Field | Type | Sample/Description |
|-------|------|-------------------|
| `id` | number | `1728` |
| `type` | string | `agency` — `agency` or `personal` |
| `user_id` | number | `4729` — creator |
| `agency_id` | number | `217` |
| `name` | string | `Aged Lead - Call 1 - VM/EM/TX` |
| `subject` | string | `Are You Finding Health Insurance Options...` |
| `body` | string | HTML body with merge tags like `[firstname]` |
| `location` | string | `B` — location code |
| `created_at` | string | Timestamp |
| `updated_at` | string | Timestamp |
| `legacy_id` | number | Previous system ID |
| `legacy_migration_at` | string | Migration timestamp |
| `lead_category` | string | `commercial` |

---

## 21. Text Templates

Component: `TextTemplates/Index` — 27 total props (4 page-specific).

### Text Template Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Template ID |
| `type` | string | `agency` or `personal` |
| `user_id` | number | Creator |
| `agency_id` | number | Agency |
| `name` | string | Template name |
| `message` | string | SMS body with merge tags |
| `location` | string | Location code |
| `file_media` | string/null | Attached media file path (MMS) |
| `created_at` | string | Timestamp |
| `updated_at` | string | Timestamp |
| `legacy_id` | number/null | Previous system ID |
| `legacy_migration_at` | string/null | Migration timestamp |
| `lead_category` | string | `commercial` |

---

## 22. Action Schedules

Component: `ActionSchedules/Index` — 26 total props (3 page-specific). 30 action schedules in this agency.

### Action Schedule Object (list view)

| Field | Type | Sample |
|-------|------|--------|
| `id` | number | `111` |
| `name` | string | `Aged Lead Individual` |
| `is_agency` | string | `Yes` — agency-level schedule |
| `active` | string | `Yes` |
| `user_id` | number | `4729` — owner |
| `includesGracePulls` | boolean | `false` — includes grace pull steps |

### Action Schedule Object (full, from lead-sources-index)

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Schedule ID |
| `agency_id` | number | Agency |
| `user_id` | number | Owner |
| `is_agency` | number | Agency-level flag |
| `active` | number | Active flag |
| `name` | string | Schedule name |
| `working_hours_type` | string | Working hours configuration |
| `created_at` | string | Timestamp |
| `updated_at` | string | Timestamp |
| `legacy_action_map_id` | number/null | Previous system ID |
| `legacy_migration_at` | string/null | Migration timestamp |
| `lead_category` | string | `commercial` or `recruitment` |

---

## 23. Tasks

Component: `Tasks/Index` — 25 total props (2 page-specific).

### Task Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Task ID |
| `agency_id` | number | Agency |
| `user_id` | number | Owner |
| `is_agency` | number | Agency-level flag |
| `is_global` | number | Global (all users) flag |
| `name` | string | Task name |
| `is_task` | number | Is a task (vs other type) |
| `hide_action` | number | Hidden from action list |
| `created_at` | string | Timestamp |
| `updated_at` | string | Timestamp |
| `legacy_id` | number/null | Previous system ID |
| `legacy_migration_at` | string/null | Migration timestamp |
| `active` | number | Active flag |
| `lead_category` | string | `commercial` |

---

## 24. Lead Forms

Component: `LeadForms/Index` — 26 total props (3 page-specific).

### Lead Form Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Form ID |
| `agency_id` | number | Agency |
| `user_id` | number | Owner |
| `name` | string | Form name |
| `lead_type_id` | number | FK to lead_types |
| `is_agency` | number | Agency-level flag |
| `script` | string | Form configuration/script |
| `is_active` | number | Active flag |
| `legacy_id` | number/null | Previous system ID |
| `legacy_migration_at` | string/null | Migration timestamp |
| `created_at` | string | Timestamp |
| `updated_at` | string | Timestamp |
| `user` | object | Creator user object |
| `submissions` | array/object | Form submissions |

---

## 25. Calendar

Component: `Calendar/Index` — 32 total props (9 page-specific).

### Page-Specific Props

| Prop | Type | Description |
|------|------|-------------|
| `user` | object{52} | Current user |
| `timezone` | string | `America/Chicago` |
| `googleAccount` | null/object | Google OAuth account |
| `googleConnectedCalendar` | null/object | Connected Google Calendar |
| `googlePendingCalendars` | null/array | Google calendars pending sync |
| `microsoftAccount` | null/object | Microsoft OAuth account |
| `microsoftConnectedCalendar` | null/object | Connected Outlook Calendar |
| `colors` | array[18] | Calendar event colors (see below) |
| `viewingSharedCalendar` | boolean | `false` — viewing another agent's calendar |

### Calendar Color Object

| Field | Type | Sample |
|-------|------|--------|
| `id` | number | `2` |
| `value` | string | `blue` |
| `label` | string | `Blue` |
| `created_at` | string | Timestamp |
| `updated_at` | string | Timestamp |

18 available colors.

---

## 26. Voicemail Scripts

Component: `VoicemailScripts/Index` — 26 total props (3 page-specific).

### Voicemail Script Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Script ID |
| `user_id` | number | Owner |
| `is_agency` | number | Agency-level flag |
| `name` | string | Script name |

---

## 27. Report Schemas

### Agency Report (`Reports/AgencyReport`)

| Prop | Type | Description |
|------|------|-------------|
| `initialFilterDateFrom` | string | `2026-03-05` — default date range start |
| `initialFilterDateTo` | string | `2026-03-05` — default date range end |
| `avEnabled` | boolean | `true` — AV calculations enabled |

### Agent Report (`Reports/ComingSoon`)

No additional props — this report is not yet implemented.

### Agent-Carrier Report (`Reports/AgentCarrierReport`)

| Prop | Type | Description |
|------|------|-------------|
| `agents` | array[1085] | All agents with full user fields |
| `carriers` | array[220] | Master carrier list: `{id, carrier}` |
| `states` | array[52] | States: `{id, name, code}` |

### Sale Listing Report (`Reports/SaleListingReport`)

| Prop | Type | Description |
|------|------|-------------|
| `initialFilterDateFrom` | string | Date range start |
| `initialFilterDateTo` | string | Date range end |
| `initialFilterAgentId` | number | Pre-selected agent ID |
| `teams` | array[236] | Team members with full user fields |
| `agents` | array[1] | Selected agent(s) |
| `products` | array[4006] | All products across all carriers |
| `carriers` | array[210] | All agency carriers with nested products |
| `sources` | array[1] | Lead sources for filter |
| `timezone` | string | `America/Chicago` |

### Lead Source Report (`Reports/LeadSourceReport`)

| Prop | Type | Description |
|------|------|-------------|
| `initialFilterDateFrom` | string | Date range start |
| `initialFilterDateTo` | string | Date range end |
| `agents` | array[1] | Selected agent(s) |

### Commission Carriers Report (`Reports/CommissionsCarriersReport`)

| Prop | Type | Description |
|------|------|-------------|
| `initialFilterDateFrom` | string | Date range start |
| `initialFilterDateTo` | string | Date range end |
| `timezone` | string | `America/Chicago` |

### Bucket Pull Report (`Reports/BucketPullReport`)

| Prop | Type | Description |
|------|------|-------------|
| `initialFilterDateFrom` | string | Date range start |
| `initialFilterDateTo` | string | Date range end |
| `agents` | array[1085] | All agents |
| `buckets` | array[24] | Agency buckets for filter |

### Product Report (`Reports/ProductReport`)

| Prop | Type | Description |
|------|------|-------------|
| `initialFilterDateFrom` | string | Date range start |
| `initialFilterDateTo` | string | Date range end |
| `agents` | array[1085] | All agents |

### Last Login Report (`Reports/LastLoginReport`)

No additional props — uses shared data only.

---

## 28. Agents Index (List View)

Component: `Agents/Index` — 25 total props (2 page-specific).

### Agent List Item (10 fields — summary view)

| Field | Type | Sample/Description |
|-------|------|-------------------|
| `id` | number | `4144` |
| `name` | string | `Abbott, Walter` — formatted `Last, First` |
| `email` | string | [REDACTED] |
| `phone` | string | `3032503546` |
| `leader_names` | string | `Mark Hopwood, Mark Hopwood` — upline names |
| `balance` | object{5} | Credit balance breakdown (see below) |
| `total` | string | `0.00` — total balance |
| `hst_id` | null/number | HST integration ID |
| `is_active` | boolean | `false` |
| `profile_picture_src` | null/string | Profile picture URL |

### Agent Balance Breakdown

| Field | Type | Description |
|-------|------|-------------|
| `Credit Purchases` | string | Credits from purchases |
| `Policy Submission` | string | Credits from policy submissions |
| `Imported Credits` | string | Manually imported credits |
| `Bonus Credits` | string | Bonus/promotional credits |
| `Total` | string | Total balance |

---

## 29. Leads Search Page

Component: `Leads/LeadSearch` — 42 total props (19 page-specific). The primary lead management interface.

### Page-Specific Props

| Prop | Type | Description |
|------|------|-------------|
| `search_layout` | null/string | Saved search layout preference |
| `leads` | object{1} | Paginated lead results: `{data}` |
| `states` | array[52] | US states for filter |
| `new_lead_statuses` | array[2] | Statuses available for new leads (Uncontacted, Contacted) |
| `all_statuses` | array[8] | All commercial statuses |
| `all_statuses_recruiting` | array[7] | All recruiting statuses |
| `lead_custom_tags` | array | Custom tags for filtering |
| `lead_sources` | array[1] | Agent's lead sources |
| `dead_reasons` | array[3] | Dead reasons for filter |
| `filtered_by` | array | Active filter criteria |
| `pagination_length` | number | `10` — results per page |
| `sources` | array[1] | Alternate source reference |
| `agents` | array[1021] | Agents for filter/reassignment |
| `carriers` | array[3] | Carriers for filter |
| `products` | array[62] | Products for filter |
| `searchExportVisible` | boolean | `false` — export button visible |
| `allowSearchAgency` | boolean | `false` — can search across agency |
| `parentLeads` | array | Parent leads (for dependent/family leads) |
| `lead_languages` | array[8] | Languages for filter |

---

## 30. User Settings

Component: `UserSettings/General/Index` — 33 total props (10 page-specific).

### Page-Specific Props

| Prop | Type | Description |
|------|------|-------------|
| `userInfo` | object{54} | Extended user object (54 fields) |
| `userSettings` | null/object | User-specific preferences |
| `userAgency` | object{29} | Agency info (29 fields) |
| `states` | array[52] | States with `{id, code, name, created_at, updated_at}` |
| `timezones` | array[7] | Timezone options (see section 32) |
| `mailTransportInfo` | object{1} | SMTP configuration: `{data}` |
| `agent_own_dnc_key` | null/string | Agent's own DNC API key |
| `dnc_key_shared_with_agent` | boolean | `false` — agency DNC key shared |
| `has_commission_statement` | boolean | `false` — has any commission statements |
| `stripeAccount` | object{1} | Stripe Connect account: `{data}` |

---

## 31. Starting Points

38 starting points define where leads are routed when entering the system. Three types identified by prefix:

### Starting Point Types

| Prefix | Type | Example |
|--------|------|---------|
| `X\|0` | Assign to Me | Direct assignment to source owner |
| `Y\|0` | Assign to Me With Text | Direct assignment + SMS notification |
| `B\|{id}` | Bucket | Route to a specific bucket |
| `R\|{id}` | Round Robin Group | Route to a round robin group |

### All Starting Points (this agency)

**Self-Assignment (2)**:
- `X|0` — Assign to Me
- `Y|0` — Assign to Me With Text Message Notification

**Buckets (24)**: Named buckets like `***Fresh Lead`, `***Compass Aged`, `***Compass Premier`, `CHC Spanish Leads`, etc.

**Round Robin Groups (12)**: Named groups like `Compass Funnel Leads`, `Benepath 2.0`, `AI Lead Group`, `Smart Leads`, `CHC A+`, etc.

---

## 32. Reference Enums

### Languages (8)

| ID | Name |
|----|------|
| 1 | English |
| 2 | Spanish |
| 3 | Polish |
| 4 | Russian |
| 5 | Ukrainian |
| 6 | Czech |
| 7 | Greek |
| 8 | Chinese |

### Timezones (7)

| Value | Label | IANA Name | UTC Offset |
|-------|-------|-----------|------------|
| 1 | Eastern | America/New_York | -5 |
| 2 | Central | America/Chicago | -6 |
| 3 | Mountain | America/Denver | -7 |
| 7 | Mountain (No DST) | America/Phoenix | -7 |
| 4 | Pacific | America/Los_Angeles | -8 |
| 6 | Alaska Standard Time | America/Anchorage | -9 |
| 5 | Hawaii | Pacific/Honolulu | -10 |

### US States

52 entries (50 states + DC + territories). Schema: `{id, code, name}`.

---

## 33. Feature Flags & UI Customization

### Feature Flags

Currently only one feature flag is active:

```json
{
  "agent-forms": true
}
```

### UI Customization (White-Label Theming)

| Field | Type | Description |
|-------|------|-------------|
| `color_1` | null/string | Primary brand color |
| `color_2` | null/string | Secondary brand color |
| `login_background_color` | null/string | Login page background |
| `topbar_background_color` | null/string | Top navigation background |
| `topbar_foreground_color` | null/string | Top navigation text/icon color |
| `logo` | null/string | Custom logo URL |
| `logo_without_text` | null/string | Custom icon-only logo URL |

All null when `use_ui_customizations` is `0` in agency settings.

---

## Additional Pages (Summary)

These pages were captured but use primarily shared props with minimal unique data:

| Page | Component | Unique Props |
|------|-----------|-------------|
| Email Campaigns | `Campaigns/Email/Index` | `campaigns` (paginated), `filtered_by` ({search, status}), `primaryMailerSelected` |
| Text Campaigns | `Campaigns/Text/Index` | Same structure as email campaigns |
| Email Blasts | `EmailBlasts/Index` | `blasts` (paginated) |
| Email Signature | `EmailSignature/Index` | `emailSignature` |
| Text Signature | `TextSignature/Index` | `textSignature` |
| Autoresponders | `Autoresponders/BySequence/Index` | `sequences`, `selectedSequence`, `autoresponderSequenceMessages` |
| Blacklist | `AgencyBlacklist/Index` | `blacklists` (paginated) |
| Bookmarks | `Bookmarks/Index` | `bookmarks` |
| Team Directory | `TeamDirectory/Index` | (shared props only) |
| Agency Training | `AgencyTraining/Index` | `trainings` |
| Time Off | `TimeOffs/Index` | `timeoffs` |
| Policy Imports | `Policies/Import` | (shared props only) |
| Lead Capture | `Leads/LeadCapture` | (shared props only) |
| API Keys | `ApiKeys/Index` | `apiKeys`, `newApiKey` |
| Custom Tags | `CustomLeadTags/Index` | `customTags` (paginated) |
| Agent Forms | `AgentForm/Index` | `agentForms` |
| Google Account | `UserSettings/GoogleAccount/Index` | `googleAccount`, `microsoftAccount`, `connectedCalendar`, `pendingCalendars` |
| Microsoft Account | `UserSettings/MicrosoftAccount/Index` | Same as Google Account page |
| Meetings | `Meetings/Index` | `meetings` (paginated), `showExpired` |
| Recruiting Sources | `LeadSources/Index` | Same as lead-sources-index but with `lead_category: recruitment` |

---

## XHR Inertia Partial Responses

Three partial (XHR) Inertia responses were captured, returning only changed props:

| URL | Component | Partial Props |
|-----|-----------|---------------|
| `/dashboard` | Dashboard | `unreadNotifications`, `invalidSmtpCredentialsNotification` |
| `/buckets` | AgencyBuckets/Index | `buckets` (paginated refresh) |
| `/commission-statements` | CommissionStatements/Agent/Index | (partial refresh) |

---

## Key Observations for woxom-crm

1. **Massive shared payload**: 23 props on every page, including full `currentAgency` with 56 settings fields. Consider lazy-loading agency settings.

2. **Full user objects everywhere**: Reports pass complete 52-field user objects for 1000+ agents. The sale-listing report sends 4,006 products. Balance management sends 4,986 full user records (9.8MB). This is a significant performance problem to avoid.

3. **Credit/balance system**: Agents have credit balances that are charged on lead purchase and policy submission. Supports auto-replenish, low-balance alerts, and negative balances.

4. **Dual pipeline architecture**: Commercial leads and recruiting leads share the same infrastructure but have separate statuses, sources, and categories (filtered by `lead_category`).

5. **Legacy migration fields**: Nearly every entity has `legacy_id` and `legacy_migration_at`, indicating a full migration from a previous system.

6. **HST integration**: Multiple HST-related fields throughout — `hst_agency`, `hst_authentication`, `hst_product_id`, `hst_available`, `failedHstAuthentication`, `forcedHstPasswordChange`.

7. **Stripe integration is agency-owned**: Each agency has its own Stripe keys in agency settings, enabling direct agency billing rather than platform-mediated.

8. **Distribution engine**: Lead distribution uses a three-tier system: Starting Points -> Buckets/Round Robin Groups -> Agents, with caps, overflow rules, stale-lead actions, and time limits.

9. **White-labeling**: Full theming support (7 UI customization fields) plus custom domain support via `agency_domain_agency`.

10. **Template system**: Email templates, text templates, and voicemail scripts all share a similar structure with `type` (agency/personal), `location` codes, merge tags, and `lead_category` filtering.
