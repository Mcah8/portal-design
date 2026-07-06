# Handoff: Jet Hub Portal Redesign

## Overview
A light-theme, SaaS-style redesign of the **Jet Hub customer portal** — the self-service product Jet Interactive customers use to manage their call tracking, cloud phone, SMS, and phone users. This handoff covers three core screens:
1. **Home dashboard** — replaces the empty "Welcome to Jet Hub" page with a real, data-rich operations view
2. **Phone Users** list — replaces the current dense dark table with a cleaner, more legible list with feature legend and bulk actions
3. **Total Calls & SMS** list — replaces the current activity log with a more scannable design with inline attribution drawer

The goals were: switch from dark to light, fix the "empty cards" home page, improve table density / scannability / feature-icon clarity, and refine the four colour-coded notification pills in the header.

---

## About the Design Files
The files in this bundle (`Jet Hub.html`, `*.jsx`, `styles.css`) are **design references created in HTML/React** — prototypes that demonstrate intended look, layout and behaviour. **They are not production code to lift directly.**

The implementation task is to **recreate these designs in the target codebase's existing environment**, following its established patterns:
- If the Jet Hub portal already uses React / Vue / Angular, recreate using that framework and its component library
- If using a CSS-in-JS solution or Tailwind, translate the styles accordingly
- The HTML mocks use raw CSS variables, inline `<script type="text/babel">` Babel-transpiled JSX, and a hand-rolled icon set — none of that should be carried forward as-is

The handoff focuses on **what to build**, not **how the prototype was built**.

---

## Fidelity
**High-fidelity (hifi).** All colors, typography, spacing, radii, shadows, and interactions are final and brand-aligned. Recreate pixel-perfect using the codebase's existing component libraries.

If a component already exists in the codebase (button, card, table, pill/badge, dropdown, checkbox, modal) — **use the existing one** and apply the styling shown here. Do not author parallel components.

---

## Brand & Design System
The portal follows the **Jet Interactive Design System** (B2B Australian telco — "cutting-edge telco, positioned ahead of traditional carriers").

### Core palette
| Token | Hex | Use |
|---|---|---|
| `--red` | `#ED1C24` | Primary brand. CTAs, active states, alerts |
| `--red-dark` | `#A71C20` | Hover/pressed states |
| `--red-100` | `#FDE7E8` | Red-tinted backgrounds |
| `--red-50` | `#FEF3F4` | Subtlest red wash (active nav item bg) |
| `--ink-900` | `#0B0B0C` | Primary text |
| `--ink-700` | `#2A2A2E` | Strong borders |
| `--ink-600` | `#4A4D55` | Body text |
| `--ink-500` | `#6B6E76` | Secondary text |
| `--ink-400` | `#9A9DA4` | Placeholder, disabled |
| `--ink-300` | `#C9CCD1` | Default border |
| `--ink-200` | `#E1E4E8` | Subtle border |
| `--ink-100` | `#EEF0F3` | Subtle surface |
| `--ink-50` | `#F7F8FA` | App background |

### Semantic / status
| Token | Hex | Use |
|---|---|---|
| `--success` / `--success-100` | `#0E8A4A` / `#E3F4EA` | Answered, online |
| `--warning` / `--warning-100` | `#D97706` / `#FEF1DC` | Voicemail, billing |
| `--info` / `--info-100` | `#1D4FD8` / `#E4EBFC` | Inbound, SMS |
| `--danger` / `--danger-100` | `#ED1C24` / `#FDE7E8` | Missed, errors |
| `#7C3AED` | — | Online status pill (purple) |
| `#4F46E5` | — | SMS direction icon (indigo) |

