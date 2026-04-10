(function () {
  const data = window.SiteData;
  if (!data) return;

  const isInPagesFolder = window.location.pathname.includes('/pages/');
  const base = isInPagesFolder ? '..' : '.';

  window.SitePaths = {
    base,
    home: `${base}/index.html`,
    houses: `${base}/pages/houses.html`,
    house: `${base}/pages/house.html`,
    blog: `${base}/pages/blog.html`,
    blogPost: `${base}/pages/blog-post.html`,
    press: `${base}/pages/press.html`,
    contact: `${base}/pages/contact.html`,
    book: `${base}/pages/book-online.html`,
    destinations: `${base}/pages/destinations.html`,
    privacy: `${base}/pages/privacy.html`,
    terms: `${base}/pages/terms.html`
  };

  function navTemplate() {
    return `
      <header class="site-header">
        <div class="header-inner">
          <a class="brand" href="${window.SitePaths.home}">
            <span class="brand-mark">S</span>
            <span>${data.site.brand}</span>
          </a>

          <nav class="site-nav" id="site-nav">
            <a href="${window.SitePaths.home}" data-nav="index">Home</a>
            <a href="${window.SitePaths.houses}" data-nav="houses">Our Houses</a>
            <a href="${window.SitePaths.book}" data-nav="book-online">Book Online</a>
            <a href="${window.SitePaths.destinations}" data-nav="destinations">Destinations</a>
            <a href="${window.SitePaths.blog}" data-nav="blog">Blog</a>
            <a href="${window.SitePaths.press}" data-nav="press">Press</a>
            <a href="${window.SitePaths.contact}" data-nav="contact">Contact</a>
          </nav>

          <div class="nav-actions">
            <button class="lang-switch" id="lang-switch" aria-label="Language switch">EN</button>
            <a class="button button-primary" href="${window.SitePaths.book}">Plan Your Stay</a>
            <button class="menu-toggle" id="menu-toggle" aria-label="Open menu">☰</button>
          </div>
        </div>
      </header>
    `;
  }

  function footerTemplate() {
    return `
      <footer class="footer">
        <div class="footer-top">
          <div>
            <h4>${data.site.brand}</h4>
            <p>${data.site.tagline}</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="${window.SitePaths.houses}">Our Houses</a></li>
              <li><a href="${window.SitePaths.book}">Book Online</a></li>
              <li><a href="${window.SitePaths.destinations}">Destinations</a></li>
              <li><a href="${window.SitePaths.blog}">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4>Information</h4>
            <ul>
              <li><a href="${window.SitePaths.press}">Press</a></li>
              <li><a href="${window.SitePaths.contact}">Contact</a></li>
              <li><a href="${window.SitePaths.privacy}">Privacy Policy</a></li>
              <li><a href="${window.SitePaths.terms}">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:${data.site.phone.replace(/\s+/g, '')}">${data.site.phone}</a></li>
              <li><a href="mailto:${data.site.email}">${data.site.email}</a></li>
              <li>${data.site.address}</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© <span id="year"></span> ${data.site.brand}. All rights reserved.</span>
          <span>
            <a href="${data.site.social.instagram}" target="_blank" rel="noreferrer">Instagram</a> ·
            <a href="${data.site.social.facebook}" target="_blank" rel="noreferrer">Facebook</a> ·
            <a href="${data.site.social.pinterest}" target="_blank" rel="noreferrer">Pinterest</a>
          </span>
        </div>
      </footer>
    `;
  }

  function applyActiveNav() {
    const file = window.location.pathname.split('/').pop() || 'index.html';
    const key = file.replace('.html', '');

    document.querySelectorAll('[data-nav]').forEach((node) => {
      if (node.dataset.nav === key || (key === 'house' && node.dataset.nav === 'houses') || (key === 'blog-post' && node.dataset.nav === 'blog')) {
        node.classList.add('active');
      }
    });
  }

  function setupHeaderActions() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('site-nav');
    if (menuToggle && nav) {
      menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
      });
    }

    const langSwitch = document.getElementById('lang-switch');
    if (langSwitch) {
      langSwitch.addEventListener('click', () => {
        const current = langSwitch.textContent.trim();
        const next = current === 'EN' ? 'ES' : 'EN';
        langSwitch.textContent = next;
        const message = 'Multilanguage mode is CMS-ready. Connect translations in your backend for production.';
        window.alert(message);
      });
    }
  }

  function render() {
    const headerRoot = document.getElementById('site-header');
    const footerRoot = document.getElementById('site-footer');

    if (headerRoot) headerRoot.innerHTML = navTemplate();
    if (footerRoot) footerRoot.innerHTML = footerTemplate();

    const yearNode = document.getElementById('year');
    if (yearNode) yearNode.textContent = new Date().getFullYear();

    applyActiveNav();
    setupHeaderActions();
  }

  render();
})();
