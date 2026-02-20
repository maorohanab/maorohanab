(function () {
  'use strict';

  var header = document.getElementById('header');
  var nav = document.querySelector('.nav');
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelectorAll('.nav-list a');
  var bookingForm = document.getElementById('booking-form');
  var bookingSuccess = document.getElementById('booking-success');
  var galleryItems = document.querySelectorAll('.gallery-item');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.querySelector('.lightbox-close');

  // Smooth scroll for anchor links
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          closeMobileNav();
        }
      });
    });
  }

  // Mobile nav toggle
  function openMobileNav() {
    nav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  // Booking form: simulate submission, no data sent
  if (bookingForm && bookingSuccess) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      bookingForm.setAttribute('hidden', '');
      bookingForm.style.display = 'none';
      bookingSuccess.removeAttribute('hidden');
      bookingSuccess.style.display = 'block';
      bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // Gallery lightbox
  var galleryImages = galleryItems.length
    ? Array.from(galleryItems).map(function (item) {
        var img = item.querySelector('img');
        return img ? img.src : '';
      })
    : [];

  function openLightbox(index) {
    if (!lightbox || !lightboxImg || !galleryImages[index]) return;
    lightboxImg.src = galleryImages[index];
    lightboxImg.alt = 'תצוגת גלריה ' + (index + 1);
    lightbox.removeAttribute('hidden');
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lightbox.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute('hidden', '');
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener('click', function () {
      openLightbox(index);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    lightbox.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // Header scroll effect (optional: add shadow after scroll)
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
      header.style.boxShadow = 'none';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  setupSmoothScroll();
})();
