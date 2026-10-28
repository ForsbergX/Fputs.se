/* Postnummer i våra områden (Tommy 2026-10-28, efter listan över orter på omraden.html).
 * Kontrollen går på de tre första siffrorna, så enstaka fel i postnummerlistan spelar ingen roll:
 *   550–556 Jönköping (Bymarken, Torpa, Råslätt, Hovslätt, Barnarp, Trånghalla …)
 *   560–561 Huskvarna, Tenhult, Lekeryd, Kaxholmen, Skärstad, Öggestorp …
 *   562 Norrahammar, Taberg, Månsarp · 563 Gränna, Ölmstad, Örserum · 564 Bankeryd
 *   565 9x Bottnaryd (565 3x = Mullsjö, ingår inte) · 566 Habo, Furusjö, Bränninge
 * fpOmrade('561 31') → { ok: true, ort: 'Huskvarna' }. ort är bara ett förslag (postorten) och kan vara tom.
 */
(function () {
  var ORT = [
    [/^55[0-6]/, 'Jönköping'],
    [/^561[34]/, 'Huskvarna'],
    [/^5623/, 'Norrahammar'],
    [/^5624/, 'Taberg'],
    [/^5633/, 'Gränna'],
    [/^5643/, 'Bankeryd'],
    [/^5663/, 'Habo']
  ];
  window.fpOmrade = function (postnr) {
    var p = String(postnr || '').replace(/\D/g, '');
    if (p.length !== 5) return { ok: false, giltigt: false, ort: '' };
    var ok = /^(55[0-6]|56[0-4]|566|5659)/.test(p);
    var ort = '';
    for (var i = 0; ok && i < ORT.length; i++) if (ORT[i][0].test(p)) { ort = ORT[i][1]; break; }
    return { ok: ok, giltigt: true, ort: ort, postnr: p.slice(0, 3) + ' ' + p.slice(3) };
  };
})();
