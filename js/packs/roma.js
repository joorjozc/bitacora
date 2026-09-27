/* ============================================================
   Pack de destino — Roma
   ============================================================ */

PACKS.roma = {
  clave: 'roma',
  ciudad: 'Roma',
  pais: 'it',
  paleta: 'terracota',
  lema: 'Tres mil años de ciudad amontonados unos encima de otros, y una fuente de agua fría en cada esquina.',

  clima: {
    1: { max: 12, nota: 'Frío suave y días cortos, pero sin colas en ningún sitio.' },
    2: { max: 14, nota: 'Todavía tranquilo. Buen mes para los museos.' },
    3: { max: 17, nota: 'Empieza la temporada. Luz preciosa.' },
    4: { max: 20, nota: 'Probablemente el mejor mes del año, aunque Semana Santa lo llena todo.' },
    5: { max: 25, nota: 'Perfecto por la mañana, ya calienta a mediodía.' },
    6: { max: 29, calor: true, nota: 'Empieza el calor seco de verdad y las piedras devuelven el sol.' },
    7: { max: 32, calor: true, nota: 'Muy duro: 32-36 °C y sombra escasa en los foros.' },
    8: { max: 32, calor: true, nota: 'El mes en que los romanos se van. Calor extremo y muchos barrios medio cerrados, sobre todo alrededor del 15 (Ferragosto).' },
    9: { max: 28, calor: true, nota: 'Aún caluroso la primera quincena, y luego uno de los mejores momentos.' },
    10: { max: 23, nota: 'Excelente: buena temperatura y menos gente.' },
    11: { max: 17, nota: 'Mes de lluvia, pero la ciudad está vacía.' },
    12: { max: 13, nota: 'Frío llevadero y ambiente de Navidad en Piazza Navona.' }
  },

  aeropuertos: [
    { cod: 'FCO', nombre: 'Fiumicino · Leonardo da Vinci', min: 60,
      pasos: [
        { nombre: 'Leonardo Express → Roma Termini', min: 32, maps: 'Roma Termini',
          por: 'Tren directo sin paradas desde la propia terminal. Sale cada 15 minutos.',
          tip: 'Es más caro que el bus pero no depende del tráfico. Con maletas y calor, compensa.',
          precio: '14 € por persona', precioNum: 14 },
        { nombre: 'Metro o taxi hasta el alojamiento', min: 20,
          por: 'Desde Termini salen las dos líneas de metro y todos los autobuses.',
          precio: '1,50 € por persona', precioNum: 1.5 }
      ],
      vuelta: 'Salir del alojamiento tres horas antes: el Leonardo Express tarda media hora y Fiumicino es enorme.' },
    { cod: 'CIA', nombre: 'Ciampino', min: 70,
      pasos: [
        { nombre: 'Bus Terravision/SIT → Termini', min: 45, maps: 'Roma Termini',
          por: 'El aeropuerto de las low cost. No tiene tren: el bus es la opción normal.',
          precio: '6 € por persona', precioNum: 6 },
        { nombre: 'Metro o a pie hasta el alojamiento', min: 20,
          precio: '1,50 € por persona', precioNum: 1.5 }
      ],
      vuelta: 'Salir tres horas antes y contar con que el bus puede pillar atasco en la Tuscolana.' }
  ],

  zonas: [
    { id: 'antigua', nombre: 'Roma antigua', nota: 'Coliseo, Foro y Palatino. Sin sombra: hay que hacerlo pronto.' },
    { id: 'centro', nombre: 'Centro histórico', nota: 'Panteón, Navona y Trevi. Todo a diez minutos andando entre sí.' },
    { id: 'vaticano', nombre: 'Vaticano y Borgo', nota: 'San Pedro y los Museos. Medio día largo por sí solo.' },
    { id: 'trastevere', nombre: 'Trastevere', nota: 'Al otro lado del Tíber: callejones, hiedra y cenas largas.' },
    { id: 'aventino', nombre: 'Aventino y Testaccio', nota: 'La Roma tranquila de las vistas y el mercado de barrio.' },
    { id: 'borghese', nombre: 'Villa Borghese y Tridente', nota: 'El parque grande, la Galleria y las escaleras de la Plaza de España.' }
  ],

  lugares: [
    { id: 'coliseo', nombre: 'Coliseo', zona: 'antigua', tipo: 'museo',
      maps: 'Colosseo, Roma', dur: 90, and: 5, prioridad: 1,
      intereses: ['historia', 'foto'], escaleras: true, precio: '18 € por persona', precioNum: 18,
      reserva: 'Entrada con hora obligatoria y se agota con semanas. La misma entrada incluye Foro y Palatino durante 24 h.',
      por: 'Cincuenta mil personas cabían aquí dentro. Lo que más impresiona no es el tamaño sino ver los sótanos al descubierto, donde esperaban las fieras y los ascensores de madera.',
      tip: 'Primera franja de la mañana o última de la tarde: a mediodía es una sartén sin sombra.' },

    { id: 'foro', nombre: 'Foro Romano y Palatino', zona: 'antigua', tipo: 'lugar',
      maps: 'Foro Romano, Roma', dur: 100, and: 4, prioridad: 1,
      intereses: ['historia'], escaleras: true, precio: 'Incluido con el Coliseo', precioNum: 0,
      por: 'El centro del mundo durante mil años, hoy un descampado de columnas rotas que hay que saber leer. Subir al Palatino da la vista de todo el conjunto desde arriba.',
      aviso: 'No hay sombra ni fuentes dentro de casi todo el recorrido. Agua y gorra, sin excusa.' },

    { id: 'panteon', nombre: 'Panteón', zona: 'centro', tipo: 'lugar',
      maps: 'Pantheon, Roma', dur: 30, and: 12, prioridad: 1,
      intereses: ['historia', 'arte'], precio: '5 € por persona', precioNum: 5,
      por: 'La cúpula de hormigón sin armar más grande que se ha construido nunca, y sigue en pie desde el año 126. El agujero del techo es de verdad: cuando llueve, llueve dentro.',
      tip: 'Se reserva online y son 5 €. Domingo con misa es gratis pero sin visita turística.' },

    { id: 'navona', nombre: 'Piazza Navona', zona: 'centro', tipo: 'lugar',
      maps: 'Piazza Navona, Roma', dur: 25, and: 5, prioridad: 1,
      intereses: ['arte', 'foto'], precioNum: 0, precio: 'Gratis',
      por: 'La plaza tiene forma de estadio porque literalmente lo era: debajo está el circo de Domiciano. En el centro, la fuente de los Cuatro Ríos de Bernini.',
      aviso: 'Las terrazas de la plaza cobran el triple. Un café aquí puede costar 8 €.' },

    { id: 'trevi', nombre: 'Fontana di Trevi', zona: 'centro', tipo: 'lugar',
      maps: 'Fontana di Trevi, Roma', dur: 20, and: 8, prioridad: 1,
      intereses: ['foto'], amanecer: true, precioNum: 0, precio: 'Gratis',
      por: 'A las siete de la mañana se puede ver sola; a mediodía hay tres filas de gente y control de aforo.',
      tip: 'La moneda se tira con la mano derecha por encima del hombro izquierdo. Se recogen unos 3.000 € al día y van a Cáritas.' },

    { id: 'espana', nombre: 'Plaza de España y Trinità dei Monti', zona: 'borghese', tipo: 'mirador',
      maps: 'Piazza di Spagna, Roma', dur: 25, and: 10, prioridad: 2,
      intereses: ['foto'], escaleras: true, precioNum: 0, precio: 'Gratis',
      por: 'Ciento treinta y cinco escalones que suben a una vista buena del centro.',
      aviso: 'Sentarse en los escalones está prohibido desde 2019 y lo multan con 250 €.' },

    { id: 'sanpedro', nombre: 'Basílica de San Pedro', zona: 'vaticano', tipo: 'lugar',
      maps: 'Basilica di San Pietro, Città del Vaticano', dur: 75, and: 15, prioridad: 1,
      intereses: ['arte', 'historia'], precioNum: 0, precio: 'Gratis · cúpula 10 €',
      por: 'La iglesia más grande del mundo. La Piedad de Miguel Ángel está nada más entrar, a la derecha, detrás de un cristal.',
      tip: 'Llegar antes de las 8:00 o después de las 16:00: al mediodía la cola del control de seguridad da la vuelta a la plaza.',
      aviso: 'Hombros y rodillas cubiertos, sin excepción. Se ha quedado gente fuera por llevar pantalón corto.' },

    { id: 'vaticanos', nombre: 'Museos Vaticanos y Capilla Sixtina', zona: 'vaticano', tipo: 'museo',
      maps: 'Musei Vaticani, Città del Vaticano', dur: 180, and: 12, prioridad: 1,
      intereses: ['arte'], cierra: [0], precio: '20 € por persona', precioNum: 20,
      reserva: 'Entrada con hora obligatoria y conviene sacarla con un mes.',
      por: 'Siete kilómetros de salas para llegar a la Sixtina. Las Estancias de Rafael, en el camino, son casi tan buenas y casi nadie las mira.',
      aviso: 'Son tres horas largas de pie. Con calor y sin poder salir a mitad, es la visita más exigente del viaje.' },

    { id: 'angelo', nombre: "Castel Sant'Angelo", zona: 'vaticano', tipo: 'museo',
      maps: "Castel Sant'Angelo, Roma", dur: 75, and: 10, prioridad: 2,
      intereses: ['historia', 'foto'], cierra: [1], escaleras: true, precio: '16 € por persona', precioNum: 16,
      por: 'Empezó siendo la tumba de Adriano, luego fortaleza y refugio de papas. Desde la terraza de arriba se ve San Pedro entero y media ciudad.' },

    { id: 'trastevere', nombre: 'Callejear por Trastevere', zona: 'trastevere', tipo: 'lugar',
      maps: 'Trastevere, Roma', dur: 60, and: 20, prioridad: 1,
      intereses: ['foto', 'comida', 'noche'], precioNum: 0, precio: 'Gratis',
      por: 'El barrio de las casas ocres, la ropa tendida y la hiedra. De día está tranquilo y a partir de las ocho se llena de mesas en la calle.' },

    { id: 'santamaria-trastevere', nombre: 'Santa Maria in Trastevere', zona: 'trastevere', tipo: 'lugar',
      maps: 'Basilica di Santa Maria in Trastevere, Roma', dur: 25, and: 3, prioridad: 2,
      intereses: ['arte', 'historia'], precioNum: 0, precio: 'Gratis',
      por: 'Puede que la iglesia más antigua de Roma dedicada a María. El ábside es un mosaico de oro del siglo XII y entrar no cuesta nada.' },

    { id: 'sanclemente', nombre: 'Basílica de San Clemente', zona: 'antigua', tipo: 'lugar',
      maps: 'Basilica di San Clemente, Roma', dur: 50, and: 12, prioridad: 2,
      intereses: ['historia'], escaleras: true, precio: '10 € por persona', precioNum: 10,
      por: 'Tres ciudades apiladas: una iglesia del siglo XII encima de una del IV, encima de un templo de Mitra romano del I. Se baja por escaleras y se oye correr un río subterráneo.' },

    { id: 'aventino', nombre: 'Jardín de los Naranjos y el ojo de la cerradura', zona: 'aventino', tipo: 'mirador',
      maps: 'Giardino degli Aranci, Roma', dur: 40, and: 18, prioridad: 2,
      intereses: ['foto', 'naturaleza'], precioNum: 0, precio: 'Gratis',
      por: 'Un jardín con sombra y una terraza sobre todo el centro. A cien metros está la puerta de los Caballeros de Malta: por su cerradura se ve la cúpula de San Pedro perfectamente encuadrada al final de un seto.',
      tip: 'La cola de la cerradura se mueve rápido, son diez segundos por persona.' },

    { id: 'testaccio', nombre: 'Mercato di Testaccio', zona: 'aventino', tipo: 'mercado',
      maps: 'Mercato di Testaccio, Roma', dur: 60, and: 15, prioridad: 2,
      intereses: ['comida'], cierra: [0], precio: 'Comer, 10-15 € por persona', precioNum: 0,
      por: 'El mercado de barrio donde comen los romanos: puestos de fruta, quesos y un par de sitios de bocadillos que son famosos con razón.',
      tip: 'Cierra a las 15:00 y no abre los domingos.' },

    { id: 'campofiori', nombre: "Campo de' Fiori", zona: 'centro', tipo: 'mercado',
      maps: "Campo de' Fiori, Roma", dur: 30, and: 8, prioridad: 3,
      intereses: ['comida', 'compras'], cierra: [0], precioNum: 0, precio: 'Gratis',
      por: 'Mercado por la mañana y plaza de copas por la noche, con la estatua de Giordano Bruno en el sitio exacto donde lo quemaron.' },

    { id: 'ghetto-roma', nombre: 'Barrio judío y Portico d\'Ottavia', zona: 'centro', tipo: 'lugar',
      maps: "Portico d'Ottavia, Roma", dur: 45, and: 10, prioridad: 2,
      intereses: ['historia', 'comida'], cierra: [6], precioNum: 0, precio: 'Gratis',
      por: 'Uno de los barrios judíos más antiguos de Europa, con ruinas romanas metidas entre las casas y la mejor alcachofa frita de la ciudad.' },

    { id: 'borghese', nombre: 'Galleria Borghese', zona: 'borghese', tipo: 'museo',
      maps: 'Galleria Borghese, Roma', dur: 120, and: 20, prioridad: 2,
      intereses: ['arte'], cierra: [1], precio: '15 € por persona', precioNum: 15,
      reserva: 'Turnos cerrados de dos horas y aforo limitado: hay que reservar con semanas, no se puede improvisar.',
      por: 'El Rapto de Proserpina de Bernini, donde el mármol se hunde como si fuera carne. Sólo por esa sala ya merece la reserva.' },

    { id: 'villaborghese', nombre: 'Villa Borghese y terraza del Pincio', zona: 'borghese', tipo: 'parque',
      maps: 'Villa Borghese, Roma', dur: 60, and: 5, prioridad: 2,
      intereses: ['naturaleza', 'foto'], franja: 'tarde', precioNum: 0, precio: 'Gratis',
      por: 'El parque grande de Roma, con sombra y bancos. La terraza del Pincio, en el borde, es de los mejores sitios para ver el atardecer sobre Piazza del Popolo.' },

    { id: 'bocca', nombre: 'Bocca della Verità', zona: 'aventino', tipo: 'lugar',
      maps: 'Bocca della Verità, Roma', dur: 15, and: 10, prioridad: 3,
      intereses: ['foto'], precioNum: 0, precio: 'Gratis (donativo de 2 €)',
      por: 'La tapa de alcantarilla romana más famosa del mundo, en el pórtico de una iglesia. Diez minutos de cola y la foto de rigor.' },

    { id: 'maggiore', nombre: 'Santa Maria Maggiore', zona: 'antigua', tipo: 'lugar',
      maps: 'Basilica di Santa Maria Maggiore, Roma', dur: 30, and: 15, prioridad: 3,
      intereses: ['arte', 'historia'], precioNum: 0, precio: 'Gratis',
      por: 'Una de las cuatro basílicas mayores, con mosaicos del siglo V en la nave y un artesonado dorado con el primer oro llegado de América.' }
  ],

  restaurantes: [
    { nombre: 'Roscioli Salumeria con Cucina', tipo: 'Salumeria', zona: 'Centro · Campo de\' Fiori',
      maps: 'Salumeria Roscioli, Roma', tel: '+390668752600',
      nivel: 2, precio: '40-55 € por persona', comida: true, cena: true,
      detalle: 'Carbonara 18 € · tablas de embutido y queso 15-25 €',
      cierra: 'Cierra domingos', cierraDias: [0], reserva: true,
      perfil: { embarazo: 'ojo' },
      nota: 'La carbonara de referencia de la ciudad. Reserva obligatoria con días. Mucho embutido crudo y queso sin pasteurizar en la carta.' },

    { nombre: 'Da Enzo al 29', tipo: 'Trattoria', zona: 'Trastevere',
      maps: 'Da Enzo al 29, Roma', tel: '+390658112594',
      nivel: 1, precio: '25-35 € por persona', comida: true, cena: true,
      detalle: 'Cacio e pepe 12 € · saltimbocca 16 € · tiramisú 6 €',
      cierra: 'Cierra domingos', cierraDias: [0],
      perfil: { embarazo: 'ideal' },
      nota: 'Trattoria diminuta y clásica. No cogen reserva para grupos pequeños: hay que ir a las 12:30 o a las 19:00 en punto o esperar de pie.' },

    { nombre: 'Armando al Pantheon', tipo: 'Trattoria', zona: 'Centro · junto al Panteón',
      maps: 'Armando al Pantheon, Roma', tel: '+390668803034',
      nivel: 2, precio: '40-50 € por persona', comida: true, cena: true,
      detalle: 'Primeros 14-18 € · segundos 18-24 €',
      cierra: 'Cierra sábado noche y domingo', cierraDias: [0], reserva: true,
      perfil: { embarazo: 'ideal' },
      nota: 'Familia desde 1961 a treinta metros del Panteón, que es donde uno esperaría sólo trampas. Reserva con semanas.' },

    { nombre: 'Trapizzino', tipo: 'Para llevar', zona: 'Varias sedes · Trastevere y Testaccio',
      maps: 'Trapizzino Roma',
      nivel: 0, precio: '10-16 € los dos', comida: true, cena: true, tarde: true,
      detalle: '4-6 € la pieza · dos por persona llenan',
      cierra: 'Abierto todos los días hasta tarde',
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'Un triángulo de masa de pizza relleno de guisos romanos: pollo alla cacciatora, lengua en salsa verde. Todo cocinado y se come andando.' },

    { nombre: 'Pizzarium Bonci', tipo: 'Pizza al taglio', zona: 'Prati · cerca de los Museos Vaticanos',
      maps: 'Pizzarium Bonci, Roma',
      nivel: 0, precio: '12-18 € los dos', comida: true,
      detalle: 'Se paga al peso, 3-6 € la porción',
      cierra: 'Abierto todos los días',
      perfil: { embarazo: 'ok', ninos: 'ideal' },
      nota: 'La mejor pizza al corte de Roma, a cinco minutos de la salida de los Museos Vaticanos. Se come de pie en la calle y se tarda diez minutos.' },

    { nombre: 'Forno Campo de\' Fiori', tipo: 'Panadería', zona: 'Centro · Campo de\' Fiori',
      maps: "Forno Campo de' Fiori, Roma",
      nivel: 0, precio: '6-10 € los dos', desayuno: true, comida: true,
      detalle: 'Pizza bianca 3-4 € · pizza rossa 3,50 €',
      cierra: 'Cierra domingos', cierraDias: [0],
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'La pizza bianca con aceite y sal recién salida del horno es el desayuno romano de verdad. Se pide al peso, señalando.' },

    { nombre: "Sant'Eustachio Il Caffè", tipo: 'Cafetería', zona: 'Centro · junto al Panteón',
      maps: "Sant'Eustachio Il Caffè, Roma",
      nivel: 0, precio: '5-9 € los dos', desayuno: true,
      detalle: 'Café en barra 1,50 € · gran caffè 4 €',
      cierra: 'Abierto todos los días',
      perfil: { embarazo: 'ideal' },
      nota: 'Tuestan ellos mismos y lo sirven ya azucarado: hay que avisar si se quiere amargo ("senza zucchero").' },

    { nombre: 'Giolitti', tipo: 'Gelatería', zona: 'Centro · detrás del Panteón',
      maps: 'Giolitti, Roma',
      nivel: 0, precio: '8-12 € los dos', tarde: true,
      detalle: 'Cucurucho desde 3,50 € · la nata montada va incluida',
      cierra: 'Abierto todos los días hasta medianoche',
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'Desde 1900. Primero se paga en caja y luego se enseña el tique en el mostrador.' },

    { nombre: 'Felice a Testaccio', tipo: 'Trattoria', zona: 'Testaccio',
      maps: 'Felice a Testaccio, Roma', tel: '+390657446800',
      nivel: 2, precio: '35-45 € por persona', comida: true, cena: true,
      detalle: 'Cacio e pepe 14 € · abbacchio 20 €',
      cierra: 'Abierto todos los días', reserva: true,
      perfil: { embarazo: 'ideal' },
      nota: 'El cacio e pepe se termina en la mesa, delante del comensal. Reserva obligatoria; sin ella no entra nadie.' },

    { nombre: 'Mercato Centrale Roma', tipo: 'Mercado', zona: 'Dentro de la estación Termini',
      maps: 'Mercato Centrale Roma, Termini',
      nivel: 1, precio: '20-30 € los dos', comida: true, cena: true,
      detalle: 'Puestos de 8-15 € el plato',
      cierra: 'Abierto todos los días de 8:00 a medianoche',
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'Puestos de cocineros buenos dentro de la estación. Salva el día de llegada tarde o el de la vuelta con las maletas encima.' }
  ],

  transporte: {
    id: 'transporte',
    titulo: 'Transporte por Roma',
    ayuda: 'El centro se anda, pero el Vaticano, Testaccio y Villa Borghese quedan lejos. El metro son sólo tres líneas; el autobús llega a todo pero es lento.',
    alts: [
      { id: 'roma72', label: 'Billete de 72 h', porPersona: 18, dias: 3, detalle: 'Metro, bus y tranvía ilimitados. Se amortiza con tres viajes al día.' },
      { id: 'roma48', label: 'Billete de 48 h', porPersona: 12.5, dias: 2, detalle: 'Lo mismo, dos días.' },
      { id: 'roma24', label: 'Billete de 24 h', porPersona: 7, dias: 1, detalle: 'Para un solo día de mucho desplazamiento.' },
      { id: 'sueltos', label: 'Billetes sueltos (BIT)', porPersona: 1.5, porViaje: true, detalle: '1,50 € y vale 100 minutos con transbordos. Si se anda mucho, es lo más barato con diferencia.' }
    ]
  },

  estrellas: [
    { id: 'vaticano-guia', titulo: 'Museos Vaticanos: cómo entrar',
      ayuda: 'La diferencia entre una mañana buena y tres horas de agobio suele estar aquí.',
      alts: [
        { id: 'temprano', label: 'Entrada normal, primera hora', porPersona: 20, detalle: 'Reservando el primer turno se camina por salas casi vacías durante la primera hora.', recomendado: true },
        { id: 'guiada', label: 'Visita guiada en español', porPersona: 45, detalle: 'Entrada sin cola y alguien que explica lo que se está viendo. Con calor, además, va más ordenado.' },
        { id: 'no', label: 'No entramos', importe: 0, detalle: 'San Pedro es gratis y ya impresiona. Los Museos son tres horas de pie.' }
      ] },
    { id: 'coliseo-nivel', titulo: 'Coliseo: qué entrada',
      ayuda: 'Hay tres niveles de entrada y sólo la más cara baja a los sótanos.',
      alts: [
        { id: 'normal', label: 'Entrada estándar', porPersona: 18, detalle: 'Graderío, Foro y Palatino. Con esto se ve todo lo importante.', recomendado: true },
        { id: 'arena', label: 'Con acceso a la arena', porPersona: 24, detalle: 'Se pisa el suelo reconstruido, en el sitio exacto donde salían los gladiadores.' },
        { id: 'subterraneos', label: 'Arena y subterráneos con guía', porPersona: 45, detalle: 'Los sótanos donde esperaban las fieras. Es lo mejor del monumento y hay que reservarlo con mucha antelación.' }
      ] }
  ],

  hospital: {
    nombre: 'Ospedale Fatebenefratelli · Isola Tiberina',
    dir: 'Via di Ponte Quattro Capi 39, Roma',
    maps: 'Ospedale Fatebenefratelli Isola Tiberina, Roma',
    nota: 'Está en la isla del Tíber, en pleno centro y a diez minutos andando de Trastevere y del barrio judío. Tiene urgencias 24 h y es de los pocos hospitales céntricos con maternidad.'
  },

  consejos: [
    { titulo: 'Los nasoni',
      texto: 'Las 2.500 fuentes de hierro con forma de nariz grande dan agua potable y fría todo el año. Tapando el chorro de abajo con el dedo, sale un chorrito por arriba para beber sin agacharse.' },
    { titulo: 'El café, en barra y sin apellidos',
      texto: 'Un espresso en la barra cuesta 1-1,50 €; sentado, el triple. Y el cappuccino sólo se toma por la mañana: pedirlo después de comer no está prohibido, pero delata.' },
    { titulo: 'Coperto y servicio',
      texto: 'Casi todos los restaurantes cobran 2-3 € por persona de coperto y tiene que estar en la carta. Si además aparece un 12 % de "servizio", eso ya es la propina: no hace falta dejar más.' },
    { titulo: 'Ropa para entrar en las iglesias',
      texto: 'Hombros y rodillas cubiertos en San Pedro, San Juan de Letrán y Santa Maria Maggiore, y lo hacen cumplir. Un pañuelo grande en la mochila resuelve el problema en verano.' },
    { titulo: 'Dónde están los carteristas',
      texto: 'Autobús 64 y 40 (los del Vaticano), metro A en hora punta y los alrededores de Termini. No es peligroso, es hábil: mochila delante y nada en los bolsillos traseros.' },
    { titulo: 'Taxis',
      texto: 'Sólo los blancos con el letrero en el techo y el taxímetro puesto. Del centro a Fiumicino hay tarifa fija de 55 € y a Ciampino de 40 €: si alguien pide más, es que no es oficial.' },
    { titulo: 'Museos gratis',
      texto: 'El primer domingo de cada mes los museos estatales (Coliseo, Foro, Castel Sant\'Angelo) son gratis. Eso significa también el triple de gente: compensa sólo si el presupuesto aprieta mucho.' },
    { titulo: 'Agosto en Roma',
      texto: 'Muchos restaurantes de barrio cierran dos o tres semanas y el 15 de agosto (Ferragosto) la ciudad está medio parada. Conviene confirmar por teléfono antes de cruzar Roma para cenar.' }
  ],

  checklistExtra: [
    { cat: 'Roma en concreto', items: [
      'Reservar Coliseo con hora — se agota con semanas de antelación',
      'Reservar Museos Vaticanos con hora',
      'Reservar Galleria Borghese si entra en el plan (turnos cerrados y aforo pequeño)',
      'Ropa que cubra hombros y rodillas para San Pedro',
      'Calzado con suela buena: los adoquines (sampietrini) resbalan y cansan'
    ]}
  ],

  compras: 'Nada especialmente artesanal: lo que merece la pena llevarse es comida. Queso pecorino romano, aceite del Lazio, pasta seca de sémola de las tiendas de barrio y café tostado en Sant\'Eustachio.'
};
