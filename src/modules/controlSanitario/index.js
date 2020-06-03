import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import DiagnosticoList from './DiagnosticoList';
import Encabezado from '../../components/encabezado';

class ControlSanitario extends Component {

  render () {
    return (
      <View style={styles.container}>
        <Encabezado
          title="DIAGNOSTICO DIFERENCIAL"
          navigation={this.props.navigation}
        />
        <DiagnosticoList />
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 5,
  },
});

export default ControlSanitario;
