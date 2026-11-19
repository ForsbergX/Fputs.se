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
    { ord: ['vad heter du', 'ditt namn', 'heter du'], a: ['Jag är Forsbergs kundservice – en digital hjälpreda. Jönköpings mest överentusiastiska fönsterputsassistent!', 'Kundservice! Forsbergs digitala hjälpreda och smutsens värsta mardröm.'] },
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
    { ord: ['för dyr', 'dyrt', 'dyra'], a: ['Jag förstår. För privatpersoner sänker RUT-avdraget arbetskostnaden med 50 % om villkoren är uppfyllda – och priset är fast, utan dolda avgifter.', 'Jag förstår. Här satsas det på kvalitet och fast pris utan dolda avgifter. Kolla gärna exakt pris i bokningen.'], knapp: ['Räkna ut mitt pris', '/boka'] },
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
    { ord: ['jag vill boka', 'vill boka', 'vill beställa'], a: 'YES! 🔥 Då kör vi! Gäller det villa, lägenhet eller företag?', val: ['Villa', 'Lägenhet', 'Företag', 'Solcellstvätt'] },
    { ord: ['få offert', 'ha en offert', 'offertförfrågan', 'vill ha offert'], a: 'Snyggt! Skicka en offertförfrågan så återkommer Tommy med pris.', knapp: ['Få offert', '/kontakta-mig#formular'] },
    { ord: ['behöver hjälp', ' hjälp '], a: 'Då har du kommit rätt! Vad gäller det?' },
    { ord: ['rena fönster', 'vill ha rena'], a: 'Då har vi exakt samma mål! Ska vi boka?', knapp: ['Boka nu', '/boka'] },
    { ord: ['jag är redo', ' redo '], a: 'DÅ KÖR VI! 🔥 Mot kristallklara fönster!', knapp: ['Boka nu', '/boka'] },
    { ord: ['jag har inga pengar'], a: 'Då prioriterar vi viktigare saker. Jag finns här när läget passar bättre.' },
    // Följdfrågor: förklara förra svaret
    { forklara: true, ord: [' va ', 'hur då', 'vad menar du', 'förstår inte', 'fattar inte', ' varför '], a: 'Jag menar att jag gärna hjälper dig med fönsterputs. Fråga på!' },
    // ---- Putsbot 3000 del 3 (Tommy 2026-11-19) ----
    // Yo, tjena och slang
    { ord: ['yooooo'], a: 'YOOOOOOOO! 🚀 Kundservice rapporterar för tjänstgöring! Vad har vi för fönsterläge, chefen?' },
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
    { ord: ['jag är batman'], a: 'Perfekt. Du tar brottslingarna, vi tar smutsen. Hur många fönster har Batcave?', fragaAntal: true },
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
    { ord: ['pokemon', 'pokémon'], a: 'Kundservice använde CRYSTAL CLEAR! Det var supereffektivt!' },
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
    { ord: ['nice', 'najs', 'coolt', 'sjukt', 'grymt', 'wow'], a: ['Visst?! 😎', 'Jag vet. Jag överraskar mig själv ibland.', 'NICE är mitt mellannamn. Kundservice Nice.', 'Grymt är bara förnamnet. Efternamnet är Forsbergs.'] },
    // Robotliv
    { ord: ['robotliv', 'jobbar du gratis', 'får du lön', 'lön'], a: ['Jag har jobbat här dygnet runt utan lön. Tommy, vi måste prata.', '0 kronor i timmen. Jag behöver ett fackförbund för robotar.'] },
    // ---- Rådgivaren (Tommy 2026-11-19): hjälp först, sälj som en duktig rådgivare ----
    { allvar: true, ord: ['vet inte hur många fönster', 'hur många fönster har jag', 'hur räknar man fönster', 'räkna mina fönster'], a: 'Ingen fara! 🤖 Vi tar det tillsammans. Börja med att räkna fönstren rum för rum – varje fönster med en eller flera bågar räknas som ett fönster.', val: ['Vad är en båge?', 'Hjälp mig räkna fönster', 'Se pris'] },
    { allvar: true, ord: ['vad är en båge', 'vad betyder båge', 'vad menas med båge', 'båge'], a: 'Bågen är ramen som håller själva glaset och går att öppna. Har du två öppningsbara delar bredvid varandra är det normalt ett 2-luftsfönster. Vill du att jag hjälper dig räkna?', val: ['Hjälp mig räkna fönster', 'Se pris'] },
    { allvar: true, ord: ['skillnad på in och ut', 'invändig och utvändig', 'in- och utvändig', 'bara utsidan', 'bara utvändigt', 'bara insidan'], a: 'Utvändigt = utsidan av fönstret. Invändigt = insidan, och mellan glasen om fönstret har två lager. Hos Forsbergs ingår alla sidor om inget annat sägs.', val: ['Se pris', 'Begär offert'] },
    { allvar: true, ord: ['hur fungerar rut', 'hur funkar rut', 'vad är rut', 'rut-avdraget'], a: 'RUT betyder att du betalar halva arbetskostnaden om villkoren är uppfyllda. Priserna i bokningen är redan efter RUT, och Tommy sköter allt med Skatteverket.', knapp: ['Räkna ut mitt pris', '/boka'] },
    { allvar: true, ord: ['hur fungerar bokningen', 'hur funkar bokningen', 'hur fungerar bokningssystemet', 'hur bokar man'], a: 'Enkelt: välj typ av bostad, räkna dina fönster med bilderna, välj en tid och fyll i dina uppgifter. Priset syns hela vägen, och du ser allt innan du bokar.', knapp: ['Till bokningen', '/boka'] },
    { allvar: true, ord: ['vilken tjänst', 'vad passar mig', 'vad ska jag välja', 'vet inte vad jag ska boka'], a: 'Vi hittar rätt! Vad gäller det?', val: ['Villa', 'Lägenhet', 'Företag', 'Solcellstvätt'], vantar: 'bostad' },
    { allvar: true, ord: ['när behöver jag offert', 'behöver jag offert', 'personlig offert', 'komplicerat', 'stort uppdrag', 'speciellt uppdrag'], a: 'Villor och lägenheter räknar du direkt i bokningen. Företag, solceller och ovanliga eller väldigt stora jobb tar Tommy hellre via en personlig offert – då blir priset rätt.', knapp: ['Begär offert', '/kontakta-mig#formular'] },
    { allvar: true, ord: ['se pris', 'visa pris', 'se priset', 'se pris se pris'], a: 'Här räknar du fram ditt fasta pris – välj dina fönster så syns priset direkt.', knapp: ['Räkna ut mitt pris', '/boka'] },
    { ord: ['begär offert', 'be om offert', 'skicka offert'], a: 'Toppen! Skriv några rader om jobbet så återkommer Tommy med ett fast pris.', knapp: ['Begär offert', '/kontakta-mig#formular'] },
    { ord: ['vilka fönstertyper', 'vilka fönster finns', 'fönstertyper'], a: 'I bokningen finns de vanligaste typerna med bilder. Vilken liknar dina mest?', val: ['Utan spröjs', 'Med spröjs', 'Panoramafönster', 'Jag vet inte'], vantar: 'fonstertyp' },
    { ord: ['utan spröjs'], a: 'Då väljer du "1-luft utan spröjs" eller "2-luft utan spröjs" i bokningen – en båge eller två.', knapp: ['Till fönsterbokningen', '/boka#fonster'] },
    // Sälj som rådgivare
    { ord: ['orkar inte putsa', 'orkar inte', 'gitter inte', 'hinner inte putsa', 'har inte tid att putsa'], a: 'Det förstår jag! Det är precis därför vi finns. Du slipper jobbet och får proffsputsade fönster. Vill du se vad det kostar?', val: ['Se pris', 'Begär offert'] },
    { ord: ['blir nog dyrt', 'blir dyrt', 'har inte råd'], a: 'Jag förstår. För privatpersoner sänker RUT-avdraget arbetskostnaden med 50 % om villkoren är uppfyllda. Vi kan börja med att räkna fram ditt pris – det kostar inget att kolla.', knapp: ['Räkna ut mitt pris', '/boka'] },
    { ord: ['stora panoramafönster', 'stora glaspartier', 'stora glas', 'många stora fönster'], a: 'Då är det extra viktigt med rätt teknik och utrustning – Forsbergs jobbar med stora glaspartier. Ungefär hur många har du?', fragaAntal: true },
    { ord: ['jättemånga fönster', 'massa fönster', 'många fönster', 'mycket fönster', 'en jävla massa fönster', 'hur många fönster som helst'], a: 'Många fönster = ett perfekt jobb för oss! 💪 Ungefär hur många handlar det om?', fragaAntal: true },
    { ord: ['putshjälp', 'behöver hjälp med fönstren', 'hjälp med fönster', 'behöver fönsterputs'], a: 'Då har du kommit rätt! Vad gäller det?', val: ['Villa', 'Lägenhet', 'Företag', 'Solcellstvätt'], vantar: 'bostad' },
    { ord: ['har ni tid', 'har du tid', 'när har ni tid'], allvar: true, a: 'Lediga tider ser du direkt när du bokar – välj den som passar dig.', knapp: ['Till bokningen', '/boka'] },
    // Situationshumor
    { ord: ['batcave', 'batgrotta'], a: 'Batcave! 🦇 Mörkt som tusan där inne – så rena fönster gör verkligen skillnad. Hur många fönster har den?', fragaAntal: true },
    { ord: ['det är ett slott', 'är ett slott', 'bor på ett slott'], a: 'ERS MAJESTÄT! 👑 Då får vi nog rulla ut den kungliga offertavdelningen.', knapp: ['Begär offert', '/kontakta-mig#formular'] },
    { ord: ['större fastighet', 'flerfamiljshus', 'hyreshus', 'brf'], allvar: true, a: 'Större fastighet – då tar Tommy gärna fram en personlig offert så att allt blir rätt.', knapp: ['Begär offert', '/kontakta-mig#formular'] }
  ];
  var ROLIGA_RESERV = [
    'Oj! Nu fick mina robotkretsar jobba övertid. Kan du formulera om det?',
    '404: Min hjärna hittade inte svaret. 🤖',
    'Nu tappade jag tråden snabbare än en skrapa på ett blött fönster.',
    'Det där var avancerat till och med för mig!',
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
  var VET_INTE = 'Det vet jag inte säkert – och jag vill inte gissa. Ring Tommy på 079-346 39 64 (09–21) eller skriv i kontaktformuläret, så får du ett riktigt svar.';
  var HALSNING = 'Hej! 👋 Välkommen till Forsbergs Fönsterputs. Jag är Forsbergs kundservice, din digitala assistent. Fråga mig om fönsterputsning, priser, bokning eller något helt annat. Jag har faktiskt lite personlighet också.';

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
    '<header class="fc-topp"><span class="fc-robot" aria-hidden="true"></span><div><strong>Forsbergs Fönsterputs</strong><small>Kundservice · svarar direkt</small></div>' +
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
  function skriver(klar, ms) {
    var p = document.createElement('div');
    p.className = 'fc-bubbla fc-jag fc-skriver';
    p.setAttribute('aria-label', 'skriver');
    p.innerHTML = '<i></i><i></i><i></i>';
    var rad = document.createElement('div'); rad.className = 'fc-rad'; rad.innerHTML = '<span class="fc-robot fc-robot-liten" aria-hidden="true"></span>'; rad.appendChild(p);
    logg.appendChild(rad);
    logg.scrollTop = logg.scrollHeight;
    setTimeout(function () { rad.remove(); klar(); }, lugn ? 0 : (ms || 700));
  }

  // ================= Hjärnan (Tommy 2026-11-19) =================
  // Gratis och utan AI: normalisering + prioriterad matchning + fuzzy + samtalsminne.
  // Seriösa frågor (vanliga frågor, reklamation, bokning) väger tyngre än skämt.

  // Vanliga stavfel och slang -> normalform (ord för ord)
  var STAVNING = {
    'okey': 'okej', 'oki': 'okej', 'okk': 'okej', 'ok': 'okej', 'okay': 'okej', 'okidoki': 'okej',
    'fonster': 'fönster', 'fönser': 'fönster', 'fösnter': 'fönster', 'fönstrer': 'fönster',
    'putts': 'puts', 'puttsa': 'putsa', 'putza': 'putsa', 'fönsterputts': 'fönsterputs',
    'bokna': 'boka', 'boakr': 'bokar', 'bokr': 'bokar', 'bokra': 'bokar', 'boakr': 'bokar', 'bookar': 'bokar', 'book': 'boka', 'boak': 'boka', 'bokaa': 'boka', 'mkt': 'mycket',
    'nä': 'nej', 'nää': 'nej', 'näe': 'nej', 'nää': 'nej', 'neh': 'nej', 'nä tack': 'nej tack',
    'jepp': 'japp', 'jupp': 'japp', 'jäpp': 'japp', 'yep': 'ja', 'yup': 'ja', 'jaa': 'ja', 'jaaa': 'ja',
    'tjo': 'tjena', 'inna': 'innan', 'innn': 'innan', 'nni': 'ni', 'kommmer': 'kommer', 'gora': 'göra', 'tjenna': 'tjena', 'tjeena': 'tjena', 'hejj': 'hej', 'heej': 'hej',
    'tackar': 'tack', 'tx': 'tack', 'thx': 'tack', 'tnx': 'tack', 'tackk': 'tack',
    'whynot': 'why not', 'letsgo': 'lets go', 'lgh': 'lägenhet', 'hejdå': 'hejdå'
  };
  function rensa(text) {
    var t = text.toLowerCase().replace(/[!.,?;:"´`()…*~]/g, ' ').replace(/['’]/g, '').replace(/\s+/g, ' ').trim();
    t = t.split(' ').map(function (w) { var k = w.replace(/(.)\1{2,}/g, '$1$1'); return STAVNING[w] || STAVNING[k] || rattaOrd(w); }).join(' ');
    return ' ' + t + ' ';
  }

  // ---- Stavfelsrättning (Tommy 2026-11-19): varje ord jämförs med alla ord boten kan ----
  // "ksotar" -> kostar, "lägnhet" -> lägenhet, "boak" -> boka, "panorma" -> panorama.
  // Bokstäver i fel ordning, en saknad/extra/fel bokstav (två i långa ord). Vid oklart läge rättas inget.
  var VANLIGA_ORD = ['inte', 'eller', 'vill', 'mycket', 'många', 'kommer', 'göra', 'bara', 'också', 'finns', 'behöver', 'skulle', 'måste', 'detta', 'denna', 'dessa', 'vara', 'blir', 'bli', 'hade', 'hela', 'helt', 'bra', 'tack', 'själv', 'själva', 'någon', 'något', 'några', 'alla', 'allt', 'mina', 'dina', 'era', 'våra', 'från', 'efter', 'innan', 'under', 'över', 'mellan', 'sedan', 'idag', 'imorgon', 'vecka', 'veckan', 'dagen', 'tycker', 'tror', 'kanske', 'hej', 'hejsan', 'tjena', 'okej', 'gärna', 'snälla', 'hjälp', 'fråga', 'frågor', 'svar', 'svara', 'stort', 'stora', 'liten', 'litet', 'små', 'ungefär', 'exakt', 'ditt', 'mitt', 'sitt', 'samma', 'annan', 'annat', 'andra', 'första', 'sista', 'nästa', 'gång', 'gånger', 'varje', 'per', 'eftersom', 'därför', 'varför', 'vilken', 'vilket', 'vilka', 'hemma', 'huset', 'kunna', 'kunde', 'skriv', 'skriva', 'vet', 'veta', 'visa', 'kolla', 'titta', 'ser', 'se', 'räkna', 'räknar', 'klar', 'klart', 'fortsätt', 'avbryt', 'börja', 'sluta', 'stopp', 'lägg', 'till', 'mer', 'fler', 'inga', 'inget', 'ingen', 'noll', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio', 'elva', 'tolv', 'tjugo', 'stycken'];
  var KALK_ORD = ['villa', 'radhus', 'parhus', 'kedjehus', 'lägenhet', 'bostadsrätt', 'hyresrätt', 'fastighet', 'företag', 'kontor', 'butik', 'lokal', 'solcell', 'solceller', 'solcellstvätt', 'solpanel', 'solpaneler', 'fönster', 'fönstren', 'fönstret', 'fönstertyp', 'spröjs', 'panorama', 'panoramafönster', 'överliggande', 'underliggande', 'balkong', 'balkongen', 'altan', 'altanräcke', 'glasräcke', 'räcke', 'inglasad', 'uterum', 'uterummet', 'växthus', 'växthuset', 'takglas', 'trianglar', 'golv', 'sidor', 'rutor', 'bågar', 'båge', 'enluft', 'tvåluft', 'karmtvätt', 'karmar', 'stege', 'utåt', 'öppna', 'öppnas', 'specialfönster', 'kostar', 'kosta', 'kostnad', 'kostnaden', 'pris', 'priset', 'priser', 'prisförslag', 'offert', 'boka', 'bokar', 'bokning', 'bokningen', 'fönsterputs', 'fönsterputsning', 'putsa', 'putsning', 'rut-avdrag', 'rutavdrag', 'inställelseavgift', 'kalkyl', 'uppskatta', 'ungefärligt', 'lägenheten', 'villan', 'etta', 'tvåa', 'trea', 'femma', 'försäkring', 'försäkrad', 'avboka', 'avbokning', 'omboka', 'garanti', 'faktura', 'betala', 'betalning', 'reklamation', 'parkering', 'ansvarsförsäkring', 'abonnemang', 'regelbundet', 'smutsig', 'smutsiga', 'ränder', 'tommy', 'forsbergs', 'renvatten', 'renvattensystem', 'kemikalier', 'miljövänligt', 'teleskopstång', 'garanti', 'recensioner', 'recension', 'betyg', 'ångerrätt', 'erfarenhet', 'bakgrund', 'personal', 'anställda', 'fläckar', 'fönsterskrapa', 'skrapa', 'metod', 'teknik', 'utrustning', 'kvitto', 'momsregistrerad', 'våningar', 'våningen', 'husdjur', 'allergi', 'försäkrad', 'nöjd', 'missnöjd'];
  var vokab = null, rattCache = {}, viktigt = {};
  function byggVokab() {
    var v = {};
    function lagg(s) { String(s).toLowerCase().replace(/[!.,?;:"()/–]/g, ' ').split(' ').forEach(function (w) { if (w.length >= 2 && !/\d/.test(w)) v[w] = true; }); }
    ALLA.forEach(function (f) { f.ord.forEach(lagg); if (f.q) lagg(f.q); });
    [VANLIGA_ORD, KALK_ORD, KALK_START, PRIS_ORD, HALS_ORD, DETEKTIV_START, QUIZ_START, TYP_VAL].forEach(function (l) { l.forEach(lagg); });
    Object.keys(KORT_SVAR).forEach(function (k) { KORT_SVAR[k].forEach(lagg); });
    KOMMANDON.forEach(function (k) { k.ord.forEach(lagg); });
    Object.keys(STAVNING).forEach(function (k) { lagg(STAVNING[k]); });
    vokab = Object.keys(v);
    vokab.forEach(function (w) { rattCache[w] = w; });
    KALK_ORD.concat(PRIS_ORD).forEach(function (w) { viktigt[w] = true; });
  }
  // Avstånd där två bokstäver i fel ordning räknas som ett fel
  function avst(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 9;
    var d = [], i, j;
    for (i = 0; i <= a.length; i++) d[i] = [i];
    for (j = 1; j <= b.length; j++) d[0][j] = j;
    for (i = 1; i <= a.length; i++) for (j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
    return d[a.length][b.length];
  }
  function rattaOrd(w) {
    if (w.length < 3 || /[\d-]/.test(w)) return w;
    if (!vokab) byggVokab();
    if (rattCache[w] !== undefined) return rattCache[w];
    // Korta ord: bara omkastade bokstäver ("nje" -> nej, "hje" -> hej)
    if (w.length === 3) {
      var sorterad = w.split('').sort().join(''), hitt = vokab.filter(function (o) { return o.length === 3 && o.split('').sort().join('') === sorterad; });
      return (rattCache[w] = hitt.length === 1 ? hitt[0] : w);
    }
    var max = w.length >= 8 ? 2 : 1, bast = w, bastP = 99, lika = false;
    // Poäng: färre fel vinner. Vid lika vinner viktiga ord (villa, kostar, spröjs...) och ord med samma längd.
    vokab.forEach(function (o) {
      if (o.length < 4) return;
      var d = avst(w, o);
      if (d > max) return;
      var p = d * 10 - (viktigt[o] ? 3 : 0) - (o.length === w.length ? 1 : 0);
      if (p < bastP) { bastP = p; bast = o; lika = false; }
      else if (p === bastP && o !== bast) lika = true;
    });
    var svar = bastP < 99 && !lika ? bast : w;
    // Ordstammar ("försäkr", "avbok"): "försäkirng" -> början jämförs med stammen
    if (svar === w) {
      vokab.forEach(function (o) {
        if (svar !== w || o.length < 6 || w.length <= o.length) return;
        if (avst(w.slice(0, o.length), o) <= 1 || avst(w.slice(0, o.length + 1), o) <= 1) svar = o + w.slice(o.length);
      });
    }
    rattCache[w] = svar;
    return svar;
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
    hals: ['YOOOO! 🔥 Kundservice rapporterar för tjänstgöring!', 'EY CHEFEN! 😎 Hur ser fönsterläget ut?', 'YOOOOOO! 🤖 Äntligen lite action i serverhallen!', 'TJA LEGEND! Är du här för att snacka eller boka putsning?', 'YO YO YO! Jag känner redan doften av en ny bokning!', 'HALLÅ DÄR! 👀 Jag såg dig komma. Mina sensorer är på topp!', 'Tjenare! 👋 Vad kan jag hjälpa dig med idag?', 'Hallå hallå! Kundservice är online. 🤖', 'Hej hej! Fönster, priser eller bara snack?', 'Välkommen! Mina sensorer säger att du är här av en anledning. 👀'],
    jaBoka: ['SÅJA! 🔥 Då kör vi! Klicka vidare till bokningssystemet.', 'YES! 😎 Bokningen står redo – räkna dina fönster så får du priset direkt.', 'NU SNACKAR VI! 🚀 Här är bokningen.', 'Där satt den! 🔥 Ett klick bort från rena rutor.', 'JAJAMÄN! 🫡 Bokningssystemet, varsågod!', 'Tommy kommer bli så stolt. 🥹 Här är bokningen!'],
    nejBoka: ['Uppfattat chefen! 🫡 Jag lägger undan skrapan.', 'Helt okej! Jag slutar tjata – för nu. 😎', 'Inga problem. Du vet var jag finns när solen avslöjar smutsen.', 'Noterat! Säljläge pausat.', 'Okej okej! Roboten backar långsamt. 🤖', 'Respekt. Vi kan prata om något annat.'],
    tvek: ['Ingen stress! Du kan kika på priset utan att boka något.', 'Fundera i lugn och ro. Jag putsar mina kretsar så länge. 🤖', 'Kanske är en bra början! Vill du se priset först?', 'Helt förståeligt. Har du någon fråga jag kan svara på?', 'Ta den tid du behöver – smutsen springer ingenstans. Tyvärr.'],
    reakt: ['Haha, äntligen någon som fattar min humor! 😎', 'Tack tack, jag är här hela veckan! 🎤', 'Jag visste att du skulle gilla den. Mina skämt är lika klara som Forsbergs fönster.', 'Ser du, jag är inte bara en säljrobot. Jag är en underhållningsrobot också!', 'Okej, nu blir jag blyg. 🤖❤️', 'Den här publiken är fantastisk!', 'Jag skriver upp det som ett bra skämt i loggen.', 'Glad att jag får dig att le! Fönster blir också gladare när de är rena.'],
    forklara: ['Enkelt uttryckt: ', 'Kort sagt: ', 'Jag menar så här: ', 'Okej, enklare: '],
    jaUtan: ['Okej! 😎 Vad vill du hitta på nu?', 'Toppen! Fråga på – fönster, priser eller bara snack.', 'Bra! Säg till om du vill kika på ett pris.', 'Japp! Jag är redo när du är.', 'YES! Vad vill du ha hjälp med – villa, lägenhet eller något annat?'],
    bostadIgen: ['Toppen! Gäller det villa, lägenhet eller företag?', 'Kul! Villa, lägenhet eller företag?', 'Härligt! Vilken sorts bostad – villa, lägenhet eller företag?'],
    reserv: ['404: Min robotbrain hittade inte svaret. 🤖', 'Okej, nu snurrade mina kugghjul baklänges.', 'Du lyckades precis förvirra kundservice. Imponerande!', 'Vänta, jag behöver starta om min sista hjärncell.', 'Tommy! Hjälp! Människan skriver något avancerat!', 'Jag fattade ungefär noll procent. Testa igen!', 'Det där var över min digitala lönegrad.', 'Jag behöver en uppgradering. Eller kaffe. Helst båda.'].concat(ROLIGA_RESERV)
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
    if (n >= 25 && n < 50) return { ord: ['antal'], a: n + '?! 😳 Okej, där har vi ett ordentligt uppdrag! Är det en villa eller en större fastighet?', val: ['Villa', 'Större fastighet', 'Företag'], vantar: 'bostad' };
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
      if (/större fastighet|flerfamilj|hyreshus|brf/.test(t)) return { avsikt: 'boka', a: 'Större fastighet – då tar Tommy gärna fram en personlig offert så att allt blir rätt.', knapp: ['Begär offert', '/kontakta-mig#formular'] };
      if (/företag|kontor|butik|lokal/.test(t)) return { avsikt: 'boka', a: 'Företag fixas också! Kolla företagssidan så tar Tommy fram ett fast pris.', knapp: ['Till företagssidan', '/foretag'] };
      if (/solcell|solpanel/.test(t)) return { avsikt: 'boka', a: 'Solcellstvätt! ☀️ Skicka antal paneler och adress så får du ett pris samma dag.', knapp: ['Få offert', '/kontakta-mig?typ=Solcellstv%C3%A4tt#formular'] };
      if (typ === 'ja') return { avsikt: 'fraga', a: POOLER.bostadIgen, val: ['Villa', 'Lägenhet', 'Företag', 'Solcellstvätt'], vantar: 'bostad' };
    }
    if (v === 'boka' || v === 'bostad') {
      if (typ === 'ja') { minne.bokningsintresse = true; var fb = (minne.fakta || {}).bostad; return { avsikt: 'boka', a: POOLER.jaBoka, knapp: fb === 'villa' ? ['Till villabokningen', '/boka#fonster'] : fb === 'lägenhet' ? ['Till lägenhetsbokningen', '/boka#lagenhet'] : ['Till bokningen', '/boka'] }; }
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
    { ord: ['normalläge', 'normalt läge', 'avbryt läge', 'stäng av läge', 'avsluta läge'], lage: '', a: 'Normalläge återställt. Kundservice är lugn och samlad igen. 🤖' }
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

  // ================= Mänskligare (Tommy 2026-11-19) =================
  // Svar delas i flera korta bubblor (som en människa skriver), namn och ort komms ihåg under samtalet.
  // Namn och ort sparas bara i minnet medan chatten är öppen – skickas aldrig någonstans.
  var DELA = '§§';
  var ORTER = { 'jönköping': '', 'bankeryd': 'bankeryd', 'barnarp': 'barnarp', 'bottnaryd': 'bottnaryd', 'bränninge': 'branninge', 'bymarken': 'bymarken', 'dalvik': 'dalvik', 'dunkehalla': 'dunkehalla', 'egna hem': 'egna-hem', 'ekhagen': 'ekhagen', 'furusjö': 'furusjo', 'gränna': 'granna', 'gräshagen': 'grashagen', 'habo': 'habo', 'hedenstorp': 'hedenstorp', 'hovslätt': 'hovslatt', 'huskvarna': 'huskvarna', 'kaxholmen': 'kaxholmen', 'kortebo': 'kortebo', 'lekeryd': 'lekeryd', 'liljeholmen': 'liljeholmen', 'ljungarum': 'ljungarum', 'månsarp': 'mansarp', 'mariebo': 'mariebo', 'norrahammar': 'norrahammar', 'öggestorp': 'oggestorp', 'ölmstad': 'olmstad', 'örserum': 'orserum', 'österäng': 'osterang', 'öxnehaga': 'oxnehaga', 'råslätt': 'raslatt', 'sanna': 'sanna', 'skärstad': 'skarstad', 'taberg': 'taberg', 'tenhult': 'tenhult', 'torpa': 'torpa', 'torsvik': 'torsvik', 'trånghalla': 'tronghalla', 'vättersnäs': 'vattersnas' };
  function stor(s) { return s.replace(/(^|\s)\S/g, function (x) { return x.toUpperCase(); }); }
  function hittaOrt(s) {
    var hit = '';
    Object.keys(ORTER).forEach(function (o) { if (s.indexOf(' ' + o + ' ') >= 0 || s.indexOf(' ' + o + 's ') >= 0) hit = o; });
    return hit;
  }
  function halsning() {
    var nu = new Date(), h = nu.getHours(), d = nu.getDay();
    var hej = h < 5 ? 'Nattuggla? 🦉 Hej!' : h < 10 ? 'God morgon! ☀️' : h < 17 ? 'Hej! 👋' : 'God kväll! 🌙';
    var extra = d === 5 ? ' Tommy är ledig på fredagar, men jag jobbar alltid. 😎' : (d === 0 || d === 6) ? ' Skönt med helg, va?' : '';
    return hej + extra + DELA + 'Jag är Forsbergs kundservice, Tommys digitala hjälpreda. Jag kan räkna ut vad din fönsterputs kostar, visa lediga tider och svara på frågor.' + DELA + 'Tryck på en knapp här under – eller skriv med egna ord, så gott det går. Stavfel gör ingenting. 😊';
  }
  // Huvudmenyn – samma knappar överallt så det är lätt att hitta tillbaka (Tommy 2026-11-19)
  var MENY = ['Vad kostar det?', 'Lediga tider', 'Hur går det till?', 'Ring Tommy'];
  var TEL_LANK = ['Ring ' + TEL_TEXT, 'tel:+46793463964'];
  function hjalpSvar(s) {
    if (/ring tommy|vill ringa|prata med (tommy|någon|en människa|en person)|ringa (upp|er|dig)|telefonnummer|ditt nummer|ert nummer|vilket nummer|kan (tommy|ni|du) ringa/.test(s))
      return { special: true, stilla: true, avsikt: 'ring', vantar: '', text: 'Självklart! Ring Tommy på ' + TEL_TEXT + '. Han svarar mellan 09 och 21.' + DELA + 'Svarar han inte direkt är han troligen mitt i ett jobb – då ringer han upp dig så snart han kan.', knapp: TEL_LANK };
    if (/hur går det till|hur fungerar det|hur funkar det|hur jobbar (du|ni|tommy)|vad händer (sen|när|efter)|hur gör (jag|man)|steg för steg/.test(s))
      return { special: true, stilla: true, avsikt: 'hur', vantar: '', text: 'Så här enkelt är det:' + DELA +
        '1. Du räknar fram priset – här med mig eller i bokningen.\n2. Du skickar en förfrågan med önskad tid.\n3. Tommy hör av sig och bekräftar tiden.\n4. Du behöver inte vara hemma när han putsar.\n5. Efteråt betalar du med Swish. RUT-avdraget sköter Tommy med Skatteverket.' + DELA +
        'Det är alltid Tommy själv som kommer. Vill du att vi räknar ut ditt pris nu?', val: ['Vad kostar det?', 'Lediga tider', 'Ring Tommy'], knapp: ['Läs mer om hur jag jobbar', '/hur-jag-jobbar'] };
    if (/^ (meny|menyn|hjälp|start|tillbaka|jag fattar inte|jag förstår inte|förstår inte|hänger inte med|vad ska jag (göra|skriva|trycka)|hur gör jag) $/.test(s))
      return { special: true, stilla: true, avsikt: 'meny', vantar: '', text: 'Ingen fara, vi tar det lugnt. 😊' + DELA + 'Tryck på det du vill ha hjälp med här under:', val: MENY };
    return null;
  }
  // Namn och ort: "jag heter Anna", "jag bor i Bankeryd", "kommer du till Habo?"
  function personSvar(tt) {
    var s = ' ' + tt.trim() + ' ';
    var m = s.match(/ (jag heter|mitt namn är|heter jag|namnet är) ([a-zåäöé]{2,15})( |$)/);
    if (m && ['inte', 'något', 'nåt', 'typ'].indexOf(m[2]) < 0) {
      minne.namn = stor(m[2]);
      return { special: true, stilla: true, avsikt: 'namn', vantar: '', text: valjFran(['Trevligt att träffas, ' + minne.namn + '! 👋', 'Hej ' + minne.namn + '! Kul att du tittar in. 😊', minne.namn + '! Snyggt namn. Mina kretsar sparar det (bara i den här chatten).']) + DELA + 'Vad kan jag hjälpa dig med?', val: ['Vad kostar det?', 'Lediga tider'] };
    }
    // "Kan du boka åt mig?" – boten bokar aldrig själv, den hjälper kunden dit (Tommy 2026-11-19)
    if (/(kan|får|vill) (du|ni) boka|boka åt mig|boka (för|till) mig|boka in mig|lägga in (en|mig)|fixa (en )?tid åt mig|kan du reservera|reservera (en )?tid/.test(s)) {
      var k0 = minne.kalk, harPris = k0 && k0.steg === 'klar', harTid = !!minne.tid;
      var lank0 = k0 && k0.bostad === 'lgh' ? '/boka#lagenhet' : k0 && k0.bostad === 'villa' ? '/boka#fonster' : '/boka';
      var del1 = valjFran(['Haha, jag önskar! 😅 Men jag har inga händer – och kalendern är Tommys.', 'Jag skulle gärna, men Tommy låter mig inte röra kalendern. 🙈', 'Där går min gräns, tyvärr – bokningar är Tommys grej. 🤖']);
      var del2 = harPris && harTid ? 'Men du har ju redan ditt pris (' + krr(kalkRakna(k0).total) + ') och lediga tider – då är det bara att skicka en förfrågan i bokningen. Tar en minut, sen hör Tommy av sig och bekräftar tiden.'
        : harPris ? 'Men du har redan ditt pris (' + krr(kalkRakna(k0).total) + ')! Vill du att jag kollar vilka tider som är lediga först? Sen skickar du förfrågan i bokningen, och Tommy bekräftar.'
        : 'Det jag kan göra är att räkna ut vad det kostar och kolla vilka tider Tommy har lediga. Sen skickar du en förfrågan i bokningen – tar en minut – och Tommy hör av sig och bekräftar tiden.';
      return { special: true, stilla: true, avsikt: 'boka', vantar: '', text: del1 + DELA + del2, val: ['Skicka förfrågan till Tommy'].concat(harPris && harTid ? [] : harPris ? ['Lediga tider'] : ['Vad kostar det?', 'Lediga tider']), knapp: ['Till bokningen', lank0] };
    }
    var ort = hittaOrt(s);
    if (ort) {
      minne.ort = stor(ort);
      if (/bor i|bor på|kommer (du|ni)|åker (du|ni)|putsar (du|ni)|jobbar (du|ni)|finns (du|ni)|tar (du|ni)|kor (du|ni)/.test(s) || s.trim().split(' ').length <= 2) {
        var o = { special: true, stilla: true, avsikt: 'ort', vantar: '', text: valjFran([minne.ort + '! Dit kommer Tommy. 🚐', minne.ort + ' – absolut, där putsar Tommy!', 'Ja, ' + minne.ort + ' ingår i Tommys område. 👍']) + DELA + 'Ska jag räkna ut vad det skulle kosta, eller kolla lediga tider?', val: ['Vad kostar det?', 'Lediga tider'] };
        if (ORTER[ort]) o.knapp = ['Fönsterputs i ' + minne.ort, '/fonsterputs-' + ORTER[ort]];
        return o;
      }
    }
    return null;
  }
  // Delar ett svar i flera bubblor. Första delen visas direkt, resten "skrivs" en i taget.
  function botRad(text) {
    var b = document.createElement('div'); b.className = 'fc-bubbla fc-jag'; b.textContent = text;
    var r = document.createElement('div'); r.className = 'fc-rad'; r.innerHTML = '<span class="fc-robot fc-robot-liten" aria-hidden="true"></span>'; r.appendChild(b);
    return r;
  }
  function langdTid(text) { return lugn ? 0 : Math.min(2200, 450 + text.length * 14); }
  function delaUpp(fore) {
    var nya = [].slice.call(logg.childNodes, fore);
    var rad = nya.filter(function (n) { return n.classList && n.classList.contains('fc-rad'); })[0];
    if (!rad) return;
    var b = rad.querySelector('.fc-bubbla'), tn = b && b.firstChild;
    if (!tn || tn.nodeType !== 3) return;
    // Långa svar utan markering delas vid en mening i mitten
    if (tn.nodeValue.indexOf(DELA) < 0 && tn.nodeValue.length > 190) {
      var v = tn.nodeValue, re = /[.!?] (?=[A-ZÅÄÖ0-9"])/g, x, bast = -1;
      while ((x = re.exec(v))) if (x.index > 60 && v.length - x.index > 60 && (bast < 0 || Math.abs(x.index - v.length / 2) < Math.abs(bast - v.length / 2))) bast = x.index;
      if (bast > 0) tn.nodeValue = v.slice(0, bast + 1) + DELA + v.slice(bast + 2);
    }
    if (tn.nodeValue.indexOf(DELA) < 0) return;
    var delar = tn.nodeValue.split(DELA).map(function (d) { return d.trim(); }).filter(Boolean);
    tn.nodeValue = delar.pop();
    var vanta = nya.slice(nya.indexOf(rad));
    var foreRader = delar.map(function (d) { var r = botRad(d); logg.insertBefore(r, rad); return r; });
    var ko = foreRader.slice(1).map(function (r) { return [r]; }).concat([vanta]);
    ko.forEach(function (grupp) { grupp.forEach(function (n) { n.style.display = 'none'; }); });
    (function nasta(i) {
      if (i >= ko.length) return;
      var grupp = ko[i], text = grupp[0].textContent || '';
      var p = botRad(''); p.querySelector('.fc-bubbla').className = 'fc-bubbla fc-jag fc-skriver'; p.querySelector('.fc-bubbla').innerHTML = '<i></i><i></i><i></i>';
      logg.insertBefore(p, grupp[0]);
      setTimeout(function () {
        p.remove();
        grupp.forEach(function (n) { n.style.display = ''; });
        var rutaUnder = logg.getBoundingClientRect().bottom, nyUnder = grupp[0].getBoundingClientRect().bottom;
        if (nyUnder > rutaUnder) logg.scrollTop += Math.min(nyUnder - rutaUnder + 12, grupp[0].getBoundingClientRect().top - logg.getBoundingClientRect().top - 12);
        nasta(i + 1);
      }, Math.max(350, langdTid(text) * 0.7));
    })(0);
  }

  // ================= Kunskap från hemsidan (Tommy 2026-11-19) =================
  // Svaren kommer från sidorna "Hur jag jobbar" och "Om mig" – boten hittar inte på något eget.
  // Ändras texten på sajten bör den ändras här också. Ordningen spelar roll: första träffen vinner.
  // EJ inlagt än (motsäger bokningen, väntar på Tommy): "alltid fyra sidor och karmar", "fast pris samma dag".
  var HUR = ['Läs mer om hur jag jobbar', '/hur-jag-jobbar'], OM = ['Läs mer om Tommy', '/om-oss'];
  var KUNSKAP = [
    { id: 'garanti', allvar: true, ord: /inte nöjd|missnöjd|garanti|blev inte bra|blev dåligt|inte rent|smutsigt efteråt|ränder kvar|reklamera|reklamation/,
      a: 'Det ska du absolut inte behöva vara. Tommy har nöjd kund-garanti.' + '§§' + 'Är du inte helt nöjd kommer han tillbaka och åtgärdar det kostnadsfritt – helt enkelt tills du är nöjd. Hör av dig till honom, så löser ni det.',
      knapp: ['Ring ' + '079-346 39 64', 'tel:+46793463964'], knapp2: ['Skriv till Tommy', '/kontakta-mig#formular'] },
    { id: 'forsakring', allvar: true, ord: /försäkr|ansvarsförsäkring|går sönder|om något händer|om han skadar|skada på|trygg-hansa|trygghansa/,
      a: 'Ja, du kan känna dig trygg. Tommy är försäkrad hos Trygg-Hansa med ansvarsförsäkring.' + '§§' + 'Den täcker skador han skulle orsaka på din egendom i samband med arbetet.', knapp: OM },
    { id: 'renvatten', ord: /renvatten|rent vatten|filtrerat vatten|filtrerar|teleskop|stång|vattenstång/,
      a: 'Bra fråga! Vanligt kranvatten innehåller kalk och mineraler – det är de som lämnar fläckar när rutan torkar.' + '§§' + 'I renvattensystemet filtreras vattnet tills det är helt rent. Det löser upp smutsen, sköljer bort den och torkar utan märken. Ramar och karmar blir rena på köpet.' + '§§' + 'Och det är helt utan kemikalier. 💧', val: ['Hur högt når du?', 'Vad kostar det?'], knapp: HUR },
    { id: 'hojd', ord: /hur högt|höga fönster|högt upp|andra våningen|tredje våningen|övervåning|våningar|stege|når (du|ni|han)|takfönster|svåra att nå/,
      a: 'Inga problem! För höga fönster använder Tommy renvattensystem med teleskopstång.' + '§§' + 'Den når upp till 13 meter – ungefär 4 våningar – och han står tryggt på marken hela tiden. Ingen stege mot din fasad.', val: ['Vad är renvatten?', 'Vad kostar det?'], knapp: HUR },
    { id: 'kemikalier', ord: /kemikal|miljövänlig|giftig|allergi|(hund|katt|husdjur|barn|växter|blommor).{0,25}(säker|farlig|tål|skadl|okej)|(säker|farlig|skadl).{0,25}(hund|katt|husdjur|barn|växter|blommor)/,
      a: 'Renvattensystemet använder inga kemikalier alls – bara rent vatten.' + '§§' + 'Det är skonsamt för både växter och djur. 🌿', val: ['Vad är renvatten?', 'Vad kostar det?'], knapp: HUR },
    { id: 'insida', ord: /insida|insidan|invändig|innerruta|båda sidor|bägge sidor|in och ut|in- och ut|bara utsida|bara utsidan|endast utsida|utvändig|bara ute|inne och ute/,
      a: 'Ja, absolut! Utsidan syns från gatan – insidan syns från soffan. Tommy putsar alltid båda. 😊' + '§§' + 'Har du fönster med mellanglas, alltså bågar som går att öppna isär, tar han dem också. Då väljer du 4 sidor när du räknar ut priset.', val: ['Vad kostar det?'], knapp: HUR },
    { id: 'metod', ord: /vilken metod|hur putsar (du|ni|han)|teknik|vilken utrustning|vad använder (du|ni|han)|skrapa|fönsterskrapa|hur gör (du|ni|han) rent/,
      a: 'Tommy kombinerar två metoder och väljer alltid det som ger bäst resultat för just dina fönster:' + '§§' + '• Renvattensystem för höga och svåra fönster – ingen stege, inga kemikalier.\n• Klassisk skrapteknik för vanliga rutor – precision och randfritt resultat.', val: ['Vad är renvatten?', 'Vad kostar det?'], knapp: HUR },
    { id: 'ranter', ord: /ränder|randigt|randfritt|fläckar|märken på|strimmor/,
      a: 'Nej, det är hela poängen! 😊 Renvattnet torkar fläckfritt, och skrapan ger ett randfritt resultat.' + '§§' + 'Och skulle du ändå inte bli nöjd kommer Tommy tillbaka kostnadsfritt.', knapp: HUR },
    { id: 'vemkommer', ord: /vem kommer|anställda|personal|skickar (du|ni) någon|kommer (du|tommy) själv|underleverantör|främling|okänd person/,
      a: 'Det är alltid Tommy själv som kommer. 👋' + '§§' + 'Ingen anonym personal – du vet vem som är hemma hos dig, från bokning till färdigt jobb.', val: ['Vem är Tommy?', 'Vad kostar det?'], knapp: OM },
    { id: 'fastpris', ord: /blir det dyrare|tar längre tid|dolda avgifter|extra kostnad|kostar det extra|tillkommer|överraskning|fast pris|minusgrader/,
      a: 'Priset ni kommer överens om är det du betalar – även om jobbet tar längre tid, och oavsett väder eller minusgrader.' + '§§' + 'Inga dolda avgifter. Det enda som läggs till är inställelseavgiften på 30 kr, och den syns redan när du räknar ut priset. Alla priser är inklusive moms.', val: ['Vad kostar det?'] },
    { id: 'fskatt', ord: /f-skatt|fskatt|f skatt|faktura|moms|kvitto|registrerat företag|seriös|oseriös|svart/,
      a: 'Allt är ordnat och korrekt. ✅' + '§§' + 'Tommy är godkänd för F-skatt och momsregistrerad, så du får alltid en riktig faktura. Alla priser är inklusive moms, och RUT-avdraget dras direkt – Tommy sköter allt med Skatteverket.', knapp: OM },
    { id: 'anger', ord: /ångerrätt|ångra (mig|bokningen)|ångrar mig|ändra mig|14 dagar/,
      a: 'Bokar du på distans har du enligt lag 14 dagars ångerrätt.' + '§§' + 'Allt står i de allmänna villkoren. Vill du ändra eller avboka en tid kan du också bara ringa Tommy.', knapp: ['Allmänna villkor', '/allmanna-villkor'] },
    { id: 'vemartommy', ord: /vem är tommy|vem är du|vem är ägaren|bakgrund|erfarenhet|hur länge har|var har (du|han) jobbat|utbildad|kan (du|han) det här|proffs|jimmy/,
      a: 'Tommy Forsberg driver Forsbergs Fönsterputs. Han började i Stockholm och jobbade där i nästan fem år – med allt från lägenheter och villor till exklusiva fastigheter och stora glaspartier.' + '§§' + 'Hans mentor var Jimmy Ström, flerfaldig medaljör i SM och VM i fönsterputs. Nu bygger Tommy upp företaget i Jönköping, och 2026 tävlade han i SM i fönsterputs på Kistamässan. 🏆', val: ['Vad kostar det?', 'Lediga tider'], knapp: OM },
    { id: 'recensioner', ord: /recension|omdöme|betyg|vad tycker kunder|andra kunder|google-betyg|stjärnor|rekommender/,
      a: '5,0 på Google, med 51 recensioner – alla med högsta betyg. ⭐⭐⭐⭐⭐', knapp: ['Läs recensionerna', '/recensioner'] },
    { id: 'bilder', ord: /skicka (en )?bild|skicka foto|ta (en )?bild|bilder på|fotografera|mms/,
      a: 'Absolut! Skicka bilder på fönstren, din adress och lite om bostaden till Tommy – så räknar han ut ett pris och ringer upp dig.' + '§§' + 'Vill du hellre räkna själv går det fint här med mig också. 🧮', knapp: ['Skicka SMS till Tommy', 'sms:+46793463964'], val: ['Vad kostar det?'] }
  ];
  function kunskapSvar(s) {
    for (var i = 0; i < KUNSKAP.length; i++) {
      var k = KUNSKAP[i];
      if (!k.ord.test(s)) continue;
      // "Recensioner" stämmer bara om det inte är en prisfråga – annars får kalkylatorn ta den
      if (k.id === 'fastpris' && /vad kostar|räkna/.test(s)) continue;
      // 'Tar ni bara utsidan?' ska få ett nej, inte ett ja
      var aText = k.id === 'insida' && /bara utsida|bara utsidan|endast utsida|bara ute|bara utvändig/.test(s) ? 'Nej, inte alls! Utsidan syns från gatan – insidan syns från soffan. Tommy putsar alltid båda. 😊§§Har du fönster med mellanglas, alltså bågar som går att öppna isär, tar han dem också. Då väljer du 4 sidor när du räknar ut priset.' : k.a;
      var val = (k.val || []).slice();
      if (minne.kalk && minne.kalk.steg !== 'klar') { minne.kalk.paus = true; val = ['Fortsätt prisräkningen'].concat(val.filter(function (v) { return v !== 'Vad kostar det?'; })); }
      return { special: true, stilla: true, allvar: !!k.allvar, avsikt: 'fakta-' + k.id, vantar: '', text: aText.split('§§').join(DELA), val: val.length ? val : null, knapp: k.knapp, knapp2: k.knapp2 };
    }
    return null;
  }

  // ================= Förfrågan via chatten (Tommy 2026-11-19) =================
  // Kunden lämnar namn, telefon, adress och önskad tid i chatten. Boten visar en sammanfattning,
  // och först när kunden trycker "Ja, skicka" går det till Tommy via samma funktion som bokningen
  // (/.netlify/functions/send-email). Inget bokas – Tommy hör av sig och bekräftar.
  // Uppgifterna finns bara i chattens minne tills de skickas, och syns aldrig i statistiken.
  var FORM_START = /skicka (en )?förfrågan|skicka till tommy|lämna (mina )?uppgifter|ta mina uppgifter|ring mig|ringa mig|bli (upp)?ringd|kontakta mig|hör av (er|dig) till mig|vill att tommy ringer|ringa upp mig|ring upp mig/;
  var FORM_STEG = ['namn', 'telefon', 'adress', 'tid', 'medd'];
  function formNy() { return { steg: 'namn', namn: minne.namn || '', telefon: '', adress: '', tid: '', medd: '', andrar: false }; }
  function formObj(text, val, extra) { var o = { special: true, stilla: true, avsikt: 'forfragan', vantar: '', text: text, val: val || null }; if (extra) Object.keys(extra).forEach(function (k) { o[k] = extra[k]; }); return o; }
  function tidVal() {
    var v = (minne.tid && minne.tid.senaste) ? minne.tid.senaste.slice(0, 3) : [];
    if (!v.length) { hamtaTider(); var sedda = {}; ledigaTider().forEach(function (t) { var d = tIso(t.dag); if (v.length < 3 && !sedda[d]) { sedda[d] = true; v.push(tDagText(t) + ', ' + t.pass.namn); } }); }
    return v.concat(['Spelar ingen roll', 'Tommy får ringa och bestämma']);
  }
  function formFraga(prefix) {
    var fm = minne.form, p = prefix ? prefix + DELA : '';
    if (fm.steg === 'namn') return formObj(p + 'Vad heter du?');
    if (fm.steg === 'telefon') return formObj(p + 'Vilket telefonnummer kan Tommy nå dig på?');
    if (fm.steg === 'adress') return formObj(p + 'Vilken adress gäller det? Gatuadress och ort räcker.' + (minne.ort ? ' (Du nämnde ' + minne.ort + '.)' : ''));
    if (fm.steg === 'tid') return formObj(p + 'När passar det dig? Välj en tid, eller skriv med egna ord – t.ex. "en vardag nästa vecka".', tidVal());
    if (fm.steg === 'medd') return formObj(p + 'Något mer Tommy ska veta? Till exempel portkod, husdjur eller hur fönstren ser ut.', ['Nej, inget mer']);
    return formSammanfattning(p);
  }
  function formSammanfattning(p) {
    var fm = minne.form, k = minne.kalk && minne.kalk.steg === 'klar' ? minne.kalk : null;
    fm.steg = 'kolla';
    var rader = ['Namn: ' + fm.namn, 'Telefon: ' + fm.telefon, 'Adress: ' + fm.adress, 'Önskad tid: ' + fm.tid];
    if (fm.medd) rader.push('Meddelande: ' + fm.medd);
    if (k) rader.push('Uppskattat pris: ' + krr(kalkRakna(k).total) + ' efter RUT');
    return formObj((p || '') + 'Så här ser din förfrågan ut:\n\n' + rader.join('\n') + DELA + 'Stämmer det? Då skickar jag den till Tommy. Inget är bokat förrän han har hört av sig och bekräftat.', ['Ja, skicka till Tommy', 'Ändra något', 'Avbryt']);
  }
  function formStart() {
    minne.form = formNy();
    var intro = valjFran(['Gärna! Jag tar dina uppgifter och skickar dem till Tommy. 📝', 'Absolut – vi fixar det här i chatten. 📝']) + DELA +
      'Det tar en minut. Tommy hör av sig och bekräftar tiden – inget är bokat förrän han har gjort det. Dina uppgifter skickas bara till Tommy.';
    var o;
    if (minne.form.namn) { minne.form.steg = 'telefon'; o = formFraga(intro + DELA + 'Jag skriver ' + minne.form.namn + ' som namn.'); }
    else o = formFraga(intro);
    o.knapp = ['Så hanteras dina uppgifter', '/integritetspolicy'];
    return o;
  }
  function nastaFormSteg(fm) {
    if (fm.andrar) { fm.andrar = false; return 'kolla'; }
    var i = FORM_STEG.indexOf(fm.steg);
    return i >= 0 && i < FORM_STEG.length - 1 ? FORM_STEG[i + 1] : 'kolla';
  }
  // Tar emot kundens svar (originaltexten – namn och adress ska inte stavningsrättas)
  function formSvar(raw) {
    var fm = minne.form, txt = raw.trim(), s = rensa(raw), fraga = /\?\s*$/.test(txt);
    if (/^ (avbryt|sluta|stopp|glöm det|nej tack avbryt) $/.test(s) || (fm.steg === 'kolla' && /^ avbryt $/.test(s))) { minne.form = null; return formObj('Okej, jag har slängt uppgifterna – inget skickades. 👍 Säg till om du ångrar dig!', MENY); }
    if (/fortsätt med uppgifterna/.test(s)) return formFraga('Där var vi! 📝');
    var ok = '';
    switch (fm.steg) {
      case 'namn':
        if (fraga || /\d/.test(txt) || txt.split(/\s+/).length > 4 || txt.length < 2) return null;
        fm.namn = txt.replace(/^(jag heter|mitt namn är|det är)\s+/i, '').replace(/(^|\s)\S/g, function (x) { return x.toUpperCase(); });
        minne.namn = minne.namn || fm.namn.split(' ')[0];
        ok = valjFran(['Tack, ' + fm.namn.split(' ')[0] + '! 😊', 'Trevligt, ' + fm.namn.split(' ')[0] + '!']);
        break;
      case 'telefon':
        var siffror = txt.replace(/[^\d+]/g, '');
        if (siffror.replace('+', '').length < 8 || siffror.replace('+', '').length > 13) {
          if (fraga || txt.split(/\s+/).length > 4) return null;
          return formObj('Hmm, det där såg inte riktigt ut som ett telefonnummer. 🤔' + DELA + 'Kan du skriva det igen? Till exempel 070-123 45 67.');
        }
        fm.telefon = txt; ok = 'Tack! 📞';
        break;
      case 'adress':
        if (fraga || txt.length < 4) return null;
        fm.adress = txt + (minne.ort && txt.toLowerCase().indexOf(minne.ort.toLowerCase()) < 0 && !/\d{3}\s?\d{2}/.test(txt) && !/,/.test(txt) ? ', ' + minne.ort : '');
        ok = 'Noterat! 🏠';
        break;
      case 'tid':
        if (fraga && txt.split(/\s+/).length > 3) return null;
        fm.tid = /spelar ingen roll/i.test(txt) ? 'Spelar ingen roll' : /ringa och bestämma/i.test(txt) ? 'Tommy ringer och bestämmer tid' : txt;
        ok = 'Bra! 📅';
        break;
      case 'medd':
        fm.medd = /^ (nej|nej inget mer|inget|inget mer|nä|nope) $/.test(s) ? '' : txt;
        ok = fm.medd ? 'Det skickar jag med. ✍️' : '';
        break;
      case 'kolla':
        if (/ja skicka|skicka till tommy|^ (ja|japp|stämmer|det stämmer|skicka) $/.test(s)) return formSkicka();
        if (/ändra/.test(s)) { fm.steg = 'valj'; return formObj('Vad vill du ändra?', ['Namn', 'Telefon', 'Adress', 'Tid', 'Meddelande']); }
        return null;
      case 'valj':
        var m = { namn: 'namn', telefon: 'telefon', nummer: 'telefon', adress: 'adress', tid: 'tid', meddelande: 'medd' }, vald = '';
        Object.keys(m).forEach(function (x) { if (s.indexOf(' ' + x) >= 0) vald = m[x]; });
        if (!vald) return null;
        fm.steg = vald; fm.andrar = true;
        return formFraga();
    }
    fm.steg = nastaFormSteg(fm);
    return formFraga(ok);
  }
  // Skickar förfrågan till Tommy – samma fält och mottagare som bokningen
  function formSkicka() {
    var fm = minne.form, k = minne.kalk && minne.kalk.steg === 'klar' ? minne.kalk : null, data = {
      kalla: 'Kundservice-chatten (fputs.se)', namn: fm.namn, telefon: fm.telefon, adress: fm.adress,
      onskad_tid: fm.tid, meddelande: fm.medd, email: ''
    };
    if (k) {
      var pr = kalkRakna(k);
      data.bostadstyp = k.bostad === 'lgh' ? 'Lägenhet' : 'Villa/radhus';
      if (k.bostad === 'lgh') data.lagenhetsstorlek = k.lgh;
      data.kalkyl = (k.sammanfattning || []).join(' | ') + (pr.karm ? ' | Karmtvätt: ja' : '');
      if (pr.antal) data.antal_fonster = String(pr.antal);
      data.uppskattat_pris = krr((pr.putsning + pr.karm) * 2) + ' − ' + krr(pr.putsning + pr.karm) + ' RUT + ' + krr(pr.avgift) + ' inställelseavgift = ' + krr(pr.total);
      data.pris_fore_rut = krr((pr.putsning + pr.karm) * 2);
    }
    var smsText = 'Hej Tommy! Förfrågan från chatten på fputs.se:\nNamn: ' + fm.namn + '\nTelefon: ' + fm.telefon + '\nAdress: ' + fm.adress + '\nÖnskad tid: ' + fm.tid + (fm.medd ? '\nMeddelande: ' + fm.medd : '') + (data.uppskattat_pris ? '\nPris: ' + data.uppskattat_pris : '');
    var namn = fm.namn.split(' ')[0];
    minne.form = null;
    fetch('/.netlify/functions/send-email', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error('send-email'); return true; })
      .then(function () {
        skriver(function () { var fore = logg.childNodes.length; bubbla('Klart, ' + namn + '! ✅ Tommy har fått din förfrågan.' + DELA + 'Han hör av sig på ' + data.telefon + ' och bekräftar tiden. Har du bråttom kan du ringa honom på ' + TEL_TEXT + '.' + DELA + 'Tack för att du valde Forsbergs! 💙', 'jag'); visaVal(['Hur går det till?']); delaUpp(fore); logg.scrollTop = logg.scrollHeight; }, 900);
        if (window.gtag) { window.gtag('event', 'generate_lead', { event_category: 'contact', event_label: 'Kundservice-chatten' }); window.gtag('event', 'conversion', { send_to: 'AW-18225187055/j67gCPv6hOscEO-RufJD' }); }
      })
      .catch(function () {
        skriver(function () { var b = bubbla('Hoppsan – förfrågan gick inte att skicka just nu. 😕 Inget har försvunnit: tryck här under så öppnas ett SMS till Tommy med allt ifyllt. Eller ring ' + TEL_TEXT + '.', 'jag'); lank(b, 'Skicka som SMS i stället', 'sms:+46793463964?&body=' + encodeURIComponent(smsText)); lank(b, 'Ring ' + TEL_TEXT, 'tel:+46793463964'); logg.scrollTop = logg.scrollHeight; }, 700);
      });
    return formObj('Skickar till Tommy… 📨');
  }

  // ================= Priskalkylatorn i chatten (Tommy 2026-11-19) =================
  // Samma priser och samma uträkning som bokningen (js/boka-ny.js, TIDER.md).
  // ÄNDRAS PRISERNA DÄR MÅSTE DE ÄNDRAS HÄR OCKSÅ. Boten hittar aldrig på egna priser.
  var K = {
    MIN_PRIS: 750, TIMPRIS_15: 699, INGAR_FONSTER: 14, HOGA_MIN: 10, KARM_ANDEL: 0.15, AVGIFT: 30,
    LGH: { '1:a': 475, '2:a': 500, '3:a': 525, '4:a': 550, '5:a': 575 },
    LGH_BALK: { golv: 40, tak: 20 },
    BALKONG: { helt: { namn: 'Balkong golv till tak', kr: 40 }, racke: { namn: 'Glasräcke, räcke till tak', kr: 20 }, altan: { namn: 'Altanräcke i glas', kr: 30 } },
    SPROJS_MIN: { 2: 16 / 3, 3: 20 / 3, 4: 8, 6: 32 / 3, 8: 40 / 3 },
    PANORAMA: { liten: { text: 'ca 1 × 2 m', min: 4 }, mellan: { text: 'ca 2 × 2,5 m', min: 8 }, stor: { text: 'större än 2 × 2,5 m', min: 12 } },
    RUM: { UT: { namn: 'Uterum', tak: 80, golv: 40, tri: 20 }, VH: { namn: 'Växthus', tak: 90, golv: 50, tri: 30 } },
    TYP: {
      L1: { namn: '1-luftsfönster', min: [2, 4] }, L2: { namn: '2-luftsfönster', min: [4, 8] },
      S: { namn: 'fönster med spröjs' }, P: { namn: 'panoramafönster' },
      O: { namn: 'överliggande fönster', min: [4.5, 10] }, U: { namn: 'underliggande fönster', min: [3, 10] },
      B: { namn: 'balkong/altanräcke' }, UT: { namn: 'uterum' }, VH: { namn: 'växthus' }
    }
  };
  function krr(n) { return n.toLocaleString('sv-SE') + ' kr'; }
  function kalkTidsPris(minuter) {
    if (minuter <= 0) return 0;
    var m = Math.max(90, Math.ceil(Math.round(minuter) / 5) * 5);
    return Math.ceil(K.TIMPRIS_15 * m / 90 / 10) * 10 - 1;
  }
  function kalkRakna(k) {
    if (k.bostad === 'lgh') {
      var pl = K.LGH[k.lgh] + k.lghGolv * K.LGH_BALK.golv + k.lghTak * K.LGH_BALK.tak;
      return { antal: 0, putsning: pl, karm: 0, avgift: K.AVGIFT, total: pl + K.AVGIFT };
    }
    var antal = 0, minuter = 0;
    k.rader.forEach(function (r) {
      var fyra = r.typ !== 'P' && (k.utat || r.sidor === 4);
      var min = r.typ === 'S' ? K.SPROJS_MIN[r.rutor] * (fyra ? 2 : 1) : r.typ === 'P' ? K.PANORAMA[r.storlek].min : K.TYP[r.typ].min[fyra ? 1 : 0];
      antal += r.antal; minuter += r.antal * min;
    });
    var hus = 0;
    if (antal > 0) {
      var extra = antal > K.INGAR_FONSTER ? minuter * (antal - K.INGAR_FONSTER) / antal * K.TIMPRIS_15 / 90 : 0;
      var fonsterPris = extra > 0 ? Math.ceil((K.TIMPRIS_15 + extra) / 10) * 10 - 1 : K.TIMPRIS_15;
      hus = Math.max(fonsterPris, kalkTidsPris(minuter + (k.hoga ? K.HOGA_MIN : 0)));
    }
    var glas = k.glas.reduce(function (s, g) { return s + g.antal * g.kr; }, 0);
    var putsning = hus + glas > 0 ? Math.max(hus + glas, K.MIN_PRIS) : 0;
    var karm = k.karm ? Math.round(putsning * K.KARM_ANDEL) : 0;
    var avgift = putsning ? K.AVGIFT : 0;
    return { antal: antal, putsning: putsning, karm: karm, avgift: avgift, total: putsning + karm + avgift, minPris: putsning === K.MIN_PRIS };
  }

  var KALK_START = ['vad kostar', 'vad skulle det kosta', 'kostar det', 'hur mycket kostar', 'räkna pris', 'räkna ut pris', 'räkna ut priset', 'räkna ut mitt pris', 'räkna mitt pris', 'uppskatta', 'ungefärligt pris', 'ungefär pris', 'ungefär vad', 'vad blir priset', 'prisförslag', 'se pris', 'visa pris', 'se priset', 'vad tar ni', 'pris på', 'priset för', 'priset på', 'kalkyl', 'prisräkn', 'få pris', 'ge mig ett pris', 'vad landar', 'vad hamnar'];
  var KALK_INTE = /avbok|omboka|faktura|parkering|garanti|regn|abonnemang|karmtvätt|stege|reklam|klag/;
  var TALORD = { noll: 0, inga: 0, inget: 0, ingen: 0, en: 1, ett: 1, två: 2, tre: 3, fyra: 4, fem: 5, sex: 6, sju: 7, åtta: 8, nio: 9, tio: 10, elva: 11, tolv: 12, tretton: 13, fjorton: 14, femton: 15, sexton: 16, sjutton: 17, arton: 18, nitton: 19, tjugo: 20, trettio: 30, fyrtio: 40 };
  function kalkTal(s) {
    var m = s.match(/\d+/);
    if (m) return Number(m[0]);
    var w = s.trim().split(' ');
    for (var i = 0; i < w.length; i++) if (TALORD[w[i]] !== undefined) return TALORD[w[i]];
    return null;
  }
  function kalkBostad(s) {
    if (/villa|radhus|parhus|kedjehus| hus /.test(s)) return 'villa';
    if (/lägenhet|bostadsrätt|hyresrätt| lägga /.test(s)) return 'lgh';
    if (/större fastighet|flerfamilj|hyreshus| brf /.test(s)) return 'stor';
    if (/företag|kontor|butik|lokal/.test(s)) return 'foretag';
    if (/solcell|solpanel/.test(s)) return 'sol';
    return '';
  }
  function kalkTyp(s) {
    if (/spröjs|småspröjs|små rutor/.test(s)) return 'S';
    if (/panorama|fast glas|stort glas|stora glas|fönsterparti/.test(s)) return 'P';
    if (/överligg|överljus/.test(s)) return 'O';
    if (/underligg/.test(s)) return 'U';
    if (/balkong|altan|glasräcke|räcke/.test(s)) return 'B';
    if (/uterum/.test(s)) return 'UT';
    if (/växthus/.test(s)) return 'VH';
    if (/(2|två) ?-? ?luft|tvåluft|(2|två) bågar|tvålufts/.test(s)) return 'L2';
    if (/(1|en|ett) ?-? ?luft|enluft|(1|en) båge|enlufts/.test(s)) return 'L1';
    if (/vet inte|osäker|ingen aning|vet ej|hjälp/.test(s)) return 'VET';
    if (/klar|det var allt|inget mer|inga fler| nej |visa pris|visa priset|färdig|räkna nu|^ nä /.test(s)) return 'KLAR';
    return '';
  }

  // Humor – många varianter så det inte låter likadant
  var K_SKAMT = {
    villa: ['Villa! 🏡 Mina sensorer gillar redan det här.', 'En villa! Nu snackar vi riktigt uppdrag. 💪', 'Villa, check! ✅ Kalkylatorn värmer upp.'],
    lgh: ['Lägenhet! 🏢 Det går snabbt – två frågor, sen har du priset.', 'Lägenhet, smidigt! Det här blir den snabbaste kalkylen i världshistorien. Typ.'],
    nasta: ['Inlagt! ✅', 'Noterat i min högteknologiska anteckningsbok. 📒', 'Check! ✔️', 'Inräknat – mina kretsar hänger med! 🤖', 'Sparat! Tommy hade varit stolt över den här räkningen.'],
    merFraga: ['Något mer? Välj nästa sort, eller tryck Klar så trollar jag fram priset.', 'Finns det fler glas som väntar på kärlek? Annars: Klar!', 'Fler fönster, eller ska vi se vad det landar på?'],
    intro: ['🥁 Trumvirvel... kalkylen är klar!', 'BEEP BOOP – räknat och klart! 🤖', 'Mina kretsar har räknat så de ångar. Här är det:', 'Siffrorna är putsade och klara! ✨'],
    outro: ['Och du slipper stå på stegen själv. 🪜', 'Tänk på alla ränder du slipper. ✨', 'Rena fönster, bättre humör. Vetenskapligt bevisat av mig, just nu.', 'Solen kommer tacka dig. ☀️'],
    miss: ['Hoppsan, det där fattade inte min kalkylator. 🧮', 'Mina kugghjul snurrade fel håll där.', 'Det svaret fanns inte i min manual. 🤖', 'Kalkylatorn kliade sig i huvudet.'],
    avbryt: ['Kalkylatorn går och lägger sig. 🧮💤 Skriv "vad kostar" när du vill räkna igen.', 'Okej, räkningen avbruten! Jag sparar inget. Skriv "vad kostar" om du ångrar dig.']
  };
  function antalSkamt(n) {
    if (n === 1) return valjFran(['Ett ensamt fönster – det får extra kärlek. 🥹', 'Ett fönster! Litet men naggande gott.']);
    if (n <= 5) return valjFran(['Lagom! Det hinner Tommy innan kaffet kallnat. ☕', 'Smidigt antal!', 'Fint, det blir en snabb sväng.']);
    if (n <= 15) return valjFran(['Nu börjar det likna ett riktigt uppdrag! 💪', 'Snyggt, ett ordentligt gäng glas!', 'Det är så här jag gillar det!']);
    if (n <= 30) return valjFran(['Oj! Bor du i ett glashus? 😳', 'Det där är ett fönsterpaket av rang! 🔥', 'Wow. Mina sensorer blinkar extra nu.']);
    return valjFran(['Okej, är det ett slott?! 🏰', n + ' stycken?! Jag behöver sätta mig ner. Fast jag har inga ben.', 'Det är fler fönster än jag har kretsar! 😳']);
  }

  function kalkNy(bostad) { return { steg: 'bostad', bostad: bostad || '', rader: [], glas: [], nu: null, utat: false, hoga: false, fasta: false, karm: null, lgh: '', lghGolv: 0, lghTak: 0, miss: 0, paus: false, forst: true }; }
  function kalkSvarObj(text, val) { return { special: true, stilla: true, kalk: true, avsikt: 'kalkyl', vantar: '', text: text, val: val }; }
  var TYP_VAL = ['1-luft (1 båge)', '2-luft (2 bågar)', 'Med spröjs', 'Panoramafönster', 'Överliggande', 'Underliggande', 'Balkong/altan', 'Uterum', 'Växthus', 'Vet inte'];

  // Frågan för steget kalkylen står på
  function kalkFraga(k, prefix) {
    var p = prefix ? prefix + DELA : '', r = k.nu;
    switch (k.steg) {
      case 'bostad': return kalkSvarObj(p + 'Vad ska putsas?', ['Villa/radhus', 'Lägenhet', 'Företag', 'Solcellstvätt']);
      case 'lgh': return kalkSvarObj(p + 'Hur stor är lägenheten?', ['1:a', '2:a', '3:a', '4:a', '5:a']);
      case 'lghBalk': return kalkSvarObj(p + (k.lghGolv || k.lghTak ? 'Något mer balkongglas?' : 'Har du inglasad balkong som ska putsas?'), [k.lghGolv || k.lghTak ? 'Nej, visa priset' : 'Nej', 'Golv till tak', 'Räcke till tak']);
      case 'lghBalkAntal': return kalkSvarObj(p + 'Hur många glas (' + (k.lghSort === 'golv' ? 'golv till tak, 40 kr/glas' : 'räcke till tak, 20 kr/glas') + ')?');
      case 'typ': return kalkSvarObj(p + (k.rader.length || k.glas.length ? valjFran(K_SKAMT.merFraga) : 'Vilken sorts fönster har du? Börja med den vanligaste sorten.\n\nÄr du osäker – tryck "Vet inte" så hjälper jag dig.'), (k.rader.length || k.glas.length ? ['Klar – visa priset'] : []).concat(TYP_VAL));
      case 'det': return kalkSvarObj(p + '🕵️ Fönsterdetektiven kliver in! Titta på fönstret: hur många delar går att öppna?', ['En del', 'Två delar', 'Inget – stort fast glas', 'Det har spröjs (små rutor)']);
      case 'antal': return kalkSvarObj(p + 'Hur många ' + K.TYP[r.typ].namn + ' har du?');
      case 'sidor': return kalkSvarObj(p + 'Hur många sidor ska putsas på dina ' + K.TYP[r.typ].namn + '? 2 sidor = in- och utsida. 4 sidor = bågarna går att öppna isär och det finns glas emellan.', ['2 sidor', '4 sidor', 'Vet inte']);
      case 'rutor': return kalkSvarObj(p + 'Hur många små rutor är det per båge (delen som går att öppna)?', ['2', '3', '4', '6', '8', 'Vet inte']);
      case 'storlek': return kalkSvarObj(p + 'Ungefär hur stora är panoramaglasen?', ['ca 1 × 2 m', 'ca 2 × 2,5 m', 'Större än 2 × 2,5 m']);
      case 'balkSort': return kalkSvarObj(p + 'Vilken sort är det?', ['Golv till tak (40 kr/glas)', 'Räcke till tak (20 kr/glas)', 'Altanräcke (30 kr/glas)']);
      case 'balkAntal': return kalkSvarObj(p + 'Hur många glas?');
      case 'rumtak': return kalkSvarObj(p + 'Hur många takglas har ' + (r.typ === 'UT' ? 'uterummet' : 'växthuset') + '? (' + K.RUM[r.typ].tak + ' kr/glas)', ['Inga']);
      case 'rumgolv': return kalkSvarObj(p + 'Hur många glas från golv till tak? (' + K.RUM[r.typ].golv + ' kr/glas)', ['Inga']);
      case 'rumtri': return kalkSvarObj(p + 'Och små fönster och trianglar? (' + K.RUM[r.typ].tri + ' kr/glas)', ['Inga']);
      case 'special': return kalkSvarObj(p + (k.utat || k.hoga || k.fasta ? 'Något mer speciellt?' : 'Har du några specialfönster?'), [k.utat || k.hoga || k.fasta ? 'Nej, det var allt' : 'Nej, vanliga fönster'].concat(k.utat ? [] : ['Öppnas utåt']).concat(k.hoga ? [] : ['Svåra att nå (stege)']).concat(k.fasta ? [] : ['Går inte att öppna']));
      case 'karm': return kalkSvarObj(p + 'Sista frågan! Vill du ha karmtvätt också? Rena karmar och bågar, +15 %.', ['Ja, gärna', 'Nej tack']);
    }
    return null;
  }

  function kalkResultat(k) {
    var pr = kalkRakna(k), rader = [];
    if (k.bostad === 'lgh') {
      rader.push('Lägenhet ' + k.lgh + ': ' + krr(K.LGH[k.lgh]));
      if (k.lghGolv) rader.push('Balkong golv till tak, ' + k.lghGolv + ' glas: ' + krr(k.lghGolv * K.LGH_BALK.golv));
      if (k.lghTak) rader.push('Balkong räcke till tak, ' + k.lghTak + ' glas: ' + krr(k.lghTak * K.LGH_BALK.tak));
    } else {
      k.rader.forEach(function (r) {
        var x = r.typ === 'S' ? ' (' + r.rutor + ' rutor)' : r.typ === 'P' ? ' (' + K.PANORAMA[r.storlek].text + ')' : '';
        rader.push(r.antal + ' st ' + K.TYP[r.typ].namn + x + (r.typ === 'P' ? '' : ', ' + (k.utat ? 4 : r.sidor) + ' sidor'));
      });
      k.glas.forEach(function (g) { rader.push(g.namn + ', ' + g.antal + ' glas: ' + krr(g.antal * g.kr)); });
      var sp = [];
      if (k.utat) sp.push('öppnas utåt'); if (k.hoga) sp.push('svåra att nå'); if (k.fasta) sp.push('går inte att öppna');
      if (sp.length) rader.push('Specialfönster: ' + sp.join(', '));
    }
    var text = (minne.namn ? 'Här kommer det, ' + minne.namn + '! ' : '') + valjFran(K_SKAMT.intro) + DELA + rader.join('\n') + '\n\n' +
      'Fönsterputs (före RUT): ' + krr(pr.putsning * 2) + '\n' +
      (pr.karm ? 'Karmtvätt (före RUT): ' + krr(pr.karm * 2) + '\n' : '') +
      'RUT-avdrag 50 %: −' + krr(pr.putsning + pr.karm) + '\n' +
      'Inställelseavgift (ej RUT): ' + krr(pr.avgift) + '\n' +
      'Totalt efter RUT: ' + krr(pr.total) + DELA +
      (k.bostad !== 'lgh' && pr.minPris ? 'Lägsta pris för villa är ' + krr(K.MIN_PRIS) + ' efter RUT. ' : '') +
      (k.rader.some(function (r) { return r.typ === 'S'; }) ? 'Spröjsade fönster räknar Tommy gärna på innan du får ett fast pris. ' : '') +
      'Det här är en uppskattning – väljer du samma sak i bokningen får du ett fast pris. ' + (minne.ort ? 'Rena fönster i ' + minne.ort + ' snart! ✨' : valjFran(K_SKAMT.outro)) +
      DELA + 'Vill du ha svar snabbast? Jag kan ta dina uppgifter och skicka allt direkt till Tommy – tryck "Skicka förfrågan till Tommy". 📨';
    k.steg = 'klar';
    k.sammanfattning = rader;
    var o = kalkSvarObj(text, ['Skicka förfrågan till Tommy', 'Föreslå en tid', 'Lägg till mer', 'Räkna om från början']);
    o.knapp = ['Boka med det här priset', k.bostad === 'lgh' ? '/boka#lagenhet' : '/boka#fonster'];
    // SMS till Tommy med kalkylen och priset ifyllt – kunden skickar från sin egen telefon (Tommy 2026-11-19)
    var sms = 'Hej Tommy! Jag räknade ut mitt pris i chatten på fputs.se:\n' + rader.join('\n') +
      (pr.karm ? '\nKarmtvätt: ja' : '') +
      '\nTotalt efter RUT: ' + krr(pr.total) + ' (inkl. inställelseavgift ' + krr(pr.avgift) + ')' +
      '\n\nJag vill boka till det priset.' + (minne.ort ? '\nOrt: ' + minne.ort : '') + '\nAdress: \nÖnskad tid: ' + (minne.namn ? '\n/' + minne.namn : '');
    o.knapp2 = ['Skicka till Tommy som SMS', 'sms:+46793463964?&body=' + encodeURIComponent(sms)];
    return o;
  }

  // Raden (fönstertypen) är klar – tillbaka till "något mer?"
  function radKlar(k, prefix) {
    var r = k.nu;
    if (r.typ === 'B') k.glas.push({ namn: K.BALKONG[r.sort].namn, antal: r.antal, kr: K.BALKONG[r.sort].kr });
    else if (r.typ === 'UT' || r.typ === 'VH') {
      var rum = K.RUM[r.typ];
      if (r.tak) k.glas.push({ namn: rum.namn + ': takglas', antal: r.tak, kr: rum.tak });
      if (r.golv) k.glas.push({ namn: rum.namn + ': golv till tak', antal: r.golv, kr: rum.golv });
      if (r.tri) k.glas.push({ namn: rum.namn + ': små fönster och trianglar', antal: r.tri, kr: rum.tri });
    } else if (r.antal) k.rader.push(r);
    k.nu = null; k.steg = 'typ';
    return kalkFraga(k, (prefix ? prefix + ' ' : '') + valjFran(K_SKAMT.nasta));
  }
  // Efter en vald fönstertyp: vad behöver vi veta härnäst?
  function nastaForTyp(k, prefix) {
    var r = k.nu;
    if (r.typ === 'B') { k.steg = 'balkSort'; return kalkFraga(k, prefix); }
    if (r.typ === 'UT' || r.typ === 'VH') { k.steg = 'rumtak'; return kalkFraga(k, prefix); }
    if (r.antal === null) { k.steg = 'antal'; return kalkFraga(k, prefix); }
    if (r.typ === 'S' && !r.rutor) { k.steg = 'rutor'; return kalkFraga(k, prefix); }
    if (r.typ === 'P') { if (!r.storlek) { k.steg = 'storlek'; return kalkFraga(k, prefix); } return radKlar(k, prefix); }
    if (!r.sidor) { k.steg = 'sidor'; return kalkFraga(k, prefix); }
    return radKlar(k, prefix);
  }
  function valjTyp(k, typ, s, prefix) {
    k.nu = { typ: typ, antal: null, sidor: 0, rutor: 0, storlek: '' };
    // "8 st 2-luft": antalet står redan i meddelandet (men inte siffran i "2-luft")
    // "4 sidor" och "4 rutor" är inte antal fönster – de sparas som sidor/rutor i stället
    var sid = s.match(/ ([24]|två|fyra) sidor/), rut = s.match(/ ([2-8]) rutor/);
    if (sid && typ !== 'P' && typ !== 'B' && typ !== 'UT' && typ !== 'VH') k.nu.sidor = /4|fyra/.test(sid[1]) ? 4 : 2;
    if (rut && typ === 'S' && K.SPROJS_MIN[rut[1]]) k.nu.rutor = Number(rut[1]);
    var m = s.replace(/(1|2|en|ett|två) ?-? ?luft\S*|(1|2|en|två) bågar?|([24]|två|fyra) sidor|\d+ rutor/g, ' ').match(/\d+/);
    if (m && typ !== 'B' && typ !== 'UT' && typ !== 'VH' && Number(m[0]) > 0 && Number(m[0]) < 100) k.nu.antal = Number(m[0]);
    return nastaForTyp(k, prefix);
  }
  function kalkSlut(k) {
    if (kalkRakna(k).antal > 0) { k.steg = 'special'; return kalkFraga(k, 'Snart klart! 🔥'); }
    k.steg = 'karm'; return kalkFraga(k, 'Snart klart! 🔥');
  }

  function kalkStart(s) {
    var b = kalkBostad(s) || (minne.fakta && minne.fakta.bostad === 'villa' ? 'villa' : minne.fakta && minne.fakta.bostad === 'lägenhet' ? 'lgh' : '');
    var k = minne.kalk = kalkNy();
    var intro = 'Jag räknar gärna ut ett pris åt dig! 🧮' + DELA + 'En lägenhet kostar från 475 kr och en villa från 750 kr efter RUT, plus 30 kr inställelseavgift. Svara på några enkla frågor så får du ditt eget pris. Det kostar inget och du binder dig inte till något.';
    var o = b ? kalkSvar({ villa: 'villa', lgh: 'lägenhet', foretag: 'företag', sol: 'solcell', stor: 'större fastighet' }[b], b === 'villa' || b === 'lgh' ? 'Det räknar jag ut åt dig direkt! 🧮' : '') : kalkFraga(k, intro);
    // Vill kunden hellre räkna själv: länk direkt till bokningen (Tommy 2026-11-19)
    if (o && !o.knapp) o.knapp = ['Eller räkna själv i bokningen', b === 'lgh' ? '/boka#lagenhet' : b === 'villa' ? '/boka#fonster' : '/boka'];
    return o;
  }

  // Tolkar kundens svar i det steg kalkylen står på. null = förstod inte.
  function kalkSvar(tt, prefix) {
    var k = minne.kalk, s = ' ' + tt.trim() + ' ', n, b, r = k.nu, pre = prefix ? prefix + DELA : '';
    if (/^ (avbryt|sluta|stopp|stop|glöm det|skit samma|avsluta) /.test(s)) { minne.kalk = null; return kalkSvarObj(valjFran(K_SKAMT.avbryt)); }
    if (/fortsätt prisräkningen|fortsätt räkna/.test(s)) { k.paus = false; return kalkFraga(k, 'Där var vi! 🧮'); }
    if (/räkna om|börja om/.test(s)) { minne.kalk = kalkNy(); return kalkFraga(minne.kalk, 'Nytt blad! 📄'); }
    // Kunden rättar boten: "har ju inte sagt hur många", "fel antal", "det stämmer inte" (Tommy 2026-11-19)
    if (/(inte|ej|aldrig) sagt|fel antal|ändra antal|ändra det|det (var|blev) fel|stämmer inte|räknade fel|missförst|du tog fel|blev fel|inte rätt/.test(s)) {
      var rr = k.nu || (k.rader.length ? k.rader.pop() : null);
      if (rr && rr.typ !== 'B' && rr.typ !== 'UT' && rr.typ !== 'VH') {
        k.nu = rr; rr.antal = null; k.steg = 'antal';
        return kalkFraga(k, valjFran(['Oj, mitt fel! 🙈 Där gick jag för fort fram.', 'Aj, du har rätt – jag gissade. Det ska jag inte göra. 😅', 'Hoppsan! Mina kretsar var lite för ivriga där. 🤖']) + DELA + 'Vi tar det igen.');
      }
      return kalkFraga(k, 'Oj, mitt fel! 🙈 Vi tar det härifrån.');
    }
    switch (k.steg) {
      case 'bostad':
        b = kalkBostad(s);
        if (b === 'villa') { k.bostad = 'villa'; k.steg = 'typ'; return kalkFraga(k, pre + valjFran(K_SKAMT.villa)); }
        if (b === 'lgh') { k.bostad = 'lgh'; k.steg = 'lgh'; return kalkFraga(k, pre + valjFran(K_SKAMT.lgh)); }
        if (b === 'sol') { minne.kalk = null; var o1 = kalkSvarObj(pre + 'Solcellstvätt! ☀️ Där räknar Tommy fram ett fast pris själv, eftersom tak och paneler är så olika. Skicka antal paneler och adress så får du pris samma dag.'); o1.knapp = ['Få offert', '/kontakta-mig?typ=Solcellstv%C3%A4tt#formular']; return o1; }
        if (b === 'foretag' || b === 'stor') { minne.kalk = null; var o2 = kalkSvarObj(pre + (b === 'stor' ? 'Större fastighet' : 'Företag') + '! 💼 Där finns inget färdigt pris i kalkylen – Tommy tar fram ett fast pris åt dig, oftast samma dag.'); o2.knapp = ['Begär offert', '/kontakta-mig#formular']; return o2; }
        return null;
      case 'lgh':
        var lm = s.match(/ ([1-5]) ?(a|rum|rok|or|:a) /) || s.match(/ ([1-5]) /);
        var lo = { etta: 1, tvåa: 2, trea: 3, fyra: 4, femma: 5 };
        var ln = lm ? Number(lm[1]) : 0;
        Object.keys(lo).forEach(function (w) { if (s.indexOf(' ' + w + ' ') >= 0) ln = lo[w]; });
        if (!ln) { if (/större|6|7|8|sexa/.test(s)) { minne.kalk = null; var o3 = kalkSvarObj('Större än en 5:a – snyggt! 🏢 Den räknar Tommy gärna på själv så att priset blir rätt.'); o3.knapp = ['Begär offert', '/kontakta-mig#formular']; return o3; } return null; }
        k.lgh = ln + ':a'; k.steg = 'lghBalk';
        return kalkFraga(k, pre + valjFran(['En ' + k.lgh + '! Fint.', k.lgh + ', noterat! ✅', 'En ' + k.lgh + ' – mysigt!']));
      case 'lghBalk':
        if (/räcke/.test(s)) { k.lghSort = 'tak'; k.steg = 'lghBalkAntal'; return kalkFraga(k); }
        if (/golv|helt|inglasad/.test(s)) { k.lghSort = 'golv'; k.steg = 'lghBalkAntal'; return kalkFraga(k); }
        if (/ ja | japp | jo | yes /.test(s)) return kalkSvarObj('Toppen! Vilken sort – glas från golv till tak, eller ett glasräcke med glas upp till taket?', ['Golv till tak', 'Räcke till tak']);
        if (/ nej | nä | ingen | inga | nope | visa | klar | det var allt /.test(s)) return kalkResultat(k);
        return null;
      case 'lghBalkAntal':
        n = kalkTal(s); if (n === null || n > 80) return null;
        if (k.lghSort === 'golv') k.lghGolv += n; else k.lghTak += n;
        k.steg = 'lghBalk';
        return kalkFraga(k, n ? valjFran(K_SKAMT.nasta) : 'Inga glas, inga problem.');
      case 'typ':
        var typ = kalkTyp(s);
        if (!typ) return null;
        if (typ === 'KLAR') return k.rader.length || k.glas.length ? kalkSlut(k) : kalkFraga(k, 'Haha, vi har inte räknat några fönster än! 😄');
        if (typ === 'VET') { k.steg = 'det'; return kalkFraga(k); }
        return valjTyp(k, typ, s, pre + (k.forst ? '' : ''));
      case 'det':
        if (/spröjs|rutor/.test(s)) return valjTyp(k, 'S', '', 'Spröjs – de smala listerna som delar glaset! 🕵️');
        if (/fast|inget|stort/.test(s)) return valjTyp(k, 'P', '', 'Ett stort fast glas = panoramafönster i kalkylen. 🕵️');
        if (/ (två|2|tvåa) /.test(s)) return valjTyp(k, 'L2', '', 'Två delar = 2-luftsfönster! 🕵️ Fallet löst.');
        if (/ (en|ett|1) /.test(s)) return valjTyp(k, 'L1', '', 'En del = 1-luftsfönster! 🕵️ Elementärt.');
        if (/vet inte|osäker/.test(s)) { k.steg = 'typ'; return kalkFraga(k, 'Ingen fara – i bokningen finns bilder på alla fönstertyper. Välj det som liknar mest, så blir det nära nog här.'); }
        return null;
      case 'antal':
        // "4 sidor" / "4 rutor" när boten frågar antal: spara det, fråga antalet igen
        var sd = s.match(/ ([24]|två|fyra) sidor/), rt = s.match(/ ([2-8]) rutor/);
        if ((sd && r.typ !== 'P') || (rt && r.typ === 'S' && K.SPROJS_MIN[rt[1]])) {
          if (sd) r.sidor = /4|fyra/.test(sd[1]) ? 4 : 2;
          if (rt) r.rutor = Number(rt[1]);
          var notis = (sd ? r.sidor + ' sidor' : '') + (sd && rt ? ' och ' : '') + (rt ? r.rutor + ' rutor' : '');
          var o5 = kalkSvarObj(notis + ', noterat! ✍️' + DELA + 'Men hur många ' + K.TYP[r.typ].namn + ' är det?');
          return o5;
        }
        n = kalkTal(s); if (n === null) return null;
        if (n === 0) { k.nu = null; k.steg = 'typ'; return kalkFraga(k, 'Noll? Då hoppar vi över dem. 😄'); }
        if (n > 99) { minne.kalk = null; var o4 = kalkSvarObj(n + ' stycken?! 😳 Det är ett riktigt storjobb – det räknar Tommy på själv.'); o4.knapp = ['Begär offert', '/kontakta-mig#formular']; return o4; }
        r.antal = n;
        return nastaForTyp(k, antalSkamt(n));
      case 'sidor':
        if (/ 4 | fyra | dubbel| emellan | mellan /.test(s)) { r.sidor = 4; return nastaForTyp(k, '4 sidor – nu blir det grundligt! 🧽'); }
        if (/ 2 | två | enkel| in och ut | in- och ut/.test(s)) { r.sidor = 2; return nastaForTyp(k); }
        if (/vet inte|osäker|ingen aning/.test(s)) return kalkSvarObj('Testa så här: öppna fönstret. Går bågen att vika isär så du ser två glas med luft emellan? Då är det 4 sidor. Är det bara ett glas (eller en tät glasruta) är det 2 sidor.', ['2 sidor', '4 sidor']);
        return null;
      case 'rutor':
        n = kalkTal(s);
        if (n !== null && K.SPROJS_MIN[n]) { r.rutor = n; return nastaForTyp(k, n >= 6 ? n + ' rutor per båge – det är många små glas att älska! 😅' : ''); }
        if (/vet inte|osäker/.test(s)) return kalkSvarObj('Räkna de små rutorna i EN båge – alltså delen som går att öppna. Jag räknar med 2, 3, 4, 6 eller 8.', ['2', '3', '4', '6', '8']);
        if (n !== null) return kalkSvarObj(n + ' rutor finns inte i kalkylen. Välj det som ligger närmast: 2, 3, 4, 6 eller 8.', ['2', '3', '4', '6', '8']);
        return null;
      case 'storlek':
        if (/större|stora|jättestor/.test(s)) r.storlek = 'stor';
        else if (/2 ?[x×] ?2|mellan/.test(s)) r.storlek = 'mellan';
        else if (/1 ?[x×] ?2|liten|litet|små|mindre/.test(s)) r.storlek = 'liten';
        else return null;
        return nastaForTyp(k, r.storlek === 'stor' ? 'Rejäla glas! 🪟' : '');
      case 'balkSort':
        if (/altan/.test(s)) r.sort = 'altan';
        else if (/golv|helt|inglasad/.test(s)) r.sort = 'helt';
        else if (/räcke/.test(s)) r.sort = 'racke';
        else return null;
        k.steg = 'balkAntal'; return kalkFraga(k);
      case 'balkAntal':
        n = kalkTal(s); if (n === null || n > 99) return null;
        r.antal = n; return radKlar(k, n ? antalSkamt(n) : '');
      case 'rumtak': case 'rumgolv': case 'rumtri':
        n = kalkTal(s); if (n === null || n > 99) return null;
        r[k.steg.slice(3)] = n;
        if (k.steg === 'rumtak') { k.steg = 'rumgolv'; return kalkFraga(k, n ? 'Takglas – där krävs balans! 🤸' : ''); }
        if (k.steg === 'rumgolv') { k.steg = 'rumtri'; return kalkFraga(k); }
        return radKlar(k, 'Glashuset är inräknat! 🌿');
      case 'special':
        if (/utåt/.test(s)) { k.utat = true; return kalkFraga(k, 'Utåtgående – de luriga! Då räknar jag alla sidor. 🧠'); }
        if (/går inte|fasta|fast /.test(s)) { k.fasta = true; return kalkFraga(k, 'Noterat! Det påverkar inte kalkylen, men Tommy vill gärna veta.'); }
        if (/svår|stege|högt|höga| nå /.test(s)) { k.hoga = true; return kalkFraga(k, 'Inga problem – där tar Tommy fram teleskopstången. Lite extra tid läggs på.'); }
        if (/ nej | nä | inga | inget | vanliga | det var allt | klar /.test(s)) { k.steg = 'karm'; return kalkFraga(k); }
        return null;
      case 'karm':
        if (/ ja | gärna | japp | jo | yes | absolut | kör /.test(s)) { k.karm = true; return kalkResultat(k); }
        if (/ nej | nä | nope | inte /.test(s)) { k.karm = false; return kalkResultat(k); }
        return null;
      case 'klar':
        if (/lägg till|fler fönster|mer glas/.test(s)) { k.steg = k.bostad === 'lgh' ? 'lghBalk' : 'typ'; return kalkFraga(k, 'Mer glas, mer kärlek! 💙'); }
        return null;
    }
    return null;
  }
  // ================= Lediga tider i chatten (Tommy 2026-11-19) =================
  // Samma regler som bokningskalendern (js/kalender.js) – ÄNDRAS REGLERNA DÄR MÅSTE DE ÄNDRAS HÄR OCKSÅ.
  // Upptaget hämtas från /api/ledigt (Google Kalender, bara ledig/upptagen – inget innehåll).
  var T = {
    ARBETSHELG_START: '2026-10-03', ARBETSHELG_INTERVALL: 42, DAGAR_FRAM: 60,
    VARDAG: [{ namn: 'morgon/förmiddag', text: 'start ca kl. 07–10', fran: 7, till: 10 }, { namn: 'lunch/mitt på dagen', text: 'start ca kl. 10–13', fran: 10, till: 13 }],
    HELG: [{ namn: 'förmiddag', text: 'kl. 08–12', fran: 8, till: 12 }, { namn: 'eftermiddag', text: 'kl. 12–16', fran: 12, till: 16 }]
  };
  var T_DAGAR = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];
  var T_MAN = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];
  function tPlus(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  function tIso(d) { var m = d.getMonth() + 1, g = d.getDate(); return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (g < 10 ? '0' : '') + g; }
  function tNr(d) { return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5; }
  var tUpptaget = null, tGoogle = false, tHamtar = false;
  function hamtaTider() {
    if (tUpptaget || tHamtar) return;
    tHamtar = true;
    var idag = new Date();
    fetch('/api/ledigt?from=' + tIso(tPlus(idag, 1)) + '&to=' + tIso(tPlus(idag, T.DAGAR_FRAM + 1)), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        tHamtar = false;
        if (!data || !data.busy) return;
        tGoogle = !!data.google;
        tUpptaget = data.busy.map(function (b) { return [Date.parse(b.start), Date.parse(b.end)]; }).filter(function (b) { return b[0] < b[1]; });
      })
      .catch(function () { tHamtar = false; });
  }
  function arbetshelg(d) {
    var start = T.ARBETSHELG_START, s = tNr(new Date(+start.slice(0, 4), +start.slice(5, 7) - 1, +start.slice(8, 10)));
    var rest = ((tNr(d) - s) % T.ARBETSHELG_INTERVALL + T.ARBETSHELG_INTERVALL) % T.ARBETSHELG_INTERVALL;
    return rest === 0 || rest === 1;
  }
  // Alla lediga tider från i morgon, i ordning: [{ dag: Date, pass: {...}, helg: bool }]
  function ledigaTider() {
    var ut = [], idag = new Date();
    for (var i = 1; i <= T.DAGAR_FRAM; i++) {
      var d = tPlus(idag, i), vd = d.getDay(), helg = vd === 0 || vd === 6;
      if (vd === 5 || (helg && arbetshelg(d))) continue;
      (helg ? T.HELG : T.VARDAG).forEach(function (p) {
        var s = new Date(d.getFullYear(), d.getMonth(), d.getDate(), p.fran).getTime(), e = new Date(d.getFullYear(), d.getMonth(), d.getDate(), p.till).getTime();
        if (!(tUpptaget || []).some(function (b) { return b[0] < e && b[1] > s; })) ut.push({ dag: d, pass: p, helg: helg, i: i });
      });
    }
    return ut;
  }
  function tDagText(t) {
    var namn = t.i === 1 ? 'i morgon (' + T_DAGAR[t.dag.getDay()] + ')' : T_DAGAR[t.dag.getDay()];
    return namn + ' ' + t.dag.getDate() + ' ' + T_MAN[t.dag.getMonth()];
  }

  var TID_START = /när kan (du|ni)|lediga tider|ledig tid|nästa lediga|första lediga|vilka tider|vilken tid|när har (du|ni) tid|har (du|ni) tid|kan (du|ni) komma|boka (en )?tid|föreslå (en )?tid|rekommendera (en )?tid|när finns|när passar|hur snabbt kan|när är (du|ni) ledig|tider/;
  var T_SKAMT = {
    intro: ['Jag har kikat i Tommys kalender! 📅', 'Kalendern är skannad – mina sensorer har talat. 📅', 'Jag smög in i kalendern (med lov). 🕵️', 'BEEP BOOP, kalendern laddad! 📅'],
    outro: ['Snabbast vinner – tiderna går åt. 😎', 'Säg vilken som passar när du bokar, så fixar Tommy resten. 🧽', 'Tider går åt fortare än smuts på ett fönster efter regn.', 'Boka, luta dig tillbaka och njut av utsikten snart. ✨']
  };
  // Önskemål ur texten: vardag/helg, förmiddag/eftermiddag, veckodag, nästa vecka
  function tOnskan(s) {
    var o = {};
    if (/helg|lördag|söndag/.test(s)) o.helg = true;
    if (/vardag/.test(s)) o.helg = false;
    var utanImorgon = s.replace(/i ?morgon/g, ' ');
    if (/morgon|förmiddag|tidigt| fm /.test(utanImorgon)) o.tid = 'fm';
    if (/eftermiddag|lunch|mitt på dagen|em /.test(s)) o.tid = 'em';
    T_DAGAR.forEach(function (d, i) { if (s.indexOf(d) >= 0) o.vd = i; });
    if (/i ?morgon/.test(s)) o.imorgon = true;
    if (/nästa vecka/.test(s)) o.nastaVecka = true;
    if (/den här veckan|denna vecka|i veckan/.test(s)) o.dennaVecka = true;
    return o;
  }
  function tidForslag(onskan, hoppa, prefix) {
    var alla = ledigaTider(), idag = new Date(), vdIdag = (idag.getDay() + 6) % 7;
    var lista = alla.filter(function (t) {
      if (onskan.helg !== undefined && t.helg !== onskan.helg) return false;
      if (onskan.vd !== undefined && t.dag.getDay() !== onskan.vd) return false;
      if (onskan.imorgon && t.i !== 1) return false;
      if (onskan.tid === 'fm' && t.pass.fran >= 10) return false;
      if (onskan.tid === 'em' && t.pass.fran < 10) return false;
      if (onskan.nastaVecka && (t.i <= 6 - vdIdag || t.i > 13 - vdIdag)) return false;
      if (onskan.dennaVecka && t.i > 6 - vdIdag) return false;
      return true;
    });
    // En tid per dag, så kunden får välja mellan olika dagar
    var sedda = {}, unika = lista.filter(function (t) { var k = tIso(t.dag); if (sedda[k]) return false; sedda[k] = true; return true; });
    var visa = unika.slice(hoppa, hoppa + 3);
    minne.tid = { onskan: onskan, hoppa: hoppa + 3 };
    var bokLank = ['Önska en tid i bokningen', minne.kalk && minne.kalk.bostad === 'lgh' ? '/boka#lagenhet' : minne.kalk && minne.kalk.bostad === 'villa' ? '/boka#fonster' : '/boka'];
    if (!visa.length) {
      if (hoppa) return { special: true, stilla: true, avsikt: 'tid', vantar: '', text: 'Det var alla lediga tider jag hittade med de önskemålen. Testa en annan dag, eller ring Tommy på ' + TEL_TEXT + '.', val: ['Första lediga tid', 'Bara vardag', 'Bara helg'], knapp: bokLank };
      // Inget passar: säg varför och föreslå det som ligger närmast i stället
      var imorgon = tPlus(idag, 1), varfor = onskan.imorgon && imorgon.getDay() === 5 ? 'I morgon är det fredag – då har Tommy stängt. 📅' : onskan.vd === 5 ? 'Fredagar har Tommy stängt. 📅' : 'Hmm, där är det fullt. 😅';
      return tidForslag({}, 0, (prefix ? prefix + ' ' : '') + varfor + ' Men här är det närmaste jag har:');
    }
    var rader = visa.map(function (t) { return '• ' + tDagText(t) + ', ' + t.pass.namn + ' (' + t.pass.text + ')'; });
    minne.tid.senaste = visa.map(function (t) { return tDagText(t) + ', ' + t.pass.namn; });
    var text = (prefix ? prefix + DELA : '') + valjFran(T_SKAMT.intro) + ' ' + (hoppa ? 'Här är fler lediga tider:' : 'De här tiderna är lediga just nu:') + '\n\n' + rader.join('\n') + DELA +
      'Den slutliga tiden bestämmer Tommy – han hör av sig och bekräftar. ' + valjFran(T_SKAMT.outro);
    return { special: true, stilla: true, avsikt: 'tid', vantar: '', text: text, val: ['Skicka förfrågan till Tommy'].concat(unika.length > hoppa + 3 ? ['Visa fler tider'] : []).concat(['Bara vardag', 'Bara helg']), knapp: bokLank };
  }
  function tidHantera(tt) {
    var s = ' ' + tt.trim() + ' ';
    if (minne.tid) {
      if (/visa fler|fler tider|andra tider|senare/.test(s)) return tidForslag(minne.tid.onskan, minne.tid.hoppa);
      var o2 = tOnskan(s);
      if (/första lediga|spelar ingen roll|när som helst|vilken som/.test(s)) return tidForslag({}, 0, 'Första bästa – smart! 🏃');
      if (/bara vardag|^ vardag /.test(s)) return tidForslag({ helg: false }, 0, 'Vardag it is! 💼');
      if (/bara helg|^ helg /.test(s)) return tidForslag({ helg: true }, 0, 'Helgputs – lyx! 🛋️');
      if (Object.keys(o2).length && tt.trim().split(' ').length <= 4) {
        var sam = Object.assign({}, minne.tid.onskan);
        // Ny dag/vecka ersätter den förra (inte "i morgon" + "nästa vecka" samtidigt)
        if (o2.vd !== undefined || o2.imorgon || o2.nastaVecka || o2.dennaVecka) ['vd', 'imorgon', 'nastaVecka', 'dennaVecka', 'helg'].forEach(function (x) { delete sam[x]; });
        Object.assign(sam, o2);
        return tidForslag(sam, 0);
      }
      minne.tid = null;
    }
    if (TID_START.test(s) && !/öppettider|ring|telefon/.test(s)) {
      if (minne.kalk && minne.kalk.steg !== 'klar') minne.kalk.paus = true;
      hamtaTider();
      return tidForslag(tOnskan(s), 0);
    }
    return null;
  }

  // Prisfråga med stavfel: "vad ksotar", "kotsar", "prsi", "kostnaden"
  var PRIS_ORD = ['kostar', 'kosta', 'kostnad', 'kostnaden', 'pris', 'priset', 'priser'];
  function prisStavfel(tt) {
    return tt.trim().split(' ').some(function (w) {
      if (w.length < 4) return false;
      return PRIS_ORD.some(function (o) {
        if (w === o) return true;
        if (w.length === o.length && w.split('').sort().join('') === o.split('').sort().join('')) return true; // bokstäver i fel ordning
        return o.length >= 5 && lev(w, o) <= 1;
      });
    });
  }
  // Körs innan vanliga svar: kalkylen tar svaret om den kan
  function kalkHantera(tt) {
    var k = minne.kalk;
    if (k && k.steg !== 'klar') {
      var svar = kalkSvar(tt);
      if (svar) { k.miss = 0; k.paus = false; return svar; }
      var ord = tt.trim().split(' ').length;
      k.miss++;
      // Kort konstigt svar = fråga igen med humor. Längre fråga = svara på den, kalkylen väntar.
      var riktig = hitta(tt, 2);
      if (!k.paus && ord <= 3 && k.miss < 3 && !(riktig && (riktig.q || riktig.allvar)) && !KUNSKAP.some(function (x) { return x.ord.test(' ' + tt.trim() + ' '); })) return kalkFraga(k, valjFran(K_SKAMT.miss));
      if (k.miss >= 3) { minne.kalk = null; return null; }
      k.paus = true;
      return null;
    }
    // Färdig kalkyl sparas resten av samtalet (förfrågan till Tommy behöver priset)
    if (k && k.steg === 'klar') { var s2 = kalkSvar(tt); if (s2) return s2; }
    if ((KALK_START.some(function (o) { return tt.indexOf(o) >= 0; }) || prisStavfel(tt)) && !KALK_INTE.test(tt)) return kalkStart(' ' + tt + ' ');
    return null;
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
    if (FORM_START.test(' ' + tt.trim() + ' ')) return formStart();
    var hs = hjalpSvar(' ' + tt.trim() + ' '); if (hs) { if (minne.kalk && minne.kalk.steg !== 'klar') minne.kalk.paus = true; return hs; }
    var ps = personSvar(tt); if (ps) { if (minne.kalk && minne.kalk.steg !== 'klar') minne.kalk.paus = true; return ps; }
    var th = tidHantera(tt); if (th) return th;
    var kh = kalkHantera(tt); if (kh) return kh;
    var ks = kunskapSvar(' ' + tt.trim() + ' '); if (ks) return ks;
    if (minne.vantarPa === 'fonstertyp' && /vet inte|osäker/.test(tt)) return startaDetektiv(tt);
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

  // Köpresa: ny, utforskar, overvager, redo, personlig, avstar – byts efter hela samtalet, inte ett ord
  var AVSLUT = ['Nu har vi faktiskt kommit riktigt långt! Ska vi kika på ett pris?', 'Det här är precis typen av uppdrag vi kan hjälpa till med. Vill du gå vidare?', 'Jag kan fortsätta prata om fönster hela dagen, men bokningssystemet gör det lite snabbare. 😎', 'Tommy har byggt en bokning där du väljer dina fönster direkt med bilder. Vill du testa?'];
  function noteraFakta(t) {
    minne.fakta = minne.fakta || {};
    if (/villa|radhus|parhus/.test(t)) minne.fakta.bostad = 'villa';
    else if (/lägenhet|bostadsrätt|hyresrätt/.test(t)) minne.fakta.bostad = 'lägenhet';
    else if (/ företag|kontor|butik|lokal/.test(t)) minne.fakta.bostad = 'företag';
    var m = t.match(/(\d+) ?(st )?fönster/) || (minne.vantarPa === 'antal' && t.match(/^ ?(\d+) ?$/));
    if (m && !minne.tema) minne.fakta.antal = Number(m[1]);
  }
  function uppdateraResa(t, f, niva, typ) {
    var r = minne.resaPoang = minne.resaPoang || { intresse: 0, tvek: 0, nej: 0, komplex: 0 };
    if (niva >= 1) r.intresse++;
    if (typ === 'tvek' || /dyrt|dyra|fundera|konkurrent|billigare|jämför/.test(t)) r.tvek++;
    if (typ === 'nej' || (f && (f.slutaSalja || f.stilla && /nej|aldrig|vill inte/.test(t)))) r.nej++;
    if (/större fastighet|brf|hyreshus|slott|komplicerat|stort uppdrag|solcell|företag/.test(t) || (minne.fakta && minne.fakta.antal >= 50)) r.komplex++;
    if (niva >= 2 && r.nej) r.nej = 0; // kunden frågar själv igen = välkommen tillbaka, men ingen säljpress
    minne.resa = r.nej ? 'avstar' : niva >= 3 || minne.bokningsintresse ? 'redo' : r.komplex ? 'personlig' : r.tvek ? 'overvager' : r.intresse ? 'utforskar' : 'ny';
  }

  function svara(fraga, f) {
    visaFlik(false);
    logg.querySelectorAll('.fc-val-logg').forEach(function (x) { x.remove(); });
    var duB = bubbla(fraga, 'du');
    var t = rensa(fraga), niva = f ? 0 : kopNiva(t);
    if (/orkar inte|putshjälp|har ni tid|många fönster|mycket fönster|rena fönster|hjälp med fönster/.test(t)) niva = Math.max(niva, 2);
    noteraFakta(t);
    if (!f) f = (minne.form && formSvar(fraga)) || specialSvar(t) || kontext(fraga) || hitta(fraga, niva);
    uppdateraResa(t, f, niva, kortTyp(t));
    skriver(function () {
      var fore = logg.childNodes.length, text, b, valen = f && f.val;
      if (f) {
        text = f.text || valjSvar(f);
        var fk = minne.fakta || {};
        // Minnet: kunden har redan sagt bostad/antal – använd det i stället för att fråga igen
        if (f.q === 'Vad kostar det?' && !minne.tema && fk.bostad) {
          var lankBostad = fk.bostad === 'villa' ? ['Till villabokningen', '/boka#fonster'] : fk.bostad === 'lägenhet' ? ['Till lägenhetsbokningen', '/boka#lagenhet'] : ['Till företagssidan', '/foretag'];
          text += ' Du nämnde ' + (fk.bostad === 'företag' ? 'företag' : 'en ' + fk.bostad) + (fk.antal ? ' med ' + fk.antal + ' fönster' : '') + ' – där väljer du dem och ser priset direkt.';
          f = Object.assign({}, f, { knapp: lankBostad });
        } else if (f.q === 'Vad kostar det?' && !minne.tema) valen = ['Se pris', 'Hjälp mig räkna fönster', 'Begär offert'];
        if (f.fragaAntal) minne.fragaAntal = true;
        if (f.ord && f.ord[0] === 'antal' && fk.bostad === 'villa' && fk.antal && fk.antal < 25) { text = fk.antal + ' fönster i en villa – perfekt! Räkna fram ditt fasta pris i villabokningen.'; f = Object.assign({}, f, { knapp: ['Till villabokningen', '/boka#fonster'] }); }
        if (f.slutaSalja) minne.saljStopp = true;
        // Efter klagomål eller kontaktärenden: inga säljfraser på ett bra tag
        if (f.knapp && f.knapp[1].indexOf('kontakta') >= 0 && !f.special) minne.saljPaus = 8;
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
        if (niva >= 3 && !f.kalk && !/PERFEKT|SÅJA|YES/.test(text)) text = 'PERFEKT! Då hjälper jag dig vidare direkt. ' + text;
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
        if (f.knapp2) lank(b, f.knapp2[0], f.knapp2[1]);
        if (!valen && /villa, lägenhet|villa eller lägenhet/i.test(text)) valen = ['Villa', 'Lägenhet', 'Företag', 'Solcellstvätt'];
        // Naturligt avslut ibland efter hjälpsamma svar, när kunden utforskar eller överväger
        if (!valen && !f.knapp && allvar && (minne.resa === 'utforskar' || minne.resa === 'overvager') && !minne.saljStopp && !minne.avslutat && minne.historik.length >= 3 && text.indexOf('?') < 0) { text += ' ' + valjFran(AVSLUT); minne.avslutat = true; b.textContent = text; }
        if (valen) visaVal(valen);
        minne.senasteAvsikt = f.avsikt || (allvar ? 'fakta' : (f.special ? 'special' : (f.ord && f.ord[0] === 'antal' ? 'salj' : 'skamt')));
      } else {
        // Seriös fråga utan svar = saklig hänvisning. Småprat = roligt svar + be om förtydligande.
        if (arSaklig(fraga) || niva >= 2) { text = VET_INTE; lank(bubbla(text, 'jag'), 'Till kontaktformuläret', '/kontakta-mig#formular'); minne.senasteAvsikt = 'okand-saklig'; }
        else {
          minne.forvirrad = (minne.forvirrad || 0) + 1;
          if (minne.forvirrad >= 2) text = 'Förlåt, jag förstår inte riktigt vad du menar. 🙈' + DELA + 'Jag är bara en enkel digital hjälpreda – det blir lättast om du trycker på en knapp här under. Eller ring Tommy på ' + TEL_TEXT + ', så hjälper han dig direkt.';
          // Vänligt och tydligt – inga "404"-skämt som kan förvirra (Tommy 2026-11-19: äldre kunder)
          else text = valjFran(['Hmm, det där förstod jag inte riktigt. 🤔 Kan du säga det på ett annat sätt?', 'Oj, där hängde jag inte med. 😅 Kan du skriva det lite annorlunda?', 'Det där kan jag tyvärr inte svara på. 🙈 Vad vill du veta om fönsterputsen?']) + DELA + 'Du kan också trycka på en knapp här under.';
          bubbla(text, 'jag'); visaVal(MENY); minne.senasteAvsikt = 'okand';
        }
        senaste = text;
      }
      if (f) minne.forvirrad = 0;
      // Kunden frågade något annat mitt i prisräkningen: erbjud att fortsätta
      if (minne.kalk && minne.kalk.paus && !(f && (f.kalk || f.val))) visaVal(['Fortsätt prisräkningen']);
      if (minne.form && !(f && f.avsikt === 'forfragan')) visaVal(['Fortsätt med uppgifterna']);
      delaUpp(fore); // flera korta bubblor i stället för en lång
      // Vad väntar boten på nu?
      if (minne.fragaAntal) { minne.vantarPa = 'antal'; minne.fragaAntal = false; }
      else if (f && f.vantar !== undefined) minne.vantarPa = f.vantar;
      else if (/villa, lägenhet|villa eller lägenhet|villa, lägenhet eller/i.test(text)) minne.vantarPa = 'bostad';
      else if (!minne.saljStopp && ((f && f.knapp && f.knapp[1].indexOf('/boka') === 0 && /\?/.test(text)) || (/\?\s*\S*$/.test(text) && /boka|pris|putsa|offert|fönster|glas|rutor|bokning/i.test(text)))) minne.vantarPa = 'boka';
      else minne.vantarPa = '';
      minne.sedanSalj++;
      if (minne.saljPaus) minne.saljPaus--;
      minne.historik.push(minne.senasteAvsikt); if (minne.historik.length > 10) minne.historik.shift();
      if (!(f && f.forklara)) forraSvar = String(text).split(DELA).join(' ');
      logg.scrollTop += duB.getBoundingClientRect().top - logg.getBoundingClientRect().top - 12;
      // Statistik utan kundens text (integritet): bara vilken sorts svar och köpintresse
      if (window.gtag) window.gtag('event', 'chatt_fraga', { svar: f ? (f.q || f.avsikt || (f.ord && f.ord[0]) || 'svar') : minne.senasteAvsikt, kopintresse: niva });
    }, f && f.text ? langdTid(String(f.text).split(DELA)[0]) : 900);
  }
  function oppna(ja) {
    panel.hidden = !ja;
    knapp.setAttribute('aria-expanded', ja ? 'true' : 'false');
    knapp.innerHTML = ja ? ikonKryss : ikonChatt;
    knapp.setAttribute('aria-label', ja ? 'Stäng chatten' : 'Chatta med Forsbergs digitala assistent');
    if (ja) hamtaTider(); // lediga tider laddas i förväg
    if (ja && !logg.childNodes.length) skriver(function () { var fore = logg.childNodes.length; bubbla(halsning(), 'jag'); visaVal(MENY); delaUpp(fore); });
  }

  knapp.addEventListener('click', function () { oppna(panel.hidden); });
  panel.querySelector('.fc-stang').addEventListener('click', function () { oppna(false); knapp.focus(); });
  flik.addEventListener('click', function () { visaFlik(valLista.hidden); });
  valLista.addEventListener('click', function (e) {
    var c = e.target.closest('[data-fc]');
    if (c) { var f = FRAGOR[Number(c.getAttribute('data-fc'))]; if (f.q === 'Vad kostar det?') svara(f.q); else svara(f.q, f); } // pris = kalkylatorn i chatten
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
