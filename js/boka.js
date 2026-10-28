/* Bokningen (boka.html) i Hemfrid-stil – Tommy 2026-10-28.
 * Steg: #val (en gång / abonnemang) → #fonster (räknare + frågor) → #uppgifter (kalender + kontakt).
 * Priset räknas som i gamla priskalkylatorn (TIDER.md): minuter per fönster → tidspris.
 */
(function () {
  // ---- Priser, samma som gamla priskalkylatorn ----
  var MIN_PRIS = 749;            // lägsta pris (Tommy 2026-10-28: "vi har 749 som lägsta")
  var TIMPRIS_15 = 699;          // 699 kr efter RUT upp till 1,5 h
  var INGAR_FONSTER = 14;        // 699 kr täcker upp till 14 fönster
  var HOGA_MIN = 10;             // svåra att nå/höga fönster: 10 min per jobb
  var KARM_ANDEL = 0.15;         // karmtvätt +15 %
  var FRAMKORNING = 50;          // framkörningsavgift engångsbokning, mer utanför Jönköping (Tommy 2026-10-28)
  var BALKONG = { helt: { namn: 'Helt inglasad', kr: 40 }, racke: { namn: 'Endast glasräcke', kr: 20 } };

  // Minuter per fönster: [2 sidor, 4 sidor]
  var SPROJS_MIN = { 2: 16 / 3, 3: 20 / 3, 4: 8 };
  var TYPER = [
    { id: 'L1', namn: '1-luft', info: 'Fönster med en båge', min: [2, 4] },
    { id: 'L2', namn: '2-luft', info: 'Fönster med två bågar', min: [4, 8] },
    { id: 'S', namn: 'Med spröjs', info: '2-luft med spröjs', sprojs: true },
    { id: 'O', namn: 'Överliggande', info: '2-luft med liggande ruta överst', min: [4.5, 10] },
    { id: 'U', namn: 'Underliggande', info: '2-luft med liggande ruta nederst', min: [3, 10] },
    { id: 'B', namn: 'Inglasad balkong', info: 'Antal glasrutor', balkong: true }
  ];
  var val = {}; // per typ: { antal, sidor: 2|4, rutor: 2|3|4, balkong: 'helt'|'racke' }
  TYPER.forEach(function (t) { val[t.id] = { antal: 0, sidor: 2, rutor: 4, balkong: 'helt' }; });

  var form = document.getElementById('bkForm');
  var rader = document.getElementById('bkRader');
  var q = new URLSearchParams(location.search);
  var bokning = q.get('typ') === 'abonnemang' ? 'abonnemang' : (q.get('typ') === 'engang' ? 'engang' : '');
  // Postnumret från startsidan fylls i, och orten om vi känner igen den (js/postnummer.js)
  function fyllOrt() {
    var o = window.fpOmrade(form.postnummer.value);
    if (o.giltigt) form.postnummer.value = o.postnr;
    if (o.ort && !form.ort.value.trim()) form.ort.value = o.ort;
  }
  if (q.get('postnr')) { form.postnummer.value = q.get('postnr'); fyllOrt(); }
  form.postnummer.addEventListener('change', fyllOrt);

  function f(n) { return form.querySelector('[name="' + n + '"]'); }
  function valt(n) { var e = form.querySelector('[name="' + n + '"]:checked'); return e ? e.value : ''; }
  function kr(n) { return n.toLocaleString('sv-SE') + ' kr'; }
  function tidsPris(minuter) {
    if (minuter <= 0) return 0;
    var m = Math.max(90, Math.ceil(Math.round(minuter) / 5) * 5);
    return Math.ceil(TIMPRIS_15 * m / 90 / 10) * 10 - 1;
  }
  function minPerFonster(t, v) {
    if (t.sprojs) return SPROJS_MIN[v.rutor] * (v.sidor === 4 ? 2 : 1);
    return t.min[v.sidor === 4 ? 1 : 0];
  }

  function rakna() {
    var antal = 0, minuter = 0;
    TYPER.forEach(function (t) {
      if (t.balkong) return;
      antal += val[t.id].antal;
      minuter += val[t.id].antal * minPerFonster(t, val[t.id]);
    });
    var hoga = valt('special') === 'Ja' && f('special_hoga').checked;
    var hus = 0;
    if (antal > 0) {
      var extra = antal > INGAR_FONSTER ? minuter * (antal - INGAR_FONSTER) / antal * TIMPRIS_15 / 90 : 0;
      var fonsterPris = extra > 0 ? Math.ceil((TIMPRIS_15 + extra) / 10) * 10 - 1 : TIMPRIS_15;
      hus = Math.max(fonsterPris, tidsPris(minuter + (hoga ? HOGA_MIN : 0)));
    }
    var b = val.B;
    var balkong = b.antal * BALKONG[b.balkong].kr;
    var putsning = hus + balkong > 0 ? Math.max(hus + balkong, MIN_PRIS) : 0;
    var karm = f('karmtvatt').checked ? Math.round(putsning * KARM_ANDEL) : 0;
    var avgift = putsning && bokning !== 'abonnemang' ? FRAMKORNING : 0;
    return { antal: antal, balkong: b.antal, putsning: putsning, karm: karm, avgift: avgift, total: putsning + karm + avgift };
  }

  // ---- Fönsterraderna ----
  function radioRad(namn, varde, text, vald) {
    return '<label class="bk-radio"><input type="radio" name="' + namn + '" value="' + varde + '"' + (vald ? ' checked' : '') + ' /><span><strong>' + text + '</strong></span></label>';
  }
  TYPER.forEach(function (t) {
    var rad = document.createElement('div');
    rad.className = 'bk-rad';
    var panel;
    if (t.balkong) {
      panel = '<p>Ange vad det är för typ av balkong som ska putsas</p>' +
        radioRad('bk-balkong', 'helt', 'Helt inglasad <small>Golv till tak · 40 kr / ruta</small>', true) +
        radioRad('bk-balkong', 'racke', 'Endast glasräcke <small>Räcke till tak · 20 kr / ruta</small>', false);
    } else {
      panel = '<p>Ange hur många sidor som ska putsas</p>' +
        radioRad('bk-sidor-' + t.id, '4', 'Dubbelsidiga – 4 sidor', false) +
        radioRad('bk-sidor-' + t.id, '2', 'Enkelsidiga – 2 sidor', true);
      if (t.sprojs) {
        panel += '<p>Hur många rutor har varje båge?</p>' +
          radioRad('bk-rutor', '2', '2 rutor', false) + radioRad('bk-rutor', '3', '3 rutor', false) + radioRad('bk-rutor', '4', '4 rutor', true);
      }
    }
    rad.innerHTML = '<div class="bk-rad-topp"><div class="bk-rad-namn"><strong>' + t.namn + '</strong><small>' + t.info + '</small></div>' +
      '<div class="bk-steg"><button type="button" data-steg="-1" aria-label="Minska ' + t.namn + '" disabled>−</button><output>0</output>' +
      '<button type="button" data-steg="1" aria-label="Öka ' + t.namn + '">+</button></div></div>' +
      '<div class="bk-rad-panel" hidden>' + panel + '</div>';
    rad.addEventListener('click', function (e) {
      var knapp = e.target.closest('[data-steg]');
      if (!knapp) return;
      val[t.id].antal = Math.max(0, Math.min(99, val[t.id].antal + Number(knapp.getAttribute('data-steg'))));
      uppdatera();
    });
    rad.addEventListener('change', function (e) {
      var n = e.target.name;
      if (n === 'bk-balkong') val.B.balkong = e.target.value;
      else if (n === 'bk-rutor') val.S.rutor = Number(e.target.value);
      else if (n === 'bk-sidor-' + t.id) val[t.id].sidor = Number(e.target.value);
      uppdatera();
    });
    t.el = rad;
    rader.appendChild(rad);
  });

  // ---- Sammanställningen ----
  function srad(text, varde) { return '<p class="bk-srad"><span>' + text + '</span><b>' + varde + '</b></p>'; }
  function datumText() {
    var tid = f('onskad_tid').value;
    return tid ? tid.charAt(0).toUpperCase() + tid.slice(1) : '–';
  }
  function ritaSamman(p) {
    var html = '<h2>Sammanställning</h2>';
    if (bokning === 'abonnemang') {
      html += srad('Fönsterputs', 'In- och utvändig') + srad('Frekvens', 'Abonnemang') + '<hr />' +
        srad('Önskat startdatum', datumText()) + '<hr />' +
        '<p class="bk-total"><span>Pris per tillfälle</span><b>' + (p.total ? kr(p.total) + '*' : '–') + '</b></p>' +
        '<p class="bk-liten">efter rutavdrag</p>' +
        '<p class="bk-liten" style="margin-top:14px">*Priset avser per tillfälle. Ditt slutliga pris fastställs när vi har gått igenom din förfrågan och återkommit med en bekräftelse.</p>';
    } else {
      html += srad('Fönsterputs', p.putsning ? kr(p.putsning) : '–');
      if (p.karm) html += srad('Karmtvätt', kr(p.karm));
      if (p.avgift) html += '<p class="bk-srad bk-stack"><span>Framkörningsavgift</span><b>' + kr(p.avgift) + '</b></p>';
      html += '<hr /><p class="bk-srad bk-stack"><span>Datum och tid</span><b>' + datumText() + '</b></p><hr />' +
        '<p class="bk-total"><span>Totalt</span><b>' + (p.total ? kr(p.total) + '*' : '–') + '</b></p>' +
        '<p class="bk-liten">efter rutavdrag</p>' +
        '<p class="bk-liten" style="margin-top:14px">*Bor du utanför Jönköping kan framkörningsavgiften bli högre. Du får alltid veta det innan vi bekräftar tiden.</p>';
    }
    document.querySelectorAll('[data-samman]').forEach(function (el) { el.innerHTML = html; });
    document.getElementById('bkMobilText').textContent = bokning === 'abonnemang' ? 'Pris per tillfälle efter RUT' : 'Totalt efter RUT';
    document.getElementById('bkMobilpris').textContent = p.total ? kr(p.total) : '0 kr';
  }

  function beskrivning(p) {
    var delar = [bokning === 'abonnemang' ? 'Abonnemang' : 'En gång'];
    TYPER.forEach(function (t) {
      var v = val[t.id];
      if (!v.antal) return;
      if (t.balkong) delar.push('Inglasad balkong (' + BALKONG[v.balkong].namn.toLowerCase() + '): ' + v.antal + ' rutor');
      else delar.push(t.namn + (t.sprojs ? ' ' + v.rutor + ' rutor' : '') + ', ' + v.sidor + ' sidor: ' + v.antal + ' st');
    });
    if (valt('special') === 'Ja') {
      var s = [];
      if (f('special_utat').checked) s.push('öppnas utåt');
      if (f('special_hoga').checked) s.push('svåra att nå');
      if (f('special_fasta').checked) s.push('går inte att öppna');
      delar.push('Specialfönster: ' + (s.join(', ') || 'ja'));
    } else if (valt('special')) delar.push('Specialfönster: nej');
    if (p.karm) delar.push('Karmtvätt: ja (+' + kr(p.karm) + ')');
    if (p.avgift) delar.push('Framkörningsavgift: ' + kr(p.avgift));
    if (valt('husdjur')) delar.push('Husdjur: ' + valt('husdjur').toLowerCase());
    delar.push('Nyckel: ' + valt('nyckel'));
    return delar.join(' · ');
  }

  function uppdatera() {
    TYPER.forEach(function (t) {
      var a = val[t.id].antal;
      t.el.querySelector('output').textContent = a;
      t.el.querySelector('[data-steg="-1"]').disabled = a === 0;
      t.el.classList.toggle('aktiv', a > 0);
      t.el.querySelector('.bk-rad-panel').hidden = a === 0;
    });
    document.getElementById('bkSpecial').hidden = valt('special') !== 'Ja';
    var p = rakna();
    ritaSamman(p);
    if (p.antal + p.balkong > 0) document.getElementById('bkFelFonster').hidden = true;
    f('kalkyl').value = beskrivning(p);
    f('antal_fonster').value = p.antal ? String(p.antal) : '';
    f('antal_balkongrutor').value = p.balkong ? String(p.balkong) : '';
    f('uppskattat_pris').value = p.total ? kr(p.total) + (bokning === 'abonnemang' ? ' per tillfälle' : '') : '';
    f('pris_fore_rut').value = p.total ? kr((p.putsning + p.karm) * 2 + p.avgift) : ''; // avgiften ger inget RUT
    f('bostadstyp').value = bokning === 'abonnemang' ? 'Fönsterputs – abonnemang' : 'Fönsterputs – en gång';
    return p;
  }
  form.addEventListener('change', uppdatera);
  // Kalendern skriver dag och tid i dolda fält – visa dem i sammanställningen
  document.querySelector('[data-fp-kalender]').addEventListener('click', function () { setTimeout(uppdatera, 0); });

  // ---- Stegen ----
  var STEG = ['start', 'val', 'fonster', 'uppgifter', 'tack'];
  function harPostnr() { return window.fpOmrade(form.postnummer.value).ok; }
  function visa(steg) {
    if (STEG.indexOf(steg) < 0) steg = 'start';
    if (steg !== 'start' && steg !== 'tack' && !harPostnr()) steg = 'start';
    if ((steg === 'fonster' || steg === 'uppgifter') && !bokning) steg = 'val';
    STEG.forEach(function (s) { document.getElementById('steg-' + s).hidden = s !== steg; });
    document.body.classList.toggle('bk-abo', bokning === 'abonnemang');
    document.querySelectorAll('.bk-rubrik-engang').forEach(function (el) { el.hidden = bokning === 'abonnemang'; });
    document.querySelectorAll('.bk-rubrik-abo').forEach(function (el) { el.hidden = bokning !== 'abonnemang'; });
    document.getElementById('bkTillbaka').setAttribute('aria-hidden', steg === 'tack' ? 'true' : 'false');
    uppdatera();
    window.scrollTo(0, 0);
  }
  function ga(steg) { if (location.hash !== '#' + steg) location.hash = steg; else visa(steg); }
  window.addEventListener('hashchange', function () { visa(location.hash.slice(1) || 'start'); });

  // Steg 0: postnumret måste vara i våra områden
  var startPostnr = document.getElementById('bkStartPostnr');
  startPostnr.value = form.postnummer.value;
  function startFortsatt() {
    var o = window.fpOmrade(startPostnr.value);
    var fel = document.getElementById('bkStartFel');
    fel.hidden = o.ok;
    if (!o.ok) {
      fel.innerHTML = o.giltigt
        ? 'Vi kommer tyvärr inte ut till ditt område än. Ring oss gärna på <a href="tel:+46793463964">079-346 39 64</a>.'
        : 'Skriv ditt postnummer med fem siffror, t.ex. 561 31.';
      return;
    }
    if (form.postnummer.value !== o.postnr) form.ort.value = '';
    form.postnummer.value = o.postnr;
    fyllOrt();
    ga(bokning ? 'fonster' : 'val');
  }
  document.getElementById('bkStartFortsatt').addEventListener('click', startFortsatt);
  startPostnr.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); startFortsatt(); } });

  document.querySelectorAll('.bk-val').forEach(function (k) {
    k.addEventListener('click', function () { bokning = k.getAttribute('data-val'); ga('fonster'); });
  });
  document.getElementById('bkTillbaka').addEventListener('click', function () {
    var steg = location.hash.slice(1) || 'start';
    var forra = { val: 'start', fonster: 'val', uppgifter: 'fonster' }[steg];
    if (forra) ga(forra); else location.href = 'index.html';
  });

  document.getElementById('bkTillUppgifter').addEventListener('click', function () {
    var p = uppdatera();
    var felF = p.antal + p.balkong === 0;
    var felS = !valt('special') || (valt('special') === 'Ja' && !form.querySelector('#bkSpecial input:checked'));
    var felB = !valt('husdjur') || !valt('nyckel');
    document.getElementById('bkFelFonster').hidden = !felF;
    document.getElementById('bkFelSpecial').hidden = !felS;
    document.getElementById('bkFelSpecial').textContent = valt('special') === 'Ja' ? 'Kryssa i vilka specialfönster du har.' : 'Välj Ja eller Nej.';
    document.getElementById('bkFelBostad').hidden = !felB;
    var forsta = felF ? rader : felS ? document.getElementById('bkFelSpecial') : felB ? document.getElementById('bkFelBostad') : null;
    if (forsta) { forsta.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    ga('uppgifter');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (window.fpKalenderKlar && !window.fpKalenderKlar(form)) {
      document.querySelector('[data-fp-kalender]').scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    var saknas = ['namn', 'telefon', 'adress', 'postnummer', 'ort'].some(function (n) { return !f(n).value.trim(); });
    var omrade = window.fpOmrade(f('postnummer').value);
    var felU = document.getElementById('bkFelUppgifter');
    felU.innerHTML = saknas ? 'Fyll i namn, telefon och adress.'
      : !omrade.giltigt ? 'Skriv ditt postnummer med fem siffror, t.ex. 561 31.'
      : 'Vi kommer tyvärr inte ut till ditt område än. Ring oss gärna på <a href="tel:+46793463964">079-346 39 64</a>.';
    felU.hidden = !saknas && omrade.ok;
    if (!felU.hidden) return;
    uppdatera();
    var data = Object.fromEntries(new FormData(form));
    data.adress = f('adress').value.trim() + ', ' + f('postnummer').value.trim() + ' ' + f('ort').value.trim();
    ['postnummer', 'ort', 'special', 'special_utat', 'special_hoga', 'special_fasta', 'karmtvatt', 'husdjur', 'nyckel', 'bk-balkong', 'bk-rutor'].forEach(function (n) { delete data[n]; });
    Object.keys(data).forEach(function (n) { if (n.indexOf('bk-sidor-') === 0) delete data[n]; });
    var knapp = document.getElementById('bkSkicka');
    var fel = document.getElementById('bkFelSkicka');
    knapp.disabled = true; fel.hidden = true;
    fetch('/.netlify/functions/send-email', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    }).then(function (r) {
      if (!r.ok) throw new Error('send-email error');
      ga('tack');
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', { 'event_category': 'contact', 'event_label': 'Bokning ' + bokning });
        gtag('event', 'conversion', { 'send_to': 'AW-18225187055/j67gCPv6hOscEO-RufJD' });
      }
    }).catch(function () {
      fel.hidden = false;
      knapp.disabled = false;
    });
  });

  visa(location.hash.slice(1) || (!harPostnr() ? 'start' : bokning ? 'fonster' : 'val'));
})();
