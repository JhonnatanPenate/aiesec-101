// Página Diccionario: cards que se voltean, filtros, buscador y quiz.
(function () {
  'use strict';
  const $ = (s) => document.getElementById(s);
  const all = window.DICCIONARIO.flatMap((c) =>
    c.terminos.map((t) => ({
      sigla: t[0],
      en: t[1],
      texto: t[2],
      cat: c.categoria,
    })),
  );
  const cats = ['Todas', ...window.DICCIONARIO.map((c) => c.categoria)];
  let cat = 'Todas';
  let allFlipped = false;

  /* ---------- filtros ---------- */
  $('cats').innerHTML = cats
    .map(
      (c) =>
        `<button class="chip" type="button" aria-pressed="${c === cat}">${c}</button>`,
    )
    .join('');
  $('cats').addEventListener('click', (e) => {
    const b = e.target.closest('.chip');
    if (!b) return;
    cat = b.textContent;
    $('cats')
      .querySelectorAll('.chip')
      .forEach((x) => x.setAttribute('aria-pressed', x === b));
    render();
  });

  /* ---------- cards ---------- */
  const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  // las cards con mucho texto ocupan dos espacios al voltearse
  const isLong = (t) => (t.en + ' ' + t.texto).length > 95;

  function render() {
    const q = norm($('q').value.trim());
    const items = all.filter(
      (t) =>
        (cat === 'Todas' || t.cat === cat) &&
        (!q || norm(`${t.sigla} ${t.en} ${t.texto}`).includes(q)),
    );
    $('dict').innerHTML =
      items
        .map(
          (t) => `
        <button class="flip${allFlipped ? ' is-flipped' : ''}${allFlipped && isLong(t) ? ' is-wide' : ''}" type="button" aria-pressed="${allFlipped}" data-long="${isLong(t)}">
          <span class="flip__inner">
            <span class="flip__face flip__front">
              <small>${t.cat}</small>
              <b class="${t.sigla.length > 8 ? 'long' : ''}">${t.sigla}</b>
              <i>Toca para ver</i>
            </span>
            <span class="flip__face flip__back">
              <b>${t.sigla}</b>
              ${t.en ? `<em>${t.en}</em>` : ''}
              <span>${t.texto}</span>
            </span>
          </span>
        </button>`,
        )
        .join('') ||
      '<p class="dict-empty">No encontramos ese término. Si crees que falta, avísale a MXP.</p>';
    $('count').textContent = `${items.length} de ${all.length} términos`;
  }

  $('dict').addEventListener('click', (e) => {
    const b = e.target.closest('.flip');
    if (!b) return;
    const on = !b.classList.contains('is-flipped');
    b.setAttribute('aria-pressed', on);
    if (b.dataset.long !== 'true') {
      b.classList.toggle('is-flipped', on);
      return;
    }
    if (on) {
      b.classList.add('is-wide');
      requestAnimationFrame(() => b.classList.add('is-flipped'));
    } else {
      b.classList.remove('is-flipped');
      setTimeout(() => {
        if (!b.classList.contains('is-flipped')) b.classList.remove('is-wide');
      }, 380);
    }
  });
  $('q').addEventListener('input', render);
  $('flipAll').addEventListener('click', (e) => {
    allFlipped = !allFlipped;
    e.currentTarget.setAttribute('aria-pressed', allFlipped);
    e.currentTarget.textContent = allFlipped
      ? 'Ocultar todas'
      : 'Voltear todas';
    render();
  });
  render();

  /* ---------- quiz ---------- */
  const pool = all.filter(
    (t) => t.en && t.en !== t.sigla && !/coming/.test(t.en),
  );
  const ROUND = 10;
  const shuffle = (a) =>
    a
      .map((v) => [Math.random(), v])
      .sort((x, y) => x[0] - y[0])
      .map((x) => x[1]);
  let questions = [];
  let n = 0;
  let score = 0;

  function start() {
    questions = shuffle(pool).slice(0, ROUND);
    n = 0;
    score = 0;
    ask();
  }

  function progress() {
    $('qStep').textContent =
      `Pregunta ${Math.min(n + 1, ROUND)} de ${ROUND} · ${score} correctas`;
    $('qBar').style.width = (n / ROUND) * 100 + '%';
  }

  function ask() {
    progress();
    const right = questions[n];
    const wrong = shuffle(
      pool.filter((t) => t !== right && t.en !== right.en),
    ).slice(0, 3);
    const opts = shuffle([right, ...wrong]);
    $('qStage').innerHTML = `
      <p class="quiz__q">¿Qué significa <b>${right.sigla}</b>?</p>
      <div class="quiz__opts">
        ${opts.map((o) => `<button class="opt" type="button" data-ok="${o === right}">${o.en}</button>`).join('')}
      </div>
      <div class="quiz__fb" id="qFb" aria-live="polite"></div>`;
  }

  $('qStage').addEventListener('click', (e) => {
    const b = e.target.closest('.opt');
    if (b && !b.disabled) {
      const right = questions[n];
      const ok = b.dataset.ok === 'true';
      if (ok) score++;
      $('qStage')
        .querySelectorAll('.opt')
        .forEach((o) => {
          o.disabled = true;
          if (o.dataset.ok === 'true') o.classList.add('ok');
        });
      if (!ok) b.classList.add('bad');
      $('qFb').innerHTML = `
        <p><b>${ok ? 'Correcto.' : 'Casi.'}</b> ${right.sigla}: ${right.en}. ${right.texto}</p>
        <button class="btn" type="button" data-next>${n + 1 < ROUND ? 'Siguiente' : 'Ver resultado'}</button>`;
      $('qFb').querySelector('[data-next]').focus();
      progress();
      return;
    }
    if (e.target.closest('[data-next]')) {
      n++;
      n < ROUND ? ask() : finish();
    }
    if (e.target.closest('[data-restart]')) start();
  });

  function finish() {
    $('qStep').textContent = 'Resultado';
    $('qBar').style.width = '100%';
    const msg =
      score >= 9
        ? 'Dominas el idioma AIESEC.'
        : score >= 6
          ? 'Vas muy bien. Repasa las que fallaste.'
          : 'Date una vuelta por las cards y vuelve a intentarlo.';
    $('qStage').innerHTML = `
      <div class="quiz__end">
        <b>${score}/${ROUND}</b>
        <p>${msg}</p>
        <button class="btn" type="button" data-restart>Jugar otra vez</button>
      </div>`;
  }

  start();
})();
