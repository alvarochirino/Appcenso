import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { StackActions } from 'react-navigation';

import FormLogin from '../components/formLogin'

export default class Login extends Component {

   _invitado = () => {
      this.props.navigation.dispatch(StackActions.push({
         routeName: 'HomeInvitado',
      }))
   }

   _registro = () => {
      this.props.navigation.dispatch(StackActions.push({
         routeName: 'Registro',
      }))
   }

   render() {
      return (
         <View style={styles.container}>
            <Image
               source={require('../../../assets/escudo.jpg')}
               style={styles.image}
            />
            <Text style={styles.text1}>GOBIERNO AUTÓNOMO MUNICIPAL</Text >
            {/* <Text style={styles.text2}>DE {this.props.navigation.state.params.municipio} </Text> */}
            <Text style={styles.text2}>DE YACUIBA </Text>

            <View style={styles.containerButton}>
               <TouchableHighlight onPress={this._invitado} style={styles.button1}>
                  <Text style={styles.buttonText}>Invitado</Text>
               </TouchableHighlight>
               <TouchableHighlight onPress={this._registro} style={styles.button2}>
                  <Text style={styles.buttonText}>Regístrate</Text>
               </TouchableHighlight>
            </View>

            <FormLogin navigation={this.props.navigation} />
            <View style={styles.abajo}>
               <Image
                  source={require('../../../assets/logo.png')}
                  style={styles.logo}
               />
               <View>
                  <Text style={styles.text}></Text>
                  <Text style={styles.text}>v 1.00</Text>
               </View>
            </View>

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
      flexDirection: 'column',
      margin: 10,
   },
   image: {
      height: '40%',
      width: '56%',
      resizeMode: 'contain',
   },
   text1: {
      fontSize: 13,
      textAlign: 'center',
      fontFamily: 'ConthraxSb-Regular',
      color: 'black',
   },
   text2: {
      fontSize: 19,
      fontFamily: 'ConthraxSb-Regular',
      color: 'black',
   },
   containerButton: {
      paddingTop: 8,
      alignItems: 'center',
      flexDirection: 'row',
   },
   button1: {
      margin: 2,
      width: '22%',
      backgroundColor: '#808080',
      padding: 6,
      borderRadius: 10
   },
   button2: {
      margin: 2,
      width: '54%',
      backgroundColor: '#2196F3',
      padding: 6,
      borderRadius: 10
   },
   buttonText: {
      color: 'white',
      textAlign: 'center',
   },
   logo: {
      width: '25%',
      resizeMode: 'contain',
   },
   text: {
      color: 'black',
      fontSize: 13,
      color: '#808080'
   },
   abajo: {
      height: '10%',
      width: '100%',
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
})