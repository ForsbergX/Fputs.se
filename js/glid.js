// Levande sida (Tommy 2026-10-24): kort, ikoner och rubriker glider in när de kommer i bild –
// både när man scrollar ner och upp. Elementet glider in från det håll man scrollar.
// Utan JS (eller utan IntersectionObserver) syns allt som vanligt.
(function () {
  if (!('IntersectionObserver' in window)) return;
  function start() {
    var valjare = [
      // Startsidan
      '.kampanj-title', '.kampanj-text > p:not(.kampanj-rad):not(.kampanj-small)',
      '.ns-rubrik', '.ns-kort', '.ns-mork-kort', '.ns-varfor-slut', '.ns-karusell', '.ns-om img', '.ns-om > div', '.ns-form-kort',
      '.val-knapp', '.glas-ikon', '.kampanj-rad', '.kampanj-small',
      '.om-photo', '.om-text', '.karta-head', '.karta-box',
      // Recensioner och frågor
      '.rk-topp', '.rk-rubrik', '.rk-rad-betyg', '.rk-summa', '.rk-hero-summa', '.rk-karusell', '.rk-vagg > .rk-kort', '.rk-ensam',
      '.rk-alla', '.fq', '.fq-alla',
      // Undersidor
      '.section-label', '.section-title', '.fordelar-card', '.faq-item', '.price-header', '.ft-kort', '.ref-sektion figure',
      '.footer-col'
    ].join(',');
    var el = Array.prototype.slice.call(document.querySelectorAll(valjare)).filter(function (e) {
      return !e.closest('#hero, .ns-hero, .hero-content, nav');
    });
    if (!el.length) return;
    document.documentElement.classList.add('glid-pa');

    // Kort som ligger bredvid varandra glider in efter varandra
    el.forEach(function (e) { e.classList.add('glid'); });
    el.forEach(function (e) {
      var i = 0, f = e.previousElementSibling;
      while (f && f.classList.contains('glid') && f.className.split(' ')[0] === e.className.split(' ')[0]) { i++; f = f.previousElementSibling; }
      if (i) e.style.setProperty('--glid-delay', Math.min(i, 4) * 0.05 + 's');
    });

    var io = new IntersectionObserver(function (poster) {
      poster.forEach(function (p) {
        var e = p.target;
        if (p.isIntersecting) {
          e.classList.add('syns');
        } else {
          // Ut ur bild: göm igen så det glider in nästa gång. Ovanför skärmen → kommer uppifrån.
          e.classList.remove('syns');
          e.classList.toggle('glid-ovan', p.boundingClientRect.top < 0);
        }
      });
    }, { rootMargin: '0px 0px 0px 0px', threshold: 0.01 });
    el.forEach(function (e) { io.observe(e); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
