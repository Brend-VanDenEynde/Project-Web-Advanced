# Qwestz - Interactieve Quiz Applicatie

## 📋 Projectbeschrijving

Qwestz is een moderne quiz applicatie waarin gebruikers kunnen kiezen uit verschillende thema's (Computer, Sport, Boeken, Films, Muziek, Geschiedenis) en moeilijkheidsgraden (Easy, Medium, Hard). De applicatie houdt een geschiedenis bij van alle gemaakte quizzen en ondersteunt zowel light als dark mode.

## 📊 Hoofdfunctionaliteiten

- **Thema selectie**: 6 verschillende quiz categorieën
- **Moeilijkheidsgraad**: 3 niveaus per thema
- **Quiz geschiedenis**: Overzicht van alle gemaakte quizzen met filter functionaliteit
- **Dark/Light mode**: Gebruikersvoorkeur wordt opgeslagen
- **Responsive design**: Werkt op desktop en mobiele apparaten
- **Single-page application**: Smooth navigatie zonder pagina herladingen

## 🌐 Gebruikte API's

**Open Trivia Database API**: https://opentdb.com/api.php
- Hoofdeindpunt voor quiz vragen
- Parameters: amount, category, difficulty, type
- Gratis API zonder authenticatie vereist
- Documentatie: https://opentdb.com/api_config.php

## 🚀 Installatiehandleiding

### Vereisten

- Node.js (versie 14 of hoger)
- NPM of Yarn package manager

### Installatie Stappen

1. **Clone de repository**
```bash
git clone [jouw-repository-url]
cd qwestz
```

2. **Installeer dependencies**
```bash
npm install
```

3. **Start de development server**
```bash
npm run dev
```

4. **Open in browser**
    - Navigeer naar http://localhost:5173
    - De applicatie is nu beschikbaar

### Build voor productie

```bash
npm run build
npm run preview
```

## 🛠️ Technische Implementatie

### DOM Manipulatie

**Elementen selecteren:**
- `document.getElementById()` - Lijn 25, 143, 198 (main.js)
- `document.querySelectorAll()` - Lijn 156, 201, 294 (main.js)

**Elementen manipuleren:**
- `innerHTML` - Lijn 33, 89, 149, 215 (main.js)
- `classList.add/remove/toggle` - Lijn 15, 18, 32 (main.js)

**Events koppelen:**
- `addEventListener()` - Lijn 20, 143, 298, 316 (main.js)

### Modern JavaScript

- **Constanten**: `const` gebruikt throughout - Lijn 8, 13, 67, 188 (main.js)
- **Template literals**: `` `${}` `` syntax - Lijn 34-50, 90-97, 216-234 (main.js)
- **Array iteratie**:
    - `forEach()` - Lijn 156, 201, 298 (main.js)
    - `map()` - Lijn 244, 271 (main.js)
- **Arrow functions**: `() => {}` - Lijn 20, 143, 159, 202 (main.js)
- **Ternary operator**: `condition ? value1 : value2` - Lijn 131, 161 (main.js)
- **Callback functions**: Event listeners - Lijn 143, 159, 298 (main.js)
- **Promises**: `fetch().then()` - Lijn 104-115 (main.js)
- **Async & Await**: `async/await` - Lijn 83, 104 (main.js)

### Observer API

**IntersectionObserver**: Scroll animations voor cards
- Implementatie: Lijn [voeg toe na implementatie] (main.js)
- Functionaliteit: Fade-in effect wanneer elementen in beeld komen

### Data & API

**Fetch**: API calls naar Open Trivia Database
- Implementatie: Lijn 104 (main.js)
- Error handling: Lijn 116-118 (main.js)

**JSON manipulatie**:
- `res.json()` - Lijn 105 (main.js)
- `JSON.parse()` - Lijn 188, 237 (main.js)
- `JSON.stringify()` - Lijn 193 (main.js)

### Opslag & Validatie

**LocalStorage**:
- Theme opslag: Lijn 21, 25 (main.js)
- Quiz geschiedenis: Lijn 188, 193 (main.js)
- Gebruikersvoorkeuren: Lijn 310, 314 (main.js)

**Formulier validatie**:
- Theme/difficulty check: Lijn 85-87 (main.js)
- Input validatie: Lijn 260-267 (main.js)

### Styling & Layout

**Flexbox Layout**:
- Main layout: Lijn 7-15 (style.css)
- Card layout: Lijn 88-96 (style.css)

**CSS Transitions**: Lijn 6, 27, 65 (style.css)  
**Responsive Design**: Lijn 92, 200-210 (style.css)  
**Dark Mode**: Lijn 14-17, 29-32 (style.css)

### Tooling & Structuur

**Vite Setup**: index.html met ES6 modules  
**Router Implementatie**: router.js - Hash-based routing  
**Folderstructuur**:
```
/
├── index.html
├── src/
│   ├── main.js
│   ├── router.js
│   ├── style.css
│   └── img/
└── package.json
```

## 📱 Screenshots


## 🔧 Gebruikte Bronnen

### APIs
- Open Trivia Database: https://opentdb.com/

### Code Referenties
- HTML Entity Decoding functie: ChatGPT gegenereerd (Lijn 281-285, main.js)
- CSS Animatie voor difficulty section: AI-Bot assistentie (Lijn 126-135, style.css)

### Libraries & Tools
- Vite: Build tool en development server
- Vanilla JavaScript: Geen externe frameworks gebruikt



