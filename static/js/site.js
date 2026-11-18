/* ==========================================================================
   Sam Perry - Fine Art — Interactive Site Behaviour
   Mobile nav, catalogue/archive filtering, multi-angle gallery, lightbox,
   acquisition modal, and contact form handling.
   ========================================================================== */

(function () {
  'use strict';

  /* 1. Mobile Navigation Toggle */
  const navToggleBtn = document.querySelector('.nav-toggle');
  const navEl = document.getElementById('primary-nav');

  if (navToggleBtn && navEl) {
    navToggleBtn.addEventListener('click', () => {
      const isOpen = navEl.classList.toggle('is-open');
      navToggleBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  /* 2. Catalogue & Archive Filtering */
  const filterBar = document.querySelector('.filter-bar');
  const worksGrid = document.querySelector('.works-grid[data-filterable]');
  const countEl = document.getElementById('catalogue-count');
  const emptyStateEl = document.getElementById('empty-state');

  if (filterBar && worksGrid) {
    let activeCategory = 'All';
    let availableOnly = false;
    const isArchive = worksGrid.dataset.archive === 'true';
    const cards = Array.from(worksGrid.querySelectorAll('.work-card'));

    function applyFilters() {
      let visibleCount = 0;

      cards.forEach((card) => {
        const cat = card.dataset.category || '';
        const status = card.dataset.status || '';
        const catMatch = activeCategory === 'All' || cat === activeCategory;
        const availMatch = isArchive || !availableOnly || status === 'Available';
        const show = catMatch && availMatch;
        card.hidden = !show;
        if (show) visibleCount += 1;
      });

      if (countEl) {
        countEl.textContent = isArchive
          ? `${visibleCount} Prior ${visibleCount === 1 ? 'Work' : 'Works'} · Not for Sale`
          : `${visibleCount} ${visibleCount === 1 ? 'Work' : 'Works'}`;
      }

      if (emptyStateEl) {
        emptyStateEl.hidden = visibleCount > 0;
      }
    }

    filterBar.querySelectorAll('[data-filter-category]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.filterCategory;
        filterBar.querySelectorAll('[data-filter-category]').forEach((b) => {
          b.classList.toggle('is-active', b === btn);
        });
        applyFilters();
      });
    });

    const availBtn = document.getElementById('toggle-available');
    if (availBtn) {
      availBtn.addEventListener('click', () => {
        availableOnly = !availableOnly;
        availBtn.classList.toggle('is-active', availableOnly);
        availBtn.setAttribute('aria-pressed', String(availableOnly));
        applyFilters();
      });
    }

    const resetBtn = document.getElementById('reset-filters-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        activeCategory = 'All';
        availableOnly = false;
        filterBar.querySelectorAll('[data-filter-category]').forEach((b) => {
          b.classList.toggle('is-active', b.dataset.filterCategory === 'All');
        });
        if (availBtn) {
          availBtn.classList.remove('is-active');
          availBtn.setAttribute('aria-pressed', 'false');
        }
        applyFilters();
      });
    }
  }

  /* 3. Artwork Detail Gallery & Lightbox */
  const primaryWrap = document.getElementById('open-lightbox-btn');
  const primaryImg = document.getElementById('detail-primary-img');
  const thumbBtns = Array.from(document.querySelectorAll('.thumb-btn'));
  const lightboxEl = document.getElementById('lightbox');
  const lightboxTitleEl = document.getElementById('lightbox-title');
  const lightboxAngleEl = document.getElementById('lightbox-angle');
  const lightboxMediaEl = document.getElementById('lightbox-media');

  if (primaryWrap && primaryImg && thumbBtns.length) {
    let activeIndex = 0;

    function selectAngle(idx) {
      activeIndex = idx;
      const btn = thumbBtns[idx];
      if (!btn) return;
      primaryImg.src = btn.dataset.src;
      primaryImg.alt = btn.dataset.alt || '';
      thumbBtns.forEach((b, i) => b.classList.toggle('is-active', i === idx));
    }

    thumbBtns.forEach((btn, idx) => {
      btn.addEventListener('click', () => selectAngle(idx));
    });

    function renderLightbox() {
      const btn = thumbBtns[activeIndex] || thumbBtns[0];
      if (!btn || !lightboxEl) return;
      lightboxTitleEl.textContent = primaryWrap.dataset.title || '';
      lightboxAngleEl.textContent = `${btn.dataset.label || 'View'} (${activeIndex + 1}/${thumbBtns.length})`;
      lightboxMediaEl.innerHTML = `<img src="${btn.dataset.src}" alt="${btn.dataset.alt || ''}">`;
    }

    function openLightbox() {
      if (!lightboxEl) return;
      renderLightbox();
      lightboxEl.hidden = false;
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      if (!lightboxEl) return;
      lightboxEl.hidden = true;
      document.body.style.overflow = '';
    }

    primaryWrap.addEventListener('click', openLightbox);
    primaryWrap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox();
      }
    });

    const lbClose = document.getElementById('lightbox-close');
    const lbPrev = document.getElementById('lightbox-prev');
    const lbNext = document.getElementById('lightbox-next');

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev) {
      lbPrev.addEventListener('click', () => {
        activeIndex = (activeIndex - 1 + thumbBtns.length) % thumbBtns.length;
        selectAngle(activeIndex);
        renderLightbox();
      });
    }
    if (lbNext) {
      lbNext.addEventListener('click', () => {
        activeIndex = (activeIndex + 1) % thumbBtns.length;
        selectAngle(activeIndex);
        renderLightbox();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxEl && !lightboxEl.hidden) {
        closeLightbox();
      }
    });
  }

  /* 4. Acquisition Modal */
  const acquireBtn = document.getElementById('acquire-work-btn');
  const modalEl = document.getElementById('checkout-modal');
  const modalBodyEl = document.getElementById('modal-body');

  if (acquireBtn && modalEl && modalBodyEl) {
    function closeModal() {
      modalEl.hidden = true;
      document.body.style.overflow = '';
    }

    acquireBtn.addEventListener('click', () => {
      const title = acquireBtn.dataset.title || '';
      const meta = acquireBtn.dataset.meta || '';
      const price = acquireBtn.dataset.price || '';
      const paymentLink = acquireBtn.dataset.paymentLink || '';

      const actionButtonHtml = paymentLink
        ? `<a href="${paymentLink}" class="btn-primary" target="_blank" rel="noopener noreferrer">Continue to Payment Link</a>`
        : `<button type="button" class="btn-primary" id="simulate-payment-btn">Continue to Payment Link</button>`;

      modalBodyEl.innerHTML = `
        <h2 id="modal-heading" class="modal-work-title">${title}</h2>
        <p class="modal-work-meta">${meta}</p>
        <div class="modal-summary">
          <div class="modal-line"><span>Work</span><span>${price}</span></div>
          <div class="modal-line"><span>UK Insured Courier / Studio Collection</span><span>Calculated at checkout</span></div>
        </div>
        <p class="modal-note">
          Acquisitions are processed via an external Stripe / Square Payment Link. No card details are stored on this site.
        </p>
        <div class="modal-actions">
          ${actionButtonHtml}
          <button type="button" class="btn-text-link" data-close-modal>Cancel</button>
        </div>
      `;

      modalEl.hidden = false;
      document.body.style.overflow = 'hidden';

      const simBtn = document.getElementById('simulate-payment-btn');
      if (simBtn) {
        simBtn.addEventListener('click', () => {
          modalBodyEl.innerHTML = `
            <h2 id="modal-heading" class="modal-work-title">Payment Link Not Yet Attached</h2>
            <p class="modal-work-meta">${title} &middot; ${price}</p>
            <p class="modal-note">
              Add a Stripe or Square Payment Link URL to this piece in Pages CMS to enable direct online checkout, or use the enquiry link to arrange acquisition directly with the studio.
            </p>
            <div class="modal-actions">
              <button type="button" class="btn-primary" data-close-modal>Return to Work</button>
            </div>
          `;
        });
      }
    });

    modalEl.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-close-modal')) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modalEl.hidden) {
        closeModal();
      }
    });
  }

  /* 5. Contact Form & ?piece= Prefill */
  const contactForm = document.getElementById('contact-form');
  const subjectInput = document.getElementById('contact-subject');
  const confirmationEl = document.getElementById('contact-confirmation');

  if (subjectInput) {
    const params = new URLSearchParams(window.location.search);
    const piece = params.get('piece');
    if (piece) {
      subjectInput.value = `Enquiry: ${piece}`;
    }
  }

  if (contactForm && confirmationEl) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.hidden = true;
      confirmationEl.hidden = false;
    });
  }
})();
