import React, { Component } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import Dropdown from "./dropDown";
import API from "../../../../utils/api";

export default class Bono extends Component {
  constructor() {
    super();
    this.state = {
      cantidad: "",
      idTipoBono: 0,
      tipoBono: [],
    };
  }

  async componentDidMount() {
    var tipoBono = await API.getBonos();
    tipoBono = JSON.parse(
      JSON.stringify(tipoBono).split('"nombre":').join('"value":')
    );
    var ninguno = { id: 0, value: "Ninguno" };
    tipoBono.push(ninguno);
    if (tipoBono != null) {
      this.setState({ tipoBono });
    }
  }

  elegirTipoBono = async (value, index) => {
    await this.setState({
      idTipoBono: this.state.tipoBono[index].id,
    });
    const copia = global.ficha;
    switch (this.props.posicion) {
      case 1:
        copia.tipoB1 = this.state.idTipoBono;
        break;
      case 2:
        copia.tipoB2 = this.state.idTipoBono;
        break;
      case 3:
        copia.tipoB3 = this.state.idTipoBono;
        break;
      case 4:
        copia.tipoB4 = this.state.idTipoBono;
        break;
      default:
        console.log("entro default");
    }
    global.ficha = copia;
  };

  cambiarCantidad = async (cantidad) => {
    if (cantidad !== "") {
      const copia = parseInt(cantidad);
      if (copia >= 0 && copia <= 13) await this.setState({ cantidad });
    } else {
      await this.setState({ cantidad });
    }
    const newCantidad = parseInt(cantidad);
    const copia = global.ficha;
    switch (this.props.posicion) {
      case 1:
        copia.cantB1 = newCantidad;
        break;
      case 2:
        copia.cantB2 = newCantidad;
        break;
      case 3:
        copia.cantB3 = newCantidad;
        break;
      case 4:
        copia.cantB4 = newCantidad;
        break;
      default:
        console.log("entro default");
    }
    global.ficha = copia;
  };

  render() {
    const { tipoBono, cantidad } = this.state;
    return (
      <View>
        {this.props.posicion === 1 ? (
          <View style={styles.container}>
            <View style={styles.column}>
              <Text style={styles.txt1}>Tipo de Bono</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.txt1}>
                Cantidad de personas que lo reciben:
              </Text>
            </View>
          </View>
        ) : null}
        <View style={styles.container}>
          <View style={styles.column}>
            <Dropdown
              label=""
              data={tipoBono}
              onChangeText={this.elegirTipoBono}
            />
          </View>
          <View style={styles.column}>
            <TextInput
              style={styles.input}
              value={cantidad}
              onChangeText={(text) => this.cambiarCantidad(text)}
              keyboardType={"number-pad"}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  column: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  txt1: {
    fontSize: 16,
    color: "black",
    marginBottom: 5,
    textAlign: "center",
  },
  input: {
    width: "80%",
    height: 34,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
});
