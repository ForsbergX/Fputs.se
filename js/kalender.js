/* Bokningskalendern (priskalkylatorn och formuläret på startsidan) – ÄNDRA REGLERNA HÄR.
 *
 * Stängt:  fredagar, var sjätte helg (lör+sön, räknat från ARBETSHELG_START) och
 *          allt som är upptaget i Tommys Google Kalender (hämtas från /api/ledigt).
 * Öppet:   från i morgon och DAGAR_FRAM dagar framåt.
 *
 * Varje <div class="fpk" data-fp-kalender> blir en kalender. Kunden väljer dag och önskad tid;
 * valet hamnar i formulärets dolda fält onskat_datum_1 (ÅÅÅÅ-MM-DD) och onskad_tid och
 * skickas med i bokningsmejlet.
 */
(function () {
  var ARBETSHELG_START = '2026-10-03'; // en lördag då jag jobbar annat
  var ARBETSHELG_INTERVALL = 42;       // var sjätte helg
  var DAGAR_FRAM = 60;

  // fran/till = timmarna som en händelse i Google Kalender måste krocka med för att tiden ska stängas.
  // Tiderna överlappar inte, så en kort händelse stänger bara den tid den krockar med.
  var TIDER = {
    vardag: [
      { id: 'morgon', titel: 'Morgon / förmiddag', text: 'Önskad start ca kl. 07–10', fran: 7, till: 10 },
      { id: 'lunch', titel: 'Lunch / mitt på dagen', text: 'Önskad start ca kl. 10–13', fran: 10, till: 13 }
    ],
    helg: [
      { id: 'fm', titel: 'Förmiddag', text: 'kl. 08–12', fran: 8, till: 12 },
      { id: 'em', titel: 'Eftermiddag', text: 'kl. 12–16', fran: 12, till: 16 },
      { id: 'flex', titel: 'Heldag / flexibel', text: 'När som helst under dagen', fran: 8, till: 16, flex: true }
    ]
  };
  var MANADER = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];
  var VECKODAGAR = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];

  var kalendrar = [].slice.call(document.querySelectorAll('[data-fp-kalender]'));
  if (!kalendrar.length) return;

  function iso(d) {
    var m = d.getMonth() + 1, dag = d.getDate();
    return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (dag < 10 ? '0' : '') + dag;
  }
  function franIso(s) { return new Date(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10)); }
  function plusDagar(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  function dagnr(d) { return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5; }

  var idag = new Date();
  var forsta = plusDagar(idag, 1);
  var sista = plusDagar(idag, DAGAR_FRAM);
  var startNr = dagnr(franIso(ARBETSHELG_START));

  function arArbetshelg(d) {
    var rest = ((dagnr(d) - startNr) % ARBETSHELG_INTERVALL + ARBETSHELG_INTERVALL) % ARBETSHELG_INTERVALL;
    return rest === 0 || rest === 1;
  }

  // Upptagna tider från Google Kalender: [[startMs, slutMs], ...] – gemensamt för alla kalendrar
  var upptaget = [];
  function arUpptagen(d, t) {
    var s = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.fran).getTime();
    var e = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.till).getTime();
    return upptaget.some(function (b) { return b[0] < e && b[1] > s; });
  }

  // Vad som gäller en dag: { tider: [...], etikett: 'Stängt' | 'Ej tillgänglig' | 'Fullbokat' | '' }
  function dagInfo(d) {
    if (d < forsta || d > sista) return { tider: [], etikett: '' };
    var vd = d.getDay();
    if (vd === 5) return { tider: [], etikett: 'Stängt' };
    var helg = vd === 0 || vd === 6;
    if (helg && arArbetshelg(d)) return { tider: [], etikett: 'Ej tillgänglig' };
    var lista = helg ? TIDER.helg : TIDER.vardag;
    var lediga = lista.filter(function (t) { return !t.flex && !arUpptagen(d, t); });
    if (helg && lediga.length) lediga.push(lista[2]);
    return { tider: lediga, etikett: lediga.length ? '' : 'Fullbokat' };
  }

  function skapa(wrap) {
    var rot = wrap.querySelector('.fpk-kal');
    var tiderEl = wrap.querySelector('.fpk-tider');
    var felEl = wrap.querySelector('.fpk-fel');
    var form = wrap.closest('form');
    var datumFalt = form.querySelector('[name="onskat_datum_1"]');
    var tidFalt = form.querySelector('[name="onskad_tid"]');
    var visadManad = new Date(forsta.getFullYear(), forsta.getMonth(), 1);
    var valdDag = null, valdTid = null;

    function rita() {
      var ar = visadManad.getFullYear(), man = visadManad.getMonth();
      var forstaManad = new Date(forsta.getFullYear(), forsta.getMonth(), 1);
      var sistaManad = new Date(sista.getFullYear(), sista.getMonth(), 1);
      var html = '<div class="fpk-head">' +
        '<button type="button" class="fpk-nav" data-steg="-1" aria-label="Föregående månad"' + (visadManad <= forstaManad ? ' disabled' : '') + '>‹</button>' +
        '<strong>' + MANADER[man].charAt(0).toUpperCase() + MANADER[man].slice(1) + ' ' + ar + '</strong>' +
        '<button type="button" class="fpk-nav" data-steg="1" aria-label="Nästa månad"' + (visadManad >= sistaManad ? ' disabled' : '') + '>›</button></div>' +
        '<div class="fpk-grid"><span>Mån</span><span>Tis</span><span>Ons</span><span>Tor</span><span>Fre</span><span>Lör</span><span>Sön</span>';
      var tomma = (new Date(ar, man, 1).getDay() + 6) % 7;
      for (var i = 0; i < tomma; i++) html += '<i></i>';
      var antal = new Date(ar, man + 1, 0).getDate();
      for (var dag = 1; dag <= antal; dag++) {
        var d = new Date(ar, man, dag), info = dagInfo(d), id = iso(d);
        var klass = 'fpk-dag' + (info.tider.length ? '' : ' fpk-av') + (id === valdDag ? ' fpk-vald' : '');
        html += '<button type="button" class="' + klass + '" data-dag="' + id + '"' + (info.tider.length ? '' : ' disabled') + '>' +
          dag + (info.etikett ? '<small>' + info.etikett + '</small>' : '') + '</button>';
      }
      rot.innerHTML = html + '</div>';
      ritaTider();
    }

    function ritaTider() {
      if (!valdDag) { tiderEl.innerHTML = ''; return; }
      var d = franIso(valdDag);
      tiderEl.innerHTML = '<p class="fpk-tider-titel">Önskad tid ' + VECKODAGAR[d.getDay()] + ' ' + d.getDate() + ' ' + MANADER[d.getMonth()] + '</p>' +
        dagInfo(d).tider.map(function (t) {
          return '<button type="button" class="fpk-tid' + (t.id === valdTid ? ' fpk-vald' : '') + '" data-tid="' + t.id + '"><strong>' + t.titel + '</strong><span>' + t.text + '</span></button>';
        }).join('');
    }

    function spara() {
      var d = valdDag && franIso(valdDag);
      var t = (d ? dagInfo(d).tider : []).filter(function (x) { return x.id === valdTid; })[0];
      if (!t) valdTid = null;
      datumFalt.value = t ? valdDag : '';
      tidFalt.value = t ? VECKODAGAR[d.getDay()] + ' ' + d.getDate() + ' ' + MANADER[d.getMonth()] + ' – ' + t.titel + ' (' + t.text + ')' : '';
      if (t && felEl) felEl.hidden = true;
      datumFalt.dispatchEvent(new Event('change', { bubbles: true }));
    }

    rot.addEventListener('click', function (e) {
      var nav = e.target.closest('[data-steg]');
      if (nav) { visadManad = new Date(visadManad.getFullYear(), visadManad.getMonth() + Number(nav.getAttribute('data-steg')), 1); rita(); return; }
      var dag = e.target.closest('[data-dag]');
      if (dag && !dag.disabled) { valdDag = dag.getAttribute('data-dag'); valdTid = null; spara(); rita(); }
    });
    tiderEl.addEventListener('click', function (e) {
      var t = e.target.closest('[data-tid]');
      if (t) { valdTid = t.getAttribute('data-tid'); spara(); ritaTider(); }
    });

    wrap.fpkKlar = function () {
      if (datumFalt.value && tidFalt.value) return true;
      if (felEl) felEl.hidden = false;
      rot.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    };
    wrap.fpkUppdatera = function () { rita(); spara(); };
    rita();
  }

  kalendrar.forEach(skapa);

  // Formulären frågar detta innan de skickas: är dag och tid valda i formulärets kalender?
  window.fpKalenderKlar = function (form) {
    var wrap = (form || document).querySelector('[data-fp-kalender]');
    return !wrap || !wrap.fpkKlar || wrap.fpkKlar();
  };

  // Hämta upptagna tider från Google Kalender (går det inte visas kalendern ändå)
  fetch('/api/ledigt?from=' + iso(forsta) + '&to=' + iso(plusDagar(sista, 1)), { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data || !Array.isArray(data.busy)) return;
      upptaget = data.busy.map(function (b) { return [Date.parse(b.start), Date.parse(b.end)]; })
        .filter(function (b) { return b[0] < b[1]; });
      kalendrar.forEach(function (w) { if (w.fpkUppdatera) w.fpkUppdatera(); });
    })
    .catch(function () {});
})();
