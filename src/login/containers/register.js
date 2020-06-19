import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import FormRegister from "../components/formRegister";
export default class Register extends Component {
  volver = () => {
    this.props.navigation.goBack(null);
    return true;
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../../assets/escudo.jpg")}
              style={styles.image}
            />
          </View>
          <Text style={styles.txt}>REGISTRO DE USUARIO</Text>
          <FormRegister navigation={this.props.navigation} />
          {Platform.OS === "ios" ? (
            <TouchableOpacity onPress={this.volver}>
              <Text style={styles.buttonText}>Volver a login</Text>
            </TouchableOpacity>
          ) : null}
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../../assets/logo.png")}
              style={styles.logo}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginHorizontal: 5,
    marginVertical: 10,
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: "contain",
  },
  txt: {
    fontSize: 18,
    fontFamily: "ConthraxSb-Regular",
    color: "black",
    textAlign: "center",
    margin: 4,
  },
  buttonText: {
    color: "black",
    textDecorationLine: "underline",
    margin: 5,
    marginBottom: 10,
  },
  logo: {
    height: 80,
    width: 70,
    resizeMode: "contain",
  },
});
