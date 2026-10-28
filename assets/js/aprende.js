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
  $('mision').textContent = D.nombre.mision;

  /* ---------- AIESEC Way ---------- */
  // hexágonos: ícono + nombre; al tocar se activa y abre el detalle debajo
  const I = window.ICONOS || {};
  function hexes(id, list, kicker, centro) {
    const el = $(id);
    const det = $(id + 'Detail');
    const items = list.map(
      (v, i) => `
        <button class="hex" type="button" data-i="${i}" aria-pressed="false">
          <span class="hex__in">
            <span class="hex__icon" aria-hidden="true">${I[v.icono] || ''}</span>
            <b>${v.en}</b>
          </span>
        </button>`,
    );
    if (centro) {
      // panal: 2 arriba, 3 en medio (centro = caminante), 2 abajo
      const mid = `<span class="hex hex--center" aria-hidden="true"><span class="hex__in"><span class="hex__icon">${I.caminante}</span><b>AIESEC Way</b></span></span>`;
      el.innerHTML = `
        <div class="honey__row">${items[0]}${items[1]}</div>
        <div class="honey__row">${items[5]}${mid}${items[2]}</div>
        <div class="honey__row">${items[4]}${items[3]}</div>`;
    } else {
      el.innerHTML = `<div class="honey__row">${items.join('')}</div>`;
    }
    const pintar = (i) => {
      el.querySelectorAll('.hex[data-i]').forEach((h) =>
        h.setAttribute('aria-pressed', String(+h.dataset.i === i)),
      );
      if (i === null) {
        det.classList.remove('open');
        det.innerHTML = '';
        return;
      }
      const v = list[i];
      det.innerHTML = `
        <div class="hexdetail__icon" aria-hidden="true">${I[v.icono] || ''}</div>
        <div class="hexdetail__txt">
          <p class="kicker">${kicker}</p>
          <h4>${v.en}</h4>
          <p class="hexdetail__es">${v.es}</p>
          <p>${v.texto}</p>
          <div class="hexdetail__ex"><b>Ejemplo</b>${v.ejemplo}</div>
        </div>`;
      det.classList.add('open');
    };
    let actual = null;
    el.addEventListener('click', (e) => {
      const b = e.target.closest('.hex[data-i]');
      if (!b) return;
      const i = +b.dataset.i;
      actual = actual === i ? null : i;
      pintar(actual);
    });
  }
  hexes('valores', D.valores, 'Valor de AIESEC', true);
  hexes('rasgos', D.rasgos, 'Rasgo de liderazgo', false);

  /* ---------- Leadership Development Experience ---------- */
  const L = D.lde;
  if (L && $('lde')) {
    $('ldeIntro').textContent = L.intro;
    const journey = (j, k) => `
      <div class="lde__loop lde__loop--${k}">
        <p class="lde__t"><b>${j.titulo}</b><span>${j.es}</span></p>
        <div class="lde__steps">
          ${j.pasos
            .map(
              (p, i) =>
                `<button class="lde__step" type="button" data-k="${k}" data-i="${i}" aria-pressed="false"><b>${p[1]}</b><span>${p[0]}</span></button>`,
            )
            .join('')}
        </div>
      </div>`;
    $('lde').innerHTML = `
      ${journey(L.outer, 'outer')}
      <button class="lde__impact" type="button" data-k="impact" aria-pressed="false"><b>Impact</b><span>Impacto</span></button>
      ${journey(L.inner, 'inner')}`;
    const det = $('ldeDetail');
    let sel = null;
    $('lde').addEventListener('click', (e) => {
      const b = e.target.closest('[data-k]');
      if (!b) return;
      const key = b.dataset.k + (b.dataset.i || '');
      sel = sel === key ? null : key;
      $('lde')
        .querySelectorAll('[data-k]')
        .forEach((x) =>
          x.setAttribute(
            'aria-pressed',
            String(x.dataset.k + (x.dataset.i || '') === sel),
          ),
        );
      if (!sel) {
        det.classList.remove('open');
        det.innerHTML = '';
        return;
      }
      if (b.dataset.k === 'impact') {
        det.innerHTML = `<div class="hexdetail__txt"><p class="kicker">Donde se juntan</p><h4>Impact</h4><p>${L.impacto}</p><div class="hexdetail__ex"><b>MXP</b>${L.mxp}</div></div>`;
      } else {
        const j = b.dataset.k === 'outer' ? L.outer : L.inner;
        const p = j.pasos[+b.dataset.i];
        det.innerHTML = `<div class="hexdetail__txt"><p class="kicker">${j.titulo} · ${j.es}</p><h4>${p[1]}</h4><p class="hexdetail__es">${p[0]}</p><p>${p[2]}</p></div>`;
      }
      det.classList.add('open');
    });
  }

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

