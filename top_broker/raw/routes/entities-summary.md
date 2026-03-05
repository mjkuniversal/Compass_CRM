# TopBroker CRM — Entity & Route Summary

Parsed from 1,275 Laravel (Ziggy) routes. Grouped by functional category with entity details, CRUD coverage, sub-resources, relationships, and notable actions.

---

## 1. Core CRM

### Leads
- **Prefix**: `/leads`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Sub-resources**:
  - `/leads/{lead}/carriers` — carrier associations (GET list, POST store, PATCH update, DELETE destroy)
  - `/leads/{lead}/dependants` — dependant people (POST store, PUT update, DELETE destroy)
  - `/leads/{lead}/dependants/{dependant}/ssn` — SSN access (GET show, POST store)
  - `/leads/{lead}/doctors` — doctor associations (GET list, POST store, POST update, DELETE destroy)
  - `/leads/{lead}/medications` — medication list (GET list, POST store, POST update, DELETE destroy)
  - `/leads/{lead}/files` — file attachments (full CRUD + download)
  - `/leads/{lead}/notes` — notes (POST store)
  - `/leads/{lead}/tags` — tag associations (POST store, DELETE destroy)
  - `/leads/{lead}/types` — lead type assignments (full CRUD)
  - `/leads/{lead}/licenses` — license records (full CRUD + bulk-update)
  - `/leads/{lead}/login` — lead portal login credentials (POST store, POST update, DELETE destroy)
  - `/leads/{lead}/form-submissions` — form submission records (full CRUD)
  - `/leads/{lead}/new-policy` — new policy records (full CRUD + temp policy variant)
  - `/leads/{lead}/quotesheets` — quotesheets per lead (GET create, GET show, POST send, POST validate-email, POST update-name, DELETE destroy)
  - `/leads/{lead}/billing-info` — billing info (POST store, PUT update)
  - `/leads/{lead}/ssn` — SSN access (GET show, POST store)
- **Relationship hints**:
  - Leads have carriers, dependants, doctors, medications, files, notes, tags, types, licenses, login credentials, form submissions, policies, quotesheets, billing info
  - Leads connect to buckets via `/leads/{lead}/bucket/{bucket}/transfer`
  - Leads connect to users (agents) via `/leads/{lead}/user/{user}/transfer`, `/send-email`, `/send-text`
- **Notable actions**:
  - `compose-email`, `compose-sms`, `send-sms` — direct communication from lead
  - `dnc` — Do Not Contact flag
  - `change-source` — reassign lead source
  - `mark-phone-valid/{phone_id}` — phone validation
  - `refer-to-department` — department referral (PUT update variant)
  - `update-affiliate` — affiliate tracking
  - `hst-lock-check` — HST integration lock check
  - `active/{new_policy}`, `cancelled/{new_policy}` — policy status changes
  - `expiring-ignore/{transaction}` — ignore expiring transaction
  - `renew-policy/{transaction}` — policy renewal
  - `datetime` — lead datetime info
  - `bulk-update-licenses` — batch license update

### Agents
- **Prefix**: `/agents`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Sub-resources**:
  - `/agents/{agent}/carriers` — carrier assignments (GET list, GET show, POST store, DELETE destroy, PATCH update, POST assign-all)
  - `/agents/{agent}/carriers/{carrier}/data` — carrier-specific data (GET, PUT)
  - `/agents/{agent}/carriers/{carrier}/hierarchy` — carrier hierarchy (GET)
  - `/agents/{agent}/carriers/{carrier}/all-agents-with-access` — access list (GET)
  - `/agents/{agent}/carriers/{carrier}/transfer-downline` — downline transfer (PUT)
  - `/agents/{agent}/account-access` — account access permissions (full CRUD + revoke)
  - `/agents/{agent}/bucket-access` — bucket access permissions (full CRUD)
  - `/agents/{agent}/files` — file attachments (full CRUD + download)
  - `/agents/{agent}/licenses` — license records (full CRUD + bulk-update)
  - `/agents/{agent}/notes` — notes (full CRUD)
  - `/agents/{agent}/trainings` — training records (GET list, GET show, POST store, PATCH update)
  - `/agents/{agent}/hst-data-migration` — HST migration (POST migrate, GET status)
  - `/agents/{agent}/stripe-keys` — Stripe keys (POST)
- **Relationship hints**:
  - Agents belong to agencies (via carrier hierarchy, account access)
  - Agents have carriers, files, licenses, notes, trainings
  - Agents connect to HST (data migration)
  - Agents have Stripe payment keys
- **Notable actions**:
  - `toggle-active-status` — activate/deactivate agent
  - `toggle-has-commissions` — commission eligibility toggle (via `/commission-admin/agents/{user}/toggle-has-commissions`)
  - `provision-new-twilio-number` — Twilio number provisioning
  - `contract-info` — contract information (PUT update)
  - `authorize-autoreplenish`, `autoreplenish-settings` — auto-replenish credit settings
  - `low-balance-threshold`, `toggle-low-balance-notification` — balance alert settings
  - `bulk-update-licenses` — batch license update

### Agencies
- **Prefix**: `/agencies`
- **CRUD**: GET (list, show, create form, edit form), POST (store, update via POST), DELETE (destroy)
- **Sub-resources**:
  - `/agencies/{agency}/billing-info` — billing info (full CRUD)
  - `/agencies/{agency}/billing-profiles` — billing profiles (full CRUD)
  - `/agencies/{agency}/bookmarks` — bookmarks (full CRUD)
  - `/agencies/{agency}/dead-reasons` — dead lead reasons (full CRUD)
  - `/agencies/{agency}/department_skills` — department skills (full CRUD)
  - `/agencies/{agency}/lead-tags` — lead tag definitions (full CRUD)
  - `/agencies/{agency}/working-hours` — working hours config (GET, POST)
  - `/agencies/{agency}/twilio-settings` — Twilio config (GET)
  - `/agencies/{agency}/twilio-onboard` — Twilio onboarding (POST)
  - `/agencies/{agency}/twilio-authorized-representative` — Twilio rep (POST)
  - `/agencies/{agency}/twilio-business-address` — Twilio address (POST)
  - `/agencies/{agency}/twilio-business-information` — Twilio info (POST)
  - `/agencies/{agency}/carriers/{carrier}/general_details` — carrier details (PUT)
  - `/agencies/{agency}/commissions-calendar-pdf` — commissions calendar PDF (POST create, DELETE destroy)
  - `/agencies/{agency}/commissions-toggle` — commissions toggle (POST)
- **Relationship hints**:
  - Agencies have billing info/profiles, bookmarks, dead reasons, department skills, lead tags, working hours
  - Agencies connect to Twilio, carriers, commissions
- **Notable actions**:
  - `email-and-text-settings` — communication settings (PUT)
  - `notifications` — notification config (POST store, POST delete-email, POST validate-email)
  - `sidebar-widgets` — UI sidebar config (POST)
  - `stripe-keys` — Stripe payment config (POST)

