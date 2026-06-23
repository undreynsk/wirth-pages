/* WirthSim — shared i18n dictionary + language switcher
   Used by vs2/index.html and vs3/index.html.
   Markup is translated via [data-i18n] (innerHTML) attributes.
   Language is resolved from ?lang= → localStorage → browser → default (de). */
(function () {
  "use strict";

  var DEFAULT_LANG = "de";
  var STORAGE_KEY = "wirthsim-lang";

  /* Single source of truth for the product version.
     Update this one value on every release — it propagates to:
       - {v} placeholders in the dictionary strings below,
       - [data-version] elements (full, e.g. "1.7.3"),
       - [data-version-short] elements (major.minor, e.g. "1.7"),
       - the [data-download] installer link. */
  var VERSION = "1.7.3";
  var VERSION_SHORT = VERSION.split(".").slice(0, 2).join(".");
  var DOWNLOAD_URL =
    "https://wirthsim.com/files/theme-src/Download/wirthsim-" + VERSION + "-win64.msi";

  function fillVersion(str) {
    return String(str).replace(/\{v\}/g, VERSION);
  }

  var LANGS = [
    { code: "de", label: "Deutsch",  short: "DE" },
    { code: "en", label: "English",  short: "EN" },
    { code: "fr", label: "Français", short: "FR" },
    { code: "it", label: "Italiano", short: "IT" },
    { code: "ru", label: "Русский",  short: "RU" },
    { code: "zh", label: "中文",      short: "中文" }
  ];

  var I18N = {
    de: {
      "meta.title": "WirthSim — Logistik Simulation Software",
      "header.tagline": "Logistik Simulation",
      "nav.home": "Home",
      "nav.product": "Produkt",
      "nav.view": "Ansicht",
      "nav.training": "Weiterbildung",
      "nav.news": "Neuigkeiten",
      "nav.download": "Download",
      "hero.badge": "Version {v} — Kostenlos &amp; Unbegrenzt",
      "hero.title": "Automatische<br><span class=\"gradient-text\">Logistiksysteme</span><br>simulieren",
      "hero.desc": "WirthSim Professional ist eine leistungsstarke Freeware zur Simulation automatischer Logistiksysteme — modular, intuitiv und ohne Programmierkenntnisse bedienbar. Für Industrie, Bildung und Forschung.",
      "hero.btnDownload": "Kostenlos herunterladen",
      "hero.btnDemo": "Demo ansehen",
      "hero.scroll": "Mehr entdecken",
      "stats.users": "Anwender weltweit",
      "stats.free": "Kostenlos",
      "stats.version": "Aktuelle Version",
      "stats.coding": "Coding erforderlich",
      "screenshot.badge": "Software Ansicht",
      "screenshot.title": "Leistungsstark &amp; <span class=\"gradient-text\">Intuitiv</span>",
      "screenshot.desc": "Eine durchdachte Benutzeroberfläche, mit der Sie komplexe Logistiksysteme ohne Programmierkenntnisse modellieren und simulieren.",
      "screenshot.video": "Videopräsentation ansehen",
      "features.badge": "Produktfeatures",
      "features.title": "Alles was Sie für die<br><span class=\"gradient-text\">Logistiksimulation</span> brauchen",
      "features.desc": "WirthSim Professional deckt den gesamten Prozess der Modellierung, Simulation und Analyse automatischer Logistiksysteme ab.",
      "feat1.title": "Modularer Aufbau",
      "feat1.desc": "Flexibel zusammenstellbare Komponenten ermöglichen die Modellierung beliebig komplexer Logistiksysteme — ganz ohne Programmierkenntnisse.",
      "feat2.title": "Echtzeit-Analyse",
      "feat2.desc": "Verfolgen Sie alle Simulationsparameter in Echtzeit und erhalten Sie detaillierte Auswertungen zur Optimierung Ihrer Systeme.",
      "feat3.title": "Automatische Systeme",
      "feat3.desc": "Speziell entwickelt für die Simulation automatischer Logistiksysteme — Förderbänder, Sortiersysteme, Lager und mehr.",
      "feat4.title": "Vollständig kostenlos",
      "feat4.desc": "WirthSim Professional ist Freeware — ohne Einschränkungen, ohne versteckte Kosten, für private und kommerzielle Nutzung.",
      "feat5.title": "Bildung &amp; Schulung",
      "feat5.desc": "Ideal für Hochschulen, Berufsschulen und Unternehmen. Kostenlose Online-Schulungen direkt durch den Entwickler Hermann Wirth.",
      "feat6.title": "Bewährt &amp; Zuverlässig",
      "feat6.desc": "Über 10.000 Anwender weltweit vertrauen auf WirthSim Professional für ihre Simulations- und Planungsaufgaben.",
      "training.badge": "Weiterbildung",
      "training.title": "Kostenlose<br><span class=\"gradient-text\">Online-Schulung</span>",
      "training.desc": "Nehmen Sie an einer kostenfreien Schulung teil. Diese wird online mittels Skype durch den Erfinder der Anwendung <strong class=\"font-semibold\">Hermann Wirth</strong> persönlich durchgeführt.",
      "training.li1": "Direkt vom Entwickler — persönliche Betreuung",
      "training.li2": "Online via Skype — von überall aus zugänglich",
      "training.li3": "Vollständig kostenlos — keine versteckten Gebühren",
      "training.cta": "Schulung anfragen",
      "training.role": "Entwickler &amp; Trainer",
      "training.skill1": "Simulation Grundlagen",
      "training.skill2": "Systemmodellierung",
      "training.skill3": "Analyse &amp; Optimierung",
      "training.skypeLabel": "Kontakt via Skype",
      "training.skypeAction": "Jetzt Termin vereinbaren",
      "news.badge": "Neuigkeiten",
      "news.title": "Aktuelle <span class=\"gradient-text\">Updates</span>",
      "news.r1Title": "Release {v}",
      "news.r1Badge": "Aktuell",
      "news.r1Desc": "Ab dem Release {v} wurden die Einschränkungen für die private Nutzung aufgehoben. Es freut uns, den weltweit über <strong class=\"font-semibold\">10.000 WirthSim-Anwendern</strong> unser Produkt nun uneingeschränkt zur Verfügung zu stellen.",
      "news.r2Title": "Weltweite Verbreitung",
      "news.r2Desc": "WirthSim Professional wird von über 10.000 Anwendern weltweit eingesetzt — in Industrie, Bildungseinrichtungen und Forschungsprojekten.",
      "download.badge": "Download",
      "download.title": "Jetzt <span class=\"gradient-text\">kostenlos</span><br>herunterladen",
      "download.desc": "WirthSim Professional — vollständig frei, ohne Registrierung, für die private und kommerzielle Nutzung.",
      "download.cardSub": "Version {v} · Freeware",
      "download.statVersionLabel": "Version",
      "download.statLicenseValue": "Frei",
      "download.statLicenseLabel": "Lizenz",
      "download.statPlatformLabel": "Plattform",
      "download.btn": "Download starten",
      "footer.copy": "Design &amp; Bilder © Copyright Wirthsim"
    },

    en: {
      "meta.title": "WirthSim — Logistics Simulation Software",
      "header.tagline": "Logistics Simulation",
      "nav.home": "Home",
      "nav.product": "Product",
      "nav.view": "Preview",
      "nav.training": "Training",
      "nav.news": "News",
      "nav.download": "Download",
      "hero.badge": "Version {v} — Free &amp; Unlimited",
      "hero.title": "Simulate automated<br><span class=\"gradient-text\">logistics systems</span>",
      "hero.desc": "WirthSim Professional is a powerful freeware tool for simulating automated logistics systems — modular, intuitive and usable without any programming knowledge. For industry, education and research.",
      "hero.btnDownload": "Download for free",
      "hero.btnDemo": "Watch demo",
      "hero.scroll": "Discover more",
      "stats.users": "Users worldwide",
      "stats.free": "Free",
      "stats.version": "Current version",
      "stats.coding": "Coding required",
      "screenshot.badge": "Software Preview",
      "screenshot.title": "Powerful &amp; <span class=\"gradient-text\">Intuitive</span>",
      "screenshot.desc": "A thoughtfully designed interface that lets you model and simulate complex logistics systems without any programming knowledge.",
      "screenshot.video": "Watch video presentation",
      "features.badge": "Product Features",
      "features.title": "Everything you need for<br><span class=\"gradient-text\">logistics simulation</span>",
      "features.desc": "WirthSim Professional covers the entire process of modeling, simulating and analyzing automated logistics systems.",
      "feat1.title": "Modular design",
      "feat1.desc": "Flexibly combinable components let you model logistics systems of any complexity — entirely without programming knowledge.",
      "feat2.title": "Real-time analysis",
      "feat2.desc": "Track all simulation parameters in real time and receive detailed evaluations to optimize your systems.",
      "feat3.title": "Automated systems",
      "feat3.desc": "Specially developed for simulating automated logistics systems — conveyor belts, sorting systems, warehouses and more.",
      "feat4.title": "Completely free",
      "feat4.desc": "WirthSim Professional is freeware — no restrictions, no hidden costs, for private and commercial use.",
      "feat5.title": "Education &amp; Training",
      "feat5.desc": "Ideal for universities, vocational schools and companies. Free online training directly from developer Hermann Wirth.",
      "feat6.title": "Proven &amp; Reliable",
      "feat6.desc": "Over 10,000 users worldwide rely on WirthSim Professional for their simulation and planning tasks.",
      "training.badge": "Training",
      "training.title": "Free<br><span class=\"gradient-text\">online training</span>",
      "training.desc": "Take part in a free training session. It is conducted online via Skype, personally by the application's inventor <strong class=\"font-semibold\">Hermann Wirth</strong>.",
      "training.li1": "Directly from the developer — personal guidance",
      "training.li2": "Online via Skype — accessible from anywhere",
      "training.li3": "Completely free — no hidden fees",
      "training.cta": "Request training",
      "training.role": "Developer &amp; Trainer",
      "training.skill1": "Simulation basics",
      "training.skill2": "System modeling",
      "training.skill3": "Analysis &amp; optimization",
      "training.skypeLabel": "Contact via Skype",
      "training.skypeAction": "Schedule an appointment now",
      "news.badge": "News",
      "news.title": "Latest <span class=\"gradient-text\">updates</span>",
      "news.r1Title": "Release {v}",
      "news.r1Badge": "Current",
      "news.r1Desc": "As of release {v}, the restrictions for private use have been lifted. We are pleased to now offer our product without limitations to over <strong class=\"font-semibold\">10,000 WirthSim users</strong> worldwide.",
      "news.r2Title": "Worldwide adoption",
      "news.r2Desc": "WirthSim Professional is used by over 10,000 users worldwide — in industry, educational institutions and research projects.",
      "download.badge": "Download",
      "download.title": "Download <span class=\"gradient-text\">for free</span><br>now",
      "download.desc": "WirthSim Professional — completely free, no registration, for private and commercial use.",
      "download.cardSub": "Version {v} · Freeware",
      "download.statVersionLabel": "Version",
      "download.statLicenseValue": "Free",
      "download.statLicenseLabel": "License",
      "download.statPlatformLabel": "Platform",
      "download.btn": "Start download",
      "footer.copy": "Design &amp; Images © Copyright Wirthsim"
    },

    fr: {
      "meta.title": "WirthSim — Logiciel de simulation logistique",
      "header.tagline": "Simulation logistique",
      "nav.home": "Accueil",
      "nav.product": "Produit",
      "nav.view": "Aperçu",
      "nav.training": "Formation",
      "nav.news": "Actualités",
      "nav.download": "Télécharger",
      "hero.badge": "Version {v} — Gratuit &amp; illimité",
      "hero.title": "Simuler des systèmes<br><span class=\"gradient-text\">logistiques automatisés</span>",
      "hero.desc": "WirthSim Professional est un logiciel gratuit puissant pour la simulation de systèmes logistiques automatisés — modulaire, intuitif et utilisable sans aucune connaissance en programmation. Pour l'industrie, l'éducation et la recherche.",
      "hero.btnDownload": "Télécharger gratuitement",
      "hero.btnDemo": "Voir la démo",
      "hero.scroll": "Découvrir plus",
      "stats.users": "Utilisateurs dans le monde",
      "stats.free": "Gratuit",
      "stats.version": "Version actuelle",
      "stats.coding": "Codage requis",
      "screenshot.badge": "Aperçu du logiciel",
      "screenshot.title": "Puissant &amp; <span class=\"gradient-text\">intuitif</span>",
      "screenshot.desc": "Une interface pensée dans les moindres détails qui vous permet de modéliser et de simuler des systèmes logistiques complexes sans aucune connaissance en programmation.",
      "screenshot.video": "Voir la présentation vidéo",
      "features.badge": "Fonctionnalités",
      "features.title": "Tout ce dont vous avez besoin pour la<br><span class=\"gradient-text\">simulation logistique</span>",
      "features.desc": "WirthSim Professional couvre l'ensemble du processus de modélisation, de simulation et d'analyse des systèmes logistiques automatisés.",
      "feat1.title": "Architecture modulaire",
      "feat1.desc": "Des composants combinables en toute flexibilité permettent de modéliser des systèmes logistiques d'une complexité illimitée — sans aucune connaissance en programmation.",
      "feat2.title": "Analyse en temps réel",
      "feat2.desc": "Suivez tous les paramètres de simulation en temps réel et obtenez des évaluations détaillées pour optimiser vos systèmes.",
      "feat3.title": "Systèmes automatisés",
      "feat3.desc": "Spécialement conçu pour la simulation de systèmes logistiques automatisés — convoyeurs, systèmes de tri, entrepôts et plus encore.",
      "feat4.title": "Entièrement gratuit",
      "feat4.desc": "WirthSim Professional est un logiciel gratuit — sans restrictions, sans coûts cachés, pour un usage privé et commercial.",
      "feat5.title": "Éducation &amp; formation",
      "feat5.desc": "Idéal pour les universités, les écoles professionnelles et les entreprises. Formations en ligne gratuites directement par le développeur Hermann Wirth.",
      "feat6.title": "Éprouvé &amp; fiable",
      "feat6.desc": "Plus de 10 000 utilisateurs dans le monde font confiance à WirthSim Professional pour leurs tâches de simulation et de planification.",
      "training.badge": "Formation",
      "training.title": "Formation en ligne<br><span class=\"gradient-text\">gratuite</span>",
      "training.desc": "Participez à une formation gratuite. Elle est dispensée en ligne via Skype, personnellement par l'inventeur de l'application <strong class=\"font-semibold\">Hermann Wirth</strong>.",
      "training.li1": "Directement par le développeur — accompagnement personnalisé",
      "training.li2": "En ligne via Skype — accessible de partout",
      "training.li3": "Entièrement gratuit — sans frais cachés",
      "training.cta": "Demander une formation",
      "training.role": "Développeur &amp; formateur",
      "training.skill1": "Bases de la simulation",
      "training.skill2": "Modélisation des systèmes",
      "training.skill3": "Analyse &amp; optimisation",
      "training.skypeLabel": "Contact via Skype",
      "training.skypeAction": "Prendre rendez-vous maintenant",
      "news.badge": "Actualités",
      "news.title": "Dernières <span class=\"gradient-text\">mises à jour</span>",
      "news.r1Title": "Version {v}",
      "news.r1Badge": "Actuelle",
      "news.r1Desc": "À partir de la version {v}, les restrictions pour l'usage privé ont été levées. Nous sommes heureux de mettre désormais notre produit à la disposition des plus de <strong class=\"font-semibold\">10 000 utilisateurs de WirthSim</strong> dans le monde, sans aucune restriction.",
      "news.r2Title": "Diffusion mondiale",
      "news.r2Desc": "WirthSim Professional est utilisé par plus de 10 000 utilisateurs dans le monde — dans l'industrie, les établissements d'enseignement et les projets de recherche.",
      "download.badge": "Télécharger",
      "download.title": "Télécharger <span class=\"gradient-text\">gratuitement</span><br>maintenant",
      "download.desc": "WirthSim Professional — entièrement gratuit, sans inscription, pour un usage privé et commercial.",
      "download.cardSub": "Version {v} · Logiciel gratuit",
      "download.statVersionLabel": "Version",
      "download.statLicenseValue": "Libre",
      "download.statLicenseLabel": "Licence",
      "download.statPlatformLabel": "Plateforme",
      "download.btn": "Démarrer le téléchargement",
      "footer.copy": "Design &amp; images © Copyright Wirthsim"
    },

    it: {
      "meta.title": "WirthSim — Software di simulazione logistica",
      "header.tagline": "Simulazione logistica",
      "nav.home": "Home",
      "nav.product": "Prodotto",
      "nav.view": "Anteprima",
      "nav.training": "Formazione",
      "nav.news": "Novità",
      "nav.download": "Download",
      "hero.badge": "Versione {v} — Gratuito e illimitato",
      "hero.title": "Simulare sistemi<br><span class=\"gradient-text\">logistici automatizzati</span>",
      "hero.desc": "WirthSim Professional è un potente software gratuito per la simulazione di sistemi logistici automatizzati — modulare, intuitivo e utilizzabile senza alcuna conoscenza di programmazione. Per industria, istruzione e ricerca.",
      "hero.btnDownload": "Scarica gratis",
      "hero.btnDemo": "Guarda la demo",
      "hero.scroll": "Scopri di più",
      "stats.users": "Utenti nel mondo",
      "stats.free": "Gratuito",
      "stats.version": "Versione attuale",
      "stats.coding": "Programmazione richiesta",
      "screenshot.badge": "Anteprima del software",
      "screenshot.title": "Potente e <span class=\"gradient-text\">intuitivo</span>",
      "screenshot.desc": "Un'interfaccia ben studiata che consente di modellare e simulare sistemi logistici complessi senza alcuna conoscenza di programmazione.",
      "screenshot.video": "Guarda la presentazione video",
      "features.badge": "Funzionalità",
      "features.title": "Tutto ciò che serve per la<br><span class=\"gradient-text\">simulazione logistica</span>",
      "features.desc": "WirthSim Professional copre l'intero processo di modellazione, simulazione e analisi dei sistemi logistici automatizzati.",
      "feat1.title": "Struttura modulare",
      "feat1.desc": "Componenti combinabili in modo flessibile consentono di modellare sistemi logistici di qualsiasi complessità — senza alcuna conoscenza di programmazione.",
      "feat2.title": "Analisi in tempo reale",
      "feat2.desc": "Monitora tutti i parametri di simulazione in tempo reale e ottieni valutazioni dettagliate per ottimizzare i tuoi sistemi.",
      "feat3.title": "Sistemi automatizzati",
      "feat3.desc": "Sviluppato appositamente per la simulazione di sistemi logistici automatizzati — nastri trasportatori, sistemi di smistamento, magazzini e altro.",
      "feat4.title": "Completamente gratuito",
      "feat4.desc": "WirthSim Professional è un software gratuito — senza restrizioni, senza costi nascosti, per uso privato e commerciale.",
      "feat5.title": "Istruzione e formazione",
      "feat5.desc": "Ideale per università, istituti professionali e aziende. Formazione online gratuita direttamente dallo sviluppatore Hermann Wirth.",
      "feat6.title": "Collaudato e affidabile",
      "feat6.desc": "Oltre 10.000 utenti nel mondo si affidano a WirthSim Professional per le loro attività di simulazione e pianificazione.",
      "training.badge": "Formazione",
      "training.title": "Formazione online<br><span class=\"gradient-text\">gratuita</span>",
      "training.desc": "Partecipa a una formazione gratuita. Viene erogata online tramite Skype, personalmente dall'inventore dell'applicazione <strong class=\"font-semibold\">Hermann Wirth</strong>.",
      "training.li1": "Direttamente dallo sviluppatore — assistenza personale",
      "training.li2": "Online tramite Skype — accessibile ovunque",
      "training.li3": "Completamente gratuito — nessun costo nascosto",
      "training.cta": "Richiedi formazione",
      "training.role": "Sviluppatore e formatore",
      "training.skill1": "Basi della simulazione",
      "training.skill2": "Modellazione dei sistemi",
      "training.skill3": "Analisi e ottimizzazione",
      "training.skypeLabel": "Contatto via Skype",
      "training.skypeAction": "Fissa subito un appuntamento",
      "news.badge": "Novità",
      "news.title": "Ultimi <span class=\"gradient-text\">aggiornamenti</span>",
      "news.r1Title": "Versione {v}",
      "news.r1Badge": "Attuale",
      "news.r1Desc": "A partire dalla versione {v} sono state rimosse le restrizioni per l'uso privato. Siamo lieti di mettere ora il nostro prodotto a disposizione degli oltre <strong class=\"font-semibold\">10.000 utenti di WirthSim</strong> nel mondo, senza alcuna limitazione.",
      "news.r2Title": "Diffusione mondiale",
      "news.r2Desc": "WirthSim Professional è utilizzato da oltre 10.000 utenti nel mondo — nell'industria, negli istituti di formazione e nei progetti di ricerca.",
      "download.badge": "Download",
      "download.title": "Scarica <span class=\"gradient-text\">gratis</span><br>ora",
      "download.desc": "WirthSim Professional — completamente gratuito, senza registrazione, per uso privato e commerciale.",
      "download.cardSub": "Versione {v} · Software gratuito",
      "download.statVersionLabel": "Versione",
      "download.statLicenseValue": "Libera",
      "download.statLicenseLabel": "Licenza",
      "download.statPlatformLabel": "Piattaforma",
      "download.btn": "Avvia il download",
      "footer.copy": "Design e immagini © Copyright Wirthsim"
    },

    ru: {
      "meta.title": "WirthSim — ПО для симуляции логистики",
      "header.tagline": "Симуляция логистики",
      "nav.home": "Главная",
      "nav.product": "Продукт",
      "nav.view": "Обзор",
      "nav.training": "Обучение",
      "nav.news": "Новости",
      "nav.download": "Скачать",
      "hero.badge": "Версия {v} — Бесплатно и без ограничений",
      "hero.title": "Симуляция<br><span class=\"gradient-text\">автоматических логистических систем</span>",
      "hero.desc": "WirthSim Professional — это мощное бесплатное ПО для симуляции автоматических логистических систем: модульное, интуитивно понятное и не требующее навыков программирования. Для промышленности, образования и исследований.",
      "hero.btnDownload": "Скачать бесплатно",
      "hero.btnDemo": "Посмотреть демо",
      "hero.scroll": "Узнать больше",
      "stats.users": "Пользователей по миру",
      "stats.free": "Бесплатно",
      "stats.version": "Текущая версия",
      "stats.coding": "Строк кода нужно",
      "screenshot.badge": "Обзор программы",
      "screenshot.title": "Мощно и <span class=\"gradient-text\">интуитивно</span>",
      "screenshot.desc": "Продуманный интерфейс, позволяющий моделировать и симулировать сложные логистические системы без навыков программирования.",
      "screenshot.video": "Посмотреть видеопрезентацию",
      "features.badge": "Возможности",
      "features.title": "Всё необходимое для<br><span class=\"gradient-text\">симуляции логистики</span>",
      "features.desc": "WirthSim Professional охватывает весь процесс моделирования, симуляции и анализа автоматических логистических систем.",
      "feat1.title": "Модульная структура",
      "feat1.desc": "Гибко комбинируемые компоненты позволяют моделировать логистические системы любой сложности — совершенно без навыков программирования.",
      "feat2.title": "Анализ в реальном времени",
      "feat2.desc": "Отслеживайте все параметры симуляции в реальном времени и получайте детальную аналитику для оптимизации ваших систем.",
      "feat3.title": "Автоматические системы",
      "feat3.desc": "Специально разработано для симуляции автоматических логистических систем — конвейеров, сортировочных систем, складов и многого другого.",
      "feat4.title": "Полностью бесплатно",
      "feat4.desc": "WirthSim Professional — это бесплатное ПО: без ограничений, без скрытых платежей, для личного и коммерческого использования.",
      "feat5.title": "Образование и обучение",
      "feat5.desc": "Идеально для вузов, профессиональных училищ и компаний. Бесплатное онлайн-обучение напрямую от разработчика Германа Вирта.",
      "feat6.title": "Проверено и надёжно",
      "feat6.desc": "Более 10 000 пользователей по всему миру доверяют WirthSim Professional для задач симуляции и планирования.",
      "training.badge": "Обучение",
      "training.title": "Бесплатное<br><span class=\"gradient-text\">онлайн-обучение</span>",
      "training.desc": "Примите участие в бесплатном обучении. Оно проводится онлайн через Skype лично изобретателем приложения <strong class=\"font-semibold\">Германом Виртом</strong>.",
      "training.li1": "Напрямую от разработчика — персональное сопровождение",
      "training.li2": "Онлайн через Skype — доступно из любой точки мира",
      "training.li3": "Полностью бесплатно — без скрытых платежей",
      "training.cta": "Запросить обучение",
      "training.role": "Разработчик и тренер",
      "training.skill1": "Основы симуляции",
      "training.skill2": "Моделирование систем",
      "training.skill3": "Анализ и оптимизация",
      "training.skypeLabel": "Контакт через Skype",
      "training.skypeAction": "Назначить встречу",
      "news.badge": "Новости",
      "news.title": "Свежие <span class=\"gradient-text\">обновления</span>",
      "news.r1Title": "Релиз {v}",
      "news.r1Badge": "Актуально",
      "news.r1Desc": "Начиная с релиза {v} сняты ограничения для частного использования. Мы рады предоставить наш продукт без ограничений более чем <strong class=\"font-semibold\">10 000 пользователям WirthSim</strong> по всему миру.",
      "news.r2Title": "Мировое распространение",
      "news.r2Desc": "WirthSim Professional используется более чем 10 000 пользователями по всему миру — в промышленности, образовательных учреждениях и исследовательских проектах.",
      "download.badge": "Скачать",
      "download.title": "Скачайте <span class=\"gradient-text\">бесплатно</span><br>прямо сейчас",
      "download.desc": "WirthSim Professional — полностью бесплатно, без регистрации, для личного и коммерческого использования.",
      "download.cardSub": "Версия {v} · Бесплатное ПО",
      "download.statVersionLabel": "Версия",
      "download.statLicenseValue": "Свободно",
      "download.statLicenseLabel": "Лицензия",
      "download.statPlatformLabel": "Платформа",
      "download.btn": "Начать загрузку",
      "footer.copy": "Дизайн и изображения © Copyright Wirthsim"
    },

    zh: {
      "meta.title": "WirthSim — 物流仿真软件",
      "header.tagline": "物流仿真",
      "nav.home": "首页",
      "nav.product": "产品",
      "nav.view": "预览",
      "nav.training": "培训",
      "nav.news": "新闻",
      "nav.download": "下载",
      "hero.badge": "版本 {v} — 免费且无限制",
      "hero.title": "仿真<br><span class=\"gradient-text\">自动化物流系统</span>",
      "hero.desc": "WirthSim Professional 是一款功能强大的免费软件，用于仿真自动化物流系统——模块化、直观，无需任何编程知识即可使用。适用于工业、教育和科研。",
      "hero.btnDownload": "免费下载",
      "hero.btnDemo": "观看演示",
      "hero.scroll": "了解更多",
      "stats.users": "全球用户",
      "stats.free": "免费",
      "stats.version": "当前版本",
      "stats.coding": "行代码",
      "screenshot.badge": "软件预览",
      "screenshot.title": "强大且<span class=\"gradient-text\">直观</span>",
      "screenshot.desc": "精心设计的用户界面，让您无需任何编程知识即可建模和仿真复杂的物流系统。",
      "screenshot.video": "观看视频演示",
      "features.badge": "产品功能",
      "features.title": "<span class=\"gradient-text\">物流仿真</span><br>所需的一切",
      "features.desc": "WirthSim Professional 涵盖自动化物流系统建模、仿真和分析的整个流程。",
      "feat1.title": "模块化架构",
      "feat1.desc": "灵活组合的组件可对任意复杂的物流系统进行建模——完全无需编程知识。",
      "feat2.title": "实时分析",
      "feat2.desc": "实时跟踪所有仿真参数，获取详细的评估结果以优化您的系统。",
      "feat3.title": "自动化系统",
      "feat3.desc": "专为自动化物流系统仿真而开发——输送带、分拣系统、仓库等。",
      "feat4.title": "完全免费",
      "feat4.desc": "WirthSim Professional 是免费软件——没有限制，没有隐藏费用，可用于个人和商业用途。",
      "feat5.title": "教育与培训",
      "feat5.desc": "非常适合高校、职业学校和企业。由开发者 Hermann Wirth 直接提供免费在线培训。",
      "feat6.title": "成熟可靠",
      "feat6.desc": "全球超过 10,000 名用户信赖 WirthSim Professional 来完成仿真和规划任务。",
      "training.badge": "培训",
      "training.title": "免费<br><span class=\"gradient-text\">在线培训</span>",
      "training.desc": "参加免费培训。培训通过 Skype 在线进行，由应用程序的发明者 <strong class=\"font-semibold\">Hermann Wirth</strong> 亲自授课。",
      "training.li1": "直接来自开发者——个人指导",
      "training.li2": "通过 Skype 在线进行——随时随地可用",
      "training.li3": "完全免费——没有隐藏费用",
      "training.cta": "申请培训",
      "training.role": "开发者兼讲师",
      "training.skill1": "仿真基础",
      "training.skill2": "系统建模",
      "training.skill3": "分析与优化",
      "training.skypeLabel": "通过 Skype 联系",
      "training.skypeAction": "立即预约",
      "news.badge": "新闻",
      "news.title": "最新<span class=\"gradient-text\">动态</span>",
      "news.r1Title": "版本 {v}",
      "news.r1Badge": "最新",
      "news.r1Desc": "从版本 {v} 起，已取消对个人使用的限制。我们很高兴现在能够向全球超过 <strong class=\"font-semibold\">10,000 名 WirthSim 用户</strong> 无限制地提供我们的产品。",
      "news.r2Title": "全球应用",
      "news.r2Desc": "WirthSim Professional 被全球超过 10,000 名用户使用——遍及工业、教育机构和科研项目。",
      "download.badge": "下载",
      "download.title": "立即<span class=\"gradient-text\">免费</span><br>下载",
      "download.desc": "WirthSim Professional——完全免费，无需注册，可用于个人和商业用途。",
      "download.cardSub": "版本 {v} · 免费软件",
      "download.statVersionLabel": "版本",
      "download.statLicenseValue": "免费",
      "download.statLicenseLabel": "许可",
      "download.statPlatformLabel": "平台",
      "download.btn": "开始下载",
      "footer.copy": "设计与图片 © 版权所有 Wirthsim"
    }
  };

  function resolveLang() {
    var url = new URLSearchParams(location.search).get("lang");
    if (url && I18N[url]) return url;
    var stored;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (stored && I18N[stored]) return stored;
    var nav = (navigator.language || navigator.userLanguage || "").slice(0, 2).toLowerCase();
    if (I18N[nav]) return nav;
    return DEFAULT_LANG;
  }

  function apply(lang) {
    var dict = I18N[lang] || I18N[DEFAULT_LANG];
    document.documentElement.lang = lang;
    if (dict["meta.title"]) document.title = fillVersion(dict["meta.title"]);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.innerHTML = fillVersion(dict[key]);
    });

    document.querySelectorAll("[data-version]").forEach(function (el) {
      el.textContent = VERSION;
    });
    document.querySelectorAll("[data-version-short]").forEach(function (el) {
      el.textContent = VERSION_SHORT;
    });
    document.querySelectorAll("[data-download]").forEach(function (el) {
      el.setAttribute("href", DOWNLOAD_URL);
    });

    var meta = LANGS.filter(function (l) { return l.code === lang; })[0];
    document.querySelectorAll("[data-lang-current]").forEach(function (el) {
      el.textContent = meta ? meta.short : lang.toUpperCase();
    });
    document.querySelectorAll("[data-lang-option]").forEach(function (el) {
      el.setAttribute("aria-current", el.getAttribute("data-lang-option") === lang ? "true" : "false");
    });
  }

  function setLang(lang, persist) {
    if (!I18N[lang]) lang = DEFAULT_LANG;
    apply(lang);
    if (persist !== false) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
      var url = new URL(location.href);
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url);
    }
  }

  function closeMenus() {
    document.querySelectorAll("[data-lang-menu].open").forEach(function (m) {
      m.classList.remove("open");
    });
  }

  function init() {
    setLang(resolveLang(), false);

    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var menu = btn.parentElement.querySelector("[data-lang-menu]");
        var wasOpen = menu && menu.classList.contains("open");
        closeMenus();
        if (menu && !wasOpen) menu.classList.add("open");
      });
    });

    document.querySelectorAll("[data-lang-option]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        setLang(el.getAttribute("data-lang-option"));
        closeMenus();
      });
    });

    document.addEventListener("click", closeMenus);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
