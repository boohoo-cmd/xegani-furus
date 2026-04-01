# ጸጋኒ ፉሩስ — Site Guide

## File Structure
```
xegani-furus/
├── index.html        → Homepage
├── articles.html     → All articles list
├── reader.html       → Single article view
├── about.html        → About page
├── css/
│   └── style.css     → All styling (don't need to touch this)
└── js/
    ├── articles.js   → ALL ARTICLES LIVE HERE ← you edit this
    └── main.js       → Site engine (don't need to touch this)
```

---

## How to Publish a New Article

### Step 1 — Open `js/articles.js`
This is the only file you need to edit.

### Step 2 — Copy this template and fill it in:
```javascript
{
  id: "unique-id-no-spaces",         // e.g. "eritrea-2025" — must be unique
  tag: "politics",                   // politics | philosophy | history | culture
  title: "ናይ ጽሑፍ ኣርእስቲ",           // Tigrinya title
  titleLatin: "Title in English",    // English/Latin version
  date: "መጋቢት ፳፻፲፮",               // Date in Tigrinya (or however you prefer)
  preview: "ቀዳማይ ሓሳብ...",           // 1-2 sentences shown on the cards
  content: `
ናይ ጽሑፍ ትሕዝቶ ኣብዚ።

ሓደ ሓሳብ ነበረ።

## ክፍሊ ኣርእስቲ

ዝያዳ ሓሳባት ኣብዚ።
  `
},
```

### Step 3 — Paste it at the TOP of the ARTICLES array (newest first)

```javascript
const ARTICLES = [
  {
    // ← your new article goes here
  },
  {
    // existing articles below...
  }
];
```

### Step 4 — Save, commit, push
```bash
git add .
git commit -m "new article: [title]"
git push
```
GitHub Pages auto-deploys. Live in ~1 minute.

---

## Content Formatting in Articles

Inside the `content` field:
- Normal paragraph → just type text
- Section heading → start with `## `
- Subheading → start with `### `
- Quote/blockquote → start with `> `
- Empty line → blank line between paragraphs

---

## GitHub Pages Setup (one time)

1. Push this folder to a GitHub repo
2. Go to repo → Settings → Pages
3. Source: Deploy from branch → `main` → `/ (root)`
4. Save — your site will be live at `https://yourusername.github.io/repo-name`

For a custom domain (e.g. `xeganifurus.com`), add a `CNAME` file with just the domain name inside, then point your domain's DNS to GitHub Pages.
