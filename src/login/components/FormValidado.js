import React, { Component } from 'react';
import { Animated, Dimensions, Keyboard, StyleSheet, TextInput, UIManager, View, Text, TouchableOpacity, Alert } from 'react-native';

const { State: TextInputState } = TextInput;

export default class App extends Component {
  state = {
    shift: new Animated.Value(0),
  };

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  render() {
    const { shift } = this.state;
    return (
      <Animated.View style={[styles.container, { transform: [{ translateY: shift }] }]}>
        <View style={styles.row}>
          <Text style={styles.text}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={(text) => this.validate(text, 'nombre')}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Correo</Text>
          <TextInput
            style={styles.input}
            placeholder="correo"
            textContentType="emailAddress"
            onChangeText={(text) => this.validate(text, 'correo')}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={true}
            onChangeText={(text) => this.validate(text, 'contraseña')}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}></Text>
          <Text style={{ width: 250 }}>
            La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. No puede tener otros símbolos.
               </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Vuelva a repetir la contraseña"
            secureTextEntry={true}
            onChangeText={(text) => this.validate(text, 'contraseña2')}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Vuelva a repetir la contraseña"
            secureTextEntry={true}
            onChangeText={(text) => this.validate(text, 'contraseña2')}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Vuelva a repetir la contraseña"
            secureTextEntry={true}
            onChangeText={(text) => this.validate(text, 'contraseña2')}
          />
        </View>
        <TouchableOpacity onPress={this._onPressButton} style={styles.button}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

      </Animated.View>
    );
  }

  handleKeyboardDidShow = (event) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
      if (gap >= 0) {
        return;
      }
      Animated.timing(
        this.state.shift,
        {
          toValue: gap,
          duration: 1000,
          useNativeDriver: true,
        }
      ).start();
    });
  }

  handleKeyboardDidHide = () => {
    Animated.timing(
      this.state.shift,
      {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 5,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 5,
  },
  text: {
    width: 80,
    color: 'black',
    margin: 6,
  },
  input: {
    width: 250,
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 1,
  },
  button: {
    margin: 2,
    width: 108,
    backgroundColor: '#2196F3',
    padding: 5,
    borderRadius: 10
  },
  buttonText: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
});