### Buckets (Lead Pools)
- **Prefix**: `/buckets`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Sub-resources**:
  - `/buckets/{bucket}/leads` — leads in bucket (GET list, POST add)
  - `/buckets/{bucket}/import-leads` — lead import (GET form, POST import)
  - `/buckets/{id}/access` — access config (GET)
  - `/buckets/{id}/access/daily-limit-store` — daily limit config (POST)
- **Relationship hints**:
  - Buckets contain leads
  - Buckets have access controls and daily limits
  - Buckets connect to agents via agent bucket-access
- **Notable actions**:
  - `can-be-deleted` — deletion check (GET)
  - `contacted-leads`, `dead-leads`, `disconnected-leads`, `sold-leads` — lead status views
  - `new-Agents-daily-limit` — new agent daily limit (PUT)

### Personal Buckets
- **Prefix**: `/personal-buckets`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Sub-resources**:
  - `/personal-buckets/{id}/access` — access config (GET)
  - `/personal-buckets/{bucket}/sold-leads` — sold leads (GET)

### MGAs (Managing General Agents)
- **Prefix**: `/mgas`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)

---

## 2. Communication

### Text Inbox
- **Prefix**: `/text-inbox`
- **CRUD**: GET (list)
- **Notable actions**:
  - `{textInbox}/messages/send` — send message (POST)
  - `{textInbox}/archive` — archive conversation (POST)
  - `{textInbox}/activate` — activate conversation (POST)
  - `{textInbox}/grabLead/{lead}` — grab lead from inbox (POST)
  - `{textInbox}/sendToRR/{lead}` — send lead to round robin (POST)
  - `{textInbox}/transferToAgent/{lead}` — transfer to agent (POST)
  - `{textInbox}/transferToBucket/{lead}` — transfer to bucket (POST)
  - `discard-lead/{lead}` — discard lead (POST)
  - `activate-multiple-inboxes` — bulk activate (POST)
  - `archive-multiple-inboxes` — bulk archive (POST)

### Text Signature
- **Prefix**: `/text-signature`
- **Operations**: GET (show), POST (store/update)

### Email Signature
- **Prefix**: `/email-signature`
- **Operations**: GET (show), POST (store/update)

### Email Campaigns
- **Prefix**: `/email-campaigns`
- **CRUD**: GET (list, create form), DELETE (destroy)
- **Sub-resources**:
  - `{campaign}/criteria` — targeting criteria (GET, POST)
  - `{campaign}/details` — campaign details (GET, POST)
  - `{campaign}/messages` — messages (GET list, GET show, GET create, POST store, POST update, DELETE destroy)
  - `{campaign}/sending-times` — send schedule (GET, POST)
- **Relationship hints**: Campaigns contain messages with criteria and sending schedules

### Text Campaigns
- **Prefix**: `/text-campaigns`
- **CRUD**: GET (list, create form), DELETE (destroy)
- **Sub-resources**:
  - `{campaign}/criteria` — targeting criteria (GET, POST)
  - `{campaign}/details` — campaign details (GET, POST)
  - `{campaign}/messages` — messages (GET list, GET show, GET create, POST store, POST update, DELETE destroy)
  - `{campaign}/sending-times` — send schedule (GET, POST)

### Campaigns (Shared — Email + Text)
- **Prefix**: `/campaigns/{campaign}`
- **Notable actions**:
  - `lead-count` — get lead count for campaign (POST)
  - `publish` — publish campaign (POST)
  - `terminate` — terminate campaign (POST)
  - `unterminate` — reactivate campaign (POST)
  - `report` — campaign report (GET)
  - `report/export` — export report (GET)

### Lead Campaigns
- **Prefix**: `/lead-campaigns/{lead}`
- **Notable actions**:
  - `disable/{campaign}` — disable for lead (POST)
  - `enable/{campaign}` — enable for lead (POST)
  - `global-disable` — disable all campaigns (POST)
  - `global-enable` — enable all campaigns (POST)
  - `re-add/{campaign}` — re-add lead to campaign (POST)

### Email Blasts
- **Prefix**: `/email-blasts`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Notable actions**:
  - `{id}/approve` — approve blast (POST)
  - `{id}/decline` — decline blast (POST)
- **Related**: `/pending-email-blasts` — GET pending approval list

### Email Templates
- **Prefix**: `/email-templates`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Notable actions**:
  - `{emailTemplate}/preview/{lead}` — preview template for lead (GET)
- **Related**: `/email-template-preview/{emailTemplate}` — standalone preview (GET)

### Text Templates
- **Prefix**: `/text-templates`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Notable actions**:
  - `{textTemplate}/preview/{lead}` — preview for lead (GET)
- **Related**: `/text-template-preview/{textTemplate}` — standalone preview (GET)

### Quotesheet Email Templates
- **Prefix**: `/quotesheet-email-templates`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)

### Email Messages
- **Prefix**: `/email-messages`
- **Operations**: `{emailMessage}/preview` — preview (GET)

### Voicemail Scripts
- **Prefix**: `/voicemail-scripts`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Related**: `/voicemail-scripts-preview/{voicemailScript}` — preview (GET)

### Autoresponders (Sequence-based)
- **Prefix**: `/autoresponders_sequence`
- **CRUD**: GET (list/show with optional param), POST (store), PUT (update), DELETE (destroy)
- **Sub-resources**:
  - `{sequence}/messages` — messages (POST store, PUT update, PUT toggleActiveStatus, DELETE destroy)

### Autoresponders (Status-based)
- **Prefix**: `/autoresponders_status/{lead_status}`
- **Operations**: GET (show), POST (store)
- **Sub-resources**:
  - `{lead_status}/messages/{message}` — messages (PUT update, PUT toggleActiveStatus, DELETE destroy)

---

## 3. Automation

### Automations
- **Prefix**: `/automations`
- **CRUD**: GET (list, show, create form), DELETE (destroy)
- **Sub-resources**:
  - `{automation}/conditions` — conditions (POST store, POST from-template, DELETE destroy)
  - `{automation}/conditions/{condition}/comparison` — comparison update (PATCH)
  - `{automation}/conditions/{condition}/trigger` — trigger update (PATCH)
  - `{automation}/tasks` — tasks (POST store, POST from-template, PATCH update, DELETE destroy)
  - `{automation}/tasks/{task}/from-template` — apply template to task (PUT)
- **Notable actions**:
  - `from-template` — create automation from template (POST)
  - `change-automatable-entity` — change target entity (PATCH)
  - `toggle-add-new-agents` — auto-add new agents (PATCH)
  - `toggle-is-agency` — agency-level toggle (PATCH)
  - `update` — general update (PATCH)
  - `update-hours` — operating hours (PATCH)
  - `update-name` — rename (PATCH)
  - `syncUsers` — sync user assignments (POST)

### Automation Templates
- **Prefix**: `/automation-templates`
- **Operations**: GET (list)

