import React, {Component} from 'react';
import {View, StyleSheet, Text, Alert, Linking} from 'react-native';

import API from 'pruebas/utils/api';
import Encabezado from '../../components/encabezado';
import AppButton from 'pruebas/src/components/AppButton';
import AsyncStorage from '@react-native-community/async-storage';

class Diagnostico extends Component {
  constructor (props) {
    super (props);
    this.state = {
      enfermedad: null,
      getResultado: props.navigation.getParam ('resultado', null),
    };
  }

  async componentDidMount () {
    const idEnfermedad = this.props.navigation.getParam ('idEnfermedad', 0);
    const enfermedad = await API.getEnfermedad (idEnfermedad);
    if (enfermedad != null) {
      this.setState ({enfermedad});
    }
  }

  _llamarEmerg = async numero => {
    let data = {
      idEnfermedad: this.props.navigation.getParam ('idEnfermedad', 0),
    };
    data.latitud = await AsyncStorage.getItem ('@Reporte:latitud');
    data.longitud = await AsyncStorage.getItem ('@Reporte:longitud');
    const idUsuario = await AsyncStorage.getItem ('@User:id');
    data.idUsuario = parseInt (idUsuario);
    let guardo = await API.guardarUbicacion (data);
    //console.warn ('guardo', guardo);
    if (numero) {
      Linking.openURL (`tel:${numero}`);
    }
  };

  render () {
    const {enfermedad, getResultado} = this.state;
    const {tel1} = enfermedad || {};
    const {id, resultado, recomend} = getResultado || {};
    return (
      <View style={styles.container}>
        <Encabezado
          title="DIAGNOSTICO DIFERENCIAL"
          navigation={this.props.navigation}
        />
        {id === 1 || id === 4
          ? <View>
              <View style={{backgroundColor: '#70ef0d'}}>
                <Text style={styles.txt}>{resultado}</Text>
              </View>
              <Text style={styles.txt1}>RECOMENDACION</Text>
              <Text style={styles.txt2}>{recomend}</Text>
            </View>
          : id === 2 || id === 5
              ? <View>
                  <View style={{backgroundColor: '#efbf0d'}}>
                    <Text style={styles.txt}>{resultado}</Text>
                  </View>
                  <Text style={styles.txt1}>RECOMENDACION</Text>
                  <Text style={styles.txt2}>{recomend}</Text>
                </View>
              : <View style={styles.containerCenter}>
                  <View style={{backgroundColor: '#ef0d55'}}>
                    <Text style={styles.txt}>{resultado}</Text>
                  </View>
                  <Text style={styles.txt1}>RECOMENDACION</Text>
                  <Text style={styles.txt2}>{recomend}</Text>
                  <AppButton
                    title="ASISTENCIA MÉDICA"
                    action={() => this._llamarEmerg (tel1)}
                    color={'#ef0d55'}
                  />
                </View>}

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
  txt: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
});

export default Diagnostico;
