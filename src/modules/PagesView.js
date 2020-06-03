import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {StackActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

const mimunicipio = require ('./../../assets/mimunicipio.jpg');
const mitramite = require ('./../../assets/mistramites.jpg');
const immuebles = require ('./../../assets/immuebles.png');
const transporte = require ('./../../assets/transporte.png');
const vendeciudad = require ('./../../assets/vendeciudad.jpg');
const controlsanitario = require ('./../../assets/controlsanitario.png');
const reportedesperfecto = require ('./../../assets/reportedesperfecto.png');

import API from '../../utils/api';

class PagesView extends Component {
  constructor (props) {
    super (props);
    this.state = {
      listaBoton: [],
      btn1: 0,
      btn2: 0,
      btn3: 0,
      btn4: 0,
      btn5: 0,
      btn6: 0,
    };
  }

  async componentDidMount () {
    const lista = await API.getBotons ();
    if (lista != null) {
      this.setState ({
        listaBoton: lista,
      });
      this.setState ({
        btn1: this.state.listaBoton[0].activo,
        btn2: this.state.listaBoton[1].activo,
        btn3: this.state.listaBoton[2].activo,
        btn4: this.state.listaBoton[3].activo,
        btn5: this.state.listaBoton[4].activo,
        btn6: this.state.listaBoton[5].activo,
      });
    }
  }

  miMunicipio = () => {
    if (this.state.btn1 == 1) {
      this.props.navigation.dispatch (
        StackActions.push ({
          routeName: 'MiMunicipio',
        })
      );
    }
  };

  misTramites = () => {
    if (this.state.btn2 == 1) {
      this.props.navigation.navigate ('MisTramites');
    }
  };

  misInmuebles = () => {
    if (this.state.btn3 == 1) {
      this.props.navigation.navigate ('MisInmuebles');
    }
  };

  transportePub = () => {
    if (this.state.btn4 == 1) {
      this.props.navigation.navigate ('TransportePub');
    }
  };

  vendeCiudad = () => {
    if (this.state.btn5 == 1) {
      this.props.navigation.navigate ('VendeCiudad');
    }
  };

  controlSanitario = () => {
    if (this.state.btn5 == 1) {
      this.props.navigation.navigate ('ControlSanitario');
    }
  };

  realizarReporte = async () => {
    if (this.state.btn6 == 1) {
      var value = await AsyncStorage.getItem ('@User:token');
      if (value !== null) {
        this.props.navigation.dispatch (
          StackActions.push ({
            routeName: 'NuestrasObras',
          })
        );
      }
    }
  };

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity onPress={this.miMunicipio} style={styles.item}>
            <Image
              //resizeMode="contain"
              source={mimunicipio}
              style={styles.itemImage}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.misTramites} style={styles.item}>
            <Image source={mitramite} style={styles.itemImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.misInmuebles} style={styles.item}>
            <Image source={immuebles} style={styles.itemImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={this.transportePub} style={styles.item}>
            <Image source={transporte} style={styles.itemImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.controlSanitario} style={styles.item}>
            <Image source={controlsanitario} style={styles.itemImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.realizarReporte} style={styles.item}>
            <Image source={reportedesperfecto} style={styles.itemImage} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginTop: 8,
  },
  item: {
    flex: 1,
    height: 113,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 4,
  },
  itemImage: {
    height: 113,
    resizeMode: 'contain',
  },
});

export default PagesView;
