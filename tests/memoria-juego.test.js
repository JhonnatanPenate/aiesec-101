// Pruebas de «Memoria Alchemist». Ejecutar: node tests/memoria-juego.test.js
const assert = require('assert');
global.window = {};
require('../data/memoria.js');
const { crear } = require('../assets/js/memoria-juego.js');
const { fijos, valores } = window.MEMORIA;

let ok = 0;
const test = (nombre, fn) => {
  fn();
  ok++;
  console.log('✓', nombre);
};
const posiciones = (j, id) => j.estado.cartas.map((c, i) => (c === id ? i : -1)).filter((i) => i >= 0);

test('16 cartas: 8 pares, con Edrik, la roca y Alchemist siempre', () => {
  const j = crear(fijos, valores);
  assert.strictEqual(j.estado.cartas.length, 16);
  const ids = new Set(j.estado.cartas);
  assert.strictEqual(ids.size, 8);
  ['edrik', 'roca', 'alchemist'].forEach((id) => assert(ids.has(id)));
  ids.forEach((id) => assert.strictEqual(posiciones(j, id).length, 2));
});

test('dos distintas no se quedan y hay que ocultarlas antes de seguir', () => {
  const j = crear(fijos, valores);
  const c = j.estado.cartas;
  const b = c.findIndex((x) => x !== c[0]);
  assert.strictEqual(j.voltear(0), 'abierta');
  assert.strictEqual(j.voltear(0), null, 'la misma carta no cuenta dos veces');
  assert.strictEqual(j.voltear(b), 'distintas');
  const libre = c.findIndex((_, i) => i !== 0 && i !== b);
  assert.strictEqual(j.voltear(libre), null);
  j.ocultar();
  assert(!j.visible(0) && !j.visible(b));
  assert.strictEqual(j.estado.movimientos, 1);
});

test('encontrar todos los pares termina el juego y congela el tiempo', () => {
  let t = 0;
  const j = crear(fijos, valores, { ahora: () => t });
  for (const st of j.estado.stickers) {
    const [a, b] = posiciones(j, st.id);
    t += 1000;
    j.voltear(a);
    assert.strictEqual(j.voltear(b), 'par');
  }
  assert(j.terminado());
  assert.strictEqual(j.estado.movimientos, 8);
  t += 9999;
  assert.strictEqual(j.tiempo(), 7000);
  assert.strictEqual(j.voltear(0), null);
});

test('jugar de nuevo baraja y reinicia', () => {
  const j = crear(fijos, valores);
  j.voltear(0);
  j.reiniciar();
  assert.strictEqual(j.estado.movimientos, 0);
  assert.strictEqual(j.estado.abiertas.length, 0);
  assert.strictEqual(j.estado.encontradas.size, 0);
});

console.log(`\n${ok} pruebas pasaron`);
