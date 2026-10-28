# AIESEC 101

Web de aprendizaje para la membresía de AIESEC en ESEN (Alchemist).

## Para qué sirve

Que cualquier miembro, newbie u oldie, entienda AIESEC sin depender de preguntar
todo: qué es la organización, cómo se organiza a nivel nacional y local, qué
significan sus conceptos y siglas, qué hace cada rol y cómo se llega a un rol de
liderazgo.

## Metas

- Reducir las dudas básicas de onboarding.
- Que cada miembro entienda su área, los roles y la cultura de AIESEC.
- Preparar a la membresía para SalvaAcademy y para roles de liderazgo (OC, LCVP, LCP).
- Acompañar el crecimiento del comité, incluida la expansión a la UGB.
- Dejar una herramienta que el próximo equipo de MXP pueda actualizar fácil.

## Público

Toda la membresía de AIESEC en ESEN: miembros de ESEN, UCA, UGB y UNIVO.

## Secciones

- **Inicio**: bienvenida y accesos rápidos.
- **Aprende**: qué es AIESEC, programas y cultura.
- **Diccionario**: siglas y conceptos por categoría.
- **Estructura**: organigrama nacional y local, y qué hace cada rol.
- **Liderazgo**: conferencias, OC y cómo funcionan las postulaciones a LCP y LCVP.
- **SalvaAcademy**: el ciclo de educación nacional.

## Principios

- Es un sitio público: solo explica conceptos. No publica datos personales,
  teléfonos, correos, IDs de EXPA ni procesos internos del comité.
- Todo el contenido vive en archivos de datos fáciles de editar.

## Stack

HTML, CSS y JavaScript sin build. Desplegado en Vercel.

## Estructura del repo

```text
index.html, aprende.html, cultura.html, areas.html,
diccionario.html, estructura.html, liderazgo.html   Páginas
data/site.js            Navegación, créditos y secciones de cada página
data/*.js               Contenido de cada sección (se agrega por sección)
assets/css/tokens.css   Colores, tipografía, espacios y animaciones
assets/css/base.css     Reset y estilos base
assets/css/layout.css   Header, menú móvil, secciones y footer
assets/css/components.css  Botones, cards y modal
assets/js/site.js       Header, footer, menú y progreso compartidos
assets/js/modal.js      Modal con animación: Modal.open({ title, body, example })
assets/img/             Logo e ilustraciones
```

## Ver en local

```bash
npx serve .
```

## Desplegar en Vercel

Importa el repo en Vercel. Framework: **Other**, sin build command ni output
directory. Cada push a `main` se despliega solo.

## Ideas para después

- **Hexágonos** para los valores y rasgos de liderazgo, y la Leadership Development Experience interactiva.
- **Imagen de la insignia de Cultura:** guardarla como `assets/img/insignia-cultura.png` (cuadrada) y aparece sola dentro del sello.

## Créditos

Creado por Jhonnatan Peñate, LCVP MXP 26.27 · AIESEC en ESEN.

## Juega con los ODS (`juega.html`)

Rompecabezas deslizante de 4×4 en tres etapas: ordenar los ODS 1 al 15, colocar el 16 en la última casilla y desbloquear el 17 fuera del tablero. No cuenta para el progreso del curso.

- Lógica (sin DOM): `assets/js/ods-juego.js`. Vista: `assets/js/juega.js` y `assets/css/juega.css`.
- El tablero se mezcla con movimientos legales desde la solución, así que siempre tiene solución.
- Íconos oficiales completos (con número y nombre, versión en español): `assets/img/ods/ods-1.png` … `ods-17.png`, cuadrados. La ONU no permite recortarlos, redondearlos, cambiar colores ni quitarles el texto, y pide enlazar sus lineamientos en la misma página (ya está). Mientras no estén, las fichas muestran el color oficial con el número.
- Pruebas: `node tests/ods-juego.test.js`.
