# Automate Flow Forge (your own business first)

Learn the stack by running it on `withflowforge.com` before selling Foundry automation.

## Goal (phase 1)

When someone submits **Start an enquiry**:

1. You get an email alert immediately  
2. The lead is logged in a Google Sheet  
3. They get a short auto-reply  
4. (Optional) You get a WhatsApp ping  

No custom backend yet. Static site → webhook → Make.com.

## Why Make.com

- Visual scenarios (same style you’ll show clients)
- Free tier is enough to learn
- Easy to swap email / Sheets / WhatsApp later
- You can rebuild the same pattern for Foundry clients

Alternatives later: Zapier, n8n, or a small custom API.

## One-time setup (about 20–30 mins)

### A. Google Sheet

Create a sheet: **Flow Forge Enquiries**

Columns:

| timestamp | name | phone | need | source |
| --- | --- | --- | --- | --- |

### B. Make.com scenario

1. Create a Make account  
2. New scenario → **Webhooks → Custom webhook** → copy the URL  
3. Add modules in this order:

```text
1. Webhooks: Custom webhook  (catch name, phone, need)
2. Google Sheets: Add a row
3. Email (Gmail / Email): Send alert to buildwithflowforge@gmail.com
4. Email: Send auto-reply to the lead (if they left an email — phase 2)
```

Phase 1 alert email body example:

```text
New Flow Forge enquiry

Name: {{name}}
Phone: {{phone}}
Need: {{need}}
```

4. Turn the scenario **ON**  
5. Paste the webhook URL into the site config (see below)

### C. Site form

The site form should `POST` JSON/form fields to your Make webhook instead of only opening `mailto:`.

Keep phone / WhatsApp buttons as backup.

## Phase 2 (after phase 1 works)

- Add email field to the form → auto-reply to the lead  
- WhatsApp notify you (CallMeBot / Twilio / similar)  
- If no reply from you in 24h → reminder to yourself  
- Same blueprint packaged as a Foundry “lead follow-up” offer  

## What not to do yet

- Don’t build a custom CRM  
- Don’t wire ChatGPT into production replies until the basic alert + sheet is reliable  
- Don’t fully auto-ship website design changes  

## Test checklist

- [ ] Submit a test enquiry from the live site  
- [ ] Row appears in the Sheet  
- [ ] Alert email arrives  
- [ ] Try it on mobile  
- [ ] Spam/junk checked once  
```
