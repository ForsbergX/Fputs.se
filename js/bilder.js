// Bilduppladdning i offertformulären: max 3 bilder, krymps i webbläsaren (max 1600 px, JPEG ~70 %)
// och skickas som base64 i JSON till send-email, som bifogar dem i mailet.
(function () {
  var MAX_BILDER = 3;
  var MAX_SIDA = 1600;
  var MAX_TOTAL = 3.5 * 1024 * 1024; // håll under Netlifys gräns för funktionsanrop

  function krymp(fil, kvalitet) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(fil);
      var img = new Image();
      img.onload = function () {
        var skala = Math.min(1, MAX_SIDA / Math.max(img.width, img.height));
        var c = document.createElement('canvas');
        c.width = Math.round(img.width * skala);
        c.height = Math.round(img.height * skala);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        var data = c.toDataURL('image/jpeg', kvalitet);
        resolve({ base64: data.split(',')[1], url: data, storlek: Math.round(data.length * 0.75) });
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('Kunde inte läsa bilden')); };
      img.src = url;
    });
  }

  function totalStorlek(lista) { return lista.reduce(function (s, b) { return s + b.storlek; }, 0); }

  document.querySelectorAll('input[data-fp-bilder]').forEach(function (input) {
    var form = input.closest('form');
    var ruta = input.closest('.fp-bilder');
    var listaEl = ruta.querySelector('.fp-bilder-lista');
    var infoEl = ruta.querySelector('.fp-bilder-info');
    var knapp = form.querySelector('button[type="submit"]');
    form._fpBilder = [];

    function rita() {
      listaEl.innerHTML = '';
      form._fpBilder.forEach(function (b, i) {
        var d = document.createElement('div');
        d.className = 'fp-bild';
        d.innerHTML = '<img alt="Bifogad bild ' + (i + 1) + '"><button type="button" aria-label="Ta bort bilden">×</button>';
        d.querySelector('img').src = b.url;
        d.querySelector('button').addEventListener('click', function () { form._fpBilder.splice(i, 1); rita(); });
        listaEl.appendChild(d);
      });
      infoEl.textContent = form._fpBilder.length ? form._fpBilder.length + ' av ' + MAX_BILDER + ' bilder' : 'Max ' + MAX_BILDER + ' bilder';
      ruta.classList.toggle('is-full', form._fpBilder.length >= MAX_BILDER);
    }

    input.addEventListener('change', async function () {
      var filer = Array.prototype.slice.call(input.files || []).slice(0, MAX_BILDER - form._fpBilder.length);
      input.value = '';
      if (!filer.length) return;
      if (knapp) knapp.disabled = true;
      infoEl.textContent = 'Förbereder bilder…';
      for (var i = 0; i < filer.length; i++) {
        try {
          var b = await krymp(filer[i], 0.7);
          if (totalStorlek(form._fpBilder) + b.storlek > MAX_TOTAL) b = await krymp(filer[i], 0.5);
          if (totalStorlek(form._fpBilder) + b.storlek > MAX_TOTAL) continue;
          b.namn = 'bild-' + (form._fpBilder.length + 1) + '.jpg';
          form._fpBilder.push(b);
        } catch (e) { /* hoppa över filer som inte går att läsa */ }
      }
      if (knapp) knapp.disabled = false;
      rita();
    });
    rita();
  });

  // Används av formulärens submit: lägger till bilderna i datan som skickas
  window.fpBilder = function (form) {
    return (form._fpBilder || []).map(function (b, i) { return { filename: 'bild-' + (i + 1) + '.jpg', content: b.base64 }; });
  };
})();
