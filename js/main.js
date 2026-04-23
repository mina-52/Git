/* ========================================
   Git Manual Site — main.js
   ======================================== */

// ── コードコピーボタン ──────────────────────────
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    const codeEl = document.getElementById(target);
    if (!codeEl) return;

    // テキストを取得（.prompt の部分は除く）
    const text = Array.from(codeEl.childNodes)
      .filter(n => !n.classList?.contains('prompt'))
      .map(n => n.textContent)
      .join('')
      .trim();

    navigator.clipboard.writeText(text).then(() => {
      const original = btn.innerHTML;
      btn.innerHTML = '<span>✓</span> コピー済み';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = original;
        btn.classList.remove('copied');
      }, 2000);
    });
  });
});

// ── ステップコードのコピー ─────────────────────
document.querySelectorAll('.step-copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const codeEl = btn.previousElementSibling;
    if (!codeEl) return;

    const text = Array.from(codeEl.childNodes)
      .filter(n => !n.classList?.contains('prompt'))
      .map(n => n.textContent)
      .join('')
      .trim();

    navigator.clipboard.writeText(text).then(() => {
      const original = btn.innerHTML;
      btn.innerHTML = '✓';
      btn.style.color = '#40C057';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.color = '';
      }, 2000);
    });
  });
});

// ── ナビゲーション アクティブ表示 ──────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => observer.observe(s));

