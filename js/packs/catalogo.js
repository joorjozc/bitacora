/* ============================================================
   Bitácora — catálogo de destinos
   Este fichero se carga ANTES que los packs: crea el objeto
   donde cada pack se registra a sí mismo.
   ============================================================ */

var PACKS = {};

/* Lo que ve el usuario en el desplegable del asistente.
   Añadir un destino = crear js/packs/<clave>.js, meterlo aquí
   y añadir el <script> en crear.html y viaje.html. Nada más. */
var CATALOGO = [
  { clave: 'venecia', ciudad: 'Venecia', pais: 'Italia', bandera: '🇮🇹',
    gancho: 'Sin coches, sobre el agua y con 400 puentes.' },
  { clave: 'roma', ciudad: 'Roma', pais: 'Italia', bandera: '🇮🇹',
    gancho: 'Tres mil años apilados y una fuente en cada esquina.' },
  { clave: 'paris', ciudad: 'París', pais: 'Francia', bandera: '🇫🇷',
    gancho: 'La mitad de lo mejor está en la calle y es gratis.' },
  { clave: 'lisboa', ciudad: 'Lisboa', pais: 'Portugal', bandera: '🇵🇹',
    gancho: 'Siete colinas, luz de río y pastel de nata.' },
  { clave: 'generico', ciudad: 'Otro destino', pais: 'El que sea', bandera: '🧭',
    gancho: 'Esqueleto de viaje completo, listo para rellenar.' }
];

/* Países que puede elegir quien viaja a un destino no catalogado:
   de aquí salen los teléfonos de emergencia y el idioma. */
var PAISES_ELEGIBLES = [
  { cod: 'it', nombre: 'Italia' },
  { cod: 'fr', nombre: 'Francia' },
  { cod: 'pt', nombre: 'Portugal' },
  { cod: 'gb', nombre: 'Reino Unido' },
  { cod: 'nl', nombre: 'Países Bajos' },
  { cod: 'es', nombre: 'España' }
];
