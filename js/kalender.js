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

    // Snabbval (Tommy 2026-11-22): data-fp-kalender="snabb" → två tryck i stället för kalender.
    // "Välj datum" visar den vanliga kalendern. Plus ett frivilligt fält för önskemål.
    var snabb = wrap.getAttribute('data-fp-kalender') === 'snabb';
    var valdNar = null, valdDel = null, onskemal = null;
    var NAR = [
      { id: 'snart', titel: 'Så snart som möjligt' },
      { id: 'nasta', titel: 'Nästa vecka' },
      { id: 'senare', titel: 'Om 2–3 veckor' },
      { id: 'datum', titel: 'Välj datum' }
    ];
    var DEL = [
      { id: 'fm', titel: 'Förmiddag' },
      { id: 'mitt', titel: 'Mitt på dagen' },
      { id: 'egal', titel: 'Spelar ingen roll' }
    ];
    var snabbEl = null, delEl = null;
    if (snabb) {
      snabbEl = document.createElement('div');
      snabbEl.className = 'fpk-snabb';
      snabbEl.innerHTML = '<div class="fpk-val" data-grupp="nar">' +
        NAR.map(function (n) { return '<button type="button" class="fpk-tid" data-nar="' + n.id + '"><strong>' + n.titel + '</strong></button>'; }).join('') + '</div>' +
        '<div class="fpk-del" hidden><p class="fpk-tider-titel">Tid på dagen</p><div class="fpk-val" data-grupp="del">' +
        DEL.map(function (n) { return '<button type="button" class="fpk-tid" data-del="' + n.id + '"><strong>' + n.titel + '</strong></button>'; }).join('') + '</div></div>';
      wrap.insertBefore(snabbEl, rot);
      delEl = snabbEl.querySelector('.fpk-del');
      var onskWrap = document.createElement('label');
      onskWrap.className = 'nf-falt fpk-onskemal';
      onskWrap.innerHTML = '<span>Något speciellt? <em>(valfritt)</em></span><input type="text" maxlength="120" placeholder="T.ex. inte måndagar" />';
      wrap.insertBefore(onskWrap, felEl || null);
      onskemal = onskWrap.querySelector('input');
      rot.hidden = true; tiderEl.hidden = true;
    }
    function rensa(t) { return String(t || '').replace(/[<>]/g, '').trim(); }
    function medOnskemal(t) { var o = onskemal ? rensa(onskemal.value) : ''; return t && o ? t + ' · Önskemål: ' + o : t; }
    function sparaSnabb() {
      if (valdNar === 'datum') { spara(); return; }
      var n = NAR.filter(function (x) { return x.id === valdNar; })[0];
      var d = DEL.filter(function (x) { return x.id === valdDel; })[0];
      datumFalt.value = '';
      tidFalt.value = n && d ? medOnskemal(n.titel + ' – ' + d.titel) : '';
      if (tidFalt.value && felEl) felEl.hidden = true;
      datumFalt.dispatchEvent(new Event('change', { bubbles: true }));
    }
    function markera(grupp, attr, id) {
      [].forEach.call(snabbEl.querySelectorAll('[' + attr + ']'), function (b) { b.classList.toggle('fpk-vald', b.getAttribute(attr) === id); });
    }

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
      tidFalt.value = t ? medOnskemal(VECKODAGAR[d.getDay()] + ' ' + d.getDate() + ' ' + MANADER[d.getMonth()] + ' – ' + t.titel + ' (' + t.text + ')') : '';
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

    if (snabb) {
      snabbEl.addEventListener('click', function (e) {
        var n = e.target.closest('[data-nar]'), d = e.target.closest('[data-del]');
        if (n) {
          valdNar = n.getAttribute('data-nar'); markera('nar', 'data-nar', valdNar);
          var datum = valdNar === 'datum';
          rot.hidden = !datum; tiderEl.hidden = !datum; delEl.hidden = datum;
          if (datum) { valdDag = null; valdTid = null; rita(); }
          sparaSnabb();
        }
        if (d) { valdDel = d.getAttribute('data-del'); markera('del', 'data-del', valdDel); sparaSnabb(); }
      });
      onskemal.addEventListener('input', sparaSnabb);
    }

    wrap.fpkKlar = function () {
      if (snabb && valdNar !== 'datum') {
        if (tidFalt.value) return true;
        if (felEl) { felEl.textContent = valdNar ? 'Välj tid på dagen.' : 'Välj när det passar.'; felEl.hidden = false; }
        snabbEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
      }
      if (datumFalt.value && tidFalt.value) return true;
      if (felEl) felEl.hidden = false;
      rot.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    };
    wrap.fpkUppdatera = function () { rita(); if (!snabb || valdNar === 'datum') spara(); };
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
