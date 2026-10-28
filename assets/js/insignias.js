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
             <path d="M70 480 L245 300 L300 336 L355 300 L530 480 Z" fill="${C.carbon}" opacity="0.92"/>
             <ellipse cx="300" cy="402" rx="120" ry="14" fill="#1e1e1e" opacity="0.5"/>
           </g>
           <g fill="none" stroke="#d9a93a" stroke-width="3" stroke-linecap="round"><path d="M300 262 Q268.0 229.2 244.0 222.5"/><path d="M300 262 Q273.7 220.2 239.4 204.5"/><path d="M300 262 Q275.5 217.5 259.0 199.1"/><path d="M300 262 Q286.5 208.7 265.0 181.4"/><path d="M300 262 Q288.5 210.8 285.0 185.6"/><path d="M300 262 Q304.0 204.5 300.0 173.0"/><path d="M300 262 Q303.5 210.8 315.0 185.6"/><path d="M300 262 Q321.5 208.7 335.0 181.4"/><path d="M300 262 Q316.5 217.5 341.0 199.1"/><path d="M300 262 Q334.3 220.2 360.6 204.5"/><path d="M300 262 Q324.0 229.2 356.0 222.5"/></g>
           <ellipse cx="269.2" cy="240.3" rx="9" ry="3.8" transform="rotate(-140 269.2 240.3)" fill="#c9962a"/><ellipse cx="269.2" cy="240.3" rx="8" ry="3.4" transform="rotate(-190 269.2 240.3)" fill="#e3b84a"/><ellipse cx="255.2" cy="230.4" rx="11" ry="4.6" transform="rotate(-140 255.2 230.4)" fill="#c9962a"/><ellipse cx="255.2" cy="230.4" rx="10" ry="4.2" transform="rotate(-190 255.2 230.4)" fill="#e3b84a"/><ellipse cx="244.0" cy="222.5" rx="12" ry="5.0" transform="rotate(-165 244.0 222.5)" fill="#e3b84a"/><ellipse cx="266.7" cy="230.4" rx="9" ry="3.8" transform="rotate(-125 266.7 230.4)" fill="#f3d26b"/><ellipse cx="266.7" cy="230.4" rx="8" ry="3.4" transform="rotate(-175 266.7 230.4)" fill="#c9962a"/><ellipse cx="251.5" cy="216.0" rx="11" ry="4.6" transform="rotate(-125 251.5 216.0)" fill="#f3d26b"/><ellipse cx="251.5" cy="216.0" rx="10" ry="4.2" transform="rotate(-175 251.5 216.0)" fill="#c9962a"/><ellipse cx="239.4" cy="204.5" rx="12" ry="5.0" transform="rotate(-150 239.4 204.5)" fill="#c9962a"/><ellipse cx="277.4" cy="227.4" rx="9" ry="3.8" transform="rotate(-110 277.4 227.4)" fill="#e3b84a"/><ellipse cx="277.4" cy="227.4" rx="8" ry="3.4" transform="rotate(-160 277.4 227.4)" fill="#f3d26b"/><ellipse cx="267.2" cy="211.7" rx="11" ry="4.6" transform="rotate(-110 267.2 211.7)" fill="#e3b84a"/><ellipse cx="267.2" cy="211.7" rx="10" ry="4.2" transform="rotate(-160 267.2 211.7)" fill="#f3d26b"/><ellipse cx="259.0" cy="199.1" rx="12" ry="5.0" transform="rotate(-135 259.0 199.1)" fill="#f3d26b"/><ellipse cx="280.8" cy="217.7" rx="9" ry="3.8" transform="rotate(-95 280.8 217.7)" fill="#c9962a"/><ellipse cx="280.8" cy="217.7" rx="8" ry="3.4" transform="rotate(-145 280.8 217.7)" fill="#e3b84a"/><ellipse cx="272.0" cy="197.6" rx="11" ry="4.6" transform="rotate(-95 272.0 197.6)" fill="#c9962a"/><ellipse cx="272.0" cy="197.6" rx="10" ry="4.2" transform="rotate(-145 272.0 197.6)" fill="#e3b84a"/><ellipse cx="265.0" cy="181.4" rx="12" ry="5.0" transform="rotate(-120 265.0 181.4)" fill="#e3b84a"/><ellipse cx="291.7" cy="220.0" rx="9" ry="3.8" transform="rotate(-80 291.7 220.0)" fill="#f3d26b"/><ellipse cx="291.7" cy="220.0" rx="8" ry="3.4" transform="rotate(-130 291.7 220.0)" fill="#c9962a"/><ellipse cx="288.0" cy="200.9" rx="11" ry="4.6" transform="rotate(-80 288.0 200.9)" fill="#f3d26b"/><ellipse cx="288.0" cy="200.9" rx="10" ry="4.2" transform="rotate(-130 288.0 200.9)" fill="#c9962a"/><ellipse cx="285.0" cy="185.6" rx="12" ry="5.0" transform="rotate(-105 285.0 185.6)" fill="#c9962a"/><ellipse cx="300.0" cy="213.1" rx="9" ry="3.8" transform="rotate(-65 300.0 213.1)" fill="#e3b84a"/><ellipse cx="300.0" cy="213.1" rx="8" ry="3.4" transform="rotate(-115 300.0 213.1)" fill="#f3d26b"/><ellipse cx="300.0" cy="190.8" rx="11" ry="4.6" transform="rotate(-65 300.0 190.8)" fill="#e3b84a"/><ellipse cx="300.0" cy="190.8" rx="10" ry="4.2" transform="rotate(-115 300.0 190.8)" fill="#f3d26b"/><ellipse cx="300.0" cy="173.0" rx="12" ry="5.0" transform="rotate(-90 300.0 173.0)" fill="#f3d26b"/><ellipse cx="308.3" cy="220.0" rx="9" ry="3.8" transform="rotate(-50 308.3 220.0)" fill="#c9962a"/><ellipse cx="308.3" cy="220.0" rx="8" ry="3.4" transform="rotate(-100 308.3 220.0)" fill="#e3b84a"/><ellipse cx="312.0" cy="200.9" rx="11" ry="4.6" transform="rotate(-50 312.0 200.9)" fill="#c9962a"/><ellipse cx="312.0" cy="200.9" rx="10" ry="4.2" transform="rotate(-100 312.0 200.9)" fill="#e3b84a"/><ellipse cx="315.0" cy="185.6" rx="12" ry="5.0" transform="rotate(-75 315.0 185.6)" fill="#e3b84a"/><ellipse cx="319.2" cy="217.7" rx="9" ry="3.8" transform="rotate(-35 319.2 217.7)" fill="#f3d26b"/><ellipse cx="319.2" cy="217.7" rx="8" ry="3.4" transform="rotate(-85 319.2 217.7)" fill="#c9962a"/><ellipse cx="328.0" cy="197.6" rx="11" ry="4.6" transform="rotate(-35 328.0 197.6)" fill="#f3d26b"/><ellipse cx="328.0" cy="197.6" rx="10" ry="4.2" transform="rotate(-85 328.0 197.6)" fill="#c9962a"/><ellipse cx="335.0" cy="181.4" rx="12" ry="5.0" transform="rotate(-60 335.0 181.4)" fill="#c9962a"/><ellipse cx="322.6" cy="227.4" rx="9" ry="3.8" transform="rotate(-20 322.6 227.4)" fill="#e3b84a"/><ellipse cx="322.6" cy="227.4" rx="8" ry="3.4" transform="rotate(-70 322.6 227.4)" fill="#f3d26b"/><ellipse cx="332.8" cy="211.7" rx="11" ry="4.6" transform="rotate(-20 332.8 211.7)" fill="#e3b84a"/><ellipse cx="332.8" cy="211.7" rx="10" ry="4.2" transform="rotate(-70 332.8 211.7)" fill="#f3d26b"/><ellipse cx="341.0" cy="199.1" rx="12" ry="5.0" transform="rotate(-45 341.0 199.1)" fill="#f3d26b"/><ellipse cx="333.3" cy="230.4" rx="9" ry="3.8" transform="rotate(-5 333.3 230.4)" fill="#c9962a"/><ellipse cx="333.3" cy="230.4" rx="8" ry="3.4" transform="rotate(-55 333.3 230.4)" fill="#e3b84a"/><ellipse cx="348.5" cy="216.0" rx="11" ry="4.6" transform="rotate(-5 348.5 216.0)" fill="#c9962a"/><ellipse cx="348.5" cy="216.0" rx="10" ry="4.2" transform="rotate(-55 348.5 216.0)" fill="#e3b84a"/><ellipse cx="360.6" cy="204.5" rx="12" ry="5.0" transform="rotate(-30 360.6 204.5)" fill="#e3b84a"/><ellipse cx="330.8" cy="240.3" rx="9" ry="3.8" transform="rotate(10 330.8 240.3)" fill="#f3d26b"/><ellipse cx="330.8" cy="240.3" rx="8" ry="3.4" transform="rotate(-40 330.8 240.3)" fill="#c9962a"/><ellipse cx="344.8" cy="230.4" rx="11" ry="4.6" transform="rotate(10 344.8 230.4)" fill="#f3d26b"/><ellipse cx="344.8" cy="230.4" rx="10" ry="4.2" transform="rotate(-40 344.8 230.4)" fill="#c9962a"/><ellipse cx="356.0" cy="222.5" rx="12" ry="5.0" transform="rotate(-15 356.0 222.5)" fill="#c9962a"/>
           <path d="M300 340 C297 310 303 290 300 262" stroke="#d9a93a" stroke-width="8" stroke-linecap="round" fill="none"/>
           <path d="M250 398 L256 356 L286 334 L330 338 L352 368 L346 396 L300 406 Z" fill="${C.oro}" stroke="#7a560f" stroke-width="3" stroke-linejoin="round"/>
           <path d="M256 356 L286 334 L330 338 L316 364 L272 372 Z" fill="#f0cd63"/>
           <path d="M300 336 L294 364 L314 386 M272 372 L294 364 M330 338 L316 364 L340 384 M314 386 L304 404" fill="none" stroke="#f8e08a" stroke-width="2.5" stroke-linecap="round"/>
           <path d="M232 400 L242 392 L254 396 L250 404 L238 405 Z" fill="${C.oro}" stroke="#7a560f" stroke-width="2"/>
           <path d="M352 400 L364 392 L376 398 L370 405 L356 405 Z" fill="${C.oro}" stroke="#7a560f" stroke-width="2"/>
           <path d="M214 220 Q216.16 229.84 226 232 Q216.16 234.16 214 244 Q211.84 234.16 202 232 Q211.84 229.84 214 220 Z" fill="#f6e3a3"/><path d="M388 210 Q390.16 219.84 400 222 Q390.16 224.16 388 234 Q385.84 224.16 376 222 Q385.84 219.84 388 210 Z" fill="#f6e3a3"/><path d="M366 309 Q367.62 316.38 375 318 Q367.62 319.62 366 327 Q364.38 319.62 357 318 Q364.38 316.38 366 309 Z" fill="#f6e3a3"/><path d="M234 293 Q235.26 298.74 241 300 Q235.26 301.26 234 307 Q232.74 301.26 227 300 Q232.74 298.74 234 293 Z" fill="#f6e3a3"/>`;
  const MANDRAGORA = `<circle cx="300" cy="300" r="204" fill="${C.cobre}"/>
           <g fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
             <path d="M140 210 C150 180 176 170 196 176 C190 200 166 214 140 210 Z M140 210 L196 176"/>
             <path d="M458 360 C446 388 420 396 400 388 C408 364 432 352 458 360 Z M458 360 L400 388"/>
             <path d="M150 360 C160 386 182 394 198 388"/>
           </g>
           <g transform="translate(30 42) scale(0.9)">
           <g fill="none" stroke="#ffffff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
             <path d="M300 204 C345 204 362 242 360 282 C358 322 335 344 300 344 C265 344 242 322 240 282 C238 242 255 204 300 204 Z"/>
             <path d="M300 204 L300 176"/>
             <path d="M300 176 C286 154 290 130 300 118 C310 130 314 154 300 176 Z"/>
             <path d="M296 186 C272 180 258 160 260 144 C278 146 292 164 296 186 Z"/>
             <path d="M304 186 C328 180 342 160 340 144 C322 146 308 164 304 186 Z"/>
             <path d="M244 286 C222 286 206 272 198 254 M220 280 C212 294 198 300 186 298"/>
             <path d="M356 286 C378 286 394 272 402 254 M380 280 C388 294 402 300 414 298"/>
             <path d="M272 336 C264 360 248 376 228 382 M248 372 C240 380 238 392 242 400"/>
             <path d="M292 344 C290 368 282 386 270 398"/>
             <path d="M310 344 C312 368 320 386 332 398"/>
             <path d="M330 336 C338 360 354 376 374 382 M354 372 C362 380 364 392 360 400"/>
             <path d="M284 294 C292 304 308 304 316 294"/>
           </g>
           <circle cx="282" cy="268" r="8" fill="#ffffff"/>
           <circle cx="318" cy="268" r="8" fill="#ffffff"/>
           </g>`;

  /* ---------- dibujo de la insignia (SVG) ---------- */
  function svg(b, nombre, fecha) {
    const nom = (nombre || 'TU NOMBRE').toUpperCase().slice(0, 22);
    const fs = nom.length > 16 ? 19 : 24;
    const centro = b.id === 'cultura' ? MANDRAGORA : ARBOL;
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
