import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const icons = {
  regular: [
    'bx-calendar', 'bx-map-alt', 'bx-menu', 'bx-phone',
    'bx-stop-circle', 'bx-user', 'bx-wind', 'bx-x',
  ],
  solid: [
    'bxs-calendar', 'bxs-calendar-event', 'bxs-car-mechanic', 'bxs-car-wash',
    'bxs-chevron-left-circle', 'bxs-chevron-right-circle', 'bxs-contact',
    'bxs-envelope', 'bxs-gift', 'bxs-home', 'bxs-info-circle',
    'bxs-phone-call', 'bxs-star', 'bxs-time', 'bxs-to-top',
    'bxs-user-circle', 'bxs-wrench',
  ],
};

function encodeSvg(svg) {
  return svg
    .replace(/\s+/g, ' ')
    .replace(/"/g, "'")
    .replace(/#/g, '%23')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .trim();
}

const parts = [
  `.bx{display:inline-block;line-height:1}`,
  `.bx::before{content:'';display:inline-block;width:1em;height:1em;` +
    `background-color:currentColor;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;` +
    `-webkit-mask-size:100% 100%;mask-size:100% 100%;vertical-align:-0.125em}`,
];

for (const [type, names] of Object.entries(icons)) {
  const dir = type === 'regular' ? 'regular' : 'solid';
  for (const name of names) {
    const svgPath = join(root, 'node_modules/boxicons/svg', dir, `${name}.svg`);
    const svg = readFileSync(svgPath, 'utf-8');
    const encoded = encodeSvg(svg);
    const uri = `url("data:image/svg+xml,${encoded}")`;
    parts.push(`.${name}::before{-webkit-mask-image:${uri};mask-image:${uri}}`);
  }
}

const css = parts.join('\n');
const outPath = join(root, 'src/css/boxicons-subset.css');
writeFileSync(outPath, css);
console.log(`Generated ${outPath} (${(css.length / 1024).toFixed(1)} kB)`);
