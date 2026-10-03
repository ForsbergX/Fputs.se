/* Spärrade arbetshelger (IKEA-helger) – ÄNDRA HÄR.
 *
 * START          = en lördag då jag arbetar (ÅÅÅÅ-MM-DD).
 * INTERVALL_DAGAR = antal dagar mellan arbetshelgerna (var sjätte helg = 42).
 *
 * Varje sådan lördag och söndagen efter spärras i kalkylatorns kalender och
 * bokningar på de dagarna nekas av servern (netlify/functions/boka.js).
 *
 * Datumen räknas som rena kalenderdatum (svensk tid, Europe/Stockholm) utan
 * klockslag, med Date.UTC. Därför påverkas resultatet inte av sommar-/vintertid,
 * årsskiften eller vilken tidszon besökarens dator har.
 *
 * Filen används både i webbläsaren (window.FPUTS_ARBETSHELGER) och i Node (require).
 */
(function (root) {
  var START = '2026-10-03';
  var INTERVALL_DAGAR = 42;

  var DAG_MS = 864e5;
  var DATUM = /^(\d{4})-(\d{2})-(\d{2})$/;

  function dagnummer(datum) {
    var m = DATUM.exec(String(datum || ''));
    if (!m) return null;
    return Date.UTC(+m[1], +m[2] - 1, +m[3]) / DAG_MS;
  }

  /* true om datumet (ÅÅÅÅ-MM-DD) är lördag eller söndag i en arbetshelg. */
  function arSparrad(datum) {
    var dag = dagnummer(datum), start = dagnummer(START);
    if (dag === null || start === null) return false;
    var rest = ((dag - start) % INTERVALL_DAGAR + INTERVALL_DAGAR) % INTERVALL_DAGAR;
    return rest === 0 || rest === 1;
  }

  /* Dagens datum i Sverige som ÅÅÅÅ-MM-DD, oavsett serverns tidszon. */
  function idagStockholm(nu) {
    return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Stockholm', year: 'numeric', month: '2-digit', day: '2-digit' })
      .format(nu || new Date());
  }

  var api = { START: START, INTERVALL_DAGAR: INTERVALL_DAGAR, arSparrad: arSparrad, idagStockholm: idagStockholm };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.FPUTS_ARBETSHELGER = api;
})(typeof window !== 'undefined' ? window : this);
