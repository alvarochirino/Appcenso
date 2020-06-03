import React, {Component} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';

import API from 'pruebas/utils/api';
import Encabezado from '../../components/encabezado';
import AppButton from 'pruebas/src/components/AppButton';

class Enfermedad extends Component {
  constructor (props) {
    super (props);
    this.state = {
      getEnfermedad: null,
    };
  }

  async componentDidMount () {
    const getEnfermedad = await API.getEnfermedad (2);
    if (getEnfermedad != null) {
      this.setState ({getEnfermedad});
    }
  }

  _asistenciaMedica = (tel1, tel2) => {
    Alert.alert (
      'Asistencia Médica',
      'Puede comunicarse con los siguientes numeros: ' + tel1 + ' ó ' + tel2,
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'LLamar',
          onPress: () => {},
        },
      ],
      {cancelable: false}
    );
  };

  _reporte = () => {};

  render () {
    const {getEnfermedad} = this.state;
    const {
      enfermedad,
      explicacion,
      tratamiento,
      prevencion,
      tel1,
      tel2,
    } = getEnfermedad || {};
    return (
      <View style={styles.container}>
        <Encabezado
          title="DIAGNOSTICO DIFERENCIAL"
          navigation={this.props.navigation}
        />
        {getEnfermedad
          ? <View>
              <Text style={styles.txt1}>{enfermedad}</Text>
              <Text style={styles.txt2}>{explicacion}</Text>
              <Text style={styles.txt1}>TRATAMIENTO</Text>
              <Text style={styles.txt2}>{tratamiento}</Text>
              <Text style={styles.txt1}>PREVENCION</Text>
              <Text style={styles.txt2}>{prevencion}</Text>
              <View style={styles.containerCenter}>
                <AppButton
                  title="ASISTENCIA MÉDICA"
                  action={() => this._asistenciaMedica (tel1, tel2)}
                  color={'rgb(38, 168, 193)'}
                />
                <AppButton
                  title="REPORTE DE LOCALIZACIÓN"
                  action={() => this._reporte ()}
                  color={'#0066ff'}
                />
              </View>
            </View>
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 5,
  },
  containerCenter: {
    alignItems: 'center',
  },
  txt1: {
    fontSize: 20,
    color: 'black',
    margin: 10,
    textAlign: 'center',
  },
  txt2: {
    fontSize: 14,
    color: 'black',
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default Enfermedad;
