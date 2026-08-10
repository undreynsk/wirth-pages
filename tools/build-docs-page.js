/* Generates vs2/dokumentation.html and vs3/dokumentation.html.

   The header, footer and CSS are lifted verbatim from the matching index.html,
   so the two pages can never drift apart: after editing the header on the
   landing page, re-run this script.

       node tools/build-docs-page.js

   Only the <main> content below is specific to the documentation page.
   Archives are NOT stored in this repository — every link points straight at
   wirthsim.com, exactly like the download links on the landing page. */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = 'https://wirthsim.com/files/theme-src';

/* Topic list and file sizes as published on wirthsim.com (checked 10/Aug/26).
   Titles stay German in every language — they are the archive names. */
const TOPICS = [
  ['1. WirthSim Basis', '1.WirthSim Basis.zip', '7.2 MiB'],
  ['2. WirthSim Handhabung - Basis', '2.WirthSim Handhabung - Basis.zip', '82.2 MiB'],
  ['3. WirthSim Handhabung - Advanced', '3.WirthSim Handhabung - Advanced.zip', '67.3 MiB'],
  ['4. WirthSim Fehlermeldungen', '4.WirthSim Fehlermeldungen.zip', '5.5 MiB'],
  ['5. Foerdertechnik', '5.Foerdertechnik.zip', '69.0 MiB'],
  ['6. Elektrohaengebahnen', '6.Elektrohaengebahnen.zip', '8.1 MiB'],
  ['7.1 Gassengebundene Regalbediengeraete', '7.1_Gassengebundene_Regalbediengeraete.zip', '71.1 MiB'],
  ['7.2 HRL Kurven Regalbediengeraete', '7.2_HRL_Kurven Regalbediengeraete.zip', '13.0 MiB'],
  ['7.3 Shuttle', '7.3_Shuttle.zip', '14.3 MiB'],
  ['8. Produktion', '8.Produktion.zip', '22.4 MiB'],
  ['9. Eco-Sim', '9.Eco-Sim.zip', '28.7 MiB'],
  ['10. Simulation, Emulation, Datenbank Interface', '10.Simulation_Emulation_Datenbank Interface.zip', '12.2 MiB'],
  ['11. WirthSim Art', '11.WirthSim_Art.zip', '76.0 MiB'],
  ['12. WirthSim Projekte - Systeme - Lagersysteme', '12.WirthSim Projekte - Systeme - Lagersysteme.zip', '82.5 MiB'],
  ['12. WirthSim Projekte - Systeme - Shuttle', '12.WirthSim Projekte - Systeme - Shuttle.zip', '45.3 MiB'],
  ['12. WirthSim Projekte - Systeme - Sorter und Produktion', '12.WirthSim Projekte - Systeme - Sorter und Produktion.zip', '68.9 MiB']
];

const THEMES = {
  vs2: {
    badge: 'inline-block glass rounded-full px-4 py-1.5 text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-4',
    title: 'text-3xl lg:text-5xl font-black mb-6',
    text: 'text-slate-400 leading-relaxed',
    card: 'glass rounded-2xl p-6 lg:p-10',
    row: 'flex items-center gap-3 px-4 py-3 rounded-xl glass hover:bg-white/5 transition-colors',
    rowText: 'flex-1 text-sm font-medium text-slate-200',
    rowMeta: 'text-xs text-slate-500 flex-shrink-0',
    icon: 'w-5 h-5 text-blue-400 flex-shrink-0',
    pdfRow: 'inline-flex items-center gap-3 px-5 py-3 rounded-xl glass hover:bg-white/5 transition-colors text-slate-200 font-medium'
  },
  vs3: {
    badge: 'inline-block bg-cyan-50 border border-cyan-100 rounded-full px-4 py-1.5 text-xs font-semibold text-cyan-700 tracking-wider uppercase mb-4',
    title: 'text-3xl lg:text-5xl font-black mb-6 text-slate-900',
    text: 'text-slate-600 leading-relaxed',
    card: 'bg-white border border-slate-200 rounded-2xl p-6 lg:p-10 shadow-sm',
    row: 'flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-colors',
    rowText: 'flex-1 text-sm font-medium text-slate-700',
    rowMeta: 'text-xs text-slate-400 flex-shrink-0',
    icon: 'w-5 h-5 text-blue-600 flex-shrink-0',
    pdfRow: 'inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-slate-700 font-medium shadow-sm'
  }
};

