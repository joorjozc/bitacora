/* ============================================================
   Bitácora — importar un itinerario propio
   Casi nadie tiene su viaje en un formato bonito: lo tiene en
   una nota del móvil, en un mensaje o en un correo. Esto lee
   ese texto tal cual y lo convierte en días y paradas.

   Acepta:
     · texto pegado o un fichero .txt / .md
     · el JSON que exporta la propia app
   ============================================================ */

var Importar = (function () {
  'use strict';

  var DIAS_TXT = ['domingo', 'lunes', 'martes', 'miércoles', 'miercoles',
                  'jueves', 'viernes', 'sábado', 'sabado'];

  function limpiar(s) {
    return String(s).replace(/^[\s>*•·\-–—]+/, '').replace(/\s+$/, '');
  }

  function sinAcentos(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  /* ¿Esta línea abre un día nuevo? */
  function esCabeceraDia(linea) {
    var l = sinAcentos(limpiar(linea));
    if (!l) return false;
    if (/^#{1,3}\s/.test(linea)) return true;                       // markdown
    if (/^d[ií]a\s*\d/.test(l)) return true;                        // "Día 2"
    if (/^\d{4}-\d{2}-\d{2}/.test(l)) return true;                  // 2026-08-13
    if (/^\d{1,2}[/.]\d{1,2}([/.]\d{2,4})?\s*$/.test(l)) return true; // 13/08
    for (var i = 0; i < DIAS_TXT.length; i++) {
      if (l.indexOf(sinAcentos(DIAS_TXT[i])) === 0) return true;    // "Jueves 13"
    }
    /* Aquí acaba la lista a propósito. Cualquier regla más lista
       ("línea corta que empieza por mayúscula") convierte "Piazza
       San Marco" en un título de día, y entonces el itinerario que
       ha pegado el usuario se deshace en veinte días de una parada. */
    return false;
  }

  /* Saca la hora del principio de la línea, si la hay. */
  function partirHora(linea) {
    var m = linea.match(/^\s*(\d{1,2})\s*[:h.]\s*(\d{2})\b\s*[-–—:.]?\s*/);
    if (m) {
      var h = Math.min(23, +m[1]), mi = Math.min(59, +m[2]);
      return { hora: (h < 10 ? '0' : '') + h + ':' + (mi < 10 ? '0' : '') + mi,
               resto: linea.slice(m[0].length) };
    }
    var m2 = linea.match(/^\s*(\d{1,2})\s*h\b\s*[-–—:.]?\s*/i);
    if (m2) {
      var h2 = Math.min(23, +m2[1]);
      return { hora: (h2 < 10 ? '0' : '') + h2 + ':00', resto: linea.slice(m2[0].length) };
    }
    return { hora: null, resto: linea };
  }

  /* Separa "Nombre — nota" en sus dos partes. Sólo con guion
     rodeado de espacios: hay sitios que llevan guion en el nombre. */
  function partirNota(texto) {
    var separadores = [/\s+[—–]\s+/, /\s+\|\s+/, /\s+::\s+/, /\s+-\s+/];
    for (var i = 0; i < separadores.length; i++) {
      var trozos = texto.split(separadores[i]);
      if (trozos.length > 1 && trozos[0].trim().length >= 2) {
        return { nombre: trozos[0].trim(), por: trozos.slice(1).join(' — ').trim() };
      }
    }
    return { nombre: texto.trim(), por: '' };
  }

  function paradaDeLinea(linea) {
    var h = partirHora(linea);
    var n = partirNota(h.resto);
    if (!n.nombre) return null;
    return { hora: h.hora, nombre: n.nombre, por: n.por };
  }

  /* ---------- Texto → días ----------
     Dos pasadas: primero buscando cabeceras de día explícitas y, si
     no hay ninguna, partiendo por líneas en blanco. Casi todo el
     mundo escribe su viaje de una de esas dos formas. */
  function deTexto(texto) {
    var lineas = String(texto || '').split(/\r?\n/);
    var hayCabeceras = lineas.some(esCabeceraDia);
    var dias = [];
    var actual = null;

    lineas.forEach(function (cruda) {
      var linea = limpiar(cruda);

      if (!linea) {
        if (!hayCabeceras) actual = null;    // línea en blanco = día nuevo
        return;
      }
      if (hayCabeceras && esCabeceraDia(cruda)) {
        actual = { titulo: linea.replace(/^#{1,3}\s*/, '').trim(), paradas: [] };
        dias.push(actual);
        return;
      }
      if (!actual) {
        actual = { titulo: 'Día ' + (dias.length + 1), paradas: [] };
        dias.push(actual);
      }
      var p = paradaDeLinea(linea);
      if (p) actual.paradas.push(p);
    });

    return dias.filter(function (d) { return d.paradas.length; });
  }

  /* ---------- JSON → días ---------- */
  function deJson(texto) {
    var o = JSON.parse(texto);
    var dias = Array.isArray(o) ? o : (o.dias || (o.propio && o.propio.dias) || []);
    return dias.map(function (d) {
      return {
        titulo: d.titulo || d.dia || '',
        fecha: d.fecha || '',
        paradas: (d.paradas || []).map(function (p) {
          return { hora: p.hora || null, nombre: p.nombre || '', por: p.por || '', maps: p.maps || '', precio: p.precio || '' };
        }).filter(function (p) { return p.nombre; })
      };
    }).filter(function (d) { return d.paradas.length; });
  }

  /* Punto de entrada: decide solo qué formato es. */
  function leer(texto) {
    var t = String(texto || '').trim();
    if (!t) return [];
    if (t.charAt(0) === '{' || t.charAt(0) === '[') {
      try { return deJson(t); } catch (e) { /* no era JSON: lo tratamos como texto */ }
    }
    return deTexto(t);
  }

  /* ---------- Días → texto (para poder seguir editando) ---------- */
  function aTexto(dias) {
    return (dias || []).map(function (d) {
      var cab = d.titulo || d.fecha || 'Día';
      var cuerpo = d.paradas.map(function (p) {
        return (p.hora ? p.hora + ' ' : '') + p.nombre + (p.por ? ' — ' + p.por : '');
      }).join('\n');
      return cab + '\n' + cuerpo;
    }).join('\n\n');
  }

  return { leer: leer, deTexto: deTexto, deJson: deJson, aTexto: aTexto, sinAcentos: sinAcentos };
})();
