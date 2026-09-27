/* ============================================================
   Bitácora — el motor
   Coge los parámetros del viajero (CONFIG) y un pack de destino
   y devuelve el objeto VIAJE que pinta la app: itinerario con
   horas reales, restaurantes repartidos por días, presupuesto
   calculado, frases del idioma y checklist adaptada.

   Todo lo que decide está aquí y sólo aquí. Los packs son datos
   y la app sólo pinta.
   ============================================================ */

/* ---------- Tablas de decisión ---------- */

var RITMOS = {
  suave:   { nombre: 'suave',   inicio: 540, maxManana: 3, maxTarde: 3, siestaSiempre: true,  colchon: 15, viajesDia: 3, cierreNoche: 1350 },
  normal:  { nombre: 'normal',  inicio: 510, maxManana: 4, maxTarde: 4, siestaSiempre: false, colchon: 10, viajesDia: 3, cierreNoche: 1380 },
  intenso: { nombre: 'intenso', inicio: 480, maxManana: 5, maxTarde: 5, siestaSiempre: false, colchon: 5,  viajesDia: 4, cierreNoche: 1410 }
};

var NIVELES = {
  ajustado: { comidaDia: 30, maxNivel: 1, prefNivel: 0, texto: 'comiendo barato: mercados, bocadillos y una comida sentada al día' },
  medio:    { comidaDia: 55, maxNivel: 2, prefNivel: 1, texto: 'una comida sentada al día y algo rápido para la otra' },
  holgado:  { comidaDia: 95, maxNivel: 3, prefNivel: 2, texto: 'comiendo y cenando sentados, con vino' }
};

/* Perfiles que cambian el ritmo del viaje. Se pueden combinar. */
var PERFILES = {
  embarazo: {
    etiqueta: 'Embarazo',
    siesta: true, menosParadas: 1, avisaEscaleras: true,
    nota: 'El itinerario deja la siesta metida a mediodía y evita los tramos largos de pie.'
  },
  ninos: {
    etiqueta: 'Con niños',
    siesta: true, menosParadas: 1, avisaEscaleras: false,
    nota: 'Menos paradas por bloque, parón a mediodía y prioridad a los sitios donde se pueda parar y correr.'
  },
  movilidad: {
    etiqueta: 'Movilidad reducida',
    siesta: true, menosParadas: 1, sinEscaleras: true,
    nota: 'Se han quitado del itinerario los sitios con escaleras estrechas o suelo irregular.'
  },
  mayores: {
    etiqueta: 'Viajamos con mayores',
    siesta: true, menosParadas: 1, avisaEscaleras: true,
    nota: 'Ritmo pausado, con descanso a mediodía y avisos en lo que tenga muchos escalones.'
  }
};

var DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
             'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

/* ---------- Utilidades de fecha y hora ---------- */

function isoAPartes(iso) {
  var p = String(iso).split('-');
  return { a: +p[0], m: +p[1], d: +p[2] };
}

function isoADate(iso) {
  var p = isoAPartes(iso);
  return new Date(Date.UTC(p.a, p.m - 1, p.d));
}

function dateAIso(d) {
  var m = d.getUTCMonth() + 1, dd = d.getUTCDate();
  return d.getUTCFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (dd < 10 ? '0' : '') + dd;
}

function sumarDias(iso, n) {
  var d = isoADate(iso);
  d.setUTCDate(d.getUTCDate() + n);
  return dateAIso(d);
}

function diasEntre(a, b) {
  return Math.round((isoADate(b) - isoADate(a)) / 86400000);
}

function hhmmAMin(h) {
  if (!h) return null;
  var p = String(h).split(':');
  return (+p[0]) * 60 + (+p[1] || 0);
}

function minAHhmm(m) {
  m = Math.round(m);
  var extra = '';
  if (m >= 1440) { m -= 1440; extra = ''; }
  if (m < 0) m = 0;
  var h = Math.floor(m / 60), mm = m % 60;
  return (h < 10 ? '0' : '') + h + ':' + (mm < 10 ? '0' : '') + mm + extra;
}

function nombreDia(iso) {
  var d = isoADate(iso);
  return DIAS_SEMANA[d.getUTCDay()] + ' ' + d.getUTCDate();
}

function diaSemana(iso) { return isoADate(iso).getUTCDay(); }

function fechaLarga(iso) {
  var p = isoAPartes(iso);
  return p.d + ' de ' + MESES[p.m - 1];
}

function rangoFechas(ini, fin) {
  var a = isoAPartes(ini), b = isoAPartes(fin);
  if (a.m === b.m) return a.d + ' – ' + b.d + ' de ' + MESES[b.m - 1] + ' de ' + b.a;
  return a.d + ' de ' + MESES[a.m - 1] + ' – ' + b.d + ' de ' + MESES[b.m - 1] + ' de ' + b.a;
}

function eurTxt(n) {
  var s = Math.round(Math.abs(n) * 100) / 100;
  var txt = (s % 1 === 0 ? String(s) : s.toFixed(2).replace('.', ','));
  return (n < 0 ? '−' : '') + txt + ' €';
}

/* ============================================================
   GENERADOR
   ============================================================ */

function generarViaje(cfg) {
  var pack = PACKS[cfg.destino] || PACKS.generico;
  var esGenerico = !!pack.generico;

  var ctx = {
    cfg: cfg,
    pack: pack,
    generico: esGenerico,
    ciudad: esGenerico ? (cfg.ciudad || 'Nuestro destino') : pack.ciudad,
    paisCod: esGenerico ? (cfg.pais || pack.pais) : pack.pais,
    ritmo: RITMOS[cfg.ritmo] || RITMOS.normal,
    nivel: NIVELES[cfg.presupuesto] || NIVELES.medio,
    perfiles: cfg.perfiles || [],
    personas: Math.max(1, (cfg.adultos || 2) + (cfg.ninos || 0)),
    adultos: Math.max(1, cfg.adultos || 2),
    usados: {},          // id de lugar → true
    restUsados: {},      // nombre de restaurante → día en que se usa
    reservas: []         // se van acumulando para el checklist
  };
  ctx.pais = PAISES[ctx.paisCod] || PAISES.es;
  ctx.idioma = ctx.pais.idioma;
  ctx.mes = isoAPartes(cfg.inicio).m;
  ctx.clima = pack.clima ? pack.clima[ctx.mes] : null;
  ctx.calor = !!(ctx.clima && ctx.clima.calor);

  /* Cuántas paradas caben en un bloque con este perfil */
  var menos = 0;
  ctx.perfiles.forEach(function (p) {
    if (PERFILES[p] && PERFILES[p].menosParadas) menos = Math.max(menos, PERFILES[p].menosParadas);
  });
  ctx.maxManana = Math.max(2, ctx.ritmo.maxManana - menos);
  ctx.maxTarde = Math.max(2, ctx.ritmo.maxTarde - menos);

  ctx.siesta = ctx.ritmo.siestaSiempre || ctx.calor ||
    ctx.perfiles.some(function (p) { return PERFILES[p] && PERFILES[p].siesta; });
  ctx.sinEscaleras = ctx.perfiles.some(function (p) { return PERFILES[p] && PERFILES[p].sinEscaleras; });
  ctx.avisaEscaleras = ctx.perfiles.some(function (p) { return PERFILES[p] && PERFILES[p].avisaEscaleras; });

  ctx.aeropuerto = elegirAeropuerto(pack, cfg);

  /* Dos modos: o el motor propone el itinerario, o el viajero trae
     el suyo y el motor se limita a vestirlo. */
  ctx.propio = cfg.modo === 'propio' && cfg.propio && (cfg.propio.dias || []).length > 0;

  var plan = planificarDias(ctx);
  var dias = ctx.propio
    ? construirDiasPropios(ctx, plan)
    : plan.map(function (p, i) { return construirDia(ctx, p, i, plan.length); });

  return {
    meta: metaViaje(ctx, plan),
    dias: dias,
    restaurantes: listaRestaurantes(ctx),
    frases: construirFrases(ctx.idioma, ctx.perfiles),
    presupuesto: construirPresupuesto(ctx, plan, dias),
    checklist: construirChecklist(ctx),
    info: construirInfo(ctx),
    compras: pack.compras || ''
  };
}

