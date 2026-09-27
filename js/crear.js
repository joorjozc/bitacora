/* ============================================================
   Bitácora — el asistente
   Seis pasos que producen un CONFIG. Nada más: el itinerario lo
   monta el motor a partir de eso, cada vez que se abre la app.
   Guardar los parámetros y no el resultado es lo que permite
   cambiar una fecha y que se recalcule el viaje entero.
   ============================================================ */
(function () {
  'use strict';

  var $ = function (s) { return document.querySelector(s); };

  /* El paso 6 (el itinerario propio) sólo existe si se ha elegido
     traerlo. La secuencia se recalcula, no se salta a mano. */
  var PASO_ITINERARIO = 6;
  var PASO_RESUMEN = 7;
  var indice = 0;

  /* ---------- Tema (compartido con la app) ---------- */
  var temaGuardado = null;
  try { temaGuardado = localStorage.getItem('bitacora.tema'); } catch (e) {}
  function pintarTema() {
    if (temaGuardado) document.documentElement.setAttribute('data-tema', temaGuardado);
    else document.documentElement.removeAttribute('data-tema');
    $('#icono-tema').textContent = temaGuardado === 'oscuro' ? '☾' : temaGuardado === 'claro' ? '☀' : '◐';
  }
  $('#btn-tema').addEventListener('click', function () {
    temaGuardado = temaGuardado === null ? 'oscuro' : temaGuardado === 'oscuro' ? 'claro' : null;
    try {
      if (temaGuardado) localStorage.setItem('bitacora.tema', temaGuardado);
      else localStorage.removeItem('bitacora.tema');
    } catch (e) {}
    pintarTema();
  });
  pintarTema();

  /* ---------- Estado del formulario ---------- */
  var cfg = {
    destino: '', ciudad: '', pais: 'it',
    modo: 'sugerido',
    propio: { dias: [] },
    inicio: '', fin: '',
    vuelos: { ida: {}, vuelta: {} },
    alojamiento: {},
    nombres: [], adultos: 2, ninos: 0,
    perfiles: [],
    ritmo: 'normal', presupuesto: 'medio',
    intereses: ['historia', 'comida', 'foto', 'arte']
  };

  /* ¿Venimos a editar uno que ya existe? */
  var editandoId = new URLSearchParams(location.search).get('id');
  if (editandoId) {
    var previo = Almacen.obtener(editandoId);
    if (previo) {
      for (var k in previo) cfg[k] = previo[k];
      cfg.vuelos = cfg.vuelos || { ida: {}, vuelta: {} };
      cfg.vuelos.ida = cfg.vuelos.ida || {};
      cfg.vuelos.vuelta = cfg.vuelos.vuelta || {};
      cfg.alojamiento = cfg.alojamiento || {};
      cfg.propio = cfg.propio || { dias: [] };
      cfg.modo = cfg.modo || 'sugerido';
    }
  }

  var MODOS_UI = [
    { id: 'sugerido', t: 'Propónmelo tú',
      d: 'El motor reparte los barrios entre los días, encaja las visitas en las horas libres que dejan los vuelos, esquiva lo que cierra ese día de la semana y mete el descanso de mediodía si hace falta.' },
    { id: 'propio', t: 'Ya tengo mi itinerario',
      d: 'Lo pegas o lo subes tal y como lo tengas. Se le ponen las horas, se le engancha el traslado del aeropuerto y, de los sitios que reconozcamos, se añaden precios, avisos y reservas.' }
  ];

  /* ---------- Catálogos que se pintan ---------- */

  var PERFILES_UI = [
    { id: 'embarazo', t: 'Un embarazo', d: 'Parón obligatorio a mediodía, menos paradas, frases sobre crudos y alcohol, y el hospital con maternidad a mano.' },
    { id: 'ninos', t: 'Niños pequeños', d: 'Menos paradas por bloque, prioridad a parques y sitios donde se pueda correr, y frases de trona y cambiador.' },
    { id: 'movilidad', t: 'Movilidad reducida', d: 'Se quitan del itinerario los sitios con escaleras estrechas o suelo irregular.' },
    { id: 'mayores', t: 'Viajamos con mayores', d: 'Ritmo pausado, descanso a mediodía y aviso en todo lo que tenga muchos escalones.' }
  ];

  var RITMOS_UI = [
    { id: 'suave', t: 'Suave', d: 'Empezar a las 9:00, tres paradas por bloque y siesta siempre. Se ve menos y se disfruta más.' },
    { id: 'normal', t: 'Normal', d: 'A las 8:30 en la calle, cuatro paradas por bloque y parón a mediodía sólo si aprieta el calor.' },
    { id: 'intenso', t: 'Intenso', d: 'A las 8:00, cinco paradas por bloque y sin siesta. Para viajes cortos en los que hay que verlo todo.' }
  ];

  var PRESUPUESTOS_UI = [
    { id: 'ajustado', t: 'Ajustado', d: 'Unos 30 € por persona y día: mercados, bocadillos y una comida sentada.' },
    { id: 'medio', t: 'Medio', d: 'Unos 55 € por persona y día: una comida sentada y algo rápido para la otra.' },
    { id: 'holgado', t: 'Holgado', d: 'Unos 95 € por persona y día: comer y cenar sentados, con vino.' }
  ];

  var INTERESES_UI = [
    { id: 'historia', t: 'Historia' },
    { id: 'arte', t: 'Arte y museos' },
    { id: 'comida', t: 'Comer y mercados' },
    { id: 'foto', t: 'Vistas y fotos' },
    { id: 'naturaleza', t: 'Parques y aire libre' },
    { id: 'compras', t: 'Tiendas y artesanía' },
    { id: 'noche', t: 'Salir de noche' }
  ];

  /* ---------- Pintado ---------- */

  /* Qué pasos se ven, en orden */
  function secuencia() {
    var s = [0, 1, 2, 3, 4, 5];
    if (cfg.modo === 'propio') s.push(PASO_ITINERARIO);
    s.push(PASO_RESUMEN);
    return s;
  }

  function pintarPasos() {
    var s = secuencia();
    var c = $('#pasos');
    c.innerHTML = '';
    for (var i = 0; i < s.length; i++) {
      var b = document.createElement('span');
      b.className = 'pasos__p' + (i === indice ? ' es-actual' : (i < indice ? ' es-hecho' : ''));
      c.appendChild(b);
    }
  }

  function pintarDestinos() {
    var c = $('#destinos');
    c.innerHTML = '';
    CATALOGO.forEach(function (d) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'destino' + (cfg.destino === d.clave ? ' es-elegido' : '');
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', String(cfg.destino === d.clave));
      b.innerHTML =
        '<span class="destino__b" aria-hidden="true">' + d.bandera + '</span>' +
        '<span class="destino__c">' + d.ciudad + '</span>' +
        '<span class="destino__p">' + d.pais + '</span>' +
        '<span class="destino__g">' + d.gancho + '</span>';
      b.addEventListener('click', function () {
        cfg.destino = d.clave;
        pintarDestinos();
        pintarAeropuertos();
        $('#destino-otro').hidden = d.clave !== 'generico';
      });
      c.appendChild(b);
    });
    $('#destino-otro').hidden = cfg.destino !== 'generico';
  }

  function pintarPaises() {
    var s = $('#pais');
    s.innerHTML = '';
    PAISES_ELEGIBLES.forEach(function (p) {
      var o = document.createElement('option');
      o.value = p.cod; o.textContent = p.nombre;
      if (cfg.pais === p.cod) o.selected = true;
      s.appendChild(o);
    });
  }

  function pintarAeropuertos() {
    var pack = PACKS[cfg.destino] || PACKS.generico;
    var s = $('#ida-hasta');
    s.innerHTML = '';
    var lista = pack.aeropuertos || [];
    if (!lista.length || !lista[0].cod) {
      var o = document.createElement('option');
      o.value = ''; o.textContent = 'El aeropuerto de la ciudad';
      s.appendChild(o);
      return;
    }
    lista.forEach(function (a) {
      var o = document.createElement('option');
      o.value = a.cod;
      o.textContent = a.cod + ' · ' + a.nombre + ' (' + a.min + ' min al centro)';
      if (cfg.vuelos.ida.hastaCod === a.cod) o.selected = true;
      s.appendChild(o);
    });
  }

  function pintarLista(contenedor, items, seleccion, multiple, alCambiar) {
    var c = $(contenedor);
    c.innerHTML = '';
    items.forEach(function (it) {
      var puesto = multiple ? seleccion.indexOf(it.id) !== -1 : seleccion === it.id;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'opcion-b' + (puesto ? ' es-elegido' : '');
      b.setAttribute('aria-pressed', String(puesto));
      b.innerHTML = '<span class="opcion-b__t">' + it.t + '</span>' +
                    (it.d ? '<span class="opcion-b__d">' + it.d + '</span>' : '');
      b.addEventListener('click', function () { alCambiar(it.id); });
      c.appendChild(b);
    });
  }

  function pintarChips() {
    var c = $('#intereses');
    c.innerHTML = '';
    INTERESES_UI.forEach(function (it) {
      var puesto = cfg.intereses.indexOf(it.id) !== -1;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip-b' + (puesto ? ' es-elegido' : '');
      b.setAttribute('aria-pressed', String(puesto));
      b.textContent = it.t;
      b.addEventListener('click', function () {
        var i = cfg.intereses.indexOf(it.id);
        if (i === -1) cfg.intereses.push(it.id); else cfg.intereses.splice(i, 1);
        pintarChips();
      });
      c.appendChild(b);
    });
  }

  function pintarOpciones() {
    pintarLista('#modos', MODOS_UI, cfg.modo, false, function (id) {
      cfg.modo = id; pintarOpciones(); pintarPasos();
    });
    pintarLista('#perfiles', PERFILES_UI, cfg.perfiles, true, function (id) {
      var i = cfg.perfiles.indexOf(id);
      if (i === -1) cfg.perfiles.push(id); else cfg.perfiles.splice(i, 1);
      pintarOpciones();
    });
    pintarLista('#ritmos', RITMOS_UI, cfg.ritmo, false, function (id) {
      cfg.ritmo = id; pintarOpciones();
    });
    pintarLista('#presupuestos', PRESUPUESTOS_UI, cfg.presupuesto, false, function (id) {
      cfg.presupuesto = id; pintarOpciones();
    });
  }

  /* ---------- Leer y escribir el formulario ---------- */

  function volcarACampos() {
    $('#ciudad').value = cfg.ciudad || '';
    $('#inicio').value = cfg.inicio || '';
    $('#fin').value = cfg.fin || '';
    $('#ida-salida').value = cfg.vuelos.ida.salida || '';
    $('#ida-llegada').value = cfg.vuelos.ida.llegada || '';
    $('#ida-desde').value = cfg.vuelos.ida.desde || '';
    $('#vuelta-salida').value = cfg.vuelos.vuelta.salida || '';
    $('#vuelta-llegada').value = cfg.vuelos.vuelta.llegada || '';
    $('#aloj-nombre').value = cfg.alojamiento.nombre || '';
    $('#aloj-dir').value = cfg.alojamiento.dir || '';
    $('#aloj-nota').value = cfg.alojamiento.nota || '';
    $('#nombres').value = (cfg.nombres || []).join(', ');
    $('#adultos').value = cfg.adultos;
    $('#ninos').value = cfg.ninos;
    if (cfg.propio && cfg.propio.dias && cfg.propio.dias.length) {
      $('#itinerario').value = Importar.aTexto(cfg.propio.dias);
    }
  }

  function leerCampos() {
    cfg.ciudad = $('#ciudad').value.trim();
    cfg.pais = $('#pais').value;
    cfg.inicio = $('#inicio').value;
    cfg.fin = $('#fin').value;

    var hasta = $('#ida-hasta');
    var pack = PACKS[cfg.destino] || PACKS.generico;
    var aero = (pack.aeropuertos || []).filter(function (a) { return a.cod === hasta.value; })[0] ||
               (pack.aeropuertos || [])[0] || {};

    cfg.vuelos.ida = {
      salida: $('#ida-salida').value,
      llegada: $('#ida-llegada').value,
      desde: $('#ida-desde').value.trim(),
      hastaCod: hasta.value,
      hasta: aero.cod ? aero.cod + ' · ' + aero.nombre : (cfg.ciudad || pack.ciudad)
    };
    cfg.vuelos.vuelta = {
      salida: $('#vuelta-salida').value,
      llegada: $('#vuelta-llegada').value,
      desde: cfg.vuelos.ida.hasta,
      hasta: cfg.vuelos.ida.desde
    };

    cfg.alojamiento = {
      nombre: $('#aloj-nombre').value.trim(),
      dir: $('#aloj-dir').value.trim(),
      nota: $('#aloj-nota').value.trim(),
      maps: [$('#aloj-nombre').value.trim(), $('#aloj-dir').value.trim()].filter(Boolean).join(', ')
    };

    cfg.nombres = $('#nombres').value.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    cfg.adultos = Math.max(1, parseInt($('#adultos').value, 10) || 1);
    cfg.ninos = Math.max(0, parseInt($('#ninos').value, 10) || 0);
    if (cfg.ninos > 0 && cfg.perfiles.indexOf('ninos') === -1) cfg.perfiles.push('ninos');
  }

  /* ---------- Validación por paso ---------- */

  function validar(p) {
    leerCampos();
    if (p === 0) {
      if (!cfg.destino) return 'Hay que elegir un destino.';
      if (cfg.destino === 'generico' && !cfg.ciudad) return 'Escribe el nombre de la ciudad.';
    }
    if (p === 2) {
      if (!cfg.inicio || !cfg.fin) return 'Hacen falta las dos fechas.';
      if (cfg.fin < cfg.inicio) return 'La vuelta no puede ser antes que la ida.';
      var noches = Math.round((new Date(cfg.fin) - new Date(cfg.inicio)) / 86400000);
      if (noches > 21) return 'De momento el motor está pensado para viajes de hasta tres semanas.';
    }
    if (p === PASO_ITINERARIO) {
      leerItinerario();          // por si se pulsa antes de que salte el temporizador
      if (!cfg.propio.dias.length) {
        return 'No hemos podido leer ningún día. Escribe al menos una parada, o vuelve atrás y elige que te lo propongamos nosotros.';
      }
    }
    return null;
  }

  /* ============================================================
     EDITOR DEL ITINERARIO PROPIO
     ============================================================ */

  function leerItinerario() {
    var dias = Importar.leer($('#itinerario').value);
    cfg.propio = { dias: dias };
    pintarVistaPrevia(dias);
  }

  function pintarVistaPrevia(dias) {
    var caja = $('#vista-previa');
    if (!dias.length) { caja.hidden = true; caja.innerHTML = ''; return; }

    var totalDias = cfg.inicio && cfg.fin
      ? Math.round((new Date(cfg.fin) - new Date(cfg.inicio)) / 86400000) + 1 : dias.length;

    var html = '<h3 class="vista-previa__t">Así lo hemos entendido</h3>';
    var reconocidas = 0, paradas = 0;
    var pack = PACKS[cfg.destino] || PACKS.generico;

    html += '<ol class="vista-previa__l">';
    dias.forEach(function (d, i) {
      html += '<li><b>' + escapar(d.titulo || ('Día ' + (i + 1))) + '</b><ul>';
      d.paradas.forEach(function (p) {
        paradas++;
        var conocida = reconocer(pack, p.nombre);
        if (conocida) reconocidas++;
        html += '<li>' + (p.hora ? '<span class="vp-h">' + p.hora + '</span> ' : '') +
                escapar(p.nombre) +
                (conocida ? ' <span class="vp-ok">reconocido</span>' : '') + '</li>';
      });
      html += '</ul></li>';
    });
    html += '</ol>';

    var avisos = [];
    avisos.push(dias.length + (dias.length === 1 ? ' día' : ' días') + ' y ' + paradas + ' paradas.');
    if (reconocidas) avisos.push('Reconocemos ' + reconocidas + ' de ellas y les añadiremos precio, avisos y reservas.');
    if (totalDias && dias.length > totalDias) {
      avisos.push('Ojo: has escrito más días de los que dura el viaje. Los que sobran no se pintarán.');
    }
    if (totalDias && dias.length < totalDias) {
      avisos.push('Faltan ' + (totalDias - dias.length) + ' días por rellenar; saldrán vacíos y se pueden completar luego.');
    }
    html += '<p class="vista-previa__a">' + escapar(avisos.join(' ')) + '</p>';

    caja.innerHTML = html;
    caja.hidden = false;
  }

  function reconocer(pack, nombre) {
    var n = Importar.sinAcentos(nombre).replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
    if (n.length < 4) return false;
    var listas = [pack.lugares || [], pack.restaurantes || []];
    for (var i = 0; i < listas.length; i++) {
      for (var j = 0; j < listas[i].length; j++) {
        if (listas[i][j].plantilla) continue;
        var m = Importar.sinAcentos(listas[i][j].nombre).replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
        if (m.length >= 4 && (n.indexOf(m) !== -1 || m.indexOf(n) !== -1)) return true;
      }
    }
    return false;
  }

  function escapar(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  var temporizador = null;
  $('#itinerario').addEventListener('input', function () {
    clearTimeout(temporizador);
    temporizador = setTimeout(leerItinerario, 350);
  });

  $('#fichero').addEventListener('change', function () {
    var f = this.files && this.files[0];
    if (!f) return;
    var lector = new FileReader();
    lector.onload = function () {
      $('#itinerario').value = String(lector.result || '');
      leerItinerario();
    };
    lector.onerror = function () { alert('No hemos podido leer el fichero.'); };
    lector.readAsText(f, 'utf-8');
  });

  /* Partir de la propuesta y editarla es, para mucha gente, el
     camino más rápido: se corrige lo que no encaja y ya está. */
  $('#btn-sugerir').addEventListener('click', function () {
    var err = validar(2);
    if (err) { alert(err); return; }
    var copia = JSON.parse(JSON.stringify(cfg));
    copia.modo = 'sugerido';
    var v;
    try { v = generarViaje(copia); }
    catch (e) { alert('No hemos podido generar la propuesta: revisa las fechas.'); return; }

    var dias = v.dias.map(function (d) {
      var paradas = [];
      d.bloques.forEach(function (b) {
        b.paradas.forEach(function (p) {
          if (p.tipo === 'transporte') return;      // los traslados se ponen solos
          paradas.push({ hora: p.hora, nombre: p.nombre, por: '' });
        });
      });
      return { titulo: d.dia + ' · ' + d.titulo, paradas: paradas };
    });
    $('#itinerario').value = Importar.aTexto(dias);
    leerItinerario();
  });

  $('#btn-ejemplo').addEventListener('click', function () {
    $('#itinerario').value =
      'Jueves 13\n' +
      '09:00 Piazza San Marco — a primera hora está vacía\n' +
      '10:30 Mercado de Rialto\n' +
      '13:30 Comer en Osteria La Zucca\n' +
      '18:00 Libreria Acqua Alta\n\n' +
      'Viernes 14\n' +
      'Burano\n' +
      'Murano\n' +
      '20:30 Cena por Cannaregio';
    leerItinerario();
  });

  function actualizarDuracion() {
    var i = $('#inicio').value, f = $('#fin').value;
    var n = $('#duracion-nota');
    if (!i || !f || f < i) { n.textContent = ''; return; }
    var noches = Math.round((new Date(f) - new Date(i)) / 86400000);
    n.textContent = (noches + 1) + ' días y ' + noches + (noches === 1 ? ' noche.' : ' noches.') +
      (noches <= 1 ? ' Con tan poco tiempo, el motor concentra lo imprescindible y quita las excursiones.' : '');
  }
  $('#inicio').addEventListener('change', actualizarDuracion);
  $('#fin').addEventListener('change', actualizarDuracion);

  /* ---------- Resumen ---------- */

  function pintarResumen() {
    leerCampos();
    var pack = PACKS[cfg.destino] || PACKS.generico;
    var ciudad = cfg.destino === 'generico' ? (cfg.ciudad || 'Sin ciudad') : pack.ciudad;
    var noches = Math.round((new Date(cfg.fin) - new Date(cfg.inicio)) / 86400000);
    var per = cfg.adultos + cfg.ninos;

    var filas = [
      ['Destino', ciudad + (pack.generico ? ' · plantilla genérica' : ' · catálogo completo')],
      ['Itinerario', cfg.modo === 'propio'
        ? 'El tuyo · ' + cfg.propio.dias.length + (cfg.propio.dias.length === 1 ? ' día escrito' : ' días escritos')
        : 'Lo propone el motor'],
      ['Fechas', cfg.inicio + ' → ' + cfg.fin + ' · ' + (noches + 1) + ' días'],
      ['Viajeros', per + (per === 1 ? ' persona' : ' personas') + (cfg.nombres.length ? ' · ' + cfg.nombres.join(' & ') : '')],
      ['Alojamiento', cfg.alojamiento.nombre || 'Sin especificar'],
      ['Ritmo', (RITMOS_UI.filter(function (r) { return r.id === cfg.ritmo; })[0] || {}).t],
      ['Presupuesto', (PRESUPUESTOS_UI.filter(function (r) { return r.id === cfg.presupuesto; })[0] || {}).t],
      ['Intereses', cfg.intereses.length ? cfg.intereses.map(function (i) {
        return (INTERESES_UI.filter(function (x) { return x.id === i; })[0] || {}).t;
      }).join(' · ') : 'Todo lo imprescindible']
    ];
    if (cfg.perfiles.length) {
      filas.push(['Ritmo condicionado por', cfg.perfiles.map(function (p) {
        return (PERFILES_UI.filter(function (x) { return x.id === p; })[0] || {}).t;
      }).join(' · ')]);
    }

    var html = '<dl class="resumen">';
    filas.forEach(function (f) {
      html += '<div class="resumen__f"><dt>' + f[0] + '</dt><dd>' + (f[1] || '—') + '</dd></div>';
    });
    html += '</dl>';
    $('#resumen').innerHTML = html;

    /* Una previsualización real: montamos el viaje y contamos */
    var avisos = [];
    try {
      var v = generarViaje(cfg);
      var paradas = 0;
      v.dias.forEach(function (d) {
        d.bloques.forEach(function (b) { paradas += b.paradas.length; });
      });
      var total = 0;
      v.presupuesto.fijos.forEach(function (f) { total += f.importe; });
      v.presupuesto.opciones.forEach(function (op) {
        op.alts.forEach(function (a) { if (a.id === op.elegida) total += a.importe; });
      });
      avisos.push('Van a salir ' + v.dias.length + ' días con ' + paradas + ' paradas, ' +
        v.restaurantes.length + ' sitios para comer y un presupuesto estimado de ' +
        Math.round(total) + ' € sin vuelos ni alojamiento.');
      if (cfg.modo === 'propio') {
        avisos.push('Las paradas son las tuyas: el motor sólo pone las horas, los traslados y lo que sepamos de cada sitio.');
      }
      if (!cfg.vuelos.ida.llegada) avisos.push('Sin hora de llegada se supone que se llega a media tarde.');
      if (!cfg.alojamiento.nombre) avisos.push('Sin alojamiento, el primer día no tendrá botón de "cómo llegar".');
    } catch (e) {
      avisos.push('Algo no cuadra en los datos: revisa las fechas.');
    }
    $('#avisos-resumen').textContent = avisos.join(' ');
  }

  /* ---------- Navegación ---------- */

  function mostrar(i) {
    var s = secuencia();
    indice = Math.max(0, Math.min(s.length - 1, i));
    var actual = s[indice];

    Array.prototype.forEach.call(document.querySelectorAll('.paso'), function (sec) {
      sec.hidden = +sec.dataset.paso !== actual;
    });
    $('#btn-atras').hidden = indice === 0;
    $('#btn-siguiente').hidden = indice === s.length - 1;
    $('#btn-generar').hidden = indice !== s.length - 1;

    if (actual === PASO_ITINERARIO) leerItinerario();
    if (actual === PASO_RESUMEN) pintarResumen();
    pintarPasos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function pasoActual() { return secuencia()[indice]; }

  $('#btn-siguiente').addEventListener('click', function () {
    var err = validar(pasoActual());
    if (err) { alert(err); return; }
    mostrar(indice + 1);
  });
  $('#btn-atras').addEventListener('click', function () { leerCampos(); mostrar(indice - 1); });

  $('#form').addEventListener('submit', function (e) {
    e.preventDefault();
    var s = secuencia();
    for (var i = 0; i < s.length - 1; i++) {
      var err = validar(s[i]);
      if (err) { alert(err); mostrar(i); return; }
    }
    var guardado = Almacen.guardar(cfg);
    location.href = 'viaje.html?id=' + guardado.id;
  });

  /* ---------- Arranque ---------- */
  pintarDestinos();
  pintarPaises();
  pintarAeropuertos();
  pintarOpciones();
  pintarChips();
  volcarACampos();
  actualizarDuracion();
  mostrar(0);
})();
