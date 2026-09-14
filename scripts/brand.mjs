/* Generates every BYBO logo file from one set of numbers, so the mark in the
   favicon and the mark in the print lockup are the same shape. */
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';

const OUT = process.argv[2];
mkdirSync(OUT, { recursive: true });

const INK = '#111116', PAPER = '#f5f4f0', VIOLET = '#793cff', VLIGHT = '#b794ff';

/* ── the monogram: a stem and two stacked bowls, on a 132 × 152 grid ── */
const MARK_W = 132, MARK_H = 152;
const mark = (solid, accent) => `<rect x="4" y="4" width="26" height="144" rx="8" fill="${solid}"/>`
  + `<path d="M44 4H84a34 34 0 0 1 0 68H44Z" fill="${solid}"/>`
  + `<path d="M44 80H90a34 34 0 0 1 0 68H44Z" fill="${accent}"/>`;

/* ── the wordmark: mono-line capitals, cap height 100, stroke 10 ──
   Geometric, so the O is a true circle and each letter keeps its own width;
   the tracking below is optical, not a single repeated step. */
const WORD_H = 100, STROKE = 10;
const glyphs = [
  { d: 'M5 0V100M5 5H30A22.5 22.5 0 0 1 30 50H5M5 50H32A22.5 22.5 0 0 1 32 95H5', w: 60 },
  { d: 'M5 0L35 50L65 0M35 50V100', w: 70 },
  { d: 'M5 0V100M5 5H30A22.5 22.5 0 0 1 30 50H5M5 50H32A22.5 22.5 0 0 1 32 95H5', w: 60 },
  { d: 'M95 50A45 45 0 1 1 5 50A45 45 0 1 1 95 50', w: 100 },
];
const TRACK = 24;
const offsets = glyphs.reduce((a, g, i) => (a.push(i ? a[i - 1] + glyphs[i - 1].w + TRACK : 0), a), []);
const WORD_W = offsets[3] + glyphs[3].w;
const word = colour => glyphs
  .map((g, i) => `<path d="${g.d}" transform="translate(${offsets[i]} 0)" stroke="${colour}" stroke-width="${STROKE}" stroke-linecap="butt" stroke-linejoin="round" fill="none"/>`)
  .join('');

const doc = (w, h, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}">\n`
  + `  <title>${title}</title>\n  ${body}\n</svg>\n`;

/* ── lockups ── */
const LOCK_H = 120;                                   // mark height in the lockup
const markScale = LOCK_H / MARK_H;                    // 0.789
const markW = +(MARK_W * markScale).toFixed(2);       // 104.21
const GAP = 44;
const wordScale = 0.62;                               // cap height 62 beside a 120 mark
const wordW = +(WORD_W * wordScale).toFixed(2);       // 200.88
const wordY = +((LOCK_H - WORD_H * wordScale) / 2).toFixed(2);
const LOCK_W = +(markW + GAP + wordW).toFixed(2);

const lockup = (solid, accent, wordColour) =>
  `<g transform="scale(${markScale.toFixed(4)})">${mark(solid, accent)}</g>`
  + `<g transform="translate(${(markW + GAP).toFixed(2)} ${wordY}) scale(${wordScale})">${word(wordColour)}</g>`;

/* stacked: mark centred above the wordmark */
const S_GAP = 34;
const sWordScale = 0.56, sWordW = +(WORD_W * sWordScale).toFixed(2), sWordH = +(WORD_H * sWordScale).toFixed(2);
const sMarkScale = 0.86, sMarkW = +(MARK_W * sMarkScale).toFixed(2), sMarkH = +(MARK_H * sMarkScale).toFixed(2);
const STACK_W = Math.max(sMarkW, sWordW), STACK_H = +(sMarkH + S_GAP + sWordH).toFixed(2);
const stacked = (solid, accent, wordColour) =>
  `<g transform="translate(${((STACK_W - sMarkW) / 2).toFixed(2)} 0) scale(${sMarkScale})">${mark(solid, accent)}</g>`
  + `<g transform="translate(${((STACK_W - sWordW) / 2).toFixed(2)} ${(sMarkH + S_GAP).toFixed(2)}) scale(${sWordScale})">${word(wordColour)}</g>`;

