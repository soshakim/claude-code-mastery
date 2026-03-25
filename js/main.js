/**
 * 메인 진입점
 * 페이지 로드 완료 후 모든 기능을 초기화합니다.
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('페이지 로딩 완료 - 기능 초기화 시작');

  // ========== 네비게이션 기능 초기화 ==========
  initMobileMenu();           // 모바일 메뉴 토글
  initHeaderScroll();         // 스크롤 시 헤더 배경 변화
  initScrollSpy();            // ScrollSpy (활성 메뉴 하이라이트)

  // ========== 스크롤 기능 초기화 ==========
  initScrollReveal();         // Intersection Observer 애니메이션
  initSmoothScroll();         // 부드러운 스크롤 네비게이션
  initScrollProgress();       // 스크롤 진행도 표시 (선택적)

  // ========== 타이핑 효과 초기화 ==========
  // 히어로 섹션에서 순환할 직함들
  const typewriterTexts = [
    '풀스택 개발자',
    '웹 개발자',
    'React 개발자',
    'Node.js 개발자'
  ];

  // TypeWriter 인스턴스 생성 및 시작
  new TypeWriter('typewriter-text', typewriterTexts, {
    typeSpeed: 100,           // 타이핑 속도 (ms)
    deleteSpeed: 50,          // 삭제 속도 (ms)
    pauseDuration: 2000       // 완성 후 대기 시간 (ms)
  });

  // ========== 기타 초기화 ==========
  // 푸터의 저작권 연도를 현재 연도로 자동 업데이트
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  console.log('모든 기능 초기화 완료');
});

/**
 * 페이지 언로드 시 정리 작업 (선택적)
 */
window.addEventListener('beforeunload', () => {
  // 필요시 이벤트 리스너 제거 또는 정리 작업
  // 현재는 특별한 정리 작업이 필요 없음
});
