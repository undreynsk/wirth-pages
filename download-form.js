/* WirthSim — download gate form.
   Shared by vs2/index.html and vs3/index.html (loaded after i18n.js).

   The file list is hidden until the visitor submits a short inline form in the
   download section. The data is e-mailed via Web3Forms (GitHub Pages is static
   and cannot send mail itself). We need the lead to reach TWO inboxes; the free
   Web3Forms plan has no CC, so we fire one request per access key — one key per
   recipient.

   SETUP — replace the two placeholders below with real Web3Forms access keys:
     1. Go to https://web3forms.com → enter the FIRST recipient e-mail
        (andrey.nsk@gmail.com) → confirm it → copy the access key here.
     2. Repeat for the SECOND recipient and paste its key as the 2nd entry.
   Until real keys are set, the form still works but no mail is sent — the file
   list is shown regardless (a 3rd-party outage must not block downloads). */
(function () {
  "use strict";

  /* ──────────────────────────── CONFIG ──────────────────────────── */
  var ACCESS_KEYS = [
    "2189cfb6-9e4f-43ae-9b06-39cc7fb5f3a4", // recipient #1 — andrey.nsk@gmail.com
    "620aed3f-e94e-4808-aa62-67b083d0cfc1"  // recipient #2 — hermann.wirth@wirthsim.com
  ];
  var ENDPOINT = "https://api.web3forms.com/submit";
  var SUBJECT = "WirthSim — neue Download-Anfrage";

  function isKeyConfigured(k) {
    return k && k.indexOf("YOUR_WEB3FORMS_KEY") !== 0;
  }

  function getVal(form, name) {
    var el = form.querySelector("[name='" + name + "']");
    return el ? el.value.trim() : "";
  }

  /* ─────────────────────────── INIT ─────────────────────────── */
  function init() {
    var form = document.querySelector("[data-download-form]");
    if (!form) return;

    var formState = document.querySelector("[data-state-form]");
    var successState = document.querySelector("[data-state-success]");
    var submitBtn = document.querySelector("[data-submit-btn]");
    var labelIdle = document.querySelector("[data-label-idle]");
    var labelSending = document.querySelector("[data-label-sending]");

    function setSending(on) {
      if (submitBtn) submitBtn.disabled = on;
      if (labelIdle) labelIdle.classList.toggle("hidden", on);
      if (labelSending) labelSending.classList.toggle("hidden", !on);
    }

    function showSuccess() {
      if (formState) formState.classList.add("hidden");
      if (successState) {
        successState.classList.remove("hidden");
        try { successState.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) {}
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // honeypot: real users never fill this hidden field
      var trap = form.querySelector("[name='botcheck']");
      if (trap && trap.value) { showSuccess(); return; }

      if (typeof form.reportValidity === "function" && !form.reportValidity()) return;

      var data = {
        name: getVal(form, "name"),
        email: getVal(form, "email"),
        company: getVal(form, "company"),
        message: getVal(form, "message")
      };

      setSending(true);

      var requests = ACCESS_KEYS.filter(isKeyConfigured).map(function (key) {
        return fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: key,
            subject: SUBJECT,
            from_name: "WirthSim Download (" + (data.company || data.name || "—") + ")",
            name: data.name,
            email: data.email,
            company: data.company,
            message: data.message,
            botcheck: false
          })
        }).then(function (r) { return r.json(); });
      });

      // Show the files no matter what — a Web3Forms outage must not block downloads.
      if (requests.length === 0) {
        console.warn("[download-form] No Web3Forms access key configured — mail not sent.");
        showSuccess();
        return;
      }
      Promise.allSettled(requests)
        .then(function (results) {
          results.forEach(function (res) {
            if (res.status === "rejected" || (res.value && res.value.success === false)) {
              console.warn("[download-form] Web3Forms submission issue:", res.reason || res.value);
            }
          });
        })
        .finally(showSuccess);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
