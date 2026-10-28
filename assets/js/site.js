// Partes compartidas por todas las páginas: header, menú móvil, footer y progreso.
(function () {
  'use strict';
  const S = window.SITE;
  const page = document.body.dataset.page;

  const store = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem('a101:' + key);
        return v ? JSON.parse(v) : fallback;
      } catch (e) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem('a101:' + key, JSON.stringify(value));
      } catch (e) {
        /* sin almacenamiento disponible */
      }
    },
  };
  window.A101 = { store };

  const links = S.paginas
    .map(
      (p) =>
        `<a href="${p.href}"${p.id === page ? ' aria-current="page"' : ''}>${p.titulo}</a>`,
    )
    .join('');

  /* ---------- header ---------- */
  const header = document.querySelector('[data-site-header]');
  if (header) {
    header.outerHTML = `
      <header class="site-header">
        <div class="wrap site-header__in">
          <a class="brand" href="index.html">
            <img src="assets/img/logo.png" alt="" width="30" height="36" />
            <span><b>${S.nombre}</b><small>${S.comite}</small></span>
          </a>
          <nav class="nav" aria-label="Secciones">${links}</nav>
          <a class="btn btn--quiz" href="diccionario.html#quiz">Ponte a prueba</a>
          <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobileNav">Menú</button>
        </div>
        <div class="progress" aria-hidden="true"><span id="progressBar"></span></div>
      </header>
      <div class="mobile-nav" id="mobileNav" hidden>
        <div class="mobile-nav__top">
          <a class="brand" href="index.html">
            <img src="assets/img/logo.png" alt="" width="30" height="36" />
            <span><b>${S.nombre}</b><small>${S.comite}</small></span>
          </a>
          <button class="menu-btn" type="button" data-close>Cerrar</button>
        </div>
        <ul>${S.paginas.map((p) => `<li><a href="${p.href}"${p.id === page ? ' aria-current="page"' : ''}>${p.titulo}</a></li>`).join('')}</ul>
        <a class="btn" href="diccionario.html#quiz">Ponte a prueba</a>
      </div>`;

    const openBtn = document.querySelector('.site-header .menu-btn');
    const panel = document.getElementById('mobileNav');
    const toggle = (open) => {
      panel.hidden = !open;
      openBtn.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) panel.querySelector('[data-close]').focus();
      else openBtn.focus();
    };
    openBtn.addEventListener('click', () => toggle(true));
    panel
      .querySelector('[data-close]')
      .addEventListener('click', () => toggle(false));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !panel.hidden) toggle(false);
    });
  }

  /* ---------- footer ---------- */
  const footer = document.querySelector('[data-site-footer]');
  if (footer) {
    footer.outerHTML = `
      <footer class="site-footer">
        <div class="wrap site-footer__in">
          <span><b>${S.comite}</b> · ${S.lema}</span>
          <span>${S.creditos}</span>
        </div>
      </footer>`;
  }

  /* ---------- curso: módulos, visitas y completados ---------- */
  const modulos = S.paginas.filter((p) => p.modulo);
  const visited = new Set(store.get('visited', []));
  if (page) visited.add(page);
  store.set('visited', [...visited]);
  const completados = new Set(store.get('completados', []));
  const estado = (id) =>
    completados.has(id)
      ? 'completado'
      : visited.has(id)
        ? 'en-curso'
        : 'pendiente';
  // primer módulo sin completar, en orden; si todos están listos, el último
  const siguiente = () =>
    modulos.find((m) => !completados.has(m.id)) || modulos[modulos.length - 1];

  const bar = document.getElementById('progressBar');
  if (bar) {
    const hechos = modulos.filter((m) => completados.has(m.id)).length;
    bar.style.width = (hechos / modulos.length) * 100 + '%';
  }

  Object.assign(window.A101, {
    visited,
    completados,
    modulos,
    estado,
    siguiente,
    completar(id) {
      completados.add(id);
      store.set('completados', [...completados]);
    },
    reiniciar() {
      store.set('completados', []);
      store.set('visited', []);
    },
  });

  /* ---------- en cada módulo: banda para pasar al siguiente ---------- */
  const actual = modulos.find((m) => m.id === page);
  const main = document.querySelector('main');
  if (actual && main) {
    const next = modulos[modulos.indexOf(actual) + 1];
    main.insertAdjacentHTML(
      'beforeend',
      `<section class="next-band">
        <div class="wrap next-band__in">
          <div>
            <p class="kicker">Módulo ${actual.modulo} de ${modulos.length}</p>
            <p class="next-band__t">${
              next
                ? `Sigue con <b>${next.titulo}</b>`
                : 'Terminaste el último módulo'
            }</p>
          </div>
          <a class="btn" href="${next ? next.href : 'index.html'}">${
            next ? `Módulo ${next.modulo}: ${next.titulo}` : 'Volver al inicio'
          }</a>
        </div>
      </section>`,
    );
  }
})();
