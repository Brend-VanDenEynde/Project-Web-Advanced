'use strict';

// importeer van de router
import Router from './router.js';
// importeer de CSS
import './style.css';

// routes 
const routes = {
  '/': renderHome,
  '/quiz': renderQuiz,
  '/history': renderHistory,
  '/404': renderNotFound,
};

const router = new Router(routes);

// functie om dark mode in te stellen
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

// render van de homepagina// render van de homepagina
function renderHome(container) {
  document.body.classList.remove('quiz');

  container.innerHTML = `
    <div class="card">
      <h1>Choose a theme</h1>
      <div class="themes">
        <button class="theme-btn app-btn" data-theme="computer">💻 Computer</button>
        <button class="theme-btn app-btn" data-theme="sport">⚽ Sport</button>
        <button class="theme-btn app-btn" data-theme="boeken">📚 Books</button>
        <button class="theme-btn app-btn" data-theme="films">🎬 Movies</button>
        <button class="theme-btn app-btn" data-theme="muziek">🎵 Music</button>
        <button class="theme-btn app-btn" data-theme="geschiedenis">🏺 History</button>
      </div>

      <div id="difficulty-section">
        <h2>Choose difficulty</h2>
        <button class="diff-btn app-btn">Easy</button>
        <button class="diff-btn app-btn">Medium</button>
        <button class="diff-btn app-btn">Hard</button>
      </div>

      <button id="history-btn" class="app-btn">📚 Previous Quizzes</button>
    </div>

    <button id="dark-mode-toggle" class="dark-mode-btn">🌗</button>
  `;

  setupThemeButtons();
  setupDarkModeToggle();

  document.getElementById('history-btn').addEventListener('click', () => {
    window.location.hash = '#/history';
  });
}

// render van de quizpagina
async function renderQuiz(container) {
  document.body.classList.add('quiz');
  const theme = localStorage.getItem('selectedTheme');
  const difficulty = localStorage.getItem('selectedDifficulty');
  // thema van de quiz het id geven
  let category = null;
  if (theme === 'computer') {
    category = 18;
  }
  else if (theme == 'sport') {
    category = 21;
  }
  else if (theme == 'boeken') {
    category = 10;
  }
  else if (theme == 'films') {
    category = 11;
  }
  else if (theme == 'muziek') {
    category = 12;
  }
  else if (theme == 'geschiedenis') {
    category = 23;
  }

  if (category == null || difficulty == null) {
    container.innerHTML = `
      <div class="card">
        <h1>No theme or difficulty selected</h1>
        <a href="#/">Back to home</a>
      </div>
      <button id="dark-mode-toggle" class="dark-mode-btn">🌗</button>
    `;
    setupDarkModeToggle();
  } else {

    const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;

    container.innerHTML = `
      <div id="quiz" class="card">
        <h2>Loading quiz...</h2>
      </div>
      <button id="dark-mode-toggle" class="dark-mode-btn">🌗</button>
    `;

    setupDarkModeToggle();

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.results.length == 0) {
        container.innerHTML = `<div class="card"><p>No questions found.</p></div>`;
        return;
      }

      startQuiz(container, data.results);
    } catch (error) {
      container.innerHTML = `<div class="card"><p>Error loading quiz questions.</p></div>`;
    }
  }
}

