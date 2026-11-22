/* Chatten som en app på mobilen (Tommy 2026-11-22).
 * Rör inte chatt.js. Låser chatten till den synliga skärmen varje bildruta,
 * så att iPhone inte kan knuffa den när tangentbordet kommer upp. */
(function () {
  function init() {
    var panel = document.querySelector('.fc-panel');
    if (!panel) { setTimeout(init, 150); return; }
    var input = panel.querySelector('.fc-input'), logg = panel.querySelector('.fc-logg');
    var skicka = panel.querySelector('.fc-skicka');
    var html = document.documentElement, body = document.body;
    var pa = false, raf = 0, y = 0, senH = 0;

    function mobil() { return window.innerWidth <= 520; }
    function tick() {
      var vv = window.visualViewport;
      var h = vv ? vv.height : window.innerHeight, o = vv ? vv.offsetTop : 0;
      panel.style.height = h + 'px';
      panel.style.transform = 'translate3d(0,' + o + 'px,0)';
      if (h !== senH) { senH = h; logg.scrollTop = logg.scrollHeight; }
      raf = requestAnimationFrame(tick);
    }
    function start() {
      if (pa || !mobil()) return;
      pa = true; y = window.scrollY;
      html.classList.add('fc-app');
      body.style.position = 'fixed'; body.style.top = -y + 'px'; body.style.left = '0'; body.style.right = '0'; body.style.width = '100%';
      tick();
    }
    function stopp() {
      if (!pa) return;
      pa = false; cancelAnimationFrame(raf); senH = 0;
      panel.style.height = panel.style.transform = '';
      html.classList.remove('fc-app');
      body.style.position = body.style.top = body.style.left = body.style.right = body.style.width = '';
      var sb = html.style.scrollBehavior; html.style.scrollBehavior = 'auto'; window.scrollTo(0, y); html.style.scrollBehavior = sb;
    }
    new MutationObserver(function () { if (panel.hidden) stopp(); else start(); })
      .observe(panel, { attributes: true, attributeFilter: ['hidden'] });

    // Trycker man på bubblan: skrivrutan aktiv direkt (måste ske i själva trycket för iPhone)
    var bubbla = document.querySelector('.fc-knapp');
    if (bubbla) bubbla.addEventListener('click', function () {
      if (!panel.hidden && mobil()) { start(); input.focus(); }
    });
    // Skicka-knappen tar inte fokus från skrivrutan → tangentbordet stannar uppe
    if (skicka) {
      skicka.addEventListener('pointerdown', function (e) { e.preventDefault(); });
      skicka.addEventListener('mousedown', function (e) { e.preventDefault(); });
    }
    panel.querySelector('.fc-skriv-rad').addEventListener('submit', function () { if (pa) input.focus(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
