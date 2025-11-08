# SecureGen (GitHub Pages repo)

This repo contains a single-page static site: `index.html`. It is ready to be published using **GitHub Pages**.

## Quick steps to host on GitHub Pages (web UI)
1. Go to https://github.com and sign in (or create an account).
2. Click **New repository**.
   - Repository name: `securegen` (or whatever you like)
   - Add a short description (optional).
   - Select **Public**.
   - Do NOT initialize with a README (optional).
3. After repo is created, click **Upload files** and drag-drop `index.html`, `.nojekyll`, and `README.md`.
4. Commit the changes (Add files).
5. Go to **Settings → Pages** (or **Settings → Code and automation → Pages**).
   - Under **Build and deployment**, set Source to **Deploy from a branch**.
   - Branch: `main` (or `master` depending on repo), Folder: `/ (root)`.
   - Save.
   - Once Pages is enabled, toggle **Enforce HTTPS** (if available).
6. Wait a few minutes and open the provided `https://<your-username>.github.io/<repo-name>/` URL.

## Quick steps to host with git (command line)
If you have git installed:

```bash
# from a folder containing index.html
git init
git add index.html
git commit -m "Initial commit - SecureGen"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
# then go to Settings → Pages and enable Pages as described above
```

## Files included
- `index.html` — the website.
- `.nojekyll` — prevents GitHub Pages from ignoring files/folders that start with `_`.
- `README.md` — this file.

## Removing "Dangerous site" / Brave warning (Google Safe Browsing)
If you or Brave sees a "Dangerous site" warning, do these:
1. Make sure the site is served over HTTPS and `Enforce HTTPS` is ON in GitHub Pages settings.
2. Ensure the site content does not contain deceptive login prompts or fake branding for other companies.
3. If content is clean, request a review from Google Safe Browsing:
   - Visit: https://transparencyreport.google.com/safe-browsing/search
   - Search your site and request a review.
4. Wait 24–72 hours after fixing issues and requesting review — Google will update the flag if everything is safe.

## Custom domain (optional)
If you want your own domain:
1. In repo settings (Pages) add `example.com` (your domain) under Custom domain.
2. Add DNS records at your domain registrar:
   - For apex domain (example.com): add A records pointing to GitHub Pages IPs (check GitHub docs for IPs).
   - For subdomain (www): add a CNAME to `<your-username>.github.io`.
3. Enable **Enforce HTTPS** after DNS propagates (may take up to 48 hours).

---

If you'd like, I can:
- Create the GitHub repository for you (I can't access your GitHub without credentials) — I'll provide commands and files.
- Walk you step-by-step while you perform the actions.
- Generate a `CNAME` or `README` customized with your username and repo name.

Download the prepared zip and upload its contents to your GitHub repo or push via git.
