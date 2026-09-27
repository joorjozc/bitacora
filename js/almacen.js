/* ============================================================
   Bitácora — almacén
   Los viajes viven en el móvil de quien los crea. No hay
   servidor, no hay cuenta y no hay nada que se suba a ninguna
   parte: por eso la app funciona sin conexión y por eso el
   enlace para compartir lleva el viaje entero dentro.
   ============================================================ */

var Almacen = (function () {
  'use strict';

  var K_VIAJES = 'bitacora.viajes';
  var K_ACTIVO = 'bitacora.activo';
  var K_ESTADO = 'bitacora.estado.';

  function leer(k, porDefecto) {
    try {
      var s = localStorage.getItem(k);
      return s ? JSON.parse(s) : porDefecto;
    } catch (e) { return porDefecto; }
  }

  function escribir(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); return true; }
    catch (e) { return false; }      // modo privado o almacenamiento lleno
  }

  /* ---------- Viajes ---------- */

  function listar() {
    var v = leer(K_VIAJES, []);
    return Array.isArray(v) ? v : [];
  }

  function guardar(cfg) {
    var lista = listar();
    if (!cfg.id) cfg.id = 'v' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    if (!cfg.creado) cfg.creado = new Date().toISOString().slice(0, 10);
    cfg.modificado = new Date().toISOString().slice(0, 10);

    var i = -1;
    for (var k = 0; k < lista.length; k++) if (lista[k].id === cfg.id) i = k;
    if (i >= 0) lista[i] = cfg; else lista.unshift(cfg);

    escribir(K_VIAJES, lista);
    escribir(K_ACTIVO, cfg.id);
    return cfg;
  }

  function obtener(id) {
    var lista = listar();
    for (var i = 0; i < lista.length; i++) if (lista[i].id === id) return lista[i];
    return null;
  }

  function borrar(id) {
    escribir(K_VIAJES, listar().filter(function (v) { return v.id !== id; }));
    try { localStorage.removeItem(K_ESTADO + id); } catch (e) {}
    if (activo() === id) {
      var q = listar();
      escribir(K_ACTIVO, q.length ? q[0].id : null);
    }
  }

  function activo() { return leer(K_ACTIVO, null); }
  function activar(id) { escribir(K_ACTIVO, id); }

  /* ---------- Estado de uso de un viaje ---------- */

  function estadoBase() {
    return { tema: null, suave: false, dia: null, hechas: {}, check: {}, gastos: [], opciones: {} };
  }

  function cargarEstado(id) {
    var base = estadoBase();
    var g = leer(K_ESTADO + id, null);
    if (!g) return base;
    for (var k in base) if (g[k] !== undefined && g[k] !== null) base[k] = g[k];
    return base;
  }

  function guardarEstado(id, estado) { escribir(K_ESTADO + id, estado); }
  function limpiarEstado(id) { try { localStorage.removeItem(K_ESTADO + id); } catch (e) {} }

  /* ---------- Compartir ----------
     El viaje entero cabe en la URL porque lo que se guarda son
     los parámetros, no el contenido: el motor lo vuelve a montar
     igual en el móvil de quien lo abra. */

  function codificar(cfg) {
    var limpio = JSON.parse(JSON.stringify(cfg));
    delete limpio.id; delete limpio.creado; delete limpio.modificado;
    var json = JSON.stringify(limpio);
    var b64 = btoa(unescape(encodeURIComponent(json)));
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function decodificar(txt) {
    try {
      var b64 = String(txt).replace(/-/g, '+').replace(/_/g, '/');
      while (b64.length % 4) b64 += '=';
      return JSON.parse(decodeURIComponent(escape(atob(b64))));
    } catch (e) { return null; }
  }

  function enlace(cfg) {
    var base = location.href.replace(/[^/]*$/, '');
    return base + 'viaje.html#v=' + codificar(cfg);
  }

  /* Devuelve el CONFIG que toca abrir: primero el del enlace,
     luego el ?id= y por último el activo. */
  function resolver() {
    var h = location.hash || '';
    if (h.indexOf('#v=') === 0) {
      var c = decodificar(h.slice(3));
      if (c) { c.compartido = true; return c; }
    }
    var q = new URLSearchParams(location.search).get('id');
    if (q) { var v = obtener(q); if (v) return v; }
    var a = activo();
    if (a) { var w = obtener(a); if (w) return w; }
    var lista = listar();
    return lista.length ? lista[0] : null;
  }

  return {
    listar: listar, guardar: guardar, obtener: obtener, borrar: borrar,
    activo: activo, activar: activar,
    cargarEstado: cargarEstado, guardarEstado: guardarEstado, limpiarEstado: limpiarEstado,
    codificar: codificar, decodificar: decodificar, enlace: enlace, resolver: resolver
  };
})();
