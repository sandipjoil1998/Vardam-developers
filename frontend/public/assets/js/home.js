/* ============================================================
   VARDAM'S GOA3 — Home: featured designs, enquiry form modal,
   request-a-callback prompt.
   ============================================================ */
(function () {
  "use strict";
  var G = window.GOA3, B = G.brand, wa = G.wa, icon = window.goa3Icon;

  /* ---------- featured designs (home) ---------- */
  var featured = document.querySelector("[data-featured-designs]");
  if (featured) {
    featured.innerHTML = G.designs.slice(0, 3).map(function (d, i) {
      return (
        '<article class="p-card" data-reveal style="--d:' + i * 0.12 + 's">' +
          '<div class="p-card-media"><img src="' + d.exterior + '" alt="' + d.name + ' — architectural illustration" loading="lazy">' +
          '<span class="p-card-tag">' + d.tag + "</span></div>" +
          '<div class="p-card-body">' +
            "<h3>" + d.name + "</h3>" +
            '<div class="p-card-meta">' +
              "<span>" + icon("bed") + d.beds + " Beds</span>" +
              "<span>" + icon("bath") + d.baths + " Baths</span>" +
              "<span>" + icon("area") + d.builtup + "</span>" +
            "</div>" +
            '<p class="small">' + d.desc + "</p>" +
            '<div class="p-card-actions">' +
              '<a class="btn btn-outline btn-sm" href="plots-designs.html#design-' + d.slug + '" data-testid="featured-design-' + d.slug + '">View Design</a>' +
              '<a class="btn btn-gold btn-sm" href="' + wa("Hello " + B.name + ", I would like to know more about " + d.name + " (" + d.tag + "). Please share details and pricing.") + '" target="_blank" rel="noopener" data-testid="featured-design-' + d.slug + '-whatsapp">' + window.GOA3_WA_ICON + "<span>Enquire</span></a>" +
            "</div>" +
          "</div>" +
        "</article>"
      );
    }).join("");
    window.goa3Observe(featured);
  }

  /* ---------- generic confirm-before-WhatsApp modal ---------- */
  var modal = document.createElement("div");
  modal.className = "modal";
  modal.setAttribute("data-testid", "confirm-modal");
  modal.setAttribute("role", "dialog");
  modal.innerHTML =
    '<div class="modal-backdrop" data-confirm-close></div>' +
    '<div class="modal-panel" style="grid-template-columns:1fr;max-width:640px">' +
      '<button class="modal-close" data-confirm-close aria-label="Close">' + icon("close") + "</button>" +
      '<div class="modal-body">' +
        '<span class="eyebrow">Confirm Enquiry</span>' +
        '<h3 data-confirm-title>Send this enquiry on WhatsApp?</h3>' +
        '<div class="wa-preview" data-confirm-preview data-testid="confirm-message-preview"></div>' +
        '<div class="p-card-actions">' +
          '<a class="btn btn-gold" data-confirm-go href="#" target="_blank" rel="noopener" data-testid="confirm-send-whatsapp">' + window.GOA3_WA_ICON + "<span>Open WhatsApp</span></a>" +
          '<button class="btn btn-outline" data-confirm-close data-testid="confirm-cancel">Go Back</button>' +
        "</div>" +
      "</div>" +
    "</div>";
  document.body.appendChild(modal);

  function openConfirm(title, message) {
    modal.querySelector("[data-confirm-title]").textContent = title;
    modal.querySelector("[data-confirm-preview]").textContent = message;
    modal.querySelector("[data-confirm-go]").href = wa(message);
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeConfirm() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  modal.addEventListener("click", function (e) {
    if (e.target.closest("[data-confirm-close]")) closeConfirm();
  });
  modal.querySelector("[data-confirm-go]").addEventListener("click", function () {
    closeConfirm();
    window.goa3Toast("Opening WhatsApp — your enquiry is ready to send.");
  });
  window.goa3Confirm = openConfirm;

  /* ---------- request a callback ---------- */
  document.querySelectorAll("[data-callback]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var num = window.prompt("Request a callback — please enter your mobile number:");
      if (!num) return;
      var clean = num.replace(/[^\d+]/g, "");
      if (clean.replace(/\D/g, "").length < 10) {
        window.goa3Toast("Please enter a valid 10-digit mobile number.");
        return;
      }
      openConfirm(
        "Request a Callback",
        "Hello " + B.name + ", I visited your website and would like to request a callback regarding your farmhouse plots and construction services in Malvan, Konkan. My number: " + clean
      );
    });
  });

  /* ---------- home enquiry form ---------- */
  var form = document.querySelector("[data-quick-enquiry]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("[name=name]");
      var phone = form.querySelector("[name=phone]");
      var ok = true;
      [[name, 2], [phone, 10]].forEach(function (pair) {
        var el = pair[0], field = el.closest(".field");
        field.classList.remove("has-error");
        var digits = el.value.replace(/\D/g, "").length;
        var valid = pair[1] === 10 ? digits >= 10 : el.value.trim().length >= pair[1];
        if (!valid) { field.classList.add("has-error"); ok = false; }
      });
      if (!ok) { window.goa3Toast("Please complete the required fields."); return; }
      openConfirm(
        "Send this enquiry on WhatsApp?",
        "Hello " + B.name + "!\n\nName: " + name.value.trim() +
        "\nMobile: " + phone.value.trim() +
        "\nInterest: " + form.querySelector("[name=interest]").value +
        "\n\nI visited your website and would like to know more about your farmhouse project in Malvan, Konkan. Please share details, pricing and availability."
      );
    });
  }
})();
