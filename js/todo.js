// ============ 상태 관리 ============

const state = {
  todos: [],
  filter: 'all' // 'all' | 'active' | 'completed'
};

// ============ 데이터 함수 ============

// 새 할일 항목 생성
const createTodo = (text, priority = 'normal') => ({
  id: Date.now().toString(),
  text,
  priority, // 'high' | 'normal' | 'low'
  completed: false,
  createdAt: new Date().toISOString()
});

// 로컬스토리지에서 할일 목록 로드
const loadTodos = () => {
  try {
    return JSON.parse(localStorage.getItem('todos') || '[]');
  } catch (e) {
    console.error('할일 로드 실패:', e);
    return [];
  }
};

// 로컬스토리지에 할일 목록 저장
const saveTodos = (todos) => {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (e) {
    console.error('할일 저장 실패:', e);
  }
};

// ============ 상태 변경 함수 ============

// 할일 추가
const addTodo = (text, priority) => {
  if (!text.trim()) return; // 빈 문자열 방지
  const newTodo = createTodo(text, priority);
  state.todos.unshift(newTodo); // 최신 항목을 맨 위에
  saveTodos(state.todos);
};

// 할일 토글 (완료/미완료)
const toggleTodo = (id) => {
  const todo = state.todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos(state.todos);
  }
};

// 할일 삭제
const deleteTodo = (id) => {
  state.todos = state.todos.filter(t => t.id !== id);
  saveTodos(state.todos);
};

// 완료된 항목 모두 삭제
const clearCompleted = () => {
  state.todos = state.todos.filter(t => !t.completed);
  saveTodos(state.todos);
};

// ============ 필터링 및 렌더링 함수 ============

// 필터에 맞는 할일 목록 반환
const getFilteredTodos = () => {
  switch (state.filter) {
    case 'active':
      return state.todos.filter(t => !t.completed);
    case 'completed':
      return state.todos.filter(t => t.completed);
    default:
      return state.todos;
  }
};

// 우선순위 색상 클래스 반환
const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'border-l-red-500';
    case 'low':
      return 'border-l-gray-500';
    default:
      return 'border-l-[#3b82f6]';
  }
};

// 우선순위 레이블 반환
const getPriorityLabel = (priority) => {
  switch (priority) {
    case 'high':
      return '높음';
    case 'low':
      return '낮음';
    default:
      return '보통';
  }
};

// 할일 항목 HTML 생성
const renderTodo = (todo) => {
  const priorityColor = getPriorityColor(todo.priority);
  const priorityLabel = getPriorityLabel(todo.priority);
  const completedClass = todo.completed ? 'line-through opacity-50' : '';

  return `
    <li
      class="todo-item flex items-center gap-3 p-4 bg-[#1e293b] border-l-4 ${priorityColor} rounded transition-all hover:bg-[#334155]"
      data-id="${todo.id}"
    >
      <!-- 체크박스 -->
      <input
        type="checkbox"
        class="toggle-btn w-5 h-5 cursor-pointer accent-[#3b82f6]"
        ${todo.completed ? 'checked' : ''}
        aria-label="할일 완료"
      />

      <!-- 할일 텍스트 -->
      <div class="flex-1 min-w-0">
        <p class="text-white break-words ${completedClass}">
          ${escapeHtml(todo.text)}
        </p>
        <p class="text-xs text-gray-500 mt-1">
          우선순위: ${priorityLabel}
        </p>
      </div>

      <!-- 삭제 버튼 -->
      <button
        class="delete-btn flex-shrink-0 px-3 py-1 text-sm text-gray-400 hover:text-red-400 transition-colors"
        aria-label="할일 삭제"
      >
        삭제
      </button>
    </li>
  `;
};

// HTML 이스케이프 (XSS 방지)
const escapeHtml = (text) => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// DOM 렌더링
const render = () => {
  const todoList = document.getElementById('todoList');
  const emptyState = document.getElementById('emptyState');
  const activeCount = document.getElementById('activeCount');
  const clearCompletedBtn = document.getElementById('clearCompletedBtn');

  // 필터된 목록 가져오기
  const filteredTodos = getFilteredTodos();

  // 할일 목록 렌더링
  if (filteredTodos.length === 0) {
    todoList.innerHTML = '';
    emptyState.style.display = 'block';
  } else {
    todoList.innerHTML = filteredTodos.map(renderTodo).join('');
    emptyState.style.display = 'none';
  }

  // 진행 중인 항목 수 업데이트
  const activeTodos = state.todos.filter(t => !t.completed).length;
  activeCount.textContent = activeTodos;

  // 완료 항목 삭제 버튼 상태 업데이트
  const hasCompleted = state.todos.some(t => t.completed);
  clearCompletedBtn.disabled = !hasCompleted;
};

// ============ 이벤트 핸들러 ============

// 할일 추가 핸들러
const handleAdd = () => {
  const todoInput = document.getElementById('todoInput');
  const prioritySelect = document.getElementById('prioritySelect');

  const text = todoInput.value.trim();
  if (!text) {
    todoInput.focus();
    return;
  }

  const priority = prioritySelect.value;
  addTodo(text, priority);

  // 입력 필드 초기화
  todoInput.value = '';
  prioritySelect.value = 'normal';
  todoInput.focus();

  render();
};

// 할일 토글 핸들러
const handleToggle = (id) => {
  toggleTodo(id);
  render();
};

// 할일 삭제 핸들러
const handleDelete = (id) => {
  deleteTodo(id);
  render();
};

// 필터 변경 핸들러
const handleFilterChange = (filter) => {
  state.filter = filter;

  // 활성 탭 업데이트
  document.querySelectorAll('.filter-tab').forEach(btn => {
    if (btn.dataset.filter === filter) {
      btn.classList.add('active');
      btn.classList.add('text-white', 'border-[#3b82f6]');
      btn.classList.remove('text-gray-400', 'border-transparent');
    } else {
      btn.classList.remove('active');
      btn.classList.remove('text-white', 'border-[#3b82f6]');
      btn.classList.add('text-gray-400', 'border-transparent');
    }
  });

  render();
};

// 완료 항목 삭제 핸들러
const handleClearCompleted = () => {
  if (confirm('완료된 모든 항목을 삭제하시겠습니까?')) {
    clearCompleted();
    render();
  }
};

// ============ 이벤트 리스너 등록 ============

const initTodoApp = () => {
  // 초기 상태 로드
  state.todos = loadTodos();
  render();

  // DOM 요소 캐싱
  const todoInput = document.getElementById('todoInput');
  const addBtn = document.getElementById('addBtn');
  const todoList = document.getElementById('todoList');
  const filterTabs = document.getElementById('filterTabs');
  const clearCompletedBtn = document.getElementById('clearCompletedBtn');

  // 할일 추가
  addBtn.addEventListener('click', handleAdd);
  todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  });

  // 위임 패턴으로 동적 요소 이벤트 처리
  todoList.addEventListener('click', (e) => {
    const todoItem = e.target.closest('[data-id]');
    if (!todoItem) return;

    const id = todoItem.dataset.id;

    if (e.target.classList.contains('toggle-btn')) {
      handleToggle(id);
    } else if (e.target.classList.contains('delete-btn')) {
      handleDelete(id);
    }
  });

  // 필터 탭
  filterTabs.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-tab')) {
      const filter = e.target.dataset.filter;
      handleFilterChange(filter);
    }
  });

  // 완료 항목 삭제
  clearCompletedBtn.addEventListener('click', handleClearCompleted);
};

// DOM 로드 완료 후 앱 초기화
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTodoApp);
} else {
  initTodoApp();
}
