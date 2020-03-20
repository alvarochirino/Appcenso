import React, { Component } from 'react';
import {
   Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator,
   Animated, Dimensions, Keyboard, UIManager, Platform
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import API from '../../../utils/api'

const { State: TextInputState } = TextInput;
const dismissKeyboard = require('dismissKeyboard')

export default class FormLogin extends Component {

   constructor(props) {
      super(props);

      this.state = {
         correo: '',
         correoValido: false,
         contraseña: '',
         mostrarBoton: true,
         shift: new Animated.Value(0),
      };
   }

   async componentDidMount() {
      let ultimoCorreo = await AsyncStorage.getItem('@User:ultimoCorreo')
      //console.log(ultimoCorreo)
      if (ultimoCorreo != null) {
         this.setState({
            correo: ultimoCorreo,
            correoValido: true,
         })
      }
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
      //password = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
      if (type == 'correo') {
         if (email.test(text)) {
            this.setState({
               correo: text,
               correoValido: true
            })
         } else {
            this.setState({
               correo: text,
               correoValido: false
            })
         }
      }
      if (type == 'contraseña') {
         this.setState({
            contraseña: text,
         })
      }
   }

   _onPressButton = () => {
      if (!this.state.correoValido) {
         Alert.alert('correo no valido')
      } else if (this.state.contraseña == '') {
         Alert.alert('contraseña no valida')
      } else {
         this.setState({ mostrarBoton: false })
         dismissKeyboard()
         API.login(this.state.correo, this.state.contraseña)
            .then((responseData) => {
               console.log('responseData', responseData)
               if (responseData != null) {
                  if (responseData.error == "Unauthorized") {
                     this.setState({ mostrarBoton: true })
                     Alert.alert("Correo y/o contraseña incorrecta")
                  } else if (responseData.access_token != null) {
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
                        actions: [NavigationActions.navigate({ routeName: 'Splash' })],
                     });
                     this.props.navigation.dispatch(resetAction);
                  } else {
                     this.setState({ mostrarBoton: true })
                     Alert.alert("Se produjo un error")
                  }
               }

            })
      }
   }

   render() {
      const { shift } = this.state;
      return (
         <Animated.View style={[styles.container, { transform: [{ translateY: shift }] }]}>
            <View style={styles.row}>
               {/* <View style={{ height: 36, justifyContent: 'center'}}>
                  <Text style={styles.text}>CORREO ELECTRONICO:</Text>
               </View> */}
               <Text style={styles.text}>CORREO ELECTRONICO:</Text>
               <TextInput
                  style={styles.input}
                  value={this.state.correo}
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
                  onSubmitEditing={Platform.OS === 'android' ? this._onPressButton : null}
               />
            </View>
            <View style={styles.row}>
               <Text style={styles.text1}> *Regístrese para habilitar todas las funciones </Text>
            </View>
            {this.state.mostrarBoton ?
               <TouchableOpacity onPress={this._onPressButton} style={styles.button}>
                  <Text style={styles.buttonText}>INGRESAR</Text>
               </TouchableOpacity>
               : <ActivityIndicator style={{ margin: 14 }} />
            }
         </Animated.View>
      );
   }

   handleKeyboardDidShow = (event) => {
      const { height: windowHeight } = Dimensions.get('window');
      const keyboardHeight = event.endCoordinates.height;
      const currentlyFocusedField = TextInputState.currentlyFocusedField();
      if (currentlyFocusedField !== null) {
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
      alignItems: 'center',
      flexDirection: 'column',
      paddingVertical: 5,
   },
   row: {
      alignItems: 'center',
      flexDirection: 'row',
      margin: 5,
   },
   text: {
      fontSize: 9.5,
      fontFamily: 'ConthraxSb-Regular',
      width: 95,
      color: 'black',
   },
   input: {
      width: '60%',
      height: 36,
      backgroundColor: 'silver',
      borderRadius: 10,
   },
   text1: {
      fontSize: 12,
      color: 'black',
   },
   button: {
      /* shadowOpacity: 1,
      shadowRadius: 0,
      shadowColor: 'red',
      elevation: 3,
      shadowOffset: {width: 10, height: 0}, */
      backgroundColor: '#2196F3',
      width: '38%',
      padding: 6,
      borderRadius: 10,
   },
   buttonText: {
      color: 'white',
      textAlign: 'center',
      fontFamily: 'ConthraxSb-Regular',
   },
})