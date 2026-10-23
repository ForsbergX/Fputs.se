// Samma enkla offertformulär på alla sidor: skickar till send-email och visar tack-rutan.
(function () {
  document.querySelectorAll('form[data-enkel-form]').forEach(function (form) {
    var kort = form.closest('.ns-form-kort');
    var btn = form.querySelector('.ns-skicka');
    var fel = form.querySelector('.ns-fel');
    var tack = kort && kort.querySelector('.ns-tack');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      fel.hidden = true;
      btn.disabled = true;
      fetch(form.action, {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
      }).then(function (r) {
        if (!r.ok) throw new Error('send-email error');
        form.hidden = true;
        if (tack) tack.hidden = false;
        if (typeof gtag === 'function') {
          gtag('event', 'generate_lead', { 'event_category': 'contact', 'event_label': form.getAttribute('data-enkel-form') || 'formular' });
          gtag('event', 'conversion', { 'send_to': 'AW-18225187055/j67gCPv6hOscEO-RufJD' });
        }
      }).catch(function () {
        fel.hidden = false;
        btn.disabled = false;
      });
    });
  });
})();