// functie om de quiz te starten
function startQuiz(container, questions) {
  let current = 0;
  let score = 0;

  function renderQuestion() {
    const q = questions[current];
    const answers = [...q.incorrect_answers];
    const correct = q.correct_answer;
    answers.splice(Math.floor(Math.random() * (answers.length + 1)), 0, correct);

    container.innerHTML = `
      <div class="card">
        <h2>Question ${current + 1} of ${questions.length}</h2>
        <p>${decodeHTML(q.question)}</p>
        <div class="answers">
          ${answers.map(ans => `<button class="app-btn answer">${decodeHTML(ans)}</button>`).join('')}
        </div>
      </div>
      <button id="dark-mode-toggle" class="dark-mode-btn">🌗</button>
    `;

    setupDarkModeToggle();

    document.querySelectorAll('.answer').forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = btn.textContent;
        if (chosen == decodeHTML(correct)) score++;

        current++;
        current < questions.length ? renderQuestion() : showResult();
      });
    });
  }

  // Huidige resultaat opslaan
  function showResult() {
    const results = JSON.parse(localStorage.getItem('quizHistory')) || [];
    results.push({
      theme: localStorage.getItem('selectedTheme'),
      difficulty: localStorage.getItem('selectedDifficulty'),
      score: score,
      total: questions.length,
      date: new Date().toLocaleString()
    });
    localStorage.setItem('quizHistory', JSON.stringify(results));

    container.innerHTML = `
      <div class="card">
        <h2>Quiz completed!</h2>
        <p>Your score: ${score} / ${questions.length}</p>
        <button class="app-btn" onclick="window.location.hash = '#'">Back to start</button>
      </div>
      <button id="dark-mode-toggle" class="dark-mode-btn">🌗</button>
    `;
    setupDarkModeToggle();
  }

  renderQuestion();
}

// render van de notfound pagina
function renderNotFound(container) {
  container.innerHTML = `
    <div class="card">
      <h1>404 - Page not found</h1>
      <a href="#/">Back to home</a>
    </div>
    <button id="dark-mode-toggle" class="dark-mode-btn">🌗</button>
  `;

  setupDarkModeToggle();
}

function renderHistory(container) {
  document.body.classList.remove('quiz');
  const results = JSON.parse(localStorage.getItem('quizHistory')) || [];

  if (results.length === 0) {
    container.innerHTML = `
      <div class="card">
        <h2>No previous quizzes found.</h2>
        <a href="#/">Back to home</a>
      </div>
      <button id="dark-mode-toggle" class="dark-mode-btn">🌗</button>
    `;
  } else {
    container.innerHTML = `
      <div class="card">
        <h2>Previous quiz results</h2>
        <input type="text" id="filter-input" placeholder="Filter by theme or difficulty..." style="width: 100%; padding: 8px; margin-bottom: 12px; border-radius: 8px; border: 1px solid #ccc;" />

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="text-align: left; border-bottom: 2px solid #ccc;">
              <th>Date</th>
              <th>Theme</th>
              <th>Difficulty</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            ${results.map(r => `
              <tr style="border-bottom: 1px solid #ddd;">
                <td>${r.date}</td>
                <td>${r.theme}</td>
                <td>${r.difficulty}</td>
                <td>${r.score} / ${r.total}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <button class="app-btn" onclick="window.location.hash = '#/'">Back to home</button>
        <button class="app-btn" id='clearHistory'>Clear history</button>
      </div>
      <button id="dark-mode-toggle" class="dark-mode-btn">🌗</button>
    `;
    document.getElementById('clearHistory')?.addEventListener('click', () => {
      localStorage.removeItem('quizHistory');
      window.location.reload();
    });
    document.getElementById('filter-input').addEventListener('input', (e) => {
      const value = e.target.value.toLowerCase();
      const rows = container.querySelectorAll('tbody tr');

      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(value) ? '' : 'none';
      });
    });

  }

  setupDarkModeToggle();
}


// Decodeert HTML-entiteiten naar hun originele tekens (bijv. &amp; → &) Door ChatGPT
function decodeHTML(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

// Zaken voor de knoppen (Komende quizzen, thema's, moeilijkheidsgraad aan gelinkt)
function setupThemeButtons() {
  const buttons = document.querySelectorAll('.theme-btn');
  const difficultySection = document.getElementById('difficulty-section');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedTheme = btn.dataset.theme;

      // Verwijder 'selected' van alle knoppen
      buttons.forEach(b => b.classList.remove('selected'));

      // Voeg toe aan de geklikte knop
      btn.classList.add('selected');

      // Toon difficulty-sectie
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
