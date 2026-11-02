/* ============================================================
   VARDAM'S GOA3 — Contact enquiry form: validation, formatted
   WhatsApp message, friendly confirmation, then open WhatsApp.
   ============================================================ */
(function () {
  "use strict";
  var G = window.GOA3, B = G.brand, wa = G.wa, icon = window.goa3Icon;

  var form = document.querySelector("[data-enquiry-form]");
  if (!form) return;

  /* populate interest select with plots + designs */
  var interest = form.querySelector("[name=interest]");
  if (interest) {
    var opts = ['<option value="">Select a plot or design (optional)</option>'];
    opts.push('<optgroup label="Farmhouse Plots (sample)">');
    G.plots.forEach(function (p) { opts.push('<option value="Plot ' + p.id + ' — ' + p.zone + ' zone, ' + p.areaSqm + ' sq.m">Plot ' + p.id + " — " + p.zone + " zone</option>"); });
    opts.push("</optgroup><optgroup label=\"Farmhouse Designs\">");
    G.designs.forEach(function (d) { opts.push('<option value="' + d.name + " — " + d.tag + '">' + d.name + " — " + d.tag + "</option>"); });
    opts.push("</optgroup>");
    interest.innerHTML = opts.join("");
  }

  /* confirmation modal */
  var modal = document.createElement("div");
  modal.className = "modal";
  modal.setAttribute("data-testid", "enquiry-confirm-modal");
  modal.setAttribute("role", "dialog");
  modal.innerHTML =
    '<div class="modal-backdrop" data-c-close></div>' +
    '<div class="modal-panel" style="grid-template-columns:1fr;max-width:660px">' +
      '<button class="modal-close" data-c-close aria-label="Close">' + icon("close") + "</button>" +
      '<div class="modal-body">' +
        '<span class="eyebrow">Thank You</span>' +
        "<h3>Your enquiry is ready.</h3>" +
        '<p class="small">Please review the message below. When you continue, WhatsApp will open with everything pre-filled — just press send and our team will respond.</p>' +
        '<div class="wa-preview" data-c-preview data-testid="enquiry-message-preview"></div>' +
        '<div class="p-card-actions">' +
          '<a class="btn btn-gold" data-c-go href="#" target="_blank" rel="noopener" data-testid="enquiry-send-whatsapp">' + window.GOA3_WA_ICON + "<span>Continue to WhatsApp</span></a>" +
          '<button class="btn btn-outline" data-c-close data-testid="enquiry-edit">Edit Details</button>' +
        "</div>" +
      "</div>" +
    "</div>";
  document.body.appendChild(modal);

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  modal.addEventListener("click", function (e) {
    if (e.target.closest("[data-c-close]")) closeModal();
  });
  modal.querySelector("[data-c-go]").addEventListener("click", function () {
    closeModal();
    window.goa3Toast("Opening WhatsApp — thank you for your enquiry.");
    form.reset();
  });

  function setErr(name, bad) {
    var el = form.querySelector("[name=" + name + "]");
    el.closest(".field").classList.toggle("has-error", bad);
    return !bad;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = function (n) { return (form.querySelector("[name=" + n + "]").value || "").trim(); };
    var okName = setErr("name", v("name").length < 2);
    var okPhone = setErr("phone", v("phone").replace(/\D/g, "").length < 10);
    var okType = setErr("type", !v("type"));
    var email = v("email");
    var okEmail = setErr("email", !!email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    if (!(okName && okPhone && okType && okEmail)) {
      window.goa3Toast("Please complete the highlighted required fields.");
      return;
    }

    var msg =
      "Hello " + B.name + ", I visited your website and would like to make an enquiry.\n\n" +
      "Name: " + v("name") +
      "\nMobile: " + v("phone") +
      (email ? "\nEmail: " + email : "") +
      "\nEnquiry Type: " + v("type") +
      (v("interest") ? "\nInterested In: " + v("interest") : "") +
      (v("budget") ? "\nApproximate Budget: " + v("budget") : "") +
      (v("message") ? "\nMessage: " + v("message") : "") +
      "\n\nPlease share more details about your farmhouse plots and construction services in Malvan, Konkan.";

    modal.querySelector("[data-c-preview]").textContent = msg;
    modal.querySelector("[data-c-go]").href = wa(msg);
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  });

  /* clear error on input */
  form.addEventListener("input", function (e) {
    var f = e.target.closest(".field");
    if (f) f.classList.remove("has-error");
  });
})();
