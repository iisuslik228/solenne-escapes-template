(function () {
  const data = window.SiteData;
  const utils = window.SiteUtils;
  if (!data || !utils) return;

  const root = document.getElementById('destinations-grid');
  if (!root) return;

  root.innerHTML = data.destinations
    .map((destination) => {
      const linkedHomes = destination.featured_slugs
        .map((slug) => utils.getHouseBySlug(slug))
        .filter(Boolean)
        .map((house) => `<a href="${window.SitePaths.house}?slug=${encodeURIComponent(house.slug)}">${house.title}</a>`)
        .join(' · ');

      return `
        <article class="card reveal">
          <div class="card-media"><img src="${destination.image}" alt="${destination.name}" loading="lazy" /></div>
          <div class="card-body">
            <h3>${destination.name}</h3>
            <p>${destination.description}</p>
            <p><strong>Featured homes:</strong> ${linkedHomes || 'Coming soon'}</p>
            <a class="button button-outline" href="${window.SitePaths.houses}">View all homes</a>
          </div>
        </article>
      `;
    })
    .join('');
})();
