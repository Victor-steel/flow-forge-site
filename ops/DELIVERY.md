# Flow Forge — client delivery (v1)

## Packages (locked)
| Package | Price | Scope |
|--------|------:|-------|
| Forge | £497 | 1–5 page site + chatbot + basic SEO + go-live |
| Foundry | £1,797 | Forge + lead handoff automation + 30 days tweaks |

Care plan: £49/month (hosting + small edits).
Payment: 50% deposit to start, 50% on go-live.
Revisions: 2 rounds included. Extra rounds billed.

## First call (15–20 min)
1. What do you sell / who buys?
2. What should the site make people do (call, email, book)?
3. Have logo/colours/photos? Domain?
4. Recommend **Forge** (£497) by default; **Foundry** if they want lead follow-up automation.
5. Send deposit invoice same day.

## Client ownership (locked)
Forge sites ship so the customer can **edit text and photos themselves**:

- Template: `~/Projects/forge-client-template` (Eleventy + Decap CMS)
- Hosting: **client’s Netlify** account
- Editor: `yoursite.com/admin` (Netlify Identity invite)
- Domain: client’s registrar → Netlify
- Handover doc: `HANDOVER.md` in the client repo

You keep design/layout changes; they keep day-to-day copy and gallery updates.

## Build checklist
- [ ] Deposit received
- [ ] Brief saved (business name, offer, phone, email, address, brand notes)
- [ ] Clone `forge-client-template` → fill `site.json` / brand CSS
- [ ] Draft preview shared
- [ ] Revision round 1
- [ ] Revision round 2 (if needed)
- [ ] GitHub repo + Netlify on **client** account
- [ ] Identity + Git Gateway enabled; client invited to `/admin`
- [ ] Domain DNS pointed / live URL
- [ ] Chatbot live (if included)
- [ ] Automation live (Foundry only)
- [ ] Final invoice paid
- [ ] Handover: `HANDOVER.md` + care plan offer

## Out of scope (unless paid extra)
- Custom app/software builds
- Ongoing social media / ads management
- Copywriting for 10+ pages
- Ecommerce catalogue sites
