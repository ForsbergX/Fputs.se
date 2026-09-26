/* ==========================================================================
   Forsbergs Fönsterputs — startsida
   Vanilla JS. GSAP, ScrollTrigger och Lenis laddas från CDN (defer).
   Allt som inte behöver GSAP fungerar även om CDN:en inte svarar.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = window.matchMedia('(max-width: 767px)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  var hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------- Småsaker ---------- */
  $$('.footer-year').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Räkna klick på telefon- och SMS-länkar i Google Analytics.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || typeof gtag !== 'function') return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) {
      gtag('event', 'phone_click', { event_category: 'contact', event_label: href });
    } else if (href.indexOf('sms:') === 0) {
      gtag('event', 'sms_click', { event_category: 'contact', event_label: 'sms' });
    }
  });

  /* ---------- Mobilmeny ---------- */
  var toggle = $('#navToggle');
  var menu = $('#mobileMenu');
  $$('.mobile-menu-list li').forEach(function (li, i) { li.style.setProperty('--d', i); });
  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Stäng meny' : 'Öppna meny');
    document.body.classList.toggle('menu-open', open);
    if (window.__lenis) { open ? window.__lenis.stop() : window.__lenis.start(); }
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () { setMenu(!menu.classList.contains('is-open')); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 1023 && menu.classList.contains('is-open')) setMenu(false); });
  }

  /* ---------- Textuppdelning ---------- */
  // Rubriker delas i ord (mask) och tecken, utan betalda plugins.
  function splitChars(el) {
    var text = el.textContent.trim();
    el.innerHTML = '<span class="sr-only">' + text + '</span>' + text.split(/\s+/).map(function (word) {
      var chars = Array.prototype.map.call(word, function (ch) {
        return '<span class="c" aria-hidden="true">' + ch + '</span>';
      }).join('');
      return '<span class="w" aria-hidden="true"><span class="w-in">' + chars + '</span></span>';
    }).join(' ');
  }
  function splitLines(el) {
    var parts = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = parts.map(function (p) {
      return '<span class="line"><span class="line-in">' + p.trim() + '</span></span>';
    }).join('');
  }
  function splitWords(el) {
    var text = el.textContent.trim();
    el.innerHTML = '<span class="sr-only">' + text + '</span>' + text.split(/\s+/).map(function (w) {
      return '<span class="mw" aria-hidden="true">' + w + '</span>';
    }).join(' ');
  }
  $$('.hero .split').forEach(function (el) { if (!el.dataset.split) splitChars(el); });
  $$('.split-lines').forEach(splitLines);
  $$('.words').forEach(splitWords);

  /* ---------- Omdömen (samma omdömen som tidigare startsida) ---------- */
  var reviews = [
    { name: 'Isabella Cederlöf', quote: 'Nu är de gnistrande rena och vackra igen.' },
    { name: 'Larah Younan', quote: 'Fönstren blev skinande rena, inte ett spår av ränder eller fläckar!' },
    { name: 'Kushtrim Osmani', quote: 'Fönstren blev skinande rena utan ränder eller fläckar.' },
    { name: 'Ingrid Lindblom', quote: 'Resultatet blev över förväntan.' },
    { name: 'Oscar Jansson-Magnusson', quote: 'Hade en ganska krånglig balkong med fasta fönster som han löste galant.' },
    { name: 'Rhelda Arvidsson', quote: 'He went above and beyond to make a plan in order to achieve the impossible!' },
    { name: 'Jonas Brännhult', quote: 'En återkommande fönsterputsare hos oss.' },
    { name: 'Emma', quote: 'Mina fönster har helt ärligt aldrig sett så här fina och rena ut!' },
    { name: 'Andreas Elg', quote: 'Detta var första gången vi anlitade honom, men det kommer inte bli den sista.' },
    { name: 'Oggebci JKPG', quote: 'Putsade mina fönster inför lägenhetsbesiktning.' },
    { name: 'Camilla Brännhult', quote: 'Vi har riktigt gamla fönster som säkert inte blivit putsade på 10 år. Han gjorde ett fantastiskt jobb!' },
    { name: 'Helix ICT', quote: 'Vi är så nöjda, båda med utförande och bemötande.' },
    { name: 'Johanna Talus', quote: 'Tommy är en stjärna, trevlig, smidig och duktig.' },
    { name: 'Per Anders Broman', quote: 'Så vi är helt enkelt super nöjda.' },
    { name: 'Andreas Julsgård', quote: 'I fortsättningen kommer jag inte putsa några fönster själv.' },
    { name: 'Simon Isaksson', quote: 'Proffsigt och mycket bra jobb, väldigt trevligt bemötande!' },
    { name: 'Fatima Borgendal', quote: 'Väldigt nöjd!' }
  ];
  var rowsEl = $('#reviewRows');
  if (rowsEl) {
    var card = function (r) {
      return '<article class="review"><p class="review-quote">' + r.quote + '</p>' +
        '<p class="review-foot"><span>' + r.name + '</span><span class="stars" role="img" aria-label="5 av 5 stjärnor">★★★★★</span></p></article>';
    };
    var half = Math.ceil(reviews.length / 2);
    [reviews.slice(0, half), reviews.slice(half)].forEach(function (list, i) {
      var html = list.map(card).join('');
      var dup = reduced ? '' : '<div class="review-dup" aria-hidden="true" style="display:contents">' + html + '</div>';
      rowsEl.insertAdjacentHTML('beforeend',
        '<div class="review-row' + (i ? ' rev' : '') + '" style="--dur:' + (i ? 110 : 95) + 's">' + html + dup + '</div>');
    });
  }

  /* ---------- Före/efter ---------- */
  $$('[data-ba-slider]').forEach(function (slider) {
    var range = $('.ba-range', slider);
    function setPos(v) {
      v = Math.max(0, Math.min(100, v));
      range.value = v;
      slider.style.setProperty('--ba-pos', v + '%');
    }
    var dragging = false;
    function fromX(x) { var r = slider.getBoundingClientRect(); return ((x - r.left) / r.width) * 100; }
    slider.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'touch') return; // touch styrs av range-inputen nedan
      dragging = true; slider.setPointerCapture(e.pointerId); setPos(fromX(e.clientX));
    });
    slider.addEventListener('pointermove', function (e) { if (dragging) setPos(fromX(e.clientX)); });
    slider.addEventListener('pointerup', function () { dragging = false; });
    slider.addEventListener('pointercancel', function () { dragging = false; });
    range.addEventListener('input', function () { setPos(parseFloat(range.value)); });
    setPos(50);
  });

  /* ---------- Avslöjanden vid scroll ---------- */
  var revealEls = $$('.reveal, .split-lines, .story-media, .signature');
  if (reduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Siffror som räknar upp ---------- */
  function formatNum(v, dec) { return dec ? v.toFixed(dec).replace('.', ',') : String(Math.round(v)); }
  var counters = $$('.count');
  function runCount(el) {
    var to = parseFloat(el.dataset.to), dec = parseInt(el.dataset.decimals || '0', 10);
    var dur = 1600, t0 = performance.now();
    (function tick(now) {
      var p = Math.min(1, (now - t0) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatNum(to * eased, dec);
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }
  if (!reduced && 'IntersectionObserver' in window) {
    counters.forEach(function (el) { el.textContent = formatNum(0, parseInt(el.dataset.decimals || '0', 10)); });
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCount(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.75 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- Videor: laddas och spelas bara när de syns ---------- */
  var videos = $$('video.lazy-video');
  function loadVideo(v) {
    if (v.dataset.loaded) return;
    $$('source[data-src]', v).forEach(function (s) { s.src = s.dataset.src; });
    v.load(); v.dataset.loaded = '1';
  }
  if (!saveData && !reduced && 'IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) {
          loadVideo(v);
          var p = v.play(); if (p && p.catch) p.catch(function () {});
        } else if (!v.paused) { v.pause(); }
      });
    }, { rootMargin: '200px 0px', threshold: 0.2 });
    videos.forEach(function (v) { vio.observe(v); });
  }

  /* ---------- Navigation och mobilknapp ---------- */
  var nav = $('#nav');
  var hero = $('#hero');
  var mobileBar = $('#mobileBar');
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;
    var heroEnd = hero ? hero.offsetTop + hero.offsetHeight - window.innerHeight : 0;
    var pastHero = y > heroEnd - 10;
    nav.classList.toggle('is-solid', pastHero);
    if (pastHero && y > lastY + 4 && !document.body.classList.contains('menu-open')) nav.classList.add('is-hidden');
    else if (y < lastY - 4 || !pastHero) nav.classList.remove('is-hidden');
    if (mobileBar) mobileBar.classList.toggle('is-visible', hero ? y > hero.offsetTop + hero.offsetHeight - window.innerHeight * 0.4 : y > 200);
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Kort: ljus som följer musen ---------- */
  if (finePointer) {
    $$('.step').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------- Markör och magnetiska knappar (endast mus) ---------- */
  if (finePointer && !reduced) {
    root.classList.add('has-cursor');
    var cursor = $('.cursor');
    var cx = -100, cy = -100, tx = -100, ty = -100;
    window.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY;
      cursor.classList.add('is-visible');
      var t = e.target.closest ? e.target.closest('a, button, input[type=range]') : null;
      var calc = t && t.getAttribute('data-cursor') === 'calc';
      cursor.classList.toggle('is-calc', !!calc);
      cursor.classList.toggle('is-link', !!t && !calc);
    }, { passive: true });
    document.addEventListener('pointerleave', function () { cursor.classList.remove('is-visible'); });
    (function loop() {
      cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
      cursor.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
      requestAnimationFrame(loop);
    })();

    $$('.magnetic').forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        var dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        btn.style.transform = 'translate(' + (dx * 8) + 'px,' + (dy * 8) + 'px)';
      });
      btn.addEventListener('pointerleave', function () { btn.style.transform = ''; });
    });
  }

  /* ==========================================================================
     GSAP-delen. Utan GSAP (eller med reducerad rörelse) visas en stillbild.
     ========================================================================== */
  if (!hasGsap || reduced) {
    root.classList.add('no-anim');
    return;
  }

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Lenis (bara på dator, native scroll på touch) ---------- */
  var lenis = null;
  if (typeof window.Lenis !== 'undefined' && finePointer && !isMobile) {
    lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true, syncTouch: false });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      a.addEventListener('click', function (e) {
        var target = $(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -20, duration: 1.4 });
      });
    });
  }

  /* ---------- Hero: bildsekvens på canvas ---------- */
  root.classList.add('hero-scrub');
  var canvas = $('#heroCanvas');
  var ctx = canvas.getContext('2d');
  var seq = isMobile
    ? { path: 'assets/hero/mobile/frame_', count: 121 }
    : { path: 'assets/hero/desktop/frame_', count: 241 };
  var frames = new Array(seq.count);
  var state = { frame: 0 };
  var lastDrawn = -1;

  function frameUrl(i) { return seq.path + String(i + 1).padStart(4, '0') + '.webp'; }

  function sizeCanvas() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    lastDrawn = -1;
    render();
  }

  function nearestLoaded(i) {
    if (frames[i]) return i;
    for (var d = 1; d < seq.count; d++) {
      if (i - d >= 0 && frames[i - d]) return i - d;
      if (i + d < seq.count && frames[i + d]) return i + d;
    }
    return -1;
  }

  function render() {
    var idx = nearestLoaded(Math.round(state.frame));
    if (idx < 0 || idx === lastDrawn) return;
    var img = frames[idx];
    var cw = canvas.width, ch = canvas.height;
    var ir = img.naturalWidth / img.naturalHeight, cr = cw / ch;
    var dw, dh;
    if (ir > cr) { dh = ch; dw = ch * ir; } else { dw = cw; dh = cw / ir; }
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    lastDrawn = idx;
  }

  function loadFrame(i) {
    return new Promise(function (resolve) {
      if (frames[i]) return resolve();
      var img = new Image();
      img.decoding = 'async';
      img.onload = function () {
        frames[i] = img;
        if (Math.abs(Math.round(state.frame) - i) < 8 || lastDrawn < 0) { lastDrawn = -1; render(); }
        resolve();
      };
      img.onerror = function () { resolve(); };
      img.src = frameUrl(i);
    });
  }

  // Ordning: bildruta 1, sedan var 8:e, var 4:e, var 2:a och sist resten.
  function loadOrder() {
    var order = [], seen = {};
    [8, 4, 2, 1].forEach(function (step) {
      for (var i = 0; i < seq.count; i += step) { if (!seen[i]) { seen[i] = 1; order.push(i); } }
    });
    if (!seen[seq.count - 1]) order.push(seq.count - 1);
    return order;
  }
  function loadAll() {
    var queue = loadOrder(), active = 0, max = 6;
    function next() {
      while (active < max && queue.length) {
        active++;
        loadFrame(queue.shift()).then(function () { active--; next(); });
      }
    }
    next();
  }

  loadFrame(0).then(function () {
    sizeCanvas();
    canvas.classList.add('is-ready');
    if (document.readyState === 'complete') loadAll();
    else window.addEventListener('load', loadAll, { once: true });
  });
  window.addEventListener('resize', function () { sizeCanvas(); });

  /* ---------- Hero: startläge för kapitel 2 och 3 (introt är ren CSS) ---------- */
  var chapters = $$('.chapter');
  gsap.set(chapters.slice(1), { autoAlpha: 0 });
  gsap.set($$('.w-in', chapters[1]).concat($$('.w-in', chapters[2])), { yPercent: 110 });
  gsap.set($$('.chapter-sub', chapters[1]).concat($$('.chapter-sub', chapters[2])), { autoAlpha: 0, y: 16 });


  /* ---------- Hero: scroll-tidslinje ---------- */
  var heroIndex = $('#heroIndex');
  var heroBar = $('#heroBar');
  var cue = $('.scroll-cue');
  var switches = [0.37, 0.74]; // där filmen byter scen (ca 7,5 s och 15 s av 20 s)

  var heroTl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: function (self) {
        var p = self.progress;
        heroBar.style.transform = 'scaleX(' + p + ')';
        var ch = p < switches[0] ? 0 : p < switches[1] ? 1 : 2;
        heroIndex.textContent = '0' + (ch + 1);
        chapters.forEach(function (c, i) {
          c.classList.toggle('is-active', i === ch);
          if (i) c.setAttribute('aria-hidden', String(i !== ch));
        });
        if (cue) cue.style.opacity = p > 0.03 ? 0 : 1;
      }
    }
  });
  heroTl.to(state, { frame: seq.count - 1, duration: 1, onUpdate: render }, 0);

  switches.forEach(function (t, i) {
    var out = chapters[i], inn = chapters[i + 1];
    heroTl
      .to($$('.w-in', out), { yPercent: -110, duration: 0.05, stagger: 0.006, ease: 'power2.in' }, t - 0.07)
      .to($('.chapter-sub', out), { autoAlpha: 0, y: -12, duration: 0.04 }, t - 0.07)
      .set(out, { autoAlpha: 0 }, t)
      .set(inn, { autoAlpha: 1 }, t)
      .to($$('.w-in', inn), { yPercent: 0, duration: 0.07, stagger: 0.008, ease: 'power3.out' }, t)
      .to($('.chapter-sub', inn), { autoAlpha: 1, y: 0, duration: 0.05, ease: 'power3.out' }, t + 0.03);
  });
  // Håll kvar sista scenen en stund innan sidan fortsätter.
  heroTl.to({}, { duration: 0.001 }, 1);

  /* Sektionerna längre ner sätts upp när webbläsaren har tid över,
     så att första visningen inte behöver vänta på dem. */
  function setupSections() {
    /* ---------- Mission: ord tänds i takt med scroll ---------- */
    gsap.to('.mission-title .mw', {
      opacity: 1, ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger: '.mission-title', start: 'top 82%', end: 'bottom 45%', scrub: true }
    });

    var mm = gsap.matchMedia();

    /* ---------- Pelare: sticky stack (från 768px) ---------- */
    mm.add('(min-width: 768px)', function () {
      var pillars = $$('.pillar');
      pillars.forEach(function (p, i) {
        if (i === pillars.length - 1) return;
        var dim = document.createElement('div');
        dim.className = 'pillar-dim';
        p.appendChild(dim);
        var next = pillars[i + 1];
        var st = { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true };
        gsap.to(p, { scale: 0.92, ease: 'none', scrollTrigger: st });
        gsap.to(dim, { opacity: 0.55, ease: 'none', scrollTrigger: st });
      });
      return function () { $$('.pillar-dim').forEach(function (d) { d.remove(); }); };
    });

    /* ---------- Process: horisontell scroll (från 1024px) ---------- */
    mm.add('(min-width: 1024px)', function () {
      var section = $('.process');
      var track = $('.process-track');
      section.classList.add('hscroll');
      function dist() { return Math.max(0, track.scrollWidth - window.innerWidth); }
      gsap.to(track, {
        x: function () { return -dist(); },
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: '.process-sticky',
          start: 'top top',
          end: function () { return '+=' + dist(); },
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      });
      return function () { section.classList.remove('hscroll'); };
    });

    /* ---------- Slut-CTA: långsam zoom ---------- */
    gsap.fromTo('.final-bg img', { scale: 1.2 }, {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: '.final', start: 'top bottom', end: 'bottom bottom', scrub: true }
    });

    /* ---------- Footer: ordmärket glider upp ---------- */
    gsap.fromTo('.footer-wordmark', { yPercent: 30 }, {
      yPercent: 0, ease: 'none',
      scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true }
    });
    ScrollTrigger.refresh();
  }
  if ('requestIdleCallback' in window) requestIdleCallback(setupSections, { timeout: 1500 });
  else setTimeout(setupSections, 300);

  /* ---------- Uppdatera när typsnitten har laddats ---------- */
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
})();