### User Automations
- **Prefix**: `/user-automations`
- **CRUD**: GET (list, show, create form)
- **Notable actions**:
  - `{automation}/duplicate` — duplicate automation (POST)
  - `{automation}/toggleActive` — toggle active state (PATCH)

### Action Schedules
- **Prefix**: `/action-schedules`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Notable actions**:
  - `{actionSchedule}/copy` — duplicate schedule (POST)
  - `{actionSchedule}/toggle-active` — toggle active state (POST)

### Action Schedule Maps
- **Prefix**: `/action-schedule-maps`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)

### Actions
- **Prefix**: `/actions`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Notable actions**:
  - `{action}/toggle-active` — toggle active state (POST)

### Lead Actions / Scheduling
- **Prefix**: `/lead-action`
- **Operations**:
  - `{lead}/next` — get/perform next action (GET, POST)
  - `{lead}/next-by-status/{leadStatus}` — next action by status (GET)
  - `{lead}/next-with-complete-multiple` — next with multi-complete (POST)
  - `{lead}/shared-with/{user}/next` — next for shared lead (POST)
  - `{lead}/shared-with/{user}/next-with-complete-multiple` — multi-complete for shared (POST)
  - `{leadSchedule}/reschedule` — reschedule (GET form, POST submit)
  - `{leadSchedule}/duplicate-lookup` — duplicate check (GET)
  - `check-working-hours/{actionScheduleMap?}` — working hours check (GET)
- **Schedule management**:
  - `schedule/delete/{leadSchedule}` — delete scheduled action (DELETE)
  - `schedule/flag/{leadSchedule}` — flag (PUT)
  - `schedule/unflag/{leadSchedule}` — unflag (PUT)
- **History management**:
  - `history/delete/{leadActionHistory}` — delete history (DELETE)
  - `history/flag/{leadActionHistory}` — flag (PUT)
  - `history/pin/{leadActionHistory}` — pin (PUT)
  - `history/unflag/{leadActionHistory}` — unflag (PUT)
  - `history/unpin/{leadActionHistory}` — unpin (PUT)

### Lead Schedule
- **Prefix**: `/lead-schedule`
- **Operations**: `lead/{lead}` — schedule for lead (GET), `lead/{user}` — schedule by user (GET)

---

## 4. Sales

### Quotesheets
- **Prefix**: `/quotesheets/{quotesheet}`
- **Sub-resources**:
  - `plans` — plans in quotesheet (POST store, POST from-template, DELETE destroy)
  - `plans/{plan}/move-down`, `plans/{plan}/move-up` — reorder (POST)
  - `plans/{plan}/products` — products in plan (POST store, DELETE destroy, PATCH update)
- **Related routes**:
  - `/leads/{lead}/quotesheets` — quotesheets per lead (see Leads section)
  - `/go/qsx/{uuid}` — public quotesheet view (GET show, GET thank-you, GET selected, POST start)

### Quotesheet Plans
- **Prefix**: `/quotesheet-plans`
- **Operations**: `{plan}/copy` — duplicate plan (POST)

### Quotesheet Plan Templates
- **Prefix**: `/quotesheet-plan-templates`
- **CRUD**: GET (list, show, create form), POST (store), DELETE (destroy)
- **Sub-resources**:
  - `{template}/products` — products (POST store, POST update, DELETE destroy)
  - `{template}/products/{product}/move-up`, `move-down` — reorder (POST)
  - `{template}/products/reorder` — bulk reorder (PUT)
- **Notable actions**:
  - `update-name` — rename template (POST)
  - `update-is-agency` — toggle agency template (POST)

### Quotesheet Logo
- **Prefix**: `/quotesheet-logo`
- **Operations**: GET (show), POST (upload), DELETE (destroy)

### Plans
- **Prefix**: `/plans/{plan}`
- **Operations**:
  - `answers` — plan answers (POST)
  - `products/{product}/move-down`, `move-up` — reorder products (POST)

### Manage Carriers (Super Admin)
- **Prefix**: `/manage-carriers`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Sub-resources**:
  - `{manage_carrier}/brochures` — brochures (full CRUD + POST update variant)
  - `{manage_carrier}/products` — products (full CRUD)
  - `{manage_carrier}/qs-products` — quotesheet products (full CRUD + copy, archive-toggle)
  - `{manage_carrier}/qs-products/{qs_product}/qa-bullets` — QA bullets (full CRUD + reorder)
  - `{manage_carrier}/qs-products/{qs_product}/text-bullets` — text bullets (full CRUD + reorder)

### Agency Carriers
- **Prefix**: `/agency_carriers`
- **CRUD**: GET (list, show, create form, edit form), POST (store), DELETE (destroy)
- **Sub-resources**:
  - `{agencyCarrier}/agents` — agent assignments (PUT)
  - `{agencyCarrier}/brochures` — brochures (POST store, POST update, DELETE destroy)
  - `{agencyCarrier}/products` — products (POST store, PUT update)
  - `{agencyCarrier}/qs_products` — quotesheet products (POST store, PUT update, PUT archive)
  - `{agencyCarrier}/states` — state availability (PUT)
  - `{agencyCarrier}/training_resources` — training resources (POST store, POST update, DELETE destroy)
  - `{carrier}/remove-access` — remove access (POST)
- **Related**:
  - `/agency-carrier-products/{product}/toggle-active` — toggle product (POST)
  - `/agency-carrier-products/{product}/update-agency-bucks` — agency bucks (POST)
  - `/agency-carrier-products/{product}/update-multiplier` — multiplier (POST)
  - `/agency_carrier_qs_products/{qsProduct}/qa_bullets` — QA bullets (GET list, POST store, PUT update, PUT reorder, DELETE destroy)
  - `/agency_carrier_qs_products/{qsProduct}/text_bullets` — text bullets (GET list, POST store, PUT update, PUT reorder, DELETE destroy)

### Agency QSP Categories
- **Prefix**: `/agency-qsp-categories`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Notable actions**: `{category}/archive` — archive category (PUT)

### Global QSP Categories
- **Prefix**: `/global-qsp-categories`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Notable actions**: `{category}/archive` — archive category (PUT)

### Product Categories (Manage)
- **Prefix**: `/manage/product-categories`
- **Operations**: GET (list), PUT (update), POST `updateRankByAllCategories` — bulk reorder

### Master Carrier Products
- **Prefix**: `/master-carrier-products`
- **Operations**: `{product}/toggle-active` — toggle product active (POST)

### Lead Sources
- **Prefix**: `/lead-sources`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Notable actions**:
  - `{leadSource}/send-doc-instructions` — send documentation (POST)
  - `{source}/toggle-active` — toggle active (POST)

### Round Robin Groups
- **Prefix**: `/rr_groups`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Sub-resources**:
  - `{rr_group}/agents` — agent members (POST add, DELETE delete, PUT entries)
  - `{rr_group}/members` — member details (GET, PUT update)
  - `{rr_group}/members/details` — detailed member info (PUT)
  - `{rr_group}/distribution-log` — distribution history (GET)
