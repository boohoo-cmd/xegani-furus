// ================================================================
// SITE ENGINE — xegani-furus
// Handles navigation, article rendering, filtering
// ================================================================

const NAV_HTML = `
<nav>
  <a href="index.html" class="nav-logo">ጸጋኒ ፉሩስ</a>
  <ul class="nav-links">
    <li><a href="index.html" data-page="home">ቤት</a></li>
    <li><a href="articles.html" data-page="articles">ጽሑፋት</a></li>
    <li><a href="about.html" data-page="about">ብዛዕባና</a></li>
  </ul>
</nav>`;

const FOOTER_HTML = `
<footer>
  <span class="footer-logo">ጸጋኒ ፉሩስ</span>
  <span class="footer-note">ናይ ሓሳብ ቦታ — ኤርትራ</span>
</footer>`;

function renderNav(activePage) {
  document.getElementById('nav-placeholder').innerHTML = NAV_HTML;
  document.getElementById('footer-placeholder').innerHTML = FOOTER_HTML;
  const link = document.querySelector(`[data-page="${activePage}"]`);
  if (link) link.classList.add('active');
}

function getTagClass(tag) {
  return `tag-${tag}`;
}

function renderArticleCard(article) {
  return `
    <a class="article-card" href="reader.html?id=${article.id}">
      <span class="article-tag ${getTagClass(article.tag)}">${TAG_LABELS[article.tag]}</span>
      <p class="article-title">${article.title}</p>
      <p class="article-meta">${article.date}</p>
    </a>`;
}

// HOME PAGE — renders latest 3 articles in hero
function renderHomeArticles() {
  const container = document.getElementById('home-articles');
  if (!container) return;
  const latest = ARTICLES.slice(0, 3);
  container.innerHTML = latest.map(renderArticleCard).join('');

  const countEl = document.getElementById('article-count');
  if (countEl) countEl.textContent = ARTICLES.length;
}

// ARTICLES PAGE — renders all with filter
function renderArticlesPage() {
  const container = document.getElementById('articles-container');
  if (!container) return;

  function render(filter) {
    const filtered = filter === 'all'
      ? ARTICLES
      : ARTICLES.filter(a => a.tag === filter);
    container.innerHTML = filtered.length
      ? filtered.map(renderArticleCard).join('')
      : `<p style="color:var(--muted); font-family:'Noto Serif Ethiopic',serif;">ጽሑፋት ኣይተረኽቡን።</p>`;
  }

  render('all');

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(btn.dataset.filter);
    });
  });
}

// READER PAGE — renders single article
function renderReader() {
  const container = document.getElementById('reader-content');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const article = ARTICLES.find(a => a.id === id);

  if (!article) {
    container.innerHTML = `<p style="color:var(--muted);font-family:'Noto Serif Ethiopic',serif;">ጽሑፍ ኣይተረኽበን።</p>`;
    return;
  }

  document.title = `${article.title} — ጸጋኒ ፉሩስ`;

  // Convert line breaks to paragraphs
  const bodyHtml = article.content
    .trim()
    .split('\n')
    .map(line => {
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith('### ')) return `<h3>${line.slice(4)}</h3>`;
      if (line.startsWith('> ')) return `<blockquote>${line.slice(2)}</blockquote>`;
      if (line.trim() === '') return '';
      return `<p>${line}</p>`;
    })
    .join('');

  container.innerHTML = `
    <a class="reader-back" href="articles.html">← ጽሑፋት</a>
    <div class="reader-eyebrow">
      <span class="article-tag ${getTagClass(article.tag)}">${TAG_LABELS[article.tag]}</span>
      <span class="article-meta">${article.date}</span>
    </div>
    <h1 class="reader-title">${article.title}</h1>
    <p class="reader-meta" style="font-family:'Cormorant Garamond',serif;font-style:italic;">${article.titleLatin}</p>
    <div class="reader-body">${bodyHtml}</div>`;
}
