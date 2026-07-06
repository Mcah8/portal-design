# Handoff: Jet Interactive Portal — Colour Theme Update

## Overview
This is a **recolour only** of the existing Jet Interactive customer portal. The layout,
components, and markup are not changing. The only deliverable is a new set of hex values
for the theme's colour tokens — the light theme (`colors`) and the dark theme (`darkColors`).

The token **names are fixed** and cannot be added to or removed from. Every value below
maps 1:1 to an existing key in those two objects. Implementing this handoff means pasting
the hexes into the two objects — nothing else.

## About the Design Files
`Portal Theme Preview.dc.html` in this bundle is a **design reference created in HTML** — an
interactive mockup that recreates five portal screens (Phone Users, Calls & SMS, Call Flow
builder, Signup Management, and the top nav with its coloured pills) so you can see the
proposed palette applied in context. It is **not** production code to copy. The task is to
apply the token values below to the real portal's theme objects in your existing codebase.

The preview includes toggles for **Light / Dark** and a **Blue / Red** accent, plus a
"Tokens" panel that prints the exact hexes. This spec documents the **Blue accent** as the
recommended default (see "Accent decision" below); the red accent values are also listed.

## Fidelity
**High-fidelity.** These are final, exact hex values. Paste them verbatim.

## Accent decision
Two accent directions were explored for the `primary` / `accent` / `error` tokens:

- **Blue (recommended default)** — evolves the existing `#5D92F4` primary into a crisper,
  more confident blue. Keeps `error` clearly distinct from `primary`. Lowest-risk, closest
  to the portal today.
- **Jet Red (fully on-brand)** — aligns `primary` with the Jet brand red. Because brand red
  collides with the error red, `error` is pushed to a darker/desaturated red so status
  badges stay distinguishable from primary buttons.

All other tokens (neutrals, surfaces, text, success, warning, info) are identical between
the two accents. Pick one accent per environment; do not mix.

---

## Token values — LIGHT theme (`colors`)

| Token | Current | New (Blue) | New (Red) |
|---|---|---|---|
| `primary` | `#5D92F4` | **`#2E6BE6`** | **`#D81E27`** |
| `secondary` | `#424242` | **`#3B4A5E`** | `#3B4A5E` |
| `accent` | `#82B1FF` | **`#6FA0FF`** | **`#F0666B`** |
| `error` | `#FF3739` | **`#E23A3F`** | **`#A4161B`** |
| `info` | `#00D0BD` | **`#0FB0C0`** | `#0FB0C0` |
| `success` | `#00A86B` | **`#159B67`** | `#159B67` |
| `warning` | `#F59E0B` | **`#E28A2E`** | `#E28A2E` |
| `background` | `#F3F6FB` | **`#F4F7FB`** | `#F4F7FB` |
| `surface` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| `surface-variant` | `#EAF1FD` | `#EAF1FD` | `#EAF1FD` |
| `on-surface-variant` | `#475569` | `#475569` | `#475569` |
| `text-primary` | `#1F2937` | **`#17212E`** | `#17212E` |
| `text-secondary` | `#64748B` | `#64748B` | `#64748B` |
| `border` | `#D6E2F5` | **`#DCE6F3`** | `#DCE6F3` |
| `divider` | `#E5EAF2` | **`#EAEFF6`** | `#EAEFF6` |

### Light theme — paste-ready (Blue accent)
```js
const colors = {
  primary: '#2E6BE6',
  secondary: '#3B4A5E',
  accent: '#6FA0FF',
  error: '#E23A3F',
  info: '#0FB0C0',
  success: '#159B67',
  warning: '#E28A2E',

  background: '#F4F7FB',
  surface: '#FFFFFF',
  'surface-variant': '#EAF1FD',
  'on-surface-variant': '#475569',

  'text-primary': '#17212E',
  'text-secondary': '#64748B',

  border: '#DCE6F3',
  divider: '#EAEFF6',
}
```

### Light theme — paste-ready (Red accent)
```js
const colors = {
  primary: '#D81E27',
  secondary: '#3B4A5E',
  accent: '#F0666B',
  error: '#A4161B',
  info: '#0FB0C0',
  success: '#159B67',
  warning: '#E28A2E',

  background: '#F4F7FB',
  surface: '#FFFFFF',
  'surface-variant': '#EAF1FD',
  'on-surface-variant': '#475569',

  'text-primary': '#17212E',
  'text-secondary': '#64748B',

  border: '#DCE6F3',
  divider: '#EAEFF6',
}
```

---

## Token values — DARK theme (`darkColors`)

| Token | Current | New (Blue) | New (Red) |
|---|---|---|---|
| `primary` | `#039be5` | **`#4C8DFF`** | **`#FF4D57`** |
| `secondary` | `#5d92f4` | `#5D92F4` | `#5D92F4` |
| `accent` | `#82B1FF` | **`#8FB6FF`** | **`#FF8A90`** |
| `error` | `#d32f2f` | **`#F0555A`** | **`#FF7A7E`** |
| `info` | `#00D0BD` | **`#22C7D6`** | `#22C7D6` |
| `success` | `#549a77` | **`#35B37E`** | `#35B37E` |
| `warning` | `#f8bb86` | **`#F2A65A`** | `#F2A65A` |
| `background` | `#1a2533` | **`#141C28`** | `#141C28` |
| `surface` | `#2c3644` | **`#1E2937`** | `#1E2937` |
| `surface-variant` | `#434f5a` | **`#2A3543`** | `#2A3543` |
| `on-surface-variant` | `#d6dde5` | **`#C6D2E0`** | `#C6D2E0` |
| `text-primary` | `#ededed` | **`#EDF1F6`** | `#EDF1F6` |
| `text-secondary` | `#aaaaaa` | **`#8E9CB0`** | `#8E9CB0` |
| `border` | `#3c3c3c` | **`#303C4B`** | `#303C4B` |
| `divider` | `#ffffff` | **`#28323F`** | `#28323F` |