/* ---------- Aeropuerto y traslados ---------- */

function elegirAeropuerto(pack, cfg) {
  var lista = pack.aeropuertos || [];
  var cod = (cfg.vuelos && cfg.vuelos.ida && cfg.vuelos.ida.hastaCod) || '';
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].cod && cod && lista[i].cod.toUpperCase() === cod.toUpperCase()) return lista[i];
  }
  return lista[0] || { cod: '', nombre: 'aeropuerto', min: 60, pasos: [], vuelta: '' };
}

/* ---------- Reparto de días ---------- */

function planificarDias(ctx) {
  var cfg = ctx.cfg;
  var total = diasEntre(cfg.inicio, cfg.fin) + 1;
  var plan = [];

  var trasladoIda = ctx.aeropuerto.min || 60;
  var llegada = hhmmAMin(cfg.vuelos && cfg.vuelos.ida ? cfg.vuelos.ida.llegada : null);
  var salida = hhmmAMin(cfg.vuelos && cfg.vuelos.vuelta ? cfg.vuelos.vuelta.salida : null);

  for (var i = 0; i < total; i++) {
    var iso = sumarDias(cfg.inicio, i);
    var p = { iso: iso, dow: diaSemana(iso), indice: i, tipo: 'completo' };

    if (i === 0) {
      p.tipo = 'llegada';
      /* La hora libre empieza al llegar al alojamiento. Sin datos de
         vuelo suponemos que se llega a media tarde. */
      p.libreDesde = (llegada === null ? 17 * 60 : llegada + trasladoIda + 20);
      p.llegadaVuelo = llegada;
    }
    if (i === total - 1 && total > 1) {
      p.tipo = 'salida';
      /* Tres horas antes del vuelo en el aeropuerto, más el traslado. */
      p.salirA = (salida === null ? 11 * 60 : salida - 180 - trasladoIda);
      p.salidaVuelo = salida;
    }
    if (total === 1) {
      p.tipo = 'unico';
      p.libreDesde = (llegada === null ? 10 * 60 : llegada + trasladoIda + 20);
      p.salirA = (salida === null ? 20 * 60 : salida - 180 - trasladoIda);
    }
    plan.push(p);
  }

  /* ¿Qué días dan para itinerario de verdad? */
  plan.forEach(function (p) {
    if (p.tipo === 'completo') { p.horas = 12; return; }
    if (p.tipo === 'llegada') { p.horas = Math.max(0, (ctx.ritmo.cierreNoche - p.libreDesde) / 60); return; }
    if (p.tipo === 'salida') { p.horas = Math.max(0, (p.salirA - ctx.ritmo.inicio) / 60); return; }
    p.horas = Math.max(0, (p.salirA - p.libreDesde) / 60);
  });

  /* Con itinerario propio no hay nada que repartir: los barrios los
     ha decidido ya el viajero. */
  if (!ctx.propio) asignarZonas(ctx, plan);
  return plan;
}

/* Reparte los barrios entre los días para no cruzar la ciudad tres
   veces al día. El día con más horas se lleva la zona más cargada. */
function asignarZonas(ctx, plan) {
  var pack = ctx.pack;
  var elegibles = pack.lugares.filter(function (l) { return lugarValido(ctx, l); });

  var puntos = {};
  elegibles.forEach(function (l) {
    puntos[l.zona] = (puntos[l.zona] || 0) + (4 - Math.min(3, l.prioridad || 2));
  });

  var zonas = (pack.zonas || []).filter(function (z) { return puntos[z.id]; });
  zonas.sort(function (a, b) { return puntos[b.id] - puntos[a.id]; });

  var conTiempo = plan.filter(function (p) { return p.horas >= 3.5; });
  var excursion = null;
  zonas = zonas.filter(function (z) {
    if (z.excursion && !excursion) { excursion = z; return false; }
    return true;
  });

  /* La excursión sólo cabe si hay al menos tres días de verdad, y
     nunca el día de llegada ni el de vuelta. */
  var slots = conTiempo.slice();
  if (excursion && slots.length >= 3) {
    var completos = slots.filter(function (p) { return p.tipo === 'completo'; });
    var elegido = completos[Math.min(1, completos.length - 1)];
    if (elegido) { elegido.zona = excursion; elegido.excursion = true; }
  }

  var libres = slots.filter(function (p) { return !p.zona; });
  libres.forEach(function (p, i) {
    p.zona = zonas.length ? zonas[i % zonas.length] : null;
  });
  plan.forEach(function (p) { if (!p.zona) p.zona = zonas[0] || null; });
}

/* ---------- Selección de lugares ---------- */

function lugarValido(ctx, l) {
  if (ctx.sinEscaleras && l.escaleras) return false;
  var ints = ctx.cfg.intereses || [];
  if ((l.prioridad || 2) === 1) return true;              // los imprescindibles no se filtran
  if (!l.intereses || !l.intereses.length) return true;
  if (!ints.length) return true;
  return l.intereses.some(function (t) { return ints.indexOf(t) !== -1; });
}

/* Devuelve los candidatos de un día, primero los de su zona. */
function candidatos(ctx, plan, franja) {
  var zonaId = plan.zona ? plan.zona.id : null;
  var lista = ctx.pack.lugares.filter(function (l) {
    if (ctx.usados[l.id]) return false;
    if (!lugarValido(ctx, l)) return false;
    if (l.cierra && l.cierra.indexOf(plan.dow) !== -1) return false;
    var f = l.franja || 'cualquiera';
    if (franja === 'manana' && f !== 'manana' && f !== 'cualquiera') return false;
    if (franja === 'tarde' && f !== 'tarde' && f !== 'cualquiera') return false;
    if (franja === 'noche' && f !== 'noche') return false;
    /* Las excursiones sólo salen el día que les toca */
    var z = zonaDe(ctx, l.zona);
    if (z && z.excursion && !plan.excursion) return false;
    return true;
  });

  lista.sort(function (a, b) {
    var za = (a.zona === zonaId) ? 0 : 1;
    var zb = (b.zona === zonaId) ? 0 : 1;
    if (za !== zb) return za - zb;
    if (franja === 'manana') {
      var aa = a.amanecer ? 0 : 1, ab = b.amanecer ? 0 : 1;
      if (aa !== ab) return aa - ab;
    }
    return (a.prioridad || 2) - (b.prioridad || 2);
  });
  return lista;
}

