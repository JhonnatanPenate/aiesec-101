// Pruebas de la lógica del juego de los ODS. Ejecutar: node tests/ods-juego.test.js
const assert = require('assert');
const { crear } = require('../assets/js/ods-juego.js');

// ¿Tiene solución? (paridad de inversiones + fila del vacío, tablero 4x4)
function resoluble(t) {
  const v = t.filter((x) => x !== 0);
  let inv = 0;
  for (let i = 0; i < v.length; i++)
    for (let j = i + 1; j < v.length; j++) if (v[i] > v[j]) inv++;
  const filaDesdeAbajo = 4 - Math.floor(t.indexOf(0) / 4);
  return (inv + filaDesdeAbajo) % 2 === 1;
}

let ok = 0;
const test = (nombre, fn) => {
  fn();
  ok++;
  console.log('✓', nombre);
};

test('el tablero inicial siempre tiene solución y no viene resuelto', () => {
  for (let k = 0; k < 500; k++) {
    const j = crear();
    assert(resoluble(j.estado.tablero));
    assert(!j.estaOrdenado());
    assert.deepStrictEqual(
      [...j.estado.tablero].sort((a, b) => a - b),
      [...Array(16).keys()],
    );
  }
});

test('solo se mueven fichas adyacentes al vacío', () => {
  const j = crear();
  const e = j.vacio();
  for (let i = 0; i < 16; i++) {
    const antes = [...j.estado.tablero];
    const adyacente = j.vecinos(e).includes(i);
    assert.strictEqual(j.puedeMover(i), adyacente);
    if (!adyacente) {
      assert.strictEqual(j.mover(i), false);
      assert.deepStrictEqual(j.estado.tablero, antes);
    }
  }
  const m = j.estado.movimientos;
  assert(j.mover(j.vecinos(e)[0]));
  assert.strictEqual(j.estado.movimientos, m + 1);
});

test('el ODS 16 no se puede colocar antes de ordenar los 15', () => {
  const j = crear();
  assert.strictEqual(j.colocar16(15), false);
  assert.strictEqual(j.completar17(), false);
});

test('ordenar los 15 desbloquea el 16, que solo entra en la última casilla', () => {
  const j = crear();
  j._casiResuelto();
  assert(j.mover(15));
  assert.strictEqual(j.estado.etapa, 'colocar16');
  assert.strictEqual(j.mover(14), false, 'el tablero queda en pausa');
  assert.strictEqual(j.colocar16(3), false);
  assert(j.colocar16(15));
  assert.strictEqual(j.estado.tablero[15], 16);
  assert.strictEqual(j.estado.etapa, 'desbloquear17');
});

test('el 17 se revela solo después del 16 y termina la partida', () => {
  let t = 1000;
  const j = crear({ ahora: () => t });
  j._casiResuelto();
  j.mover(15);
  t = 5000;
  j.colocar16(15);
  assert(j.completar17());
  assert.strictEqual(j.estado.etapa, 'victoria');
  t = 9000;
  assert.strictEqual(j.tiempo(), 4000, 'el tiempo se congela al ganar');
});

test('jugar de nuevo reinicia todas las etapas', () => {
  const j = crear();
  j._casiResuelto();
  j.mover(15);
  j.colocar16(15);
  j.completar17();
  j.reiniciar();
  assert.strictEqual(j.estado.etapa, 'jugando');
  assert.strictEqual(j.estado.movimientos, 0);
  assert.strictEqual(j.tiempo(), 0);
  assert(!j.estado.tablero.includes(16));
});

test('las flechas mueven la ficha correcta', () => {
  const j = crear();
  j._casiResuelto(); // vacío en la casilla 14
  assert(j.moverDireccion('izquierda')); // entra la ficha de la derecha (15)
  assert.strictEqual(j.estado.etapa, 'colocar16');
});

console.log(`\n${ok} pruebas pasaron`);
