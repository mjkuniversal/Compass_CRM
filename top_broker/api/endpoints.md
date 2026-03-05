# TopBroker CRM — API Endpoints Reference

Complete technical reference of all 1,275 Laravel routes. Every route listed with HTTP method, path, and URL parameters.

---

## Table of Contents

1. [Core CRM](#1-core-crm)
   - [Leads](#leads)
   - [Agents](#agents)
   - [Agencies](#agencies)
   - [Buckets](#buckets)
   - [Personal Buckets](#personal-buckets)
   - [MGAs](#mgas)
2. [Communication](#2-communication)
   - [Text Inbox](#text-inbox)
   - [Email Campaigns](#email-campaigns)
   - [Text Campaigns](#text-campaigns)
   - [Campaigns (Shared)](#campaigns-shared)
   - [Lead Campaigns](#lead-campaigns)
   - [Email Blasts](#email-blasts)
   - [Email Templates](#email-templates)
   - [Text Templates](#text-templates)
   - [Quotesheet Email Templates](#quotesheet-email-templates)
   - [Email Messages](#email-messages)
   - [Email/Text Signatures](#emailtext-signatures)
   - [Voicemail Scripts](#voicemail-scripts)
   - [Autoresponders (Sequence)](#autoresponders-sequence)
   - [Autoresponders (Status)](#autoresponders-status)
3. [Automation](#3-automation)
   - [Automations](#automations)
   - [Automation Templates](#automation-templates)
   - [User Automations](#user-automations)
   - [Action Schedules](#action-schedules)
   - [Action Schedule Maps](#action-schedule-maps)
   - [Actions](#actions)
   - [Lead Actions / Scheduling](#lead-actions--scheduling)
   - [Lead Schedule](#lead-schedule)
4. [Sales](#4-sales)
   - [Quotesheets](#quotesheets)
   - [Quotesheet Plans](#quotesheet-plans)
   - [Quotesheet Plan Templates](#quotesheet-plan-templates)
   - [Quotesheet Logo](#quotesheet-logo)
   - [Plans](#plans)
   - [Manage Carriers (Super Admin)](#manage-carriers-super-admin)
   - [Agency Carriers](#agency-carriers)
   - [Agency Carrier QS Products](#agency-carrier-qs-products)
   - [Agency QSP Categories](#agency-qsp-categories)
   - [Global QSP Categories](#global-qsp-categories)
   - [Product Categories](#product-categories)
   - [Master Carrier Products](#master-carrier-products)
   - [Lead Sources](#lead-sources)
   - [Round Robin Groups](#round-robin-groups)
   - [Sale Sharing](#sale-sharing)
   - [Transactions](#transactions)
   - [Request Carriers](#request-carriers)
   - [Leaderboard](#leaderboard)
5. [Commission & Finance](#5-commission--finance)
   - [Admin Commission Statements](#admin-commission-statements)
   - [Agency Admin Commission Statements](#agency-admin-commission-statements)
   - [Agent Commission Statements](#agent-commission-statements)
   - [Commissions Authorization](#commissions-authorization)
   - [Balance Management](#balance-management)
   - [Credits & Cards](#credits--cards)
6. [Recruiting](#6-recruiting)
   - [Recruiting Leads](#recruiting-leads)
   - [Recruiting Sources](#recruiting-sources)
   - [Recruiting Locations](#recruiting-locations)
   - [Recruiting Tasks](#recruiting-tasks)
   - [Recruiting Action Schedules](#recruiting-action-schedules)
   - [Recruiting Email Templates](#recruiting-email-templates)
   - [Recruiting Text Templates](#recruiting-text-templates)
   - [Recruiting Voicemail Scripts](#recruiting-voicemail-scripts)
   - [Recruiting Custom Tags](#recruiting-custom-tags)
7. [Operations](#7-operations)
   - [Calendar](#calendar)
   - [Meetings](#meetings)
   - [Appointment Reminders](#appointment-reminders)
   - [Tasks](#tasks)
   - [Agency Tasks](#agency-tasks)
   - [Todo List](#todo-list)
   - [Time Off](#time-off)
   - [Working Hours](#working-hours)
   - [Bookmarks](#bookmarks)
   - [Team Directory](#team-directory)
   - [Training](#training)
   - [Dashboard](#dashboard)
   - [Notifications](#notifications)
   - [Support](#support)
8. [Import/Export](#8-importexport)
   - [Book of Business Upload](#book-of-business-upload)
   - [Policy Imports](#policy-imports)
   - [Bucket Imports](#bucket-imports)
   - [CSV Export](#csv-export)
   - [Lead Capture](#lead-capture)
9. [Admin & Config](#9-admin--config)
   - [API Keys](#api-keys)
   - [Billing — Agency Subscription](#billing--agency-subscription)
   - [Billing — Agent Subscription](#billing--agent-subscription)
   - [Billing — Global Subscription](#billing--global-subscription)
   - [Billing — Subscription Invoices](#billing--subscription-invoices)
   - [Billing — Super Admin](#billing--super-admin)
   - [Stripe](#stripe)
   - [User Settings](#user-settings)
   - [Impersonation](#impersonation)
   - [DNC Keys](#dnc-keys)
   - [Blacklist](#blacklist)
   - [Super Admin Tools](#super-admin-tools)
   - [Authentication](#authentication)
   - [Docs](#docs)
   - [Misc Admin](#misc-admin)
   - [Horizon (Queue Dashboard)](#horizon-queue-dashboard)
   - [Debugbar](#debugbar)
   - [Ignition](#ignition)
10. [Lead Management](#10-lead-management)
    - [Lead Sharing](#lead-sharing)
    - [Mass Transfer](#mass-transfer)
    - [Agent Transfer](#agent-transfer)
    - [Lead Forms](#lead-forms)
    - [Agent Forms](#agent-forms)
    - [Agent Form Templates](#agent-form-templates)
    - [Agent Form Submissions](#agent-form-submissions)
    - [Lead Segments](#lead-segments)
    - [Custom Tags](#custom-tags)
    - [Lead Custom Tags](#lead-custom-tags)
    - [Lead Redirect Configs](#lead-redirect-configs)
    - [Consent Management](#consent-management)
    - [BDC](#bdc)
    - [Public Forms](#public-forms)
    - [Password Checks](#password-checks)
11. [Integrations](#11-integrations)
    - [Twilio](#twilio)
    - [Google](#google)
    - [Microsoft](#microsoft)
    - [HST](#hst)
    - [Marketplace / Bucket Access](#marketplace--bucket-access)
    - [Agency Bucket Sharing](#agency-bucket-sharing)
    - [User Bucket Sharing](#user-bucket-sharing)
    - [RTB](#rtb)
    - [Froala / MMS](#froala--mms)
    - [Vendor Lead API](#vendor-lead-api)
12. [Reports](#12-reports)
    - [Agency Reports](#agency-reports)
    - [Agent Reports](#agent-reports)
    - [Sales Reports](#sales-reports)
    - [Lead Reports](#lead-reports)
    - [Commission Reports](#commission-reports)
    - [Bucket/Pull Reports](#bucketpull-reports)
    - [Billing Reports](#billing-reports)
    - [Custom Reports](#custom-reports)
    - [Other Reports](#other-reports)

---

## 1. Core CRM

### Leads

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 685 | GET | `/leads/create` | |
| 715 | GET | `/leads` | |
| 740 | GET | `/leads/{lead}` | lead |
| 697 | GET | `/leads/{lead}/edit` | lead |
| 743 | POST | `/leads` | |
| 751 | PUT,PATCH | `/leads/{lead}` | lead |
| 691 | DELETE | `/leads/{lead}` | lead |
| 690 | GET | `/leads/{lead}/datetime` | lead |
| 741 | GET | `/leads/{lead}/ssn` | lead |
| 742 | POST | `/leads/{lead}/ssn` | lead |
| 714 | GET | `/leads/{lead}/hst-lock-check` | lead |
| 684 | POST | `/leads/{lead}/change-source` | lead |
| 692 | POST | `/leads/{lead}/dnc` | lead |
| 725 | POST | `/leads/{lead}/mark-phone-valid/{phone_id}` | lead, phone_id |
| 752 | POST | `/leads/{lead}/update-affiliate` | lead |
| 737 | POST | `/leads/{lead}/refer-to-department` | lead |
| 738 | PUT | `/leads/{lead}/refer-to-department/update` | lead |
| 679 | PUT | `/leads/{lead}/active/{new_policy}` | lead, new_policy |
| 683 | PUT | `/leads/{lead}/cancelled/{new_policy}` | lead, new_policy |
| 698 | PUT | `/leads/{lead}/expiring-ignore/{transaction}` | lead, transaction |
| 739 | PUT | `/leads/{lead}/renew-policy/{transaction}` | lead, transaction |
| 682 | POST | `/leads/{lead}/bucket/{bucket}/transfer` | lead, bucket |
| 755 | POST | `/leads/{lead}/user/{user}/transfer` | lead, user |
| 753 | POST | `/leads/{lead}/user/{user}/send-email` | lead, user |
| 754 | POST | `/leads/{lead}/user/{user}/send-text` | lead, user |
| 686 | GET | `/leads/{lead}/compose-email` | lead |
| 687 | POST | `/leads/{lead}/compose-email` | lead |
| 688 | GET | `/leads/{lead}/compose-sms` | lead |
| 689 | POST | `/leads/{lead}/send-sms` | lead |
| 680 | POST | `/leads/{lead}/billing-info` | lead |
| 681 | PUT | `/leads/{lead}/billing-info` | lead |
| 716 | PATCH | `/leads/{lead}/bulk-update-licenses` | lead |

**Leads > Carriers**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 608 | GET | `/leads/{lead}/carriers` | lead |
| 609 | POST | `/leads/{lead}/carriers` | lead |
| 610 | PATCH | `/leads/{lead}/carriers/{agencyCarrier}` | lead, agencyCarrier |
| 607 | DELETE | `/leads/{lead}/carriers/{agencyCarrier}` | lead, agencyCarrier |

**Leads > Dependants**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 676 | POST | `/leads/{lead}/dependants` | lead |
| 677 | PUT | `/leads/{lead}/dependants/{dependant}` | lead, dependant |
| 675 | DELETE | `/leads/{lead}/dependants/{dependant}` | lead, dependant |
| 618 | GET | `/leads/{lead}/dependants/{dependant}/ssn` | lead, dependant |
| 619 | POST | `/leads/{lead}/dependants/{dependant}/ssn` | lead, dependant |

**Leads > Doctors**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 694 | GET | `/leads/{lead}/doctors` | lead |
| 695 | POST | `/leads/{lead}/doctors` | lead |
| 696 | POST | `/leads/{lead}/doctors/{doctor}` | lead, doctor |
| 693 | DELETE | `/leads/{lead}/doctors/{doctor}` | lead, doctor |

**Leads > Medications**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 727 | GET | `/leads/{lead}/medications` | lead |
| 728 | POST | `/leads/{lead}/medications` | lead |
| 729 | POST | `/leads/{lead}/medications/{medication}` | lead, medication |
| 726 | DELETE | `/leads/{lead}/medications/{medication}` | lead, medication |

**Leads > Files**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 699 | GET | `/leads/{lead}/files/create` | lead |
| 703 | GET | `/leads/{lead}/files` | lead |
| 704 | GET | `/leads/{lead}/files/{file}` | lead, file |
| 702 | GET | `/leads/{lead}/files/{file}/edit` | lead, file |
| 701 | GET | `/leads/{lead}/files/{file}/download` | lead, file |
| 705 | POST | `/leads/{lead}/files` | lead |
| 706 | PUT,PATCH | `/leads/{lead}/files/{file}` | lead, file |
| 700 | DELETE | `/leads/{lead}/files/{file}` | lead, file |

**Leads > Notes**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 661 | POST | `/leads/{lead}/notes` | lead |

**Leads > Tags**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 674 | POST | `/leads/{lead}/tags` | lead |
| 673 | DELETE | `/leads/{lead}/tags/{tag}` | lead, tag |

**Leads > Types**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 744 | GET | `/leads/{lead}/types/create` | lead |
| 747 | GET | `/leads/{lead}/types` | lead |
| 748 | GET | `/leads/{lead}/types/{type}` | lead, type |
| 746 | GET | `/leads/{lead}/types/{type}/edit` | lead, type |
| 749 | POST | `/leads/{lead}/types` | lead |
| 750 | PUT,PATCH | `/leads/{lead}/types/{type}` | lead, type |
| 745 | DELETE | `/leads/{lead}/types/{type}` | lead, type |

**Leads > Licenses**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 718 | GET | `/leads/{lead}/licenses` | lead |
| 719 | GET | `/leads/{lead}/licenses/{license}` | lead, license |
| 720 | POST | `/leads/{lead}/licenses` | lead |
| 721 | PUT,PATCH | `/leads/{lead}/licenses/{license}` | lead, license |
| 717 | DELETE | `/leads/{lead}/licenses/{license}` | lead, license |

**Leads > Login**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 723 | POST | `/leads/{lead}/login` | lead |
| 724 | POST | `/leads/{lead}/login/{loginLead}/update` | lead, loginLead |
| 722 | DELETE | `/leads/{lead}/login/{loginLead}/delete` | lead, loginLead |

**Leads > Form Submissions**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 707 | GET | `/leads/{lead}/form-submissions/create` | lead |
| 710 | GET | `/leads/{lead}/form-submissions` | lead |
| 711 | GET | `/leads/{lead}/form-submissions/{form_submission}` | lead, form_submission |
| 709 | GET | `/leads/{lead}/form-submissions/{form_submission}/edit` | lead, form_submission |
| 712 | POST | `/leads/{lead}/form-submissions` | lead |
| 713 | PUT,PATCH | `/leads/{lead}/form-submissions/{form_submission}` | lead, form_submission |
| 708 | DELETE | `/leads/{lead}/form-submissions/{form_submission}` | lead, form_submission |

**Leads > New Policy**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 733 | GET | `/leads/{lead}/new-policy` | lead |
| 734 | GET | `/leads/{lead}/new-policy/{new_policy}` | lead, new_policy |
| 735 | POST | `/leads/{lead}/new-policy` | lead |
| 736 | PUT,PATCH | `/leads/{lead}/new-policy/{new_policy}` | lead, new_policy |
| 732 | DELETE | `/leads/{lead}/new-policy/{new_policy}` | lead, new_policy |
| 731 | POST | `/leads/{lead}/new-policy-temp` | lead |
| 730 | DELETE | `/leads/{lead}/new-policy-temp/{new_policy}` | lead, new_policy |

**Leads > Quotesheets**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 663 | GET | `/leads/{lead}/quotesheets/create` | lead |
| 669 | GET | `/leads/{lead}/quotesheets/{quotesheet}` | lead, quotesheet |
| 667 | GET | `/leads/{lead}/quotesheets/{quotesheet}/send` | lead, quotesheet |
| 666 | POST | `/leads/{lead}/quotesheets/{quotesheet}/send` | lead, quotesheet |
| 668 | POST | `/leads/{lead}/quotesheets/{quotesheet}/validate-email` | lead, quotesheet |
| 671 | POST | `/leads/{lead}/quotesheets/{quotesheet}/update-name` | lead, quotesheet |
| 664 | DELETE | `/leads/{lead}/quotesheets/{quotesheet}` | lead, quotesheet |

### Agents

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 263 | GET | `/agents/create` | |
| 274 | GET | `/agents` | |
| 289 | GET | `/agents/{agent}` | agent |
| 265 | GET | `/agents/{agent}/edit` | agent |
| 290 | POST | `/agents` | |
| 297 | PUT,PATCH | `/agents/{agent}` | agent |
| 264 | DELETE | `/agents/{agent}` | agent |
| 291 | POST | `/agents/{agent}/toggle-active-status` | agent |
| 292 | POST | `/commission-admin/agents/{user}/toggle-has-commissions` | user |
| 262 | PUT | `/agents/{agent}/contract-info` | agent |
| 288 | POST | `/agents/{agent}/provision-new-twilio-number` | agent |
| 255 | POST | `/agents/{user}/authorize-autoreplenish` | user |
| 256 | POST | `/agents/{user}/autoreplenish-settings` | user |
| 281 | POST | `/agents/{user}/low-balance-threshold` | user |
| 282 | POST | `/agents/{user}/toggle-low-balance-notification` | user |
| 245 | POST | `/agents/{agent}/stripe-keys` | agent |
| 275 | PATCH | `/agents/{agent}/bulk-update-licenses` | agent |

**Agents > Carriers**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 185 | GET | `/agents/{agent}/carriers` | agent |
| 186 | GET | `/agents/{agent}/carriers/{carrier}` | agent, carrier |
| 187 | POST | `/agents/{agent}/carriers` | agent |
| 183 | POST | `/agents/{agent}/carriers/assign-all` | agent |
| 189 | PATCH | `/agents/{agent}/carriers/{agencyCarrier}` | agent, agencyCarrier |
| 184 | DELETE | `/agents/{agent}/carriers/{agencyCarrier}` | agent, agencyCarrier |
| 182 | GET | `/agents/{agent}/carriers/{carrier}/all-agents-with-access` | agent, carrier |
| 233 | GET | `/agents/{agent}/carriers/{carrier}/data` | agent, carrier |
| 234 | PUT | `/agents/{agent}/carriers/{carrier}/data` | agent, carrier |
| 235 | GET | `/agents/{agent}/carriers/{carrier}/hierarchy` | agent, carrier |
| 188 | PUT | `/agents/{agent}/carriers/{carrier}/transfer-downline` | agent, carrier |

**Agents > Account Access**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 250 | GET | `/agents/{agent}/account-access` | agent |
| 252 | GET | `/agents/{agent}/account-access/{account_access}` | agent, account_access |
| 253 | POST | `/agents/{agent}/account-access` | agent |
| 254 | PUT,PATCH | `/agents/{agent}/account-access/{account_access}` | agent, account_access |
| 249 | DELETE | `/agents/{agent}/account-access/{account_access}` | agent, account_access |
| 251 | DELETE | `/agents/{agent}/account-access/{accessible_user_id}/revoke` | agent, accessible_user_id |

**Agents > Bucket Access**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 258 | GET | `/agents/{agent}/bucket-access` | agent |
| 259 | GET | `/agents/{agent}/bucket-access/{bucket_access}` | agent, bucket_access |
| 260 | POST | `/agents/{agent}/bucket-access` | agent |
| 261 | PUT,PATCH | `/agents/{agent}/bucket-access/{bucket_access}` | agent, bucket_access |
| 257 | DELETE | `/agents/{agent}/bucket-access/{bucket_access}` | agent, bucket_access |

**Agents > Files**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 268 | GET | `/agents/{agent}/files` | agent |
| 269 | GET | `/agents/{agent}/files/{file}` | agent, file |
| 267 | GET | `/agents/{agent}/files/{file}/download` | agent, file |
| 270 | POST | `/agents/{agent}/files` | agent |
| 271 | PUT,PATCH | `/agents/{agent}/files/{file}` | agent, file |
| 266 | DELETE | `/agents/{agent}/files/{file}` | agent, file |

**Agents > Licenses**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 277 | GET | `/agents/{agent}/licenses` | agent |
| 278 | GET | `/agents/{agent}/licenses/{license}` | agent, license |
| 279 | POST | `/agents/{agent}/licenses` | agent |
| 280 | PUT,PATCH | `/agents/{agent}/licenses/{license}` | agent, license |
| 276 | DELETE | `/agents/{agent}/licenses/{license}` | agent, license |

**Agents > Notes**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 284 | GET | `/agents/{agent}/notes` | agent |
| 285 | GET | `/agents/{agent}/notes/{note}` | agent, note |
| 286 | POST | `/agents/{agent}/notes` | agent |
| 287 | PUT,PATCH | `/agents/{agent}/notes/{note}` | agent, note |
| 283 | DELETE | `/agents/{agent}/notes/{note}` | agent, note |

**Agents > Trainings**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 293 | GET | `/agents/{agent}/trainings` | agent |
| 294 | GET | `/agents/{agent}/trainings/{resource}` | agent, resource |
| 295 | POST | `/agents/{agent}/trainings/{resource}` | agent, resource |
| 296 | PATCH | `/agents/{agent}/trainings/{resource}` | agent, resource |

**Agents > HST Data Migration**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 272 | POST | `/agents/{agent}/hst-data-migration/migrate` | agent |
| 273 | GET | `/agents/{agent}/hst-data-migration/status` | agent |

### Agencies

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 70 | GET | `/agencies/create` | |
| 84 | GET | `/agencies` | |
| 93 | GET | `/agencies/{agency}` | agency |
| 82 | GET | `/agencies/{agency}/edit` | agency |
| 95 | POST | `/agencies` | |
| 97 | POST | `/agencies/{agency}` | agency |
| 81 | DELETE | `/agencies/{agency}` | agency |
| 83 | PUT | `/agencies/{agency}/email-and-text-settings` | agency |
| 90 | POST | `/agencies/{agency}/notifications` | agency |
| 91 | POST | `/agencies/{agency}/notifications/delete-email` | agency |
| 92 | POST | `/agencies/{agency}/notifications/validate-email` | agency |
| 94 | POST | `/agencies/{agency}/sidebar-widgets` | agency |
| 96 | POST | `/agencies/{agency}/stripe-keys` | agency |
| 67 | DELETE | `/agencies/{agency}/commissions-calendar-pdf` | agency |
| 68 | POST | `/agencies/{agency}/commissions-calendar-pdf` | agency |
| 69 | POST | `/agencies/{agency}/commissions-toggle` | agency |
| 152 | PUT | `/agencies/{agency}/carriers/{carrier}/general_details` | agency, carrier |

**Agencies > Billing Info**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 51 | GET | `/agencies/{agency}/billing-info` | agency |
| 52 | GET | `/agencies/{agency}/billing-info/{billing_info}` | agency, billing_info |
| 53 | POST | `/agencies/{agency}/billing-info` | agency |
| 54 | PUT,PATCH | `/agencies/{agency}/billing-info/{billing_info}` | agency, billing_info |
| 50 | DELETE | `/agencies/{agency}/billing-info/{billing_info}` | agency, billing_info |

**Agencies > Billing Profiles**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 55 | GET | `/agencies/{agency}/billing-profiles/create` | agency |
| 58 | GET | `/agencies/{agency}/billing-profiles` | agency |
| 59 | GET | `/agencies/{agency}/billing-profiles/{billing_profile}` | agency, billing_profile |
| 57 | GET | `/agencies/{agency}/billing-profiles/{billing_profile}/edit` | agency, billing_profile |
| 60 | POST | `/agencies/{agency}/billing-profiles` | agency |
| 61 | PUT,PATCH | `/agencies/{agency}/billing-profiles/{billing_profile}` | agency, billing_profile |
| 56 | DELETE | `/agencies/{agency}/billing-profiles/{billing_profile}` | agency, billing_profile |

**Agencies > Bookmarks**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 63 | GET | `/agencies/{agency}/bookmarks` | agency |
| 64 | GET | `/agencies/{agency}/bookmarks/{bookmark}` | agency, bookmark |
| 65 | POST | `/agencies/{agency}/bookmarks` | agency |
| 66 | PUT,PATCH | `/agencies/{agency}/bookmarks/{bookmark}` | agency, bookmark |
| 62 | DELETE | `/agencies/{agency}/bookmarks/{bookmark}` | agency, bookmark |

**Agencies > Dead Reasons**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 72 | GET | `/agencies/{agency}/dead-reasons` | agency |
| 73 | GET | `/agencies/{agency}/dead-reasons/{dead_reason}` | agency, dead_reason |
| 74 | POST | `/agencies/{agency}/dead-reasons` | agency |
| 75 | PUT,PATCH | `/agencies/{agency}/dead-reasons/{dead_reason}` | agency, dead_reason |
| 71 | DELETE | `/agencies/{agency}/dead-reasons/{dead_reason}` | agency, dead_reason |

**Agencies > Department Skills**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 77 | GET | `/agencies/{agency}/department_skills` | agency |
| 78 | GET | `/agencies/{agency}/department_skills/{department_skill}` | agency, department_skill |
| 79 | POST | `/agencies/{agency}/department_skills` | agency |
| 80 | PUT,PATCH | `/agencies/{agency}/department_skills/{department_skill}` | agency, department_skill |
| 76 | DELETE | `/agencies/{agency}/department_skills/{department_skill}` | agency, department_skill |

**Agencies > Lead Tags**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 86 | GET | `/agencies/{agency}/lead-tags` | agency |
| 87 | GET | `/agencies/{agency}/lead-tags/{lead_tag}` | agency, lead_tag |
| 88 | POST | `/agencies/{agency}/lead-tags` | agency |
| 89 | PUT,PATCH | `/agencies/{agency}/lead-tags/{lead_tag}` | agency, lead_tag |
| 85 | DELETE | `/agencies/{agency}/lead-tags/{lead_tag}` | agency, lead_tag |

**Agencies > Working Hours**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 179 | GET | `/agencies/{agency}/working-hours` | agency |
| 180 | POST | `/agencies/{agency}/working-hours` | agency |

**Agencies > Twilio**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1219 | GET | `/agencies/{agency}/twilio-settings` | agency |
| 1220 | POST | `/agencies/{agency}/twilio-onboard` | agency |
| 1221 | POST | `/agencies/{agency}/twilio-authorized-representative` | agency |
| 1222 | POST | `/agencies/{agency}/twilio-business-address` | agency |
| 1223 | POST | `/agencies/{agency}/twilio-business-information` | agency |

### Buckets

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 414 | GET | `/buckets/create` | |
| 419 | GET | `/buckets` | |
| 421 | GET | `/buckets/{bucket}` | bucket |
| 418 | GET | `/buckets/{bucket}/edit` | bucket |
| 422 | POST | `/buckets` | |
| 423 | PUT,PATCH | `/buckets/{bucket}` | bucket |
| 416 | DELETE | `/buckets/{bucket}` | bucket |
| 412 | GET | `/buckets/{bucket}/can-be-deleted` | bucket |
| 407 | GET | `/buckets/{bucket}/leads` | bucket |
| 406 | POST | `/buckets/{bucket}/leads/{lead}` | bucket, lead |
| 408 | GET | `/buckets/{bucket}/import-leads` | bucket |
| 409 | POST | `/buckets/{bucket}/import-leads` | bucket |
| 410 | GET | `/buckets/{id}/access` | id |
| 411 | POST | `/buckets/{id}/access/daily-limit-store` | id |
| 420 | PUT | `/buckets/{bucket}/new-Agents-daily-limit` | bucket |
| 413 | GET | `/buckets/{bucket}/contacted-leads` | bucket |
| 415 | GET | `/buckets/{bucket}/dead-leads` | bucket |
| 417 | GET | `/buckets/{bucket}/disconnected-leads` | bucket |
| 424 | GET | `/buckets/{bucket}/sold-leads` | bucket |

### Personal Buckets

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 863 | GET | `/personal-buckets/create` | |
| 866 | GET | `/personal-buckets` | |
| 867 | GET | `/personal-buckets/{personal_bucket}` | personal_bucket |
| 865 | GET | `/personal-buckets/{personal_bucket}/edit` | personal_bucket |
| 862 | GET | `/personal-buckets/{id}/access` | id |
| 868 | POST | `/personal-buckets` | |
| 869 | PUT,PATCH | `/personal-buckets/{personal_bucket}` | personal_bucket |
| 864 | DELETE | `/personal-buckets/{personal_bucket}` | personal_bucket |
| 870 | GET | `/personal-buckets/{bucket}/sold-leads` | bucket |

### MGAs

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 837 | GET | `/mgas/create` | |
| 840 | GET | `/mgas` | |
| 841 | GET | `/mgas/{mga}` | mga |
| 839 | GET | `/mgas/{mga}/edit` | mga |
| 842 | POST | `/mgas` | |
| 843 | PUT,PATCH | `/mgas/{mga}` | mga |
| 838 | DELETE | `/mgas/{mga}` | mga |

---

## 2. Communication

### Text Inbox

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1201 | GET | `/text-inbox` | |
| 1181 | POST | `/text-inbox/{textInbox}/messages/send` | textInbox |
| 1183 | POST | `/text-inbox/{textInbox}/archive` | textInbox |
| 1188 | POST | `/text-inbox/{textInbox}/activate` | textInbox |
| 1186 | POST | `/text-inbox/{textInbox}/grabLead/{lead}` | textInbox, lead |
| 1187 | POST | `/text-inbox/{textInbox}/sendToRR/{lead}` | textInbox, lead |
| 1189 | POST | `/text-inbox/{textInbox}/transferToAgent/{lead}` | textInbox, lead |
| 1190 | POST | `/text-inbox/{textInbox}/transferToBucket/{lead}` | textInbox, lead |
| 1185 | POST | `/text-inbox/discard-lead/{lead}` | lead |
| 1182 | POST | `/activate-multiple-inboxes` | |
| 1184 | POST | `/archive-multiple-inboxes` | |

### Email Campaigns

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 499 | GET | `/email-campaigns/create` | |
| 505 | GET | `/email-campaigns` | |
| 500 | GET | `/email-campaigns/{campaign}/criteria` | campaign |
| 501 | POST | `/email-campaigns/{campaign}/criteria` | campaign |
| 503 | GET | `/email-campaigns/{campaign}/details` | campaign |
| 504 | POST | `/email-campaigns/{campaign}/details` | campaign |
| 512 | GET | `/email-campaigns/{campaign}/sending-times` | campaign |
| 513 | POST | `/email-campaigns/{campaign}/sending-times` | campaign |
| 502 | DELETE | `/email-campaigns/{campaign}/delete` | campaign |
| 506 | GET | `/email-campaigns/{campaign}/messages/create` | campaign |
| 508 | GET | `/email-campaigns/{campaign}/messages` | campaign |
| 509 | GET | `/email-campaigns/{campaign}/messages/{message}` | campaign, message |
| 510 | POST | `/email-campaigns/{campaign}/messages` | campaign |
| 511 | POST | `/email-campaigns/{campaign}/messages/{message}/update` | campaign, message |
| 507 | DELETE | `/email-campaigns/{campaign}/messages/{message}` | campaign, message |

### Text Campaigns

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1166 | GET | `/text-campaigns/create` | |
| 1172 | GET | `/text-campaigns` | |
| 1167 | GET | `/text-campaigns/{campaign}/criteria` | campaign |
| 1168 | POST | `/text-campaigns/{campaign}/criteria` | campaign |
| 1170 | GET | `/text-campaigns/{campaign}/details` | campaign |
| 1171 | POST | `/text-campaigns/{campaign}/details` | campaign |
| 1179 | GET | `/text-campaigns/{campaign}/sending-times` | campaign |
| 1180 | POST | `/text-campaigns/{campaign}/sending-times` | campaign |
| 1169 | DELETE | `/text-campaigns/{campaign}/delete` | campaign |
| 1173 | GET | `/text-campaigns/{campaign}/messages/create` | campaign |
| 1175 | GET | `/text-campaigns/{campaign}/messages` | campaign |
| 1176 | GET | `/text-campaigns/{campaign}/messages/{message}` | campaign, message |
| 1177 | POST | `/text-campaigns/{campaign}/messages` | campaign |
| 1178 | POST | `/text-campaigns/{campaign}/messages/{message}/update` | campaign, message |
| 1174 | DELETE | `/text-campaigns/{campaign}/messages/{message}` | campaign, message |

### Campaigns (Shared)

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 437 | POST | `/campaigns/{campaign}/lead-count` | campaign |
| 438 | POST | `/campaigns/{campaign}/publish` | campaign |
| 441 | POST | `/campaigns/{campaign}/terminate` | campaign |
| 442 | POST | `/campaigns/{campaign}/unterminate` | campaign |
| 440 | GET | `/campaigns/{campaign}/report` | campaign |
| 439 | GET | `/campaigns/{campaign}/report/export` | campaign |

### Lead Campaigns

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 602 | POST | `/lead-campaigns/{lead}/disable/{campaign}` | lead, campaign |
| 603 | POST | `/lead-campaigns/{lead}/enable/{campaign}` | lead, campaign |
| 604 | POST | `/lead-campaigns/{lead}/global-disable` | lead |
| 605 | POST | `/lead-campaigns/{lead}/global-enable` | lead |
| 606 | POST | `/lead-campaigns/{lead}/re-add/{campaign}` | lead, campaign |

### Email Blasts

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 491 | GET | `/email-blasts/create` | |
| 495 | GET | `/email-blasts` | |
| 496 | GET | `/email-blasts/{email_blast}` | email_blast |
| 494 | GET | `/email-blasts/{email_blast}/edit` | email_blast |
| 497 | POST | `/email-blasts` | |
| 498 | PUT,PATCH | `/email-blasts/{email_blast}` | email_blast |
| 493 | DELETE | `/email-blasts/{email_blast}` | email_blast |
| 490 | POST | `/email-blasts/{id}/approve` | id |
| 492 | POST | `/email-blasts/{id}/decline` | id |
| 860 | GET | `/pending-email-blasts` | |

### Email Templates

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 517 | GET | `/email-templates/create` | |
| 520 | GET | `/email-templates` | |
| 522 | GET | `/email-templates/{email_template}` | email_template |
| 519 | GET | `/email-templates/{email_template}/edit` | email_template |
| 521 | GET | `/email-templates/{emailTemplate}/preview/{lead}` | emailTemplate, lead |
| 523 | POST | `/email-templates` | |
| 524 | PUT,PATCH | `/email-templates/{email_template}` | email_template |
| 518 | DELETE | `/email-templates/{email_template}` | email_template |
| 526 | GET | `/email-template-preview/{emailTemplate}` | emailTemplate |

### Text Templates

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1193 | GET | `/text-templates/create` | |
| 1196 | GET | `/text-templates` | |
| 1198 | GET | `/text-templates/{text_template}` | text_template |
| 1195 | GET | `/text-templates/{text_template}/edit` | text_template |
| 1197 | GET | `/text-templates/{textTemplate}/preview/{lead}` | textTemplate, lead |
| 1199 | POST | `/text-templates` | |
| 1200 | PUT,PATCH | `/text-templates/{text_template}` | text_template |
| 1194 | DELETE | `/text-templates/{text_template}` | text_template |
| 1202 | GET | `/text-template-preview/{textTemplate}` | textTemplate |

### Quotesheet Email Templates

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 882 | GET | `/quotesheet-email-templates/create` | |
| 885 | GET | `/quotesheet-email-templates` | |
| 886 | GET | `/quotesheet-email-templates/{quotesheet_email_template}` | quotesheet_email_template |
| 884 | GET | `/quotesheet-email-templates/{quotesheet_email_template}/edit` | quotesheet_email_template |
| 887 | POST | `/quotesheet-email-templates` | |
| 888 | PUT,PATCH | `/quotesheet-email-templates/{quotesheet_email_template}` | quotesheet_email_template |
| 883 | DELETE | `/quotesheet-email-templates/{quotesheet_email_template}` | quotesheet_email_template |

### Email Messages

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 514 | GET | `/email-messages/{emailMessage}/preview` | emailMessage |

### Email/Text Signatures

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 515 | GET | `/email-signature` | |
| 516 | POST | `/email-signature` | |
| 1191 | GET | `/text-signature` | |
| 1192 | POST | `/text-signature` | |

### Voicemail Scripts

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1268 | GET | `/voicemail-scripts/create` | |
| 1271 | GET | `/voicemail-scripts` | |
| 1272 | GET | `/voicemail-scripts/{voicemail_script}` | voicemail_script |
| 1270 | GET | `/voicemail-scripts/{voicemail_script}/edit` | voicemail_script |
| 1273 | POST | `/voicemail-scripts` | |
| 1274 | PUT,PATCH | `/voicemail-scripts/{voicemail_script}` | voicemail_script |
| 1269 | DELETE | `/voicemail-scripts/{voicemail_script}` | voicemail_script |
| 1275 | GET | `/voicemail-scripts-preview/{voicemailScript}` | voicemailScript |

### Autoresponders (Sequence)

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 358 | GET | `/autoresponders_sequence/{sequence?}` | sequence (optional) |
| 355 | POST | `/autoresponders_sequence` | |
| 356 | PUT | `/autoresponders_sequence/{sequence}` | sequence |
| 354 | DELETE | `/autoresponders_sequence/{sequence}` | sequence |
| 359 | POST | `/autoresponders_sequence/{sequence}/messages` | sequence |
| 361 | PUT | `/autoresponders_sequence/{sequence}/messages/{message}` | sequence, message |
| 360 | PUT | `/autoresponders_sequence/{sequence}/messages/{message}/toggleActiveStatus` | sequence, message |
| 357 | DELETE | `/autoresponders_sequence/{sequence}/messages/{message}` | sequence, message |

### Autoresponders (Status)

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 363 | GET | `/autoresponders_status/{lead_status}` | lead_status |
| 364 | POST | `/autoresponders_status/{lead_status}` | lead_status |
| 366 | PUT | `/autoresponders_status/{lead_status}/messages/{message}` | lead_status, message |
| 365 | PUT | `/autoresponders_status/{lead_status}/messages/{message}/toggleActiveStatus` | lead_status, message |
| 362 | DELETE | `/autoresponders_status/{lead_status}/messages/{message}` | lead_status, message |

---

## 3. Automation

### Automations

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 338 | GET | `/automations/create` | |
| 341 | GET | `/automations` | |
| 342 | GET | `/automations/{automation}/show` | automation |
| 339 | DELETE | `/automations/{automation}/delete` | automation |
| 340 | POST | `/automations/{automation}/from-template` | automation |
| 332 | PATCH | `/automations/{automation}/change-automatable-entity` | automation |
| 348 | PATCH | `/automations/{automation}/toggle-add-new-agents` | automation |
| 349 | PATCH | `/automations/{automation}/toggle-is-agency` | automation |
| 350 | PATCH | `/automations/{automation}/update` | automation |
| 351 | PATCH | `/automations/{automation}/update-hours` | automation |
| 352 | PATCH | `/automations/{automation}/update-name` | automation |
| 353 | POST | `/automations/{automation}/syncUsers` | automation |
| 334 | POST | `/automations/{automation}/conditions` | automation |
| 335 | POST | `/automations/{automation}/conditions/from-template` | automation |
| 333 | DELETE | `/automations/{automation}/conditions/{condition}/delete` | automation, condition |
| 336 | PATCH | `/automations/{automation}/conditions/{condition}/comparison` | automation, condition |
| 337 | PATCH | `/automations/{automation}/conditions/{condition}/trigger` | automation, condition |
| 344 | POST | `/automations/{automation}/tasks` | automation |
| 345 | POST | `/automations/{automation}/tasks/from-template` | automation |
| 346 | PATCH | `/automations/{automation}/tasks/{task}` | automation, task |
| 347 | PUT | `/automations/{automation}/tasks/{task}/from-template` | automation, task |
| 343 | DELETE | `/automations/{automation}/tasks/{task}/delete` | automation, task |

### Automation Templates

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 331 | GET | `/automation-templates` | |

### User Automations

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1230 | GET | `/user-automations/create` | |
| 1232 | GET | `/user-automations` | |
| 1233 | GET | `/user-automations/{automation}` | automation |
| 1231 | POST | `/user-automations/{automation}/duplicate` | automation |
| 1234 | PATCH | `/user-automations/{automation}/toggleActive` | automation |

### Action Schedules

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 9 | GET | `/action-schedules/create` | |
| 12 | GET | `/action-schedules` | |
| 13 | GET | `/action-schedules/{action_schedule}` | action_schedule |
| 11 | GET | `/action-schedules/{action_schedule}/edit` | action_schedule |
| 14 | POST | `/action-schedules` | |
| 16 | PUT,PATCH | `/action-schedules/{action_schedule}` | action_schedule |
| 10 | DELETE | `/action-schedules/{action_schedule}` | action_schedule |
| 8 | POST | `/action-schedules/{actionSchedule}/copy` | actionSchedule |
| 15 | POST | `/action-schedules/{actionSchedule}/toggle-active` | actionSchedule |

### Action Schedule Maps

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1 | GET | `/action-schedule-maps/create` | |
| 4 | GET | `/action-schedule-maps` | |
| 5 | GET | `/action-schedule-maps/{action_schedule_map}` | action_schedule_map |
| 3 | GET | `/action-schedule-maps/{action_schedule_map}/edit` | action_schedule_map |
| 6 | POST | `/action-schedule-maps` | |
| 7 | PUT,PATCH | `/action-schedule-maps/{action_schedule_map}` | action_schedule_map |
| 2 | DELETE | `/action-schedule-maps/{action_schedule_map}` | action_schedule_map |

### Actions

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 17 | GET | `/actions/create` | |
| 20 | GET | `/actions` | |
| 21 | GET | `/actions/{action}` | action |
| 19 | GET | `/actions/{action}/edit` | action |
| 22 | POST | `/actions` | |
| 24 | PUT,PATCH | `/actions/{action}` | action |
| 18 | DELETE | `/actions/{action}` | action |
| 23 | POST | `/actions/{action}/toggle-active` | action |

### Lead Actions / Scheduling

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 594 | GET | `/lead-action/{lead}/next` | lead |
| 596 | POST | `/lead-action/{lead}/next` | lead |
| 595 | GET | `/lead-action/{lead}/next-by-status/{leadStatus}` | lead, leadStatus |
| 597 | POST | `/lead-action/{lead}/next-with-complete-multiple` | lead |
| 584 | POST | `/lead-action/{lead}/shared-with/{user}/next` | lead, user |
| 585 | POST | `/lead-action/{lead}/shared-with/{user}/next-with-complete-multiple` | lead, user |
| 586 | GET | `/lead-action/check-working-hours/{actionScheduleMap?}` | actionScheduleMap (optional) |
| 587 | GET | `/lead-action/{leadSchedule}/duplicate-lookup` | leadSchedule |
| 588 | GET | `/lead-action/{leadSchedule}/reschedule` | leadSchedule |
| 598 | POST | `/lead-action/{leadSchedule}/reschedule` | leadSchedule |
| 599 | DELETE | `/lead-action/schedule/delete/{leadSchedule}` | leadSchedule |
| 600 | PUT | `/lead-action/schedule/flag/{leadSchedule}` | leadSchedule |
| 601 | PUT | `/lead-action/schedule/unflag/{leadSchedule}` | leadSchedule |
| 589 | DELETE | `/lead-action/history/delete/{leadActionHistory}` | leadActionHistory |
| 590 | PUT | `/lead-action/history/flag/{leadActionHistory}` | leadActionHistory |
| 591 | PUT | `/lead-action/history/pin/{leadActionHistory}` | leadActionHistory |
| 592 | PUT | `/lead-action/history/unflag/{leadActionHistory}` | leadActionHistory |
| 593 | PUT | `/lead-action/history/unpin/{leadActionHistory}` | leadActionHistory |

### Lead Schedule

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 636 | GET | `/lead-schedule/lead/{lead}` | lead |
| 637 | GET | `/lead-schedule/lead/{user}` | user |

---

## 4. Sales

### Quotesheets

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 908 | POST | `/quotesheets/{quotesheet}/plans` | quotesheet |
| 909 | POST | `/quotesheets/{quotesheet}/plans-from-template` | quotesheet |
| 910 | DELETE | `/quotesheets/{quotesheet}/plans/{plan}` | quotesheet, plan |
| 911 | POST | `/quotesheets/{quotesheet}/plans/{plan}/move-down` | quotesheet, plan |
| 912 | POST | `/quotesheets/{quotesheet}/plans/{plan}/move-up` | quotesheet, plan |
| 913 | DELETE | `/quotesheets/{quotesheet}/plans/{plan}/products/{product}` | quotesheet, plan, product |
| 914 | POST | `/quotesheets/{quotesheet}/plans/{plan}/products` | quotesheet, plan |
| 915 | PATCH | `/quotesheets/{quotesheet}/plans/{plan}/products/{product}` | quotesheet, plan, product |

**Public Quotesheet (go/qsx)**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 665 | GET | `/go/qsx/{uuid}` | uuid |
| 670 | POST | `/go/qsx/{uuid}/start` | uuid |
| 672 | GET | `/go/qsx/{uuid}/selected` | uuid |
| 662 | GET | `/go/qsx/{uuid}/thank-you` | uuid |

### Quotesheet Plans

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 907 | POST | `/quotesheet-plans/{plan}/copy` | plan |

### Quotesheet Plan Templates

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 892 | GET | `/quotesheet-plan-templates/create` | |
| 894 | GET | `/quotesheet-plan-templates` | |
| 901 | GET | `/quotesheet-plan-templates/{template}` | template |
| 902 | POST | `/quotesheet-plan-templates` | |
| 893 | DELETE | `/quotesheet-plan-templates/{template}` | template |
| 903 | POST | `/quotesheet-plan-templates/{template}/update-name` | template |
| 904 | POST | `/quotesheet-plan-templates/{template}/update-is-agency` | template |
| 899 | POST | `/quotesheet-plan-templates/{template}/products` | template |
| 900 | POST | `/quotesheet-plan-templates/{template}/products/{product}` | template, product |
| 895 | DELETE | `/quotesheet-plan-templates/{template}/products/{product}` | template, product |
| 896 | POST | `/quotesheet-plan-templates/{template}/products/{product}/move-down` | template, product |
| 897 | POST | `/quotesheet-plan-templates/{template}/products/{product}/move-up` | template, product |
| 898 | PUT | `/quotesheet-plan-templates/{template}/products/reorder` | template |

### Quotesheet Logo

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 889 | GET | `/quotesheet-logo` | |
| 891 | POST | `/quotesheet-logo` | |
| 890 | DELETE | `/quotesheet-logo` | |

### Plans

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 871 | POST | `/plans/{plan}/answers` | plan |
| 905 | POST | `/plans/{plan}/products/{product}/move-down` | plan, product |
| 906 | POST | `/plans/{plan}/products/{product}/move-up` | plan, product |

### Manage Carriers (Super Admin)

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 767 | GET | `/manage-carriers/create` | |
| 770 | GET | `/manage-carriers` | |
| 803 | GET | `/manage-carriers/{manage_carrier}` | manage_carrier |
| 769 | GET | `/manage-carriers/{manage_carrier}/edit` | manage_carrier |
| 804 | POST | `/manage-carriers` | |
| 805 | PUT,PATCH | `/manage-carriers/{manage_carrier}` | manage_carrier |
| 768 | DELETE | `/manage-carriers/{manage_carrier}` | manage_carrier |

**Manage Carriers > Brochures**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 760 | GET | `/manage-carriers/{manage_carrier}/brochures/create` | manage_carrier |
| 763 | GET | `/manage-carriers/{manage_carrier}/brochures` | manage_carrier |
| 764 | GET | `/manage-carriers/{manage_carrier}/brochures/{brochure}` | manage_carrier, brochure |
| 762 | GET | `/manage-carriers/{manage_carrier}/brochures/{brochure}/edit` | manage_carrier, brochure |
| 765 | POST | `/manage-carriers/{manage_carrier}/brochures` | manage_carrier |
| 766 | POST | `/manage-carriers/{manage_carrier}/brochures/{brochure}/update` | manage_carrier, brochure |
| 761 | DELETE | `/manage-carriers/{manage_carrier}/brochures/{brochure}` | manage_carrier, brochure |

**Manage Carriers > Products**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 771 | GET | `/manage-carriers/{manage_carrier}/products/create` | manage_carrier |
| 774 | GET | `/manage-carriers/{manage_carrier}/products` | manage_carrier |
| 775 | GET | `/manage-carriers/{manage_carrier}/products/{product}` | manage_carrier, product |
| 773 | GET | `/manage-carriers/{manage_carrier}/products/{product}/edit` | manage_carrier, product |
| 776 | POST | `/manage-carriers/{manage_carrier}/products` | manage_carrier |
| 777 | PUT,PATCH | `/manage-carriers/{manage_carrier}/products/{product}` | manage_carrier, product |
| 772 | DELETE | `/manage-carriers/{manage_carrier}/products/{product}` | manage_carrier, product |

**Manage Carriers > QS Products**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 779 | GET | `/manage-carriers/{manage_carrier}/qs-products/create` | manage_carrier |
| 782 | GET | `/manage-carriers/{manage_carrier}/qs-products` | manage_carrier |
| 791 | GET | `/manage-carriers/{manage_carrier}/qs-products/{qs_product}` | manage_carrier, qs_product |
| 781 | GET | `/manage-carriers/{manage_carrier}/qs-products/{qs_product}/edit` | manage_carrier, qs_product |
| 792 | POST | `/manage-carriers/{manage_carrier}/qs-products` | manage_carrier |
| 802 | PUT,PATCH | `/manage-carriers/{manage_carrier}/qs-products/{qs_product}` | manage_carrier, qs_product |
| 780 | DELETE | `/manage-carriers/{manage_carrier}/qs-products/{qs_product}` | manage_carrier, qs_product |
| 778 | POST | `/manage-carriers/{manage_carrier}/qs-products/{qsProduct}/copy` | manage_carrier, qsProduct |
| 801 | PUT | `/manage-carriers/{manage_carrier}/qs-products/{qsProduct}/archive-toggle` | manage_carrier, qsProduct |

**Manage Carriers > QS Products > QA Bullets**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 783 | GET | `/manage-carriers/{manage_carrier}/qs-products/{qs_product}/qa-bullets/create` | manage_carrier, qs_product |
| 786 | GET | `/manage-carriers/{manage_carrier}/qs-products/{qs_product}/qa-bullets` | manage_carrier, qs_product |
| 788 | GET | `/manage-carriers/{manage_carrier}/qs-products/{qs_product}/qa-bullets/{qa_bullet}` | manage_carrier, qs_product, qa_bullet |
| 785 | GET | `/manage-carriers/{manage_carrier}/qs-products/{qs_product}/qa-bullets/{qa_bullet}/edit` | manage_carrier, qs_product, qa_bullet |
| 789 | POST | `/manage-carriers/{manage_carrier}/qs-products/{qs_product}/qa-bullets` | manage_carrier, qs_product |
| 790 | PUT,PATCH | `/manage-carriers/{manage_carrier}/qs-products/{qs_product}/qa-bullets/{qa_bullet}` | manage_carrier, qs_product, qa_bullet |
| 784 | DELETE | `/manage-carriers/{manage_carrier}/qs-products/{qs_product}/qa-bullets/{qa_bullet}` | manage_carrier, qs_product, qa_bullet |
| 787 | PUT | `/manage-carriers/{manage_carrier}/qs-products/{qsProduct}/qa-bullets-reorder` | manage_carrier, qsProduct |

**Manage Carriers > QS Products > Text Bullets**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 793 | GET | `/manage-carriers/{manage_carrier}/qs-products/{qs_product}/text-bullets/create` | manage_carrier, qs_product |
| 796 | GET | `/manage-carriers/{manage_carrier}/qs-products/{qs_product}/text-bullets` | manage_carrier, qs_product |
| 798 | GET | `/manage-carriers/{manage_carrier}/qs-products/{qs_product}/text-bullets/{text_bullet}` | manage_carrier, qs_product, text_bullet |
| 795 | GET | `/manage-carriers/{manage_carrier}/qs-products/{qs_product}/text-bullets/{text_bullet}/edit` | manage_carrier, qs_product, text_bullet |
| 799 | POST | `/manage-carriers/{manage_carrier}/qs-products/{qs_product}/text-bullets` | manage_carrier, qs_product |
| 800 | PUT,PATCH | `/manage-carriers/{manage_carrier}/qs-products/{qs_product}/text-bullets/{text_bullet}` | manage_carrier, qs_product, text_bullet |
| 794 | DELETE | `/manage-carriers/{manage_carrier}/qs-products/{qs_product}/text-bullets/{text_bullet}` | manage_carrier, qs_product, text_bullet |
| 797 | PUT | `/manage-carriers/{manage_carrier}/qs-products/{qsProduct}/text-bullets-reorder` | manage_carrier, qsProduct |

### Agency Carriers

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 149 | GET | `/agency_carriers/create` | |
| 153 | GET | `/agency_carriers` | |
| 163 | GET | `/agency_carriers/{carrier}` | carrier |
| 151 | GET | `/agency_carriers/{carrier}/edit` | carrier |
| 165 | POST | `/agency_carriers` | |
| 150 | DELETE | `/agency_carriers/{carrier}` | carrier |
| 145 | PUT | `/agency_carriers/{agencyCarrier}/agents` | agencyCarrier |
| 164 | PUT | `/agency_carriers/{agencyCarrier}/states` | agencyCarrier |
| 162 | POST | `/agency_carriers/{carrier}/remove-access` | carrier |
| 146 | DELETE | `/agency_carriers/{agencyCarrier}/brochures/{agencyCarrierBrochure}` | agencyCarrier, agencyCarrierBrochure |
| 147 | POST | `/agency_carriers/{agencyCarrier}/brochures` | agencyCarrier |
| 148 | POST | `/agency_carriers/{agencyCarrier}/brochures/{agencyCarrierBrochure}` | agencyCarrier, agencyCarrierBrochure |
| 154 | POST | `/agency_carriers/{agencyCarrier}/products` | agencyCarrier |
| 156 | PUT | `/agency_carriers/{agencyCarrier}/products/{product}` | agencyCarrier, product |
| 159 | POST | `/agency_carriers/{agencyCarrier}/qs_products` | agencyCarrier |
| 160 | PUT | `/agency_carriers/{agencyCarrier}/qs_products/{qsProduct}/archive` | agencyCarrier, qsProduct |
| 161 | PUT | `/agency_carriers/{agencyCarrier}/qs_products/{qsProduct}` | agencyCarrier, qsProduct |
| 166 | DELETE | `/agency_carriers/{agencyCarrier}/training_resources/{agencyCarrierTraining}` | agencyCarrier, agencyCarrierTraining |
| 167 | POST | `/agency_carriers/{agencyCarrier}/training_resources` | agencyCarrier |
| 168 | POST | `/agency_carriers/{agencyCarrier}/training_resources/{agencyCarrierTraining}` | agencyCarrier, agencyCarrierTraining |
| 155 | POST | `/agency-carrier-products/{product}/toggle-active` | product |
| 157 | POST | `/agency-carrier-products/{product}/update-agency-bucks` | product |
| 158 | POST | `/agency-carrier-products/{product}/update-multiplier` | product |

### Agency Carrier QS Products

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 170 | GET | `/agency_carrier_qs_products/{qsProduct}/qa_bullets` | qsProduct |
| 172 | POST | `/agency_carrier_qs_products/{qsProduct}/qa_bullets` | qsProduct |
| 173 | PUT | `/agency_carrier_qs_products/{qsProduct}/qa_bullets/{qaBullet}` | qsProduct, qaBullet |
| 171 | PUT | `/agency_carrier_qs_products/{qsProduct}/qa-bullets-reorder` | qsProduct |
| 169 | DELETE | `/agency_carrier_qs_products/{qsProduct}/qa_bullets/{qaBullet}` | qsProduct, qaBullet |
| 175 | GET | `/agency_carrier_qs_products/{qsProduct}/text_bullets` | qsProduct |
| 177 | POST | `/agency_carrier_qs_products/{qsProduct}/text_bullets` | qsProduct |
| 178 | PUT | `/agency_carrier_qs_products/{qsProduct}/text_bullets/{textBullet}` | qsProduct, textBullet |
| 176 | PUT | `/agency_carrier_qs_products/{qsProduct}/text-bullets-reorder` | qsProduct |
| 174 | DELETE | `/agency_carrier_qs_products/{qsProduct}/text_bullets/{textBullet}` | qsProduct, textBullet |

### Agency QSP Categories

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 107 | GET | `/agency-qsp-categories/create` | |
| 110 | GET | `/agency-qsp-categories` | |
| 111 | GET | `/agency-qsp-categories/{category}` | category |
| 109 | GET | `/agency-qsp-categories/{category}/edit` | category |
| 112 | POST | `/agency-qsp-categories` | |
| 114 | PUT,PATCH | `/agency-qsp-categories/{category}` | category |
| 108 | DELETE | `/agency-qsp-categories/{category}` | category |
| 113 | PUT | `/agency-qsp-categories/{category}/archive` | category |

### Global QSP Categories

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 536 | GET | `/global-qsp-categories/create` | |
| 539 | GET | `/global-qsp-categories` | |
| 540 | GET | `/global-qsp-categories/{category}` | category |
| 538 | GET | `/global-qsp-categories/{category}/edit` | category |
| 541 | POST | `/global-qsp-categories` | |
| 543 | PUT,PATCH | `/global-qsp-categories/{category}` | category |
| 537 | DELETE | `/global-qsp-categories/{category}` | category |
| 542 | PUT | `/global-qsp-categories/{category}/archive` | category |

### Product Categories

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 806 | GET | `/manage/product-categories` | |
| 807 | PUT | `/manage/product-categories}` | |
| 808 | POST | `/manage/product-categories/updateRankByAllCategories` | |

### Master Carrier Products

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 829 | POST | `/master-carrier-products/{product}/toggle-active` | product |

### Lead Sources

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 649 | GET | `/lead-sources/create` | |
| 652 | GET | `/lead-sources` | |
| 654 | GET | `/lead-sources/{lead_source}` | lead_source |
| 651 | GET | `/lead-sources/{lead_source}/edit` | lead_source |
| 655 | POST | `/lead-sources` | |
| 657 | PUT,PATCH | `/lead-sources/{lead_source}` | lead_source |
| 650 | DELETE | `/lead-sources/{lead_source}` | lead_source |
| 653 | POST | `/lead-sources/{leadSource}/send-doc-instructions` | leadSource |
| 656 | POST | `/lead-sources/{source}/toggle-active` | source |

### Round Robin Groups

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1080 | GET | `/rr_groups/create` | |
| 1084 | GET | `/rr_groups` | |
| 1090 | GET | `/rr_groups/{rr_group}` | rr_group |
| 1083 | GET | `/rr_groups/{rr_group}/edit` | rr_group |
| 1091 | POST | `/rr_groups` | |
| 1092 | PUT,PATCH | `/rr_groups/{rr_group}` | rr_group |
| 1081 | DELETE | `/rr_groups/{rr_group}` | rr_group |
| 1082 | GET | `/rr_groups/{rr_group}/distribution-log` | rr_group |
| 1086 | GET | `/rr_groups/members/{rr_group}` | rr_group |
| 1079 | POST | `/rr_groups/{rr_group}/agents` | rr_group |
| 1077 | DELETE | `/rr_groups/{rr_group}/agents-delete` | rr_group |
| 1078 | PUT | `/rr_groups/{rr_group}/agents/entries` | rr_group |
| 1085 | PUT | `/rr_groups/{rr_group}/members/details` | rr_group |
| 1088 | PUT | `/rr_groups/{rr_group}/members` | rr_group |
| 1075 | PUT | `/rr_group/{rr_group}/lead-program/is_active` | rr_group |
| 1076 | PUT | `/rr_group/{rr_group}/lead-program` | rr_group |
| 1087 | PUT | `/rr_group-members/{member}/override-states` | member |
| 1089 | PUT | `/rr_group-members/{member}/states-used-option` | member |

### Sale Sharing

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1098 | GET | `/sale-sharing/users` | |
| 1099 | GET | `/sale-sharing/mount` | |
| 1100 | POST | `/sale-sharing` | |
| 1096 | GET | `/sale-sharing/{saleSharing}/carriers` | saleSharing |
| 1102 | PUT | `/sale-sharing/{saleSharing}/carriers` | saleSharing |
| 1097 | DELETE | `/sale-sharing/{saleSharing}/destroy` | saleSharing |
| 1101 | POST | `/sale-sharing/{saleSharing}/toggle-active` | saleSharing |

### Transactions

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1212 | GET | `/transaction/{transaction}/beneficiaries` | transaction |
| 1213 | POST | `/transaction/{transaction}/hst-post-sale` | transaction |
| 1214 | POST | `/transaction/{transaction}/hst-sync` | transaction |

### Request Carriers

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1074 | POST | `/request-carriers` | |
| 1073 | POST | `/request-carriers/cancel` | |

### Leaderboard

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 678 | GET | `/leaderboard` | |

---

## 5. Commission & Finance

### Admin Commission Statements

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 25 | GET | `/admin/commission-statements/create` | |
| 29 | GET | `/admin/commission-statements` | |
| 33 | POST | `/admin/commission-statements` | |
| 455 | DELETE | `/admin/commission-statements/{commissionStatement}/destroy` | commissionStatement |
| 26 | GET | `/admin/commission-statements/{commissionStatement}/update` | commissionStatement |
| 35 | POST | `/admin/commission-statements/{commissionStatement}/update` | commissionStatement |
| 27 | GET | `/admin/commission-statements/{commissionStatement}/exportCsv` | commissionStatement |
| 34 | GET | `/admin/commission-statements/{commissionStatement}/summary` | commissionStatement |
| 30 | GET | `/admin/commission-statements/{commissionStatement}/overrides-detail` | commissionStatement |
| 31 | GET | `/admin/commission-statements/{commissionStatement}/personal-production-detail` | commissionStatement |
| 32 | POST | `/admin/commission-statements/{commissionStatement}/publish` | commissionStatement |
| 47 | POST | `/admin/commission-statements/{commissionStatement}/schedule-publish` | commissionStatement |
| 46 | POST | `/admin/commission-statements/{commissionStatement}/remove-scheduled-publish` | commissionStatement |
| 1104 | GET | `/admin/commission-statements/{commissionStatement}/progress` | commissionStatement |
| 28 | POST | `/admin/commission-statements/{user}/files` | user |
| 44 | POST | `/admin/commission-statements/{user}/carrier-agent-id` | user |
| 43 | POST | `/admin/commission-statements/{user}/carrier-agent-id/delete` | user |
| 39 | GET | `/admin/commission-statements/agents` | |
| 37 | GET | `/admin/commission-statements/agents/excluded-pa-ids` | |
| 38 | POST | `/admin/commission-statements/agents/excluded-pa-ids` | |
| 36 | POST | `/admin/commission-statements/agents/excluded-pa-ids/delete` | |
| 42 | GET | `/admin/commission-statements/agents/upload-wa-ids` | |
| 41 | POST | `/admin/commission-statements/agents/upload-wa-ids` | |
| 49 | POST | `/admin/commission-statements/agents/wa-ids` | |
| 48 | POST | `/admin/commission-statements/agents/wa-ids/delete` | |
| 40 | POST | `/admin/commission-statements/update-visible-agencies` | |
| 45 | GET | `/admin/commission-statements/carriers` | |

**Admin Commission Statements > Entries**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 457 | GET | `/admin/commission-statements/{commissionStatement}/entries` | commissionStatement |
| 458 | GET | `/admin/commission-statements/{commissionStatement}/entries/{entry}` | commissionStatement, entry |
| 459 | PUT | `/admin/commission-statements/{commissionStatement}/entries/{entry}` | commissionStatement, entry |
| 456 | DELETE | `/admin/commission-statements/{commissionStatement}/entries/{entry}` | commissionStatement, entry |

**Admin Commission Statements > Duplicate Rows**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 446 | GET | `/admin/commission-statements/{commissionStatement}/duplicate-rows` | commissionStatement |
| 447 | GET | `/admin/commission-statements/{commissionStatement}/duplicate-rows/{row}` | commissionStatement, row |
| 448 | POST | `/admin/commission-statements/{commissionStatement}/duplicate-rows/{row}` | commissionStatement, row |
| 445 | DELETE | `/admin/commission-statements/{commissionStatement}/duplicate-rows/{row}` | commissionStatement, row |

**Admin Commission Statements > Failed Rows**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 450 | GET | `/admin/commission-statements/{commissionStatement}/failed-rows` | commissionStatement |
| 451 | GET | `/admin/commission-statements/{commissionStatement}/failed-rows/{row}` | commissionStatement, row |
| 452 | POST | `/admin/commission-statements/{commissionStatement}/failed-rows/{row}` | commissionStatement, row |
| 453 | POST | `/admin/commission-statements/{commissionStatement}/failed-rows/{row}/store-user` | commissionStatement, row |
| 449 | DELETE | `/admin/commission-statements/{commissionStatement}/failed-rows/{row}` | commissionStatement, row |

### Agency Admin Commission Statements

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 99 | GET | `/agency-admin/commission-statements` | |
| 98 | GET | `/agency-admin/commission-statements/{commissionStatement}/exportCsv` | commissionStatement |
| 104 | GET | `/agency-admin/commission-statements/{commissionStatement}/summary` | commissionStatement |
| 100 | GET | `/agency-admin/commission-statements/{commissionStatement}/overrides-detail` | commissionStatement |
| 101 | GET | `/agency-admin/commission-statements/{commissionStatement}/personal-production-detail` | commissionStatement |
| 102 | GET | `/agency-admin/commission-statements/search` | |
| 103 | GET | `/agency-admin/commission-statements/search-export` | |

### Agent Commission Statements

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 239 | GET | `/commission-statements` | |
| 236 | GET | `/commission-statements/{commissionStatement}/exportCsv` | commissionStatement |
| 244 | GET | `/commission-statements/{commissionStatement}/summary` | commissionStatement |
| 240 | GET | `/commission-statements/{commissionStatement}/overrides-detail` | commissionStatement |
| 241 | GET | `/commission-statements/{commissionStatement}/personal-production-detail` | commissionStatement |
| 242 | GET | `/commission-statements/search` | |
| 243 | GET | `/commission-statements/search-export` | |
| 238 | GET | `/commission-statements/files` | |
| 237 | DELETE | `/commission-statements/files/{agentFile}` | agentFile |
| 454 | GET | `/commission-statements/client-payout-history/{entry}` | entry |

### Commissions Authorization

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 460 | POST | `/commissions/authorize` | |

### Balance Management

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 181 | GET | `/balance-management` | |

### Credits & Cards

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1258 | GET | `/users/{user}/credits` | user |
| 1257 | GET | `/users/{user}/credits/export` | user |
| 1256 | GET | `/users/{user}/credit-adjustment` | user |
| 1255 | POST | `/users/{user}/credit-adjustment` | user |
| 1259 | POST | `/users/{user}/purchase-credits` | user |
| 1260 | POST | `/users/{user}/transfer` | user |
| 1254 | POST | `/users/{user}/cards` | user |
| 1252 | POST | `/users/{user}/cards-remove` | user |
| 1253 | POST | `/users/{user}/cards-set-primary` | user |
| 1245 | GET | `/users/{user}/bucket-sharing/{ownerUser}/balance` | user, ownerUser |
| 1246 | POST | `/users/{user}/bucket-sharing/{ownerUser}/balance/purchase` | user, ownerUser |
| 1247 | POST | `/users/{user}/bucket-sharing/{ownerUser}/cards/remove` | user, ownerUser |
| 1248 | POST | `/users/{user}/bucket-sharing/{ownerUser}/cards/set-primary` | user, ownerUser |
| 1249 | POST | `/users/{user}/bucket-sharing/{ownerUser}/cards` | user, ownerUser |
| 1105 | GET | `/users/{user}/setup-intent` | user |
| 1106 | GET | `/users/{user}/setup-intent-bucket-sharing/{ownerUser}` | user, ownerUser |

---

## 6. Recruiting

### Recruiting Leads

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 938 | GET | `/recruiting-leads/create` | |
| 941 | GET | `/recruiting-leads` | |
| 943 | GET | `/recruiting-leads/{recruiting_lead}` | recruiting_lead |
| 940 | GET | `/recruiting-leads/{recruiting_lead}/edit` | recruiting_lead |
| 945 | POST | `/recruiting-leads` | |
| 946 | PUT,PATCH | `/recruiting-leads/{recruiting_lead}` | recruiting_lead |
| 939 | DELETE | `/recruiting-leads/{recruiting_lead}` | recruiting_lead |
| 944 | GET | `/recruiting-leads-stats/stats` | |
| 942 | GET | `/recruiting-leads-stats/pending-contracting-list` | |

### Recruiting Sources

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 954 | GET | `/recruiting-sources/create` | |
| 957 | GET | `/recruiting-sources` | |
| 958 | GET | `/recruiting-sources/{recruiting_source}` | recruiting_source |
| 956 | GET | `/recruiting-sources/{recruiting_source}/edit` | recruiting_source |
| 959 | POST | `/recruiting-sources` | |
| 960 | PUT,PATCH | `/recruiting-sources/{recruiting_source}` | recruiting_source |
| 955 | DELETE | `/recruiting-sources/{recruiting_source}` | recruiting_source |

### Recruiting Locations

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 947 | GET | `/recruiting-locations/create` | |
| 950 | GET | `/recruiting-locations` | |
| 951 | GET | `/recruiting-locations/{recruiting_location}` | recruiting_location |
| 949 | GET | `/recruiting-locations/{recruiting_location}/edit` | recruiting_location |
| 952 | POST | `/recruiting-locations` | |
| 953 | PUT,PATCH | `/recruiting-locations/{recruiting_location}` | recruiting_location |
| 948 | DELETE | `/recruiting-locations/{recruiting_location}` | recruiting_location |

### Recruiting Tasks

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 961 | GET | `/recruiting-tasks/create` | |
| 964 | GET | `/recruiting-tasks` | |
| 965 | GET | `/recruiting-tasks/{recruiting_task}` | recruiting_task |
| 963 | GET | `/recruiting-tasks/{recruiting_task}/edit` | recruiting_task |
| 966 | POST | `/recruiting-tasks` | |
| 967 | PUT,PATCH | `/recruiting-tasks/{recruiting_task}` | recruiting_task |
| 962 | DELETE | `/recruiting-tasks/{recruiting_task}` | recruiting_task |

### Recruiting Action Schedules

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 916 | GET | `/recruiting-action-schedules/create` | |
| 919 | GET | `/recruiting-action-schedules` | |
| 920 | GET | `/recruiting-action-schedules/{recruiting_action_schedule}` | recruiting_action_schedule |
| 918 | GET | `/recruiting-action-schedules/{recruiting_action_schedule}/edit` | recruiting_action_schedule |
| 921 | POST | `/recruiting-action-schedules` | |
| 922 | PUT,PATCH | `/recruiting-action-schedules/{recruiting_action_schedule}` | recruiting_action_schedule |
| 917 | DELETE | `/recruiting-action-schedules/{recruiting_action_schedule}` | recruiting_action_schedule |

### Recruiting Email Templates

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 931 | GET | `/recruiting-email-templates/create` | |
| 934 | GET | `/recruiting-email-templates` | |
| 935 | GET | `/recruiting-email-templates/{recruiting_email_template}` | recruiting_email_template |
| 933 | GET | `/recruiting-email-templates/{recruiting_email_template}/edit` | recruiting_email_template |
| 936 | POST | `/recruiting-email-templates` | |
| 937 | PUT,PATCH | `/recruiting-email-templates/{recruiting_email_template}` | recruiting_email_template |
| 932 | DELETE | `/recruiting-email-templates/{recruiting_email_template}` | recruiting_email_template |

### Recruiting Text Templates

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 968 | GET | `/recruiting-text-templates/create` | |
| 971 | GET | `/recruiting-text-templates` | |
| 972 | GET | `/recruiting-text-templates/{recruiting_text_template}` | recruiting_text_template |
| 970 | GET | `/recruiting-text-templates/{recruiting_text_template}/edit` | recruiting_text_template |
| 973 | POST | `/recruiting-text-templates` | |
| 974 | PUT,PATCH | `/recruiting-text-templates/{recruiting_text_template}` | recruiting_text_template |
| 969 | DELETE | `/recruiting-text-templates/{recruiting_text_template}` | recruiting_text_template |

### Recruiting Voicemail Scripts

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 975 | GET | `/recruiting-voicemail-scripts/create` | |
| 978 | GET | `/recruiting-voicemail-scripts` | |
| 979 | GET | `/recruiting-voicemail-scripts/{recruiting_voicemail_script}` | recruiting_voicemail_script |
| 977 | GET | `/recruiting-voicemail-scripts/{recruiting_voicemail_script}/edit` | recruiting_voicemail_script |
| 980 | POST | `/recruiting-voicemail-scripts` | |
| 981 | PUT,PATCH | `/recruiting-voicemail-scripts/{recruiting_voicemail_script}` | recruiting_voicemail_script |
| 976 | DELETE | `/recruiting-voicemail-scripts/{recruiting_voicemail_script}` | recruiting_voicemail_script |

### Recruiting Custom Tags

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 923 | GET | `/recruiting-custom-tag/create` | |
| 926 | GET | `/recruiting-custom-tag` | |
| 927 | GET | `/recruiting-custom-tag/{recruiting_custom_tag}` | recruiting_custom_tag |
| 925 | GET | `/recruiting-custom-tag/{recruiting_custom_tag}/edit` | recruiting_custom_tag |
| 928 | POST | `/recruiting-custom-tag` | |
| 929 | PUT,PATCH | `/recruiting-custom-tag/{recruiting_custom_tag}` | recruiting_custom_tag |
| 924 | DELETE | `/recruiting-custom-tag/{recruiting_custom_tag}` | recruiting_custom_tag |
| 930 | GET | `/recruiting-custom-tag/{recruitingCustomTag}/view` | recruitingCustomTag |

---

## 7. Operations

### Calendar

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 434 | GET | `/calendar/{user?}` | user (optional) |
| 435 | GET | `/mobile-calendar-info` | |
| 436 | POST | `/send-mobile-calendar-link` | |
| 849 | GET | `/mobile-calendar/{apiKey}` | apiKey |
| 850 | GET | `/mobile-calendar-events/{apiKey}` | apiKey |

**Calendar Events**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 426 | GET | `/calendar-events` | |
| 427 | GET | `/calendar-events/{calendar_event}` | calendar_event |
| 428 | POST | `/calendar-events` | |
| 429 | PUT,PATCH | `/calendar-events/{calendar_event}` | calendar_event |
| 425 | DELETE | `/calendar-events/{calendar_event}` | calendar_event |

**Calendar Sharing**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 432 | GET | `/calendar-sharing` | |
| 431 | GET | `/calendar-sharing/get-all-shared` | |
| 430 | POST | `/calendar-sharing/bulk-update` | |
| 433 | POST | `/calendar-sharing/update-agent/{user}` | user |

### Meetings

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 831 | GET | `/meetings/create` | |
| 833 | GET | `/meetings` | |
| 834 | GET | `/meetings/{event}` | event |
| 835 | POST | `/meetings` | |
| 836 | PUT | `/meetings/{event}` | event |
| 832 | DELETE | `/meetings/{event}` | event |
| 528 | GET | `/expired-meetings` | |
| 461 | GET | `/confirm-appointment/{uuid}` | uuid |
| 462 | GET | `/appt-confirmed/{uuid}` | uuid |
| 861 | POST | `/personal-appointments/{calendarEvent}/markComplete` | calendarEvent |

### Appointment Reminders

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 329 | GET | `/appt-reminder` | |
| 330 | POST | `/appt-reminder` | |

### Tasks

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1155 | GET | `/tasks` | |
| 1156 | POST | `/tasks` | |
| 1157 | PUT | `/tasks/{task}` | task |
| 1154 | DELETE | `/tasks/{task}` | task |

### Agency Tasks

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 116 | GET | `/agency-tasks` | |
| 117 | POST | `/agency-tasks` | |
| 118 | PUT | `/agency-tasks/{task}` | task |
| 115 | DELETE | `/agency-tasks/{task}` | task |

### Todo List

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1211 | POST | `/todo-list` | |
| 1210 | PUT | `/todo-list/{todoList}/update` | todoList |

### Time Off

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1203 | GET | `/timeoff/create` | |
| 1206 | GET | `/timeoff` | |
| 1207 | GET | `/timeoff/{timeoff}` | timeoff |
| 1205 | GET | `/timeoff/{timeoff}/edit` | timeoff |
| 1208 | POST | `/timeoff` | |
| 1209 | PUT,PATCH | `/timeoff/{timeoff}` | timeoff |
| 1204 | DELETE | `/timeoff/{timeoff}` | timeoff |

### Working Hours

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 851 | GET | `/my-working-hours` | |
| 852 | POST | `/my-working-hours` | |
| 628 | GET | `/lead-hours` | |
| 629 | POST | `/lead-hours` | |

### Bookmarks

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 390 | GET | `/bookmarks/create` | |
| 393 | GET | `/bookmarks` | |
| 394 | GET | `/bookmarks/{bookmark}` | bookmark |
| 392 | GET | `/bookmarks/{bookmark}/edit` | bookmark |
| 395 | POST | `/bookmarks` | |
| 396 | PUT,PATCH | `/bookmarks/{bookmark}` | bookmark |
| 391 | DELETE | `/bookmarks/{bookmark}` | bookmark |

### Team Directory

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1158 | GET | `/team-directory/create` | |
| 1162 | GET | `/team-directory` | |
| 1163 | GET | `/team-directory/{team_directory}` | team_directory |
| 1160 | GET | `/team-directory/{team_directory}/edit` | team_directory |
| 1161 | GET | `/team-directory/has-accesses` | |
| 1164 | POST | `/team-directory` | |
| 1165 | PUT,PATCH | `/team-directory/{team_directory}` | team_directory |
| 1159 | DELETE | `/team-directory/{team_directory}` | team_directory |

### Training

**Agency Training**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 120 | GET | `/agency-training/create` | |
| 123 | GET | `/agency-training` | |
| 127 | GET | `/agency-training/{agency_training}` | agency_training |
| 122 | GET | `/agency-training/{agency_training}/edit` | agency_training |
| 128 | POST | `/agency-training` | |
| 129 | PUT,PATCH | `/agency-training/{agency_training}` | agency_training |
| 121 | DELETE | `/agency-training/{agency_training}` | agency_training |
| 119 | POST | `/agency-training/{agency_training}/agents` | agency_training |
| 125 | POST | `/agency-training/{agency_training}/resources` | agency_training |
| 126 | PUT | `/agency-training/{agency_training}/resources/{resource}` | agency_training, resource |
| 124 | DELETE | `/agency-training/{agency_training}/resources/{resource}/delete` | agency_training, resource |

**System Training Admin**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1142 | GET | `/system-training-admin/create` | |
| 1145 | GET | `/system-training-admin` | |
| 1149 | GET | `/system-training-admin/{system_training_admin}` | system_training_admin |
| 1144 | GET | `/system-training-admin/{system_training_admin}/edit` | system_training_admin |
| 1150 | POST | `/system-training-admin` | |
| 1151 | PUT,PATCH | `/system-training-admin/{system_training_admin}` | system_training_admin |
| 1143 | DELETE | `/system-training-admin/{system_training_admin}` | system_training_admin |
| 1147 | POST | `/system-training-admin/{systemTrainingAdmin}/resources` | systemTrainingAdmin |
| 1148 | PUT | `/system-training-admin/{systemTrainingAdmin}/resources/{resource}` | systemTrainingAdmin, resource |
| 1146 | DELETE | `/system-training-admin/{systemTrainingAdmin}/resources/{resource}/delete` | systemTrainingAdmin, resource |

**System Training (User-facing)**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1153 | GET | `/system-training/{feature}` | feature |
| 1152 | POST | `/system-training/{feature}/agent-notes` | feature |

### Dashboard

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 472 | GET | `/dashboard` | |
| 473 | GET | `/dashboard/activity-stats` | |
| 474 | GET | `/dashboard/call-activity-stats` | |
| 475 | GET | `/dashboard/export/birthdays` | |
| 476 | GET | `/dashboard/user-tasks/{user}` | user |
| 477 | POST | `/dashboard/widgets/hide` | |
| 478 | POST | `/dashboard/widgets/update-order` | |
| 658 | POST | `/lead-widgets-order` | |

### Notifications

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 534 | PUT | `/global-notifies/{globalNotify}/expire` | globalNotify |
| 535 | GET | `/global-notifies` | |
| 853 | POST | `/notifications/{id}/mark-as-read` | id |
| 854 | POST | `/notifications/mark-as-read-invalid-smtp-auth` | |

### Support

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1139 | GET | `/support` | |
| 1140 | POST | `/support` | |

---

## 8. Import/Export

### Book of Business Upload

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 383 | GET | `/bob-upload` | |
| 389 | POST | `/bob-upload/upload` | |
| 377 | GET | `/bob-upload/download-template` | |
| 374 | POST | `/bob-upload/assign-carrier` | |
| 381 | GET | `/bob-upload/get-agency-carriers` | |
| 382 | GET | `/bob-upload/agency-data` | |
| 375 | GET | `/bob-upload/{book_of_business_upload_session}/complete-stats` | book_of_business_upload_session |
| 376 | GET | `/bob-upload/{book_of_business_upload_session}/complete-stats/export` | book_of_business_upload_session |
| 386 | GET | `/bob-upload/session-status/{book_of_business_upload_session}` | book_of_business_upload_session |
| 378 | GET | `/bob-upload/session/{book_of_business_upload_session}/duplicates` | book_of_business_upload_session |
| 379 | GET | `/bob-upload/session/{book_of_business_upload_session}/duplicates/{lead_row}/list` | book_of_business_upload_session, lead_row |
| 380 | POST | `/bob-upload/session/{book_of_business_upload_session}/duplicates` | book_of_business_upload_session |
| 384 | GET | `/bob-upload/session/{book_of_business_upload_session}/missing-data` | book_of_business_upload_session |
| 385 | POST | `/bob-upload/session/{book_of_business_upload_session}/missing-data` | book_of_business_upload_session |
| 387 | GET | `/bob-upload/session/{book_of_business_upload_session}/unmatched-transactions` | book_of_business_upload_session |
| 388 | POST | `/bob-upload/session/{book_of_business_upload_session}/unmatched-transactions` | book_of_business_upload_session |

### Policy Imports

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 872 | GET | `/policy-imports/create` | |
| 876 | GET | `/policy-imports` | |
| 877 | GET | `/policy-imports/{policy_import}` | policy_import |
| 874 | GET | `/policy-imports/{policy_import}/edit` | policy_import |
| 878 | POST | `/policy-imports` | |
| 879 | PUT,PATCH | `/policy-imports/{policy_import}` | policy_import |
| 873 | DELETE | `/policy-imports/{policy_import}` | policy_import |
| 875 | POST | `/policy-imports/import` | |

### Bucket Imports

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 398 | GET | `/bucket-imports/{bucketImport}/duplicate-rows` | bucketImport |
| 397 | DELETE | `/bucket-imports/{bucketImport}/duplicate-rows/{bucketImportRow}` | bucketImport, bucketImportRow |
| 399 | GET | `/bucket-imports/{bucketImport}/merge-row/{bucketImportRow}` | bucketImport, bucketImportRow |
| 400 | POST | `/bucket-imports/{bucketImport}/merge-row/{bucketImportRow}` | bucketImport, bucketImportRow |
| 402 | GET | `/bucket-imports/{bucketImport}/failed-rows` | bucketImport |
| 403 | GET | `/bucket-imports/{bucketImport}/failed-rows/{bucketImportRow}` | bucketImport, bucketImportRow |
| 404 | POST | `/bucket-imports/{bucketImport}/failed-rows/{bucketImportRow}` | bucketImport, bucketImportRow |
| 401 | DELETE | `/bucket-imports/{bucketImport}/failed-rows/{bucketImportRow}` | bucketImport, bucketImportRow |
| 405 | GET | `/bucket-imports/{bucketImport}/progress` | bucketImport |

### CSV Export

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 638 | GET | `/leads-export-csv` | |

### Lead Capture

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 659 | GET | `/lead-capture` | |
| 660 | POST | `/lead-capture` | |

---

## 9. Admin & Config

### API Keys

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 299 | GET | `/api-keys/create` | |
| 301 | GET | `/api-keys` | |
| 302 | POST | `/api-keys` | |
| 303 | PUT,PATCH | `/api-keys/{api_key}` | api_key |
| 300 | DELETE | `/api-keys/{api_key}` | api_key |

### Billing -- Agency Subscription

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 141 | GET | `/billing/agency-subscription-billing-info` | |
| 142 | PUT | `/billing/agency-subscription-billing-info/billing-option` | |
| 144 | GET | `/billing/agency-subscription-invoices` | |
| 143 | GET | `/billing/agency-subscription-invoices/{invoice}/download` | invoice |

### Billing -- Agent Subscription

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 246 | GET | `/billing/agent-subscription-billing-info` | |
| 247 | GET | `/billing/agent-subscription-invoices` | |
| 1107 | POST | `/billing/agent-subscription-invoices/{invoice}/pay` | invoice |
| 248 | GET | `/billing/agent-billing/marketplace-cards` | |

### Billing -- Global Subscription

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 544 | GET | `/billing/global-subscription-billing-info/setup-intent` | |
| 545 | POST | `/billing/global-subscription-billing-info` | |

### Billing -- Subscription Invoices

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1108 | GET | `/billing/subscription-invoices/{invoiceNumber}/receipt-pdf` | invoiceNumber |
| 1109 | GET | `/billing/subscription-invoices/{invoiceNumber}/receipt` | invoiceNumber |
| 1110 | GET | `/billing/subscription-invoices/{invoiceNumber}/receipt-old` | invoiceNumber |

### Billing -- Super Admin

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1127 | GET | `/billing/sa-subscription-agencies` | |
| 1131 | GET | `/billing/sa-subscription-agencies/{agency}` | agency |
| 1124 | GET | `/billing/sa-subscription-agencies/{agency}/agents` | agency |
| 1123 | GET | `/billing/sa-subscription-agencies/{agency}/agents/{user}/accounts-paying-for` | agency, user |
| 1125 | POST | `/billing/sa-subscription-agencies/{agency}/agents/{user}/suspend` | agency, user |
| 1126 | POST | `/billing/sa-subscription-agencies/{agency}/agents/{user}/unsuspend` | agency, user |
| 1120 | GET | `/billing/sa-subscription-agencies/{agency}/agent-fee-overrides` | agency |
| 1121 | POST | `/billing/sa-subscription-agencies/{agency}/agent-fee-overrides` | agency |
| 1122 | PUT | `/billing/sa-subscription-agencies/{agency}/agent-fee-overrides/{override}` | agency, override |
| 1119 | DELETE | `/billing/sa-subscription-agencies/{agency}/agent-fee-overrides/{override}` | agency, override |
| 1129 | GET | `/billing/sa-subscription-agencies/{agency}/leader-pays` | agency |
| 1130 | POST | `/billing/sa-subscription-agencies/{agency}/leader-pays` | agency |
| 1128 | DELETE | `/billing/sa-subscription-agencies/{agency}/leader-pays/{leaderPay}` | agency, leaderPay |
| 1132 | POST | `/billing/sa-subscription-agencies/{agency}/billing-option` | agency |
| 1133 | POST | `/billing/sa-subscription-agencies/{agency}/billing-start-date` | agency |
| 1134 | POST | `/billing/sa-subscription-agencies/{agency}/free-look-period` | agency |
| 1135 | POST | `/billing/sa-subscription-agencies/{agency}/agent-fee` | agency |
| 1136 | GET | `/billing/sa-subscription-invoices` | |
| 1137 | POST | `/billing/sa-subscription-invoices/{invoice}/void` | invoice |

### Stripe

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 443 | GET | `/stripe/payment/{id}` | id |
| 444 | POST | `/stripe/webhook` | |

### User Settings

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1239 | GET | `/user-settings/general` | |
| 1235 | POST | `/user-settings/change-password` | |
| 1240 | PUT | `/user-settings/my-info` | |
| 1236 | PUT | `/user-settings/hst-credentials` | |
| 1237 | DELETE | `/user-settings/hst-credentials` | |
| 1238 | PUT | `/user-settings/hst-credentials/ignore-warning` | |
| 1241 | PUT | `/user-settings/update-smtp-configuration` | |
| 1242 | PUT | `/user-settings/update-alert-settings` | |
| 1243 | PUT | `/user-settings/update-primary-mail-transport` | |
| 1244 | POST | `/user-settings/upload-profile-picture` | |

### Impersonation

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 581 | GET | `/impersonate/user/{user}` | user |
| 582 | GET | `/impersonate/end` | |
| 758 | GET | `/login-as/{other_user}` | other_user |
| 756 | GET | `/login-as/leave` | |

### DNC Keys

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 136 | GET | `/agency/dnc-keys` | |
| 138 | POST | `/agency/dnc-keys` | |
| 139 | PUT | `/agency/dnc-keys/{key}` | key |
| 135 | DELETE | `/agency/dnc-keys/{key}` | key |
| 137 | POST | `/agency/dnc-keys/{key}/share` | key |
| 140 | POST | `/agency/dnc-keys/verify-password` | |

### Blacklist

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 372 | GET | `/blacklist` | |
| 373 | POST | `/blacklist` | |
| 371 | DELETE | `/blacklist/{blacklist}` | blacklist |
| 1117 | GET | `/super-admin/blacklist` | |
| 1118 | POST | `/super-admin/blacklist` | |
| 1116 | DELETE | `/super-admin-blacklist/{blacklist}` | blacklist |

### Super Admin Tools

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1112 | GET | `/super-admin-tools/email-template-test` | |
| 1114 | GET | `/super-admin-tools/email-template-test/templates` | |
| 1115 | GET | `/super-admin-tools/email-template-test/users` | |
| 1111 | GET | `/super-admin-tools/email-template-test/check-schedule` | |
| 1113 | POST | `/super-admin-tools/email-template-test/send` | |

### Authentication

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 757 | GET | `/login` | |
| 759 | POST | `/logout` | |
| 857 | GET | `/forgot-password` | |
| 856 | POST | `/forgot-password` | |
| 858 | GET | `/reset-password/{token}` | token |
| 859 | POST | `/reset-password` | |
| 855 | GET | `/confirm-password` | |
| 1261 | GET | `/verify-email` | |
| 1263 | GET | `/verify-email/{id}/{hash}` | id, hash |
| 1262 | POST | `/email/verification-notification` | |
| 1264 | POST | `/verify-credentials` | |
| 1266 | GET | `/verify2fa` | |
| 1267 | POST | `/verify2fa` | |
| 1265 | POST | `/verify2fa-resend` | |
| 298 | POST | `/agree-to-eula` | |
| 527 | GET | `/eula` | |

### Docs

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 489 | GET | `/docs` | |
| 486 | GET | `/docs/bucket-lead-upload` | |
| 487 | GET | `/docs/feed-api` | |
| 488 | GET | `/docs/incoming-sales` | |
| 525 | GET | `/pdf/email-deliverability-faqs` | |

### Misc Admin

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 105 | GET | `/agency-logo` | |
| 106 | POST | `/agency-logo` | |
| 824 | PUT | `/filtered-states/{user}` | user |
| 529 | POST | `/files/authorize` | |
| 530 | POST | `/files/authorize-send` | |
| 1138 | GET | `/super-search` | |
| 583 | POST | `/internal/keyword-serach` | |
| 1103 | GET | `/sanctum/csrf-cookie` | |
| 304 | GET | `/api/check-duplicate-leads` | |
| 312 | GET | `/api/action-search` | |
| 314 | GET | `/api/agents-search` | |
| 315 | GET | `/api/automatable_entities/{entity}/tasks` | entity |
| 316 | GET | `/api/automatable_entities/{entity}/triggers` | entity |
| 317 | GET | `/api/lead-logins/{leadLogin}/show-password` | leadLogin |
| 328 | GET | `/api/user-email-check` | |
| 830 | GET | `/medication-password-checked-recently/{lead}` | lead |

### Horizon (Queue Dashboard)

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 557 | GET | `/horizon/{view?}` | view (optional) |
| 574 | GET | `/horizon/api/stats` | |
| 575 | GET | `/horizon/api/workload` | |
| 564 | GET | `/horizon/api/masters` | |
| 569 | GET | `/horizon/api/jobs/pending` | |
| 554 | GET | `/horizon/api/jobs/completed` | |
| 555 | GET | `/horizon/api/jobs/failed` | |
| 556 | GET | `/horizon/api/jobs/failed/{id}` | id |
| 573 | GET | `/horizon/api/jobs/silenced` | |
| 563 | GET | `/horizon/api/jobs/{id}` | id |
| 572 | POST | `/horizon/api/jobs/retry/{id}` | id |
| 558 | GET | `/horizon/api/batches` | |
| 560 | GET | `/horizon/api/batches/{id}` | id |
| 559 | POST | `/horizon/api/batches/retry/{id}` | id |
| 561 | GET | `/horizon/api/metrics/jobs` | |
| 562 | GET | `/horizon/api/metrics/jobs/{id}` | id |
| 570 | GET | `/horizon/api/metrics/queues` | |
| 571 | GET | `/horizon/api/metrics/queues/{id}` | id |
| 567 | GET | `/horizon/api/monitoring` | |
| 566 | GET | `/horizon/api/monitoring/{tag}` | tag |
| 568 | POST | `/horizon/api/monitoring` | |
| 565 | DELETE | `/horizon/api/monitoring/{tag}` | tag |

### Debugbar

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 479 | GET | `/_debugbar/assets/stylesheets` | |
| 480 | GET | `/_debugbar/assets/javascript` | |
| 481 | DELETE | `/_debugbar/cache/{key}/{tags?}` | key, tags (optional) |
| 482 | GET | `/_debugbar/clockwork/{id}` | id |
| 483 | GET | `/_debugbar/open` | |
| 484 | POST | `/_debugbar/queries/explain` | |

### Ignition

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 578 | POST | `/_ignition/execute-solution` | |
| 579 | GET | `/_ignition/health-check` | |
| 580 | POST | `/_ignition/update-config` | |

---

## 10. Lead Management

### Lead Sharing

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 224 | POST | `/agent-lead-share/{lead}` | lead |
| 223 | GET | `/agent-lead-share/{lead}/agents-search` | lead |
| 222 | DELETE | `/agent-lead-share/{lead}/agents/{agent}` | lead, agent |

### Mass Transfer

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 827 | GET | `/mass-transfer` | |
| 825 | POST | `/mass-transfer/count-leads` | |
| 826 | POST | `/mass-transfer/get-leads` | |
| 828 | POST | `/mass-transfer/process` | |

### Agent Transfer

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 225 | GET | `/agent-transfer/{user}/agencies` | user |
| 226 | GET | `/agent-transfer/{user}/transfer` | user |
| 227 | POST | `/agent-transfer/{user}/transfer` | user |

### Lead Forms

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 620 | GET | `/lead-forms/create` | |
| 623 | GET | `/lead-forms` | |
| 625 | GET | `/lead-forms/{lead_form}` | lead_form |
| 622 | GET | `/lead-forms/{lead_form}/edit` | lead_form |
| 626 | POST | `/lead-forms` | |
| 627 | PUT,PATCH | `/lead-forms/{lead_form}` | lead_form |
| 621 | DELETE | `/lead-forms/{lead_form}` | lead_form |
| 624 | PUT | `/lead-forms/{lead_form}/set-active` | lead_form |

### Agent Forms

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 206 | GET | `/agent-form/create` | |
| 211 | GET | `/agent-form` | |
| 217 | GET | `/agent-form/{agent_form}` | agent_form |
| 209 | GET | `/agent-form/{agent_form}/edit` | agent_form |
| 218 | POST | `/agent-form` | |
| 220 | PUT,PATCH | `/agent-form/{agent_form}` | agent_form |
| 207 | DELETE | `/agent-form/{agent_form}` | agent_form |
| 210 | PUT | `/agent-form/{agentForm}/fields` | agentForm |
| 212 | GET | `/agent-form/{agentForm}/lead-list` | agentForm |
| 205 | POST | `/agent-form/{agentForm}/archive` | agentForm |
| 219 | POST | `/agent-form/{agentForm}/unarchive` | agentForm |
| 208 | POST | `/agent-form/{agentForm}/duplicate` | agentForm |
| 221 | POST | `/agent-form/update-logo` | |
| 213 | GET | `/agent-form/{agentForm}/qr/to-email` | agentForm |
| 214 | POST | `/agent-form/{agentForm}/qr/generate` | agentForm |
| 215 | GET | `/agent-form/{agentForm}/qr/image-download` | agentForm |
| 216 | GET | `/agent-form/{agentForm}/qr/pdf-download` | agentForm |

### Agent Form Templates

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 197 | GET | `/agent-form-templates/create` | |
| 201 | GET | `/agent-form-templates` | |
| 202 | GET | `/agent-form-templates/{agent_form_template}` | agent_form_template |
| 199 | GET | `/agent-form-templates/{agent_form_template}/edit` | agent_form_template |
| 203 | POST | `/agent-form-templates` | |
| 204 | PUT,PATCH | `/agent-form-templates/{agent_form_template}` | agent_form_template |
| 198 | DELETE | `/agent-form-templates/{agent_form_template}` | agent_form_template |
| 200 | PUT | `/agent-form-templates/{agentFormTemplate}/fields` | agentFormTemplate |

### Agent Form Submissions

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 190 | GET | `/agent-form-submissions/create` | |
| 193 | GET | `/agent-form-submissions` | |
| 194 | GET | `/agent-form-submissions/{agent_form_submission}` | agent_form_submission |
| 192 | GET | `/agent-form-submissions/{agent_form_submission}/edit` | agent_form_submission |
| 195 | POST | `/agent-form-submissions` | |
| 196 | PUT,PATCH | `/agent-form-submissions/{agent_form_submission}` | agent_form_submission |
| 191 | DELETE | `/agent-form-submissions/{agent_form_submission}` | agent_form_submission |

### Lead Segments

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 639 | GET | `/lead-segments/create` | |
| 642 | GET | `/lead-segments` | |
| 645 | GET | `/lead-segments/{lead_segment}` | lead_segment |
| 641 | GET | `/lead-segments/{lead_segment}/edit` | lead_segment |
| 644 | GET | `/lead-segments/list` | |
| 646 | GET | `/lead-segments/showLeads` | |
| 647 | POST | `/lead-segments` | |
| 643 | POST | `/lead-segments/list` | |
| 648 | PUT,PATCH | `/lead-segments/{lead_segment}` | lead_segment |
| 640 | DELETE | `/lead-segments/{lead_segment}` | lead_segment |

### Custom Tags

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 463 | GET | `/custom-tags/create` | |
| 466 | GET | `/custom-tags` | |
| 467 | GET | `/custom-tags-search` | |
| 468 | GET | `/custom-tags/{custom_tag}` | custom_tag |
| 465 | GET | `/custom-tags/{custom_tag}/edit` | custom_tag |
| 471 | GET | `/custom-tags/{custom_tag}/view` | custom_tag |
| 469 | POST | `/custom-tags` | |
| 470 | PUT,PATCH | `/custom-tags/{custom_tag}` | custom_tag |
| 464 | DELETE | `/custom-tags/{custom_tag}` | custom_tag |

### Lead Custom Tags

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 611 | GET | `/lead-custom-tags/{lead_custom_tag}/lead/create` | lead_custom_tag |
| 614 | GET | `/lead-custom-tags/{lead_custom_tag}/lead` | lead_custom_tag |
| 615 | GET | `/lead-custom-tags/{lead_custom_tag}/lead/{lead}` | lead_custom_tag, lead |
| 613 | GET | `/lead-custom-tags/{lead_custom_tag}/lead/{lead}/edit` | lead_custom_tag, lead |
| 616 | POST | `/lead-custom-tags/{lead_custom_tag}/lead` | lead_custom_tag |
| 617 | PUT,PATCH | `/lead-custom-tags/{lead_custom_tag}/lead/{lead}` | lead_custom_tag, lead |
| 612 | DELETE | `/lead-custom-tags/{lead_custom_tag}/lead/{lead}` | lead_custom_tag, lead |

### Lead Redirect Configs

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 630 | GET | `/lead-redirect-configs/create` | |
| 632 | GET | `/lead-redirect-configs` | |
| 633 | GET | `/lead-redirect-configs/{config}` | config |
| 634 | POST | `/lead-redirect-configs` | |
| 635 | POST | `/lead-redirect-configs/{config}/update` | config |
| 631 | DELETE | `/lead-redirect-configs/{config}` | config |

### Consent Management

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 309 | POST | `/api/consents-create` | |
| 305 | POST | `/api/consents-part-2-create` | |
| 307 | POST | `/api/consents-fetch/{lead}` | lead |
| 308 | POST | `/api/consents-resend` | |
| 306 | DELETE | `/api/consents-delete` | |
| 326 | POST | `/api/spanish-consents-create` | |
| 325 | POST | `/api/spanish-consents-part-2-create` | |
| 324 | POST | `/api/soa-consents-create` | |
| 322 | POST | `/api/soa-consents-fetch/{lead}` | lead |
| 323 | POST | `/api/soa-consents-resend` | |
| 327 | POST | `/api/spanish-soa-consents-create` | |

### BDC

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 368 | GET | `/bdc/agent-information/{agent}` | agent |
| 369 | GET | `/bdc/available-agents/{lead}` | lead |
| 370 | GET | `/bdc/inform-datetime` | |

### Public Forms

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 880 | GET | `/form/{uuid}` | uuid |
| 881 | POST | `/form/{uuid}` | uuid |
| 485 | GET | `/dependant-form-password-checked-recently/{dependant}` | dependant |

### Password Checks

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 485 | GET | `/dependant-form-password-checked-recently/{dependant}` | dependant |
| 830 | GET | `/medication-password-checked-recently/{lead}` | lead |

---

## 11. Integrations

### Twilio

**Agent Twilio Account**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 230 | GET | `/agent-twilio-account` | |
| 231 | POST | `/agent-twilio-account` | |
| 228 | DELETE | `/agent-twilio-account` | |
| 229 | POST | `/agent-twilio-account/provision-new-number` | |
| 232 | POST | `/agent-twilio-account/update-phone-number` | |

**Twilio Settings (Agency)**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1215 | POST | `/twilio-settings/{agency}/add-messaging-service` | agency |
| 1216 | DELETE | `/twilio-settings/{agency}/sids/{sids}` | agency, sids |
| 1217 | POST | `/twilio-settings/{agency}/sids` | agency |
| 1218 | POST | `/twilio-settings/{agency}/sids-update` | agency |

**Twilio Webhooks**

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1224 | POST | `/twilio/incoming-sms-webhook` | |
| 1225 | POST | `/twilio/incoming-sms-webhook-fallback` | |
| 1226 | POST | `/twilio/incoming-voice-to-sms-number-webhook` | |
| 1227 | POST | `/twilio/sms-delivery-status` | |
| 1228 | POST | `/twilio/tb-one-add-pn-to-ms` | |
| 1229 | POST | `/twilio/tb-one-remove-pn-from-ms` | |
| 1141 | POST | `/sync-leb-twilio-primary-profile` | |

### Google

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 551 | GET | `/oauth/google` | |
| 546 | GET | `/oauth/google-calendar` | |
| 549 | GET | `/oauth/google-gmail` | |
| 550 | GET | `/google-account` | |
| 548 | DELETE | `/google-account/{googleAccount}` | googleAccount |
| 547 | POST | `/google-account/{googleAccount}/calendar/{googleCalendar}` | googleAccount, googleCalendar |
| 552 | POST | `/google/webhook` | |

### Microsoft

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 847 | GET | `/oauth/microsoft` | |
| 846 | GET | `/microsoft-account` | |
| 845 | DELETE | `/microsoft-account/{microsoftAccount}` | microsoftAccount |
| 844 | POST | `/microsoft-account/{microsoftAccount}/calendar` | microsoftAccount |
| 367 | POST | `/azure/webhook` | |

### HST

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 576 | GET | `/hst-bucket-sync` | |
| 577 | POST | `/hst-bucket-sync` | |
| 311 | POST | `/api/hst/credit-transfer` | |
| 553 | GET | `/grace-pull/log-details/{grace_pull_log}` | grace_pull_log |

### Marketplace / Bucket Access

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 818 | GET | `/marketplace` | |
| 816 | GET | `/bucket-access` | |
| 813 | GET | `/bucket-access/{bucketAccess}/click-to-dial` | bucketAccess |
| 822 | POST | `/bucket-access/{bucketAccess}/purchase-lead` | bucketAccess |
| 819 | POST | `/bucket-access/{bucketAccess}/purchase-ctd-lead/{lead}` | bucketAccess, lead |
| 815 | POST | `/bucket-access/{bucket}/discard-lead` | bucket |
| 814 | GET | `/bucket-access/{bucket}/click-to-dial-shared-bucket` | bucket |
| 823 | POST | `/bucket-access/{bucket}/purchase-lead-shared-bucket` | bucket |
| 821 | POST | `/bucket-access/{bucket}/purchase-ctd-lead-shared-bucket/{lead}` | bucket, lead |
| 809 | GET | `/bucket-access-agency-shared-buckets` | |
| 812 | GET | `/bucket-access-agent-shared-buckets` | |
| 810 | GET | `/bucket-access/{agentBucketSharingBucket}/click-to-dial-agent-shared-bucket` | agentBucketSharingBucket |
| 811 | POST | `/bucket-access/{agentBucketSharingBucket}/purchase-lead-agent-shared-bucket` | agentBucketSharingBucket |
| 820 | POST | `/bucket-access/{agentBucketSharingBucket}/purchase-ctd-lead-agent-shared-bucket/{lead}` | agentBucketSharingBucket, lead |
| 817 | POST | `/hst-buckets/{hstBucketId}/purchase-lead` | hstBucketId |

### Agency Bucket Sharing

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 132 | GET | `/agency/bucket-sharing` | |
| 133 | POST | `/agency/bucket-sharing/store` | |
| 131 | GET | `/agency/bucket-sharing/{bucket}/get-agencies` | bucket |
| 130 | DELETE | `/agency/bucket-sharing/{bucket}/clear-all` | bucket |
| 134 | PUT | `/agency/bucket-sharing/{agencyBucketSharing}/update` | agencyBucketSharing |

### User Bucket Sharing

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1250 | GET | `/user/{user}/buckets/{bucket}/sharing` | user, bucket |
| 1251 | POST | `/user/{user}/buckets/{bucket}/sharing/{sharingTo}` | user, bucket, sharingTo |

### RTB

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1094 | GET | `/rtb/{source}` | source |
| 1095 | POST | `/rtb/{source}` | source |
| 1093 | POST | `/rtb/{source}/allstates` | source |
| 320 | POST | `/api/rtb` | |

### Froala / MMS

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 531 | POST | `/api/froala/upload-file` | |
| 533 | POST | `/api/froala/upload-image` | |
| 532 | GET | `/api/froala/images` | |
| 848 | POST | `/api/mms/upload-images` | |

### Vendor Lead API

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 318 | POST | `/api/leadcloud/lead` | |
| 319 | POST | `/api/{vendor_key}/leads` | vendor_key |
| 321 | POST | `/api/sales` | |
| 310 | POST | `/api/grab-lead/{lead}` | lead |

---

## 12. Reports

### Agency Reports

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 982 | GET | `/report/agency` | |
| 989 | GET | `/report/agency/data` | |
| 990 | POST | `/report/agency/export` | |
| 991 | GET | `/report/agency/team-members` | |
| 983 | GET | `/report/agency-bucket-sharing` | |
| 984 | GET | `/report/agency-bucket-sharing/data` | |
| 985 | POST | `/report/agency-bucket-sharing/export` | |
| 986 | GET | `/report/agency-bucks` | |
| 987 | GET | `/report/agency-credit` | |
| 988 | GET | `/report/agency-ledger` | |

### Agent Reports

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 992 | GET | `/report/agent` | |
| 996 | GET | `/report/agent-carrier` | |
| 993 | GET | `/report/agent-carrier/data` | |
| 994 | GET | `/report/agent-carrier/data/export` | |
| 995 | GET | `/report/agent-carrier/export-download` | |
| 313 | GET | `/report/api/agent-carrier-commission-search` | |
| 997 | GET | `/report/agent-efficiency` | |
| 998 | GET | `/report/agent-lead-follow-up` | |
| 999 | GET | `/report/agent-states` | |
| 1000 | GET | `/report/agent-states/export` | |
| 1001 | GET | `/report/agent-states/print` | |

### Sales Reports

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1061 | GET | `/report/sale-listing` | |
| 1062 | GET | `/report/sale-listing/data` | |
| 1063 | POST | `/report/sale-listing/export` | |
| 1064 | GET | `/report/sales-credit` | |
| 1065 | GET | `/report/sales-credit/data` | |
| 1066 | POST | `/report/sales-credit/export` | |
| 1067 | GET | `/report/sales-credit/products` | |
| 1068 | GET | `/report/split-sale` | |
| 1069 | GET | `/report/split-sale/data` | |
| 1070 | POST | `/report/split-sale/export` | |

### Lead Reports

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1038 | GET | `/report/lead-sources` | |
| 1040 | GET | `/report/lead-sources/data` | |
| 1039 | GET | `/report/lead-sources/bad-phone` | |
| 1041 | GET | `/report/lead-sources/dead` | |
| 1042 | POST | `/report/lead-sources/dispo-file` | |
| 1043 | GET | `/report/lead-sources/leads` | |
| 1044 | GET | `/report/lead-sources/sales` | |
| 1045 | GET | `/report/lead-sources2` | |
| 1037 | GET | `/report/lead-rejection` | |
| 1046 | GET | `/report/lead-status-ratio` | |
| 1047 | GET | `/report/lead-status-ratio/data` | |
| 1048 | GET | `/report/lead-status-ratio/leads-data` | |

### Commission Reports

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1016 | GET | `/report/commission-carriers` | |
| 1017 | GET | `/report/commission-carriers/data` | |
| 1018 | POST | `/report/commission-carriers/export` | |

### Bucket/Pull Reports

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1010 | GET | `/report/bucket-auto-responder` | |
| 1011 | GET | `/report/bucket-pull` | |
| 1012 | GET | `/report/bucket-pull/data` | |
| 1013 | GET | `/report/bucket-pull/data/click-to-calls` | |
| 1014 | GET | `/report/bucket-pull/data/users` | |
| 1015 | POST | `/report/bucket-pull/export` | |

### Billing Reports

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1006 | GET | `/report/billing` | |
| 1007 | GET | `/report/billing/data` | |
| 1008 | POST | `/report/billing/export` | |
| 1009 | GET | `/report/billing/export/status` | |

### Custom Reports

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1019 | GET | `/report/custom-reports/columns` | |
| 1020 | GET | `/report/custom-reports/create` | |
| 1021 | GET | `/report/custom-reports/data` | |
| 1025 | GET | `/report/custom-reports` | |
| 1026 | GET | `/report/custom-reports/{customReport}` | customReport |
| 1023 | GET | `/report/custom-reports/{customReport}/edit` | customReport |
| 1027 | POST | `/report/custom-reports` | |
| 1028 | PUT | `/report/custom-reports/{customReport}` | customReport |
| 1029 | PATCH | `/report/custom-reports/{customReport}/column-order` | customReport |
| 1024 | POST | `/report/custom-reports/export` | |
| 1022 | DELETE | `/report/custom-reports/{customReport}` | customReport |

### Other Reports

| # | Method | Path | Parameters |
|---|--------|------|------------|
| 1002 | GET | `/report/bad-phone-credit` | |
| 1003 | GET | `/report/bdc` | |
| 1004 | GET | `/report/bdc-agent` | |
| 1005 | GET | `/report/bdc-source` | |
| 1030 | GET | `/report/grace-pull` | |
| 1031 | GET | `/report/grace-pull/data` | |
| 1032 | GET | `/report/hst-and-primary-email` | |
| 1033 | GET | `/report/last-login` | |
| 1034 | GET | `/report/last-login/data` | |
| 1035 | GET | `/report/last-login/export` | |
| 1036 | GET | `/report/last-login/data/sale-info` | |
| 1049 | GET | `/report/negative-balance` | |
| 1050 | GET | `/report/product` | |
| 1051 | GET | `/report/products` | |
| 1052 | GET | `/report/products/data` | |
| 1053 | POST | `/report/products/export` | |
| 1054 | GET | `/report/recruiting-manager-report` | |
| 1055 | GET | `/report/recruiting-manager-report/data` | |
| 1056 | GET | `/report/refer-to-department` | |
| 1057 | GET | `/report/referral-user-report` | |
| 1058 | POST | `/report/referral-user-report/export` | |
| 1059 | GET | `/report/referral-user-report/{lead}/sales` | lead |
| 1060 | GET | `/report/rr` | |
| 1071 | GET | `/report/state` | |
| 1072 | GET | `/report/state-new` | |
