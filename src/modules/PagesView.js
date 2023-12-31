import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {StackActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

const mimunicipio = require ('./../../assets/mimunicipio.jpg');
const mitramite = require ('./../../assets/mistramites.jpg');
const immuebles = require ('./../../assets/immuebles.png');
const transporte = require ('./../../assets/transporte.png');
const vendeciudad = require ('./../../assets/vendeciudad.jpg');
const white = require ('./../../assets/white.jpg');
const reportedesperfecto = require ('./../../assets/reportedesperfecto.png');
const boton = require ('./../../assets/boton.png');

import API from '../../utils/api';

class PagesView extends Component {
  constructor (props) {
    super (props);
    this.state = {
      btn1: 0,
      btn2: 0,
      btn3: 0,
      btn4: 0,
      btn5: 0,
      btn6: 0,
    };
  }

  async componentDidMount () {
    const listaBoton = await API.getBotons ();
    if (listaBoton != null) {
      await this.setState ({
        btn1: listaBoton[0].activo,
        btn2: listaBoton[1].activo,
        btn3: listaBoton[2].activo,
        btn4: listaBoton[3].activo,
        btn5: listaBoton[4].activo,
        btn6: listaBoton[5].activo,
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
          <TouchableOpacity onPress={this.vendeCiudad} style={styles.item}>
            <Image source={vendeciudad} style={styles.itemImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.realizarReporte} style={styles.item}>
            <Image source={boton} style={styles.itemImage} />
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
