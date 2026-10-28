// Página Áreas: recorrido de un intercambio y conceptos por área.
(function () {
  'use strict';
  const D = window.AREAS;
  const $ = (s) => document.getElementById(s);

  /* ---------- recorrido ---------- */
  let dir = 'out';
  let step = 0;
  const who = (s) =>
    s.quien === 'mkt' ? 'MKT' : dir === 'out' ? 'OGX' : 'ICX';

  function paintJourney() {
    $('journey').innerHTML = D.recorrido
      .map(
        (s, i) => `
        <li>
          <button class="stop stop--${s.quien === 'mkt' ? 'mkt' : 'x'}${i === step ? ' on' : ''}" type="button" data-i="${i}" aria-pressed="${i === step}">
            <b>${s.sigla}</b>
            <span>${s.en}</span>
            <i>${who(s)}</i>
          </button>
        </li>`,
      )
      .join('');
    const s = D.recorrido[step];
    $('journeyPanel').innerHTML = `
      <div>
        <p class="kicker">Etapa ${step + 1} de ${D.recorrido.length} · la impulsa ${who(s)}</p>
        <h3>${s.sigla} · ${s.en}</h3>
        <p>${s.texto}</p>
      </div>
      <div class="journey__ex"><b>Ejemplo ${dir === 'out' ? 'outgoing' : 'incoming'}</b>${dir === 'out' ? s.out : s.in}</div>`;
  }
  $('journey').addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (!b) return;
    step = +b.dataset.i;
    paintJourney();
  });
  document.querySelector('.switch').addEventListener('click', (e) => {
    const b = e.target.closest('[data-dir]');
    if (!b) return;
    dir = b.dataset.dir;
    document
      .querySelectorAll('.switch [data-dir]')
      .forEach((x) => x.setAttribute('aria-checked', x === b));
    paintJourney();
  });
  paintJourney();

  /* ---------- conceptos por área ---------- */
  const tabs = $('areaTabs');
  tabs.innerHTML = D.areas
    .map(
      (a) =>
        `<button class="area-tab" type="button" role="tab" data-id="${a.id}" aria-selected="false">${a.nombre}</button>`,
    )
    .join('');
  function showArea(id) {
    const a = D.areas.find((x) => x.id === id);
    tabs
      .querySelectorAll('.area-tab')
      .forEach((t) => t.setAttribute('aria-selected', t.dataset.id === id));
    $('areaPanel').innerHTML = `
      <div class="area-panel__head">
        <b>${a.nombre}</b>
        <div><h3>${a.largo}</h3><p>${a.resumen}</p></div>
      </div>
      <div class="concepts">
        ${a.conceptos
          .map(
            (c, i) => `
          <div class="concept${i === 0 ? ' concept--wide' : ''}">
            <h4>${c[0]}</h4>
            <p>${c[1]}</p>
          </div>`,
          )
          .join('')}
      </div>`;
  }
  tabs.addEventListener('click', (e) => {
    const t = e.target.closest('.area-tab');
    if (t) showArea(t.dataset.id);
  });
  showArea(D.areas[0].id);
})();
