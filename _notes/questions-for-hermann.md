# Offene Punkte / Fragen an Hermann Wirth

Internal working notes. Not published: the folder starts with `_`, so the deploy
workflow skips it and it never reaches the site.

Only open questions live here. Once a point is settled it is removed -- the reasoning
stays in the commit message and in the version log.

**New site, current state:**
[dark theme](https://undreynsk.github.io/wirth-pages/vs2/) |
[light theme](https://undreynsk.github.io/wirth-pages/vs3/) |
[all versions](https://undreynsk.github.io/wirth-pages/versions.html)

---

## 1. Schulungen -- kostenlos oder kostenpflichtig? -- **open**

The old site contradicts itself:

- [Home page](https://wirthsim.com/): *"Nehmen Sie an einer **kostenfreien** Schulung teil."*
- [Weiterbildung](https://wirthsim.com/home-news/Weiterbildung.html): *"Der Zeitbedarf und **Kosten** richtet sich nach den gewünschten Ausbildungsmodulen ... wir unterbreiten Ihnen gerne ein Angebot."*

Both texts are now on the new page, in the same section -- so the contradiction is
visible in one screen:
[dark](https://undreynsk.github.io/wirth-pages/vs2/#training) |
[light](https://undreynsk.github.io/wirth-pages/vs3/#training).
`training.desc` promises a free course, `training.p2` mentions costs, and the bullet
`training.li3` says *"Vollständig kostenlos -- keine versteckten Gebühren"*.

**Question:** which is correct? Free introduction plus paid modules, or free throughout?
Depending on the answer, `training.desc`, `training.p2` and `training.li3` have to be aligned.

---

## 2. "Über 10.000 Anwender" vs. "über 10'000 Downloads" -- **open**

The old site uses both wordings, in different places:

- [Home page](https://wirthsim.com/): *"Es freut uns den weltweit über 10'000 WirthSim **Anwendern** unser Produkt ... zur Verfügung zu stellen."* -> users
- [Über Wirthsim](https://wirthsim.com/wirthsim-68.html): *"Die Freeware ... wurde seit 2009 weit über **10'000 mal** von unserer Webseite herunter **geladen**."* -> downloads

The new site carries both, inherited from those two pages: `news.r1Desc` and `news.r2Desc`
speak of users
([dark](https://undreynsk.github.io/wirth-pages/vs2/#news) |
[light](https://undreynsk.github.io/wirth-pages/vs3/#news)),
`about.p1` of downloads
([dark](https://undreynsk.github.io/wirth-pages/vs2/#about) |
[light](https://undreynsk.github.io/wirth-pages/vs3/#about)).

**Question:** which figure is real -- 10,000 users or 10,000 downloads? Is there a newer number?
Once decided, all three places get aligned.
