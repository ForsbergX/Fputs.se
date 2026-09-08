/* Stoppar iOS/Android från att gummidra sidan i sidled.
   Karuseller med overflow-x: auto får fortfarande rullas. */
(function () {
  var startX = 0;
  var startY = 0;

  function canScrollX(el) {
    while (el && el !== document.body && el !== document.documentElement) {
      if (el.nodeType === 1) {
        var ox = window.getComputedStyle(el).overflowX;
        if ((ox === 'auto' || ox === 'scroll') && el.scrollWidth > el.clientWidth + 1) {
          return true;
        }
      }
      el = el.parentNode;
    }
    return false;
  }

  document.addEventListener('touchstart', function (e) {
    if (!e.touches || e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchmove', function (e) {
    if (!e.touches || e.touches.length !== 1) return;
    var dx = e.touches[0].clientX - startX;
    var dy = e.touches[0].clientY - startY;
    if (Math.abs(dx) <= Math.abs(dy)) return;
    if (canScrollX(e.target)) return;
    e.preventDefault();
  }, { passive: false });
})();
