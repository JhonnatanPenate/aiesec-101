// Vista de «¿Qué área lo hace?». La lógica vive en areas-juego.js.
(function () {
  'use strict';
  const $ = (s) => document.getElementById(s);
  const D = window.AREAS_JUEGO;
  const nombre = Object.fromEntries(D.areas);
  const j = window.AreasJuego.crear(D.tareas);
  const S = j.estado;

  $('qAreas').innerHTML = D.areas
    .map(([id, n]) => `<button type="button" class="qa__btn" data-area="${id}">${n}</button>`)
    .join('');
  const botones = () => $('qAreas').querySelectorAll('.qa__btn');

  function pintar() {
    const total = S.preguntas.length;
    $('qPuntos').textContent = S.puntos;
    $('qSig').hidden = true;
    $('qOut').innerHTML = '';
    botones().forEach((b) => {
      b.disabled = false;
      b.classList.remove('is-ok', 'is-bad');
    });
    if (j.terminado()) {
      $('qNum').textContent = `${total}/${total}`;
      $('qTarea').textContent = `${S.puntos}/${total}`;
      $('qAreas').hidden = true;
      $('qOut').innerHTML = `<p><b>${S.puntos >= 9 ? '¡Conoces el comité de pies a cabeza!' : S.puntos >= 6 ? '¡Bien! Ya casi lo tienes.' : 'Date una vuelta por Áreas y vuelve a intentarlo.'}</b></p>`;
      return;
    }
    $('qAreas').hidden = false;
    $('qNum').textContent = `${S.actual + 1}/${total}`;
    $('qTarea').textContent = j.pregunta().texto;
  }

  $('qAreas').addEventListener('click', (e) => {
    const b = e.target.closest('[data-area]');
    if (!b) return;
    const p = j.pregunta();
    const ok = j.responder(b.dataset.area);
    if (ok === null) return;
    botones().forEach((x) => {
      x.disabled = true;
      if (x.dataset.area === p.area) x.classList.add('is-ok');
    });
    if (!ok) b.classList.add('is-bad');
    $('qOut').innerHTML = `
      <p class="qa__res ${ok ? 'is-ok' : 'is-bad'}">${ok ? '¡Correcto!' : `Nop, es de ${nombre[p.area]}.`}</p>
      <p>${p.porque}</p>`;
    $('qPuntos').textContent = S.puntos;
    $('qSig').hidden = false;
    $('qSig').focus({ preventScroll: true });
  });
  $('qSig').addEventListener('click', () => {
    j.siguiente();
    pintar();
  });
  $('qNueva').addEventListener('click', () => {
    j.reiniciar();
    pintar();
  });
  pintar();
})();
