/* Få offert-knappen (Tommy 2026-11-22):
 * Steg 1: "Hur vill du få ditt pris?" – fyll i formulär eller räkna ut själv.
 * Steg 2 (räkna själv): välj vad det gäller, sen rätt sida.
 * Utan JS går länken direkt till boka.html som förut. */
(function () {
  var ruta = document.getElementById('offertVal');
  if (!ruta || typeof ruta.showModal !== 'function') return;
  var sidor = ruta.querySelectorAll('.ov-sida');
  function visa(nr) {
    sidor.forEach(function (s) { s.hidden = s.getAttribute('data-sida') !== String(nr); });
  }
  document.querySelectorAll('[data-offert-val]').forEach(function (knapp) {
    knapp.addEventListener('click', function (e) {
      e.preventDefault();
      visa(1);
      ruta.showModal();
    });
  });
  ruta.querySelectorAll('[data-till-sida]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      visa(el.getAttribute('data-till-sida'));
    });
  });
  ruta.querySelector('.ov-stang').addEventListener('click', function () { ruta.close(); });
  // Klick utanför rutan stänger
  ruta.addEventListener('click', function (e) { if (e.target === ruta) ruta.close(); });
})();