- **Related**:
  - `/rr_group/{rr_group}/lead-program` — lead program config (PUT update, PUT is_active toggle)
  - `/rr_group-members/{member}/override-states` — state overrides (PUT)
  - `/rr_group-members/{member}/states-used-option` — states used option (PUT)

### Sale Sharing
- **Prefix**: `/sale-sharing`
- **Operations**: POST (store), GET `users`, GET `mount`
- **Sub-resources**:
  - `{saleSharing}/carriers` — carrier config (GET, PUT)
  - `{saleSharing}/destroy` — delete (DELETE)
  - `{saleSharing}/toggle-active` — toggle (POST)

### Transactions
- **Prefix**: `/transaction/{transaction}`
- **Operations**:
  - `beneficiaries` — beneficiary list (GET)
  - `hst-post-sale` — HST post-sale sync (POST)
  - `hst-sync` — HST sync (POST)

### Request Carriers
- **Prefix**: `/request-carriers`
- **Operations**: POST (store), POST `cancel`

### Leaderboard
- **Prefix**: `/leaderboard`
- **Operations**: GET (show)

---

## 5. Commission & Finance

### Admin Commission Statements
- **Prefix**: `/admin/commission-statements`
- **CRUD**: GET (list, create form), POST (store), DELETE (destroy)
- **Sub-resources**:
  - `{commissionStatement}/update` — update view/action (GET form, POST submit)
  - `{commissionStatement}/exportCsv` — CSV export (GET)
  - `{commissionStatement}/summary` — summary view (GET)
  - `{commissionStatement}/overrides-detail` — overrides detail (GET)
  - `{commissionStatement}/personal-production-detail` — personal production (GET)
  - `{commissionStatement}/publish` — publish (POST)
  - `{commissionStatement}/schedule-publish` — schedule publish (POST)
  - `{commissionStatement}/remove-scheduled-publish` — unschedule (POST)
  - `{commissionStatement}/progress` — processing progress (GET)
  - `{commissionStatement}/entries` — line items (GET list, GET show, PUT update, DELETE destroy)
  - `{commissionStatement}/duplicate-rows` — duplicate management (GET list, GET show, POST resolve, DELETE destroy)
  - `{commissionStatement}/failed-rows` — failed row management (GET list, GET show, POST resolve, POST store-user, DELETE destroy)
  - `{user}/files` — user files (POST)
  - `{user}/carrier-agent-id` — carrier agent ID (POST store, POST delete)
- **Agent management**:
  - `agents` — agent list (GET)
  - `agents/excluded-pa-ids` — excluded PA IDs (GET, POST store, POST delete)
  - `agents/upload-wa-ids` — upload WA IDs (GET form, POST upload)
  - `agents/wa-ids` — WA IDs (POST store, POST delete)
  - `update-visible-agencies` — visible agencies (POST)
  - `carriers` — carrier list (GET)

### Agency Admin Commission Statements
- **Prefix**: `/agency-admin/commission-statements`
- **Operations**: GET (list)
- **Sub-resources**:
  - `{commissionStatement}/exportCsv` — CSV export (GET)
  - `{commissionStatement}/summary` — summary (GET)
  - `{commissionStatement}/overrides-detail` — overrides (GET)
  - `{commissionStatement}/personal-production-detail` — personal production (GET)
  - `search` — search (GET)
  - `search-export` — search export (GET)

### Agent Commission Statements
- **Prefix**: `/commission-statements`
- **Operations**: GET (list)
- **Sub-resources**:
  - `{commissionStatement}/exportCsv` — CSV export (GET)
  - `{commissionStatement}/summary` — summary (GET)
  - `{commissionStatement}/overrides-detail` — overrides (GET)
  - `{commissionStatement}/personal-production-detail` — personal production (GET)
  - `search` — search (GET)
  - `search-export` — search export (GET)
  - `files` — files (GET list, DELETE destroy)
  - `client-payout-history/{entry}` — payout history (GET)

### Commissions Authorization
- **Prefix**: `/commissions`
- **Operations**: `authorize` — authorize commissions (POST)

### Balance Management
- **Prefix**: `/balance-management`
- **Operations**: GET (show)

### Credits
- **Prefix**: `/users/{user}/credits`
- **Operations**: GET (list), GET `export`
- **Related**:
  - `/users/{user}/credit-adjustment` — credit adjustment (GET, POST)
  - `/users/{user}/purchase-credits` — purchase credits (POST)
  - `/users/{user}/transfer` — credit transfer (POST)

### Cards (Payment Methods)
- **Prefix**: `/users/{user}/cards`
- **Operations**: POST (store)
- **Related**:
  - `/users/{user}/cards-remove` — remove card (POST)
  - `/users/{user}/cards-set-primary` — set primary card (POST)
  - `/users/{user}/bucket-sharing/{ownerUser}/cards` — bucket sharing cards (POST store)
  - `/users/{user}/bucket-sharing/{ownerUser}/cards/remove` — remove (POST)
  - `/users/{user}/bucket-sharing/{ownerUser}/cards/set-primary` — set primary (POST)
  - `/users/{user}/bucket-sharing/{ownerUser}/balance` — balance (GET)
  - `/users/{user}/bucket-sharing/{ownerUser}/balance/purchase` — purchase (POST)

---

## 6. Recruiting

### Recruiting Leads
- **Prefix**: `/recruiting-leads`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Related**:
  - `/recruiting-leads-stats/stats` — recruiting stats (GET)
  - `/recruiting-leads-stats/pending-contracting-list` — pending list (GET)

### Recruiting Sources
- **Prefix**: `/recruiting-sources`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)

### Recruiting Locations
- **Prefix**: `/recruiting-locations`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)

### Recruiting Tasks
- **Prefix**: `/recruiting-tasks`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)

### Recruiting Action Schedules
- **Prefix**: `/recruiting-action-schedules`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)

### Recruiting Email Templates
- **Prefix**: `/recruiting-email-templates`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)

### Recruiting Text Templates
- **Prefix**: `/recruiting-text-templates`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)

### Recruiting Voicemail Scripts
- **Prefix**: `/recruiting-voicemail-scripts`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)

### Recruiting Custom Tags
- **Prefix**: `/recruiting-custom-tag`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Notable actions**: `{recruitingCustomTag}/view` — tag view (GET)

---

## 7. Operations

### Calendar
- **Prefix**: `/calendar`
- **Operations**: `{user?}` — calendar view with optional user filter (GET)
- **Related**:
  - `/calendar-events` — events (full CRUD)
  - `/calendar-sharing` — sharing config (GET list, GET all-shared, POST update-agent, POST bulk-update)
  - `/mobile-calendar/{apiKey}` — mobile calendar (GET)
  - `/mobile-calendar-events/{apiKey}` — mobile events (GET)
  - `/mobile-calendar-info` — mobile info (GET)
  - `/send-mobile-calendar-link` — send link (POST)
  - `/personal-appointments/{calendarEvent}/markComplete` — mark complete (POST)

