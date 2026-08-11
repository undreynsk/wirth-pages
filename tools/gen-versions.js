/* Builds versions.html for the gh-pages branch.

   Every snapshot folder carries a meta.json written at deploy time:
       { "label": "v3-2026-08-11", "sha": "...", "date": "2026-08-11T09:12:00Z" }

   For each snapshot the page lists the commits it introduced — everything
   after the previous snapshot up to and including the snapshot's own commit.
   Commit subjects are shown as one-liners; those with a body get a <details>
   so the page stays scannable.

       node tools/gen-versions.js <site-dir> <git-repo-dir>
*/
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const SITE = process.argv[2] || 'site';
const REPO = process.argv[3] || 'src';

const US = '\x1f'; // field separator
const RS = '\x1e'; // record separator

function git(args) {
  try {
    return execFileSync('git', ['-C', REPO, ...args], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
  } catch {
    return ''; // a missing commit must not break the whole page
  }
}

function commits(fromSha, toSha) {
  const range = fromSha ? `${fromSha}..${toSha}` : toSha;
  const out = git(['log', `--format=%h${US}%s${US}%b${US}%ad${RS}`, '--date=format:%d.%m.%Y', range]);
  return out.split(RS)
    .map(r => r.replace(/^\s+/, ''))
    .filter(Boolean)
    .map(r => {
      const [sha, subject, body, date] = r.split(US);
      return { sha, subject, body: (body || '').trim(), date };
    });
}

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

/* ---------- collect snapshots ---------- */
const vDir = path.join(SITE, 'v');
let snaps = [];
if (fs.existsSync(vDir)) {
  for (const name of fs.readdirSync(vDir)) {
    const metaFile = path.join(vDir, name, 'meta.json');
    if (!fs.existsSync(metaFile)) { snaps.push({ label: name, sha: null, date: null }); continue; }
    try { snaps.push(JSON.parse(fs.readFileSync(metaFile, 'utf8'))); }
    catch { snaps.push({ label: name, sha: null, date: null }); }
  }
}
// oldest first, so each snapshot knows where its range starts
snaps.sort((a, b) => String(a.date || '').localeCompare(String(b.date || '')));

for (let i = 0; i < snaps.length; i++) {
  const prev = snaps[i - 1];
  snaps[i].commits = snaps[i].sha ? commits(prev && prev.sha, snaps[i].sha) : [];
}

// Commits on master that are newer than the last snapshot. A tag build has the
// tag checked out, so prefer the remote branch when it is available.
const tip = git(['rev-parse', '--verify', 'origin/master']).trim() ? 'origin/master' : 'HEAD';
const last = snaps[snaps.length - 1];
const headCommits = last && last.sha ? commits(last.sha, tip) : [];

/* ---------- render ---------- */
function renderCommits(list) {
  if (!list.length) return '<p class="empty">Keine neuen Commits.</p>';
  return '<ul class="commits">' + list.map(c => {
    const head = `<span class="sha">${esc(c.sha)}</span> ${esc(c.subject)}`;
    if (!c.body) return `<li>${head}</li>`;
    // open by default — the reader collapses what they don't need
    return `<li><details open><summary>${head}</summary><pre>${esc(c.body)}</pre></details></li>`;
  }).join('') + '</ul>';
}

function renderSnapshot(s) {
  const meta = [s.date ? esc(s.date.slice(0, 10).split('-').reverse().join('.')) : '',
                s.sha ? esc(s.sha.slice(0, 7)) : ''].filter(Boolean).join(' · ');
  return `
  <section class="ver">
    <h3><a href="v/${esc(s.label)}/">${esc(s.label)}</a> <small>${meta}</small></h3>
    <p class="links">
      <a href="v/${esc(s.label)}/vs2/">VS2 — dunkel</a>
      <a href="v/${esc(s.label)}/vs3/">VS3 — hell</a>
    </p>
    ${renderCommits(s.commits || [])}
  </section>`;
}

const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>WirthSim — Versionen</title>
<style>
  body { font: 16px/1.6 system-ui, -apple-system, sans-serif; max-width: 52rem;
         margin: 0 auto; padding: 3rem 1.5rem 6rem; color: #0f172a; background:#fff; }
  h1 { font-size: 1.6rem; margin-bottom: .3rem; }
  .lead { color:#64748b; margin-top:0; }
  h2 { font-size: .8rem; text-transform: uppercase; letter-spacing: .08em;
       color: #64748b; margin: 2.5rem 0 .5rem; }
  .ver { border-top: 1px solid #e2e8f0; padding: 1.25rem 0; }
  .ver h3 { margin: 0 0 .35rem; font-size: 1.05rem; }
  .ver h3 small { color: #94a3b8; font-weight: 400; font-size: .8rem; margin-left: .4rem; }
  a { color: #2563eb; text-decoration: none; }
  a:hover { text-decoration: underline; }
  .links { margin: 0 0 .8rem; display: flex; gap: 1rem; font-size: .9rem; }
  ul.commits { list-style: none; padding: 0; margin: 0; }
  ul.commits li { padding: .2rem 0; font-size: .93rem; color: #334155; }
  .sha { font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
         font-size: .82rem; color: #94a3b8; margin-right: .4rem; }
  summary { cursor: pointer; }
  summary::marker { color: #94a3b8; }
  pre { white-space: pre-wrap; font: .86rem/1.5 ui-monospace, SFMono-Regular, Menlo, monospace;
        background: #f8fafc; border-left: 2px solid #e2e8f0; margin: .5rem 0 .75rem 1.1rem;
        padding: .6rem .8rem; color: #475569; overflow-x: auto; }
  .empty { color:#94a3b8; font-size:.9rem; margin:.2rem 0; }
</style>
</head>
<body>

<h1>WirthSim — Versionen</h1>
<p class="lead">Eingefrorene Stände der Website. Zu jeder Version die Änderungen seit der vorherigen.</p>

<h2>Aktuell</h2>
<section class="ver">
  <h3><a href="./">Letzter Stand</a> <small>master</small></h3>
  <p class="links">
    <a href="vs2/">VS2 — dunkel</a>
    <a href="vs3/">VS3 — hell</a>
  </p>
  ${renderCommits(headCommits)}
</section>

<h2>Snapshots</h2>
${snaps.slice().reverse().map(renderSnapshot).join('\n')}

</body>
</html>
`;

fs.writeFileSync(path.join(SITE, 'versions.html'), html);
console.log('versions.html written:', snaps.length, 'snapshots,', headCommits.length, 'commits since the last one');
