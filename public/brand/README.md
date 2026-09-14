# The BYBO logo

Every file here is drawn from one set of numbers, so the favicon, the header
and anything you send a printer are the same shape.

## Which file to use

| File | Use it for |
|---|---|
| `bybo-logo.svg` | The default. Mark and wordmark side by side, on a light background. |
| `bybo-logo-reversed.svg` | The same, on the brand ink or any dark background. |
| `bybo-logo-stacked.svg` | Narrow spaces — a square advert, a badge, the top of a poster. |
| `bybo-logo-stacked-reversed.svg` | The stacked lockup on a dark background. |
| `bybo-logo-mono.svg` | One colour. Inherits the surrounding colour, so it works for engraving, embroidery, a fax header or a single-colour print. |
| `bybo-mark.svg` | The monogram alone, where BYBO is already named. |
| `bybo-mark-reversed.svg` | The monogram on a dark background. |
| `bybo-mark-mono.svg` | The monogram in one colour. |
| `bybo-wordmark.svg` | The wordmark alone, where the mark appears separately. |
| `icon.svg` | The app icon and favicon. Do not use it as a logo — the rounded square belongs to the icon, not the brand. |

## Colours

| | Hex |
|---|---|
| Ink | `#111116` |
| Paper | `#f5f4f0` |
| Violet (the lower bowl, on light) | `#793cff` |
| Light violet (the lower bowl, on dark) | `#b794ff` |

The lower bowl is the only part that carries the accent. On a dark background
it lightens to `#b794ff`, because `#793cff` does not hold up against the ink.

## Clear space

Keep clear space on all four sides equal to **the width of the stem** — the
narrow bar on the left of the monogram. That is one sixth of the mark's height.
Nothing else sits inside it.

## Smallest sizes

| | Smallest |
|---|---|
| Horizontal lockup | 120px wide on screen, 32mm in print |
| Stacked lockup | 64px wide on screen, 18mm in print |
| Mark alone | 20px wide on screen, 6mm in print |

Below those the gap between the bowls closes up and the B stops reading.

## Things not to do

- Do not retype the wordmark in a font. It is drawn, not set, and no font
  matches it.
- Do not recolour the upper bowl or the stem. Only the lower bowl takes the
  accent, and only in the two violets above.
- Do not add a gradient, a shadow, an outline or a stroke.
- Do not stretch, condense, rotate or shear it.
- Do not put the lockup on a busy photograph. Use the reversed lockup on a
  plain dark panel instead.
- Do not rebuild the icon's rounded square around the full lockup.

## Regenerating these files

They are generated, not hand-edited, so a change to the geometry changes every
file at once:

```
node scripts/brand.mjs public/brand
```

Do not edit an SVG here by hand — the next run overwrites it, and the inline
lockup in `src/components/Wordmark.tsx` carries the same path data, so the two
have to agree.
