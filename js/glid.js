// Uppglidande animation vid scroll – element visas när de kommer in i bild.
// Utan JS (eller utan IntersectionObserver) syns allt som vanligt.
(function () {
  if (!('IntersectionObserver' in window)) return;
  var valjare = [
    '.kampanj-title', '.kampanj-text > p:not(.kampanj-rad):not(.kampanj-small)',
    '.ns-rubrik', '.ns-kort', '.ns-mork-kort', '.ns-varfor-slut', '.ns-karusell', '.ns-om img', '.ns-form-kort',
    '.val-knapp', '.glas-ikon', '.kampanj-rad', '.kampanj-small',
    '.om-photo', '.om-text',
    '.karta-head', '.karta-box'
  ].join(',');
  var el = document.querySelectorAll(valjare);
  if (!el.length) return;
  document.documentElement.classList.add('glid-pa');

  // Kort som ligger bredvid varandra glider upp efter varandra
  el.forEach(function (e) { e.classList.add('glid'); });
  el.forEach(function (e) {
    var i = 0, f = e.previousElementSibling;
    while (f && f.classList.contains('glid') && f.className.split(' ')[0] === e.className.split(' ')[0]) { i++; f = f.previousElementSibling; }
    if (i) e.style.setProperty('--glid-delay', Math.min(i, 3) * 0.12 + 's');
  });

  var io = new IntersectionObserver(function (poster) {
    poster.forEach(function (p) {
      if (!p.isIntersecting) return;
      p.target.classList.add('syns');
      io.unobserve(p.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  el.forEach(function (e) { io.observe(e); });

  // Visa även det man hoppat förbi (snabb scroll, länk längre ner) så inget blir osynligt
  window.addEventListener('scroll', function () {
    el.forEach(function (e) {
      if (!e.classList.contains('syns') && e.getBoundingClientRect().bottom < 0) { e.classList.add('syns'); io.unobserve(e); }
    });
  }, { passive: true });
})();
