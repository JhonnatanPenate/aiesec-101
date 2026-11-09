// Vista de «Memoria Alchemist». La lógica vive en memoria-juego.js.
(function () {
  'use strict';
  const $ = (s) => document.getElementById(s);
  const D = window.MEMORIA;
  const I = window.ICONOS || {};
  const juego = window.MemoriaJuego.crear(D.fijos, D.valores);
  const S = juego.estado;
  const tablero = $('memTablero');
  const porId = () => Object.fromEntries(S.stickers.map((s) => [s.id, s]));
  const mmss = (ms) => {
    const s = Math.floor(ms / 1000);
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  };
  const cara = (st) =>
    st.tipo === 'img'
      ? `<img src="${st.src}" alt="" draggable="false" />`
      : `<span class="mem__icono" aria-hidden="true">${I[st.id] || ''}</span>`;

  let bloqueo = false;
  function pintar() {
    const m = porId();
    tablero.innerHTML = S.cartas
      .map((id, i) => {
        const vis = juego.visible(i);
        const ok = S.encontradas.has(id);
        const st = m[id];
        return `<button type="button" class="mem__carta${vis ? ' is-up' : ''}${ok ? ' is-ok' : ''}" data-i="${i}"
          aria-label="${vis ? st.nombre : 'Carta boca abajo'}" ${ok ? 'disabled' : ''}>
          <span class="mem__in">
            <span class="mem__back" aria-hidden="true"></span>
            <span class="mem__front">${cara(st)}<small>${st.nombre}</small></span>
          </span>
        </button>`;
      })
      .join('');
    $('memMovs').textContent = S.movimientos;
    $('memPares').textContent = `${S.encontradas.size}/${S.stickers.length}`;
    $('memTiempo').textContent = mmss(juego.tiempo());
    $('memLista').innerHTML = S.stickers
      .filter((st) => S.encontradas.has(st.id))
      .map((st) => `<li><b>${st.nombre}</b><span>${st.nota}</span></li>`)
      .join('') || '<li class="muted">Aquí aparece lo que significa cada pareja.</li>';
    $('memMsg').textContent = juego.terminado()
      ? `¡Encontraste las 8 parejas en ${S.movimientos} movimientos y ${mmss(juego.tiempo())}!`
      : S.movimientos === 0 && S.abiertas.length === 0
        ? 'Toca una carta para empezar.'
        : '';
  }

  tablero.addEventListener('click', (e) => {
    const b = e.target.closest('.mem__carta');
    if (!b || bloqueo) return;
    const r = juego.voltear(+b.dataset.i);
    if (!r) return;
    pintar();
    if (r === 'distintas') {
      bloqueo = true;
      setTimeout(() => {
        juego.ocultar();
        bloqueo = false;
        pintar();
      }, 900);
    }
  });
  $('memNueva').addEventListener('click', () => {
    juego.reiniciar();
    bloqueo = false;
    pintar();
  });
  setInterval(() => {
    if (S.inicio !== null && S.fin === null) $('memTiempo').textContent = mmss(juego.tiempo());
  }, 250);
  pintar();
  window.__mem = { juego, pintar };
})();