### Typography
- **Display / headings:** `Saira` (Google Fonts), 600/700, letter-spacing `-0.02em` to `-0.03em`, line-height `1.05–1.2`
- **UI / body:** `Barlow` (Google Fonts), 400/500/600
- **Numbers / mono:** `JetBrains Mono` — used for phone numbers, extensions, durations, dates, times, code, KPI sparkline labels
- **No serif anywhere. Sentence case headlines. No emoji.**
- Brand's real face is **Clio XS** (not embeddable) — Saira is the substitution; if the codebase has Clio licensed, swap it in.

### Type scale (in use)
| Element | Family | Size | Weight | Letter-spacing |
|---|---|---|---|---|
| Page h1 | Saira | 30px | 700 | -0.025em |
| Card h3 | Saira | 15px | 600 | -0.005em |
| Eyebrow / `MANAGE · USERS` | Saira | 11px upper | 600 | 0.14em |
| Body | Barlow | 13–14px | 400/500 | 0 |
| Small / meta | Barlow | 11.5–12.5px | 400/500 | 0 |
| KPI number | Saira | 32px | 700 | -0.03em |
| Table header | Saira | 10.5px upper | 600 | 0.10em |
| Phone numbers | JetBrains Mono | 12–13px | 500 | 0 |

### Spacing (8px base)
`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128`

### Radii
| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 4px | Form fields, small chips |
| `--radius-md` | 6–8px | Buttons, nav items, dropdowns |
| `--radius-lg` | 10–12px | Cards, banners, KPI tiles |
| `--radius-pill` | 999px | Pills, badges, quick pills, chip filters |

### Shadows
| Token | Value | Use |
|---|---|---|
| `--shadow-1` | `0 1px 2px rgba(11,11,12,.06), 0 1px 3px rgba(11,11,12,.08)` | Subtle hover lift |
| `--shadow-2` | `0 4px 12px rgba(11,11,12,.08), 0 2px 4px rgba(11,11,12,.06)` | Card hover, bulk-action bar |
| `--shadow-red` | `0 8px 24px rgba(237,28,36,.24)` | Primary button hover |

### Motion
- **Hover:** 120ms, `cubic-bezier(.2, .8, .2, 1)` (`--ease-out`)
- **Press:** 80ms
- **No bounces. No spring overshoot.**

---

## Global Layout

### App shell
- CSS grid: `240px | 1fr`
- Sidebar fixed left (sticky, full viewport height)
- Main content area: sticky topbar + scrolling content
- Max content width: 1440px, padding 28px 32px

### Sidebar (240px wide, white)
Top-to-bottom:
1. **Brand mark** — Jet symbol (red star icon) + wordmark `jet hub` (`jet` ink-900, `hub` red). 20px padding.
2. **Account switcher** — bordered tile in `ink-50` showing extension number (Saira 16/700) + organization name + chevron-down. Margin 4px 16px 14px.
3. **Nav groups** — labelled with uppercase 10px Saira/600 0.14em letter-spacing label ("MANAGE", "ACCOUNT"):
   - **MANAGE:** Home, Phone Users *(count badge: 16)*, Phone Numbers, Total Calls & SMS *(count: 56)*, Reports, Queues & IVR
   - **ACCOUNT:** Billing, Integrations, Settings
4. **User chip** at bottom — 32px gradient red avatar with initials, name (13/600), email (11/ink-500)

**Nav item states:**
- Default: ink-700 text, no bg
- Hover: ink-50 bg, ink-900 text
- Active: `red-50` bg, `red` text, **3px red bar** on left edge (extends through padding), count badge becomes red bg + white text
- Icon size: 18px, stroke 1.6
- Count badge: pill with ink-100 bg / mono 11px / ink-600 text

### Topbar (sticky, white, 1px ink-200 bottom border)
Left-to-right: search input (280px wide, ink-50 bg, ⌘K kbd hint) · 4 quick pills · Help centre button · bell icon · 3-dot menu icon. Padding 14px 28px, gap 18px (search to pills), 6px between pills.

