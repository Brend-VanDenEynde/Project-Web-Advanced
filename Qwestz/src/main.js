import Router from './router.js';
import './style.css';

// Define de routes
const routes = {
  '/': renderHome,
  '/404': renderNotFound,
};

const router = new Router(routes);

// === UI COMPONENTS ===

// Dark mode toggle
function setupDarkModeToggle() {
  const toggleBtn = document.getElementById('dark-mode-toggle');
  const isDark = localStorage.getItem('theme') === 'dark';

  if (isDark) {
    document.body.classList.add('dark');
    toggleBtn.classList.add('dark-active');
  }

  toggleBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleBtn.classList.toggle('dark-active');

    if (document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
}

// === ROUTES ===
function renderHome(container) {
  container.innerHTML = `
    <div class="card">
      <h1>Kies een thema</h1>
      <div class="themes">
        <button class="theme-btn app-btn" data-theme="computer">💻 Computer</button>
        <button class="theme-btn app-btn" data-theme="sport">⚽ Sport</button>
      </div>

      <div id="difficulty-section" class="hidden">
        <h2>Kies moeilijkheidsgraad</h2>
        <button class="diff-btn app-btn">Easy</button>
        <button class="diff-btn app-btn">Medium</button>
        <button class="diff-btn app-btn">Hard</button>
      </div>

      <button id="history-btn" class="app-btn">📚 Vorige Quizzen</button>
    </div>

    <button id="dark-mode-toggle" class="dark-mode-btn">🌗</button>
  `;

  setupThemeButtons();
  setupDarkModeToggle();

  document.getElementById('history-btn').addEventListener('click', () => {
    alert('Vorige quizzen komen hier.');
  });
}


function renderNotFound(container) {
  container.innerHTML = `<h1>404 - Pagina niet gevonden</h1>`;
}

// === HELPER FUNCTIONS ===

function setupThemeButtons() {
  const buttons = document.querySelectorAll('.theme-btn');
  const difficultySection = document.getElementById('difficulty-section');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      difficultySection.classList.remove('hidden');
    });
  });
}
