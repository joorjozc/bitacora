/* ============================================================
   Prueba de humo del motor, sin navegador.
   Ejecutar:  node pruebas/humo.js
   Comprueba que los cuatro destinos generan un viaje coherente
   con varias combinaciones de fechas, perfiles y ritmos.
   ============================================================ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const raiz = path.join(__dirname, '..');
const orden = [
  'js/paises.js', 'js/idiomas.js',
  'js/packs/catalogo.js', 'js/packs/venecia.js', 'js/packs/roma.js',
  'js/packs/paris.js', 'js/packs/lisboa.js', 'js/packs/generico.js',
  'js/motor.js'
];

const ctx = vm.createContext({ console });
orden.forEach(f => vm.runInContext(fs.readFileSync(path.join(raiz, f), 'utf8'), ctx, { filename: f }));
const generarViaje = ctx.generarViaje;

let fallos = 0;
function comprobar(nombre, cond, extra) {
  if (!cond) { fallos++; console.log('  ✗ ' + nombre + (extra ? ' → ' + extra : '')); }
  else console.log('  ✓ ' + nombre);
}

function casos() {
  return [
    { titulo: 'Venecia · 5 días · embarazo · suave',
      cfg: {
        destino: 'venecia', inicio: '2026-08-12', fin: '2026-08-16',
        vuelos: { ida: { salida: '18:20', llegada: '20:45', desde: 'MAD · Madrid', hastaCod: 'VCE' },
                  vuelta: { salida: '15:25', llegada: '17:50' } },
        alojamiento: { nombre: 'Hotel Ejemplo', dir: 'Calle Ejemplo 10, Venezia' },
        nombres: ['Ana', 'Luis'], adultos: 2, ninos: 0,
        perfiles: ['embarazo'], ritmo: 'suave', presupuesto: 'medio',
        intereses: ['historia', 'comida', 'foto', 'arte']
      } },
    { titulo: 'Roma · 4 días · intenso · ajustado',
      cfg: {
        destino: 'roma', inicio: '2026-04-02', fin: '2026-04-05',
        vuelos: { ida: { salida: '07:00', llegada: '09:15', desde: 'BCN', hastaCod: 'FCO' },
                  vuelta: { salida: '21:00', llegada: '23:20' } },
        alojamiento: { nombre: 'Hotel Monti', dir: 'Via Panisperna 100' },
        nombres: ['Ana'], adultos: 1, ninos: 0,
        perfiles: [], ritmo: 'intenso', presupuesto: 'ajustado',
        intereses: ['historia', 'arte']
      } },
    { titulo: 'París · 3 días · niños · normal',
      cfg: {
        destino: 'paris', inicio: '2026-12-19', fin: '2026-12-21',
        vuelos: { ida: { salida: '10:00', llegada: '12:10', desde: 'MAD', hastaCod: 'ORY' },
                  vuelta: { salida: '19:00', llegada: '21:15' } },
        alojamiento: { nombre: 'Hôtel du Marais' },
        nombres: ['Luis', 'Marta'], adultos: 2, ninos: 2,
        perfiles: ['ninos'], ritmo: 'normal', presupuesto: 'holgado',
        intereses: ['naturaleza', 'foto', 'comida']
      } },
    { titulo: 'Lisboa · 7 días · movilidad · suave',
      cfg: {
        destino: 'lisboa', inicio: '2026-05-04', fin: '2026-05-10',
        vuelos: { ida: { salida: '13:00', llegada: '13:40', desde: 'VLC', hastaCod: 'LIS' },
                  vuelta: { salida: '08:00', llegada: '10:40' } },
        alojamiento: { nombre: 'Casa da Baixa' },
        nombres: ['Pepa', 'Curro'], adultos: 2, ninos: 0,
        perfiles: ['movilidad', 'mayores'], ritmo: 'suave', presupuesto: 'medio',
        intereses: ['historia', 'comida', 'compras']
      } },
    { titulo: 'Genérico · Ámsterdam · 2 días',
      cfg: {
        destino: 'generico', ciudad: 'Ámsterdam', pais: 'nl',
        inicio: '2026-09-11', fin: '2026-09-12',
        vuelos: { ida: { salida: '06:00', llegada: '08:45', desde: 'SVQ' }, vuelta: { salida: '22:00' } },
        alojamiento: { nombre: 'Hotel Prinsengracht' },
        nombres: [], adultos: 2, ninos: 0,
        perfiles: [], ritmo: 'normal', presupuesto: 'medio', intereses: []
      } },
    { titulo: 'Venecia · un solo día · sin datos de vuelo',
      cfg: {
        destino: 'venecia', inicio: '2026-10-03', fin: '2026-10-03',
        vuelos: { ida: {}, vuelta: {} },
        alojamiento: {}, nombres: [], adultos: 2, ninos: 0,
        perfiles: [], ritmo: 'normal', presupuesto: 'medio', intereses: []
      } }
  ];
}

casos().forEach(c => {
  console.log('\n── ' + c.titulo);
  let v;
  try { v = generarViaje(c.cfg); }
  catch (e) { fallos++; console.log('  ✗ ha reventado: ' + e.message + '\n' + e.stack); return; }

  const dias = v.dias.length;
  const esperados = Math.round((new Date(c.cfg.fin) - new Date(c.cfg.inicio)) / 86400000) + 1;
  comprobar('genera ' + esperados + ' días', dias === esperados, 'salieron ' + dias);

  let paradas = 0, sinHora = 0, horasMal = 0;
  v.dias.forEach(d => {
    comprobar('  día ' + d.id + ' (' + d.dia + ') tiene bloques', d.bloques.length > 0);
    d.bloques.forEach(b => {
      let previa = -1;
      b.paradas.forEach(p => {
        paradas++;
        if (!p.hora) sinHora++;
        else {
          const m = +p.hora.slice(0, 2) * 60 + +p.hora.slice(3);
          if (m < previa) horasMal++;
          previa = m;
        }
        if (!p.nombre) fallos++;
      });
    });
  });
  comprobar('todas las paradas tienen hora', sinHora === 0, sinHora + ' sin hora');
  comprobar('las horas van hacia adelante dentro de cada bloque', horasMal === 0, horasMal + ' saltos atrás');
  comprobar('hay paradas de sobra (' + paradas + ')', paradas >= esperados * 3);

  /* No se puede repetir un lugar en todo el viaje */
  const nombres = [];
  v.dias.forEach(d => d.bloques.forEach(b => b.paradas.forEach(p => {
    if (p.relleno) return;   // el "rato libre" se repite a propósito
    if (p.tipo !== 'transporte' && p.tipo !== 'descanso' && p.tipo !== 'comida') nombres.push(p.nombre);
  })));
  const repes = nombres.filter((n, i) => nombres.indexOf(n) !== i);
  comprobar('ningún lugar repetido', repes.length === 0, repes.join(', '));

  /* Presupuesto */
  let total = 0;
  v.presupuesto.fijos.forEach(f => { total += f.importe; });
  v.presupuesto.opciones.forEach(op => {
    const sel = op.alts.filter(a => a.id === op.elegida)[0];
    comprobar('  la opción "' + op.titulo + '" tiene alternativa elegida', !!sel);
    if (sel) total += sel.importe;
  });
  comprobar('el total es un número positivo (' + Math.round(total) + ' €)', total > 0 && isFinite(total));

  /* Frases e info */
  const idi = v.meta.idioma;
  if (idi !== 'es') {
    comprobar('hay frases en ' + idi, v.frases.length > 0);
    const tienenTres = v.frases.every(g => g.items.every(it => it.length === 3 && it[0] && it[1] && it[2]));
    comprobar('todas las frases están completas', tienenTres);
    const cats = v.frases.map(g => g.cat);
    const esperaEmbarazo = c.cfg.perfiles.indexOf('embarazo') !== -1;
    comprobar('la categoría de embarazo ' + (esperaEmbarazo ? 'aparece' : 'no aparece'),
      (cats.indexOf('Embarazo') !== -1) === esperaEmbarazo);
  }
  comprobar('hay teléfonos de emergencia', v.info.emergencias.length > 0);
  comprobar('hay checklist', v.checklist.length > 0);
  comprobar('hay sitios para comer', v.restaurantes.length > 0);

  /* Perfil de movilidad: nada con escaleras */
  if (c.cfg.perfiles.indexOf('movilidad') !== -1) {
    const conEscaleras = [];
    const pack = ctx.PACKS[c.cfg.destino];
    pack.lugares.forEach(l => {
      if (!l.escaleras) return;
      v.dias.forEach(d => d.bloques.forEach(b => b.paradas.forEach(p => {
        if (p.nombre === l.nombre) conEscaleras.push(l.nombre);
      })));
    });
    comprobar('sin sitios con escaleras', conEscaleras.length === 0, conEscaleras.join(', '));
  }

  /* Cierres: nada que cierre ese día de la semana */
  const pack = ctx.PACKS[c.cfg.destino] || ctx.PACKS.generico;
  const enDiaCerrado = [];
  v.dias.forEach(d => {
    const dow = new Date(d.fecha + 'T00:00:00Z').getUTCDay();
    d.bloques.forEach(b => b.paradas.forEach(p => {
      pack.lugares.forEach(l => {
        if (l.nombre === p.nombre && l.cierra && l.cierra.indexOf(dow) !== -1) enDiaCerrado.push(l.nombre + ' el ' + d.dia);
      });
      pack.restaurantes.forEach(r => {
        if (r.nombre === p.nombre && r.cierraDias && r.cierraDias.indexOf(dow) !== -1) enDiaCerrado.push(r.nombre + ' el ' + d.dia);
      });
    }));
  });
  comprobar('nada programado en su día de cierre', enDiaCerrado.length === 0, enDiaCerrado.join(' · '));
});

console.log('\n' + (fallos === 0 ? '✅ Todo correcto.' : '❌ ' + fallos + ' fallos.'));
process.exit(fallos === 0 ? 0 : 1);