### Page header (within content)
- **Eyebrow** (red 11px uppercase 0.14em) — e.g. "MANAGE · USERS"
- **h1** (Saira 30/700) — page title
- **Sub** (14px ink-500, max-width 560px) — context line; numbers in **600 ink-800**
- **Actions** (right) — flex row of buttons

---

## Component Specifications

### Buttons
- **Primary:** red bg, white text, 9px 14px padding, radius 8, 600/13px. Hover: red-dark bg + red shadow, translateY(-1px).
- **Secondary:** white bg, ink-200 border, ink-800 text. Hover: ink-400 border, ink-50 bg.
- **Ghost:** transparent, ink-700. Hover: ink-100 bg.
- **Small:** 6px 10px / 12px / 5px gap.
- Icon size in button: 14px (16px on small variant), 7px gap.
- Icons are Lucide-style line icons, 1.6 stroke.

### Card
- White bg, 1px ink-200 border, 12px radius, overflow hidden.
- **Header:** 18px 22px padding, 1px ink-200 bottom border. h3 (Saira 15/600) + optional meta line (12/ink-500).
- Hover lift (when interactive): ink-300 border, shadow-1, translateY(-1px).

### Quick Pills (header notification chips)
The 4 chips that replace `SMS / Online Status / Voicemail / Missed Call`. **Rule:** when count is 0, render as neutral; when count > 0, fill with the tone.

Anatomy: `[colour-dot] [label] [count badge]`
- Pill: rounded-full, 6px 10px padding, 1px border, white bg, 7px gap
- Dot: 8px circle
- Label: 12/600 ink-800
- Count: mono 11/700 in a pill background (ink-100/ink-700 when 0; tone-coloured when active)

**Active (count > 0) palette per tone:**
| Tone | bg | border | count bg | count text |
|---|---|---|---|---|
| `sms` (green) | `#ECFDF5` | `#BBF7D0` | `--success` | white |
| `online` (purple) | `#F5F3FF` | `#DDD6FE` | `#7C3AED` | white |
| `voicemail` (amber) | `#FFFBEB` | `#FDE68A` | `--warning` | white |
| `missed` (red) | `--red-50` | `#FBCFD2` | `--red` | white |

Clicking a pill should drill into the relevant view (SMS → Calls page filtered to SMS; Voicemail → filtered to voicemail; etc.).

### Pills / Badges (status tags in tables)
Rounded-full, 11/600, 3px 8px padding, 5px circular dot prefix:
- `ans` (answered) — `success-100` bg, `#086B36` text, success dot
- `mis` (missed) — `red-100` bg, `red-dark` text, red dot
- `vm` (voicemail) — `warning-100` bg, `#92520A` text, warning dot
- `live` — `red-100` bg, red text, **pulsing** red dot (1.4s opacity 1→0.3)
- `unav` / `canc` — `ink-100` bg, ink-600 text, ink-400 dot
- `sent` (inbound/outbound SMS) — `info-100` bg, info text, info dot

### Segmented control (`.seg`)
ink-100 background, 3px padding, 8px radius. Buttons: transparent, 5x11 padding, 12/600 ink-500. `.on` button: white bg, ink-900 text, shadow-1, 6px radius.

### Filter chips (table toolbar)
- Pill, 7x11 padding, 1px ink-200 border, white bg, 12/500 ink-700.
- Hover: ink-400 border.
- Active: `red-50` bg, `red` border, `red` text.
- Optional inline icon (12px) + optional count `<strong>16</strong>`.

### Dropdown trigger
Same as filter chip but rectangular (8px radius), with chevron-down on right.

### Checkbox
16x16 white, 1.5px ink-300 border, 4px radius. Hover: ink-500 border. On: red bg + border, 2px white checkmark drawn with rotated borders.

### Search input
Inside ink-50 box with 1px ink-200 border, 8px radius, 8x14 padding. Focus: white bg, ink-400 border, 3px ink-100 ring. Includes left search icon (14px ink-400) and right `⌘K` kbd hint.

