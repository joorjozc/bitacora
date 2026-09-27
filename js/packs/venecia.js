/* ============================================================
   Pack de destino — Venecia
   El motor lee esto y lo mezcla con los parámetros del viajero.
   Aquí no hay fechas ni horas: sólo la ciudad. Las horas las
   pone el motor según cuándo aterriza cada uno.
   Ver MODELO-DE-DATOS.md para el significado de cada campo.
   ============================================================ */

PACKS.venecia = {
  clave: 'venecia',
  ciudad: 'Venecia',
  pais: 'it',
  paleta: 'laguna',
  lema: 'Una ciudad sin coches construida sobre el agua, en la que perderse es el plan.',

  /* Meses en los que la ciudad castiga. El motor lo usa para
     decidir si mete siesta y qué avisos pone. */
  clima: {
    1: { max: 7, nota: 'Frío húmedo y niebla. Es la temporada del acqua alta: puede haber pasarelas en San Marco.' },
    2: { max: 9, nota: 'Carnaval: la ciudad se llena y los precios se disparan.' },
    3: { max: 14, nota: 'Buen mes. Fresco, poca cola.' },
    4: { max: 18, nota: 'Uno de los mejores momentos del año.' },
    5: { max: 22, nota: 'Perfecto de temperatura, ya con bastante gente.' },
    6: { max: 27, nota: 'Empieza el calor de verdad y la humedad de laguna.' },
    7: { max: 30, calor: true, nota: 'Calor y humedad fuertes. La ciudad huele a canal por las tardes.' },
    8: { max: 30, calor: true, nota: 'Mes duro: 30-34 °C con humedad de laguna, poca sombra y muchos negocios cerrados por vacaciones.' },
    9: { max: 26, nota: 'Vuelve a ser agradable y baja la gente.' },
    10: { max: 20, nota: 'Muy buen mes, con riesgo bajo de acqua alta.' },
    11: { max: 14, nota: 'Temporada alta de acqua alta. Botas de agua y consultar el aviso de marea.' },
    12: { max: 9, nota: 'Frío y húmedo, pero la ciudad está vacía y la luz es preciosa.' }
  },

  aeropuertos: [
    {
      cod: 'VCE', nombre: 'Marco Polo',
      min: 75,
      pasos: [
        { nombre: 'Bus ATVO → Piazzale Roma', min: 25, maps: 'Piazzale Roma, Venezia',
          por: 'El expreso al centro. Sale cada 20-30 min y es la última parada, así que no hay forma de pasarse.',
          tip: 'Comprar el billete de IDA Y VUELTA (20 €) en la máquina de la zona de equipajes: son 4 € menos que dos sencillos y el día de la vuelta ya está resuelto.',
          precio: '20 € por persona (ida y vuelta)', precioNum: 20 },
        { nombre: 'Vaporetto → parada del alojamiento', min: 20,
          por: 'Desde Piazzale Roma al centro hay 30-40 min andando cruzando puentes con maleta. Con equipaje no compensa.',
          tip: 'Billete sencillo, 9,50 € cada uno. Aquí NO conviene empezar el pase de 72 h: se comería el primer día entero.',
          precio: '9,50 € por persona', precioNum: 9.5 }
      ],
      vuelta: 'Salir del alojamiento tres horas antes del vuelo: vaporetto hasta Piazzale Roma, bus ATVO y el aeropuerto es pequeño pero en agosto va lleno.'
    },
    {
      cod: 'TSF', nombre: 'Treviso',
      min: 90,
      pasos: [
        { nombre: 'Bus ATVO Treviso → Piazzale Roma', min: 70, maps: 'Piazzale Roma, Venezia',
          por: 'El aeropuerto de las low cost. Está a 40 km, así que el bus es largo pero directo.',
          tip: 'El bus está coordinado con los vuelos, pero si el vuelo se retrasa mucho conviene mirar el último horario.',
          precio: '12 € por persona', precioNum: 12 },
        { nombre: 'Vaporetto → parada del alojamiento', min: 20,
          por: 'El último tramo, ya dentro de la ciudad.',
          precio: '9,50 € por persona', precioNum: 9.5 }
      ],
      vuelta: 'Salir del alojamiento tres horas y media antes: el bus desde Piazzale Roma tarda 70 minutos largos.'
    }
  ],

  zonas: [
    { id: 'sanmarco', nombre: 'San Marco', nota: 'El centro monumental. Precioso a primera hora y de noche, imposible a mediodía.' },
    { id: 'rialto', nombre: 'Rialto y San Polo', nota: 'El mercado, los bacari y la Venecia que trabaja.' },
    { id: 'castello', nombre: 'Castello', nota: 'El barrio grande que no sale en las postales: vecinos, ropa tendida y campi sin nadie.' },
    { id: 'cannaregio', nombre: 'Cannaregio', nota: 'El gueto judío y los canales largos donde se cena junto al agua.' },
    { id: 'dorsoduro', nombre: 'Dorsoduro', nota: 'Museos, estudiantes y las Zattere para ver la puesta de sol.' },
    { id: 'islas', nombre: 'Islas de la laguna', excursion: true, nota: 'Murano, Burano y Torcello. Medio día como mínimo, casi todo en vaporetto.' }
  ],

  lugares: [
    /* ---------- San Marco ---------- */
    { id: 'sanmarco-plaza', nombre: 'Piazza San Marco', zona: 'sanmarco', tipo: 'mirador',
      maps: 'Piazza San Marco, Venezia', dur: 30, and: 3, prioridad: 1,
      intereses: ['historia', 'foto'], amanecer: true, precioNum: 0, precio: 'Gratis',
      por: 'La plaza más famosa del mundo. Entre las 7 y las 9 está prácticamente vacía y el sol da de lleno en la fachada de la Basílica; a las 11 es un hervidero.',
      tip: 'Mirar hacia arriba en la Torre dell\'Orologio: los dos "moros" de bronce dan la hora a martillazos.',
      aviso: 'Nada de sentarse en las terrazas de la plaza: un café puede irse a 12 € con el suplemento de música.' },

    { id: 'basilica', nombre: 'Basílica de San Marco', zona: 'sanmarco', tipo: 'lugar',
      maps: 'Basilica di San Marco, Venezia', dur: 45, and: 2, prioridad: 1,
      intereses: ['arte', 'historia'], precio: '10 € por persona · por fuera, 0 €', precioNum: 10,
      reserva: 'Reservar hora online: sin reserva la cola pasa de una hora.',
      por: 'Ocho mil metros cuadrados de mosaico de oro bizantino. Por fuera ya se ve el 80 % de lo que impresiona, así que entrar es opcional.',
      tip: 'Hombros y rodillas cubiertos, y no dejan entrar con mochilas grandes: hay consigna gratuita en la calle de al lado.' },

    { id: 'ducal', nombre: 'Palacio Ducal', zona: 'sanmarco', tipo: 'museo',
      maps: 'Palazzo Ducale, Venezia', dur: 90, and: 2, prioridad: 2,
      intereses: ['arte', 'historia'], precio: '30 € por persona', precioNum: 30,
      reserva: 'Entrada con hora online, y conviene cogerla con días.',
      por: 'La sede del poder de la República durante mil años, con la sala del Gran Consejo y el paso por el Puente de los Suspiros hacia las prisiones.',
      tip: 'La entrada incluye el Museo Correr y otros tres museos de la plaza, y vale para varios días.' },

    { id: 'suspiros', nombre: 'Puente de los Suspiros', zona: 'sanmarco', tipo: 'lugar',
      maps: 'Ponte dei Sospiri, Venezia', dur: 10, and: 4, prioridad: 1,
      intereses: ['foto', 'historia'], precioNum: 0, precio: 'Gratis',
      por: 'La foto se hace desde el Ponte della Paglia, en la orilla. Dos minutos y seguimos.' },

    { id: 'bovolo', nombre: 'Scala Contarini del Bovolo', zona: 'sanmarco', tipo: 'lugar',
      maps: 'Scala Contarini del Bovolo, Venezia', dur: 40, and: 8, prioridad: 3,
      intereses: ['arte', 'foto'], escaleras: true, precio: '8 € por persona', precioNum: 8,
      reserva: 'Entrada cada 30 min y máximo 20 personas: se reserva online.',
      por: 'Una escalera de caracol renacentista escondida en un patio que casi nadie encuentra. "Bovolo" es caracol en veneciano. Desde arriba se ven los tejados.',
      aviso: 'Son unos 80 escalones de caracol estrechos. El patio de abajo ya merece la visita y es gratis.' },

    { id: 'fenice', nombre: 'Teatro La Fenice', zona: 'sanmarco', tipo: 'museo',
      maps: 'Teatro La Fenice, Venezia', dur: 50, and: 7, prioridad: 3,
      intereses: ['arte', 'historia'], precio: '12 € por persona', precioNum: 12,
      por: 'La ópera que se ha quemado tres veces y tres veces ha vuelto a levantarse, de ahí el nombre. La visita lleva audioguía y se hace en menos de una hora.' },

    /* ---------- Rialto y San Polo ---------- */
    { id: 'mercado-rialto', nombre: 'Mercato di Rialto', zona: 'rialto', tipo: 'mercado',
      maps: 'Mercato di Rialto, Venezia', dur: 40, and: 12, prioridad: 1,
      intereses: ['comida', 'foto'], amanecer: true, cierra: [0, 1], precioNum: 0, precio: 'Gratis',
      por: 'La pescadería bajo los soportales góticos es la Venecia que trabaja: cajas de moeche, sepias y venecianos discutiendo el precio.',
      tip: 'Cierra sobre las 13:00 y domingos y lunes no hay pescadería.',
      aviso: 'Hay que ir antes de las 12:00 o encontraremos las mesas ya recogidas.' },

    { id: 'puente-rialto', nombre: 'Puente de Rialto', zona: 'rialto', tipo: 'mirador',
      maps: 'Ponte di Rialto, Venezia', dur: 15, and: 4, prioridad: 1,
      intereses: ['foto', 'historia'], escaleras: true, precioNum: 0, precio: 'Gratis',
      por: 'El clásico: subimos, hacemos la foto del Gran Canal y bajamos enseguida por las calles laterales, que es donde empieza lo bueno.' },

    { id: 'frari', nombre: 'Basilica dei Frari', zona: 'rialto', tipo: 'lugar',
      maps: 'Basilica dei Frari, Venezia', dur: 45, and: 12, prioridad: 2,
      intereses: ['arte', 'historia'], cierra: [], precio: '5 € por persona', precioNum: 5,
      por: 'Una iglesia gótica enorme y en penumbra con la Asunción de Tiziano sobre el altar, que es de esos cuadros que se ven a diez metros y ya impresionan. Y casi nunca hay cola.' },

    { id: 'scuola-rocco', nombre: 'Scuola Grande di San Rocco', zona: 'rialto', tipo: 'museo',
      maps: 'Scuola Grande di San Rocco, Venezia', dur: 60, and: 3, prioridad: 3,
      intereses: ['arte'], precio: '10 € por persona', precioNum: 10,
      por: 'Cincuenta y cuatro lienzos de Tintoretto cubriendo techos y paredes: veintitrés años de trabajo de un solo hombre en una sola sala.',
      tip: 'Dan espejos de mano en la entrada para mirar los techos sin partirse el cuello.' },

    /* ---------- Castello ---------- */
    { id: 'acqua-alta', nombre: 'Libreria Acqua Alta', zona: 'castello', tipo: 'lugar',
      maps: 'Libreria Acqua Alta, Venezia', dur: 30, and: 10, prioridad: 1,
      intereses: ['foto', 'compras'], precioNum: 0, precio: 'Gratis',
      por: 'Una librería que guarda los libros dentro de góndolas y bañeras para salvarlos de las inundaciones, con una escalera hecha de enciclopedias mojadas que da al canal. Sí, es turística. Merece la pena igual.',
      tip: 'Entrar por la puerta del fondo hacia el patio: ahí está la escalera de libros.' },

    { id: 'calle-paradiso', nombre: 'Calle del Paradiso', zona: 'castello', tipo: 'lugar',
      maps: 'Calle del Paradiso, Venezia', dur: 10, and: 3, prioridad: 2,
      intereses: ['foto', 'historia'], precioNum: 0, precio: 'Gratis',
      por: 'Una calle medieval con los pisos superiores sobresaliendo sobre el suelo y un arco gótico del siglo XIV en cada extremo. Probablemente la calle más bonita de la ciudad, y no hay nadie.' },

    { id: 'santa-maria-formosa', nombre: 'Campo Santa Maria Formosa', zona: 'castello', tipo: 'descanso',
      maps: 'Campo Santa Maria Formosa, Venezia', dur: 20, and: 3, prioridad: 2,
      intereses: ['historia'], precioNum: 0, precio: 'Gratis',
      por: 'Un campo grande e irregular con niños jugando al balón y vecinos en los bancos. Hay sombra y sitio para sentarse un rato.' },

    { id: 'arsenale', nombre: 'Arsenale', zona: 'castello', tipo: 'lugar',
      maps: 'Arsenale di Venezia', dur: 30, and: 15, prioridad: 3,
      intereses: ['historia', 'foto'], precioNum: 0, precio: 'Por fuera, gratis',
      por: 'El astillero que construía una galera al día en el siglo XVI y que hizo posible el imperio. La puerta de entrada, con los leones de mármol robados en Grecia, se ve desde el puente.' },

    { id: 'giardini', nombre: 'Giardini della Biennale', zona: 'castello', tipo: 'parque',
      maps: 'Giardini della Biennale, Venezia', dur: 40, and: 10, prioridad: 3,
      intereses: ['naturaleza'], precioNum: 0, precio: 'Gratis',
      por: 'El único parque grande con sombra de verdad de toda Venecia. En una ciudad de piedra y agua, eso vale más de lo que parece.' },

    /* ---------- Cannaregio ---------- */
    { id: 'ghetto', nombre: 'Gueto judío de Cannaregio', zona: 'cannaregio', tipo: 'lugar',
      maps: 'Campo di Ghetto Nuovo, Venezia', dur: 45, and: 15, prioridad: 2,
      intereses: ['historia'], cierra: [6], precioNum: 0, precio: 'La plaza, gratis · museo 12 €',
      por: 'El primer gueto del mundo, de 1516: la palabra sale de aquí. Como no podían crecer a lo ancho, crecieron a lo alto, y por eso son los edificios más altos de Venecia.',
      tip: 'El sábado es shabbat y el museo y las sinagogas cierran.' },

    { id: 'fondamenta-misericordia', nombre: 'Fondamenta della Misericordia', zona: 'cannaregio', tipo: 'noche',
      maps: 'Fondamenta della Misericordia, Venezia', dur: 60, and: 8, prioridad: 2,
      intereses: ['comida', 'noche'], franja: 'noche', precioNum: 0, precio: 'Gratis pasear',
      por: 'Un canal largo con mesas de bacari a los dos lados donde salen los venecianos de verdad. A partir de las siete es donde está la vida.' },

    { id: 'madonna-orto', nombre: 'Madonna dell\'Orto', zona: 'cannaregio', tipo: 'lugar',
      maps: "Chiesa della Madonna dell'Orto, Venezia", dur: 30, and: 6, prioridad: 3,
      intereses: ['arte'], cierra: [0], precio: '4 € por persona', precioNum: 4,
      por: 'La iglesia del barrio de Tintoretto, con su tumba dentro y dos lienzos suyos enormes. Casi siempre vacía.' },

    /* ---------- Dorsoduro ---------- */
    { id: 'squero', nombre: 'Squero di San Trovaso', zona: 'dorsoduro', tipo: 'mirador',
      maps: 'Squero di San Trovaso, Venezia', dur: 20, and: 12, prioridad: 2,
      intereses: ['historia', 'foto'], precioNum: 0, precio: 'Gratis',
      por: 'Uno de los últimos astilleros donde todavía se construyen y reparan góndolas a mano. Se ve desde la otra orilla del canal, con una copa en la mano.' },

    { id: 'guggenheim', nombre: 'Colección Peggy Guggenheim', zona: 'dorsoduro', tipo: 'museo',
      maps: 'Peggy Guggenheim Collection, Venezia', dur: 90, and: 10, prioridad: 2,
      intereses: ['arte'], cierra: [2], precio: '17 € por persona', precioNum: 17,
      por: 'Pollock, Picasso, Magritte y Calder en el palacio inacabado donde vivió Peggy Guggenheim, con un jardín de esculturas y terraza sobre el Gran Canal.',
      tip: 'El jardín tiene sombra y bancos: buen sitio para parar aunque no se entre a las salas.' },

    { id: 'salute', nombre: 'Basílica de la Salute', zona: 'dorsoduro', tipo: 'lugar',
      maps: 'Basilica di Santa Maria della Salute, Venezia', dur: 30, and: 10, prioridad: 2,
      intereses: ['arte', 'historia'], precioNum: 0, precio: 'Gratis · sacristía 6 €',
      por: 'La cúpula blanca que cierra el Gran Canal, levantada como promesa por el fin de la peste de 1630. Está apoyada sobre más de un millón de troncos clavados en el barro.' },

    { id: 'zattere', nombre: 'Zattere al atardecer', zona: 'dorsoduro', tipo: 'mirador',
      maps: 'Fondamenta Zattere, Venezia', dur: 45, and: 8, prioridad: 1,
      intereses: ['foto', 'naturaleza'], franja: 'tarde', precioNum: 0, precio: 'Gratis',
      por: 'Un paseo largo y ancho frente al canal de la Giudecca, orientado al sur: es el sitio donde mejor se pone el sol en Venecia y donde corre algo de aire.' },

    /* ---------- Islas ---------- */
    { id: 'burano', nombre: 'Burano', zona: 'islas', tipo: 'lugar',
      maps: 'Burano, Venezia', dur: 150, and: 45, prioridad: 1,
      intereses: ['foto', 'compras'], precio: 'Sólo el vaporetto', precioNum: 0,
      por: 'La isla de las casas pintadas de colores imposibles, que se pintaban así para que los pescadores las distinguieran con niebla. Es un pueblo de verdad, con abuelas haciendo encaje en la puerta.',
      tip: 'Los 45 minutos de vaporetto desde Fondamente Nove ya son parte del plan: se va sentado y con aire.' },

    { id: 'murano', nombre: 'Murano', zona: 'islas', tipo: 'lugar',
      maps: 'Murano, Venezia', dur: 90, and: 25, prioridad: 2,
      intereses: ['compras', 'historia'], precio: 'Sólo el vaporetto', precioNum: 0,
      por: 'Donde mandaron a los vidrieros en 1291 para que no quemaran Venecia entera. Se puede ver soplar vidrio en directo, gratis, en varios talleres.',
      aviso: 'Huir de los "tours gratuitos" que ofrecen en la parada: acaban en una tienda con presión para comprar.' },

    { id: 'torcello', nombre: 'Torcello', zona: 'islas', tipo: 'lugar',
      maps: 'Torcello, Venezia', dur: 90, and: 10, prioridad: 3,
      intereses: ['historia', 'naturaleza'], precio: 'Basílica 5 €', precioNum: 5,
      por: 'La isla donde empezó todo y donde hoy viven diez personas. Tiene una basílica del año 639 con un Juicio Final en mosaico que pone los pelos de punta.' }
  ],

  restaurantes: [
    { nombre: 'Cantina Do Spade', tipo: 'Bacaro', zona: 'San Polo · junto a Rialto',
      maps: 'Cantina Do Spade, Venezia', tel: '+390415210583',
      nivel: 1, precio: '30-45 € los dos', comida: true, cena: true,
      detalle: 'Cicchetti 1,50-3,50 € · plato 12-18 € · vino desde 1,50 €',
      cierra: 'Abierto todos los días · 10:00-15:00 y 18:00-22:00',
      perfil: { embarazo: 'ok' },
      nota: 'Bacaro documentado desde 1488; por aquí pasó Casanova. Las polpette y el baccalà mantecato van cocinados.' },

    { nombre: 'Osteria La Zucca', tipo: 'Osteria', zona: 'Santa Croce 1762',
      maps: 'Osteria La Zucca, Santa Croce 1762, Venezia', tel: '+390415241570',
      nivel: 2, precio: '35-45 € por persona', comida: true, cena: true,
      detalle: 'Entrante 10-14 € · principal 16-22 € · el flan de calabaza es la casa',
      cierra: 'Lun-vie 12:30-14:30 y 19:00-22:30 · sáb sólo cena · CIERRA DOMINGO',
      cierraDias: [0], reserva: true,
      perfil: { embarazo: 'ideal' },
      nota: 'Cocina de verduras de temporada, todo cocinado: el sitio más cómodo del viaje si hay que evitar crudos. Reserva obligatoria.' },

    { nombre: 'Osteria Anice Stellato', tipo: 'Osteria', zona: 'Cannaregio 3272 · Misericordia',
      maps: 'Osteria Anice Stellato, Venezia', tel: '+39041720744',
      nivel: 2, precio: '35-45 € por persona', cena: true,
      detalle: 'Dos platos con vino, unos 80 € los dos · el tiramisú es célebre',
      cierra: 'CIERRA DOMINGO Y LUNES', cierraDias: [0, 1], reserva: true,
      perfil: { embarazo: 'ojo' },
      nota: 'Mesas junto al canal. Mucho pescado: pedir los platos cocinados y evitar crudos y tartar.' },

    { nombre: 'Cantine del Vino già Schiavi', tipo: 'Bacaro', zona: 'Dorsoduro · frente al Squero',
      maps: 'Cantine del Vino già Schiavi, Venezia', tel: '+390415230034',
      nivel: 0, precio: '10-18 € los dos', comida: true, cena: true,
      detalle: 'Crostini desde 1,50 € · vino desde 1,20 € · más de 80 combinaciones',
      cierra: 'Cierra domingos · cierra sobre las 21:00', cierraDias: [0],
      perfil: { embarazo: 'ojo' },
      nota: 'Familiar desde 1944 y el mejor precio de la ciudad. Se come de pie o sentado en el borde del canal. Algunos crostini llevan crudos: preguntar.' },

    { nombre: "Dal Moro's Fresh Pasta To Go", tipo: 'Para llevar', zona: 'Castello 5324 · cerca de San Marco',
      maps: "Dal Moro's Fresh Pasta To Go, Venezia",
      nivel: 0, precio: '16-20 € los dos', comida: true, cena: true, tarde: true,
      detalle: 'Caja de pasta fresca 8-10 € · se hace al momento',
      cierra: 'Abierto todos los días hasta tarde',
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'La solución para la noche de llegada, cuando todo esté cerrando. Pasta hecha y cocinada delante.' },

    { nombre: "All'Arco", tipo: 'Bacaro', zona: 'San Polo 436 · junto al mercado',
      maps: "All'Arco, San Polo 436, Venezia", tel: '+390415205666',
      nivel: 0, precio: '15-25 € los dos', comida: true,
      detalle: 'Cicchetti 2-3,50 € · de los más famosos de la ciudad',
      cierra: 'SÓLO MEDIODÍA · cierra domingos', cierraDias: [0], confirmar: true,
      perfil: { embarazo: 'ojo' },
      nota: 'De los mejores bacari de Venecia, pero suele cerrar por vacaciones dos o tres semanas en agosto.' },

    { nombre: 'Gelateria Nico', tipo: 'Gelatería', zona: 'Zattere, Dorsoduro 922',
      maps: 'Gelateria Nico, Zattere, Venezia',
      nivel: 0, precio: '8-14 € los dos', tarde: true,
      detalle: 'Gianduiotto da passeggio 6 € · cucurucho 3-5 €',
      cierra: 'Abierto todos los días',
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'Desde 1935. El gianduiotto es un bloque de helado de avellana con nata montada, servido en vaso.' },

    { nombre: 'Suso Gelatoteca', tipo: 'Gelatería', zona: 'San Marco 5453 · junto a Rialto',
      maps: 'Suso Gelatoteca, Venezia',
      nivel: 0, precio: '7-10 € los dos', tarde: true,
      detalle: 'Cucurucho 3,50-5 €',
      cierra: 'Abierto todos los días',
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'El mejor helado del centro. El manetegada lleva nata, nueces y caramelo.' },

    { nombre: 'Pasticceria Rosa Salva', tipo: 'Cafetería', zona: 'Campo San Luca y SS. Giovanni e Paolo',
      maps: 'Pasticceria Rosa Salva, Campo San Luca, Venezia',
      nivel: 0, precio: '6-9 € los dos', desayuno: true,
      detalle: 'Café en barra 1,20-1,50 € · cornetto 1,50 € · pasteles 2-3 €',
      cierra: 'Cierra sobre las 20:00',
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'Pastelería histórica veneciana. En barra, como los locales: sentarse cuesta el triple.' },

    { nombre: 'Despar Teatro Italia', tipo: 'Supermercado', zona: 'Cannaregio 1944 · Strada Nova',
      maps: 'Despar Teatro Italia, Venezia',
      nivel: 0, precio: '15-25 € la compra', comida: true,
      detalle: 'Agua 0,40 € · fruta · queso · vino desde 4 €',
      cierra: 'Hasta las 20:30 · cerrado el 15 de agosto',
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'Un supermercado dentro de un teatro de 1915, con frescos en el techo y bóvedas intactas. El sitio para montar un picnic.' },

    { nombre: 'Farini', tipo: 'Panadería', zona: 'Varias sedes · San Marco y Rialto',
      maps: 'Farini Venezia',
      nivel: 0, precio: '8-14 € los dos', comida: true, desayuno: true,
      detalle: 'Pizza al taglio 3-5 € la porción · focaccia · bocadillos 5-7 €',
      cierra: 'Abierto todos los días',
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'El recurso para cuando hay hambre y ni tiempo ni ganas de sentarse. Todo horneado.' },

    { nombre: 'Trattoria alla Madonna', tipo: 'Trattoria', zona: 'San Polo 594 · junto a Rialto',
      maps: 'Trattoria alla Madonna, Venezia', tel: '+390415223824',
      nivel: 2, precio: '30-40 € por persona', comida: true, cena: true,
      detalle: 'Entrante 10-16 € · principal 15-24 €',
      cierra: 'Cierra miércoles', cierraDias: [3], confirmar: true,
      perfil: { embarazo: 'ojo' },
      nota: 'Clásico veneciano de toda la vida, grande y sin pretensiones. Suele cerrar dos semanas en agosto.' }
  ],

  /* Decisiones de dinero propias de esta ciudad. El motor las
     convierte en las tarjetas de "Presupuesto" con alternativas. */
  transporte: {
    id: 'transporte',
    titulo: 'Transporte por Venecia',
    ayuda: 'El vaporetto es el autobús de la ciudad. El pase se amortiza en día y medio si se usa tres o cuatro veces al día.',
    alts: [
      { id: 'pase72', label: 'Pase de 72 h', porPersona: 45, dias: 3, detalle: 'Se valida en el primer viaje y corre desde ese momento, así que conviene no estrenarlo la noche de llegada.' },
      { id: 'pase48', label: 'Pase de 48 h', porPersona: 35, dias: 2, detalle: 'Cubre dos días completos. El resto, billetes sueltos.' },
      { id: 'pase24', label: 'Pase de 24 h', porPersona: 25, dias: 1, detalle: 'Sólo compensa si se va a las islas ese día.' },
      { id: 'sueltos', label: 'Billetes sueltos', porPersona: 9.5, porViaje: true, detalle: '9,50 € cada trayecto, válido 75 minutos. Sale caro en cuanto se pasa de dos al día.' },
      { id: 'andar', label: 'Andar casi todo', porPersona: 10, aPie: true, detalle: 'Lo más barato, pero son 6-8 km diarios cruzando puentes con escalones.' }
    ]
  },

  estrellas: [
    { id: 'gondola', titulo: 'Góndola',
      ayuda: 'Tarifa fija municipal, por góndola (hasta 5 personas) y no por persona. La nocturna empieza a las 19:00 en punto.',
      porGrupo: true,
      alts: [
        { id: 'dia', label: 'Antes de las 19:00 · tarifa de día', importe: 90, detalle: '30 minutos. La luz ya es cálida y son 20 € menos.', recomendado: true },
        { id: 'noche', label: 'Después de las 19:00 · tarifa de noche', importe: 110, detalle: '35 minutos y luz de atardecer de verdad.' },
        { id: 'traghetto', label: 'Sólo traghetto', importe: 4, detalle: 'Cruzar el Gran Canal de pie en una góndola real por 2 € cada uno. Dos minutos, pero es una góndola. En efectivo y no operan los domingos.' },
        { id: 'no', label: 'Nada de góndola', importe: 0, detalle: 'Se ve pasar desde cualquier puente y sale gratis.' }
      ] },
    { id: 'islas', titulo: 'Excursión a las islas',
      ayuda: 'Murano, Burano y Torcello. Con el pase de transporte ya está incluido; sin él, hay que contar los trayectos.',
      alts: [
        { id: 'pase', label: 'Con el pase de vaporetto', importe: 0, detalle: 'Ya lo hemos pagado: la excursión no cuesta nada más.', recomendado: true },
        { id: 'tour', label: 'Tour organizado en lancha', porPersona: 25, detalle: 'Cuatro horas con las tres islas y guía. Va más rápido pero manda el reloj de otro.' },
        { id: 'no', label: 'Nos quedamos en la ciudad', importe: 0, detalle: 'Medio día largo que se puede dedicar a Castello y Cannaregio.' }
      ] }
  ],

  hospital: {
    nombre: 'Ospedale SS. Giovanni e Paolo',
    dir: 'Castello 6777, Venezia',
    maps: 'Ospedale SS. Giovanni e Paolo, Venezia',
    nota: 'El hospital del centro histórico, con urgencias 24 h y obstetricia. La entrada de urgencias (pronto soccorso) está en el lado norte, mirando a la laguna, junto a la parada de vaporetto "Ospedale".'
  },

  consejos: [
    { titulo: 'El agua de los campi es gratis y buena',
      texto: 'Casi todos los campi tienen una fuente de agua potable: es agua de manantial de los Alpes y sale fría. Llenar las botellas cada vez que se pase por una ahorra unos 30 € en un viaje de cuatro días.' },
    { titulo: 'En barra siempre',
      texto: 'Un café de pie en la barra cuesta 1,20-1,50 €. El mismo café sentado en una mesa cuesta el triple, y en una terraza de Piazza San Marco puede pasar de 12 € con el suplemento de música.' },
    { titulo: 'Baños públicos',
      texto: 'Cuestan 1,50 € y hay pocos, así que conviene llevar monedas. El truco local: entrar en un bar, pedir un café en barra por 1,20 € y usar el suyo.' },
    { titulo: 'No hace falta el mapa',
      texto: 'La ciudad está llena de carteles amarillos pintados en las paredes que dicen "Per Rialto", "Per S. Marco" o "Per Ferrovia". Siguiéndolos no hay forma de perderse del todo.' },
    { titulo: 'Lo que multan',
      texto: 'Sentarse a comer en los escalones de Piazza San Marco, dar de comer a las palomas, bañarse en los canales y circular en bici. Las multas van de 50 a 500 €. En el resto de campi, comer sentado es normal.' },
    { titulo: 'Cómo huele una trampa para turistas',
      texto: 'Menú con fotos y en seis idiomas, alguien en la puerta invitando a entrar, y estar a menos de 50 metros de San Marco o Rialto. Si se cumplen las tres, dos calles más allá se come mejor y más barato.' },
    { titulo: 'La tasa de acceso',
      texto: 'El contributo di accesso de 5-10 € sólo se cobra en unos 60 días señalados entre abril y julio, y sólo a quien entra y sale el mismo día. Quien duerme en la ciudad está exento, pero tiene que registrarse igual.' },
    { titulo: 'El acqua alta',
      texto: 'De octubre a enero la marea puede inundar las zonas bajas durante dos o tres horas. Hay una app oficial de avisos (Hi!Tide Venezia) y pasarelas montadas en San Marco. No es una catástrofe: es rutina y se sabe con horas de antelación.' }
  ],

  checklistExtra: [
    { cat: 'Venecia en concreto', items: [
      'Calzado ya domado: son unos 400 puentes con escalones y las maletas hay que subirlas a mano',
      'Botellas reutilizables — las fuentes de los campi son gratis',
      'Comprobar si las fechas caen en días con tasa de acceso y registrarse si hace falta',
      'Mirar si el alojamiento está en isla o en tierra firme (Mestre): cambia el viaje entero'
    ]}
  ],

  compras: 'Vidrio de Murano con el sello Vetro Artistico Murano, encaje de Burano, máscaras de papel maché hechas a mano y papel marmolado. Todo lo demás que se ve en las calles centrales viene de fuera.'
};
