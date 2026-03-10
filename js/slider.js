/* =============================================
  김소원 포트폴리오 — slider.js
  ★ OTHER WORKS 슬라이더 (about + works 페이지 공용)
   ============================================= */
  function makeDraggable(el, preventClick = false) {
  if (!el) return;

  let isDragging  = false;
  let startX      = 0;
  let startScroll = 0;
  let moved       = 0;

  el.addEventListener('mousedown', (e) => {
    isDragging  = true;
    startX      = e.pageX - el.offsetLeft;
    startScroll = el.scrollLeft;
    moved       = 0;
    el.style.cursor = 'grabbing';
  });
  el.addEventListener('mouseleave', () => { isDragging = false; el.style.cursor = ''; });
  el.addEventListener('mouseup',    () => { isDragging = false; el.style.cursor = ''; });
  el.addEventListener('mousemove',  (e) => {
    if (!isDragging) return;
    e.preventDefault();
    moved = e.pageX - el.offsetLeft - startX;
    el.scrollLeft = startScroll - moved * 1.2;
  });

  if (preventClick) {
    el.addEventListener('click', (e) => {
      if (Math.abs(moved) > 5) e.preventDefault();
    }, { capture: true });
  }

  el.addEventListener('touchstart', (e) => {
    startX      = e.touches[0].pageX - el.offsetLeft;
    startScroll = el.scrollLeft;
    moved       = 0;
  }, { passive: true });

  el.addEventListener('touchmove', (e) => {
    moved = e.touches[0].pageX - el.offsetLeft - startX;
    el.scrollLeft = startScroll - moved;
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {

  const track      = document.getElementById('sliderTrack');
  const arrowLeft  = document.getElementById('arrowLeft');
  const arrowRight = document.getElementById('arrowRight');
  if (!track) return;

  /* ── 화살표 ── */
  function getScrollAmt() {
    const card = track.querySelector('.slide-card');
    return card ? card.offsetWidth + 2 : 292;
  }
  function updateArrows() {
    if (arrowLeft)  arrowLeft.disabled  = track.scrollLeft <= 0;
    if (arrowRight) arrowRight.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  }
  if (arrowLeft)  arrowLeft.addEventListener('click',  () => { track.scrollBy({ left: -getScrollAmt(), behavior: 'smooth' }); });
  if (arrowRight) arrowRight.addEventListener('click', () => { track.scrollBy({ left:  getScrollAmt(), behavior: 'smooth' }); });
  track.addEventListener('scroll', updateArrows, { passive: true });
  updateArrows();

  /* ── 마우스 드래그 ── */
  let isDragging = false, dragStartX = 0, dragScrollLeft = 0;

  track.addEventListener('mousedown', (e) => {
    isDragging     = true;
    dragStartX     = e.pageX - track.offsetLeft;
    dragScrollLeft = track.scrollLeft;
    track.style.cursor = 'grabbing';
  });
  track.addEventListener('mouseleave', () => { isDragging = false; track.style.cursor = ''; });
  track.addEventListener('mouseup',    () => { isDragging = false; track.style.cursor = ''; });
  track.addEventListener('mousemove',  (e) => {
    if (!isDragging) return;
    e.preventDefault();
    track.scrollLeft = dragScrollLeft - (e.pageX - track.offsetLeft - dragStartX) * 1.2;
    updateArrows();
  });

  /* 드래그 중 링크 이동 방지 */
  track.addEventListener('click', (e) => {
    if (Math.abs(track.scrollLeft - dragScrollLeft) > 5) e.preventDefault();
  }, { capture: true });
  
  const subnav = document.getElementById('worksSubnav');
  if (subnav) {
    makeDraggable(subnav, false);
    const activeTab = subnav.querySelector('a.active');
    if (activeTab) {
      const scrollTo = activeTab.offsetLeft - subnav.offsetWidth / 2 + activeTab.offsetWidth / 2;
      subnav.scrollLeft = scrollTo;
    }
  }
});
