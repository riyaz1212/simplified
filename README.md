# GitHub Pages — Simplified Website

This folder contains the static website for [simplified.co.in](https://simplified.co.in).

## Files

| File | Description |
|------|-------------|
| `index.html` | Main landing page |
| `careers.html` | Careers page with Google Form |
| `style.css` | Apple-inspired design system |
| `script.js` | Scroll animations, mobile nav, counter animations |

## Deploying to GitHub Pages

### Option A — Dedicated Repository
1. Create a new GitHub repository (e.g. `simplified-website`)
2. Copy these 4 files into the repo root
3. Go to **Settings → Pages → Source → Deploy from a branch → main / root**
4. Your site will be live at `https://YOUR-USERNAME.github.io/simplified-website`

### Option B — Custom Domain (simplified.co.in)
1. Follow Option A first
2. Create a file called `CNAME` in the repo root containing just:
   ```
   simplified.co.in
   ```
3. In your domain registrar DNS settings, add:
   - **A records** pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME record**: `www` → `YOUR-USERNAME.github.io`
4. Back in GitHub Pages settings, enter your custom domain and enable **Enforce HTTPS**

## Customising content

### Update your phone number
Search for `+91-XXXX-XXXXXX` in both HTML files and replace with your real number.

### Embed your Google Form (Careers page)
1. Open your Google Form
2. Click **Send → Embed tab (`<>`)** 
3. Copy the `src` URL from the iframe code
4. In `careers.html`, replace `YOUR_FORM_ID` in the iframe `src` attribute with the actual form ID

### Update email addresses
Current emails configured:
- `hello@simplified.co.in` — General inquiries
- `hr@simplified.co.in` — HR / Careers
- `accounts@simplified.co.in` — Billing

### Wire up the contact form
The contact form currently simulates submission. To make it real, use one of:
- **Formspree**: Change `<form>` to `<form action="https://formspree.io/f/YOUR_ID">`
- **EmailJS**: Add EmailJS SDK and update `handleFormSubmit()` in `script.js`
- **Netlify Forms**: Add `netlify` attribute to the form tag (if hosting on Netlify)
