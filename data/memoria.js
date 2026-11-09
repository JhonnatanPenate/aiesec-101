// Stickers del juego «Memoria Alchemist». Las caras del comité se agregan solo con permiso.
// tipo 'img' usa una imagen; tipo 'icono' usa un ícono de assets/js/iconos.js
window.MEMORIA = {
  fijos: [
    { id: 'edrik', tipo: 'img', src: 'assets/img/edrik.svg', nombre: 'Edrik', nota: 'Nuestra mascota: el alquimista de Alchemist.' },
    { id: 'roca', tipo: 'img', src: 'assets/img/roca-oro.png', nombre: 'Roca de oro', nota: 'Turning rocks into gold: convertimos piedras en oro.' },
    { id: 'alchemist', tipo: 'img', src: 'assets/img/alchemist-logo.png', nombre: 'Alchemist', nota: 'Nuestro comité: AIESEC en ESEN.' },
  ],
  // de estos salen al azar los que falten para completar los pares
  valores: [
    { id: 'bandera', tipo: 'icono', nombre: 'Activating Leadership', nota: 'Lideras con el ejemplo e inspiras a otros.' },
    { id: 'diamante', tipo: 'icono', nombre: 'Demonstrating Integrity', nota: 'Eliges lo correcto sobre lo fácil.' },
    { id: 'mano', tipo: 'icono', nombre: 'Enjoying Participation', nota: 'Eres tú y le pones energía a todo.' },
    { id: 'apreton', tipo: 'icono', nombre: 'Living Diversity', nota: 'Ves las diferencias como una fortaleza.' },
    { id: 'trofeo', tipo: 'icono', nombre: 'Striving for Excellence', nota: 'Buscas retos para seguir creciendo.' },
    { id: 'sostenible', tipo: 'icono', nombre: 'Acting Sustainably', nota: 'Decides pensando en las próximas generaciones.' },
  ],
};
