# Business development agent

The `business-development` Claude Code agent (`.claude/agents/business-development.md`) finds prospects and referral partners, revives quiet leads, and prepares the team for meetings. All outreach aims for a free first conversation about one workflow, and goes out from the BYBO team across India.

A sequence sends only after the founder approves it. The approval covers one sequence, its exact copy and its exact recipients.

## Using it

Ask for each job in Claude Code.

| Job | Ask for | Credits |
| --- | --- | --- |
| Research | "Use the business-development agent to shortlist prospects" or "referral partners" | None |
| Prepare | "Prepare that shortlist for email and LinkedIn with a budget of 30 credits" | Only the budget stated |
| Launch | Read the packet, then tell the main session to launch it. See [Launching](#launching). | None |
| Leads | "Work these leads", with a file path or pasted list | None |
| Brief | "Brief me for my meeting with <company>" | None unless budgeted |
| Proposal | "Draft a proposal from these notes" | None |
| Review | "Review how the outreach is doing" | None |

The agent has no enrol, activate, send or dial tools, so it cannot launch anything itself.

## Channels

| Channel | What the agent prepares | Who acts |
| --- | --- | --- |
| Email | An inactive Apollo sequence | Apollo sends once launched |
| LinkedIn | A connection note and one follow-up per person | A person, by hand |
| Phone | A call list with why now and talking points | A person. Numbers need their own credit budget. Check them against the DND register first. |
| WhatsApp | A message for people already in touch with BYBO | A person, by hand. Never cold. |

Spoken talking points say "B-Y-B-O" and "B-Y-B-O dot in".

## Existing leads

The agent cannot read the private `bybo-leads` Blob store, so the founder supplies a list. Keep any export outside this repository. Drafts refer to what the person actually asked for. Anyone who opted out or asked not to be called is dropped.

## Referral partners

Search as a separate batch named `BD <YYYY-MM> partners <n>`, in the same way as [Segments](#segments).

| `website_keywords` | Who to find | Lead with |
| --- | --- | --- |
| marketing agency, management consulting, chartered accountants, software development | Founder, Managing Partner, Director | Work their clients ask for that they do not offer themselves |

Commission and terms are for the founder. The agent proposes a conversation only.

## Proposals

Proposals follow the Blueprint structure: the workflow, what was observed, what to do first, what not to automate, and a 90-day roadmap. The agent leaves `[fee: founder to set]` and `[dates: founder to set]` as placeholders.

## Before the first send

Apollo has no linked mailbox, so nothing can be sent yet. The founder needs to:

1. Confirm the Apollo plan covers what the agent uses. People search is blocked on the current plan, so discovery runs on Vibe Prospecting. Creating contacts and sequences, and enriching by name, have not been tested on this plan.
2. Link a team sending mailbox in Apollo. Do not use a personal Gmail address.
3. Confirm SPF, DKIM and DMARC on the sending domain. Cold email from `hello@bybo.in` puts delivery of everyday mail at risk, so use a team address on a separate outreach domain if possible.
4. Add a sending schedule in Apollo for weekdays, India time.
5. Label existing clients, open enquiries and anyone who has opted out `bd-do-not-contact` in Apollo. Leads held in the `bybo-leads` Blob store are not visible to the agent.
6. Have a qualified adviser confirm the position on cold email under the DPDP Act and the IT rules. This document is not legal advice.

## Segments

Search Vibe Prospecting in two steps.

1. Find companies: `entity_type: businesses`, with `company_country_code` of `["IN"]`, `company_size` of `["51-200", "201-500"]`, and the segment's `website_keywords`.
2. Find people at those companies: `entity_type: prospects`, with `business_id` from step 1 and `job_level` of `["c-suite", "director", "owner", "founder"]`. Keep only people based in India.

In testing, the `prospect_country_code` and `has_contact_details` filters may have broken prospect statistics calls, so leave them out. Step 1 returned 50,353 companies for Operations-led. Step 2 has not been tested with `business_id`.

Each batch splits evenly across the three segments until one shows it is working.

| Segment | `website_keywords` | Who to find | Lead with |
| --- | --- | --- | --- |
| Operations-led | manufacturing, logistics, exporter, supply chain | Managing Director, Founder, Director of Operations, Head of Operations | Business Operations: RFQs, purchase orders, proofs of delivery, invoices |
| High-consideration | real estate, healthcare, education, lending | Founder, Managing Director, Head of Sales, Director of Admissions | Customer & Workforce AI: first response to enquiries, missed follow-ups, no-shows |
| Consumer brands | d2c, restaurant, retail | Founder, Head of Customer Experience, Director of Operations | Customer & Workforce AI, or Website Design & Development |

Rank a company higher when it has a reason to act now: hiring for the role the system would support, opening a location, or a recent expansion it has announced. A company with no such reason can still make the list if the workflow clearly fits, and the agent must say so.

## Limits

| Limit | Value |
| --- | --- |
| Enrichment credits | Only what the request states. The account started with 175. |
| Contacts per sequence | 30 |
| Contacts per company | 1 |
| Emails per day, per sequence | 25 |
| Steps | 3 emails: day 0, day 3, day 7 |
| Words per email | 85 at most, 50 preferred |
| Repeat contact with a company | Not within 90 days |

Set these on every sequence: `active: false`, `max_emails_per_day: 25`, `mark_finished_if_reply: true`, `mark_paused_if_ooo: true`. Name it `BD <YYYY-MM> <segment> <n>` and label its contacts with the same name.

Every email is signed by the BYBO team and ends with `bybo.in` and a plain line such as "If this isn't useful, say so and we won't write again."

## Approval packet

`prepare` ends with this, in order, so that the founder can approve from it alone.

1. Sequence name, Apollo ID and the batch label.
2. Sender mailbox and schedule, or a clear statement that none is linked.
3. Every step: the day, subject and full body.
4. Each recipient: name, title, company, email status, segment, why now, and the source for any personal detail.
5. Credits spent and balance remaining.
6. Anything doubtful or left out, and why.

## Launching

The main session does this, never the agent. It takes the founder's explicit approval, in that conversation, of a specific packet.

1. Show the sequence by `apollo_emailer_campaigns_show` and confirm that the copy and recipient count still match the packet. If either changed, get approval again.
2. Confirm the sender with `apollo_email_accounts_index`. If no mailbox is linked, stop.
3. Enrol the batch label with `apollo_emailer_campaigns_add_contact_ids`, leaving the safety flags at their defaults so that unverified emails and people in other sequences are skipped. Report anyone skipped.
4. Activate with `apollo_emailer_campaigns_approve`.
5. Record who approved it and when in the Apollo sequence notes or the conversation.

An approval never carries over. Adding contacts, editing copy or starting another batch needs a new one.

## Stopping

Pause the sequence if the bounce rate reaches 5%, if anyone complains, or if a spam report arrives. Add anyone who opts out to `bd-do-not-contact` the same day. Replies come to a person. The agent does not answer them.

## Measuring

Judge batches on replies that lead to a conversation and on Blueprints sold, not on opens. Change one thing per batch. Publish no result from this work unless a named client goes on record.
