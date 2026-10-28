// Mini-quiz de cada módulo: 3 preguntas, se aprueba con 2 correctas.
// Cada pregunta: q (pregunta), ok (respuesta correcta), no (3 incorrectas), por (explicación)
window.QUIZZES = {
  aprobar: 2,
  modulos: {
    aprende: [
      {
        q: '¿En qué año se fundó AIESEC?',
        ok: '1948',
        no: ['1998', '1965', '1980'],
        por: 'AIESEC nació en 1948, después de la Segunda Guerra Mundial, para construir paz entre jóvenes de distintos países.',
      },
      {
        q: '¿Qué programa es de prácticas profesionales en otro país?',
        ok: 'Global Talent',
        no: ['Global Volunteer', 'Global Teacher', 'EwA'],
        por: 'Global Talent (GTa) son prácticas profesionales; Global Volunteer es voluntariado y Global Teacher es enseñanza.',
      },
      {
        q: '¿Para qué sirve EXPA?',
        ok: 'Para administrar miembros, roles, oportunidades e intercambios',
        no: [
          'Para que cualquier joven busque y aplique a un intercambio',
          'Para chatear con el comité',
          'Para publicar en redes sociales',
        ],
        por: 'EXPA es la plataforma interna de los miembros. La que usan los jóvenes para aplicar es aiesec.org.',
      },
    ],
    diccionario: [
      {
        q: '¿Qué significa LCVP?',
        ok: 'Local Committee Vice President',
        no: [
          'Local Committee Volunteer Program',
          'Leadership Committee Vice President',
          'Local Council Vice Partner',
        ],
        por: 'El LCVP lidera un área del comité local y forma parte del EB.',
      },
      {
        q: '¿Qué es un PDP?',
        ok: 'Tu plan de desarrollo personal',
        no: [
          'La descripción de tu rol',
          'Un indicador de resultados',
          'La plataforma de intercambios',
        ],
        por: 'PDP es Personal Development Plan: qué quieres aprender y cómo. La descripción del rol es el JD.',
      },
      {
        q: '¿Quién es un EP?',
        ok: 'La persona que hace un intercambio',
        no: [
          'El presidente del comité',
          'Un miembro del equipo de MKT',
          'Una empresa aliada',
        ],
        por: 'EP significa Exchange Participant: quien vive un intercambio con AIESEC.',
      },
    ],
    estructura: [
      {
        q: '¿Qué es el MC?',
        ok: 'La oficina nacional, AIESEC en El Salvador',
        no: [
          'La oficina global de AIESEC',
          'Nuestro comité local',
          'El equipo que organiza una conferencia',
        ],
        por: 'MC es Member Committee: acompaña a los comités locales del país. La oficina global es AI.',
      },
      {
        q: '¿Quiénes forman el EB de un comité?',
        ok: 'La LCP y los LCVPs',
        no: [
          'Solo los newbies',
          'Los Managers y Team Members',
          'El MC y la oficina global',
        ],
        por: 'El Executive Board es el equipo directivo: la presidencia y las vicepresidencias del comité.',
      },
      {
        q: '¿Qué es una expansión?',
        ok: 'Una universidad donde ya hay miembros, pero aún no es comité propio',
        no: [
          'Un intercambio de más de seis meses',
          'Una conferencia nacional',
          'El cambio de rol de un miembro',
        ],
        por: 'Por ejemplo, la UGB hoy es expansión de AIESEC en ESEN y la meta es que tenga su propio comité en 2027.',
      },
    ],
    areas: [
      {
        q: '¿Qué área recibe a jóvenes de otros países en El Salvador?',
        ok: 'ICX',
        no: ['OGX', 'MXP', 'F&L'],
        por: 'ICX es Incoming Exchange. OGX hace lo contrario: envía salvadoreños a otros países.',
      },
      {
        q: 'Un EP ya está viviendo su intercambio. ¿En qué etapa está?',
        ok: 'Realized',
        no: ['Applied', 'Accepted', 'Signed up'],
        por: 'Realized (RE) significa que ya está en su intercambio. Después vienen Finished y Completed.',
      },
      {
        q: '¿Qué área cuida la experiencia y el desarrollo de los miembros?',
        ok: 'MXP',
        no: ['MKT', 'ICX', 'B2B'],
        por: 'MXP es Membership eXperience Program: onboarding, PDP, O2O y reconocimiento.',
      },
    ],
    liderazgo: [
      {
        q: '¿Qué rol lidera un área completa y forma parte del EB?',
        ok: 'LCVP',
        no: ['Team Member', 'Manager', 'Delegado'],
        por: 'El LCVP lidera un área. El Manager lidera un equipo dentro de esa área.',
      },
      {
        q: '¿Qué es un OC?',
        ok: 'El equipo que organiza una conferencia',
        no: [
          'La oficina nacional',
          'Un tipo de intercambio',
          'El plan de desarrollo de un miembro',
        ],
        por: 'OC es Organizing Committee y lo lidera un OCP. Es una gran práctica antes de aplicar a LCVP.',
      },
      {
        q: 'En una elección, ¿qué paso viene después de la convocatoria?',
        ok: 'La aplicación',
        no: ['El anuncio', 'La asamblea', 'La transición'],
        por: 'El orden es convocatoria, aplicación, entrevista, asamblea y anuncio.',
      },
    ],
    cultura: [
      {
        q: '¿En qué año ESEN trajo AIESEC a El Salvador?',
        ok: '1998',
        no: ['1948', '2010', '2023'],
        por: 'En 1998 ESEN abrió el primer comité de AIESEC del país.',
      },
      {
        q: '¿Quién es Edrik?',
        ok: 'La mandrágora, mascota de Alchemist',
        no: [
          'El fundador del comité',
          'El nombre de la EB actual',
          'Un programa de intercambio',
        ],
        por: 'Edrik es una mandrágora, la planta de la alquimia, y representa nuestras raíces.',
      },
      {
        q: '¿Qué significa La señal (pulgar en la frente)?',
        ok: 'Atención y silencio',
        no: [
          'Que alguien tiene pareja',
          'Que es hora de irse',
          'Que alguien tomó un rol nuevo',
        ],
        por: 'Cuando alguien hace La señal, todos la repiten y el grupo hace silencio.',
      },
    ],
  },
};
