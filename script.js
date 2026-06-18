/* ══════════════════════════════
   Muhoyyo Alisherovna — script.js
   ══════════════════════════════ */

// ── Image Modal ──────────────────────────────
const modal    = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');

function openModal(src) {
    if (!modal || !modalImg || !src) return;
    modalImg.src = src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { modalImg.src = ''; }, 300);
}

// Click outside image → close
modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// ESC key → close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Also support legacy review-img clicks
document.addEventListener('click', (e) => {
    const img = e.target.closest('.review-img');
    if (img) {
        const src = img.getAttribute('data-full') || img.src;
        openModal(src);
    }
});

// ── One audio at a time ───────────────────────
document.addEventListener('play', (e) => {
    if (e.target.tagName === 'AUDIO') {
        document.querySelectorAll('audio').forEach(a => {
            if (a !== e.target) a.pause();
        });
    }
}, true);

// ── FAB hover pause animation ─────────────────
document.querySelectorAll('.fab').forEach(fab => {
    fab.addEventListener('mouseenter', () => fab.style.animation = 'none');
    fab.addEventListener('mouseleave', () => fab.style.animation = '');
});

// ── Ripple effect ─────────────────────────────
function addRipple(el, e) {
    const rect  = el.getBoundingClientRect();
    const size  = Math.max(rect.width, rect.height);
    const x     = e.clientX - rect.left - size / 2;
    const y     = e.clientY - rect.top  - size / 2;
    const span  = document.createElement('span');
    span.style.cssText = `
        position:absolute;pointer-events:none;border-radius:50%;
        width:${size}px;height:${size}px;left:${x}px;top:${y}px;
        background:rgba(255,255,255,0.25);transform:scale(0);
        animation:rippleAnim .55s ease-out forwards;
    `;
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.appendChild(span);
    setTimeout(() => span.remove(), 600);
}

const rippleStyle = document.createElement('style');
rippleStyle.textContent = '@keyframes rippleAnim{to{transform:scale(4);opacity:0}}';
document.head.appendChild(rippleStyle);

document.querySelectorAll('.cta-btn, .social-pill, .banner-link').forEach(el => {
    el.addEventListener('click', (e) => addRipple(el, e));
});

// ── Scroll reveal (lightweight) ───────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .audio-card, .review-photo-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .45s ease, transform .45s ease';
    observer.observe(el);
});

console.log('✅ Muhoyyo Alisherovna — sayt yuklandi!');
