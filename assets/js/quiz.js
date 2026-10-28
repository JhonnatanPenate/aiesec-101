// Mini-quiz al final de cada módulo. Al aprobar, marca el módulo como completado
// y, si corresponde, desbloquea una insignia (ver insignias.js).
(function () {
  'use strict';
  const page = document.body.dataset.page;
  const Q = window.QUIZZES;
  const preguntas = Q && Q.modulos[page];
  const A = window.A101;
  if (!preguntas || !A) return;

  const mod = A.modulos.find((m) => m.id === page);
  const shuffle = (a) =>
    a
      .map((v) => [Math.random(), v])
      .sort((x, y) => x[0] - y[0])
      .map((x) => x[1]);

  const sec = document.createElement('section');
  sec.className = 'section section--orange mq';
  sec.id = 'mini-quiz';
  sec.innerHTML = `
    <div class="wrap">
      <header class="section__head">
        <p class="kicker mq__kicker">Cierre del módulo ${mod.modulo}</p>
        <h2>Comprueba lo que aprendiste</h2>
        <p>${preguntas.length} preguntas. Con ${Q.aprobar} correctas completas el módulo. Puedes repetirlo cuando quieras.</p>
      </header>
      <div class="mq__box" id="mqBox"></div>
    </div>`;
  const band = document.querySelector('.next-band');
  const main = document.querySelector('main');
  band ? main.insertBefore(sec, band) : main.appendChild(sec);
  const box = sec.querySelector('#mqBox');

  let orden = [];
  let n = 0;
  let aciertos = 0;

  function inicio() {
    const hecho = A.completados.has(page);
    box.innerHTML = `
      <div class="mq__start">
        ${
          hecho
            ? '<p class="mq__done">Ya completaste este módulo. Puedes repasar cuando quieras.</p>'
            : ''
        }
        <button class="btn btn--dark btn--big" type="button" data-start>${hecho ? 'Repasar el quiz' : 'Empezar el quiz'}</button>
      </div>`;
  }

  function empezar() {
    orden = shuffle(preguntas);
    n = 0;
    aciertos = 0;
    pregunta();
  }

  function pregunta() {
    const p = orden[n];
    const opciones = shuffle([p.ok, ...p.no]);
    box.innerHTML = `
      <div class="mq__top">
        <span>Pregunta ${n + 1} de ${orden.length}</span>
        <span class="mq__dots">${orden
          .map(
            (_, i) =>
              `<i class="${i < n ? 'past' : i === n ? 'now' : ''}"></i>`,
          )
          .join('')}</span>
      </div>
      <p class="mq__q">${p.q}</p>
      <div class="mq__opts">
        ${opciones
          .map(
            (o) =>
              `<button class="opt" type="button" data-ok="${o === p.ok}">${o}</button>`,
          )
          .join('')}
      </div>
      <div class="mq__fb" aria-live="polite"></div>`;
  }

  function responder(b) {
    const p = orden[n];
    const ok = b.dataset.ok === 'true';
    if (ok) aciertos++;
    box.querySelectorAll('.opt').forEach((o) => {
      o.disabled = true;
      if (o.dataset.ok === 'true') o.classList.add('ok');
    });
    if (!ok) b.classList.add('bad');
    sec.classList.remove('flash-ok', 'flash-bad');
    void sec.offsetWidth;
    sec.classList.add(ok ? 'flash-ok' : 'flash-bad');
    const ultima = n + 1 === orden.length;
    box.querySelector('.mq__fb').innerHTML = `
      <p class="${ok ? 'is-ok' : 'is-bad'}"><b>${ok ? 'Correcto.' : 'Casi.'}</b> ${p.por}</p>
      <button class="btn" type="button" data-next>${ultima ? 'Ver resultado' : 'Siguiente'}</button>`;
    box.querySelector('[data-next]').focus();
  }

  function resultado() {
    const paso = aciertos >= Q.aprobar;
    const yaEstaba = A.completados.has(page);
    if (paso) A.completar(page);
    const next = A.modulos[A.modulos.indexOf(mod) + 1];
    box.innerHTML = `
      <div class="mq__end ${paso ? 'pass' : 'fail'}">
        <b>${aciertos}/${orden.length}</b>
        <p>${
          paso
            ? `¡Módulo ${mod.modulo} completado! ${next ? `Sigue con ${next.titulo}.` : ''}`
            : `Necesitas ${Q.aprobar} correctas. Repasa la página y vuelve a intentarlo.`
        }</p>
        <div class="mq__actions">
          ${
            paso && next
              ? `<a class="btn" href="${next.href}">Módulo ${next.modulo}: ${next.titulo}</a>`
              : ''
          }
          ${paso && !next ? `<a class="btn" href="index.html">Volver al inicio</a>` : ''}
          <button class="btn btn--ghost" type="button" data-start>${paso ? 'Repetir' : 'Intentar otra vez'}</button>
        </div>
      </div>`;
    const bar = document.getElementById('progressBar');
    if (bar) {
      const hechos = A.modulos.filter((m) => A.completados.has(m.id)).length;
      bar.style.width = (hechos / A.modulos.length) * 100 + '%';
    }
    if (paso && !yaEstaba && window.Insignias) window.Insignias.revisar();
  }

  box.addEventListener('click', (e) => {
    if (e.target.closest('[data-start]')) return empezar();
    const o = e.target.closest('.opt');
    if (o && !o.disabled) return responder(o);
    if (e.target.closest('[data-next]')) {
      n++;
      n < orden.length ? pregunta() : resultado();
    }
  });

  inicio();
})();
