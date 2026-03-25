# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**개발자 웹 이력서** - HTML, CSS, JavaScript, Tailwind CSS를 이용한 반응형 포트폴리오 웹사이트

이 프로젝트는 개발자의 이력서, 경력, 프로젝트, 스킬 등을 소개하는 모던 웹사이트를 구축합니다.
Tailwind CSS를 활용하여 빠르게 스타일링하고, 바닐라 JavaScript로 상호작용을 구현합니다.

---

## 개발 규칙

### 언어 규칙
- **응답 언어:** 한국어
- **코드 주석:** 한국어로 작성 (무엇을 하는지, 왜 하는지 설명)
- **커밋 메시지:** 한국어로 작성
- **문서화:** 한국어로 작성
- **변수명/함수명:** 영어로 작성 (코드 표준 준수)

### 코딩 스타일
- ES6+ 문법 사용
- 함수형 프로그래밍 패턴 선호
- DRY (Don't Repeat Yourself) 원칙 준수
- 명확한 네이밍: 변수/함수는 목적이 명확하게 드러나도록

---

## 프로젝트 구조

```
claude-code-mastery/
├── index.html              # 메인 페이지
├── css/
│   ├── main.css           # 커스텀 CSS (Tailwind로 충분하면 최소화)
│   └── globals.css        # 전역 스타일 변수
├── js/
│   ├── main.js            # 진입점, 모든 모듈 초기화
│   ├── navigation.js      # 네비게이션 기능 (모바일 메뉴 토글 등)
│   ├── scroll.js          # 스크롤 애니메이션, 부드러운 이동
│   ├── theme.js           # 다크 모드 토글 (선택사항)
│   └── utils.js           # 유틸리티 함수
├── assets/
│   ├── images/            # 프로필, 프로젝트 이미지
│   ├── icons/             # SVG 아이콘, 소셜 미디어 아이콘
│   └── fonts/             # 커스텀 폰트 (필요시)
├── ROADMAP.md             # 개발 로드맵
├── CLAUDE.md              # 이 파일
└── README.md              # 프로젝트 설명 및 배포 가이드
```

---

## 개발 방향 및 주요 결정사항

### 빌드 환경
- **빌드 도구:** 없음 (바닐라 HTML/CSS/JavaScript 사용)
- **Tailwind CSS:** CDN을 통한 설정 (프로덕션 최적화 시 빌드 프로세스 추가 검토)
- **모듈 번들링:** 필요시 추가 (현재는 바닐라 JS 사용)

### 구조적 특징
1. **Single Page Application 개념이 아님** - 전통적인 멀티섹션 페이지 (앵커 네비게이션)
2. **최소한의 JS 의존성** - 바닐라 JavaScript로 기본 상호작용 구현
3. **Tailwind CSS 우선** - 커스텀 CSS는 최소화
4. **SEO 최적화** - 메타 태그, 구조화된 데이터 포함
5. **접근성 준수** - WCAG 2.1 AA 수준 목표

### 섹션별 구성
- **Hero:** 프로필 소개, CTA 버튼
- **About:** 자기소개, 기술 스택
- **Experience:** 경력 정보 (타임라인 스타일)
- **Projects:** 포트폴리오 프로젝트 (카드 그리드)
- **Skills:** 기술 목록 (배지 또는 프로그레시바 형태)
- **Contact:** 연락 양식 또는 직접 연락 정보
- **Header/Footer:** 네비게이션, 소셜 링크

---

## 개발 명령어

### 로컬 개발 환경 실행
현재 단계에서는 간단한 로컬 서버 필요. 다음 중 선택:

**Option 1: Python (권장 - 설치 없이)**
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

**Option 2: Node.js Live Server**
```bash
npx live-server
```

**Option 3: VS Code Live Server 확장**
- 확장 설치 후 `index.html`에서 우클릭 → "Open with Live Server"

### 브라우저 호환성 테스트
- Chrome/Edge: F12 개발자 도구 → Device Toolbar
- Firefox: F12 → Responsive Design Mode
- Safari: Develop 메뉴 → Enter Responsive Design Mode

---

## 중요한 개발 체크리스트

### 각 Phase별 확인사항
- **Phase 1 (구조):** 디렉토리 생성, `index.html` 기본 템플릿 완성, Tailwind CDN 추가
- **Phase 2 (네비게이션):** 반응형 메뉴, 모바일 토글 기능 확인
- **Phase 3 (콘텐츠):** 각 섹션 HTML 구조 완성, 기본 스타일링
- **Phase 4 (Contact):** 양식 또는 연락처 정보, 푸터
- **Phase 5 (상호작용):** 스크롤 이벤트, 애니메이션, 다크 모드 (선택)
- **Phase 6 (최적화):** 반응형 검증, 이미지 최적화, 성능 측정
- **Phase 7 (배포):** 접근성 테스트, 크로스 브라우저 테스트, 배포

### 반응형 디자인 브레이크포인트 (Tailwind 기본값)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## 유용한 리소스

- **ROADMAP.md:** 상세한 개발 로드맵 및 마일스톤
- **Tailwind CSS 문서:** https://tailwindcss.com/docs
- **MDN Web Docs:** https://developer.mozilla.org/
- **Web.dev:** https://web.dev/ (성능, 접근성 가이드)

---

## 주의사항

1. **성능:** 이미지는 적절한 크기로 최적화 필수 (특히 모바일)
2. **접근성:** 색상 대비, 텍스트 대체, 키보드 네비게이션 고려
3. **브라우저 지원:** IE11 지원 불필요 (모던 브라우저만 타겟)
4. **SEO:** Open Graph 태그, 구조화된 데이터(JSON-LD) 포함
5. **배포:** GitHub Pages/Netlify/Vercel 중 선택 (모두 정적 호스팅 지원)
