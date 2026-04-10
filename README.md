# Solenne Escapes Template (Simone-Scapes-like architecture)

This project is a full multi-page website starter inspired by the structure and functionality in your brief.

## What is included

- Responsive multi-page front-end
- Pages:
  - Home
  - Our Houses (catalog + filters)
  - House Detail (gallery, video, floorplans, map, booking form)
  - Book Online
  - Blog list + blog detail
  - Press
  - Contact
  - Destinations
  - Privacy Policy
  - Terms & Conditions
- CMS-ready data model in `assets/data/site-data.js`
- Newsletter popup + cookie consent banner
- Mock form handling (replace with real endpoints)
- Basic SEO metadata + JSON-LD + `robots.txt` + `sitemap.xml`

## Project structure

- `/index.html`
- `/pages/*.html`
- `/assets/css/style.css`
- `/assets/js/*.js`
- `/assets/data/site-data.js`

## Run locally

Use a local server (recommended), for example:

```bash
cd /Users/user_name/Desktop/main_folder
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000/index.html`

## Run locally on Windows

Use one of these options.

### Option 1: Python (PowerShell or CMD)

```powershell
cd C:\path\to\main_folder
python -m http.server 8000
```

Open:

- `http://localhost:8000/index.html`

### Option 2: VS Code Live Server

1. Open the project folder in VS Code.
2. Install extension `Live Server`.
3. Right-click `index.html` and choose `Open with Live Server`.

## Where to replace content quickly

Main content source:

- `assets/data/site-data.js`

You can replace:

- House names, descriptions, addresses, coordinates
- Hero/gallery/floorplan images
- Video URLs (YouTube/Vimeo embed links)
- Blog and press content
- Destination content
- Contact/social details

## Integrations to connect (production)

- Booking engine / PMS API (Lodgify, Guesty, custom)
- CRM + email routing for forms
- Newsletter API (Mailchimp/Brevo)
- reCAPTCHA/Turnstile for forms
- Analytics + consent management platform

## CMS migration notes

This template is front-end first. For CMS-driven production:

- Keep same field model as in `site-data.js`
- Replace static JS data with API fetch from:
  - WordPress + ACF
  - Strapi
  - Sanity
- Keep `slug`-based routing

## Accessibility and legal checklist before launch

- Add final legal pages reviewed by counsel
- Add cookie categories/preferences if needed by jurisdiction
- Verify form consent wording for GDPR/UK GDPR compliance
- Add alt text per final media assets
- Run Lighthouse/PageSpeed and optimize media/CDN

## Licensing note

Current media links are placeholders (Unsplash URLs) for development.
Replace all visual assets with your licensed photos/videos/floorplans before launch.
