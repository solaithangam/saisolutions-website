# SOLAITHANGAM AI Solutions — Website

A responsive, static company website using the approved SAIS navy/electric-blue identity.

## Included
- Responsive homepage and mobile navigation
- Six service sections
- Technology expertise and delivery approach
- Contact form that prepares an email (no backend or data storage)
- WhatsApp link
- SAIS network emblem asset
- Cloudflare Pages deployment instructions

## Before publishing
Edit `script.js`:
- Replace `YOUR_EMAIL@example.com` with the monitored business email.
- Replace `91XXXXXXXXXX` with the WhatsApp number, including country code and digits only.

Do not publish until these placeholders have been replaced and tested.
The contact form uses the visitor's email application; it does not store or transmit form submissions to a server. For a hosted form endpoint, integrate a form service or Cloudflare Worker later.

## Deploy free on Cloudflare Pages
1. Create/sign in to a GitHub account.
2. Create a new repository, e.g. `saisolutions-website`.
3. Upload all files and folders from this package to the repository root (`index.html`, `styles.css`, `script.js`, `assets/`, `README.md`).
4. Sign in to Cloudflare and open Workers & Pages → Create application → Pages → Connect to Git.
5. Select the repository.
6. Framework preset: None. Build command: leave blank. Build output directory: `/` (repository root).
7. Deploy. Cloudflare will provide a `*.pages.dev` address and HTTPS.
8. Test the site on mobile and desktop, including the email and WhatsApp links.

## Custom domain later
You can connect a domain you own from the Cloudflare Pages project → Custom domains. A free `pages.dev` address is provided; a custom `.in` or `.com` domain normally requires purchase/renewal.

## Important
- The contact details are placeholders until you replace them.
- No client testimonials, case studies, certifications, customer logos, pricing, or performance claims have been invented.
- Use only project examples you have permission to publish.
