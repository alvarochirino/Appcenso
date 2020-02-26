import React, { Component } from 'react';
import {
   Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator,
   Animated, Dimensions, Keyboard, UIManager,
} from 'react-native';
import { StackedBarChart } from 'react-native-svg-charts'

import API from '../../../../utils/api'

const { State: TextInputState } = TextInput;
const dismissKeyboard = require('dismissKeyboard')

export default class Entradas extends Component {

   constructor(props) {
      super(props);
      this.state = {
         verificado: false,
         codigo: '',
         numero: '',
         tramite: '',
         mostrarBoton: true,
         porcentaje: 100,
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
      /* if (this.state.numero == '') {
         Alert.alert('Por favor ingresar el número de tramite')
      } else if (this.state.codigo == '') {
         Alert.alert('Por favor ingresar código de acceso')
      } else { */
      if (this.state.numero != '' && this.state.codigo != '') {
         this.setState({
            mostrarBoton: false,
            verificado: false,
         })
         let tramite = await API.validarTramite(this.state.numero, this.state.codigo);
         //let tramite = await API.validarTramite('qwer', 123456);
         //console.log(tramite)
         if (tramite != null) {
            if (tramite.length == 1) {
               this.setState({
                  verificado: true,
                  tramite: tramite,
               })
               if (tramite[0].porcentaje > 0) {
                  this.setState({
                     porcentaje: tramite[0].porcentaje
                  })
               }
            } else {
               Alert.alert('datos incorrectos')
               this.setState({
                  verificado: false,
               })
            }
         }
         this.setState({ mostrarBoton: true })
      }
      /* } */
   };

   validate(text, type) {
      if (type == 'codigo') {
         this.setState({
            codigo: text,
         })
      }
      if (type == 'numero') {
         this.setState({
            numero: text,
         })
      }
   }



   render() {
      console.log(this.state.porcentaje)
      const data = [
         {
            diasRestantes: this.state.porcentaje,
            diasPasados: 100 - this.state.porcentaje,
         },
      ]
      const colors = ['#f00', '#fff']
      const colors1 = ['#ffbe00', '#ff8e00']
      const colors2 = ['#32cd32', '#fff']
      const keys = ['diasRestantes', 'diasPasados']
      const { shift } = this.state;
      return (
         <Animated.View style={[styles.container, { transform: [{ translateY: shift }] }]}>
            <Text style={styles.text1}>
               Utilize el código que le fue entragado en ventanilla, al momento de ingresar su trámite para ver el estado de su aprobación, y evitar demoras, en observaciones
            </Text>
            <Text style={styles.text2}>NÚMERO DE TRAMITE</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => this.validate(text, 'numero')} />
            <Text style={styles.text2}>CÓDIGO DE ACCESO</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => this.validate(text, 'codigo')}
               onSubmitEditing={this._verificar}
            />
            {this.state.mostrarBoton ?
               <TouchableOpacity style={styles.button} onPress={this._verificar} >
                  <Text style={styles.buttonText}>VERIFICAR</Text>
               </TouchableOpacity>
               : <ActivityIndicator style={{ margin: 14 }} />
            }
            {this.state.verificado ?
               <View style={styles.info}>
                  {this.state.tramite[0].estado == 'Suspendido' ?
                     <View style={{ margin: 10 }}>
                        <Text style={styles.suspendido}>Estado: {this.state.tramite[0].estado}</Text>
                        <StackedBarChart
                           horizontal
                           style={{ height: 40, }}
                           keys={keys}
                           colors={colors}
                           data={data}
                           showGrid={false}
                           contentInset={{ top: 0, bottom: 0 }}
                        >
                           <View style={styles.containerPorcentaje}>
                              <Text style={styles.buttonText}> --- </Text>
                           </View>
                        </StackedBarChart>
                     </View>
                     : this.state.tramite[0].estado == 'Finalizado' ?
                        <View style={{ margin: 10 }}>
                           <Text style={styles.finalizado}>Estado: {this.state.tramite[0].estado}</Text>
                           <StackedBarChart
                              horizontal
                              style={{ height: 45, }}
                              keys={keys}
                              colors={colors2}
                              data={data}
                              showGrid={false}
                              contentInset={{ top: 0, bottom: 0 }}
                           >
                              <View style={styles.containerPorcentaje}>
                                 <Text style={styles.buttonText}>{this.state.porcentaje} %</Text>
                              </View>
                           </StackedBarChart>
                        </View>
                        :
                        <View style={{ margin: 10 }}>
                           <Text style={styles.enCurso}>Estado: {this.state.tramite[0].estado}</Text>
                           <StackedBarChart
                              horizontal
                              style={{ height: 45, }}
                              keys={keys}
                              colors={colors1}
                              data={data}
                              showGrid={false}
                              contentInset={{ top: 0, bottom: 0 }}
                           >
                              <View style={styles.containerPorcentaje}>
                                 <Text style={styles.buttonText}>{this.state.porcentaje} %</Text>
                              </View>
                           </StackedBarChart>
                        </View>
                  }
                  {this.state.tramite[0].observacion != null ?
                     <Text style={styles.text3}>Observación: {this.state.tramite[0].observacion}</Text>
                     : null
                  }
               </View>
               : null}
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
   containerPorcentaje: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 10
   },
   containerBarra2: {
      margin: 10,
      height: 40,
      flexDirection: 'row',
   },
   text1: {
      fontSize: 15,
      textAlign: 'center'
   },
   input: {
      height: 36,
      marginHorizontal: 15,
      borderColor: 'rgb(38, 168, 193)',
      borderWidth: 1,
      borderRadius: 10,
   },
   text2: {
      fontSize: 14,
      fontFamily: 'conthrax-sb',
      margin: 4,
      textAlign: 'center',
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
      fontFamily: 'conthrax-sb',
      fontSize: 13,
   },
   info: {
      padding: 10,
      flexDirection: 'column',
   },
   text3: {
      fontSize: 16,
      textAlign: 'center'
   },
   enCurso: {
      fontSize: 16,
      textAlign: 'center'
   },
   suspendido: {
      fontSize: 16,
      textAlign: 'center',
      color: 'red'
   },
   finalizado: {
      fontSize: 16,
      textAlign: 'center',
      color: 'green'
   },
})