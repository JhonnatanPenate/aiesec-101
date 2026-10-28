// Página Cultura: historia, Edrik, valores, espacios, tradiciones y convivencia.
(function () {
  'use strict';
  const D = window.CULTURA;
  const $ = (s) => document.getElementById(s);
  // ícono de la señal: puño con pulgar y meñique estirados, con muñeca
  const SIGN = `<svg class="sign" viewBox="0 0 64 64" aria-hidden="true">
      <g fill="currentColor" stroke="var(--charcoal)" stroke-width="2" stroke-linejoin="round">
        <path d="M24 60 L24 48 L40 48 L40 60 Z"/>
        <path d="M18 32 C14 26 8 20 6 14 C5 10 9 8 12 10 C16 14 20 20 24 24 Z"/>
        <path d="M40 26 L44 8 C45 4 51 5 50 9 L46 30 Z"/>
        <path d="M18 26 C18 22 22 21 24 24 L40 24 C44 24 47 27 47 31 L47 42 C47 47 43 50 38 50 L26 50 C21 50 18 46 18 41 Z"/>
      </g>
      <path d="M25 30 h15 M25 36 h15 M25 42 h15" stroke="var(--charcoal)" stroke-width="2" stroke-linecap="round"/>
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
