import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import AsyncStorage from '@react-native-community/async-storage';

import API from '../../../../utils/api';
import Dropdown from 'pruebas/src/components/DropDown';

export default class DatosFamiliar extends Component {
  constructor (props) {
    super (props);
    this.state = {
      data: {
        nombre: '',
        edad: '',
        sexo: 0,
        idRol: 0,
        posicion: props.posicion,
      },
      sexo: 0,
      idRol: 0,
      rol: [
        {
          id: 2,
          value: 'Esposo/a',
        },
        {
          id: 3,
          value: 'Hijo/a',
        },
        {
          id: 4,
          value: 'Abuelo/a',
        },
        {
          id: 5,
          value: 'Otro',
        },
      ],
      tSexo: [
        {
          label: 'M',
          value: 0,
        },
        {
          label: 'F',
          value: 1,
        },
      ],
    };
  }

  async componentDidMount () {
    if (this.props.posicion === 1) {
      const idUsuario = await AsyncStorage.getItem ('@User:id');
      const u = await API.getUsuario (idUsuario);
      let nombre = u.nombre1 + ' ';
      if (u.nombre2 !== null) nombre += u.nombre2 + ' ';
      nombre += u.apellido1 + ' ';
      if (u.apellido2 !== null) nombre += u.apellido2;
      await this.setState ({
        data: {
          nombre: nombre,
          edad: '',
          sexo: 0,
          idRol: 1,
          posicion: 1,
        },
      });
      global.datosIntegr.unshift (this.state.data);
    } else {
      global.datosIntegr.push (this.state.data);
    }
  }

  cambio = (text, type) => {
    const copia = this.state.data;
    if (type == 'nombre') {
      copia.nombre = text;
    }
    if (type == 'edad') {
      if (text !== '') {
        const edad = parseInt (text);
        if (edad >= 0 && edad <= 120) copia.edad = text;
      } else {
        copia.edad = text;
      }
    }
    this.setState ({data: copia});
  };

  elegirRolFamilia = async (value, index) => {
    const copia = this.state.data;
    await this.setState ({
      idRol: this.state.rol[index].id,
    });
    copia.idRol = this.state.idRol;
    this.setState ({data: copia});
  };

  onPress = async () => {
    const copia = this.state.data;
    await this.setState ({
      sexo: this.state.tSexo.find (e => e.selected == true).value,
    });
    copia.sexo = this.state.sexo;
    this.setState ({data: copia});
  };

  render () {
    const {rol, tSexo, data} = this.state;
    if (this.props.posicion === 1) {
      return (
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.txt1}>NOMBRE: </Text>
            <Text style={styles.txt1}>{data.nombre} </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.txt1}>EDAD:</Text>
            <TextInput
              style={styles.input2}
              value={data.edad}
              onChangeText={text => this.cambio (text, 'edad')}
              keyboardType={'number-pad'}
            />
            <Text style={styles.txt1}>SEXO:</Text>
            <RadioGroup
              radioButtons={tSexo}
              onPress={this.onPress}
              flexDirection="row"
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.txt1}>ROL EN LA FAMILIA: </Text>
            <Text style={styles.txt1}>Jefe del hogar</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.txt1}>{this.props.posicion}. NOMBRE:</Text>
          <TextInput
            style={styles.input1}
            value={data.nombre}
            onChangeText={text => this.cambio (text, 'nombre')}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.txt1}>EDAD:</Text>
          <TextInput
            style={styles.input2}
            value={data.edad}
            onChangeText={text => this.cambio (text, 'edad')}
            keyboardType={'number-pad'}
          />
          <Text style={styles.txt1}>SEXO:</Text>
          <RadioGroup
            radioButtons={tSexo}
            onPress={this.onPress}
            flexDirection="row"
          />
        </View>
        <Dropdown
          label="ROL EN LA FAMILIA"
          data={rol}
          onChangeText={this.elegirRolFamilia}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  txt1: {
    fontSize: 16,
    color: 'black',
  },
  input1: {
    width: '73%',
    height: 34,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 0,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  input2: {
    width: '25%',
    height: 34,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
});
