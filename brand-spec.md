# DeebSilk Studio — Brand spec

Codified from the redesign brief (AAA game-studio site, SAO-inspired but original).

## Color tokens

| Token | Value | Role |
|---|---|---|
| `--bg` | `#050816` | Page background (deep space navy) |
| `--surface` | `#0C1628` | Panels, raised surfaces |
| `--card` | `#13213D` | Cards |
| `--accent` | `#00E5FF` | Primary neon cyan |
| `--accent-2` | `#59D8FF` | Secondary accent |
| `--glow` | `#7AF7FF` | Glow highlights |
| `--success` | `#59FF98` | Success / online |
| `--warn` | `#FFC857` | Warning |
| `--fg` | `#FFFFFF` | Primary text |
| `--muted` | `#B8C7D9` | Secondary text |

Derived via `color-mix()` (cyan glows, `--accent-soft`, hairlines).

## Typography

- Display / HUD: `Rajdhani` (Google Fonts), 600–700 weight, wide letter-spacing — futuristic launcher feel.
- Body: system sans stack. Mono: `ui-monospace` stack for HUD numerics/IDs.
- Scale: `--fs-h1: clamp(44px, 7vw, 96px)` hero, condensed display titles, `clamp()` body.

## Layout posture (glassmorphism HUD)

- Dark navy canvas + fixed particle/grid background layers.
- Glass panels: `background: color-mix(in srgb, var(--surface) 65%, transparent)` + `backdrop-filter: blur(18px)` + hairline `rgba(0,229,255,.14)` borders + corner brackets.
- Cyan accent budget: eyebrow labels + primary CTA + one glow per screen; never flood.
- Sharp-ish radii (10–14px), no soft pastels, HUD corner markers, scanlines/noise at low opacity.
- Lore media piece (Strange Warden) keeps its intentional red accents as a contrast flourish.