### Tables
- Header row: ink-50 bg, sticky top, 1px ink-200 bottom border. TH: Saira 10.5px upper 0.10em ink-500 600.
- Body rows: 14px 16px padding, 1px ink-100 bottom border, 13px text.
- Row hover: ink-50 bg (whole row).
- Row selected: `red-50` bg.
- Action icons (`.row-acts`): visible at 0.4 opacity, fade to 1.0 on row hover. 28x28 buttons, 14px ink-500 icons. Danger variant: red-100 hover bg.

### Feature chips (Phone Users table)
26x22 rounded rectangle (5px radius). Off: ink-100 bg, ink-600 icon. On: success-100 bg, success icon. Hover shows ink-900 dark tooltip above with the feature name.

A feature legend bar lives at the bottom of the card (ink-50 bg, 1px ink-200 top border) showing all feature chips + their off state for reference.

### Avatars
30x30 circle, ink-100 bg, ink-700 text, Saira 600/11px initials. Alert variant: warning-100 bg, warning text, with a small "!" warning dot top-right (12x12 warning bg, white text, 1.5px white border).

### Bulk-action bar
Appears above table when 1+ rows selected. Black (ink-900) bar, 10x14 padding, 10px radius, shadow-2. Contains: "N selected" + helper text + action buttons (translucent white bg, white text) + delete (red bg) + close (X).

---

## Screen: Home Dashboard

### Purpose
Replace the empty 3-card welcome page with a real operations dashboard. User sees today's call activity, live calls in progress, recent voicemails, busiest numbers, and any urgent account state (overdue payment).

