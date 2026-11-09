// Vista de «Ordena el recorrido». La lógica vive en recorrido-juego.js.
(function () {
  'use strict';
  const $ = (s) => document.getElementById(s);
  const R = window.RECORRIDOS;
  let rec = R[0];
  let j = window.RecorridoJuego.crear(rec.pasos);

  $('recModos').innerHTML = R.map(
    (r, i) =>
      `<button type="button" role="tab" aria-selected="${i === 0}" data-r="${i}"><b>${r.titulo}</b><span>${r.sub}</span></button>`,
  ).join('');
  $('recModos').addEventListener('click', (e) => {
    const b = e.target.closest('[data-r]');
    if (!b) return;
    rec = R[+b.dataset.r];
    j = window.RecorridoJuego.crear(rec.pasos);
    $('recModos')
      .querySelectorAll('[data-r]')
      .forEach((x) => x.setAttribute('aria-selected', String(x === b)));
    pintar();
  });

  const carta = (k, extra) => {
    const [a, b] = rec.pasos[k];
    const dos = a !== b && !/^\d+$/.test(a);
    return `${dos ? `<b>${a}</b><span>${b}</span>` : `<b>${b}</b>`}${extra || ''}`;
  };

  function pintar() {
    const S = j.estado;
    const n = rec.pasos.length;
    $('recFila').innerHTML =
      S.fila
        .map((k, i) => {
          const r = S.revision ? (S.revision[i] ? ' is-ok' : ' is-bad') : '';
          return `<li><button type="button" class="rec-c${r}" data-pos="${i}">${carta(k)}</button></li>`;
        })
        .join('') +
      [...Array(n - S.fila.length)].map(() => '<li><span class="rec-c rec-c--vacia"></span></li>').join('');
    $('recMesa').innerHTML = S.mesa
      .map((k) => `<button type="button" class="rec-c" data-k="${k}">${carta(k)}</button>`)
      .join('');
    $('recCol').textContent = `${S.fila.length}/${n}`;
    $('recInt').textContent = S.intentos;
    const todoBien = S.revision && S.revision.every(Boolean);
    $('recRevisar').disabled = !j.completa() || !!S.revision;
    $('recCorregir').hidden = !S.revision || todoBien;
    $('recRepaso').innerHTML = todoBien
      ? rec.pasos.map((p) => `<li><b>${p[1]}</b> ${p[2]}</li>`).join('')
      : '';
    $('recRepaso').hidden = !todoBien;
    $('recMsg').textContent = todoBien
      ? `¡Perfecto! Ordenaste el recorrido en ${S.intentos} ${S.intentos === 1 ? 'intento' : 'intentos'}.`
      : S.revision
        ? 'Las doradas van bien. Corrige las demás.'
        : S.fila.length === 0
          ? '¿Cuál va primero? Toca una etapa.'
          : '';
  }

  $('recMesa').addEventListener('click', (e) => {
    const b = e.target.closest('[data-k]');
    if (b && j.colocar(+b.dataset.k)) pintar();
  });
  $('recFila').addEventListener('click', (e) => {
    const b = e.target.closest('[data-pos]');
    if (!b || (j.estado.revision && j.estado.revision.every(Boolean))) return;
    if (j.quitar(+b.dataset.pos)) pintar();
  });
  $('recRevisar').addEventListener('click', () => {
    j.revisar();
    pintar();
  });
  $('recCorregir').addEventListener('click', () => {
    j.corregir();
    pintar();
  });
  $('recNueva').addEventListener('click', () => {
    j.reiniciar();
    pintar();
  });
  pintar();
})();
