import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export default class AppButton extends Component {
  render () {
    const {action, title, color} = this.props;
    return (
      <TouchableOpacity
        style={[styles.button, {backgroundColor: color}]}
        onPress={action}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create ({
  button: {
    alignItems: 'center',
    marginVertical: 6,
    width: 140,
    padding: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
