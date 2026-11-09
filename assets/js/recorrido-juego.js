// Lógica de «Ordena el recorrido» (sin DOM, se puede probar con Node).
// Las etapas salen en desorden; se tocan en orden para armar la fila y luego se revisa.
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
  function crear(pasos, opciones) {
    const op = Object.assign({ azar: Math.random }, opciones);
    const n = pasos.length;
    const s = {};
    function reiniciar() {
      let orden;
      do orden = barajar([...Array(n).keys()], op.azar);
      while (n > 1 && orden.every((v, i) => v === i));
      s.mesa = orden; // índices (del orden correcto) que aún no se colocan
      s.fila = []; // índices colocados, en el orden que eligió la persona
      s.intentos = 0;
      s.revision = null; // [true/false] por posición después de revisar
    }
    reiniciar();
    return {
      estado: s,
      reiniciar,
      colocar(k) {
        const pos = s.mesa.indexOf(k);
        if (pos < 0) return false;
        s.mesa.splice(pos, 1);
        s.fila.push(k);
        s.revision = null;
        return true;
      },
      quitar(posFila) {
        if (posFila < 0 || posFila >= s.fila.length) return false;
        const [k] = s.fila.splice(posFila, 1);
        s.mesa.push(k);
        s.revision = null;
        return true;
      },
      completa: () => s.fila.length === n,
      revisar() {
        if (s.fila.length !== n) return null;
        s.intentos++;
        s.revision = s.fila.map((k, i) => k === i);
        return s.revision.every(Boolean);
      },
      // deja en la fila lo que va bien desde el inicio; lo demás vuelve a la mesa
      corregir() {
        if (!s.revision) return;
        let k = 0;
        while (k < s.fila.length && s.revision[k]) k++;
        s.fila = s.fila.slice(0, k);
        s.mesa = barajar([...Array(n).keys()].filter((x) => !s.fila.includes(x)), op.azar);
        s.revision = null;
      },
    };
  }
  const api = { crear };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.RecorridoJuego = api;
})(this);
