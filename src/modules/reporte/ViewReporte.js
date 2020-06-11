import React, {Component} from 'react';
import {View, Platform} from 'react-native';

import Encabezado from '../../components/encabezado';
import Body from './components/body';
import API from '../../../utils/api';

export default class ViewReporte extends Component {
  state = {
    listaTipos: [],
  };

  async componentDidMount () {
    const listaTipos = await API.getTipoProblema ();
    if (listaTipos != null) {
      this.setState ({listaTipos});
    }
  }

  render () {
    return (
      <View>
        <Encabezado
          title="NUESTRAS OBRAS"
          subtitle="REPORTE DE DESPERFECTOS"
          subtitle2="SECRETARIA DE OBRAS PÚBLICAS"
          navigation={this.props.navigation}
        />
        <Body
          idDireccion={1}
          tipos={this.state.listaTipos}
          nombre="Indicar el tipo de daño"
          titulo="Vecino, reporte desperfectos en los mobiliarios y vías públicas, para que podamos prestar un mejor servicio.!"
        />
      </View>
    );
  }
}
