// Inicio: accesos rápidos a cada sección.
(function () {
  'use strict';
  const grid = document.getElementById('accesos-grid');
  if (!grid) return;
  const visited = window.A101.visited;
  grid.innerHTML = window.SITE.paginas
    .filter((p) => p.id !== 'inicio')
    .map(
      (p) => `
      <a class="card card--action" href="${p.href}" style="text-decoration:none">
        <h3>${p.titulo}</h3>
        <p>${p.resumen}</p>
        <span class="more">${visited.has(p.id) ? 'Visitada' : 'Explorar'}</span>
      </a>`,
    )
    .join('');
})();

// Inicio: metas del comité (cada card abre un modal).
(function () {
  'use strict';
  const metas = [
    {
      titulo: 'Comité propio en la UGB',
      corto: 'Meta 2027',
      texto: [
        'Hoy los miembros de la UGB son parte de AIESEC en ESEN, porque la UGB es una expansión de nuestro comité.',
        'La meta es que en 2027 la UGB tenga su propio comité local, con su propio equipo directivo.',
      ],
      ejemplo:
        'Si estudias en la UGB y entras hoy a AIESEC, eres miembro de AIESEC en ESEN. Cuando nazca el comité de la UGB, podrás ser parte de su primer equipo.',
    },
  ];
  const grid = document.getElementById('metas-grid');
  if (!grid) return;
  grid.innerHTML = metas
    .map(
      (m, i) => `
      <button class="card card--action" type="button" data-i="${i}">
        <p class="kicker">${m.corto}</p>
        <h3>${m.titulo}</h3>
        <span class="more">Ver más</span>
      </button>`,
    )
    .join('');
  grid.addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (!b) return;
    const m = metas[+b.dataset.i];
    window.Modal.open({
      kicker: m.corto,
      title: m.titulo,
      body: m.texto,
      example: m.ejemplo,
    });
  });
})();