// ODS
(function () {
  'use strict';
  const O = window.APRENDE.ods;
  const $ = (s) => document.getElementById(s);
  if (!O || !$('odsGrid')) return;
  $('odsIntro').textContent = O.intro;
  $('odsFacts').innerHTML = O.datos
    .map((d) => `<div><b>${d[0]}</b><span>${d[1]}</span></div>`)
    .join('');
  $('odsGrid').innerHTML = O.lista
    .map((o) => {
      const ej = O.ejemplos.filter((x) => x[1] === o[0]).map((x) => x[0]);
      return `
      <button class="ods__tile" type="button" data-n="${o[0]}" aria-expanded="false" style="--c:${o[2]}">
        <b>${o[0]}</b>
        <span class="ods__name">${o[1]}</span>
        <span class="ods__more">
          <span>${o[3]}</span>
          ${ej.length ? `<em>En AIESEC: ${ej.join(', ')}</em>` : ''}
        </span>
      </button>`;
    })
    .join('');
  // Al tocar un ODS crece a 2x2 (3x2 si tiene mucho texto) en su lugar:
  // los vecinos que tapa se ocultan y los demás no se mueven. Tocarlo otra vez lo cierra.
  const grid = $('odsGrid');
  const tiles = [...grid.querySelectorAll('.ods__tile')];
  let abierto = null;
  const columnas = () =>
    getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean)
      .length;
  function layout() {
    const cols = columnas();
    const filas = Math.ceil(tiles.length / cols);
    let area = null;
    if (abierto !== null) {
      const t = tiles[abierto];
      const largo =
        t.querySelector('.ods__more').textContent.trim().length > 80;
      const w = cols <= 3 ? cols : largo ? 3 : 2;
      const c = abierto % cols;
      const r = Math.floor(abierto / cols);
      const c0 = Math.min(c, cols - w);
      const r0 = r + 1 >= filas ? Math.max(0, r - 1) : r;
      area = { c0, r0, w, h: 2 };
    }
    tiles.forEach((t, i) => {
      const c = i % cols;
      const r = Math.floor(i / cols);
      if (area && i === abierto) {
        t.style.gridColumn = `${area.c0 + 1} / span ${area.w}`;
        t.style.gridRow = `${area.r0 + 1} / span ${area.h}`;
        t.hidden = false;
        return;
      }
      const tapado =
        area &&
        c >= area.c0 &&
        c < area.c0 + area.w &&
        r >= area.r0 &&
        r < area.r0 + area.h;
      t.hidden = !!tapado;
      t.style.gridColumn = `${c + 1}`;
      t.style.gridRow = `${r + 1}`;
    });
  }
  grid.addEventListener('click', (e) => {
    const b = e.target.closest('[data-n]');
    if (!b) return;
    const i = tiles.indexOf(b);
    tiles.forEach((t) => {
      t.classList.remove('is-open');
      t.setAttribute('aria-expanded', 'false');
    });
    abierto = abierto === i ? null : i;
    if (abierto !== null) {
      b.classList.add('is-open');
      b.setAttribute('aria-expanded', 'true');
    }
    layout();
  });
  window.addEventListener('resize', layout);
  layout();
  $('odsEx').innerHTML = O.ejemplos
    .map(
      (x) =>
        `<span><i style="--c:${O.lista[x[1] - 1][2]}">${x[1]}</i>${x[0]}</span>`,
    )
    .join('');
})();
