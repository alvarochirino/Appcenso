import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Opciones from '../../components/Opciones';

export default class Institucion extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.containerSub}>
          <Text style={styles.text}>
            {this.props.nombre}
          </Text>
        </View>
        <View style={styles.containerOpc}>
          <Opciones informacion={this.props} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    padding: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  containerSub: {
    flex: 7,
    justifyContent: 'center',
  },
  containerOpc: {
    flex: 3,
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 16,
    marginHorizontal: 5,
  },
});