function zonaDe(ctx, id) {
  var zs = ctx.pack.zonas || [];
  for (var i = 0; i < zs.length; i++) if (zs[i].id === id) return zs[i];
  return null;
}

/* Convierte un lugar del pack en una parada con hora. */
function paradaDeLugar(ctx, l, minuto) {
  var p = {
    hora: minAHhmm(minuto),
    nombre: l.nombre,
    tipo: l.tipo || 'lugar',
    tag: (l.prioridad || 2) >= 3 ? 'extra' : 'esencial',
    por: l.por,
    tip: l.tip,
    aviso: l.aviso,
    maps: l.maps || (l.plantilla ? '' : l.nombre + ', ' + ctx.ciudad),
    precio: l.precio,
    min: l.and,
    plantilla: !!l.plantilla
  };
  if (l.reserva) {
    p.aviso = (p.aviso ? p.aviso + ' ' : '') + l.reserva;
    ctx.reservas.push(l.nombre + ' — ' + l.reserva);
  }
  if (ctx.avisaEscaleras && l.escaleras && !p.aviso) {
    p.aviso = 'Tiene escaleras o desniveles: si el día viene cansado, se puede dejar caer.';
  }
  /* Los sitios que sólo están bien a primera hora dejan de estarlo
     enseguida, y con ritmo suave se llega tarde a propósito. */
  if (l.amanecer && minuto > 9 * 60 + 30) {
    p.aviso = (p.aviso ? p.aviso + ' ' : '') +
      'Esto está mucho mejor cuanto antes: a partir de las diez cambia por completo. Si alguien se levanta pronto, merece madrugar.';
  }
  ctx.usados[l.id] = true;
  return p;
}

/* ---------- Restaurantes ---------- */

/* Palabras del barrio del día, para no mandar a nadie a comer al
   otro lado de la ciudad estando ya en el sitio. */
function pistasDeZona(plan) {
  if (!plan.zona || !plan.zona.nombre) return [];
  return plan.zona.nombre.toLowerCase().split(/[\s·,]+/).filter(function (w) {
    return w.length > 3 && w !== 'para' && w !== 'islas';
  });
}

function elegirRestaurante(ctx, plan, momento) {
  var nivelMax = ctx.nivel.maxNivel;
  var cands = ctx.pack.restaurantes.filter(function (r) {
    if (!r[momento]) return false;
    if ((r.nivel || 0) > nivelMax) return false;
    if (r.cierraDias && r.cierraDias.indexOf(plan.dow) !== -1) return false;
    return true;
  });
  if (!cands.length) return null;

  var self = ctx;
  var pistas = plan.excursion ? [] : pistasDeZona(plan);
  cands.sort(function (a, b) { return puntuar(b) - puntuar(a); });
  var elegido = cands[0];
  if (!self.restUsados[elegido.nombre]) {
    self.restUsados[elegido.nombre] = nombreDia(plan.iso).split(' ')[0].slice(0, 3) + ' ' +
      isoAPartes(plan.iso).d + ' · ' + (momento === 'comida' ? 'comida' : momento === 'cena' ? 'cena' : momento);
  }
  return elegido;

  function puntuar(r) {
    var s = 0;
    if (self.restUsados[r.nombre]) s -= 12;
    s += (3 - Math.abs((r.nivel || 0) - self.nivel.prefNivel)) * 2;
    self.perfiles.forEach(function (pf) {
      var v = r.perfil && r.perfil[pf];
      if (v === 'ideal') s += 5;
      else if (v === 'ok') s += 2;
      else if (v === 'ojo') s -= 4;
    });
    if (r.confirmar) s -= 2;
    if (r.plantilla) s -= 1;
    var zona = (r.zona || '').toLowerCase();
    for (var i = 0; i < pistas.length; i++) {
      if (zona.indexOf(pistas[i]) !== -1) { s += 4; break; }
    }
    return s;
  }
}

function paradaDeRestaurante(ctx, r, minuto, momento) {
  if (!r) {
    return {
      hora: minAHhmm(minuto),
      nombre: momento === 'cena' ? 'Cena' : 'Comida',
      tipo: 'comida', tag: 'esencial', plantilla: true,
      por: 'Hueco para decidir sobre la marcha. En la pestaña de comer están las opciones abiertas hoy.'
    };
  }
  if (r.reserva) ctx.reservas.push('Reservar en ' + r.nombre + (r.tel ? ' · ' + r.tel : ''));
  var p = {
    hora: minAHhmm(minuto),
    nombre: r.nombre,
    tipo: 'comida',
    tag: 'esencial',
    por: r.nota,
    tip: r.detalle,
    maps: r.maps,
    precio: r.precio,
    plantilla: !!r.plantilla
  };
  if (r.confirmar) p.aviso = 'Conviene llamar antes: este sitio cierra por vacaciones sin avisar.';
  else if (r.reserva) p.aviso = 'Hay que reservar' + (r.tel ? ' · ' + r.tel : '') + '.';
  return p;
}

/* ---------- Construcción de un día ---------- */

function construirDia(ctx, plan, i, total) {
  var d = {
    id: 'd' + (i + 1),
    fecha: plan.iso,
    dia: nombreDia(plan.iso),
    titulo: '',
    lema: '',
    bloques: []
  };
  var avisos = [];

  if (plan.tipo === 'llegada') bloquesLlegada(ctx, plan, d, avisos, total);
  else if (plan.tipo === 'salida') bloquesSalida(ctx, plan, d, avisos);
  else if (plan.tipo === 'unico') { bloquesLlegada(ctx, plan, d, avisos, total); bloquesSalida(ctx, plan, d, avisos); }
  else bloquesCompleto(ctx, plan, d, avisos);

  /* Kilómetros a pie, estimados a 12 min/km con paradas */
  var and = 0;
  d.bloques.forEach(function (b) {
    b.paradas.forEach(function (p) { and += (p.min || 0); });
  });
  if (and) d.km = '~' + (Math.round(and * 0.075 * 2) / 2) + ' km';

  /* Reservas del día */
  var conHora = [];
  d.bloques.forEach(function (b) {
    b.paradas.forEach(function (p) {
      if (p.aviso && /reserv/i.test(p.aviso)) conHora.push(p.nombre);
    });
  });
  if (conHora.length) avisos.push('Hoy hay hora reservada: ' + conHora.join(', ') + '.');

  if (i === 0 && ctx.clima && ctx.clima.nota) avisos.push(ctx.clima.nota);
  if (plan.excursion) avisos.push('Hoy es día completo fuera: desayuno temprano, agua y volver con luz.');

  if (avisos.length) d.avisoDia = avisos.join(' ');
  return d;
}