### Layout
- Page header (eyebrow `TUESDAY, 19 MAY 2026 · 11:58 AM` in red, h1 `Good morning, Justin`, sub line summarising today's activity)
- Page actions: `Export` (secondary, download icon) + `Add phone user` (primary, plus icon)
- **Payment overdue banner** (dismissible) — full-width
- **KPI row** — 4 columns, 14px gap, 22px bottom margin
- **Main grid** — 2 columns, `1fr 360px`, 20px gap:
  - **Left:** chart card · recent activity card (stacked, 20px gap)
  - **Right:** live calls card · busiest numbers card · voicemail inbox card (stacked, 20px gap)

### Payment overdue banner
- Linear gradient bg `#FFF7E6 → #FFFBEB`, 1px `#FCD34D` border, 10px radius, 14x18 padding
- Left: 32x32 warning-coloured square with white alert icon
- Centre: title (13.5/600 ink-900) `Payment overdue — $3,702.18` + sub (12.5/ink-700) `Invoice #INV-2026-0419 was due 14 May. Pay now to avoid service suspension on 25 May.`
- Right: `Pay now` primary button (small) + close X

### KPI tiles
Each: white card, 12px radius, 18x20 padding, hover lifts. Anatomy:
- Top row: tone-coloured 30x30 square with 15px icon + label (Saira 11 upper 0.10em ink-500)
- Big number: Saira 32/700 -0.03em
- Delta line: 11.5/600 with up/down arrow icon, tone-coloured (success for up, red for dn)
- Sparkline: absolute positioned bottom-right, 80x30, polyline with rounded caps, 0.85 opacity, tone-coloured stroke

Four tiles (left to right):
| Tile | Tone | Icon | Value | Delta | Sparkline color |
|---|---|---|---|---|---|
| Calls today | red | phone | 847 | +12.4% (up) | #ED1C24 |
| Answer rate | green | call-in | 91.2% | +1.8 pts (up) | #0E8A4A |
| Voicemails | amber | voicemail | 14 | +3 unheard (up) | #D97706 |
| SMS today | blue | sms | 42 | +8 inbound (up) | #1D4FD8 |

### Call volume chart
- Card with `Call volume` h3 + meta "Answered vs missed across all tracking numbers"
- Right side: segmented control `24h / 7d / 14d / 30d / QTD`, default `14d` on
- Legend row below header: `■ Answered (red)`, `┄ Missed (dashed ink-400)`, `■ Voicemail (warning)` — 12/ink-600
- SVG chart, 720×220 viewBox:
  - Light gridlines at every 50 units, ink-100
  - Y-axis labels (mono 10 ink-400) at 0/50/100/150/200
  - Answered: solid red 2.2px polyline + red-tinted gradient area underneath
  - Each data point: 3px white-fill, 2px red stroke circle
  - Latest point: highlighted with 6px red-15% halo + 4px solid red dot
  - Tooltip on latest: black rounded pill 120x44 with `TODAY · MAY 19` eyebrow + `184 answered` (Saira 14/700 white). Pointer triangle on right edge pointing to dot.
  - Missed: dashed (5-4) 1.5px ink-400 polyline
  - X-axis labels: mono 10 ink-400, centred, dates `May 12 … May 19`

### Recent activity card
- Title "Recent activity" + meta "Last 25 calls and SMS" + "View all →" link (right) → navigates to Calls page
- 6 compact rows, each:
  - 24x24 tone-coloured icon (ans/mis/vm)
  - Caller number (mono 13/ink-900) + service/user meta (11.5/ink-500)
  - Time (mono 12/ink-500, right-aligned)
  - Duration (mono 12/ink-700/600, right-aligned)
- Hover: ink-50 row background

### Live calls card
- Title "Live calls" + meta "In progress now"
- Right: `live` pill showing count "3 LIVE"
- List of items, each:
  - Pulsing 8px red dot
  - Number (mono 13/ink-900) + source attribution (11.5/ink-500)
  - Duration (mono 12.5/ink-700/600)

### Busiest numbers card
- Title "Busiest numbers" + meta "Today's call volume"
- 5 rows: tracking-number label + small mono number underneath, then a 100×6 progress bar (linear-gradient red-dark→red fill on ink-100 track), then count (mono 12/ink-700/600)

### Voicemail inbox card
- Title "Voicemail inbox" + meta "3 new since yesterday" + "All →" link
- Per item: VM audio button (`#0B0B0C` pill with warning-coloured play circle) + caller number + tracking number / time + `NEW` red pill when unheard

### Page-level interactions
- All sidebar items navigate (only Home / Phone Users / Total Calls & SMS are real, others are stubs)
- Payment banner is dismissible (state local to page)
- KPI hover lifts
- Segmented control changes time range (UI only, no data swap in prototype)
- "Add phone user" primary button currently navigates to Phone Users page

---

## Screen: Phone Users

### Purpose
Manage the people / endpoints that can place/receive calls on the account. Currently 16 users, mixture of webphone, mobile, desk phone, and forward-only.

### Page header
- Eyebrow `MANAGE · USERS`
- h1 `Phone Users`
- Sub: `16 phone users · 3 with feature alerts. Set up extensions, devices, and call forwarding.`
- Actions: `Download CSV` (secondary) + `Create phone user` (primary)

### Bulk-action bar (appears when ≥1 selected)
- Black bar above table card, full width, shadow-2
- `N selected` (Saira 13/700 white) + helper text (12.5/white-60%)
- Actions: `Send invite` / `Edit forwarding` (translucent white) / `Delete` (red bg) / `X` close

### Table card

**Toolbar (top row of card):**
- Search input (`Search by name, extension or email…`) — max-width 320px, flex 1
- Filter chips: `All 16` / `Mobile 9` / `Voicemail 14` / `Alerts 3`
- Spacer
- Right side: `Columns` dropdown / `Sort: Extension ▾` dropdown

**Columns (left to right):**

| Column | Width | Content |
|---|---|---|
| Select | 38px | Checkbox |
| User | min 200px | 30px avatar (warning variant if `alert: true`) + name (13.5/600 ink-900, nowrap) + user-type label (mono 11.5px, **type-coloured**: Mobile = info, Webphone = success, Desk phone / Forward only = ink-500) |
| Ext. | 70px | Extension in mono 12.5 |
| Features | 140px | 4 feature chips: voicemail, mobile app, forwarding, recording. On/off styling. Hover tooltips. |
| Email | flex | 12.5/ink-500, truncated with ellipsis at max 240px |
| Forwarding | min 200px | `num-chip` pill — ink-50 bg, ink-200 border, 999px radius, mono 11.5px showing `0480 015 155 · 2FA` style label |
| Created | 100px | mono 11.5/ink-500 nowrap, format `YYYY-MM-DD` |
| Updated | 100px | mono 11.5/ink-500 nowrap, `—` if empty |
| Actions | 140px | Row of 4 icon buttons (visible 0.4 opacity → 1.0 on row hover): edit, mail, more, delete (delete is danger-tinted on hover) |

**Feature legend bar (bottom of card, ink-50 bg, ink-200 top border):**
- `Features:` strong label
- Sample chips in their "on" state for: Voicemail, Mobile app, Forwarding, Recording
- Plus an example "Off / not configured" chip

**Pagination footer:**
- `Showing 1–N of N` (left)
- `Rows per page: [25]` select (right)
- Prev/next page nav buttons (28×28, ink-200 border, 6px radius)

### Sample user rows (15 shown — see `phone-users.jsx` data array for full set)

Example mapping (real Jet customer data drawn from screenshots):
- Matt Webphone · ext 100 · Webphone · voicemail on · alert → forwarding `0480 092 095 · Sales Mobile #2`
- Pete Test · ext 102 · Mobile · voicemail+mobile+recording on
- Jackson Murphy · ext 105 · Mobile · voicemail+mobile on
- Justin Graham · ext 5950 · Mobile · all 4 features on (this is the logged-in user, red avatar)
- Bianca · ext 108 · Forward only · alert
- Etc.

### Interactions
- Click row checkbox to select; clicking header checkbox toggles all visible
- Selecting opens bulk-action bar (animated in)
- Filter chips filter table client-side
- Search input filters by name/email/extension
- Feature chips show tooltip above on hover with state description
- Action icons fade in on row hover

---

## Screen: Total Calls & SMS

### Purpose
The activity log — every inbound/outbound call and SMS, with attribution and audio playback. Replaces the current dense dark table.

### Page header
- Eyebrow `ACTIVITY · CALLS & SMS`
- h1 `Total Calls & SMS`
- Sub: `Showing N of 56 interactions in the last 7 days · 42 answered, 8 missed, 6 voicemails.`
- Actions: `[II]` Pause live (ghost, icon-only, tooltip) · `[⟳]` Refresh (ghost, icon-only) · `Export CSV` (secondary, download icon) · `Last 7 days ▾` (dropdown with calendar icon, nowrap)

### Mini-stats filter strip (6 tiles)
- 6-column grid, 10px gap, 18px bottom margin
- Each tile is a button: transparent bg, 1px ink-200 border, 10px radius, 12x14 padding, text-left
- Top: 8px coloured dot + label (Saira 11/600 upper 0.10em ink-500)
- Big number: Saira 24/700 -0.02em ink-900, 6px margin-top
- Active state: white bg, ink-900 border

| Tile | Color | Count | Filter |
|---|---|---|---|
| All | ink-900 | 56 | all |
| Inbound | info | 38 | (display only) |
| Outbound | success | 8 | (display only) |
| SMS | indigo `#4F46E5` | 10 | sms |
| Missed | red | 8 | missed |
| Voicemail | warning | 6 | voicemail |

### Table card

**Toolbar:**
- Search input (`Search by number, service, customer or message…`)
- Filter chips: `All / Answered / Missed / Voicemail / Recordings`
- Spacer
- Right: `[⫷] More filters` / `[≡] Columns` dropdowns

**Columns:**

| Column | Width | Content |
|---|---|---|
| Flag | 36px | Optional `flag` icon if `c.flag = true` |
| Direction icon | 36px | 24×24 tone-coloured square with direction icon: `in` (info, call-in), `out` (success, call-out), `sms` (indigo `#E0E7FF`/`#4F46E5`, sms icon), `mis` (red, call-missed) |
| Date / Time | 110px | Date (mono 12/ink-900/500) + time (mono 11/ink-500), nowrap |
| Duration | 96px | mono duration `02:13` or `—`; if `c.audio` present, render audio button underneath:<br>**Audio button:** black pill with coloured play-circle, type-coloured (red=recording, warning=voicemail), label "VM" or "Rec" |
| Customer | min 180px | Caller number (mono 12.5/ink-900/500) + location `Sydney · NSW 2000` (11/ink-500), nowrap |
| Service | min 200px | Service name (12.5/ink-800/500, truncated max 200px) + tracking number underneath (mono 11/ink-500), nowrap |
| Message | flex | SMS body, ink-700 12.5px, 2-line clamp; `—` if not SMS |
| Status | 110px | Status pill (see badge specs) |
| Phone user | 130px | User name 12.5/ink-800/500 nowrap; `—` if unassigned |
| Actions | 80px | Note icon + chevron (expand) icon. Chevron rotates to chevron-down when expanded |

### Inline drawer (expanded row)
Click any row to expand a detail drawer. Replaces the next row visually:
- ink-50 bg, 1px ink-200 bottom border
- 2-column grid, 20px gap, 20×22 padding
- **Group 1: Call details** — h5 (Saira 10.5 upper 0.12em ink-500 600 `CALL DETAILS`), then rows: Caller ID, Tracking number, Service, Answering point, IVR path, Geo / postcode. Each row is `k: v` with 1px ink-200 bottom borders.
- **Group 2: Attribution & notes** — Source, Campaign, Landing page. Below: action button row — `Add note` / `Flag` / `Copy link` (secondary small) · spacer · `Open full record →` (primary small)

Only one row can be expanded at a time.

### Pagination footer
Same as Phone Users — `Showing 1–N of 56` + per-page select + nav.

### Interactions
- Row click toggles drawer (audio button click stops propagation)
- Filter chips and mini-stats tiles both filter client-side
- Status / direction icon decoded by status: `answered` → ans pill + `in` direction; `missed`/`unanswered` → mis pill + missed icon; `voicemail` → vm pill; SMS → sent pill + sms icon
- Audio buttons would, in production, open the inline player / detail view

---

## State Management

### App-level
- `page` — string, one of `dashboard / phone-users / calls / numbers / billing / integrations / settings / reports / queues` — managed in `App` component, passed to Sidebar (for active state) and pages (for navigation triggers)
- Notification counts — for now hardcoded `{ sms: 0, online: 6, voicemail: 14, missed: 0 }`. In production these should come from the same source as the badge counts in the sidebar and quick pills, and update via the real-time notification feed.

### Dashboard
- `range` — segmented chart range (`24h / 7d / 14d / 30d / QTD`), default `14d`
- `bannerOpen` — payment banner dismiss state (local; in production probably remember dismissal per invoice ID per user)

### Phone Users
- `selected: Set<userId>` — checkbox selection
- `filter` — current filter chip (`all / mobile / voicemail / alerts`)
- `search` — search input value

### Calls
- `range` — date range selector
- `filter` — chip filter / mini-stat tile (`all / sms / answered / missed / voicemail / recordings`)
- `expanded` — index of the currently-expanded row (single-row expansion model)

---

## Icons
The prototype hand-rolled a Lucide-style SVG icon set in `icons.jsx`. **In production, use the codebase's existing icon library** (Lucide, Heroicons, Phosphor, brand iconset). Icons used by name:
- Navigation: `home, users, phone-list, phone, chart, queue, dollar, bolt, settings`
- Topbar / actions: `search, bell, more-v, more, help, plus, download, edit, trash, mail, refresh, pause, calendar, sliders, filter, copy, note, flag, x`
- KPI tiles: `phone, call-in, voicemail, sms`
- Direction: `call-in, call-out, call-missed, sms`
- Features (phone users): `voicemail, mobile, forward, play` (for recording)
- Chevrons: `chevron, chevron-down, chevron-left, chevron-right, chevrons-left, chevrons-right`
- Status / arrows: `arrow-up, arrow-down, alert, play`

Stroke 1.6, fill none, rounded line caps and joins. Sizes: 12 / 13 / 14 / 15 / 18.

The brand's bespoke icon set (40+ icons in the 2020 guidelines — call tracking, IVR, postcode IVR, whisper, time-of-day routing, etc.) wasn't available as SVGs in this engagement; Lucide-style substitutes are used. **If the codebase has Jet's bespoke icons, swap them in.**

---

## Assets
- `design-system/jet-symbol-solid.png` — the red star brandmark, used in sidebar logo at 28×28
- `design-system/colors_and_type.css` — full token reference from the Jet Interactive Design System (Saira / Barlow / JetBrains Mono Google Fonts import + all CSS custom properties)
- No photographic imagery in this design — surfaces are all white or neutral

---

## Responsive Behavior
**Not implemented** in this prototype — the design is fixed at 1440px (the design system's portal container width). For real responsive:
- Below 1200px: collapse the dashboard 2-column grid to single column (live/numbers/voicemail cards below activity)
- Below 1024px: collapse sidebar to icon-only (48px); show as drawer on mobile
- Below 720px: tables should switch to card-per-row stacks; the bulk-action bar becomes a bottom sheet
- All `min-width` columns in tables should become `display: block` cards on mobile

Confirm responsive priorities with product before building — the current portal does not appear to be heavily used on mobile.

---

## Files in this handoff

```
design_handoff_jet_hub_portal/
├── README.md                       ← this file
├── Jet Hub.html                    ← entry point (renders the React prototype)
├── styles.css                      ← all portal styles (CSS variables + components)
├── app.jsx                         ← root + page routing
├── shell.jsx                       ← Sidebar + TopBar + QuickPills
├── icons.jsx                       ← Lucide-style SVG icon set
├── dashboard.jsx                   ← Home dashboard
├── phone-users.jsx                 ← Phone Users list
├── calls.jsx                       ← Total Calls & SMS list
└── design-system/
    ├── colors_and_type.css         ← brand tokens
    └── jet-symbol-solid.png        ← brand mark
```

Open `Jet Hub.html` in a browser to see the running prototype. All data is hardcoded inline in the page components.

---

## Implementation Notes for Claude Code

1. **Start with the design tokens** — port `design-system/colors_and_type.css` (or its hex values) into the codebase's existing token system / Tailwind config / theme provider.
2. **Use existing component primitives** — the codebase likely has Button, Card, Table, Pill/Badge, Checkbox, Dropdown. Style them to match this design before authoring page components.
3. **The four notification pills in the header are the most distinctive piece** — they have specific behaviour (count=0 → neutral, count>0 → tinted) that should be encapsulated in a single `<NotificationPill tone="…" count={…} />` component.
4. **Feature chips in the Phone Users table** — same idea: `<FeatureChip name="voicemail" on={true} />` with hover tooltips.
5. **The inline row drawer in Total Calls & SMS** uses a real `<tr>` spanning all columns rather than absolute positioning — this preserves table column alignment and makes it accessible. Replicate that approach.
6. **Real data wire-up** — every table is currently rendered from a static JS array. The columns should map cleanly onto the existing Jet API DTOs; if not, capture the field-mapping work as a separate task before UI work.
7. **Accessibility gaps to close in production:** all icon-only buttons need `aria-label`; the expand toggle needs `aria-expanded`; the bulk-action bar needs to be announced to screen readers; checkboxes need proper labelling.
