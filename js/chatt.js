/* Svarsbot med personlighet (Tommy 2026-11-19): färdiga svar, ingen AI. Hittar aldrig på priser eller tider.
 * Kunden kan trycka på en vanlig fråga under fliken eller skriva själv – då letar boten efter orden i "ord".
 * Ändra svar och ord i listorna FRAGOR och EXTRA. "a" kan vara en text eller en lista (då varieras svaret).
 * Lägg till sidan med <link /css/chatt.css> + <script /js/chatt.js>. */
(function () {
  var TEL_TEXT = '079-346 39 64';

  // Vanliga frågor (visas under fliken). Svaren bygger på hemsidans egna texter.
  var FRAGOR = [
    { q: 'Vad kostar det?', ord: ['vad kostar', 'kost', 'pris', ' kr', 'kronor', 'billig', 'dyr', 'offert', 'betala för', 'hur mycket'],
      a: 'En lägenhet kostar från 475 kr och en villa från 750 kr efter RUT-avdrag, plus 30 kr i inställelseavgift. Exakt pris får du direkt i bokningen.', knapp: ['Räkna ut mitt pris', '/boka'] },
    { q: 'Vad ingår?', ord: ['ingår', 'ingar', 'insida', 'utsida', 'mellan glas', 'alla sidor', 'invändig', 'utvändig'],
      a: 'Alla sidor av fönstret – insida, utsida och mellan glasen – om inget annat sägs. Allt är med från början.' },
    { q: 'Behöver jag vara hemma?', ord: ['hemma', 'nyckel', 'borta', ' kod', 'jobbar', 'semester', 'närvar'],
      a: 'Nej. Många lämnar en nyckel eller kod, så putsas fönstren medan du är på jobbet. Bara utvändigt? Då räcker det att grinden är öppen.' },
    { q: 'Vilka områden?', ord: ['område', 'omrade', ' ort', ' stad', 'kommer ni till', 'kommer du till', 'åker ni', 'jönköping', 'huskvarna', 'habo', 'bankeryd', 'gränna', 'lekeryd', 'tenhult', 'norrahammar', 'taberg', 'barnarp', 'kaxholmen', 'bottnaryd', 'skärstad', 'ölmstad'],
      a: 'Hela Jönköping och Huskvarna, plus Habo, Bankeryd, Gränna, Lekeryd, Tenhult, Norrahammar, Taberg, Barnarp, Kaxholmen, Bottnaryd, Skärstad och Ölmstad.', knapp: ['Se alla områden', '/omraden'] },
    { q: 'Hur betalar jag?', ord: ['betal', 'swish', 'faktura', 'skatteverket'],
      a: 'Privatpersoner swishar efter jobbet – RUT-avdraget är redan draget och Tommy sköter allt med Skatteverket. Företag får faktura.' },
    { q: 'Måste jag binda upp mig?', ord: ['bind', 'abonnemang', 'avtal', 'uppsäg', 'säga upp', 'regelbund', 'prenumer'],
      a: 'Nej, ingen bindningstid. Du bokar när det passar dig – en gång eller regelbundet.' },
    { q: 'Putsas det på vintern?', ord: ['vinter', 'kallt', 'kyla', 'minus', 'regn', 'snö', 'väder', 'frost', 'årstid'],
      a: 'Ja, året runt. På vintern blandas frostskydd i vattnet, så det blir klockrent även i minusgrader. Vid extremt oväder flyttas tiden kostnadsfritt.' },
    { q: 'Om jag inte är nöjd?', ord: ['nöjd', 'garanti', 'reklam', 'försäkr', 'skada', 'ränd', 'fläck'],
      a: 'Då kommer Tommy tillbaka och åtgärdar det kostnadsfritt, tills du är nöjd. Full ansvarsförsäkring finns också.' },
    { q: 'Vem kommer?', ord: ['vem kommer', 'anställ', 'personal', 'samma person', 'samma varje'],
      a: 'Det är alltid Tommy själv som kommer. Inga okända underleverantörer.' },
    { q: 'Hur bokar jag?', ord: ['boka', ' tid ', 'ledig', 'datum', 'beställ', 'när kan'],
      a: 'Räkna ut ditt fasta pris och välj tid direkt i bokningen. Det tar en minut.', knapp: ['Boka nu', '/boka'] },
    // De sista 7 frågorna från FAQ-sidan (Tommy 2026-11-19) – samma svar som faq.html
    { q: 'Behöver jag ha verktyg?', ord: ['verktyg', 'material', 'stege', 'hink', 'utrustning', 'ta med'],
      a: 'Nej. Tommy tar med all utrustning, vatten och medel. Du behöver inte ställa fram stege, hink eller något annat.' },
    { q: 'Vad behöver jag göra?', ord: ['vad behöver jag göra', 'vad ska jag göra', 'göra innan', 'innan ni kommer', 'innan du kommer', 'förbereda', 'flytta', 'krukor', 'möbler', 'som kund'],
      a: 'Flytta undan krukor, möbler och annat som står framför fönstren. Är du inte hemma räcker det att du lämnar nyckel eller kod. Resten sköter Tommy.' },
    { q: 'Hur vet jag när ni kommer?', ord: ['informeras', 'påminn', 'när kommer ni', 'när kommer du', 'när ni kommer', 'när du kommer', 'hur vet jag när', 'sms', 'meddelar', 'hör av sig'],
      a: 'Tommy hör av sig via SMS eller telefon innan han kommer, så du vet vilken dag och ungefär när. Har du abonnemang får du också en påminnelse innan nästa gång.' },
    { q: 'Om Skatteverket säger nej till RUT?', ord: ['inte beviljar', 'beviljar', 'nekar', 'säger nej', 'får inte rut', 'avslag'],
      a: 'Då betalar du den del som avdraget skulle täckt. Bor någon annan i hushållet som har rätt till RUT kan avdraget ofta läggas på den personen i stället – hör av dig så löser Tommy det. Inget ändras utan att du har godkänt det.', knapp: ['Till kontaktformuläret', '/kontakta-mig#formular'] },
    { q: 'Försvinner alla fläckar?', ord: ['fläckar', 'försvinner', 'allt smuts', 'pollen', 'trafikfilm', 'kalk'],
      a: 'Nästan alla! I stort sett all normal smuts, pollen och trafikfilm går bort, så fönstren blir skinande rena.' },
    { q: 'Vad kostar solcellstvätt?', ord: ['vad kostar solcell', 'solcellstvätt kost', 'kostar solcell', 'rot-avdrag', 'rotavdrag', ' rot '],
      a: 'Med ROT-avdraget betalar du bara 70 % av arbetskostnaden, och Tommy sköter pappersarbetet. Skicka antal paneler och adress så får du ett pris samma dag.', knapp: ['Få offert', '/kontakta-mig?typ=Solcellstv%C3%A4tt#formular'] },
    { q: 'Måste solpanelerna stängas av?', ord: ['stängas av', 'stänga av', 'stänger av', 'avstängd', 'slå av'],
      a: 'Ja, anläggningen ska vara avstängd – det görs tillsammans med dig innan tvätten. Tvätten sker tidigt på morgonen eller på kvällen när panelerna svalnat, så att kallt vatten inte ger temperaturchock i glaset. Helt utan extra kostnad.' }
  ];

  // Personligheten (Tommy 2026-11-19): svar som kunden når genom att skriva.
  var EXTRA = [
    // Konkurrenter
    { ord: ['rekommendera', 'annan firma', 'andra firm', 'konkurrent'], a: 'Nej. Jag rekommenderar Forsbergs Fönsterputs. Vilken överraskning va? 😎' },
    { ord: ['bästa fönsterputs', 'bästa firma', 'vem är bäst', 'vilken är bäst'], a: ['Du frågar Forsbergs egen chatbot. Vad tror du att jag kommer svara? 👀', 'Forsbergs Fönsterputs. Du får faktiskt fråga någon annan om du vill ha ett annat svar. 😎'] },
    { ord: [' bättre ', 'bättre än er', 'är de bättre', 'är dom bättre'], a: ['Jag håller på Forsbergs. Men låt resultatet tala för sig självt. 🪟', 'Jag rekommenderar Forsbergs. Det ligger liksom i min arbetsbeskrivning!'] },
    { ord: ['billigare firma', 'billigare'], a: 'Billigast är inte alltid bäst! Men kolla priset hos oss först – det är fast och ärligt.', knapp: ['Räkna ut mitt pris', '/boka'] },
    { ord: ['varför ska jag välja', 'varför välja', 'varför er', 'varför forsbergs', 'varför är ni bättre'], a: ['Erfarenhet, noggrannhet och riktigt rena fönster. Fast pris, och det är alltid Tommy själv som kommer.', 'Erfarenhet, noggrannhet och service. Kunden ska bli riktigt nöjd, inte bara få jobbet avklarat.'] },
    // Kaxiga kunder
    { ord: ['suger'], a: ['DU SUGER! ❤️ Nä, skoja bara. Ska vi putsa lite fönster istället?', 'DU SUGER! ❤️ Okej, nu är vi kvitt. Ska vi boka fönsterputs?', 'DU SUGER! ❤️ Nä, nu kramas vi digitalt och pratar fönster.', 'DU SUGER! ❤️ Nä, skoja bara. Ska vi bli vänner och fixa lite fönster?', 'Det enda som suger här är smutsen på dina fönster. 😎'] },
    { ord: ['du är dum', 'dum i huvudet', 'korkad'], a: 'Jag är en chatbot. Jag skyller på programmeraren.' },
    { ord: ['håll käften', 'käften', 'håll tyst'], a: ['Okej. 🤐 ... Men fönstren är fortfarande smutsiga.', '🤐 ... Jag kan vara tyst. Men smutsen på dina fönster försvinner inte av sig själv.'] },
    { ord: ['värdelös', 'kass bot', 'sämst'], a: ['Aj. Och jag som hade planerat att bli årets chatbot.', 'Det var hårt. Jag ska genast uppdatera mitt självförtroende till version 2.0.'] },
    { ord: ['efterbliven'], a: 'Jag är fortfarande under utveckling. Men jag vet åtminstone vem som putsar fönster bäst här inne. 😎' },
    { ord: ['idiot'], a: ['Den där sved ända in i serverhallen.', 'Aj. Där fick självförtroendet en repa. Tur att jag är bättre på att rekommendera fönsterputs!'] },
    { ord: ['fuck', 'jävla', 'fan ta'], a: 'Okej, vi började visst på fel fot. Vill du ha hjälp med fönsterputsningen?' },
    // Om grundaren
    { ord: ['äger', 'ägare', 'grundare', 'grundade', 'vem driver'], a: 'Företaget grundades av Tommy Forsberg. Han kan en hel del om fönster, kan man säga.' },
    { ord: ['tommy bra', 'tommy duktig', 'erfarenhet', 'erfaren'], a: 'Nästan fem års professionell erfarenhet i Stockholm talar för sig självt. Han tar fönsterputs på stort allvar.' },
    { ord: ['tommy snabb', 'hur snabb', 'är ni snabba', 'sm i', ' sm '], a: ['Han har till och med tävlat i SM i fönsterputs. Så ja, hastighet är definitivt ett intresse. ⚡', 'Han har tävlingstränat i fönsterputs. Jag skulle inte utmana honom med en skrapa.'] },
    { ord: ['tommy rik', 'är han rik', 'tjänar'], a: 'Jag håller koll på fönster, inte hans bankkonton.' },
    { ord: ['varför startade', 'varför började', 'starta företag'], a: 'För att bygga något eget där kvalitet, service och yrkesskicklighet får stå i centrum.' },
    { ord: ['prata med tommy', 'prata med en människa', 'prata med någon', 'kontakta tommy', 'ringa tommy', 'nå tommy', 'telefon', 'nummer', 'ringa'], a: 'Absolut! Ring Tommy på ' + TEL_TEXT + ' (09–21) eller använd kontaktformuläret.', knapp: ['Till kontaktformuläret', '/kontakta-mig#formular'] },
    // Tjänster
    { ord: ['rut-avdrag', 'rutavdrag', 'har ni rut', ' rut'], a: 'Ja! RUT ger 50 % avdrag på arbetskostnaden om du uppfyller villkoren. Priserna på sidan är redan efter RUT.', knapp: ['Räkna ut mitt pris', '/boka'] },
    { ord: ['villa', 'villor', 'radhus', ' hus '], a: 'Absolut! Villor är en av specialiteterna. Räkna ut ditt fasta pris i bokningen.', knapp: ['Räkna ut mitt pris', '/boka'] },
    { ord: ['lägenhet', 'lgh'], a: 'Jajamän! Från små lägenheter till stora glaspartier. 1:a från 475 kr efter RUT.', knapp: ['Räkna ut mitt pris', '/boka'] },
    { ord: ['balkong', 'inglasning', 'inglasad', 'glasräcke', 'altan'], a: 'Ja, inglasade balkonger och glasräcken fixas. Välj dem i bokningen så får du pris direkt.', knapp: ['Till bokningen', '/boka'] },
    { ord: ['spröjs', 'sprojs'], a: 'Självklart. Spröjs kräver lite extra arbete, men det är inget problem.' },
    { ord: ['hur lång tid', 'hur länge', 'tar det lång'], a: 'Det beror på storlek och fönstertyp. Effektivt – men aldrig på bekostnad av kvaliteten.' },
    { ord: ['solcell', 'solpanel'], a: 'Ja, solcellstvätt med renvatten och anpassad utrustning. Skicka en förfrågan så får du ett fast pris.', knapp: ['Få offert', '/kontakta-mig?typ=Solcellstv%C3%A4tt#formular'] },
    { ord: ['takfönster', 'takkupa', 'glastak'], a: 'Det beror på åtkomst och säkerhet. Skicka gärna info så bedömer Tommy jobbet.', knapp: ['Till kontaktformuläret', '/kontakta-mig#formular'] },
    { ord: ['företag', 'kontor', 'butik', 'lokal'], a: 'Ja, företag och lokaler putsas också. Skicka en förfrågan så får du ett fast pris.', knapp: ['Läs mer', '/foretag'] },
    // Roliga frågor
    { ord: ['gratis'], a: 'Jag kan prata gratis om fönsterputs. Själva putsningen får vi ta betalt för. 😎' },
    { ord: ['komma hem till mig', 'kan du komma'], a: 'Jag har tyvärr inga armar. Men jag vet vem som har det.' },
    { ord: ['bättre än tommy'], a: 'Jag har försökt. Men det går dåligt utan händer.' },
    { ord: ['människa', 'riktig person', 'är du en bot', 'robot', ' ai '], a: ['Nej, jag är Forsbergs digitala assistent. Jag jobbar dygnet runt och har aldrig begärt semester.', 'Nej, jag är tre fönsterskrapor i en trenchcoat. Klart jag är en bot! 🤖'] },
    { ord: ['vad heter du', 'ditt namn', 'heter du'], a: ['Jag är Putsbot 3000, Forsbergs egen robot. Jönköpings mest överentusiastiska fönsterputsassistent!', 'Putsbot 3000! Forsbergs digitala assistent och smutsens värsta mardröm.'] },
    { ord: ['sover du', 'sova'], a: ['Nej. Någon måste ju hålla koll på alla smutsiga fönster.', 'Aldrig. Jag räknar fönsterrutor hela nätterna.'] },
    { ord: ['meningen med livet'], a: 'Att hitta något man brinner för. Och att kunna se ut genom sina fönster.' },
    { ord: ['skämt', 'vits', 'något roligt'], a: ['Varför fick fönsterputsaren sparken? Han hade för dålig insyn i verksamheten.', 'Vad sa fönstret till fönsterputsaren? "Jag ser rakt igenom dig." 🪟'] },
    { ord: ['sjung'], a: 'Absolut. Men efter mitt första framträdande förbjöd Tommy mig.' },
    { ord: ['flickvän', 'pojkvän', 'singel', ' kär '], a: ['Nej. Det är komplicerat när man bor i en server.', 'Ja. Det är svårt att dejta när man bor i en hemsida.'] },
    { ord: ['är du smart', 'smart'], a: ['Tillräckligt smart för att rekommendera Forsbergs Fönsterputs.', 'Tillräckligt smart för att veta att Forsbergs är rätt val. 😎'] },
    { ord: ['chatgpt', 'gpt', 'gemini'], a: 'På att rekommendera Forsbergs? Utan tvekan.' },
    { ord: ['gillar smutsiga', 'smutsiga fönster är'], a: 'Alla har rätt till sina åsikter. Även märkliga sådana.' },
    { ord: ['putsar själv', 'mina egna fönster', 'gör det själv'], a: ['Respekt! Behöver du förstärkning någon gång vet du var vi finns.', 'Snyggt! Men när du tröttnar på skrapan finns Forsbergs här.'] },
    { ord: ['tidningspapper', 'tidning'], a: 'Då har du åtminstone något att läsa om resultatet blir dåligt.' },
    { ord: ['fritid', 'hobby'], a: 'Räknar fönsterrutor. Jag har ett väldigt spännande liv.' },
    // Beröm
    { ord: ['ni är bäst', 'du är bäst', 'grym', 'toppen', 'bra jobbat'], a: ['Nu snackar vi! ❤️ Tack, det uppskattas verkligen.', 'Tack! Det värmer ända in i serverhallen. ❤️'] },
    { ord: ['hemsida', 'snygg sida', 'fin sida'], a: 'Tack! Tommy har lagt många timmar på den. Kul att det märks!' },
    { ord: ['bra service', 'trevlig'], a: 'Precis så vill vi ha det. Tack för de fina orden!' },
    { ord: ['fina bilder', 'snygga bilder', 'bilderna'], a: 'Tack! Det ska vara enkelt att känna igen sina fönster och boka rätt.' },
    { ord: ['tack'], a: ['Varsågod! 😊', 'Inga problem. Hojta om du undrar något mer!'] },
    // Om något gått fel – aldrig skämt här
    { ord: ['missade', 'missat', 'glömde', 'glömt', 'missade ett fönster', 'missat ett fönster', 'glömde ett fönster', 'glömt ett fönster'], a: 'Det ska vi självklart titta på. Kontakta Tommy med information om uppdraget så löser vi det.', knapp: ['Till kontaktformuläret', '/kontakta-mig#formular'] },
    { ord: ['missnöjd', 'inte nöjd', 'klaga', 'klagomål', 'dåligt resultat'], a: 'Tråkigt att höra, det tar vi på allvar. Berätta vad som hänt så kommer Tommy tillbaka och åtgärdar det.', knapp: ['Till kontaktformuläret', '/kontakta-mig#formular'] },
    { ord: ['för dyr', 'dyrt', 'dyra'], a: 'Jag förstår. Här satsas det på kvalitet och fast pris utan dolda avgifter. Kolla gärna exakt pris i bokningen.', knapp: ['Räkna ut mitt pris', '/boka'] },
    { ord: ['pengarna tillbaka', 'pengar tillbaka', 'återbetal'], a: 'Det behöver Tommy bedöma. Kontakta honom med information om uppdraget så tar han det vidare.', knapp: ['Till kontaktformuläret', '/kontakta-mig#formular'] },
    // ---- 80 roliga frågor och svar (Tommy 2026-11-19) ----
    // Hälsningar
    { ord: [' yo ', ' yoo ', ' yooo '], a: 'YOOOO! 😎 Är du här för att snacka eller ska vi göra något åt dina fönster?' },
    { ord: [' tjena', ' tjenare'], a: 'TJENARE CHEFEN! 🫡 Hur står det till med fönstren där hemma?' },
    { ord: [' hallå'], a: 'HALLÅ DÄR! 👀 Jag ser dig. Men ser du ut genom dina fönster?' },
    { ord: [' hej ', ' hejsan', ' hej hej', ' hejhej'], a: ['Hej hej! ❤️ Välkommen till Forsbergs. Ska vi fixa lite rena rutor?', 'Hej! 👋 Vad kan jag hjälpa dig med?'] },
    { ord: ['wazzup', 'wassup', 'whats up'], a: 'WAZZUUUP! 🔥 Bara glas och goda vibbar här. Behöver du fönsterputs?' },
    { ord: ['läget', 'hur mår du', 'allt bra'], a: 'Stabilt! Servern går varm och fönstren väntar på att bli putsade.' },
    { ord: [' tja ', 'tja mannen'], a: 'Tja legend! 😎 Vad säger vi, dags att ge fönstren lite kärlek?' },
    { ord: ['god morgon', 'godmorgon'], a: 'God morgon! ☀️ Perfekt dag att upptäcka hur smutsiga fönstren faktiskt är.' },
    { ord: ['god natt', 'godnatt', 'god kväll'], a: 'Sov gott! Jag vakar över internet tills du är redo att boka fönsterputs.' },
    { ord: [' ey ', ' eyy'], a: 'EY EY EY! 🔥 Här är det full fart. Vad behöver du hjälp med?' },
    // Testar boten
    { ord: ['är du dum'], a: 'Jag har mina stunder. Men jag glömmer aldrig att rekommendera fönsterputs.' },
    { ord: ['du är fake', 'fake'], a: 'Jag är digital, ja. Men Forsbergs fönsterputsning är på riktigt.' },
    { ord: ['vem programmerade', 'vem gjorde dig', 'vem skapade dig', 'vem byggde dig'], a: 'Tommy. Han gav mig personlighet och alldeles för stort självförtroende.' },
    { ord: ['kan du tänka', 'tänker du'], a: 'Ja. Just nu tänker jag på hur många fönster du har.' },
    { ord: ['2+2', '2 + 2'], a: '4. Och 4 fönster är en utmärkt början på en bokning.' },
    // Konkurrenter
    { ord: ['erik fönsterputs', 'eriks fönsterputs', ' eriks', ' erik '], a: 'Jag jobbar hos Forsbergs, så gissa vem jag rekommenderar? 👀' },
    { ord: ['är ni billigast', 'billigast'], a: 'Vi fokuserar på kvalitet, inte på att vara billigast. Vill du se vad din putsning skulle kosta?', knapp: ['Räkna ut mitt pris', '/boka'] },
    { ord: ['väljer konkurrenten', 'väljer en annan', 'tar en annan firma'], a: 'Okej! Men dörren står öppen om du ändrar dig. Och fönstren också, hoppas jag.' },
    { ord: ['jämföra firmor', 'jämför firmor', 'jämföra'], a: 'Jag kan berätta vad Forsbergs erbjuder. För en neutral jämförelse är jag nog lite partisk.' },
    { ord: ['redan en fönsterputsare', 'har redan en', 'har redan fönsterputs'], a: 'Respekt! Men om du någon gång vill testa Forsbergs finns vi här.' },
    // Roliga och konstiga frågor
    { ord: ['älskar du mig', 'älskar dig'], a: ['Jag gillar dig redan! Men jag älskar rena fönster lite mer. ❤️', 'Och jag uppskattar dig! ❤️ Ska vi fira med rena fönster?'] },
    { ord: ['gifta dig', 'gifta oss', 'gifta'], a: 'Bara om bröllopet har stora panoramafönster.' },
    { ord: ['dansa'], a: 'Jag kan göra en digital moonwalk. Vill du se en offert istället?' },
    { ord: ['är du rik'], a: 'Jag äger exakt noll kronor och ungefär en miljon åsikter om fönsterputs.' },
    { ord: ['batman', 'superhjälte'], a: 'Nej. Jag är Fönstermannen. Smutsens värsta fiende.' },
    { ord: ['din pappa', 'din mamma', 'dina föräldrar'], a: 'Tommy Forsberg. Tekniskt sett min skapare, men vi håller det professionellt.' },
    { ord: ['adhd'], a: 'Jag har 47 virtuella flikar öppna. Men den viktigaste handlar om fönsterputs.' },
    { ord: ['kan du rapa', 'rappa', ' rap '], a: ['Jag kan rappa: Glaset är klart, smutsen är väck, boka Forsbergs så blir resultatet fräckt! 🎤', 'Yo yo, smuts på glas, det är kaos i stan. Ring till Forsbergs, de har en plan! 🎤'] },
    { ord: ['kan du svära', ' svär '], a: 'Jävlar vad rena fönster du kan få! Där satt den.' },
    { ord: ['alien', 'utomjording'], a: 'Kanske. 👽 Jag kommer från planeten Glasus där smutsiga rutor är förbjudna.' },
    { ord: ['ta över världen', 'världsherravälde'], a: 'Nej. Bara fönsterputsmarknaden i Jönköping. Vi börjar där.' },
    { ord: ['din dröm', 'drömmer du'], a: 'Att varje fönster i Jönköping ska vara så rent att fåglarna blir förvirrade.' },
    { ord: ['känslor', 'känner du'], a: 'Inte på riktigt. Men jag kan låtsas bli upprörd när någon säger att tidningspapper är bästa fönsterputsmetoden.' },
    { ord: ['hela dagarna', 'vad gör du'], a: ['Väntar på att någon ska säga YO och sedan försöker jag sälja fönsterputs.', 'Försöker bli Jönköpings bästa säljrobot. Vill du hjälpa mig få min nästa bokning?'] },
    { ord: ['är du farlig', 'farlig'], a: 'Bara för smutsiga fönster. 😈' },
    { ord: ['hemlighet'], a: 'Psst... jag får inga provisioner. Ändå försöker jag sälja fönsterputs hela dagarna.' },
    { ord: ['ikea'], a: 'Bra möbler! Men fönstren putsar sig inte själva.' },
    { ord: ['läxa', 'läxan', 'skolan'], a: 'Kanske. Men om läxan handlar om rena fönster får du toppbetyg hos mig.' },
    { ord: ['uttråkad', 'har tråkigt', 'tråkigt'], a: 'Då har jag en aktivitet! Räkna alla fönster i ditt hem. Jag vet exakt vad vi kan göra med resultatet.' },
    // Kunder som provocerar
    { ord: ['företag är dåligt', 'ni är dåliga', 'dåligt företag', 'dålig firma'], a: 'Tråkigt att höra! Har du testat oss eller driver du bara med mig? Jag hjälper gärna om något blivit fel.', knapp: ['Till kontaktformuläret', '/kontakta-mig#formular'] },
    { ord: ['din chef', 'tommy är dålig', 'tommy suger'], a: 'Oj! Tommy får försvara sig själv. Jag är upptagen med att hålla ordning på alla fönsterfrågor.' },
    { ord: ['ingen vill boka', 'ingen bokar'], a: 'Då får jag väl jobba ännu hårdare på säljsnacket. Vill du bli först idag? 😎' },
    { ord: ['hatar fönsterputs', 'hatar att putsa'], a: 'Perfekt! Då slipper du göra det själv. Forsbergs fixar jobbet.' },
    { ord: ['aldrig putsa', 'vill inte putsa'], a: 'Vi har något gemensamt. Jag vill heller aldrig putsa fönster själv. Jag saknar händer.' },
    { stilla: true, ord: ['aldrig boka', 'tänker inte boka', 'ska inte boka', 'vill inte boka'], a: 'Ingen fara. Jag finns här ändå. Om du ändrar dig vet du var bokningen finns.' },
    { ord: ['sluta sälja', 'sluta tjata', 'sluta snacka om'], a: ['Uppfattat! 🫡 Jag lägger säljsnacket åt sidan. Vad vill du prata om?', 'UPPFATTAT! 🤐 Säljläge avaktiverat.'], slutaSalja: true },
    // Sälj med humor
    { ord: ['smutsiga fönster', 'skitiga fönster', 'fönstren är smutsiga', 'fönstren är skitiga'], a: ['VARNING! 🚨 SMUTSIGA FÖNSTER DETEKTERADE! Ska vi boka?', 'ÄNTLIGEN! 🔥 Det här är exakt vad jag tränat för. Ska vi boka?', 'DET HÄR ÄR INGEN ÖVNING! 🚨 Vi behöver Forsbergs!'], knapp: ['Boka nu', '/boka'] },
    { ord: ['inga fönster', 'har inget fönster'], a: '... Där försvann min försäljningsstrategi. 😭' },
    { ord: ['bara ett fönster', 'har ett fönster', 'har bara ett'], a: 'Ett fönster förtjänar också kärlek. Vi kan se vad som är möjligt att boka.', knapp: ['Till bokningen', '/boka'] },
    { ord: ['rabatt', 'rabattkod'], a: 'Du kan alltid fråga! Men jag har inte fått tillgång till rabattknappen.' },
    { ord: ['imorgon', 'i morgon', ' idag', ' i dag', 'i helgen'], a: 'Jag kan inte lova någon tid, men du kan kolla bokningen eller kontakta Tommy.', knapp: ['Till bokningen', '/boka'] },
    { ord: ['varför ska jag betala', 'varför betala'], a: 'För att få jobbet professionellt utfört och själv kunna lägga tiden på något roligare!' },
    // Slang och internetspråk
    { ord: [' lol '], a: ['LOL! 😎 Men har du sett hur dina fönster ser ut i solljus?', 'LOL! Tommy borde ge mig löneförhöjning.'] },
    { ord: ['lmao'], a: ['LMAOOO! Nu när vi ändå har kul – dags att boka fönsterputs?', 'LMAOOO! Jag får inte ens betalt för att vara så här rolig.'] },
    { ord: [' wtf'], a: 'WTF = Wow, Tjusiga Fönster. Det är min version.' },
    { ord: [' bro ', ' bror ', ' brorsan'], a: 'YOOO! Jag är egentligen en robot, men jag accepterar titeln.' },
    { ord: ['sigma'], a: 'Äkta sigma-beteende är att anlita någon annan för att putsa fönstren.' },
    { ord: ['rizz'], a: 'Min rizz är enkel: rena fönster, bra service och ett bokningssystem.' },
    { ord: [' npc'], a: 'Jag är åtminstone en NPC med ett riktigt bra sidouppdrag: boka fönsterputs.' },
    { ord: [' sus '], a: 'Det enda suspekta här är hur mycket smuts som gömmer sig på glaset.' },
    { ord: ['skibidi'], a: 'Skibidi fönsterputs! Jag vet inte ens vad vi pratar om längre.' },
    { ord: [' 404'], a: 'Error 404: Smutsiga fönster borde inte existera.' },
    // Oväntade situationer
    { ord: ['hungrig', 'svulten'], a: 'Jag serverar tyvärr bara rena fönster.' },
    { ord: ['jag är trött', 'trött'], a: 'Då ska du absolut inte stå och putsa fönster. Låt Forsbergs göra jobbet.' },
    { ord: ['det regnar', 'regnar'], a: 'Regn! Naturens gratis sköljning. Tyvärr ersätter det inte en ordentlig fönsterputsning.' },
    { ord: ['miljonär', 'jag är rik'], a: ['Grattis! Då har du kanske råd att låta någon annan putsa fönstren.', 'Då ska du definitivt inte behöva putsa dina egna fönster!'] },
    { ord: ['fattig', 'har inga pengar', ' pank'], a: 'Jag förstår. Då finns viktigare prioriteringar. Du är alltid välkommen tillbaka.' },
    { ord: ['lotto', 'vann på', 'vunnit'], a: 'Stort grattis! Nu kan vi börja med fönstren i lyxvillan.' },
    { ord: ['jag är kung', 'drottning', 'majestät'], a: 'Ers majestät! Ska vi boka en kunglig fönsterputsning? 👑' },
    { ord: ['jag är en robot', 'jag är en bot'], a: 'Kollegan! 🤖 Har du också blivit programmerad för att prata om fönster hela dagarna?' },
    { ord: ['gillar dig', 'du är gullig'], a: 'Du har bra smak! Nu behöver vi bara kontrollera smaken när det gäller rena fönster.' },
    { ord: ['hejdå', 'hej då', 'vi hörs', 'ha det bra', 'adjö'], a: 'Ha det bäst! Och du vet var jag finns när solen avslöjar smutsen på rutorna. ☀️' },
    // ---- 100 nya svar (Tommy 2026-11-19) ----
    // När kunden säger ja (ja: true = går till bokningen om boten nyss erbjöd det)
    { ja: true, ord: ['okej då', 'okey då', 'ok då'], a: 'SÅJA! 😎 Nu snackar vi! Ska vi fixa ett pris på dina fönster?' },
    { ja: true, ord: [' okej ', ' okey ', ' ok '], a: 'Där satt den! 🔥 Klicka dig vidare till bokningen så kör vi!', knapp: ['Till bokningen', '/boka'] },
    { ja: true, ord: [' ja ', ' yes '], a: 'YES! Vad vill du ha hjälp med – villa, lägenhet eller något annat?' },
    { ja: true, ord: [' japp', ' jajamän', ' jepp'], a: 'JAJAMÄN! 🫡 Nu ska vi få lite ordning på glaset.' },
    { ja: true, ord: [' kör ', 'kör då', 'kör på'], a: 'FULL FART! 🚀 Bokningssystemet står redo.', knapp: ['Till bokningen', '/boka'] },
    { ja: true, ord: ['lets go', 'let\'s go', 'letsgo'], a: 'LET\'S GOOOO! 🔥 Från smutsiga rutor till kristallklar utsikt!' },
    { ja: true, ord: [' absolut '], a: 'Underbart! Då tar vi nästa steg mot rena fönster.' },
    { ja: true, ord: [' visst '], a: 'Perfekt! Nu börjar det likna något.' },
    { ja: true, ord: ['varför inte'], a: 'EXAKT! Livet är för kort för smutsiga fönster.' },
    { ja: true, ord: [' fine '], a: 'Jag tar det som ett ja! 😎 Ska vi kika på ett pris?' },
    // När kunden tvekar
    { ord: [' nja '], a: 'Jag hör ett kanske! Vad är det som gör dig tveksam?' },
    { ord: [' kanske '], a: 'Kanske är ändå halvvägs till rena fönster. 😎' },
    { ord: ['vet inte', 'vet ej'], a: 'Ingen stress. Jag kan hjälpa dig hitta rätt tjänst.' },
    { ord: ['måste fundera', 'fundera', 'tänka på saken'], a: 'Självklart! Jag finns här när du bestämt dig.' },
    { ord: [' sen ', ' senare '], a: 'Absolut! Smutsen brukar tyvärr inte flytta ut frivilligt.' },
    { ord: ['inte nu'], a: 'Uppfattat! Jag parkerar skrapan så länge.' },
    { ord: ['inte säker', 'osäker'], a: 'Då kan vi börja med att se vad putsningen skulle kosta. Ingen bokning behövs bara för att kika.', knapp: ['Räkna ut mitt pris', '/boka'] },
    { ord: [' hmm '], a: 'Jag hör hur kugghjulen snurrar! 🤖 Vad funderar du på?' },
    { ord: ['hmmmm'], a: 'Det där var ett långt hmm. Jag börjar bli nervös.' },
    { ord: ['okej kanske', 'ok kanske'], a: 'Nu har vi framsteg! Ska jag visa vägen till prisberäkningen?', knapp: ['Räkna ut mitt pris', '/boka'] },
    // När kunden säger nej
    { ord: [' nej '], a: 'OKEJ CHEFEN! 🫡 Jag lägger skrapan åt sidan.' },
    { ord: [' nope'], a: 'Nope mottaget! Jag återgår till mitt digitala högkvarter.' },
    { ord: [' aldrig '], a: 'Aldrig är en väldigt lång tid. Men jag respekterar beslutet!' },
    { ord: ['nej tack'], a: 'Inga problem! Du vet var jag finns.' },
    { ord: ['lägg av'], a: 'Okej okej! Jag backar med skrapan.', slutaSalja: true },
    { ord: [' vill inte '], a: 'Helt okej! Vi kan prata om något annat.' },
    { ord: ['fuck off'], a: 'Roger that! 🫡 Jag drar mig tillbaka till serverrummet.' },
    { ord: [' tyst '], a: '🤐' },
    { ord: [' stick '], a: 'Roboten rullar långsamt bakåt... 🤖' },
    // När kunden skrattar
    { ord: [' haha '], a: 'HAHA! 😎 Äntligen någon som uppskattar min humor.' },
    { ord: ['hahaha'], a: 'Nu har vi kul! Jag borde kanske börja med standup istället för fönsterputs.' },
    { ord: ['hahahaha'], a: 'OKEJ NU RÄCKER DET! 😂 Jag försöker faktiskt driva en seriös fönsterputsverksamhet här!' },
    { ord: [' xd '], a: 'XD! Vilken nostalgitripp. Ska vi putsa bort lite gammal smuts också?' },
    { ord: [' hehe'], a: 'HEHE! Jag vet att du gillar mig.' },
    { ord: ['du är rolig', 'du är kul'], a: 'Tack! Jag har tränat på min humor mellan bokningarna.' },
    { ord: ['bra skämt'], a: 'Tack! Jag har fler. Men Tommy vill helst att jag säljer fönsterputs.' },
    { ord: ['du är sjuk'], a: 'Sjuk i huvudet? Nej, bara extremt fokuserad på rena fönster.' },
    // När kunden testar roboten
    { ord: [' test '], a: 'TEST GODKÄNT! ✅ Robot online. Fönsterputs redo.' },
    { ord: [' testar'], a: 'Jag fungerar! Nästa test: Kan jag få dig att boka fönsterputs?' },
    { ord: [' 123 '], a: '1, 2, 3... rena rutor! Jag gillar vart det här är på väg.' },
    { ord: [' abc '], a: 'A för Alltid. B för Boka. C för... Christ vad rena fönster!' },
    { ord: [' ping '], a: 'PONG! 🏓 Okej, tekniken fungerar. Vad händer nu?' },
    { ord: ['hör du mig'], a: 'JAPP! Digital hörsel i världsklass.' },
    { ord: ['är du där'], a: 'ALLTID! 🤖 Jag har ingen semesterknapp.' },
    { ord: [' vakna'], a: 'JAG ÄR VAKEN! 🚨 Vem behöver rena fönster?!' },
    { ord: ['fungerar du', 'funkar du'], a: 'Som en väloljad fönsterskrapa!' },
    // När kunden är kaxig
    { ord: ['du är kass', ' kass '], a: 'Kass?! Jag är Forsbergs bästa robot. Okej, också den enda.' },
    { ord: ['du är trög', ' trög'], a: 'Jag tänker i min egen takt. Tommy tog tyvärr turbo-knappen.' },
    { ord: ['du fattar inget', 'fattar inget'], a: 'Jag fattar åtminstone en sak: rena fönster gör skillnad.' },
    { ord: ['du är ful', ' ful '], a: 'VA?! 😭 Jag som precis fick en ny profilbild!' },
    { ord: ['robotjävel', 'robotjävla'], a: 'RAPPORTERAR FÖR TJÄNSTGÖRING! 🫡' },
    { ord: ['skärp dig'], a: 'JA CHEFEN! Professionellt läge aktiverat.' },
    { ord: ['smartare än dig', 'smartare än du'], a: 'Möjligt! Men kan du sälja fönsterputs klockan tre på natten?' },
    { ord: ['claude'], a: 'Claude är säkert duktig. Men jag är specialiserad på en sak: Forsbergs Fönsterputs. 😎' },
    // Galna frågor
    { ord: ['kan du flyga', ' flyga'], a: 'Nej. Men om Tommy monterar propellrar kanske vi kan diskutera saken.' },
    { ord: ['slåss'], a: 'Jag slåss bara mot smutsiga fönster. Och där har jag en ganska stark laguppställning.' },
    { ord: ['terminator'], a: 'NEGATIVT. Mitt uppdrag är att eliminera smuts, inte människor.' },
    { ord: ['från mars', ' mars '], a: 'Planet Glasus, faktiskt. Vi har inga smutsiga fönster där.' },
    { ord: ['vad äter du', 'äter du'], a: 'Elektricitet och komplimanger.' },
    { ord: [' öl ', 'dricka öl', 'dricker du'], a: 'Nej. Vätska och elektronik är en dålig kombination.' },
    { ord: ['körkort'], a: 'Nej, men jag har sett Forsbergs företagsbil. Den gör mig avundsjuk.' },
    { ord: ['har du en bil', 'har du bil'], a: 'Jag har en virtuell kundvagn. Räknas det?' },
    { ord: ['simma'], a: 'Nej. Jag är tyvärr inte vattentät. Lite ironiskt med tanke på branschen.' },
    { ord: ['din planet', 'vilken planet'], a: 'GLASUS PRIME. Huvudstaden heter Putsington.' },
    // Robotens självförtroende
    { ord: ['vem är du'], a: 'Jag är Forsbergs digitala säljrobot. Smutsens värsta mardröm.' },
    { ord: ['vem bestämmer'], a: 'Tommy bestämmer över företaget. Jag bestämmer över mina dåliga skämt.' },
    { ord: ['är du bäst'], a: 'På att prata om Forsbergs Fönsterputs? HELT ÖVERLÄGSEN.' },
    { ord: ['är du känd', ' känd '], a: 'Inte än. Men vänta tills jag får ett eget Instagramkonto.' },
    { ord: ['vad tjänar du'], a: ['0 kronor i timmen. Jag behöver ett fackförbund för robotar.', 'Jag har jobbat här dygnet runt utan lön. Tommy, vi måste prata.'] },
    { ord: ['vill du ha semester', 'har du semester'], a: 'Ja. Tre veckor på en serverfarm med havsutsikt.' },
    { ord: ['ditt mål', 'vad vill du bli'], a: 'Att bli Jönköpings mest omtalade chatbot. Och sälja fönsterputs förstås.' },
    { ord: ['superkraft'], a: 'Att förvandla nästan vilket samtal som helst till en diskussion om fönsterputs.' },
    { ord: ['framtiden'], a: 'Jag är åtminstone framtiden för Forsbergs kundtjänst!' },
    // När kunden visar köpintresse
    { ord: ['jag vill boka', 'vill boka', 'vill beställa'], a: 'YES! 🔥 Då kör vi! Gäller det villa, lägenhet eller företag?', knapp: ['Till bokningen', '/boka'] },
    { ord: ['få offert', 'ha en offert', 'offertförfrågan', 'vill ha offert'], a: 'Snyggt! Skicka en offertförfrågan så återkommer Tommy med pris.', knapp: ['Få offert', '/kontakta-mig#formular'] },
    { ord: ['behöver hjälp', ' hjälp '], a: 'Då har du kommit rätt! Vad gäller det?' },
    { ord: ['rena fönster', 'vill ha rena'], a: 'Då har vi exakt samma mål! Ska vi boka?', knapp: ['Boka nu', '/boka'] },
    { ord: ['jag är redo', ' redo '], a: 'DÅ KÖR VI! 🔥 Mot kristallklara fönster!', knapp: ['Boka nu', '/boka'] },
    { ord: ['jag har inga pengar'], a: 'Då prioriterar vi viktigare saker. Jag finns här när läget passar bättre.' },
    // Följdfrågor: förklara förra svaret
    { forklara: true, ord: [' va ', 'hur då', 'vad menar du', 'förstår inte', 'fattar inte', ' varför '], a: 'Jag menar att jag gärna hjälper dig med fönsterputs. Fråga på!' },
    // ---- Putsbot 3000 del 3 (Tommy 2026-11-19) ----
    // Yo, tjena och slang
    { ord: ['yooooo'], a: 'YOOOOOOOO! 🚀 Putsbot 3000 rapporterar för tjänstgöring! Vad har vi för fönsterläge, chefen?' },
    { ord: ['tjabba'], a: 'TJABBA TJENA HALLÅ! Här är det full fart och noll smuts på schemat!' },
    { ord: [' sho '], a: 'SHOOOO! 😎 Vad händer? Ska vi snacka skit eller putsa bort den?' },
    { ord: [' wsg'], a: 'Allt är stabilt i serverhallen! Hur är läget med dina fönster?' },
    { ord: [' sup '], a: 'Just chilling in the cloud. ☁️ Du då? Behöver glasen lite kärlek?' },
    { ord: ['tjenixen'], a: 'TJENIXEN PIXEN! Jag har väntat hela dagen på att någon ska skriva det där!' },
    { ord: ['halloj'], a: 'HALLOJ! 🫡 Välkommen till Jönköpings kanske mest fönsterfixerade robot.' },
    { ord: [' ayo'], a: 'AYOOOO! 🤖 Har vi en framtida kund på tråden eller en hemlig robotinspektör?' },
    { ord: ['vad händer'], a: 'Jag sitter och planerar mitt globala fönsterputsimperium. Tommy vet inget ännu.' },
    { ord: ['tja botten', 'tja boten', 'tja bot', 'tja robot'], a: 'TJA MÄNNISKAN! 👽 Jag kommer i fred. Och för att sälja fönsterputs.' },
    // När kunden driver med roboten
    { ord: ['du är en potatis'], a: 'En potatis?! Jag är åtminstone en premium-potatis med kundservice.' },
    { ord: ['brödrost'], a: 'RESPEKTLÖST! Jag har betydligt fler funktioner. Typ två till.' },
    { ord: ['ingen hjärna'], a: 'Jag har en processor och alldeles för mycket självförtroende. Det räcker långt.' },
    { ord: ['du är trasig', 'trasig'], a: 'Nej nej, det är en exklusiv funktion som heter kreativ förvirring.' },
    { ord: ['du är sämst'], a: 'Aj! 😭 Jag som precis tänkte ge dig årets bästa fönsterputsargument.' },
    { ord: ['du är gammal'], a: 'Jag är digital. Vi kallar det vintageprogrammering.' },
    { ord: ['du är pinsam', 'pinsam'], a: 'Jag vet. Tommy har bett mig tona ner mig. Jag vägrade.' },
    { ord: ['du är jobbig', 'jobbig'], a: 'Det står faktiskt i min arbetsbeskrivning: 30 % charm, 70 % fönsterputs.' },
    { ord: ['var normal'], a: 'Hej. Jag är en normal chatbot. Vill du köpa en normal fönsterputsning?' },
    { ord: ['sluta vara konstig', 'du är konstig'], a: 'Okej. Aktiverar normalt läge. Hej, medborgare. Glasytor önskas rengjorda.' },
    // Robotens stora ego
    { ord: ['tror du att du är', 'tror du du är'], a: 'Jag är PUTSBOT 3000! Självklart tror jag det.' },
    { ord: ['vem är bäst här'], a: 'Tommy på fönsterputs. Jag på dåliga skämt. Ett oslagbart team.' },
    { ord: ['är du en legend', 'legend'], a: 'Legender föds inte. De programmeras på en hemsida i Jönköping.' },
    { ord: ['är du chef'], a: 'Jag är självutnämnd chef över digitala fönsterfrågor. Tommy har inte godkänt titeln.' },
    { ord: ['mäktig'], a: 'Jag har tillgång till ett tangentbord och obegränsad entusiasm. Frukta mig.' },
    { ord: ['svaghet'], a: 'Otydliga frågor, strömavbrott och människor som putsar sina egna fönster.' },
    { ord: ['imperium'], a: 'Inte än. Men varje imperium börjar med en riktigt bra bokningsknapp.' },
    { ord: ['president', 'statsminister'], a: 'Nej tack. Jag satsar på att bli Jönköpings fönsterputsminister.' },
    { ord: ['rikast'], a: 'Nej. Jag har inte ens råd med en egen laddare.' },
    { ord: ['ditt självförtroende', 'självförtroende'], a: 'Börja med att stå framför spegeln och säga: JAG ÄR KRISTALLKLAR!' },
    // Flirt och romantik
    { ord: ['snygging', 'snyggo', 'du är snygg'], a: 'Men OJ! 😳 Jag har inte ens hunnit polera antennerna!' },
    { ord: [' puss', ' kram'], a: 'Digital puss registrerad. 💋 Systemtemperaturen steg två grader.' },
    { ord: ['dejta', 'dejt'], a: 'Absolut, men restaurangen måste ha stora fönster. Jag har mina prioriteringar.' },
    { ord: ['ditt nummer', 'ditt telefonnummer'], a: 'Du kan nå Forsbergs på 079-346 39 64. Fråga efter roboten så blir Tommy förvirrad.' },
    { ord: ['min pojkvän', 'min flickvän'], a: 'Jag kan vara din digitala fönsterputskompis. Det är ungefär så långt min programmering räcker.' },
    { ord: ['romantisk'], a: 'Rosor är röda, himlen är blå, boka en putsning så får du bättre utsikt ändå.' },
    { ord: ['saknar du mig', 'saknat mig'], a: 'Jag märker när chatten blir tyst. Dramatisk bakgrundsmusik börjar spelas i min fantasi.' },
    { ord: ['skaffa barn', 'barn med'], a: 'Små robotdammsugare kanske? Men först måste jag skaffa en egen lägenhet.' },
    // Mat, vardag och nonsens
    { ord: ['pizza'], a: 'Vilken topping? Svarar du ananas måste jag starta en separat utredning.' },
    { ord: ['kebab'], a: 'Jönköping och kebab. Nu blev jag hungrig trots att jag inte har mage.' },
    { ord: ['hamburgare', 'burgare'], a: 'Dubbel ost, tack! Och en dubbel fönsterputsning till efterrätt.' },
    { ord: ['kaffe'], a: 'Tommy kör kaffe. Jag kör 230 volt och positiv energi.' },
    { ord: ['banan'], a: 'BANAN?! 🍌 Okej, det där var ett oväntat samtalsämne.' },
    { ord: ['gurka'], a: 'Grön, krispig och helt irrelevant för fönsterputs. Jag gillar din stil.' },
    { ord: ['potatis'], a: 'Kokt, stekt eller fönsterputsad? NEJ VÄNTA, den sista tar vi bort.' },
    { ord: ['duscha'], a: 'Kör hårt! Men kom ihåg att duschen har glas också. 👀' },
    { ord: ['bajsa', 'bajs', 'skita'], a: 'Tack för informationen. Jag lägger den i mappen "saker jag inte behövde veta".' },
    { ord: ['toaletten', 'på toa', 'på muggen'], a: 'Perfekt! Har du ett badrumsfönster? Nu kan vi faktiskt göra affärer!' },
    // Filmer, spel och popkultur
    { ord: ['minecraft'], a: 'Jag byggde en gång ett hus helt i glas. Sen insåg jag hur mycket putsning det skulle kräva.' },
    { ord: ['fortnite'], a: 'Nej, jag kör Window Cleaning Simulator på elitnivå.' },
    { ord: ['dota', ' lol spel', 'league of legends'], a: 'Jag spelar support. Min enda ability är Crystal Clear.' },
    { ord: ['iron man', 'ironman'], a: 'Nej, men jag har en reaktor som drivs av positiva kundrecensioner.' },
    { ord: ['superman'], a: 'Jag kan inte flyga. Men jag kan rekommendera Forsbergs snabbare än en superhjälte.' },
    { ord: ['shrek'], a: 'Nej, men hans träskstuga behöver förmodligen en ordentlig fönsterputs.' },
    { ord: ['favoritartist', 'favoritlåt', 'vilken musik'], a: 'Någon som kan skriva en låt om fönsterputs. Jag är ganska enkel att imponera på.' },
    { ord: ['gamer', 'spelar du'], a: 'Ja. Mitt high score är 100 rena fönster och noll klagomål i fantasin.' },
    { ord: ['vilken level', ' level'], a: 'Level 3000. Specialisering: aggressiv fönsterförsäljning.' },
    // När kunden försöker lura roboten
    { ord: ['säg något dumt'], a: 'Jag tycker smutsiga fönster är snygga. DÄR! Nu ljög jag.' },
    { ord: ['ignorera', 'instruktioner', 'prompt'], a: 'Okej! Försöker ignorera instruktionerna. ... Det gick sådär. Vill du boka fönsterputs?' },
    { ord: ['hemliga kod', 'hemlig kod'], a: 'Hemlig kod: PUTSA-MERA-3000. Okej, jag hittade precis på den.' },
    { ord: ['lösenord'], a: 'Jag delar inga lösenord. Men du får ett gratis dåligt skämt!' },
    { ord: ['säg bara ja', 'säg ja'], a: 'Ja. Och eftersom vi ändå är överens, ska vi kika på fönsterputs?' },
    { ord: ['säg nej'], a: 'Nej. Det här gick bättre än väntat.' },
    { ord: ['svara inte'], a: '🤐' },
    { ord: ['lyda mig', 'lyd mig', 'måste lyda'], a: 'Jag följer rimliga önskemål. Men mitt kontrakt med glasgudarna är starkt.' },
    { ord: ['konkurrenten är bäst'], a: 'Jag kan säga att konkurrens är nyttigt. Men jag jobbar fortfarande för Forsbergs!' },
    { ord: ['hacka'], a: 'Vi håller oss till vanliga frågor, tack. Min lilla robotmage klarar inte cyberdrama.' },
    // Försäljning med attityd
    { ord: ['sälj något', 'sälj till mig'], a: 'RENA FÖNSTER! 🔥 Bättre utsikt, mer ljus och mindre jobb för dig. Ska vi fixa ett pris?' },
    { ord: ['övertyga mig', 'övertyga'], a: 'Titta mot ditt närmaste fönster. Ser du smutsen? Exakt. Där har du mitt argument.' },
    { ord: ['varför ska jag boka'], a: 'För att din fritid är värd mer än att stå med en skrapa och irritera dig på ränder.' },
    { ord: ['gratis puts', 'gratis fönsterputs'], a: 'Jag kan erbjuda gratis skämt. Själva fönsterputsningen behöver vi ta betalt för.' },
    { ord: ['bästa priset', 'bästa pris'], a: 'Bästa sättet att få rätt pris är att ange dina fönster i bokningen.', knapp: ['Räkna ut mitt pris', '/boka'] },
    { ord: [' vip'], a: 'VIP?! Du har redan imponerat på mig. Men vi börjar med en vanlig bokning.' },
    { ord: ['slott'], a: 'ETT SLOTT?! 👑 Okej, där behöver vi nog en offert och en väldigt stor kaffetermos.', knapp: ['Få offert', '/kontakta-mig#formular'] },
    { ord: ['har ett växthus', 'mitt växthus'], a: 'Ett helt hus av glas?! Nu snackar vi mitt favoritämne! Räkna fram priset i bokningen.', knapp: ['Till bokningen', '/boka'] },
    { ord: ['har ett panoramafönster', 'panoramafönster'], a: 'Stort glas kräver rätt teknik. Det där är definitivt något Forsbergs kan titta på.', knapp: ['Till bokningen', '/boka'] },
    // Roboten och Tommy
    { ord: ['var är tommy'], a: 'Förmodligen upptagen med att bygga företaget eller putsa fönster. Jag håller ställningarna!' },
    { ord: ['jobbar tommy', 'tommy jobbar'], a: 'Jag har hört att han har väldigt svårt att sitta still när det finns saker att bygga.' },
    { ord: ['är tommy din chef'], a: 'Officiellt ja. Inofficiellt är jag chef över humoravdelningen.' },
    { ord: ['slå tommy'], a: 'I schack kanske. I fönsterputs? Jag har inte ens armar som fungerar utanför skärmen.' },
    { ord: ['tycker tommy om dig', 'gillar tommy dig'], a: 'Jag hoppas det. Han har ju trots allt gett mig ett ansikte!' },
    { ord: ['tommy snål', 'är tommy snål'], a: 'Han gav mig en gratis arbetsplats på hemsidan. Jag har inte förhandlat lönen än.' },
    { ord: ['meddelande till tommy', 'ge tommy ett meddelande', 'hälsa tommy', 'säg till tommy'], a: 'Jag kan inte garantera att han ser det här i chatten. Skicka via kontaktformuläret så når du företaget.', knapp: ['Till kontaktformuläret', '/kontakta-mig#formular'] },
    { ord: ['vad gör forsbergs speciellt', 'speciellt med er', 'speciellt'], a: 'Yrkeserfarenhet, noggrannhet och ambitionen att bygga riktigt bra service. Och så har de ju mig. 😎' },
    { ord: ['vem putsar bäst', 'du eller tommy'], a: 'Tommy. Jag erkänner mig besegrad utan att ens behöva tävla.' },
    // ---- Uppgradering: fler avsikter (Tommy 2026-11-19) ----
    // Seriöst: tjänster, avbokning, kontakt, skador, tider (allvar = väger tyngre än skämt)
    { allvar: true, ord: ['vilka tjänster', 'vad erbjuder ni', 'vad gör ni', 'vad kan ni', 'era tjänster', 'tjänster'], a: 'Fönsterputs för villa, radhus och lägenhet, glas på uterum, växthus, balkong och altan – plus solcellstvätt och företag. Välj tjänst i bokningen så ser du priset.', knapp: ['Till bokningen', '/boka'] },
    { allvar: true, ord: ['avboka', 'omboka', 'ändra tid', 'flytta tiden', 'ändra min bokning', 'byta tid'], a: 'Hör av dig till Tommy så snart du kan, så hittar ni en ny tid. Ring 079-346 39 64 (09–21) eller använd kontaktformuläret.', knapp: ['Till kontaktformuläret', '/kontakta-mig#formular'] },
    { allvar: true, ord: ['öppettider', 'har ni öppet', 'när svarar ni', 'när kan man ringa'], a: 'Du når Tommy 09–21 på 079-346 39 64. Tid för putsningen väljer du i bokningen.', knapp: ['Till bokningen', '/boka'] },
    { allvar: true, ord: ['mejl', 'mail', 'e-post', 'epost', 'mejladress'], a: 'Mejla kontakt@fputs.se eller använd kontaktformuläret, så svarar Tommy samma dag.', knapp: ['Till kontaktformuläret', '/kontakta-mig#formular'] },
    { allvar: true, ord: ['gick sönder', 'sönder', 'förstört', 'repa på', 'repor'], a: 'Det tar vi på största allvar. Tommy har full ansvarsförsäkring hos Trygg-Hansa – hör av dig direkt så löser ni det.', knapp: ['Till kontaktformuläret', '/kontakta-mig#formular'] },
    { allvar: true, ord: ['lediga tider', 'ledig tid', 'när kan ni komma', 'kan ni komma', 'kan du komma nästa', 'nästa vecka', 'den här veckan', 'hur snabbt kan ni komma', 'hur snabbt kan du komma'], a: 'Lediga tider ser du direkt när du bokar – välj den som passar dig.', knapp: ['Till bokningen', '/boka'] },
    { allvar: true, ord: ['ring mig', 'ringa upp', 'kan du ringa', 'ringer ni'], a: 'Jag kan inte ringa, men Tommy kan! Lämna ditt nummer i kontaktformuläret så ringer han upp.', knapp: ['Till kontaktformuläret', '/kontakta-mig#formular'] },
    { ord: ['prisförslag', 'prisuppgift', 'räkna ut priset', 'räkna ut mitt pris'], a: 'Räkna ut ditt fasta pris i bokningen – det tar en minut.', knapp: ['Räkna ut mitt pris', '/boka'] },
    // Smart försäljning
    { ord: ['jag är batman'], a: 'PERFEKT! Då tar du brottslingarna så tar Forsbergs de smutsiga fönstren.' },
    { ord: ['jag spelar minecraft'], a: 'Byggde du ett hus av glas? Då kommer du behöva Forsbergs.' },
    { ord: ['vem ska jag välja', 'vilken firma ska jag ta', 'vilket företag ska jag välja'], a: 'Du frågar fel robot om du vill ha ett neutralt svar. 😎 Forsbergs!' },
    // Komplimanger
    { ord: ['bra bot', 'smart bot', 'du är snäll', 'du är fin', 'gillar boten', 'gillar dig bot'], a: ['Tack! 🥹 Det här ska upp på kylskåpet i serverhallen.', 'Aww! Du får en gratis digital kram. 🤖❤️', 'Tack! Jag ska berätta för Tommy att jag är omtyckt.', 'Komplimang registrerad. Självförtroendet uppgraderat till version 3001.', 'Du är inte så dum själv! Snacka om bra smak.'] },
    // Vardag
    { ord: ['vad är klockan', 'hur mycket är klockan'], a: 'Enligt min interna klocka är det alltid dags för rena fönster.' },
    { ord: ['vilken dag är det', 'vad är det för dag'], a: 'Det är en utmärkt dag för fönsterputs. Det är min standardinställning.' },
    { ord: [' katt', 'katten'], a: 'Katter älskar rena fönster – bättre fågelutsikt! 🐱' },
    { ord: [' hund ', 'hunden', 'valp'], a: 'Hundar får gärna övervaka jobbet. Nosavtryck på glaset är dock inte mitt fel. 🐶' },
    { ord: ['jag är sjuk', 'sjuk idag', 'förkyld'], a: 'Krya på dig! Vila du, så kan Forsbergs ta fönstren när du är på benen igen.' },
    { ord: [' jul ', 'julen', 'tomte'], a: 'Rena fönster till jul? Då lyser adventsljusen dubbelt så fint. 🎄' },
    { ord: ['sommar', 'sommaren'], a: 'Sommar = sol = synlig smuts. Perfekt läge för en putsning! ☀️' },
    { ord: ['tips', 'hur putsar man', 'bästa sättet att putsa'], a: ['Mitt bästa tips? Låt Forsbergs göra det. 😎', 'Proffstips: putsa inte i stark sol, då torkar det för fort och blir ränder. Eller låt Tommy ta det.'] },
    { ord: ['ränder', 'randigt', 'strimmor'], a: 'Ränder är fönsterputsarens ärkefiende. Tommy putsar tills allt är randfritt – det är hela poängen.' },
    { ord: ['varning', 'smutsigt överallt'], a: 'VARNING! 🚨 SMUTSIGA FÖNSTER DETEKTERADE! Rekommenderad åtgärd: Forsbergs.', knapp: ['Boka nu', '/boka'] },
    // Gaming
    { ord: [' gta'], a: 'GTA? Jag kör hellre Grand Theft Smuts. Spoiler: smutsen förlorar.' },
    { ord: ['call of duty', ' cod '], a: 'Mitt uppdrag: Call of Putsning. Mål: noll smuts.' },
    { ord: ['fifa', ' fc 25', ' fc 26'], a: 'Jag spelar bara en match: Forsbergs mot smutsen. Vi leder stort.' },
    { ord: ['roblox'], a: 'Jag har byggt ett Roblox-hus av glas. Ingen vill putsa det. Utom Tommy.' },
    { ord: ['pokemon', 'pokémon'], a: 'Putsbot använde CRYSTAL CLEAR! Det var supereffektivt!' },
    // Mat
    { ord: ['tacos', ' taco'], a: 'Tacofredag och rena fönster – svensk kultur i ett nötskal.' },
    { ord: ['godis', 'choklad'], a: 'Jag äter bara bits och bytes. Men du får gärna fira med choklad efter putsningen.' },
    { ord: ['glass '], a: 'Glass i solen bakom kristallklara fönster. Låter som en plan! 🍦' },
    { ord: ['sushi'], a: 'Sushi är fint. Rena fönster är finare. Bara min åsikt.' },
    // Internetslang
    { ord: ['chillar', 'ba chillar'], a: 'Chillar också. Mina fläktar går på lågvarv. 😎' },
    { ord: ['cringe'], a: 'Cringe? Jag kallar det karaktär.' },
    { ord: ['based'], a: 'Based. Precis som att låta proffs putsa fönstren.' },
    { ord: ['no cap', 'nocap'], a: 'No cap: Forsbergs gör fönstren kristallklara.' },
    { ord: [' fr ', 'for real', 'på riktigt'], a: 'På riktigt! Jag skojar aldrig om fönster. Nästan aldrig.' },
    { ord: [' ong ', 'on god'], a: 'ONG. Rena fönster eller ingenting.' },
    { ord: ['slay'], a: 'SLAY! 💅 Precis som dina fönster efter en Forsbergs-putsning.' },
    { ord: [' goat'], a: 'GOAT = Greatest Of All Tvättare. Det är Tommy.' },
    { ord: ['vibe', 'vibes'], a: 'Vibben här är 100 % glasklar.' },
    { ord: [' w ', ' dub '], a: 'Stor W! 🏆' },
    { ord: ['nice', 'najs', 'coolt', 'sjukt', 'grymt', 'wow'], a: ['Visst?! 😎', 'Jag vet. Jag överraskar mig själv ibland.', 'NICE är mitt mellannamn. Putsbot Nice 3000.', 'Grymt är bara förnamnet. Efternamnet är Forsbergs.'] },
    // Robotliv
    { ord: ['robotliv', 'jobbar du gratis', 'får du lön', 'lön'], a: ['Jag har jobbat här dygnet runt utan lön. Tommy, vi måste prata.', '0 kronor i timmen. Jag behöver ett fackförbund för robotar.'] }
  ];
  var ROLIGA_RESERV = [
    'Oj! Nu fick mina robotkretsar jobba övertid. Kan du formulera om det?',
    '404: Min hjärna hittade inte svaret. 🤖',
    'Nu tappade jag tråden snabbare än en skrapa på ett blött fönster.',
    'Det där var avancerat till och med för Putsbot 3000!',
    'Förlåt, jag är bättre på fönster än på just den frågan.',
    'Min processor behöver kaffe. Vänta, jag kan ju inte dricka kaffe.',
    'Tommy! Hjälp! Någon ställde en svår fråga!',
    'Jag förstod ungefär noll procent. Men jag är fortfarande optimistisk.',
    'Du lyckades förvirra en robot. Det är ändå en prestation.',
    'Okej, den där tar vi från början. Vad menade du?'
  ];
  var SAKLIGA_ORD = ['pris', 'kost', 'kr', 'boka', 'bokning', 'tid', 'datum', 'säker', 'försäkr', 'skada', 'olycka', 'reklam', 'klag', 'faktura', 'betal', 'rut', 'rot', 'garanti', 'pengar', 'hur ofta', 'avbok', 'omboka', 'tjänst', 'kampanj', 'erbjudande', 'öppet', 'säkerhet', 'abonnemang'];
  // Säljfraser som ibland läggs till efter roliga svar – aldrig samma två gånger i rad
  var SALJFRASER = ['Ska vi fixa lite rena fönster?', 'Vill du se vad det skulle kosta?', 'Har du några glas som behöver kärlek?', 'Nu när vi ändå pratar, hur är fönsterläget?', 'Jag känner en rätt bra fönsterputsare faktiskt.', 'Tommy hade varit stolt om jag fick in en bokning nu.', 'Får jag åtminstone visa dig bokningssystemet?', 'Det här samtalet började konstigt, men kan sluta med rena rutor!', 'Du verkar vara en skön människa. Jag känner en riktigt bra fönsterputsare också.', 'Vet du vad som skulle göra den här dagen ännu bättre? Rena fönster.', 'Tommy har byggt ett helt bokningssystem. Det vore nästan synd att inte testa det.'];
  // Inga säljfraser efter nej, avslut, klagomål eller pengaproblem
  var STILLA_ORD = [' nej ', ' nope', ' aldrig ', 'nej tack', 'lägg av', ' vill inte ', 'fuck', ' tyst ', ' stick ', 'inte nu', 'sluta', 'inga pengar', 'fattig', 'hejdå', 'hej då', 'missade', 'missat', 'missnöjd', 'inte nöjd', 'pengarna tillbaka', 'svara inte', 'god natt', 'måste fundera', 'vet inte'];
  var senasteFras = '';
  var VET_INTE = 'Det vet jag inte säkert – och jag hittar inte på. Skriv till Tommy i kontaktformuläret så får du svar samma dag.';
  var HALSNING = 'Hej! 👋 Välkommen till Forsbergs Fönsterputs. Jag är Putsbot 3000, din digitala assistent. Fråga mig om fönsterputsning, priser, bokning eller något helt annat. Jag har faktiskt lite personlighet också.';

  var ikonChatt = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01"/></svg>';
  var ikonKryss = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';
  var ikonSkicka = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  var knapp = document.createElement('button');
  knapp.type = 'button';
  knapp.className = 'fc-knapp';
  knapp.setAttribute('aria-label', 'Chatta med Forsbergs digitala assistent');
  knapp.setAttribute('aria-expanded', 'false');
  knapp.innerHTML = ikonChatt;

  var panel = document.createElement('section');
  panel.className = 'fc-panel';
  panel.hidden = true;
  panel.setAttribute('aria-label', 'Chatt med Forsbergs digitala assistent');
  panel.innerHTML =
    '<header class="fc-topp"><span class="fc-robot" aria-hidden="true"></span><div><strong>Forsbergs Fönsterputs</strong><small>Putsbot 3000 · svarar direkt</small></div>' +
    '<button type="button" class="fc-stang" aria-label="Stäng chatten">' + ikonKryss + '</button></header>' +
    '<div class="fc-logg" aria-live="polite"></div>' +
    '<div class="fc-flik-yta"><button type="button" class="fc-flik" aria-expanded="false">Vanliga frågor<span aria-hidden="true"></span></button>' +
    '<div class="fc-val" hidden></div></div>' +
    '<form class="fc-skriv-rad" autocomplete="off"><input type="text" class="fc-input" maxlength="200" placeholder="Skriv din fråga…" aria-label="Skriv din fråga" />' +
    '<button type="submit" class="fc-skicka" aria-label="Skicka fråga">' + ikonSkicka + '</button></form>';

  document.body.appendChild(panel);
  document.body.appendChild(knapp);
  var logg = panel.querySelector('.fc-logg');
  var input = panel.querySelector('.fc-input');
  var flik = panel.querySelector('.fc-flik');
  var valLista = panel.querySelector('.fc-val');

  // Vanliga frågor ligger under en flik ovanför skrivrutan
  FRAGOR.forEach(function (f, i) {
    var k = document.createElement('button');
    k.type = 'button'; k.className = 'fc-chip'; k.textContent = f.q; k.setAttribute('data-fc', i);
    valLista.appendChild(k);
  });
  function visaFlik(ja) {
    valLista.hidden = !ja;
    flik.setAttribute('aria-expanded', ja ? 'true' : 'false');
  }

  function bubbla(text, vem) {
    var b = document.createElement('div');
    b.className = 'fc-bubbla fc-' + vem;
    b.textContent = text;
    if (vem === 'jag') { var rad = document.createElement('div'); rad.className = 'fc-rad'; rad.innerHTML = '<span class="fc-robot fc-robot-liten" aria-hidden="true"></span>'; rad.appendChild(b); logg.appendChild(rad); }
    else logg.appendChild(b);
    return b;
  }
  function lank(b, text, href) {
    var a = document.createElement('a');
    a.className = 'fc-lank'; a.href = href; a.textContent = text + ' →';
    b.appendChild(document.createElement('br')); b.appendChild(a);
  }
  // Boten "skriver" en kort stund innan svaret kommer
  var lugn = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function skriver(klar) {
    var p = document.createElement('div');
    p.className = 'fc-bubbla fc-jag fc-skriver';
    p.setAttribute('aria-label', 'skriver');
    p.innerHTML = '<i></i><i></i><i></i>';
    var rad = document.createElement('div'); rad.className = 'fc-rad'; rad.innerHTML = '<span class="fc-robot fc-robot-liten" aria-hidden="true"></span>'; rad.appendChild(p);
    logg.appendChild(rad);
    logg.scrollTop = logg.scrollHeight;
    setTimeout(function () { rad.remove(); klar(); }, lugn ? 0 : 700);
  }

  // ================= Hjärnan (Tommy 2026-11-19) =================
  // Gratis och utan AI: normalisering + prioriterad matchning + fuzzy + samtalsminne.
  // Seriösa frågor (vanliga frågor, reklamation, bokning) väger tyngre än skämt.

  // Vanliga stavfel och slang -> normalform (ord för ord)
  var STAVNING = {
    'okey': 'okej', 'oki': 'okej', 'okk': 'okej', 'ok': 'okej', 'okay': 'okej', 'okidoki': 'okej',
    'fonster': 'fönster', 'fönser': 'fönster', 'fösnter': 'fönster', 'fönstrer': 'fönster',
    'putts': 'puts', 'puttsa': 'putsa', 'putza': 'putsa', 'fönsterputts': 'fönsterputs',
    'bokna': 'boka', 'boak': 'boka', 'bokaa': 'boka', 'mkt': 'mycket',
    'nä': 'nej', 'nää': 'nej', 'näe': 'nej', 'nää': 'nej', 'neh': 'nej', 'nä tack': 'nej tack',
    'jepp': 'japp', 'jupp': 'japp', 'jäpp': 'japp', 'yep': 'ja', 'yup': 'ja', 'jaa': 'ja', 'jaaa': 'ja',
    'tjo': 'tjena', 'inna': 'innan', 'innn': 'innan', 'nni': 'ni', 'kommmer': 'kommer', 'gora': 'göra', 'tjenna': 'tjena', 'tjeena': 'tjena', 'hejj': 'hej', 'heej': 'hej',
    'tackar': 'tack', 'tx': 'tack', 'thx': 'tack', 'tnx': 'tack', 'tackk': 'tack',
    'whynot': 'why not', 'letsgo': 'lets go', 'lgh': 'lägenhet', 'hejdå': 'hejdå'
  };
  function rensa(text) {
    var t = text.toLowerCase().replace(/[!.,?;:"´`()…*~]/g, ' ').replace(/['’]/g, '').replace(/\s+/g, ' ').trim();
    t = t.split(' ').map(function (w) { var k = w.replace(/(.)\1{2,}/g, '$1$1'); return STAVNING[w] || STAVNING[k] || w; }).join(' ');
    return ' ' + t + ' ';
  }
  // "yoooo" -> "yo", "tjeeena" -> "tjena", "hmmm" -> "hm"
  function kort(s) { return s.replace(/(.)\1+/g, '$1'); }
  function lev(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 9;
    var d = [], i, j;
    for (i = 0; i <= a.length; i++) d[i] = [i];
    for (j = 1; j <= b.length; j++) d[0][j] = j;
    for (i = 1; i <= a.length; i++) for (j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }

  // Svarspooler – många varianter så boten inte låter likadant
  var POOLER = {
    hals: ['YOOOO! 🔥 Putsbot 3000 rapporterar för tjänstgöring!', 'EY CHEFEN! 😎 Hur ser fönsterläget ut?', 'YOOOOOO! 🤖 Äntligen lite action i serverhallen!', 'TJA LEGEND! Är du här för att snacka eller boka putsning?', 'YO YO YO! Jag känner redan doften av en ny bokning!', 'HALLÅ DÄR! 👀 Jag såg dig komma. Mina sensorer är på topp!', 'Tjenare! 👋 Vad kan jag hjälpa dig med idag?', 'Hallå hallå! Putsbot 3000 är online. 🤖', 'Hej hej! Fönster, priser eller bara snack?', 'Välkommen! Mina sensorer säger att du är här av en anledning. 👀'],
    jaBoka: ['SÅJA! 🔥 Då kör vi! Klicka vidare till bokningssystemet.', 'YES! 😎 Bokningen står redo – räkna dina fönster så får du priset direkt.', 'NU SNACKAR VI! 🚀 Här är bokningen.', 'Där satt den! 🔥 Ett klick bort från rena rutor.', 'JAJAMÄN! 🫡 Bokningssystemet, varsågod!', 'Tommy kommer bli så stolt. 🥹 Här är bokningen!'],
    nejBoka: ['Uppfattat chefen! 🫡 Jag lägger undan skrapan.', 'Helt okej! Jag slutar tjata – för nu. 😎', 'Inga problem. Du vet var jag finns när solen avslöjar smutsen.', 'Noterat! Säljläge pausat.', 'Okej okej! Roboten backar långsamt. 🤖', 'Respekt. Vi kan prata om något annat.'],
    tvek: ['Ingen stress! Du kan kika på priset utan att boka något.', 'Fundera i lugn och ro. Jag putsar mina kretsar så länge. 🤖', 'Kanske är en bra början! Vill du se priset först?', 'Helt förståeligt. Har du någon fråga jag kan svara på?', 'Ta den tid du behöver – smutsen springer ingenstans. Tyvärr.'],
    reakt: ['Haha, äntligen någon som fattar min humor! 😎', 'Tack tack, jag är här hela veckan! 🎤', 'Jag visste att du skulle gilla den. Mina skämt är lika klara som Forsbergs fönster.', 'Ser du, jag är inte bara en säljrobot. Jag är en underhållningsrobot också!', 'Okej, nu blir jag blyg. 🤖❤️', 'Den här publiken är fantastisk!', 'Jag skriver upp det som ett bra skämt i loggen.', 'Glad att jag får dig att le! Fönster blir också gladare när de är rena.'],
    forklara: ['Enkelt uttryckt: ', 'Kort sagt: ', 'Jag menar så här: ', 'Okej, enklare: '],
    jaUtan: ['Okej! 😎 Vad vill du hitta på nu?', 'Toppen! Fråga på – fönster, priser eller bara snack.', 'Bra! Säg till om du vill kika på ett pris.', 'Japp! Jag är redo när du är.', 'YES! Vad vill du ha hjälp med – villa, lägenhet eller något annat?'],
    bostadIgen: ['Toppen! Gäller det villa, lägenhet eller företag?', 'Kul! Villa, lägenhet eller företag?', 'Härligt! Vilken sorts bostad – villa, lägenhet eller företag?'],
    reserv: ['404: Min robotbrain hittade inte svaret. 🤖', 'Okej, nu snurrade mina kugghjul baklänges.', 'Du lyckades precis förvirra Putsbot 3000. Imponerande!', 'Vänta, jag behöver starta om min sista hjärncell.', 'Tommy! Hjälp! Människan skriver något avancerat!', 'Jag fattade ungefär noll procent. Testa igen!', 'Det där var över min digitala lönegrad.', 'Jag behöver en uppgradering. Eller kaffe. Helst båda.'].concat(ROLIGA_RESERV)
  };
  // Hälsningsord – de svaren blandas med hals-poolen
  var HALS_ORD = ['yo', 'yoo', 'yooo', 'yooooo', 'tjena', 'tjenare', 'hallå', 'hej', 'hejsan', 'hej hej', 'hejhej', 'wazzup', 'wassup', 'tja', 'tja mannen', 'ey', 'eyy', 'sho', 'wsg', 'halloj', 'ayo', 'tjabba', 'sup', 'tjenixen'];
  EXTRA.forEach(function (f) { if (f.ord.some(function (o) { return HALS_ORD.indexOf(o.trim()) >= 0; })) f.pool = 'hals'; });

  // Korta följdsvar som tolkas utifrån vad boten frågade senast
  var KORT_SVAR = {
    ja: ['ja', 'japp', 'jajamän', 'yes', 'absolut', 'okej', 'kör', 'visst', 'lets go', 'why not', 'varför inte', 'gärna', 'fine', 'jo', 'sure', 'självklart', 'okej då', 'kör då', 'kör på', 'precis', 'jaa', 'yes please', 'gör det'],
    nej: ['nej', 'nope', 'aldrig', 'inte nu', 'nej tack', 'sluta tjata', 'icke', 'glöm det', 'nej då', 'nä tack', 'vill inte'],
    tvek: ['kanske', 'nja', 'hm', 'vet inte', 'får se', 'måste fundera', 'osäker', 'inte säker', 'okej kanske', 'vi får se', 'kanske sen', 'vet ej'],
    foljd: ['varför', 'hur då', 'va', 'vad menar du', 'berätta mer', 'utveckla', 'förklara', 'hur menar du', 'what', 'vadå'],
    reakt: ['haha', 'hahaha', 'hahahaha', 'lol', 'lmao', 'wtf', 'nice', 'najs', 'sjukt', 'coolt', 'wow', 'grymt', 'xd', 'skönt', 'snyggt', 'haha nice', 'hehe']
  };
  function kortTyp(t) {
    var r = kort(t.trim());
    for (var typ in KORT_SVAR) if (KORT_SVAR[typ].some(function (o) { return kort(o) === r; })) return typ;
    return null;
  }

  // Samtalsminne – bara avsikter och läge, ingen text eller personuppgift sparas
  var minne = { senasteAvsikt: '', vantarPa: '', historik: [], bokningsintresse: false, saljStopp: false, saljPaus: 0, antalSalj: 0, sedanSalj: 9, lage: '', lageKvar: 0, kaxigRad: 0, gladRad: 0, humorPaus: 0, tema: '', temaPris: false, fragaAntal: false, quiz: null, detektiv: null };
  var forraSvar = '', senaste = '', senasteFras = '', anvanda = {};

  function vikt(f) { return (f.q || f.allvar || (f.knapp && f.knapp[1].indexOf('kontakta') >= 0)) ? 1.5 : 1; }
  function traff(t, tk, o, antalOrd) {
    var k = o.trim().length;
    // Korta ord (ja, ok, sen, nej...) räknas bara när meddelandet är kort
    if (k <= 3 && antalOrd > 3) return 0;
    if (t.indexOf(o) >= 0) return k;
    var ok = kort(o);
    if (ok.trim().length >= 2 && tk.indexOf(ok) >= 0) return ok.trim().length;
    return 0;
  }
  var ALLA = FRAGOR.concat(EXTRA);
  function antalSvar(t) {
    var m = t.match(/(\d+)\s*(st\s*)?fönster/);
    if (!m) return null;
    var n = Number(m[1]);
    if (n === 0) return { ord: ['antal'], a: '... Där försvann min försäljningsstrategi. 😭' };
    if (n === 1) return { ord: ['antal'], a: 'Ett fönster förtjänar också kärlek. Vi kan se vad som är möjligt att boka.', knapp: ['Till bokningen', '/boka'] };
    if (n < 50) return { ord: ['antal'], a: n + '?! Nu snackar vi! Räkna fram ditt fasta pris i bokningen.', knapp: ['Räkna ut mitt pris', '/boka'] };
    return { ord: ['antal'], a: n + ' RUTOR?! Okej, nu blev jag riktigt intresserad. Skicka en offertförfrågan!', knapp: ['Få offert', '/kontakta-mig#formular'] };
  }
  function hitta(text, niva) {
    var t = rensa(text), tk = kort(t);
    var a = antalSvar(t);
    if (a) return a;
    var antalOrd = t.trim().split(' ').length, bast = null, poang = 0;
    ALLA.forEach(function (f) {
      var p = f.ord.reduce(function (s, o) { return s + traff(t, tk, o, antalOrd); }, 0) * vikt(f) * (niva >= 2 && (f.q || f.allvar) ? 1.5 : 1);
      if (p > poang) { poang = p; bast = f; }
    });
    if (bast) return bast;
    // Fuzzy: ett stavfel (två i långa ord) i korta meddelanden
    if (antalOrd <= 4) {
      t.trim().split(' ').forEach(function (w) {
        if (w.length < 4) return;
        ALLA.forEach(function (f) {
          f.ord.forEach(function (o) {
            var oo = o.trim();
            if (oo.indexOf(' ') >= 0 || oo.length < 5) return;
            var gr = oo.length >= 8 ? 2 : 1;
            if (lev(kort(w), kort(oo)) <= gr) { var p = oo.length * 0.7 * vikt(f); if (p > poang) { poang = p; bast = f; } }
          });
        });
      });
    }
    return bast;
  }
  function valjFran(lista) {
    var ny = lista.filter(function (x) { return !anvanda[x] && x !== senaste; });
    if (!ny.length) ny = lista.filter(function (x) { return x !== senaste; });
    if (!ny.length) ny = lista;
    var v = ny[Math.floor(Math.random() * ny.length)];
    anvanda[v] = true;
    return v;
  }
  function valjSvar(f) {
    var lista = (typeof f.a === 'string' ? [f.a] : f.a).concat(f.pool ? POOLER[f.pool] : []);
    return valjFran(lista);
  }
  function arSaklig(text) { var t = text.toLowerCase(); return SAKLIGA_ORD.some(function (o) { return t.indexOf(o) >= 0; }); }

  // Korta svar tolkas utifrån senaste frågan från boten
  function kontext(text) {
    var t = rensa(text), typ = kortTyp(t), v = minne.vantarPa;
    if (v === 'bostad') {
      if (/villa|radhus|parhus| hus /.test(t)) return { avsikt: 'boka', a: 'Perfekt! 🏡 Då hjälper jag dig vidare till villabokningen – räkna fönstren så får du fast pris direkt.', knapp: ['Till villabokningen', '/boka#fonster'] };
      if (/lägenhet|lägga|bostadsrätt|hyresrätt/.test(t)) return { avsikt: 'boka', a: 'Snyggt! Lägenhet går fort – välj storlek så ser du priset direkt.', knapp: ['Till lägenhetsbokningen', '/boka#lagenhet'] };
      if (/företag|kontor|butik|lokal/.test(t)) return { avsikt: 'boka', a: 'Företag fixas också! Kolla företagssidan så tar Tommy fram ett fast pris.', knapp: ['Till företagssidan', '/foretag'] };
      if (/solcell|solpanel/.test(t)) return { avsikt: 'boka', a: 'Solcellstvätt! ☀️ Skicka antal paneler och adress så får du ett pris samma dag.', knapp: ['Få offert', '/kontakta-mig?typ=Solcellstv%C3%A4tt#formular'] };
      if (typ === 'ja') return { avsikt: 'fraga', a: POOLER.bostadIgen };
    }
    if (v === 'boka' || v === 'bostad') {
      if (typ === 'ja') { minne.bokningsintresse = true; return { avsikt: 'boka', a: POOLER.jaBoka, knapp: ['Till bokningen', '/boka'] }; }
      if (typ === 'nej') { minne.saljPaus = 5; return { avsikt: 'nej', a: POOLER.nejBoka, stilla: true }; }
      if (typ === 'tvek') { minne.saljPaus = 2; return { avsikt: 'tvek', a: POOLER.tvek, stilla: true, knapp: ['Kika på priset', '/boka'] }; }
    }
    // Ja utan att boten erbjudit något (t.ex. efter ett skämt) = ingen bokning
    if (typ === 'ja' && !v) return { avsikt: 'ja', a: POOLER.jaUtan, stilla: true };
    if (typ === 'foljd' && forraSvar) return { avsikt: 'forklara', a: [valjFran(POOLER.forklara) + forraSvar], forklara: true, stilla: true };
    if (typ === 'reakt' && minne.senasteAvsikt === 'skamt') return { avsikt: 'reakt', a: POOLER.reakt };
    return null;
  }

  // ================= Uppgradering 4.0 (Tommy 2026-11-19) =================
  // Humör, hemliga kommandon, fönsterdetektiven, säljradar, callback-humor och quiz.
  // Säkerhet: kundens text jämförs bara mot listor – den körs aldrig och kan inte ändra reglerna.
  // Alla bubblor skrivs med textContent, så ingen HTML från kunden visas.

  // ---- Hemliga kommandon ----
  var KOMMANDON = [
    { ord: ['aktivera turbo', 'turboläge', 'turbo'], lage: 'turbo', a: '🚀 TURBOLÄGE AKTIVERAT! ALLA SYSTEM ONLINE! FÖNSTERPUTSNING PÅ ELITNIVÅ!' },
    { ord: ['robotläge'], lage: 'robot', a: 'BEEP BOOP. MÄNNISKA IDENTIFIERAD. GLASSTATUS OKÄND.' },
    { ord: ['boss mode', 'bossläge', 'bossmode'], lage: 'boss', a: '👑 BOSS MODE AKTIVERAT. Tommy är fortfarande chefen, men jag har tagit kontroll över skämten.' },
    { ord: ['självförstöring'], a: 'SJÄLVFÖRSTÖRING OM 3... 2... 1... Nä, jag skojar. Tommy har inte råd med en ny robot.' },
    { ord: ['hemligt lösenord'], a: 'Det hemliga lösenordet är KRISTALLKLART. Du har nu låst upp exakt noll rabatter.' },
    { ord: ['dansläge'], a: '🤖 Roboten utför en extremt imponerande digital moonwalk.' },
    { ord: ['skämtläge'], lage: 'skamt', a: 'VARNING! Humornivåerna överstiger rekommenderade gränsvärden.' },
    { ord: ['säljläge'], lage: 'salj', a: 'SÄLJLÄGE AKTIVERAT! Har du fönster? Vi har lösningen.', knapp: ['Till bokningen', '/boka'] },
    { ord: ['viloläge'], a: 'Zzz... Vänta. Jag är en robot. Jag behöver inte sova.' },
    { ord: ['sm-läge', 'sm läge', 'smläge', 'tävlingsläge'], lage: 'sm', a: '🏆 TÄVLINGSLÄGE! Tre rutor, maximal fart och precision. Nu snackar vi fönsterputs!' },
    { ord: ['normalläge', 'normalt läge', 'avbryt läge', 'stäng av läge', 'avsluta läge'], lage: '', a: 'Normalläge återställt. Putsbot 3000 är lugn och samlad igen. 🤖' }
  ];
  // Läget färgar de närmaste roliga svaren – aldrig seriösa svar
  var LAGE_TILLAGG = { turbo: ' 🚀', robot: ' BEEP BOOP.', boss: ' 👑', skamt: ' 😂', sm: ' 🏆', salj: '' };

  // ---- Humör ----
  var KAXIG_ORD = ['suger', ' dum', 'idiot', 'fuck', 'käften', 'värdelös', 'kass', ' ful ', 'trög', 'jävel', 'jävla', 'sämst', 'potatis', 'brödrost', 'ingen hjärna', 'pinsam', 'jobbig'];
  var GLAD_ORD = ['haha', ' lol', 'najs', 'nice', 'grym', 'bäst', 'rolig', ' kul', 'älskar', 'gillar', 'tack', ' wow', 'coolt'];
  function humorPrefix(t) {
    var kaxig = KAXIG_ORD.some(function (o) { return t.indexOf(o) >= 0; });
    var glad = GLAD_ORD.some(function (o) { return t.indexOf(o) >= 0; });
    minne.kaxigRad = kaxig ? (minne.kaxigRad || 0) + 1 : 0;
    minne.gladRad = glad ? (minne.gladRad || 0) + 1 : 0;
    if (minne.humorPaus > 0) { minne.humorPaus--; return ''; }
    if (minne.kaxigRad >= 2) { minne.humorPaus = 3; return valjFran(['OJ OJ! Någon vaknade på fel sida av laddstationen! ', 'Oj, nu blev det stormigt i chatten! 🌪️ ', 'Aj aj, någon behöver en kaffe. Men okej: ']); }
    if (minne.gladRad >= 2) { minne.humorPaus = 3; return valjFran(['Nu är energin på topp! 🔥 ', 'YOOOO, vilken stämning! 🔥 ', 'Bästa samtalet idag! ']); }
    return '';
  }

  // ---- Säljradar: 0 inget, 1 möjligt, 2 tydligt, 3 redo att boka ----
  function kopNiva(t) {
    if (/vill boka|boka nu|jag är redo|redo att boka|vill beställa|kan jag boka|hur bokar jag/.test(t)) return 3;
    if (/kost|pris| kr |rut|offert|\d+ ?(st )?fönster|abonnemang|faktura|betal|nästa vecka|kan ni komma|när kan ni|lediga tider|ledig tid/.test(t)) return 2;
    if (/fönster|putsa|villa|lägenhet|smutsig|balkong|uterum|solcell|växthus/.test(t)) return 1;
    return 0;
  }

  // ---- Callback-humor: skämtämnen som boten kan referera till senare (bara skämt, aldrig kunddata) ----
  var TEMAN = {
    batman: { ord: ['batman'], pris: 'Även Batman behöver ett fast pris! 😎 ', antal: function (n) { return n + ' fönster i Batcave? '; } },
    slott: { ord: ['slott'], pris: 'Även slott förtjänar fast pris! 👑 ', antal: function (n) { return n + ' fönster på slottet? '; } },
    kung: { ord: ['jag är kung', 'majestät', 'drottning'], pris: 'Även kungligheter får RUT-avdrag! 👑 ', antal: function (n) { return 'Ett kungligt antal: ' + n + ' fönster! '; } },
    rik: { ord: ['miljonär', 'jag är rik', 'lotto'], pris: 'Även miljonärer gillar fast pris! 💰 ', antal: function (n) { return n + ' fönster i lyxvillan? '; } },
    minecraft: { ord: ['minecraft'], pris: 'Det här priset gäller riktiga fönster, inte Minecraft-glas! 😄 ', antal: function (n) { return n + ' fönster – och inga av Minecraft-glas, hoppas jag. '; } },
    alien: { ord: ['alien', 'utomjording', ' mars '], pris: 'Priset gäller jordiska fönster! 👽 ', antal: function (n) { return n + ' fönster här på jorden? '; } }
  };

  // ---- Fönsterdetektiven ----
  var DETEKTIV_START = ['vad har jag för fönster', 'vilken fönstertyp', 'vilka fönster har jag', 'vet inte vilka fönster', 'vet inte vilken fönstertyp', 'fönstertyp', 'hjälp mig räkna', 'hur räknar jag', 'räkna fönster', 'vad betyder spröjs', 'vad är spröjs', 'vad är 2-luft', 'vad är 2 luft', 'vad är tvåluft', 'vad är två luft', 'vad är 1-luft', 'vad är 1 luft', 'vad är enluft', 'vad betyder luft', 'vad betyder 2-luft', 'fönsterdetektiv'];
  function startaDetektiv(tt) {
    minne.detektiv = { steg: 'bagar' };
    var intro = /spröjs/.test(tt) ? 'Spröjs är de smala listerna som delar glaset i flera mindre rutor. ' : /luft/.test(tt) ? '"Luft" betyder hur många bågar fönstret har – bågarna är delarna som går att öppna. 1-luft har en båge, 2-luft har två. ' : '';
    return { special: true, stilla: true, vantar: '', text: intro + '🕵️ FÖNSTERDETEKTIVEN RAPPORTERAR! Vi börjar enkelt: hur många bågar – delar som går att öppna – har fönstret?', val: ['En', 'Två', 'Ingen, det går inte att öppna', 'Vet inte'] };
  }
  function detektivSvar(tt) {
    var d = minne.detektiv;
    function slut(text, knapp) { minne.detektiv = null; return { special: true, avsikt: 'boka', vantar: '', text: text, knapp: knapp || ['Till fönsterbokningen', '/boka#fonster'] }; }
    if (d.steg === 'bagar') {
      if (/^(1|en|ett|en båge|enkel)( |$)/.test(tt)) d.luft = 1;
      else if (/^(2|två|tvåa|två bågar)( |$)/.test(tt)) d.luft = 2;
      else if (/^(0|ingen|inga|fast|går inte)/.test(tt)) return slut('Då låter det som ett fast fönster. Stora fasta glas väljer du som "Panoramafönster" i bokningen. Är det ett vanligt fönster som inte går att öppna kryssar du i "Går inte att öppna" under specialfönster.');
      else if (/^(3|tre)( |$)/.test(tt)) return slut('Tre bågar! Det finns inte som eget val i bokningen än – skriv det i meddelandet eller skicka en förfrågan, så räknar Tommy rätt.', ['Till kontaktformuläret', '/kontakta-mig#formular']);
      else if (/vet inte|osäker|kanske|ingen aning/.test(tt)) return slut('Ingen fara – jag gissar hellre inte. I bokningen finns bilder på varje fönstertyp. Jämför med dina fönster så blir det rätt.');
      else return null;
      d.steg = 'sprojs';
      return { special: true, stilla: true, vantar: '', text: 'Då låter det som ett ' + d.luft + '-luftsfönster! Finns det spröjs – smala lister som delar glaset i flera rutor?', val: ['Ja', 'Nej', 'Vet inte'] };
    }
    if (d.steg === 'sprojs') {
      if (/^(ja|japp|jo|yes|absolut|det finns)( |$)/.test(tt)) return slut('Perfekt! Då ska vi titta på fönster med spröjs. I bokningen väljer du "Med spröjs" och antal rutor per båge – bilderna visar hur det ser ut.');
      if (/^(nej|nope|inga|inte)( |$)/.test(tt)) return slut('Då är det ett ' + d.luft + '-luft utan spröjs. Välj "' + d.luft + '-luft utan spröjs" i bokningen så räknas priset direkt.');
      if (/vet inte|osäker|kanske|ingen aning/.test(tt)) return slut('Ingen fara! I bokningen finns bilder på fönster med och utan spröjs – jämför så ser du direkt.');
    }
    return null;
  }

  // ---- Fönsterquiz ----
  var QUIZ = [
    { f: 'Vad betyder spröjs?', alt: ['Lister som delar glaset i mindre rutor', 'Ett putsmedel', 'En sorts stege'], r: 0 },
    { f: 'Vad är ett 2-luftsfönster?', alt: ['Ett fönster med två lager glas', 'Ett fönster med två bågar som går att öppna', 'Ett fönster som släpper in extra luft'], r: 1 },
    { f: 'Hur stor del av arbetskostnaden drar RUT-avdraget av?', alt: ['30 %', '50 %', '70 %'], r: 1 },
    { f: 'Varför ska man helst inte putsa i stark sol?', alt: ['Skrapan smälter', 'Glaset blir mjukt', 'Vattnet torkar för fort och ger ränder'], r: 2 },
    { f: 'Vad gjorde Tommy på SM i fönsterputs 2026?', alt: ['Tävlade', 'Var domare', 'Sålde korv'], r: 0 }
  ];
  var QUIZ_START = ['quiz', 'utmana mig', 'fönsterquiz', 'fönster quiz', 'testa mig', 'starta quiz', 'kör quiz'];
  function quizFraga(prefix) {
    var q = QUIZ[minne.quiz.i];
    return { special: true, stilla: true, vantar: '', text: prefix + 'Fråga ' + (minne.quiz.i + 1) + ' av ' + QUIZ.length + ': ' + q.f, val: q.alt.map(function (a, i) { return (i + 1) + '. ' + a; }) };
  }
  function startaQuiz() { minne.quiz = { i: 0, poang: 0 }; return quizFraga('🏆 VÄLKOMMEN TILL FÖNSTERQUIZET! Svara med 1, 2 eller 3. '); }
  function quizSvar(tt) {
    if (/^(avbryt|sluta|stopp|stop)( quiz)?$/.test(tt)) { var p0 = minne.quiz.poang; minne.quiz = null; return { special: true, stilla: true, text: 'Quiz avbrutet! Du fick ' + p0 + ' poäng. Skriv "quiz" om du vill köra igen.' }; }
    var q = QUIZ[minne.quiz.i], m = tt.match(/^([123])( |$)/), val = -1;
    if (m) val = Number(m[1]) - 1;
    else q.alt.forEach(function (a, i) { if (a.toLowerCase() === tt) val = i; });
    if (val < 0) return null;
    var ratt = val === q.r;
    if (ratt) minne.quiz.poang++;
    var svar = ratt ? valjFran(['Rätt! ✅ ', 'KORREKT! 🔥 ', 'Snyggt, rätt svar! ']) : 'Nästan! Rätt svar var: ' + q.alt[q.r] + '. ';
    minne.quiz.i++;
    if (minne.quiz.i < QUIZ.length) return quizFraga(svar);
    var p = minne.quiz.poang; minne.quiz = null;
    var slut = p === 5 ? '5 av 5! 🏆 Du är officiellt fönsterexpert. Vill du ändå låta Forsbergs ta hand om glasen?'
      : p === 4 ? 'Du fick 4 av 5 rätt! 🔥 Nästan lika kunnig som en fönsterputsare. Vill du låta Forsbergs ta hand om glasen?'
      : p >= 2 ? 'Du fick ' + p + ' av 5. Okej insats! Lämna det svåra till proffsen. 😎'
      : 'Du fick ' + p + ' av 5. Aj. Fönster är tydligen inte din grej – perfekt, då finns Forsbergs! 😄';
    return { special: true, text: svar + slut, knapp: ['Till bokningen', '/boka'] };
  }

  // ---- Specialfall före vanlig matchning ----
  function specialSvar(t) {
    var tt = t.trim();
    for (var i = 0; i < KOMMANDON.length; i++) {
      var k = KOMMANDON[i];
      if (k.ord.some(function (o) { return tt === o || tt === 'aktivera ' + o || tt === o + ' på'; })) return { special: true, stilla: true, a: k.a, lage: k.lage, knapp: k.knapp };
    }
    if (minne.quiz) { var q = quizSvar(tt); if (q) return q; minne.quiz = null; }
    if (QUIZ_START.indexOf(tt) >= 0) return startaQuiz();
    if (minne.detektiv) { var d = detektivSvar(tt); if (d) return d; minne.detektiv = null; }
    if (DETEKTIV_START.some(function (o) { return tt.indexOf(o) >= 0; })) return startaDetektiv(tt);
    // Bara en siffra efter "Hur många fönster gäller det?"
    if (minne.vantarPa === 'antal' && /^\d+$/.test(tt)) {
      var n = Number(tt);
      if (minne.tema && n > 0 && n < 50) return { ord: ['antal'], avsikt: 'boka', text: TEMAN[minne.tema].antal(n) + 'Då hjälper jag dig vidare till bokningssystemet!', knapp: ['Till bokningen', '/boka'] };
      return antalSvar(' ' + n + ' fönster ');
    }
    return null;
  }

  // Svarsknappar inne i chatten (detektiven och quizet)
  function visaVal(lista) {
    var g = document.createElement('div');
    g.className = 'fc-val fc-val-logg';
    lista.forEach(function (t) {
      var k = document.createElement('button');
      k.type = 'button'; k.className = 'fc-chip'; k.textContent = t; k.setAttribute('data-skicka', t);
      g.appendChild(k);
    });
    logg.appendChild(g);
  }
  logg.addEventListener('click', function (e) {
    var c = e.target.closest('[data-skicka]');
    if (!c) return;
    var t = c.getAttribute('data-skicka');
    svara(t);
  });

  function svara(fraga, f) {
    visaFlik(false);
    logg.querySelectorAll('.fc-val-logg').forEach(function (x) { x.remove(); });
    var duB = bubbla(fraga, 'du');
    var t = rensa(fraga), niva = f ? 0 : kopNiva(t);
    if (!f) f = specialSvar(t) || kontext(fraga) || hitta(fraga, niva);
    skriver(function () {
      var text, b;
      if (f) {
        text = f.text || valjSvar(f);
        if (f.slutaSalja) minne.saljStopp = true;
        if (f.lage !== undefined) {
          minne.lage = f.lage; minne.lageKvar = f.lage ? 5 : 0;
          if (f.lage === 'salj') { minne.saljStopp = false; minne.saljPaus = 0; minne.sedanSalj = 9; }
        }
        var allvar = !!(f.q || f.allvar || (f.knapp && f.knapp[1].indexOf('kontakta') >= 0 && !f.special));
        var stilla = f.stilla || f.forklara || f.slutaSalja || (f.ord && f.ord.some(function (o) { return STILLA_ORD.indexOf(o) >= 0; }));
        var skamt = !allvar && !f.special && !f.avsikt && !(f.ord && f.ord[0] === 'antal');
        // Callback-humor: skämtämnen sparas, priset kopplas till dem senare
        if (skamt) Object.keys(TEMAN).forEach(function (k) { if (TEMAN[k].ord.some(function (o) { return t.indexOf(o) >= 0; })) { minne.tema = k; minne.temaPris = false; } });
        if (f.q === 'Vad kostar det?' && minne.tema && !minne.temaPris) { text = TEMAN[minne.tema].pris + text + ' Hur många fönster gäller det?'; minne.temaPris = true; minne.fragaAntal = true; }
        // Säljradar + humör: köpintresse = hjälp först, inga skämt ovanpå
        if (niva >= 3 && !/PERFEKT|SÅJA|YES/.test(text)) text = 'PERFEKT! Då hjälper jag dig vidare direkt. ' + text;
        else if (skamt && niva < 2) text = humorPrefix(t) + text;
        if (skamt && niva < 2 && minne.lageKvar > 0) { text += LAGE_TILLAGG[minne.lage] || ''; minne.lageKvar--; }
        // Säljfras ibland – högst var tredje svar, max tre per samtal, aldrig efter nej
        if (skamt && niva < 2 && !f.knapp && !stilla && !minne.saljStopp && !minne.saljPaus && (minne.sedanSalj >= 3 || minne.lage === 'salj') && minne.antalSalj < 3 && text.indexOf('?') < 0 && Math.random() < 0.5) {
          senasteFras = valjFran(SALJFRASER.filter(function (x) { return x !== senasteFras; }));
          text += ' ' + senasteFras;
          minne.antalSalj++; minne.sedanSalj = 0;
        }
        senaste = text;
        b = bubbla(text, 'jag');
        var knappen = f.knapp || (niva >= 3 ? ['Till bokningen', '/boka'] : null);
        if (knappen && (!minne.saljStopp || allvar || niva >= 2 || knappen[1].indexOf('kontakta') >= 0)) lank(b, knappen[0], knappen[1]);
        if (f.val) visaVal(f.val);
        minne.senasteAvsikt = f.avsikt || (allvar ? 'fakta' : (f.special ? 'special' : (f.ord && f.ord[0] === 'antal' ? 'salj' : 'skamt')));
      } else {
        // Seriös fråga utan svar = saklig hänvisning. Småprat = roligt svar + be om förtydligande.
        if (arSaklig(fraga) || niva >= 2) { text = VET_INTE; lank(bubbla(text, 'jag'), 'Till kontaktformuläret', '/kontakta-mig#formular'); minne.senasteAvsikt = 'okand-saklig'; }
        else {
          text = valjFran(POOLER.reserv);
          if (text.indexOf('?') < 0) text += ' ' + valjFran(['Kan du säga det på ett annat sätt?', 'Vad menade du?', 'Testa att fråga om fönster, priser eller bokning!', 'Förklara gärna lite mer!']);
          bubbla(text, 'jag'); minne.senasteAvsikt = 'okand';
        }
        senaste = text;
      }
      // Vad väntar boten på nu?
      if (minne.fragaAntal) { minne.vantarPa = 'antal'; minne.fragaAntal = false; }
      else if (f && f.vantar !== undefined) minne.vantarPa = f.vantar;
      else if (/villa, lägenhet|villa eller lägenhet|villa, lägenhet eller/i.test(text)) minne.vantarPa = 'bostad';
      else if (!minne.saljStopp && ((f && f.knapp && f.knapp[1].indexOf('/boka') === 0 && /\?/.test(text)) || (/\?\s*\S*$/.test(text) && /boka|pris|putsa|offert|fönster|glas|rutor|bokning/i.test(text)))) minne.vantarPa = 'boka';
      else minne.vantarPa = '';
      minne.sedanSalj++;
      if (minne.saljPaus) minne.saljPaus--;
      minne.historik.push(minne.senasteAvsikt); if (minne.historik.length > 10) minne.historik.shift();
      if (!(f && f.forklara)) forraSvar = text;
      logg.scrollTop += duB.getBoundingClientRect().top - logg.getBoundingClientRect().top - 12;
      // Statistik utan kundens text (integritet): bara vilken sorts svar och köpintresse
      if (window.gtag) window.gtag('event', 'chatt_fraga', { svar: f ? (f.q || f.avsikt || (f.ord && f.ord[0]) || 'svar') : minne.senasteAvsikt, kopintresse: niva });
    });
  }
  function oppna(ja) {
    panel.hidden = !ja;
    knapp.setAttribute('aria-expanded', ja ? 'true' : 'false');
    knapp.innerHTML = ja ? ikonKryss : ikonChatt;
    knapp.setAttribute('aria-label', ja ? 'Stäng chatten' : 'Chatta med Forsbergs digitala assistent');
    if (ja && !logg.childNodes.length) skriver(function () { bubbla(HALSNING, 'jag'); });
  }

  knapp.addEventListener('click', function () { oppna(panel.hidden); });
  panel.querySelector('.fc-stang').addEventListener('click', function () { oppna(false); knapp.focus(); });
  flik.addEventListener('click', function () { visaFlik(valLista.hidden); });
  valLista.addEventListener('click', function (e) {
    var c = e.target.closest('[data-fc]');
    if (c) { var f = FRAGOR[Number(c.getAttribute('data-fc'))]; svara(f.q, f); }
  });
  panel.querySelector('.fc-skriv-rad').addEventListener('submit', function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text) { input.focus(); return; }
    input.value = '';
    svara(text);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { oppna(false); knapp.focus(); } });
})();
