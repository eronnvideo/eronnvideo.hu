/* =========================================================
   ERONN VIDEO — interactions
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ========== Mobile menu ========== */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ========== Header shadow on scroll ========== */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ========== Scroll reveal ========== */
  const revealEls = document.querySelectorAll('.about, .portfolio, .packages, .contact, .testimonials');
  revealEls.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback for old browsers
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ========== YouTube facade pattern ==========
     Film cards are <a> tags pointing to YouTube — works without JS.
     With JS: intercept click and play inline.
     ============================================ */
  const filmCards = document.querySelectorAll('.film-embed');
  filmCards.forEach(embed => {
    embed.addEventListener('click', (e) => {
      const videoId = embed.dataset.videoId;
      if (!videoId) return;

      // Intercept the link click - play inline instead
      e.preventDefault();

      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      iframe.title = 'Esküvői film';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.loading = 'lazy';

      embed.innerHTML = '';
      embed.appendChild(iframe);
    });
  });

  /* ========== Testimonial expand/collapse ========== */
  const testimonialToggles = document.querySelectorAll('.testimonial-toggle');
  testimonialToggles.forEach(btn => {
    const text = btn.previousElementSibling;
    if (!text) return;

    // Hide toggle if text isn't actually clamped (short text)
    requestAnimationFrame(() => {
      if (text.scrollHeight <= text.clientHeight + 2) {
        btn.style.display = 'none';
      }
    });

    btn.addEventListener('click', () => {
      const isClamped = text.dataset.clamped === 'true';
      text.dataset.clamped = isClamped ? 'false' : 'true';
      btn.textContent = isClamped ? 'Mutass kevesebbet' : 'Olvass tovább';
      btn.setAttribute('aria-expanded', String(isClamped));
    });
  });

  /* ========== Smooth scroll offset for fixed header ========== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#top') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ========== Contact form (Formspree) ========== */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Küldés folyamatban…';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });

        if (response.ok) {
          form.innerHTML = `
            <div style="text-align: center; padding: 2rem 0;">
              <h3 style="font-family: var(--font-display); font-size: 1.75rem; margin: 0 0 1rem;">Köszönöm! ✓</h3>
              <p style="color: var(--muted); margin: 0;">Megkaptam az üzeneted, 48 órán belül válaszolok.</p>
            </div>
          `;
        } else {
          throw new Error('Hiba történt');
        }
      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        alert('Sajnos hiba történt. Kérlek próbáld újra, vagy írj direktben emailben: eronnvideo@gmail.com');
      }
    });
  }

  /* ========== Footer year ========== */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
