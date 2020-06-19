import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import API from '../../../utils/api';

export default class FormRegister extends Component {
  state = {
    nombre1: '',
    nombre2: '',
    apellido1: '',
    apellido2: '',
    celular: '',
    email: null,
    password: '',
    emailValido: false,
    password2: '',
    mostrarBoton: true,
  };

  validate (text) {
    email = /^[^@]+@[^@]+\.[a-zA-Z]{2,4}$/;
    if (email.test (text)) {
      this.setState ({
        email: text,
        emailValido: true,
      });
    } else {
      this.setState ({
        emailValido: false,
      });
    }
  }

  _registrar = async () => {
    //console.log(this.state);
    const {
      nombre1,
      nombre2,
      apellido1,
      apellido2,
      celular,
      email,
      password,
      password2,
    } = this.state;
    if (nombre1 === '') {
      Alert.alert ('Requerido', 'Ingrese nombre');
    } else if (apellido1 === '') {
      Alert.alert ('Requerido', 'Ingrese primer apellido');
    } else if (celular === '') {
      Alert.alert ('Requerido', 'Ingrese número de celular');
    } else if (password.length < 6) {
      Alert.alert (
        'Requerido',
        'La contraseña debe tener un mínimo de 6 caracteres'
      );
    } else if (password !== password2) {
      Alert.alert ('Alerta', 'las passwords no coinciden');
    } else {
      this.setState ({mostrarBoton: false});
      await API.registroUsuario (
        nombre1,
        nombre2,
        apellido1,
        apellido2,
        parseInt (celular),
        email,
        password
      ).then (responseData => {
        if (responseData != null) {
          if (responseData == 'The given data was invalid.') {
            this.setState ({mostrarBoton: true});
            Alert.alert ('Número de celular ya existente');
          } else if (responseData.message == 'usuario creado correctamente') {
            Alert.alert ('Registro realizado correctamente');
            API.login (celular, password).then (responseData => {
              console.log ('responseData', responseData);
              if (responseData.access_token != null) {
                const {access_token, user} = responseData;
                try {
                  AsyncStorage.setItem ('@User:token', access_token);
                  AsyncStorage.setItem ('@User:id', user.id.toString ());
                } catch (e) {
                  console.error ('@user', e.error);
                }
                /* console.log("NewToken", AsyncStorage.getItem("@User:token"));
                  console.log("User:id", AsyncStorage.getItem("@User:id")); */
                const resetAction = StackActions.reset ({
                  index: 0,
                  actions: [NavigationActions.navigate ({routeName: 'Home'})],
                });
                this.props.navigation.dispatch (resetAction);
              } else {
                const resetAction = StackActions.reset ({
                  index: 0,
                  actions: [NavigationActions.navigate ({routeName: 'Login'})],
                });
                this.props.navigation.dispatch (resetAction);
              }
            });
          } else {
            this.setState ({mostrarBoton: true});
            Alert.alert ('Ocurrio un error, vuelva a intentar');
          }
        }
      });
    }
  };

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.text}>PRIMER NOMBRE:</Text>
          <TextInput
            style={styles.input}
            maxLength={20}
            onChangeText={text => this.setState ({nombre1: text})}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>SEGUNDO NOMBRE:</Text>
          <TextInput
            style={styles.input}
            maxLength={20}
            onChangeText={text => this.setState ({nombre2: text})}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>PRIMER APELLIDO:</Text>
          <TextInput
            style={styles.input}
            maxLength={20}
            onChangeText={text => this.setState ({apellido1: text})}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>SEGUNDO APELLIDO:</Text>
          <TextInput
            style={styles.input}
            maxLength={20}
            onChangeText={text => this.setState ({apellido2: text})}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Nº CELULAR:</Text>
          <TextInput
            style={styles.input}
            maxLength={15}
            onChangeText={text => this.setState ({celular: text})}
            keyboardType={'number-pad'}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>CORREO ELECTRONICO:</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.validate (text)}
            keyboardType={'email-address'}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>CONTRASEÑA:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={text => this.setState ({password: text})}
          />
        </View>
        <View style={styles.row}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.txt1}>CONFIRMACION DE</Text>
            <Text style={styles.text}>CONTRASEÑA:</Text>
          </View>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={text => this.setState ({password2: text})}
          />
        </View>
        {this.state.mostrarBoton
          ? <TouchableOpacity onPress={this._registrar} style={styles.button}>
              <Text style={styles.buttonText}>REGISTRAR</Text>
            </TouchableOpacity>
          : <ActivityIndicator style={{margin: 14}} />}
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {alignItems: 'center', padding: 6},
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 4,
  },
  text: {
    width: 99,
    fontSize: 10,
    fontFamily: 'ConthraxSb-Regular',
    color: 'black',
  },
  input: {
    width: '68%',
    height: 34,
    backgroundColor: 'silver',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  txt1: {
    fontSize: 7,
    fontFamily: 'ConthraxSb-Regular',
    width: 100,
    color: 'black',
  },
  button: {
    backgroundColor: '#2196F3',
    width: '38%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'ConthraxSb-Regular',
  },
  dropdown1: {width: '68%', alignItems: 'center'},
  dropdown2: {width: '28%', alignItems: 'center'},
});
