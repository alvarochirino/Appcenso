import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';

export default function Botones(props){
  return (
    <View style={styles.container}>
    	<TouchableHighlight onPress={this._onPressButton} underlayColor="white">
        <View style={styles.button}>
          <Text style={styles.buttonText}>Invitado</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
        <View style={styles.button}>
          <Text style={styles.buttonText}>Regístrate</Text>
        </View>
      </TouchableHighlight>
    </View>        
  );
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
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
})