### Meetings
- **Prefix**: `/meetings`
- **CRUD**: GET (list, show, create form), POST (store), PUT (update), DELETE (destroy)
- **Related**:
  - `/expired-meetings` — expired meeting list (GET)
  - `/confirm-appointment/{uuid}` — public appointment confirmation (GET)
  - `/appt-confirmed/{uuid}` — confirmation landing page (GET)

### Appointment Reminders
- **Prefix**: `/appt-reminder`
- **Operations**: GET (show), POST (store/update)

### Tasks
- **Prefix**: `/tasks`
- **CRUD**: GET (list), POST (store), PUT (update), DELETE (destroy)

### Agency Tasks
- **Prefix**: `/agency-tasks`
- **CRUD**: GET (list), POST (store), PUT (update), DELETE (destroy)

### Todo List
- **Prefix**: `/todo-list`
- **Operations**: POST (store), PUT `{todoList}/update` (update)

### Time Off
- **Prefix**: `/timeoff`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)

### Working Hours
- **Prefix**: `/my-working-hours`
- **Operations**: GET (show), POST (store/update)
- **Related**: `/agencies/{agency}/working-hours` — agency working hours (GET, POST)
- **Related**: `/lead-hours` — lead hours config (GET, POST)

### Bookmarks
- **Prefix**: `/bookmarks`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Also**: `/agencies/{agency}/bookmarks` — agency bookmarks (full CRUD)

### Team Directory
- **Prefix**: `/team-directory`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Notable actions**: `has-accesses` — check access permissions (GET)

### Agency Training
- **Prefix**: `/agency-training`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Sub-resources**:
  - `{agency_training}/agents` — agent assignments (POST)
  - `{agency_training}/resources` — training resources (POST store, PUT update, DELETE destroy)

### System Training Admin
- **Prefix**: `/system-training-admin`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Sub-resources**:
  - `{systemTrainingAdmin}/resources` — resources (POST store, PUT update, DELETE destroy)
- **Related**: `/system-training/{feature}` — user-facing training (GET show, POST agent-notes)

### Dashboard
- **Prefix**: `/dashboard`
- **Operations**: GET (show)
- **Sub-resources**:
  - `activity-stats` — activity statistics (GET)
  - `call-activity-stats` — call statistics (GET)
  - `export/birthdays` — birthday export (GET)
  - `user-tasks/{user}` — user task list (GET)
  - `widgets/hide` — hide widget (POST)
  - `widgets/update-order` — reorder widgets (POST)

### Lead Widgets Order
- **Prefix**: `/lead-widgets-order`
- **Operations**: POST (store/update)

### Global Notifications
- **Prefix**: `/global-notifies`
- **Operations**: GET (list), PUT `{globalNotify}/expire` (expire notification)

### Notifications
- **Prefix**: `/notifications`
- **Operations**: `{id}/mark-as-read` (POST), `mark-as-read-invalid-smtp-auth` (POST)

### Support
- **Prefix**: `/support`
- **Operations**: GET (show), POST (submit)

---

## 8. Import/Export

### Book of Business Upload (BOB)
- **Prefix**: `/bob-upload`
- **Operations**: GET (list/form), POST `upload`
- **Sub-resources**:
  - `{session}/complete-stats` — completion stats (GET)
  - `{session}/complete-stats/export` — export stats (GET)
  - `{session}/duplicates` — duplicate rows (GET list, POST resolve)
  - `{session}/duplicates/{lead_row}/list` — duplicate detail (GET)
  - `{session}/missing-data` — missing data (GET, POST)
  - `{session}/unmatched-transactions` — unmatched transactions (GET, POST)
  - `session-status/{session}` — session status (GET)
- **Related**:
  - `assign-carrier` — carrier assignment (POST)
  - `download-template` — download template (GET)
  - `get-agency-carriers` — carrier list (GET)
  - `agency-data` — agency data (GET)

### Policy Imports
- **Prefix**: `/policy-imports`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Notable actions**: `import` — trigger import (POST)

### Bucket Imports
- **Prefix**: `/bucket-imports`
- **Sub-resources**:
  - `{bucketImport}/duplicate-rows` — duplicate rows (GET list, DELETE destroy)
  - `{bucketImport}/merge-row/{bucketImportRow}` — merge row (GET preview, POST merge)
  - `{bucketImport}/failed-rows` — failed rows (GET list, GET show, POST resolve, DELETE destroy)
  - `{bucketImport}/progress` — import progress (GET)

### CSV Export
- **Prefix**: `/leads-export-csv`
- **Operations**: GET (export leads to CSV)

### Lead Capture
- **Prefix**: `/lead-capture`
- **Operations**: GET (show), POST (store)

---

## 9. Admin & Config

### API Keys
- **Prefix**: `/api-keys`
- **CRUD**: GET (list, create form), POST (store), PUT/PATCH (update), DELETE (destroy)

### Billing — Agency Subscription
- **Prefix**: `/billing/agency-subscription-billing-info`
- **Operations**: GET (show), PUT `billing-option` (update option)
- **Related**: `/billing/agency-subscription-invoices` — invoices (GET list, GET download)

### Billing — Agent Subscription
- **Prefix**: `/billing/agent-subscription-billing-info`
- **Operations**: GET (show)
- **Related**:
  - `/billing/agent-subscription-invoices` — invoices (GET list, POST pay)
  - `/billing/agent-billing/marketplace-cards` — marketplace cards (GET)

### Billing — Global Subscription
- **Prefix**: `/billing/global-subscription-billing-info`
- **Operations**: GET `setup-intent`, POST (store)

### Billing — Subscription Invoices
- **Prefix**: `/billing/subscription-invoices`
- **Operations**:
  - `{invoiceNumber}/receipt` — receipt view (GET)
  - `{invoiceNumber}/receipt-pdf` — receipt PDF (GET)
  - `{invoiceNumber}/receipt-old` — legacy receipt (GET)

### Billing — Super Admin Subscription Agencies
- **Prefix**: `/billing/sa-subscription-agencies`
- **Operations**: GET (list)
- **Sub-resources**:
  - `{agency}` — agency detail (GET)
  - `{agency}/agents` — agent list (GET)
  - `{agency}/agents/{user}/suspend` — suspend agent (POST)
  - `{agency}/agents/{user}/unsuspend` — unsuspend agent (POST)
  - `{agency}/agents/{user}/accounts-paying-for` — paying accounts (GET)
  - `{agency}/agent-fee-overrides` — fee overrides (GET list, POST store, PUT update, DELETE destroy)
  - `{agency}/leader-pays` — leader payments (GET list, POST store, DELETE destroy)
  - `{agency}/billing-option` — billing option (POST)
  - `{agency}/billing-start-date` — billing start date (POST)
  - `{agency}/free-look-period` — free look period (POST)
  - `{agency}/agent-fee` — agent fee (POST)
