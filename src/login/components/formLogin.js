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
import {StackActions, NavigationActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import API from '../../../utils/api';

const {State: TextInputState} = TextInput;
const dismissKeyboard = require ('dismissKeyboard');

export default class FormLogin extends Component {
  constructor (props) {
    super (props);
    this.state = {
      numDocum: '',
      contraseña: '',
      mostrarBoton: true,
      shift: new Animated.Value (0),
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

  _ingresar = () => {
    const {numDocum, contraseña} = this.state;
    if (numDocum === '') {
      Alert.alert ('Número de documento no valido');
    } else if (contraseña === '') {
      Alert.alert ('Contraseña no valida');
    } else {
      this.setState ({mostrarBoton: false});
      dismissKeyboard ();
      API.login (numDocum, contraseña).then (responseData => {
        console.log ('responseData', responseData);
        if (responseData != null) {
          if (responseData.error == 'Unauthorized') {
            this.setState ({mostrarBoton: true});
            Alert.alert ('Número de documento  y/o contraseña incorrecta');
          } else if (responseData.access_token != null) {
            try {
              AsyncStorage.setItem (
                '@User:token',
                responseData.access_token
              );
              AsyncStorage.setItem (
                '@User:id',
                responseData.user.id.toString ()
              );
            } catch (e) {
              console.error ('@user', e.error);
            }
            const resetAction = StackActions.reset ({
              index: 0,
              actions: [NavigationActions.navigate ({routeName: 'Splash'})],
            });
            this.props.navigation.dispatch (resetAction);
          } else {
            this.setState ({mostrarBoton: true});
            Alert.alert ('Se produjo un error');
          }
        }
      });
    }
  };

  render () {
    const {shift, mostrarBoton} = this.state;
    return (
      <Animated.View
        style={[styles.container, {transform: [{translateY: shift}]}]}
      >
        <View style={styles.row}>
          <Text style={styles.text}>Nº DOCUMENTO:</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState ({numDocum: text})}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>CONTRASEÑA:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={text => this.setState ({contraseña: text})}
            onSubmitEditing={Platform.OS === 'android' ? this._ingresar : null}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text1}>
            {' '}*Regístrese para habilitar todas las funciones{' '}
          </Text>
        </View>
        {mostrarBoton
          ? <TouchableOpacity onPress={this._ingresar} style={styles.button}>
              <Text style={styles.buttonText}>INGRESAR</Text>
            </TouchableOpacity>
          : <ActivityIndicator style={{margin: 14}} />}
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
          const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
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
    alignItems: 'center',
    paddingVertical: 5,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 4,
  },
  text: {
    fontSize: 10,
    fontFamily: 'ConthraxSb-Regular',
    width: 108,
    color: 'black',
  },
  input: {
    width: '50%',
    height: 32,
    backgroundColor: 'silver',
    borderRadius: 10,
    paddingVertical: 0,
  },
  text1: {
    fontSize: 12,
    color: 'black',
  },
  button: {
    /* shadowOpacity: 1,
      shadowRadius: 0,
      shadowColor: 'red',
      elevation: 3,
      shadowOffset: {width: 10, height: 0}, */
    backgroundColor: '#2196F3',
    width: '38%',
    padding: 6,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'ConthraxSb-Regular',
  },
});
