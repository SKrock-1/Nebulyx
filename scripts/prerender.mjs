import { readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const htmlPath = resolve(root, 'dist/index.html');
const ssrDir = resolve(root, '.ssr');
const EMPTY_ROOT = '<div id="root"></div>';

const { render, faqSchema } = await import(pathToFileURL(resolve(ssrDir, 'entry-static.js')).href);
const template = await readFile(htmlPath, 'utf8');

if (!template.includes(EMPTY_ROOT)) {
  throw new Error('prerender: dist/index.html has no empty #root to fill');
}

const faqJson = JSON.stringify(faqSchema()).replace(/</g, '\\u003c');
const html = template
  .replace(EMPTY_ROOT, `<div id="root">${render()}</div>`)
  .replace('</head>', `    <script type="application/ld+json">${faqJson}</script>\n  </head>`);

await writeFile(htmlPath, html);
await rm(ssrDir, { recursive: true, force: true });
