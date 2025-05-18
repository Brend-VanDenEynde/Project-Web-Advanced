(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();class h{constructor(e){this.routes=e,this.rootElement=document.getElementById("app"),window.addEventListener("hashchange",()=>this.handleRouteChange()),this.handleRouteChange()}handleRouteChange(){const e=window.location.hash.slice(1)||"/",n=this.routes[e]||this.routes["/404"];this.rootElement.innerHTML="",n(this.rootElement),console.log("Path:",e),console.log("Route bestaat?",!!this.routes[e])}}const m={"/":f,"/quiz":b,"/history":v,"/404":y},g=new h(m);function d(){const t=document.getElementById("dark-mode-toggle");localStorage.getItem("theme")==="dark"&&(document.body.classList.add("dark"),t.classList.add("dark-active")),t==null||t.addEventListener("click",()=>{document.body.classList.toggle("dark"),t.classList.toggle("dark-active"),document.body.classList.contains("dark")?localStorage.setItem("theme","dark"):localStorage.setItem("theme","light")})}function f(t){document.body.classList.remove("quiz"),t.innerHTML=`
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
  `,L(),d(),document.getElementById("history-btn").addEventListener("click",()=>{window.location.hash="#/history"})}async function b(t){document.body.classList.add("quiz");const e=localStorage.getItem("selectedTheme"),n=localStorage.getItem("selectedDifficulty");let s=null;if(e==="computer"?s=18:e=="sport"&&(s=21),s==null||n==null)t.innerHTML=`
      <div class="card">
        <h1>Geen thema of moeilijkheidsgraad gekozen</h1>
        <a href="#/">Terug naar home</a>
      </div>
      <button id="dark-mode-toggle" class="dark-mode-btn">🌗</button>
    `,d();else{const o=`https://opentdb.com/api.php?amount=10&category=${s}&difficulty=${n}&type=multiple`;t.innerHTML=`
      <div id="quiz" class="card">
        <h2>Quiz wordt geladen...</h2>
      </div>
      <button id="dark-mode-toggle" class="dark-mode-btn">🌗</button>
    `,d();try{const r=await(await fetch(o)).json();if(r.results.length==0){t.innerHTML='<div class="card"><p>Geen vragen gevonden.</p></div>';return}p(t,r.results)}catch{t.innerHTML='<div class="card"><p>Fout bij laden van quizvragen.</p></div>'}}}function p(t,e){let n=0,s=0;function o(){const r=e[n],c=[...r.incorrect_answers],u=r.correct_answer;c.splice(Math.floor(Math.random()*(c.length+1)),0,u),t.innerHTML=`
      <div class="card">
        <h2>Vraag ${n+1} van ${e.length}</h2>
        <p>${l(r.question)}</p>
        <div class="answers">
          ${c.map(i=>`<button class="app-btn answer">${l(i)}</button>`).join("")}
        </div>
      </div>
      <button id="dark-mode-toggle" class="dark-mode-btn">🌗</button>
    `,d(),document.querySelectorAll(".answer").forEach(i=>{i.addEventListener("click",()=>{i.textContent==l(u)&&s++,n++,n<e.length?o():a()})})}function a(){const r=JSON.parse(localStorage.getItem("quizHistory"))||[];r.push({theme:localStorage.getItem("selectedTheme"),difficulty:localStorage.getItem("selectedDifficulty"),score:s,total:e.length,date:new Date().toLocaleString()}),localStorage.setItem("quizHistory",JSON.stringify(r)),t.innerHTML=`
      <div class="card">
        <h2>Quiz voltooid!</h2>
        <p>Je score: ${s} / ${e.length}</p>
        <button class="app-btn" onclick="window.location.hash = '#'">Terug naar start</button>
      </div>
      <button id="dark-mode-toggle" class="dark-mode-btn">🌗</button>
    `,d()}o()}function y(t){t.innerHTML=`
    <div class="card">
      <h1>404 - Pagina niet gevonden</h1>
      <a href="#/">Terug naar home</a>
    </div>
    <button id="dark-mode-toggle" class="dark-mode-btn">🌗</button>
  `,d()}function v(t){document.body.classList.remove("quiz");const e=JSON.parse(localStorage.getItem("quizHistory"))||[];e.length===0?t.innerHTML=`
      <div class="card">
        <h2>Geen eerdere quizzen gevonden.</h2>
        <a href="#/">Terug naar home</a>
      </div>
      <button id="dark-mode-toggle" class="dark-mode-btn">🌗</button>
    `:t.innerHTML=`
      <div class="card">
        <h2>Vorige quizresultaten</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="text-align: left; border-bottom: 2px solid #ccc;">
              <th>Datum</th>
              <th>Thema</th>
              <th>Moeilijkheid</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            ${e.map(n=>`
              <tr style="border-bottom: 1px solid #ddd;">
                <td>${n.date}</td>
                <td>${n.theme}</td>
                <td>${n.difficulty}</td>
                <td>${n.score} / ${n.total}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
        <button class="app-btn" onclick="window.location.hash = '#/'">Terug naar home</button>
      </div>
      <button id="dark-mode-toggle" class="dark-mode-btn">🌗</button>
    `,d()}function l(t){const e=document.createElement("textarea");return e.innerHTML=t,e.value}function L(){const t=document.querySelectorAll(".theme-btn"),e=document.getElementById("difficulty-section");t.forEach(n=>{n.addEventListener("click",()=>{const s=n.dataset.theme;t.forEach(o=>o.classList.remove("selected")),n.classList.add("selected"),e.dataset.theme=s,e.classList.add("visible")})}),document.querySelectorAll(".diff-btn").forEach(n=>{n.addEventListener("click",()=>{const s=n.textContent.toLowerCase(),o=document.getElementById("difficulty-section").dataset.theme;localStorage.setItem("selectedTheme",o),localStorage.setItem("selectedDifficulty",s),console.log(`Thema: ${o}, Moeilijkheidsgraad: ${s}`),window.location.hash="#/quiz"})})}window.addEventListener("popstate",()=>g.resolve());document.getElementById("year").textContent=new Date().getFullYear();