const files = {
  'bybo-mark.svg':            doc(MARK_W, MARK_H, mark(INK, VIOLET), 'BYBO'),
  'bybo-mark-reversed.svg':   doc(MARK_W, MARK_H, mark(PAPER, VLIGHT), 'BYBO'),
  'bybo-mark-mono.svg':       doc(MARK_W, MARK_H, mark('currentColor', 'currentColor'), 'BYBO'),
  'bybo-logo.svg':            doc(LOCK_W, LOCK_H, lockup(INK, VIOLET, INK), 'BYBO'),
  'bybo-logo-reversed.svg':   doc(LOCK_W, LOCK_H, lockup(PAPER, VLIGHT, PAPER), 'BYBO'),
  'bybo-logo-mono.svg':       doc(LOCK_W, LOCK_H, lockup('currentColor', 'currentColor', 'currentColor'), 'BYBO'),
  'bybo-logo-stacked.svg':    doc(STACK_W, STACK_H, stacked(INK, VIOLET, INK), 'BYBO'),
  'bybo-logo-stacked-reversed.svg': doc(STACK_W, STACK_H, stacked(PAPER, VLIGHT, PAPER), 'BYBO'),
  'bybo-wordmark.svg':        doc(WORD_W, WORD_H, word(INK), 'BYBO'),
};

for (const [name, svg] of Object.entries(files)) writeFileSync(`${OUT}/${name}`, svg);

/* ── the app icon: the mark on the brand ink, in a rounded square ── */
const iconMark = (s => `<g transform="translate(${((32 - MARK_W * s) / 2).toFixed(3)} ${((32 - MARK_H * s) / 2).toFixed(3)}) scale(${s})">${mark(PAPER, VLIGHT)}</g>`)(0.125);
writeFileSync(`${OUT}/icon.svg`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" role="img" aria-label="BYBO">\n`
  + `  <title>BYBO</title>\n  <rect width="32" height="32" rx="7" fill="${INK}"/>\n  ${iconMark}\n</svg>\n`);

console.log(`lockup ${LOCK_W}×${LOCK_H} · stacked ${STACK_W}×${STACK_H} · ${Object.keys(files).length + 1} files`);

/* ── Raster icons ──────────────────────────────────────────────────────
   Browsers and crawlers ask for several shapes: /favicon.ico first of all
   (Google's favicon fetcher still starts there), a 180px apple-touch icon,
   and 192/512 PNGs for an installed app. All are drawn from the same mark. */
if (process.argv.includes('--raster')) {
  const sharp = (await import('sharp')).default;
  const { writeFileSync: write } = await import('node:fs');
  const APP = process.argv[process.argv.indexOf('--raster') + 1];
  const svg = Buffer.from(readFileSync(`${OUT}/icon.svg`));
  const png = (size) => sharp(svg, { density: 900 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

  await Promise.all([
    png(180).then(b => write(`${APP}/apple-icon.png`, b)),
    png(192).then(b => write(`${OUT}/icon-192.png`, b)),
    png(512).then(b => write(`${OUT}/icon-512.png`, b)),
  ]);

  /* An .ico is a tiny directory of images; PNG payloads are valid in it and
     every browser in use reads them, so no BMP encoding is needed. */
  const sizes = [16, 32, 48];
  const images = await Promise.all(sizes.map(png));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
  let offset = 6 + sizes.length * 16;
  const entries = images.map((img, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(sizes[i] % 256, 0); e.writeUInt8(sizes[i] % 256, 1);
    e.writeUInt8(0, 2); e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
    e.writeUInt32LE(img.length, 8); e.writeUInt32LE(offset, 12);
    offset += img.length;
    return e;
  });
  write(`${APP}/favicon.ico`, Buffer.concat([header, ...entries, ...images]));
  console.log(`raster: favicon.ico (${sizes.join('/')}), apple-icon 180, icon 192 + 512`);
}
