<div align="center">

# 🔐 SecureGen

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&pause=1200&color=00F7FF&center=true&vCenter=true&width=850&lines=SecureGen+-+Secure+Static+Website;Deploy+Instantly+with+GitHub+Pages;Fast+%7C+Secure+%7C+Minimal;Modern+Web+Deployment" />

<br>

![Repo Size](https://img.shields.io/github/repo-size/aryanguptajsm/securegen?style=for-the-badge)
![Stars](https://img.shields.io/github/stars/aryanguptajsm/securegen?style=for-the-badge)
![Forks](https://img.shields.io/github/forks/aryanguptajsm/securegen?style=for-the-badge)
![Issues](https://img.shields.io/github/issues/aryanguptajsm/securegen?style=for-the-badge)

</div>

---

# 🚀 About SecureGen

**SecureGen** is a lightweight static website built for **fast and secure deployment using GitHub Pages**.

This repository contains a minimal project structure designed to publish a website instantly with HTTPS support and GitHub hosting.

---

# 📁 Project Structure

```
securegen
│
├── index.html
├── .nojekyll
└── README.md
```

**index.html**
Main website file.

**.nojekyll**
Prevents GitHub Pages from ignoring folders that start with `_`.

**README.md**
Project documentation.

---

# 🌐 Deploy Using GitHub Pages (Web Method)

1. Go to GitHub and create a repository.

2. Upload the following files:

```
index.html
.nojekyll
README.md
```

3. Open repository settings:

```
Settings → Pages
```

4. Configure deployment:

```
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

5. Save the settings.

Your website will be available at:

```
https://your-username.github.io/securegen/
```

Enable **Enforce HTTPS** after deployment.

---

# ⚡ Deploy Using Git (Terminal)

```bash
git init
git add index.html
git commit -m "Initial commit - SecureGen"
git branch -M main
git remote add origin https://github.com/aryanguptajsm/securegen.git
git push -u origin main
```

Then enable **GitHub Pages** in repository settings.

---

# 🛡 Fix “Dangerous Site” Warning

If browsers like Brave show a warning:

1. Ensure HTTPS is enabled in GitHub Pages settings.
2. Remove deceptive or suspicious content.
3. Request a review from Google Safe Browsing.

```
https://transparencyreport.google.com/safe-browsing/search
```

The review process usually takes **24–72 hours**.

---

# 🌍 Custom Domain (Optional)

You can connect your own domain.

Open:

```
Settings → Pages → Custom Domain
```

Example DNS configuration:

```
example.com → GitHub Pages A records
www.example.com → CNAME → username.github.io
```

After DNS propagation, enable **HTTPS**.

---

# 📊 Repository Stats

<div align="center">

<img src="https://github-readme-stats.vercel.app/api?username=aryanguptajsm&show_icons=true&theme=tokyonight" />

</div>

---

# 📬 Contact

📧 **Email:** [aryangupta.jsm@gmail.com](mailto:aryangupta.jsm@gmail.com)
💻 **GitHub:** https://github.com/aryanguptajsm

---

<div align="center">

⭐ If you find this project useful, consider giving it a **star**.

</div>
