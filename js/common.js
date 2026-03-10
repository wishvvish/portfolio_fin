/* =============================================
  김소원 포트폴리오 — common.js
  ★ 모든 페이지에서 공통으로 로드
    - CONTACT 모달 (메일 버튼)
    - nav 스크롤 테두리
    - Back to Top 버튼
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── nav 스크롤 ── */
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ── Back to Top ── */
  const btn = document.getElementById('backToTopBtn');
  if (btn) {
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── CONTACT 모달 ── */
  const mailBtn       = document.getElementById('mailBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose    = document.getElementById('modalClose');

  if (mailBtn && modalBackdrop && modalClose) {
    mailBtn.addEventListener('click', () => {
      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

});
// SEND 버튼 — 폼 내용을 mailto로 전달
const sendBtn = document.querySelector('.modal-send');
if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const firstName = document.querySelector('input[placeholder="성을 입력하세요."]').value.trim();
    const lastName  = document.querySelector('input[placeholder="이름을 입력하세요."]').value.trim();
    const emailId   = document.querySelector('.email-id').value.trim();
    const emailDomain = document.querySelector('.email-domain').value.trim();
    const message   = document.querySelector('input[placeholder="메시지를 입력해주세요."]').value.trim();

    if (!firstName || !emailId || !message) {
      alert('필수 항목을 입력해주세요.');
      return;
    }

    const subject = encodeURIComponent(`[Portfolio] ${firstName}${lastName} 님의 문의`);
    const body    = encodeURIComponent(
      `이름: ${firstName} ${lastName}\n이메일: ${emailId}@${emailDomain}\n\n${message}`
    );

    window.location.href = `mailto:kimsw797@gmail.com?subject=${subject}&body=${body}`;
  });
}

/*email copy btn java*/
function copyEmail(button){

const email = document.getElementById("email").innerText;

navigator.clipboard.writeText(email);

button.innerText = "Copied!";

setTimeout(()=>{
button.innerText = "Copy";
},2000);

}