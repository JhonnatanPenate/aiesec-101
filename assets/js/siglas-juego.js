// Lógica de los juegos de siglas (sin DOM, se puede probar con Node).
// Match: unir cada sigla con su significado. ¿Real o no?: decidir si una sigla existe.
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

  // Siglas reales del diccionario: solo las que son sigla (2-6 caracteres) y tienen nombre.
  function siglasReales(diccionario) {
    const vistas = new Set();
    const out = [];
    for (const cat of diccionario) {
      for (const [sigla, nombre, texto] of cat.terminos) {
        if (!/^[A-Za-z0-9&]{2,6}$/.test(sigla)) continue;
        if (!nombre || nombre === sigla || vistas.has(sigla)) continue;
        vistas.add(sigla);
        out.push({ sigla, nombre, texto, categoria: cat.categoria });
      }
    }
    return out;
  }

  // Match: n pares; la columna derecha va en otro orden.
  function crearMatch(reales, opciones) {
    const op = Object.assign({ n: 6, azar: Math.random, ahora: () => Date.now() }, opciones);
    const s = {};
    function reiniciar() {
      s.pares = barajar(reales, op.azar).slice(0, op.n);
      s.derecha = barajar(s.pares.map((_, i) => i), op.azar);
      s.hechos = new Set();
      s.errores = 0;
      s.inicio = null;
      s.fin = null;
    }
    reiniciar();
    return {
      estado: s,
      reiniciar,
      // i = índice de la sigla, j = índice del significado (en el orden de pares)
      intentar(i, j) {
        if (s.fin !== null || s.hechos.has(i)) return false;
        if (s.inicio === null) s.inicio = op.ahora();
        if (i === j) {
          s.hechos.add(i);
          if (s.hechos.size === s.pares.length) s.fin = op.ahora();
          return true;
        }
        s.errores++;
        return false;
      },
      terminado: () => s.fin !== null,
      tiempo: () => (s.inicio === null ? 0 : (s.fin ?? op.ahora()) - s.inicio),
    };
  }

  // ¿Real o no?: n preguntas mezclando reales e inventadas (más o menos mitad y mitad).
  function crearRealONo(reales, falsas, opciones) {
    const op = Object.assign({ n: 10, azar: Math.random }, opciones);
    const existentes = new Set(reales.map((r) => r.sigla.toUpperCase()));
    const inventadas = falsas.filter(([s]) => !existentes.has(s.toUpperCase()));
    const s = {};
    function reiniciar() {
      const nFalsas = Math.min(inventadas.length, Math.floor(op.n / 2));
      const nReales = Math.min(reales.length, op.n - nFalsas);
      const r = barajar(reales, op.azar)
        .slice(0, nReales)
        .map((x) => ({ sigla: x.sigla, real: true, nombre: x.nombre, texto: x.texto }));
      const f = barajar(inventadas, op.azar)
        .slice(0, nFalsas)
        .map(([sigla, nombre]) => ({ sigla, real: false, nombre }));
      s.preguntas = barajar(r.concat(f), op.azar);
      s.actual = 0;
      s.puntos = 0;
      s.respuestas = [];
    }
    reiniciar();
    return {
      estado: s,
      reiniciar,
      pregunta: () => s.preguntas[s.actual] || null,
      // devuelve true si acertó; avanza con siguiente()
      responder(esReal) {
        const p = s.preguntas[s.actual];
        if (!p || s.respuestas.length > s.actual) return null;
        const ok = p.real === esReal;
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

  const api = { barajar, siglasReales, crearMatch, crearRealONo };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SiglasJuego = api;
})(this);
