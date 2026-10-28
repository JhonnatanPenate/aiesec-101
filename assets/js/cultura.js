// Página Cultura: historia, Edrik, valores, espacios, tradiciones y convivencia.
(function () {
  'use strict';
  const D = window.CULTURA;
  const $ = (s) => document.getElementById(s);
  // ícono de la señal: brazo hacia arriba, pulgar tocando la frente y meñique corto
  const SIGN = `<svg class="sign" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="20" cy="28" r="14" fill="none" stroke="currentColor" stroke-width="3.5"/>
      <g fill="currentColor" stroke="var(--charcoal)" stroke-width="1.5" stroke-linejoin="round">
        <path d="M42 64 L40 40 L52 40 L54 64 Z"/>
        <path d="M37 22 C37 18 40 16 44 16 L52 16 C56 16 58 19 58 23 L58 34 C58 39 55 42 50 42 L44 42 C40 42 37 39 37 35 Z"/>
        <path d="M38 24 L31 24 C28 24 28 29 31 29 L38 29 Z"/>
        <path d="M54 17 L56 9 C56.6 7 59.4 7.6 59 9.6 L57.4 18 Z"/>
      </g>
      <path d="M41 26 h13 M41 31 h13 M41 36 h13" stroke="var(--charcoal)" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`;

  /* ---------- historia ---------- */
  $('hist').innerHTML = D.historia
    .map(
      (h, i) =>
        `<li class="hist__item hist__item--${i}"><b>${h[0]}</b><p>${h[1]}</p></li>`,
    )
    .join('');
  $('ebs').innerHTML = D.ebs
    .map(
      (e) => `
      <div class="eb${e.actual ? ' eb--now' : ''}">
        ${e.actual ? '<span class="eb__tag">EB actual</span>' : ''}
        <h4>${e.nombre}</h4>
        <p class="eb__detail">${e.detalle}</p>
        <p>${e.texto}</p>
      </div>`,
    )
    .join('');

  /* ---------- Alchemist y Edrik ---------- */
  $('alcTexto').textContent = D.alchemist.texto;
  $('edrikNombre').textContent = D.edrik.nombre;
  $('edrikTexto').textContent = D.edrik.texto;
  $('edrikSaludo').textContent = D.edrik.saludo;
  $('meanings').innerHTML = D.edrik.significados
    .map((m) => `<div><b>${m[0]}</b><span>${m[1]}</span></div>`)
    .join('');
  $('mottos').innerHTML = D.alchemist.lemas
    .map((l) => `<span>${l}</span>`)
    .join('');

  /* ---------- valores ---------- */
  $('cvalues').innerHTML = D.valores
    .map(
      (v, i) => `
      <button class="cvalue cvalue--${i % 3}" type="button" data-i="${i}">
        <b>${v[0]}</b>
        <span class="more">Qué significa</span>
      </button>`,
    )
    .join('');
  $('cvalues').addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (!b) return;
    const v = D.valores[+b.dataset.i];
    window.Modal.open({
      kicker: 'Valor de Alchemist',
      title: v[0],
      body: v[1],
    });
  });

  /* ---------- espacios ---------- */
  $('spaces').innerHTML = D.espacios
    .map(
      (s, i) =>
        `<div class="space${i === 2 ? ' space--wide' : ''}"><b>${s[0]}</b><p>${s[1]}</p></div>`,
    )
    .join('');

  /* ---------- tradiciones ---------- */
  $('trads').innerHTML = D.tradiciones
    .map(
      (t, i) => `
      <button class="trad${t.pendiente ? ' trad--soon' : ''}${t.semaforo || t.senal ? ' trad--light' : ''}" type="button" data-i="${i}">
        ${
          t.semaforo
            ? '<span class="lights" aria-hidden="true"><i></i><i></i><i></i></span>'
            : t.senal
              ? SIGN
              : ''
        }
        <small>${t.corto}</small>
        <b>${t.nombre}</b>
        <span class="more">${t.pendiente ? 'Próximamente' : 'Ver más'}</span>
      </button>`,
    )
    .join('');
  $('trads').addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (!b) return;
    const t = D.tradiciones[+b.dataset.i];
    window.Modal.open({
      kicker: 'Tradición de Alchemist',
      title: t.nombre,
      sub: t.corto,
      body: t.texto,
      example: t.ejemplo,
    });
  });

  /* ---------- convivencia ---------- */
  $('inclusion').innerHTML =
    `<p>“${D.inclusion}”</p><cite>Alchemist · AIESEC en ESEN</cite>`;
})();
