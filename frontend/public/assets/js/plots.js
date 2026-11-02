/* ============================================================
   VARDAM'S GOA3 — Plots & Designs: sample plot inventory and
   the expandable farmhouse design catalogue with detail modal.
   ============================================================ */
(function () {
  "use strict";
  var G = window.GOA3, B = G.brand, wa = G.wa, icon = window.goa3Icon;

  /* ---------- sample plots ---------- */
  var plotWrap = document.querySelector("[data-plots]");
  if (plotWrap) {
    var statusCls = { "Available": "status--available", "Reserved": "status--reserved", "On Hold": "status--hold" };
    plotWrap.innerHTML = G.plots.map(function (p, i) {
      return (
        '<article class="plot-card" data-testid="plot-card-' + p.id + '" data-reveal style="--d:' + (i % 3) * 0.1 + 's">' +
          '<div class="plot-top"><span class="plot-id">' + p.id + '</span>' +
          '<span class="status ' + statusCls[p.status] + '" data-testid="plot-status-' + p.id + '">' + p.status + "</span></div>" +
          '<span class="plot-zone">' + p.zone + " Zone</span>" +
          '<div class="plot-specs">' +
            "<div><b>Plot Area</b><span>" + p.areaSqm.toLocaleString("en-IN") + " sq.m</span></div>" +
            "<div><b>Facing</b><span>" + p.facing + "</span></div>" +
            "<div><b>Location</b><span>Malvan, Konkan</span></div>" +
            "<div><b>Layout</b><span>See Master Plan</span></div>" +
          "</div>" +
          '<div class="p-card-actions">' +
            '<a class="btn btn-gold btn-sm" data-testid="plot-' + p.id + '-enquire" href="' +
              wa("Hello " + B.name + ", I am interested in farmhouse plot " + p.id + " (" + p.zone + " zone, " + p.areaSqm + " sq.m) in Malvan, Konkan. Please share the price, exact status and site visit details.") +
              '" target="_blank" rel="noopener">' + window.GOA3_WA_ICON + "<span>Enquire for Price</span></a>" +
          "</div>" +
        "</article>"
      );
    }).join("");
    window.goa3Observe(plotWrap);
  }

  /* ---------- design catalogue ---------- */
  var catWrap = document.querySelector("[data-design-catalogue]");
  if (catWrap) {
    catWrap.innerHTML = G.designs.map(function (d, i) {
      return (
        '<article class="p-card" id="design-' + d.slug + '" data-testid="design-card-' + d.slug + '" data-reveal style="--d:' + (i % 3) * 0.12 + 's">' +
          '<div class="p-card-media"><img src="' + d.exterior + '" alt="' + d.name + ' exterior illustration" loading="lazy">' +
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
              '<button class="btn btn-outline btn-sm" data-design-open="' + d.slug + '" data-testid="design-' + d.slug + '-details">View Details</button>' +
              '<a class="btn btn-gold btn-sm" data-testid="design-' + d.slug + '-whatsapp" href="' +
                wa("Hello " + B.name + ", I would like to enquire about the farmhouse design \"" + d.name + "\" (" + d.tag + ", " + d.builtup + "). Please share pricing and construction details.") +
                '" target="_blank" rel="noopener">' + window.GOA3_WA_ICON + "<span>Enquire</span></a>" +
            "</div>" +
          "</div>" +
        "</article>"
      );
    }).join("");
    window.goa3Observe(catWrap);
  }

  /* ---------- design detail modal ---------- */
  var modal = document.createElement("div");
  modal.className = "modal";
  modal.setAttribute("data-testid", "design-modal");
  modal.setAttribute("role", "dialog");
  modal.innerHTML =
    '<div class="modal-backdrop" data-d-close></div>' +
    '<div class="modal-panel">' +
      '<button class="modal-close" data-d-close data-testid="design-modal-close" aria-label="Close">' + icon("close") + "</button>" +
      '<div class="modal-media"><img data-d-img src="" alt="">' +
        '<div class="modal-thumbs" data-d-thumbs></div>' +
      "</div>" +
      '<div class="modal-body">' +
        '<span class="eyebrow" data-d-tag></span>' +
        "<h3 data-d-name></h3>" +
        '<div class="p-card-meta" data-d-meta></div>' +
        '<p class="small" data-d-desc></p>' +
        '<ul class="spec-list" data-d-specs></ul>' +
        '<div class="p-card-actions">' +
          '<a class="btn btn-gold" data-d-wa href="#" target="_blank" rel="noopener" data-testid="design-modal-whatsapp">' + window.GOA3_WA_ICON + "<span>Enquire About This Design</span></a>" +
        "</div>" +
        '<span class="small" style="opacity:.7">Illustrative concept — final drawings, specifications and pricing are shared on enquiry.</span>' +
      "</div>" +
    "</div>";
  document.body.appendChild(modal);

  var mImg = modal.querySelector("[data-d-img]");
  var mThumbs = modal.querySelector("[data-d-thumbs]");

  function openDesign(slug) {
    var d = G.designs.find(function (x) { return x.slug === slug; });
    if (!d) return;
    var shots = [
      { src: d.exterior, label: "Exterior" },
      { src: d.plan, label: "3D Floor Plan" },
      { src: d.interior, label: "Interior" }
    ];
    mImg.src = shots[0].src;
    mImg.alt = d.name + " — " + shots[0].label;
    mThumbs.innerHTML = shots.map(function (s, i) {
      return '<button class="' + (i === 0 ? "is-active" : "") + '" data-shot="' + i + '" aria-label="' + s.label + '"><img src="' + s.src + '" alt="' + s.label + '"></button>';
    }).join("");
    mThumbs.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () {
        mThumbs.querySelectorAll("button").forEach(function (x) { x.classList.remove("is-active"); });
        b.classList.add("is-active");
        var s = shots[parseInt(b.getAttribute("data-shot"), 10)];
        mImg.src = s.src;
        mImg.alt = d.name + " — " + s.label;
      });
    });
    modal.querySelector("[data-d-tag]").textContent = d.tag;
    modal.querySelector("[data-d-name]").textContent = d.name;
    modal.querySelector("[data-d-meta]").innerHTML =
      "<span>" + icon("bed") + d.beds + " Bedrooms</span>" +
      "<span>" + icon("bath") + d.baths + " Bathrooms</span>" +
      "<span>" + icon("area") + d.builtup + " built-up</span>";
    modal.querySelector("[data-d-desc]").textContent = d.desc;
    modal.querySelector("[data-d-specs]").innerHTML = d.specs.map(function (s) { return "<li>" + s + "</li>"; }).join("");
    modal.querySelector("[data-d-wa]").href = wa(
      "Hello " + B.name + ", I would like to enquire about the farmhouse design \"" + d.name + "\" (" + d.tag + ", " + d.builtup + "). Please share pricing and construction details."
    );
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeDesign() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  modal.addEventListener("click", function (e) {
    if (e.target.closest("[data-d-close]")) closeDesign();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeDesign();
  });

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-design-open]");
    if (b) openDesign(b.getAttribute("data-design-open"));
  });

  /* deep link: plots-designs.html#design-slug */
  if (location.hash.indexOf("#design-") === 0) {
    setTimeout(function () { openDesign(location.hash.replace("#design-", "")); }, 700);
  }
})();