/* El traslado del aeropuerto al alojamiento. Lo usan tanto el
   itinerario sugerido como el que trae el viajero de su casa. */
function trasladoLlegada(ctx, plan) {
  var cfg = ctx.cfg;
  var bloque = { franja: 'Llegada', paradas: [] };
  var t = plan.llegadaVuelo;
  var aero = ctx.aeropuerto;

  if (t !== null && t !== undefined) {
    bloque.paradas.push({
      hora: minAHhmm(t),
      nombre: 'Aterrizamos en ' + (aero.nombre || 'el aeropuerto') + (aero.cod ? ' (' + aero.cod + ')' : ''),
      tipo: 'transporte', tag: 'esencial',
      por: 'Recogemos las maletas y buscamos la salida hacia el transporte al centro.'
    });
    t += 45;
  } else {
    t = plan.libreDesde - (aero.min || 60);
  }

  (aero.pasos || []).forEach(function (paso) {
    bloque.paradas.push({
      hora: minAHhmm(t),
      nombre: paso.nombre,
      tipo: 'transporte', tag: 'esencial',
      min: paso.min,
      maps: paso.maps,
      por: paso.por, tip: paso.tip,
      precio: paso.precio
    });
    t += (paso.min || 20) + 10;
  });

  var aloj = cfg.alojamiento || {};
  bloque.paradas.push({
    hora: minAHhmm(t),
    nombre: aloj.nombre || 'El alojamiento',
    tipo: 'descanso', tag: 'esencial',
    maps: aloj.maps || aloj.dir || aloj.nombre,
    por: 'Check-in y soltar las maletas.',
    tip: aloj.nota
  });
  t += 30;
  return { bloque: bloque, hora: t };
}

function bloquesLlegada(ctx, plan, d, avisos, total) {
  d.titulo = total === 1 ? 'El día' : 'Llegada';

  var tr = trasladoLlegada(ctx, plan);
  var t = tr.hora;
  d.bloques.push(tr.bloque);

  /* Si se llega pronto, todavía queda día por delante */
  var libre = { franja: t < 15 * 60 ? 'Tarde' : 'Noche', paradas: [] };

  if (t < 14 * 60) {
    var rc = elegirRestaurante(ctx, plan, 'comida');
    libre.paradas.push(paradaDeRestaurante(ctx, rc, t, 'comida'));
    t += 75;
    var lista = candidatos(ctx, plan, 'tarde');
    for (var i = 0; i < Math.min(2, lista.length); i++) {
      t += (lista[i].and || 10) + ctx.ritmo.colchon;
      libre.paradas.push(paradaDeLugar(ctx, lista[i], t));
      t += lista[i].dur || 45;
    }
  }

  if (t < 22.5 * 60) {
    var rn = elegirRestaurante(ctx, plan, 'cena');
    var horaCena = Math.max(t, 20 * 60);
    libre.paradas.push(paradaDeRestaurante(ctx, rn, horaCena, 'cena'));
    t = horaCena + 90;
  } else {
    libre.paradas.push({
      hora: minAHhmm(t),
      nombre: 'Cena rápida cerca del alojamiento',
      tipo: 'comida', tag: 'esencial',
      por: 'A esta hora las cocinas ya han cerrado. Toca pizza al corte, un sitio para llevar o lo que quede abierto.',
      tip: 'Vale la pena mirarlo antes de aterrizar: llegar a las once de la noche a buscar cena por el móvil no sale bien.'
    });
    t += 45;
  }

  /* Un paseo de noche, si el cuerpo aguanta */
  if (t < ctx.ritmo.cierreNoche && ctx.ritmo.nombre !== 'suave') {
    var noche = candidatos(ctx, plan, 'noche');
    if (!noche.length) noche = candidatos(ctx, plan, 'tarde').filter(function (l) { return (l.prioridad || 2) === 1; });
    if (noche.length) {
      var l0 = noche[0];
      libre.paradas.push(paradaDeLugar(ctx, l0, t + 15));
      var ultima = libre.paradas[libre.paradas.length - 1];
      ultima.tag = 'extra';
      ultima.por = (ultima.por || '') + ' De noche y sin nadie es cuando mejor está, y no cuesta nada.';
    }
  }

  if (libre.paradas.length) d.bloques.push(libre);

  d.lema = plan.llegadaVuelo !== null && plan.llegadaVuelo !== undefined && plan.llegadaVuelo > 17 * 60
    ? 'Aterrizamos a las ' + minAHhmm(plan.llegadaVuelo) + ', así que hoy no hay turismo: traslado, cena y poco más.'
    : 'Llegada, dejar las maletas y empezar suave para hacerse a la ciudad.';
}

