import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';

import Dropdown from 'pruebas/src/components/DropDown';

export default class Trabajo extends Component {
  constructor (props) {
    super (props);
    this.state = {
      trabajo: {
        descrip: '',
        idTipoTrab: 0,
        idIngreso: 0,
        posicion: props.posicion,
      },
      idTipoTrab: 0,
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
      idIngreso: 0,
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

  componentDidMount () {
    global.datosTrabajo.push (this.state.trabajo);
  }

  cambiarDescripc = async descrip => {
    const copia = this.state.trabajo;
    copia.descrip = descrip;
    this.setState ({trabajo: copia});
  };

  elegirTipoTrabajo = async (value, index) => {
    const copia = this.state.trabajo;
    await this.setState ({
      idTipoTrab: this.state.tipoTrabajo[index].id,
    });
    copia.idTipoTrab = this.state.idTipoTrab;
    this.setState ({trabajo: copia});
  };

  elegirIngresoMensual = async (value, index) => {
    const copia = this.state.trabajo;
    await this.setState ({
      idIngreso: this.state.ingresoMens[index].id,
    });
    copia.idIngreso = this.state.idIngreso;
    this.setState ({trabajo: copia});
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
          value={trabajo.descrip}
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
    marginVertical: 4,
  },
  input: {
    width: '95%',
    height: 34,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
});
