/* Ny bokning (boka-ny.html), byggd från noll 2026-11-18.
 * Priserna är exakt samma som i js/boka.js (TIDER.md) och bokningen skickas till samma
 * /.netlify/functions/send-email med samma fält som gamla bokningen.
 */
(function () {
  // ---- Priser (samma som js/boka.js) ----
  var MIN_PRIS = 750, TIMPRIS_15 = 699, INGAR_FONSTER = 14, HOGA_MIN = 10, KARM_ANDEL = 0.15, FRAMKORNING = 30;
  var BALKONG = { helt: { namn: 'Helt inglasad', kr: 40 }, racke: { namn: 'Endast glasräcke', kr: 20 } };
  var SPROJS_MIN = { 2: 16 / 3, 3: 20 / 3, 4: 8 };
  var TYPER = [
    { id: 'L2', namn: 'Utan spröjs', min: [4, 8] },
    { id: 'S', namn: 'Med spröjs', sprojs: true },
    { id: 'O', namn: 'Överhängda fönster', min: [4.5, 10] },
    { id: 'B', namn: 'Uterum, altanräcke eller balkong', balkong: true }
  ];
  var val = {};
  TYPER.forEach(function (t) { val[t.id] = { antal: 0, sidor: 2, rutor: 4, balkong: 'helt' }; });
  var st = { special: '', utat: false, hoga: false, fasta: false, karm: false };
  // Lägenhet (samma priser som kontaktsidan: storlek + 40/20 kr per balkongruta + 30 kr inställelseavgift)
  var typ = 'villa';
  var lgh = { apt: '', pris: 0, golv: 0, tak: 0 };
  function prisNu() {
    if (typ === 'sol') return { sol: true, antal: 0, balkong: 0, putsning: 0, karm: 0, avgift: 0, total: 0 };
    if (typ !== 'lgh') return rakna();
    var puts = lgh.apt ? lgh.pris + lgh.golv * 40 + lgh.tak * 20 : 0;
    return { lgh: true, antal: 0, balkong: lgh.golv + lgh.tak, putsning: puts, karm: 0, avgift: puts ? 30 : 0, total: puts ? puts + 30 : 0 };
  }
  function lista() {
    if (typ === 'sol') return ['typ', 'extra', 'tid', 'uppgifter', 'oversikt', 'tack'];
    return typ === 'lgh' ? ['typ', 'lagenhet', 'extra', 'tid', 'uppgifter', 'oversikt', 'tack']
      : ['typ', 'fonster', 'special', 'extra', 'tid', 'uppgifter', 'oversikt', 'tack'];
  }

  var form = document.getElementById('nf');
  function f(n) { return form.querySelector('[name="' + n + '"]'); }
  function kr(n) { return n.toLocaleString('sv-SE') + ' kr'; }
  function tidsPris(minuter) {
    if (minuter <= 0) return 0;
    var m = Math.max(90, Math.ceil(Math.round(minuter) / 5) * 5);
    return Math.ceil(TIMPRIS_15 * m / 90 / 10) * 10 - 1;
  }
  function minPerFonster(t, v, utat) {
    var fyra = utat || v.sidor === 4;
    if (t.sprojs) return SPROJS_MIN[v.rutor] * (fyra ? 2 : 1);
    return t.min[fyra ? 1 : 0];
  }
  function rakna() {
    var antal = 0, minuter = 0;
    var utat = st.special === 'Ja' && st.utat;
    TYPER.forEach(function (t) {
      if (t.balkong) return;
      antal += val[t.id].antal;
      minuter += val[t.id].antal * minPerFonster(t, val[t.id], utat);
    });
    var hoga = st.special === 'Ja' && st.hoga;
    var hus = 0;
    if (antal > 0) {
      var extra = antal > INGAR_FONSTER ? minuter * (antal - INGAR_FONSTER) / antal * TIMPRIS_15 / 90 : 0;
      var fonsterPris = extra > 0 ? Math.ceil((TIMPRIS_15 + extra) / 10) * 10 - 1 : TIMPRIS_15;
      hus = Math.max(fonsterPris, tidsPris(minuter + (hoga ? HOGA_MIN : 0)));
    }
    var b = val.B;
    var balkong = b.antal * BALKONG[b.balkong].kr;
    var putsning = hus + balkong > 0 ? Math.max(hus + balkong, MIN_PRIS) : 0;
    var karm = st.karm ? Math.round(putsning * KARM_ANDEL) : 0;
    var avgift = putsning ? FRAMKORNING : 0;
    return { antal: antal, balkong: b.antal, putsning: putsning, karm: karm, avgift: avgift, total: putsning + karm + avgift };
  }
  function beskrivning(p) {
    var delar = ['En gång'];
    TYPER.forEach(function (t) {
      var v = val[t.id];
      if (!v.antal) return;
      if (t.balkong) delar.push('Uterum/altan/balkong (' + BALKONG[v.balkong].namn.toLowerCase() + '): ' + v.antal + ' rutor');
      else delar.push(t.namn + (t.sprojs ? ' ' + v.rutor + ' rutor' : '') + ', ' + v.sidor + ' sidor: ' + v.antal + ' st');
    });
    if (st.special === 'Ja') {
      var s = [];
      if (st.utat) s.push('öppnas utåt');
      if (st.hoga) s.push('svåra att nå');
      if (st.fasta) s.push('går inte att öppna');
      delar.push('Specialfönster: ' + (s.join(', ') || 'ja'));
    } else if (st.special) delar.push('Specialfönster: nej');
    if (p.karm) delar.push('Karmtvätt: ja (+' + kr(p.karm) + ')');
    if (p.avgift) delar.push('Inställelseavgift: ' + kr(p.avgift) + ' (ej RUT-berättigad)');
    return delar.join(' · ');
  }

  // ---- Fönstertyperna ----
  var IKON = {"L2":"<rect x=\"8\" y=\"5\" width=\"32\" height=\"38\" rx=\"2\"/><path d=\"M24 5v38\"/>","S":"<rect x=\"8\" y=\"5\" width=\"32\" height=\"38\" rx=\"2\"/><path d=\"M24 5v38M8 18h32M8 30h32\"/>","O":"<rect x=\"8\" y=\"5\" width=\"32\" height=\"18\" rx=\"2\"/><path d=\"M8 23l5 18h22l5-18\"/>","B":"<rect x=\"10\" y=\"4\" width=\"28\" height=\"16\" rx=\"2\"/><path d=\"M4 24h40M8 24v18M18 24v18M28 24v18M38 24v18M4 42h40\"/>"};
  var typerEl = document.getElementById('nfTyper');
  function chip(grupp, varde, text, vald) {
    return '<button type="button" class="nf-chip' + (vald ? ' vald' : '') + '" data-grupp="' + grupp + '" data-varde="' + varde + '">' + text + '</button>';
  }
  function ritaTyper() {
    typerEl.innerHTML = TYPER.map(function (t) {
      var v = val[t.id], html = '';
      if (v.antal) {
        if (t.balkong) {
          html += '<p class="nf-chips-rubrik">Vilken sort?</p><div class="nf-chips">' +
            chip('balkong', 'helt', 'Helt inglasad · 40 kr/ruta', v.balkong === 'helt') +
            chip('balkong', 'racke', 'Glasräcke · 20 kr/ruta', v.balkong === 'racke') + '</div>';
        } else {
          if (t.sprojs) html += '<p class="nf-notis">Spröjsade fönster räknar jag gärna på innan du får ett fast pris.</p>';
          html += '<p class="nf-chips-rubrik">Hur många sidor ska putsas?</p><div class="nf-chips">' +
            chip('sidor', '2', '2 sidor (enkelsidiga)', v.sidor === 2) + chip('sidor', '4', '4 sidor (dubbelsidiga)', v.sidor === 4) + '</div>';
          if (t.sprojs) html += '<p class="nf-chips-rubrik">Rutor per båge</p><div class="nf-chips">' +
            chip('rutor', '2', '2 rutor', v.rutor === 2) + chip('rutor', '3', '3 rutor', v.rutor === 3) + chip('rutor', '4', '4 rutor', v.rutor === 4) + '</div>';
        }
      }
      return '<div class="nf-typ' + (v.antal ? ' aktiv' : '') + '" data-typ="' + t.id + '"><div class="nf-typ-topp"><span class="nf-kortbild" aria-hidden="true"><svg viewBox="0 0 48 48">' + IKON[t.id] + '</svg></span><span class="nf-typ-namn">' + t.namn + '</span>' +
        '<div class="nf-raknare"><button type="button" data-steg="-1" aria-label="Minska ' + t.namn + '"' + (v.antal ? '' : ' disabled') + '>−</button>' +
        '<output>' + v.antal + '</output><button type="button" data-steg="1" aria-label="Öka ' + t.namn + '">+</button></div></div>' + html + '</div>';
    }).join('');
  }
  typerEl.addEventListener('click', function (e) {
    var rad = e.target.closest('[data-typ]');
    if (!rad) return;
    var v = val[rad.getAttribute('data-typ')];
    var steg = e.target.closest('[data-steg]');
    var c = e.target.closest('[data-grupp]');
    if (steg) v.antal = Math.max(0, Math.min(99, v.antal + Number(steg.getAttribute('data-steg'))));
    else if (c) {
      var g = c.getAttribute('data-grupp'), x = c.getAttribute('data-varde');
      if (g === 'balkong') v.balkong = x; else v[g] = Number(x);
    } else return;
    ritaTyper(); uppdatera();
    if (rakna().antal + rakna().balkong > 0) document.getElementById('nfFelFonster').hidden = true;
  });

  // ---- Specialfönster och tillval ----
  document.querySelectorAll('[data-special]').forEach(function (k) {
    k.addEventListener('click', function () {
      st.special = k.getAttribute('data-special');
      document.querySelectorAll('[data-special]').forEach(function (x) { x.classList.toggle('vald', x === k); });
      document.getElementById('nfSpecialLista').hidden = st.special !== 'Ja';
      document.getElementById('nfFelSpecial').hidden = true;
      uppdatera();
    });
  });
  document.querySelectorAll('[data-check]').forEach(function (k) {
    k.addEventListener('click', function () {
      var n = k.getAttribute('data-check');
      st[n] = !st[n];
      k.classList.toggle('vald', st[n]);
      k.setAttribute('aria-pressed', st[n] ? 'true' : 'false');
      document.getElementById('nfFelSpecial').hidden = true;
      uppdatera();
    });
  });

  // ---- Pris i bottenraden ----
  var prisEl = document.getElementById('nfPris');
  function uppdatera() {
    var p = prisNu();
    prisEl.textContent = p.sol ? 'Fast pris innan jag kommer' : p.total ? kr(p.total) : 'Välj för att se pris';
    prisEl.classList.toggle('tom', !p.total);
    return p;
  }

  // Postnummer fyller i orten
  f('postnummer').addEventListener('change', function () {
    var o = window.fpOmrade(f('postnummer').value);
    if (o.giltigt) f('postnummer').value = o.postnr;
    if (o.ort && !f('ort').value.trim()) f('ort').value = o.ort;
  });

  // ---- Översikten ----
  function rad(a, b, klass) { return '<div class="nf-o-rad' + (klass ? ' ' + klass : '') + '"><span>' + a + '</span><b>' + b + '</b></div>'; }
  function ritaOversikt() {
    var p = prisNu();
    var tid = f('onskad_tid').value;
    if (p.sol) {
      document.getElementById('nfOversikt').innerHTML = rad('Tjänst', 'Solcellstvätt') + rad('Om jobbet', f('meddelande').value.trim()) +
        rad('Önskad tid', tid ? tid.charAt(0).toUpperCase() + tid.slice(1) : '–') +
        rad('Adress', f('gata').value.trim() + ', ' + f('postnummer').value.trim() + ' ' + f('ort').value.trim()) +
        rad('Pris', 'Fast pris innan jag kommer', 'nf-o-total');
      return;
    }
    var html = rad('Fönsterputs (utan RUT-avdrag)', kr(p.putsning * 2));
    if (p.karm) html += rad('Karmtvätt (utan RUT-avdrag)', kr(p.karm * 2));
    html += rad('RUT-avdrag 50 %', '−' + kr(p.putsning + p.karm));
    html += rad('Inställelseavgift (ej RUT)', kr(p.avgift));
    html += rad('Önskad tid', tid ? tid.charAt(0).toUpperCase() + tid.slice(1) : '–');
    html += rad('Adress', f('gata').value.trim() + ', ' + f('postnummer').value.trim() + ' ' + f('ort').value.trim());
    html += rad('Totalt efter RUT', kr(p.total), 'nf-o-total');
    document.getElementById('nfOversikt').innerHTML = html;
  }

  // ---- Skärmarna ----
  var nu = 'typ';
  function visa(id) {
    if (id === 'sol') { typ = 'sol'; id = 'extra'; }
    if (id === 'lagenhet') typ = 'lgh'; else if (id === 'fonster') typ = 'villa';
    var exH = document.querySelector('[data-skarm="extra"] h1'), exP = document.querySelector('[data-skarm="extra"] .nf-under');
    exH.textContent = typ === 'sol' ? 'Berätta om panelerna' : 'Något mer?';
    exP.textContent = typ === 'sol' ? 'Ungefär hur många paneler, och var sitter de? Du får ett fast pris innan jag kommer.' : 'Valfritt. Tryck Fortsätt om inget behövs.';
    var SKARMAR = lista();
    if (SKARMAR.indexOf(id) < 0) id = 'typ';
    nu = id;
    document.querySelectorAll('[data-skarm]').forEach(function (s) { s.hidden = s.getAttribute('data-skarm') !== id; });
    var i = SKARMAR.indexOf(id);
    var antalSteg = SKARMAR.length - 2;
    document.getElementById('nfProgress').style.width = Math.min(100, (i + 1) / (SKARMAR.length - 1) * 100) + '%';
    var stegEl = document.querySelector('[data-skarm="' + id + '"] .nf-steg');
    if (stegEl && i < antalSteg) stegEl.textContent = 'Steg ' + (i + 1) + ' av ' + antalSteg;
    document.getElementById('nfKarm').hidden = typ !== 'villa'; // karmtvätt bara för villa, inte lägenhet eller solcell (Tommy 2026-11-18)
    document.getElementById('nfBotten').hidden = id === 'typ' || id === 'tack';
    document.getElementById('nfTillbaka').style.visibility = id === 'tack' ? 'hidden' : 'visible';
    var knapp = document.getElementById('nfNasta');
    knapp.textContent = id === 'oversikt' ? 'Boka' : id === 'extra' ? 'Fortsätt' : 'Fortsätt';
    if (id === 'oversikt') ritaOversikt();
    uppdatera();
    window.scrollTo(0, 0);
  }
  function ga(id) { if (location.hash !== '#' + id) location.hash = id; else visa(id); }
  window.addEventListener('hashchange', function () { visa(location.hash.slice(1)); });

  document.querySelector('[data-villa]').addEventListener('click', function () { typ = 'villa'; ga('fonster'); });
  document.querySelector('[data-sol]').addEventListener('click', function () { typ = 'sol'; ga('sol'); });
  document.querySelector('[data-lgh]').addEventListener('click', function () { typ = 'lgh'; ga('lagenhet'); });
  document.querySelectorAll('[data-apt]').forEach(function (k) {
    k.addEventListener('click', function () {
      lgh.apt = k.getAttribute('data-apt'); lgh.pris = Number(k.getAttribute('data-price'));
      document.querySelectorAll('[data-apt]').forEach(function (x) { x.classList.toggle('vald', x === k); });
      document.getElementById('nfFelLgh').hidden = true;
      uppdatera();
    });
  });
  document.getElementById('nfLghBalkong').addEventListener('click', function (e) {
    var steg = e.target.closest('[data-steg]'), rad = e.target.closest('[data-lghb]');
    if (!steg || !rad) return;
    var k = rad.getAttribute('data-lghb');
    lgh[k] = Math.max(0, Math.min(80, lgh[k] + Number(steg.getAttribute('data-steg'))));
    rad.querySelector('output').textContent = lgh[k];
    rad.querySelector('[data-steg="-1"]').disabled = !lgh[k];
    rad.classList.toggle('aktiv', lgh[k] > 0);
    uppdatera();
  });
  document.getElementById('nfTillbaka').addEventListener('click', function () {
    var L = lista(), i = L.indexOf(nu);
    if (i <= 0) location.href = '/'; else ga(L[i - 1]);
  });

  function kollaUppgifter() {
    var fel = document.getElementById('nfFelUppgifter');
    var saknas = ['namn', 'telefon', 'gata', 'postnummer', 'ort'].some(function (n) { return !f(n).value.trim(); });
    var o = window.fpOmrade(f('postnummer').value);
    fel.innerHTML = saknas ? 'Fyll i namn, telefon och adress.'
      : !o.giltigt ? 'Skriv ditt postnummer med fem siffror, t.ex. 561 31.'
      : 'Jag kommer tyvärr inte ut till ditt område än. Ring mig gärna på <a href="tel:+46793463964">079-346 39 64</a>.';
    fel.hidden = !saknas && o.ok;
    return fel.hidden;
  }

  document.getElementById('nfNasta').addEventListener('click', function () {
    var p = uppdatera();
    if (nu === 'lagenhet') {
      if (!lgh.apt) { document.getElementById('nfFelLgh').hidden = false; return; }
      ga('extra');
    } else if (nu === 'fonster') {
      if (p.antal + p.balkong === 0) { document.getElementById('nfFelFonster').hidden = false; return; }
      ga('special');
    } else if (nu === 'special') {
      var fel = !st.special || (st.special === 'Ja' && !st.utat && !st.hoga && !st.fasta);
      var felEl = document.getElementById('nfFelSpecial');
      felEl.textContent = st.special === 'Ja' ? 'Välj vilka specialfönster du har.' : 'Välj Ja eller Nej.';
      felEl.hidden = !fel;
      if (!fel) ga('extra');
    } else if (nu === 'extra') {
      var tom = typ === 'sol' && !f('meddelande').value.trim();
      document.getElementById('nfFelExtra').hidden = !tom;
      if (!tom) ga('tid');
    } else if (nu === 'tid') {
      if (!window.fpKalenderKlar || window.fpKalenderKlar(form)) ga('uppgifter');
    } else if (nu === 'uppgifter') {
      if (kollaUppgifter()) ga('oversikt');
    } else if (nu === 'oversikt') {
      skicka(p);
    }
  });

  // ---- Skicka (samma fält och mottagare som gamla bokningen) ----
  function skicka(p) {
    var knapp = document.getElementById('nfNasta');
    var felEl = document.getElementById('nfFelSkicka');
    var lghRader = ['Lägenhet: ' + lgh.apt];
    if (lgh.golv) lghRader.push('Balkong golv till tak: ' + lgh.golv + ' st');
    if (lgh.tak) lghRader.push('Balkong räcke till tak: ' + lgh.tak + ' st');
    var data = p.sol ? {
      kalla: 'Solcellstvätt (bokningssidan)',
      bostadstyp: 'Solcellstvätt'
    } : p.lgh ? {
      kalla: 'Lägenhet (nya bokningssidan)',
      bostadstyp: 'Lägenhet',
      lagenhetsstorlek: lgh.apt,
      antal_balkongrutor: (lgh.golv + lgh.tak) + ' st',
      kalkyl: lghRader.join(' | '),
      uppskattat_pris: kr(p.putsning * 2) + ' − ' + kr(p.putsning) + ' RUT + 30 kr inställelseavgift = ' + kr(p.total),
      pris_fore_rut: kr(p.putsning * 2) + ' före RUT'
    } : {
      kalla: 'Bokning (nya bokningssidan)',
      bostadstyp: 'Fönsterputs – en gång',
      kalkyl: beskrivning(p),
      antal_fonster: p.antal ? String(p.antal) : '',
      antal_balkongrutor: p.balkong ? String(p.balkong) : '',
      uppskattat_pris: kr((p.putsning + p.karm) * 2) + ' − ' + kr(p.putsning + p.karm) + ' RUT' + (p.avgift ? ' + ' + kr(p.avgift) + ' inställelseavgift' : '') + ' = ' + kr(p.total),
      pris_fore_rut: kr((p.putsning + p.karm) * 2)
    };
    var gemensamt = {
      meddelande: f('meddelande').value,
      onskat_datum_1: f('onskat_datum_1').value,
      onskad_tid: f('onskad_tid').value,
      namn: f('namn').value.trim(),
      telefon: f('telefon').value.trim(),
      adress: f('gata').value.trim() + ', ' + f('postnummer').value.trim() + ' ' + f('ort').value.trim(),
      email: f('email').value.trim()
    };
    Object.keys(gemensamt).forEach(function (n) { data[n] = gemensamt[n]; });
    knapp.disabled = true; felEl.hidden = true;
    fetch('/.netlify/functions/send-email', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    }).then(function (r) {
      if (!r.ok) throw new Error('send-email');
      ga('tack');
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', { 'event_category': 'contact', 'event_label': 'Bokning engang' });
        gtag('event', 'conversion', { 'send_to': 'AW-18225187055/j67gCPv6hOscEO-RufJD' });
      }
    }).catch(function () { felEl.hidden = false; }).then(function () { knapp.disabled = false; });
  }

  // Kalendern skriver i dolda fält – inget mer behövs här
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  ritaTyper();
  visa(location.hash.slice(1) || 'typ');
})();
