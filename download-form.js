/* WirthSim — download gate form.
   Shared by vs2/index.html and vs3/index.html (loaded after i18n.js).

   Before the file list is shown, the visitor fills in a short form. The data
   is e-mailed via Web3Forms (GitHub Pages is static and cannot send mail
   itself). We need the lead to reach TWO inboxes; the free Web3Forms plan has
   no CC, so we fire one request per access key — one key per recipient.

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
    "YOUR_WEB3FORMS_KEY_FOR_SECOND_EMAIL"          // recipient #2
  ];
  var ENDPOINT = "https://api.web3forms.com/submit";
  var SUBJECT = "WirthSim — neue Download-Anfrage";

  function isKeyConfigured(k) {
    return k && k.indexOf("YOUR_WEB3FORMS_KEY") !== 0;
  }

  /* ─────────────────────────── ELEMENTS ─────────────────────────── */
  function init() {
    var modal = document.querySelector("[data-download-modal]");
    if (!modal) return;

    var form = modal.querySelector("[data-download-form]");
    var formState = modal.querySelector("[data-state-form]");
    var successState = modal.querySelector("[data-state-success]");
    var submitBtn = modal.querySelector("[data-submit-btn]");
    var labelIdle = modal.querySelector("[data-label-idle]");
    var labelSending = modal.querySelector("[data-label-sending]");
    var firstField = form ? form.querySelector("input, textarea") : null;

    /* ── open / close ── */
    function openModal(e) {
      if (e) e.preventDefault();
      resetToForm();
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
      if (firstField) { try { firstField.focus(); } catch (err) {} }
    }

    function closeModal() {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }

    function setSending(on) {
      if (submitBtn) submitBtn.disabled = on;
      if (labelIdle) labelIdle.classList.toggle("hidden", on);
      if (labelSending) labelSending.classList.toggle("hidden", !on);
    }

    function resetToForm() {
      if (formState) formState.classList.remove("hidden");
      if (successState) successState.classList.add("hidden");
      setSending(false);
    }

    function showSuccess() {
      if (formState) formState.classList.add("hidden");
      if (successState) successState.classList.remove("hidden");
    }

    document.querySelectorAll("[data-download-open]").forEach(function (btn) {
      btn.addEventListener("click", openModal);
    });
    modal.querySelectorAll("[data-modal-close]").forEach(function (btn) {
      btn.addEventListener("click", closeModal);
    });
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });

    /* ── submit ── */
    if (form) {
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

        // sending state
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
  }

  function getVal(form, name) {
    var el = form.querySelector("[name='" + name + "']");
    return el ? el.value.trim() : "";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
