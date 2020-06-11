import React, { Component } from 'react';
import { Text, FlatList, View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import CheckBox from 'react-native-check-box'
import AsyncStorage from '@react-native-community/async-storage';

import API from '../../../utils/api'
import Pregunta from './components/pregunta'
import Separator from 'pruebas/src/components/VerticalSeparador';

let posicion = -1

export default class ViewEncuesta extends Component {

   constructor(props) {
      super(props);
      global.MyVar = [];
      this.state = {
         checked: false,
         preguntas: [],
         cargarBoton: false,
      };
   }

   /* async componentDidMount() {
      let idUsuario = parseInt(await AsyncStorage.getItem('@User:id'))
      const listaPreguntas = await API.getPreguntas(idUsuario);
      if (listaPreguntas != null) {
         this.setState({
            preguntas: listaPreguntas,
            checked: !this.state.checked,
         })
         var paso;
         for (paso = 0; paso < this.state.preguntas.length; paso++) {
            this.state.respuestas.push(0)
         };
         global.MyVar = this.state.respuestas
      }
   } */

   realizarEncuesta = async () => {
      global.MyVar = []
      posicion = -1
      this.setState({
         checked: !this.state.checked,
      })
      if (!this.state.checked) {
         let idUsuario = parseInt(await AsyncStorage.getItem('@User:id'))
         const listaPreguntas = await API.getPreguntas(idUsuario);
         console.log('listaPreguntas', listaPreguntas)
         if (listaPreguntas != null) {
            this.setState({
               preguntas: listaPreguntas,
               cargarBoton: true,
            })
         } else {
            this.setState({
               preguntas: [],
               cargarBoton: false
            })
         }
      } else {
         this.setState({
            preguntas: [],
         })
      }
   }

   enviarRespuesta = async () => {
      this.setState({ cargarBoton: false })
      let idUsuario = parseInt(await AsyncStorage.getItem('@User:id'))
      var paso;
      var pregunta = 0;
      let guardo
      for (paso = 0; paso < global.MyVar.length; paso++) {
         if (global.MyVar[paso] != null) {
            guardo = await API.guardarParticipacion(idUsuario, this.state.preguntas[pregunta].id)
            if (guardo != null && guardo.message == "ok") {
               API.aumentar(global.MyVar[paso])
            } else {
               break
            }
            pregunta++
         }
      };
      if (guardo != null) {
         Alert.alert('Gracias por su participación')
         this.setState({
            checked: false,
            preguntas: [],
         })
      } else {
         this.setState({ cargarBoton: true })
         Alert.alert('No se puedo enviar las respuestas, inténtelo de nuevo por favor')
      }
   }

   keyExtractor = item => item.id.toString()

   itemSeparator = () => <Separator />

   renderItem = ({ item }) => {
      posicion++
      return (
         <Pregunta {...item} pos={posicion} />
      )
   }

   render() {
      return (
         <View style={styles.container}>
            < CheckBox
               style={styles.checkbox}
               onClick={this.realizarEncuesta}
               isChecked={this.state.checked}
               leftText={" Participa de una encuesta! "}
               leftTextStyle={styles.textCheckbox}
               checkedCheckBoxColor='white'
               uncheckedCheckBoxColor='white'
            />
            {this.state.checked && this.state.preguntas.length != 0 ?
               <View>
                  <FlatList
                     keyExtractor={this.keyExtractor}
                     ItemSeparatorComponent={this.itemSeparator}
                     data={this.state.preguntas}
                     renderItem={this.renderItem}
                  />
                  {this.state.cargarBoton ?
                     <TouchableOpacity
                        onPress={this.enviarRespuesta}
                        style={styles.item}
                     >
                        <Text style={styles.text}>Enviar Respuestas</Text>
                     </TouchableOpacity>
                     : <ActivityIndicator style={{ margin: 10 }} />
                  }
               </View>
               : this.state.checked && this.state.preguntas.length == 0 ?
                  <Text style={styles.text}>De momento no hay nuevas encuestas en curso</Text>
                  : null
            }
         </View>
      );
   }

}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   text: {
      fontSize: 15,
      textAlign: 'center',
      margin: 3,
   },
   item: {
      margin: 5,
      borderWidth: 1,
      borderRadius: 5,
      alignItems: 'center',
   },
   checkbox: {
      height: 28,
      marginVertical: 5,
      marginHorizontal: 10,
      paddingHorizontal: 5,
      borderRadius: 10,
      backgroundColor: '#808080',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
   },
   textCheckbox: {
      fontSize: 14,
      fontFamily: 'ConthraxSb-Regular',
      color: 'white',
      paddingLeft: 15
   },
});