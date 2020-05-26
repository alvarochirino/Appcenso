import React, { Component } from 'react';
import {
   Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator,
   Animated, Dimensions, Keyboard, UIManager,
} from 'react-native';

import API from '../../../../utils/api'

const { State: TextInputState } = TextInput;

export default class Entradas extends Component {

   constructor(props) {
      super(props);
      this.state = {
         verificado: false,
         idRuat: '',
         ciPropietario: '',
         inmueble: '',
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

   _verificar = async () => {
      if (this.state.ciPropietario != '' && this.state.idRuat != '') {
         this.setState({
            mostrarBoton: false,
            verificado: false,
         })
         let inmueble = await API.validarInmueble(this.state.idRuat, this.state.ciPropietario);
         //let inmueble = await API.validarInmueble(12345, 12345);
         console.log(inmueble)
         if (inmueble != null) {
            if (inmueble.codigo != null) {
               this.setState({
                  verificado: true,
                  inmueble: inmueble,
               })
            } else {
               Alert.alert('Datos incorrectos')
               this.setState({
                  verificado: false,
               })
            }
         }
         this.setState({ mostrarBoton: true })
      }
   };

   validate(text, type) {
      if (type == 'idRuat') {
         this.setState({
            idRuat: text,
         })
      }
      if (type == 'ciPropietario') {
         this.setState({
            ciPropietario: text,
         })
      }
   }


   render() {
      const { shift } = this.state;
      return (
         <Animated.View style={[styles.container, { transform: [{ translateY: shift }] }]}>
            <Text style={styles.text1}>
               Utilize el número de inmueble para ver el estado del mismo.
            </Text>
            <Text style={styles.text2}>NÚMERO DE INMUEBLE</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => this.validate(text, 'idRuat')} />
            <Text style={styles.text2}>CARNET ID PROPIETARIO</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => this.validate(text, 'ciPropietario')}
               onSubmitEditing={this._verificar}
            />
            {this.state.mostrarBoton ?
               <TouchableOpacity style={styles.button} onPress={this._verificar} >
                  <Text style={styles.buttonText}>VERIFICAR</Text>
               </TouchableOpacity>
               : <ActivityIndicator style={{ margin: 14 }} />
            }
            {this.state.verificado ?
               <View style={styles.containerText}>
                  <Text style={styles.text3}>
                     <Text style={styles.text2}>Código: </Text>
                     {this.state.inmueble.codigo}
                  </Text>
                  <Text style={styles.text3}>
                     <Text style={styles.text2}>Dirección: </Text>
                     {this.state.inmueble.direccion}
                  </Text>
                  <Text style={styles.text3}>
                     <Text style={styles.text2}>Zona: </Text>
                     {this.state.inmueble.zona}
                  </Text>
                  <Text style={styles.text3}>
                     <Text style={styles.text2}>Superficie terreno: </Text>
                     {this.state.inmueble.sup_terr} m2
                  </Text>
                  <Text style={styles.text3}>
                     <Text style={styles.text2}>Superficie construido: </Text>
                     {this.state.inmueble.sup_const} m2
                  </Text>
                  <Text style={styles.text3}>
                     <Text style={styles.text2}>Material víal: </Text>
                     {this.state.inmueble.mat_via}
                  </Text>
                  <View style={styles.containerDoble}>
                     <Text style={[styles.text3, styles.containerText]}>
                        <Text style={styles.text2}>Agua: </Text>
                        {this.state.inmueble.agua}
                     </Text>
                     <Text style={[styles.text3, styles.containerText]}>
                        <Text style={styles.text2}>Luz: </Text>
                        {this.state.inmueble.luz}
                     </Text>
                  </View>
                  <View style={styles.containerDoble}>
                     <Text style={[styles.text3, styles.containerText]}>
                        <Text style={styles.text2}>Alcantarillado: </Text>
                        {this.state.inmueble.alcant}
                     </Text>
                     <Text style={[styles.text3, styles.containerText]}>
                        <Text style={styles.text2}>Gas: </Text>
                        {this.state.inmueble.gas}
                     </Text>
                  </View>
                  <Text style={styles.text2}>Últimas gestiones pagadas: </Text>
                  <Text style={styles.text3}>
                     {this.state.inmueble.gestiones_pagadas}
                  </Text>
               </View>
               : null}
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
            const gap = (windowHeight - (keyboardHeight - 15)) - (fieldTop + fieldHeight);
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
      backgroundColor: 'white',
      flexDirection: 'column',
      margin: 10,
   },
   text1: {
      fontSize: 15,
      textAlign: 'center'
   },
   text2: {
      fontSize: 14,
      fontFamily: 'ConthraxSb-Regular',
      margin: 4,
      textAlign: 'center',
   },
   text3: {
      fontSize: 16,
      textAlign: 'center'
   },
   input: {
      height: 36,
      marginHorizontal: 15,
      borderColor: 'rgb(38, 168, 193)',
      borderWidth: 1,
      borderRadius: 10,
   },
   button: {
      width: 120,
      margin: 10,
      marginHorizontal: 15,
      alignItems: 'center',
      backgroundColor: 'rgb(38, 168, 193)',
      borderRadius: 10,
      padding: 6
   },
   buttonText: {
      padding: 2,
      color: 'white',
      textAlign: 'center',
      fontFamily: 'ConthraxSb-Regular',
      fontSize: 13,
   },
   containerText: {
      flex: 1,
      alignItems: 'center'
   },
   containerDoble: {
      flexDirection: 'row',
   },

})