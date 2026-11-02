/* ============================================================
   VARDAM'S GOA3 — Shared chrome: header, footer, WhatsApp float,
   smooth scroll, reveals, parallax, page transitions.
   ============================================================ */
(function () {
  "use strict";
  var B = window.GOA3.brand;
  var wa = window.GOA3.wa;

  var LOGO =
    '<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">' +
    '<circle cx="32" cy="23" r="7.5" stroke="currentColor" stroke-width="2.6"/>' +
    '<path d="M12 44 L25 28 L33 37 L39 31 L52 44" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M10 50 H54" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>';

  var WA_ICON =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

  var NAV = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About" },
    { href: "plots-designs.html", label: "Plots & Designs" },
    { href: "master-plan.html", label: "Master Plan & Gallery" },
    { href: "contact.html", label: "Contact" }
  ];

  var current = location.pathname.split("/").pop() || "index.html";

  function navLinks(cls) {
    return NAV.map(function (n) {
      var cur = n.href === current ? ' aria-current="page"' : "";
      return '<a href="' + n.href + '"' + cur + (cls ? ' class="' + cls + '"' : "") + ">" + n.label + "</a>";
    }).join("");
  }

  /* ---------- header ---------- */
  var header = document.createElement("header");
  header.className = "site-header";
  header.setAttribute("data-testid", "site-header");
  header.innerHTML =
    '<div class="container header-row">' +
      '<a class="brand" href="index.html" data-testid="brand-logo-link">' + LOGO +
        '<span class="brand-text"><strong>' + B.name + "</strong><small>" + B.tagline + "</small></span></a>" +
      '<nav class="site-nav" data-testid="site-nav">' + navLinks() + "</nav>" +
      '<div class="header-actions">' +
        '<a class="btn btn-gold btn-sm header-cta" data-testid="header-enquire-button" href="' + wa() + '" target="_blank" rel="noopener">' + WA_ICON + "<span>Enquire</span></a>" +
        '<button class="nav-toggle" data-testid="mobile-menu-toggle" aria-label="Open menu"><span></span><span></span></button>' +
      "</div>" +
    "</div>";
  document.body.prepend(header);

  /* ---------- mobile menu ---------- */
  var menu = document.createElement("div");
  menu.className = "mobile-menu";
  menu.setAttribute("data-testid", "mobile-menu");
  menu.innerHTML =
    NAV.map(function (n, i) {
      return '<a class="mm-link" style="--d:' + (0.12 + i * 0.07) + 's" href="' + n.href + '">' + n.label + "<span>0" + (i + 1) + "</span></a>";
    }).join("") +
    '<div class="mm-foot"><span>' + B.location + "</span><a href='tel:" + B.phone + "'>" + B.phoneDisplay + "</a><a href='mailto:" + B.email + "'>" + B.email + "</a></div>";
  document.body.appendChild(menu);

  var toggle = header.querySelector(".nav-toggle");
  toggle.addEventListener("click", function () {
    document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-label", document.body.classList.contains("menu-open") ? "Close menu" : "Open menu");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) document.body.classList.remove("menu-open");
  });

  /* ---------- nav sliding ink indicator ---------- */
  var nav = header.querySelector(".site-nav");
  var ink = document.createElement("span");
  ink.className = "nav-ink";
  nav.appendChild(ink);
  var navLinksArr = Array.prototype.slice.call(nav.querySelectorAll("a"));
  var activeLink = nav.querySelector('[aria-current="page"]') || navLinksArr[0];
  function inkTo(el) {
    if (!el) { ink.style.width = "0"; return; }
    ink.style.left = el.offsetLeft + "px";
    ink.style.width = el.offsetWidth + "px";
  }
  function inkReset() { inkTo(spyActive || activeLink); }
  navLinksArr.forEach(function (a) {
    a.addEventListener("mouseenter", function () { inkTo(a); });
    a.addEventListener("focus", function () { inkTo(a); });
  });
  nav.addEventListener("mouseleave", inkReset);
  window.addEventListener("resize", inkReset);
  window.addEventListener("load", function () { setTimeout(inkReset, 150); });
  setTimeout(inkReset, 600);

  /* ---------- scroll-spy: nav reflects the section in view ---------- */
  var spyActive = null;
  function setNavVisual(link) {
    navLinksArr.forEach(function (a) { a.classList.remove("is-spy"); });
    nav.classList.toggle("has-spy", !!link);
    if (link) link.classList.add("is-spy");
    inkTo(link || activeLink);
  }
  var spySections = Array.prototype.slice.call(document.querySelectorAll("[data-spy]"));
  if (spySections.length) {
    var spyTick = false;
    var spy = function () {
      var line = window.scrollY + window.innerHeight * 0.4;
      var target = null;
      spySections.forEach(function (s) {
        var top = s.getBoundingClientRect().top + window.scrollY;
        if (line >= top && line < top + s.offsetHeight) target = s.getAttribute("data-spy");
      });
      var link = target ? nav.querySelector('a[href="' + target + '"]') : null;
      if (link !== spyActive) { spyActive = link; setNavVisual(link); }
    };
    window.addEventListener("scroll", function () {
      if (spyTick) return;
      spyTick = true;
      requestAnimationFrame(function () { spy(); spyTick = false; });
    }, { passive: true });
    spy();
  }

  /* ---------- footer ---------- */
  var year = new Date().getFullYear();
  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.setAttribute("data-testid", "site-footer");
  footer.innerHTML =
    '<div class="footer-grid container">' +
      '<div class="footer-brand">' +
        '<a class="brand" href="index.html">' + LOGO +
          '<span class="brand-text"><strong>' + B.name + "</strong><small>" + B.tagline + "</small></span></a>" +
        "<p>Premium farmhouse plots and bespoke farmhouse construction in the serene coastal heartland of Malvan, Konkan.</p>" +
        '<a class="btn btn-ghost btn-sm" style="align-self:start" href="' + wa() + '" target="_blank" rel="noopener" data-testid="footer-whatsapp-link">' + WA_ICON + "<span>WhatsApp Us</span></a>" +
      "</div>" +
      '<div class="footer-col"><b>Explore</b><ul>' +
        NAV.map(function (n) { return '<li><a href="' + n.href + '">' + n.label + "</a></li>"; }).join("") +
      "</ul></div>" +
      '<div class="footer-col"><b>Contact</b><ul>' +
        "<li><span>" + B.location + "</span></li>" +
        '<li><a href="tel:' + B.phone + '" data-testid="footer-phone-link">Call: ' + B.phoneDisplay + "</a></li>" +
        '<li><a href="mailto:' + B.email + '" data-testid="footer-email-link">' + B.email + "</a></li>" +
        '<li><span style="opacity:.55">Pricing & availability shared on enquiry</span></li>' +
      "</ul></div>" +
    "</div>" +
    '<div class="footer-word" aria-hidden="true">' + B.name + "</div>" +
    '<div class="footer-bottom"><div class="container">' +
      "<span>&copy; " + year + " " + B.name + ". All rights reserved.</span>" +
      "<span>Plot details shown are indicative — confirm availability on enquiry.</span>" +
    "</div></div>";
  document.body.appendChild(footer);

  /* ---------- floating whatsapp (removed per brand direction) ---------- */

  /* ---------- toast ---------- */
  var toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("data-testid", "toast");
  toast.setAttribute("role", "status");
  document.body.appendChild(toast);
  window.goa3Toast = function (msg, ms) {
    toast.textContent = msg;
    toast.classList.add("is-show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toast.classList.remove("is-show"); }, ms || 3200);
  };

  /* ---------- page veil + enter ---------- */
  var veil = document.createElement("div");
  veil.className = "veil";
  veil.innerHTML = LOGO;
  document.body.appendChild(veil);
  document.body.classList.add("is-loading");

  function entered() {
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-loaded");
  }
  if (document.readyState === "complete") setTimeout(entered, 80);
  else window.addEventListener("load", function () { setTimeout(entered, 80); });
  setTimeout(entered, 2600); // safety

  /* veil transition on internal navigation */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href$='.html']");
    if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey) return;
    if (a.getAttribute("href") === current) return;
    e.preventDefault();
    document.body.classList.remove("is-loaded");
    document.body.classList.add("is-leaving");
    setTimeout(function () { location.href = a.getAttribute("href"); }, 620);
  });

  /* ---------- header scroll state ---------- */
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- lenis smooth scroll ---------- */
  if (window.Lenis && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var lenis = new window.Lenis({ duration: 1.15, smoothWheel: true });
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  /* ---------- reveals (observes current + injected elements) ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  window.goa3Observe = function (root) {
    (root || document).querySelectorAll("[data-reveal], .mask-parent").forEach(function (el) {
      if (!el.classList.contains("is-in")) io.observe(el);
    });
  };
  window.goa3Observe(document);

  /* ---------- hero parallax ---------- */
  var pEls = document.querySelectorAll("[data-parallax]");
  if (pEls.length) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        pEls.forEach(function (el) {
          var sp = parseFloat(el.getAttribute("data-parallax")) || 0.16;
          el.style.transform = "translateY(" + y * sp + "px)";
        });
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- icon helper ---------- */
  window.goa3Icon = function (name, cls) {
    var P = {
      bed: '<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M2 20h20"/><path d="M6 14h4"/>',
      bath: '<path d="M4 12h16a1 1 0 0 1 1 1 7 7 0 0 1-7 7H10a7 7 0 0 1-7-7 1 1 0 0 1 1-1z"/><path d="M6 12V5a2 2 0 0 1 4 0"/><path d="M8 20l-1 2"/><path d="M16 20l1 2"/>',
      area: '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M16 3h3a2 2 0 0 1 2 2v3"/><path d="M8 21H5a2 2 0 0 1-2-2v-3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/><path d="M3 12h18"/>',
      compass: '<circle cx="12" cy="12" r="10"/><path d="M16 8l-2.5 5.5L8 16l2.5-5.5L16 8z"/>',
      pin: '<path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/>',
      phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.9z"/>',
      mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
      check: '<path d="M20 6 9 17l-5-5"/>',
      leaf: '<path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 10-10 5 1 7 5 7 9a9 9 0 0 1-10 8z"/><path d="M4 21c4-4 8-8 12-12"/>',
      plan: '<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18"/><path d="M9 21V9"/>',
      home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
      hammer: '<path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9"/><path d="m17.6 4.6 3.8 3.8a2 2 0 0 1 0 2.8l-1.4 1.4-6.6-6.6 1.4-1.4a2 2 0 0 1 2.8 0z"/>',
      sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 6.3-1.4-1.4"/><path d="m19.1 19.1-1.4-1.4"/>',
      shield: '<path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
      zoomin: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/>',
      zoomout: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/>',
      reset: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>',
      expand: '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M16 3h3a2 2 0 0 1 2 2v3"/><path d="M8 21H5a2 2 0 0 1-2-2v-3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>',
      close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
      left: '<path d="m15 18-6-6 6-6"/>',
      right: '<path d="m9 18 6-6-6-6"/>',
      arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
      info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'
    };
    return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[name] || "") + "</svg>";
  };
  window.GOA3_WA_ICON = WA_ICON;
})();
