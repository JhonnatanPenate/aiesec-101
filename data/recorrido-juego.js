// Recorridos del juego «Ordena el recorrido».
// El del intercambio sale de la página Áreas; el del miembro es el orden de MXP en ESEN.
window.RECORRIDOS = [
  {
    id: 'ep',
    titulo: 'Intercambio',
    sub: 'Del registro al cierre',
    pasos: [
      ['SU', 'Signed up', 'Se registra en aiesec.org.'],
      ['APL', 'Applied', 'Aplica a una oportunidad.'],
      ['ACC', 'Accepted', 'La oportunidad lo acepta.'],
      ['APD', 'Approved', 'Su intercambio queda aprobado.'],
      ['RE', 'Realized', 'Está viviendo su intercambio.'],
      ['FIN', 'Finished', 'Terminó su intercambio.'],
      ['CO', 'Completed', 'Cierra el proceso con su evaluación.'],
    ],
  },
  {
    id: 'miembro',
    titulo: 'Miembro',
    sub: 'De que entras a tu siguiente rol',
    pasos: [
      ['1', 'Reclutamiento', 'Conoces AIESEC y aplicas para ser miembro.'],
      ['2', 'Carta de compromiso', 'Confirmas que entras al comité.'],
      ['3', 'JD', 'Recibes tu rol: qué haces y tus KPIs.'],
      ['4', 'LEC', 'Aprendes lo básico con AIESEC 101.'],
      ['5', 'NEC', 'Sigues con el ciclo nacional en SalvaAcademy.'],
      ['6', 'PDP y O2O', 'Defines tus metas y las revisas con tu líder.'],
      ['7', 'Siguiente rol', 'Das el siguiente paso: liderar, un OC o un intercambio.'],
    ],
  },
];
