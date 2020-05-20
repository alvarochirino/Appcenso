import React, { Component } from "react";
import { View, Platform } from "react-native";

import Encabezado from "../../components/encabezado";
import Busqueda from "./components/busqueda";

export default class ViewTransportePub extends Component {
  constructor(props) {
    super(props);
  }

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