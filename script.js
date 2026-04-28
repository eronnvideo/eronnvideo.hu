/* =========================================================
   ERONNVIDEO.HU — script.js
   Cookie consent + Facebook iframe reveal + Formspree submit
   ========================================================= */

(function () {
  'use strict';

  /* ---------- SMOOTH SCROLL on nav ---------- */
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var navOffset = 70;
          var top = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- COOKIE CONSENT ---------- */
  var COOKIE_KEY = 'eronnvideo_fb_consent';
  var banner = document.getElementById('cookieBanner');

  function getConsent() {
    try {
      return localStorage.getItem(COOKIE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(COOKIE_KEY, value);
    } catch (e) {
      /* ignore */
    }
  }

  function loadFacebookIframes() {
    document.querySelectorAll('.review-card').forEach(function (card) {
      var src = card.getAttribute('data-fb-src');
      if (!src) return;
      var placeholder = card.querySelector('.review-placeholder');
      if (placeholder) placeholder.remove();
      if (card.querySelector('iframe')) return;

      var iframe = document.createElement('iframe');
      iframe.className = 'review-frame';
      iframe.setAttribute('src', src);
      iframe.setAttribute('scrolling', 'no');
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute(
        'allow',
        'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
      );
      card.appendChild(iframe);
    });
  }

  function showBanner() {
    if (banner) banner.classList.add('show');
  }

  function hideBanner() {
    if (banner) banner.classList.remove('show');
  }

  if (getConsent() === 'accepted') {
    loadFacebookIframes();
  } else {
    showBanner();
  }

  var acceptBtn = document.getElementById('cookieAccept');
  var declineBtn = document.getElementById('cookieDecline');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      setConsent('accepted');
      hideBanner();
      loadFacebookIframes();
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', function () {
      setConsent('declined');
      hideBanner();
    });
  }

  /* ---------- FORMSPREE SUBMIT ---------- */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('formStatus');
      var submitBtn = form.querySelector('.form-submit');
      var data = new FormData(form);

      if (status) {
        status.textContent = 'Küldés folyamatban…';
        status.className = 'form-status';
      }
      if (submitBtn) submitBtn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            if (status) {
              status.textContent =
                'Köszönöm az üzenetet! Hamarosan jelentkezem.';
              status.className = 'form-status success';
            }
          } else {
            return response.json().then(function (data) {
              throw new Error(
                (data && data.errors && data.errors[0] && data.errors[0].message) ||
                  'Hiba történt a küldés során.'
              );
            });
          }
        })
        .catch(function (err) {
          if (status) {
            status.textContent =
              'Hiba: ' + (err.message || 'A küldés sikertelen volt.') +
              ' Próbáld meg e-mailen: eronnvideo@gmail.com';
            status.className = 'form-status error';
          }
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }
})();
