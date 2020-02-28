import React, { Component } from 'react';
import {
   Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator, ScrollView,
   Animated, Dimensions, Keyboard, UIManager,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

import Icon from 'react-native-vector-icons/FontAwesome';

import API from '../../../../utils/api'
import Estado from './estado'

const { State: TextInputState } = TextInput;
const dismissKeyboard = require('dismissKeyboard')
const inmueble = <Icon name="home" size={26} color={'rgb(38, 168, 193)'} />;
const propiedad = <Icon name="pagelines" size={26} color={'rgb(38, 168, 193)'} />;
const comercio = <Icon name="shopping-cart" size={26} color={'rgb(38, 168, 193)'} />;

export default class Entradas extends Component {

   constructor(props) {
      super(props);
      this.state = {
         estados: [],
         verificado: false,
         datos: [
            {
               label: inmueble,
               value: 'inmueble urbano',
               color: 'rgb(38, 168, 193)'
            },
            {
               label: propiedad,
               value: 'propiedad rural',
               color: 'rgb(38, 168, 193)'
            },
            {
               label: comercio,
               value: 'actividad comercial',
               color: 'rgb(38, 168, 193)'
            }
         ],
         codigo: '',
         ci: '',
         tipo: 'inmueble urbano',
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

   keyExtractor = item => item.estado.toString()

   renderItem = ({ item }) => {
      return (
         <Estado {...item} codigo={this.state.codigo} />
      )
   }

   onPress = () => {
      this.setState({
         tipo: this.state.datos.find(e => e.selected == true).value
      })
   };

   _verificar = async () => {
      if (this.state.codigo != '' && this.state.ci != '') {
         this.setState({
            mostrarBoton: false,
            verificado: false,
         })
         //let verifica = await API.validarImpuesto('qwert', 123456, 'actividad comercial');
         let verifica = await API.validarImpuesto(this.state.codigo, this.state.ci, this.state.tipo);
         if (verifica != null) {
            if (verifica == 1) {
               let estados = await API.getEstados()
               if (estados != null) {
                  this.setState({
                     verificado: true,
                     estados: estados
                  })
               }
               dismissKeyboard()
            } else if (verifica == 0) {
               Alert.alert('Datos incorrectos')
               this.setState({
                  verificado: false,
               })
            } else {
               this.setState({
                  verificado: false,
               })
            }
         }
         this.setState({ mostrarBoton: true })
      }
   };

   validate(text, type) {
      if (type == 'codigo') {
         this.setState({
            codigo: text,
         })
      }
      if (type == 'ci') {
         this.setState({
            ci: text,
         })
      }
   }

   render() {
      const { shift } = this.state;
      return (
         <Animated.ScrollView style={[styles.container, { transform: [{ translateY: shift }] }]}>
            <Text style={styles.text1}>
               Evite moras y sanciones, pague sus impuestos oportunamente, obtenga su roseta para su vehículo y otros beneficios
            </Text>
            <View style={styles.body}>
               <View style={styles.left}>
                  <Text style={styles.text2}>CODIGO CATASTRAL</Text>
                  <TextInput
                     style={styles.input}
                     onChangeText={(text) => this.validate(text, 'codigo')}
                  />
                  <Text style={styles.text2}>CARNET DEL TITULAR</Text>
                  <TextInput
                     style={styles.input}
                     onChangeText={(text) => this.validate(text, 'ci')}
                     onSubmitEditing={this._verificar}
                  />
               </View>
               <View style={styles.right}>
                  <RadioGroup
                     radioButtons={this.state.datos}
                     onPress={this.onPress}
                  />
               </View>
            </View>

            {this.state.mostrarBoton ?
               <TouchableOpacity style={styles.button} onPress={this._verificar}>
                  <Text style={styles.buttonText}>VERIFICAR</Text>
               </TouchableOpacity>
               : <ActivityIndicator style={{ margin: 14 }} />
            }
            {this.state.verificado && this.state.mostrarBoton ?
               <View style={{ marginVertical: 10 }}>
                  <FlatList
                     keyExtractor={this.keyExtractor}
                     data={this.state.estados}
                     renderItem={this.renderItem}
                  />
               </View>
               : null}
         </Animated.ScrollView>
      );
   }

   handleKeyboardDidShow = (event) => {
      const { height: windowHeight } = Dimensions.get('window');
      const keyboardHeight = event.endCoordinates.height;
      const currentlyFocusedField = TextInputState.currentlyFocusedField();
      UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
         const fieldHeight = height;
         const fieldTop = pageY;
         const gap = (windowHeight - (keyboardHeight - 40)) - (fieldTop + fieldHeight);
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
      backgroundColor: 'white',
      flexDirection: 'column',
      margin: 10,
   },
   text1: {
      fontSize: 16,
      paddingHorizontal: 5,
   },
   body: {
      padding: 10,
      flexDirection: 'row',
   },
   right: {
      flex: 22,
      justifyContent: 'flex-end',
   },
   left: {
      flex: 78,
      flexDirection: 'column',
      justifyContent: 'center',
   },
   input: {
      height: 36,
      borderColor: 'rgb(38, 168, 193)',
      borderWidth: 1,
      borderRadius: 10,
   },
   text2: {
      fontSize: 14,
      fontFamily: 'ConthraxSb-Regular',
      margin: 4,
      textAlign: 'center',
   },
   button: {
      width: 120,
      marginTop: 7,
      marginHorizontal: 10,
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
})