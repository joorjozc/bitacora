/* ============================================================
   Pack genérico — para destinos que todavía no están en el
   catálogo. No inventa lugares que no conocemos: monta el
   esqueleto del viaje (traslados, comidas, descansos, dinero,
   frases, checklist) y deja huecos claros para rellenar.

   Es lo que ve un usuario que escribe un destino nuevo. Tiene
   que resultar útil desde el primer minuto, no vacío.
   ============================================================ */

PACKS.generico = {
  clave: 'generico',
  ciudad: '',            // lo rellena el motor con lo que escriba el usuario
  pais: 'es',            // lo cambia el asistente si el usuario elige país
  paleta: 'laguna',
  generico: true,
  lema: 'Un esqueleto de viaje listo para rellenar: las horas, los traslados y el dinero ya están calculados.',

  clima: {},

  aeropuertos: [
    { cod: '', nombre: 'aeropuerto', min: 60,
      pasos: [
        { nombre: 'Traslado del aeropuerto al alojamiento', min: 50,
          por: 'Mirar antes de salir qué opción hay: tren, bus urbano o taxi. Casi siempre el tren es lo más rápido y lo más barato a la vez.',
          tip: 'Si se llega de noche, comprobar hasta qué hora funciona el transporte público: en muchas ciudades el último tren del aeropuerto sale antes de medianoche.',
          precio: 'Por confirmar', precioNum: 12 }
      ],
      vuelta: 'Salir del alojamiento tres horas antes del vuelo, más el tiempo del traslado.' }
  ],

  zonas: [
    { id: 'centro', nombre: 'Centro histórico', nota: 'El casco antiguo: lo que casi siempre conviene hacer a primera hora.' },
    { id: 'museos', nombre: 'Museos y monumentos', nota: 'Lo de pagar entrada y reservar hora.' },
    { id: 'barrios', nombre: 'Barrios con vida', nota: 'Donde se come y se pasea sin monumentos de por medio.' },
    { id: 'verde', nombre: 'Parques y miradores', nota: 'Para la tarde, cuando aprieta el sol o cansan las piernas.' },
    { id: 'excursion', nombre: 'Excursión de un día', excursion: true, nota: 'Lo que está a menos de una hora y merece una jornada entera.' }
  ],

  /* Plantillas: el motor las convierte en paradas con hora y las
     marca como "por rellenar" para que se vean distintas. */
  lugares: [
    { id: 'g-centro', nombre: 'Casco antiguo: primer paseo', zona: 'centro', tipo: 'lugar',
      dur: 75, and: 10, prioridad: 1, intereses: ['historia', 'foto'], amanecer: true,
      precioNum: 0, precio: 'Gratis', plantilla: true,
      por: 'La primera mañana conviene andar el centro sin entrar a nada: sitúa el resto del viaje y evita cruzar la ciudad tres veces.' },

    { id: 'g-plaza', nombre: 'La plaza principal', zona: 'centro', tipo: 'lugar',
      dur: 30, and: 5, prioridad: 1, intereses: ['foto'], precioNum: 0, precio: 'Gratis', plantilla: true,
      por: 'Casi todas las ciudades tienen una. A primera hora está vacía y a mediodía no se puede ni cruzar.' },

    { id: 'g-monumento', nombre: 'El monumento principal', zona: 'museos', tipo: 'museo',
      dur: 90, and: 12, prioridad: 1, intereses: ['historia', 'arte'], precio: 'Por confirmar', precioNum: 15,
      plantilla: true, reserva: 'Comprobar si hace falta entrada con hora: en casi todas las ciudades europeas ya es obligatorio.',
      por: 'Lo que sale en las fotos. Reservar con antelación y a primera hora de la mañana.' },

    { id: 'g-museo', nombre: 'El museo importante', zona: 'museos', tipo: 'museo',
      dur: 120, and: 15, prioridad: 2, intereses: ['arte'], precio: 'Por confirmar', precioNum: 12,
      plantilla: true, por: 'Mirar qué día cierra: en Europa suele ser lunes o martes, y un día mal repartido se queda sin nada abierto.' },

    { id: 'g-mercado', nombre: 'El mercado de abastos', zona: 'barrios', tipo: 'mercado',
      dur: 50, and: 10, prioridad: 2, intereses: ['comida', 'foto'], cierra: [0], precioNum: 0, precio: 'Gratis',
      plantilla: true, por: 'El mercado de la ciudad, por la mañana, es lo más parecido a ver cómo se vive allí. Y sale barato desayunar o comer dentro.' },

    { id: 'g-barrio', nombre: 'El barrio con vida', zona: 'barrios', tipo: 'lugar',
      dur: 60, and: 15, prioridad: 2, intereses: ['comida', 'noche', 'foto'], precioNum: 0, precio: 'Gratis',
      plantilla: true, por: 'El que sale cuando se busca "dónde salen los locales". Suele estar a 15-20 minutos del centro monumental.' },

    { id: 'g-mirador', nombre: 'El mirador del atardecer', zona: 'verde', tipo: 'mirador',
      dur: 45, and: 15, prioridad: 1, intereses: ['foto'], franja: 'tarde', precioNum: 0, precio: 'Gratis',
      plantilla: true, por: 'Buscar el punto alto orientado al oeste. Suele ser gratis y suele ser el mejor rato del día.' },

    { id: 'g-parque', nombre: 'El parque grande', zona: 'verde', tipo: 'parque',
      dur: 50, and: 12, prioridad: 2, intereses: ['naturaleza'], precioNum: 0, precio: 'Gratis',
      plantilla: true, por: 'Sombra, bancos y baños. Con calor o con niños deja de ser un plan opcional.' },

    { id: 'g-iglesia', nombre: 'La catedral o el templo principal', zona: 'centro', tipo: 'lugar',
      dur: 45, and: 8, prioridad: 2, intereses: ['arte', 'historia'], precio: 'Por confirmar', precioNum: 8,
      plantilla: true, por: 'Comprobar el horario de misas: durante el culto no se puede visitar.' },

    { id: 'g-compras', nombre: 'La calle de las tiendas pequeñas', zona: 'barrios', tipo: 'compra',
      dur: 60, and: 10, prioridad: 3, intereses: ['compras'], cierra: [0], precioNum: 0, precio: 'Gratis',
      plantilla: true, por: 'No la calle comercial de las cadenas: la de al lado, la de los talleres y las tiendas de una sola cosa.' },

    { id: 'g-excursion', nombre: 'Excursión de un día', zona: 'excursion', tipo: 'lugar',
      dur: 240, and: 60, prioridad: 3, intereses: ['naturaleza', 'historia'], precio: 'Por confirmar', precioNum: 25,
      plantilla: true, por: 'El pueblo, la costa o el monumento que está a una hora. Ocupa el día entero, así que sólo cabe en viajes de cuatro días o más.' },

    { id: 'g-noche', nombre: 'El centro de noche', zona: 'centro', tipo: 'noche',
      dur: 60, and: 8, prioridad: 2, intereses: ['noche', 'foto'], franja: 'noche', precioNum: 0, precio: 'Gratis',
      plantilla: true, por: 'Lo mismo que se ha visto de día, iluminado y sin nadie. Es el plan gratis que más se recuerda.' }
  ],

  restaurantes: [
    { nombre: 'Comida del primer día', tipo: 'Por rellenar', zona: 'Cerca del alojamiento',
      nivel: 1, precio: 'Por confirmar', comida: true, cena: true, plantilla: true,
      perfil: {},
      nota: 'Buscar algo a menos de diez minutos del alojamiento para el día de llegada: con maletas y cansancio, la distancia pesa más que la calidad.' },

    { nombre: 'La comida buena del viaje', tipo: 'Por rellenar', zona: 'Por confirmar',
      nivel: 2, precio: 'Por confirmar', comida: true, cena: true, reserva: true, plantilla: true,
      perfil: {},
      nota: 'Un sitio de los de reservar. Conviene dejarlo cerrado antes de salir de casa: los buenos se llenan con semanas.' },

    { nombre: 'El sitio barato de barrio', tipo: 'Por rellenar', zona: 'Por confirmar',
      nivel: 0, precio: 'Por confirmar', comida: true, cena: true, plantilla: true,
      perfil: {},
      nota: 'Regla que funciona en toda Europa: carta corta, en un solo idioma y sin fotos, y a más de dos calles del monumento principal.' },

    { nombre: 'Desayuno o café', tipo: 'Por rellenar', zona: 'Cerca del alojamiento',
      nivel: 0, precio: 'Por confirmar', desayuno: true, plantilla: true,
      perfil: {},
      nota: 'Desayunar fuera casi siempre sale mejor de precio que el bufé del hotel, y es cuando se ve el barrio despertar.' },

    { nombre: 'Para llevar / picnic', tipo: 'Por rellenar', zona: 'Supermercado o mercado',
      nivel: 0, precio: 'Por confirmar', comida: true, tarde: true, plantilla: true,
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'Una comida de picnic al día baja el presupuesto del viaje entre un 15 y un 25 %, y en un parque con sombra se descansa mejor que en un restaurante.' }
  ],

  transporte: {
    id: 'transporte',
    titulo: 'Transporte por la ciudad',
    ayuda: 'Casi todas las ciudades europeas tienen un abono de 24, 48 o 72 horas. Antes de comprarlo, contar cuántos viajes se harán de verdad: si el alojamiento está en el centro, muchas veces no compensa.',
    alts: [
      { id: 'abono', label: 'Abono de varios días', porPersona: 12, dias: 1, porDia: true, detalle: 'Suele salir a 8-15 € al día. Compensa a partir de tres o cuatro viajes diarios.' },
      { id: 'sueltos', label: 'Billetes sueltos', porPersona: 2, porViaje: true, detalle: 'Entre 1,50 y 3 € por viaje en la mayoría de ciudades europeas.' },
      { id: 'andar', label: 'Andar casi todo', porPersona: 6, aPie: true, detalle: 'Si el alojamiento está en el centro, en una ciudad mediana esto es perfectamente viable.' }
    ]
  },

  estrellas: [],

  hospital: {
    nombre: 'Hospital con urgencias más cercano',
    dir: 'Por confirmar antes de salir',
    maps: '',
    nota: 'Buscar antes de salir de casa el hospital público con urgencias 24 h más cercano al alojamiento y guardarlo aquí. Cinco minutos de trabajo que un día pueden valer mucho.'
  },

  consejos: [
    { titulo: 'La regla de las dos calles',
      texto: 'Funciona en toda Europa: a menos de cincuenta metros de un monumento famoso se come caro y mal. Dos calles más allá, el mismo plato cuesta la mitad y lo cocinan para los del barrio.' },
    { titulo: 'Reservar lo importante desde casa',
      texto: 'Los monumentos grandes ya funcionan con entrada de hora fija y se agotan con semanas. Lo que se deja para improvisar allí, muchas veces se queda sin ver.' },
    { titulo: 'La primera mañana, sin entrar a nada',
      texto: 'Andar el centro el primer día sitúa el resto del viaje: se descubre qué está cerca de qué y se dejan de hacer viajes absurdos de un lado a otro.' },
    { titulo: 'Guardar el mapa sin conexión',
      texto: 'Descargar la zona en Google Maps antes de salir. Esta app funciona sin datos, pero el mapa no viene incluido.' },
    { titulo: 'El día de la vuelta también es viaje',
      texto: 'Si el vuelo sale por la tarde, casi todos los alojamientos guardan las maletas gratis después del check-out. Eso convierte media jornada perdida en media jornada de ciudad.' }
  ],

  checklistExtra: [],

  compras: 'Lo que se produzca allí y no se encuentre en casa: comida, algo de artesanía con taller detrás y un libro. Todo lo demás pesa en la maleta y se olvida en un cajón.'
};
