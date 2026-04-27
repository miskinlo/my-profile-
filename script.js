// =====================================================================
// Ahmad Baehaqi — Portfolio script (v2)
//   * footer year
//   * mobile nav toggle
//   * scroll progress bar
//   * sticky header shadow
//   * reveal-on-scroll (IntersectionObserver)
//   * active link highlight
//   * ripple click effect on .btn-ripple
//   * back-to-top visibility
// =====================================================================

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----------- Mobile navigation toggle -----------
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
      nav.classList.toggle('is-open', !open);
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  // ----------- Scroll progress + header shadow + back-to-top -----------
  var progressBar = document.querySelector('.scroll-progress span');
  var header = document.querySelector('.site-header');
  var toTop = document.querySelector('.to-top');

  function onScroll() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var percent = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;

    if (progressBar) progressBar.style.width = percent + '%';
    if (header) header.classList.toggle('is-scrolled', scrollTop > 12);
    if (toTop)  toTop.classList.toggle('is-visible', scrollTop > 480);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----------- Reveal on scroll -----------
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  // ----------- Active nav link highlight -----------
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.primary-nav a[href^="#"]'));

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    var activeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { activeObserver.observe(s); });
  }

  // ----------- Ripple click effect -----------
  function createRipple(e) {
    var target = e.currentTarget;
    var rect = target.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    var x = (e.clientX || (rect.left + rect.width / 2)) - rect.left - size / 2;
    var y = (e.clientY || (rect.top + rect.height / 2)) - rect.top - size / 2;

    var ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top  = y + 'px';

    // remove existing ripple for crisp re-animation
    var prev = target.querySelector('.ripple');
    if (prev) prev.remove();

    target.appendChild(ripple);
    setTimeout(function () { ripple.remove(); }, 650);
  }

  if (!prefersReducedMotion) {
    document.querySelectorAll('.btn-ripple').forEach(function (el) {
      el.addEventListener('click', createRipple);
    });
  }

  // ----------- Counter animation for hero meta -----------
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var start = performance.now();

    function step(now) {
      var t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - t, 3);
      var value = Math.round(eased * target);
      el.textContent = value + suffix;
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        el.classList.add('is-done');
      }
    }
    requestAnimationFrame(step);
  }

  var counters = Array.prototype.slice.call(document.querySelectorAll('.counter'));
  if (counters.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      counters.forEach(function (el) {
        var t = parseInt(el.getAttribute('data-target'), 10) || 0;
        el.textContent = t + (el.getAttribute('data-suffix') || '');
      });
    } else {
      var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      counters.forEach(function (el) { counterObserver.observe(el); });
    }
  }

  // ----------- Tilt 3D on skill & cert cards -----------
  function attachTilt(selector, maxDeg) {
    var cards = document.querySelectorAll(selector);
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width;
        var py = (e.clientY - rect.top) / rect.height;
        var ry = (px - 0.5) * (maxDeg * 2);
        var rx = -(py - 0.5) * (maxDeg * 2);
        card.style.setProperty('--rx', rx.toFixed(2) + 'deg');
        card.style.setProperty('--ry', ry.toFixed(2) + 'deg');
        card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      });
      card.addEventListener('mouseleave', function () {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    attachTilt('.skill-card', 4);
    attachTilt('.cert-card', 3);
  }

  // ----------- Magnetic effect on primary buttons -----------
  function attachMagnetic(selector, strength) {
    document.querySelectorAll(selector).forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var relX = e.clientX - rect.left - rect.width / 2;
        var relY = e.clientY - rect.top - rect.height / 2;
        btn.style.setProperty('--tx', (relX * strength).toFixed(1) + 'px');
        btn.style.setProperty('--ty', (relY * strength).toFixed(1) + 'px');
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.setProperty('--tx', '0px');
        btn.style.setProperty('--ty', '0px');
      });
    });
  }
  if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    attachMagnetic('.btn-primary', 0.18);
    attachMagnetic('.btn-outline-dark', 0.14);
  }

  // ----------- Subtle parallax on hero grid pattern -----------
  var gridPattern = document.querySelector('.hero-grid-pattern');
  if (gridPattern && !prefersReducedMotion) {
    window.addEventListener('scroll', function () {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (y > 800) return;
      gridPattern.style.transform = 'translate3d(0,' + (y * 0.2).toFixed(1) + 'px,0)';
    }, { passive: true });
  }
})();
