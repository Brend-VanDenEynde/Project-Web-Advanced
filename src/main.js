// importeer van de router
import Router from './router.js';
// importeer de CSS
import './style.css';

// routes 
const routes = {
  '/': renderHome,
  '/quiz': renderQuiz,
  '/404': renderNotFound,
};

const router = new Router(routes);

// Zaken voor Darkmode
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
// renderpagina's functies


// render van de homepagina
function renderHome(container) {
  container.innerHTML = `
    <div class="card">
      <h1>Kies een thema</h1>
      <div class="themes">
        <button class="theme-btn app-btn" data-theme="computer">💻 Computer</button>
        <button class="theme-btn app-btn" data-theme="sport">⚽ Sport</button>
      </div>

      <div id="difficulty-section">
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

// render van de quizpagina


async function renderQuiz(container) {
  document.body.classList.add('quiz');
  const theme = localStorage.getItem('selectedTheme');
  const difficulty = localStorage.getItem('selectedDifficulty');

  container.innerHTML = `
    <div id="quiz" class="card">
      <h2>Quiz wordt geladen...</h2>
    </div>
    <button id="dark-mode-toggle" class="dark-mode-btn">🌗</button>
  `;

  setupDarkModeToggle();
}


// render van de notfound pagina
function renderNotFound(container) {
  container.innerHTML = `
    <div class="card">
      <h1>404 - Pagina niet gevonden</h1>
      <a href="#/">Terug naar home</a>
    </div>
    <button id="dark-mode-toggle" class="dark-mode-btn">🌗</button>
  `;

  setupDarkModeToggle();
}



// Zaken voor de knoppen (Komende quizzen, thema's, moeilijkheidsgraad aan gelinkt)
function setupThemeButtons() {
  const buttons = document.querySelectorAll('.theme-btn');
  const difficultySection = document.getElementById('difficulty-section');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedTheme = btn.dataset.theme;
      difficultySection.dataset.theme = selectedTheme;
      difficultySection.classList.add('visible');
    });
  });

  document.querySelectorAll('.diff-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const difficulty = btn.textContent.toLowerCase();
      const theme = document.getElementById('difficulty-section').dataset.theme;
      localStorage.setItem('selectedTheme', theme);
      localStorage.setItem('selectedDifficulty', difficulty);
      console.log(`Thema: ${theme}, Moeilijkheidsgraad: ${difficulty}`);
      window.location.hash = '#/quiz';
    });
  });
}

// initialiseer de router
window.addEventListener('popstate', () => router.resolve());
// footer jaartal
document.getElementById('year').textContent = new Date().getFullYear();
