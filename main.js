/* Veronica Singh | portfolio
   Two small behaviours: the mobile nav toggle, and a fade-and-rise
   on scroll intersection. No browser storage APIs are used anywhere. */
(function () {
  'use strict';

  /* ---- mobile nav ------------------------------------------------ */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');

  function isMobile() {
    return window.matchMedia('(max-width: 56em)').matches;
  }

  function syncNav() {
    if (!toggle || !links) return;
    if (isMobile()) {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      links.hidden = !open;
    } else {
      links.hidden = false;
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      links.hidden = open;
    });
    window.addEventListener('resize', syncNav);
    syncNav();
  }

  /* ---- reveal on scroll ------------------------------------------ */
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  root.className += ' js';

  /* Fail-safe: body is always intersecting, so this sentinel must fire.
     If it does not, the observer is not working | drop the effect
     entirely rather than leave the page invisible. */
  var alive = false;
  var sentinel = new IntersectionObserver(function () {
    alive = true;
    sentinel.disconnect();
  });
  sentinel.observe(document.body);
  setTimeout(function () {
    if (!alive) root.className = root.className.replace(' js', '');
  }, 3000);

  var items = document.querySelectorAll('.reveal');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

  for (var i = 0; i < items.length; i++) io.observe(items[i]);
})();
