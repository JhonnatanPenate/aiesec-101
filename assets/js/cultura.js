// Página Cultura: historia, Edrik, valores, espacios, tradiciones y convivencia.
(function () {
  'use strict';
  const D = window.CULTURA;
  const $ = (s) => document.getElementById(s);
  // ícono de la señal: persona de perfil con el brazo arriba, pulgar en la frente y meñique corto
  const SIGN = `<svg class="sign" viewBox="0 0 72 64" aria-hidden="true">
      <g fill="currentColor">
        <path d="M22 5 C13 5 8 12 8 20 C8 26 10 30 13 33 L13 41 L25 41 L25 37 C28 37 31 36 31 33 L31 30 L34 28.5 L31.5 24 C32 21 32 19 31.5 17 C30 9 27 5 22 5 Z"/>
        <rect x="13" y="38" width="12" height="9"/>
        <path d="M2 64 C2 52 8 45 19 45 C30 45 37 50 39 56 L41 64 Z"/>
      </g>
      <g fill="currentColor" stroke="var(--charcoal)" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">
        <path d="M33 60 L52 40 L46 22 L40 24 L44 39 L28 54 Z"/>
        <path d="M38 13 C38 10 40 9 43 9 L49 9 C52 9 54 11 54 14 L54 22 C54 25 52 27 49 27 L43 27 C40 27 38 25 38 22 Z"/>
        <path d="M39 15 L33 15 C31 15 31 19 33 19 L39 19 Z"/>
        <path d="M50 10 L52 4.5 C52.6 3 55 3.6 54.6 5.2 L53.4 10.5 Z"/>
      </g>
      <path d="M41 16 h11 M41 20.5 h11" stroke="var(--charcoal)" stroke-width="1.4" stroke-linecap="round"/>
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
