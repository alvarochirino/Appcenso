import React, {Component} from 'react';
import {View, StyleSheet, Text, Linking, ScrollView} from 'react-native';

import API from 'pruebas/utils/api';
import Encabezado from '../../components/encabezado';
import AppButton from 'pruebas/src/components/AppButton';

class Enfermedad extends Component {
  constructor (props) {
    super (props);
    this.state = {
      enfermedad: null,
    };
  }

  async componentDidMount () {
    const idEnfermedad = this.props.navigation.getParam ('idEnfermedad', 0);
    const enfermedad = await API.getEnfermedad (idEnfermedad);
    if (enfermedad != null) {
      this.setState ({enfermedad});
    }
  }

  render () {
    const {enfermedad} = this.state;
    const {
      nombre,
      explicacion,
      tratamiento,
      prevencion,
      tel2,
    } = enfermedad || {};
    return (
      <View style={styles.container}>
        <Encabezado
          title="DATOS DE LA ENFERMEDAD"
          navigation={this.props.navigation}
        />
        {enfermedad &&
          <ScrollView>
            <Text style={styles.txt1}>{nombre}</Text>
            <Text style={styles.txt2}>{explicacion}</Text>
            <Text style={styles.txt1}>TRATAMIENTO</Text>
            <Text style={styles.txt2}>{tratamiento}</Text>
            <Text style={styles.txt1}>PREVENCION</Text>
            <Text style={styles.txt2}>{prevencion}</Text>
            <View style={styles.containerCenter}>
              <AppButton
                title="CONSULTA MÉDICA"
                action={() => tel2 && Linking.openURL (`tel:${tel2}`)}
                color={'rgb(38, 168, 193)'}
              />
            </View>
          </ScrollView>}
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
