// ============================================================
//  BRANDNAME — landing page interactions (kept minimal)
// ============================================================

// Auto-update footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle (simple show/hide)
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.style.display === 'flex';
    links.style.display = open ? '' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '68px';
    links.style.right = '24px';
    links.style.background = 'var(--surface)';
    links.style.padding = open ? '' : '18px 22px';
    links.style.borderRadius = '14px';
    links.style.border = '1px solid var(--border)';
  });
}
