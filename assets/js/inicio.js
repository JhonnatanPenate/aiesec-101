// Inicio: portada del curso con módulos, progreso y botón para continuar.
(function () {
  'use strict';
  const S = window.SITE;
  const A = window.A101;
  const $ = (id) => document.getElementById(id);
  const mods = A.modulos;
  const total = mods.reduce((t, m) => t + m.minutos, 0);
  const hechos = mods.filter((m) => A.estado(m.id) === 'completado').length;
  const empezo = mods.some((m) => A.estado(m.id) !== 'pendiente');
  const next = A.siguiente();

  $('frase').textContent = S.curso.frase;
  $('intro').textContent = S.curso.intro;
  $('meta').textContent = `${mods.length} módulos · ~${total} min`;

  const cta = $('ctaMain');
  if (hechos === mods.length) {
    cta.textContent = 'Repasar el curso';
    cta.href = mods[0].href;
  } else {
    cta.textContent = empezo
      ? `Continuar: ${next.titulo}`
      : `Empezar: ${mods[0].titulo}`;
    cta.href = empezo ? next.href : mods[0].href;
  }

  // anillo de progreso
  const pct = hechos / mods.length;
  const R = 52;
  const C = 2 * Math.PI * R;
  $('ring').innerHTML = `
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="${R}" class="ring__bg"></circle>
      <circle cx="60" cy="60" r="${R}" class="ring__fg" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct)}"></circle>
    </svg>
    <div class="ring__txt"><b>${hechos}/${mods.length}</b><span>módulos completados</span></div>`;

  const label = {
    completado: 'Completado',
    'en-curso': 'En curso',
    pendiente: 'Pendiente',
  };
  $('mods').innerHTML = mods
    .map((m) => {
      const e = A.estado(m.id);
      const esNext = m.id === next.id && hechos < mods.length;
      return `
      <li>
        <a class="mod mod--${e}${esNext ? ' mod--next' : ''}" href="${m.href}">
          <span class="mod__n">${String(m.modulo).padStart(2, '0')}</span>
          <span class="mod__body">
            <b>${m.titulo}</b>
            <span>${m.resumen}</span>
          </span>
          <span class="mod__side">
            <span class="mod__state">${label[e]}</span>
            <span class="mod__min">~${m.minutos} min</span>
          </span>
        </a>
      </li>`;
    })
    .join('');

  $('reset').addEventListener('click', (e) => {
    const b = e.currentTarget;
    if (b.dataset.confirm) {
      A.reiniciar();
      location.reload();
      return;
    }
    b.dataset.confirm = '1';
    b.textContent = 'Toca otra vez para confirmar';
    setTimeout(() => {
      delete b.dataset.confirm;
      b.textContent = 'Reiniciar mi progreso';
    }, 4000);
  });
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
