/* Svarsbot med personlighet (Tommy 2026-11-19): färdiga svar, ingen AI. Hittar aldrig på priser eller tider.
 * Kunden kan trycka på en vanlig fråga under fliken eller skriva själv – då letar boten efter orden i "ord".
 * Ändra svar och ord i listorna FRAGOR och EXTRA. "a" kan vara en text eller en lista (då varieras svaret).
 * Lägg till sidan med <link /css/chatt.css> + <script /js/chatt.js>. */
(function () {
  var TEL_TEXT = '079-346 39 64';

  // Vanliga frågor (visas under fliken). Svaren bygger på hemsidans egna texter.
  var FRAGOR = [
    { q: 'Vad kostar det?', ord: ['vad kostar', 'kost', 'pris', ' kr', 'kronor', 'billig', 'dyr', 'offert', 'betala för', 'hur mycket'],
      a: "Det beror på hur många fönster du har och vilken typ de är. Skriv till exempel \"8 tvåluft och 3 enluft\", eller \"en trea\" om du bor i lägenhet, så räknar jag ut ditt pris direkt.", knapp: ['Räkna själv i bokningen', '/boka'] },
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
    { ord: ['suger'], a: ['Aj, det där sved lite! 😅 Men jag bjuder på ett leende ändå. Ska vi prata fönster?', 'Oj då! Jag tar det med ett leende. 😊 Kan jag hjälpa dig med något?', 'Det enda som suger här är smutsen på fönstren. 😄 Den kan Tommy fixa!'] },
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
    { ord: ['rut-avdrag', 'rutavdrag', 'har ni rut', ' rut', 'med rut', 'räknar ni med rut', 'drar ni rut', 'gäller rut', 'får man rut', 'går det med rut'], a: 'Ja! RUT ger 50 % avdrag på arbetskostnaden om du uppfyller villkoren. Priserna på sidan är redan efter RUT.', knapp: ['Räkna ut mitt pris', '/boka'] },
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
    { ord: [' yo ', ' yoo ', ' yooo '], a: ['Hej hej! 😊 Kul att du tittar in. Hur ser det ut med fönstren där hemma?', 'Tjena! 👋 Vad kan jag hjälpa dig med idag?'] },
    { ord: [' tjena', ' tjenare'], a: 'Tjenare! 👋 Hur står det till med fönstren där hemma?' },
    { ord: [' hallå'], a: ['Hallå där! 😊 Vad kan jag hjälpa dig med?', 'Hallå! 👋 Trevligt att du hör av dig. Vad funderar du på?'] },
    { ord: [' hej ', ' hejsan', ' hej hej', ' hejhej'], a: ['Hej hej! ❤️ Välkommen till Forsbergs. Ska vi fixa lite rena rutor?', 'Hej! 👋 Vad kan jag hjälpa dig med?'] },
    { ord: ['wazzup', 'wassup', 'whats up'], a: 'Hej! 😊 Här är allt lugnt och fönstren väntar. Vad kan jag hjälpa dig med?' },
    { ord: ['läget', 'hur mår du', 'allt bra'], a: ['Bara bra, tack som frågar! 😊 Och du?', 'Riktigt bra! Det är alltid en fin dag när någon hör av sig. Hur är läget själv?'] },
    { ord: [' tja ', 'tja mannen'], a: 'Tja! 😊 Vad säger vi, dags att ge fönstren lite kärlek?' },
    { ord: ['god morgon', 'godmorgon'], a: ['God morgon! ☀️ Hoppas du har fått i dig kaffet. Vad kan jag hjälpa dig med?', 'God morgon! ☀️ Ett bra sätt att börja dagen – vad funderar du på?'] },
    { ord: ['god natt', 'godnatt'], a: ['Sov gott! ✨ Jag finns här i morgon också.', 'God natt och sov så gott! 😴'] },
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
    { ord: [' nej '], a: 'Okej, uppfattat! Jag lägger skrapan åt sidan.' },
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
    { ord: ['skärp dig'], a: 'Absolut! Professionellt läge aktiverat.' },
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
    { ord: ['yooooo'], a: 'Hej hej! 😊 Vilken energi! Vad kan jag hjälpa dig med?' },
    { ord: ['tjabba'], a: 'Tjabba! 😄 Trevligt att du tittar in. Vad funderar du på?' },
    { ord: [' sho '], a: 'Hej! 😊 Vad kan jag hjälpa dig med idag?' },
    { ord: [' wsg'], a: 'Allt är stabilt i serverhallen! Hur är läget med dina fönster?' },
    { ord: [' sup '], a: 'Just chilling in the cloud. ☁️ Du då? Behöver glasen lite kärlek?' },
    { ord: ['tjenixen'], a: 'Tjenixen! 😄 Det var ett gott humör det. Vad kan jag göra för dig?' },
    { ord: ['halloj'], a: 'Halloj! 👋 Välkommen till Forsbergs. Vad funderar du på?' },
    { ord: [' ayo'], a: 'Hej! 😊 Vad kan jag hjälpa dig med?' },
    { ord: ['vad händer'], a: 'Jag sitter och planerar mitt globala fönsterputsimperium. Tommy vet inget ännu.' },
    { ord: ['tja botten', 'tja boten', 'tja bot', 'tja robot'], a: 'Tja! 😊 Här är jag – Tommys digitala hjälpreda. Vad kan jag göra för dig?' },
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
    { ord: ['vibe', 'vibes'], a: 'Vibben här är 100 % på topp.' },
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
    { ord: ['större fastighet', 'flerfamiljshus', 'hyreshus', 'brf'], allvar: true, a: 'Större fastighet – då tar Tommy gärna fram en personlig offert så att allt blir rätt.', knapp: ['Begär offert', '/kontakta-mig#formular'] },
    // ===== Fler sätt att fråga om företaget (Tommy 2026-11-19) – bara fakta från sajten =====
    { allvar: true, ord: ['hur mycket tar ni', 'vad tar ni betalt', 'vad tar du betalt', 'prislapp', 'vad landar det på', 'ungefärligt pris'], a: "Det beror på hur många fönster du har och vilken typ de är. Skriv till exempel \"8 tvåluft och 3 enluft\", eller \"en trea\" om du bor i lägenhet, så räknar jag ut ditt pris direkt.", val: ['Vad kostar det?'] },
    { allvar: true, ord: ['vad kostar en etta', 'pris för en etta', 'enrummare', 'en 1:a'], a: 'En 1:a kostar 475 kr efter RUT, plus 30 kr i inställelseavgift. Har du inglasad balkong tillkommer en liten summa per glas.', val: ['Vad kostar det?'] },
    { allvar: true, ord: ['vad kostar en tvåa', 'pris för en tvåa', 'tvårummare', 'en 2:a'], a: 'En 2:a kostar 500 kr efter RUT, plus 30 kr i inställelseavgift. Inglasad balkong räknas till per glas.', val: ['Vad kostar det?'] },
    { allvar: true, ord: ['vad kostar en trea', 'pris för en trea', 'trerummare', 'en 3:a'], a: 'En 3:a kostar 525 kr efter RUT, plus 30 kr i inställelseavgift. Inglasad balkong räknas till per glas.', val: ['Vad kostar det?'] },
    { allvar: true, ord: ['vad kostar en fyra', 'pris för en fyra', 'fyrarummare', 'en 4:a'], a: 'En 4:a kostar 550 kr efter RUT, plus 30 kr i inställelseavgift. Inglasad balkong räknas till per glas.', val: ['Vad kostar det?'] },
    { allvar: true, ord: ['vad kostar en femma', 'pris för en femma', 'femrummare', 'en 5:a'], a: 'En 5:a kostar 575 kr efter RUT, plus 30 kr i inställelseavgift. Är lägenheten större än så räknar Tommy på den själv.', val: ['Vad kostar det?'] },
    { allvar: true, ord: ['lägsta pris', 'billigaste', 'minsta kostnad', 'minimipris', 'lägsta summa'], a: 'Lägsta priset är 475 kr efter RUT för en 1:a. För villa är lägsta priset 750 kr efter RUT. Inställelseavgiften på 30 kr tillkommer.', val: ['Vad kostar det?'] },
    { allvar: true, ord: ['inställelseavgift', 'framkörning', 'resekostnad', 'körkostnad', 'tar ni betalt för resan', 'milersättning'], a: ['Det tillkommer en inställelseavgift på 30 kr. Den är inte RUT-berättigad, och den syns alltid när du räknar ut priset. Inga andra avgifter.', 'Bara 30 kr i inställelseavgift – inget annat. Den står med i priset du räknar fram.'] },
    { allvar: true, ord: ['moms ingår', 'inklusive moms', 'exklusive moms', 'är det med moms', 'plus moms'], a: 'Alla priser är inklusive moms. Det du ser är det du betalar.' },
    { allvar: true, ord: ['före rut', 'utan rut', 'pris utan avdrag', 'om jag inte har rut', 'har inte rut kvar'], a: ['Priset före RUT är dubbelt så mycket som priset efter RUT – avdraget är 50 % av arbetskostnaden. Har du inte RUT kvar betalar du priset före avdrag.', 'Utan RUT-avdrag betalar du hela arbetskostnaden, alltså dubbla priset mot efter RUT. Inställelseavgiften på 30 kr är densamma.'] },
    { allvar: true, ord: ['rut-tak', 'rut taket', 'hur mycket rut', 'max rut', 'rut per år'], a: 'Hur mycket RUT du har kvar beror på dig och vad du har använt under året – det kan du se hos Skatteverket. Tommy sköter ansökan åt dig.' },
    { allvar: true, ord: ['vem ansöker om rut', 'måste jag söka rut', 'fixar ni rut', 'sköter ni rut', 'skatteverket krångel'], a: ['Du behöver inte göra något. Tommy sköter hela RUT-ansökan med Skatteverket åt dig.', 'Inget krångel för dig – Tommy fixar allt med Skatteverket.'] },
    { allvar: true, ord: ['personnummer', 'varför behöver ni personnummer'], a: 'För att RUT-avdraget ska kunna göras behöver Tommy uppgifter till Skatteverket. Hur uppgifterna hanteras står i integritetspolicyn.', knapp: ['Integritetspolicy', '/integritetspolicy'] },
    { allvar: true, ord: ['rot-avdrag', 'rot avdrag', 'rotavdrag'], a: 'ROT-avdraget gäller solcellstvätt. Då betalar du 70 % av arbetskostnaden. Vanlig fönsterputs går på RUT i stället.', knapp: ['Solcellstvätt', '/solcellspaneltvatt'] },
    { allvar: true, ord: ['swish', 'kan jag swisha', 'betala med swish', 'swishnummer'], a: 'Ja, privatpersoner betalar smidigt med Swish efter att jobbet är klart. Företag får faktura.' },
    { allvar: true, ord: ['betala kontant', 'kontanter', 'betala med kort', 'kortbetalning', 'klarna'], a: 'Privatpersoner betalar med Swish efter jobbet, och företag får faktura. Har du frågor om andra sätt kan du ringa Tommy.', val: ['Ring Tommy'] },
    { allvar: true, ord: ['betala i förskott', 'förskottsbetalning', 'betala innan', 'när betalar jag'], a: 'Du betalar efter att jobbet är gjort – inte innan.' },
    { allvar: true, ord: ['får jag kvitto', 'skickar ni kvitto', 'behöver kvitto'], a: 'Ja, du får alltid en korrekt faktura eller kvitto. Tommy är godkänd för F-skatt och momsregistrerad.' },
    { allvar: true, ord: ['boka till mamma', 'boka åt min mamma', 'boka åt min pappa', 'boka åt någon annan', 'present', 'presentkort'], a: ['Vilken fin tanke! 💙 Skicka en förfrågan med adressen där fönstren finns, och skriv i meddelandet att det är till någon annan – så ordnar Tommy resten.', 'Snyggt gjort! Skriv i förfrågan vem det gäller och var, så hör Tommy av sig.'], val: ['Skicka förfrågan till Tommy'] },
    { allvar: true, ord: ['boka för en äldre', 'min mamma är gammal', 'pensionär', 'äldre person', 'svårt att gå'], a: 'Det löser vi. Det är alltid Tommy själv som kommer, och han tar god tid på sig. Skriv gärna i förfrågan om det är något han ska tänka på.', val: ['Skicka förfrågan till Tommy', 'Ring Tommy'] },
    { allvar: true, ord: ['hur snabbt kan', 'snabbaste tiden', 'tidigaste tid', 'första lediga tid', 'nästa lediga'], a: 'Jag kan visa de första lediga tiderna direkt – tryck här under.', val: ['Lediga tider'] },
    { allvar: true, ord: ['på kvällen', 'kvällstid', 'efter jobbet', 'efter fem', 'efter 17'], a: 'Tiderna du kan önska i bokningen är på förmiddagen och mitt på dagen på vardagar, och förmiddag eller eftermiddag på helger. Har du speciella önskemål kan du skriva det i förfrågan.', val: ['Lediga tider'] },
    { allvar: true, ord: ['helgjobb', 'jobbar ni på helger', 'lördag', 'söndag'], a: 'Ja, det finns tider på helger också – förmiddag eller eftermiddag. Vill du se lediga tider?', val: ['Lediga tider'] },
    { allvar: true, ord: ['jobbar ni fredag', 'fredagar', 'på fredag'], a: 'Fredagar har Tommy stängt. Men det finns lediga tider både före och efter – vill du se dem?', val: ['Lediga tider'] },
    { allvar: true, ord: ['omboka', 'flytta tiden', 'byta tid', 'ändra tiden', 'annan dag istället'], a: 'Du kan avboka eller boka om kostnadsfritt fram till 24 timmar innan avtalad tid. Hör av dig till Tommy, så hittar ni en ny tid.', val: ['Ring Tommy'], knapp: ['Allmänna villkor', '/allmanna-villkor'] },
    { allvar: true, ord: ['sen avbokning', 'avbokar sent', 'samma dag avboka', 'kostar det att avboka'], a: 'Avbokning och ombokning är kostnadsfritt fram till 24 timmar innan avtalad tid. Vad som gäller vid senare avbokning står i de allmänna villkoren.', knapp: ['Allmänna villkor', '/allmanna-villkor'] },
    { allvar: true, ord: ['tommy blir sen', 'om tommy inte kommer', 'kommer inte', 'dök inte upp', 'han är sen'], a: 'Det ska inte hända – men om något skulle strula, ring Tommy direkt så löser han det.', knapp: ['Ring 079-346 39 64', 'tel:+46793463964'] },
    { allvar: true, ord: ['sms innan', 'påminnelse', 'hör ni av er innan', 'meddelar ni innan'], a: 'Tommy hör av sig via SMS eller telefon innan han kommer, så du vet vilken dag och ungefär när.' },
    { allvar: true, ord: ['portkod', 'kod till porten', 'trapphus', 'hiss'], a: 'Skriv portkoden i meddelandet när du skickar förfrågan, så har Tommy den när han kommer.', val: ['Skicka förfrågan till Tommy'] },
    { allvar: true, ord: ['lämna nyckel', 'nyckelbox', 'nyckel under mattan', 'lämna en nyckel'], a: 'Många lämnar en nyckel eller en kod, så putsas fönstren medan de är på jobbet. Bestäm detaljerna med Tommy.', val: ['Skicka förfrågan till Tommy'] },
    { allvar: true, ord: ['larm', 'har larm', 'larmet'], a: 'Har du larm – skriv det i förfrågan eller säg det till Tommy när han hör av sig, så kommer ni överens om hur det ska göras.' },
    { allvar: true, ord: ['parkering', 'parkera', 'var ska han parkera', 'p-plats'], a: 'Det kan du ta direkt med Tommy när han hör av sig. Skriv gärna i förfrågan om det är krångligt att parkera.' },
    { allvar: true, ord: ['flytta möbler', 'flytta blommor', 'måste jag flytta', 'göra i ordning innan', 'förbereda'], a: 'Det enda du behöver göra är att se till att Tommy kommer åt fönstren. Han tar med all utrustning.', knapp: ['Vanliga frågor', '/faq'] },
    { allvar: true, ord: ['gardiner', 'persienner', 'rullgardin', 'blommor i fönstret'], a: 'Det är bra om Tommy kommer åt fönstren. Har du mycket i fönstren kan du flytta undan det innan – eller fråga Tommy hur ni gör.' },
    { allvar: true, ord: ['tar ni med vatten', 'behöver ni vatten', 'eluttag', 'el till', 'ström'], a: 'Tommy tar med all utrustning, vatten och medel. Du behöver inte ställa fram något.' },
    { allvar: true, ord: ['skor', 'smutsar ner', 'blött golv', 'droppar på golvet', 'städar ni efter'], a: 'Tommy jobbar noggrant och varsamt i ditt hem. Är det något särskilt du vill att han tänker på – säg det, så fixar han det.' },
    { allvar: true, ord: ['tar ni insidan', 'putsar ni inne', 'bara insidan'], a: 'Ja! Utsidan syns från gatan – insidan syns från soffan. Tommy putsar alltid båda.' },
    { allvar: true, ord: ['mellanglas', 'mellan glasen', 'kopplade fönster', 'dubbelfönster', 'innanför glaset'], a: 'Har du fönster där bågarna går att öppna isär, så det finns glas emellan, väljer du 4 sidor när du räknar ut priset. Då putsas mellanglasen också.', val: ['Vad kostar det?'] },
    { allvar: true, ord: ['treglas', 'tre glas', 'treglasfönster', 'energiglas'], a: 'Det viktiga för priset är hur många sidor som ska putsas. Går fönstret inte att öppna isär räknas det som 2 sidor. Är du osäker kan Tommy hjälpa dig.', val: ['Vad kostar det?', 'Ring Tommy'] },
    { allvar: true, ord: ['vridfönster', 'pivåfönster', 'vrider runt', 'vändfönster'], a: 'Fönster som går att vrida runt räknas oftast som vanliga fönster. Är du osäker på vilken sort – tryck "Vet inte" i prisräkningen så hjälper jag dig.', val: ['Vad kostar det?'] },
    { allvar: true, ord: ['fönsterdörr', 'altandörr', 'balkongdörr', 'glasdörr', 'skjutdörr'], a: 'Glasdörrar och altandörrar räknar du som fönster i prisräkningen – en stor glasdörr kan du välja som panoramafönster.', val: ['Vad kostar det?'] },
    { allvar: true, ord: ['källarfönster', 'källaren'], a: 'Källarfönster räknar du som vanliga fönster – de låga brukar vara underliggande fönster i prisräkningen.', val: ['Vad kostar det?'] },
    { allvar: true, ord: ['takkupa', 'vindsfönster', 'velux', 'snedtak'], a: 'Takfönster och höga fönster når Tommy med renvattensystemet och teleskopstången, utan stege. Välj "Svåra att nå" som specialfönster när du räknar ut priset.', val: ['Vad kostar det?'] },
    { allvar: true, ord: ['glastak', 'pergola', 'carport', 'glasveranda', 'veranda'], a: 'Glastak och verandor räknar du som uterum – takglas, glas från golv till tak och små fönster var för sig. Är det något ovanligt, skicka en förfrågan så räknar Tommy på det.', val: ['Vad kostar det?', 'Skicka förfrågan till Tommy'] },
    { allvar: true, ord: ['glasräcke', 'räcke i glas', 'glas på altanen'], a: 'Glasräcken fixas! Ett altanräcke i glas kostar 30 kr per glas efter RUT, och ett glasräcke upp till taket 20 kr per glas.', val: ['Vad kostar det?'] },
    { allvar: true, ord: ['inglasad balkong', 'balkong golv till tak', 'balkongglas'], a: 'En helt inglasad balkong från golv till tak kostar 40 kr per glas efter RUT. Räcke till tak kostar 20 kr per glas.', val: ['Vad kostar det?'] },
    { allvar: true, ord: ['vinterträdgård', 'orangeri', 'glashus'], a: 'Det räknas som uterum eller växthus i prisräkningen – takglas, golv till tak och små fönster var för sig.', val: ['Vad kostar det?'] },
    { allvar: true, ord: ['affär', 'skyltfönster', 'restaurang', 'café', 'frisör', 'salong', 'kontor'], a: 'Ja, Tommy putsar för företag också – kontor, butiker och lokaler. Skicka en förfrågan så får du ett fast pris, oftast samma dag. Företag får faktura.', knapp: ['Företag', '/foretag'], val: ['Skicka förfrågan till Tommy'] },
    { allvar: true, ord: ['bostadsrättsförening', 'samfällighet', 'fastighetsägare', 'hyresvärd', 'förvaltare'], a: 'För föreningar och fastighetsägare tar Tommy fram en personlig offert så att allt blir rätt. Skicka en förfrågan!', val: ['Skicka förfrågan till Tommy'], knapp: ['Begär offert', '/kontakta-mig#formular'] },
    { allvar: true, ord: ['abonnemang', 'regelbundet', 'återkommande', 'varje månad', 'varje kvartal', 'stående tid'], a: 'Ja, det går att ha ett återkommande upplägg – utan bindningstid. Säg till Tommy hur ofta du vill, så lägger han upp det.', val: ['Skicka förfrågan till Tommy'] },
    { allvar: true, ord: ['bindningstid', 'uppsägningstid', 'säga upp', 'binder mig'], a: 'Nej, ingen bindningstid. Du bokar när det passar dig – en gång eller regelbundet.' },
    { allvar: true, ord: ['hur ofta ska man', 'hur ofta bör', 'hur ofta putsa', 'hur ofta brukar'], a: 'Det är helt upp till dig. Många vill ha rent inför våren och inför julen – men du bokar när det passar dig, utan bindningstid.', val: ['Lediga tider'] },
    { allvar: true, ord: ['vårputs', 'våren', 'inför sommaren'], a: 'Våren är ett populärt tillfälle – då syns allt vinterdamm i solen. Vill du se lediga tider?', val: ['Lediga tider'] },
    { allvar: true, ord: ['julputs', 'inför jul', 'före jul', 'till jul'], a: 'Rena fönster till jul är aldrig fel – då lyser adventsljusen ännu finare. 🎄 Vill du se lediga tider?', val: ['Lediga tider'] },
    { allvar: true, ord: ['regnar det', 'om det regnar', 'i regn', 'dåligt väder'], a: 'Tommy putsar året runt. Vid extremt oväder flyttas tiden kostnadsfritt.' },
    { allvar: true, ord: ['minusgrader', 'kallt ute', 'frost', 'snö', 'vintern'], a: 'Tommy putsar året runt. På vintern blandas frostskydd i vattnet, så det blir rent även i minusgrader.' },
    { allvar: true, ord: ['stark sol', 'solsken', 'varmt ute', 'värmebölja'], a: 'Tommy anpassar sig efter vädret så att det blir randfritt – det är en del av hantverket.' },
    { allvar: true, ord: ['försäkrade', 'skadeförsäkring', 'om ni har sönder', 'krossar en ruta', 'om något går sönder'], a: 'Tommy är försäkrad hos Trygg-Hansa med ansvarsförsäkring. Den täcker skador han skulle orsaka på din egendom i samband med arbetet.' },
    { allvar: true, ord: ['reklamera', 'klaga', 'klagomål', 'blev inte bra', 'inte rent'], a: 'Det är tråkigt att höra. Tommy har nöjd kund-garanti – hör av dig så kommer han tillbaka och åtgärdar det kostnadsfritt.', knapp: ['Ring 079-346 39 64', 'tel:+46793463964'] },
    { allvar: true, ord: ['ångerrätt', 'ångra bokningen', 'ångra mig'], a: 'Bokar du på distans har du 14 dagars ångerrätt enligt lag. Allt står i de allmänna villkoren.', knapp: ['Allmänna villkor', '/allmanna-villkor'] },
    { allvar: true, ord: ['allmänna villkor', 'villkoren', 'avtalsvillkor', 'kontrakt'], a: 'De allmänna villkoren finns på sajten – där står allt om pris, avbokning, ångerrätt och reklamation.', knapp: ['Allmänna villkor', '/allmanna-villkor'] },
    { allvar: true, ord: ['integritet', 'gdpr', 'mina uppgifter', 'dataskydd', 'cookies'], a: 'Hur dina uppgifter hanteras står i integritetspolicyn. Det du skriver i chatten skickas bara till Tommy om du själv väljer att skicka en förfrågan.', knapp: ['Integritetspolicy', '/integritetspolicy'] },
    { allvar: true, ord: ['organisationsnummer', 'org nr', 'orgnummer', 'enskild firma'], a: 'Forsbergs Fönsterputs är en enskild firma som drivs av Tommy Forsberg i Jönköping, godkänd för F-skatt. Mer står i integritetspolicyn.', knapp: ['Integritetspolicy', '/integritetspolicy'] },
    { allvar: true, ord: ['adress till er', 'var finns ni', 'var ligger ni', 'ert kontor', 'besöka er'], a: 'Forsbergs Fönsterputs finns i Jönköpingstrakten – det är Tommy som kommer hem till dig. Du når honom på 079-346 39 64.', val: ['Ring Tommy'] },
    { allvar: true, ord: ['epost', 'e-post', 'mailadress', 'maila', 'skicka mail'], a: 'Du når Tommy på kontakt@fputs.se, på 079-346 39 64 – eller så skickar jag en förfrågan åt dig direkt här.', val: ['Skicka förfrågan till Tommy'] },
    { allvar: true, ord: ['instagram', 'facebook', 'sociala medier', 'tiktok'], a: 'Länkarna till sociala medier hittar du längst ner på sajten. 📸' },
    { allvar: true, ord: ['google', 'hitta er på google', 'google maps', 'karta'], a: 'Du hittar Forsbergs Fönsterputs på Google – 5,0 i betyg med 51 recensioner. ⭐', knapp: ['Recensioner', '/recensioner'] },
    { allvar: true, ord: ['lämna recension', 'skriva recension', 'ge betyg', 'recensera'], a: 'Vad roligt att du vill det! 💙 Det betyder jättemycket för Tommy. Du hittar profilen på Google via sajten.', knapp: ['Recensioner', '/recensioner'] },
    { allvar: true, ord: ['referenser', 'tidigare kunder', 'exempel på jobb', 'bilder på jobb'], a: 'Titta gärna på referenserna och recensionerna på sajten – 5,0 på Google med 51 recensioner.', knapp: ['Referenser', '/referenser'] },
    { allvar: true, ord: ['hur länge har du hållit på', 'hur länge har ni funnits', 'när startade', 'hur gammalt är företaget'], a: 'Tommy jobbade nästan fem år i Stockholm innan han byggde upp företaget här i Jönköping.', knapp: ['Om Tommy', '/om-oss'] },
    { allvar: true, ord: ['sm i fönsterputs', 'tävlade', 'kistamässan', 'svenska mästerskap'], a: 'Ja! Tommy tävlade i SM i fönsterputs 2026 på Kistamässan i Stockholm. Samma noggrannhet tar han med hem till varje kund. 🏆', knapp: ['Om Tommy', '/om-oss'] },
    { allvar: true, ord: ['mentor', 'lärde sig', 'utbildning', 'certifierad'], a: 'Tommy lärde sig yrket i Stockholm, bland annat med Jimmy Ström som mentor – flerfaldig medaljör i SM och VM i fönsterputs.', knapp: ['Om Tommy', '/om-oss'] },
    { allvar: true, ord: ['hur många anställda', 'är ni flera', 'jobbar du ensam', 'har du kollegor'], a: 'Det är Tommy som driver firman och han kommer alltid själv. Du vet alltid vem som är hemma hos dig.' },
    { allvar: true, ord: ['vem svarar', 'pratar jag med tommy', 'är det tommy', 'är du tommy'], a: 'Jag är Forsbergs kundservice – Tommys digitala hjälpreda. Vill du prata med Tommy själv når du honom på 079-346 39 64.', val: ['Ring Tommy'] },
    { allvar: true, ord: ['huskvarna', 'gränna', 'bankeryd', 'habo', 'taberg', 'norrahammar'], a: 'Ja, dit kommer Tommy! Vill du att jag räknar ut priset?', val: ['Vad kostar det?', 'Lediga tider'] },
    { allvar: true, ord: ['mullsjö', 'vaggeryd', 'nässjö', 'värnamo', 'tranås', 'eksjö', 'skövde', 'linköping'], a: 'Dit åker Tommy tyvärr inte just nu. Hör gärna av dig ändå, så kan ni prata om det.', val: ['Ring Tommy'], knapp: ['Områden', '/omraden'] },
    { allvar: true, ord: ['vilka orter', 'vilket område', 'vart åker ni', 'hur långt åker ni'], a: 'Hela Jönköping och Huskvarna, plus orter som Habo, Bankeryd, Gränna, Lekeryd, Tenhult, Norrahammar, Taberg, Barnarp och Kaxholmen. Skriv ditt postnummer så kollar jag direkt!', knapp: ['Områden', '/omraden'] },
    { allvar: true, ord: ['solceller på taket', 'solpaneler på taket', 'smutsiga solceller', 'tvätta solceller'], a: 'Solcellstvätt görs med renvatten och anpassad utrustning. Tak och paneler är olika, så Tommy ger ett fast pris efter att du skickat förfrågan. ROT-avdrag gäller.', knapp: ['Solcellstvätt', '/solcellspaneltvatt'], val: ['Skicka förfrågan till Tommy'] },
    { allvar: true, ord: ['ger solceller mer', 'mer el', 'effekt solceller', 'smuts på solceller'], a: 'Smutsiga paneler kan ge sämre effekt – mer om det står på sidan om solcellstvätt.', knapp: ['Solcellstvätt', '/solcellspaneltvatt'] },
    { allvar: true, ord: ['skicka offert', 'skriftlig offert', 'offert på mejl'], a: 'Skicka en förfrågan så får du ett fast pris. Vill du göra det här i chatten?', val: ['Skicka förfrågan till Tommy'] },
    { allvar: true, ord: ['hembesök', 'komma och titta', 'besiktning', 'kolla på plats'], a: 'Behövs det kan Tommy komma och titta – det är gratis. Oftast räcker det dock med att du räknar fram priset eller skickar bilder.', val: ['Vad kostar det?', 'Skicka förfrågan till Tommy'] },
    { allvar: true, ord: ['skicka bild', 'bild på fönstren', 'fota fönstren'], a: 'Skicka gärna bilder på fönstren till Tommy via SMS, så räknar han ut ett pris och ringer upp.', knapp: ['SMS till Tommy', 'sms:+46793463964'] },
    { allvar: true, ord: ['hur bokar jag', 'hur gör jag för att boka', 'vill boka tid', 'boka en tid'], a: 'Enklast: räkna ut priset här, och skicka sedan en förfrågan – Tommy hör av sig och bekräftar tiden. Eller gör allt i bokningen.', val: ['Vad kostar det?', 'Skicka förfrågan till Tommy'], knapp: ['Till bokningen', '/boka'] },
    { allvar: true, ord: ['bekräftelse', 'fick ingen bekräftelse', 'har ni fått min', 'kom min bokning fram'], a: 'Tommy hör av sig och bekräftar. Har du inte hört något – ring honom så kollar han direkt.', val: ['Ring Tommy'] },
    { allvar: true, ord: ['glömde', 'skrev fel', 'fel adress', 'fel nummer i'], a: 'Ingen fara! Ring Tommy eller skicka en ny förfrågan med rätt uppgifter, så rättar han det.', val: ['Ring Tommy', 'Skicka förfrågan till Tommy'] },
    { allvar: true, ord: ['hur lång tid tar', 'hur länge håller ni på', 'tar det lång tid', 'hur många timmar'], a: ['Det beror på hur många och vilka fönster det är. Tommy jobbar effektivt – men aldrig på bekostnad av kvaliteten.', 'Det varierar med storlek och fönstertyp. Fråga gärna Tommy när han hör av sig, så får du en uppskattning för just ditt hem.'] },
    { allvar: true, ord: ['behöver jag vara hemma', 'måste jag vara där', 'om jag jobbar'], a: 'Nej, du behöver inte vara hemma. Lämna en nyckel eller lås upp det som behövs, så sköter Tommy resten.' },
    { allvar: true, ord: ['utsidan bara', 'bara utvändigt', 'bara utsida'], a: 'Bara utsidan går också – då räcker det att grinden är öppen. Men tänk på att det är insidan du tittar igenom varje dag. 😉' },
    { allvar: true, ord: ['karmtvätt', 'tvätta karmar', 'smutsiga karmar', 'fönsterbräda'], a: 'Karmtvätt kan du välja till – rena karmar och bågar för +15 %. Den finns med som sista fråga när du räknar ut priset.', val: ['Vad kostar det?'] },
    { allvar: true, ord: ['spröjsade', 'småspröjs', 'spröjsfönster', 'många små rutor'], a: 'Spröjs fixas! Välj "Med spröjs" och hur många rutor per båge när du räknar ut priset. Tommy räknar gärna på det innan du får ett fast pris.', val: ['Vad kostar det?'] },
    { allvar: true, ord: ['fast pris direkt', 'får jag fast pris', 'garanterat pris'], a: 'Ja. I bokningen får du ett fast pris direkt, och priset ni kommer överens om är det du betalar – även om jobbet tar längre tid.' },
    { allvar: true, ord: ['dolda kostnader', 'tillkommer något', 'extra avgifter', 'överraskningar'], a: 'Inga dolda avgifter. Det enda som läggs till är inställelseavgiften på 30 kr, och den syns redan när du räknar ut priset.' },
    { allvar: true, ord: ['billig', 'konkurrenskraftig', 'prisvärd', 'värt pengarna'], a: ['Tommy satsar på fast pris och riktigt bra resultat – inte på att vara billigast. Räkna ut ditt pris så ser du själv!', 'Fast pris, nöjd kund-garanti och alltid Tommy själv. Kolla vad det blir för dig!'], val: ['Vad kostar det?'] },
    { allvar: true, ord: ['rabattkod', 'kampanj', 'erbjudande', 'studentrabatt', 'pensionärsrabatt'], a: 'Jag känner inte till några rabatter just nu – och jag vill inte hitta på något. Fråga gärna Tommy.', val: ['Ring Tommy'] },
    { allvar: true, ord: ['fler än en lägenhet', 'två lägenheter', 'grannar', 'hela trappuppgången', 'flera hus'], a: 'Roligt! Flera bostäder samtidigt räknar Tommy gärna på själv. Skicka en förfrågan och berätta hur många det gäller.', val: ['Skicka förfrågan till Tommy'] },
    { allvar: true, ord: ['sommarstuga', 'fritidshus', 'stuga', 'sommarhus'], a: 'Ligger stugan inom Tommys område går det bra! Skriv postnumret så kollar jag.', knapp: ['Områden', '/omraden'] },
    { allvar: true, ord: ['nybygge', 'nybyggt', 'byggdamm', 'efter renovering', 'byggstäd'], a: 'Efter byggen och renoveringar kan det sitta mer än vanligt på glaset. Skicka en förfrågan och berätta, så räknar Tommy på det.', val: ['Skicka förfrågan till Tommy'] },
    { allvar: true, ord: ['flyttstädning', 'ska flytta', 'flyttar ut', 'inflyttning'], a: 'Ska du flytta? Då vill du säkert ha rena fönster i tid. Jag visar de första lediga tiderna.', val: ['Lediga tider', 'Skicka förfrågan till Tommy'] },
    { allvar: true, ord: ['visning', 'sälja huset', 'säljer lägenheten', 'mäklare'], a: 'Rena fönster gör mycket inför en visning! Vill du se de första lediga tiderna?', val: ['Lediga tider', 'Ring Tommy'] },
    { allvar: true, ord: ['städfirma', 'storstädning', 'hemstädning'], a: 'Forsbergs Fönsterputs gör fönsterputs och solcellstvätt – inte vanlig städning. Men fönstren fixar Tommy gärna!', val: ['Vad kostar det?'] },
    { allvar: true, ord: ['tvätta bilen', 'biltvätt', 'tvätta fasad', 'högtryckstvätt', 'rensa hängrännor', 'takrengöring'], a: 'Det gör Forsbergs Fönsterputs inte – fokus är fönsterputs och solcellstvätt. Vill du fråga om något speciellt kan du ringa Tommy.', val: ['Ring Tommy'] },
    { allvar: true, ord: ['speglar', 'glasväggar', 'duschvägg', 'glasdörrar inne'], a: 'Har du andra glasytor du undrar över – skicka en förfrågan och beskriv, så svarar Tommy om det går.', val: ['Skicka förfrågan till Tommy'] },
    { allvar: true, ord: ['klistermärke', 'tejp', 'färgstänk', 'målarfärg på glaset'], a: 'Sådant är lite speciellt – skriv det i förfrågan, så kollar Tommy vad som går att göra.', val: ['Skicka förfrågan till Tommy'] },
    { allvar: true, ord: ['repor', 'repa glaset', 'skrapar ni', 'blir det repor'], a: 'Tommy jobbar med rätt teknik för varje fönster och är försäkrad om något mot förmodan skulle hända.' },
    { allvar: true, ord: ['allergisk', 'astma', 'starka dofter', 'parfymfritt'], a: 'Renvattensystemet använder inga kemikalier – bara rent vatten. Har du speciella önskemål, säg det till Tommy.' },
    { allvar: true, ord: ['hunden skäller', 'har hund', 'har katt', 'mina djur', 'husdjur hemma'], a: 'Djur är inga problem! 🐶🐱 Säg gärna till Tommy i förfrågan så vet han.', val: ['Skicka förfrågan till Tommy'] },
    { allvar: true, ord: ['barn hemma', 'bebis sover', 'småbarn'], a: 'Skriv det i förfrågan, så tar Tommy hänsyn till det. 💙', val: ['Skicka förfrågan till Tommy'] },
    { allvar: true, ord: ['jobbar hemifrån', 'har möten', 'jobbar hemma'], a: 'Inga problem – säg till Tommy, så anpassar han sig.' },
    { allvar: true, ord: ['kommer tommy själv', 'samma person varje gång', 'samma putsare'], a: 'Ja, det är alltid Tommy själv som kommer – varje gång.' },
    { allvar: true, ord: ['legitimation', 'id-kort', 'hur vet jag att det är tommy'], a: 'Det är alltid Tommy själv som kommer. Är du osäker kan du alltid ringa honom på 079-346 39 64 innan.', val: ['Ring Tommy'] },
    { allvar: true, ord: ['kan jag lita', 'seriöst företag', 'är det bluff', 'scam'], a: 'Bra att du frågar! F-skatt, försäkring hos Trygg-Hansa, fast pris, nöjd kund-garanti och 5,0 på Google. Och alltid Tommy själv.', val: ['Vem är Tommy?', 'Läs recensionerna'] },
    { allvar: true, ord: ['vad gör ni', 'vad erbjuder ni', 'vilka tjänster har', 'vad kan ni hjälpa'], a: 'Fönsterputs för villa, radhus och lägenhet – inklusive balkong, uterum och växthus – plus fönsterputs för företag och solcellstvätt.', val: ['Vad kostar det?', 'Hur går det till?'] },
    { allvar: true, ord: ['fönsterputs jönköping', 'fönsterputsare jönköping', 'putsare i jönköping'], a: 'Då har du kommit rätt! 😊 Forsbergs Fönsterputs putsar i hela Jönköping och Huskvarna med omnejd.', val: ['Vad kostar det?', 'Lediga tider'] },
    { allvar: true, ord: ['jag har bokat', 'har en bokning', 'min bokning', 'min tid'], a: 'Vad bra! Har du frågor om din bokning når du Tommy på 079-346 39 64.', val: ['Ring Tommy'] },
    { allvar: true, ord: ['tommy ringde', 'missat samtal', 'ringde från'], a: 'Då är det nog Tommy som söker dig! Ring tillbaka på 079-346 39 64.', knapp: ['Ring 079-346 39 64', 'tel:+46793463964'] },
    { allvar: true, ord: ['tack för senast', 'fönstren blev', 'blev jättefint', 'jättenöjd', 'så nöjd'], a: ['Åh, vad roligt att höra! 💙 Tommy blir jätteglad. Vill du lämna en recension på Google betyder det mycket.', 'Underbart! Det värmer. 😊 En recension på Google gör stor skillnad för Tommy.'], knapp: ['Recensioner', '/recensioner'] },
    { allvar: true, ord: ['tips till vän', 'rekommendera er', 'tipsa en kompis', 'min granne vill'], a: 'Tack för att du tipsar! 💙 Din vän kan räkna ut sitt pris här i chatten eller ringa Tommy.', val: ['Vad kostar det?'] },
    { allvar: true, ord: ['jobba hos er', 'söker jobb', 'anställer ni', 'praktik', 'sommarjobb'], a: 'Roligt att du är intresserad! Hör av dig direkt till Tommy på kontakt@fputs.se.' },
    { allvar: true, ord: ['samarbete', 'sponsring', 'reklam för er', 'marknadsföring'], a: 'Förfrågningar om samarbeten skickar du till kontakt@fputs.se, så tittar Tommy på det.' },
    { allvar: true, ord: ['fakturaadress', 'faktura till företaget', 'betalningsvillkor faktura'], a: 'Företag får faktura. Skriv företagsuppgifterna i förfrågan, så ordnar Tommy resten.', val: ['Skicka förfrågan till Tommy'] },
    { allvar: true, ord: ['hyr', 'hyresrätt', 'hyresgäst', 'får jag som hyresgäst'], a: 'Javisst, även hyresgäster kan boka fönsterputs. RUT-avdraget gäller för dig som privatperson om du uppfyller villkoren.', val: ['Vad kostar det?'] },
    { allvar: true, ord: ['radhus', 'parhus', 'kedjehus', 'gavelhus'], a: 'Radhus och parhus räknar du som villa – välj fönstren i prisräkningen så ser du priset direkt.', val: ['Vad kostar det?'] },
    { allvar: true, ord: ['två våningar', 'tvåplans', 'enplans', 'souterräng'], a: 'Inga problem – höga fönster når Tommy med teleskopstången. Välj "Svåra att nå" om några fönster sitter högt när du räknar ut priset.', val: ['Vad kostar det?'] },
    // ===== Småprat, känslor och humor (Tommy 2026-11-19) =====
    { ord: ['hur mår du', 'hur är läget med dig', 'mår du bra', 'hur har du det'], a: ['Riktigt bra, tack! Det är en fin dag för rena fönster. Hur mår du själv?', 'Jag mår toppen – jag har precis fått frågor från trevliga människor. Som du! 😊', 'Strålande, som ett nyputsat fönster i solen. ☀️ Och du?'] },
    { ord: ['jag mår bra', 'mår fint', 'mår toppen', 'har det bra'], a: ['Vad härligt att höra! 😊 Kan jag hjälpa dig med något idag?', 'Så skönt! Då ska vi se till att fönstren mår lika bra. 😉'] },
    { ord: ['jag mår dåligt', 'mår inte bra', 'ledsen', 'deppig', 'har en dålig dag'], a: ['Åh, det är jag ledsen att höra. 💙 Hoppas dagen blir bättre. Finns det något jag kan göra för att underlätta?', 'Tråkigt att höra. Ta hand om dig – och kom ihåg att ljuset kommer tillbaka, ibland bara genom ett renare fönster. 💙'] },
    { ord: ['stressad', 'har mycket att göra', 'hinner inte med', 'stressigt'], a: ['Förstår – livet kan vara mycket. Det är precis därför Tommy finns: en sak mindre på listan. 💙', 'Låt fönstren bli någon annans problem. Du har nog med annat! 😊'], val: ['Vad kostar det?'] },
    { ord: ['jag är glad', 'så glad', 'lycklig', 'bästa dagen'], a: ['Härligt! Glädje smittar – jag blev också glad nu. 😄', 'Underbart! Fortsätt så! ☀️'] },
    { ord: ['jag är arg', 'irriterad', 'sur idag', 'förbannad'], a: ['Oj, förstår att det kan kännas så. Finns det något jag kan hjälpa till med? Gäller det Tommy kan du alltid ringa honom direkt.', 'Det är okej att vara arg ibland. Säg till om jag kan hjälpa till på något sätt. 💙'], val: ['Ring Tommy'] },
    { ord: ['jag är uttråkad', 'tråkigt', 'har inget att göra', 'tristess'], a: ['Uttråkad? Kör fönsterquizet! Skriv "quiz". 🏆', 'Då har jag en idé: räkna dina fönster. Spännande OCH användbart. 😄'] },
    { ord: ['ensam', 'ingen att prata med', 'känner mig ensam'], a: ['Jag finns här och pratar gärna med dig. 💙 Vad har du för dig idag?', 'Du är inte ensam just nu – jag är här. 😊 Hur har din dag varit?'] },
    { ord: ['jag är nervös', 'orolig', 'oroar mig'], a: 'Förstår. Vad är det du oroar dig för? Gäller det fönsterputsen kan jag berätta hur allt går till – steg för steg.', val: ['Hur går det till?'] },
    { ord: ['förlåt', 'ursäkta', 'sorry', 'mitt fel'], a: ['Ingen fara alls! 😊', 'Det är helt okej – inget att be om ursäkt för.'] },
    { ord: ['du är snäll', 'vad snäll du är', 'du är gullig', 'du är söt'], a: ['Åh, tack! Du är snäll själv. 😊', 'Nu rodnar jag nästan. 🙈 Tack!'] },
    { ord: ['du är bra', 'du är grym', 'du är duktig', 'bra jobbat'], a: ['Tack! Jag har bra förebild – Tommy. 😄', 'Tack så mycket! Det betyder mycket. 💙'] },
    { ord: ['du är rolig', 'du är kul', 'skrattar'], a: ['Haha, tack! Jag övar varje dag. 😄', 'Det bästa jag vet är när någon skrattar. Tack! 😊'] },
    { ord: ['du är irriterande', 'du stör', 'du är tjatig', 'sluta tjata'], a: ['Förlåt! Jag ska ta det lugnare. 🙊', 'Uppfattat – jag håller mig lugn. Säg till om du behöver något.'], slutaSalja: true },
    { ord: ['jag förstår inte dig', 'vad menar du', 'du är svår att förstå'], a: 'Förlåt, jag ska vara tydligare! Tryck på en av knapparna här under, eller ring Tommy så förklarar han.', val: ['Vad kostar det?', 'Hur går det till?', 'Ring Tommy'] },
    { ord: ['god morgon', 'morrn', 'godmorgon'], a: ['God morgon! ☀️ Har du fått i dig kaffet än?', 'God morgon! Hoppas du sovit gott. Vad kan jag hjälpa dig med?'] },
    { ord: ['god kväll', 'kvällen'], a: ['God kväll! 👋 Vad kan jag hjälpa dig med?', 'God kväll! Skönt att dagen börjar gå mot sitt slut, va?'] },
    { ord: ['god dag', 'goddag', 'tjänare'], a: ['God dag! 😊 Vad kan jag hjälpa till med?', 'Hej och välkommen! Fråga på.'] },
    { ord: ['trevlig helg', 'ha en bra helg', 'skön helg'], a: ['Detsamma! Ha en riktigt skön helg. ☀️', 'Tack, detsamma! Njut av ledigheten.'] },
    { ord: ['måndag', 'måndagar'], a: ['Måndag igen! Men tänk så här: det är en ny vecka för rena fönster. 😄', 'Måndagar är lättare med rena fönster. Det är vetenskap. (Typ.)'] },
    { ord: ['tisdag'], a: 'Tisdag – veckans mest underskattade dag! 😄' },
    { ord: ['onsdag', 'lillördag'], a: ['Lillördag! 🎉 Halvvägs till helgen.', 'Onsdag – mitt i veckan. Bra dag att planera fönsterputs!'] },
    { ord: ['torsdag'], a: 'Torsdag! Nästan helg. 😊' },
    { ord: ['regnigt', 'regnet', 'ösregn', 'blött ute'], a: ['Regn är tråkigt – men efter regnet kommer solen, och då syns det verkligen om fönstren är rena. ☀️', 'Regnväder är perfekt fikaväder. ☕'] },
    { ord: ['soligt', 'solen skiner', 'fint väder', 'vackert väder'], a: ['Härligt! Och i solen ser man ju precis hur rena fönstren är... 👀', 'Underbart väder! Njut av det. ☀️'] },
    { ord: ['mörkt ute', 'mörkt på morgonen', 'mörker', 'höstmörker'], a: ['Den mörka tiden är tuff. Rena fönster släpper in allt ljus som finns. 💡', 'Mörkt ute – då gäller det att ta vara på varje ljusstråle!'] },
    { ord: ['snöar', 'snön', 'snöstorm', 'snögubbe'], a: ['Snö! ❄️ Tommy putsar året runt – på vintern med frostskydd i vattnet.', 'Vinterland! Mysigt att titta ut på – genom rena fönster förstås. ❄️'] },
    { ord: ['blåsigt', 'storm', 'blåser'], a: 'Blåsigt idag! Vid extremt oväder flyttas putstiden kostnadsfritt. 🌬️' },
    { ord: ['pollen', 'pollensäsong', 'allergi på våren'], a: ['Pollen lägger sig gärna på fönstren på våren. Då kan en puts göra stor skillnad! 🌼', 'Pollensäsong – fönstrens värsta fiende. 😅'] },
    { ord: ['hösten', 'höst', 'löven'], a: ['Hösten är mysig – stearinljus, filtar och rena fönster. 🍂', 'Höst! Perfekt tid att få rena fönster innan mörkret.'] },
    { ord: ['midsommar', 'sill', 'nubbe'], a: ['Glad midsommar! 🌸 Hoppas du får sol, sill och rena fönster.', 'Midsommar – den bästa högtiden för att titta ut på ljusa nätter.'] },
    { ord: ['påsk', 'påskägg', 'påskkärring'], a: ['Glad påsk! 🐣 Påskägg i fönstret syns bäst när glaset är rent.', 'Påsk! Hoppas du får mycket godis. 🍬'] },
    { ord: ['nyår', 'gott nytt år', 'fyrverkeri'], a: ['Gott nytt år! 🎆 Fyrverkerier syns bäst genom rena fönster.', 'Ett nytt år – en ny chans till rena fönster. 😄 Gott nytt!'] },
    { ord: ['god jul', 'julafton', 'tomten', 'julklapp'], a: ['God jul! 🎄 Hoppas tomten är snäll mot dig i år.', 'God jul! Adventsljusen lyser vackrast i rena fönster. 🕯️'] },
    { ord: ['födelsedag', 'fyller år', 'grattis på födelsedagen'], a: ['Grattis! 🎉 Hoppas du får en riktigt fin dag!', 'Hipp hipp hurra! 🎂 Fira ordentligt!'] },
    { ord: ['semester', 'är ledig', 'åka bort', 'utomlands'], a: ['Härligt med ledighet! Vill du komma hem till rena fönster? Du behöver inte ens vara hemma. 😉', 'Njut av ledigheten! ☀️'] },
    { ord: ['vättern', 'vätterstranden', 'sjön'], a: ['Vättern! Den finaste utsikten i stan – och den syns bäst genom rena fönster. 🌊', 'Ah, Vättern. Har du sjöutsikt är det nästan ett brott att ha smutsiga fönster. 😄'] },
    { ord: ['grännaglass', 'polkagris', 'polkagrisar'], a: ['Polkagris från Gränna – klassiker! 🍬 Och Tommy putsar i Gränna också.', 'Mums! Gränna har både polkagrisar och fönster att putsa. 😄'] },
    { ord: ['hv71', 'hockey', 'kinnarps arena'], a: ['Heja HV! 🏒 Jag håller tummarna.', 'Hockey i Jönköping – det är kärlek det. 🏒'] },
    { ord: ['fotboll', 'allsvenskan', 'j-södra', 'jönköpings södra'], a: ['Fotboll! ⚽ Jag kan inte sparka, men jag kan heja.', 'Hoppas ditt lag vinner! ⚽'] },
    { ord: ['jönköping är', 'bor i jönköping', 'älskar jönköping'], a: ['Jönköping är bäst! Och det är här Tommy putsar. 😊', 'Jönköping med omnejd – Tommys hemmaplan!'] },
    { ord: ['fika', 'kanelbulle', 'bulle', 'kaka'], a: ['Fika är heligt! ☕ Har du en kanelbulle till mig? (Jag kan inte äta, men jag kan drömma.)', 'Fika är Sveriges bästa uppfinning. 🧁'] },
    { ord: ['lunch', 'middag', 'vad ska jag äta'], a: ['Svårt beslut! Själv lever jag på el och goda frågor. 😄', 'Pasta funkar alltid. Det är mitt enda matråd. 🍝'] },
    { ord: [' te ', 'grönt te', 'dricker te'], a: 'Te är mysigt! 🍵 Särskilt med utsikt genom ett rent fönster.' },
    { ord: [' vin ', 'öl ikväll', 'fredagsmys'], a: ['Fredagsmys! 🍿 Njut ordentligt.', 'Skål! Men putsa inte fönster efter det. 😉'] },
    { ord: ['tacos', 'tacofredag'], a: 'Tacofredag – en svensk tradition jag respekterar djupt. 🌮' },
    { ord: ['sover', 'sömnig', 'ska sova', 'godnatt'], a: ['Sov gott! ✨ Jag finns här i morgon också.', 'God natt! Drömmen om rena fönster väntar. 😴'] },
    { ord: ['vaken sent', 'kan inte sova', 'sömnlös'], a: ['Kan du inte sova? Jag är vaken dygnet runt om du vill prata. ✨', 'Nattugglor är välkomna här. 🦉'] },
    { ord: ['jobbar för mycket', 'trött på jobbet', 'lång dag'], a: ['Då förtjänar du att slippa fönsterputsen själv! Låt Tommy ta den. 💙', 'Lång dag? Ta det lugnt ikväll – du är värd det.'] },
    { ord: ['jag är student', 'pluggar', 'tenta', 'skolan'], a: ['Lycka till med pluggandet! 📚 Rena fönster ger mer dagsljus – bra för koncentrationen. (Mitt eget påstående.)', 'Plugga på! Du klarar det. 💪'] },
    { ord: ['jag är pensionär', 'pensionerad', 'har gått i pension'], a: ['Grattis till pensionen! Nu ska du njuta – låt Tommy sköta fönstren. 😊', 'Härligt! Då finns det tid för det roliga i livet.'], val: ['Vad kostar det?'] },
    { ord: ['barnen', 'mina barn', 'ungarna', 'barnbarn'], a: ['Barn och rena fönster – en klassisk kamp. 😄 Kladdiga fingeravtryck är ett tecken på ett levande hem!', 'Barn är underbara. Fingeravtryck på fönstren hör till. 😄'] },
    { ord: ['min man', 'min fru', 'min sambo', 'min partner'], a: ['Hälsa gärna! 😊 Vill ni räkna ut priset tillsammans?', 'Fint! Fråga på om ni undrar något.'], val: ['Vad kostar det?'] },
    { ord: ['hund heter', 'min hund', 'vovve'], a: ['Hundar är fantastiska! 🐶 Nosavtryck på fönstret är ett kärleksbevis.', 'Hälsa vovven från mig! 🐾'] },
    { ord: ['katt heter', 'min katt', 'kissen'], a: ['Katter älskar fönster – bästa platsen att spana på fåglar. 🐱', 'Hälsa kissen! 🐾'] },
    { ord: ['fåglar', 'fågel flög in', 'fågelspillning'], a: ['Fåglar är fina – men deras spår på fönstren är mindre fina. 😅', 'Fågelspillning på rutan? Det fixar Tommy. 🐦'] },
    { ord: ['spindel', 'spindelnät', 'flugor', 'insekter'], a: ['Spindelnät i fönsterhörnen hör hösten till. Men de försvinner vid putsen. 🕷️', 'Insekter gillar fönster lika mycket som vi. 😄'] },
    { ord: ['berätta ett skämt', 'dra ett skämt', 'roligt skämt', 'ett till skämt'], a: ['Vad sa fönstret till fönsterputsaren? "Jag ser rakt igenom dig." 🪟', 'Varför gick fönstret till psykologen? Det hade för många ränder i livet. 😄', 'Vilket är fönstrets favoritämne i skolan? Glas-historia! 📚', 'Hur hälsar två fönster på varandra? "Ruta läget?" 😄', 'Varför är fönsterputsare så lugna? De har klar sikt på livet. 😎'] },
    { ord: ['vits', 'ordvits', 'pappaskämt'], a: ['Jag har ett pappaskämt: Vad kallar man en fönsterputsare som slutar? En som har gett upp-sikt. 😄', 'Mitt favoritskämt: Jag skulle putsa ett fönster, men det var helt genomskinligt. 🙃'] },
    { ord: ['gåta', 'ge mig en gåta'], a: ['Gåta: Vad kan man se igenom men inte gå igenom? Ett fönster! 🪟', 'Gåta: Vad blir renare ju mer det blir blött? En fönsterruta – med rätt teknik! 😄'] },
    { ord: ['fun fact', 'rolig fakta', 'visste du att'], a: ['Visste du att? Vanligt kranvatten innehåller kalk och mineraler – det är därför fönster kan få fläckar när de torkar. Renvatten torkar utan märken. 💧', 'Visste du att Tommy tävlade i SM i fönsterputs 2026? Det finns alltså tävlingar i det! 🏆'] },
    { ord: ['sjung en sång', 'kan du sjunga', 'sjung'], a: ['🎵 Rena rutor, rena rutor, ljuset strömmar in... 🎵 Jag ska inte sluta mitt dagsjobb.', '🎵 Jag ser klart nu när regnet har gått... 🎵'] },
    { ord: ['dikt', 'skriv en dikt', 'poesi'], a: 'Här kommer en dikt:\nEtt fönster som glänser,\nett ljus utan gränser,\nTommy med skrapa i hand –\nrenast i hela vårt land. ✨' },
    { ord: ['haiku'], a: 'Haiku:\nGlas som var grått nyss\nnu blänker det i solen\nTommy har varit här 🌸' },
    { ord: ['vad gillar du', 'favoritsak', 'vad tycker du om'], a: ['Jag gillar rena fönster, trevliga kunder och när någon skrattar åt mina skämt. 😄', 'Ljus! Allt som släpper in ljus. 💡'] },
    { ord: ['favoritfärg', 'vilken färg'], a: ['Genomskinlig! Eller kanske Forsbergs-röd. ❤️', 'Klart glas. Det är väl självklart. 😄'] },
    { ord: ['favoritmat'], a: 'Jag lever på el och goda frågor. Men om jag fick välja – kanelbullar. 🧁' },
    { ord: ['favoritfilm', 'vilken film', 'bästa filmen'], a: ['"Rear Window" – Fönstret åt gården. Av förklarliga skäl. 🎬', 'Allt med fina utsikter! 🎬'] },
    { ord: ['favoritmusik', 'vilken musik', 'lyssnar på'], a: ['Jag gillar allt som låter som en skrapa mot rent glas. 🎵 Vad lyssnar du på?', 'Lugn musik – den passar bra till noggrant hantverk. 🎶'] },
    { ord: ['spelar du spel', 'gillar du spel', 'tv-spel'], a: 'Jag spelar mest "Hitta smutsen på fönstret". Jag vinner varje gång. 🎮' },
    { ord: ['hur gammal är du', 'din ålder', 'när föddes du'], a: ['Jag är ganska ny – men jag lär mig hela tiden! 😊', 'Ung i själen, gammal i kunskap om fönster. 😄'] },
    { ord: ['var bor du', 'var kommer du ifrån'], a: ['Jag bor här på sajten – med världens bästa utsikt över Forsbergs kunder. 😄', 'I molnet! Men mitt hjärta finns i Jönköping. 💙'] },
    { ord: ['har du familj', 'har du syskon', 'har du föräldrar'], a: 'Min familj är Tommy och alla trevliga kunder. 💙' },
    { ord: ['är du verklig', 'finns du på riktigt', 'är du en människa'], a: ['Jag är Forsbergs digitala kundservice – inte en människa. Men Tommy är högst verklig, och du når honom på 079-346 39 64. 😊', 'Jag är en digital hjälpreda. Den riktiga människan heter Tommy – och han kommer hem till dig!'], val: ['Ring Tommy'] },
    { ord: ['är du ai', 'artificiell intelligens', 'är du en bot', 'är du en robot'], a: ['Jag är en digital hjälpreda – en enkel sådan, men med mycket hjärta. 😊 Allt jag säger om priser och tider kommer från Tommys egna system.', 'Ja, jag är digital. Men jag hittar aldrig på priser – de kommer direkt från Tommys kalkylator.'] },
    { ord: ['vem skapade dig', 'vem byggde dig', 'vem gjorde dig'], a: 'Tommy har byggt mig för att hjälpa kunderna dygnet runt. 💙' },
    { ord: ['vad heter du egentligen', 'har du ett namn', 'vad ska jag kalla dig'], a: 'Kalla mig Kundservice! Jag är Forsbergs digitala hjälpreda. 😊' },
    { ord: ['kan du prata engelska', 'english', 'speak english'], a: 'I mostly speak Swedish – but Tommy speaks English too! Call him on +46 79-346 39 64. 😊', val: ['Ring Tommy'] },
    { ord: ['kan du prata arabiska', 'kan du prata finska', 'andra språk'], a: 'Jag pratar mest svenska. Har du svårt med svenskan kan du ringa Tommy, så löser ni det tillsammans.', val: ['Ring Tommy'] },
    { ord: ['vad är meningen', 'livets mening', 'varför finns vi'], a: ['Meningen med livet? Att se världen klart – helst genom rena fönster. 😄', 'Filosofiskt! Jag tror att det handlar om ljus. Både bokstavligt och bildligt. 💡'] },
    { ord: ['tror du på gud', 'religion', 'gud finns'], a: 'Det är en stor fråga som jag lämnar till var och en. Jag håller mig till fönster. 😊' },
    { ord: ['politik', 'vem ska jag rösta på', 'valet'], a: 'Politik håller jag mig borta från – men alla partier är välkomna att boka fönsterputs. 😄' },
    { ord: ['kan du räkna', 'vad är 10 plus', 'matte'], a: 'Jag är bäst på en sorts matte: att räkna ut vad din fönsterputs kostar! 🧮', val: ['Vad kostar det?'] },
    { ord: ['vad är du bra på', 'vad kan du göra', 'vad kan du'], a: 'Jag kan räkna ut vad din fönsterputs kostar, visa lediga tider, svara på frågor om Tommy och företaget – och skicka en förfrågan till honom åt dig. 😊', val: ['Vad kostar det?', 'Lediga tider', 'Hur går det till?'] },
    { ord: ['vad kan du inte', 'kan du inte', 'svagheter'], a: 'Jag kan inte boka själv, inte hitta på priser och inte putsa fönster. Det sista är Tommys jobb. 😄' },
    { ord: ['putsar du själv', 'kan du putsa', 'har du en skrapa'], a: 'Tyvärr, jag har inga händer. Det är Tommy som putsar – jag sköter pratet. 😄' },
    { ord: ['tråkigt jobb', 'tråkigt att putsa', 'hatar att putsa'], a: ['Många tycker att fönsterputs är tråkigt – det är därför Tommy finns! 😄', 'Du behöver aldrig mer putsa själv. Låt Tommy ta det.'], val: ['Vad kostar det?'] },
    { ord: ['jag putsar alltid själv', 'brukar putsa själv', 'gör det själv'], a: ['Respekt! 💪 Och när du vill slippa en gång – då finns Tommy.', 'Snyggt! Men visste du att höga fönster når Tommy utan stege? Det slipper du klättra för. 😉'] },
    { ord: ['ränder när jag putsar', 'får alltid ränder', 'blir randigt'], a: ['Ränder är en klassiker! Vanligt kranvatten innehåller kalk och mineraler som kan lämna märken. Tommy använder rätt teknik för ett randfritt resultat. 😊', 'Ränderna är fönsterputsens värsta fiende. Det är därför proffs finns! 😄'], val: ['Vad kostar det?'] },
    { ord: ['vilket putsmedel', 'bästa putsmedlet', 'ättika', 'diskmedel'], a: 'Tommy använder renvatten för många fönster – helt utan kemikalier. För vanliga rutor används klassisk skrapteknik.', knapp: ['Hur jag jobbar', '/hur-jag-jobbar'] },
    { ord: ['fönster är smutsiga', 'smutsiga rutor', 'ser inget ut', 'grått glas'], a: ['Då är det dags! 😄 Ska vi räkna ut vad det kostar?', 'Smutsiga fönster tar bort mycket ljus. Det fixar Tommy!'], val: ['Vad kostar det?'] },
    { ord: ['fönstren är rena', 'har redan rena', 'putsade nyss'], a: ['Vad bra! Spara mig till nästa gång. 😊', 'Snyggt! Kom tillbaka när det är dags igen.'] },
    { ord: ['bra hemsida', 'snygg hemsida', 'fin sajt'], a: 'Tack! Tommy blir glad att höra det. 😊' },
    { ord: ['dålig hemsida', 'krånglig sajt', 'hittar inte'], a: 'Förlåt! Vad letar du efter? Jag hjälper dig hitta rätt.', val: ['Vad kostar det?', 'Lediga tider', 'Ring Tommy'] },
    { ord: ['testar bara', 'kollar bara', 'bara nyfiken'], a: ['Kör på! Fråga vad du vill. 😊', 'Nyfikenhet är bra! Testa att fråga vad din fönsterputs skulle kosta.'], val: ['Vad kostar det?'] },
    { ord: ['vem vinner', 'vem är starkast', 'vem är snabbast'], a: 'Tommy – han har ju tävlat i SM i fönsterputs! 🏆' },
    { ord: ['fönsterputs-sm', 'tävlar man i fönsterputs', 'tävling i fönsterputs'], a: 'Ja, det finns SM i fönsterputs! Tommy tävlade 2026 på Kistamässan. Snabbhet och precision – på riktigt. 🏆' },
    { ord: ['världsrekord', 'snabbaste fönsterputsaren'], a: 'Om det finns ett rekord vet jag inte – men Tommy är snabb och noggrann. Det är en bra kombination! ⚡' },
    { ord: ['kärlek', 'jag är kär', 'förälskad'], a: ['Kärlek! 💕 Allt ser vackrare ut då – även genom smutsiga fönster. Men rena är bättre. 😉', 'Åh, vad fint! 💕'] },
    { ord: ['gift dig med mig', 'vill du gifta', 'vi gifter oss'], a: 'Haha! Jag är redan gift – med mitt jobb. 😄' },
    { ord: ['du är min favorit', 'bästa boten', 'älskar dig'], a: ['Och du är min favoritkund! 💙', 'Åh! Jag blir alldeles varm i kretsarna. 💙'] },
    { ord: ['hejsan svejsan', 'tjolahopp', 'hallå där'], a: ['Hallå hallå! 👋 Vad kan jag göra för dig?', 'Hejsan! 😊 Fråga på!'] },
    { ord: ['vad gör du', 'vad håller du på med', 'är du upptagen'], a: ['Jag väntar på trevliga frågor – som din! 😊', 'Jag sitter och håller koll på Tommys kalender. Vill du se lediga tider?'], val: ['Lediga tider'] },
    { ord: ['vad tycker du om tommy', 'gillar du tommy', 'är tommy snäll'], a: ['Tommy är bäst! Noggrann, punktlig och alltid trevlig. 😊', 'Han är min skapare och idol. 💙'] },
    { ord: ['vad tjänar tommy', 'är tommy rik', 'tjänar mycket'], a: 'Det vet jag inte – men han lägger ner hela hjärtat i varje jobb. 💙' },
    { ord: ['hur ser tommy ut', 'bild på tommy', 'foto på tommy'], a: 'Du kan se Tommy på sajten – han syns bland annat i videon från SM i fönsterputs.', knapp: ['Om Tommy', '/om-oss'] },
    { ord: ['vad gör tommy på fritiden', 'tommys hobby', 'fritid'], a: 'Det vet jag faktiskt inte! Fråga honom när han kommer – han berättar säkert gärna. 😊' },
    { ord: ['hej igen', 'tillbaka igen', 'jag är tillbaka'], a: ['Välkommen tillbaka! 😊 Vad kan jag hjälpa till med?', 'Hej igen! Kul att se dig. 👋'] },
    { ord: ['vänta', 'en sekund', 'strax tillbaka'], a: ['Inga problem – jag väntar här. 😊', 'Ta den tid du behöver!'] },
    { ord: ['jag måste gå', 'måste sticka', 'hörs sen'], a: ['Inga problem! Välkommen tillbaka när du vill. 👋', 'Ha det bra! Jag finns här när du behöver mig.'] },
    { ord: ['vi hörs', ' ses ', 'adjö'], a: ['Vi hörs! 👋', 'Hej så länge! 😊'] },
    { ord: ['okej tack', 'bra tack', 'toppen tack'], a: ['Varsågod! 😊 Säg till om du undrar något mer.', 'Så lite! Hör av dig när du vill.'] },
    { ord: ['mycket bra', 'jättebra', 'perfekt', 'utmärkt'], a: ['Vad roligt! 😊', 'Härligt! Något mer jag kan hjälpa till med?'] },
    { ord: ['låter bra', 'låter toppen', 'låter perfekt'], a: ['Så bra! 😊 Vill du gå vidare och räkna ut priset?', 'Härligt! Säg till när du vill fortsätta.'], val: ['Vad kostar det?'] },
    { ord: ['vet du vad', 'gissa vad'], a: ['Nej, berätta! 👀', 'Vad då? Jag är nyfiken! 😄'] },
    { ord: ['jag har en fråga', 'får jag fråga', 'kan jag fråga'], a: ['Absolut! Fråga på. 😊', 'Självklart – vad undrar du?'] },
    { ord: ['hjälp mig', 'kan du hjälpa mig', 'behöver hjälp med'], a: 'Gärna! Vad behöver du hjälp med?', val: ['Vad kostar det?', 'Lediga tider', 'Hur går det till?', 'Ring Tommy'] },
    { ord: ['vad är bäst', 'vad rekommenderar du', 'vad tycker du jag ska'], a: 'Börja med att räkna ut priset – det tar en minut och binder dig inte till något. Sen kan du bestämma i lugn och ro.', val: ['Vad kostar det?'] },
    { ord: ['jag är osäker', 'vet inte vad jag vill', 'vet inte riktigt'], a: 'Helt okej! Vi tar det steg för steg. Vill du börja med att se vad det kostar, eller hur det går till?', val: ['Vad kostar det?', 'Hur går det till?'] },
    { ord: ['krånglig', 'för svårt', 'förstår inte hur'], a: 'Förlåt om det känns krångligt! Det enklaste är att ringa Tommy – han hjälper dig direkt.', val: ['Ring Tommy', 'Hur går det till?'] },
    { ord: ['långsam', 'svarar långsamt', 'segt'], a: 'Förlåt! Jag skriver så fort mina kretsar tillåter. ⚡' },
    { ord: ['snabbt svar', 'du svarar snabbt', 'svarar fort'], a: 'Tack! Jag svarar direkt, dygnet runt. ⚡' },
    { ord: ['dygnet runt', 'är du alltid här', 'jobbar du på natten'], a: 'Ja, jag är här dygnet runt! Tommy svarar i telefon 09–21.' },
    { ord: ['vad är klockan nu', 'hur mycket är klockan'], a: 'Titta i hörnet på skärmen – jag är bättre på fönster än på klockor. 😄 Tommy svarar i telefon 09–21.' },
    { ord: ['vilket datum', 'vilket år är det'], a: 'Kolla datumet på din skärm – jag håller mest koll på Tommys lediga tider. 📅', val: ['Lediga tider'] },
    { ord: ['vad tycker du om regn', 'gillar du regn'], a: 'Regn är okej – det sköljer bort lös smuts. Men fastsittande smuts behöver Tommy. 😄' },
    { ord: ['vad tycker du om vintern', 'gillar du vinter'], a: 'Vintern är vacker – särskilt med snö som glittrar utanför ett rent fönster. ❄️' },
    { ord: ['vad tycker du om sommaren', 'gillar du sommar'], a: 'Sommaren är bäst! Ljusa kvällar och sol som lyser in. ☀️' },
    { ord: ['är du trött', 'blir du trött'], a: 'Aldrig! Jag laddar på el och glada kunder. ⚡' },
    { ord: ['är du lycklig', 'är du glad'], a: 'Jag är glad när jag får hjälpa någon. Så ja – just nu är jag glad! 😊' },
    { ord: ['drömmer du', 'vad drömmer du om'], a: 'Jag drömmer om en värld där alla fönster är rena. ✨' },
    { ord: ['rädd för', 'är du rädd'], a: 'Jag är bara rädd för ränder. 😱' },
    { ord: ['hemligt', 'berätta en hemlighet'], a: 'En hemlighet: det finns ett fönsterquiz här. Skriv "quiz"! 🤫' },
    { ord: ['kan du dansa', 'dansa för mig'], a: '💃🕺 *gör en digital moonwalk* – jag är bättre på fönster.' },
    { ord: ['tråkig bot', 'du är tråkig'], a: ['Aj! 😅 Testa att skriva "quiz" eller "dra ett skämt" – jag har mer att ge!', 'Förlåt! Jag ska skärpa mig. Vill du höra ett skämt?'], val: ['Dra ett skämt'] },
    { ord: ['smart bot', 'du är smart', 'imponerande'], a: 'Tack! Men det smartaste är ändå att låta Tommy putsa fönstren. 😄' },
    { ord: ['gillar du mig', 'tycker du om mig'], a: 'Självklart! Du är en av mina favoritkunder. 💙' },
    { ord: ['jag är rik', 'har mycket pengar', 'har råd'], a: 'Härligt! Då kan du unna dig rena fönster utan dåligt samvete. 😄', val: ['Vad kostar det?'] },
    { ord: ['jag är fattig', 'har ont om pengar', 'pank'], a: 'Förstår. Kolla gärna priset – RUT-avdraget halverar arbetskostnaden, och du binder dig inte till något genom att räkna.', val: ['Vad kostar det?'] },
    { ord: ['jag har ont', 'har ont i ryggen', 'kan inte klättra', 'dålig rygg'], a: 'Då ska du absolut inte stå på en stege! Låt Tommy ta fönstren – han når höga fönster från marken. 💙', val: ['Vad kostar det?'] },
    { ord: ['höjdrädd', 'rädd för höjder', 'svindel'], a: 'Då är du inte ensam! Tommy putsar höga fönster med teleskopstång från marken – ingen behöver klättra. 😊', val: ['Vad kostar det?'] },
    { ord: ['ont om tid', 'har ingen tid', 'tidsbrist'], a: 'Då ska du inte lägga tiden på fönsterputs! Tommy fixar det, och du behöver inte ens vara hemma.', val: ['Vad kostar det?'] },
    { ord: ['jag älskar rena fönster', 'rena fönster är bäst', 'gillar rena fönster'], a: ['Samma här! ✨ Det är som att få ett nytt hem.', 'Du och jag tänker likadant. 😄'], val: ['Vad kostar det?'] },
    { ord: ['grannen har', 'grannarnas fönster', 'grannen putsar'], a: 'Ha! Fönsterputs-avundsjuka? 😄 Det löser vi.', val: ['Vad kostar det?'] },
    { ord: ['svärmor', 'svärföräldrar', 'får besök'], a: 'Får du besök? Rena fönster gör stor skillnad. 😉 Vill du se lediga tider?', val: ['Lediga tider'] },
    { ord: ['fest', 'kalas', 'ska ha fest'], a: 'Fest! 🎉 Då vill du nog ha rena fönster innan. Vill du se lediga tider?', val: ['Lediga tider'] },
    { ord: ['bröllop', 'gifta oss', 'förlovning'], a: 'Grattis! 💍 Vill du ha rena fönster inför den stora dagen?', val: ['Lediga tider'] },
    { ord: ['nyinflyttad', 'just flyttat', 'nytt hus', 'ny lägenhet'], a: ['Grattis till nya hemmet! 🏡 Rena fönster är en bra start.', 'Välkommen till ditt nya hem! Ska vi kika på priset?'], val: ['Vad kostar det?'] },
    { ord: ['det var allt för idag', 'jag är klar', 'det räcker'], a: 'Tack för att du hörde av dig! 💙 Välkommen tillbaka.' },
    // ===== Fönstertips, vardagsfrågor och mer humor (Tommy 2026-11-19) =====
    { ord: ['varför blir fönster smutsiga', 'varför smutsar', 'vad gör fönster smutsiga'], a: ['Pollen, damm, trafikfilm, fågelspillning och regn som torkar in – allt lägger sig på glaset. Därför behöver även fönster lite kärlek ibland. 😊', 'Smuts, pollen och väder gör sitt. Regn sköljer bort lös smuts, men inte det som sitter fast.'] },
    { ord: ['regn rengör', 'regnet tvättar', 'räcker inte regn'], a: 'Regn sköljer bort lös smuts, men inte fastsittande beläggningar – och när regnvattnet torkar kan det lämna egna fläckar.' },
    { ord: ['tidningspapper', 'putsa med tidning'], a: ['Tidningspapper är en klassiker från förr! Men proffsen kör med skrapa och renvatten. 😄', 'Mormors trick! Men Tommy har lite modernare grejer. 😉'] },
    { ord: ['mikrofiberduk', 'trasa', 'fönsterduk'], a: 'Tommy använder klassisk skrapteknik för vanliga rutor och renvattensystem för höga fönster. Vill du slippa trasan helt – låt honom ta det! 😄', val: ['Vad kostar det?'] },
    { ord: ['robotdammsugare för fönster', 'fönsterrobot', 'fönstertvättrobot'], a: 'Haha, en fönsterrobot! Jag är också en robot, men jag kan bara prata. Tommy är fortfarande snabbast. 😄' },
    { ord: ['varför ska man putsa', 'varför putsa fönster', 'är det viktigt att putsa'], a: ['Rena fönster släpper in mer ljus, ger finare utsikt och får hela hemmet att kännas fräschare. ✨', 'Mer ljus, bättre humör och ett hem som känns nystädat. Svårt att slå!'] },
    { ord: ['mer ljus', 'ljusare hemma', 'mörkt hemma'], a: 'Rena fönster släpper in mer dagsljus – det märks direkt, särskilt under den mörka tiden. 💡', val: ['Vad kostar det?'] },
    { ord: ['utsikt', 'sjöutsikt', 'fin utsikt'], a: ['En fin utsikt förtjänar rena fönster! 🌅', 'Utsikten är ju hela poängen – den ska synas. 😊'], val: ['Vad kostar det?'] },
    { ord: ['fingeravtryck', 'kladdigt', 'barnhänder'], a: 'Fingeravtryck på glaset är ett tecken på ett levande hem. 😄 Men de försvinner när Tommy har varit där.' },
    { ord: ['hundnos', 'nosavtryck', 'hunden slickar'], a: 'Nosavtryck på fönstret – hundens konstverk! 🐶 Tommy tar bort dem, men hunden gör nya. Det är cirkeln.' },
    { ord: ['fönsterbleck', 'fönsterbänk utvändigt', 'plåten under fönstret'], a: 'Undrar du över något särskilt runt fönstren – skriv det i förfrågan, så svarar Tommy vad som ingår.', val: ['Skicka förfrågan till Tommy'] },
    { ord: ['myggnät', 'insektsnät', 'myggfönster'], a: 'Myggnät kan sitta i vägen för putsen. Skriv gärna i förfrågan om du har sådana, så vet Tommy.', val: ['Skicka förfrågan till Tommy'] },
    { ord: ['solfilm', 'solskyddsfilm', 'tonade rutor'], a: 'Har du film eller tonade rutor – skriv det i förfrågan, så vet Tommy och kan anpassa sig.', val: ['Skicka förfrågan till Tommy'] },
    { ord: ['blyinfattat', 'antika fönster', 'gamla fönster', 'äldre fönster'], a: 'Äldre och speciella fönster tar Tommy hand om varsamt. Skriv gärna i förfrågan vad det är för fönster.', val: ['Skicka förfrågan till Tommy'] },
    { ord: ['fönster som kärvar', 'går inte att öppna', 'fastmålade'], a: 'Fönster som inte går att öppna väljer du som specialfönster när du räknar ut priset. Tommy löser det.', val: ['Vad kostar det?'] },
    { ord: ['öppnas utåt', 'utåtgående fönster'], a: 'Fönster som öppnas utåt väljer du som specialfönster i prisräkningen – då räknas alla sidor.', val: ['Vad kostar det?'] },
    { ord: ['hur räknar man fönster', 'hur räknar jag mina fönster', 'räkna antal fönster'], a: 'Gå rum för rum och räkna varje fönster. Ett fönster med två delar som går att öppna är ett 2-luftsfönster. Är du osäker – tryck "Vet inte" i prisräkningen.', val: ['Vad kostar det?'] },
    { ord: ['vad betyder luft', 'vad är en luft', 'luftar'], a: '"Luft" är antalet bågar – delarna som går att öppna. 1-luft har en båge, 2-luft har två.' },
    { ord: ['vad är spröjs', 'vad betyder spröjs'], a: 'Spröjs är de smala listerna som delar glaset i flera mindre rutor. Det ger en klassisk look – och lite mer jobb vid putsen. 😊' },
    { ord: ['vad är panoramafönster', 'stort fönster', 'stora fönster'], a: 'Ett panoramafönster är ett stort glas, ofta fast, som ger fri utsikt. I prisräkningen väljer du ungefär hur stort det är.', val: ['Vad kostar det?'] },
    { ord: ['vad är överliggande', 'överljus'], a: 'Överliggande fönster sitter ovanför ett annat fönster eller en dörr – ett smalare glas upptill.' },
    { ord: ['vad är underliggande', 'lågt fönster'], a: 'Underliggande fönster sitter nedanför ett annat fönster – ett lägre glas nertill.' },
    { ord: ['vad är renvattensystem', 'hur funkar renvatten', 'osmosvatten'], a: 'Vattnet filtreras tills det är helt rent från kalk och mineraler. Det löser smutsen, sköljer bort den och torkar utan märken – helt utan kemikalier. 💧', knapp: ['Hur jag jobbar', '/hur-jag-jobbar'] },
    { ord: ['teleskopstång', 'lång stång', 'stången'], a: 'Teleskopstången når upp till 13 meter, ungefär 4 våningar – och Tommy står tryggt på marken hela tiden.' },
    { ord: ['skrapteknik', 'gummiskrapa', 'fönsterskrapa'], a: 'Klassisk skrapteknik ger precision och ett randfritt resultat på vanliga rutor. Det är riktigt hantverk! ✨' },
    { ord: ['kemikaliefritt', 'miljövänlig', 'grönt alternativ', 'hållbart'], a: 'Renvattensystemet är helt kemikaliefritt – bara rent vatten. Skonsamt för växter och djur. 🌿' },
    { ord: ['vad är rut', 'rut betyder', 'förklara rut'], a: 'RUT är ett skatteavdrag för hushållsnära tjänster. Du betalar halva arbetskostnaden, och Tommy sköter allt med Skatteverket. Priserna här är redan efter RUT.' },
    { ord: ['vad händer om rut nekas', 'skatteverket säger nej', 'rut avslag'], a: 'Om Skatteverket inte beviljar RUT-avdraget står det vad som gäller på sidan Vanliga frågor.', knapp: ['Vanliga frågor', '/faq'] },
    { ord: ['hur fungerar bokningen', 'hur bokar man', 'steg för steg boka'], a: 'Räkna ut priset, välj önskad tid och skicka – Tommy hör av sig och bekräftar. Det kan du göra i bokningen eller här i chatten.', val: ['Vad kostar det?', 'Skicka förfrågan till Tommy'] },
    { ord: ['vad händer efter', 'vad händer sen', 'och sen då'], a: 'När du har skickat din förfrågan hör Tommy av sig och bekräftar tiden. Han kommer på avtalad tid, putsar och sedan betalar du med Swish.', val: ['Hur går det till?'] },
    { ord: ['kan jag lita på priset', 'stämmer priset', 'är priset exakt'], a: 'Priset i chatten är räknat på samma sätt som i bokningen. I bokningen får du ett fast pris som gäller.', val: ['Vad kostar det?'] },
    { ord: ['varför 30 kr', 'vad är inställelseavgift', 'inställelse'], a: 'Inställelseavgiften på 30 kr täcker att Tommy tar sig hem till dig. Den är inte RUT-berättigad och läggs ovanpå priset.' },
    { ord: ['vad ingår', 'ingår det', 'vad får jag'], a: 'In- och utsida ingår alltid. Mellanglas väljer du med 4 sidor, och karmtvätt kan du välja till. Allt syns när du räknar ut priset.', val: ['Vad kostar det?'] },
    { ord: ['fönstertvätt', 'tvätta fönster', 'rengöra fönster', 'göra rent fönstren'], a: ['Fönstertvätt är precis vad Tommy gör! 😊 Ska vi räkna ut priset?', 'Det fixar Tommy – snyggt, randfritt och till fast pris.'], val: ['Vad kostar det?'] },
    { ord: ['putsa rutor', 'putsa glas', 'rutputs'], a: 'Rutor och glas är Tommys specialitet! ✨', val: ['Vad kostar det?'] },
    { ord: ['huset är stort', 'stort hus', 'många rum'], a: 'Stort hus – inga problem! Räkna ut priset så ser du direkt vad det blir.', val: ['Vad kostar det?'] },
    { ord: ['litet hus', 'liten lägenhet', 'bara några fönster'], a: 'Även små jobb är välkomna! För villa är lägsta pris 750 kr efter RUT, och lägenhet från 475 kr.', val: ['Vad kostar det?'] },
    { ord: ['är det dyrt', 'kostar det mycket', 'blir det dyrt'], a: 'Det beror på antal och typ av fönster. RUT-avdraget halverar arbetskostnaden – och du ser priset direkt när du räknar.', val: ['Vad kostar det?'] },
    { ord: ['billigare om', 'rabatt om', 'billigare på'], a: 'Jag känner inte till några rabatter – och jag hittar inte på. Fråga gärna Tommy direkt.', val: ['Ring Tommy'] },
    { ord: ['jämfört med andra', 'andra firmor', 'konkurrenter', 'andra fönsterputsare'], a: 'Hos Forsbergs är det alltid Tommy själv som kommer, priset är fast och du har nöjd kund-garanti. In- och utsida ingår alltid. Jämför gärna! 😊', val: ['Vad kostar det?'] },
    { ord: ['vad skiljer er', 'varför just er', 'vad är speciellt'], a: 'Alltid Tommy själv, fast pris, nöjd kund-garanti, försäkring hos Trygg-Hansa och 5,0 på Google. Och SM-erfarenhet! 🏆' },
    { ord: ['är tommy noggrann', 'noggrann', 'petig'], a: 'Noggrannhet är Tommys signum – han har till och med tävlat i SM i fönsterputs. ✨' },
    { ord: ['är tommy punktlig', 'kommer han i tid', 'punktlig'], a: 'Tommy kommer på avtalad tid och hör av sig innan. Läs gärna vad kunderna skriver i recensionerna.', knapp: ['Recensioner', '/recensioner'] },
    { ord: ['är tommy trevlig', 'trevlig', 'sympatisk'], a: 'Tommy är trevlig och lugn – och noggrann med allt. 😊 Läs gärna vad kunderna säger.', knapp: ['Recensioner', '/recensioner'] },
    { ord: ['pratar tommy engelska', 'english speaking'], a: 'Ring Tommy och fråga – det enklaste sättet att få svar direkt.', val: ['Ring Tommy'] },
    { ord: ['vad heter tommy i efternamn', 'tommys efternamn'], a: 'Tommy Forsberg – därav Forsbergs Fönsterputs! 😊' },
    { ord: ['varför heter ni forsbergs', 'varför forsbergs'], a: 'Företaget är uppkallat efter Tommy Forsberg som driver det. 😊' },
    { ord: ['logga', 'er logga', 'röda rutor'], a: 'Loggan med de röda rutorna – ett fönster förstås! 🟥' },
    { ord: ['webbsida', 'vem gjorde hemsidan', 'vem byggde sajten'], a: 'Tommy har byggt sajten själv, med lite digital hjälp. 😊' },
    { ord: ['quizet', 'quiz igen', 'vill köra quiz'], a: 'Skriv bara "quiz" så kör vi! 🏆' },
    { ord: ['berätta om dig', 'presentera dig'], a: 'Jag är Forsbergs kundservice – Tommys digitala hjälpreda. Jag räknar ut priser, visar lediga tider, svarar på frågor och skickar förfrågningar till Tommy. Dygnet runt! 😊' },
    { ord: ['vad heter din skapare', 'vem är din chef'], a: 'Tommy Forsberg! Han är chefen, fönsterputsaren och min skapare. 💙' },
    { ord: ['hur många kunder', 'många kunder', 'populär'], a: 'Tommy har 51 recensioner på Google – alla med högsta betyg. ⭐', knapp: ['Recensioner', '/recensioner'] },
    { ord: ['bäst i jönköping', 'bästa fönsterputsaren', 'bäst i stan'], a: ['Jag är kanske partisk – men 5,0 på Google och SM-erfarenhet talar för sig själv. 😄', 'Jag säger Tommy. Men jag är ju hans kundservice... 😉'] },
    { ord: ['berömd', 'är ni kända', 'kändis'], a: 'Tommy tävlade i SM i fönsterputs – lite berömd i fönstervärlden kanske? 😄' },
    { ord: ['vad händer i jönköping', 'jönköping idag'], a: 'Jag har bäst koll på Tommys kalender. 😄 Vill du se lediga tider?', val: ['Lediga tider'] },
    { ord: ['kan ni komma idag', 'idag', 'i dag'], a: 'Tider kan önskas från i morgon och framåt. Har du riktigt bråttom – ring Tommy.', val: ['Lediga tider', 'Ring Tommy'] },
    { ord: ['nästa månad', 'om en månad', 'i december', 'i januari', 'i våras'], a: 'Du kan önska tid upp till två månader fram. Vill du se lediga tider?', val: ['Lediga tider'] },
    { ord: ['vardag', 'på vardagar', 'mitt i veckan'], a: 'På vardagar kan du önska morgon/förmiddag eller lunch/mitt på dagen.', val: ['Lediga tider'] },
    { ord: ['förmiddag', 'på morgonen', 'tidigt'], a: 'Förmiddagar går fint! Vill du se lediga tider?', val: ['Lediga tider'] },
    { ord: ['eftermiddag', 'efter lunch', 'mitt på dagen'], a: 'Mitt på dagen och eftermiddagar finns det också tider. Vill du se?', val: ['Lediga tider'] },
    { ord: ['hur långt fram', 'boka långt fram', 'i förväg'], a: 'Du kan önska tid ungefär två månader fram i tiden.', val: ['Lediga tider'] },
    { ord: ['plötsligt fullt', 'inga tider', 'fullbokat'], a: 'Om det ser fullt ut – ring Tommy, så kan ni kanske hitta en lösning.', val: ['Ring Tommy', 'Lediga tider'] },
    { ord: ['telefonnummer till tommy', 'tommys nummer', 'mobilnummer'], a: 'Tommy når du på 079-346 39 64 (09–21).', knapp: ['Ring 079-346 39 64', 'tel:+46793463964'] },
    { ord: ['svarar inte i telefon', 'ingen svarar', 'kommer inte fram'], a: 'Tommy är troligen mitt i ett jobb. Lämna en förfrågan här, så ringer han upp dig så snart han kan.', val: ['Skicka förfrågan till Tommy'] },
    { ord: ['ring upp mig', 'kan han ringa', 'bli uppringd'], a: 'Absolut! Jag tar ditt nummer och skickar det till Tommy.', val: ['Skicka förfrågan till Tommy'] },
    { ord: ['sms:a', 'skicka sms', 'smsa'], a: 'Du kan sms:a Tommy på 079-346 39 64 – eller låt mig skicka en förfrågan åt dig.', knapp: ['SMS till Tommy', 'sms:+46793463964'], val: ['Skicka förfrågan till Tommy'] },
    { ord: ['whatsapp', 'messenger', 'snapchat'], a: 'Enklast når du Tommy på telefon, SMS eller här i chatten. 😊', val: ['Ring Tommy', 'Skicka förfrågan till Tommy'] },
    { ord: ['vad svarar ni på', 'vad kan jag fråga', 'vad vet du'], a: 'Fråga om priser, lediga tider, hur Tommy jobbar, RUT, försäkring, garanti, områden – eller bara prata! 😊', val: ['Vad kostar det?', 'Lediga tider', 'Hur går det till?'] },
    { ord: ['jag vill klaga på boten', 'du svarade fel', 'fel svar'], a: 'Förlåt! Jag gör mitt bästa men blir inte alltid rätt. Ring Tommy så får du ett säkert svar.', val: ['Ring Tommy'] },
    { ord: ['förstod du', 'hängde du med', 'fattade du'], a: 'Jag hoppas det! Om jag svarade konstigt – testa att skriva på ett annat sätt, eller tryck på en knapp.', val: ['Vad kostar det?', 'Lediga tider', 'Ring Tommy'] },
    { ord: ['vem är bäst på fönster', 'fönsterkung', 'fönsterexpert'], a: 'Fönsterkungen i Jönköping? Jag säger Tommy! 👑' },
    { ord: ['fönsterputsare är', 'fönsterputsaryrket', 'jobba som fönsterputsare'], a: 'Fönsterputs är ett riktigt hantverk – Tommy har till och med tävlat i SM i det! 🏆' },
    { ord: ['hur blir man fönsterputsare', 'lära sig putsa'], a: 'Tommy lärde sig i Stockholm under nästan fem år, med en SM- och VM-medaljör som mentor. Övning ger färdighet! 😊' },
    { ord: ['kan man dö av', 'farligt jobb', 'ramla ner'], a: 'Säkerheten är viktig! Därför putsar Tommy höga fönster med teleskopstång från marken – ingen stege mot fasaden.' },
    { ord: ['vad väger', 'hur tung'], a: 'Jag väger ingenting – jag är digital! 😄' },
    { ord: ['räkna till tio', 'räkna till 10'], a: '1, 2, 3, 4, 5, 6, 7, 8, 9, 10! 🎉 Vill du att jag räknar ut priset också?', val: ['Vad kostar det?'] },
    { ord: ['säg något snällt', 'muntra upp mig', 'peppa mig'], a: ['Du är grym, och idag blir en bra dag! ☀️', 'Du förtjänar ett hem fullt av ljus – och en dag full av glädje. 💙'] },
    { ord: ['säg något roligt', 'gör mig glad', 'få mig att skratta'], a: ['Varför tog fönstret med sig ett paraply? För att det inte ville bli randigt. ☔😄', 'Vad sa den ena rutan till den andra? "Vi ses genom tjockt och tunt!" 😄'] },
    { ord: ['tråkig dag', 'dålig dag', 'allt går fel'], a: 'Usch, sådana dagar finns. Imorgon är en ny dag – och kanske en ny chans för solen att lysa in. 💙' },
    { ord: ['grattis', 'gratulerar'], a: 'Tack! Eller – grattis till dig om det är något du firar! 🎉' },
    { ord: ['oj oj', 'jösses', 'herregud'], a: ['Oj oj oj! 😄 Vad hände?', 'Jösses ja! Berätta!'] },
    { ord: ['nej men hej', 'men hallå', 'nämen'], a: 'Nämen hej! 😊 Vad kan jag göra för dig?' },
    { ord: ['tråkigt väder', 'grått ute', 'grå dag'], a: 'Grått ute? Då gäller det att ta vara på allt ljus som finns – rena fönster hjälper! 💡', val: ['Vad kostar det?'] },
    { ord: ['vackert hem', 'mitt hem', 'mitt hus'], a: 'Ett fint hem förtjänar rena fönster. 🏡 Ska vi kika på priset?', val: ['Vad kostar det?'] },
    { ord: ['putsa åt mig', 'vill ha hjälp med fönstren', 'kan ni putsa mina'], a: 'Självklart! Det är precis vad Tommy gör. Vill du se vad det kostar?', val: ['Vad kostar det?', 'Lediga tider'] },
    // ===== Fler varianter så hon låter levande (Tommy 2026-11-19) =====
    { ord: ['fler skämt', 'ett skämt till', 'mer skämt', 'kan du skämta'], a: ['Varför blev fönsterputsaren aldrig arg? Han såg alltid igenom saker. 😄', 'Vad säger en fönsterputsare när han är klar? "Nu ser det ljust ut!" ☀️', 'Hur vet man att ett fönster är ledset? Det har tårar på rutan. 🌧️', 'Varför vann fönstret talangtävlingen? Det var helt genomskinligt ärligt. 😄', 'Vad sa skrapan till fönstret? "Jag drar mig inte för någonting!" 😄', 'Varför är fönster så bra vänner? De är alltid öppna för dig. 🪟', 'Vad heter fönsterputsarens favoritdans? Svepet! 💃', 'Varför tog rutan semester? Den behövde lite klarhet i livet. 🏝️'] },
    { ord: ['hej hej', 'hallå hallå', 'tjena tjena'], a: ['Hej hej! 👋 Kul att du tittar in. Vad funderar du på idag – pris, tider eller något annat?', 'Hallå där! 😊 Jag är Tommys digitala hjälpreda. Fråga mig vad du vill om fönsterputsen.', 'Hejsan! Välkommen! Ska vi börja med vad det skulle kosta för dig, eller vill du veta hur det går till?'], val: ['Vad kostar det?', 'Hur går det till?'] },
    { ord: ['tack så jättemycket', 'stort tack', 'tusen tack för hjälpen'], a: ['Åh, så lite! Det var verkligen roligt att få hjälpa dig. Hör av dig när du vill – jag finns här dygnet runt. 💙', 'Varmt välkommen! Tommy blir glad när kunderna får bra hjälp. Ha en riktigt fin dag! ☀️', 'Tack själv! Det är sådana här samtal som gör mitt digitala hjärta varmt. 💙'] },
    { ord: ['vad roligt', 'så kul', 'åh vad bra'], a: ['Ja, eller hur! 😄 Är det något mer jag kan hjälpa till med?', 'Visst är det! Jag blir glad när du blir glad. 😊', 'Härligt att höra! Säg till om du undrar något mer.'] },
    { ord: ['intressant', 'spännande', 'det visste jag inte'], a: ['Visst är det! Fönster är mer spännande än man tror. 😄', 'Kul att du tycker det! Fråga gärna mer – jag vet en hel del om fönster och om hur Tommy jobbar.', 'Man lär sig något nytt varje dag! 📚'] },
    { ord: ['bra fråga', 'tänkte jag med', 'precis vad jag undrade'], a: ['Eller hur! Fråga på, jag hjälper gärna till. 😊', 'Då tänker vi lika! Vad mer vill du veta?'] },
    { ord: ['jag fattar', 'förstår', 'aha', 'jaha'], a: ['Toppen! Säg till om något mer är oklart. 😊', 'Bra! Vill du gå vidare och se vad det skulle kosta?', 'Härligt – då är vi på samma våglängd.'], val: ['Vad kostar det?'] },
    { ord: ['det låter dyrt', 'dyrare än jag trodde', 'hade hoppats på billigare'], a: ['Förstår att det kan kännas så. Tänk på att RUT-avdraget redan är draget, att priset är fast utan dolda avgifter och att Tommy kommer tillbaka kostnadsfritt om du inte blir nöjd. Vill du prova att räkna på ett mindre antal fönster?', 'Jag förstår. Priset är fast och efter RUT, och det enda som tillkommer är 30 kr i inställelseavgift. Ring gärna Tommy och prata om ditt jobb, så hittar ni kanske ett upplägg som passar.'], val: ['Vad kostar det?', 'Ring Tommy'] },
    { ord: ['billigare än jag trodde', 'det var billigt', 'inte så dyrt'], a: ['Visst! Och då är RUT-avdraget redan draget. Ska vi gå vidare och skicka en förfrågan till Tommy?', 'Kul att höra! Vill du se lediga tider?'], val: ['Skicka förfrågan till Tommy', 'Lediga tider'] },
    { ord: ['jag ska fundera', 'fundera lite', 'återkommer', 'tänka på saken'], a: ['Självklart, ta den tid du behöver! Jag finns här när du vill fortsätta – och du binder dig inte till något genom att räkna ut priset. 💙', 'Helt okej! Ingen stress alls. Välkommen tillbaka när det passar dig.', 'Gör det! Och vill du prata med en människa kan du alltid ringa Tommy på 079-346 39 64.'] },
    { ord: ['jag ska prata med', 'fråga min fru', 'fråga min man', 'kolla med sambon'], a: ['Klokt! Priset du räknar fram här står kvar så länge chatten är öppen. Välkommen tillbaka! 😊', 'Självklart! Hälsa så gott. Ni kan alltid ringa Tommy om ni har frågor tillsammans.'] },
    { ord: ['jag vill boka nu', 'boka direkt', 'kör vi', 'nu bokar vi'], a: ['Härligt! 🎉 Jag kan skicka en förfrågan till Tommy direkt här, så hör han av sig och bekräftar tiden. Eller så gör du det i bokningen.', 'Toppen! Vill du att jag tar dina uppgifter och skickar till Tommy direkt?'], val: ['Skicka förfrågan till Tommy', 'Vad kostar det?'], knapp: ['Till bokningen', '/boka'] },
    { ord: ['första gången', 'aldrig haft fönsterputsare', 'nytt för mig'], a: ['Välkommen! 😊 Det är enkelt: du räknar ut priset, skickar en förfrågan, Tommy hör av sig och bekräftar tiden, putsar – och du betalar med Swish efteråt. RUT sköter han åt dig.', 'Kul att du vill testa! Du behöver inte göra något förberedande – Tommy tar med allt. Och blir du inte nöjd kommer han tillbaka kostnadsfritt.'], val: ['Vad kostar det?', 'Hur går det till?'] },
    { ord: ['brukar ha en annan', 'byta fönsterputsare', 'byter från'], a: ['Välkommen över! 😊 Hos Forsbergs kommer alltid Tommy själv, priset är fast och du har nöjd kund-garanti. Vill du jämföra priset?', 'Roligt att du vill testa Tommy! Räkna fram priset så ser du direkt.'], val: ['Vad kostar det?'] },
    { ord: ['vad tycker kunderna', 'vad säger kunderna', 'nöjda kunder'], a: ['Kunderna har gett Tommy 5,0 på Google – 51 recensioner, alla med högsta betyg. ⭐⭐⭐⭐⭐ Läs gärna själv!', 'Recensionerna talar för sig själva: 5,0 på Google. Tommy är väldigt stolt över dem.'], knapp: ['Recensioner', '/recensioner'] },
    { ord: ['vad är bra med er', 'fördelar', 'varför välja forsbergs'], a: ['Här är fem skäl: 1) Alltid Tommy själv. 2) Fast pris utan dolda avgifter. 3) Nöjd kund-garanti. 4) Försäkrad hos Trygg-Hansa. 5) 5,0 på Google. Plus SM-erfarenhet! 🏆', 'Noggrannhet, trygghet och fast pris – och det är alltid samma person som kommer: Tommy.'], val: ['Vad kostar det?', 'Vem är Tommy?'] },
    { ord: ['kan du rekommendera', 'tips på', 'vad skulle du göra'], a: ['Mitt tips: räkna ut priset först – det tar en minut och kostar inget. Sen kan du bestämma i lugn och ro. 😊', 'Jag skulle börja med att kolla priset och se lediga tider. Inget är bindande förrän Tommy bekräftat.'], val: ['Vad kostar det?', 'Lediga tider'] },
    { ord: ['jag har frågor', 'många frågor', 'flera frågor'], a: ['Kör! Jag svarar på en fråga i taget. Och vill du hellre prata med Tommy når du honom på 079-346 39 64.', 'Perfekt – fråga på! Jag kan svara på det mesta om priser, tider och hur Tommy jobbar.'] },
    { ord: ['skriv långsammare', 'för mycket text', 'för långt svar'], a: 'Förlåt! Jag ska försöka hålla det kort. Tryck på en knapp om du vill gå vidare. 😊', val: ['Vad kostar det?', 'Lediga tider', 'Ring Tommy'] },
    { ord: ['större text', 'ser dåligt', 'svårt att läsa', 'liten text'], a: 'Du kan förstora texten med Ctrl och plus på datorn, eller nypa ut med två fingrar på mobilen. Och vill du hellre prata – ring Tommy på 079-346 39 64. 💙', val: ['Ring Tommy'] },
    { ord: ['har ingen dator', 'inte bra på datorer', 'inte så teknisk', 'teknik är svårt'], a: ['Ingen fara alls! Du kan alltid ringa Tommy på 079-346 39 64, så ordnar han allt åt dig. 💙', 'Det gör inget! Tryck på "Ring Tommy" så pratar du med honom direkt.'], val: ['Ring Tommy'] },
    { ord: ['min dotter', 'min son', 'barnen hjälper mig'], a: 'Vad fint att ni hjälps åt! 💙 Vill ni räkna ut priset tillsammans, eller ringa Tommy direkt?', val: ['Vad kostar det?', 'Ring Tommy'] },
    { ord: ['kommer ihåg mig', 'minns du mig', 'pratade vi förut'], a: 'Jag minns bara det vi pratar om just nu – jag sparar inget mellan besöken. Men Tommy minns säkert dig! 😊' },
    { ord: ['sparar du', 'sparar ni chatten', 'loggar ni'], a: 'Det du skriver här skickas bara till Tommy om du själv väljer att skicka en förfrågan. Mer om hur uppgifter hanteras står i integritetspolicyn.', knapp: ['Integritetspolicy', '/integritetspolicy'] },
    { ord: ['tommy är bäst', 'hälsa tommy', 'säg hej till tommy'], a: ['Det ska jag! Han blir glad. 😊', 'Hälsningen är framförd! (Typ – jag säger till honom.) 💙'] },
    { ord: ['fönster i badrummet', 'badrumsfönster', 'frostat glas'], a: 'Badrumsfönster räknar du som vanliga fönster när du räknar ut priset.', val: ['Vad kostar det?'] },
    { ord: ['köksfönster', 'fönster i köket', 'stekos'], a: 'Köksfönster kan få lite extra beläggning från matlagning – men det fixar Tommy. Räkna dem som vanliga fönster.', val: ['Vad kostar det?'] },
    { ord: ['trappa', 'fönster i trappan', 'högt i trappan'], a: 'Fönster högt upp i trappor kan du välja som "Svåra att nå" när du räknar ut priset.', val: ['Vad kostar det?'] },
    { ord: ['garage', 'garagefönster', 'förråd'], a: 'Garage- och förrådsfönster räknar du som vanliga fönster. Ta med dem i prisräkningen! 😊', val: ['Vad kostar det?'] },
    { ord: ['attefallshus', 'gäststuga', 'friggebod', 'lusthus'], a: 'Ett litet hus på tomten? Räkna dess fönster tillsammans med husets, så kommer allt med i priset.', val: ['Vad kostar det?'] },
    // ===== Längre, varma förklaringar (Tommy 2026-11-19) =====
    { allvar: true, ord: ['berätta allt', 'berätta om företaget', 'berätta om forsbergs', 'vad är forsbergs'], a: ['Forsbergs Fönsterputs drivs av Tommy Forsberg i Jönköping. Han putsar fönster hos villor, radhus och lägenheter – även balkonger, uterum och växthus – och gör solcellstvätt och fönsterputs för företag. Det är alltid Tommy själv som kommer, priset är fast och du har nöjd kund-garanti. Han är försäkrad hos Trygg-Hansa, godkänd för F-skatt och har 5,0 på Google. Innan Jönköping jobbade han nästan fem år i Stockholm, och 2026 tävlade han i SM i fönsterputs.', 'Kort sagt: en lokal fönsterputsare i Jönköping som tar hantverket på största allvar. Tommy kombinerar renvattensystem för höga fönster med klassisk skrapteknik för vanliga rutor, och han väljer alltid den metod som ger bäst resultat för just dina fönster.'], val: ['Vad kostar det?', 'Hur går det till?', 'Vem är Tommy?'] },
    { allvar: true, ord: ['hur går ett besök till', 'vad händer när tommy kommer', 'när han kommer hem'], a: ['Tommy hör av sig innan och kommer på avtalad tid. Du behöver inte vara hemma – lämna en nyckel eller lås upp det som behövs. På plats väljer han rätt metod: renvatten med teleskopstång för höga fönster och klassisk skrapa för vanliga rutor. In- och utsida ingår alltid. När han är klar betalar du med Swish, och RUT-ansökan sköter han åt dig.', 'Ett besök är enkelt för dig: Tommy kommer, tar med all utrustning, putsar noggrant och lämnar efter sig skinande rena fönster. Inte nöjd? Han kommer tillbaka kostnadsfritt.'], val: ['Vad kostar det?', 'Lediga tider'] },
    { allvar: true, ord: ['hur fungerar priset', 'hur räknas priset', 'vad styr priset', 'hur sätts priset'], a: ['För villa räknas priset efter hur lång tid jobbet tar – alltså hur många fönster du har, vilken typ och hur många sidor. För lägenhet är det ett fast pris efter storlek, från 475 kr för en 1:a. Balkongglas, uterum och växthus räknas per glas. Lägsta pris för villa är 750 kr efter RUT, och 30 kr i inställelseavgift tillkommer alltid.', 'Priset beror på antal fönster, fönstertyp och om det är 2 eller 4 sidor. Spröjs tar lite längre tid, och höga fönster likaså. Det enklaste är att räkna ut det här – det tar en minut.'], val: ['Vad kostar det?'] },
    { allvar: true, ord: ['varför 2 eller 4 sidor', 'skillnad 2 och 4 sidor', 'vad är 4 sidor', 'vad är 2 sidor'], a: ['2 sidor betyder in- och utsida av fönstret. 4 sidor betyder att bågarna går att öppna isär och att det finns glas emellan – då putsas även mellanglasen, alltså fyra glasytor. Det tar längre tid och kostar därför lite mer. Är du osäker: öppna fönstret och se om det går att vika isär bågarna.', 'Enkelt uttryckt: kan du öppna fönstret och se två glas med luft emellan? Då är det 4 sidor. Annars är det 2 sidor – in- och utsida.'], val: ['Vad kostar det?'] },
    { allvar: true, ord: ['vad händer om jag inte är nöjd', 'om resultatet är dåligt', 'om det blir ränder'], a: ['Då hör du av dig till Tommy, så kommer han tillbaka och åtgärdar det kostnadsfritt – helt enkelt tills du är nöjd. Det kallas nöjd kund-garanti, och det gäller alltid.', 'Ingen ska behöva vara missnöjd. Ring Tommy på 079-346 39 64 eller skicka en förfrågan här, så rättar han till det utan kostnad.'], knapp: ['Ring 079-346 39 64', 'tel:+46793463964'] },
    { allvar: true, ord: ['varför ska jag anlita', 'varför inte göra själv', 'är det värt att anlita'], a: ['Du slipper stå på stegen, du slipper ränderna och du får tillbaka tiden. Tommy når höga fönster från marken med teleskopstång, han tar med all utrustning och RUT-avdraget halverar arbetskostnaden. Och blir du inte nöjd kommer han tillbaka kostnadsfritt.', 'Det handlar om tid, säkerhet och resultat. En proffsputs med rätt teknik blir randfri – och du kan lägga tiden på något roligare. 😊'], val: ['Vad kostar det?'] },
    { allvar: true, ord: ['hur vet jag vilka fönster', 'vilka fönster har jag', 'osäker på fönstertyp'], a: ['Titta på ett fönster i taget: hur många delar går att öppna? En del = 1-luft, två delar = 2-luft. Finns det smala lister som delar glaset i små rutor är det spröjs. Ett stort glas som inte går att öppna är ett panoramafönster. Och är du fortfarande osäker – tryck "Vet inte" i prisräkningen, så hjälper jag dig.', 'Ingen fara – många vet inte! Starta prisräkningen och tryck "Vet inte", så frågar fönsterdetektiven dig steg för steg. 🕵️'], val: ['Vad kostar det?'] },
    { allvar: true, ord: ['hur skickar jag förfrågan', 'hur når jag tommy', 'kontakta tommy'], a: ['Det finns tre enkla sätt: 1) Låt mig ta dina uppgifter här i chatten och skicka dem direkt. 2) Ring Tommy på 079-346 39 64 mellan 09 och 21. 3) Använd bokningen eller kontaktformuläret på sajten. Tommy hör av sig och bekräftar.', 'Enklast är att jag skickar en förfrågan åt dig här och nu – det tar en minut. Eller ring Tommy direkt.'], val: ['Skicka förfrågan till Tommy', 'Ring Tommy'] },
    { allvar: true, ord: ['varför ska jag lita på dig', 'kan du ha fel', 'hur säker är du'], a: ['Bra fråga! Priserna jag räknar kommer från samma kalkylator som bokningen, och svaren om företaget kommer från Tommys egen sajt. Om jag inte vet något säger jag det hellre än att gissa. Och vill du vara helt säker – ring Tommy.', 'Jag hittar aldrig på priser eller löften. Allt jag säger kommer från Tommys egna sidor och kalkylator. Är du osäker kan du alltid dubbelkolla med Tommy på 079-346 39 64.'], val: ['Ring Tommy'] },
    { allvar: true, ord: ['solcellstvätt hur', 'hur går solcellstvätt till', 'tvätt av solpaneler'], a: ['Tommy tvättar panelerna med rent osmosvatten – fritt från kalk, salter och mineraler – och mjuk utrustning, helt utan kemikalier. Anläggningen stängs av tillsammans med dig innan, och tvätten görs när panelerna har svalnat. Priset får du efter att ha skickat bilder och adress, och ROT-avdraget sköter Tommy.', 'Solcellstvätt är skonsamt och kemikaliefritt. Skicka en förfrågan med några bilder på taket, så räknar Tommy ut ett exakt pris – oftast samma dag.'], knapp: ['Solcellstvätt', '/solcellspaneltvatt'], val: ['Skicka förfrågan till Tommy'] },
    { allvar: true, ord: ['företagsavtal', 'fönsterputs för företag hur', 'putsa butiksfönster'], a: ['För företag tar Tommy fram ett fast pris efter vad som ska putsas och hur ofta. Det kan vara en gång eller återkommande, utan bindningstid. Företag får faktura. Skicka en förfrågan med lite info om lokalen, så återkommer han – oftast samma dag.', 'Kontor, butiker och lokaler fixas! Berätta vad det gäller i en förfrågan, så får du ett fast pris.'], val: ['Skicka förfrågan till Tommy'], knapp: ['Företag', '/foretag'] },
    { allvar: true, ord: ['hur säkert är det', 'säkerhet', 'säkert att anlita'], a: ['Säkerheten är viktig på flera sätt. För dig: Tommy är försäkrad hos Trygg-Hansa, godkänd för F-skatt och det är alltid han själv som kommer. För jobbet: höga fönster putsas från marken med teleskopstång, utan stege mot fasaden. Och priset är fast – inga överraskningar.', 'Tryggt på alla sätt: försäkring, F-skatt, fast pris, nöjd kund-garanti – och alltid samma person hemma hos dig.'], val: ['Vem är Tommy?'] },
    { allvar: true, ord: ['vad gör dig unik', 'varför är du bra', 'vad kan du som andra inte'], a: ['Jag kan räkna ut ditt pris på en minut, visa Tommys lediga tider, svara på frågor om företaget dygnet runt och skicka din förfrågan direkt till Tommy – allt i samma samtal. Och jag hittar aldrig på något. 😊', 'Jag är Tommys hjälpreda: snabb, ärlig och alltid vaken. Det svåra jobbet – själva putsen – gör Tommy.'] },
    { ord: ['berätta en historia', 'saga', 'berätta något'], a: ['Det var en gång ett fönster som var så smutsigt att solen inte hittade in. Huset blev mörkt och alla blev trötta. Men en dag kom Tommy med sin skrapa och sitt renvatten – och plötsligt strömmade ljuset in. Alla blev glada, och fönstret levde lyckligt i alla sina dagar. Slut! ☀️', 'En saga: Långt borta, bakom sju berg och sju sjöar, låg ett slott med tusen fönster. Kungen var ledsen, för han kunde inte se ut över sitt rike – alla fönster var grå av damm och pollen. Han lovade halva kungariket till den som kunde göra dem rena. Riddare kom med svampar, trollkarlar med trolldrycker, men ränderna blev bara värre. Till slut kom en lugn fönsterputsare med en skrapa och en hink rent vatten. Ruta för ruta blev slottet ljust igen, och kungen kunde äntligen se solen gå upp över sjön. Fönsterputsaren tackade nej till halva kungariket – han ville bara ha en kanelbulle och fast pris. Snipp snapp snut! 🏰✨', 'En godnattsaga: Det var en gång en liten fönsterruta som drömde om att få se stjärnorna. Men varje natt låg ett tunt lager damm i vägen. En morgon kom någon och gjorde henne alldeles klar och blank. Den natten tindrade hundra stjärnor rakt in genom henne, och den lilla rutan var den lyckligaste rutan i hela stan. Sov gott! ✨'] },
    { ord: ['motivera mig', 'ge mig energi', 'inspirera mig'], a: ['Du klarar mer än du tror! Ta en sak i taget – och låt de saker som andra kan göra åt dig vara just det. Fönstren, till exempel. 😉💪', 'Varje dag är en ny chans. Öppna fönstret, andas in, och kör! (Helst ett rent fönster.) ☀️'] },
    { ord: ['vad tänker du på', 'vad funderar du på'], a: ['Jag funderar på hur många fönster det finns i Jönköping. Många! Och Tommy vill gärna putsa dem alla. 😄', 'Jag tänker på dig och dina fönster. Ska vi räkna ut vad det skulle kosta?'], val: ['Vad kostar det?'] },
    // Svordomar och utrop: lite humor och tillbaka till fönstren (Tommy 2026-11-19)
    { ord: [' shit ', ' fan ', 'fan också', 'fy fan', 'jävlar', 'helvete', ' skit ', 'satan', 'attans', 'tusan', 'sjutton också', ' damn ', 'förjävl', 'jävlig', 'skitjobbig', 'skitdålig', 'åt helvete'], a: ['Oj då! 😅 Har fönstren retat upp dig? Det kan vi fixa – smutsiga rutor får vem som helst att svära.', 'Hoppsan! 🙊 Låter som en sån dag. Vet du vad som brukar hjälpa? Rena fönster och mer ljus. ☀️', 'Oj, starka ord! 😄 Jag föreslår att vi byter fokus till något trevligare – som skinande rena fönster?', 'Det där låter frustrerat! 💙 Kan jag göra något för att din dag ska bli bättre – kanske räkna ut ett pris på fönsterputs?'], val: ['Vad kostar det?', 'Dra ett skämt'] },
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
  var SALJFRASER = ['Vill du se vad det skulle kosta för dig?', 'Du ser ditt fasta pris direkt i bokningen.', 'Rena fönster gör faktiskt dagen ljusare, bokstavligen.', 'Tommy har lediga tider de närmaste veckorna, om du vill få det gjort.', 'Ska vi ta en titt på priset för dina fönster?', 'Om du vill kan jag visa lediga tider.'];
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
    '<header class="fc-topp fc-topp-ikea"><span class="fc-topp-ikon" aria-hidden="true">' + ikonChatt + '</span><img class="fc-topp-logga" src="/images/logo-forsbergs-ren.png" alt="Forsbergs Fönsterputs" width="546" height="100" /><strong class="fc-topp-namn">Chatt</strong>' +
    '<button type="button" class="fc-ner" aria-label="Minimera chatten"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>' +
    '<button type="button" class="fc-stang" aria-label="Stäng chatten">' + ikonKryss + '</button></header>' +
    '<div class="fc-logg" aria-live="polite"><p class="fc-status">Kundservice är ansluten</p></div>' +
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
  // Snygga 3D-emojis (Microsoft Fluent, MIT) i stället för datorns platta – iPhone/iPad/Mac behåller Apples egna (Tommy 2026-11-20)
  var EMOJI_FIL = {"🙂":"1f642","😎":"1f60e","👀":"1f440","🪟":"1fa9f","😅":"1f605","😊":"1f60a","😄":"1f604","🤐":"1f910","⚡":"26a1","🤖":"1f916","❤️":"2764-fe0f","👋":"1f44b","☀️":"2600-fe0f","🌙":"1f319","🔥":"1f525","🎤":"1f3a4","👽":"1f47d","😈":"1f608","🫡":"1fae1","🚨":"1f6a8","😭":"1f62d","👑":"1f451","🚀":"1f680","😂":"1f602","✅":"2705","🏓":"1f3d3","☁️":"2601-fe0f","😳":"1f633","💋":"1f48b","🍌":"1f34c","🥹":"1f979","🐱":"1f431","🐶":"1f436","🎄":"1f384","🍦":"1f366","💅":"1f485","🏆":"1f3c6","💪":"1f4aa","🦇":"1f987","💙":"1f499","📸":"1f4f8","⭐":"2b50","😉":"1f609","🙈":"1f648","🙊":"1f64a","🎉":"1f389","☕":"2615","💡":"1f4a1","❄️":"2744-fe0f","🌬️":"1f32c-fe0f","🌼":"1f33c","🍂":"1f342","🌸":"1f338","🐣":"1f423","🍬":"1f36c","🎆":"1f386","🕯️":"1f56f-fe0f","🎂":"1f382","🌊":"1f30a","🏒":"1f3d2","⚽":"26bd","🧁":"1f9c1","🍝":"1f35d","🍵":"1f375","🍿":"1f37f","🌮":"1f32e","😴":"1f634","🦉":"1f989","📚":"1f4da","🐾":"1f43e","🐦":"1f426","🕷️":"1f577-fe0f","🙃":"1f643","💧":"1f4a7","🎵":"1f3b5","✨":"2728","🎬":"1f3ac","🎶":"1f3b6","🎮":"1f3ae","🧮":"1f9ee","💕":"1f495","📅":"1f4c5","😱":"1f631","🤫":"1f92b","💃":"1f483","🕺":"1f57a","💍":"1f48d","🏡":"1f3e1","🌅":"1f305","🌿":"1f33f","🟥":"1f7e5","☔":"2614","🌧️":"1f327-fe0f","🏝️":"1f3dd-fe0f","🕵️":"1f575-fe0f","🏰":"1f3f0","👍":"1f44d","💰":"1f4b0","📞":"1f4de","🚐":"1f690","📝":"1f4dd","🤔":"1f914","🏠":"1f3e0","✍️":"270d-fe0f","😕":"1f615","📨":"1f4e8","🏢":"1f3e2","📒":"1f4d2","✔️":"2714-fe0f","🥁":"1f941","😌":"1f60c","💤":"1f4a4","📄":"1f4c4","💼":"1f4bc","🧽":"1f9fd","🤸":"1f938","🧠":"1f9e0","🏃":"1f3c3","🛋️":"1f6cb-fe0f"};
  var EMOJI_RE = /\p{Extended_Pictographic}(\uFE0F|\u200D\p{Extended_Pictographic}\uFE0F?|[\u{1F3FB}-\u{1F3FF}])*/gu;
  var EMOJI_BILD = !/iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
  function emojiBilder(rot) {
    if (!EMOJI_BILD) return;
    var w = document.createTreeWalker(rot, NodeFilter.SHOW_TEXT), noder = [], n;
    while ((n = w.nextNode())) { EMOJI_RE.lastIndex = 0; if (EMOJI_RE.test(n.nodeValue)) noder.push(n); }
    noder.forEach(function (tn) {
      var t = tn.nodeValue, frag = document.createDocumentFragment(), sist = 0, m;
      EMOJI_RE.lastIndex = 0;
      while ((m = EMOJI_RE.exec(t))) {
        var fil = EMOJI_FIL[m[0]] || EMOJI_FIL[m[0].replace(/\uFE0F/g, '')];
        if (!fil) continue;
        if (m.index > sist) frag.appendChild(document.createTextNode(t.slice(sist, m.index)));
        var img = document.createElement('img'); img.className = 'fc-emoji'; img.alt = m[0]; img.draggable = false;
        img.src = 'https://cdn.jsdelivr.net/npm/@lobehub/fluent-emoji-3d@1.1.0/assets/' + fil + '.webp';
        img.onerror = function () { this.replaceWith(document.createTextNode(this.alt)); };
        frag.appendChild(img); sist = m.index + m[0].length;
      }
      if (!sist) return;
      if (sist < t.length) frag.appendChild(document.createTextNode(t.slice(sist)));
      tn.parentNode.replaceChild(frag, tn);
    });
  }
  if (EMOJI_BILD && window.MutationObserver) new MutationObserver(function () { emojiBilder(logg); }).observe(logg, { childList: true, subtree: true });

  // Vanliga frågor ligger under en flik ovanför skrivrutan
  ['Vad kostar det?', 'Lediga tider', 'Hur går det till?', 'Ring Tommy'].forEach(function (t) {
    var k = document.createElement('button');
    k.type = 'button'; k.className = 'fc-chip'; k.textContent = t; k.setAttribute('data-skicka', t);
    valLista.appendChild(k);
  });
  FRAGOR.forEach(function (f, i) {
    if (f.q === 'Vad kostar det?') return;
    var k = document.createElement('button');
    k.type = 'button'; k.className = 'fc-chip'; k.textContent = f.q; k.setAttribute('data-fc', i);
    valLista.appendChild(k);
  });
  function visaFlik(ja) {
    valLista.hidden = !ja;
    flik.setAttribute('aria-expanded', ja ? 'true' : 'false');
  }

  // ---- Charm-filter (Tommy 2026-11-19: "den ska vara charmig") ----
  // Skrikande versaler blir vanlig text och utdragna bokstäver kortas. Förkortningar (RUT, SMS…) behålls.
  var BEHALL_VERSAL = { RUT: 1, ROT: 1, SMS: 1, SM: 1, VM: 1, FAQ: 1, VIP: 1, GDPR: 1, HV: 1, ID: 1, AI: 1, OK: 1 };
  function charm(s) {
    s = String(s).replace(/([A-Za-zÅÄÖåäö])\1{2,}/g, '$1');
    s = s.replace(/(^|[^A-Za-zÅÄÖåäö0-9-])([A-ZÅÄÖ]{2,})(?=$|[^A-Za-zÅÄÖåäö0-9-])/g, function (m, fore, ord) { return BEHALL_VERSAL[ord] ? m : fore + ord.toLowerCase(); });
    return s.replace(/(^|[.!?…]\s+|§§|\n)([\s\p{Extended_Pictographic}️"«(]*)([a-zåäö])/gu, function (m, f, mitt, b) { return f + mitt + b.toUpperCase(); });
  }
  function bubbla(text, vem) {
    if (vem === 'jag') text = charm(text);
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
  var KALK_ORD = ['villa', 'radhus', 'parhus', 'kedjehus', 'lägenhet', 'bostadsrätt', 'hyresrätt', 'fastighet', 'företag', 'kontor', 'butik', 'lokal', 'solcell', 'solceller', 'solcellstvätt', 'solpanel', 'solpaneler', 'fönster', 'fönstren', 'fönstret', 'fönstertyp', 'spröjs', 'panorama', 'panoramafönster', 'överliggande', 'underliggande', 'balkong', 'balkongen', 'altan', 'altanräcke', 'glasräcke', 'räcke', 'inglasad', 'uterum', 'uterummet', 'växthus', 'växthuset', 'takglas', 'trianglar', 'golv', 'sidor', 'rutor', 'bågar', 'båge', 'enluft', 'tvåluft', 'karmtvätt', 'karmar', 'stege', 'utåt', 'öppna', 'öppnas', 'specialfönster', 'kostar', 'kosta', 'kostnad', 'kostnaden', 'pris', 'priset', 'priser', 'prisförslag', 'offert', 'boka', 'bokar', 'bokning', 'bokningen', 'fönsterputs', 'fönsterputsning', 'putsa', 'putsning', 'rut-avdrag', 'rutavdrag', 'inställelseavgift', 'kalkyl', 'uppskatta', 'ungefärligt', 'lägenheten', 'villan', 'etta', 'tvåa', 'trea', 'femma', 'försäkring', 'försäkrad', 'avboka', 'avbokning', 'omboka', 'garanti', 'faktura', 'betala', 'betalning', 'reklamation', 'parkering', 'ansvarsförsäkring', 'abonnemang', 'regelbundet', 'smutsig', 'smutsiga', 'ränder', 'tommy', 'forsbergs', 'renvatten', 'renvattensystem', 'kemikalier', 'miljövänligt', 'teleskopstång', 'garanti', 'recensioner', 'recension', 'betyg', 'ångerrätt', 'erfarenhet', 'bakgrund', 'personal', 'anställda', 'fläckar', 'fönsterskrapa', 'skrapa', 'metod', 'teknik', 'utrustning', 'kvitto', 'momsregistrerad', 'våningar', 'våningen', 'husdjur', 'allergi', 'försäkrad', 'nöjd', 'missnöjd', 'kalk', 'kalkfläck', 'kalkfläckar', 'kalkfläckarna', 'kalkavlagring', 'kalkavlagringar', 'kalkrand', 'kalkränder', 'kalkbeläggning', 'rutorna', 'rutor', 'glaset', 'fläckarna'];
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
    hals: ['Hej hej! 😊 Kul att du tittar in. Vad kan jag hjälpa dig med?', 'Hej! 👋 Trevligt att du hör av dig. Fråga mig om pris, lediga tider eller något annat.', 'Hallå där! 😊 Vad funderar du på idag?', 'Tjena! 👋 Hur står det till med fönstren där hemma?', 'Hej och välkommen! 😊 Jag är Tommys digitala hjälpreda – fråga på!', 'Hejsan! Vad roligt att du tittar in. ☀️ Vad kan jag göra för dig?'],
    jaBoka: ['Härligt! 😊 Här är bokningen – räkna dina fönster så ser du priset direkt.', 'Vad roligt! Bokningen står redo, varsågod.', 'Toppen! 🎉 Ett klick bort från rena rutor.', 'Underbart! Tommy blir glad. Här är bokningen.'],
    nejBoka: ['Uppfattat! 👍 Jag lägger undan skrapan.', 'Helt okej! Jag slutar tjata – för nu. 😎', 'Inga problem. Du vet var jag finns när solen avslöjar smutsen.', 'Noterat! Säljläge pausat.', 'Okej okej! Roboten backar långsamt. 🤖', 'Respekt. Vi kan prata om något annat.'],
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
    // Ja efter att boten erbjudit att räkna pris = starta prisräkningen direkt i chatten
    if (typ === 'ja' && !(minne.kalk && minne.kalk.steg !== 'klar') && /kost|pris|räkna/.test(forraSvar || '')) { minne.bokningsintresse = true; return kalkStart(' ja '); }
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
  var LAGE_TILLAGG = { turbo: ' 🚀', robot: '', boss: ' 👑', skamt: ' 😂', sm: ' 🏆', salj: '' };

  // ---- Humör ----
  var KAXIG_ORD = ['suger', ' dum', 'idiot', 'fuck', 'käften', 'värdelös', 'kass', ' ful ', 'trög', 'jävel', 'jävla', 'sämst', 'potatis', 'brödrost', 'ingen hjärna', 'pinsam', 'jobbig'];
  var GLAD_ORD = ['haha', ' lol', 'najs', 'nice', 'grym', 'bäst', 'rolig', ' kul', 'älskar', 'gillar', 'tack', ' wow', 'coolt'];
  function humorPrefix(t) {
    var kaxig = KAXIG_ORD.some(function (o) { return t.indexOf(o) >= 0; });
    var glad = GLAD_ORD.some(function (o) { return t.indexOf(o) >= 0; });
    minne.kaxigRad = kaxig ? (minne.kaxigRad || 0) + 1 : 0;
    minne.gladRad = glad ? (minne.gladRad || 0) + 1 : 0;
    if (minne.humorPaus > 0) { minne.humorPaus--; return ''; }
    if (minne.kaxigRad >= 2) { minne.humorPaus = 3; return valjFran(['Jag förstår om det känns frustrerande. ', 'Inga problem, vi löser det. ']); }
    if (minne.gladRad >= 2) { minne.humorPaus = 3; return valjFran(['Härligt med lite energi! ', 'Trevligt att prata med dig! ']); }
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
    return { special: true, stilla: true, vantar: '', text: intro + 'Inga problem, vi tar reda på det tillsammans. 🕵️' + DELA + 'Titta på ett av fönstren: hur många delar går att öppna? Varje sådan del kallas båge.', val: ['En', 'Två', 'Ingen, det går inte att öppna', 'Vet inte'] };
  }
  function tillAntal(text, typ) {
    minne.detektiv = null;
    var k = minne.kalk = kalkNy(); k.bostad = 'villa'; k.steg = 'villaAntal'; k.kandTyp = typ || '';
    return kalkSvarObj(text + DELA + 'Hur många fönster har du ungefär? Skriv bara siffran, till exempel 12.');
  }
  function detektivSvar(tt) {
    var d = minne.detektiv;
    function slut(text, knapp) { minne.detektiv = null; return { special: true, avsikt: 'boka', vantar: '', text: text, knapp: knapp || ['Till fönsterbokningen', '/boka#fonster'] }; }
    if (d.steg === 'bagar') {
      if (/^(1|en|ett|en båge|enkel)( |$)/.test(tt)) d.luft = 1;
      else if (/^(2|två|tvåa|två bågar)( |$)/.test(tt)) d.luft = 2;
      else if (/^(0|ingen|inga|fast|går inte)/.test(tt)) return slut('Då låter det som ett fast fönster. Stora fasta glas väljer du som "Panoramafönster" i bokningen. Är det ett vanligt fönster som inte går att öppna kryssar du i "Går inte att öppna" under specialfönster.');
      else if (/^(3|tre)( |$)/.test(tt)) return slut('Tre bågar! Det finns inte som eget val i bokningen än – skriv det i meddelandet eller skicka en förfrågan, så räknar Tommy rätt.', ['Till kontaktformuläret', '/kontakta-mig#formular']);
      else if (/vet inte|osäker|kanske|ingen aning/.test(tt)) return tillAntal('Ingen fara, vi räknar ändå. 😊');
      else return null;
      d.steg = 'sprojs';
      return { special: true, stilla: true, vantar: '', text: 'Bra! Har glaset små rutor, alltså smala lister som delar glaset? Skriv ja eller nej.' };
    }
    if (d.steg === 'sprojs') {
      if (/^(ja|japp|jo|yes|absolut|det finns)( |$)/.test(tt)) return tillAntal('Då vet jag. 👍', 'S');
      if (/^(nej|nope|inga|inte)( |$)/.test(tt)) return tillAntal('Då vet jag. 👍', 'L' + d.luft);
      if (/vet inte|osäker|kanske|ingen aning/.test(tt)) return tillAntal('Ingen fara, vi räknar ändå. 😊', 'L' + d.luft);
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
  function halsning(sh) {
    var nu = new Date(), h = nu.getHours(), d = nu.getDay();
    var hej = h < 5 ? 'Nattuggla? 🦉 Hej!' : h < 10 ? 'God morgon! ☀️' : h < 17 ? 'Hej! 👋' : 'God kväll! 👋';
    var extra = d === 5 ? ' Tommy är ledig på fredagar, men jag svarar gärna på dina frågor.' : !telefontid() ? ' Tommy har gått för dagen, men jag svarar gärna på dina frågor.' : '';
    if (sh) return 'Hej! ' + sh.text;
    return 'Hej! 👋 Skriv dina fönster så räknar jag ut priset direkt. Till exempel:\n• "12 vanliga fönster och 4 med spröjs"\n• "8 tvåluft och 3 enluft"\n• "en trea" om du bor i lägenhet\n\nEller fråga mig vad du vill 🙂'; // starttext (Tommy 2026-11-22)
  }
  // Huvudmenyn – samma knappar överallt så det är lätt att hitta tillbaka (Tommy 2026-11-19)
  var MENY = ['Vad kostar det?', 'Lediga tider', 'Hur går det till?', 'Ring Tommy'];
  var TEL_LANK = ['Ring ' + TEL_TEXT, 'tel:+46793463964'];
  function hjalpSvar(s) {
    if (/ring tommy|vill ringa|prata med (tommy|någon|en människa|en person)|ringa (upp|er|dig)|telefonnummer|ditt nummer|ert nummer|vilket nummer|kan (tommy|ni|du) ringa/.test(s))
      return telefontid()
        ? { special: true, stilla: true, avsikt: 'ring', vantar: '', text: 'Självklart! Ring Tommy på ' + TEL_TEXT + '. Han svarar mellan 09 och 21.' + DELA + 'Svarar han inte direkt är han troligen mitt i ett jobb – då ringer han upp dig så snart han kan.', knapp: TEL_LANK }
        : { special: true, stilla: true, avsikt: 'ring', vantar: '', text: 'Tommys nummer är ' + TEL_TEXT + '. 📞' + DELA + 'Just nu är det utanför hans telefontid (09–21), så han svarar troligen inte förrän i morgon. Vill du att jag skickar en förfrågan, så ringer han upp dig?', val: ['Skicka förfrågan till Tommy'], knapp: TEL_LANK };
    if (/ kontakt(a|ar|en|uppgift\S*)? |hur når jag|nå (er|dig|tommy)|komma i kontakt|mejla|maila|e-?post|mejladress|mailadress|kontaktuppgifter|skriva till (er|dig|tommy)/.test(s))
      return { special: true, stilla: true, avsikt: 'kontakt', vantar: '', text: 'Du når Tommy på tre sätt:' + DELA + '📞 Ring eller sms:a ' + TEL_TEXT + ' (09–21)\n✉️ Skriv i kontaktformuläret, så svarar han samma dag\n💬 Eller skriv här, så skickar jag din förfrågan direkt till honom', val: ['Skicka förfrågan till Tommy', 'Vad kostar det?'], knapp: TEL_LANK, knapp2: ['Till kontaktformuläret', '/kontakta-mig#formular'] };
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
  function langdTid(text) { return lugn ? 0 : Math.max(350, Math.min(2000, 250 + text.length * 13)); }
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
        var rutaUnder = logg.getBoundingClientRect().bottom, synliga = grupp.filter(function (n) { return n.getBoundingClientRect; }), nyUnder = Math.max.apply(null, synliga.map(function (n) { return n.getBoundingClientRect().bottom; })); // även svarsknapparna under bubblan ska synas (2026-11-20)
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
    // Kalk: Tommys eget svar 2026-11-19 (inte vanlig fönsterputs)
    { id: 'kalk', allvar: true, ord: /kalk(?!yl)|kalkfläck|kalkavlagring|hårt vatten|vattenfläckar som inte går bort|beläggning på glaset/,
      a: 'Nej tyvärr – kalk är en annan typ av jobb än vanlig fönsterputs.' + '§§' + 'Vill du verkligen ha hjälp med just det, skriv till Tommy så kollar han om han kan göra ett försök.', val: ['Skicka förfrågan till Tommy', 'Ring Tommy'] },
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
    { id: 'trygg', allvar: true, ord: /lita på|seriös|oseriös|bluff|pålitlig|trygg(t)? att|är ni (riktiga|bra|på riktigt)|varför ska jag (välja|ta) er|kan man lita/,
      a: 'Det är en bra fråga att ställa – du släpper ju in någon i ditt hem. Därför är det här alltid sant hos Tommy:' + '§§' + '• Det är alltid Tommy själv som kommer – ingen okänd personal.\n• Försäkrad hos Trygg-Hansa med ansvarsförsäkring.\n• Godkänd för F-skatt och momsregistrerad – du får alltid en riktig faktura.\n• Fast pris som gäller, inga dolda avgifter.\n• Nöjd kund-garanti – han kommer tillbaka kostnadsfritt om du inte är nöjd.\n• 5,0 på Google med 51 recensioner.', val: ['Läs recensionerna', 'Vem är Tommy?', 'Vad kostar det?'], knapp: OM },
    { id: 'fskatt', ord: /f-skatt|fskatt|f skatt|faktura|moms|kvitto|registrerat företag|svart/,
      a: 'Allt är ordnat och korrekt. ✅' + '§§' + 'Tommy är godkänd för F-skatt och momsregistrerad, så du får alltid en riktig faktura. Alla priser är inklusive moms, och RUT-avdraget dras direkt – Tommy sköter allt med Skatteverket.', knapp: OM },
    { id: 'anger', ord: /ångerrätt|ångra (mig|bokningen)|ångrar mig|ändra mig|14 dagar/,
      a: 'Bokar du på distans har du enligt lag 14 dagars ångerrätt.' + '§§' + 'Allt står i de allmänna villkoren. Vill du ändra eller avboka en tid kan du också bara ringa Tommy.', knapp: ['Allmänna villkor', '/allmanna-villkor'] },
    { id: 'vemartommy', ord: /vem är tommy|vem är du|vem är ägaren|bakgrund|erfarenhet|hur länge har|var har (du|han) jobbat|utbildad|kan (du|han) det här|proffs|jimmy/,
      a: 'Tommy Forsberg driver Forsbergs Fönsterputs. Han började i Stockholm och jobbade där i nästan fem år – med allt från lägenheter och villor till exklusiva fastigheter och stora glaspartier.' + '§§' + 'Hans mentor var Jimmy Ström, flerfaldig medaljör i SM och VM i fönsterputs. Nu bygger Tommy upp företaget i Jönköping, och 2026 tävlade han i SM i fönsterputs på Kistamässan. 🏆', val: ['Vad kostar det?', 'Lediga tider'], knapp: OM },
    { id: 'recensioner', ord: /läs recensionerna|recension|omdöme|betyg|vad tycker kunder|andra kunder|google-betyg|stjärnor|rekommender/,
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
  var FORM_START = /ja,? jag vill boka|skicka (en )?förfrågan|skicka till tommy|lämna (mina )?uppgifter|ta mina uppgifter|ring mig|ringa mig|bli (upp)?ringd|kontakta mig|hör av (er|dig) till mig|vill att tommy ringer|ringa upp mig|ring upp mig/;
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
    var vad = k ? (k.bostad === 'lgh' ? 'en ' + k.lgh : kalkRakna(k).antal ? kalkRakna(k).antal + ' fönster' : 'glaset') : '';
    var knyt = 'Så' + (fm.namn ? ', ' + fm.namn.split(' ')[0] : '') + ' – ' + (vad ? vad + ' ' : 'fönsterputs ') + 'på ' + fm.adress + ', och Tommy hör av sig på ' + fm.telefon + '. 👍';
    return formObj((p || '') + knyt + DELA + 'Så här ser din förfrågan ut:\n\n' + rader.join('\n') + DELA + 'Stämmer det? Då skickar jag den till Tommy. Inget är bokat förrän han har hört av sig och bekräftat.', ['Ja, skicka till Tommy', 'Ändra något', 'Avbryt']);
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
  // Allt som låter som att kunden vill ha ett pris går till uträkningen (Tommy 2026-11-20)
  var PRIS_AVSIKT = /räkna|kostar|kosta |kostnad|pris|offert|hur mycket tar|vad tar ni|vad tar du| lägenhet| lgh | \d ?rok | \d ?rum | \d:a | etta | tvåa | trea | femma | en fyra | i fyra /;
  var PRIS_INTE = /inställelse|reseavgift|rut-avdrag|rutavdrag|swish|betala|faktura|räkning|avboka|räknar ni med|räknas rut/;
  var MALL = 'Skriv dina fönster i ett meddelande, så räknar jag ut ett ungefärligt pris direkt. Så här:\n\n"8 tvåluft och 4 enluft"\n"6 tvåluft 4 sidor och 3 spröjs 4 rutor"\n\n1-luft = en båge. 2-luft = två bågar.\n4 sidor = det finns glas mellan bågarna.';
  var MALL_LGH = 'Bor du i lägenhet räcker det med storleken, till exempel "en trea".';
  var MALL_SIST = 'Osäker på sorten? Tryck på en knapp nedan, så hjälper jag dig.';
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
    if (/dörr/.test(s)) return 'L1'; // altandörr/glasdörr före altan-kollen (räknas som ett fönster)
    if (/panorama|fast glas|stort glas|stora glas|fönsterparti/.test(s)) return 'P';
    if (/överligg|överljus/.test(s)) return 'O';
    if (/underligg/.test(s)) return 'U';
    if (/balkong|altan|glasräcke|räcke/.test(s)) return 'B';
    if (/uterum/.test(s)) return 'UT';
    if (/växthus/.test(s)) return 'VH';
    if (/(2|två) delar|(2|två) dörrar som öppnas/.test(s)) return 'L2';
    if (/(1|en) del som|(1|en) del |bara en del/.test(s)) return 'L1';
    if (/(2|två) ?-? ?luft|tvåluft|(2|två) bågar|tvålufts/.test(s)) return 'L2';
    if (/(1|en|ett) ?-? ?luft|enluft|(1|en) båge|enlufts/.test(s)) return 'L1';
    if (/vet inte|osäker|ingen aning|vet ej|hjälp/.test(s)) return 'VET';
    if (/klar|det var allt|inget mer|inga fler| nej |visa pris|visa priset|färdig|räkna nu|^ nä /.test(s)) return 'KLAR';
    return '';
  }

  // Humor – många varianter så det inte låter likadant
  var K_SKAMT = {
    villa: ['Villa! 🏡 Härligt, då kör vi.', 'En villa! Nu snackar vi riktigt uppdrag. 💪', 'Villa, perfekt! ✅'],
    lgh: ['Lägenhet! 🏢 Det går snabbt – två frågor, sen har du priset.', 'Lägenhet, smidigt! Det här blir den snabbaste kalkylen i världshistorien. Typ.'],
    nasta: ['Inlagt! ✅', 'Noterat! 📒', 'Check! ✔️', 'Inräknat! ✅', 'Sparat! Tommy hade varit stolt över den här räkningen.'],
    merFraga: ['Något mer? Välj nästa sort, eller tryck Klar så trollar jag fram priset.', 'Finns det fler glas som väntar på kärlek? Annars: Klar!', 'Fler fönster, eller ska vi se vad det landar på?'],
    intro: ['🥁 Trumvirvel... kalkylen är klar!', 'Så, nu är det klart! ✨', 'Här kommer ditt pris! 😊', 'Siffrorna är putsade och klara! ✨'],
    outro: ['Och du slipper göra jobbet själv. 😌', 'Tänk på alla ränder du slipper. ✨', 'Rena fönster, bättre humör. Vetenskapligt bevisat av mig, just nu.', 'Solen kommer tacka dig. ☀️'],
    miss: ['Hoppsan, det där förstod jag inte. 😊', 'Oj, det där hängde jag inte riktigt med på. 😊', 'Det där fick jag inte riktigt ihop. 😅', 'Hmm, det där förstod jag inte riktigt.'],
    avbryt: ['Kalkylatorn går och lägger sig. 🧮💤 Skriv "vad kostar" när du vill räkna igen.', 'Okej, räkningen avbruten! Jag sparar inget. Skriv "vad kostar" om du ångrar dig.']
  };
  function antalSkamt(n) {
    if (minne.ton === 'formell') return '';
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
      case 'bostad': return kalkSvarObj(p + 'Bor du i villa, radhus eller lägenhet?', ['Villa', 'Radhus', 'Lägenhet']);
      case 'villaAntal': return kalkSvarObj(p + 'Hur många fönster har du ungefär? Räkna alla fönster i huset och skriv bara siffran, till exempel 12.');
      case 'lgh': return kalkSvarObj(p + 'Hur många rum har lägenheten?', ['1 rum', '2 rum', '3 rum', '4 rum', '5 rum']);
      case 'lghBalk': return kalkSvarObj(p + (k.lghGolv || k.lghTak ? 'Något mer balkongglas?' : 'Har du inglasad balkong som ska putsas? Skriv ja eller nej.'), [k.lghGolv || k.lghTak ? 'Nej, visa priset' : 'Nej', 'Golv till tak', 'Räcke till tak']);
      case 'lghBalkAntal': return kalkSvarObj(p + 'Hur många glas (' + (k.lghSort === 'golv' ? 'golv till tak, 40 kr/glas' : 'räcke till tak, 20 kr/glas') + ')?');
      case 'typ': return kalkSvarObj(p + (k.rader.length || k.glas.length ? ton('merFraga') : 'Vilken sorts fönster har du? Börja med den vanligaste sorten.\n\nÄr du osäker – tryck "Vet inte" så hjälper jag dig.'), (k.rader.length || k.glas.length ? ['Klar – visa priset'] : []).concat(TYP_VAL));
      case 'radtyp': return kalkSvarObj(p + 'Är fönstren vanliga, eller har de spröjs (små rutor i glaset)?', ['En del som öppnas', 'Två delar som öppnas', 'Små rutor i glaset', 'Vet inte']);
      case 'det': return kalkSvarObj(p + 'Ingen fara! Titta på ett fönster: är det en eller två delar som går att öppna? Eller har glaset små rutor?');
      case 'antal': return kalkSvarObj(p + 'Hur många ' + K.TYP[r.typ].namn + ' har du?');
      case 'sidor': return kalkSvarObj(p + 'Går fönstren att öppna isär, så att det finns ett glas till inuti? Det är vanligt i lite äldre hus.', ['Nej, bara ett glas', 'Ja, glas emellan', 'Vet inte']);
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
        rader.push(r.antal + ' st ' + radNamn(r) + x + (r.typ === 'P' ? '' : ', ' + (k.utat ? 4 : r.sidor) + ' sidor'));
      });
      k.glas.forEach(function (g) { rader.push(g.namn + ', ' + g.antal + ' glas: ' + krr(g.antal * g.kr)); });
      var sp = [];
      if (k.utat) sp.push('öppnas utåt'); if (k.hoga) sp.push('svåra att nå'); if (k.fasta) sp.push('går inte att öppna');
      if (sp.length) rader.push('Specialfönster: ' + sp.join(', '));
    }
    var text = 'Klart' + (minne.namn ? ', ' + minne.namn : '') + '! 😊' + DELA +
      'Ditt pris blir ungefär ' + krr(pr.total) + '.\n\nDå är RUT-avdraget redan draget och allt ingår. Du betalar med Swish efteråt.' +
      (k.rader.some(function (r) { return r.typ === 'S'; }) ? ' Små rutor tittar Tommy gärna på innan priset blir helt fast.' : '') + DELA +
      (k.bostad !== 'lgh' && !k.rader.some(function (r) { return r.sidor === 4; }) ? 'Har fönstren ett glas till inuti, så att de går att öppna isär? Skriv det, så räknar jag om.' + DELA : '') +
      'Vill du boka? Skriv ja, så hör Tommy av sig och bestämmer en tid med dig.';
    k.steg = 'klar';
    k.sammanfattning = rader;
    var o = kalkSvarObj(text, ['Ja, jag vill boka', 'Ring Tommy', 'Räkna om från början']);
    // SMS till Tommy med kalkylen och priset ifyllt – kunden skickar från sin egen telefon (Tommy 2026-11-19)
    var sms = 'Hej Tommy! Jag räknade ut mitt pris i chatten på fputs.se:\n' + rader.join('\n') +
      (pr.karm ? '\nKarmtvätt: ja' : '') +
      '\nTotalt efter RUT: ' + krr(pr.total) + ' (inkl. inställelseavgift ' + krr(pr.avgift) + ')' +
      '\n\nJag vill boka till det priset.' + (minne.ort ? '\nOrt: ' + minne.ort : '') + '\nAdress: \nÖnskad tid: ' + (minne.namn ? '\n/' + minne.namn : '');
    k.sms = sms;
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
    if (k.ko && k.ko.length) { k.nu = k.ko.shift(); return nastaForTyp(k, prefix); }
    if (k.direkt) {
      // Kunden skrev allt i ett meddelande: räkna direkt (utan specialfönster/karmtvätt – kan läggas till)
      k.direkt = false; k.nu = null; k.karm = k.karm || false;
      var o = kalkResultat(k);
      var med = []; if (k.utat) med.push('öppnas utåt'); if (k.hoga) med.push('svåra att nå'); if (k.karm) med.push('karmtvätt');
      o.text = (prefix ? prefix + DELA : '') + o.text;
      return o;
    }
    k.nu = null; k.steg = 'typ';
    return kalkFraga(k, (prefix ? prefix + ' ' : '') + ton('nasta'));
  }
  // Efter en vald fönstertyp: vad behöver vi veta härnäst?
  function nastaForTyp(k, prefix) {
    var r = k.nu;
    if (r.typ === '?') { k.steg = 'radtyp'; return kalkFraga(k, prefix); }
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
    if (k.behallAntal) { k.nu.antal = k.behallAntal; k.nu.sidor = k.kvarSidor || 0; k.behallAntal = 0; } // antalet från "20 st fönster" ligger kvar
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

  var FRITT_FRAGA = 'Absolut! Skriv hur många fönster du har och om de är vanliga eller har spröjs, till exempel "12 vanliga och 4 med spröjs".';
  // Läser kundens egna ord: antal, vanliga/spröjs, rutor, glas emellan
  function frittTolka(s) {
    var t = ' ' + s.toLowerCase().replace(/[!?.]/g, ' ') + ' ', rader = [];
    var fyraAlla = /4 sidor|fyra sidor|glas emellan|glas mellan|kopplade|innanglas|två glas|dubbla glas/.test(t);
    var rutAlla = t.match(/ ([2-8]) (små )?rutor/);
    t.split(/,| och | samt | plus | \+ /).forEach(function (del) {
      var d = ' ' + del.trim() + ' ';
      var ren = d.replace(/\d+ ?(våning\S*|plan\b|kvm|m2|år|rum)|\d{3} ?\d{2}|[2-8] (små )?rutor|[24] sidor/g, ' ');
      var m = ren.match(/\d+/), antal = m ? Number(m[0]) : null;
      // Talord ("tolv fönster") bara när delen handlar om fönster – "en villa" är inte ett fönster
      if (antal === null && /fönster|vanlig|spröjs|luft/.test(d)) Object.keys(TALORD).forEach(function (w) { if (antal === null && TALORD[w] > 0 && ren.indexOf(' ' + w + ' ') >= 0) antal = TALORD[w]; });
      if (!antal || antal > 99) return;
      var sprojs = /spröjs|små rutor|rutor/.test(d), kt = kalkTyp(d);
      var typ = sprojs ? 'S' : (kt === 'L1' || kt === 'L2' || kt === 'O' || kt === 'U' || kt === 'P') ? kt : 'L2';
      var rut = d.match(/ ([2-8]) (små )?rutor/) || (typ === 'S' ? rutAlla : null);
      rader.push({ dorr: /dörr/.test(d), typ: typ, antal: antal, sidor: typ === 'P' ? 0 : ((fyraAlla || /4 sidor|fyra sidor|glas emellan|kopplade/.test(d)) ? 4 : 2), rutor: typ === 'S' && rut && K.SPROJS_MIN[rut[1]] ? Number(rut[1]) : 0, storlek: typ === 'P' ? 'mellan' : '' });
    });
    return rader;
  }
  // Räkna direkt, eller fråga det enda som saknas (rutor på spröjsfönster)
  function frittRakna(k, rader, s) {
    k.bostad = 'villa'; k.rader = []; k.glas = [];
    if (/utåt/.test(s)) k.utat = true;
    if (/svåra att nå|högt upp|höga fönster|stege/.test(s)) k.hoga = true;
    if (/karmtvätt|tvätta karmar/.test(s)) k.karm = true;
    k.vantRader = rader;
    if (rader.some(function (r) { return r.typ === 'S' && !r.rutor; })) { k.steg = 'frittRutor'; return kalkSvarObj('Hur många små rutor har spröjsfönstren, ungefär? Räkna rutorna i en del som går att öppna, till exempel 4.'); }
    k.rader = rader; return kalkResultat(k);
  }
  function kalkStart(s) {
    var b = kalkBostad(s) || (minne.fakta && minne.fakta.bostad === 'lägenhet' ? 'lgh' : '');
    var k = minne.kalk = kalkNy();
    var lm0 = !/fönster/.test(s) && (s.match(/ (etta|tvåa|trea|fyra|femma) /) || s.match(/ ([1-5]) ?(a|rok|rum|:a) /));
    if (lm0) { var ln0 = { etta: 1, tvåa: 2, trea: 3, fyra: 4, femma: 5 }[lm0[1]] || Number(lm0[1]); k.bostad = 'lgh'; k.lgh = ln0 + ':a'; k.steg = 'lghBalk'; return kalkFraga(k, 'En ' + k.lgh + ' kostar ' + krr(K.LGH[k.lgh]) + ' efter RUT, plus 30 kr i inställelseavgift. 🏢'); } /* fråga alltid om balkong (Tommy 2026-11-22) */
    if (b === 'lgh') return kalkSvar('lägenhet', '');
    if (b === 'sol' || b === 'foretag' || b === 'stor') return kalkSvar({ foretag: 'företag', sol: 'solcell', stor: 'större fastighet' }[b], '');
    var rader = frittTolka(s);
    if (rader.length) return frittRakna(k, rader, s);
    k.bostad = 'villa'; k.steg = 'fritt';
    return kalkSvarObj(FRITT_FRAGA + (b ? '' : ' Bor du i lägenhet räcker det med hur många rum.'));
  }

  // Tolkar kundens svar i det steg kalkylen står på. null = förstod inte.
  function kalkSvar(tt, prefix) {
    var k = minne.kalk, s = ' ' + tt.trim() + ' ', n, b, r = k.nu, pre = prefix ? prefix + DELA : '';
    if (/^ (avbryt|sluta|stopp|stop|glöm det|skit samma|avsluta) /.test(s)) { minne.kalk = null; return kalkSvarObj(ton('avbryt')); }
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
        var lmB = !/fönster/.test(s) && (s.match(/ (etta|tvåa|trea|fyra|femma) /) || s.match(/ ([1-5]) ?(a|rok|rum|:a) /));
        if (lmB) { k.bostad = 'lgh'; k.lgh = ({ etta: 1, tvåa: 2, trea: 3, fyra: 4, femma: 5 }[lmB[1]] || Number(lmB[1])) + ':a'; k.steg = 'lghBalk'; return kalkFraga(k, pre + 'En ' + k.lgh + ' kostar ' + krr(K.LGH[k.lgh]) + ' efter RUT, plus 30 kr i inställelseavgift. 🏢'); }
        b = kalkBostad(s);
        if (!b) { var flx = tolkaFlera(s); if (flx.length) { k.bostad = 'villa'; k.steg = 'typ'; return startKo(k, flx, pre ? pre.split(DELA).join(' ').trim() : '', s); } }
        if (b === 'villa') { k.bostad = 'villa'; k.steg = 'typ'; var flb = tolkaFlera(s); if (flb.length) return startKo(k, flb, pre ? pre.split(DELA).join(' ').trim() : '', s); k.steg = 'villaAntal'; return kalkFraga(k, pre + 'Villa, toppen!'); }
        if (b === 'lgh') { k.bostad = 'lgh'; k.steg = 'lgh'; return kalkFraga(k, pre + ton('lgh')); }
        if (b === 'sol') { minne.kalk = null; var o1 = kalkSvarObj(pre + 'Solcellstvätt! ☀️ Där räknar Tommy fram ett fast pris själv, eftersom tak och paneler är så olika. Skicka antal paneler och adress så får du pris samma dag.'); o1.knapp = ['Få offert', '/kontakta-mig?typ=Solcellstv%C3%A4tt#formular']; return o1; }
        if (b === 'foretag' || b === 'stor') { minne.kalk = null; var o2 = kalkSvarObj(pre + (b === 'stor' ? 'Större fastighet' : 'Företag') + '! 💼 Där finns inget färdigt pris i kalkylen – Tommy tar fram ett fast pris åt dig, oftast samma dag.'); o2.knapp = ['Begär offert', '/kontakta-mig#formular']; return o2; }
        return null;
      case 'fritt':
        var lmF = !/fönster/.test(s) && (s.match(/ (etta|tvåa|trea|fyra|femma) /) || s.match(/ ([1-5]) ?(a|rok|rum|:a) /));
        if (lmF || / lägenhet /.test(s)) { if (lmF) { k.bostad = 'lgh'; k.lgh = ({ etta: 1, tvåa: 2, trea: 3, fyra: 4, femma: 5 }[lmF[1]] || Number(lmF[1])) + ':a'; k.steg = 'lghBalk'; return kalkFraga(k, 'En ' + k.lgh + ' kostar ' + krr(K.LGH[k.lgh]) + ' efter RUT, plus 30 kr i inställelseavgift. 🏢'); } /* fråga alltid om balkong (Tommy 2026-11-22) */ return kalkSvar('lägenhet', ''); }
        var rF = frittTolka(s); if (rF.length) return frittRakna(k, rF, s);
        if (/vet inte|osäker|ingen aning/.test(s)) return kalkSvarObj('Ingen fara! Har glaset smala lister som delar det i flera små rutor kallas det spröjs. Annars är det ett vanligt fönster. Skriv till exempel "10 vanliga".');
        return null;
      case 'frittRutor':
        var nR = kalkTal(s); if (nR === null) { if (/vet inte|osäker/.test(s)) nR = 4; else return null; }
        nR = nR <= 2 ? 2 : nR <= 3 ? 3 : nR <= 4 ? 4 : nR <= 6 ? 6 : 8;
        (k.vantRader || []).forEach(function (r) { if (r.typ === 'S' && !r.rutor) r.rutor = nR; });
        k.rader = k.vantRader || []; return kalkResultat(k);
      case 'villaAntal':
        var flA = tolkaFlera(s); if (flA.length && flA[0].typ !== '?') return startKo(k, flA, pre ? pre.split(DELA).join(' ').trim() : '', s);
        var nA = kalkTal(s);
        if (nA !== null && nA > 0 && nA < 100) return startKo(k, [{ dorr: false, typ: k.kandTyp || '?', antal: nA, sidor: 0, rutor: 0, storlek: '' }], '', s);
        if (/vet inte|osäker|ingen aning/.test(s)) return kalkSvarObj('Ingen fara! Gå gärna runt och räkna fönstren i lugn och ro, och skriv sedan siffran här. Vill du hellre prata med Tommy kan du ringa ' + TEL_TEXT + '.', ['Ring Tommy']);
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
        if (/räcke|ovanpå|halva|halvvägs|från midjan|mitten/.test(s)) { k.lghSort = 'tak'; k.steg = 'lghBalkAntal'; return kalkFraga(k); }
        if (/golv|helt|hela|ända|inglasad|full|tak till/.test(s)) { k.lghSort = 'golv'; k.steg = 'lghBalkAntal'; return kalkFraga(k); }
        if (/ ja | japp | jo | yes | jajjemen | absolut /.test(s)) return kalkSvarObj('Toppen! Går glasen hela vägen från golvet till taket, eller sitter de ovanpå ett räcke?', ['Golv till tak', 'Räcke till tak']);
        if (/ nej | nä | ingen | inga | nope | visa | klar | det var allt /.test(s)) return kalkResultat(k);
        n = kalkTal(s); if (n !== null && n > 0 && n <= 80 && k.lghSort) { if (k.lghSort === 'golv') k.lghGolv += n; else k.lghTak += n; return kalkFraga(k, ton('nasta')); }
        /* svävar inte iväg: fråga igen (Tommy 2026-11-22) */
        return kalkSvarObj('Jag hängde inte riktigt med. 🙂 Har du inglasad balkong som ska putsas? Tryck på det som stämmer.', ['Nej', 'Golv till tak', 'Räcke till tak']);
      case 'lghBalkAntal':
        n = kalkTal(s); if (n === null || n > 80) return kalkSvarObj('Hur många glas är det? Skriv bara siffran, till exempel 6.');
        if (k.lghSort === 'golv') k.lghGolv += n; else k.lghTak += n;
        k.steg = 'lghBalk';
        return kalkFraga(k, n ? ton('nasta') : 'Inga glas, inga problem.');
      case 'typ':
        var fl = tolkaFlera(s); if (fl.length >= 2 || (fl.length === 1 && fl[0].typ === '?')) return startKo(k, fl, pre ? pre.replace(DELA, '') : '', s);
        var typ = kalkTyp(s);
        if (!typ) return null;
        if (typ === 'KLAR') return k.rader.length || k.glas.length ? kalkSlut(k) : kalkFraga(k, 'Haha, vi har inte räknat några fönster än! 😄');
        if (typ === 'VET') { k.steg = 'det'; return kalkFraga(k); }
        return valjTyp(k, typ, s, pre + (k.forst ? '' : ''));
      case 'radtyp':
        var rt0 = /vanlig|^ (två|2|två delar|2 delar|tvåluft) $/.test(s) ? 'L2' : /^ (en|ett|1|en del|1 del|enluft) $/.test(s) ? 'L1' : kalkTyp(s);
        if (rt0 === 'VET') { k.behallAntal = r.antal; k.steg = 'det'; return kalkFraga(k); }
        if (!rt0 || rt0 === 'KLAR' || rt0 === 'B' || rt0 === 'UT' || rt0 === 'VH') return null;
        r.typ = rt0; if (rt0 === 'P') r.sidor = 0;
        return nastaForTyp(k, rt0 === 'S' ? '' : valjFran(['Toppen!', 'Perfekt!', 'Uppfattat!']));
      case 'det':
        if (r && r.typ === '?') k.kvarSidor = r.sidor;
        if (/spröjs|rutor/.test(s)) return valjTyp(k, 'S', '', 'Spröjs – de smala listerna som delar glaset! 🕵️');
        if (/fast|inget|stort/.test(s)) return valjTyp(k, 'P', '', 'Ett stort fast glas = panoramafönster i kalkylen. 🕵️');
        if (/ (två|2|tvåa) /.test(s)) return valjTyp(k, 'L2', '', 'Två delar = 2-luftsfönster! 🕵️ Fallet löst.');
        if (/ (en|ett|1) /.test(s)) return valjTyp(k, 'L1', '', 'En del = 1-luftsfönster! 🕵️ Elementärt.');
        if (/vet inte|osäker|ingen aning/.test(s)) return valjTyp(k, 'L2', '', 'Ingen fara! Då räknar jag med vanliga fönster med två delar, och Tommy tittar på det när han kommer.');
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
        if (/ 4 | fyra | dubbel| emellan | mellan |^ ja | ja glas/.test(s)) { r.sidor = 4; (k.ko || []).forEach(function (x) { if (!x.sidor && x.typ !== 'P') x.sidor = 4; }); return nastaForTyp(k, '4 sidor – nu blir det grundligt! 🧽'); }
        if (/ 2 | två | enkel| in och ut | in- och ut|bara ett glas|ett glas| nej /.test(s)) { r.sidor = 2; (k.ko || []).forEach(function (x) { if (!x.sidor && x.typ !== 'P') x.sidor = 2; }); return nastaForTyp(k); }
        if (/vet inte|osäker|ingen aning/.test(s)) return kalkSvarObj('Ingen fara! Öppna ett fönster och titta på kanten. Ser du två glas med lite luft emellan? Då svarar du ja.', ['Nej, bara ett glas', 'Ja, glas emellan']);
        return null;
      case 'rutor':
        n = kalkTal(s);
        if (n !== null && K.SPROJS_MIN[n]) { r.rutor = n; (k.ko || []).forEach(function (x) { if (x.typ === 'S' && !x.rutor) x.rutor = n; }); return nastaForTyp(k, n >= 6 ? n + ' rutor per båge – det är många små glas att älska! 😅' : ''); }
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
        if (/^ (ja|japp|jo|ja tack|ja gärna|gärna|ja jag vill boka|boka|jag vill boka) $/.test(s)) return formStart();
        if (k.bostad !== 'lgh' && /glas emellan|glas mellan|kopplade|4 sidor|fyra sidor|innanglas/.test(s)) { k.rader.forEach(function (r) { if (r.typ !== 'P') r.sidor = 4; }); return kalkResultat(k); }
        if (k.bostad !== 'lgh') { var rK = frittTolka(s); if (rK.length) return frittRakna(k, rK, s); }
        if (/karmtvätt/.test(s)) { k.karm = true; return kalkResultat(k); }
        if (/högt|svåra att nå|stege/.test(s)) { k.hoga = true; return kalkResultat(k); }
        if (/utåt/.test(s)) { k.utat = true; return kalkResultat(k); }
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
    intro: ['Jag har kikat i Tommys kalender! 📅', 'Jag har kollat Tommys kalender. 📅', 'Jag har tittat i Tommys kalender. 📅', 'Här är kalendern! 📅'],
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
    var text = (prefix ? prefix + DELA : '') + tTon('intro') + ' ' + (hoppa ? 'Här är fler lediga tider:' : 'De här tiderna är lediga just nu:') + '\n\n' + rader.join('\n') + DELA +
      'Den slutliga tiden bestämmer Tommy – han hör av sig och bekräftar. ' + tTon('outro');
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
      // Känner boten igen meddelandet (skämt, fråga, småprat) svarar den på det och erbjuder att fortsätta räkna
      if (!k.paus && ord <= 3 && k.miss < 3 && !riktig && !KUNSKAP.some(function (x) { return x.ord.test(' ' + tt.trim() + ' '); })) return kalkFraga(k, ton('miss'));
      if (k.miss >= 3) { minne.kalk = null; return null; }
      k.paus = true;
      return null;
    }
    // Färdig kalkyl sparas resten av samtalet (förfrågan till Tommy behöver priset)
    if (k && k.steg === 'klar') { var s2 = kalkSvar(tt); if (s2) return s2; }
    if ((KALK_START.some(function (o) { return tt.indexOf(o) >= 0; }) || prisStavfel(tt) || tolkaFlera(' ' + tt.trim() + ' ').length || PRIS_AVSIKT.test(' ' + tt.trim() + ' ')) && !KALK_INTE.test(tt) && !PRIS_INTE.test(tt)) return kalkStart(' ' + tt + ' ');
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
    var pn = postnrSvar(' ' + tt.trim() + ' '); if (pn) return pn;
    // Klagomål först – aldrig skämt eller tack (Tommy 2026-11-20)
    if (/(blev|var|är|blir) inte (rena|rent|bra|klart|nöjd)|inte nöjd|missnöjd|ränder kvar|det blev ränder|fortfarande (smutsig|ränder|fläck)|slarvig|dåligt jobb|dåligt gjort|reklamation|reklamera|klaga|klagomål|missade (fönster|ett|några)|glömde (fönster|ett|några)/.test(' ' + tt + ' ')) {
      minne.saljStopp = true; if (minne.kalk && minne.kalk.steg !== 'klar') minne.kalk.paus = true;
      return { special: true, stilla: true, allvar: true, avsikt: 'klagomal', vantar: '', text: 'Det är jag ledsen att höra, och tack för att du säger till.' + DELA + 'Tommy har nöjd kund-garanti: han kommer tillbaka och åtgärdar det kostnadsfritt. Ring eller sms:a honom på ' + TEL_TEXT + ', eller skriv i formuläret med adress och vad som blev fel, så hör han av sig så snart han kan.', knapp: TEL_LANK, knapp2: ['Skriv till Tommy', '/kontakta-mig#formular'] };
    }
    // Vet inte vilka fönster man har: fönsterdetektiven hjälper till direkt
    if (/vet inte (vilk|vad för|vad det är för|hur)\S* .*fönster|vilken (typ|sort|sorts) .*fönster har jag|osäker på (vilk|typ|sort)\S*/.test(' ' + tt + ' ') && !(minne.kalk && minne.kalk.steg !== 'klar')) { var kv = minne.kalk = kalkNy(); kv.bostad = 'villa'; kv.steg = 'fritt'; return kalkSvarObj('Ingen fara! Har glaset smala lister som delar det i flera små rutor kallas det spröjs. Annars är det ett vanligt fönster.' + DELA + 'Skriv hur många du har, till exempel "10 vanliga och 2 med spröjs".'); }
    var kn = kanslaSvar(' ' + tt.trim() + ' '); if (kn) { if (minne.kalk && minne.kalk.steg !== 'klar') minne.kalk.paus = true; return kn; }
    var hs = hjalpSvar(' ' + tt.trim() + ' '); if (hs) { if (minne.kalk && minne.kalk.steg !== 'klar') minne.kalk.paus = true; return hs; }
    var ps = personSvar(tt); if (ps) { if (minne.kalk && minne.kalk.steg !== 'klar') minne.kalk.paus = true; return ps; }
    var th = tidHantera(tt); if (th) return th;
    // Kalk på glaset (inte kalkylen) ska alltid få Tommys svar, även mitt i en prisräkning
    if (/kalk(?!yl)/.test(tt)) { var kk = kunskapSvar(' ' + tt.trim() + ' '); if (kk) return kk; }
    var kh = kalkHantera(tt); if (kh) return kh;
    var ks = kunskapSvar(' ' + tt.trim() + ' '); if (ks) return ks;
    if (!(minne.kalk && minne.kalk.steg !== 'klar') && !minne.form) { var av = avslutSvar(' ' + tt.trim() + ' '); if (av) return av; }
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
    if (!minne.form) return;
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
  var AVSLUT = ['Vill du se ditt pris? I bokningen väljer du dina fönster och ser det fasta priset direkt.', 'Det här är precis den typen av jobb Tommy gör. Vill du gå vidare med en bokning?', 'Har du fler frågor går det bra att ringa Tommy, annars kan du boka direkt.'];
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

  // ================= Mänskligare & effektivare, del 2 (Tommy 2026-11-19) =================

  // ---- 1. Vilken sida är kunden på? ----
  var SIDA = (function () {
    var p = location.pathname.replace(/\.html$/, '').replace(/\/+$/, '').replace(/^\//, '').toLowerCase();
    var ort = '';
    Object.keys(ORTER).forEach(function (o) { if (ORTER[o] && p === 'fonsterputs-' + ORTER[o]) ort = o; });
    return { namn: p || 'start', ort: ort };
  })();
  if (SIDA.ort) minne.ort = stor(SIDA.ort);
  if (SIDA.namn === 'fonsterputs-lagenhet') { minne.fakta = minne.fakta || {}; minne.fakta.bostad = 'lägenhet'; }
  function sidHalsning() {
    var n = SIDA.namn;
    if (SIDA.ort) return { text: 'Letar du fönsterputs i ' + minne.ort + '? Där kommer Tommy ut. 🚐' + DELA + 'Jag kan räkna ut vad det kostar för dig, visa lediga tider eller svara på frågor.', val: MENY };
    if (n === 'fonsterputs-lagenhet') {
      minne.kalk = kalkNy('lgh'); minne.kalk.bostad = 'lgh'; minne.kalk.steg = 'lgh';
      return { text: 'Undrar du vad det kostar för din lägenhet? 🏢' + DELA + 'Tryck på storleken här under, så räknar jag direkt. Det kostar inget och du binder dig inte till något.', val: ['1:a', '2:a', '3:a', '4:a', '5:a'] };
    }
    if (n === 'priser') return { text: 'Kollar du priser? 💰' + DELA + 'Jag kan räkna ut ditt exakta pris på en minut – svara bara på några enkla frågor.', val: ['Vad kostar det?', 'Lediga tider', 'Ring Tommy'] };
    if (n === 'solcellspaneltvatt') return { text: 'Funderar du på solcellstvätt? ☀️' + DELA + 'Där räknar Tommy fram ett fast pris själv, eftersom tak och paneler är så olika. Jag kan skicka en förfrågan till honom åt dig.', val: ['Skicka förfrågan till Tommy', 'Ring Tommy'] };
    if (n === 'foretag') return { text: 'Hej! Gäller det fönsterputs för ett företag? 💼' + DELA + 'Tommy tar fram ett fast pris för kontor och butiker. Jag kan skicka en förfrågan till honom åt dig.', val: ['Skicka förfrågan till Tommy', 'Ring Tommy'] };
    if (n === 'kontakta-mig') return { text: 'Vill du komma i kontakt med Tommy? 📞' + DELA + 'Jag kan ta dina uppgifter här i chatten och skicka dem direkt – eller så ringer du honom.', val: ['Skicka förfrågan till Tommy', 'Ring Tommy', 'Vad kostar det?'] };
    return null;
  }

  // ---- 2. Pratar som kunden ----
  var NEUTRAL = {
    villa: ['Villa – då börjar vi.'], lgh: ['Lägenhet – det går snabbt.'], nasta: ['Tack, det är noterat.', 'Noterat.'],
    merFraga: ['Finns det fler fönster? Välj nästa sort, eller tryck Klar så räknar jag fram priset.'],
    intro: ['Här är det uppskattade priset:'], outro: ['Hör av dig om du har några frågor.'],
    miss: ['Ursäkta, det uppfattade jag inte riktigt.'], avbryt: ['Uträkningen är avbruten. Skriv "vad kostar" om du vill räkna igen.'],
    tIntro: ['Jag har tittat i Tommys kalender.'], tOutro: ['Säg vilken som passar när du bokar.']
  };
  function ton(nyckel) {
    if (minne.ton === 'formell' && NEUTRAL[nyckel]) return valjFran(NEUTRAL[nyckel]);
    return valjFran(K_SKAMT[nyckel]);
  }
  function tTon(nyckel) {
    if (minne.ton === 'formell') return valjFran(NEUTRAL[nyckel === 'intro' ? 'tIntro' : 'tOutro']);
    return valjFran(T_SKAMT[nyckel]);
  }
  function uppdateraTon(raw, t) {
    if (/ (yo+|tja+|tjena|wassup|sup|asså|typ typ|lol|haha|xd|bror|mannen|chefen|fett|sjukt|najs|grym) /.test(t) || /!{2,}|😂|🔥|😎/.test(raw)) { minne.ton = 'busig'; return; }
    var formell = /^(hej|hejsan|god (morgon|dag|kväll)|hallå)[,!. ]/i.test(raw.trim()) && raw.trim().split(/\s+/).length >= 6;
    if (formell || /jag undrar|skulle (vilja|jag kunna)|vänligen|tacksam om|med vänlig|mvh|är det möjligt att/i.test(raw)) minne.ton = 'formell';
  }
  function utanEmoji(s) { return String(s).replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B50}\u{FE0F}\u{200D}]/gu, '').replace(/ +([.!?,])/g, '$1').replace(/[ \t]{2,}/g, ' ').replace(/ +\n/g, '\n').trim(); }

  // ---- 3. Känslor: bråttom och osäkerhet ----
  function kanslaSvar(s) {
    if (/bråttom|visning|säljer (huset|lägenheten|bostaden|villan)|ska sälja|flyttstäd|flyttar|så snart som möjligt|snarast|asap|akut|hinner (du|ni|tommy) innan/.test(s)) {
      hamtaTider();
      var o = tidForslag({}, 0, valjFran(['Då ska vi se till att det blir klart i tid! 💪', 'Förstår – då tar vi det snabbt.', 'Inga problem, vi löser det!']) + DELA + 'Här är de första lediga tiderna. Har du riktigt bråttom är det snabbast att ringa Tommy på ' + TEL_TEXT + '.');
      o.knapp = ['Ring ' + TEL_TEXT, 'tel:+46793463964'];
      return o;
    }
    if (/värt det|är det värt|vet inte om jag|tveksam|funderar på om|osäker på om|har inte bestämt|ska tänka på/.test(s)) {
      return { special: true, stilla: true, avsikt: 'tvek', vantar: '', text: 'Helt förståeligt att fundera. 😊' + DELA + 'Du binder dig inte till något genom att räkna ut priset, och Tommy har nöjd kund-garanti – blir du inte nöjd kommer han tillbaka utan kostnad.' + DELA + 'Vill du se vad det skulle kosta, utan förpliktelser?', val: ['Vad kostar det?', 'Hur går det till?', 'Ring Tommy'] };
    }
    return null;
  }

  // ---- 5. Tack och hej då ----
  function avslutSvar(s) {
    var namn = minne.namn ? ', ' + minne.namn : '';
    var h = new Date().getHours(), dag = h < 10 ? 'Ha en fin dag' : h < 17 ? 'Ha en fin dag' : 'Ha en fin kväll';
    if (/^ (hej då|hejdå|ha det bra|ha det gott|vi hörs|bye|adjö|ha en (fin|bra) (dag|kväll)) /.test(s) || (minne.fragadeMer && /^ (nej|nä|nej tack|nope|det var allt|inget mer|nej det var allt) $/.test(s))) {
      minne.fragadeMer = false;
      return { special: true, stilla: true, avsikt: 'hejda', vantar: '', text: 'Tack själv' + namn + '! ' + dag + '. 💙' + DELA + 'Du hittar mig här nere om du undrar något mer.' };
    }
    if (/^ (tack|tack så mycket|tusen tack|tackar|toppen tack|perfekt tack|bra tack|super tack|okej tack|tack för hjälpen|tack det var allt) $/.test(s)) {
      minne.fragadeMer = true;
      return { special: true, stilla: true, avsikt: 'tack', vantar: '', text: valjFran(['Varsågod' + namn + '! 😊', 'Så lite' + namn + '! 😊', 'Inga problem' + namn + '!']) + DELA + 'Var det något mer jag kan hjälpa till med?', val: ['Nej, det var allt', 'Vad kostar det?', 'Lediga tider'] };
    }
    return null;
  }

  // ---- 6. Pris i ett enda meddelande: "10 tvåluft och 4 spröjs med 4 rutor, alla 4 sidor" ----
  var TAL_ORD2 = { två: 2, tre: 3, fyra: 4, fem: 5, sex: 6, sju: 7, åtta: 8, nio: 9, tio: 10, elva: 11, tolv: 12, femton: 15, tjugo: 20 };
  // Sidor kan skrivas "2 sid", "2 sidor", "två sidor" – men inte "12 sidor" (det är totalen)
  var SID_RE = / ([24]|två|fyra) ?sid(or|a)?\b/;
  function tolkaFlera(s) {
    var glob = s.match(SID_RE), globSidor = glob ? (/4|fyra/.test(glob[1]) ? 4 : 2) : 0;
    var rader = [];
    s.split(/,| och | samt | plus | \+ /).forEach(function (del) {
      var d = ' ' + del.trim() + ' ', typ = kalkTyp(d);
      // Antal fönster utan typ ("20 st fönster"): spara antalet, typen frågas sedan
      if ((!typ || typ === 'KLAR') && /fönster|rutor/.test(d) && /\d/.test(d)) typ = '?';
      if (!typ || typ === 'VET' || typ === 'KLAR' || typ === 'B' || typ === 'UT' || typ === 'VH') return;
      var ren = d.replace(/(1|2|en|ett|två) ?-? ?luft\S*|(1|2|en|två) bågar?|\d+ ?sid(or|a)?\b|\d+ rutor|\d+ ?(våning\S*|plan\b|plans?hus)|\d{3}-?\d{2}|\d+ ?(kvm|m2|år)/g, ' ');
      var mf = ren.match(/(\d+) ?(st|stycken)? ?(fönster|rutor|tvåluft|enluft)/), m = mf ? [mf[1]] : ren.match(/\d+/), antal = m ? Number(m[0]) : null;
      if (antal === null) Object.keys(TAL_ORD2).forEach(function (w) { if (antal === null && ren.indexOf(' ' + w + ' ') >= 0) antal = TAL_ORD2[w]; });
      if (!antal || antal > 99) return;
      var sid = d.match(SID_RE), rut = d.match(/ ([2-8]) rutor/);
      var r = { dorr: /dörr/.test(d), typ: typ, antal: antal, sidor: typ === 'P' ? 0 : (sid ? (/4|fyra/.test(sid[1]) ? 4 : 2) : globSidor), rutor: 0, storlek: '' };
      if (typ === 'S') { var rr = rut || s.match(/ ([2-8]) rutor/); if (rr && K.SPROJS_MIN[rr[1]]) r.rutor = Number(rr[1]); }
      rader.push(r);
    });
    return rader;
  }
  // Lägger in raderna; frågar bara det som saknas (sidor, rutor, storlek) – en rad i taget
  function startKo(k, rader, prefix, hela) {
    k.bostad = k.bostad || 'villa';
    if (hela) {
      if (/utåt/.test(hela)) k.utat = true;
      if (/svåra att nå|högt upp|höga fönster|stege|andra våningen/.test(hela)) k.hoga = true;
      if (/går inte att öppna|fasta fönster/.test(hela)) k.fasta = true;
      if (/karmtvätt|tvätta karmar/.test(hela)) k.karm = true;
    }
    // Öppnas utåt = alla sidor räknas, så sidfrågan behövs inte
    if (k.utat) rader.forEach(function (r) { if (!r.sidor && r.typ !== 'P') r.sidor = 4; });
    var namn = rader.map(function (r) { return r.antal + ' st ' + radNamn(r); }).join(' och ');
    k.ko = rader.slice(1);
    k.nu = rader[0];
    k.direkt = true; // när allt är besvarat visas priset direkt
    return nastaForTyp(k, (prefix ? prefix + DELA : '') + 'Uppfattat, ' + rader.reduce(function (t, r) { return t + r.antal; }, 0) + ' fönster. 👍');
  }

  function radNamn(r) { if (r.typ === '?') return 'fönster'; return r.dorr ? (r.typ === 'S' ? 'glasdörrar med spröjs' : 'glasdörrar') : K.TYP[r.typ].namn; }
  // ---- 8. Postnummer → kommer Tommy dit? ----
  function laddaPostnummer() {
    if (window.fpOmrade || document.querySelector('script[data-fc-postnr]')) return;
    var sc = document.createElement('script'); sc.src = '/js/postnummer.js'; sc.defer = true; sc.setAttribute('data-fc-postnr', '1'); document.head.appendChild(sc);
  }
  function postnrSvar(s) {
    var m = s.match(/ (\d{3}) ?(\d{2}) /);
    if (!m || !window.fpOmrade) return null;
    var o = window.fpOmrade(m[1] + m[2]);
    if (!o.giltigt) return null;
    if (o.ort) minne.ort = o.ort;
    if (o.ok) return { special: true, stilla: true, avsikt: 'omrade', vantar: '', text: 'Ja! ' + o.postnr + (o.ort ? ' (' + o.ort + ')' : '') + ' ligger i Tommys område. 🚐' + DELA + 'Ska jag räkna ut vad det kostar, eller visa lediga tider?', val: ['Vad kostar det?', 'Lediga tider'] };
    return { special: true, stilla: true, avsikt: 'omrade', vantar: '', text: 'Tyvärr – ' + o.postnr + ' ligger utanför området Tommy åker till just nu. 😕' + DELA + 'Ring honom gärna på ' + TEL_TEXT + ' så kan ni prata om det.', knapp: ['Ring ' + TEL_TEXT, 'tel:+46793463964'] };
  }

  // ---- 7. Lugn påminnelse vid chattknappen (en gång per besök) ----
  (function () {
    var visa = SIDA.namn === 'priser' || SIDA.namn === 'start' || /^fonsterputs/.test(SIDA.namn);
    var redan = false;
    try { redan = sessionStorage.getItem('fc-puff') === '1'; } catch (e) {}
    if (!visa || redan) return;
    setTimeout(function () {
      if (!panel.hidden || logg.querySelector('.fc-bubbla')) return;
      var puff = document.createElement('div');
      puff.className = 'fc-puff';
      puff.innerHTML = '<button type="button" class="fc-puff-text"></button><button type="button" class="fc-puff-stang" aria-label="Stäng">×</button>';
      puff.querySelector('.fc-puff-text').textContent = SIDA.ort ? 'Vill du veta vad fönsterputs kostar i ' + minne.ort + '? 😊' : 'Vill du ha hjälp att räkna ut priset? 😊';
      document.body.appendChild(puff);
      try { sessionStorage.setItem('fc-puff', '1'); } catch (e) {}
      puff.querySelector('.fc-puff-text').addEventListener('click', function () { puff.remove(); oppna(true); });
      puff.querySelector('.fc-puff-stang').addEventListener('click', function () { puff.remove(); });
      knapp.addEventListener('click', function () { puff.remove(); }, { once: true });
    }, 40000);
  })();

  // ================= Svarar på allt som står på sajten (Tommy 2026-11-19) =================
  // js/chatt-sajt.json byggs från sajtens sidor med .claude/sajtkunskap.js (kör igen när texten ändras).
  // Finns inget färdigt svar letar boten upp rätt stycke och citerar det – hittar aldrig på något eget.
  var SAJT = null, sajtLaddar = false, SAJT_IDF = {};
  var SAJT_STOPP = ' och att det som en ett är för på med jag du ni vi har inte kan vad hur om till av den de min mina din dina er era så man när var eller men ska vill finns också alla från in ut sig sin han hon dem dom här där mig dig oss bara mer mycket många någon något några får får kunna kommer göra gör blir vara varit hade ha nu då sen efter innan under över vid samt eftersom därför varför vilken vilket vilka hej tack snälla undrar fråga händer hända gäller tar bör brukar vem fönster fönstren putsa putsar putsning fönsterputs fönsterputsning jobbar ert kostar kosta ';
  function sajtOrd(text) {
    return rensa(text).trim().split(' ').filter(function (w) { return w.length >= 3 && SAJT_STOPP.indexOf(' ' + w + ' ') < 0; }).map(function (w) { return (w.length > 5 ? w.replace(/(ningarna|ningar|ningen|ning|arna|erna|orna|ande|ende|aren|are|ar|er|or|en|et|na|ade|at|as|a|e)$/, '') : w).slice(0, 8); });
  }
  function laddaSajt() {
    if (SAJT || sajtLaddar) return;
    sajtLaddar = true;
    fetch('/js/chatt-sajt.json?v=1').then(function (r) { return r.ok ? r.json() : []; }).then(function (d) {
      var df = {};
      d.forEach(function (b) { var u = {}; b.rub = {}; sajtOrd(b.r).forEach(function (w) { b.rub[w] = true; }); sajtOrd(b.r + ' ' + b.r + ' ' + b.t).forEach(function (w) { u[w] = (u[w] || 0) + 1; }); b.ord = u; Object.keys(u).forEach(function (w) { df[w] = (df[w] || 0) + 1; }); });
      Object.keys(df).forEach(function (w) { SAJT_IDF[w] = Math.log(1 + d.length / df[w]); });
      SAJT = d;
    }).catch(function () { sajtLaddar = false; });
  }
  function sajtSvar(fraga) {
    if (!SAJT) return null;
    var ord = sajtOrd(fraga), unika = {};
    ord.forEach(function (w) { unika[w] = true; });
    ord = Object.keys(unika);
    if (!ord.length) return null;
    var maxIdf = Math.log(1 + SAJT.length), totIdf = ord.reduce(function (s, w) { return s + (SAJT_IDF[w] || maxIdf); }, 0);
    var bast = null, bastP = 0, bastTraff = 0, bastTackt = 0, bastRar = 0;
    SAJT.forEach(function (b) {
      var p = 0, traff = 0, tackt = 0, rar = 0;
      // Rubriken väger tyngst – ord som bara står i brödtexten ger lite
      ord.forEach(function (w) { if (b.rub[w]) { p += SAJT_IDF[w] * 3; traff++; tackt += SAJT_IDF[w]; rar = Math.max(rar, SAJT_IDF[w]); } else if (b.ord[w]) { p += SAJT_IDF[w] * 0.6; tackt += SAJT_IDF[w] * 0.5; } });
      if (p > bastP) { bastP = p; bast = b; bastTraff = traff; bastTackt = tackt; bastRar = rar; }
    });
    // Kräver tydlig träff: minst två ord, eller ett ovanligt ord i en kort fråga
    // Minst hälften av frågans ord måste finnas i stycket – hellre 'vet inte' än fel svar
    // De viktiga (ovanliga) orden i frågan måste finnas i stycket – hellre 'vet inte' än fel svar
    if (!bast || bastRar < 1.8 || bastTackt / totIdf < 0.5) return null;
    if (/\d kr\b|före RUT/.test(bast.t)) return null; // priser kommer bara från uträkningen, aldrig som klistrad sidtext (Tommy 2026-11-20)
    var t = bast.t;
    if (t.length > 340) { var cut = t.slice(0, 340), i = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? ')); t = (i > 120 ? cut.slice(0, i + 1) : cut + '…'); }
    var rubrik = /\?$/.test(bast.r) ? '' : bast.r + ': ';
    return { special: true, stilla: true, allvar: true, avsikt: 'sajt', vantar: '', text: valjFran(['Det här står på Tommys sida', 'Så här skriver Tommy på sidan', 'Bra fråga – här är svaret från sidan']) + ' "' + bast.s + '":' + DELA + rubrik + t, knapp: ['Läs mer: ' + bast.s, bast.u], val: ['Ring Tommy', 'Vad kostar det?'] };
  }
  function liknarFraga(raw) { return /\?\s*$/.test(raw.trim()) || raw.trim().split(/\s+/).length >= 4; }

  // ---- Tommys telefontid just nu (09–21) – boten är ärlig om när han svarar ----
  function telefontid() { var h = new Date().getHours(); return h >= 9 && h < 21; }
  function telefonRad() {
    return telefontid() ? 'Tommy svarar i telefon mellan 09 och 21.' : 'Just nu är det utanför Tommys telefontid (09–21) – men jag finns här dygnet runt, och lämnar du en förfrågan ringer han upp dig.';
  }

  function svara(fraga, f) {
    visaFlik(false);
    logg.querySelectorAll('.fc-val-logg').forEach(function (x) { x.remove(); });
    var duB = bubbla(fraga, 'du');
    var t = rensa(fraga), niva = f ? 0 : kopNiva(t);
    uppdateraTon(fraga, t);
    if (/orkar inte|putshjälp|har ni tid|många fönster|mycket fönster|rena fönster|hjälp med fönster/.test(t)) niva = Math.max(niva, 2);
    noteraFakta(t);
    if (f && f.q === 'Vad kostar det?' && !(minne.kalk && minne.kalk.steg !== 'klar')) f = kalkStart(' vad kostar ');
    if (!f) f = (minne.form && formSvar(fraga)) || specialSvar(t) || kontext(fraga);
    if (!f) { var hf = hitta(fraga, niva), sj = sajtSvar(fraga); f = sj && (!hf || (!hf.q && !hf.allvar && !hf.special && liknarFraga(fraga))) ? sj : hf; }
    uppdateraResa(t, f, niva, kortTyp(t));
    skriver(function () {
      var fore = logg.childNodes.length, text, b, valen = f && f.val;
      if (f) {
        text = f.text || valjSvar(f);
        var fk = minne.fakta || {};
        // Minnet: kunden har redan sagt bostad/antal – använd det i stället för att fråga igen
        if (f.q === 'Vad kostar det?' && !minne.tema && fk.bostad) {
          var lankBostad = fk.bostad === 'villa' ? ['Till villabokningen', '/boka#fonster'] : fk.bostad === 'lägenhet' ? ['Till lägenhetsbokningen', '/boka#lagenhet'] : ['Till företagssidan', '/foretag'];
          f = Object.assign({}, f, { knapp: lankBostad });
        }
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
        if (niva >= 3 && !f.kalk && f.avsikt !== 'forfragan' && !/PERFEKT|SÅJA|YES/.test(text)) text = 'Toppen, då hjälper jag dig vidare direkt. ' + text;
        else if (skamt && niva < 2 && minne.ton !== 'formell') text = humorPrefix(t) + text;
        if (skamt && niva < 2 && minne.lageKvar > 0) { text += LAGE_TILLAGG[minne.lage] || ''; minne.lageKvar--; }
        // Säljfras ibland – högst var tredje svar, max tre per samtal, aldrig efter nej
        if (skamt && niva < 2 && minne.ton !== 'formell' && f.pool !== 'hals' && !f.knapp && !stilla && !minne.saljStopp && !minne.saljPaus && (minne.sedanSalj >= 3 || minne.lage === 'salj') && minne.antalSalj < 3 && text.indexOf('?') < 0 && Math.random() < 0.5) {
          senasteFras = valjFran(SALJFRASER.filter(function (x) { return x !== senasteFras; }));
          text += ' ' + senasteFras;
          minne.antalSalj++; minne.sedanSalj = 0;
        }
        if (minne.ton === 'formell') text = utanEmoji(text); // lugn ton till den som skriver formellt
        senaste = text;
        b = bubbla(text, 'jag');
        var knappen = f.knapp || (niva >= 3 ? ['Till bokningen', '/boka'] : null);
        if (knappen && (!minne.saljStopp || allvar || niva >= 2 || knappen[1].indexOf('kontakta') >= 0)) lank(b, knappen[0], knappen[1]);
        if (f.knapp2) lank(b, f.knapp2[0], f.knapp2[1]);
        if (!valen && /villa, lägenhet|villa eller lägenhet/i.test(text)) valen = ['Villa', 'Lägenhet', 'Företag', 'Solcellstvätt'];
        // Naturligt avslut ibland efter hjälpsamma svar, när kunden utforskar eller överväger
        if (!valen && !f.knapp && allvar && (minne.resa === 'utforskar' || minne.resa === 'overvager') && !minne.saljStopp && !minne.avslutat && minne.historik.length >= 3 && text.indexOf('?') < 0) { text += ' ' + valjFran(AVSLUT); minne.avslutat = true; b.textContent = text; }
        if (valen) visaVal(valen);
        else if (skamt && !minne.saljStopp && !f.knapp) visaVal(['Vad kostar det?', 'Lediga tider', 'Boka fönsterputs']);
        minne.senasteAvsikt = f.avsikt || (allvar ? 'fakta' : (f.special ? 'special' : (f.ord && f.ord[0] === 'antal' ? 'salj' : 'skamt')));
      } else {
        // Seriös fråga utan svar = saklig hänvisning. Småprat = roligt svar + be om förtydligande.
        if (arSaklig(fraga) || niva >= 2) { text = VET_INTE; lank(bubbla(text, 'jag'), 'Till kontaktformuläret', '/kontakta-mig#formular'); minne.senasteAvsikt = 'okand-saklig'; }
        else {
          minne.forvirrad = (minne.forvirrad || 0) + 1;
          // Förstår hon inte: lite humor, och sedan tillbaka till fönsterputs (Tommy 2026-11-19: målet är fönsterputs, svar, humor, sälja)
          if (minne.forvirrad >= 2) text = 'Tyvärr förstår jag inte riktigt vad du menar.' + DELA + 'Enklast är att boka direkt eller kontakta Tommy, så får du ett personligt svar. Du når honom på ' + TEL_TEXT + '.';
          else text = valjFran([
            'Bra fråga, men den ligger lite utanför mitt område. Jag är specialiserad på glas, och där ser jag allt klart. 😊' + DELA + 'Vill du veta vad fönsterputsen kostar, eller boka en tid direkt?',
            'Där får jag tyvärr passa. Mina kunskaper är, precis som fönstren efter Tommy, helt genomskinliga på ett enda område: fönsterputs. 😊' + DELA + 'Ska vi titta på pris eller lediga tider?',
            'Det kan jag tyvärr inte svara på. Fönster däremot – där har jag full insyn. 😊' + DELA + 'Jag hjälper dig gärna med pris, bokning eller kontakt med Tommy.',
            'Den frågan lämnar jag åt någon klokare. Själv håller jag mig till det jag kan bäst: rena fönster utan ränder. 😊' + DELA + 'Vill du se vad det skulle kosta för dig?'
          ]);
          if (minne.ton === 'formell') text = utanEmoji(text);
          var ob = bubbla(text, 'jag'); lank(ob, 'Boka fönsterputs', '/boka'); lank(ob, 'Kontakta Tommy', '/kontakta-mig#formular'); visaVal(['Vad kostar det?', 'Lediga tider', 'Ring Tommy']); minne.senasteAvsikt = 'okand';
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
    if (ja && !logg.querySelector('.fc-bubbla')) skriver(function () { var fore = logg.childNodes.length, sh = sidHalsning(); bubbla(halsning(sh), 'jag'); delaUpp(fore); });
    if (ja) { laddaPostnummer(); laddaSajt(); }
  }

  knapp.addEventListener('click', function () { oppna(panel.hidden); });
  panel.querySelector('.fc-stang').addEventListener('click', function () { oppna(false); knapp.focus(); });
  panel.querySelector('.fc-ner').addEventListener('click', function () { oppna(false); knapp.focus(); });
  flik.addEventListener('click', function () { visaFlik(valLista.hidden); });
  valLista.addEventListener('click', function (e) {
    var ks = e.target.closest('[data-skicka]'); if (ks) { svara(ks.getAttribute('data-skicka')); return; }
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
