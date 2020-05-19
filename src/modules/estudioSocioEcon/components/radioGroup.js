import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

export default class RadioGroupComp extends Component {
  state = {
    opcion: '1',
    opciones: [
      {
        label: 'SI',
        value: '1',
      },
      {
        label: 'NO',
        value: '0',
      },
    ],
  };

  onPress = async () => {
    await this.setState ({
      opcion: this.state.opciones.find (e => e.selected == true).value,
    });
    const copia = global.ficha;
    switch (this.props.id) {
      case 1:
        copia.agua = parseInt (this.state.opcion);
        break;
      case 2:
        copia.alcant = parseInt (this.state.opcion);
        break;
      case 3:
        copia.luz = parseInt (this.state.opcion);
        break;
      case 4:
        copia.gas = parseInt (this.state.opcion);
        break;
      case 5:
        copia.tvcable = parseInt (this.state.opcion);
        break;
      case 6:
        copia.internet = parseInt (this.state.opcion);
        break;
      case 7:
        copia.basura = parseInt (this.state.opcion);
        break;
      case 8:
        copia.otro = parseInt (this.state.opcion);
        break;
      case 10:
        copia.centroSalud = parseInt (this.state.opcion);
        break;
      case 11:
        copia.atencMedica = parseInt (this.state.opcion);
        break;
      case 12:
        copia.cuidadoEsp = parseInt (this.state.opcion);
        break;
      case 13:
        copia.covid = parseInt (this.state.opcion);
        break;
      default:
        console.log ('entro default');
    }
    global.ficha = copia;
  };

  render () {
    const {servicio, pregunta} = this.props;
    const {opciones} = this.state;
    if (pregunta) {
      return (
        <View style={styles.container1}>
          <Text style={styles.txt1}>{servicio}</Text>
          <RadioGroup
            radioButtons={opciones}
            onPress={this.onPress}
            flexDirection="row"
          />
        </View>
      );
    }
    return (
      <View style={styles.container2}>
        <Text style={styles.txt2}>{servicio}</Text>
        <RadioGroup
          radioButtons={opciones}
          onPress={this.onPress}
          flexDirection="row"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container1: {
    alignItems: 'center',
  },
  container2: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  txt1: {
    fontSize: 16,
    textAlign: 'center',
    margin: 4,
    color: '#000',
  },
  txt2: {
    flex: 1,
    fontSize: 16,
    margin: 4,
    color: '#000',
  },
});
