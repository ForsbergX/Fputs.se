/* Google-recensioner, ordagrant från Tommys skärmdumpar (2026-10-24). Stil C, se css/recensioner.css.
   På en sida: <div class="rk-block" data-rk="emma,camilla" data-rubrik="Vad kunderna säger"></div>
   data-rk="alla" visar alla som rutnät. Datum = ungefärlig månad (Google visar bara "X veckor sedan"). */
(function () {
  var IU = 'Invändig & utvändig fönsterputs';
  var R = {
    emma: { namn: 'Emma', datum: 'Augusti 2026', tagg: IU,
      text: 'Otroligt nöjd med fönsterputsen! Han var väldigt duktig, professionell och noggrann in i minsta detalj. Dessutom var han otroligt trevlig och kom med en så härlig och positiv energi. Det märks verkligen att han bryr sig om sitt arbete och vill att resultatet ska bli perfekt.<br><br>Mina fönster har helt ärligt aldrig sett så här fina och rena ut! ✨ Kan varmt rekommendera honom och kommer definitivt att anlita honom igen. Stort tack för ett fantastiskt jobb! 🙌',
      svar: 'Men gud vad fint skrivet! Tusen tack emma! på starkt återseende! Mvh' },
    camilla: { namn: 'Camilla Brännhult', datum: 'Augusti 2026', tagg: IU,
      text: 'Så proffsig!<br>Grymt noggran och väldigt prisvärd !<br>Vi har riktigt gamla kalkiga fönster som säkert inte blivit putsade på 10 år när vi flyttade in.<br>Han gjorde ett fantastiskt jobb!<br>Kan starkt rekomendera ,ni kommer inte bli besvikna!',
      svar: 'Tusen tack bästa kund!!' },
    jasmina: { namn: 'Jasmina Mulahusic', datum: 'Oktober 2026', tagg: IU,
      text: 'Väldigt nöjd med utförd tjänst. Forsbergs fönsterputs var oerhört proffsig och tog sig tid att se till att fönstren var ordentligt rengjorda. Kommer absolut anlita honom igen. Rekommenderar varmt!',
      svar: 'Tusen tack, på återseende! ✨' },
    mariette: { namn: 'Mariette Persson', datum: 'Oktober 2026', tagg: IU,
      text: 'Tusen tack för ett fantastiskt bra jobb med våra fönster. Vi är så nöjda!<br>Kan starkt rekommendera Tommy. Han gjorde ett enastående bra jobb, proffsigt och supertrevligt bemötande och allt till ett jättebra pris.' },
    linnea: { namn: 'Linnea Fredriksson', datum: 'Oktober 2026', tagg: IU,
      text: 'Så nöjda med både service och resultat, rekommenderar starkt!!! ⭐', svar: 'Tack snälla! ✨' },
    lovisa: { namn: 'Lovisa Cooper-Love', datum: 'Oktober 2026', tagg: IU,
      text: 'Super nöjd! Vi har fönster långt upp på gaveln från garageuppfarten, löstes utan problem!' },
    patricia: { namn: 'Patricia Sörinder', datum: 'Oktober 2026',
      text: 'Supernöjd, kanonfina glas och trevligt bemötande! Kan inte rekommenderas nog' },
    brf: { namn: 'Brf Hasselbacken', datum: 'Oktober 2026',
      text: 'Jättefint resultat!<br>Jag är väldigt nöjd med fönsterputsen och Tommy var en glad och trevlig putsare!' },
    nina: { namn: 'Nina Saari', datum: 'Oktober 2026',
      text: 'Snabbt, smidigt och enkelt. Trevlig personal och suveräna resultat!' },
    mikael: { namn: 'Mikael Noren', datum: 'September 2026', tagg: IU,
      text: 'En riktigt trevlig kille<br>Resultat blev bättre än nytt<br>Tack för det fina jobbet Tommy' },
    jonas: { namn: 'Jonas Brännhult', datum: 'Augusti 2026', tagg: IU,
      text: 'Detta var en fantastisk upplevelse att få vårat hus rent å glasklart, högsta betyg i noggranhet, renhet. Tveka inte att boka in detta företag, Vi är såå nöjda och glada att vi hitta företagsannonsen på facebook. En återkommande fönsterputsare hos oss ✌️🤩',
      svar: 'Wow! Tack för dessa bilder och kommentarer!! 🤩' },
    johanna: { namn: 'Johanna Talus', datum: 'Augusti 2026', tagg: IU,
      text: 'Så väldigt nöjd! Kan rekommendera honom varm. Tommy är en stjärna, trevlig, smidig och duktig.',
      svar: 'Tusen tack!! Glad jag blir🤩🚀' },
    oscar: { namn: 'Oscar Jansson-Magnusson', datum: 'Augusti 2026', tagg: IU,
      text: 'Riktigt trevlig, bra service, bra pris och rent blev det! Hade en ganska krånglig balkong med fasta fönster som han löste galant. Rekommenderas starkt.' },
    peranders: { namn: 'Per Anders Broman', datum: 'Juli 2026', tagg: IU + ' · Lekeryd',
      text: 'Mycket trevligt bemötande från början till slut.<br>Så proffsigt och lätt utfört.<br>Så vi är helt enkelt super nöjda.',
      svar: 'Tusen tack för dom fina orden och kul att få putsa ute i Lekeryd för första gången! 😊 vi ses igen✨' },
    larah: { namn: 'Larah Younan', datum: 'Juli 2026', tagg: 'Fönsterputs · Huskvarna',
      text: 'SUPER!!<br>Otroligt välförberedda; alla verktyg, stegar och rengöringsmedel var med och redo att användas direkt.<br><br>Inget duttande eller tid som spilldes bort, utan ett otroligt effektivt och strukturerat arbete från början till slut.<br><br>Förutom att fönstren blev skinande rena (inte ett spår av ränder eller fläckar!), så var Tommy som putsade fantastiskt trevlig och tillmötesgående. Det märks att han verkligen bryr sig om sina kunder.',
      svar: 'Stort tack, Larah, för dina fina ord och för ditt förtroende! Det var ett nöje att få hjälpa dig med fönsterputsningen i Huskvarna. Jag är väldigt glad att du uppskattade både resultatet och servicen. Tack också för att du rekommenderat Forsbergs Fönsterputs Jönköping vidare – det betyder otroligt mycket för ett lokalt företag. Varmt välkommen att boka fönsterputs igen när det är dags!😊😊' },
    andreaselg: { namn: 'Andreas Elg', datum: 'Augusti 2026', tagg: IU,
      text: 'Fantastiskt utfört arbete av en mycket skicklig och kunnig fönsterputsare. Kan varmt rekommendera Tommy till andra kunder. Detta var första gången vi anlitade honom, men det kommer inte bli den sista.',
      svar: 'Tusen tack för ett trevligt bemötande och ett gott samarbete!😀' },
    simon: { namn: 'Simon Isaksson', datum: 'Augusti 2026', tagg: IU,
      text: 'Proffsigt och mycket bra jobb, väldigt trevligt bemötande! Vi är supernöjda!',
      svar: 'Tack för trevligt bemött och för fikat☺️' },
    rhelda: { namn: 'Rhelda Arvidsson', datum: 'Augusti 2026', tagg: 'Fönsterputs', oversatt: true,
      text: 'Tommy var väldigt hjälpsam och tillmötesgående. Vi har några nästan omöjligt svåråtkomliga fönster som har varit ett stort problem att få rena. Han gjorde allt och lite till för att ta fram en plan och klara det omöjliga! Resultatet, kommunikationen och priset var toppen. Tack, vi ses nästa gång!',
      svar: 'Tack! Det var riktigt kul :D' },
    christoffer: { namn: 'Christoffer Ejebring', datum: 'September 2026', tagg: IU,
      text: 'Trevlig och utmärkt resultat!', svar: 'Tusen tack! På glatt återseende!😊' },
    dick: { namn: 'Dick Darelid', datum: 'September 2026', tagg: IU,
      text: 'Supernöjda från första kontakt, med snabb återkoppling till väl utfört arbete.', svar: 'Tusen tack! Godaste proteinshaken med! :D' },
    josefin: { namn: 'Josefin Claesson', datum: 'September 2026', tagg: IU,
      text: 'Väldigt noggrann och punktlig. Blir att boka in fler gånger.', svar: 'Tack snälla😊' },
    kristin: { namn: 'Kristin Björkman', datum: 'September 2026',
      text: 'Snabb, proffsig service. Perfekt resultat!' },
    fredrik: { namn: 'Fredrik Stigbäck', datum: 'September 2026', tagg: IU,
      text: 'Skinande rent och proffsigt bemötande. Rekommenderas.' },
    cissi: { namn: 'Cissi Tidqvist', datum: 'September 2026',
      text: 'Vi är supernöjda med fönsterputsningen! Trevlig, effektiv och mycket proffsig. Du är välkommen tillbaka!' },
    fatima: { namn: 'Fatima Bergendal', datum: 'Augusti 2026',
      text: 'Väldigt nöjd! Noggrant och blev rent och fint.', svar: 'Tusen tack hoppas på återseende!☺️' },
    isabella: { namn: 'Isabella Cederlöf', datum: 'Juni 2026',
      text: 'Vi har originalfönster från 1932, okopplade, bökigt att komma åt och tidskrävande. Nu är de gnistrande rena och vackra igen. Tack Tommy för ett makalöst resultat och trevligt bemötande, vi ses i höst igen!' },
    ingrid: { namn: 'Ingrid Lindblom', datum: 'Juli 2026', tagg: 'Fönsterputs · Gränna',
      text: 'Mycket proffsigt utförande och ett trevligt bemötande från start till mål. Fönsterputsningen utfördes på vår gård i Gränna med gamla fönster, och resultatet blev över förväntan. Det märks att Tommy verkligen gör allt för att kunden ska bli nöjd. Kan varmt rekommenderas! 😊<br>Inca',
      svar: 'Bästa kund! 🙏✨✨' },
    kushtrim: { namn: 'Kushtrim Osmani', datum: 'Juli 2026', tagg: IU,
      text: 'Jag är mycket nöjd med fönsterputsningen. Arbetet utfördes noggrant och professionellt, och fönstren blev skinande rena utan ränder eller fläckar. Servicen var trevlig, punktlig och smidig från början till slut. Jag kan varmt rekommendera denna fönsterputsning till andra som vill ha ett riktigt bra resultat.' },
    yk: { namn: 'Y K', datum: 'Juli 2026', tagg: IU + ' · Huskvarna',
      text: 'Tommy är väldigt duktig och professionell , serviceinriktad och mån om att göra rätt ! Vi är så nöjda , båda med utförande och bemötande.',
      svar: 'Tusen tack! Väldigt trevlig familj och kul att få jobba mitt inne i centrala huskvarna radhus områden 😊' },
    julsgard: { namn: 'Andreas Julsgård', datum: 'Juli 2026', tagg: IU + ' · Lekeryd',
      text: 'super trevlig kille, gjorde ett kanon jobb med våra fönster så i fortsättningen kommer jag inte putsa några fönster själv.',
      svar: 'Tusen tack för fått äran att putsa ditt fina hus ute i Lekeryd! Vi ses igen 😊' },
    charlotta: { namn: 'Charlotta Björgaas', datum: 'Augusti 2026', tagg: IU,
      text: 'Toppen.Noggrann o trevlig!!',
      svar: 'Stort tack Charlotta! Vad roligt att du blev nöjd. Tack för förtroendet och hoppas du får glädje av de skinande fönstren länge! 😊' },
    /* Från gamla recensionssidan – inte kontrollerad mot Google ordagrant. */
    oggebci: { namn: 'Oggebci JKPG', datum: '',
      text: 'Putsade mina fönster inför lägenhetsbesiktning. Jag fick rena fönster och väldigt bra bemötande!' }
  };
  var ORDNING = ['emma', 'isabella', 'lovisa', 'camilla', 'rhelda', 'jasmina', 'larah', 'mariette', 'andreaselg',
    'ingrid', 'kushtrim', 'jonas', 'oscar', 'johanna', 'yk', 'julsgard', 'peranders', 'mikael', 'linnea', 'brf',
    'charlotta', 'simon', 'patricia', 'nina', 'fatima', 'christoffer', 'dick', 'josefin', 'kristin', 'fredrik', 'cissi', 'oggebci'];
  var GOOGLE = 'https://www.google.com/search?q=Forsbergs+F%C3%B6nsterputs+J%C3%B6nk%C3%B6ping+recensioner';
  var G = '<svg class="rk-g" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';
  var STJ = '<span class="rk-stj" aria-label="5 av 5 stjärnor">★★★★★</span>';

  /* Den starkaste meningen i varje recension blir fetstil (ordagrann, ingen omskrivning). */
  var FET = {
    emma: 'Mina fönster har helt ärligt aldrig sett så här fina och rena ut!',
    camilla: 'Han gjorde ett fantastiskt jobb!',
    jasmina: 'Kommer absolut anlita honom igen.',
    mariette: 'Han gjorde ett enastående bra jobb',
    lovisa: 'Vi har fönster långt upp på gaveln från garageuppfarten, löstes utan problem!',
    jonas: 'högsta betyg i noggranhet, renhet.',
    oscar: 'Hade en ganska krånglig balkong med fasta fönster som han löste galant.',
    larah: 'Förutom att fönstren blev skinande rena (inte ett spår av ränder eller fläckar!)',
    andreaselg: 'Detta var första gången vi anlitade honom, men det kommer inte bli den sista.',
    rhelda: 'Han gjorde allt och lite till för att ta fram en plan och klara det omöjliga!',
    isabella: 'Nu är de gnistrande rena och vackra igen.',
    ingrid: 'resultatet blev över förväntan.',
    kushtrim: 'fönstren blev skinande rena utan ränder eller fläckar.',
    julsgard: 'i fortsättningen kommer jag inte putsa några fönster själv.',
    mikael: 'Resultat blev bättre än nytt',
    johanna: 'Tommy är en stjärna'
  };
  Object.keys(R).forEach(function (k) { R[k].id = k; });

  /* Våra svar visas inte (Tommy 2026-10-24: sparar plats). Sätt true för att visa dem igen. */
  var VISA_SVAR = false;

  function kort(r) {
    var text = FET[r.id] ? r.text.replace(FET[r.id], '<strong>' + FET[r.id] + '</strong>') : r.text;
    return '<figure class="rk-kort">' +
      (r.tagg ? '<span class="rk-tagg">' + r.tagg.replace(/&/g, '&amp;') + '</span>' : '') +
      '<q>' + text + '</q>' + (r.oversatt ? '<small class="rk-oversatt">Översatt från engelska</small>' : '') +
      (VISA_SVAR && r.svar ? '<div class="rk-svar"><small>Svar från Forsbergs Fönsterputs</small><span class="rk-svar-text">' + r.svar + '</span></div>' : '') +
      '<figcaption class="rk-fot"><span class="rk-avatar" aria-hidden="true">' + r.namn.charAt(0).toUpperCase() + '</span>' +
      '<span><span class="rk-namn" style="display:block">' + r.namn + '</span>' + (r.datum ? '<span class="rk-datum">' + r.datum + '</span>' : '') + '</span>' +
      '<span class="rk-kalla">' + G + STJ + '</span></figcaption></figure>';
  }
  var summa = '<div class="rk-summa"><span class="rk-tal">5,0</span><div class="rk-summa-mitt">' + STJ +
    '<span>' + G + '45 recensioner på Google</span></div>' +
    '<a class="rk-knapp" href="' + GOOGLE + '" target="_blank" rel="noopener">Se dem på Google</a></div>';

  /* Kompakt betygsrad under rubriken (bläddringsraden), så första recensionen syns direkt */
  var rad = '<a class="rk-rad-betyg" href="' + GOOGLE + '" target="_blank" rel="noopener">' + G +
    '<span class="rk-stj">★★★★★</span><b>5,0</b><span>45 recensioner på Google</span></a>';

  document.querySelectorAll('.rk-block[data-rk]').forEach(function (el) {
    var alla = el.dataset.rk === 'alla';
    var ids = alla ? ORDNING : el.dataset.rk.split(',');
    var lista = ids.map(function (id) { return R[id.trim()]; }).filter(Boolean);
    var html = '<div class="rk-inner">' +
      (el.dataset.rubrik ? '<h2 class="rk-rubrik">' + el.dataset.rubrik + '</h2>' : '') +
      (el.dataset.layout === 'karusell' ? rad : (el.dataset.summa === 'nej' ? '' : summa));
    if (lista.length === 1) html += '<div class="rk-ensam">' + kort(lista[0]) + '</div>';
    else if (el.dataset.layout === 'karusell') {
      /* Bläddringsrad: svep eller pilar åt vänster/höger, räknare i mitten */
      html += '<div class="rk-karusell">' +
        '<div class="rk-spar">' + lista.map(kort).join('') + '</div>' +
        '<div class="rk-kontroll"><button type="button" class="rk-pil" data-steg="-1" aria-label="Föregående">‹</button>' +
        '<span class="rk-raknare">1 / ' + lista.length + '</span>' +
        '<button type="button" class="rk-pil" data-steg="1" aria-label="Nästa">›</button></div></div>';
    } else {
      /* data-fler="ja": visa 3 (mobil) / 9 (dator) först, resten bakom knappen */
      var fler = lista.length > 3 && (!alla || el.dataset.fler === 'ja');
      html += '<div class="' + (fler ? 'rk-har-fler' : '') + (fler && lista.length > 9 ? ' rk-har-fler-dator' : '') + '">' +
        '<div class="rk-vagg' + (lista.length === 2 || lista.length === 4 ? ' rk-tva' : '') + (fler ? '' : ' rk-visa-alla') + '">' +
        lista.map(kort).join('') + '</div>' +
        (fler ? '<button type="button" class="rk-fler">Visa alla ' + lista.length + ' omdömen</button>' : '') + '</div>';
    }
    if (!alla || el.dataset.layout === 'karusell') html += '<a class="rk-alla" href="recensioner.html">Läs alla recensioner →</a>';
    el.innerHTML = html + '</div>';

    var spar = el.querySelector('.rk-spar');
    if (spar) {
      /* Bläddring i steg om ett kort. Fungerar lika på mobil (1 kort) och dator (flera kort),
         och går runt åt båda håll: förbi sista → första, före första → sista. */
      var korten = spar.children, raknare = el.querySelector('.rk-raknare');
      var steg = function () { return korten.length > 1 ? korten[1].offsetLeft - korten[0].offsetLeft : spar.clientWidth; };
      var vidStart = function () { return spar.scrollLeft < 8; };
      var vidSlut = function () { return spar.scrollLeft + spar.clientWidth >= spar.scrollWidth - 8; };
      var visaRaknare = function () {
        var s = steg(), perVy = Math.max(1, Math.round((spar.clientWidth + 16) / s));
        var forst = vidSlut() ? korten.length - perVy : Math.round(spar.scrollLeft / s);
        var sist = Math.min(korten.length, forst + perVy);
        raknare.textContent = (perVy > 1 ? (forst + 1) + '–' + sist : (forst + 1)) + ' / ' + korten.length;
      };
      spar.addEventListener('scroll', visaRaknare, { passive: true });
      spar.addEventListener('scrollend', visaRaknare);
      window.addEventListener('resize', visaRaknare);
      visaRaknare();
      el.querySelectorAll('.rk-pil').forEach(function (p) {
        p.addEventListener('click', function () {
          var d = Number(p.dataset.steg);
          setTimeout(visaRaknare, 650);
          if (d > 0 && vidSlut()) spar.scrollTo({ left: 0, behavior: 'smooth' });
          else if (d < 0 && vidStart()) spar.scrollTo({ left: spar.scrollWidth, behavior: 'smooth' });
          else {
            var nu = Math.round(spar.scrollLeft / steg()), mal = Math.max(0, Math.min(korten.length - 1, nu + d));
            spar.scrollTo({ left: korten[mal].offsetLeft - korten[0].offsetLeft, behavior: 'smooth' });
          }
        });
      });
    }
  });

  /* Toppkommentar: hela korta recensioner, ett i taget, byter var 6:e sekund.
     Går att svepa (mobil) och bläddra med pilar/prickar. */
  var TOPP = ['lovisa', 'kristin', 'mikael', 'fredrik', 'josefin', 'simon', 'cissi', 'johanna', 'dick', 'christoffer', 'nina', 'linnea', 'charlotta', 'fatima', 'patricia'];
  document.querySelectorAll('.rk-topp-block').forEach(function (el) {
    var i = 0, timer, startX = null;
    el.innerHTML = '<div class="rk-topp"><span class="rk-topp-tecken" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M10 7H6.5A2.5 2.5 0 0 0 4 9.5V13a2 2 0 0 0 2 2h2.2c-.3 1.3-1.1 2.2-2.6 2.6l.5 1.4c3.1-.8 4.9-3.2 4.9-6.6V8a1 1 0 0 0-1-1zm10 0h-3.5A2.5 2.5 0 0 0 14 9.5V13a2 2 0 0 0 2 2h2.2c-.3 1.3-1.1 2.2-2.6 2.6l.5 1.4c3.1-.8 4.9-3.2 4.9-6.6V8a1 1 0 0 0-1-1z"/></svg></span>' +
      '<button type="button" class="rk-topp-pil rk-topp-forra" aria-label="Föregående">‹</button>' +
      '<button type="button" class="rk-topp-pil rk-topp-nasta" aria-label="Nästa">›</button>' +
      '<div class="rk-topp-yta" aria-live="polite"><p class="rk-topp-citat"></p><p class="rk-topp-vem"></p></div>' +
      '<div class="rk-topp-prickar">' + TOPP.map(function (t, n) { return '<button type="button" aria-label="Recension ' + (n + 1) + '"></button>'; }).join('') + '</div></div>';
    var kortet = el.querySelector('.rk-topp'), yta = el.querySelector('.rk-topp-yta'), prickar = el.querySelectorAll('.rk-topp-prickar button');
    function visa(n) {
      i = (n + TOPP.length) % TOPP.length;
      yta.classList.add('rk-tona');
      setTimeout(function () {
        var r = R[TOPP[i]];
        yta.querySelector('.rk-topp-citat').innerHTML = r.text.replace(/<br>/g, ' ');
        yta.querySelector('.rk-topp-vem').innerHTML = '<span>' + r.namn + '</span>' + G + STJ;
        prickar.forEach(function (p, k) { p.classList.toggle('aktiv', k === i); });
        yta.classList.remove('rk-tona');
      }, 220);
    }
    function start() { clearInterval(timer); timer = setInterval(function () { visa(i + 1); }, 6000); }
    function steg(d) { visa(i + d); start(); }
    prickar.forEach(function (p, k) { p.addEventListener('click', function () { visa(k); start(); }); });
    el.querySelector('.rk-topp-forra').addEventListener('click', function () { steg(-1); });
    el.querySelector('.rk-topp-nasta').addEventListener('click', function () { steg(1); });
    kortet.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    kortet.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX; startX = null;
      if (Math.abs(dx) > 40) steg(dx < 0 ? 1 : -1);
    });
    visa(0); start();
  });

  /* Stor betygsruta (recensionssidans hero) */
  document.querySelectorAll('.rk-hero-summa').forEach(function (el) {
    el.innerHTML = '<div class="rk-stor-tal">5,0</div><div class="rk-stor-stj">★★★★★</div>' +
      '<p class="rk-stor-text">' + G + '<span>Baserat på <b>45 recensioner</b> på Google</span></p>' +
      '<div class="rk-stor-knappar"><a class="rk-knapp" href="' + GOOGLE + '" target="_blank" rel="noopener">Se alla på Google</a>' +
      '<a class="rk-knapp rk-knapp-glas" href="kontakta-mig.html#formular">Få offert →</a></div>';
  });

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.classList.contains('rk-fler')) {
      t.previousElementSibling.classList.add('rk-visa-alla');
      t.remove();
    }
  });
})();
