/* ============================================================
   Pack de destino — París
   ============================================================ */

PACKS.paris = {
  clave: 'paris',
  ciudad: 'París',
  pais: 'fr',
  paleta: 'zinc',
  lema: 'Una ciudad diseñada para caminarla, en la que la mitad de lo mejor está en la calle y es gratis.',

  clima: {
    1: { max: 7, nota: 'Frío y gris, pero es cuando la ciudad es más de los parisinos.' },
    2: { max: 8, nota: 'Parecido a enero. Museos vacíos.' },
    3: { max: 12, nota: 'Empieza a levantar. Todavía hace falta abrigo.' },
    4: { max: 16, nota: 'Los castaños en flor y las terrazas abriendo. Muy buen mes.' },
    5: { max: 20, nota: 'Probablemente el mejor mes, aunque hay varios festivos que cierran cosas.' },
    6: { max: 23, nota: 'Días larguísimos: a las 22:00 todavía hay luz.' },
    7: { max: 26, nota: 'Calor suave y mucha gente. Las noches son agradables.' },
    8: { max: 26, nota: 'Los parisinos se van y muchos restaurantes de barrio cierran tres semanas.' },
    9: { max: 22, nota: 'Excelente: buen tiempo y la ciudad de vuelta al trabajo.' },
    10: { max: 17, nota: 'Otoño de postal en los parques. Empieza a llover.' },
    11: { max: 11, nota: 'Gris y corto de luz, pero sin colas en ningún museo.' },
    12: { max: 8, nota: 'Frío, con mercados de Navidad y escaparates de los grandes almacenes.' }
  },

  aeropuertos: [
    { cod: 'CDG', nombre: 'Charles de Gaulle', min: 70,
      pasos: [
        { nombre: 'RER B → Châtelet-Les Halles', min: 40, maps: 'Châtelet Les Halles, Paris',
          por: 'El tren directo al centro desde las dos terminales. Sale cada 10-15 minutos.',
          tip: 'El billete al aeropuerto es especial y más caro que el urbano: hay que comprarlo aparte, no vale el sencillo normal.',
          precio: '13 € por persona', precioNum: 13 },
        { nombre: 'Metro hasta el alojamiento', min: 20,
          por: 'Desde Châtelet salen cinco líneas de metro y se llega a cualquier sitio.',
          precio: '2,50 € por persona', precioNum: 2.5 }
      ],
      vuelta: 'Salir tres horas y media antes: CDG es enorme, el control de seguridad es lento y el RER puede tener incidencias.' },
    { cod: 'ORY', nombre: 'Orly', min: 55,
      pasos: [
        { nombre: 'Metro línea 14 → centro', min: 35, maps: 'Châtelet, Paris',
          por: 'Desde 2024 el metro llega directo a Orly sin transbordos ni Orlyval.',
          precio: '13 € por persona', precioNum: 13 },
        { nombre: 'Transbordo hasta el alojamiento', min: 15,
          precio: '2,50 € por persona', precioNum: 2.5 }
      ],
      vuelta: 'Con tres horas va bien: Orly es bastante más manejable que CDG.' },
    { cod: 'BVA', nombre: 'Beauvais', min: 135,
      pasos: [
        { nombre: 'Bus a Porte Maillot', min: 90, maps: 'Porte Maillot, Paris',
          por: 'El "aeropuerto de París" de las low cost está a 85 km. El bus es la única opción razonable.',
          tip: 'Comprar el billete online antes: en la ventanilla cuesta más y en los vuelos de noche se llena.',
          precio: '17 € por persona', precioNum: 17 },
        { nombre: 'Metro línea 1 hasta el alojamiento', min: 25,
          precio: '2,50 € por persona', precioNum: 2.5 }
      ],
      vuelta: 'El bus sale 3h15 antes del vuelo desde Porte Maillot y hay que estar allí antes. En total, cinco horas de puerta a puerta.' }
  ],

  zonas: [
    { id: 'eiffel', nombre: 'Torre Eiffel y Trocadéro', nota: 'La zona monumental del oeste, con distancias largas entre punto y punto.' },
    { id: 'louvre', nombre: 'Louvre, Tuileries y Ópera', nota: 'El eje de los museos grandes y los grandes almacenes.' },
    { id: 'isla', nombre: 'Islas y Barrio Latino', nota: 'Donde empezó la ciudad. Todo se anda y es la parte más bonita a pie.' },
    { id: 'marais', nombre: 'Marais y Bastilla', nota: 'Palacetes del XVII, tiendas pequeñas y el barrio judío. Abre en domingo, que en París es raro.' },
    { id: 'montmartre', nombre: 'Montmartre', nota: 'La colina. Preciosa temprano y llena de gente a partir de las once.' },
    { id: 'orsay', nombre: 'Orsay y Saint-Germain', nota: 'La orilla izquierda de los cafés históricos y el Luxemburgo.' },
    { id: 'versalles', nombre: 'Versalles', excursion: true, nota: 'Excursión de día completo en RER C.' }
  ],

  lugares: [
    { id: 'eiffel', nombre: 'Torre Eiffel', zona: 'eiffel', tipo: 'mirador',
      maps: 'Tour Eiffel, Paris', dur: 120, and: 10, prioridad: 1,
      intereses: ['foto', 'historia'], escaleras: true, precio: '35 € a la cima · 22 € al 2.º piso · 14 € por escaleras', precioNum: 22,
      reserva: 'Entrada con hora online, y se agota con semanas en temporada.',
      por: 'Se construyó para durar veinte años y la salvó ser una antena de radio. De noche destella cinco minutos al dar cada hora en punto.',
      tip: 'Subir por escaleras al segundo piso cuesta la mitad, no tiene cola y son 674 escalones repartidos en descansillos.' },

    { id: 'trocadero', nombre: 'Trocadéro', zona: 'eiffel', tipo: 'mirador',
      maps: 'Place du Trocadéro, Paris', dur: 25, and: 12, prioridad: 1,
      intereses: ['foto'], amanecer: true, precioNum: 0, precio: 'Gratis',
      por: 'La vista de la torre entera y de frente. A las siete de la mañana no hay nadie y la luz da justo en la fachada.' },

    { id: 'louvre', nombre: 'Museo del Louvre', zona: 'louvre', tipo: 'museo',
      maps: 'Musée du Louvre, Paris', dur: 180, and: 15, prioridad: 1,
      intereses: ['arte', 'historia'], cierra: [2], precio: '22 € por persona', precioNum: 22,
      reserva: 'Entrada con hora obligatoria. Sin ella no se entra ni haciendo cola.',
      por: 'Setenta mil metros cuadrados: verlo entero es imposible y pretenderlo estropea el día. Mejor elegir dos alas y hacerlas bien.',
      tip: 'La entrada por el Carrousel du Louvre (el centro comercial subterráneo) tiene mucha menos cola que la pirámide.',
      aviso: 'Son tres horas de pie como mínimo y los bancos escasean.' },

    { id: 'orsay', nombre: "Musée d'Orsay", zona: 'orsay', tipo: 'museo',
      maps: "Musée d'Orsay, Paris", dur: 120, and: 12, prioridad: 1,
      intereses: ['arte'], cierra: [1], precio: '16 € por persona', precioNum: 16,
      por: 'Una estación de tren de 1900 llena de impresionistas: Van Gogh, Monet, Degas y Renoir en dos plantas. Se recorre en la mitad de tiempo que el Louvre y muchos lo prefieren.',
      tip: 'Detrás de uno de los relojes gigantes de la fachada hay un mirador con la vista de París a través de la esfera.' },

    { id: 'notredame', nombre: 'Notre-Dame', zona: 'isla', tipo: 'lugar',
      maps: 'Cathédrale Notre-Dame de Paris', dur: 60, and: 10, prioridad: 1,
      intereses: ['historia', 'arte'], precioNum: 0, precio: 'Gratis',
      reserva: 'Desde la reapertura hay que reservar franja horaria gratuita en la web o en su app; sin reserva la cola es larga.',
      por: 'Reabierta en diciembre de 2024 después del incendio, con la piedra limpia por primera vez en siglos: por dentro está mucho más clara de lo que nadie recordaba.' },

    { id: 'saintechapelle', nombre: 'Sainte-Chapelle', zona: 'isla', tipo: 'lugar',
      maps: 'Sainte-Chapelle, Paris', dur: 45, and: 5, prioridad: 1,
      intereses: ['arte', 'historia'], precio: '13 € por persona', precioNum: 13,
      reserva: 'Reserva con hora muy recomendable: el control de seguridad del Palacio de Justicia es lento.',
      por: 'Mil ciento trece vidrieras del siglo XIII que forman una caja de luz. Es la cosa más impresionante de París en menos de una hora.',
      tip: 'Ir con sol y a media mañana: sin luz de fuera pierde la mitad.' },

    { id: 'islasaintlouis', nombre: 'Île Saint-Louis', zona: 'isla', tipo: 'lugar',
      maps: 'Île Saint-Louis, Paris', dur: 40, and: 6, prioridad: 2,
      intereses: ['foto', 'comida'], precioNum: 0, precio: 'Gratis',
      por: 'Una isla entera de casas del XVII con una sola calle comercial, en el centro exacto de París y casi en silencio. Aquí está Berthillon, el helado histórico de la ciudad.' },

    { id: 'latino', nombre: 'Barrio Latino y Shakespeare and Company', zona: 'isla', tipo: 'lugar',
      maps: 'Shakespeare and Company, Paris', dur: 60, and: 5, prioridad: 2,
      intereses: ['compras', 'historia'], precioNum: 0, precio: 'Gratis',
      por: 'La librería en la que dormían escritores sin dinero a cambio de trabajar en la tienda, y el barrio de callejones medievales alrededor de la Sorbona.' },

    { id: 'pantheon', nombre: 'Panthéon', zona: 'isla', tipo: 'museo',
      maps: 'Panthéon, Paris', dur: 60, and: 10, prioridad: 3,
      intereses: ['historia'], escaleras: true, precio: '13 € por persona', precioNum: 13,
      por: 'La cripta con Voltaire, Rousseau, Zola, Marie Curie y Josephine Baker, y el péndulo de Foucault colgado de la cúpula demostrando que la Tierra gira.' },

    { id: 'luxemburgo', nombre: 'Jardin du Luxembourg', zona: 'orsay', tipo: 'parque',
      maps: 'Jardin du Luxembourg, Paris', dur: 50, and: 8, prioridad: 1,
      intereses: ['naturaleza'], precioNum: 0, precio: 'Gratis',
      por: 'El parque donde los parisinos leen en las sillas verdes que se pueden mover a la sombra. Hay un estanque con barquitos de vela de alquiler que llevan ahí desde 1927.' },

    { id: 'marais', nombre: 'Marais y Place des Vosges', zona: 'marais', tipo: 'lugar',
      maps: 'Place des Vosges, Paris', dur: 75, and: 12, prioridad: 1,
      intereses: ['compras', 'historia', 'foto'], precioNum: 0, precio: 'Gratis',
      por: 'La plaza más antigua de París, de 1612, con soportales por los cuatro lados y césped en el centro. Alrededor, el barrio con las tiendas pequeñas y el mejor falafel de Europa.',
      tip: 'El Marais es de los pocos barrios donde el domingo está todo abierto: buen día para dejarlo.' },

    { id: 'rodin', nombre: 'Musée Rodin', zona: 'eiffel', tipo: 'museo',
      maps: 'Musée Rodin, Paris', dur: 75, and: 15, prioridad: 2,
      intereses: ['arte', 'naturaleza'], cierra: [1], precio: '14 € · sólo jardín 6 €', precioNum: 14,
      por: 'El Pensador y las Puertas del Infierno en un jardín de tres hectáreas con rosales, en un palacete del XVIII. Uno de los sitios más tranquilos del centro.' },

    { id: 'orangerie', nombre: "Musée de l'Orangerie", zona: 'louvre', tipo: 'museo',
      maps: "Musée de l'Orangerie, Paris", dur: 60, and: 8, prioridad: 2,
      intereses: ['arte'], cierra: [2], precio: '12,50 € por persona', precioNum: 12.5,
      por: 'Dos salas ovaladas con los ocho Nenúfares de Monet montados como Monet quiso: sin marcos, curvados, y con luz natural desde arriba. Se entra y se hace el silencio.' },

    { id: 'montmartre', nombre: 'Montmartre y Sacré-Cœur', zona: 'montmartre', tipo: 'mirador',
      maps: 'Basilique du Sacré-Cœur, Paris', dur: 90, and: 20, prioridad: 1,
      intereses: ['foto', 'historia'], escaleras: true, amanecer: true, precioNum: 0, precio: 'Gratis · cúpula 8 €',
      por: 'La colina del pueblo que se tragó la ciudad, con viñedo propio y calles empedradas. La basílica está en el punto más alto y desde la escalinata se ve todo París.',
      tip: 'Subir a primera hora: a partir de las once los escalones son una feria. Hay funicular incluido en el billete de metro.',
      aviso: 'En la escalinata trabajan los del truco de la pulsera: cogen la muñeca, atan un hilo y luego piden dinero. Manos en los bolsillos y sin parar.' },

    { id: 'arco', nombre: 'Arco del Triunfo', zona: 'eiffel', tipo: 'mirador',
      maps: "Arc de Triomphe, Paris", dur: 60, and: 15, prioridad: 2,
      intereses: ['historia', 'foto'], escaleras: true, precio: '16 € por persona', precioNum: 16,
      por: 'Desde la terraza se ven las doce avenidas saliendo en estrella, que es la única forma de entender cómo está construida la ciudad. Mejor vista que la de la Torre Eiffel, porque desde aquí sí se ve la torre.',
      aviso: 'Se sube por 284 escalones de caracol y no hay ascensor salvo para personas con movilidad reducida.' },

    { id: 'perelachaise', nombre: 'Cementerio de Père-Lachaise', zona: 'marais', tipo: 'parque',
      maps: 'Cimetière du Père-Lachaise, Paris', dur: 90, and: 20, prioridad: 3,
      intereses: ['historia', 'naturaleza'], precioNum: 0, precio: 'Gratis',
      por: 'Cuarenta y cuatro hectáreas de calles arboladas con Chopin, Wilde, Piaf y Jim Morrison. Más que un cementerio es el parque con más sombra de París.',
      tip: 'Coger un plano en la entrada principal: sin él no se encuentra nada.' },

    { id: 'canal', nombre: 'Canal Saint-Martin', zona: 'marais', tipo: 'lugar',
      maps: 'Canal Saint-Martin, Paris', dur: 60, and: 15, prioridad: 3,
      intereses: ['noche', 'foto'], franja: 'tarde', precioNum: 0, precio: 'Gratis',
      por: 'Puentes de hierro giratorios, esclusas y gente sentada en el borde del agua con una botella de vino al atardecer. Es el París joven que no sale en las guías antiguas.' },

    { id: 'galeries', nombre: 'Galeries Lafayette: cúpula y terraza', zona: 'louvre', tipo: 'mirador',
      maps: 'Galeries Lafayette Haussmann, Paris', dur: 40, and: 10, prioridad: 2,
      intereses: ['compras', 'foto'], cierra: [0], precioNum: 0, precio: 'Gratis',
      por: 'La cúpula de vidriera art nouveau de 1912 sobre el hueco central, y una terraza en la azotea con vista a la Ópera y a la Torre Eiffel. Las dos cosas son gratis.' },

    { id: 'sena', nombre: 'Paseo o crucero por el Sena', zona: 'louvre', tipo: 'transporte',
      maps: 'Pont Neuf, Paris', dur: 70, and: 5, prioridad: 2,
      intereses: ['foto'], franja: 'tarde', precio: '16 € por persona · andando, gratis', precioNum: 16,
      por: 'Una hora de barco pasando por debajo de los puentes, con toda la ciudad de frente. Al anochecer es cuando compensa de verdad.',
      tip: 'El mismo recorrido, andando por los muelles entre el Pont Neuf y el Trocadéro, sale gratis y se para donde uno quiere.' },

    { id: 'versalles', nombre: 'Palacio de Versalles', zona: 'versalles', tipo: 'museo',
      maps: 'Château de Versailles', dur: 240, and: 60, prioridad: 2,
      intereses: ['historia', 'arte', 'naturaleza'], cierra: [1], precio: '32 € el pase día completo', precioNum: 32,
      reserva: 'Entrada con hora obligatoria. El martes está cerrado.',
      por: 'La Galería de los Espejos y ochocientas hectáreas de jardín. Lo que la gente no espera es que el Trianón y la aldea de María Antonieta, al fondo del parque, son la mejor parte y están casi vacías.',
      tip: 'RER C desde el centro, 45 minutos. Salir a las 8:00: a las 11 la cola da la vuelta al patio.',
      aviso: 'Es un día entero y se anda muchísimo, sobre todo si se llega hasta el Trianón. Hay un trenecito de pago dentro del parque.' }
  ],

  restaurantes: [
    { nombre: 'Bouillon Chartier', tipo: 'Bouillon', zona: 'Grands Boulevards',
      maps: 'Bouillon Chartier, Paris',
      nivel: 0, precio: '18-25 € por persona', comida: true, cena: true,
      detalle: 'Entrante 3-6 € · principal 9-14 € · postre 3-5 €',
      cierra: 'Abierto todos los días de 11:30 a medianoche',
      perfil: { embarazo: 'ideal', ninos: 'ok' },
      nota: 'Comedor de 1896 con espejos y camareros que apuntan la cuenta en el mantel de papel. No cogen reserva y hay cola, pero se mueve rápido porque caben 300 personas.' },

    { nombre: "L'As du Fallafel", tipo: 'Para llevar', zona: 'Marais · Rue des Rosiers',
      maps: "L'As du Fallafel, Paris",
      nivel: 0, precio: '14-18 € los dos', comida: true, tarde: true,
      detalle: 'Falafel especial 9 € · shawarma 11 €',
      cierra: 'CIERRA VIERNES TARDE Y SÁBADO (shabbat)', cierraDias: [6],
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'Cola en la calle que avanza en diez minutos. Se come de pie o sentado en la Place des Vosges, a cinco minutos.' },

    { nombre: 'Chez Janou', tipo: 'Bistró', zona: 'Marais · junto a Bastilla',
      maps: 'Chez Janou, Paris', tel: '+33142722841',
      nivel: 1, precio: '30-40 € por persona', comida: true, cena: true,
      detalle: 'Principal 18-24 € · la mousse de chocolate viene en una fuente para servirse',
      cierra: 'Abierto todos los días', reserva: true,
      perfil: { embarazo: 'ok' },
      nota: 'Bistró provenzal con terraza bajo una glicinia. Muy ruidoso y muy parisino. Reservar con días o ir a las 19:00.' },

    { nombre: 'Bistrot Paul Bert', tipo: 'Bistró', zona: '11.º · Rue Paul Bert',
      maps: 'Bistrot Paul Bert, Paris', tel: '+33143722401',
      nivel: 2, precio: '45-60 € por persona', comida: true, cena: true,
      detalle: 'Menú de tres platos 49 € · entrecot con patatas soufflées 32 €',
      cierra: 'Cierra domingo y lunes', cierraDias: [0, 1], reserva: true,
      perfil: { embarazo: 'ojo' },
      nota: 'El bistró clásico que sale en todas las listas y sigue mereciéndolo. Reserva con dos semanas. Ojo con los tartares y los quesos sin pasteurizar.' },

    { nombre: 'Breizh Café', tipo: 'Crepería', zona: 'Marais',
      maps: 'Breizh Café Marais, Paris',
      nivel: 1, precio: '25-35 € por persona', comida: true, cena: true,
      detalle: 'Galette salada 12-18 € · crêpe dulce 8-12 € · sidra bretona en cuenco',
      cierra: 'Abierto todos los días', reserva: true,
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'Crepes bretonas de trigo sarraceno hechas con producto muy bueno. La galette lleva huevo poco cuajado por defecto: se puede pedir bien hecho.' },

    { nombre: 'Marché des Enfants Rouges', tipo: 'Mercado', zona: 'Marais',
      maps: 'Marché des Enfants Rouges, Paris',
      nivel: 1, precio: '15-25 € por persona', comida: true,
      detalle: 'Platos de 10-18 € en una docena de puestos',
      cierra: 'Cierra lunes · sólo hasta media tarde', cierraDias: [1],
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'El mercado cubierto más antiguo de París, de 1615, hoy con puestos marroquí, japonés e italiano y mesas comunes entre los tenderetes.' },

    { nombre: 'Du Pain et des Idées', tipo: 'Panadería', zona: 'Canal Saint-Martin',
      maps: 'Du Pain et des Idées, Paris',
      nivel: 0, precio: '8-12 € los dos', desayuno: true,
      detalle: 'Escargot de pistacho 4,50 € · pain des amis 6 € la hogaza',
      cierra: 'CIERRA SÁBADO Y DOMINGO', cierraDias: [0, 6],
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'Panadería de 1889 con el techo pintado original. El escargot (un caracol de hojaldre) es lo que hay que pedir. Cierra el fin de semana entero.' },

    { nombre: 'Berthillon', tipo: 'Heladería', zona: 'Île Saint-Louis',
      maps: 'Berthillon, Paris',
      nivel: 0, precio: '8-14 € los dos', tarde: true,
      detalle: 'Bola 4 € · dos bolas 7 €',
      cierra: 'Cierra lunes y martes · cierra en agosto', cierraDias: [1, 2],
      perfil: { embarazo: 'ideal', ninos: 'ideal' },
      nota: 'Desde 1954 y sin ninguna concesión: sorbetes de fruta de temporada y nada más. Cierra por vacaciones buena parte de agosto.' },

    { nombre: 'Le Comptoir Général', tipo: 'Bar', zona: 'Canal Saint-Martin',
      maps: 'Le Comptoir Général, Paris',
      nivel: 1, precio: '15-25 € por persona', tarde: true, cena: true,
      detalle: 'Cóctel 10-13 € · platos para compartir 8-14 €',
      cierra: 'Abierto de tarde y noche',
      perfil: { embarazo: 'ok' },
      nota: 'Un almacén escondido al fondo de un patio junto al canal, lleno de plantas y objetos africanos. Sitio raro y muy parisino para tomar algo.' },

    { nombre: 'Café de Flore', tipo: 'Cafetería', zona: 'Saint-Germain-des-Prés',
      maps: 'Café de Flore, Paris',
      nivel: 2, precio: '15-25 € los dos', desayuno: true,
      detalle: 'Café 5,50 € · chocolate caliente 9 € · desayuno completo 20 €',
      cierra: 'Abierto todos los días desde las 7:30',
      perfil: { embarazo: 'ideal' },
      nota: 'Se paga el sitio, no el café: aquí escribían Sartre y Beauvoir. Un chocolate en la terraza una mañana es un gasto que casi todo el mundo da por bueno.' }
  ],

  transporte: {
    id: 'transporte',
    titulo: 'Transporte por París',
    ayuda: 'El metro llega a todo y nunca hay que andar más de 500 m hasta una boca. Pero París también se disfruta mucho andando: casi todo el centro cabe en una hora a pie.',
    alts: [
      { id: 'navigo-dia', label: 'Navigo Jour (día ilimitado)', porPersona: 12.5, dias: 1, porDia: true, detalle: 'Metro, bus y RER dentro de París sin límite. Compensa a partir de cinco viajes al día.' },
      { id: 'carnet', label: 'Navigo Easy con billetes', porPersona: 2, porViaje: true, detalle: 'La tarjeta cuesta 2 € una vez y el pack de 10 viajes sale a unos 2 € cada uno. Es lo más razonable para un ritmo normal.' },
      { id: 'sueltos', label: 'Billetes sueltos', porPersona: 2.5, porViaje: true, detalle: '2,50 € por viaje. Sólo si se va a usar el metro dos o tres veces en todo el viaje.' },
      { id: 'andar', label: 'Andar casi todo', porPersona: 8, aPie: true, detalle: 'París es llano y compacto. Con buen tiempo, andar el centro es mejor plan que el metro.' }
    ]
  },

  estrellas: [
    { id: 'eiffel-nivel', titulo: 'Torre Eiffel: hasta dónde subir',
      ayuda: 'Hay tres alturas y la diferencia de precio es grande.',
      alts: [
        { id: 'segundo', label: 'Segundo piso en ascensor', porPersona: 22, detalle: 'Los 116 metros desde los que mejor se ve la ciudad: aún se distinguen los edificios.', recomendado: true },
        { id: 'cima', label: 'Hasta la cima', porPersona: 35, detalle: '276 metros. La vista es más lejana y hay más cola para el segundo ascensor.' },
        { id: 'escaleras', label: 'Segundo piso por escaleras', porPersona: 14, detalle: '674 escalones, sin cola y la mitad de precio. Se sube en unos 20 minutos parando.' },
        { id: 'abajo', label: 'Sólo verla desde abajo', importe: 0, detalle: 'Desde Trocadéro y el Champ de Mars se ve entera y gratis, que es como sale en las fotos.' }
      ] },
    { id: 'versalles-op', titulo: 'Versalles',
      ayuda: 'Es un día completo y hay varias formas de hacerlo.',
      alts: [
        { id: 'pase', label: 'Pase día completo', porPersona: 32, detalle: 'Palacio, Trianón, aldea de María Antonieta y jardines con espectáculo de fuentes.', recomendado: true },
        { id: 'palacio', label: 'Sólo el palacio', porPersona: 21, detalle: 'La Galería de los Espejos y los apartamentos reales. Media jornada.' },
        { id: 'jardines', label: 'Sólo los jardines', porPersona: 10, detalle: 'Gratis salvo los días de fuentes musicales. Un paseo enorme sin colas.' },
        { id: 'no', label: 'No vamos a Versalles', importe: 0, detalle: 'Un día entero fuera de París que se puede dedicar a Montmartre y al Marais con calma.' }
      ] }
  ],

  hospital: {
    nombre: 'Hôpital Cochin',
    dir: '27 rue du Faubourg Saint-Jacques, 75014 París',
    maps: 'Hôpital Cochin, Paris',
    nota: 'Urgencias 24 h en pleno centro-sur, y con la maternidad de Port-Royal en el mismo recinto. Para algo que no sea urgente, el 116 117 orienta por teléfono fuera del horario de los médicos de cabecera.'
  },

  consejos: [
    { titulo: 'Bonjour no es opcional',
      texto: 'Entrar en una tienda, en una panadería o en un taxi sin decir "bonjour" se considera maleducado y cambia el trato de forma inmediata. Decirlo, aunque sea lo único que se sepa en francés, abre todas las puertas.' },
    { titulo: 'El agua de la jarra es gratis',
      texto: 'En cualquier restaurante se puede pedir "une carafe d\'eau" y la traen sin cobrarla: es obligatorio por ley. No hace falta comprar botella.' },
    { titulo: 'El servicio ya está incluido',
      texto: 'La cuenta lleva el "service compris" por ley: no hay que dejar el 10 %. Redondear un euro o dos si ha ido muy bien es más que suficiente.' },
    { titulo: 'La formule del mediodía',
      texto: 'Muchos bistrós tienen menú de mediodía (entrante y plato, o plato y postre) por 18-24 €, con la misma cocina que por la noche cuesta el doble. Comer fuerte a mediodía y cenar ligero sale mucho más barato.' },
    { titulo: 'Los museos cierran un día distinto cada uno',
      texto: 'El Louvre cierra los martes, el Orsay los lunes, Versalles los lunes y la Orangerie los martes. Un día mal planificado se puede quedar sin nada abierto: conviene mirarlo antes de repartir las visitas.' },
    { titulo: 'Dónde están los carteristas',
      texto: 'Línea 1 del metro, RER B hacia el aeropuerto, escalinata del Sacré-Cœur y los alrededores de la Torre Eiffel. También el truco de la pulsera y el de "¿ha perdido usted este anillo de oro?". No es peligroso: es habilidad.' },
    { titulo: 'Terraza, barra y sala',
      texto: 'El mismo café cuesta tres precios distintos según dónde se tome, y está escrito en la carta: "au comptoir" (barra), "en salle" y "en terrasse". En barra puede ser la mitad.' },
    { titulo: 'Los parques cierran',
      texto: 'El Luxemburgo, las Tullerías y casi todos los jardines públicos cierran al anochecer y tocan una campana quince minutos antes. No es un aviso simbólico: cierran las verjas.' }
  ],

  checklistExtra: [
    { cat: 'París en concreto', items: [
      'Reservar la Torre Eiffel con hora — se agota con semanas',
      'Reservar el Louvre con hora (sin reserva no se entra)',
      'Reservar franja gratuita para Notre-Dame',
      'Mirar qué día cierra cada museo antes de repartir las visitas',
      'Aprenderse "bonjour", "merci" y "au revoir": con eso basta para el 90 % de las situaciones'
    ]}
  ],

  compras: 'Nada de la Torre Eiffel de plástico. Lo que merece la pena: té de Mariage Frères, mostaza y sal de Guérande de una épicerie de barrio, algo de la papelería Papier Tigre y un libro de segunda mano de los bouquinistes del Sena.'
};
