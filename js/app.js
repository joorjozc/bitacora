/* ============================================================
   Bitácora — la app del viaje
   No sabe nada de ningún destino: recibe el objeto VIAJE que
   ha montado el motor y lo pinta. Sin dependencias.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Arranque: ¿qué viaje abrimos? ---------- */
  var CFG = Almacen.resolver();
  if (!CFG) {
    document.getElementById('sin-viaje').hidden = false;
    return;
  }

  var VIAJE;
  try {
    VIAJE = generarViaje(CFG);
  } catch (e) {
    document.getElementById('sin-viaje').hidden = false;
    document.querySelector('#sin-viaje h1').textContent = 'No hemos podido montar el viaje';
    document.querySelector('#sin-viaje p').textContent =
      'Los datos guardados no cuadran. Se puede volver a crear desde cero sin perder nada más.';
    return;
  }

  document.getElementById('envoltorio').hidden = false;
  document.documentElement.setAttribute('data-paleta', VIAJE.meta.paleta || 'laguna');
  document.title = VIAJE.meta.titulo + ' · Bitácora';

  var LLAVE = CFG.id || 'compartido';
  var estado = Almacen.cargarEstado(LLAVE);
  function guardar() { Almacen.guardarEstado(LLAVE, estado); }

  /* ---------- Utilidades ---------- */
  function $(s, ctx) { return (ctx || document).querySelector(s); }
  function $$(s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); }

  function el(tag, clase, texto) {
    var n = document.createElement(tag);
    if (clase) n.className = clase;
    if (texto !== undefined && texto !== null) n.textContent = texto;
    return n;
  }

  function eur(n) {
    var s = Math.round(Math.abs(n) * 100) / 100;
    var txt = (s % 1 === 0 ? String(s) : s.toFixed(2).replace('.', ','));
    return (n < 0 ? '−' : '') + txt + ' €';
  }

  /* Enlace a Google Maps por nombre: resuelve mejor que unas
     coordenadas tecleadas a mano y no manda a nadie a otra esquina. */
  function mapaUrl(nombre) {
    return 'https://www.google.com/maps/dir/?api=1&destination=' +
           encodeURIComponent(nombre) + '&travelmode=walking';
  }

  var ICONO_MAPA = '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/>' +
    '<circle cx="12" cy="10" r="2.5"/></svg>';

  function botonMapa(nombre, etiqueta) {
    var a = el('a', 'mapa-b');
    a.href = mapaUrl(nombre);
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = ICONO_MAPA;
    a.appendChild(document.createTextNode(etiqueta || 'Cómo llegar'));
    return a;
  }

  /* Hoy en el destino. Acepta ?fecha=2026-08-14 para probar. */
  function hoyISO() {
    var forzada = new URLSearchParams(location.search).get('fecha');
    if (forzada && /^\d{4}-\d{2}-\d{2}$/.test(forzada)) return forzada;
    try {
      return new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
        .format(new Date());
    } catch (e) {
      return new Date().toISOString().slice(0, 10);
    }
  }

  /* ============================================================
     TEMA
     ============================================================ */
  function pintarTema() {
    var raiz = document.documentElement;
    if (estado.tema) raiz.setAttribute('data-tema', estado.tema);
    else raiz.removeAttribute('data-tema');
    $('#icono-tema').textContent =
      estado.tema === 'oscuro' ? '☾' : estado.tema === 'claro' ? '☀' : '◐';
  }

  $('#btn-tema').addEventListener('click', function () {
    estado.tema = estado.tema === null ? 'oscuro' : estado.tema === 'oscuro' ? 'claro' : null;
    guardar(); pintarTema();
  });

  /* ============================================================
     PESTAÑAS
     ============================================================ */
  $$('.tabs__b').forEach(function (b) {
    b.addEventListener('click', function () { abrirPanel(b.dataset.panel); });
  });

  function abrirPanel(nombre) {
    $$('.tabs__b').forEach(function (b) {
      b.setAttribute('aria-selected', String(b.dataset.panel === nombre));
    });
    $$('.panel').forEach(function (p) {
      p.hidden = p.id !== 'panel-' + nombre;
    });
    window.scrollTo(0, 0);
  }

  /* ============================================================
     ITINERARIO
     ============================================================ */
  var barraDias = $('#dias-barra');
  var contDias  = $('#dias-contenido');

  function diaDeHoy() {
    var h = hoyISO();
    for (var i = 0; i < VIAJE.dias.length; i++) if (VIAJE.dias[i].fecha === h) return VIAJE.dias[i].id;
    return null;
  }

  function diaActivo() {
    var ids = VIAJE.dias.map(function (d) { return d.id; });
    if (estado.dia && ids.indexOf(estado.dia) !== -1) return estado.dia;
    return diaDeHoy() || VIAJE.dias[0].id;
  }

  function pintarBarraDias() {
    var activo = diaActivo();
    var hoy = diaDeHoy();
    barraDias.innerHTML = '';
    VIAJE.dias.forEach(function (d) {
      var b = el('button', 'dia-b');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', String(d.id === activo));

      var partes = d.dia.split(' ');
      var n = el('span', 'dia-b__n', partes[0].slice(0, 3).toUpperCase() + ' ' + partes[1]);
      if (d.id === hoy) {
        var punto = el('span', 'dia-b__hoy');
        punto.title = 'Hoy';
        n.appendChild(punto);
      }
      b.appendChild(n);
      b.appendChild(el('span', 'dia-b__t', d.titulo));

      b.addEventListener('click', function () {
        estado.dia = d.id; guardar(); pintarItinerario();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      barraDias.appendChild(b);
    });

    var sel = barraDias.querySelector('[aria-selected="true"]');
    if (sel && sel.scrollIntoView) sel.scrollIntoView({ block: 'nearest', inline: 'center' });
  }

  function idParada(dia, bloque, i) { return dia.id + '-' + bloque + '-' + i; }

  function pintarItinerario() {
    pintarBarraDias();

    var d = VIAJE.dias.filter(function (x) { return x.id === diaActivo(); })[0];
    contDias.innerHTML = '';

    /* --- cabecera del día --- */
    var cab = el('div', 'dia-cab');
    cab.appendChild(el('div', 'dia-cab__k', d.dia));
    cab.appendChild(el('h2', 'dia-cab__t', d.titulo));
    if (d.lema) cab.appendChild(el('p', 'dia-cab__l', d.lema));
    if (d.km) cab.appendChild(el('div', 'dia-cab__m', 'A pie: ' + d.km));

    /* progreso */
    var visibles = 0, hechas = 0;
    d.bloques.forEach(function (bl, bi) {
      if (bl.siesta) return;
      bl.paradas.forEach(function (p, i) {
        if (estado.suave && p.tag === 'extra') return;
        visibles++;
        if (estado.hechas[idParada(d, bi, i)]) hechas++;
      });
    });
    var prog = el('div', 'progreso');
    var pista = el('div', 'progreso__pista');
    var barra = el('div', 'progreso__barra');
    barra.style.width = (visibles ? (hechas / visibles) * 100 : 0) + '%';
    pista.appendChild(barra);
    prog.appendChild(pista);
    prog.appendChild(el('span', 'progreso__n', hechas + '/' + visibles));
    cab.appendChild(prog);
    contDias.appendChild(cab);

    /* --- aviso del día --- */
    if (d.avisoDia) {
      var av = el('div', 'aviso-dia');
      var avT = el('div');
      avT.appendChild(el('strong', null, 'Ojo hoy. '));
      avT.appendChild(document.createTextNode(d.avisoDia));
      av.appendChild(avT);
      contDias.appendChild(av);
    }

    /* --- bloques --- */
    d.bloques.forEach(function (bl, bi) {
      var f = el('section', 'franja' + (bl.siesta ? ' franja--siesta' : ''));
      f.appendChild(el('div', 'franja__k', bl.franja));

      var rail = el('div', 'rail');
      var pintadas = 0;

      bl.paradas.forEach(function (p, i) {
        if (estado.suave && p.tag === 'extra') return;
        pintadas++;

        var pid = idParada(d, bi, i);
        var hecha = !!estado.hechas[pid];

        var fila = el('div', 'parada' + (hecha ? ' parada--hecha' : ''));
        fila.appendChild(el('div', 'parada__hora', p.hora || ''));
        fila.appendChild(el('div', 'parada__nodo'));

        var t = el('div', 'tarjeta' + (p.plantilla ? ' tarjeta--plantilla' : ''));

        var top = el('div', 'tarjeta__top');
        top.appendChild(el('h3', 'tarjeta__n', p.nombre));
        if (!bl.siesta) {
          var marca = el('button', 'marca', hecha ? '✓' : '');
          marca.type = 'button';
          marca.setAttribute('aria-label', (hecha ? 'Desmarcar' : 'Marcar como visto') + ': ' + p.nombre);
          marca.setAttribute('aria-pressed', String(hecha));
          marca.addEventListener('click', function () {
            if (estado.hechas[pid]) delete estado.hechas[pid];
            else estado.hechas[pid] = true;
            guardar(); pintarItinerario();
          });
          top.appendChild(marca);
        }
        t.appendChild(top);

        /* chips */
        var meta = el('div', 'tarjeta__meta');
        if (p.tag === 'extra') meta.appendChild(el('span', 'chip chip--extra', 'Opcional'));
        if (p.plantilla) meta.appendChild(el('span', 'chip chip--plantilla', 'Por rellenar'));
        if (p.min) meta.appendChild(el('span', 'chip chip--and', p.min + ' min de camino'));
        if (p.precio) meta.appendChild(el('span', 'chip chip--precio', p.precio));
        if (meta.children.length) t.appendChild(meta);

        if (p.por) t.appendChild(el('p', 'tarjeta__por', p.por));

        if (p.tip) {
          var lt = el('div', 'linea-tip');
          lt.appendChild(el('span', 'linea-tip__k', 'Truco'));
          lt.appendChild(el('span', null, p.tip));
          t.appendChild(lt);
        }
        if (p.aviso) {
          var la = el('div', 'linea-aviso');
          la.appendChild(el('span', 'linea-aviso__k', 'Ojo'));
          la.appendChild(el('span', null, p.aviso));
          t.appendChild(la);
        }
        if (p.maps) t.appendChild(botonMapa(p.maps));

        fila.appendChild(t);
        rail.appendChild(fila);
      });

      if (!pintadas) return;      // el modo suave se ha comido el bloque entero
      f.appendChild(rail);
      contDias.appendChild(f);
    });
  }

  $('#btn-suave').addEventListener('click', function () {
    estado.suave = !estado.suave;
    this.setAttribute('aria-pressed', String(estado.suave));
    guardar(); pintarItinerario();
  });

  /* ============================================================
     COMER
     ============================================================ */
  var filtroComer = 'todos';

  function pintarFiltrosComer() {
    var tipos = ['todos'];
    VIAJE.restaurantes.forEach(function (r) {
      if (tipos.indexOf(r.tipo) === -1) tipos.push(r.tipo);
    });
    var cont = $('#filtros-comer');
    cont.innerHTML = '';
    tipos.forEach(function (t) {
      var b = el('button', 'pastilla', t === 'todos' ? 'Todos' : t);
      b.type = 'button';
      b.setAttribute('aria-pressed', String(t === filtroComer));
      b.addEventListener('click', function () {
        filtroComer = t; pintarFiltrosComer(); pintarComer();
      });
      cont.appendChild(b);
    });
  }

  function pintarComer() {
    var cont = $('#lista-comer');
    cont.innerHTML = '';

    VIAJE.restaurantes
      .filter(function (r) { return filtroComer === 'todos' || r.tipo === filtroComer; })
      .forEach(function (r) {
        var c = el('article', 'rest' + (r.plantilla ? ' rest--plantilla' : ''));

        var top = el('div', 'rest__top');
        var izq = el('div');
        izq.appendChild(el('h3', 'rest__n', r.nombre));
        izq.appendChild(el('div', 'rest__zona', r.tipo + ' · ' + r.zona));
        top.appendChild(izq);

        var niv = el('div', 'rest__nivel');
        niv.setAttribute('aria-label', 'Nivel de precio ' + (r.nivel + 1) + ' de 3');
        for (var i = 0; i < 3; i++) {
          niv.appendChild(el('span', i <= r.nivel ? '' : 'off', '€'));
        }
        top.appendChild(niv);
        c.appendChild(top);

        if (r.precio) c.appendChild(el('div', 'rest__precio', r.precio));
        if (r.detalle) c.appendChild(el('div', 'rest__detalle', r.detalle));

        var dists = el('div', 'tarjeta__meta');
        (r.marcas || []).forEach(function (m) {
          dists.appendChild(el('span', 'dist dist--' + m.clase, m.texto));
        });
        if (r.dia) dists.appendChild(el('span', 'chip', 'En el plan: ' + r.dia));
        if (dists.children.length) c.appendChild(dists);

        if (r.cierra) {
          var ci = el('div', 'rest__cierra');
          ci.appendChild(el('b', null, 'Horario'));
          ci.appendChild(el('span', null, r.cierra));
          c.appendChild(ci);
        }
        if (r.nota) c.appendChild(el('p', 'rest__nota', r.nota));

        var acc = el('div', 'rest__acciones');
        if (r.maps) acc.appendChild(botonMapa(r.maps));
        if (r.tel) {
          var tel = el('a', 'tel-b');
          tel.href = 'tel:' + r.tel;
          tel.textContent = '☎ Llamar';
          acc.appendChild(tel);
        }
        if (acc.children.length) c.appendChild(acc);

        cont.appendChild(c);
      });
  }

  /* ============================================================
     IDIOMA
     ============================================================ */
  var filtroCat = 'todas';
  var busqueda = '';

  function pintarFiltrosFrases() {
    var cont = $('#filtros-frases');
    cont.innerHTML = '';
    ['todas'].concat(VIAJE.frases.map(function (f) { return f.cat; })).forEach(function (c) {
      var b = el('button', 'pastilla', c === 'todas' ? 'Todas' : c);
      b.type = 'button';
      b.setAttribute('aria-pressed', String(c === filtroCat));
      b.addEventListener('click', function () {
        filtroCat = c; pintarFiltrosFrases(); pintarFrases();
      });
      cont.appendChild(b);
    });
  }

  /* Quita los acentos para que "gondola" encuentre "góndola" */
  function normaliza(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function pintarFrases() {
    var cont = $('#lista-frases');
    cont.innerHTML = '';
    var q = normaliza(busqueda.trim());
    var total = 0;

    VIAJE.frases.forEach(function (grupo) {
      if (filtroCat !== 'todas' && grupo.cat !== filtroCat) return;

      var items = grupo.items.filter(function (it) {
        if (!q) return true;
        return normaliza(it[0] + ' ' + it[1] + ' ' + it[2]).indexOf(q) !== -1;
      });
      if (!items.length) return;
      total += items.length;

      cont.appendChild(el('h3', 'cat-h', grupo.cat));
      items.forEach(function (it) {
        var b = el('button', 'frase');
        b.type = 'button';
        b.appendChild(el('div', 'frase__es', it[0]));
        b.appendChild(el('div', 'frase__it', it[1]));
        b.appendChild(el('div', 'frase__pr', it[2]));
        b.addEventListener('click', function () { abrirGrande(it); });
        cont.appendChild(b);
      });
    });

    $('#frases-vacio').hidden = total > 0;
  }

  $('#buscar-frase').addEventListener('input', function () {
    busqueda = this.value; pintarFrases();
  });

  /* --- frase a pantalla completa --- */
  var grande = $('#grande');
  var ultimoFoco = null;

  function abrirGrande(it) {
    ultimoFoco = document.activeElement;
    $('#grande-es').textContent = it[0];
    $('#grande-it').textContent = it[1];
    $('#grande-pr').textContent = it[2];
    grande.hidden = false;
    $('#grande-cerrar').focus();
  }
  function cerrarGrande() {
    grande.hidden = true;
    if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
  }
  $('#grande-cerrar').addEventListener('click', cerrarGrande);
  grande.addEventListener('click', function (e) { if (e.target === grande) cerrarGrande(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !grande.hidden) cerrarGrande();
  });

  /* ============================================================
     PRESUPUESTO
     ============================================================ */
  function elegida(op) {
    var g = estado.opciones[op.id];
    if (g && op.alts.some(function (a) { return a.id === g; })) return g;
    return op.elegida;
  }

  function totalPrevisto() {
    var t = 0;
    VIAJE.presupuesto.fijos.forEach(function (f) { t += f.importe; });
    VIAJE.presupuesto.opciones.forEach(function (op) {
      var sel = elegida(op);
      op.alts.forEach(function (a) { if (a.id === sel) t += a.importe; });
    });
    return t;
  }

  function pintarPresupuesto() {
    var cont = $('#presupuesto-opciones');
    cont.innerHTML = '';
    VIAJE.presupuesto.opciones.forEach(function (op) {
      var sel = elegida(op);
      var caja = el('div', 'opcion');
      caja.appendChild(el('h3', 'opcion__t', op.titulo));
      if (op.ayuda) caja.appendChild(el('p', 'opcion__a', op.ayuda));

      var alts = el('div', 'opcion__alts');
      op.alts.forEach(function (a) {
        var b = el('button', 'alt' + (a.descartada ? ' alt--descartada' : ''));
        b.type = 'button';
        b.setAttribute('aria-pressed', String(a.id === sel));

        var top = el('div', 'alt__top');
        var lab = el('span', 'alt__l', a.label);
        if (a.recomendado) lab.appendChild(el('span', 'alt__rec', 'Lo más barato'));
        top.appendChild(lab);
        top.appendChild(el('span', 'alt__i', eur(a.importe)));
        b.appendChild(top);
        if (a.detalle) b.appendChild(el('p', 'alt__d', a.detalle));

        b.addEventListener('click', function () {
          estado.opciones[op.id] = a.id;
          guardar(); pintarPresupuesto();
        });
        alts.appendChild(b);
      });
      caja.appendChild(alts);
      cont.appendChild(caja);
    });

    var tb = $('#presupuesto-fijos');
    tb.innerHTML = '';
    VIAJE.presupuesto.fijos.forEach(function (f) {
      var tr = el('tr');
      var td = el('td');
      td.appendChild(document.createTextNode(f.concepto));
      if (f.nota) td.appendChild(el('span', 'tabla__nota', f.nota));
      tr.appendChild(td);
      tr.appendChild(el('td', 'num', eur(f.importe)));
      tb.appendChild(tr);
    });

    var t = totalPrevisto();
    var p = VIAJE.presupuesto;
    $('#total-cifra').textContent = eur(t);
    $('#total-pie').textContent =
      'Para ' + p.porPersona + (p.porPersona === 1 ? ' persona' : ' personas') + ', ' +
      p.dias + ' días. Unos ' + eur(t / p.dias) + ' al día' +
      (p.porPersona > 1 ? ' (' + eur(t / p.dias / p.porPersona) + ' por persona)' : '') + '.';
    $('#presupuesto-fuera').textContent = p.fuera;

    pintarGastos();
  }

  $('#gasto-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var c = $('#gasto-concepto').value.trim();
    var i = parseFloat($('#gasto-importe').value);
    if (!c || isNaN(i) || i < 0) return;
    estado.gastos.push({ id: String(Date.now()), concepto: c, importe: i });
    $('#gasto-concepto').value = '';
    $('#gasto-importe').value = '';
    guardar(); pintarGastos();
    $('#gasto-concepto').focus();
  });

  function pintarGastos() {
    var lista = $('#gastos-lista');
    var resumen = $('#gastos-resumen');
    lista.innerHTML = '';
    resumen.innerHTML = '';

    if (!estado.gastos.length) {
      resumen.appendChild(el('p', 'ayuda', 'Todavía no hemos apuntado nada.'));
      return;
    }

    var suma = estado.gastos.reduce(function (a, g) { return a + g.importe; }, 0);
    var dif = suma - totalPrevisto();

    var caja = el('div', 'gastos-total');
    var izq = el('div');
    izq.appendChild(el('div', null, 'Llevamos gastado'));
    izq.appendChild(el('div', 'dif ' + (dif <= 0 ? 'dif--bien' : 'dif--mal'),
      dif <= 0 ? eur(-dif) + ' por debajo de lo previsto' : eur(dif) + ' por encima de lo previsto'));
    caja.appendChild(izq);
    caja.appendChild(el('strong', null, eur(suma)));
    resumen.appendChild(caja);

    estado.gastos.slice().reverse().forEach(function (g) {
      var li = el('li');
      li.appendChild(el('span', null, g.concepto));
      var der = el('span');
      der.appendChild(el('span', 'g-i', eur(g.importe)));
      var x = el('button', 'g-x', '✕');
      x.type = 'button';
      x.setAttribute('aria-label', 'Borrar ' + g.concepto);
      x.addEventListener('click', function () {
        estado.gastos = estado.gastos.filter(function (o) { return o.id !== g.id; });
        guardar(); pintarGastos();
      });
      der.appendChild(x);
      li.appendChild(der);
      lista.appendChild(li);
    });
  }

  /* ============================================================
     INFO
     ============================================================ */
  function pintarInfo() {
    var cl = $('#checklist');
    cl.innerHTML = '';
    VIAJE.checklist.forEach(function (grupo, gi) {
      var g = el('div', 'check-grupo');
      g.appendChild(el('div', 'check-grupo__t', grupo.cat));
      grupo.items.forEach(function (txt, ii) {
        var id = 'c' + gi + '-' + ii;
        var marcada = !!estado.check[id];
        var b = el('button', 'check-i');
        b.type = 'button';
        b.setAttribute('aria-pressed', String(marcada));
        b.appendChild(el('span', 'check-i__c', '✓'));
        b.appendChild(el('span', 'check-i__l', txt));
        b.addEventListener('click', function () {
          if (estado.check[id]) delete estado.check[id];
          else estado.check[id] = true;
          guardar(); pintarInfo();
        });
        g.appendChild(b);
      });
      cl.appendChild(g);
    });

    var u = $('#urgencias');
    u.innerHTML = '';
    VIAJE.info.emergencias.forEach(function (e) {
      var a = el('a', 'urg' + (e.destacado ? ' urg--d' : ''));
      a.href = 'tel:' + e.tel;
      a.appendChild(el('span', 'urg__n', e.valor));
      a.appendChild(el('span', 'urg__l', e.label));
      u.appendChild(a);
    });

    var h = VIAJE.info.hospital || {};
    var hc = $('#hospital');
    hc.innerHTML = '';
    if (h.nombre) {
      hc.appendChild(el('div', 'hospital__n', h.nombre));
      if (h.dir) hc.appendChild(el('div', 'hospital__d', h.dir));
      if (h.nota) hc.appendChild(el('p', 'hospital__t', h.nota));
      if (h.maps) hc.appendChild(botonMapa(h.maps));
    }

    var cs = $('#consejos');
    cs.innerHTML = '';
    VIAJE.info.consejos.forEach(function (c) {
      var d = el('div', 'consejo');
      d.appendChild(el('h4', 'consejo__t', c.titulo));
      d.appendChild(el('p', 'consejo__x', c.texto));
      cs.appendChild(d);
    });
    if (VIAJE.compras) {
      var comp = el('div', 'consejo');
      comp.appendChild(el('h4', 'consejo__t', 'Qué merece la pena traerse'));
      comp.appendChild(el('p', 'consejo__x', VIAJE.compras));
      cs.appendChild(comp);
    }

    var dv = $('#datos-viaje');
    dv.innerHTML = '';
    (VIAJE.meta.vuelos || []).forEach(function (v) {
      var c = el('div', 'vuelo');
      c.appendChild(el('div', 'vuelo__k', v.dir + ' · ' + v.dia));
      var f = el('div', 'vuelo__f');

      var a = el('div');
      a.appendChild(el('div', 'vuelo__h', v.salida));
      a.appendChild(el('div', 'vuelo__a', v.desde));
      f.appendChild(a);

      var mid = el('div', 'vuelo__mid');
      mid.appendChild(el('div', 'vuelo__dur', v.dur));
      mid.appendChild(el('div', 'vuelo__linea'));
      f.appendChild(mid);

      var b = el('div');
      b.appendChild(el('div', 'vuelo__h', v.llegada));
      b.appendChild(el('div', 'vuelo__a', v.hasta));
      f.appendChild(b);

      c.appendChild(f);
      dv.appendChild(c);
    });

    var hotel = VIAJE.meta.hotel;
    if (hotel) {
      var hb = el('div', 'vuelo');
      hb.appendChild(el('div', 'vuelo__k', 'Alojamiento'));
      hb.appendChild(el('div', 'hospital__n', hotel.nombre));
      if (hotel.dir) hb.appendChild(el('div', 'hospital__d', hotel.dir));
      if (hotel.nota) hb.appendChild(el('p', 'hospital__t', hotel.nota));
      if (hotel.maps) hb.appendChild(botonMapa(hotel.maps));
      dv.appendChild(hb);
    }
  }

  /* --- compartir --- */
  $('#btn-compartir').addEventListener('click', function () {
    var url = Almacen.enlace(CFG);
    var aviso = $('#compartir-aviso');
    var datos = { title: 'Viaje a ' + VIAJE.meta.titulo, text: 'El plan del viaje, con horas y presupuesto.', url: url };

    if (navigator.share) {
      navigator.share(datos).catch(function () {});
      return;
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function () {
        aviso.hidden = false;
        aviso.textContent = 'Enlace copiado. Quien lo abra verá este mismo viaje, aunque no tenga la app instalada.';
      }, function () { mostrarUrl(url, aviso); });
      return;
    }
    mostrarUrl(url, aviso);
  });

  function mostrarUrl(url, aviso) {
    aviso.hidden = false;
    aviso.textContent = url;
  }

  /* --- exportar ---

     Sale en el mismo formato que el asistente sabe leer, así que
     este fichero se puede volver a importar, editar y compartir.
     Nadie debería quedarse encerrado dentro de la app. */
  $('#btn-exportar').addEventListener('click', function () {
    var datos = {
      ciudad: VIAJE.meta.titulo,
      fechas: VIAJE.meta.fechas,
      dias: VIAJE.dias.map(function (d) {
        var paradas = [];
        d.bloques.forEach(function (b) {
          b.paradas.forEach(function (p) {
            paradas.push({ hora: p.hora, nombre: p.nombre, por: p.por || '', precio: p.precio || '', maps: p.maps || '' });
          });
        });
        return { titulo: d.dia + ' · ' + d.titulo, fecha: d.fecha, paradas: paradas };
      })
    };
    var texto = JSON.stringify(datos, null, 2);
    var nombre = 'itinerario-' + VIAJE.meta.titulo.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.json';

    try {
      var blob = new Blob([texto], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = el('a');
      a.href = url;
      a.download = nombre;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    } catch (e) {
      var aviso = $('#compartir-aviso');
      aviso.hidden = false;
      aviso.textContent = 'Este navegador no deja descargar ficheros. Se puede copiar el itinerario desde la pestaña del itinerario.';
    }
  });

  $('#btn-editar').addEventListener('click', function (e) {
    if (CFG.compartido) {
      e.preventDefault();
      var copia = JSON.parse(JSON.stringify(CFG));
      delete copia.compartido;
      var g = Almacen.guardar(copia);
      location.href = 'crear.html?id=' + g.id;
    } else {
      this.href = 'crear.html?id=' + CFG.id;
    }
  });

  $('#btn-borrar').addEventListener('click', function () {
    if (!window.confirm('Esto borra las paradas marcadas, el checklist y los gastos apuntados en este móvil. El viaje no se borra. ¿Seguimos?')) return;
    Almacen.limpiarEstado(LLAVE);
    estado = Almacen.cargarEstado(LLAVE);
    arrancar();
  });

  /* ============================================================
     ARRANQUE
     ============================================================ */
  function arrancar() {
    pintarTema();
    $('#btn-suave').setAttribute('aria-pressed', String(estado.suave));

    var m = VIAJE.meta;
    $('#cab-titulo').textContent = m.titulo;

    var hoy = diaDeHoy();
    var sub = m.subtitulo + ' · ' + m.fechas;
    if (hoy) {
      var d = VIAJE.dias.filter(function (x) { return x.id === hoy; })[0];
      sub = 'Hoy · ' + d.dia + ' · ' + d.titulo;
    }
    $('#cab-sub').textContent = sub;

    /* Comer */
    $('#comer-intro').textContent = VIAJE.restaurantes.some(function (r) { return r.plantilla; })
      ? 'Estas fichas son la plantilla del destino: se rellenan con los sitios que se elijan. Las marcas de la derecha indican el nivel de precio.'
      : (m.propio
        ? 'Estos son los sitios que conocemos de la ciudad, por si hace falta resolver una comida sobre la marcha. Los que ya están en tu itinerario salen marcados.'
        : 'Precios reales y días de cierre. Lo marcado como "confirmar" conviene llamarlo antes de cruzar media ciudad.');

    var reglas = $('#comer-reglas');
    reglas.innerHTML = '';
    reglas.appendChild(el('h3', null, 'Tres reglas que ahorran dinero en cualquier ciudad'));
    var ul = el('ul');
    [
      ['Café en la barra.', 'De pie cuesta la mitad o la tercera parte que sentado, y en las plazas monumentales puede multiplicarse por diez.'],
      ['Mira la letra pequeña.', 'Cubierto, couvert o service charge: en casi toda Europa hay un cargo fijo por comensal y tiene que estar escrito en la carta.'],
      ['Dos calles más allá.', 'Menú con fotos, en seis idiomas y alguien invitando a entrar: se sigue andando.']
    ].forEach(function (par) {
      var li = el('li');
      li.appendChild(el('strong', null, par[0] + ' '));
      li.appendChild(document.createTextNode(par[1]));
      ul.appendChild(li);
    });
    reglas.appendChild(ul);

    /* Idioma: si el destino habla español, la pestaña sobra */
    var hayFrases = VIAJE.frases && VIAJE.frases.length;
    $('#tab-idioma').hidden = !hayFrases;
    if (hayFrases) {
      $('#idioma-h').textContent = m.idiomaNombre + ' de supervivencia';
      $('#idioma-nota').textContent = VIAJE.info.idiomaNota || '';
    }

    $('#presu-intro').textContent =
      'Para ' + m.personas + (m.personas === 1 ? ' persona' : ' personas') +
      ', sin vuelos ni alojamiento. Al cambiar las opciones, el total se recalcula solo.';

    $('#credito-perfil').textContent = m.perfiles.length
      ? 'Itinerario ajustado a: ' + m.perfiles.join(', ').toLowerCase() + ', con ritmo ' + m.ritmo + '.'
      : 'Itinerario con ritmo ' + m.ritmo + '.';
    $('#credito-precios').textContent = m.propio
      ? 'El itinerario es el que trajiste tú. De los sitios que hemos reconocido se han añadido precios y avisos; del resto sólo sabemos lo que escribiste.'
      : (m.generico
        ? 'Este viaje usa la plantilla genérica: las paradas marcadas como "por rellenar" hay que completarlas a mano.'
        : 'Precios y horarios orientativos: en los destinos turísticos cambian sin avisar.');

    pintarItinerario();
    pintarFiltrosComer();
    pintarComer();
    if (hayFrases) { pintarFiltrosFrases(); pintarFrases(); }
    pintarPresupuesto();
    pintarInfo();
  }

  arrancar();

  /* Service worker: hace que la app funcione sin datos */
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* da igual */ });
    });
  }

})();
