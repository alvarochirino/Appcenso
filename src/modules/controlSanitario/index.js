import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import DiagnosticoList from './DiagnosticoList';
import Encabezado from '../../components/encabezado';
import AppButton from 'pruebas/src/components/AppButton';

class ControlSanitario extends Component {
  state = {
    id: null,
  };

  async componentDidMount () {
    const id = await AsyncStorage.getItem ('@User:id');
    if (id !== null) this.setState ({id});
  }

  _onPress = id => {
    this.props.navigation.navigate ('InfoEnfermedad', {
      idEnfermedad: id,
      mostrar: true,
    });
  };

  render () {
    return (
      <View style={styles.container}>
        <Encabezado
          title="DIAGNOSTICO DIFERENCIAL"
          navigation={this.props.navigation}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={styles.containerButton}>
            <AppButton title="COVID" action={() => this._onPress (1)} />
          </View>
          <View style={styles.containerButton}>
            <AppButton title="DENGUE" action={() => this._onPress (2)} />
          </View>
        </View>
        {this.state.id !== null
          ? <DiagnosticoList navigation={this.props.navigation} />
          : <Text style={styles.txt}>
              Para realizar un diagnostico debe registrarse
            </Text>}
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
  containerButton: {flex: 1, alignItems: 'center'},
  txt: {
    fontSize: 16,
    color: 'black',
    marginHorizontal: 10,
  },
});

export default ControlSanitario;
