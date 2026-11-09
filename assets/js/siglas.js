// Vista del juego de siglas. La lógica vive en siglas-juego.js.
(function () {
  'use strict';
  const $ = (s) => document.getElementById(s);
  const J = window.SiglasJuego;
  const reales = J.siglasReales(window.DICCIONARIO);
  const esc = (t) =>
    String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const mmss = (ms) => {
    const s = Math.floor(ms / 1000);
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  };

  /* ---------- modos ---------- */
  const tabs = document.querySelectorAll('.modos [data-modo]');
  function modo(m) {
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.modo === m)));
    $('vMatch').hidden = m !== 'match';
    $('vReal').hidden = m !== 'real';
  }
  tabs.forEach((t) => t.addEventListener('click', () => modo(t.dataset.modo)));

  /* ---------- Match ---------- */
  const match = J.crearMatch(reales);
  const M = match.estado;
  let sel = null; // índice de la sigla elegida
  function pintarMatch() {
    $('mIzq').innerHTML = M.pares
      .map(
        (p, i) =>
          `<button type="button" class="mt__btn mt__btn--sigla${M.hechos.has(i) ? ' is-ok' : ''}${sel === i ? ' is-sel' : ''}" data-i="${i}" ${M.hechos.has(i) ? 'disabled' : ''}>${esc(p.sigla)}</button>`,
      )
      .join('');
    // al terminar, los significados se alinean con su sigla
    const orden = match.terminado() ? M.pares.map((_, i) => i) : M.derecha;
    $('mDer').innerHTML = orden
      .map(
        (j) =>
          `<button type="button" class="mt__btn${M.hechos.has(j) ? ' is-ok' : ''}" data-j="${j}" ${M.hechos.has(j) ? 'disabled' : ''}>${esc(M.pares[j].nombre)}</button>`,
      )
      .join('');
    $('mErrores').textContent = M.errores;
    $('mPares').textContent = `${M.hechos.size}/${M.pares.length}`;
    $('mTiempo').textContent = mmss(match.tiempo());
    $('mMsg').textContent = match.terminado()
      ? `¡Listo! ${M.pares.length} pares en ${mmss(match.tiempo())} con ${M.errores} ${M.errores === 1 ? 'error' : 'errores'}.`
      : sel === null
        ? 'Toca una sigla para empezar.'
        : 'Ahora toca su significado.';
  }
  $('mTablero').addEventListener('click', (e) => {
    const b = e.target.closest('.mt__btn');
    if (!b || b.disabled) return;
    if (b.dataset.i !== undefined) {
      sel = +b.dataset.i;
      return pintarMatch();
    }
    if (sel === null) {
      $('mMsg').textContent = 'Primero toca una sigla.';
      return;
    }
    const j = +b.dataset.j;
    if (match.intentar(sel, j)) {
      sel = null;
      pintarMatch();
    } else {
      pintarMatch();
      const nb = $('mDer').querySelector(`[data-j="${j}"]`);
      nb.classList.add('nope');
    }
  });
  $('mNueva').addEventListener('click', () => {
    match.reiniciar();
    sel = null;
    pintarMatch();
  });
  setInterval(() => {
    if (M.inicio !== null && M.fin === null) $('mTiempo').textContent = mmss(match.tiempo());
  }, 250);
  pintarMatch();

  /* ---------- ¿Real o no? ---------- */
  const rn = J.crearRealONo(reales, window.SIGLAS_FALSAS);
  const R = rn.estado;
  function pintarReal() {
    const total = R.preguntas.length;
    $('rPuntos').textContent = R.puntos;
    if (rn.terminado()) {
      $('rNum').textContent = `${total}/${total}`;
      $('rSigla').textContent = `${R.puntos}/${total}`;
      $('rCarta').querySelector('.rn__btns').hidden = true;
      $('rSig').hidden = true;
      $('rOut').innerHTML = `<p><b>${R.puntos >= 8 ? '¡Eres un Alquimista de siglas!' : R.puntos >= 5 ? '¡Bien! Ya casi.' : 'Date una vuelta por el Diccionario y vuelve a intentarlo.'}</b></p>`;
      return;
    }
    const p = rn.pregunta();
    $('rNum').textContent = `${R.actual + 1}/${total}`;
    $('rSigla').textContent = p.sigla;
    $('rCarta').querySelector('.rn__btns').hidden = false;
    $('rOut').innerHTML = '';
    $('rSig').hidden = true;
  }
  $('rCarta').addEventListener('click', (e) => {
    const b = e.target.closest('[data-resp]');
    if (!b) return;
    const ok = rn.responder(b.dataset.resp === '1');
    if (ok === null) return;
    const p = rn.pregunta();
    $('rCarta').querySelector('.rn__btns').hidden = true;
    $('rOut').innerHTML = `
      <p class="rn__res ${ok ? 'is-ok' : 'is-bad'}">${ok ? '¡Correcto!' : 'Nop.'}</p>
      ${
        p.real
          ? `<p><b>${esc(p.sigla)} es real:</b> ${esc(p.nombre)}. ${esc(p.texto)}</p>`
          : `<p><b>${esc(p.sigla)} la inventamos.</b> Sonaba a «${esc(p.nombre)}», pero no existe.</p>`
      }`;
    $('rPuntos').textContent = R.puntos;
    $('rSig').hidden = false;
    $('rSig').focus({ preventScroll: true });
  });
  $('rSig').addEventListener('click', () => {
    rn.siguiente();
    pintarReal();
  });
  $('rNueva').addEventListener('click', () => {
    rn.reiniciar();
    pintarReal();
  });
  pintarReal();
})();