function bloquesCompleto(ctx, plan, d, avisos) {
  var z = plan.zona;
  d.titulo = z ? z.nombre : 'Ciudad';
  d.lema = z && z.nota ? z.nota : 'Un día por el centro.';

  var t = ctx.ritmo.inicio;

  /* --- Mañana --- */
  var man = { franja: 'Mañana', paradas: [] };
  var des = elegirRestaurante(ctx, plan, 'desayuno');
  if (des && ctx.ritmo.nombre !== 'intenso') {
    man.paradas.push(paradaDeRestaurante(ctx, des, t, 'desayuno'));
    t += 35;
  }

  var lm = candidatos(ctx, plan, 'manana');
  var cuenta = 0;
  for (var i = 0; i < lm.length && cuenta < ctx.maxManana; i++) {
    var l = lm[i];
    if (t + (l.dur || 45) > (ctx.siesta ? 13 * 60 : 14 * 60)) break;
    t += (cuenta === 0 ? 0 : (l.and || 10) + ctx.ritmo.colchon);
    man.paradas.push(paradaDeLugar(ctx, l, t));
    t += l.dur || 45;
    cuenta++;
  }
  /* Con ritmo suave el tope de paradas deja un hueco antes de comer.
     Mejor decirlo que dejar un agujero que parece un fallo. */
  var horaComida = Math.max(t + 15, 13 * 60);
  if (horaComida - t > 60) {
    man.paradas.push({
      hora: minAHhmm(t + 10),
      nombre: 'Rato libre por el barrio',
      tipo: 'lugar', tag: 'extra', relleno: true,
      por: 'Hasta la hora de comer no hay nada programado, y es a propósito: con este ritmo el hueco es donde aparecen las cosas que no salen en ninguna lista.'
    });
  }

  if (plan.excursion) {
    man.paradas.push({
      hora: minAHhmm(horaComida),
      nombre: 'Comer allí mismo',
      tipo: 'comida', tag: 'esencial', plantilla: true,
      por: 'Hoy estamos fuera del centro, así que los sitios de la pestaña de comer no valen: se come en el propio destino de la excursión.',
      tip: 'Comprarlo antes de salir suele costar la mitad que comer en la zona turística de la excursión.'
    });
  } else {
    var rc = elegirRestaurante(ctx, plan, 'comida');
    man.paradas.push(paradaDeRestaurante(ctx, rc, horaComida, 'comida'));
  }
  t = horaComida + 80;
  d.bloques.push(man);

  /* --- Descanso de mediodía --- */
  if (ctx.siesta && !plan.excursion) {
    d.bloques.push({
      franja: 'Descanso',
      siesta: true,
      paradas: [{
        hora: minAHhmm(t),
        nombre: 'Al alojamiento, a la sombra',
        tipo: 'descanso', tag: 'esencial',
        por: ctx.calor
          ? 'Entre las 14 y las 17:30 la ciudad es insufrible y la sombra escasea. Este bloque no es opcional: es lo que hace que la tarde funcione.'
          : 'Un par de horas de parón a mediodía. Cuesta aceptarlo el primer día y se agradece los tres siguientes.',
        tip: 'Llenar las botellas antes de subir.'
      }]
    });
    t = 17 * 60 + 30;
  } else if (ctx.siesta) {
    /* Estando fuera no se puede volver al alojamiento: se para donde se esté */
    d.bloques.push({
      franja: 'Descanso',
      siesta: true,
      paradas: [{
        hora: minAHhmm(t),
        nombre: 'Parón a la sombra, donde estemos',
        tipo: 'descanso', tag: 'esencial',
        por: 'Hoy no se puede volver al alojamiento a media tarde, así que el descanso se hace allí: una terraza, un banco a la sombra o el propio trayecto de vuelta sentados.'
      }]
    });
    t += 60;
  }

  /* --- Tarde y noche --- */
  var tar = { franja: ctx.siesta ? 'Tarde y noche' : 'Tarde', paradas: [] };
  var lt = candidatos(ctx, plan, 'tarde');
  cuenta = 0;
  for (var j = 0; j < lt.length && cuenta < ctx.maxTarde; j++) {
    var lj = lt[j];
    if (t + (lj.dur || 45) > 21 * 60) break;
    t += (cuenta === 0 ? 0 : (lj.and || 10) + ctx.ritmo.colchon);
    tar.paradas.push(paradaDeLugar(ctx, lj, t));
    t += lj.dur || 45;
    cuenta++;
  }
  var rn = elegirRestaurante(ctx, plan, 'cena');
  var horaCena = Math.max(t + 15, 20 * 60);
  tar.paradas.push(paradaDeRestaurante(ctx, rn, horaCena, 'cena'));
  t = horaCena + 90;

  var ln = candidatos(ctx, plan, 'noche');
  if (ln.length && t < ctx.ritmo.cierreNoche) {
    tar.paradas.push(paradaDeLugar(ctx, ln[0], t));
    tar.paradas[tar.paradas.length - 1].tag = 'extra';
  }
  d.bloques.push(tar);
}

function bloquesSalida(ctx, plan, d, avisos) {
  if (d.titulo !== 'El día') d.titulo = 'Vuelta';
  var aero = ctx.aeropuerto;
  var salir = plan.salirA;

  if (salir > 10.5 * 60) {
    var m = { franja: 'Última mañana', paradas: [] };
    var t = ctx.ritmo.inicio;
    var des = elegirRestaurante(ctx, plan, 'desayuno');
    if (des) { m.paradas.push(paradaDeRestaurante(ctx, des, t, 'desayuno')); t += 35; }

    var lista = candidatos(ctx, plan, 'manana');
    var cuenta = 0;
    for (var i = 0; i < lista.length && cuenta < 2; i++) {
      var l = lista[i];
      if (t + (l.dur || 45) + 30 > salir) break;
      t += (cuenta === 0 ? 0 : (l.and || 10) + ctx.ritmo.colchon);
      m.paradas.push(paradaDeLugar(ctx, l, t));
      t += l.dur || 45;
      cuenta++;
    }
    m.paradas.push({
      hora: minAHhmm(Math.max(t, salir - 45)),
      nombre: 'Recoger las maletas',
      tipo: 'descanso', tag: 'esencial',
      por: 'Casi todos los alojamientos guardan el equipaje gratis después del check-out, así que la mañana no se pierde.'
    });
    if (m.paradas.length) d.bloques.push(m);
  }

  d.bloques.push(trasladoVuelta(ctx, plan));

  if (!d.lema) {
    d.lema = salir > 10.5 * 60
      ? 'El vuelo sale por la tarde, así que todavía queda media mañana de ciudad.'
      : 'Vuelo temprano: hoy toca desayunar y salir pitando.';
  }
  avisos.push('Hay que salir del alojamiento a las ' + minAHhmm(salir) + ' como muy tarde.');
}

/* El camino de vuelta al aeropuerto, con su margen de tres horas. */
function trasladoVuelta(ctx, plan) {
  var aero = ctx.aeropuerto;
  var salir = plan.salirA;
  var v = { franja: 'Vuelta', paradas: [] };
  var tv = salir;
  /* Los pasos del pack describen la ida. Para la vuelta se recorren
     al revés y cada tramo apunta a donde empieza el siguiente. */
  var pasos = (aero.pasos || []).slice().reverse();
  pasos.forEach(function (paso, i) {
    var medio = String(paso.nombre).split('→')[0].trim() || paso.nombre;
    var destino;
    if (i === pasos.length - 1) {
      destino = (aero.nombre || 'el aeropuerto') + (aero.cod ? ' (' + aero.cod + ')' : '');
    } else {
      destino = (String(pasos[i + 1].nombre).split('→')[1] || '').trim() || 'el siguiente enlace';
    }
    v.paradas.push({
      hora: minAHhmm(tv),
      nombre: medio + ' → ' + destino,
      tipo: 'transporte', tag: 'esencial',
      min: paso.min,
      precio: paso.precio,
      por: 'El mismo trayecto de la llegada, al revés.'
    });
    tv += (paso.min || 20) + 10;
  });
  v.paradas.push({
    hora: minAHhmm(tv),
    nombre: 'En el aeropuerto',
    tipo: 'transporte', tag: 'esencial',
    por: aero.vuelta || 'Facturación, control y a esperar.'
  });
  if (plan.salidaVuelo) {
    v.paradas.push({
      hora: minAHhmm(plan.salidaVuelo),
      nombre: 'Despegue',
      tipo: 'transporte', tag: 'esencial',
      por: 'Se acabó.'
    });
  }
  return v;
}

/* ============================================================
   ITINERARIO PROPIO
   Cuando el viajero ya trae su plan hecho, el motor no propone
   nada: coge sus paradas, les pone hora, les engancha delante el
   traslado del aeropuerto y detrás el de vuelta, y les añade lo
   que sí sabe del destino (avisos, precios, trucos y reservas).
   ============================================================ */

