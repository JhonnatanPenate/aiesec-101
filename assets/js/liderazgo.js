// Página Liderazgo: camino de roles, elecciones y conferencias.
(function () {
  'use strict';
  const D = window.LIDERAZGO;
  const $ = (s) => document.getElementById(s);

  /* ---------- camino de liderazgo ---------- */
  $('ladder').innerHTML = D.camino
    .map(
      (r, i) => `
      <li>
        <button class="rung rung--${i}" type="button" data-i="${i}" style="--step:${i}">
          <span class="rung__n">${i + 1}</span>
          <b>${r.corto}</b>
          <span class="rung__name">${r.rol}</span>
          <span class="more">Ver más</span>
        </button>
      </li>`,
    )
    .join('');
  $('ladder').addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (!b) return;
    const r = D.camino[+b.dataset.i];
    window.Modal.open({
      kicker: `Paso ${+b.dataset.i + 1} del camino`,
      title: r.corto,
      sub: r.rol,
      body: [r.texto, `Desarrollas: ${r.desarrollas}`],
      example: r.ejemplo,
    });
  });
  $('sidePath').innerHTML = `<b>${D.lateral.rol}</b><p>${D.lateral.texto}</p>`;

  /* ---------- elección ---------- */
  const E = D.eleccion;
  $('elIntro').textContent = E.intro;
  $('elNav').innerHTML = E.pasos
    .map(
      (p, i) =>
        `<li><button type="button" data-i="${i}"><i>${i + 1}</i>${p[0]}</button></li>`,
    )
    .join('');
  function showStep(i) {
    $('elNav')
      .querySelectorAll('button')
      .forEach((b, j) =>
        j === i
          ? b.setAttribute('aria-current', 'step')
          : b.removeAttribute('aria-current'),
      );
    const p = E.pasos[i];
    $('elPanel').innerHTML = `
      <small>Paso ${i + 1} de ${E.pasos.length}</small>
      <h3>${p[0]}</h3>
      <p>${p[1]}</p>
      <div class="tip"><b>Consejo</b>${p[2]}</div>
      <div class="steps__ctrl">
        ${i > 0 ? `<button class="btn btn--ghost" type="button" data-go="-1">Anterior</button>` : ''}
        ${i < E.pasos.length - 1 ? `<button class="btn" type="button" data-go="1">Siguiente</button>` : ''}
      </div>`;
    $('elPanel').dataset.i = i;
  }
  $('elNav').addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (b) showStep(+b.dataset.i);
  });
  $('elPanel').addEventListener('click', (e) => {
    const b = e.target.closest('[data-go]');
    if (b) showStep(+$('elPanel').dataset.i + +b.dataset.go);
  });
  showStep(0);

  /* ---------- conferencias y OC ---------- */
  const C = D.conferencias;
  $('confIntro').textContent = C.intro;
  $('confDatos').innerHTML = C.datos
    .map((d) => `<div><b>${d[0]}</b><span>${d[1]}</span></div>`)
    .join('');
  $('ocTexto').textContent = C.ocTexto;
  $('ocAplicar').innerHTML = C.aplicar
    .map((a) => `<li><b>${a[0]}</b><span>${a[1]}</span></li>`)
    .join('');
  $('ocRoles').innerHTML = C.roles
    .map(
      (r, i) => `
      <button class="oc-role${i === 0 ? ' oc-role--lead' : ''}" type="button" data-i="${i}">
        <b>${r[0]}</b><span>${r[1]}</span>
      </button>`,
    )
    .join('');
  $('ocRoles').addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (!b) return;
    const r = C.roles[+b.dataset.i];
    window.Modal.open({
      kicker: 'Rol dentro del OC',
      title: r[0],
      body: [r[1], C.ocTexto],
    });
  });
})();
