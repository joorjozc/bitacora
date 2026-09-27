/* ============================================================
   Prueba del intérprete de itinerarios y del modo "traigo el mío".
   Ejecutar:  node pruebas/importar.test.js
   ============================================================ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const raiz = path.join(__dirname, '..');
const ctx = vm.createContext({ console });
['js/paises.js', 'js/idiomas.js', 'js/packs/catalogo.js', 'js/packs/venecia.js',
 'js/packs/roma.js', 'js/packs/paris.js', 'js/packs/lisboa.js', 'js/packs/generico.js',
 'js/motor.js', 'js/importar.js']
  .forEach(f => vm.runInContext(fs.readFileSync(path.join(raiz, f), 'utf8'), ctx, { filename: f }));

const { Importar, generarViaje } = ctx;

let fallos = 0;
function comprobar(nombre, cond, extra) {
  if (!cond) { fallos++; console.log('  ✗ ' + nombre + (extra ? ' → ' + extra : '')); }
  else console.log('  ✓ ' + nombre);
}

/* ══════════ 1 · El intérprete ══════════ */
console.log('\n── Texto con cabeceras de día');
{
  const t = `Jueves 13
09:00 Piazza San Marco — a primera hora está vacía
10:30 Mercado de Rialto
13:30 Comer en Osteria La Zucca

Viernes 14
Burano
Murano
20:30 Cena por Cannaregio`;
  const d = Importar.leer(t);
  comprobar('salen 2 días', d.length === 2, 'salieron ' + d.length);
  comprobar('el primer día tiene 3 paradas', d[0].paradas.length === 3);
  comprobar('lee la hora', d[0].paradas[0].hora === '09:00');
  comprobar('separa la nota', d[0].paradas[0].por === 'a primera hora está vacía');
  comprobar('el nombre no se lleva la nota', d[0].paradas[0].nombre === 'Piazza San Marco');
  comprobar('las paradas sin hora se aceptan', d[1].paradas[0].hora === null && d[1].paradas[0].nombre === 'Burano');
}

console.log('\n── Texto sin cabeceras, separado por líneas en blanco');
{
  const t = `9h Torre Eiffel\nLouvre\n\nMontmartre\n20:00 Cena`;
  const d = Importar.leer(t);
  comprobar('salen 2 días', d.length === 2, 'salieron ' + d.length);
  comprobar('entiende "9h" como 09:00', d[0].paradas[0].hora === '09:00');
  comprobar('los nombres no se parten', d[1].paradas[0].nombre === 'Montmartre');
}

console.log('\n── Lo que NO debe partir un día');
{
  const d = Importar.leer('Jueves 13\nPiazza San Marco\nPuente de Rialto\nCalle del Paradiso');
  comprobar('un solo día', d.length === 1, 'salieron ' + d.length);
  comprobar('con las 3 paradas', d[0].paradas.length === 3);
}

console.log('\n── Viñetas, markdown y JSON');
{
  const d1 = Importar.leer('## Día 1\n- 10:00 Coliseo\n* 12:00 Foro\n• Panteón');
  comprobar('quita viñetas y markdown', d1.length === 1 && d1[0].paradas.length === 3,
    JSON.stringify(d1));
  comprobar('el título pierde las almohadillas', d1[0].titulo === 'Día 1', d1[0].titulo);

  const json = JSON.stringify({ dias: [{ titulo: 'Uno', paradas: [{ hora: '10:00', nombre: 'Coliseo' }] }] });
  const d2 = Importar.leer(json);
  comprobar('lee su propio JSON', d2.length === 1 && d2[0].paradas[0].nombre === 'Coliseo');
}

console.log('\n── Ida y vuelta texto → días → texto');
{
  const original = 'Jueves 13\n09:00 Piazza San Marco — vacía a primera hora\n10:30 Rialto';
  const ida = Importar.leer(original);
  const vuelta = Importar.leer(Importar.aTexto(ida));
  comprobar('sobrevive al viaje de ida y vuelta',
    JSON.stringify(ida) === JSON.stringify(vuelta),
    JSON.stringify(vuelta));
}

