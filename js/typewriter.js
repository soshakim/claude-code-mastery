/**
 * TypeWriter 클래스
 * 히어로 섹션의 직함 타이핑 애니메이션을 구현합니다.
 *
 * 사용 예:
 * new TypeWriter('typewriter-text', ['풀스택 개발자', '웹 개발자'], {
 *   typeSpeed: 100,
 *   deleteSpeed: 50,
 *   pauseDuration: 2000
 * });
 */

class TypeWriter {
  constructor(elementId, texts, options = {}) {
    // DOM 요소 선택
    this.element = document.getElementById(elementId);

    // 입력 매개변수
    this.texts = texts;                                    // 타이핑할 텍스트 배열
    this.typeSpeed = options.typeSpeed || 100;             // 타이핑 속도 (ms)
    this.deleteSpeed = options.deleteSpeed || 50;          // 삭제 속도 (ms)
    this.pauseDuration = options.pauseDuration || 2000;    // 텍스트 완성 후 대기 시간 (ms)

    // 내부 상태
    this.currentTextIndex = 0;   // 현재 텍스트의 인덱스
    this.currentCharIndex = 0;   // 현재 문자의 인덱스
    this.isDeleting = false;     // 현재 삭제 중인지 여부

    // 애니메이션 시작
    this.start();
  }

  /**
   * 타이핑 애니메이션 시작
   */
  start() {
    this.tick();
  }

  /**
   * 타이핑/삭제 루프의 한 단계 실행
   * 문자를 추가하거나 제거하고 다음 재귀 호출을 예약합니다.
   */
  tick() {
    // 현재 표시할 텍스트 가져오기
    const currentText = this.texts[this.currentTextIndex];

    if (this.isDeleting) {
      // 삭제 중: 문자 하나 제거
      this.currentCharIndex--;
    } else {
      // 타이핑 중: 문자 하나 추가
      this.currentCharIndex++;
    }

    // DOM 업데이트: 현재까지의 문자열 표시
    this.element.textContent = currentText.substring(0, this.currentCharIndex);

    // 다음 tick까지의 대기 시간 결정
    let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    // 현재 텍스트 타이핑 완료 감지
    if (!this.isDeleting && this.currentCharIndex === currentText.length) {
      // 텍스트 완성: 일정 시간 대기한 후 삭제 모드로 전환
      delay = this.pauseDuration;
      this.isDeleting = true;
    }
    // 현재 텍스트 삭제 완료 감지
    else if (this.isDeleting && this.currentCharIndex === 0) {
      // 삭제 완료: 다음 텍스트로 전환
      this.isDeleting = false;
      this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
    }

    // 다음 tick 재귀 호출
    setTimeout(() => this.tick(), delay);
  }
}
