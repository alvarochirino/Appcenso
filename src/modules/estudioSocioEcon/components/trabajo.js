import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import Dropdown from './dropDown';

export default class Trabajo extends Component {
  constructor () {
    super ();
    this.state = {
      trabajo: '',
      idTipotrabajo: 0,
      tipoTrabajo: [
        {
          id: 1,
          value: 'Público',
        },
        {
          id: 2,
          value: 'Privado',
        },
        {
          id: 3,
          value: 'Informal',
        },
      ],
      idIngresoMens: 0,
      ingresoMens: [
        {
          id: 1,
          value: 'Hasta 999 bs',
        },
        {
          id: 2,
          value: '1000-1999 bs',
        },
        {
          id: 3,
          value: '2000-2999 bs',
        },
        {
          id: 3,
          value: '3000 bs o más',
        },
      ],
    };
  }

  cambiarDescripc = async descrip => {
    await this.setState ({trabajo: descrip});
    const copia = global.ficha;
    switch (this.props.posicion) {
      case 'primer':
        copia.descripT1 = descrip;
        break;
      case 'segundo':
        copia.descripT2 = descrip;
        break;
      case 'tercer':
        copia.descripT3 = descrip;
        break;
      default:
        console.log ('entro default');
    }
    global.ficha = copia;
  };

  elegirTipoTrabajo = async (value, index) => {
    await this.setState ({
      idTipotrabajo: this.state.tipoTrabajo[index].id,
    });
    const copia = global.ficha;
    switch (this.props.posicion) {
      case 'primer':
        copia.tipoT1 = this.state.idTipotrabajo;
        break;
      case 'segundo':
        copia.tipoT2 = this.state.idTipotrabajo;
        break;
      case 'tercer':
        copia.tipoT3 = this.state.idTipotrabajo;
        break;
      default:
        console.log ('entro default');
    }
    global.ficha = copia;
  };

  elegirIngresoMensual = async (value, index) => {
    await this.setState ({
      idIngresoMens: this.state.ingresoMens[index].id,
    });
    const copia = global.ficha;
    switch (this.props.posicion) {
      case 'primer':
        copia.ingresoT1 = this.state.idIngresoMens;
        break;
      case 'segundo':
        copia.ingresoT2 = this.state.idIngresoMens;
        break;
      case 'tercer':
        copia.ingresoT3 = this.state.idIngresoMens;
        break;
      default:
        console.log ('entro default');
    }
    global.ficha = copia;
  };

  render () {
    const {tipoTrabajo, ingresoMens, trabajo} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.txt1}>
          Descripción del {this.props.posicion} trabajo con mayor ingreso:
        </Text>
        <TextInput
          style={styles.input}
          value={trabajo}
          onChangeText={text => this.cambiarDescripc (text)}
        />
        <Dropdown
          label="Tipo de trabajo"
          data={tipoTrabajo}
          onChangeText={this.elegirTipoTrabajo}
        />
        <Dropdown
          label="Ingreso mensual del trabajo"
          data={ingresoMens}
          onChangeText={this.elegirIngresoMensual}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    alignItems: 'center',
  },
  txt1: {
    fontSize: 15,
    color: 'black',
    marginBottom: 5,
    textAlign: 'center',
  },
  input: {
    width: '95%',
    height: 35,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
  },
});
