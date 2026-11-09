// Lógica de «Memoria Alchemist» (sin DOM, se puede probar con Node).
// Cartas boca abajo; se voltean de dos en dos; si son iguales se quedan.
(function (root) {
  'use strict';
  function barajar(lista, azar) {
    const a = lista.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(azar() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // fijos siempre entran; los que falten salen al azar de extra
  function crear(fijos, extra, opciones) {
    const op = Object.assign({ pares: 8, azar: Math.random, ahora: () => Date.now() }, opciones);
    const s = {};
    function reiniciar() {
      const elegidos = fijos.concat(barajar(extra, op.azar)).slice(0, op.pares);
      s.stickers = elegidos;
      s.cartas = barajar(elegidos.concat(elegidos).map((st) => st.id), op.azar);
      s.encontradas = new Set(); // ids de sticker ya emparejados
      s.abiertas = []; // posiciones volteadas en este turno (máx. 2)
      s.movimientos = 0;
      s.inicio = null;
      s.fin = null;
    }
    reiniciar();
    const api = {
      estado: s,
      reiniciar,
      // 'abierta' (primera del turno) · 'par' · 'distintas' (hay que ocultar) · null si no se puede
      voltear(i) {
        if (s.fin !== null || i < 0 || i >= s.cartas.length) return null;
        if (s.abiertas.length === 2) return null; // primero hay que ocultar
        if (s.abiertas.includes(i) || s.encontradas.has(s.cartas[i])) return null;
        if (s.inicio === null) s.inicio = op.ahora();
        s.abiertas.push(i);
        if (s.abiertas.length === 1) return 'abierta';
        s.movimientos++;
        const [a, b] = s.abiertas;
        if (s.cartas[a] === s.cartas[b]) {
          s.encontradas.add(s.cartas[a]);
          s.abiertas = [];
          if (s.encontradas.size === s.stickers.length) s.fin = op.ahora();
          return 'par';
        }
        return 'distintas';
      },
      ocultar() {
        s.abiertas = [];
      },
      visible: (i) => s.abiertas.includes(i) || s.encontradas.has(s.cartas[i]),
      terminado: () => s.fin !== null,
      tiempo: () => (s.inicio === null ? 0 : (s.fin ?? op.ahora()) - s.inicio),
    };
    return api;
  }

  const api = { crear };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.MemoriaJuego = api;
})(this);
