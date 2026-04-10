(function () {
  const data = window.SiteData;
  const utils = window.SiteUtils;
  if (!data || !utils) return;

  const root = document.getElementById('book-houses');
  const guestsInput = document.getElementById('book-guests');
  const checkinInput = document.getElementById('book-checkin');
  const checkoutInput = document.getElementById('book-checkout');
  const filterButton = document.getElementById('book-filter');
  const summary = document.getElementById('book-summary');

  if (!root) return;

  function render(list) {
    if (!list.length) {
      root.innerHTML = '<div class="empty">No homes available for the selected criteria yet.</div>';
      return;
    }

    root.innerHTML = list
      .map((house) => {
        const url = `${window.SitePaths.house}?slug=${encodeURIComponent(house.slug)}`;
        return `
          <article class="card reveal">
            <div class="card-media"><img src="${house.images.hero[0]}" alt="${house.title}" loading="lazy" /></div>
            <div class="card-body">
              <div class="card-title-row">
                <h3>${house.title}</h3>
                <span class="badge">From ${house.price_from} ${house.currency}</span>
              </div>
              <p>${house.location.city}, ${house.location.country}</p>
              <div class="meta">
                <span>Guests ${house.max_guests}</span>
                <span>${house.bedrooms} Bedrooms</span>
                <span>${house.bathrooms} Bathrooms</span>
              </div>
              <p>${house.short_description}</p>
              <a class="button button-primary" href="${url}">Check availability + Book</a>
            </div>
          </article>
        `;
      })
      .join('');
  }

  function applyFilters() {
    const guestCount = Number(guestsInput?.value || 0);
    let list = [...data.houses];

    if (guestCount > 0) {
      list = list.filter((house) => house.max_guests >= guestCount);
    }

    list = list.filter((house) => house.availability_status !== 'Sold out');

    const hasDates = checkinInput?.value && checkoutInput?.value;

    if (summary) {
      summary.textContent = hasDates
        ? 'Date filtering is currently placeholder mode. Connect your booking engine or PMS API to return exact availability by date.'
        : 'Pick dates and guest count to narrow your options. Full real-time inventory can be connected via API.';
    }

    render(list);
  }

  if (filterButton) {
    filterButton.addEventListener('click', applyFilters);
  }

  render(data.houses);
})();
