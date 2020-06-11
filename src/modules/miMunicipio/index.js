import React, {Component} from 'react';
import {View, FlatList} from 'react-native';

import API from '../../../utils/api';
import Encabezado from '../../components/encabezado';
import ListaInstituciones from './listaInstituciones';
import Informacion from '../../components/informacion';
import Separator from 'pruebas/src/components/VerticalSeparador';

class ViewMiMunicipio extends Component {
  state = {
    listaTipos: [],
  };

  async componentDidMount () {
    const listaTipos = await API.getTiposInstituciones ();
    if (listaTipos != null) {
      this.setState ({listaTipos});
    }
  }

  renderItem = ({item}) => {
    return <ListaInstituciones {...item} />;
  };

  render () {
    return (
      <View style={{flex: 1}}>
        <Encabezado
          title="MI MUNICIPIO"
          subtitle="GUÍA TELEFÓNICA"
          subtitle2="NÚMEROS DE EMERGENCIA"
          navigation={this.props.navigation}
        />
        <FlatList
          keyExtractor={item => item.nombre.toString ()}
          ItemSeparatorComponent={() => <Separator />}
          data={this.state.listaTipos}
          renderItem={this.renderItem}
        />
        <Informacion />
      </View>
    );
  }
}

export default ViewMiMunicipio;