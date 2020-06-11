import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Opciones from '../../../components/Opciones';

export default class Actividad extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.text1}>{this.props.nombre}</Text>
        </View>
        <View style={styles.left}>
          <Opciones informacion={this.props} />
          <View style={styles.down}>
            <Text style={styles.text2}>{this.props.direccion}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flexDirection: 'row',
    borderWidth: 0.6,
    borderTopColor: 'gray',
    borderBottomColor: 'transparent',
    borderEndColor: 'transparent',
    borderStartColor: 'transparent',
  },
  /* right: {
        flex: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: '100%',
        height: 66,
        resizeMode: 'contain',
    }, */
  center: {
    flex: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    flex: 52,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 2,
  },
  down: {
    height: 40,
    justifyContent: 'center',
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
