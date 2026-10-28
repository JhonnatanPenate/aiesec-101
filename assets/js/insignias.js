// Insignias de AIESEC 101: se desbloquean al completar módulos, se celebran con
// un modal y se descargan como imagen. Todo se guarda solo en este navegador.
(function () {
  'use strict';
  const A = window.A101;
  const S = window.SITE;
  if (!A || !S) return;

  const C = {
    carbon: '#2c2c2c',
    terra: '#c3522c',
    cobre: '#d98850',
    perg: '#f6f4f0',
    oro: '#e3b84a',
  };

  const LISTA = [
    {
      id: 'conocimiento',
      titulo: 'Insignia de Conocimiento',
      requisito: ['aprende', 'diccionario', 'estructura', 'areas', 'liderazgo'],
      pista: 'Completa los módulos 1 al 5',
      arriba: 'AIESEC 101 · ALCHEMIST',
      abajo: 'TURNING ROCKS INTO GOLD',
    },
    {
      id: 'cultura',
      titulo: 'Insignia de Cultura',
      requisito: ['cultura'],
      pista: 'Completa el módulo 6: Cultura',
      arriba: 'ALCHEMIST · CULTURA',
      abajo: 'ONCE ALCHEMIST, ALWAYS ALCHEMIST!',
    },
  ];

  const ganadas = () => A.store.get('insignias', {});
  const guardar = (g) => A.store.set('insignias', g);
  const cumple = (b) => b.requisito.every((id) => A.completados.has(id));
  const esc = (t) =>
    String(t).replace(
      /[&<>"']/g,
      (c) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[c],
    );

  /* ---------- dibujos del centro de cada insignia ---------- */
  const ARBOL = `<circle cx="300" cy="300" r="204" fill="${C.cobre}"/>
           <g clip-path="url(#in)">
             <rect x="96" y="96" width="408" height="408" fill="${C.terra}"/>
             <rect x="96" y="96" width="408" height="408" fill="url(#hatch)"/>
             <circle cx="300" cy="200" r="62" fill="${C.cobre}"/>
             <g fill="#f6e3d7"><circle cx="170" cy="190" r="3"/><circle cx="205" cy="150" r="2"/><circle cx="420" cy="170" r="3"/><circle cx="395" cy="135" r="2"/><circle cx="440" cy="225" r="2"/></g>
             <path d="M60 470 L205 270 L245 310 L300 250 L425 400 L540 470 Z" fill="${C.carbon}"/>
             <path d="M300 250 L282 272 L292 270 L300 282 L308 270 L318 272 Z" fill="${C.cobre}"/>
             <g transform="translate(0,-58)">
               <path d="M250 430 L262 392 L300 372 L340 384 L356 420 L338 448 L282 452 Z" fill="${C.oro}" stroke="#8a6414" stroke-width="3" stroke-linejoin="round"/>
               <path d="M300 372 L294 410 L316 430 M262 392 L294 410 M340 384 L316 430 L338 448" fill="none" stroke="#f6d77a" stroke-width="2.5"/>
               <path d="M300 372 C300 350 300 336 300 322" stroke="${C.oro}" stroke-width="5" stroke-linecap="round" fill="none"/>
               <path d="M300 340 C284 330 276 318 280 306 C292 312 300 324 300 340 Z" fill="${C.oro}"/>
               <path d="M300 332 C316 322 326 310 322 298 C310 304 300 316 300 332 Z" fill="${C.oro}"/>
             </g>
           </g>`;

  // Cultura: sello con centro naranja. Si existe assets/img/insignia-cultura.png
  // (la imagen hecha en Canva), se coloca dentro del círculo.
  let culturaURI = '';
  fetch('assets/img/insignia-cultura.png')
    .then((r) => (r.ok ? r.blob() : Promise.reject()))
    .then(
      (blob) =>
        new Promise((res) => {
          const fr = new FileReader();
          fr.onload = () => res(fr.result);
          fr.readAsDataURL(blob);
        }),
    )
    .then((uri) => {
      culturaURI = uri;
    })
    .catch(() => {});
  const mandragora = () =>
    `<circle cx="300" cy="300" r="204" fill="${C.cobre}"/>${
      culturaURI
        ? `<image href="${culturaURI}" x="104" y="104" width="392" height="392" clip-path="url(#in)" preserveAspectRatio="xMidYMid slice"/>`
        : ''
    }`;

  /* ---------- dibujo de la insignia (SVG) ---------- */
  function svg(b, nombre, fecha) {
    const nom = (nombre || 'TU NOMBRE').toUpperCase().slice(0, 22);
    const fs = nom.length > 16 ? 19 : 24;
    const centro = b.id === 'cultura' ? mandragora() : ARBOL;
    const acento = b.id === 'cultura' ? C.oro : C.cobre;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600" font-family="Poppins, 'Segoe UI', Arial, sans-serif">
      <defs>
        <path id="top-${b.id}" d="M 300 300 m -228 0 a 228 228 0 1 1 456 0"/>
        <path id="bot-${b.id}" d="M 300 300 m -240 0 a 240 240 0 0 0 480 0"/>
        <clipPath id="in"><circle cx="300" cy="300" r="196"/></clipPath>
        <pattern id="hatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="12" stroke="#fff" stroke-opacity="0.12" stroke-width="2"/></pattern>
      </defs>
      <g class="b-ring">
        <circle cx="300" cy="300" r="290" fill="${C.carbon}"/>
        <circle class="b-stitch" cx="300" cy="300" r="280" fill="none" stroke="${acento}" stroke-width="3" stroke-dasharray="7 6"/>
        <text font-size="${b.id === 'cultura' ? 30 : 30}" font-weight="800" letter-spacing="6" fill="${b.id === 'cultura' ? C.oro : '#ffffff'}"><textPath href="#top-${b.id}" startOffset="50%" text-anchor="middle">${b.arriba}</textPath></text>
        <text font-size="${b.id === 'cultura' ? 18 : 21}" font-weight="700" letter-spacing="${b.id === 'cultura' ? 3 : 4}" fill="${b.id === 'cultura' ? '#ffffff' : C.cobre}"><textPath href="#bot-${b.id}" startOffset="50%" text-anchor="middle">${b.abajo}</textPath></text>
        <circle cx="72" cy="300" r="6" fill="${acento}"/><circle cx="528" cy="300" r="6" fill="${acento}"/>
      </g>
      <g class="b-center">${centro}<circle cx="300" cy="300" r="204" fill="none" stroke="#ffffff" stroke-width="4"/></g>
      <g class="b-tag">
        <rect x="${300 - 92}" y="112" width="184" height="30" rx="15" fill="${C.carbon}" stroke="${acento}" stroke-width="2"/>
        <text x="300" y="133" text-anchor="middle" font-size="15" font-weight="700" fill="${acento}" letter-spacing="2">${esc(S.ciclo || '')}${fecha ? ' · ' + esc(fecha) : ''}</text>
      </g>
      <g class="b-ribbon">
        <path d="M150 412 L450 412 L440 436 L450 460 L150 460 L160 436 Z" fill="${b.id === 'cultura' ? C.terra : '#ffffff'}" stroke="${b.id === 'cultura' ? '#ffffff' : C.carbon}" stroke-width="4" stroke-linejoin="round"/>
        <text x="300" y="${fs > 20 ? 445 : 443}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="${b.id === 'cultura' ? '#ffffff' : C.carbon}">${esc(nom)}</text>
      </g>
    </svg>`;
  }

  /* ---------- exportar a PNG ---------- */
  function aImagen(svgText, size) {
    return new Promise((res, rej) => {
      const img = new Image();
      const url = URL.createObjectURL(
        new Blob([svgText], { type: 'image/svg+xml' }),
      );
      img.onload = () => {
        URL.revokeObjectURL(url);
        res(img);
      };
      img.onerror = rej;
      img.width = size;
      img.height = size;
      img.src = url;
    });
  }
  function descargar(canvas, nombre) {
    canvas.toBlob((blob) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = nombre;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        URL.revokeObjectURL(a.href);
        a.remove();
      }, 500);
    }, 'image/png');
  }
  async function png(b, nombre, fecha, historia) {
    const img = await aImagen(svg(b, nombre, fecha), 1200);
    const c = document.createElement('canvas');
    const x = c.getContext('2d');
    if (!historia) {
      c.width = c.height = 1200;
      x.drawImage(img, 0, 0, 1200, 1200);
    } else {
      c.width = 1080;
      c.height = 1920;
      x.fillStyle = b.id === 'cultura' ? C.carbon : C.perg;
      x.fillRect(0, 0, 1080, 1920);
      x.fillStyle = C.terra;
      x.fillRect(0, 0, 1080, 18);
      x.drawImage(img, 90, 430, 900, 900);
      x.textAlign = 'center';
      x.fillStyle = b.id === 'cultura' ? C.oro : C.terra;
      x.font = '700 40px Poppins, Arial, sans-serif';
      x.fillText('AIESEC EN ESEN', 540, 230);
      x.fillStyle = b.id === 'cultura' ? '#ffffff' : C.carbon;
      x.font = '800 76px Poppins, Arial, sans-serif';
      x.fillText('Completé', 540, 320);
      x.fillText('AIESEC 101', 540, 400);
      x.font = '600 40px Poppins, Arial, sans-serif';
      x.fillStyle = b.id === 'cultura' ? '#d6d1c8' : '#4c4d4c';
      x.fillText(b.titulo, 540, 1450);
      x.fillStyle = b.id === 'cultura' ? C.oro : C.terra;
      x.font = '800 44px Poppins, Arial, sans-serif';
      x.fillText(
        b.id === 'cultura'
          ? 'Once Alchemist, always Alchemist!'
          : 'Turning rocks into gold',
        540,
        1560,
      );
    }
    const slug = (nombre || 'miembro')
      .toLowerCase()
      .replace(/[^a-z0-9]+/gi, '-');
    descargar(c, `aiesec101-${b.id}-${slug}${historia ? '-historia' : ''}.png`);
  }

  /* ---------- modal de celebración ---------- */
  function celebrar(b, nueva) {
    const g = ganadas();
    const dato = g[b.id] || {};
    const el = document.createElement('div');
    el.className = 'modal celebra';
    el.innerHTML = `
      <div class="modal__backdrop" data-close></div>
      ${nueva ? `<div class="confeti" aria-hidden="true">${Array.from({ length: 40 }, (_, i) => `<i style="--x:${Math.random() * 100}%;--d:${(Math.random() * 0.8).toFixed(2)}s;--r:${Math.round(Math.random() * 360)}deg;--c:${[C.terra, C.cobre, C.oro, '#ffffff'][i % 4]}"></i>`).join('')}</div>` : ''}
      <div class="modal__box celebra__box" role="dialog" aria-modal="true" aria-labelledby="celTitle">
        <button class="modal__close" type="button" aria-label="Cerrar" data-close>×</button>
        <p class="modal__kicker">${nueva ? '¡Felicidades!' : 'Tu insignia'}</p>
        <h2 class="modal__title" id="celTitle">${b.titulo}</h2>
        <p class="celebra__txt">${
          nueva
            ? b.id === 'cultura'
              ? 'Ya conoces lo que nos hace Alchemist. Once Alchemist, always Alchemist!'
              : 'Terminaste los módulos de conocimiento de AIESEC 101. Turning rocks into gold.'
            : 'Escribe tu nombre y descárgala para compartirla.'
        }</p>
        <div class="badge ${nueva ? 'badge--anim' : ''}" id="badgeView">${svg(b, dato.nombre, dato.fecha)}</div>
        <label class="celebra__label" for="badgeName">Tu nombre para la insignia</label>
        <input id="badgeName" class="celebra__input" type="text" maxlength="22" placeholder="Ej. Jhonnatan Peñate" value="${esc(dato.nombre || '')}" autocomplete="name" />
        <div class="celebra__actions">
          <button class="btn" type="button" data-dl="png">Descargar PNG</button>
          <button class="btn btn--dark" type="button" data-dl="historia">Formato historia</button>
        </div>
        <p class="celebra__note">Tu insignia se guarda en este navegador. Puedes volver a descargarla desde el Inicio.</p>
      </div>`;
    document.body.appendChild(el);
    document.body.style.overflow = 'hidden';
    const input = el.querySelector('#badgeName');
    const view = el.querySelector('#badgeView');
    input.addEventListener('input', () => {
      const actual = ganadas();
      actual[b.id] = { ...actual[b.id], nombre: input.value.trim() };
      guardar(actual);
      view.classList.remove('badge--anim');
      view.innerHTML = svg(b, input.value.trim(), actual[b.id].fecha);
    });
    const cerrar = () => {
      el.remove();
      document.body.style.overflow = '';
      if (window.Insignias.alCerrar) window.Insignias.alCerrar();
    };
    el.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) return cerrar();
      const d = e.target.closest('[data-dl]');
      if (d) {
        const actual = ganadas()[b.id] || {};
        png(b, input.value.trim(), actual.fecha, d.dataset.dl === 'historia');
      }
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') cerrar();
    });
    setTimeout(() => input.focus(), nueva ? 1600 : 50);
  }

  /* ---------- revisar si se ganó una insignia nueva ---------- */
  function revisar() {
    const g = ganadas();
    const nueva = LISTA.find((b) => cumple(b) && !g[b.id]);
    if (!nueva) return;
    const hoy = new Date();
    g[nueva.id] = {
      fecha: `${String(hoy.getDate()).padStart(2, '0')}/${String(hoy.getMonth() + 1).padStart(2, '0')}/${hoy.getFullYear()}`,
      nombre: '',
    };
    guardar(g);
    setTimeout(() => celebrar(nueva, true), 400);
  }

  window.Insignias = {
    lista: LISTA,
    ganadas,
    cumple,
    svg,
    celebrar: (id) =>
      celebrar(
        LISTA.find((b) => b.id === id),
        false,
      ),
    revisar,
  };
})();