/* ══════════ 2 · El motor con itinerario propio ══════════ */
console.log('\n── Motor en modo "traigo el mío"');
{
  const texto = `Jueves 13
09:00 Piazza San Marco
11:00 Libreria Acqua Alta
13:30 Osteria La Zucca

Viernes 14
10:00 Burano
20:00 Osteria Anice Stellato

Sábado 15
09:00 Un sitio que no existe en ningún pack
12:00 Puente de Rialto`;

  const cfg = {
    destino: 'venecia', modo: 'propio',
    propio: { dias: Importar.leer(texto) },
    inicio: '2026-08-13', fin: '2026-08-15',
    vuelos: { ida: { salida: '06:00', llegada: '08:15', desde: 'MAD', hastaCod: 'VCE' },
              vuelta: { salida: '20:00', llegada: '22:20' } },
    alojamiento: { nombre: 'Hotel Ejemplo', dir: 'Calle Ejemplo 10' },
    nombres: ['Ana', 'Luis'], adultos: 2, ninos: 0,
    perfiles: ['embarazo'], ritmo: 'suave', presupuesto: 'medio', intereses: []
  };

  const v = generarViaje(cfg);
  comprobar('3 días', v.dias.length === 3, 'salieron ' + v.dias.length);
  comprobar('el viaje se marca como propio', v.meta.propio === true);

  const nombres = [];
  v.dias.forEach(d => d.bloques.forEach(b => b.paradas.forEach(p => nombres.push(p.nombre))));
  comprobar('están mis paradas', nombres.indexOf('Piazza San Marco') !== -1 &&
    nombres.indexOf('Un sitio que no existe en ningún pack') !== -1);
  comprobar('el primer día lleva el traslado del aeropuerto',
    v.dias[0].bloques[0].franja === 'Llegada');
  comprobar('el último lleva la vuelta al aeropuerto',
    v.dias[2].bloques[v.dias[2].bloques.length - 1].franja === 'Vuelta');

  /* Enriquecido */
  let sanmarco = null, inventado = null, zucca = null;
  v.dias.forEach(d => d.bloques.forEach(b => b.paradas.forEach(p => {
    if (p.nombre === 'Piazza San Marco') sanmarco = p;
    if (p.nombre === 'Un sitio que no existe en ningún pack') inventado = p;
    if (p.nombre === 'Osteria La Zucca') zucca = p;
  })));
  comprobar('la parada conocida trae explicación del pack', !!(sanmarco && sanmarco.por && sanmarco.por.length > 30));
  comprobar('la parada conocida trae enlace a mapas', !!(sanmarco && sanmarco.maps));
  comprobar('la parada inventada se respeta tal cual', !!(inventado && !inventado.reconocida));
  comprobar('el restaurante conocido avisa de la reserva', !!(zucca && /reserv/i.test(zucca.aviso || '')));

  /* La Zucca cierra los domingos; el 16/8/2026 es domingo. Aquí no toca,
     pero sí debe avisar si el usuario lo pone en un día de cierre. */
  const cfg2 = JSON.parse(JSON.stringify(cfg));
  cfg2.inicio = '2026-08-16'; cfg2.fin = '2026-08-18';
  const v2 = generarViaje(cfg2);
  let zucca2 = null;
  v2.dias.forEach(d => d.bloques.forEach(b => b.paradas.forEach(p => {
    if (p.nombre === 'Osteria La Zucca') zucca2 = p;
  })));
  comprobar('avisa si pongo algo el día que cierra',
    !!(zucca2 && /CIERRA/.test(zucca2.aviso || '')), zucca2 ? zucca2.aviso : 'no encontrada');

  /* Días de más y de menos */
  const cfg3 = JSON.parse(JSON.stringify(cfg));
  cfg3.fin = '2026-08-17';                  // 5 días de viaje, 3 escritos
  const v3 = generarViaje(cfg3);
  comprobar('los días sin nada escrito no revientan', v3.dias.length === 5);
  const vacio = v3.dias[3];
  comprobar('el día vacío se explica solo',
    vacio.bloques.length > 0 && /Sin plan|Vuelta|Llegada/.test(vacio.bloques[0].franja));

  /* Presupuesto y checklist siguen funcionando */
  let total = 0;
  v.presupuesto.fijos.forEach(f => { total += f.importe; });
  comprobar('el presupuesto se calcula igual', total > 0);
  comprobar('la checklist recoge las reservas de mi itinerario',
    v.checklist.some(g => g.cat === 'Reservas' && g.items.some(i => /Zucca/.test(i))));
  comprobar('hay frases en italiano', v.frases.length > 0);
}

console.log('\n' + (fallos === 0 ? '✅ Todo correcto.' : '❌ ' + fallos + ' fallos.'));
process.exit(fallos === 0 ? 0 : 1);
