(function () {
  const data = window.SiteData;
  const utils = window.SiteUtils;
  if (!data || !utils) return;

  const slug = utils.getQueryParam('slug') || data.houses[0].slug;
  const house = utils.getHouseBySlug(slug) || data.houses[0];

  const titleNode = document.getElementById('house-title');
  const subtitleNode = document.getElementById('house-subtitle');
  const heroImage = document.getElementById('house-hero-image');
  const heroPrev = document.getElementById('hero-prev');
  const heroNext = document.getElementById('hero-next');
  const stats = document.getElementById('house-stats');
  const overview = document.getElementById('house-overview');
  const details = document.getElementById('house-details');
  const amenities = document.getElementById('house-amenities');
  const videoSection = document.getElementById('house-video');
  const gallery = document.getElementById('house-gallery');
  const showAllButton = document.getElementById('show-all-photos');
  const floorplans = document.getElementById('house-floorplans');
  const map = document.getElementById('house-map');
  const things = document.getElementById('things-to-do');
  const concierge = document.getElementById('concierge-services');
  const general = document.getElementById('general-information');
  const bookingHouseLabel = document.getElementById('booking-house-label');
  const bookingEmailHint = document.getElementById('booking-email-hint');

  let heroIndex = 0;

  if (titleNode) titleNode.textContent = house.title;
  if (subtitleNode) subtitleNode.textContent = `${house.location.city}, ${house.location.region}, ${house.location.country}`;

  function renderHero() {
    const hero = house.images.hero[heroIndex] || house.images.hero[0];
    if (heroImage) {
      heroImage.src = hero;
      heroImage.alt = house.title;
    }
  }

  if (heroPrev) {
    heroPrev.addEventListener('click', () => {
      heroIndex = (heroIndex - 1 + house.images.hero.length) % house.images.hero.length;
      renderHero();
    });
  }

  if (heroNext) {
    heroNext.addEventListener('click', () => {
      heroIndex = (heroIndex + 1) % house.images.hero.length;
      renderHero();
    });
  }

  renderHero();

  if (stats) {
    stats.innerHTML = `
      <span>Guests: ${house.max_guests}</span>
      <span>Bedrooms: ${house.bedrooms}</span>
      <span>Bathrooms: ${house.bathrooms}</span>
      <span>Pool: ${house.has_pool ? 'Yes' : 'No'}</span>
      <span>From: ${house.price_from} ${house.currency}</span>
    `;
  }

  if (overview) {
    overview.innerHTML = `<p>${house.long_description}</p><ul>${house.overview.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  }

  if (details) {
    details.innerHTML = house.more_details
      .map(
        (item) => `
        <div class="accordion-item">
          <button class="accordion-button" type="button" data-accordion-button>
            <span>${item.title}</span>
            <span>+</span>
          </button>
          <div class="accordion-content">${item.description}</div>
        </div>
      `
      )
      .join('');
  }

  if (amenities) {
    amenities.innerHTML = house.amenities.map((item) => `<span>${item}</span>`).join('');
  }

  if (videoSection) {
    videoSection.innerHTML = house.video_url
      ? `<iframe src="${house.video_url}" title="${house.title} video tour" allowfullscreen loading="lazy"></iframe>`
      : '<div class="empty" style="height:100%;display:grid;place-items:center;">Video tour will be added soon.</div>';
  }

  const allGallery = house.images.gallery || [];
  let isExpanded = false;

  function renderGallery() {
    if (!gallery) return;
    const photos = isExpanded ? allGallery : allGallery.slice(0, 8);

    gallery.innerHTML = photos
      .map(
        (url, index) => `
        <div class="gallery-item" data-lightbox-image="${url}" data-lightbox-alt="${house.title} gallery image ${index + 1}">
          <img src="${url}" alt="${house.title} photo ${index + 1}" loading="lazy" />
        </div>
      `
      )
      .join('');
  }

  if (showAllButton) {
    if (allGallery.length <= 8) {
      showAllButton.style.display = 'none';
    } else {
      showAllButton.addEventListener('click', () => {
        isExpanded = !isExpanded;
        showAllButton.textContent = isExpanded ? 'Show less photos' : 'See all photos';
        renderGallery();
      });
    }
  }

  renderGallery();

  if (floorplans) {
    floorplans.innerHTML = house.floorplans
      .map(
        (plan, index) => `
          <div class="card">
            <div class="card-media" style="aspect-ratio: 16/9;">
              <img src="${plan}" alt="${house.title} floorplan ${index + 1}" loading="lazy" />
            </div>
          </div>
        `
      )
      .join('');
  }

  if (map) {
    map.src = utils.mapEmbedUrl(house.coordinates.lat, house.coordinates.lng);
  }

  if (things) {
    things.innerHTML = house.things_to_do
      .map(
        (item) => `
          <div class="accordion-item">
            <button class="accordion-button" type="button" data-accordion-button>
              <span>${item.title}</span>
              <span>+</span>
            </button>
            <div class="accordion-content">${item.description}</div>
          </div>
        `
      )
      .join('');
  }

  if (concierge) {
    concierge.innerHTML = house.concierge_services
      .map(
        (group) => `
          <div class="accordion-item">
            <button class="accordion-button" type="button" data-accordion-button>
              <span>${group.category}</span>
              <span>+</span>
            </button>
            <div class="accordion-content">
              <ul>
                ${group.items.map((service) => `<li><strong>${service.name}:</strong> ${service.details}</li>`).join('')}
              </ul>
            </div>
          </div>
        `
      )
      .join('');
  }

  if (general) {
    general.textContent = house.general_information;
  }

  if (bookingHouseLabel) {
    bookingHouseLabel.textContent = `You are booking: ${house.title}`;
  }

  if (bookingEmailHint) {
    bookingEmailHint.textContent = `Booking notifications currently route to: ${house.booking_email}`;
  }

  const select = document.getElementById('booking-house-select');
  if (select) {
    select.innerHTML = data.houses.map((item) => `<option value="${item.slug}">${item.title}</option>`).join('');
    select.value = house.slug;
    select.addEventListener('change', () => {
      window.location.href = `${window.SitePaths.house}?slug=${encodeURIComponent(select.value)}`;
    });
  }

  const bookingForm = document.getElementById('house-booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const result = bookingForm.querySelector('[data-form-result]');
      const required = Array.from(bookingForm.querySelectorAll('[required]'));
      const hasEmpty = required.some((node) => !String(node.value).trim());

      if (hasEmpty) {
        if (result) {
          result.className = 'error';
          result.textContent = 'Please complete all required booking fields.';
        }
        return;
      }

      bookingForm.reset();
      if (result) {
        result.className = 'success';
        result.textContent = `Thanks. Your request for ${house.title} has been sent to our booking team.`;
      }
    });
  }

  document.querySelectorAll('[data-accordion-button]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.accordion-item');
      if (!item) return;
      item.classList.toggle('open');
    });
  });
})();
