/* ============================================================
   Bitácora — portada
   Lista los viajes guardados en este móvil y pinta el catálogo.
   ============================================================ */
(function () {
  'use strict';

  var $ = function (s) { return document.querySelector(s); };

  /* ---------- Tema ---------- */
  var tema = null;
  try { tema = localStorage.getItem('bitacora.tema'); } catch (e) {}
  function pintarTema() {
    if (tema) document.documentElement.setAttribute('data-tema', tema);
    else document.documentElement.removeAttribute('data-tema');
    $('#icono-tema').textContent = tema === 'oscuro' ? '☾' : tema === 'claro' ? '☀' : '◐';
  }
  $('#btn-tema').addEventListener('click', function () {
    tema = tema === null ? 'oscuro' : tema === 'oscuro' ? 'claro' : null;
    try {
      if (tema) localStorage.setItem('bitacora.tema', tema);
      else localStorage.removeItem('bitacora.tema');
    } catch (e) {}
    pintarTema();
  });
  pintarTema();

  /* ---------- Catálogo ---------- */
  var cd = $('#lista-destinos');
  CATALOGO.forEach(function (d) {
    var a = document.createElement('a');
    a.className = 'destino';
    a.href = 'crear.html';
    a.innerHTML =
      '<span class="destino__b" aria-hidden="true">' + d.bandera + '</span>' +
      '<span class="destino__c">' + d.ciudad + '</span>' +
      '<span class="destino__p">' + d.pais + '</span>' +
      '<span class="destino__g">' + d.gancho + '</span>';
    cd.appendChild(a);
  });

  /* ---------- Mis viajes ---------- */
  var viajes = Almacen.listar();
  if (!viajes.length) return;

  $('#mis-viajes').hidden = false;
  var cont = $('#lista-viajes');

  viajes.forEach(function (v) {
    var ciudad = v.destino === 'generico'
      ? (v.ciudad || 'Sin destino')
      : ((CATALOGO.filter(function (c) { return c.clave === v.destino; })[0] || {}).ciudad || v.destino);

    var caja = document.createElement('article');
    caja.className = 'viaje-fila';

    var izq = document.createElement('a');
    izq.className = 'viaje-fila__link';
    izq.href = 'viaje.html?id=' + v.id;
    izq.innerHTML =
      '<span class="viaje-fila__c">' + ciudad + '</span>' +
      '<span class="viaje-fila__f">' + textoFechas(v) + '</span>' +
      '<span class="viaje-fila__q">' + textoQuien(v) + '</span>';
    caja.appendChild(izq);

    var acc = document.createElement('div');
    acc.className = 'viaje-fila__acc';

    var ed = document.createElement('a');
    ed.className = 'mini-b';
    ed.href = 'crear.html?id=' + v.id;
    ed.textContent = 'Editar';
    acc.appendChild(ed);

    var bo = document.createElement('button');
    bo.type = 'button';
    bo.className = 'mini-b mini-b--peligro';
    bo.textContent = 'Borrar';
    bo.addEventListener('click', function () {
      if (!window.confirm('Se borra el viaje a ' + ciudad + ' y todo lo que hayas marcado en él. ¿Seguro?')) return;
      Almacen.borrar(v.id);
      location.reload();
    });
    acc.appendChild(bo);

    caja.appendChild(acc);
    cont.appendChild(caja);
  });

  function textoFechas(v) {
    if (!v.inicio || !v.fin) return 'Sin fechas';
    var noches = Math.round((new Date(v.fin) - new Date(v.inicio)) / 86400000);
    return v.inicio + ' → ' + v.fin + ' · ' + (noches + 1) + ' días';
  }

  function textoQuien(v) {
    var n = (v.adultos || 0) + (v.ninos || 0);
    var base = n + (n === 1 ? ' persona' : ' personas');
    if (v.nombres && v.nombres.length) base = v.nombres.join(' & ');
    return base + ' · ritmo ' + (v.ritmo || 'normal');
  }
})();
