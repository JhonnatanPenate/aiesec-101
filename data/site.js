// Configuración general del sitio: navegación, créditos y secciones de cada página.
// El contenido de cada sección vive en su propio archivo dentro de /data.
window.SITE = {
  nombre: 'AIESEC 101',
  comite: 'AIESEC en ESEN',
  lema: 'Turning rocks into gold',
  creditos: 'Creado por Jhonnatan Peñate, LCVP MXP 26.27',

  paginas: [
    {
      id: 'inicio',
      href: 'index.html',
      titulo: 'Inicio',
      resumen: 'Bienvenida y accesos rápidos.',
      secciones: ['Bienvenida', 'Accesos', 'Hacia dónde vamos'],
    },
    {
      id: 'aprende',
      href: 'aprende.html',
      titulo: 'Aprende',
      resumen: 'Qué es AIESEC, su historia, sus programas y plataformas.',
      secciones: [
        'Qué significa AIESEC',
        'The AIESEC Way',
        'Programas',
        'Plataformas',
        'SalvaAcademy',
      ],
    },
    {
      id: 'cultura',
      href: 'cultura.html',
      titulo: 'Cultura',
      resumen: 'Tradiciones, frases y la identidad de Alchemist.',
      secciones: ['Tradiciones', 'Frases y chants', 'Alchemist'],
    },
    {
      id: 'areas',
      href: 'areas.html',
      titulo: 'Áreas',
      resumen: 'Conceptos base de cada área y el recorrido de un intercambio.',
      secciones: ['Recorrido de un intercambio', 'Conceptos por área'],
    },
    {
      id: 'diccionario',
      href: 'diccionario.html',
      titulo: 'Diccionario',
      resumen: 'Siglas y conceptos de AIESEC por categoría.',
      secciones: ['Siglas', 'Ponte a prueba'],
    },
    {
      id: 'estructura',
      href: 'estructura.html',
      titulo: 'Estructura',
      resumen: 'Cómo se organiza AIESEC, organigramas y mapa.',
      secciones: [
        'De lo global a lo local',
        'Organigrama nacional',
        'Organigrama local',
        'Cómo funciona un comité',
        'Dónde estamos',
      ],
    },
    {
      id: 'liderazgo',
      href: 'liderazgo.html',
      titulo: 'Liderazgo',
      resumen: 'Roles de liderazgo, elecciones y conferencias.',
      secciones: [
        'Roles de liderazgo',
        'Cómo funciona una elección',
        'Conferencias y OC',
      ],
    },
  ],
};
