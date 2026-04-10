(function () {
  const data = window.SiteData;
  const utils = window.SiteUtils;
  if (!data || !utils) return;

  const heroFrame = document.getElementById('home-hero');
  const featured = document.getElementById('featured-houses');
  const destinationGrid = document.getElementById('destination-preview');

  if (heroFrame && data.houses[0]?.images?.hero?.[0]) {
    heroFrame.style.backgroundImage = `url('${data.houses[0].images.hero[0]}')`;
  }

  if (featured) {
    featured.innerHTML = data.houses.slice(0, 3).map((house) => utils.houseCard(house)).join('');
  }

  if (destinationGrid) {
    destinationGrid.innerHTML = data.destinations
      .map(
        (item) => `
        <article class="card reveal">
          <div class="card-media"><img src="${item.image}" alt="${item.name}" loading="lazy" /></div>
          <div class="card-body">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <a class="button button-outline" href="${window.SitePaths.destinations}">Explore Destination</a>
          </div>
        </article>
      `
      )
      .join('');
  }
})();