const ICON_ZIP = '<path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>';
const ICON_PDF = '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>';

function url(p) {
  return BASE + '/' + p.split('/').map(encodeURIComponent).join('/');
}

function main(t) {
  const rows = TOPICS.map(([label, file, size]) => `          <a href="${url('Moviedoc/' + file)}" download rel="noopener" class="${t.row}">
            <svg class="${t.icon}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">${ICON_ZIP}</svg>
            <span class="${t.rowText}">${label}</span>
            <span class="${t.rowMeta}">${size}</span>
          </a>`).join('\n');

  return `
  <!-- ─────────────────────── MOVIEDOC ─────────────────────── -->
  <section id="moviedoc" class="pt-32 pb-24 lg:pt-40 lg:pb-32">
    <div class="max-w-4xl mx-auto px-6 lg:px-8">

      <div class="${t.badge}" data-i18n="docs.badge">Dokumentation</div>
      <h1 class="${t.title}" data-i18n="docs.title">WirthSim <span class="gradient-text">MovieDoc</span></h1>

      <p class="${t.text} mb-8" data-i18n="docs.desc">
        WirthSim MovieDoc beinhaltet ca. 100 Kurzfilme und erläutert in diesen anschaulich
        die Erstellung von Layouts. Jeder MovieDoc Film dauert zwischen 2-4 Minuten.
      </p>

      <a href="${url('Dokumentation/MovieDoc v1.6.0.pdf')}" target="_blank" rel="noopener" class="${t.pdfRow} mb-12">
        <svg class="${t.icon}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">${ICON_PDF}</svg>
        <span data-i18n="docs.overviewPdf">Übersicht MovieDoc Themen</span>
        <span class="${t.rowMeta}">PDF · 2.5 MiB</span>
      </a>

      <div class="${t.card}">
        <p class="${t.text} mb-6" data-i18n="docs.listIntro">
          Nachfolgend stehen Ihnen die folgenden Themen zum Download bereit (zip):
        </p>
        <div class="space-y-2">
${rows}
        </div>
      </div>

      <a href="index.html" class="${t.pdfRow} mt-12">
        <svg class="${t.icon}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        <span data-i18n="docs.back">Zurück zur Startseite</span>
      </a>

    </div>
  </section>
`;
}

for (const variant of ['vs2', 'vs3']) {
  const src = fs.readFileSync(path.join(ROOT, variant, 'index.html'), 'utf8');

  const heroAt = src.indexOf('  <!-- ─────────────────────── HERO');
  const footerAt = src.indexOf('  <!-- ─────────────────────── FOOTER');
  if (heroAt < 0 || footerAt < 0) throw new Error('markers not found in ' + variant + '/index.html');

  let head = src.slice(0, heroAt);
  let tail = src.slice(footerAt);

  // Anchors have to point back at the landing page from a separate document
  const relink = (s) => s
    .replace(/href="#"/g, 'href="index.html"')
    .replace(/href="#(features|screenshot|training|news|about|download)"/g, 'href="index.html#$1"');

  head = relink(head)
    .replace('<html lang="de">', '<html lang="de" data-i18n-title="docs.metaTitle">')
    .replace(/<title>[^<]*<\/title>/, '<title>WirthSim MovieDoc — Dokumentation</title>')
    // The language switcher uses href="#" as a no-op; relink must not break it
    .replace(/(data-lang-option="[a-z]{2}"[^>]*)href="index\.html"/g, '$1href="#"')
    .replace(/href="index\.html"(\s+data-lang-option)/g, 'href="#"$1');

  tail = relink(tail)
    // No form on this page
    .replace(/\s*<script src="\.\.\/download-form\.js"><\/script>/, '');

  fs.writeFileSync(path.join(ROOT, variant, 'dokumentation.html'), head + main(THEMES[variant]) + tail);
  console.log('written', variant + '/dokumentation.html');
}
