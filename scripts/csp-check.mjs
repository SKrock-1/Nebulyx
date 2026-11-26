import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const EXECUTABLE = new Set(['', 'module', 'text/javascript', 'application/javascript']);

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map((e) => {
    const path = join(dir, e.name);
    if (e.isDirectory()) return htmlFiles(path);
    return e.name.endsWith('.html') ? [path] : [];
  }));
  return nested.flat();
}

const config = JSON.parse(await readFile(join(root, 'vercel.json'), 'utf8'));
const csp = config.headers.flatMap((rule) => rule.headers).find((h) => h.key === 'Content-Security-Policy')?.value || '';
const scriptSrc = csp.split(';').map((d) => d.trim()).find((d) => d.startsWith('script-src')) || '';
const allowed = new Set(scriptSrc.match(/'sha256-[^']+'/g)?.map((h) => h.slice(1, -1)) || []);

const used = new Set();
const missing = [];
for (const file of await htmlFiles(dist)) {
  const html = await readFile(file, 'utf8');
  for (const [, attrs, body] of html.matchAll(/<script(\b[^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\bsrc=/.test(attrs)) continue;
    const type = (attrs.match(/\btype="([^"]*)"/)?.[1] || '').toLowerCase();
    if (!EXECUTABLE.has(type)) continue;
    const hash = `sha256-${createHash('sha256').update(body).digest('base64')}`;
    used.add(hash);
    if (!allowed.has(hash)) missing.push(`${relative(dist, file)}: '${hash}'`);
  }
}

if (missing.length) {
  process.stderr.write(`csp-check: inline scripts not allowed by script-src in vercel.json:\n  ${[...new Set(missing)].join('\n  ')}\nAdd the hash to Content-Security-Policy script-src, or move the script to a file.\n`);
  process.exit(1);
}
const unused = [...allowed].filter((h) => !used.has(h));
if (unused.length) process.stdout.write(`csp-check: unused script-src hashes (safe to remove): ${unused.join(' ')}\n`);
process.stdout.write(`csp-check: ${used.size} inline script(s), all allowed by CSP\n`);
