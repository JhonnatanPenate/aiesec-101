// Lógica del rompecabezas «Juega con los ODS» (sin DOM, se puede probar con Node).
// Tablero 4x4: casillas 0..15, valor = número de ODS (1..15) y 0 = casilla vacía.
// Etapas: 'jugando' → 'colocar16' → 'desbloquear17' → 'victoria'.
(function (root) {
  'use strict';
  const N = 4;
  const TOTAL = N * N;
  const resuelto = () => [...Array(TOTAL - 1)].map((_, i) => i + 1).concat(0);

  // casillas vecinas (arriba, abajo, izquierda, derecha) de una posición
  function vecinos(i) {
    const r = Math.floor(i / N);
    const c = i % N;
    const v = [];
    if (r > 0) v.push(i - N);
    if (r < N - 1) v.push(i + N);
    if (c > 0) v.push(i - 1);
    if (c < N - 1) v.push(i + 1);
    return v;
  }

  function crear(opciones) {
    const op = Object.assign(
      { mezcla: 80, azar: Math.random, ahora: () => Date.now() },
      opciones,
    );
    const s = {};

    function reiniciar() {
      s.etapa = 'jugando';
      s.tablero = resuelto();
      s.movimientos = 0;
      s.inicio = null;
      s.fin = null;
      mezclar(op.mezcla);
      return s;
    }

    // Mezcla con movimientos legales desde la solución: siempre tiene solución.
    function mezclar(k) {
      let previo = -1;
      do {
        for (let n = 0; n < k; n++) {
          const vacio = s.tablero.indexOf(0);
          const opciones = vecinos(vacio).filter((x) => x !== previo);
          const elegido = opciones[Math.floor(op.azar() * opciones.length)];
          s.tablero[vacio] = s.tablero[elegido];
          s.tablero[elegido] = 0;
          previo = vacio;
        }
      } while (estaOrdenado());
    }

    const vacio = () => s.tablero.indexOf(0);
    const puedeMover = (i) =>
      s.etapa === 'jugando' && vecinos(vacio()).includes(i);
    const estaOrdenado = () =>
      s.tablero.every((v, i) => v === (i === TOTAL - 1 ? 0 : i + 1));

    // Mueve la ficha de la casilla i al espacio vacío si es adyacente.
    function mover(i) {
      if (!puedeMover(i)) return false;
      if (s.inicio === null) s.inicio = op.ahora();
      const e = vacio();
      s.tablero[e] = s.tablero[i];
      s.tablero[i] = 0;
      s.movimientos++;
      if (estaOrdenado()) s.etapa = 'colocar16';
      return true;
    }

    // Mover con flechas: la ficha que está del lado contrario entra al vacío.
    function moverDireccion(dir) {
      const e = vacio();
      const r = Math.floor(e / N);
      const c = e % N;
      const desde = {
        arriba: r < N - 1 ? e + N : -1,
        abajo: r > 0 ? e - N : -1,
        izquierda: c < N - 1 ? e + 1 : -1,
        derecha: c > 0 ? e - 1 : -1,
      }[dir];
      return desde >= 0 ? mover(desde) : false;
    }

    // Etapa 2: el ODS 16 solo entra en la última casilla vacía.
    function colocar16(i) {
      if (s.etapa !== 'colocar16' || i !== TOTAL - 1 || s.tablero[i] !== 0)
        return false;
      s.tablero[i] = 16;
      s.etapa = 'desbloquear17';
      return true;
    }

    // Etapa 3: el ODS 17 se revela fuera del tablero.
    function completar17() {
      if (s.etapa !== 'desbloquear17') return false;
      s.etapa = 'victoria';
      s.fin = op.ahora();
      return true;
    }

    const tiempo = () =>
      s.inicio === null ? 0 : (s.fin === null ? op.ahora() : s.fin) - s.inicio;

    reiniciar();
    return {
      N,
      estado: s,
      vecinos,
      vacio,
      puedeMover,
      mover,
      moverDireccion,
      estaOrdenado,
      colocar16,
      completar17,
      tiempo,
      reiniciar,
      // solo para pruebas: dejar el tablero a un movimiento de la solución
      _casiResuelto() {
        s.etapa = 'jugando';
        s.tablero = resuelto();
        s.tablero[TOTAL - 1] = 15;
        s.tablero[TOTAL - 2] = 0;
        return s;
      },
    };
  }

  const api = { crear, vecinos };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.OdsJuego = api;
})(this);
