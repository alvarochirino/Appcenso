import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Animated,
  Dimensions,
  Keyboard,
  UIManager,
  Platform,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import PorcentajeBar from './porcentajeBar';

import API from '../../../../utils/api';

const {State: TextInputState} = TextInput;

export default class Entradas extends Component {
  constructor () {
    super ();
    this.state = {
      verificado: false,
      codigo: '',
      numero: '',
      tramite: '',
      mostrarBoton: true,
      porcentaje: 100,
      shift: new Animated.Value (0),

      opcion: '1',
      opciones: [
        {
          label: 'Nº DE TRÁMITE',
          value: '1',
        },
        {
          label: 'Nº DE INMUEBLE',
          value: '2',
        },
      ],
    };
  }

  componentWillMount () {
    this.keyboardDidShowSub = Keyboard.addListener (
      'keyboardDidShow',
      this.handleKeyboardDidShow
    );
    this.keyboardDidHideSub = Keyboard.addListener (
      'keyboardDidHide',
      this.handleKeyboardDidHide
    );
  }

  componentWillUnmount () {
    this.keyboardDidShowSub.remove ();
    this.keyboardDidHideSub.remove ();
  }

  onPress = async () => {
    await this.setState ({
      opcion: this.state.opciones.find (e => e.selected == true).value,
    });
  };

  _verificar = async () => {
    const {numero, codigo, opcion} = this.state;
    if (numero != '' && codigo != '') {
      this.setState ({
        mostrarBoton: false,
        verificado: false,
      });
      let tramite;
      if (opcion === '1') {
        tramite = await API.validarTramite2 (numero, codigo);
      } else {
        tramite = await API.validarTramite (numero, codigo);
      }
      if (tramite != null) {
        if (tramite.length == 1) {
          this.setState ({
            verificado: true,
            tramite: tramite,
          });
          if (tramite[0].porcentaje > 0) {
            this.setState ({porcentaje: tramite[0].porcentaje});
          }
        } else {
          Alert.alert (
            'Datos incorrectos',
            'No se encontró ningun trámite con los datos ingresados'
          );
          this.setState ({verificado: false});
        }
      }
      this.setState ({mostrarBoton: true});
    }
  };

  render () {
    const {
      porcentaje,
      mostrarBoton,
      verificado,
      opciones,
      shift,
      tramite,
      numero,
      codigo,
    } = this.state;
    return (
      <Animated.View
        style={[styles.container, {transform: [{translateY: shift}]}]}
      >
        <Text style={styles.text1}>
          Utilize el código que le fue entragado en ventanilla, al momento de ingresar su trámite para ver el estado de su aprobación, y evitar demoras, en observaciones
        </Text>
        <View style={{margin: 4}}>
          <RadioGroup
            radioButtons={opciones}
            onPress={this.onPress}
            flexDirection="row"
          />
        </View>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState ({numero: text})}
          value={numero}
        />
        <Text style={styles.text2}>CÓDIGO DE ACCESO</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState ({codigo: text})}
          value={codigo}
          onSubmitEditing={Platform.OS === 'android' ? this._verificar : null}
        />
        {mostrarBoton
          ? <TouchableOpacity style={styles.button} onPress={this._verificar}>
              <Text style={styles.buttonText}>VERIFICAR</Text>
            </TouchableOpacity>
          : <ActivityIndicator style={{margin: 14}} />}
        {verificado
          ? <PorcentajeBar tramite={tramite} porcentaje={porcentaje} />
          : null}
      </Animated.View>
    );
  }

  handleKeyboardDidShow = event => {
    const {height: windowHeight} = Dimensions.get ('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField ();
    if (currentlyFocusedField !== null) {
      UIManager.measure (
        currentlyFocusedField,
        (originX, originY, width, height, pageX, pageY) => {
          const fieldHeight = height;
          const fieldTop = pageY;
          const gap =
            windowHeight - (keyboardHeight - 15) - (fieldTop + fieldHeight);
          if (gap >= 0) {
            return;
          }
          Animated.timing (this.state.shift, {
            toValue: gap,
            duration: 1000,
            useNativeDriver: true,
          }).start ();
        }
      );
    }
  };

  handleKeyboardDidHide = () => {
    Animated.timing (this.state.shift, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start ();
  };
}

const styles = StyleSheet.create ({
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    margin: 10,
  },
  text1: {
    fontSize: 15,
    textAlign: 'center',
  },
  input: {
    height: 36,
    marginHorizontal: 15,
    borderColor: 'rgb(38, 168, 193)',
    borderWidth: 1,
    borderRadius: 10,
  },
  text2: {
    fontSize: 13,
    fontFamily: 'ConthraxSb-Regular',
    margin: 4,
    textAlign: 'center',
  },
  button: {
    width: 120,
    margin: 10,
    marginHorizontal: 15,
    alignItems: 'center',
    backgroundColor: 'rgb(38, 168, 193)',
    borderRadius: 10,
    padding: 6,
  },
  buttonText: {
    padding: 2,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'ConthraxSb-Regular',
    fontSize: 13,
  },
});
