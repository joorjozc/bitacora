# 🧭 Bitácora

**La app de tu viaje, hecha a tu medida.**

Dices a dónde vas, cuándo llegan tus vuelos, dónde duermes y con quién viajas. En dos minutos Bitácora genera una app instalable con el itinerario repartido por horas reales, los sitios donde comer con sus días de cierre, las frases del idioma, el presupuesto calculado y una checklist a medida. Funciona sin conexión y sin cuenta: el viaje se queda en tu móvil.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-offline-5A0FC8?logo=pwa&logoColor=white)
![Vercel](https://img.shields.io/badge/deploy-Vercel-000?logo=vercel)

---

## ✨ Qué hace

| | |
|---|---|
| **Itinerario con horas de verdad** | No "día 1: San Marco", sino las 8:15 en San Marco porque el vuelo aterrizó la noche anterior, el mercado cierra a las 13:00 y a las 14:00 hace 33 grados. |
| **Dónde comer, con sus cierres** | Sitios reales con nivel de precio, día de cierre y teléfono, filtrados por presupuesto y por quién viaja. |
| **El idioma en tarjetas grandes** | Unas ochenta frases con la pronunciación escrita, que se abren a pantalla completa para enseñarlas. |
| **Presupuesto que se recalcula** | Traslados, comida, entradas y transporte para tu grupo y tus días. Cambias una opción y el total se mueve; además puedes apuntar el gasto real. |
| **Checklist que sabe quién eres** | Documentos y consejos según el perfil: embarazo, niños, movilidad reducida, mayores, país dentro o fuera de la UE… |
| **Sin conexión y sin cuenta** | Se instala como app (PWA), funciona en modo avión y se comparte con un enlace que lleva el viaje dentro. |
| **Trae tu propio itinerario** | Si ya lo tienes escrito, lo pegas: se le ponen horas, traslados, precios y avisos de los sitios que reconoce. |

### Destinos

Contenido completo para **Venecia, Roma, París y Lisboa** (sitios reales, precios, trucos y avisos). Para cualquier otro destino se genera el esqueleto del viaje —traslados, horarios, dinero, frases y checklist— listo para rellenar.

## 🧠 Cómo funciona por dentro

Sin frameworks, sin dependencias y sin backend. Toda la lógica vive en el navegador.

```
index.html            Portada y "Mis viajes"
crear.html            Asistente de seis pasos
viaje.html            La app del viaje generado
sw.js                 Service worker: caché offline
js/
  motor.js            El motor: reparte barrios por días, encaja visitas
                      entre vuelos, respeta cierres, ritmo y perfiles
  packs/              Datos de cada destino (un fichero por ciudad)
    catalogo.js       Registro de destinos disponibles
  paises.js           Emergencias, agua, propinas, moneda… por país
  idiomas.js          Frases y pronunciación por idioma
  importar.js         Lector de itinerarios pegados en texto libre
  almacen.js          Persistencia en localStorage
  app.js, crear.js, inicio.js   Interfaz de cada página
css/                  Estilos, paletas y tema claro/oscuro
pruebas/              Pruebas del motor con Node, sin navegador
```

La separación clave: **el motor decide, los packs son datos**. Añadir un destino es crear `js/packs/<ciudad>.js`, registrarlo en `catalogo.js` y enlazar el `<script>` en `crear.html` y `viaje.html`.

## 🚀 Ejecutarlo en local

No hay que instalar nada. Basta con servir la carpeta (el service worker necesita `http://`, no `file://`):

```bash
npx serve .
# o
python -m http.server 8000
```

## ✅ Pruebas

Las pruebas cargan el motor en una máquina virtual de Node y generan viajes con distintas combinaciones de destino, fechas, perfiles y ritmos:

```bash
node pruebas/humo.js             # coherencia del itinerario en los cuatro destinos
node pruebas/importar.test.js    # importación de itinerarios propios
node pruebas/ver.js              # imprime un viaje de ejemplo (pruebas/caso.json)
```

## 📦 Despliegue

Está preparado para Vercel (`vercel.json` define las cabeceras de caché). Con Node instalado:

```powershell
.\deploy.ps1
```

> Cada vez que cambies un fichero, sube el número de `VERSION` en `sw.js`; si no, los móviles que ya tengan la app instalada seguirán viendo la versión en caché.

## 📄 Licencia

[MIT](LICENSE) © 2026 Jorge