// ── スムーズスクロール（href="#..." のリンク全般） ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── 用語集 図解モーダル ────────────────────────
const diagrams = {
  repository: {
    title: 'リポジトリとは？',
    svg: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <rect x="20" y="18" width="360" height="210" rx="14" fill="#F0FFF4" stroke="#2D6A4F" stroke-width="2"/>
  <text x="200" y="46" text-anchor="middle" fill="#2D6A4F" font-weight="700" font-size="14">リポジトリ（プロジェクトの箱）</text>
  <rect x="48" y="62" width="76" height="76" rx="8" fill="white" stroke="#52B788" stroke-width="1.5"/>
  <text x="86" y="96" text-anchor="middle" font-size="24">📄</text>
  <text x="86" y="118" text-anchor="middle" fill="#555" font-size="10">index.html</text>
  <rect x="162" y="62" width="76" height="76" rx="8" fill="white" stroke="#52B788" stroke-width="1.5"/>
  <text x="200" y="96" text-anchor="middle" font-size="24">🎨</text>
  <text x="200" y="118" text-anchor="middle" fill="#555" font-size="10">style.css</text>
  <rect x="276" y="62" width="76" height="76" rx="8" fill="white" stroke="#52B788" stroke-width="1.5"/>
  <text x="314" y="96" text-anchor="middle" font-size="24">⚙️</text>
  <text x="314" y="118" text-anchor="middle" fill="#555" font-size="10">main.js</text>
  <text x="200" y="162" text-anchor="middle" fill="#6C757D" font-size="11">変更履歴</text>
  <line x1="60" y1="178" x2="340" y2="178" stroke="#B7E4C7" stroke-width="2"/>
  <circle cx="110" cy="178" r="10" fill="#B7E4C7" stroke="#2D6A4F" stroke-width="1.5"/>
  <circle cx="180" cy="178" r="10" fill="#52B788" stroke="#2D6A4F" stroke-width="1.5"/>
  <circle cx="250" cy="178" r="10" fill="#2D6A4F"/>
  <text x="110" y="200" text-anchor="middle" fill="#6C757D" font-size="9">1st</text>
  <text x="180" y="200" text-anchor="middle" fill="#6C757D" font-size="9">2nd</text>
  <text x="250" y="200" text-anchor="middle" fill="#2D6A4F" font-size="9" font-weight="700">最新</text>
</svg>`
  },
  commit: {
    title: 'コミットとは？',
    svg: `<svg viewBox="0 0 400 210" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <line x1="50" y1="105" x2="350" y2="105" stroke="#DEE2E6" stroke-width="3"/>
  <circle cx="100" cy="105" r="16" fill="#B7E4C7" stroke="#2D6A4F" stroke-width="2"/>
  <text x="100" y="111" text-anchor="middle" fill="#2D6A4F" font-weight="700" font-size="12">C1</text>
  <text x="100" y="78" text-anchor="middle" fill="#555" font-size="10">初回</text>
  <text x="100" y="134" text-anchor="middle" fill="#6C757D" font-size="9">最初の保存</text>
  <circle cx="200" cy="105" r="16" fill="#52B788" stroke="#2D6A4F" stroke-width="2"/>
  <text x="200" y="111" text-anchor="middle" fill="white" font-weight="700" font-size="12">C2</text>
  <text x="200" y="78" text-anchor="middle" fill="#555" font-size="10">修正</text>
  <text x="200" y="134" text-anchor="middle" fill="#6C757D" font-size="9">バグを直した</text>
  <circle cx="300" cy="105" r="16" fill="#2D6A4F" stroke="#FFD166" stroke-width="3"/>
  <text x="300" y="111" text-anchor="middle" fill="white" font-weight="700" font-size="12">C3</text>
  <text x="300" y="78" text-anchor="middle" fill="#555" font-size="10">最新</text>
  <text x="300" y="134" text-anchor="middle" fill="#2D6A4F" font-size="9" font-weight="700">今いる場所</text>
  <text x="300" y="57" text-anchor="middle" fill="#FFD166" font-size="11" font-weight="700">HEAD</text>
  <line x1="300" y1="62" x2="300" y2="87" stroke="#FFD166" stroke-width="1.5" stroke-dasharray="3,2"/>
  <text x="200" y="180" text-anchor="middle" fill="#6C757D" font-size="12">コミット = セーブポイント の積み重ね</text>
</svg>`
  },
  branch: {
    title: 'ブランチとは？',
    svg: `<svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="26" y="82" fill="#2D6A4F" font-weight="700" font-size="12">main</text>
  <line x1="70" y1="77" x2="385" y2="77" stroke="#2D6A4F" stroke-width="3"/>
  <circle cx="100" cy="77" r="10" fill="#2D6A4F"/>
  <circle cx="175" cy="77" r="10" fill="#2D6A4F"/>
  <circle cx="345" cy="77" r="10" fill="#2D6A4F"/>
  <path d="M175,77 C192,77 198,130 218,144" fill="none" stroke="#52B788" stroke-width="2.5"/>
  <line x1="218" y1="144" x2="320" y2="144" stroke="#52B788" stroke-width="2.5"/>
  <circle cx="260" cy="144" r="10" fill="#52B788"/>
  <circle cx="320" cy="144" r="10" fill="#52B788"/>
  <text x="270" y="170" text-anchor="middle" fill="#52B788" font-weight="700" font-size="11">feature ブランチ</text>
  <text x="135" y="56" text-anchor="middle" fill="#6C757D" font-size="9">通常作業</text>
  <text x="260" y="56" text-anchor="middle" fill="#2D6A4F" font-size="9">main に影響なし！</text>
  <text x="210" y="200" text-anchor="middle" fill="#6C757D" font-size="12">main を壊さず、別の作業ができる！</text>
</svg>`
  },
  merge: {
    title: 'マージとは？',
    svg: `<svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <text x="16" y="70" fill="#2D6A4F" font-weight="700" font-size="12">main</text>
  <line x1="60" y1="65" x2="390" y2="65" stroke="#2D6A4F" stroke-width="3"/>
  <circle cx="90" cy="65" r="10" fill="#2D6A4F"/>
  <circle cx="340" cy="65" r="14" fill="#2D6A4F" stroke="#FFD166" stroke-width="3"/>
  <text x="340" y="70" text-anchor="middle" fill="white" font-size="11" font-weight="700">M</text>
  <text x="340" y="50" text-anchor="middle" fill="#FFD166" font-size="10" font-weight="700">マージ！</text>
  <path d="M90,65 C110,65 116,128 136,143" fill="none" stroke="#52B788" stroke-width="2.5"/>
  <line x1="136" y1="143" x2="268" y2="143" stroke="#52B788" stroke-width="2.5"/>
  <circle cx="186" cy="143" r="10" fill="#52B788"/>
  <circle cx="268" cy="143" r="10" fill="#52B788"/>
  <text x="186" y="168" text-anchor="middle" fill="#52B788" font-weight="700" font-size="11">feature</text>
  <path d="M268,143 C292,143 312,108 332,78" fill="none" stroke="#52B788" stroke-width="2.5" stroke-dasharray="6,3"/>
  <polygon points="325,80 339,70 328,66" fill="#52B788"/>
  <text x="210" y="200" text-anchor="middle" fill="#6C757D" font-size="12">feature の変更を main に取り込む！</text>
</svg>`
  },
  'pull request': {
    title: 'プルリクエスト（PR）とは？',
    svg: `<svg viewBox="0 0 440 210" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <defs>
    <marker id="markerPR" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#2D6A4F"/>
    </marker>
  </defs>
  <rect x="10" y="58" width="108" height="82" rx="10" fill="#F0FFF4" stroke="#2D6A4F" stroke-width="1.5"/>
  <text x="64" y="90" text-anchor="middle" font-size="22">👤</text>
  <text x="64" y="112" text-anchor="middle" fill="#2D6A4F" font-weight="700" font-size="11">あなた</text>
  <text x="64" y="128" text-anchor="middle" fill="#6C757D" font-size="9">feature ブランチ</text>
  <line x1="120" y1="99" x2="156" y2="99" stroke="#2D6A4F" stroke-width="2" marker-end="url(#markerPR)"/>
  <text x="138" y="87" text-anchor="middle" fill="#2D6A4F" font-size="9">PR 提出</text>
  <rect x="160" y="58" width="110" height="82" rx="10" fill="#FFF9C4" stroke="#FFD166" stroke-width="1.5"/>
  <text x="215" y="90" text-anchor="middle" font-size="22">🔍</text>
  <text x="215" y="112" text-anchor="middle" fill="#6D4C00" font-weight="700" font-size="11">コードレビュー</text>
  <text x="215" y="128" text-anchor="middle" fill="#6C757D" font-size="9">承認 / 修正依頼</text>
  <line x1="272" y1="99" x2="308" y2="99" stroke="#2D6A4F" stroke-width="2" marker-end="url(#markerPR)"/>
  <text x="290" y="87" text-anchor="middle" fill="#2D6A4F" font-size="9">承認！</text>
  <rect x="312" y="58" width="118" height="82" rx="10" fill="#2D6A4F" stroke="#2D6A4F" stroke-width="1.5"/>
  <text x="371" y="90" text-anchor="middle" font-size="22">✅</text>
  <text x="371" y="112" text-anchor="middle" fill="white" font-weight="700" font-size="11">マージ完了</text>
  <text x="371" y="128" text-anchor="middle" fill="#B7E4C7" font-size="9">main に統合された</text>
  <text x="220" y="178" text-anchor="middle" fill="#6C757D" font-size="12">変更提案 → レビュー → マージ の流れ</text>
</svg>`
  },
  clone: {
    title: 'クローンとは？',
    svg: `<svg viewBox="0 0 400 210" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <defs>
    <marker id="markerClone" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#2D6A4F"/>
    </marker>
  </defs>
  <rect x="18" y="48" width="130" height="100" rx="12" fill="#24292e" stroke="#2D6A4F" stroke-width="2"/>
  <text x="83" y="88" text-anchor="middle" font-size="28">☁️</text>
  <text x="83" y="113" text-anchor="middle" fill="white" font-size="13" font-weight="700">GitHub</text>
  <text x="83" y="130" text-anchor="middle" fill="#aaa" font-size="10">リモートリポジトリ</text>
  <line x1="152" y1="98" x2="236" y2="98" stroke="#2D6A4F" stroke-width="3" marker-end="url(#markerClone)"/>
  <rect x="153" y="78" width="82" height="22" rx="4" fill="#2D6A4F"/>
  <text x="194" y="93" text-anchor="middle" fill="white" font-size="11" font-weight="700">git clone</text>
  <rect x="252" y="48" width="130" height="100" rx="12" fill="#F0FFF4" stroke="#2D6A4F" stroke-width="2"/>
  <text x="317" y="88" text-anchor="middle" font-size="28">💻</text>
  <text x="317" y="113" text-anchor="middle" fill="#2D6A4F" font-size="13" font-weight="700">ローカル</text>
  <text x="317" y="130" text-anchor="middle" fill="#6C757D" font-size="10">自分のパソコン</text>
  <text x="200" y="178" text-anchor="middle" fill="#6C757D" font-size="12">リポジトリをまるごとコピーしてくる！</text>
</svg>`
  },
  push: {
    title: 'プッシュとは？',
    svg: `<svg viewBox="0 0 400 210" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <defs>
    <marker id="markerPush" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#2D6A4F"/>
    </marker>
  </defs>
  <rect x="18" y="48" width="130" height="100" rx="12" fill="#F0FFF4" stroke="#2D6A4F" stroke-width="2"/>
  <text x="83" y="88" text-anchor="middle" font-size="28">💻</text>
  <text x="83" y="113" text-anchor="middle" fill="#2D6A4F" font-size="13" font-weight="700">ローカル</text>
  <text x="83" y="130" text-anchor="middle" fill="#6C757D" font-size="10">自分のパソコン</text>
  <line x1="152" y1="98" x2="236" y2="98" stroke="#2D6A4F" stroke-width="3" marker-end="url(#markerPush)"/>
  <rect x="150" y="78" width="90" height="22" rx="4" fill="#2D6A4F"/>
  <text x="195" y="93" text-anchor="middle" fill="white" font-size="11" font-weight="700">git push ↑</text>
  <rect x="252" y="48" width="130" height="100" rx="12" fill="#24292e" stroke="#2D6A4F" stroke-width="2"/>
  <text x="317" y="88" text-anchor="middle" font-size="28">☁️</text>
  <text x="317" y="113" text-anchor="middle" fill="white" font-size="13" font-weight="700">GitHub</text>
  <text x="317" y="130" text-anchor="middle" fill="#aaa" font-size="10">リモートリポジトリ</text>
  <text x="200" y="178" text-anchor="middle" fill="#6C757D" font-size="12">ローカルのコミットを GitHub へ送信！</text>
</svg>`
  },
  pull: {
    title: 'プルとは？',
    svg: `<svg viewBox="0 0 400 210" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <defs>
    <marker id="markerPull" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#2D6A4F"/>
    </marker>
  </defs>
  <rect x="18" y="48" width="130" height="100" rx="12" fill="#24292e" stroke="#2D6A4F" stroke-width="2"/>
  <text x="83" y="88" text-anchor="middle" font-size="28">☁️</text>
  <text x="83" y="113" text-anchor="middle" fill="white" font-size="13" font-weight="700">GitHub</text>
  <text x="83" y="130" text-anchor="middle" fill="#aaa" font-size="10">最新の変更がある</text>
  <line x1="152" y1="98" x2="236" y2="98" stroke="#2D6A4F" stroke-width="3" marker-end="url(#markerPull)"/>
  <rect x="152" y="78" width="84" height="22" rx="4" fill="#2D6A4F"/>
  <text x="194" y="93" text-anchor="middle" fill="white" font-size="11" font-weight="700">git pull ↓</text>
  <rect x="252" y="48" width="130" height="100" rx="12" fill="#F0FFF4" stroke="#2D6A4F" stroke-width="2"/>
  <text x="317" y="88" text-anchor="middle" font-size="28">💻</text>
  <text x="317" y="113" text-anchor="middle" fill="#2D6A4F" font-size="13" font-weight="700">ローカル</text>
  <text x="317" y="130" text-anchor="middle" fill="#6C757D" font-size="10">自分のパソコン</text>
  <text x="200" y="178" text-anchor="middle" fill="#6C757D" font-size="12">GitHub の最新変更をローカルに取り込む！</text>
</svg>`
  }
};

const overlay = document.getElementById('diagramOverlay');
const titleEl = document.getElementById('diagramTitle');
const bodyEl  = document.getElementById('diagramBody');
const closeBtn = document.getElementById('diagramClose');

function openDiagram(term) {
  const data = diagrams[term];
  if (!data) return;
  titleEl.textContent = data.title;
  bodyEl.innerHTML = data.svg;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDiagram() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.glossary-card[data-term]').forEach(card => {
  card.addEventListener('click', () => openDiagram(card.dataset.term));
});

closeBtn.addEventListener('click', closeDiagram);

overlay.addEventListener('click', e => {
  if (e.target === overlay) closeDiagram();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDiagram();
});
