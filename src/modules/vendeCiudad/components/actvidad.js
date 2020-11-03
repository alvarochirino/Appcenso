import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Opciones from '../../../components/Opciones';

export default class Actividad extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.rigth}>
          <Text style={styles.text1}>{this.props.nombre}</Text>
          <Text style={styles.text2}>{this.props.direccion}</Text>
        </View>
        <View style={styles.left}>
          <Opciones informacion={this.props} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flexDirection: 'row',
    borderTopWidth: 0.6,
    borderTopColor: 'gray',
  },
  rigth: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    flex: 3,
    padding: 2,
  },
  text1: {
    fontSize: 20,
    color: 'black',
  },
  text2: {
    color: 'black',
    textAlign: 'center',
  },
});
