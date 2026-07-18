# Finn Ominal — Official Site (album-era build)

Built 2026-07-17 by Claude (executive-manager workstream). Static site, no build step, no dependencies —
ready for GitHub Pages (`finnominalbeats.github.io`), Netlify, or any static host.

## What it is

Single-page site in the owner's `08_WEB\FO_WEB` design language (black / antique gold, masked hero,
playlist lane cards, coming-soon strips) refreshed for the **Between War & Peace, Vol. 1: Duality —
July 31, 2026** campaign (G9 profile-refresh gate).

Sections: Hero → Album (7-track list) → Music (Spotify embed) → Videos (lite YouTube embeds) →
Playlists (After Dark · Before Dawn · All Official Audio · Visualizers) → World/About (+ AI-transparency
card, Phenom's Muze + VibeVersX coming-soon) → Contact (business email + 9 social/DSP links) → Footer.

## Facts wired in (verified 2026-07-17)

- Album: out **July 31, 2026** — tracks: Nuh Weapon · Wild Dogs · Foundation · Sick On Tired ·
  Gone Too Soon · Cloud 9 Confessions (out now) · Leaf & Paper (out now)
- Spotify artist `1dx9nKXoz9zopfNN9EDTf4` · Apple artist `1760871188` · YouTube `UC2jaDGZcd-fTNZGVJE_j7yg`
- YouTube playlist IDs pulled live from the channel (After Dark `PLYNOXdFb6MpGkDS_7JSDlrfMi5QmQ1Eby`,
  Before Dawn `PLYNOXdFb6MpF75SsnrW-IUDqMbcwSAVnb`, All Official `PLYNOXdFb6MpH1GRs58G9Vjwc40ZyzKFy3`,
  Visualizers `PLYNOXdFb6MpH9l2UI7ElxpvdkDRbHT8LT`)
- Video embeds: Wild Dogs `FGker24bHrA` · Cloud 9 Confessions `yBEQDNl023Y` · Sick On Tired `H8kzcmnicFA`
- Business email: FinnOminalBeats@gmail.com · Smart link: linktr.ee/FinnOminal
- Note: the draft's "Late Night" / "Shake 'N' Bake" cards had no live playlists behind them — swapped
  for the real All Official Audio + Visualizers playlists.

## Deploy (GitHub Pages)

Copy the contents of this folder to the root of the `FinnOminalBeats/finnominalbeats.github.io` repo,
commit, push. Pages serves it at https://finnominalbeats.github.io/ — no build config needed.

## Release-week swap (Jul 31)

1. Hero chip + album eyebrow: "Out July 31, 2026" → "Out Now — All Platforms".
2. Linktree CTAs → the DistroKid smart link for the album.
3. Add "Nuh Weapon" video embed when the premiere is live.

## Asset provenance

All images derived from `02_BRAND_LIBRARY` + `08_WEB\FO_WEB` + BWNP-vol1 artwork via
PIL (resize/crop/JPEG-WebP); logo golds extracted from pure-black masters (luminance→alpha).
No third-party imagery. Fonts: Google Fonts (Cinzel + Jost).
