import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import email from 'react-native-email';
import Modal from 'react-native-modal';

import Maps from './Maps';
import AppButton from './AppButton';

const myIcon1 = <Icon name="at-sign" size={20} color={'red'} />;
const myIcon2 = <Icon name="clock" size={20} color={'red'} />;
const myIcon3 = <Icon name="map-pin" size={20} color={'red'} />;

export default class Opciones extends Component {
  state = {
    modalHorarioVisible: false,
    modalMapVisible: false,
  };

  enviarCorreo = correo => {
    if (correo != null && correo != '') {
      const to = [correo];
      email (to).catch (console.error);
    } else {
      Alert.alert ('Aviso', 'Correo no disponible');
    }
  };

  mostrarCamino = () => {
    this.setState ({modalMapVisible: !this.state.modalMapVisible});
  };

  mostrarHorario = () => {
    this.setState ({modalHorarioVisible: !this.state.modalHorarioVisible});
  };

  llamarNumero = numero => {
    if (numero != 0) {
      Linking.openURL (`tel:${numero}`);
    }
  };

  render () {
    const {informacion} = this.props;
    const {horario, telefono, correo} = informacion;
    return (
      <View>
        <Modal isVisible={this.state.modalHorarioVisible}>
          <View style={styles.containerHorario}>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>Horario</Text>
            <Text style={styles.text}>{horario}</Text>
            <AppButton title="Salir" action={this.mostrarHorario} />
          </View>
        </Modal>
        <Modal isVisible={this.state.modalMapVisible}>
          <View style={styles.containerMapa}>
            <Maps ubicDada={informacion} />
            <View style={styles.containerCenter}>
              <AppButton title="Salir" action={this.mostrarCamino} />
            </View>
          </View>
        </Modal>
        <View>
          <View style={styles.telefono}>
            <Text
              style={styles.text}
              adjustsFontSizeToFit
              numberOfLines={1}
              onPress={() => this.llamarNumero (telefono)}
            >
              {telefono != 0 ? telefono : '-'}
            </Text>
          </View>
          <View style={styles.container}>
            <View style={styles.icon}>
              <TouchableOpacity onPress={() => this.enviarCorreo (correo)}>
                {myIcon1}
              </TouchableOpacity>
            </View>
            <View style={styles.icon}>
              <TouchableOpacity onPress={this.mostrarHorario}>
                {myIcon2}
              </TouchableOpacity>
            </View>
            <View style={styles.icon}>
              <TouchableOpacity onPress={this.mostrarCamino}>
                {myIcon3}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flexDirection: 'row',
  },
  containerCenter: {
    alignItems: 'center',
  },
  containerHorario: {
    margin: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  containerMapa: {
    flex: 1,
    backgroundColor: 'silver',
  },
  icon: {
    flex: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#c0c0c0',
    padding: 2,
    margin: 2,
  },
  telefono: {
    flex: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c0c0c0',
    padding: 2,
    margin: 2,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});
