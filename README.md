# 🧭 Bitácora

**La app de tu viaje, hecha a tu medida.**

Dices a dónde vas, cuándo llegan tus vuelos, dónde duermes y con quién viajas. En dos minutos Bitácora genera una app instalable con el itinerario repartido por horas reales, los sitios donde comer con sus días de cierre, las frases del idioma, el presupuesto calculado y una checklist a medida. Funciona sin conexión y sin cuenta: el viaje se queda en tu móvil.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-offline-5A0FC8?logo=pwa&logoColor=white)
![Vercel](https://img.shields.io/badge/deploy-Vercel-000?logo=vercel)

## 👉 Demo: [venecia2026.vercel.app](https://venecia2026.vercel.app)

[![Ver la demo](https://img.shields.io/badge/Abrir%20la%20demo-venecia2026.vercel.app-0C1A1C?style=for-the-badge&logo=vercel)](https://venecia2026.vercel.app)

Es la app real que hice para un viaje a Venecia. Ábrela en el móvil, pulsa "Añadir a pantalla de inicio" y ponla en modo avión: sigue funcionando.

### Cómo nació

Le pasé mi itinerario a Claude y le pedí una app para llevarlo en el móvil. Lo útil no fue la app. Fue que, antes de escribir una sola línea de código, me dijo que tenía un puente colocado en el barrio equivocado, que el 15 de agosto cierra media ciudad por Ferragosto y que mi vuelo aterrizaba demasiado tarde para el primer día que había planificado. Cuatro fallos que no habría descubierto hasta estar allí.

Este repositorio es la versión generalizada: el mismo motor, preparado para que cualquiera lo adapte a su viaje. **[Salta a "Adáptalo a tu viaje"](#-adáptalo-a-tu-viaje)**.

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

## 🧳 Adáptalo a tu viaje

### Lo que necesitas

- [Git](https://git-scm.com/downloads) y [Node.js](https://nodejs.org) (versión 18 o superior).
- Opcional, para que la IA lo adapte por ti: [Claude Code](https://claude.com/claude-code).
- Opcional, para publicarlo con tu propia web: una cuenta gratuita de [Vercel](https://vercel.com).

### Paso 1 · Descárgalo y ábrelo

```bash
git clone https://github.com/joorjozc/bitacora.git
cd bitacora
npx serve .
```

Abre la dirección que aparece (normalmente `http://localhost:3000`) y entra en **Crear mi viaje**.

### Paso 2 · Elige el camino

**A. Sin tocar código.** Si vas a Venecia, Roma, París o Lisboa, rellena el asistente y listo. Si ya tienes el itinerario escrito (de una guía, de un blog o de un chat con una IA), elige **"Ya tengo mi itinerario"** y pégalo tal cual: se le ponen horas, traslados, precios y avisos.

**B. Con IA, para cualquier destino.** Dentro de la carpeta `bitacora`, abre Claude Code:

```bash
claude
```

Y pega este prompt, rellenando lo que va entre corchetes:

```text
Quiero adaptar Bitácora (esta carpeta) a mi viaje. Mis datos:

- Destino: [ciudad, país]
- Fechas: [del DD/MM/AAAA al DD/MM/AAAA]
- Vuelo de ida: [aeropuerto de salida] a las [HH:MM], llega a [aeropuerto] a las [HH:MM]
- Vuelo de vuelta: sale a las [HH:MM], llega a las [HH:MM]
- Alojamiento: [nombre y dirección]
- Quién viaja: [nombres], [n.º adultos] adultos y [n.º niños] niños
- Perfiles (si aplica): [embarazo / niños pequeños / movilidad reducida / mayores]
- Ritmo: [suave / normal / intenso]
- Presupuesto: [ajustado / medio / holgado]
- Intereses: [historia, arte, comida, fotos, naturaleza, compras...]
- Mi itinerario, si ya lo tengo: [pégalo aquí o escribe "propónmelo tú"]

Antes de tocar código, revisa el plan y dime todo lo que no encaje:
sitios que no están en el barrio que creo, festivos o cierres en mis
fechas, horas imposibles por los vuelos, calor, distancias o escaleras
que no convengan a quien viaja. Espera a que te confirme los cambios.

Después:
1. Si el destino ya tiene pack en js/packs/, úsalo. Si no, crea
   js/packs/<ciudad>.js con la misma estructura que js/packs/venecia.js
   (lugares reales con su búsqueda de Google Maps, horarios, días de
   cierre, precios, restaurantes, transporte y trucos). Regístralo en
   js/packs/catalogo.js y añade el fichero en crear.html, viaje.html,
   la lista ARCHIVOS de sw.js y la lista de pruebas/humo.js y
   pruebas/ver.js. Si el país no está en js/paises.js, añádelo.
2. Guarda mi viaje en pruebas/caso.json, ejecuta node pruebas/humo.js
   y node pruebas/ver.js, y enséñame el itinerario que sale.
3. Sube el número de VERSION en sw.js.

No inventes datos: si no estás seguro de un horario, un precio o una
dirección, márcalo para que lo compruebe yo.
```

### Paso 3 · Publícalo con tu propia web

```bash
npx vercel --prod
```

La primera vez te pedirá iniciar sesión en Vercel y ponerle nombre al proyecto. Al terminar te da una dirección tipo `https://tu-viaje.vercel.app` que puedes abrir en el móvil, instalar y compartir con quien viaja contigo. En Windows también vale `.\deploy.ps1`.

> Cada vez que cambies algo, sube el número de `VERSION` en `sw.js` antes de volver a publicar, o los móviles seguirán viendo la versión anterior.

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

## 📄 Licencia

[MIT](LICENSE) © 2026 Jorge
