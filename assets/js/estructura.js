// Página Estructura: niveles, organigramas, cómo funciona un comité y mapa.
(function () {
  'use strict';
  const D = window.ESTRUCTURA;
  const $ = (s) => document.getElementById(s);
  const open = (o) => window.Modal.open(o);

  /* ---------- de lo global a lo local ---------- */
  $('levels').innerHTML = D.global
    .map(
      (l, i) => `
      <button class="level level--${i}" type="button" data-i="${i}">
        <span class="level__tag">${l.nivel}</span>
        <b>${l.corto}</b>
        <span class="level__name">${l.nombre}</span>
        <span class="more">Ver más</span>
      </button>`,
    )
    .join('<span class="level__arrow" aria-hidden="true"></span>');
  $('levels').addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (!b) return;
    const l = D.global[+b.dataset.i];
    open({
      kicker: `Nivel ${l.nivel.toLowerCase()}`,
      title: l.corto,
      sub: l.nombre,
      body: l.texto,
      example: l.ejemplo,
    });
  });

  /* ---------- organigrama nacional ---------- */
  const N = D.nacional;
  $('mcNota').textContent = N.nota;
  $('mcPeople').innerHTML = N.mc
    .map(
      (p) => `
      <div class="mc-person${p[1] === 'MCP' ? ' mc-person--lead' : ''}">
        <span class="mc-person__role">${p[1]}</span>
        <b>${p[0]}</b>
        <span class="mc-person__areas">${p[2].map((a) => `<i>${a}</i>`).join('')}</span>
      </div>`,
    )
    .join('');
  $('mcLcs').innerHTML = N.comites
    .map((c) => `<div class="mc-lc"><span>Comité local</span><b>${c}</b></div>`)
    .join('');

  /* ---------- organigrama local ---------- */
  const L = D.local;
  $('orgLcp').innerHTML =
    `<span>EB</span><b>LCP</b><small>${L.lcp.nombre}</small>`;
  $('orgLcp').addEventListener('click', () =>
    open({
      kicker: 'Presidencia del comité',
      title: 'LCP',
      sub: L.lcp.nombre,
      body: L.lcp.texto,
      example: L.lcp.ejemplo,
    }),
  );
  const niveles = Object.keys(L.niveles);
  $('orgCols').innerHTML = L.areas
    .map(
      (a, ai) => `
      <div class="org__col">
        ${niveles
          .map(
            (n, ni) => `
          <button class="org__node org__node--${ni}" type="button" data-a="${ai}" data-n="${n}">
            ${ni === 0 ? `<span>EB</span><b>${a.nombre}</b><small>${n}</small>` : `<small>${n}</small>`}
          </button>`,
          )
          .join('')}
        ${
          a.sub
            ? `<div class="org__subs">${a.sub
                .map(
                  (s, si) =>
                    `<button class="org__sub" type="button" data-a="${ai}" data-s="${si}">${s.nombre}</button>`,
                )
                .join('')}</div>`
            : ''
        }
      </div>`,
    )
    .join('');
  $('orgCols').addEventListener('click', (e) => {
    const b = e.target.closest('[data-a]');
    if (!b) return;
    const a = L.areas[+b.dataset.a];
    if (b.dataset.s) {
      const s = a.sub[+b.dataset.s];
      open({
        kicker: `Dentro de ${a.nombre}`,
        title: s.nombre,
        sub: s.largo,
        body: s.texto,
        example: s.ejemplo,
      });
      return;
    }
    const n = b.dataset.n;
    open({
      kicker: `${a.nombre} · ${a.largo}`,
      title: n === 'LCVP' ? `LCVP ${a.nombre}` : n,
      sub: n === 'LCVP' ? 'Local Committee Vice President' : `en ${a.nombre}`,
      body: [
        L.niveles[n],
        `En ${a.nombre} el trabajo gira en torno a ${a.foco}.`,
      ],
      example: a.ejemplo,
    });
  });

  /* ---------- cómo funciona un comité ---------- */
  const C = D.comite;
  $('types').innerHTML = C.tipos
    .map((t) => `<div class="type"><h3>${t.titulo}</h3><p>${t.texto}</p></div>`)
    .join('');
  $('path').innerHTML = C.camino
    .map((c) => `<li><b>${c[0]}</b><span>${c[1]}</span></li>`)
    .join('');
  $('comiteEjemplo').textContent = C.ejemplo;

  /* ---------- mapa ---------- */
  const M = window.MAPA_SV;
  const P = ([lon, lat]) => [
    (lon - M.minLon) * M.escala,
    (M.maxLat - lat) * M.escala,
  ];
  const pins = D.mapa
    .map((u, i) => {
      const [x, y] = P(u.coord);
      const tx = u.lado === 'izq' ? x - 16 : x + 16;
      const anchor = u.lado === 'izq' ? 'end' : 'start';
      return `
      <g class="pin" data-i="${i}" tabindex="0" role="button" aria-label="${u.nombre}, ${u.lugar}">
        <circle class="pin__halo" cx="${x}" cy="${y}" r="20"></circle>
        <circle class="pin__dot" cx="${x}" cy="${y}" r="9"></circle>
        <text x="${tx}" y="${y + 6}" text-anchor="${anchor}">${u.nombre}</text>
      </g>`;
    })
    .join('');
  $('mapSvg').innerHTML = `
    <svg viewBox="0 0 ${M.ancho} ${M.alto}" role="img" aria-label="Mapa de El Salvador con las universidades de AIESEC en ESEN">
      <path class="map__land" d="${M.contorno}"></path>
      <text class="map__sea" x="${M.ancho * 0.42}" y="${M.alto - 18}">Océano Pacífico</text>
      ${pins}
    </svg>`;
  function showPin(i) {
    const u = D.mapa[i];
    $('mapSvg')
      .querySelectorAll('.pin')
      .forEach((p) => p.classList.toggle('on', +p.dataset.i === i));
    $('mapPanel').innerHTML = `
      <p class="kicker">${u.lugar}</p>
      <h3>${u.nombre}</h3>
      <p class="map__long">${u.largo}</p>
      <span class="map__status">${u.estado}</span>
      <p>${u.texto}</p>`;
  }
  const svg = $('mapSvg');
  svg.addEventListener('click', (e) => {
    const g = e.target.closest('.pin');
    if (g) showPin(+g.dataset.i);
  });
  svg.addEventListener('keydown', (e) => {
    const g = e.target.closest('.pin');
    if (g && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      showPin(+g.dataset.i);
    }
  });
  showPin(0);
})();
