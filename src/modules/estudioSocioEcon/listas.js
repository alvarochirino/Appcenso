export const ficha = {
  numInmu: 0,
  idTipoFamilia: 0,
  cantFamilia: 0,
  descripT1: '',
  tipoT1: 0,
  ingresoT1: 0,
  descripT2: '',
  tipoT2: 0,
  ingresoT2: 0,
  descripT3: '',
  tipoT3: 0,
  ingresoT3: 0,
  tipoB1: 0,
  cantB1: 0,
  tipoB2: 0,
  cantB2: 0,
  tipoB3: 0,
  cantB3: 0,
  tipoB4: 0,
  cantB4: 0,
  idTenencia: 0,
  agua: 1,
  alcant: 1,
  luz: 1,
  gas: 1,
  tvcable: 1,
  internet: 1,
  basura: 1,
  centroSalud: 1,
  atencMedica: 1,
  cuidadoEsp: 1,
  covid: 1,
  observac: '',
  lat: null,
  lon: null,
  foto: null,
  idUsuario: null,
};

export const tipoFamilia = [
  {
    id: 1,
    value: 'Nuclear',
    aclaracion: 'Papas e Hijos',
  },
  {
    id: 2,
    value: 'Monoparental',
    aclaracion: 'Solo un papá o mamá',
  },
  {
    id: 3,
    value: 'Ensamblada',
    aclaracion: 'De segundo matrimonio',
  },
  {
    id: 4,
    value: 'Consanguinea',
    aclaracion: 'Extensa con abuelos y/o tios',
  },
];

export const cantidad = [
  {
    id: 1,
    value: '1',
  },
  {
    id: 2,
    value: '2',
  },
  {
    id: 3,
    value: '3',
  },
  {
    id: 4,
    value: '4',
  },
  {
    id: 5,
    value: '5',
  },
  {
    id: 6,
    value: '6',
  },
  {
    id: 7,
    value: '7',
  },
  {
    id: 8,
    value: '8',
  },
  {
    id: 9,
    value: '9',
  },
  {
    id: 10,
    value: '10',
  },
  {
    id: 11,
    value: 'Más que 10',
  },
];

export const trabajosImp = [
  {
    id: 1,
    posicion: 'primer',
  },
  {
    id: 2,
    posicion: 'segundo',
  },
  {
    id: 3,
    posicion: 'tercer',
  },
];

export const tipoTenencia = [
  {
    id: 1,
    value: 'Propia',
  },
  {
    id: 2,
    value: 'Alquilada',
  },
  {
    id: 3,
    value: 'Anticrético',
  },
  {
    id: 4,
    value: 'Cedida o caseros',
  },
  {
    id: 5,
    value: 'Otros',
  },
];

export const servicios = [
  {
    id: 1,
    servicio: 'Agua',
  },
  {
    id: 2,
    servicio: 'Alcantarrillado',
  },
  {
    id: 3,
    servicio: 'Energía eléctrica',
  },
  {
    id: 4,
    servicio: 'Gas domiciliario',
  },
  {
    id: 5,
    servicio: 'Tv. por cable',
  },
  {
    id: 6,
    servicio: 'Internet',
  },
  {
    id: 7,
    servicio: 'Recojo de basura',
  },
  {
    id: 10,
    servicio: '¿En su barrio existe un centro de salud?',
    pregunta: true,
  },
  {
    id: 11,
    servicio: '¿Su familia recurre periódicamente a atenciones médicas?',
    pregunta: true,
  },
  {
    id: 12,
    servicio: '¿Un integrante de la familia necesita atención médica especial?',
    pregunta: true,
  },
  {
    id: 13,
    servicio: '¿Hubo algún caso de COVID en su familia?',
    pregunta: true,
  },
];
