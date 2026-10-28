// Contenido de la página Áreas: solo conceptos base, sin procesos internos.
window.AREAS = {
  recorrido: [
    {
      sigla: 'SU',
      en: 'Signed up',
      quien: 'mkt',
      texto: 'La persona conoce AIESEC y se registra en aiesec.org.',
      out: 'Un estudiante ve una publicación sobre voluntariados y crea su perfil.',
      in: 'Un joven de otro país ve una oportunidad en El Salvador y se registra.',
    },
    {
      sigla: 'APL',
      en: 'Applied',
      quien: 'x',
      texto: 'Aplica a una oportunidad (Opp).',
      out: 'El estudiante aplica a un voluntariado en Colombia.',
      in: 'El joven aplica a una Opp de voluntariado en El Salvador.',
    },
    {
      sigla: 'ACC',
      en: 'Accepted',
      quien: 'x',
      texto:
        'La oportunidad lo acepta después de revisar su perfil o entrevistarlo.',
      out: 'El proyecto en Colombia lo entrevista y lo acepta.',
      in: 'El proyecto local acepta al joven.',
    },
    {
      sigla: 'APD',
      en: 'Approved',
      quien: 'x',
      texto: 'Su intercambio queda aprobado y se prepara para viajar.',
      out: 'El estudiante confirma su intercambio y empieza su preparación.',
      in: 'Se confirma la llegada del joven a El Salvador.',
    },
    {
      sigla: 'RE',
      en: 'Realized',
      quien: 'x',
      texto: 'Está viviendo su intercambio.',
      out: 'El estudiante ya está en Colombia en su proyecto.',
      in: 'El joven ya está en El Salvador y el comité lo acompaña.',
    },
    {
      sigla: 'FIN',
      en: 'Finished',
      quien: 'x',
      texto: 'Terminó su intercambio.',
      out: 'El estudiante regresa a El Salvador.',
      in: 'El joven termina su proyecto y regresa a su país.',
    },
    {
      sigla: 'CO',
      en: 'Completed',
      quien: 'x',
      texto:
        'Cierra todo el proceso, incluida su evaluación de la experiencia.',
      out: 'El estudiante comparte cómo le fue y qué aprendió.',
      in: 'El joven evalúa su experiencia en El Salvador.',
    },
  ],

  areas: [
    {
      id: 'mxp',
      nombre: 'MXP',
      largo: 'Membership eXperience Program',
      resumen:
        'Cuida la experiencia, el desarrollo y el bienestar de cada miembro.',
      conceptos: [
        [
          'Ciclo del miembro',
          'Atraer, seleccionar, dar la bienvenida, desarrollar, reconocer y acompañar la salida de cada miembro.',
        ],
        [
          'Onboarding',
          'La bienvenida cuando alguien entra a AIESEC o toma un rol nuevo.',
        ],
        [
          'PDP',
          'El plan de desarrollo personal: qué quiere aprender cada miembro y cómo.',
        ],
        ['O2O', 'Conversaciones uno a uno para acompañar a cada persona.'],
        [
          'Reconocimiento',
          'Celebrar los logros para que las personas sepan que su trabajo importa.',
        ],
      ],
    },
    {
      id: 'fl',
      nombre: 'F&L',
      largo: 'Finance & Legality',
      resumen: 'Cuida que el comité sea sostenible y funcione en orden.',
      conceptos: [
        [
          'Presupuesto',
          'El plan de cuánto dinero entra y sale en cada actividad o ciclo.',
        ],
        ['Transparencia', 'Rendir cuentas de cómo se usan los recursos.'],
        [
          'Legalidad',
          'Que los acuerdos y documentos del comité estén en regla.',
        ],
        [
          'Sostenibilidad',
          'Tomar decisiones que permitan que el comité siga creciendo.',
        ],
      ],
    },
    {
      id: 'mkt',
      nombre: 'MKT',
      largo: 'Marketing',
      resumen: 'Hace que los jóvenes conozcan AIESEC y quieran vivirla.',
      conceptos: [
        ['Marca', 'Cómo se ve, suena y se siente AIESEC en ESEN.'],
        [
          'Contenido',
          'Publicaciones, videos y artes que cuentan lo que hacemos.',
        ],
        [
          'Embudo de atracción',
          'El camino de una persona: conoce AIESEC, se interesa y se registra.',
        ],
        ['Campaña', 'Un conjunto de acciones con un objetivo y fechas claras.'],
      ],
    },
    {
      id: 'pr',
      nombre: 'PR',
      largo: 'Public Relations',
      resumen:
        'Construye relaciones con universidades y aliados. En nuestro comité es parte de MKT.',
      conceptos: [
        [
          'Relación con universidades',
          'Espacios para dar a conocer AIESEC dentro de cada campus.',
        ],
        [
          'Aliados',
          'Organizaciones que comparten nuestros valores y nos apoyan.',
        ],
        ['Imagen pública', 'Cómo nos perciben fuera del comité.'],
      ],
    },
    {
      id: 'b2b',
      nombre: 'B2B',
      largo: 'Business to Business',
      resumen:
        'Trabaja con empresas y aliados. En nuestro comité es parte de MKT.',
      conceptos: [
        [
          'Alianza',
          'Un acuerdo con una empresa u organización que beneficia a ambas partes.',
        ],
        [
          'Propuesta de valor',
          'Lo que AIESEC le ofrece a un aliado y por qué le conviene.',
        ],
        [
          'Seguimiento',
          'Mantener la relación activa después de cerrar una alianza.',
        ],
      ],
    },
    {
      id: 'icx',
      nombre: 'ICX',
      largo: 'Incoming Exchange',
      resumen: 'Recibe a jóvenes de otros países en El Salvador.',
      conceptos: [
        [
          'Opp local',
          'Una oportunidad de intercambio que se ofrece en El Salvador.',
        ],
        [
          'Aliado que recibe',
          'La organización o empresa local donde el joven hace su intercambio.',
        ],
        [
          'Experiencia del EP',
          'Todo lo que vive el joven desde que llega hasta que se va.',
        ],
        [
          'Acompañamiento',
          'Estar presente para que el joven se adapte y aproveche su experiencia.',
        ],
      ],
    },
    {
      id: 'ogx',
      nombre: 'OGX',
      largo: 'Outgoing Exchange',
      resumen: 'Envía a jóvenes salvadoreños a vivir un intercambio afuera.',
      conceptos: [
        [
          'Asesoría',
          'Ayudar al joven a elegir la oportunidad que mejor le queda.',
        ],
        ['Preparación', 'Todo lo que necesita saber y hacer antes de viajar.'],
        [
          'Acompañamiento afuera',
          'Seguir en contacto mientras vive su intercambio.',
        ],
        ['Regreso', 'Ayudarle a reflexionar sobre lo que aprendió al volver.'],
      ],
    },
  ],
};
