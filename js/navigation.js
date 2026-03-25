/**
 * 네비게이션 관련 기능
 * - 모바일 메뉴 토글
 * - 스크롤 시 헤더 배경 효과
 * - ScrollSpy (현재 섹션 활성화)
 */

/**
 * 모바일 메뉴 토글 기능
 * 햄버거 버튼 클릭 시 메뉴를 보/숨기고,
 * 메뉴 링크 클릭 시 메뉴를 닫습니다.
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  // 햄버거 버튼 클릭 이벤트
  menuToggle.addEventListener('click', () => {
    // hidden 클래스 토글 (보이기/숨기기)
    const isHidden = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden', !isHidden);

    // aria-expanded 속성 업데이트 (접근성)
    menuToggle.setAttribute('aria-expanded', String(isHidden));
  });

  // 모바일 메뉴의 링크 클릭 시 메뉴 닫기
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      // 메뉴 숨기기
      mobileMenu.classList.add('hidden');
      // aria-expanded 속성 업데이트
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * 스크롤 시 헤더에 배경 효과를 적용합니다.
 * 50px 이상 스크롤하면 헤더에 배경색과 블러 효과를 추가합니다.
 */
function initHeaderScroll() {
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    // 스크롤 거리가 50px 이상이면
    if (window.scrollY > 50) {
      // scrolled 클래스 추가 (배경, 블러 효과)
      header.classList.add('scrolled');
    } else {
      // 그 외엔 scrolled 클래스 제거
      header.classList.remove('scrolled');
    }
  }, { passive: true });  // 성능 최적화: passive 리스너
}

/**
 * ScrollSpy 기능
 * 현재 뷰포트에 보이는 섹션에 따라 네비게이션 링크를 활성화합니다.
 */
function initScrollSpy() {
  // 모든 섹션 요소 선택
  const sections = document.querySelectorAll('section[id]');
  // 모든 네비게이션 링크 선택
  const navLinks = document.querySelectorAll('.nav-link');
  // 헤더 높이 가져오기
  const headerHeight = document.getElementById('header').offsetHeight;

  window.addEventListener('scroll', () => {
    // 현재 활성 섹션의 ID 저장
    let currentSection = '';

    // 각 섹션이 화면에 도달했는지 확인
    sections.forEach(section => {
      // 섹션의 상단 위치 (헤더 높이와 여유 공간 차감)
      const sectionTop = section.offsetTop - headerHeight - 100;

      // 현재 스크롤 위치가 섹션 상단 이상이면
      if (window.scrollY >= sectionTop) {
        // 현재 섹션으로 업데이트
        currentSection = section.getAttribute('id');
      }
    });

    // 모든 네비게이션 링크 업데이트
    navLinks.forEach(link => {
      // 기존 active 클래스 제거
      link.classList.remove('active');

      // 현재 섹션과 매칭하는 링크에 active 클래스 추가
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });  // 성능 최적화: passive 리스너
}
