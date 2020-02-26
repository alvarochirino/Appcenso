import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";
 
export default class ModalTester extends Component {
  state = {
    isModalVisible: false
  };
 
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
 
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button title="Show modal" onPress={this.toggleModal} />
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{margin: 25, backgroundColor: '#fff', }}>
            <Text>Hello!</Text>
            <Button title="Salir" onPress={this.toggleModal} />
          </View>
        </Modal>
      </View>
    );
  }
}