(function () {
  const data = window.SiteData;
  const utils = window.SiteUtils;
  if (!data || !utils) return;

  const slug = utils.getQueryParam('slug') || data.blogPosts[0].slug;
  const post = data.blogPosts.find((item) => item.slug === slug) || data.blogPosts[0];

  const title = document.getElementById('post-title');
  const meta = document.getElementById('post-meta');
  const cover = document.getElementById('post-cover');
  const content = document.getElementById('post-content');
  const quote = document.getElementById('post-quote');
  const related = document.getElementById('related-posts');

  if (title) title.textContent = post.title;
  if (meta) meta.textContent = `${utils.formatDate(post.date)} · ${post.category}`;
  if (cover) {
    cover.src = post.cover;
    cover.alt = post.title;
  }

  if (content) {
    content.innerHTML = post.content.map((paragraph) => `<p style="margin-bottom: 14px;">${paragraph}</p>`).join('');
  }

  if (quote) quote.textContent = post.quote;

  if (related) {
    related.innerHTML = data.blogPosts
      .filter((item) => item.slug !== post.slug)
      .slice(0, 2)
      .map(
        (item) => `
          <article class="card">
            <div class="card-media"><img src="${item.cover}" alt="${item.title}" loading="lazy" /></div>
            <div class="card-body">
              <h3>${item.title}</h3>
              <p>${item.excerpt}</p>
              <a class="button button-outline" href="${window.SitePaths.blogPost}?slug=${encodeURIComponent(item.slug)}">Read More</a>
            </div>
          </article>
        `
      )
      .join('');
  }
})();
