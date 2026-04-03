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
