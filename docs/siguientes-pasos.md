# AIESEC 101 · Siguientes pasos

Entrega: **viernes a la 1 p.m.** (se manda como LEC).

## Estado actual

- `main`: la web publicada (Vercel).
- `mobile-ux`: ajustes de celular terminados en todas las páginas. Falta probar la vista previa y juntarla a `main`.
- `cms-base`: igual a `main`, sin cambios. Se retoma después del lanzamiento.

## Hoy (miércoles) · Jhonnatan

- [ ] Probar la vista previa de `mobile-ux` en el celular (Vercel → Deployments → `mobile-ux` → Visit).
- [ ] Juntar `mobile-ux` a `main` (GitHub → Compare & pull request → Merge) y en la compu: `git checkout main && git pull`.
- [ ] Íconos de los ODS en `assets/img/ods/` como `ods-1.png` … `ods-17.png` (versión en español, completa y cuadrada).
- [ ] Imagen de Canva de la insignia de Cultura en `assets/img/insignia-cultura.png`.
- [ ] Mandar el link de Vercel para armar la vista previa de WhatsApp.
- [ ] Llenar la tabla de siglas (abajo) y las decisiones de Inicio.

## Jueves

| Quién | Qué |
|---|---|
| Claude | Quizzes al azar: banco de 8-10 preguntas por módulo, salen 5, opciones en desorden, se aprueba con 4/5 |
| Claude | Diccionario a 100 términos (con las siglas validadas) |
| Claude | Juego **Match de siglas** |
| Claude | Cambios visuales por sección, empezando por Inicio y Aprende |
| Jhonnatan | Validar las preguntas de los quizzes y aprobar cada sección con capturas |
| Jhonnatan | Jueves en la noche: probar en 2-3 celulares |

Todo esto se trabaja en la rama `contenido` y se junta a `main` el jueves en la noche.

## Viernes

- Hasta las 10 a.m.: arreglar lo que salga de las pruebas.
- De 10 a.m. a 1 p.m.: nada nuevo, solo revisar. Vista previa de WhatsApp y enviar.

Si vamos atrasados, se mueve para después: flujos de F&L y MKT, cambios visuales de las últimas páginas y juegos extra.

## Siglas por definir

Escribe qué significa cada una y cómo se usa en el comité. Si no se sabe, déjala vacía: no entra al diccionario, pero puede ir al juego «¿Real o no?».

| Sigla | Significado | Estado |
|---|---|---|
| LEC | Local … (ciclo de enseñanza/aprendizaje del comité, por confirmar) | Confirmar el nombre exacto |
| IR | Internal Relationships: relación entre AIESEC, LCs y entidades | Confirmar si en ESEN es «Internal» o «International Relations» |
| EST | | |
| UR | | |
| ECB | | |
| QA | | |
| PXP | | |
| IXP | | |

Para llegar a 100, marcar ✓ (se usa) o ✗ (no se usa):

LDM · TMP · TLP · OPS · GEP · NST · NLDS · MCP · MCVP · EB · OC · OCP · TL · Booster · Raise · Match · B2B · B2C · PR · BD · CRM · KPI · OKR · Q · Leadership Summit · Zonalito · Kipactani · AMCO · NatCo · LCM · LC Day · Onboarding · Offboarding · JD · O2O · PDP · MXS · Newbie · Alumni · Buddy · YouthSpeak

## Flujos por área (como el de ICX/OGX)

- F&L: pasos reales de la plata (ej. presupuesto → cobro → gastos → reportes → QA).
- MKT: ciclo real (ej. idea → arte → aprobación → publicación → métricas → leads).
- MXP (opcional): ciclo del miembro (reclutamiento → onboarding → PDP → O2O → evaluación → offboarding).

## Decisiones de Inicio

- a) Hero: fondo negro o foto del comité.
- b) «AIESEC 101» animado tipo teclas.
- c) Módulos: lista o bento.
- d) Juegos: sección en Inicio, página `juegos.html` o ambas.
- e) Orden: Insignias antes o después de Juegos.
- f) «Hacia dónde vamos»: se queda en Inicio o pasa a Estructura.
- g) Botón «¿Algo no se entiende?» con Google Form.

Ya decidido para Aprende: letras AIESEC que caen como teclas y con hover/toque se ponen naranja y bajan; todo en un solo rectángulo con visión y misión abajo.

## Juegos

| Juego | Cómo funciona | Cuándo |
|---|---|---|
| Juega con los ODS | Rompecabezas 4×4, colocar el 16 y desbloquear el 17 | Ya está |
| Match de siglas | Unir sigla con su significado contra el tiempo | Jueves |
| ¿Real o no? | Sale una sigla y decides si existe en AIESEC; luego se revela qué significa | Después del viernes |
| Memoria Alchemist | Parejas de stickers del comité | Después del viernes |
| ¿Qué área lo hace? | Arrastrar tareas a MXP, F&L, ICX, OGX y MKT | Después del viernes |
| Ordena el recorrido | Poner las etapas SU → CO en orden | Después del viernes |
| Valor en acción | Situación corta → elegir el valor del AIESEC Way | Después del viernes |

Stickers con caras del comité: solo con permiso de cada persona, porque la web es pública. Alternativa: stickers de Edrik, de los valores o del logo.

## Después del sábado

- Reescribir el autor de los commits viejos al correo de GitHub y usar ese correo de ahí en adelante.
- Sveltia CMS en `cms-base` (prompt ya listo) y `docs/guia-cms.md` para el sucesor.
- Subroles de MXP, F&L, ICX y OGX.
- Foto de «la señal», Edrik dibujado y fotos de los valores.
- Reflexiones cortas por módulo.
- Código de progreso para pasar el avance del celular a la compu (sin login).
- Ejemplos de otros ODS cuando estén confirmados.
- Guía para el sucesor en el README.

## Reglas que no cambian

- Web pública: sin teléfonos, correos, EXPA IDs ni procesos internos.
- Colores de Alchemist; el logo de AIESEC solo en su azul oficial; el azul nunca es color principal; Poppins; nada de emojis como íconos.
- Íconos de los ODS completos y cuadrados (lineamientos de la ONU).
- Nunca `git stash`: siempre commit en su rama. No se toca `main` mientras haya una rama abierta.
