import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Input, TouchableHighlight, TouchableOpacity } from 'react-native';

import Boton from './botones'
import FormLogin from './formLogin'

export default function Gobierno(props) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/gallery.png')}
        style={styles.image}
      />
      <Text style={styles.text}>GOBIERNO AUTONOMO MUNICIPAL DE {props.municipio}</Text>

      <View style={styles.containerButton}>
        <TouchableHighlight onPress={this._onPressButton} style={styles.button}>
            <Text style={styles.buttonText}>Invitado</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onPressButton} style={styles.button}>
            <Text style={styles.buttonText}>Regístrate</Text>
        </TouchableHighlight>
      </View>

      <FormLogin navigation={props.navigation}/>
      
      <Text> Registrese para habilitar todas las funciones </Text>
      <Image
        source={require('../../../assets/gallery.png')}
        style={styles.emoticon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 10,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 150
  },
  text: {
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  mensaje: {
    color: 'black',
  },
  emoticon: {
    width: 50,
    height: 50,
  },
  button: {
    margin: 2,
    width: 108,
    backgroundColor: '#2196F3',
    padding: 5,
    borderRadius: 10
  },
  buttonText: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  containerButton: {
    alignItems: 'center',
    flexDirection: 'row',
  }
})