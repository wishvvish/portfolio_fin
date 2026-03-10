/* =============================================
  김소원 포트폴리오 — index.js
  홈 페이지 전용
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  const navLinks = document.querySelectorAll('.nav-links a');
  const worksEl  = document.getElementById('works');

  /* ── 스크롤에 따른 active 추적 ── */
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    let current = 'home';
    if (worksEl && sy >= worksEl.offsetTop - 120) current = 'works';
    navLinks.forEach(a => {
      if (a.dataset.page) a.classList.toggle('active', a.dataset.page === current);
    });
  }, { passive: true });

  /* ── 네비 WORKS 클릭 → vetements 상세 페이지로 이동 ── */
  navLinks.forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      /* WORKS → 첫 번째 작업 페이지(vetements)로 이동 */
      else if (href === '#works') {
        e.preventDefault();
        window.location.href = 'works/vetements.html';
      }
      /* ABOUT → 기본 동작 유지 */
    });
  });

});
