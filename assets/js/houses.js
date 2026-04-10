(function () {
  const data = window.SiteData;
  const utils = window.SiteUtils;
  if (!data || !utils) return;

  const grid = document.getElementById('houses-grid');
  if (!grid) return;

  const locationFilter = document.getElementById('filter-location');
  const bedroomFilter = document.getElementById('filter-bedrooms');
  const priceFilter = document.getElementById('filter-price');
  const availabilityFilter = document.getElementById('filter-availability');
  const sortSelect = document.getElementById('filter-sort');

  const locations = [...new Set(data.houses.map((house) => house.location.country))];
  if (locationFilter) {
    locationFilter.innerHTML = '<option value="">All locations</option>' + locations.map((item) => `<option value="${item}">${item}</option>`).join('');
  }

  function applyFilters() {
    let houses = [...data.houses];

    if (locationFilter?.value) {
      houses = houses.filter((house) => house.location.country === locationFilter.value);
    }

    if (bedroomFilter?.value) {
      const minimumBedrooms = Number(bedroomFilter.value);
      houses = houses.filter((house) => house.bedrooms >= minimumBedrooms);
    }

    if (priceFilter?.value) {
      const maxPrice = Number(priceFilter.value);
      houses = houses.filter((house) => house.price_from <= maxPrice);
    }

    if (availabilityFilter?.value) {
      houses = houses.filter((house) => house.availability_status === availabilityFilter.value);
    }

    if (sortSelect?.value === 'price-asc') {
      houses.sort((a, b) => a.price_from - b.price_from);
    }

    if (sortSelect?.value === 'price-desc') {
      houses.sort((a, b) => b.price_from - a.price_from);
    }

    if (sortSelect?.value === 'bedrooms-desc') {
      houses.sort((a, b) => b.bedrooms - a.bedrooms);
    }

    render(houses);
  }

  function render(houses) {
    if (!houses.length) {
      grid.innerHTML = '<div class="empty">No homes match your filters yet. Try resetting one of the criteria.</div>';
      return;
    }

    grid.innerHTML = houses.map((house) => utils.houseCard(house)).join('');
  }

  [locationFilter, bedroomFilter, priceFilter, availabilityFilter, sortSelect].forEach((control) => {
    if (control) control.addEventListener('change', applyFilters);
  });

  render(data.houses);
})();
