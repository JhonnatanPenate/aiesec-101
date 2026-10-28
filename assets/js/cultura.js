// Página Cultura: historia, Edrik, valores, espacios, tradiciones y convivencia.
(function () {
  'use strict';
  const D = window.CULTURA;
  const $ = (s) => document.getElementById(s);
  // ícono de la señal: puño con pulgar y meñique estirados
  const SIGN = `<svg class="sign" viewBox="0 0 64 64" aria-hidden="true">
      <line x1="22" y1="32" x2="10" y2="15" stroke="currentColor" stroke-width="9" stroke-linecap="round"/>
      <line x1="43" y1="31" x2="53" y2="15" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>
      <rect x="17" y="26" width="30" height="24" rx="8" fill="currentColor"/>
      <path d="M26 26v8M32 26v8M38 26v8" stroke="var(--charcoal)" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M22 40c4 3 14 3 20 0" stroke="var(--charcoal)" stroke-width="2" fill="none" stroke-linecap="round"/>
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
