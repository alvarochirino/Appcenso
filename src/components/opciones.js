import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import email from 'react-native-email'
import Modal from "react-native-modal";

import Maps from '../modules/vendeCiudad/components/maps'

const myIcon1 = <Icon name="at-sign" size={20} color={'red'} />;
const myIcon2 = <Icon name="clock" size={20} color={'red'} />;
const myIcon3 = <Icon name="map-pin" size={20} color={'red'} />;

export default class Opciones extends Component {

   state = {
      modalHorarioVisible: false,
      modalMapVisible: false,
   };

   enviarCorreo = () => {
      if (this.props.informacion.correo != null && this.props.informacion.correo != "") {
         const to = [this.props.informacion.correo]
         email(to).catch(console.error)
      } else {
         Alert.alert('Correo no disponible')
      }
   }

   mostrarCamino = () => {
      this.setState({ modalMapVisible: !this.state.modalMapVisible });
   }

   mostrarHorario = () => {
      this.setState({ modalHorarioVisible: !this.state.modalHorarioVisible });
   }

   llamarNumero = (numero) => {
      if (numero != 0) {
         Linking.openURL(`tel:${this.props.informacion.telefono}`)
      }
   }

   render() {
      return (
         <View style={styles.container}>
            <Modal isVisible={this.state.modalHorarioVisible}>
               <View style={{ margin: 25, backgroundColor: '#fff', }}>
                  <Text style={styles.text}>Horario</Text>
                  <Text style={styles.text}>{this.props.informacion.horario}</Text>
                  <TouchableOpacity
                     style={styles.button}
                     onPress={this.mostrarHorario}>
                     <Text style={{ color: 'blue' }}>Salir</Text>
                  </TouchableOpacity>
               </View>
            </Modal>
            <Modal isVisible={this.state.modalMapVisible}>
               <View style={{ flex: 1, backgroundColor: 'silver' }}>
                  <Maps ubicacion={this.props.informacion} />
                  <TouchableOpacity
                     style={styles.button}
                     onPress={this.mostrarCamino}>
                     <Text style={{ color: 'black' }}>Salir</Text>
                  </TouchableOpacity>
               </View>
            </Modal>
            <View style={styles.icon}>
               <TouchableOpacity
                  onPress={this.enviarCorreo}
               >
                  {myIcon1}
               </TouchableOpacity>
            </View>
            <View style={styles.telefono}>
               <Text
                  style={styles.text}
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  onPress={() => this.llamarNumero(this.props.informacion.telefono)}
               >
                  {this.props.informacion.telefono != 0 ?
                     this.props.informacion.telefono
                     : "-"}
               </Text>
            </View>
            <View style={styles.icon}>
               <TouchableOpacity
                  onPress={this.mostrarHorario}
               >
                  {myIcon2}
               </TouchableOpacity>
            </View>
            <View style={styles.icon}>
               <TouchableOpacity
                  onPress={this.mostrarCamino}
               >
                  {myIcon3}
               </TouchableOpacity>
            </View>
         </View>
      )
   }
}


const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
   },
   icon: {
      flex: 16,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: '#c0c0c0',
      padding: 2,
      margin: 2,
   },
   telefono: {
      flex: 52,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#c0c0c0',
      padding: 2,
      margin: 2,
   },
   text: {
      fontSize: 16,
      textAlign: 'center'
   },
   button: {
      alignItems: 'center',
      padding: 10
   },

});