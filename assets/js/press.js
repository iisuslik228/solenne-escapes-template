(function () {
  const data = window.SiteData;
  const utils = window.SiteUtils;
  if (!data || !utils) return;

  const root = document.getElementById('press-grid');
  if (!root) return;

  root.innerHTML = data.pressItems
    .map(
      (item) => `
        <article class="card reveal">
          <div class="card-media"><img src="${item.image}" alt="${item.title}" loading="lazy" /></div>
          <div class="card-body">
            <div class="meta">
              <span>${utils.formatDate(item.date)}</span>
              <span>${item.source}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.excerpt}</p>
            <a class="button button-outline" href="${item.url}" target="_blank" rel="noreferrer">Read More</a>
          </div>
        </article>
      `
    )
    .join('');
})();
