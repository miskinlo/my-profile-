// =====================================================================
// Ahmad Baehaqi — Portfolio script
// SmoothieJuicy-inspired redesign
//   * footer year
//   * mobile nav toggle
//   * scroll progress bar
//   * sticky header shadow
//   * reveal-on-scroll (IntersectionObserver)
//   * active link highlight
//   * counter animation
//   * back-to-top visibility
//   * smooth section transitions
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
    if (toTop) toTop.classList.toggle('is-visible', scrollTop > 480);
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

  // ----------- Counter animation -----------
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1500;
    var start = performance.now();

    function step(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll('.stat-number[data-target]');

  if (!prefersReducedMotion && 'IntersectionObserver' in window && counters.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(function (el) {
      var target = el.getAttribute('data-target') || '0';
      var suffix = el.getAttribute('data-suffix') || '';
      el.textContent = target + suffix;
    });
  }

  // ----------- Smooth anchor scroll -----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#top') return;
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        var offset = 80;
        var top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ----------- Skill card hover tilt (subtle) -----------
  if (!prefersReducedMotion) {
    document.querySelectorAll('.skill-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = (y - centerY) / 20;
        var rotateY = (centerX - x) / 20;
        card.style.transform = 'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  // ----------- Timeline card hover glow -----------
  document.querySelectorAll('.timeline-card').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      this.style.borderColor = 'rgba(255, 107, 53, 0.15)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.borderColor = '';
    });
  });

})();
