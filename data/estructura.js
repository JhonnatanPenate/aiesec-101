// Contenido de la página Estructura.
window.ESTRUCTURA = {
  global: [
    {
      corto: 'AI',
      nombre: 'AIESEC International',
      nivel: 'Global',
      texto:
        'La oficina global. Define la estrategia de toda la red, los programas y los estándares que siguen todos los países.',
      ejemplo:
        'Define cómo funcionan Global Volunteer, Global Talent y Global Teacher en todos los países.',
    },
    {
      corto: 'MC',
      nombre: 'Member Committee',
      nivel: 'Nacional',
      texto:
        'La oficina nacional: AIESEC en El Salvador. Acompaña a los comités locales del país y los conecta con la red global.',
      ejemplo:
        'Organiza SalvaAcademy para que todos los miembros del país aprendan lo mismo.',
    },
    {
      corto: 'LC',
      nombre: 'Local Committee',
      nivel: 'Local',
      texto:
        'El comité local. Trabaja desde una o varias universidades y es donde vives tu experiencia como miembro.',
      ejemplo: 'AIESEC en ESEN, con miembros de ESEN, UCA, UGB y UNIVO.',
    },
  ],

  nacional: {
    mc: [
      ['Yarely Rojas', 'MCP', ['MXP', 'F&L', 'OD']],
      ['Adonay Aguilar', 'MCVP', ['OGX', 'ICX']],
      ['Valeria Montaño', 'MCVP', ['MKT', 'PR', 'BD']],
    ],
    comites: ['AIESEC en ESEN', 'AIESEC en Zona Central'],
    nota: 'Hoy el MC tiene 3 personas y cada una lleva varias áreas a nivel nacional.',
  },

  local: {
    lcp: {
      titulo: 'LCP',
      nombre: 'Local Committee President',
      texto:
        'Lidera al EB, define la dirección del comité y lo representa ante el MC.',
      ejemplo:
        'Junto con los VPs define las metas del ciclo y da seguimiento a cada área.',
    },
    niveles: {
      LCVP: 'Lidera un área del comité y forma parte del EB. Responde por los resultados y por el equipo de su área.',
      Manager:
        'Lidera un equipo dentro del área: organiza el trabajo, acompaña a sus miembros y da seguimiento a las metas.',
      'Team Member':
        'Hace el trabajo del área junto a su equipo y aprende haciendo.',
    },
    areas: [
      {
        id: 'mxp',
        nombre: 'MXP',
        largo: 'Membership eXperience Program',
        foco: 'la experiencia, el desarrollo y el bienestar de los miembros',
        ejemplo: 'Organizar la bienvenida de los newbies y acompañar sus PDPs.',
      },
      {
        id: 'fl',
        nombre: 'F&L',
        largo: 'Finance & Legality',
        foco: 'las finanzas y la legalidad del comité',
        ejemplo:
          'Llevar el presupuesto de una actividad y rendir cuentas al EB.',
      },
      {
        id: 'icx',
        nombre: 'ICX',
        largo: 'Incoming Exchange',
        foco: 'recibir a jóvenes de otros países en El Salvador',
        ejemplo:
          'Buscar proyectos locales que reciban voluntarios y acompañar a los EPs durante su estadía.',
      },
      {
        id: 'ogx',
        nombre: 'OGX',
        largo: 'Outgoing Exchange',
        foco: 'enviar a jóvenes salvadoreños a otros países',
        ejemplo:
          'Asesorar a un estudiante que quiere hacer voluntariado afuera hasta que viaja.',
      },
      {
        id: 'mkt',
        nombre: 'MKT',
        largo: 'Marketing',
        foco: 'la marca, las redes sociales y la comunicación del comité',
        ejemplo:
          'Planear el contenido del mes para atraer jóvenes a los programas.',
        sub: [
          {
            nombre: 'PR',
            largo: 'Public Relations',
            texto:
              'Relaciones públicas: universidades, aliados e imagen del comité. En nuestro comité es parte de MKT.',
            ejemplo:
              'Coordinar con una universidad un espacio para dar a conocer AIESEC.',
          },
          {
            nombre: 'B2B',
            largo: 'Business to Business',
            texto:
              'Relación con empresas y aliados. En nuestro comité es parte de MKT.',
            ejemplo:
              'Presentar a una empresa cómo puede recibir practicantes de Global Talent.',
          },
        ],
      },
    ],
  },

  comite: {
    tipos: [
      {
        titulo: 'Comité local',
        texto:
          'Tiene su propio equipo directivo (EB), sus metas y su lugar dentro de AIESEC en El Salvador.',
      },
      {
        titulo: 'Expansión',
        texto:
          'Una universidad o zona donde un comité ya tiene miembros, pero que aún no es comité propio. Sus miembros son parte del comité que la acompaña.',
      },
    ],
    camino: [
      [
        'Llegan los primeros miembros',
        'Estudiantes de esa universidad entran a un comité que ya existe.',
      ],
      [
        'Crece la comunidad',
        'Se forman líderes, se hacen actividades y se suman más personas.',
      ],
      [
        'Nace el comité propio',
        'Con suficientes miembros y líderes, la expansión se vuelve un comité local.',
      ],
    ],
    ejemplo:
      'Si estudias en la UGB y entras hoy a AIESEC, eres miembro de AIESEC en ESEN, porque la UGB es una expansión de nuestro comité. La meta es que en 2027 la UGB tenga su propio comité.',
  },

  // coordenadas aproximadas [longitud, latitud]
  mapa: [
    {
      id: 'esen',
      nombre: 'ESEN',
      largo: 'Escuela Superior de Economía y Negocios',
      lugar: 'Zona central',
      coord: [-89.29, 13.66],
      estado: 'Sede del comité',
      tipo: 'sede',
      texto:
        'Aquí nació AIESEC en ESEN, el comité que hoy reúne a miembros de cuatro universidades.',
      lado: 'izq',
    },
    {
      id: 'uca',
      nombre: 'UCA',
      largo: 'Universidad Centroamericana José Simeón Cañas',
      lugar: 'Zona central',
      coord: [-89.235, 13.68],
      estado: 'Expansión de AIESEC en ESEN',
      tipo: 'expansion',
      texto: 'Sus miembros son parte de AIESEC en ESEN.',
      lado: 'der',
    },
    {
      id: 'ugb',
      nombre: 'UGB',
      largo: 'Universidad Gerardo Barrios',
      lugar: 'San Miguel',
      coord: [-88.2, 13.47],
      estado: 'Expansión · meta: comité propio en 2027',
      tipo: 'expansion',
      meta: true,
      texto:
        'Sus miembros son parte de AIESEC en ESEN mientras se forma su propio comité.',
      lado: 'izq',
    },
    {
      id: 'univo',
      nombre: 'UNIVO',
      largo: 'Universidad de Oriente',
      lugar: 'San Miguel',
      coord: [-88.16, 13.49],
      estado: 'Expansión de AIESEC en ESEN',
      tipo: 'expansion',
      texto: 'Sus miembros son parte de AIESEC en ESEN.',
      lado: 'der',
    },
  ],
};
