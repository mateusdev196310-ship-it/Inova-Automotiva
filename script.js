// script.js - Interações para alta conversão
(function() {
  // Mobile menu toggle
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#' || id.startsWith('#') === false) return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll animations
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in');
    });
  }, { threshold: 0.14 });
  document.querySelectorAll('.animate').forEach(el => observer.observe(el));

  // UTM enrichment for WhatsApp links
  const params = new URLSearchParams(window.location.search);
  const utm = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']
    .reduce((acc, key) => {
      if (params.has(key)) acc[key] = params.get(key);
      return acc;
    }, {});
  const enrich = (url) => {
    try {
      const u = new URL(url);
      Object.entries(utm).forEach(([k,v]) => u.searchParams.set(k, v));
      return u.toString();
    } catch { return url; }
  };
  document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
    a.href = enrich(a.href);
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });
})();