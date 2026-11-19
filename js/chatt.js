/* Enkel svarsbot (Tommy 2026-11-19): färdiga frågor med svar från hemsidans egna texter. Ingen AI.
 * Ändra svar här i listan FRAGOR. Lägg till sidan med <link css/chatt.css> + <script js/chatt.js>. */
(function () {
  var TEL = '+46793463964', TEL_TEXT = '079-346 39 64';
  var FRAGOR = [
    { q: 'Vad kostar det?', a: 'En lägenhet kostar från 475 kr och en villa från 750 kr efter RUT-avdrag, plus en inställelseavgift på 30 kr. Du får alltid ett fast pris innan jag börjar.', knapp: ['Räkna ut mitt pris', '/boka'] },
    { q: 'Vad ingår?', a: 'Alla sidor av fönstret – insida, utsida och mellan glasen – om inget annat sägs. Hos mig är allt med från början.' },
    { q: 'Behöver jag vara hemma?', a: 'Nej. Många kunder lämnar en nyckel eller kod, så putsar jag medan du är på jobbet. Ska jag bara putsa utvändigt räcker det att låsta grindar är öppna.' },
    { q: 'Vilka områden?', a: 'Hela Jönköping och Huskvarna, samt Habo, Bankeryd, Gränna, Lekeryd, Tenhult, Norrahammar, Taberg, Barnarp, Kaxholmen, Bottnaryd, Skärstad och Ölmstad.', knapp: ['Se alla områden', '/omraden'] },
    { q: 'Hur betalar jag?', a: 'Privatpersoner betalar med Swish efter utfört arbete. RUT-avdraget är redan draget, och jag sköter allt med Skatteverket. Företag får faktura.' },
    { q: 'Måste jag binda upp mig?', a: 'Nej, ingen bindningstid. Du bokar när det passar dig – en gång eller regelbundet.' },
    { q: 'Putsar du på vintern?', a: 'Ja, året runt. På vintern använder jag frostskydd i vattnet, så det blir klockrent även i minusgrader. Vid extremt oväder flyttar jag tiden kostnadsfritt.' },
    { q: 'Om jag inte är nöjd?', a: 'Då kommer jag tillbaka och åtgärdar det kostnadsfritt, tills du är nöjd. Jag har dessutom full ansvarsförsäkring.' },
    { q: 'Vem kommer?', a: 'Det är alltid jag, Tommy, som kommer. Du vet alltid vem som putsar dina fönster.' },
    { q: 'Hur bokar jag?', a: 'Räkna ut ditt fasta pris och välj tid direkt i bokningen. Du kan också ringa mig på ' + TEL_TEXT + ' (09–21).', knapp: ['Boka nu', '/boka'] }
  ];

  var ikonChatt = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01"/></svg>';
  var ikonKryss = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';

  var knapp = document.createElement('button');
  knapp.type = 'button';
  knapp.className = 'fc-knapp';
  knapp.setAttribute('aria-label', 'Vanliga frågor – öppna chatten');
  knapp.setAttribute('aria-expanded', 'false');
  knapp.innerHTML = ikonChatt;

  var panel = document.createElement('section');
  panel.className = 'fc-panel';
  panel.hidden = true;
  panel.setAttribute('aria-label', 'Vanliga frågor');
  panel.innerHTML =
    '<header class="fc-topp"><img src="/images/logo-nav-badge.png" alt="" width="40" height="40" /><div><strong>Forsbergs Fönsterputs</strong><small>Svar direkt på vanliga frågor</small></div>' +
    '<button type="button" class="fc-stang" aria-label="Stäng chatten">' + ikonKryss + '</button></header>' +
    '<div class="fc-logg" aria-live="polite"></div>' +
    '<footer class="fc-fot"><a href="tel:' + TEL + '">Ring ' + TEL_TEXT + '</a><a href="/kontakta-mig">Skriv till mig</a></footer>';

  document.body.appendChild(panel);
  document.body.appendChild(knapp);
  var logg = panel.querySelector('.fc-logg');

  function bubbla(text, vem) {
    var b = document.createElement('div');
    b.className = 'fc-bubbla fc-' + vem;
    b.textContent = text;
    logg.appendChild(b);
    return b;
  }
  function visaFragor(rubrik) {
    var g = document.createElement('div');
    g.className = 'fc-val';
    if (rubrik) { var p = document.createElement('p'); p.className = 'fc-val-rubrik'; p.textContent = rubrik; g.appendChild(p); }
    FRAGOR.forEach(function (f, i) {
      var k = document.createElement('button');
      k.type = 'button'; k.className = 'fc-chip'; k.textContent = f.q; k.setAttribute('data-fc', i);
      g.appendChild(k);
    });
    logg.appendChild(g);
  }
  function svara(i) {
    var f = FRAGOR[i];
    logg.querySelectorAll('.fc-val').forEach(function (x) { x.remove(); });
    bubbla(f.q, 'du');
    var b = bubbla(f.a, 'jag');
    if (f.knapp) {
      var a = document.createElement('a');
      a.className = 'fc-lank'; a.href = f.knapp[1]; a.textContent = f.knapp[0] + ' →';
      b.appendChild(document.createElement('br')); b.appendChild(a);
    }
    visaFragor('Något mer du undrar?');
    logg.scrollTop = logg.scrollHeight;
    if (window.gtag) window.gtag('event', 'chatt_fraga', { fraga: f.q });
  }
  function oppna(ja) {
    panel.hidden = !ja;
    knapp.setAttribute('aria-expanded', ja ? 'true' : 'false');
    knapp.innerHTML = ja ? ikonKryss : ikonChatt;
    knapp.setAttribute('aria-label', ja ? 'Stäng chatten' : 'Vanliga frågor – öppna chatten');
    if (ja && !logg.childNodes.length) {
      bubbla('Hej! Här får du svar direkt på det de flesta undrar. Tryck på en fråga.', 'jag');
      visaFragor();
    }
  }

  knapp.addEventListener('click', function () { oppna(panel.hidden); });
  panel.querySelector('.fc-stang').addEventListener('click', function () { oppna(false); knapp.focus(); });
  logg.addEventListener('click', function (e) {
    var c = e.target.closest('[data-fc]');
    if (c) svara(Number(c.getAttribute('data-fc')));
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { oppna(false); knapp.focus(); } });
})();
