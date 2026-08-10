# Offene Punkte / Fragen an Hermann Wirth

Internal working notes. Not published: the folder starts with `_`, so Jekyll (GitHub Pages default) skips it.

Status: open = waiting for Hermann · done = answered and applied.

---

## 1. Schulungen — kostenlos oder kostenpflichtig? — **open**

The old site contradicts itself:

- Home page: *"Nehmen Sie an einer **kostenfreien** Schulung teil."*
- Sub-page `home-news/Weiterbildung.html`: *"Der Zeitbedarf und **Kosten** richtet sich nach den gewünschten Ausbildungsmodulen … wir unterbreiten Ihnen gerne ein Angebot."*

Both texts are now on the new page, in the same section — so the contradiction is visible in one screen:
`training.desc` promises a free course, `training.p2` mentions costs, and the bullet
`training.li3` says *"Vollständig kostenlos — keine versteckten Gebühren"*.

**Question:** which is correct? Free introduction plus paid modules, or free throughout?
Depending on the answer, `training.desc`, `training.p2` and `training.li3` have to be aligned.

---

## 2. Version numbers in the news section — **open**

- Old site: *"Ab dem Release **1.6.0** wurden die Einschränkungen für die private Nutzung aufgehoben."*
- New site says the same sentence but with the current version **1.7.3**.

**Question:** keep the historically correct 1.6.0, or is the sentence meant to describe the current release?

---

## 3. "Über 10.000 Anwender" vs. "über 10'000 Downloads" — **open**

- Old site (`wirthsim-68.html`): *"Die Freeware … wurde seit 2009 weit über **10'000 mal** von unserer Webseite herunter **geladen**."* → downloads.
- New site states **10.000 users worldwide** in several places (`stats.users`, `feat6.desc`, `news.r1Desc`, `news.r2Desc`).

**Question:** may we claim 10,000 *users*, or should it stay 10,000 *downloads*? Is there a newer figure?

---

## 4. PDFs and documentation are still at version 1.6.0 — **open**

Linked product PDFs: `Short_WirthSim_v1.6.0_german.pdf`, `All_WirthSim_v1.6.0_german.pdf`;
MovieDoc overview: `MovieDoc v1.6.0.pdf`. The installer, however, is 1.7.3.

**Questions:** are there updated documents for 1.7.3? Do English (or other language) versions exist?
Currently non-German pages label these links with a "(DE)" hint.

---

## 5. Product presentation video — **open**

`WirthSim_de_Eco_Sim_v2.0.wmv` — a `.wmv` file that does not play in a browser; it downloads instead.

**Questions:** is there an MP4 version, or a YouTube/Vimeo link we could embed? German only?

---

## 6. Second recipient of the download form — **done**

Both Web3Forms access keys are configured in `download-form.js` → `ACCESS_KEYS`:
andrey.nsk@gmail.com and hermann.wirth@wirthsim.com. Every submission is sent to both.

---

## 7. The download form doubles as the contact form — **open**

The old site had a separate `kontakt.html`. On the new page the same fields
(name, e-mail, company, message) live in the `#download` section, headed
"Vor dem Download". Submissions reach both recipients, so it works as a contact
channel — but a visitor who only wants to ask a question may not look for it there.

**Question:** should the section wording be widened (e.g. "Download & Kontakt"), or
should a separate contact block be added? Is there an address/phone/Skype handle we
may publish directly?
