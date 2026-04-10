(function () {
  const data = window.SiteData;
  const utils = window.SiteUtils;
  if (!data || !utils) return;

  const root = document.getElementById('blog-grid');
  const categoryFilter = document.getElementById('blog-category');
  if (!root) return;

  const categories = [...new Set(data.blogPosts.map((post) => post.category))];
  if (categoryFilter) {
    categoryFilter.innerHTML = '<option value="">All categories</option>' + categories.map((item) => `<option value="${item}">${item}</option>`).join('');
  }

  function render(posts) {
    if (!posts.length) {
      root.innerHTML = '<div class="empty">No articles found for this category.</div>';
      return;
    }

    root.innerHTML = posts
      .map(
        (post) => `
          <article class="card reveal">
            <div class="card-media"><img src="${post.cover}" alt="${post.title}" loading="lazy" /></div>
            <div class="card-body">
              <div class="meta">
                <span>${utils.formatDate(post.date)}</span>
                <span>${post.category}</span>
              </div>
              <h3>${post.title}</h3>
              <p>${post.excerpt}</p>
              <a class="button button-outline" href="${window.SitePaths.blogPost}?slug=${encodeURIComponent(post.slug)}">Read More</a>
            </div>
          </article>
        `
      )
      .join('');
  }

  if (categoryFilter) {
    categoryFilter.addEventListener('change', () => {
      const value = categoryFilter.value;
      const posts = value ? data.blogPosts.filter((post) => post.category === value) : data.blogPosts;
      render(posts);
    });
  }

  render(data.blogPosts);
})();
