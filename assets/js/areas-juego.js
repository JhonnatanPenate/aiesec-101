// Lógica de «¿Qué área lo hace?» (sin DOM, se puede probar con Node).
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
  // n tareas repartidas entre todas las áreas
  function crear(tareas, opciones) {
    const op = Object.assign({ n: 10, azar: Math.random }, opciones);
    const s = {};
    function reiniciar() {
      const porArea = {};
      barajar(tareas, op.azar).forEach((t) => (porArea[t[1]] = porArea[t[1]] || []).push(t));
      const grupos = Object.values(porArea);
      const elegidas = [];
      for (let k = 0; elegidas.length < Math.min(op.n, tareas.length); k++)
        grupos.forEach((g) => g[k] && elegidas.length < op.n && elegidas.push(g[k]));
      s.preguntas = barajar(elegidas, op.azar).map(([texto, area, porque]) => ({ texto, area, porque }));
      s.actual = 0;
      s.puntos = 0;
      s.respuestas = [];
    }
    reiniciar();
    return {
      estado: s,
      reiniciar,
      pregunta: () => s.preguntas[s.actual] || null,
      responder(area) {
        const p = s.preguntas[s.actual];
        if (!p || s.respuestas.length > s.actual) return null;
        const ok = p.area === area;
        if (ok) s.puntos++;
        s.respuestas.push(ok);
        return ok;
      },
      siguiente() {
        if (s.respuestas.length > s.actual) s.actual++;
        return s.actual < s.preguntas.length;
      },
      terminado: () => s.actual >= s.preguntas.length,
    };
  }
  const api = { crear };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.AreasJuego = api;
})(this);
