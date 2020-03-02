import React, { Component } from 'react';
import { View, Platform, StyleSheet, Text } from 'react-native';

import Encabezado from '../../components/encabezado'
import Entradas from './components/entradas'

export default class ViewMisImpuestos extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Encabezado title="MIS IMPUESTOS" subtitle="COMO VAMOS!!" subtitle2="SECRETARIA DE ADMINISTRACIÓN" navigation={this.props.navigation}/>
        <Entradas />       
      </View>
    )
  }

}