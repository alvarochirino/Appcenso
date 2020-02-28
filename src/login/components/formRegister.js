import React, { Component } from 'react';
import {
   StyleSheet, TextInput, View, Text, TouchableOpacity, Alert, ActivityIndicator, Image,
   Animated, Dimensions, Keyboard, UIManager
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import API from '../../../utils/api'

const { State: TextInputState } = TextInput;

export default class FormRegister extends Component {

   constructor(props) {
      super(props);

      this.state = {
         nombre: '',
         nombreValido: false,
         correo: '',
         correoValido: false,
         contraseña: '',
         contraseñaValido: false,
         contraseña2: '',
         contraseña2Valido: false,
         mostrarBoton: true,
         shift: new Animated.Value(0),
      };
   }

   componentWillMount() {
      this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
      this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
   }

   componentWillUnmount() {
      this.keyboardDidShowSub.remove();
      this.keyboardDidHideSub.remove();
   }

   validate(text, type) {
      email = /^[^@]+@[^@]+\.[a-zA-Z]{2,4}$/
      password = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
      if (type == 'nombre') {
         this.setState({
            nombre: text,
            nombreValido: true
         })
      }
      if (type == 'correo') {
         if (email.test(text)) {
            this.setState({
               correo: text,
               correoValido: true
            })
         } else {
            this.setState({
               correoValido: false
            })
         }
      }
      if (type == 'contraseña') {
         if (password.test(text)) {
            this.setState({
               contraseña: text,
               contraseñaValido: true
            })
         } else {
            this.setState({
               contraseñaValido: false
            })
         }
      }
      if (type == 'contraseña2') {
         this.setState({
            contraseña2: text
         })
      }
   }

   _onPressButton = () => {
      if (!this.state.nombreValido) {
         Alert.alert('nombre incorrecto')
      } else if (!this.state.correoValido) {
         Alert.alert('correo incorrecto')
      } else if (!this.state.contraseñaValido) {
         Alert.alert('proporciona otro password')
      } else if (this.state.contraseña != this.state.contraseña2) {
         Alert.alert('las contraseñas no coinciden')
      } else {
         this.setState({ mostrarBoton: false })
         API.registroUsuario(this.state.nombre, this.state.correo, this.state.contraseña)
            .then((responseData) => {
               if (responseData != null) {
                  if (responseData == 'The given data was invalid.') {
                     this.setState({ mostrarBoton: true })
                     Alert.alert("Correo de usuario ya existente")
                  } else if (responseData.message == 'usuario creado correctamente') {
                     Alert.alert('Registro realizado correctamente')
                     API.login(this.state.correo, this.state.contraseña)
                        .then((responseData) => {
                           console.log('responseData', responseData)
                           if (responseData.access_token != null) {
                              try {
                                 AsyncStorage.setItem('@User:access_token', responseData.access_token);
                                 AsyncStorage.setItem('@User:id', responseData.user.id.toString());
                                 AsyncStorage.setItem('@User:ultimoCorreo', responseData.user.email);
                              } catch (e) {
                                 console.error('@user', e.error)
                              }
                              /* console.log('NewTokenuser', AsyncStorage.getItem('@User:access_token'))
                              console.log('User:id', AsyncStorage.getItem('@User:id')) */
                              const resetAction = StackActions.reset({
                                 index: 0,
                                 actions: [NavigationActions.navigate({ routeName: 'Home' })],
                              });
                              this.props.navigation.dispatch(resetAction);
                           } else {
                              const resetAction = StackActions.reset({
                                 index: 0,
                                 actions: [NavigationActions.navigate({ routeName: 'Login' })],
                              });
                              this.props.navigation.dispatch(resetAction);
                           }
                        })
                  } else {
                     this.setState({ mostrarBoton: true })
                     Alert.alert("Ocurrio un error, vuelva a intentar")
                  }
               }
            })

      }
   }

   render() {
      const { shift } = this.state;
      return (
         <Animated.View style={[styles.container, { transform: [{ translateY: shift }] }]}>
            <Image
               source={require('../../../assets/escudo.jpg')}
               style={styles.image}
            />
            <Text style={styles.titulo}>REGISTRO DE USUARIO</Text>
            <View style={styles.row}>
               <Text style={styles.text}>NOMBRE USUARIO:</Text>
               <TextInput
                  style={styles.input}
                  onChangeText={(text) => this.validate(text, 'nombre')}
               />
            </View>
            <View style={styles.row}>
               <Text style={styles.text}>CORREO ELECTRONICO:</Text>
               <TextInput
                  style={styles.input}
                  onChangeText={(text) => this.validate(text, 'correo')}
                  keyboardType={'email-address'}
               />
            </View>
            <View style={styles.row}>
               <Text style={styles.text}>CONTRASEÑA:</Text>
               <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={(text) => this.validate(text, 'contraseña')}
               />
            </View>
            <View style={styles.row}>
               <Text style={styles.text}></Text>
               <View style={{ width: '68%', paddingLeft: 2 }}>
                  <Text style={styles.text2}>* La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, mayúsculas y minúsculas.</Text>
                  <Text style={styles.text3}>No puede tener otros símbolos.</Text>
               </View>
            </View>
            <View style={styles.row}>
               <View style={{ flexDirection: 'column', }}>
                  <Text style={styles.text1}>CONFIRMACION DE</Text>
                  <Text style={styles.text}>CONTRASEÑA:</Text>
               </View>
               <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={(text) => this.validate(text, 'contraseña2')}
                  onSubmitEditing={this._onPressButton}
               />
            </View>
            {this.state.mostrarBoton ?
               <TouchableOpacity onPress={this._onPressButton} style={styles.button}>
                  <Text style={styles.buttonText}>REGISTRAR</Text>
               </TouchableOpacity>
               : <ActivityIndicator style={{ margin: 14 }} />
            }
            <Image
               source={require('../../../assets/logo.png')}
               style={styles.logo}
            />
         </Animated.View>
      );
   }

   handleKeyboardDidShow = (event) => {
      const { height: windowHeight } = Dimensions.get('window');
      const keyboardHeight = event.endCoordinates.height;
      const currentlyFocusedField = TextInputState.currentlyFocusedField();
      UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
         const fieldHeight = height;
         const fieldTop = pageY;
         const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
         if (gap >= 0) {
            return;
         }
         Animated.timing(
            this.state.shift,
            {
               toValue: gap,
               duration: 1000,
               useNativeDriver: true,
            }
         ).start();
      });
   }

   handleKeyboardDidHide = () => {
      Animated.timing(
         this.state.shift,
         {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
         }
      ).start();
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: 10,
   },
   image: {
      height: '23%',
      width: '32%',
      resizeMode: 'contain',
   },
   titulo: {
      fontSize: 17,
      textAlign: 'center',
      fontFamily: 'ConthraxSb-Regular',
      color: 'black',
      margin: 6,
   },
   row: {
      alignItems: 'center',
      flexDirection: 'row',
      margin: 5,
      //backgroundColor: 'red'
   },
   text: {
      fontSize: 10,
      fontFamily: 'ConthraxSb-Regular',
      width: 99,
      color: 'black',
   },
   input: {
      width: '68%',
      height: 36,
      backgroundColor: 'silver',
      borderRadius: 10,
   },
   text1: {
      fontSize: 7,
      fontFamily: 'ConthraxSb-Regular',
      width: 100,
      color: 'black',
   },
   text2: {
      fontSize: 11,
      color: 'gray',
   },
   text3: {
      fontSize: 11,
      color: 'gray',
      marginTop: 4,
   },
   button: {
      backgroundColor: '#2196F3',
      width: '38%',
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 10,
      marginVertical: 5
   },
   buttonText: {
      fontSize: 12,
      color: 'white',
      textAlign: 'center',
      fontFamily: 'ConthraxSb-Regular',
   },
   logo: {
      height: '10%',
      resizeMode: 'contain',
   },
})