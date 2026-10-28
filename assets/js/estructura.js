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
  const E = window.EQUIPO;
  // [nombre, etiqueta visible, nivel]
  const etiqueta = (p) => p[3] || (p[2] ? `${p[1]} · ${p[2]}` : p[1]);
  const people = (id, n) =>
    (E.areas[id] || [])
      .filter((p) => p[1] === n)
      .map((p) => [p[0], etiqueta(p), p[1]]);
  const total = 1 + Object.values(E.areas).reduce((t, a) => t + a.length, 0);
  $('orgTotal').innerHTML =
    `<b>${total}</b> miembros en la membresía ${E.ciclo} · ${L.areas.length} áreas`;
  $('orgLcp').innerHTML =
    `<span>EB · LCP</span><b>${E.lcp}</b><small>${L.lcp.nombre}</small>`;
  $('orgLcp').addEventListener('click', () =>
    open({
      kicker: 'Presidencia del comité',
      title: 'LCP',
      sub: L.lcp.nombre,
      body: L.lcp.texto,
      example: L.lcp.ejemplo,
      people: [[E.lcp, 'LCP']],
      peopleTitle: 'Quién',
      bento: true,
    }),
  );
  const niveles = Object.keys(L.niveles);
  $('orgCols').innerHTML = L.areas
    .map((a, ai) => {
      const team = E.areas[a.id] || [];
      const vp = team.find((p) => p[1] === 'LCVP');
      return `
      <div class="org__col">
        <p class="org__count">${team.length} personas</p>
        ${niveles
          .map((n, ni) => {
            const c = team.filter((p) => p[1] === n).length;
            return `
          <button class="org__node org__node--${ni}" type="button" data-a="${ai}" data-n="${n}">
            ${
              ni === 0
                ? `<span>EB · LCVP</span><b>${a.nombre}</b><small>${vp ? vp[0] : 'Por definir'}</small>`
                : `<small>${n}</small><em>${c}</em>`
            }
          </button>`;
          })
          .join('')}
      </div>`;
    })
    .join('');
  $('orgCols').addEventListener('click', (e) => {
    const b = e.target.closest('[data-a]');
    if (!b) return;
    const a = L.areas[+b.dataset.a];
    const n = b.dataset.n;
    const team = E.areas[a.id] || [];
    open({
      kicker: `${a.nombre} · ${a.largo}`,
      title: n === 'LCVP' ? `LCVP ${a.nombre}` : n,
      sub: n === 'LCVP' ? 'Local Committee Vice President' : `en ${a.nombre}`,
      body: [
        L.niveles[n],
        `En ${a.nombre} el trabajo gira en torno a ${a.foco}.`,
      ],
      example: a.ejemplo,
      people:
        n === 'LCVP'
          ? team.map((p) => [p[0], etiqueta(p), p[1]])
          : people(a.id, n),
      peopleTitle: n === 'LCVP' ? `Equipo de ${a.nombre}` : 'Quiénes',
      bento: true,
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
  const sede = D.mapa.find((u) => u.tipo === 'sede');
  const [sx, sy] = P(sede.coord);
  // líneas punteadas desde la sede hacia cada expansión
  const lines = D.mapa
    .filter((u) => u.tipo !== 'sede')
    .map((u, i) => {
      const [x, y] = P(u.coord);
      const mx = (sx + x) / 2;
      const my = Math.min(sy, y) - Math.abs(x - sx) * 0.18 - 14;
      const d = `M${sx},${sy} Q${mx},${my} ${x},${y}`;
      return `
        <mask id="m${i}"><path class="draw" d="${d}" pathLength="1" style="animation-delay:${0.25 + i * 0.12}s"></path></mask>
        <path class="map__link" d="${d}" mask="url(#m${i})"></path>`;
    })
    .join('');
  // pin tipo gota: la punta queda en la coordenada
  const drop = (x, y) =>
    `M${x},${y} C${x - 3},${y - 10} ${x - 13},${y - 16} ${x - 13},${y - 28} A13,13 0 1 1 ${x + 13},${y - 28} C${x + 13},${y - 16} ${x + 3},${y - 10} ${x},${y} Z`;
  const pins = D.mapa
    .map((u, i) => {
      const [x, y] = P(u.coord);
      const tx = u.lado === 'izq' ? x - 20 : x + 20;
      const anchor = u.lado === 'izq' ? 'end' : 'start';
      return `
      <g class="pin pin--${u.tipo}" data-i="${i}" tabindex="0" role="button" aria-label="${u.nombre}, ${u.lugar}" style="animation-delay:${i * 0.1}s">
        ${u.meta ? `<circle class="pin__goal" cx="${x}" cy="${y - 28}" r="26"></circle>` : ''}
        <path class="pin__body" d="${drop(x, y)}"></path>
        <circle class="pin__eye" cx="${x}" cy="${y - 28}" r="5"></circle>
        <text x="${tx}" y="${y - 22}" text-anchor="${anchor}">${u.nombre}</text>
      </g>`;
    })
    .join('');
  $('mapSvg').innerHTML = `
    <svg viewBox="-20 -40 ${M.ancho + 40} ${M.alto + 60}" role="img" aria-label="Mapa de El Salvador con las universidades de AIESEC en ESEN">
      <defs>
        <pattern id="hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" class="map__hatch"></line>
        </pattern>
        ${lines.match(/<mask[\s\S]*?<\/mask>/g).join('')}
      </defs>
      <text class="map__country" x="10" y="40">Guatemala</text>
      <text class="map__country" x="${M.ancho * 0.66}" y="40">Honduras</text>
      <text class="map__sea" x="${M.ancho * 0.36}" y="${M.alto + 10}">Océano Pacífico</text>
      <path class="map__land" d="${M.contorno}"></path>
      <path class="map__land map__land--hatch" d="${M.contorno}"></path>
      ${M.departamentos.map((d) => `<path class="map__dep" d="${d[1]}"><title>${d[0]}</title></path>`).join('')}
      ${lines.replace(/<mask[\s\S]*?<\/mask>/g, '')}
      ${pins}
    </svg>`;
  function showPin(i) {
    const u = D.mapa[i];
    $('mapSvg')
      .querySelectorAll('.pin')
      .forEach((p) => p.classList.toggle('on', +p.dataset.i === i));
    const panel = $('mapPanel');
    panel.className = `map__panel map__panel--${u.tipo}`;
    panel.innerHTML = `
      <p class="kicker">${u.lugar}</p>
      <h3>${u.nombre}</h3>
      <p class="map__long">${u.largo}</p>
      <span class="map__status">${u.estado}</span>
      <p>${u.texto}</p>
      <p class="map__motto">Turning rocks into gold</p>`;
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
