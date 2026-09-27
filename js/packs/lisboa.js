/* ============================================================
   Pack de destino — Lisboa
   ============================================================ */

PACKS.lisboa = {
  clave: 'lisboa',
  ciudad: 'Lisboa',
  pais: 'pt',
  paleta: 'azulejo',
  lema: 'Siete colinas, una luz que no existe en ningún otro sitio y un pastel de nata cada tres calles.',

  clima: {
    1: { max: 15, nota: 'Suave para ser invierno, pero llueve y hace viento del Atlántico.' },
    2: { max: 16, nota: 'Parecido a enero, con días ya más largos.' },
    3: { max: 18, nota: 'Empieza lo bueno: sol, poca gente y precios bajos.' },
    4: { max: 20, nota: 'Mes excelente. Puede caer algún chubasco corto.' },
    5: { max: 22, nota: 'Probablemente el mejor mes del año en Lisboa.' },
    6: { max: 26, nota: 'Calor llevadero gracias al viento del río. El 12-13 son las fiestas de San Antonio y la ciudad entera está en la calle.' },
    7: { max: 28, calor: true, nota: 'Calor seco, pero corre aire. Las cuestas al mediodía se notan mucho.' },
    8: { max: 29, calor: true, nota: 'El mes más caluroso y el más lleno. Aun así, el Atlántico refresca por la noche.' },
    9: { max: 27, nota: 'Uno de los mejores momentos: verano sin la multitud de agosto.' },
    10: { max: 23, nota: 'Muy buen mes, con luz dorada y menos gente.' },
    11: { max: 18, nota: 'El más lluvioso, pero la ciudad sigue siendo cálida.' },
    12: { max: 16, nota: 'Suave y con ambiente navideño en la Baixa.' }
  },

  aeropuertos: [
    { cod: 'LIS', nombre: 'Humberto Delgado', min: 40,
      pasos: [
        { nombre: 'Metro línea roja → Alameda → línea verde', min: 30, maps: 'Metro Aeroporto, Lisboa',
          por: 'El metro sale de la propia terminal y llega al centro en media hora larga con un transbordo.',
          tip: 'Comprar la tarjeta Navegante ocasional (0,50 € una vez) y cargarla: el billete suelto en papel ya no existe.',
          precio: '2,10 € por persona más 0,50 € de tarjeta', precioNum: 2.6 },
        { nombre: 'A pie o tranvía hasta el alojamiento', min: 10,
          por: 'La Baixa está a un par de paradas de casi todo.' }
      ],
      vuelta: 'El aeropuerto está pegado a la ciudad: con dos horas y media antes del vuelo va sobrado, salvo hora punta.' }
  ],

  zonas: [
    { id: 'baixa', nombre: 'Baixa y Chiado', nota: 'El centro reconstruido a escuadra después del terremoto de 1755. Todo llano, por una vez.' },
    { id: 'alfama', nombre: 'Alfama y Castelo', nota: 'El barrio que sobrevivió al terremoto: callejones, escaleras y miradores.' },
    { id: 'belem', nombre: 'Belém', nota: 'Los monumentos de los descubrimientos, a 20 minutos en tranvía junto al río.' },
    { id: 'bairro', nombre: 'Bairro Alto y Príncipe Real', nota: 'De día tiendas y jardines; de noche, la calle entera es el bar.' },
    { id: 'oriente', nombre: 'Parque das Nações y ribera', nota: 'La Lisboa moderna del 98, llana y con paseo junto al Tajo.' },
    { id: 'sintra', nombre: 'Sintra', excursion: true, nota: 'Excursión de día completo en tren: palacios de cuento en la sierra.' }
  ],

  lugares: [
    { id: 'santa-luzia', nombre: 'Miradouro de Santa Luzia', zona: 'alfama', tipo: 'mirador',
      maps: 'Miradouro de Santa Luzia, Lisboa', dur: 25, and: 12, prioridad: 1,
      intereses: ['foto'], amanecer: true, precioNum: 0, precio: 'Gratis',
      por: 'La terraza con la pérgola de buganvillas y los azulejos, sobre los tejados de Alfama y el río. Es la postal de Lisboa.',
      tip: 'A primera hora está vacía; a partir de las once llegan los grupos.' },

    { id: 'castelo', nombre: 'Castelo de São Jorge', zona: 'alfama', tipo: 'museo',
      maps: 'Castelo de São Jorge, Lisboa', dur: 90, and: 10, prioridad: 1,
      intereses: ['historia', 'foto'], escaleras: true, precio: '15 € por persona', precioNum: 15,
      por: 'La fortaleza morisca en lo más alto de la ciudad, con murallas por las que se puede andar y pavos reales sueltos por el recinto.',
      tip: 'Se sube en el autobús 737 o en tuk-tuk: la cuesta desde la Baixa es dura de verdad.',
      aviso: 'Las murallas no tienen barandilla en muchos tramos y el suelo es irregular.' },

    { id: 'se', nombre: 'Sé de Lisboa', zona: 'alfama', tipo: 'lugar',
      maps: 'Sé de Lisboa', dur: 30, and: 8, prioridad: 2,
      intereses: ['historia', 'arte'], precio: '5 € por persona', precioNum: 5,
      por: 'La catedral que parece una fortaleza, de 1147, la única que aguantó el terremoto. Por delante pasa el tranvía 28, que es donde todo el mundo hace la foto.' },

    { id: 'tranvia28', nombre: 'Tranvía 28', zona: 'alfama', tipo: 'transporte',
      maps: 'Praça Martim Moniz, Lisboa', dur: 50, and: 5, prioridad: 1,
      intereses: ['foto', 'historia'], precio: '3,20 € por persona (gratis con el pase)', precioNum: 3.2,
      por: 'El tranvía amarillo de madera de los años treinta que sube por Alfama rozando las paredes. No es un tren turístico: es transporte público de verdad.',
      tip: 'Cogerlo en Martim Moniz, que es la cabecera, y a primera hora: a mediodía hay 40 minutos de cola y va como una lata.',
      aviso: 'Es el mejor sitio de la ciudad para que a uno le vacíen la mochila. Todo delante y cerrado.' },

    { id: 'santa-justa', nombre: 'Elevador de Santa Justa', zona: 'baixa', tipo: 'mirador',
      maps: 'Elevador de Santa Justa, Lisboa', dur: 25, and: 6, prioridad: 2,
      intereses: ['foto'], precio: '6 € por persona · gratis con el pase de transporte', precioNum: 6,
      por: 'Un ascensor de hierro de 1902 que conecta la Baixa con el Chiado. La estructura la hizo un discípulo de Eiffel.',
      tip: 'Hay un truco: subir por la Rua do Carmo hasta el Convento y entrar al mirador por la pasarela de arriba, sin cola y casi gratis.' },

    { id: 'carmo', nombre: 'Convento do Carmo', zona: 'baixa', tipo: 'museo',
      maps: 'Convento do Carmo, Lisboa', dur: 45, and: 3, prioridad: 2,
      intereses: ['historia', 'foto'], cierra: [0], precio: '7 € por persona', precioNum: 7,
      por: 'Una iglesia gótica a la que el terremoto de 1755 le arrancó el techo y que decidieron dejar así. Se entra y se ve el cielo entre los arcos.' },

    { id: 'comercio', nombre: 'Praça do Comércio y Arco da Rua Augusta', zona: 'baixa', tipo: 'lugar',
      maps: 'Praça do Comércio, Lisboa', dur: 30, and: 8, prioridad: 1,
      intereses: ['foto', 'historia'], precioNum: 0, precio: 'Gratis · arco 4 €',
      por: 'La plaza abierta al Tajo por la que llegaba todo lo que venía del mundo. Se puede bajar hasta el agua por las escaleras del cais das Colunas.' },

    { id: 'senhora-monte', nombre: 'Miradouro da Senhora do Monte', zona: 'alfama', tipo: 'mirador',
      maps: 'Miradouro da Senhora do Monte, Lisboa', dur: 30, and: 15, prioridad: 2,
      intereses: ['foto'], franja: 'tarde', precioNum: 0, precio: 'Gratis',
      por: 'El punto más alto de la ciudad. Al atardecer se ve el castillo a contraluz y el puente 25 de Abril al fondo, y hay menos gente que en los miradores del centro.' },

    { id: 'alcantara-mirador', nombre: 'Miradouro de São Pedro de Alcântara', zona: 'bairro', tipo: 'mirador',
      maps: 'Miradouro de São Pedro de Alcântara, Lisboa', dur: 25, and: 10, prioridad: 2,
      intereses: ['foto'], precioNum: 0, precio: 'Gratis',
      por: 'Un jardín en dos niveles frente al castillo, con quiosco y bancos a la sombra. Se llega en el Elevador da Glória, que también es de 1885.' },

    { id: 'jeronimos', nombre: 'Mosteiro dos Jerónimos', zona: 'belem', tipo: 'museo',
      maps: 'Mosteiro dos Jerónimos, Lisboa', dur: 90, and: 25, prioridad: 1,
      intereses: ['arte', 'historia'], cierra: [1], precio: '12 € por persona', precioNum: 12,
      reserva: 'Entrada con hora online: sin ella la cola supera la hora en temporada.',
      por: 'Manuelino puro: piedra tallada como si fuera cuerda de barco, con caracolas y algas. Lo pagaron con el 5 % de todo lo que llegaba de la India.',
      tip: 'La iglesia (con la tumba de Vasco da Gama) se entra gratis por otra puerta; lo que se paga es el claustro, que es lo bueno.' },

    { id: 'torre-belem', nombre: 'Torre de Belém', zona: 'belem', tipo: 'lugar',
      maps: 'Torre de Belém, Lisboa', dur: 60, and: 12, prioridad: 1,
      intereses: ['historia', 'foto'], cierra: [1], escaleras: true, precio: '8 € por persona', precioNum: 8,
      por: 'La torre desde la que zarpaban las naves, hoy rodeada de agua sólo con la marea alta. Por fuera es preciosa; por dentro es pequeña.',
      aviso: 'Se sube por una escalera de caracol de un solo carril con semáforo. Con calor y cola, muchos se quedan con la vista de fuera.' },

    { id: 'padrao', nombre: 'Padrão dos Descobrimentos', zona: 'belem', tipo: 'mirador',
      maps: 'Padrão dos Descobrimentos, Lisboa', dur: 30, and: 8, prioridad: 3,
      intereses: ['historia', 'foto'], cierra: [1], precio: '10 € por persona · por fuera gratis', precioNum: 10,
      por: 'La proa de piedra con los navegantes en fila, de 1960. Desde arriba se ve la rosa de los vientos del suelo, que es lo que de verdad merece la pena.' },

    { id: 'timeout', nombre: 'Time Out Market', zona: 'baixa', tipo: 'mercado',
      maps: 'Time Out Market Lisboa', dur: 75, and: 10, prioridad: 2,
      intereses: ['comida'], precio: 'Comer, 15-25 € por persona', precioNum: 0,
      por: 'La mitad del viejo Mercado da Ribeira convertida en puestos de cocineros conocidos, con mesas corridas en el centro. La otra mitad sigue siendo mercado de verdad y abre por la mañana.',
      aviso: 'De 13:00 a 15:00 y de 20:00 a 22:00 no hay dónde sentarse.' },

    { id: 'lx-factory', nombre: 'LX Factory', zona: 'belem', tipo: 'compra',
      maps: 'LX Factory, Lisboa', dur: 75, and: 15, prioridad: 3,
      intereses: ['compras', 'foto'], precioNum: 0, precio: 'Gratis entrar',
      por: 'Una fábrica de tejidos de 1846 debajo del puente, hoy llena de librerías, tiendas de diseño y terrazas. La librería Ler Devagar tiene una imprenta antigua y una bici voladora colgada del techo.' },

    { id: 'gulbenkian', nombre: 'Museu Calouste Gulbenkian', zona: 'bairro', tipo: 'museo',
      maps: 'Museu Calouste Gulbenkian, Lisboa', dur: 100, and: 20, prioridad: 3,
      intereses: ['arte', 'naturaleza'], cierra: [2], precio: '14 € por persona', precioNum: 14,
      por: 'La colección privada de un magnate del petróleo: arte egipcio, islámico, Rembrandt y una sala entera de joyas de Lalique. El jardín de fuera es de los mejores sitios con sombra de Lisboa.' },

    { id: 'azulejo', nombre: 'Museu Nacional do Azulejo', zona: 'oriente', tipo: 'museo',
      maps: 'Museu Nacional do Azulejo, Lisboa', dur: 75, and: 20, prioridad: 3,
      intereses: ['arte', 'historia'], cierra: [1], precio: '8 € por persona', precioNum: 8,
      por: 'Quinientos años de azulejo portugués en un convento del XVI, con un panel de 23 metros que retrata Lisboa tal y como era justo antes del terremoto.' },

    { id: 'principe-real', nombre: 'Príncipe Real y Jardim da Estrela', zona: 'bairro', tipo: 'parque',
      maps: 'Jardim do Príncipe Real, Lisboa', dur: 50, and: 12, prioridad: 2,
      intereses: ['naturaleza', 'compras'], precioNum: 0, precio: 'Gratis',
      por: 'El barrio de las tiendas pequeñas y los palacetes, con un cedro enorme podado en forma de paraguas que da sombra a todo un jardín.' },

    { id: 'alfama-paseo', nombre: 'Perderse por Alfama', zona: 'alfama', tipo: 'lugar',
      maps: 'Alfama, Lisboa', dur: 60, and: 5, prioridad: 1,
      intereses: ['foto', 'historia'], escaleras: true, precioNum: 0, precio: 'Gratis',
      por: 'El barrio más antiguo, con callejones de metro y medio, ropa tendida y sardinas a la brasa en la puerta. No hay ruta: se baja y ya está.',
      aviso: 'Todo son cuestas y escaleras, y muchas calles no tienen acera.' },

    { id: 'fado', nombre: 'Una noche de fado', zona: 'alfama', tipo: 'noche',
      maps: 'Alfama, Lisboa', dur: 120, and: 5, prioridad: 2,
      intereses: ['noche', 'historia'], franja: 'noche', precio: '25-45 € por persona con cena', precioNum: 30,
      reserva: 'Las casas buenas son pequeñas y se llenan: hay que reservar.',
      por: 'Fado de verdad se escucha en silencio absoluto y con la luz apagada. Si en el local se sigue hablando y comiendo, no es fado, es decoración.' },

    { id: 'cais-sodre', nombre: 'Cais do Sodré y Pink Street', zona: 'baixa', tipo: 'noche',
      maps: 'Rua Nova do Carvalho, Lisboa', dur: 60, and: 8, prioridad: 3,
      intereses: ['noche'], franja: 'noche', precioNum: 0, precio: 'Gratis pasear',
      por: 'La antigua calle de los burdeles del puerto, pintada de rosa y llena de bares. A partir de medianoche es el sitio más animado de la ciudad.' },

    { id: 'sintra-pena', nombre: 'Sintra: Palacio da Pena', zona: 'sintra', tipo: 'museo',
      maps: 'Palácio Nacional da Pena, Sintra', dur: 150, and: 60, prioridad: 1,
      intereses: ['historia', 'foto', 'naturaleza'], precio: '20 € por persona', precioNum: 20,
      reserva: 'Entrada con hora obligatoria y se agota: hay que sacarla con días.',
      por: 'Un palacio romántico del XIX pintado de amarillo y rojo en lo alto de la sierra, entre niebla y helechos. Parece de mentira y no lo es.',
      tip: 'Tren desde Rossio, 45 minutos, 2,40 € por trayecto. Salir temprano: a partir de las once Sintra es un atasco.' },

    { id: 'sintra-regaleira', nombre: 'Sintra: Quinta da Regaleira', zona: 'sintra', tipo: 'museo',
      maps: 'Quinta da Regaleira, Sintra', dur: 120, and: 20, prioridad: 2,
      intereses: ['historia', 'naturaleza', 'foto'], escaleras: true, precio: '15 € por persona', precioNum: 15,
      por: 'Un jardín iniciático lleno de grutas, túneles y un pozo invertido de 27 metros por el que se baja en espiral. Se disfruta más que el Pena y suele tener menos cola.',
      aviso: 'Los túneles son húmedos, oscuros y con suelo resbaladizo.' }
  ],

  restaurantes: [
    { nombre: 'Cervejaria Ramiro', tipo: 'Marisquería', zona: 'Intendente',
      maps: 'Cervejaria Ramiro, Lisboa', tel: '+351218851024',
      nivel: 2, precio: '40-55 € por persona', comida: true, cena: true,
      detalle: 'Gambas al ajillo 14 € · percebes al peso · el prego de postre, 5 €',
      cierra: 'Cierra lunes', cierraDias: [1],
      perfil: { embarazo: 'ojo' },
      nota: 'La marisquería más famosa de Lisboa. No cogen reserva: se coge número y se espera de pie 40-60 minutos. Marisco cocido, nada crudo, pero conviene preguntar.' },

    { nombre: 'Taberna da Rua das Flores', tipo: 'Taberna', zona: 'Chiado',
      maps: 'Taberna da Rua das Flores, Lisboa',
      nivel: 1, precio: '25-35 € por persona', comida: true, cena: true,
      detalle: 'Platos para compartir 8-16 € · carta escrita a mano cada día',
      cierra: 'Cierra domingos', cierraDias: [0],
      perfil: { embarazo: 'ideal' },
      nota: 'Diez mesas y sin reserva. La carta cambia a diario según el mercado. Hay que llegar cuando abren o esperar.' },

    { nombre: 'Zé dos Cornos', tipo: 'Tasca', zona: 'Mouraria',
      maps: 'Zé dos Cornos, Lisboa', tel: '+351218869641',
      nivel: 0, precio: '12-18 € por persona', comida: true,
      detalle: 'Costillas a la brasa 9 € · vino de la casa 1 € el vaso',
      cierra: 'Cierra domingos', cierraDias: [0],
      perfil: { embarazo: 'ideal', ninos: 'ok' },
      nota: 'Tasca de barrio con mesas compartidas y mantel de papel. Se come lo que hay y sale por lo que cuesta un café en el centro.' },

    { nombre: 'Pastéis de Belém', tipo: 'Pastelería', zona: 'Belém',
      maps: 'Pastéis de Belém, Lisboa',
      nivel: 0, precio: '8-12 € los dos', desayuno: true, tarde: true,
      detalle: 'Pastel de nata 1,40 € · café 1 €',
      cierra: 'Abierto todos los días',
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'La receta original de los monjes de los Jerónimos desde 1837, y sólo tres personas la conocen. La cola de la calle es para llevar; dentro hay salones enormes y casi siempre sitio.' },

    { nombre: 'Manteigaria', tipo: 'Pastelería', zona: 'Chiado y varias sedes',
      maps: 'Manteigaria, Chiado, Lisboa',
      nivel: 0, precio: '6-10 € los dos', desayuno: true, tarde: true,
      detalle: 'Pastel de nata 1,40 € en barra',
      cierra: 'Abierto todos los días hasta tarde',
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'Para mucha gente de Lisboa, mejor que el de Belém y sin cola. Se comen de pie viendo cómo los hacen, con canela por encima.' },

    { nombre: 'Time Out Market', tipo: 'Mercado', zona: 'Cais do Sodré',
      maps: 'Time Out Market Lisboa',
      nivel: 1, precio: '15-25 € por persona', comida: true, cena: true,
      detalle: 'Platos de 8-18 € en 30 puestos',
      cierra: 'Abierto todos los días de 10:00 a medianoche',
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'Resuelve el día en que cada uno quiere una cosa distinta. Fuera de las horas punta se come muy bien y muy rápido.' },

    { nombre: 'O Trevo', tipo: 'Para llevar', zona: 'Praça Luís de Camões, Chiado',
      maps: 'O Trevo, Praça Luís de Camões, Lisboa',
      nivel: 0, precio: '6-10 € los dos', comida: true, tarde: true,
      detalle: 'Bifana 3,50 € · imperial 1,20 €',
      cierra: 'Cierra domingos', cierraDias: [0],
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'La bifana (lomo de cerdo adobado en un panecillo) que hizo famoso Bourdain. Se come de pie en la barra en cinco minutos.' },

    { nombre: 'Ponto Final', tipo: 'Restaurante', zona: 'Cacilhas · al otro lado del río',
      maps: 'Ponto Final, Almada', tel: '+351212760743',
      nivel: 1, precio: '25-35 € por persona', comida: true, cena: true,
      detalle: 'Pescado del día al peso · arroz de marisco 20 €',
      cierra: 'Cierra martes', cierraDias: [2], reserva: true,
      perfil: { embarazo: 'ok' },
      nota: 'Mesas literalmente sobre el muelle, con Lisboa entera enfrente. Se llega en el ferry de Cais do Sodré (10 minutos) y luego 15 andando por la orilla.' },

    { nombre: 'Confeitaria Nacional', tipo: 'Cafetería', zona: 'Praça da Figueira, Baixa',
      maps: 'Confeitaria Nacional, Lisboa',
      nivel: 0, precio: '6-10 € los dos', desayuno: true,
      detalle: 'Café 0,80 € en barra · bollería 1,50-3 €',
      cierra: 'Abierto todos los días',
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'Abierta desde 1829 y con los espejos y la madera originales. Es donde desayuna la gente que va a trabajar a la Baixa.' },

    { nombre: 'Mercado de Campo de Ourique', tipo: 'Mercado', zona: 'Campo de Ourique',
      maps: 'Mercado de Campo de Ourique, Lisboa',
      nivel: 1, precio: '15-22 € por persona', comida: true, cena: true,
      detalle: 'Platos de 7-15 €',
      cierra: 'Abierto todos los días',
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'Lo mismo que el Time Out pero en un barrio de vecinos, con la mitad de gente y precios más bajos. Se llega en el tranvía 28.' }
  ],

  transporte: {
    id: 'transporte',
    titulo: 'Transporte por Lisboa',
    ayuda: 'Hay siete colinas y se notan todas. Los elevadores y el tranvía no son turismo: son la forma de no subir andando.',
    alts: [
      { id: 'diario', label: 'Pase de 24 h (Carris/Metro)', porPersona: 7, dias: 1, porDia: true, detalle: '6,80 € al día, con metro, autobús, tranvía y los tres elevadores incluidos. Con dos viajes y un elevador ya sale a cuenta.' },
      { id: 'zapping', label: 'Tarjeta Navegante con saldo', porPersona: 1.85, porViaje: true, detalle: '1,85 € por viaje descontando del saldo, más 0,50 € de la tarjeta una vez. Los elevadores y el 28 se pagan aparte y son caros.' },
      { id: 'andar', label: 'Andar casi todo', porPersona: 5, aPie: true, detalle: 'Se puede, pero son cuestas del 15 % con calçada resbaladiza. En verano no es buena idea.' }
    ]
  },

  estrellas: [
    { id: 'sintra', titulo: 'Excursión a Sintra',
      ayuda: 'Es un día completo. La sierra está a 45 minutos en tren y hace cinco grados menos que Lisboa.',
      alts: [
        { id: 'tren', label: 'Por libre en tren', porPersona: 25, detalle: 'Tren 5 € ida y vuelta más la entrada al Pena (20 €). Hay que sumar el bus 434 dentro de Sintra, 8 €.', recomendado: true },
        { id: 'dos', label: 'Pena y Regaleira', porPersona: 40, detalle: 'Los dos sitios en un día. Es apretado pero se hace saliendo a las 8:00.' },
        { id: 'tour', label: 'Tour organizado con transporte', porPersona: 75, detalle: 'Recogida en Lisboa, entradas incluidas y también Cabo da Roca. Menos libertad pero cero logística.' },
        { id: 'no', label: 'No vamos a Sintra', importe: 0, detalle: 'Un día completo que se puede dedicar a Belém con calma y a los barrios altos.' }
      ] },
    { id: 'fado', titulo: 'Noche de fado',
      ayuda: 'La diferencia entre una casa de fado buena y una para autobuses es grande.',
      alts: [
        { id: 'casa', label: 'Casa de fado con cena', porPersona: 45, detalle: 'Dos horas, tres fadistas y la luz apagada. Hay que reservar.', recomendado: true },
        { id: 'tasca', label: 'Fado vadio en una tasca', porPersona: 15, detalle: 'En algunas tascas de Alfama canta quien quiere y sólo se paga la consumición. Es irregular y por eso mismo puede ser inolvidable.' },
        { id: 'no', label: 'Nada de fado', importe: 0, detalle: 'Se oye igual saliendo por Alfama a las diez de la noche.' }
      ] }
  ],

  hospital: {
    nombre: 'Hospital de São José',
    dir: 'Rua José António Serrano, Lisboa',
    maps: 'Hospital de São José, Lisboa',
    nota: 'El hospital público del centro, con urgencias 24 h, a diez minutos andando de la Baixa. Antes de ir conviene llamar al SNS 24 (808 24 24 24), que orienta por teléfono y en muchos casos evita la urgencia.'
  },

  consejos: [
    { titulo: 'El couvert se paga',
      texto: 'El pan, las aceitunas y el queso que ponen en la mesa sin pedirlos no son un detalle de la casa: se cobran, entre 2 y 6 € por persona. Se pueden devolver sin tocarlos y no pasa nada.' },
    { titulo: 'La calçada resbala',
      texto: 'El suelo de piedra blanca y negra es precioso y es una pista de hielo cuando llueve o cuando está muy pulido por el uso. Calzado con suela de goma y nada de chanclas.' },
    { titulo: 'Los miradouros son el plan',
      texto: 'Hay más de veinte, casi todos con quiosco, sombra y bancos. Encadenar tres o cuatro al atardecer es probablemente el mejor plan gratis de la ciudad.' },
    { titulo: 'Café: bica, meia de leite, galão',
      texto: 'Un espresso es "uma bica" y cuesta 0,80-1 € en barra. Con leche y en vaso alto es un galão; en taza pequeña, una meia de leite. Sentarse en la terraza multiplica el precio por tres.' },
    { titulo: 'El tranvía 28 y los carteristas',
      texto: 'Es el sitio con más robos de Portugal, sin exagerar. Van en grupo, empujan al subir y trabajan en las curvas. Mochila delante y el móvil guardado.' },
    { titulo: 'La ginjinha',
      texto: 'Licor de guinda que se toma de un trago en vasito, 1,50 €, de pie en la calle, en tabernas de un metro cuadrado. La de A Ginjinha, junto a Rossio, lleva sirviéndolo desde 1840.' },
    { titulo: 'El sol se pone en el río',
      texto: 'La ciudad mira al oeste sobre el Tajo, así que casi cualquier mirador vale para el atardecer. Los mejores: Senhora do Monte, Santa Catarina y el paseo de Belém.' },
    { titulo: 'Los tuk-tuk',
      texto: 'No tienen tarifa regulada y cobran lo que quieren. Para subir al castillo salen a 10-15 € el trayecto; el autobús 737 hace lo mismo por el precio de un billete.' }
  ],

  checklistExtra: [
    { cat: 'Lisboa en concreto', items: [
      'Sacar la tarjeta Navegante nada más llegar al aeropuerto (0,50 € y sirve para todo)',
      'Reservar el Palacio da Pena con hora si entra Sintra en el plan',
      'Calzado con suela de goma: la calçada resbala mucho más de lo que parece',
      'Descargar la app Carris/Metro para ver horarios de los elevadores'
    ]}
  ],

  compras: 'Azulejos antiguos sueltos (con factura, que sacar patrimonio sin ella da problemas), conservas de sardina de las buenas, jabón Claus Porto, corcho y una botella de ginjinha.'
};
