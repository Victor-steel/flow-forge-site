# Make.com setup (Flow Forge enquiries)

Formspree already emails you. Make adds:

1. Log every lead in a Google Sheet  
2. Send the lead an auto-reply  

## Step 1 — Google Sheet

1. Open [Google Sheets](https://sheets.google.com)
2. Blank spreadsheet
3. Name it: `Flow Forge Enquiries`
4. In row 1 put these headers (one per column):

```text
timestamp | name | phone | email | need | source
```

Leave it open — you’ll connect it in Make.

## Step 2 — Create Make account

1. Go to [https://www.make.com](https://www.make.com)
2. Sign up (Google is fine)
3. Free plan is enough

## Step 3 — Webhook (this catches the enquiry)

1. In Make: **Create a new scenario**
2. Click the big **+**
3. Search **Webhooks**
4. Choose **Custom webhook**
5. Click **Add** → name it `Flow Forge enquiry`
6. Click **Save**
7. Click **Copy address to clipboard**
8. **Paste that URL in Cursor chat** (looks like `https://hook.eu2.make.com/...`)

Leave this scenario tab open.

## Step 4 — Add Google Sheet module

1. Hover the webhook module → click the **+** on the right
2. Search **Google Sheets**
3. Choose **Add a row**
4. Connect your Google account
5. Pick spreadsheet: `Flow Forge Enquiries`
6. Pick the first sheet (usually `Sheet1`)
7. Map fields:

| Sheet column | Value from webhook |
| --- | --- |
| timestamp | `{{now}}` (or Insert → Date) |
| name | name |
| phone | phone |
| email | email |
| need | need |
| source | `withflowforge.com` |

## Step 5 — Email alert to you

1. Click **+** after Sheets
2. Search **Email** or **Gmail**
3. Choose **Send an email**
4. Connect Gmail (`buildwithflowforge@gmail.com`)
5. To: `buildwithflowforge@gmail.com`
6. Subject: `New Flow Forge enquiry`
7. Content:

```text
Name: {{name}}
Phone: {{phone}}
Email: {{email}}

Need:
{{need}}
```

(Use the webhook fields from the picker — don’t type the curly braces by hand if Make offers bubbles.)

## Step 6 — Auto-reply to the lead

1. Click **+** again
2. **Gmail → Send an email** (or Email)
3. To: map the webhook **email** field
4. Subject: `Thanks for contacting Flow Forge`
5. Content:

```text
Hi {{name}},

Thanks for getting in touch with Flow Forge. I’ve got your enquiry and I’ll come back to you as soon as I can — usually the same day.

If it’s urgent, call or WhatsApp 07304 090660.

Luke
Flow Forge
withflowforge.com
```

## Step 7 — Turn it on

1. Bottom left: toggle scenario **ON**
2. Save

## Step 8 — Tell Cursor

Paste your webhook URL in chat. The site will be wired so each enquiry goes to:

- Formspree (inbox + email you already have)  
- Make (Sheet + auto-reply)

## Test

1. Submit a test on the live site with a real email you can check  
2. Confirm: Formspree submission, your alert email, Sheet row, auto-reply in the lead inbox  
```
