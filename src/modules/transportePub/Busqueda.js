import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';

import API from '../../../utils/api';
import Maps from 'pruebas/src/components/Maps';

const width = Dimensions.get ('window').width - 10;

export default class Busqueda extends Component {
  constructor (props) {
    super (props);
    this.state = {
      listaTransp: [],
      linea: null,
    };
  }

  async componentDidMount () {
    var listaTransp = await API.getTransportePub ();
    if (listaTransp != null) {
      for (var i = 0; i < listaTransp.length; i++) {
        listaTransp[i].value =
          'Linea ' +
          listaTransp[i].linea +
          ': ' +
          listaTransp[i].inicio +
          ' - ' +
          listaTransp[i].final;
      }
      var item = {id: 0, value: 'Todos'};
      listaTransp.unshift (item);
      this.setState ({listaTransp});
    }
    //console.log (this.state.listaTransp);
  }

  mostrarRuta = (value, index) => {
    if (value != 'Todos') {
      this.setState ({
        linea: this.state.listaTransp[index],
      });
    } else {
      this.setState ({linea: null});
    }
  };

  render () {
    return (
      <ScrollView style={styles.container}>
        <Dropdown
          label="Indicar linea"
          fontSize={16}
          textColor={'rgb(0, 0, 0)'}
          data={this.state.listaTransp}
          onChangeText={this.mostrarRuta}
          containerStyle={{height: 60}}
        />
        <View style={styles.map}>
          <Maps listaTransp={this.state.listaTransp} linea={this.state.linea} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    margin: 5,
    paddingHorizontal: 5,
  },
  map: {
    height: width + 50,
    marginVertical: 5,
  },
});
