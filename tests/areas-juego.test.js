// Pruebas de «¿Qué área lo hace?». Ejecutar: node tests/areas-juego.test.js
const assert = require('assert');
global.window = {};
require('../data/areas-juego.js');
const { crear } = require('../assets/js/areas-juego.js');
const { areas, tareas } = window.AREAS_JUEGO;
let ok = 0;
const test = (n, fn) => {
  fn();
  ok++;
  console.log('✓', n);
};

test('cada tarea apunta a un área que existe y cada área tiene tareas', () => {
  const ids = new Set(areas.map((a) => a[0]));
  tareas.forEach((t) => assert(ids.has(t[1]), t[0]));
  ids.forEach((id) => assert(tareas.filter((t) => t[1] === id).length >= 3, id));
});

test('10 preguntas sin repetir y con las 5 áreas', () => {
  for (let k = 0; k < 50; k++) {
    const j = crear(tareas);
    const ps = j.estado.preguntas;
    assert.strictEqual(ps.length, 10);
    assert.strictEqual(new Set(ps.map((p) => p.texto)).size, 10);
    assert.strictEqual(new Set(ps.map((p) => p.area)).size, 5);
  }
});

test('el puntaje cuenta solo aciertos y no se responde dos veces', () => {
  const j = crear(tareas);
  let esperado = 0;
  j.estado.preguntas.forEach((p, k) => {
    const resp = k % 3 === 0 ? 'x' : p.area;
    if (resp === p.area) esperado++;
    j.responder(resp);
    assert.strictEqual(j.responder(p.area), null);
    j.siguiente();
  });
  assert(j.terminado());
  assert.strictEqual(j.estado.puntos, esperado);
});

console.log(`\n${ok} pruebas pasaron`);
