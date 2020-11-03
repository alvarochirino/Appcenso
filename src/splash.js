import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator, Text, Alert} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions, NavigationActions} from 'react-navigation';

import API from '../utils/api';

export default class Splash extends Component {
  componentDidMount () {
    this._loadInnitialState ().done ();
    SplashScreen.hide ();
  }

  _loadInnitialState = async () => {
    var value = await AsyncStorage.getItem ('@User:token');
    var id = await AsyncStorage.getItem ('@User:id');
    var estado = 'Activo';
    if (id !== null) {
      var activo = await API.usuarioActivo (id);
      console.log ('activo?', activo == null);
      if (activo == null) {
        estado = 'Bloqueado';
      } else {
        estado = activo.estado;
      }
    }
    console.log ('id?', id);
    console.log ('estado?', estado);
    console.log ('tokenuser?', value);
    if (value !== null && estado == 'Activo') {
      const resetAction = StackActions.reset ({
        index: 0,
        actions: [NavigationActions.navigate ({routeName: 'Home'})],
      });
      this.props.navigation.dispatch (resetAction);
    } else {
      if (estado != 'Activo') {
        Alert.alert ('Alerta', 'En este momento no tiene conexión a internet');
      }
      const resetAction = StackActions.reset ({
        index: 0,
        actions: [NavigationActions.navigate ({routeName: 'Login'})],
      });
      this.props.navigation.dispatch (resetAction);
    }
  };

  render () {
    return (
      <View style={styles.container}>
        {/* <Image 
              style={{ alignItems: 'center', height: 200, width: 200 }} 
              source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Rotating_earth_%28large%29.gif/200px-Rotating_earth_%28large%29.gif'}} /> */}
        <ActivityIndicator />
        {/* <Text>Cargando...</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
