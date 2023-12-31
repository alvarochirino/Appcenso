import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import Datos from './components/datos';
import AppButton from 'pruebas/src/components/AppButton';
import Separator from 'pruebas/src/components/VerticalSeparador';

export default class Integrantes extends Component {
  constructor () {
    super ();
    this.state = {
      estructuraFam: [1, 2, 3, 4, 5],
      estructuraValid: [1, 1, 1, 1, 1],
      mostrarBtn: true,
    };
    global.datosIntegr = [];
    global.estructuraValid = this.state.estructuraValid;
  }

  _onPressButton = async () => {
    await this.setState ({
      estructuraFam: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      estructuraValid: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      mostrarBtn: false,
    });
    global.estructuraValid = this.state.estructuraValid;
  };

  renderItem = ({item}) => {
    return <Datos posicion={item} />;
  };

  render () {
    const {estructuraFam, mostrarBtn} = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.toString ()}
          data={estructuraFam}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={this.renderItem}
        />
        {mostrarBtn
          ? <AppButton
              title="Agregar más"
              action={this._onPressButton}
              width={140}
            />
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    margin: 4,
    paddingTop: 4,
    alignItems: 'center',
    backgroundColor: '#eee',
  },
});