function normalizarNombre(s) {
  return String(s || '').toLowerCase().normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

/* Busca en el pack algo que se parezca a lo que ha escrito el
   usuario. Sin adivinar de más: o una cadena contiene a la otra,
   o no hay coincidencia. */
function buscarEnPack(ctx, nombre) {
  var n = normalizarNombre(nombre);
  if (n.length < 4) return null;

  var mejor = null;
  function probar(item, clase) {
    var m = normalizarNombre(item.nombre);
    if (m.length < 4) return;
    if (n.indexOf(m) === -1 && m.indexOf(n) === -1) return;
    var puntos = Math.min(n.length, m.length);
    if (!mejor || puntos > mejor.puntos) mejor = { item: item, clase: clase, puntos: puntos };
  }
  (ctx.pack.lugares || []).forEach(function (l) { if (!l.plantilla) probar(l, 'lugar'); });
  (ctx.pack.restaurantes || []).forEach(function (r) { if (!r.plantilla) probar(r, 'rest'); });
  return mejor;
}

function paradaPropia(ctx, raw, minuto) {
  var p = {
    hora: minAHhmm(minuto),
    nombre: raw.nombre,
    tipo: 'lugar',
    tag: 'esencial',
    por: raw.por || '',
    maps: raw.maps || (raw.nombre + ', ' + ctx.ciudad),
    precio: raw.precio || '',
    propia: true
  };

  var hallado = buscarEnPack(ctx, raw.nombre);
  if (!hallado) return p;

  var it = hallado.item;
  p.reconocida = true;
  if (hallado.clase === 'lugar') {
    p.tipo = it.tipo || 'lugar';
    p.maps = it.maps || p.maps;
    p.precio = p.precio || it.precio;
    p.min = it.and;
    if (!p.por) p.por = it.por;
    else if (it.por) p.tip = it.por;
    if (it.tip) p.tip = p.tip ? p.tip + ' ' + it.tip : it.tip;
    if (it.aviso) p.aviso = it.aviso;
    if (it.reserva) {
      p.aviso = (p.aviso ? p.aviso + ' ' : '') + it.reserva;
      ctx.reservas.push(it.nombre + ' — ' + it.reserva);
    }
    if (ctx.sinEscaleras && it.escaleras) {
      p.aviso = (p.aviso ? p.aviso + ' ' : '') + 'Ojo: tiene escaleras estrechas o suelo irregular.';
    }
    if (it.cierra && it.cierra.indexOf(diaSemana(ctx.diaActual)) !== -1) {
      p.aviso = (p.aviso ? p.aviso + ' ' : '') + 'CIERRA este día de la semana: conviene comprobarlo antes de ir.';
    }
    ctx.usados[it.id] = true;
  } else {
    p.tipo = 'comida';
    p.maps = it.maps || p.maps;
    p.precio = p.precio || it.precio;
    if (!p.por) p.por = it.nota;
    if (it.detalle) p.tip = it.detalle;
    if (it.cierraDias && it.cierraDias.indexOf(diaSemana(ctx.diaActual)) !== -1) {
      p.aviso = 'CIERRA este día de la semana: ' + (it.cierra || 'comprobar el horario') + '.';
    }
    if (it.reserva) {
      p.aviso = (p.aviso ? p.aviso + ' ' : '') + 'Hay que reservar' + (it.tel ? ' · ' + it.tel : '') + '.';
      ctx.reservas.push('Reservar en ' + it.nombre + (it.tel ? ' · ' + it.tel : ''));
    }
    if (!ctx.restUsados[it.nombre]) ctx.restUsados[it.nombre] = 'En tu plan';
  }
  return p;
}

function construirDiasPropios(ctx, plan) {
  var propios = (ctx.cfg.propio && ctx.cfg.propio.dias) || [];

  return plan.map(function (p, i) {
    ctx.diaActual = p.iso;
    var fuente = propios[i] || { titulo: '', paradas: [] };
    var d = {
      id: 'd' + (i + 1),
      fecha: p.iso,
      dia: nombreDia(p.iso),
      titulo: (fuente.titulo || '').replace(/^d[ií]a\s*\d+\s*[·:.\-]?\s*/i, '').trim() ||
              (p.tipo === 'llegada' ? 'Llegada' : p.tipo === 'salida' ? 'Vuelta' : 'Día ' + (i + 1)),
      lema: 'Tu propio plan para hoy.',
      bloques: []
    };
    var avisos = [];

    if (p.tipo === 'llegada' || p.tipo === 'unico') {
      var tr = trasladoLlegada(ctx, p);
      d.bloques.push(tr.bloque);
    }

    /* Las paradas sin hora se reparten seguidas a partir de la
       primera hora libre del día. Las que traen hora, mandan. */
    var t = (p.tipo === 'llegada' || p.tipo === 'unico')
      ? Math.max(p.libreDesde || ctx.ritmo.inicio, ctx.ritmo.inicio)
      : ctx.ritmo.inicio;

    var grupos = [
      { franja: 'Mañana', hasta: 13 * 60, paradas: [] },
      { franja: 'Tarde', hasta: 19 * 60, paradas: [] },
      { franja: 'Noche', hasta: 24 * 60 + 120, paradas: [] }
    ];

    fuente.paradas.forEach(function (raw) {
      var m = hhmmAMin(raw.hora);
      if (m === null) { t += 75; m = t; } else { t = m; }
      var par = paradaPropia(ctx, raw, m);
      for (var g = 0; g < grupos.length; g++) {
        if (m < grupos[g].hasta || g === grupos.length - 1) { grupos[g].paradas.push(par); break; }
      }
    });

    grupos.forEach(function (g) { if (g.paradas.length) d.bloques.push({ franja: g.franja, paradas: g.paradas }); });

    if (p.tipo === 'salida' || p.tipo === 'unico') {
      d.bloques.push(trasladoVuelta(ctx, p));
      avisos.push('Hay que salir del alojamiento a las ' + minAHhmm(p.salirA) + ' como muy tarde.');
    }

    if (!d.bloques.length) {
      d.bloques.push({ franja: 'Sin plan', paradas: [{
        hora: minAHhmm(ctx.ritmo.inicio),
        nombre: 'Día sin nada apuntado',
        tipo: 'descanso', tag: 'esencial', plantilla: true,
        por: 'En el itinerario que has traído no hay nada para este día. Se puede añadir desde "Cambiar los datos".'
      }]});
    }

    var reconocidas = 0, total = 0;
    d.bloques.forEach(function (b) {
      b.paradas.forEach(function (x) { if (x.propia) { total++; if (x.reconocida) reconocidas++; } });
    });
    if (reconocidas) avisos.push('De tus ' + total + ' paradas de hoy hemos reconocido ' + reconocidas + ' y les hemos añadido precios, avisos y trucos.');
    if (i === 0 && ctx.clima && ctx.clima.nota) avisos.push(ctx.clima.nota);
    if (avisos.length) d.avisoDia = avisos.join(' ');

    return d;
  });
}

/* ---------- Salidas secundarias ---------- */

function metaViaje(ctx, plan) {
  var cfg = ctx.cfg;
  var noches = Math.max(0, diasEntre(cfg.inicio, cfg.fin));
  var nombres = (cfg.nombres || []).filter(Boolean);
  var vuelos = [];

  function vuelo(v, dir, iso) {
    if (!v || (!v.salida && !v.llegada)) return;
    vuelos.push({
      dir: dir,
      dia: nombreDia(iso).slice(0, 3).toLowerCase() + ' ' + isoAPartes(iso).d + ' ' + MESES[isoAPartes(iso).m - 1].slice(0, 3),
      salida: v.salida || '—',
      desde: v.desde || '',
      llegada: v.llegada || '—',
      hasta: v.hasta || '',
      dur: v.dur || duracion(v.salida, v.llegada)
    });
  }
  vuelo(cfg.vuelos && cfg.vuelos.ida, 'Ida', cfg.inicio);
  vuelo(cfg.vuelos && cfg.vuelos.vuelta, 'Vuelta', cfg.fin);

  return {
    titulo: ctx.ciudad,
    subtitulo: nombres.length ? nombres.join(' & ') : (cfg.subtitulo || 'Escapada'),
    fechas: rangoFechas(cfg.inicio, cfg.fin),
    inicio: cfg.inicio,
    fin: cfg.fin,
    noches: noches,
    personas: ctx.personas,
    paleta: ctx.pack.paleta || 'laguna',
    idioma: ctx.idioma,
    idiomaNombre: (IDIOMAS[ctx.idioma] || {}).nombre || '',
    pais: ctx.pais.nombre,
    generico: ctx.generico,
    propio: !!ctx.propio,
    perfiles: ctx.perfiles.map(function (p) { return PERFILES[p] ? PERFILES[p].etiqueta : p; }),
    ritmo: ctx.ritmo.nombre,
    hotel: cfg.alojamiento && cfg.alojamiento.nombre ? {
      nombre: cfg.alojamiento.nombre,
      dir: cfg.alojamiento.dir || '',
      maps: cfg.alojamiento.maps || cfg.alojamiento.dir || cfg.alojamiento.nombre,
      nota: cfg.alojamiento.nota || ''
    } : null,
    vuelos: vuelos
  };
}

function duracion(a, b) {
  var x = hhmmAMin(a), y = hhmmAMin(b);
  if (x === null || y === null) return '';
  var m = y - x; if (m < 0) m += 1440;
  return Math.floor(m / 60) + 'h ' + (m % 60) + 'm';
}

function listaRestaurantes(ctx) {
  return ctx.pack.restaurantes.map(function (r) {
    var marcas = [];
    ctx.perfiles.forEach(function (pf) {
      var v = r.perfil && r.perfil[pf];
      if (v === 'ideal') marcas.push({ clase: 'ideal', texto: 'Cómodo con ' + (PERFILES[pf].etiqueta.toLowerCase()) });
      else if (v === 'ojo' && pf === 'embarazo') marcas.push({ clase: 'ojo', texto: 'Preguntar por crudos' });
      else if (v === 'ojo') marcas.push({ clase: 'ojo', texto: 'No es el más cómodo' });
    });
    if (r.reserva) marcas.push({ clase: 'res', texto: 'Hay que reservar' });
    if (r.confirmar) marcas.push({ clase: 'conf', texto: 'Confirmar por teléfono' });
    if ((r.nivel || 0) > ctx.nivel.maxNivel) marcas.push({ clase: 'caro', texto: 'Por encima del presupuesto' });

    return {
      nombre: r.nombre, tipo: r.tipo, zona: r.zona, maps: r.maps, tel: r.tel,
      nivel: r.nivel || 0, precio: r.precio, detalle: r.detalle, cierra: r.cierra,
      nota: r.nota, marcas: marcas, plantilla: !!r.plantilla,
      dia: ctx.restUsados[r.nombre] || ''
    };
  });
}

/* ---------- Presupuesto ---------- */

function construirPresupuesto(ctx, plan, dias) {
  var per = ctx.personas;
  var noches = Math.max(1, diasEntre(ctx.cfg.inicio, ctx.cfg.fin));
  var diasComida = plan.length;
  var fijos = [];

  /* Traslados del aeropuerto */
  var trasl = 0;
  (ctx.aeropuerto.pasos || []).forEach(function (p) { trasl += (p.precioNum || 0); });
  if (trasl) {
    fijos.push({
      id: 'traslados', concepto: 'Traslados del aeropuerto (ida y vuelta) × ' + per,
      importe: Math.round(trasl * 2 * per * 100) / 100,
      nota: 'Del ' + (ctx.aeropuerto.nombre || 'aeropuerto') + ' al alojamiento y vuelta. Si hay billete de ida y vuelta suele salir más barato.'
    });
  }

  /* Comer */
  var comida = ctx.nivel.comidaDia * per * diasComida;
  fijos.push({
    id: 'comida', concepto: 'Comer y beber, ' + diasComida + ' días',
    importe: comida,
    nota: eurTxt(ctx.nivel.comidaDia) + ' por persona y día, ' + ctx.nivel.texto + '.'
  });

  /* Entradas de lo que está en el itinerario */
  var entradas = 0, detalle = [];
  var vistos = {};
  ctx.pack.lugares.forEach(function (l) {
    if (!ctx.usados[l.id] || !l.precioNum || vistos[l.id]) return;
    vistos[l.id] = true;
    entradas += l.precioNum * per;
    detalle.push(l.nombre);
  });
  if (entradas) {
    fijos.push({
      id: 'entradas', concepto: 'Entradas de lo que está en el itinerario',
      importe: Math.round(entradas * 100) / 100,
      nota: detalle.slice(0, 5).join(' · ') + (detalle.length > 5 ? ' y ' + (detalle.length - 5) + ' más' : '') +
            (ctx.propio ? '. Sólo cuenta lo que hemos podido reconocer de tu itinerario.' : '.')
    });
  }

  fijos.push({
    id: 'varios', concepto: 'Agua, baños y caprichos',
    importe: 6 * per * diasComida,
    nota: 'Helados, cafés en barra, algún baño público y las cosas que no se pueden prever.'
  });

  /* Opciones: transporte */
  var opciones = [];
  var tr = ctx.pack.transporte;
  if (tr) {
    var diasUso = diasComida;
    var viajes = ctx.ritmo.viajesDia * diasUso;

    /* Ir andando deja de ser una opción si el itinerario sale de la
       ciudad, o si el perfil del grupo no da para 7 km diarios. */
    var hayExcursion = plan.some(function (p) { return p.excursion; });
    var motivoNoAndar = hayExcursion
      ? 'Este itinerario incluye un día de excursión fuera de la ciudad, así que a pie no se llega.'
      : (ctx.perfiles.length
          ? 'Con el ritmo que hemos elegido, cargar con 6-8 km diarios no compensa lo que se ahorra.'
          : '');

    var alts = tr.alts.map(function (a) {
      var imp;
      if (a.porViaje) imp = a.porPersona * per * viajes;
      else if (a.porDia) imp = a.porPersona * per * diasUso;
      else if (a.dias) imp = a.porPersona * per * Math.ceil(diasUso / a.dias);
      else imp = a.porPersona * per;
      var descartada = !!(a.aPie && motivoNoAndar);
      return {
        id: a.id, label: a.label, importe: Math.round(imp * 100) / 100,
        detalle: a.detalle + (descartada ? ' ' + motivoNoAndar : ''),
        descartada: descartada
      };
    });

    var viables = alts.filter(function (a) { return !a.descartada; });
    var barata = (viables.length ? viables : alts)
      .slice().sort(function (x, y) { return x.importe - y.importe; })[0];
    alts.forEach(function (a) { if (a.id === barata.id) a.recomendado = true; });
    opciones.push({
      id: tr.id, titulo: tr.titulo,
      ayuda: tr.ayuda + ' Calculado para ' + per + (per === 1 ? ' persona' : ' personas') +
             ', ' + diasUso + ' días y un ritmo ' + ctx.ritmo.nombre + ' (unos ' + ctx.ritmo.viajesDia + ' trayectos al día).',
      elegida: barata.id,
      alts: alts
    });
  }

  /* Opciones: los caprichos del destino */
  (ctx.pack.estrellas || []).forEach(function (e) {
    var alts = e.alts.map(function (a) {
      var imp = (a.porPersona !== undefined) ? a.porPersona * per : (a.importe || 0);
      return { id: a.id, label: a.label, importe: Math.round(imp * 100) / 100, detalle: a.detalle, recomendado: a.recomendado };
    });
    var rec = alts.filter(function (a) { return a.recomendado; })[0] || alts[0];
    opciones.push({ id: e.id, titulo: e.titulo, ayuda: e.ayuda, elegida: rec.id, alts: alts });
  });

  return {
    fijos: fijos,
    opciones: opciones,
    porPersona: per,
    noches: noches,
    dias: diasComida,
    fuera: 'No incluye vuelos ni alojamiento. Los precios son orientativos y de la última revisión del destino: conviene confirmarlos antes de contar con ellos.'
  };
}

/* ---------- Checklist ---------- */

function construirChecklist(ctx) {
  var lista = [];
  var pais = ctx.pais;

  /* Reservas que el propio itinerario ha generado */
  var res = [];
  var vistas = {};
  ctx.reservas.forEach(function (r) { if (!vistas[r]) { vistas[r] = 1; res.push(r); } });
  if (ctx.cfg.alojamiento && ctx.cfg.alojamiento.nombre) {
    res.push('Confirmar la hora de check-in de ' + ctx.cfg.alojamiento.nombre);
  }
  if (res.length) lista.push({ cat: 'Reservas', items: res });

  /* Documentación */
  var docs = ['Comprobar que los DNI o pasaportes no caducan antes del viaje'];
  if (pais.ue) docs.push('Tarjeta Sanitaria Europea de todos (se pide gratis en la web de la Seguridad Social y tarda unos días)');
  else docs.push('Seguro de viaje con cobertura médica: aquí la Tarjeta Sanitaria Europea no vale');
  docs.push('Check-in online de los dos vuelos');
  docs.push('Avisar al banco de que viajamos, por si bloquean la tarjeta');
  docs.push('Foto de todos los documentos en el móvil y una copia en el correo');
  lista.push({ cat: 'Documentación', items: docs });

  /* Perfil */
  if (ctx.perfiles.indexOf('embarazo') !== -1) {
    lista.push({ cat: 'Embarazo', items: [
      'Certificado médico de aptitud para volar a partir de la semana 28 — la aerolínea lo puede pedir en el embarque',
      'Informe médico y cartilla del embarazo, en papel y en foto',
      'Seguro de viaje que cubra el embarazo de forma explícita',
      'Medias de compresión para el vuelo',
      'Repelente de mosquitos apto para embarazadas',
      'Guardar la dirección del hospital con maternidad de la ciudad en el móvil'
    ]});
  }
  if (ctx.perfiles.indexOf('ninos') !== -1) {
    lista.push({ cat: 'Con niños', items: [
      'Documentación de los menores (DNI propio, no vale el del padre o la madre)',
      'Autorización paterna si viaja sólo con uno de los progenitores',
      'Medicación habitual y un antitérmico infantil',
      'Carrito ligero o mochila portabebés según el terreno',
      'Entretenimiento descargado para el vuelo y para las esperas'
    ]});
  }
  if (ctx.perfiles.indexOf('movilidad') !== -1) {
    lista.push({ cat: 'Accesibilidad', items: [
      'Confirmar con el alojamiento que hay ascensor y no sólo escaleras',
      'Pedir asistencia en el aeropuerto con 48 h de antelación (es gratis y hay que solicitarla)',
      'Comprobar la accesibilidad de los sitios con entrada antes de comprarla'
    ]});
  }

  /* Equipaje */
  var eq = [
    'Calzado cómodo y ya domado',
    'Botella reutilizable' + (pais.agua && /potable/i.test(pais.agua) ? ' — el agua del grifo es potable y sale gratis' : ''),
    'Batería externa: el móvil va a hacer de mapa todo el día'
  ];
  if (pais.enchufe && !/mismo que en España/.test(pais.enchufe)) eq.push('Adaptador de enchufe — ' + pais.enchufe);
  if (ctx.calor) eq.push('Gorra, protector solar y algo para la sombra: el destino aprieta en estas fechas');
  if (ctx.clima && ctx.clima.max <= 12) eq.push('Abrigo de verdad y algo impermeable: ' + ctx.clima.nota.toLowerCase());
  eq.push('Efectivo en billetes pequeños para lo que no acepte tarjeta');
  lista.push({ cat: 'Equipaje', items: eq });

  /* Antes de salir de casa */
  lista.push({ cat: 'Antes de salir de casa', items: [
    'Descargar el mapa de ' + ctx.ciudad + ' sin conexión en Google Maps',
    'Instalar esta app en la pantalla de inicio del móvil (funciona sin datos)',
    'Repasar las frases de la pestaña de idioma en el avión',
    'Dejar el itinerario compartido con alguien que se quede en casa'
  ]});

  (ctx.pack.checklistExtra || []).forEach(function (g) { lista.push(g); });
  return lista;
}

/* ---------- Info práctica ---------- */

function construirInfo(ctx) {
  var propios = (ctx.pack.consejos || []).slice();
  var dePais = consejosDePais(ctx.paisCod);
  var todos = propios.concat(dePais);

  var hospital = ctx.pack.hospital || {};
  if (!hospital.maps && hospital.nombre) hospital.maps = hospital.nombre + ' ' + ctx.ciudad;

  return {
    emergencias: ctx.pais.emergencias,
    hospital: hospital,
    consejos: todos.slice(0, 12),
    moneda: ctx.pais.simbolo,
    idiomaNota: (IDIOMAS[ctx.idioma] || {}).nota || ''
  };
}