- **Related**: `/billing/sa-subscription-invoices` — SA invoices (GET list, POST `{invoice}/void`)

### Stripe
- **Prefix**: `/stripe`
- **Operations**: `payment/{id}` — payment details (GET), `webhook` — webhook handler (POST)

### User Settings
- **Prefix**: `/user-settings`
- **Operations**:
  - `general` — general settings (GET)
  - `change-password` — password change (POST)
  - `my-info` — personal info (PUT)
  - `hst-credentials` — HST credentials (PUT update, DELETE destroy, PUT ignore-warning)
  - `update-smtp-configuration` — SMTP config (PUT)
  - `update-alert-settings` — alert preferences (PUT)
  - `update-primary-mail-transport` — mail transport (PUT)
  - `upload-profile-picture` — profile picture (POST)

### Impersonation
- **Prefix**: `/impersonate`
- **Operations**: `user/{user}` — impersonate user (GET), `end` — end impersonation (GET)
- **Related**: `/login-as/{other_user}` — login as user (GET), `/login-as/leave` — leave (GET)

### DNC (Do Not Contact) Keys
- **Prefix**: `/agency/dnc-keys`
- **Operations**: GET (list), POST (store), PUT (update), DELETE (destroy)
- **Notable actions**:
  - `{key}/share` — share DNC key (POST)
  - `verify-password` — verify password (POST)

### Blacklist
- **Prefix**: `/blacklist`
- **Operations**: GET (list), POST (store), DELETE (destroy)
- **Related**: `/super-admin/blacklist` — super admin blacklist (GET, POST)
- **Related**: `/super-admin-blacklist/{blacklist}` — delete (DELETE)

### Super Admin Tools
- **Prefix**: `/super-admin-tools`
- **Sub-resources**:
  - `email-template-test` — test email templates (GET main, GET templates, GET users, GET check-schedule, POST send)

### EULA
- **Prefix**: `/eula`
- **Operations**: GET (show)
- **Related**: `/agree-to-eula` — accept EULA (POST)

### Authentication
- **Prefixes**: `/login`, `/logout`, `/forgot-password`, `/reset-password`, `/verify-email`, `/verify2fa`, `/confirm-password`
- **Operations**: Standard Laravel auth flows (GET forms, POST submissions)
- **Related**: `/verify-credentials` — credential verification (POST), `/verify2fa-resend` — 2FA resend (POST)

### Docs
- **Prefix**: `/docs`
- **Operations**: GET (index), GET `bucket-lead-upload`, GET `feed-api`, GET `incoming-sales`

### Email Deliverability FAQs
- **Prefix**: `/pdf/email-deliverability-faqs`
- **Operations**: GET (show)

### Filtered States
- **Prefix**: `/filtered-states/{user}`
- **Operations**: PUT (update)

### Files Authorization
- **Prefix**: `/files`
- **Operations**: `authorize` (POST), `authorize-send` (POST)

### Agency Logo
- **Prefix**: `/agency-logo`
- **Operations**: GET (show), POST (upload)

### Super Search
- **Prefix**: `/super-search`
- **Operations**: GET (search)

### Internal
- **Prefix**: `/internal`
- **Operations**: `keyword-serach` (POST) — internal keyword search (note: typo in original)

### Setup Intent
- **Prefix**: `/users/{user}/setup-intent`
- **Operations**: GET (show)
- **Related**: `/users/{user}/setup-intent-bucket-sharing/{ownerUser}` — bucket sharing setup intent (GET)

### Horizon (Queue Dashboard)
- **Prefix**: `/horizon`
- **Operations**: Full Laravel Horizon dashboard — jobs (pending/completed/failed/silenced), batches, metrics, monitoring, stats, workload
- **Note**: Internal queue management, not business-facing

### Debugbar
- **Prefix**: `/_debugbar`
- **Operations**: Debug toolbar — assets, cache, clockwork, queries (development only)

### Ignition
- **Prefix**: `/_ignition`
- **Operations**: Error handler — health-check, execute-solution, update-config (development only)

---

## 10. Lead Management

### Lead Sharing (Agent)
- **Prefix**: `/agent-lead-share/{lead}`
- **Operations**: POST (share), `agents-search` (GET), DELETE `agents/{agent}` (unshare)

### Mass Transfer
- **Prefix**: `/mass-transfer`
- **Operations**: GET (form), POST `count-leads`, POST `get-leads`, POST `process`

### Agent Transfer
- **Prefix**: `/agent-transfer/{user}`
- **Operations**: GET `agencies` — list agencies (GET), GET `transfer` — transfer form (GET), POST `transfer` — execute (POST)

### Lead Forms
- **Prefix**: `/lead-forms`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Notable actions**: `{lead_form}/set-active` — set active (PUT)

### Agent Forms
- **Prefix**: `/agent-form`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Sub-resources**:
  - `{agentForm}/fields` — form fields (PUT)
  - `{agentForm}/lead-list` — lead list (GET)
  - `{agentForm}/qr/generate` — QR code (POST generate, GET to-email, GET image-download, GET pdf-download)
- **Notable actions**:
  - `{agentForm}/archive` — archive form (POST)
  - `{agentForm}/unarchive` — unarchive form (POST)
  - `{agentForm}/duplicate` — duplicate form (POST)
  - `update-logo` — update logo (POST)

### Agent Form Templates
- **Prefix**: `/agent-form-templates`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Sub-resources**: `{agentFormTemplate}/fields` — form fields (PUT)

### Agent Form Submissions
- **Prefix**: `/agent-form-submissions`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)

### Lead Segments
- **Prefix**: `/lead-segments`
- **CRUD**: GET (list, show, create form, edit form), POST (store, list), PUT/PATCH (update), DELETE (destroy)
- **Notable actions**: `showLeads` — show leads in segment (GET), `list` — filtered list (GET, POST)

### Custom Tags
- **Prefix**: `/custom-tags`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)
- **Notable actions**: `{custom_tag}/view` — tag view (GET)
- **Related**: `/custom-tags-search` — search tags (GET)

### Lead Custom Tags
- **Prefix**: `/lead-custom-tags/{lead_custom_tag}/lead`
- **CRUD**: GET (list, show, create form, edit form), POST (store), PUT/PATCH (update), DELETE (destroy)

### Lead Redirect Configs
- **Prefix**: `/lead-redirect-configs`
- **CRUD**: GET (list, show, create form), POST (store), POST `{config}/update` (update), DELETE (destroy)

