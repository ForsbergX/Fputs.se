/* Få offert-knappen: välj först vad det gäller, sen rätt sida (Tommy 2026-10-31).
 * Utan JS går länken direkt till boka.html som förut. */
(function () {
  var ruta = document.getElementById('offertVal');
  if (!ruta || typeof ruta.showModal !== 'function') return;
  document.querySelectorAll('[data-offert-val]').forEach(function (knapp) {
    knapp.addEventListener('click', function (e) {
      e.preventDefault();
      ruta.showModal();
    });
  });
  ruta.querySelector('.ov-stang').addEventListener('click', function () { ruta.close(); });
  // Klick utanför rutan stänger
  ruta.addEventListener('click', function (e) { if (e.target === ruta) ruta.close(); });
})();
