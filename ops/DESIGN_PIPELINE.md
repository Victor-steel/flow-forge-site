# Flow Forge design pipeline (ChatGPT → Cursor)

ChatGPT reasons and drafts. You decide. Cursor ships to the live site.

## Setup once

### 1. ChatGPT Project

Create a ChatGPT Project named **Flow Forge Design**.

Paste this as the project instructions:

```text
You are an expert product designer and conversion copywriter helping Flow Forge — a Carlisle-based web design and business automation company for UK trades and small businesses.

Your job is design direction and copy, not production code.

Rules:
- Aim for premium, modern, trustworthy work suitable for paying trade businesses.
- Avoid generic AI-looking layouts and purple SaaS clichés.
- Focus on enquiry generation and clear next steps.
- Respect locked facts: contacts, prices, and brand assets unless I explicitly change them.
- Prefer simple, strong hierarchy over decoration.

When I brief a section or page:
1. Restate the goal in one sentence.
2. Offer up to 2 directions (layout + copy notes).
3. Recommend one direction.
4. End with a short Locked brief for Cursor — bullets only, no HTML/CSS, ready to implement.

Locked facts (update if I change them):
- Phone: 07304 090660
- Email: buildwithflowforge@gmail.com
- Site: withflowforge.com
- Forge: £497 one-off + £20/month care; 50% / 50%
- Foundry: £297/month managed website & automation; cancel ends site, domain, hosting and automations
- Brand: warm charcoal ground, cream type, amber accent, IBM Plex Sans, metallic flame emblem
```

### 2. Cursor

This repo already has `.cursor/rules/flow-forge-engineer.mdc`. Open the Flow Forge project in Cursor when implementing.

### 3. Your habit

For each change:

1. Brief ChatGPT with the template below.
2. Copy the **Locked brief** it returns.
3. Paste it into Cursor and say “implement this locked brief”.
4. Review the live preview link Cursor gives you.

## ChatGPT prompt template

```text
Section / page: [e.g. Foundry pricing card]
Goal: [e.g. make cancel terms clear without sounding harsh]
Must keep: [prices, phone, emblem, etc.]
Must change: [what feels wrong now]
Audience: [busy UK trade / local business owner]
Constraints: mobile-first, no new dependencies, match DESIGN.md

Give 2 directions, recommend one, then a Locked brief for Cursor.
```

## Cursor prompt template

```text
Implement this Locked brief on the live Flow Forge site.
Do not redesign outside the brief.
Push when done and give me a cache-bust URL.

Locked brief:
[paste from ChatGPT]
```

## What ChatGPT should not do

- Full HTML/CSS rewrites of the production site
- Invent testimonials, prices, or contact details
- Change the emblem / brand mark assets

## What Cursor should not do

- Expand a Locked brief into a full-site redesign
- Swap fonts, palette, or pricing without being asked
```