### Consent Management
- **Prefix**: `/api/consents-*`
- **Operations**:
  - `consents-create` — create consent (POST)
  - `consents-part-2-create` — part 2 consent (POST)
  - `consents-fetch/{lead}` — fetch consents (POST)
  - `consents-resend` — resend consent (POST)
  - `consents-delete` — delete consent (DELETE)
  - `spanish-consents-create` — Spanish consent (POST)
  - `spanish-consents-part-2-create` — Spanish part 2 (POST)
  - `soa-consents-create` — SOA consent (POST)
  - `soa-consents-fetch/{lead}` — fetch SOA (POST)
  - `soa-consents-resend` — resend SOA (POST)
  - `spanish-soa-consents-create` — Spanish SOA (POST)

### Dependant Form (Password Check)
- **Prefix**: `/dependant-form-password-checked-recently/{dependant}`
- **Operations**: GET (check)

### Medication Password Check
- **Prefix**: `/medication-password-checked-recently/{lead}`
- **Operations**: GET (check)

### Public Form
- **Prefix**: `/form/{uuid}`
- **Operations**: GET (show), POST (submit)

### BDC (Business Development Center)
- **Prefix**: `/bdc`
- **Operations**:
  - `agent-information/{agent}` — agent info (GET)
  - `available-agents/{lead}` — available agents for lead (GET)
  - `inform-datetime` — date/time info (GET)

---

## 11. Integrations

### Twilio
- **Prefix**: `/twilio`, `/twilio-settings`, `/agent-twilio-account`
- **Agent Twilio**:
  - GET (show), POST (store), DELETE (destroy)
  - `provision-new-number` — provision new number (POST)
  - `update-phone-number` — update number (POST)
- **Agency Twilio**:
  - `/twilio-settings/{agency}/add-messaging-service` — add messaging service (POST)
  - `/twilio-settings/{agency}/sids` — SIDs (POST store, POST update, DELETE destroy)
  - `/agencies/{agency}/twilio-settings` — settings view (GET)
  - `/agencies/{agency}/twilio-onboard` — onboard (POST)
  - `/agencies/{agency}/twilio-authorized-representative` — auth rep (POST)
  - `/agencies/{agency}/twilio-business-address` — business address (POST)
  - `/agencies/{agency}/twilio-business-information` — business info (POST)
- **Webhooks**:
  - `incoming-sms-webhook` — inbound SMS (POST)
  - `incoming-sms-webhook-fallback` — fallback (POST)
  - `incoming-voice-to-sms-number-webhook` — voice to SMS (POST)
  - `sms-delivery-status` — delivery status callback (POST)
  - `tb-one-add-pn-to-ms` — add phone number to messaging service (POST)
  - `tb-one-remove-pn-from-ms` — remove phone number from messaging service (POST)
- **Related**: `/sync-leb-twilio-primary-profile` — sync LEB Twilio profile (POST)

### Google Calendar / Gmail
- **Prefix**: `/google-account`, `/oauth/google*`
- **Operations**:
  - `/oauth/google` — OAuth initiation (GET)
  - `/oauth/google-calendar` — calendar OAuth (GET)
  - `/oauth/google-gmail` — Gmail OAuth (GET)
  - `/google-account` — account list (GET)
  - `/google-account/{googleAccount}` — delete account (DELETE)
  - `/google-account/{googleAccount}/calendar/{googleCalendar}` — select calendar (POST)
  - `/google/webhook` — Google webhook (POST)

### Microsoft Calendar
- **Prefix**: `/microsoft-account`, `/oauth/microsoft`
- **Operations**:
  - `/oauth/microsoft` — OAuth initiation (GET)
  - `/microsoft-account` — account list (GET)
  - `/microsoft-account/{microsoftAccount}` — delete account (DELETE)
  - `/microsoft-account/{microsoftAccount}/calendar` — select calendar (POST)
- **Related**: `/azure/webhook` — Azure webhook (POST)

### HST
- **Prefix**: Various
- **Operations**:
  - `/hst-bucket-sync` — bucket sync (GET form, POST sync)
  - `/agents/{agent}/hst-data-migration/migrate` — data migration (POST)
  - `/agents/{agent}/hst-data-migration/status` — migration status (GET)
  - `/leads/{lead}/hst-lock-check` — lock check (GET)
  - `/transaction/{transaction}/hst-post-sale` — post-sale (POST)
  - `/transaction/{transaction}/hst-sync` — sync (POST)
  - `/user-settings/hst-credentials` — credentials (PUT, DELETE, PUT ignore-warning)
  - `/api/hst/credit-transfer` — credit transfer (POST)
  - `/report/hst-and-primary-email` — HST email report (GET)
  - `/grace-pull/log-details/{grace_pull_log}` — grace pull log (GET)

### Marketplace (Bucket Access)
- **Prefix**: `/marketplace`, `/bucket-access`
- **Operations**:
  - `/marketplace` — marketplace view (GET)
  - `/bucket-access` — bucket access list (GET)
  - `/bucket-access/{bucketAccess}/click-to-dial` — click-to-dial (GET)
  - `/bucket-access/{bucketAccess}/purchase-lead` — purchase lead (POST)
  - `/bucket-access/{bucketAccess}/purchase-ctd-lead/{lead}` — purchase click-to-dial lead (POST)
  - `/bucket-access/{bucket}/click-to-dial-shared-bucket` — shared click-to-dial (GET)
  - `/bucket-access/{bucket}/purchase-lead-shared-bucket` — purchase from shared (POST)
  - `/bucket-access/{bucket}/purchase-ctd-lead-shared-bucket/{lead}` — purchase CTD from shared (POST)
  - `/bucket-access/{bucket}/discard-lead` — discard lead (POST)
  - `/bucket-access-agency-shared-buckets` — agency shared buckets (GET)
  - `/bucket-access-agent-shared-buckets` — agent shared buckets (GET)
  - `/bucket-access/{agentBucketSharingBucket}/click-to-dial-agent-shared-bucket` — agent shared CTD (GET)
  - `/bucket-access/{agentBucketSharingBucket}/purchase-lead-agent-shared-bucket` — purchase from agent shared (POST)
  - `/bucket-access/{agentBucketSharingBucket}/purchase-ctd-lead-agent-shared-bucket/{lead}` — purchase CTD from agent shared (POST)
  - `/hst-buckets/{hstBucketId}/purchase-lead` — HST bucket purchase (POST)

### Agency Bucket Sharing
- **Prefix**: `/agency/bucket-sharing`
- **Operations**: GET (list), POST `store`
- **Sub-resources**:
  - `{bucket}/clear-all` — clear all sharing (DELETE)
  - `{bucket}/get-agencies` — agencies list (GET)
  - `{agencyBucketSharing}/update` — update sharing (PUT)

### User Bucket Sharing
- **Prefix**: `/user/{user}/buckets/{bucket}/sharing`
- **Operations**: GET (show), POST `{sharingTo}` (share to user)

### RTB (Real-Time Bidding)
- **Prefix**: `/rtb/{source}`
- **Operations**: GET (show), POST (store), POST `allstates` (all states)
- **Related**: `/api/rtb` — RTB API (POST)

### Froala Editor
- **Prefix**: `/api/froala`
- **Operations**: `upload-file` (POST), `upload-image` (POST), `images` (GET)

