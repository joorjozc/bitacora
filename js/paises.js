/* ============================================================
   Bitácora — datos por país
   Lo que no depende de la ciudad sino del país: teléfonos de
   emergencia, enchufes, moneda, propina, agua del grifo.
   Un pack de destino sólo declara su país y hereda todo esto.
   ============================================================ */

var PAISES = {

  it: {
    nombre: 'Italia',
    gentilicio: 'italiano',
    idioma: 'it',
    moneda: 'EUR',
    simbolo: '€',
    ue: true,
    emergencias: [
      { label: 'Emergencias (todo)', valor: '112', tel: '112', destacado: true },
      { label: 'Emergencia sanitaria', valor: '118', tel: '118' },
      { label: 'Policía', valor: '113', tel: '113' }
    ],
    enchufe: 'Tipo L y F. Los italianos tipo L son más finos que los nuestros: conviene llevar un ladrón o un adaptador.',
    agua: 'El agua del grifo es potable en todo el país y las fuentes públicas también.',
    propina: 'No es obligatoria. Casi todos los restaurantes cobran 2-4 € de coperto por persona, y tiene que estar en la carta.',
    tarjeta: 'Se paga con tarjeta casi en todas partes, pero conviene llevar algo de efectivo para bares pequeños y baños públicos.',
    sanidad: 'Con la Tarjeta Sanitaria Europea la atención pública cuesta lo mismo que a un italiano: sólo el ticket.',
    roaming: 'Es Unión Europea: la tarifa española funciona sin coste extra.'
  },

  fr: {
    nombre: 'Francia',
    gentilicio: 'francés',
    idioma: 'fr',
    moneda: 'EUR',
    simbolo: '€',
    ue: true,
    emergencias: [
      { label: 'Emergencias (todo)', valor: '112', tel: '112', destacado: true },
      { label: 'Emergencia sanitaria (SAMU)', valor: '15', tel: '15' },
      { label: 'Policía', valor: '17', tel: '17' }
    ],
    enchufe: 'Tipo E. El nuestro entra, pero el enchufe francés lleva una clavija macho de tierra: los cargadores planos pueden no apoyar bien.',
    agua: 'El agua del grifo es potable. Pedir "une carafe d\'eau" en un restaurante es gratis y normal.',
    propina: 'El servicio va incluido por ley ("service compris"). Se redondea y ya está.',
    tarjeta: 'Tarjeta en todas partes, incluso para importes de 2 €. El efectivo casi no hace falta.',
    sanidad: 'Con la Tarjeta Sanitaria Europea se adelanta el pago y luego se reembolsa, o se atiende directamente en urgencias hospitalarias.',
    roaming: 'Es Unión Europea: la tarifa española funciona sin coste extra.'
  },

  pt: {
    nombre: 'Portugal',
    gentilicio: 'portugués',
    idioma: 'pt',
    moneda: 'EUR',
    simbolo: '€',
    ue: true,
    emergencias: [
      { label: 'Emergencias (todo)', valor: '112', tel: '112', destacado: true },
      { label: 'Línea de salud (SNS 24)', valor: '808 24 24 24', tel: '+351808242424' },
      { label: 'Policía (PSP)', valor: '112', tel: '112' }
    ],
    enchufe: 'Tipo F, el mismo que en España. No hace falta adaptador.',
    agua: 'El agua del grifo es potable y buena. Pedir agua de la jarra en un restaurante no siempre se estila, pero se puede.',
    propina: 'No es obligatoria: 5-10 % si ha ido muy bien. Ojo con el "couvert" (pan, aceitunas, queso) que ponen sin pedirlo: se paga y se puede rechazar.',
    tarjeta: 'Tarjeta en casi todo. En tascas antiguas y en algún mercado todavía piden efectivo.',
    sanidad: 'Con la Tarjeta Sanitaria Europea la atención pública cuesta lo mismo que a un portugués.',
    roaming: 'Es Unión Europea: la tarifa española funciona sin coste extra.'
  },

  es: {
    nombre: 'España',
    gentilicio: 'español',
    idioma: 'es',
    moneda: 'EUR',
    simbolo: '€',
    ue: true,
    emergencias: [
      { label: 'Emergencias (todo)', valor: '112', tel: '112', destacado: true }
    ],
    enchufe: 'Tipo F, el de casa.',
    agua: 'El agua del grifo es potable.',
    propina: 'No es obligatoria. Se redondea.',
    tarjeta: 'Tarjeta en todas partes.',
    sanidad: 'Tarjeta sanitaria del SNS.',
    roaming: 'Estás en casa.'
  },

  gb: {
    nombre: 'Reino Unido',
    gentilicio: 'británico',
    idioma: 'en',
    moneda: 'GBP',
    simbolo: '£',
    ue: false,
    emergencias: [
      { label: 'Emergencias (todo)', valor: '999', tel: '999', destacado: true },
      { label: 'Emergencias (alternativo)', valor: '112', tel: '112' },
      { label: 'Salud no urgente (NHS)', valor: '111', tel: '111' }
    ],
    enchufe: 'Tipo G, de tres clavijas planas. Hace falta adaptador sí o sí.',
    agua: 'El agua del grifo es potable en todo el país.',
    propina: 'En restaurantes con servicio de mesa, 10-12,5 %, y muchas veces ya viene sumada en la cuenta como "service charge". En pubs, donde se pide en la barra, no se deja nada.',
    tarjeta: 'Tarjeta y móvil en todas partes, incluso en el autobús. El efectivo casi ha desaparecido.',
    sanidad: 'La Tarjeta Sanitaria Europea ya no vale; hace falta la GHIC o un seguro de viaje. Urgencias (A&E) atiende siempre.',
    roaming: 'Ya no es Unión Europea: hay que mirar si la tarifa incluye Reino Unido o se activan datos de pago.'
  },

  nl: {
    nombre: 'Países Bajos',
    gentilicio: 'neerlandés',
    idioma: 'en',
    moneda: 'EUR',
    simbolo: '€',
    ue: true,
    emergencias: [
      { label: 'Emergencias (todo)', valor: '112', tel: '112', destacado: true }
    ],
    enchufe: 'Tipo F, el mismo que en España.',
    agua: 'El agua del grifo es de las mejores de Europa.',
    propina: 'No es obligatoria. Se redondea o se deja un 5 %.',
    tarjeta: 'Ojo: muchos sitios sólo aceptan tarjetas de débito Maestro y rechazan Visa/Mastercard de crédito. Conviene llevar débito y algo de efectivo.',
    sanidad: 'Con la Tarjeta Sanitaria Europea la atención pública está cubierta.',
    roaming: 'Es Unión Europea: la tarifa española funciona sin coste extra.'
  }
};

/* Consejos que valen para cualquier ciudad. El motor los mezcla con
   los propios del destino y recorta a diez. */
function consejosDePais(codigo) {
  var p = PAISES[codigo] || PAISES.es;
  return [
    { titulo: 'El agua', texto: p.agua },
    { titulo: 'Enchufes', texto: p.enchufe },
    { titulo: 'Propinas y cuenta', texto: p.propina },
    { titulo: 'Pagar', texto: p.tarjeta },
    { titulo: 'Si hay que ir al médico', texto: p.sanidad },
    { titulo: 'Datos y wifi', texto: p.roaming + ' Aun así, esta app funciona sin conexión: conviene descargar también el mapa de la ciudad en Google Maps antes de salir.' }
  ];
}
