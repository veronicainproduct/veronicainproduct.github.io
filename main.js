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

  /* ---- reveal on scroll ------------------------------------------
     The script chooses its own targets and adds .rise itself, so none
     of the six pages carries a presentation class in its markup and
     nothing is hidden when this file does not run.
     ------------------------------------------------------------------ */
  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  document.documentElement.className += ' js';

  /* Fail-safe. .rise starts at opacity 0, so if the observer never fires
     the page would be blank. Body is always intersecting, so this probe
     must run; if it does not, drop .js and everything shows unanimated. */
  var alive = false;
  var probe = new IntersectionObserver(function () { alive = true; probe.disconnect(); });
  probe.observe(document.body);
  window.setTimeout(function () {
    if (!alive) {
      document.documentElement.className =
        document.documentElement.className.replace(' js', '');
    }
  }, 2500);

  var SELECTOR = [
    '.page-head', '.sec-head', '.stat-box', '.card', '.case-card',
    '.case-step', '.photo-frame', '.prose', '.shot', '.contact-actions li'
  ].join(',');

  var items = document.querySelectorAll(SELECTOR);
  var io = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('is-in');
        io.unobserve(entries[i].target);
      }
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  for (var i = 0; i < items.length; i++) {
    var el = items[i], parent = el.parentNode;
    /* siblings arrive in sequence rather than all at once */
    var n = parseInt(parent.getAttribute('data-rise-n') || '0', 10);
    el.style.setProperty('--d', Math.min(n, 4) * 70 + 'ms');
    parent.setAttribute('data-rise-n', String(n + 1));
    el.className += ' rise';
    io.observe(el);
  }

  /* Backstop. IntersectionObserver is the primary trigger, but the reveal
     must not be the only thing standing between a visitor and the content.
     A passive scroll listener reveals anything that has come into view,
     so a missed callback costs an animation, never a paragraph. */
  function sweep() {
    var pending = document.querySelectorAll('.rise:not(.is-in)');
    for (var i = 0; i < pending.length; i++) {
      var r = pending[i].getBoundingClientRect();
      if (r.top < window.innerHeight * 0.94 && r.bottom > 0) {
        pending[i].classList.add('is-in');
      }
    }
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { ticking = false; sweep(); });
  }, { passive: true });
  window.addEventListener('resize', sweep, { passive: true });
})();
