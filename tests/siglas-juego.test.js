// Pruebas de los juegos de siglas. Ejecutar: node tests/siglas-juego.test.js
const assert = require('assert');
global.window = {};
require('../data/diccionario.js');
require('../data/siglas-juego.js');
const J = require('../assets/js/siglas-juego.js');
const reales = J.siglasReales(window.DICCIONARIO);
const falsas = window.SIGLAS_FALSAS;

let ok = 0;
const test = (nombre, fn) => {
  fn();
  ok++;
  console.log('✓', nombre);
};

test('solo entran siglas reales con nombre y sin repetir', () => {
  assert(reales.length >= 30);
  const s = reales.map((r) => r.sigla);
  assert.strictEqual(new Set(s).size, s.length);
  reales.forEach((r) => assert(r.nombre && r.nombre !== r.sigla));
});

test('ninguna sigla inventada existe en el diccionario', () => {
  const existentes = new Set(reales.map((r) => r.sigla.toUpperCase()));
  falsas.forEach(([s]) => assert(!existentes.has(s.toUpperCase()), s));
});

test('match: solo se aciertan los pares correctos y termina al completar', () => {
  let t = 0;
  const m = J.crearMatch(reales, { ahora: () => t });
  const n = m.estado.pares.length;
  assert.strictEqual(n, 6);
  assert.strictEqual(m.intentar(0, 1), false);
  assert.strictEqual(m.estado.errores, 1);
  for (let i = 0; i < n; i++) {
    t += 1000;
    assert(m.intentar(i, i));
  }
  assert(m.terminado());
  assert.strictEqual(m.intentar(0, 0), false, 'no se repite');
  t += 5000;
  assert.strictEqual(m.tiempo(), 6000, 'el tiempo se congela al terminar');
});

test('match: cada partida trae pares distintos', () => {
  const vistas = new Set();
  for (let k = 0; k < 20; k++) {
    const m = J.crearMatch(reales);
    vistas.add(m.estado.pares.map((p) => p.sigla).join());
  }
  assert(vistas.size > 1);
});

test('¿real o no?: 10 preguntas, mitad inventadas, puntaje correcto', () => {
  const r = J.crearRealONo(reales, falsas);
  const ps = r.estado.preguntas;
  assert.strictEqual(ps.length, 10);
  assert.strictEqual(ps.filter((p) => !p.real).length, 5);
  let esperado = 0;
  ps.forEach((p, k) => {
    const resp = k % 2 === 0 ? p.real : !p.real;
    if (resp === p.real) esperado++;
    assert.strictEqual(r.responder(resp), resp === p.real);
    assert.strictEqual(r.responder(true), null, 'no se responde dos veces');
    r.siguiente();
  });
  assert(r.terminado());
  assert.strictEqual(r.estado.puntos, esperado);
});

console.log(`\n${ok} pruebas pasaron`);
