/* ============================================================
   VARDAM'S GOA3 — Gallery: filter chips + lightbox with prev/next.
   Uses delegated events so gallery items can be injected at any time.
   ============================================================ */
(function () {
  "use strict";

  var lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("data-testid", "gallery-lightbox");
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-label", "Image lightbox");
  document.addEventListener("DOMContentLoaded", function () { document.body.appendChild(lb); });

  function icons() {
    lb.innerHTML =
      '<div class="lightbox-backdrop" data-lb-close></div>' +
      '<button class="lb-btn lb-close" data-lb-close data-testid="lightbox-close" aria-label="Close">' + window.goa3Icon("close") + "</button>" +
      '<button class="lb-btn lb-prev" data-testid="lightbox-prev" aria-label="Previous image">' + window.goa3Icon("left") + "</button>" +
      '<button class="lb-btn lb-next" data-testid="lightbox-next" aria-label="Next image">' + window.goa3Icon("right") + "</button>" +
      '<div class="lightbox-stage">' +
        '<img data-testid="lightbox-image" alt="">' +
        '<div class="lightbox-cap" data-testid="lightbox-caption"></div>' +
        '<div class="lightbox-count" data-testid="lightbox-count"></div>' +
      "</div>";
  }

  var idx = 0;

  function items() {
    return Array.prototype.slice.call(document.querySelectorAll(".bento-item"));
  }
  function visibleItems() {
    return items().filter(function (it) { return it.style.display !== "none"; });
  }

  function show(i) {
    var list = visibleItems();
    if (!list.length) return;
    idx = (i + list.length) % list.length;
    var it = list[idx];
    var img = lb.querySelector("img");
    img.src = it.getAttribute("data-full");
    img.alt = it.getAttribute("data-caption");
    lb.querySelector(".lightbox-cap").textContent = it.getAttribute("data-caption");
    lb.querySelector(".lightbox-count").textContent = (idx + 1) + " / " + list.length;
  }

  function open(item) {
    if (!lb.innerHTML) icons();
    show(visibleItems().indexOf(item));
    lb.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function close() {
    lb.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  document.addEventListener("DOMContentLoaded", function () {
    icons();

    /* filter chips (delegated — chips may be static or injected) */
    document.addEventListener("click", function (e) {
      var chip = e.target.closest("[data-filter]");
      if (chip) {
        document.querySelectorAll("[data-filter]").forEach(function (c) {
          c.classList.remove("is-active");
          c.setAttribute("aria-pressed", "false");
        });
        chip.classList.add("is-active");
        chip.setAttribute("aria-pressed", "true");
        var cat = chip.getAttribute("data-filter");
        items().forEach(function (it) {
          it.style.display = (cat === "all" || it.getAttribute("data-cat") === cat) ? "" : "none";
        });
        return;
      }

      /* open lightbox */
      var fig = e.target.closest(".bento-item");
      if (fig && fig.getAttribute("data-full")) { open(fig); return; }

      /* lightbox controls */
      if (!lb.classList.contains("is-open")) return;
      if (e.target.closest("[data-lb-close]")) close();
      else if (e.target.closest(".lb-prev")) show(idx - 1);
      else if (e.target.closest(".lb-next")) show(idx + 1);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target.classList && e.target.classList.contains("bento-item")) open(e.target);
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  });

  window.goa3LightboxOpen = open;
})();
