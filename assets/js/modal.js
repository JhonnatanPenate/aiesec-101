// Modal reutilizable con animación rápida.
// Uso: Modal.open({ kicker, title, sub, body, example })
//   - body: texto o arreglo de párrafos
//   - example: texto opcional que aparece en un recuadro "Ejemplo"
//   - people: lista opcional [[nombre, rol]] con peopleTitle; bento: true para verlos por nivel
(function () {
  'use strict';
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

  const initials = (n) =>
    n
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('');

  let current = null;
  let lastFocus = null;

  function close() {
    if (!current) return;
    const el = current;
    current = null;
    el.classList.add('closing');
    const done = () => {
      el.remove();
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    reduce ? done() : setTimeout(done, 160);
  }

  function open(data) {
    if (current) current.remove();
    lastFocus = document.activeElement;
    const paras = [].concat(data.body || []);
    const el = document.createElement('div');
    el.className = 'modal';
    el.innerHTML = `
      <div class="modal__backdrop" data-close></div>
      <div class="modal__box" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <button class="modal__close" type="button" aria-label="Cerrar" data-close>×</button>
        ${data.kicker ? `<p class="modal__kicker">${esc(data.kicker)}</p>` : ''}
        <h2 class="modal__title" id="modalTitle">${esc(data.title)}</h2>
        ${data.sub ? `<p class="modal__sub">${esc(data.sub)}</p>` : ''}
        <div class="modal__body">${paras.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
        ${data.example ? `<div class="modal__example"><b>Ejemplo</b>${esc(data.example)}</div>` : ''}
        ${
          data.bento && data.people && data.people.length
            ? `<div class="team-bento">
                <b class="team-bento__t">${esc(data.peopleTitle || 'Equipo')} · ${data.people.length}</b>
                ${['LCVP', 'Manager', 'Team Member']
                  .map((nivel) => {
                    const gente = data.people.filter((p) =>
                      p[1].startsWith(nivel),
                    );
                    if (!gente.length) return '';
                    return `<div class="team-bento__row team-bento__row--${nivel.split(' ')[0].toLowerCase()}">${gente
                      .map(
                        (p) =>
                          `<div class="team-bento__card"><span class="avatar">${esc(initials(p[0]))}</span><strong>${esc(p[0])}</strong><small>${esc(p[1])}</small></div>`,
                      )
                      .join('')}</div>`;
                  })
                  .join('')}
              </div>`
            : ''
        }
        ${
          !data.bento && data.people && data.people.length
            ? `<div class="modal__people">
                <b>${esc(data.peopleTitle || 'Quiénes')} · ${data.people.length}</b>
                <ul>${data.people
                  .map(
                    (p) =>
                      `<li><span class="avatar">${esc(initials(p[0]))}</span><span><strong>${esc(p[0])}</strong>${p[1] ? `<small>${esc(p[1])}</small>` : ''}</span></li>`,
                  )
                  .join('')}</ul>
              </div>`
            : ''
        }
      </div>`;
    el.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) close();
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {
        const f = el.querySelectorAll('button, a[href]');
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
    document.body.appendChild(el);
    document.body.style.overflow = 'hidden';
    current = el;
    el.querySelector('.modal__close').focus();
  }

  window.Modal = { open, close };
})();
