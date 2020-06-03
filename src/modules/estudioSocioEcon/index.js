import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import Formulario from "./formulario";
import Encabezado from "../../components/encabezado";

export default class FichaEstudio extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Encabezado
          title="SOLICITUD"
          subtitle="DE CANASTA FAMILIAR"
          navigation={this.props.navigation}
        />
        <Formulario navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    margin: 5,
  }
});
