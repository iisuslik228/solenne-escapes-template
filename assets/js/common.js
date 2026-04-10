(function () {
  const data = window.SiteData;
  if (!data) return;

  const utils = {
    getHouseBySlug(slug) {
      return data.houses.find((house) => house.slug === slug);
    },
    formatDate(value) {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return value;
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    },
    getQueryParam(key) {
      const params = new URLSearchParams(window.location.search);
      return params.get(key);
    },
    mapEmbedUrl(lat, lng) {
      const delta = 0.05;
      const bbox = [lng - delta, lat - delta, lng + delta, lat + delta].join(',');
      return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
    },
    escapeHtml(value) {
      const div = document.createElement('div');
      div.textContent = value ?? '';
      return div.innerHTML;
    },
    houseCard(house) {
      const image = house.images.hero[0] || house.images.gallery[0] || '';
      const location = `${house.location.city}, ${house.location.country}`;
      const url = `${window.SitePaths.house}?slug=${encodeURIComponent(house.slug)}`;

      return `
        <article class="card reveal">
          <div class="card-media">
            <img src="${image}" alt="${utils.escapeHtml(house.title)}" loading="lazy" />
          </div>
          <div class="card-body">
            <div class="card-title-row">
              <h3>${utils.escapeHtml(house.title)}</h3>
              <span class="badge">${utils.escapeHtml(house.availability_status)}</span>
            </div>
            <p>${utils.escapeHtml(location)}</p>
            <div class="meta">
              <span>Guests ${house.max_guests}</span>
              <span>Bedrooms ${house.bedrooms}</span>
              <span>Bathrooms ${house.bathrooms}</span>
              <span>From ${house.price_from} ${house.currency}</span>
            </div>
            <p>${utils.escapeHtml(house.short_description)}</p>
            <a class="button button-outline" href="${url}">View House</a>
          </div>
        </article>
      `;
    }
  };

  window.SiteUtils = utils;

  function setupAccordions(scope = document) {
    scope.querySelectorAll('[data-accordion-button]').forEach((button) => {
      button.addEventListener('click', () => {
        const item = button.closest('.accordion-item');
        if (!item) return;
        item.classList.toggle('open');
      });
    });
  }

  function setupNewsletterForms() {
    document.querySelectorAll('form[data-newsletter]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput ? emailInput.value.trim() : '';

        if (!email || !email.includes('@')) {
          window.alert('Please enter a valid email address.');
          return;
        }

        form.reset();
        window.alert('Thanks for subscribing. Connect this form to Mailchimp / Brevo API in production.');
      });
    });
  }

  function setupMockForms() {
    document.querySelectorAll('form[data-mock-submit]').forEach((form) => {
      const resultNode = form.querySelector('[data-form-result]');

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const required = Array.from(form.querySelectorAll('[required]'));
        const invalid = required.some((node) => !String(node.value).trim());

        if (invalid) {
          if (resultNode) {
            resultNode.className = 'error';
            resultNode.textContent = 'Please complete all required fields before sending.';
          }
          return;
        }

        form.reset();
        if (resultNode) {
          resultNode.className = 'success';
          resultNode.textContent = 'Thank you. Your request has been sent. Connect this form to email/CRM endpoint in production.';
        }
      });
    });
  }

  function setupCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const accept = document.getElementById('cookie-accept');
    const reject = document.getElementById('cookie-reject');

    if (!banner || !accept || !reject) return;

    const state = localStorage.getItem('cookie-consent-v1');
    if (!state) {
      banner.classList.add('open');
    }

    accept.addEventListener('click', () => {
      localStorage.setItem('cookie-consent-v1', 'accepted');
      banner.classList.remove('open');
    });

    reject.addEventListener('click', () => {
      localStorage.setItem('cookie-consent-v1', 'rejected');
      banner.classList.remove('open');
    });
  }

  function setupPopup() {
    const modal = document.getElementById('subscribe-modal');
    if (!modal) return;

    const close = modal.querySelector('[data-modal-close]');
    const isDismissed = sessionStorage.getItem('newsletter-popup-dismissed');

    if (!isDismissed) {
      setTimeout(() => modal.classList.add('open'), 1200);
    }

    const closeModal = () => {
      modal.classList.remove('open');
      sessionStorage.setItem('newsletter-popup-dismissed', '1');
    };

    if (close) {
      close.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal();
    });
  }

  function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const image = lightbox.querySelector('img');
    const close = lightbox.querySelector('button');

    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-lightbox-image]');
      if (!trigger || !image) return;
      image.src = trigger.dataset.lightboxImage;
      image.alt = trigger.dataset.lightboxAlt || 'Gallery image';
      lightbox.classList.add('open');
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      if (image) image.src = '';
    };

    if (close) close.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeLightbox();
    });
  }

  function renderInstagramFeeds() {
    document.querySelectorAll('[data-instagram-feed]').forEach((root) => {
      root.innerHTML = data.site.instagramFeed
        .map(
          (url) => `<a href="${data.site.social.instagram}" target="_blank" rel="noreferrer"><img src="${url}" alt="Instagram preview" loading="lazy" /></a>`
        )
        .join('');
    });
  }

  function hydrateLeadSources() {
    document.querySelectorAll('[data-lead-source]').forEach((select) => {
      select.innerHTML = '<option value="">Select an option</option>' + data.leadSources.map((item) => `<option value="${item}">${item}</option>`).join('');
    });
  }

  setupAccordions(document);
  setupNewsletterForms();
  setupMockForms();
  setupCookieBanner();
  setupPopup();
  setupLightbox();
  renderInstagramFeeds();
  hydrateLeadSources();
})();
