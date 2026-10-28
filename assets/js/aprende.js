// Página Aprende: siglas, AIESEC Way, programas, plataformas y SalvaAcademy.
(function () {
  'use strict';
  const D = window.APRENDE;
  const $ = (s) => document.getElementById(s);
  const store = window.A101.store;

  /* ---------- qué significa AIESEC ---------- */
  const acr = $('acronym');
  acr.innerHTML = D.nombre.letras
    .map(
      (l, i) =>
        `<button type="button" data-i="${i}" aria-pressed="false">${l[0]}</button>`,
    )
    .join('');
  // marca la primera letra de la palabra principal (la última)
  const underline = (t) =>
    t.replace(/(\S)(\S*)$/, (m, a, b) => `<u>${a}</u>${b}`);
  function showLetter(i) {
    acr
      .querySelectorAll('button')
      .forEach((b, j) => b.setAttribute('aria-pressed', j === i));
    const full = D.nombre.letras
      .map(
        (l, j) =>
          `<span class="${j === i ? 'on' : ''}"><b>${underline(l[1])}</b><small>${l[2]}</small></span>`,
      )
      .join('');
    $('acronymOut').innerHTML = full;
  }
  acr.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (b) showLetter(+b.dataset.i);
  });
  showLetter(0);
  $('acronymNota').textContent = D.nombre.nota;
  const facts = (list) =>
    list.map((f) => `<div><b>${f[0]}</b><span>${f[1]}</span></div>`).join('');
  document.querySelectorAll('[data-fact]').forEach((el) => {
    const f = D.nombre.datos[+el.dataset.fact];
    el.innerHTML = `<b>${f[0]}</b><span>${f[1]}</span>`;
  });
  $('historia').textContent = D.nombre.historia;
  $('vision').textContent = D.nombre.vision;
  $('visionEs').textContent = D.nombre.visionEs;

  /* ---------- AIESEC Way ---------- */
  function cards(id, list, kicker) {
    const el = $(id);
    el.innerHTML = list
      .map(
        (v, i) => `
        <button class="card card--action value" type="button" data-i="${i}">
          <span class="value__n">${String(i + 1).padStart(2, '0')}</span>
          <h3>${v.en}</h3>
          <p>${v.es}</p>
          <span class="more">Ver ejemplo</span>
        </button>`,
      )
      .join('');
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-i]');
      if (!b) return;
      const v = list[+b.dataset.i];
      window.Modal.open({
        kicker,
        title: v.en,
        sub: v.es,
        body: v.texto,
        example: v.ejemplo,
      });
    });
  }
  cards('valores', D.valores, 'Valor de AIESEC');
  cards('rasgos', D.rasgos, 'Rasgo de liderazgo');

  /* ---------- programas ---------- */
  let dir = 'in';
  const grid = $('programas-grid');
  function paintProgramas() {
    grid.innerHTML = D.programas
      .map(
        (p, i) => `
        <button class="card card--action program" type="button" data-i="${i}">
          <span class="program__code">${dir === 'in' ? 'i' : 'o'}${p.corto}</span>
          <h3>${p.nombre}</h3>
          <p>${dir === 'in' ? p.in : p.out}</p>
          <span class="program__meta">${p.duracion} · ${dir === 'in' ? 'ICX' : 'OGX'}</span>
          <span class="more">Ver ejemplo</span>
        </button>`,
      )
      .join('');
  }
  document.querySelector('.switch').addEventListener('click', (e) => {
    const b = e.target.closest('[data-dir]');
    if (!b) return;
    dir = b.dataset.dir;
    document
      .querySelectorAll('.switch [data-dir]')
      .forEach((x) => x.setAttribute('aria-checked', x === b));
    paintProgramas();
  });
  grid.addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (!b) return;
    const p = D.programas[+b.dataset.i];
    const code = (dir === 'in' ? 'i' : 'o') + p.corto;
    window.Modal.open({
      kicker: `${dir === 'in' ? 'Incoming' : 'Outgoing'} · lo trabaja ${dir === 'in' ? 'ICX' : 'OGX'}`,
      title: code,
      sub: `${p.nombre} · ${p.duracion}`,
      body: [p.que, dir === 'in' ? p.in : p.out],
      example: dir === 'in' ? p.ejIn : p.ejOut,
    });
  });
  paintProgramas();

  /* ---------- plataformas ---------- */
  const pg = $('plataformas-grid');
  pg.innerHTML = D.plataformas
    .map(
      (p, i) => `
      <button class="card card--action platform${i === 1 ? ' platform--dark' : ''}" type="button" data-i="${i}">
        <p class="kicker">${p.para}</p>
        <h3>${p.nombre}</h3>
        <p>${p.texto}</p>
        <span class="more">Ver ejemplo</span>
      </button>`,
    )
    .join('');
  pg.addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (!b) return;
    const p = D.plataformas[+b.dataset.i];
    window.Modal.open({
      kicker: p.para,
      title: p.nombre,
      body: p.texto,
      example: p.ejemplo,
    });
  });

  /* ---------- SalvaAcademy ---------- */
  const SA = D.salvaAcademy;
  $('saTexto').textContent = SA.texto;
  $('saFacts').innerHTML = facts(SA.datos);
  $('saDetalle').innerHTML = SA.detalle.map((d) => `<li>${d}</li>`).join('');
  let notas = store.get(
    'notas',
    SA.areas.map(() => 7),
  );
  $('calcRows').innerHTML = SA.areas
    .map(
      (a, i) => `
      <div class="calc__row">
        <label for="sa${i}">${a}</label>
        <input type="range" id="sa${i}" min="0" max="10" step="1" value="${notas[i]}" data-i="${i}" />
        <output for="sa${i}">${notas[i]}/10</output>
      </div>`,
    )
    .join('');
  function paintCalc() {
    const total = SA.areas.length * 10;
    const pct = Math.round((notas.reduce((a, b) => a + b, 0) / total) * 100);
    const pass = pct >= 60;
    const faltan = Math.ceil(0.6 * total - notas.reduce((a, b) => a + b, 0));
    const out = $('calcOut');
    out.className = 'calc__out ' + (pass ? 'pass' : 'fail');
    out.innerHTML = `<span>Tu nota</span><b>${pct}%</b><span>${
      pass ? 'Te certificas' : `Te faltan ${faltan} respuestas`
    }</span>`;
  }
  $('calcRows').addEventListener('input', (e) => {
    const i = +e.target.dataset.i;
    notas[i] = +e.target.value;
    e.target.nextElementSibling.textContent = notas[i] + '/10';
    store.set('notas', notas);
    paintCalc();
  });
  paintCalc();
})();