> Note: the current `darkColors.divider` is `#ffffff` (pure white), which reads as harsh
> full-width lines. The new value `#28323F` is a subtle dark divider consistent with the
> surface palette. Confirm this is the intended behaviour before shipping.

### Dark theme — paste-ready (Blue accent)
```js
const darkColors = {
  primary: '#4C8DFF',
  secondary: '#5D92F4',
  accent: '#8FB6FF',
  error: '#F0555A',
  info: '#22C7D6',
  success: '#35B37E',
  warning: '#F2A65A',
  background: '#141C28',
  surface: '#1E2937',
  'surface-variant': '#2A3543',
  'on-surface-variant': '#C6D2E0',
  'text-primary': '#EDF1F6',
  'text-secondary': '#8E9CB0',
  border: '#303C4B',
  divider: '#28323F',
}
```

### Dark theme — paste-ready (Red accent)
```js
const darkColors = {
  primary: '#FF4D57',
  secondary: '#5D92F4',
  accent: '#FF8A90',
  error: '#FF7A7E',
  info: '#22C7D6',
  success: '#35B37E',
  warning: '#F2A65A',
  background: '#141C28',
  surface: '#1E2937',
  'surface-variant': '#2A3543',
  'on-surface-variant': '#C6D2E0',
  'text-primary': '#EDF1F6',
  'text-secondary': '#8E9CB0',
  border: '#303C4B',
  divider: '#28323F',
}
```

---

## How each token is used (so you can sanity-check the recolour)

- **`primary`** — primary buttons (Create Phone User, Available), active sidebar item,
  links, the version-progress fill, "Last 7 Days" button, IVR/step badges, connector
  arrows in the Call Flow builder.
- **`secondary`** — the dark utility button (Help Centre) and secondary text weight.
- **`accent`** — secondary/less-prominent action (Download button), Call Flow connector
  lines, port-dot accents.
- **`error`** — destructive/negative status badges (Unavailable, Cancelled, Unanswered),
  delete icons, "Missed Call" pill, the UNANSWERED port dot.
- **`success`** — positive status (Answered), "SMS" pill, ID-verification badge, step
  count badge, feature icons, ANSWERED port dot.
- **`warning`** — "Voicemail" pill, VoiceMail audio chip, Close button, edit icons, the
  orange flow-node ports.
- **`info`** — the teal "100 %" chip in the Call Flow header.
- **`background`** — the app canvas behind cards; also the Call Flow builder grid canvas.
- **`surface`** — cards, table bodies, top bar, sidebar, flow nodes, modals.
- **`surface-variant`** — table header rows, phone-number chips, quiet pill fills.
- **`on-surface-variant`** — table header label text.
- **`text-primary`** / **`text-secondary`** — primary vs. muted body text.
- **`border`** — card and input outlines.
- **`divider`** — hairlines between table rows and inside cards.

### Coloured header pills (harmonised)
The SMS / Online Status / Voicemail / Missed Call pills are **not separate tokens** in the
preview — they were harmonised onto the semantic palette so they update automatically with
the theme:

- SMS → `success`, Online Status → `primary`, Voicemail → `warning`, Missed Call → `error`.
- Each pill fill is `color-mix(in srgb, <token> 16%, transparent)`, text is the solid token,
  and the count badge is the solid token on white.

If in the real portal these pills are driven by their own hardcoded colours (green / purple /
orange / salmon), decide whether to (a) leave them as-is, or (b) re-map them to the semantic
tokens as above to keep them on-palette. The preview demonstrates option (b).

## Interactions & Behavior
Colour-only change — no interaction, layout, or behaviour changes. Existing hover/active/
focus states should continue to derive from these tokens exactly as they do today (e.g.
button hover = darken `primary`).

## Design Tokens
See the two tables above — those *are* the complete token set. No spacing, radius, type, or
shadow changes are part of this handoff.

## Assets
No new image assets. **Icons must come from the Material Design Icons set** —
`mdi:*` on Iconify: https://icon-sets.iconify.design/mdi/ (MDI is Vuetify's
default icon set, so the portal can use `mdi-*` icon names directly). Every icon
in `Portal Theme Preview.dc.html` is embedded as official MDI path data and
tagged with a `data-mdi="<icon-name>"` attribute so you can look up exactly
which icon it uses, e.g. `data-mdi="magnify"` → `mdi:magnify` / `mdi-magnify`.

Icons used in the preview: `star` (Jet mark stand-in), `home`, `account`,
`currency-usd`, `cellphone`, `chart-bar`, `lightning-bolt`, `speedometer`,
`tools` (sidebar), `help-circle-outline`, `dots-vertical`, `magnify`, `filter`,
`filter-variant`, `refresh`, `calendar-blank`, `play`, `chevron-left`,
`chevron-right`, `plus`, `play-circle-outline`, `microphone`, `phone`,
`voicemail`, `pencil`, `check`, `delete`, `close`.

## Files
- `Portal Theme Preview.dc.html` — the interactive preview of all five screens with
  Light/Dark and Blue/Red toggles and the Tokens readout panel.
