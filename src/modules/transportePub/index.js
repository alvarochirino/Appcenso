import React, { Component } from "react";
import { View } from "react-native";

import Encabezado from "../../components/encabezado";
import Busqueda from "./Busqueda";

export default class ViewTransportePub extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Encabezado
          title="TRANSPORTE PÚBLICO"
          subtitle="GUÍA DE TRANSP. PÚBLICO"
          navigation={this.props.navigation}
        />
        <Busqueda />
      </View>
    );
  }
}