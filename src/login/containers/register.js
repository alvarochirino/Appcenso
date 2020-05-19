import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import FormRegister from '../components/formRegister';
export default class Register extends Component {
  volver = () => {
    this.props.navigation.goBack (null);
    return true;
  };

  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require ('../../../assets/escudo.jpg')}
            style={styles.image}
          />
        </View>
        <Text style={styles.txt}>REGISTRO DE USUARIO</Text>
        <FormRegister navigation={this.props.navigation} />
        {Platform.OS === 'ios'
          ? <TouchableOpacity onPress={this.volver}>
              <Text style={styles.buttonText}>Volver a login</Text>
            </TouchableOpacity>
          : null}
        <View style={{alignItems: 'center'}}>
          <Image
            source={require ('../../../assets/logo.png')}
            style={styles.logo}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    backgroundColor: 'white',
    margin: 5,
  },
  image: {
    height: 110,
    width: 110,
    resizeMode: 'contain',
  },
  txt: {
    fontSize: 17,
    fontFamily: 'ConthraxSb-Regular',
    color: 'black',
    textAlign: 'center',
    margin: 4,
  },
  buttonText: {
    color: 'black',
    textDecorationLine: 'underline',
    margin: 5,
    marginBottom: 10,
  },
  logo: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
  },
});
