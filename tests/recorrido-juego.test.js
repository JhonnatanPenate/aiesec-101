// Pruebas de «Ordena el recorrido». Ejecutar: node tests/recorrido-juego.test.js
const assert = require('assert');
global.window = {};
require('../data/recorrido-juego.js');
const { crear } = require('../assets/js/recorrido-juego.js');
const R = window.RECORRIDOS;
let ok = 0;
const test = (n, fn) => {
  fn();
  ok++;
  console.log('✓', n);
};

test('nunca empieza ya ordenado', () => {
  for (const r of R)
    for (let k = 0; k < 200; k++) {
      const j = crear(r.pasos);
      assert(!j.estado.mesa.every((v, i) => v === i));
      assert.strictEqual(j.estado.mesa.length, r.pasos.length);
    }
});

test('colocar en orden y revisar da correcto', () => {
  const j = crear(R[0].pasos);
  assert.strictEqual(j.revisar(), null, 'no se revisa incompleto');
  for (let i = 0; i < R[0].pasos.length; i++) assert(j.colocar(i));
  assert(j.completa());
  assert.strictEqual(j.revisar(), true);
  assert.strictEqual(j.estado.intentos, 1);
});

test('un error se marca y corregir deja solo lo bueno del inicio', () => {
  const j = crear(R[1].pasos);
  const n = R[1].pasos.length;
  [0, 1, 3, 2, 4, 5, 6].forEach((k) => j.colocar(k));
  assert.strictEqual(j.revisar(), false);
  assert.deepStrictEqual(j.estado.revision, [true, true, false, false, true, true, true]);
  j.corregir();
  assert.deepStrictEqual(j.estado.fila, [0, 1]);
  assert.strictEqual(j.estado.mesa.length, n - 2);
});

test('quitar devuelve la etapa a la mesa', () => {
  const j = crear(R[0].pasos);
  j.colocar(j.estado.mesa[0]);
  const k = j.estado.fila[0];
  assert(j.quitar(0));
  assert(j.estado.mesa.includes(k));
  assert.strictEqual(j.estado.fila.length, 0);
});

console.log(`\n${ok} pruebas pasaron`);
