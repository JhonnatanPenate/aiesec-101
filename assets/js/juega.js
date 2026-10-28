// Vista del juego «Juega con los ODS». La lógica vive en ods-juego.js.
(function () {
  'use strict';
  const $ = (s) => document.getElementById(s);
  const LISTA = window.APRENDE.ods.lista; // [n, nombre, color, idea]
  const juego = window.OdsJuego.crear();
  const S = juego.estado;
  const board = $('jBoard');
  const LOCK = `<svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2.5" fill="currentColor"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>`;

  // Ícono oficial completo del ODS (assets/img/ods/ods-N.png), con número y nombre como pide la ONU.
  // Si aún no está, se usa el color oficial con el número para que el juego se pueda probar.
  const icono = (n) =>
    `<img src="assets/img/ods/ods-${n}.png" alt="" draggable="false" onerror="this.remove()" /><span class="piece__fb">${n}</span>`;
  const nombre = (n) => `ODS ${n}: ${LISTA[n - 1][1]}`;
  const color = (n) => LISTA[n - 1][2];

  // referencia del orden (fuera del tablero)
  $('jOrden').innerHTML =
    LISTA.slice(0, 15)
      .map((o) => `<i style="--c:${o[2]}">${o[0]}</i>`)
      .join('') + '<i class="is-empty"></i>';

  // fichas: se crean una vez y se mueven con transform para que deslicen
  const fichas = {};
  for (let n = 1; n <= 16; n++) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'piece';
    b.dataset.n = n;
    b.style.setProperty('--c', color(n));
    b.setAttribute('aria-label', nombre(n));
    b.innerHTML = icono(n);
    if (n === 16) b.hidden = true;
    fichas[n] = b;
    board.appendChild(b);
  }
  const hueco = document.createElement('button');
  hueco.type = 'button';
  hueco.className = 'slot';
  hueco.setAttribute('aria-label', 'Casilla final: coloca aquí el ODS 16');
  hueco.hidden = true;
  board.appendChild(hueco);

  const victoria = document.createElement('div');
  victoria.className = 'win';
  victoria.hidden = true;
  board.appendChild(victoria);

  const pos = (el, i) => {
    el.style.setProperty('--x', i % 4);
    el.style.setProperty('--y', Math.floor(i / 4));
  };

  function pintar() {
    S.tablero.forEach((n, i) => {
      if (n) {
        pos(fichas[n], i);
        fichas[n].hidden = false;
        fichas[n].classList.toggle('can', juego.puedeMover(i));
        fichas[n].setAttribute('aria-disabled', !juego.puedeMover(i));
      }
    });
    if (!S.tablero.includes(16)) fichas[16].hidden = true;
    $('jMovs').textContent = S.movimientos;
    pintarTiempo();

    const e = S.etapa;
    board.classList.toggle('is-done', e !== 'jugando');
    hueco.hidden = e !== 'colocar16';
    pos(hueco, 15);

    const c16 = $('j16');
    const p16 = $('j16piece');
    c16.dataset.locked = e === 'jugando';
    c16.dataset.used = e === 'desbloquear17' || e === 'victoria';
    p16.disabled = e !== 'colocar16';
    p16.style.setProperty('--c', color(16));
    p16.innerHTML = e === 'jugando' ? LOCK : icono(16);
    p16.setAttribute(
      'aria-label',
      e === 'colocar16'
        ? `${nombre(16)}. Colócalo en la casilla final`
        : 'ODS 16 bloqueado',
    );
    $('j16txt').textContent =
      e === 'jugando'
        ? 'Se desbloquea cuando ordenes los primeros 15.'
        : e === 'colocar16'
          ? 'Tócalo o arrástralo a la última casilla del tablero.'
          : '¡Listo! El tablero está completo.';

    $('j17').dataset.locked = e === 'jugando' || e === 'colocar16';
    $('j17btn').disabled = e !== 'desbloquear17';

    $('jMsg').textContent = {
      jugando: S.movimientos
        ? ''
        : 'Toca una pieza junto al espacio vacío para empezar.',
      colocar16:
        '¡Buen trabajo! Solo falta un objetivo para completar el tablero.',
      desbloquear17: 'El ODS 17 te espera: desbloquéalo para terminar.',
      victoria: '',
    }[e];

    victoria.hidden = e !== 'victoria';
  }

  const mmss = (ms) => {
    const s = Math.floor(ms / 1000);
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  };
  function pintarTiempo() {
    $('jTiempo').textContent = mmss(juego.tiempo());
  }
  setInterval(() => {
    if (S.inicio !== null && S.fin === null) pintarTiempo();
  }, 250);

  /* ---------- etapa 1: deslizar ---------- */
  board.addEventListener('click', (e) => {
    if (e.target.closest('.slot')) return colocar();
    const b = e.target.closest('.piece');
    if (!b || !board.contains(b)) return;
    const i = S.tablero.indexOf(+b.dataset.n);
    if (juego.mover(i)) {
      pintar();
      if (S.etapa === 'colocar16') celebrarTablero();
    } else if (S.etapa === 'jugando') {
      b.classList.remove('nope');
      void b.offsetWidth;
      b.classList.add('nope');
    }
  });
  board.addEventListener('keydown', (e) => {
    const dir = {
      ArrowUp: 'arriba',
      ArrowDown: 'abajo',
      ArrowLeft: 'izquierda',
      ArrowRight: 'derecha',
    }[e.key];
    if (!dir) return;
    e.preventDefault();
    if (juego.moverDireccion(dir)) {
      pintar();
      if (S.etapa === 'colocar16') celebrarTablero();
    }
  });

  function celebrarTablero() {
    board.classList.remove('flash');
    void board.offsetWidth;
    board.classList.add('flash');
    $('j16').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ---------- etapa 2: colocar el 16 (tocar o arrastrar) ---------- */
  function colocar() {
    if (!juego.colocar16(15)) return;
    pintar();
    fichas[16].classList.add('drop');
    $('j17btn').focus({ preventScroll: true });
    $('j17').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  const p16 = $('j16piece');
  let arrastre = null;
  p16.addEventListener('pointerdown', (e) => {
    if (S.etapa !== 'colocar16') return;
    const r = p16.getBoundingClientRect();
    arrastre = {
      x: e.clientX,
      y: e.clientY,
      dx: e.clientX - r.left,
      dy: e.clientY - r.top,
      ghost: null,
    };
    p16.setPointerCapture(e.pointerId);
  });
  p16.addEventListener('pointermove', (e) => {
    if (!arrastre) return;
    if (
      !arrastre.ghost &&
      Math.hypot(e.clientX - arrastre.x, e.clientY - arrastre.y) > 6
    ) {
      const g = p16.cloneNode(true);
      g.classList.add('ghost');
      g.style.width = p16.offsetWidth + 'px';
      g.style.height = p16.offsetHeight + 'px';
      document.body.appendChild(g);
      arrastre.ghost = g;
      hueco.classList.add('target');
    }
    if (arrastre.ghost) {
      arrastre.ghost.style.left = e.clientX - arrastre.dx + 'px';
      arrastre.ghost.style.top = e.clientY - arrastre.dy + 'px';
    }
  });
  p16.addEventListener('pointerup', (e) => {
    if (!arrastre) return;
    const { ghost } = arrastre;
    arrastre = null;
    hueco.classList.remove('target');
    if (!ghost) return colocar(); // fue un toque
    ghost.remove();
    const r = hueco.getBoundingClientRect();
    const dentro =
      e.clientX >= r.left &&
      e.clientX <= r.right &&
      e.clientY >= r.top &&
      e.clientY <= r.bottom;
    if (dentro) colocar();
  });
  p16.addEventListener('pointercancel', () => {
    if (arrastre && arrastre.ghost) arrastre.ghost.remove();
    arrastre = null;
    hueco.classList.remove('target');
  });
  // con teclado, Enter/Espacio en la ficha la coloca
  p16.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      colocar();
    }
  });

  /* ---------- etapa 3: el 17 y la victoria ---------- */
  $('j17btn').addEventListener('click', () => {
    if (!juego.completar17()) return;
    victoria.innerHTML = `
      <div class="win__in">
        <span class="piece piece--17" style="--c:${color(17)}">${icono(17)}</span>
        <h2>¡Lo lograste!</h2>
        <p>Completaste los 17 ODS.</p>
        <div class="win__stats">
          <div><small>Tiempo</small><b>${mmss(juego.tiempo())}</b></div>
          <div><small>Movimientos</small><b>${S.movimientos}</b></div>
        </div>
        <button class="btn" type="button" data-again>Jugar de nuevo</button>
        <a class="win__link" href="aprende.html#ods">Ver los 17 ODS</a>
      </div>`;
    pintar();
    victoria.querySelector('[data-again]').focus({ preventScroll: true });
    board.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  victoria.addEventListener('click', (e) => {
    if (e.target.closest('[data-again]')) nueva();
  });

  function nueva() {
    juego.reiniciar();
    fichas[16].classList.remove('drop');
    board.classList.remove('flash');
    pintar();
    board.focus({ preventScroll: true });
  }
  $('jReiniciar').addEventListener('click', nueva);

  pintar();
  // gancho para pruebas automáticas
  window.__ods = { juego, pintar };
})();
