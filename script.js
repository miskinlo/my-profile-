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
})();
