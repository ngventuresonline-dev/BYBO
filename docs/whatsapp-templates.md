# WhatsApp message templates — for submission to Meta

Sixteen templates covering BYBO's enquiry, Blueprint, build and operating
flows, written to Meta's current rules and ready to paste into WhatsApp
Manager or POST to the Cloud API.

Sender: `+91 63643 54899`. Language: `en` (set `en_GB` if the WABA is
configured that way — spelling below is British).

---

## Read this before submitting

**The rules these are written to** (checked against Meta's docs, September 2026):

| | Limit |
|---|---|
| Header text | 60 characters |
| Body | 1024 characters |
| Footer | 60 characters |
| Button label | 25 characters |
| Buttons per template | 10 total · max 2 URL · 1 phone · 1 copy-code |

**The rules that cause most rejections**, all of which these templates respect:

- A body **may not start or end with a variable**. Every one below opens and closes on literal text.
- Variables must be **numbered sequentially** from `{{1}}` with no gaps.
- **No special characters** (`#`, `$`, `%`) inside a variable's sample value.
- **No emoji** anywhere in the body.
- **No two templates may share the same body and footer.** Each below is distinct.
- Never ask for a **sensitive identifier** — card number, Aadhaar, PAN, password. None of these do.

**Category is the thing to get right.** A UTILITY template that carries any
promotional or persuasive intent gets re-categorised as MARKETING, which
changes the pricing and requires opt-in. That is why none of the UTILITY
templates below mention services BYBO could also sell, suggest a next
purchase, or say anything like "while we are at it". Keep it that way when
you edit them.

**Opt-in.** The two MARKETING templates may only go to people who have opted
in to marketing on WhatsApp specifically. An enquiry through the website is
not marketing consent. Record where and when each opt-in was given.

**Before you submit**, fill in the four placeholders marked `[ ]`:

- `[PROXE URL]` — the base for deep links, e.g. `https://proxe.bybo.in`
- `[GUIDE URL]` — where an Insights guide lives, e.g. `https://bybo.in/insights`
- `[CALENDAR URL]` — your rescheduling link
- `[DOC URL]` — where a client collects a deliverable

URL buttons take **one variable, appended to the end of the URL only**. The
static part must be a real, reachable base path.

---

## UTILITY · enquiry and scoping

### 1 · `enquiry_received`

Sent immediately after someone submits the form on bybo.in/apply.

- **Category:** UTILITY
- **Header:** none
- **Body:**

```
Hello {{1}}, thank you for your enquiry to BYBO. We have your message about {{2}} and a person will read it, not an autoresponder. We reply within one working day. If anything changes in the meantime, reply here and it will reach the same person.
```

- **Footer:** `BYBO · Built around your business`
- **Buttons:** none
- **Samples:** `{{1}}` Priya · `{{2}}` invoice processing

---

### 2 · `scoping_call_confirmed`

- **Category:** UTILITY
- **Header (text):** `Your call with BYBO is confirmed`
- **Body:**

```
Hello {{1}}, your scoping call is confirmed for {{2}} at {{3}}. It runs about forty minutes and there is nothing to prepare. If you have a few real examples of the work we will be discussing, bring them, and if not we will talk through it instead. Reply here if you need a different time.
```

- **Footer:** `BYBO · Bengaluru`
- **Buttons:** URL — `Reschedule` → `[CALENDAR URL]`
- **Samples:** `{{1}}` Priya · `{{2}}` Tuesday 18 March · `{{3}}` 3:00 PM

---

### 3 · `scoping_call_reminder`

- **Category:** UTILITY
- **Header:** none
- **Body:**

```
Hello {{1}}, a reminder that your call with BYBO is tomorrow, {{2}} at {{3}}. The link is in your calendar invitation. If tomorrow no longer works, reply here and we will move it, no difficulty.
```

- **Footer:** `Reply STOP to stop reminders`
- **Buttons:** Quick reply — `Confirm` · Quick reply — `Reschedule`
- **Samples:** `{{1}}` Priya · `{{2}}` Wednesday 19 March · `{{3}}` 11:00 AM

---

### 4 · `documents_requested`

- **Category:** UTILITY
- **Header (text):** `One thing we need from you`
- **Body:**

```
Hello {{1}}, to continue with {{2}} we need the examples we discussed. Bring the awkward ones as well as the clean ones, because those are what decide whether the work is possible. You can upload them at the link below, or reply here and we will find another way.
```

- **Footer:** `Nothing is shared outside BYBO`
- **Buttons:** URL — `Upload examples` → `[PROXE URL]/u/{{1}}`
- **Samples:** `{{1}}` Priya · `{{2}}` the document workflow Blueprint

---

## UTILITY · the Blueprint

### 5 · `blueprint_started`

- **Category:** UTILITY
- **Header:** none
- **Body:**

```
Hello {{1}}, your Blueprint for {{2}} has started. We will be with your team on the dates we agreed, and you will hear from us if anything needs a decision before then. You can follow progress at the link below at any point.
```

- **Footer:** `BYBO · Blueprint`
- **Buttons:** URL — `Follow progress` → `[PROXE URL]/b/{{1}}`
- **Samples:** `{{1}}` Priya · `{{2}}` accounts payable

---

### 6 · `blueprint_ready`

- **Category:** UTILITY
- **Header (document):** the Blueprint PDF
- **Body:**

```
Hello {{1}}, your Blueprint is ready. It covers {{2}} and ends in a ranked recommendation with a ninety-day roadmap. The walkthrough session is where it usually changes, so read it first and bring your objections. It is yours to keep and to share with anyone you choose.
```

- **Footer:** `BYBO · Blueprint`
- **Buttons:** URL — `Open the Blueprint` → `[DOC URL]/{{1}}`
- **Samples:** `{{1}}` Priya · `{{2}}` four workflows across accounts payable

---

## UTILITY · the operating system, once it runs

These are the product itself. Keep them factual — an approval request that
tries to sell anything will be re-categorised.

### 7 · `approval_needed`

- **Category:** UTILITY
- **Header (text):** `Something needs your decision`
- **Body:**

```
Hello {{1}}, a case is waiting on you. {{2}} stopped because {{3}}. The evidence is attached to the case, and nothing moves until you decide. If this turns out to be routine, tell us and we will change the rule rather than send you the same thing again next week.
```

- **Footer:** `Sent because you own this queue`
- **Buttons:** URL — `Review the case` → `[PROXE URL]/c/{{1}}`
- **Samples:** `{{1}}` Priya · `{{2}}` Invoice 4471 from Shakti Packaging · `{{3}}` one line does not match the purchase order

---

### 8 · `approval_recorded`

- **Category:** UTILITY
- **Header:** none
- **Body:**

```
Hello {{1}}, your decision on {{2}} is recorded and the work has moved on. The record shows what you approved, when, and the document it was based on, so it can be traced later by anyone who needs to.
```

- **Footer:** `BYBO · Audit record kept`
- **Buttons:** none
- **Samples:** `{{1}}` Priya · `{{2}}` Invoice 4471

---

### 9 · `workflow_paused`

- **Category:** UTILITY — this is a service interruption, which qualifies.
- **Header (text):** `A workflow has paused`
- **Body:**

```
Hello {{1}}, the {{2}} workflow has paused and is not processing. The reason recorded is {{3}}. Nothing has been lost; work is queued and will resume once this is cleared. We are already looking at it and will tell you when it is running again.
```

- **Footer:** `BYBO · Operations`
- **Buttons:** URL — `See the detail` → `[PROXE URL]/s/{{1}}` · Phone — `Call BYBO`
- **Samples:** `{{1}}` Priya · `{{2}}` invoice posting · `{{3}}` the accounting system is not responding

---

### 10 · `workflow_resumed`

- **Category:** UTILITY
- **Header:** none
- **Body:**

```
Hello {{1}}, the {{2}} workflow is running again as of {{3}}. Everything queued while it was paused has been processed, and anything that needed a person is in your review queue. Nothing was dropped.
```

- **Footer:** `BYBO · Operations`
- **Buttons:** none
- **Samples:** `{{1}}` Priya · `{{2}}` invoice posting · `{{3}}` 4:20 PM today

---

### 11 · `monthly_report_ready`

- **Category:** UTILITY
- **Header (document):** the monthly report PDF
- **Body:**

```
Hello {{1}}, your report for {{2}} is ready. It shows volume, how much needed a person, the error rate and the cost per completed record, each against the baseline we took before the system was built. If a number looks wrong to you, say so and we will go through how it was calculated.
```

- **Footer:** `BYBO · Monthly report`
- **Buttons:** URL — `Open the report` → `[DOC URL]/{{1}}`
- **Samples:** `{{1}}` Priya · `{{2}}` February

---

### 12 · `review_queue_summary`

- **Category:** UTILITY
- **Header:** none
- **Body:**

```
Hello {{1}}, there are {{2}} cases waiting on a person in your queue this morning, and the oldest has been waiting {{3}}. Opening the queue shows each one with the evidence beside it.
```

- **Footer:** `Daily at 9 AM · reply PAUSE to stop`
- **Buttons:** URL — `Open the queue` → `[PROXE URL]/q/{{1}}`
- **Samples:** `{{1}}` Priya · `{{2}}` 4 · `{{3}}` two days

---

## UTILITY · the website studio

### 13 · `preview_ready`

- **Category:** UTILITY
- **Header (text):** `Your site preview is ready`
- **Body:**

```
Hello {{1}}, the preview of your {{2}} is ready to look at. Changes are cheapest now, before the build, so this is the moment for the hard questions rather than after launch. Comments left on the preview reach us directly.
```

- **Footer:** `BYBO · Website studio`
- **Buttons:** URL — `View the preview` → `[PROXE URL]/p/{{1}}`
- **Samples:** `{{1}}` Priya · `{{2}}` home and services pages

---

### 14 · `site_is_live`

- **Category:** UTILITY
- **Header:** none
- **Body:**

```
Hello {{1}}, {{2}} is live. Old addresses redirect to the new pages, the forms have been tested end to end, and the editing guide is in your handover folder. If you spot anything at all in the first fortnight, tell us and we will put it right.
```

- **Footer:** `BYBO · Website studio`
- **Buttons:** URL — `Open the site` → `[DOC URL]/{{1}}`
- **Samples:** `{{1}}` Priya · `{{2}}` your new website

---

## MARKETING · opt-in required

Only to people who have opted in to marketing on WhatsApp. Both carry an
opt-out, which Meta expects on marketing sends.

### 15 · `new_guide_published`

- **Category:** MARKETING
- **Header (text):** `New from BYBO Insights`
- **Body:**

```
Hello {{1}}, we have published a new guide: {{2}}. It is free, sourced, and written for the person deciding what to build rather than the person building it. No sign-up and nothing gated.
```

- **Footer:** `Reply STOP to stop these`
- **Buttons:** URL — `Read the guide` → `[GUIDE URL]/{{1}}` · Quick reply — `Stop these`
- **Samples:** `{{1}}` Priya · `{{2}}` What a business AI system actually is

---

### 16 · `check_in`

- **Category:** MARKETING — a re-engagement message, not a service message.
- **Header:** none
- **Body:**

```
Hello {{1}}, we spoke a while ago about {{2}} and wanted to check whether it is still on your list. If it is, reply here and we will pick up where we left off. If it is not, reply STOP and we will leave you be.
```

- **Footer:** `Reply STOP to stop these`
- **Buttons:** Quick reply — `Still interested` · Quick reply — `Stop these`
- **Samples:** `{{1}}` Priya · `{{2}}` your document workflow

---

## AUTHENTICATION

### 17 · `proxe_login_code`

PROXe sign-in. Authentication templates have a fixed shape: no URLs, no
media, no emoji, and the code parameter must be 15 characters or fewer.
Build this one from Meta's **Template Library** in WhatsApp Manager rather
than writing it by hand — a hand-written authentication template is usually
rejected.

- **Category:** AUTHENTICATION
- **Body:** `{{1}} is your verification code.`
- **Security disclaimer:** on — adds "For your security, do not share this code."
- **Expiry:** on, 10 minutes
- **Buttons:** Copy code
- **Sample:** `{{1}}` 472913

---

## Cloud API payloads

Two worked examples of the exact JSON. Everything else follows the same
shape.

**Creating template 7, `approval_needed`:**

```
POST https://graph.facebook.com/v21.0/<WABA_ID>/message_templates
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

```json
{
  "name": "approval_needed",
  "language": "en",
  "category": "UTILITY",
  "components": [
    { "type": "HEADER", "format": "TEXT", "text": "Something needs your decision" },
    {
      "type": "BODY",
      "text": "Hello {{1}}, a case is waiting on you. {{2}} stopped because {{3}}. The evidence is attached to the case, and nothing moves until you decide. If this turns out to be routine, tell us and we will change the rule rather than send you the same thing again next week.",
      "example": {
        "body_text": [["Priya", "Invoice 4471 from Shakti Packaging", "one line does not match the purchase order"]]
      }
    },
    { "type": "FOOTER", "text": "Sent because you own this queue" },
    {
      "type": "BUTTONS",
      "buttons": [
        {
          "type": "URL",
          "text": "Review the case",
          "url": "https://proxe.bybo.in/c/{{1}}",
          "example": ["https://proxe.bybo.in/c/4471"]
        }
      ]
    }
  ]
}
```

**Sending it:**

```json
{
  "messaging_product": "whatsapp",
  "to": "91XXXXXXXXXX",
  "type": "template",
  "template": {
    "name": "approval_needed",
    "language": { "code": "en" },
    "components": [
      {
        "type": "body",
        "parameters": [
          { "type": "text", "text": "Priya" },
          { "type": "text", "text": "Invoice 4471 from Shakti Packaging" },
          { "type": "text", "text": "one line does not match the purchase order" }
        ]
      },
      {
        "type": "button",
        "sub_type": "url",
        "index": "0",
        "parameters": [{ "type": "text", "text": "4471" }]
      }
    ]
  }
}
```

---

## Submitting these

1. Replace the four `[ ]` placeholders with real URLs. A URL button whose base path 404s is a common rejection.
2. Submit **three or four first**, not all seventeen. If something in the house style trips the reviewer, you find out cheaply.
3. Start with 1, 7 and 11 — they cover the enquiry, the product and the reporting loop.
4. Authentication (17) comes from the Template Library, not from this file.
5. Approval usually lands within minutes, occasionally up to 24 hours.
6. If one is rejected, the reason appears in WhatsApp Manager. Re-categorisation from UTILITY to MARKETING is the likeliest, and the fix is removing whatever reads as persuasion.

## After approval

- **Quality rating** is per number, not per template. A template people block or mute drags the whole number down. 12 and 15 are the two most likely to be muted, so send them sparingly.
- **The 24-hour window:** once someone replies, you can send free-form messages for 24 hours without a template. Use that rather than firing another template.
- **Utility templates do not need marketing opt-in**, but they do need a real prior relationship. Do not send 7 to someone who has not engaged BYBO.