### MMS
- **Prefix**: `/api/mms`
- **Operations**: `upload-images` — upload MMS images (POST)

---

## 12. Reports

All reports use GET for view and data endpoints, POST for exports.

### Agency Reports
| Route | Description |
|-------|-------------|
| `/report/agency` | Agency report view |
| `/report/agency/data` | Agency report data |
| `/report/agency/export` | Agency report export (POST) |
| `/report/agency/team-members` | Team members |
| `/report/agency-bucket-sharing` | Bucket sharing report |
| `/report/agency-bucket-sharing/data` | Bucket sharing data |
| `/report/agency-bucket-sharing/export` | Bucket sharing export (POST) |
| `/report/agency-bucks` | Agency bucks report |
| `/report/agency-credit` | Agency credit report |
| `/report/agency-ledger` | Agency ledger |

### Agent Reports
| Route | Description |
|-------|-------------|
| `/report/agent` | Agent report view |
| `/report/agent-carrier` | Agent carrier report |
| `/report/agent-carrier/data` | Agent carrier data |
| `/report/agent-carrier/data/export` | Agent carrier data export |
| `/report/agent-carrier/export-download` | Export download |
| `/report/api/agent-carrier-commission-search` | Commission search API |
| `/report/agent-efficiency` | Agent efficiency report |
| `/report/agent-lead-follow-up` | Lead follow-up report |
| `/report/agent-states` | Agent states report |
| `/report/agent-states/export` | Agent states export |
| `/report/agent-states/print` | Agent states print view |

### Sales Reports
| Route | Description |
|-------|-------------|
| `/report/sale-listing` | Sale listing view |
| `/report/sale-listing/data` | Sale listing data |
| `/report/sale-listing/export` | Sale listing export (POST) |
| `/report/sales-credit` | Sales credit report |
| `/report/sales-credit/data` | Sales credit data |
| `/report/sales-credit/export` | Sales credit export (POST) |
| `/report/sales-credit/products` | Sales credit products |
| `/report/split-sale` | Split sale report |
| `/report/split-sale/data` | Split sale data |
| `/report/split-sale/export` | Split sale export (POST) |

### Lead Reports
| Route | Description |
|-------|-------------|
| `/report/lead-sources` | Lead sources report |
| `/report/lead-sources/bad-phone` | Bad phone report |
| `/report/lead-sources/data` | Lead sources data |
| `/report/lead-sources/dead` | Dead leads report |
| `/report/lead-sources/dispo-file` | Disposition file export (POST) |
| `/report/lead-sources/leads` | Leads detail |
| `/report/lead-sources/sales` | Sales by source |
| `/report/lead-sources2` | Lead sources v2 |
| `/report/lead-rejection` | Lead rejection report |
| `/report/lead-status-ratio` | Lead status ratio |
| `/report/lead-status-ratio/data` | Status ratio data |
| `/report/lead-status-ratio/leads-data` | Leads data by status |

### Commission Reports
| Route | Description |
|-------|-------------|
| `/report/commission-carriers` | Commission carriers |
| `/report/commission-carriers/data` | Commission carrier data |
| `/report/commission-carriers/export` | Commission export (POST) |

### Bucket/Pull Reports
| Route | Description |
|-------|-------------|
| `/report/bucket-auto-responder` | Bucket autoresponder report |
| `/report/bucket-pull` | Bucket pull report |
| `/report/bucket-pull/data` | Bucket pull data |
| `/report/bucket-pull/data/click-to-calls` | Click-to-call data |
| `/report/bucket-pull/data/users` | Users data |
| `/report/bucket-pull/export` | Bucket pull export (POST) |

### Billing Reports
| Route | Description |
|-------|-------------|
| `/report/billing` | Billing report |
| `/report/billing/data` | Billing data |
| `/report/billing/export` | Billing export (POST) |
| `/report/billing/export/status` | Export status |

### Other Reports
| Route | Description |
|-------|-------------|
| `/report/bad-phone-credit` | Bad phone credit report |
| `/report/bdc` | BDC report |
| `/report/bdc-agent` | BDC agent report |
| `/report/bdc-source` | BDC source report |
| `/report/custom-reports` | Custom reports (full CRUD + data, export, columns, column-order) |
| `/report/grace-pull` | Grace pull report |
| `/report/grace-pull/data` | Grace pull data |
| `/report/hst-and-primary-email` | HST email report |
| `/report/last-login` | Last login report |
| `/report/last-login/data` | Last login data |
| `/report/last-login/export` | Last login export |
| `/report/last-login/data/sale-info` | Sale info by login |
| `/report/negative-balance` | Negative balance report |
| `/report/product` | Single product report |
| `/report/products` | Products report |
| `/report/products/data` | Products data |
| `/report/products/export` | Products export (POST) |
| `/report/recruiting-manager-report` | Recruiting manager report |
| `/report/recruiting-manager-report/data` | Recruiting data |
| `/report/refer-to-department` | Referral department report |
| `/report/referral-user-report` | Referral user report |
| `/report/referral-user-report/export` | Referral export (POST) |
| `/report/referral-user-report/{lead}/sales` | Referral lead sales |
| `/report/rr` | Round robin report |
| `/report/state` | State report |
| `/report/state-new` | New state report |

---

## API Endpoints (Non-UI)

| Route | Method | Description |
|-------|--------|-------------|
| `/api/check-duplicate-leads` | GET | Duplicate lead check |
| `/api/agents-search` | GET | Agent search |
| `/api/action-search` | GET | Action search |
| `/api/automatable_entities/{entity}/tasks` | GET | Tasks for automatable entity |
| `/api/automatable_entities/{entity}/triggers` | GET | Triggers for automatable entity |
| `/api/lead-logins/{leadLogin}/show-password` | GET | Show lead login password |
| `/api/leadcloud/lead` | POST | LeadCloud lead submission |
| `/api/{vendor_key}/leads` | POST | Vendor lead submission |
| `/api/rtb` | POST | Real-time bidding |
| `/api/sales` | POST | Sales API |
| `/api/user-email-check` | GET | User email validation |
| `/api/grab-lead/{lead}` | POST | Grab lead |
| `/api/hst/credit-transfer` | POST | HST credit transfer |

---

## Summary Statistics

| Category | Entity Groups | Total Routes (approx) |
|----------|--------------|----------------------|
| Core CRM | 5 | ~250 |
| Communication | 12 | ~135 |
| Automation | 7 | ~85 |
| Sales | 11 | ~155 |
| Commission & Finance | 7 | ~100 |
| Recruiting | 8 | ~65 |
| Operations | 13 | ~90 |
| Import/Export | 4 | ~40 |
| Admin & Config | 15 | ~145 |
| Lead Management | 11 | ~90 |
| Integrations | 8 | ~70 |
| Reports | — | ~100 |
| **Total** | **~100 entities** | **~1,275** |
