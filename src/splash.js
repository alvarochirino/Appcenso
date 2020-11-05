import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Linking, Alert } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

import API from '../utils/api';

export default class Splash extends Component {
  componentDidMount() {
    this._loadInnitialState().done();
    SplashScreen.hide();
  }

  _loadInnitialState = async () => {
    const VERSION_ACTUAL = '2.0';
    let versionDB = await API.getVersion()
    if (VERSION_ACTUAL !== versionDB) {
      Alert.alert(
        'Actualización',
        'Hay una nueva version de la aplicación, actualizela desde la play store para tener una mejor experiencia',
        [
          {
            text: 'IR',
            onPress: () => {
              Linking.openURL('market://details?id=com.smartapp_yc');
            },
          },
        ],
        { cancelable: false }
      );
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Login' })],
      });
      this.props.navigation.dispatch(resetAction);
    } else {
      var value = await AsyncStorage.getItem('@User:token');
      console.log('tokenuser?', value);
      var id = await AsyncStorage.getItem('@User:id');
      if (id === null) {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Login' })],
        });
        this.props.navigation.dispatch(resetAction);
      } else {
        let estado = await API.usuarioActivo(id);
        estado = estado.estado
        console.log(estado)
        if (estado == 'Activo') {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
          });
          this.props.navigation.dispatch(resetAction);
        } else {
          if (estado === null) {
            Alert.alert('Alerta', 'En este momento no tiene conexión a internet');
          } else {
            Alert.alert('Alerta', 'Usted se encuentra bloqueado temporalmente');
          }
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
          });
          this.props.navigation.dispatch(resetAction);
        }
      }
    }

  };

  render() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
