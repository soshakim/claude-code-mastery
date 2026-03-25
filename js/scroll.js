/**
 * 스크롤 관련 기능
 * - Intersection Observer를 이용한 요소 reveal 애니메이션
 * - 부드러운 스크롤 네비게이션
 * - 스크롤 진행도 표시 (선택적)
 */

/**
 * Intersection Observer를 사용하여 .reveal-element 요소들을
 * 뷰포트에 진입할 때 서서히 나타나도록 합니다.
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-element');

  // Intersection Observer 생성
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // 요소가 뷰포트에 진입하면
      if (entry.isIntersecting) {
        // is-visible 클래스 추가 (CSS에서 애니메이션)
        entry.target.classList.add('is-visible');

        // 한 번 보이면 더 이상 관찰할 필요 없음
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,                    // 요소의 10%가 보이면 트리거
    rootMargin: '0px 0px -50px 0px'   // 하단 50px 여유를 두고 트리거
  });

  // 모든 reveal 요소 관찰
  revealElements.forEach(el => observer.observe(el));
}

/**
 * 앵커 링크(href="#...") 클릭 시 헤더 높이를 고려한
 * 부드러운 스크롤을 제공합니다.
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      // 기본 동작 취소 (링크 이동 방지)
      e.preventDefault();

      // 대상 요소 ID 추출
      const targetId = anchor.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      // 대상 요소 없으면 처리 중단
      if (!targetElement) return;

      // 헤더 높이 계산
      const headerHeight = document.getElementById('header').offsetHeight;

      // 스크롤 위치 계산 (헤더 높이 + 여유 공간)
      const targetPosition = targetElement.offsetTop - headerHeight - 16;

      // 부드러운 스크롤 실행
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/**
 * 페이지 스크롤 진행도를 상단 프로그레스 바로 표시합니다.
 * (선택적 기능: #scrollProgress 요소가 있을 경우만 작동)
 */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');

  // 프로그레스 바 요소가 없으면 처리 중단
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    // 스크롤된 높이
    const scrollTop = window.scrollY;

    // 스크롤 가능한 최대 높이 (문서 높이 - 뷰포트 높이)
    const docHeight = document.body.scrollHeight - window.innerHeight;

    // 진행도 계산 (%)
    const progress = (scrollTop / docHeight) * 100;

    // 프로그레스 바 너비 업데이트
    progressBar.style.width = `${progress}%`;
  }, { passive: true });  // 성능 최적화: passive 리스너
}
