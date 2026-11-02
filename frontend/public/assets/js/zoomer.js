/* ============================================================
   VARDAM'S GOA3 — Master plan: zoom + pan + fullscreen lightbox.
   ============================================================ */
(function () {
  "use strict";

  var z = document.querySelector("[data-zoomer]");
  if (!z) return;

  var img = z.querySelector("img");
  var scale = 1, min = 1, max = 4, tx = 0, ty = 0;
  var dragging = false, sx = 0, sy = 0;

  function apply() {
    img.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + scale + ")";
  }
  function clamp() {
    var w = z.clientWidth, h = z.clientHeight;
    var iw = w * scale, ih = h * scale;
    tx = Math.min(0, Math.max(w - iw, tx));
    ty = Math.min(0, Math.max(h - ih, ty));
  }
  function zoom(f, cx, cy) {
    var ns = Math.min(max, Math.max(min, scale * f));
    if (ns === scale) return;
    var r = z.getBoundingClientRect();
    cx = cx == null ? r.width / 2 : cx - r.left;
    cy = cy == null ? r.height / 2 : cy - r.top;
    tx = cx - ((cx - tx) * ns) / scale;
    ty = cy - ((cy - ty) * ns) / scale;
    scale = ns;
    clamp();
    apply();
  }
  function reset() { scale = 1; tx = 0; ty = 0; apply(); }

  z.addEventListener("wheel", function (e) {
    e.preventDefault();
    zoom(e.deltaY < 0 ? 1.18 : 1 / 1.18, e.clientX, e.clientY);
  }, { passive: false });

  z.addEventListener("pointerdown", function (e) {
    dragging = true; sx = e.clientX - tx; sy = e.clientY - ty;
    z.classList.add("is-drag");
    z.setPointerCapture(e.pointerId);
  });
  z.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    tx = e.clientX - sx; ty = e.clientY - sy;
    clamp(); apply();
  });
  ["pointerup", "pointercancel"].forEach(function (ev) {
    z.addEventListener(ev, function () { dragging = false; z.classList.remove("is-drag"); });
  });
  z.addEventListener("dblclick", function (e) {
    if (scale > 1.01) reset(); else zoom(2, e.clientX, e.clientY);
  });

  var tools = document.querySelector("[data-zoomer-tools]");
  if (tools) {
    tools.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
    tools.querySelector("[data-zoom-in]").addEventListener("click", function () { zoom(1.35); });
    tools.querySelector("[data-zoom-out]").addEventListener("click", function () { zoom(1 / 1.35); });
    tools.querySelector("[data-zoom-reset]").addEventListener("click", reset);
    tools.querySelector("[data-zoom-full]").addEventListener("click", function () {
      if (window.goa3LightboxOpen) {
        var item = document.querySelector('.bento-item[data-cat="plan"]');
        if (item) window.goa3LightboxOpen(item);
      }
    });
  }
  apply();
})();
