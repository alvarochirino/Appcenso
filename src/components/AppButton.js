import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';

export default class AppButton extends Component {
  render () {
    const {action, title, color, width} = this.props;
    return (
      <TouchableOpacity
        style={{
          backgroundColor: color || '#808080',
          width: width || '95%',
          alignItems: 'center',
          marginVertical: 6,
          padding: 8,
          borderRadius: 10,
        }}
        onPress={action}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 12,
            textAlign: 'center',
            fontFamily: 'ConthraxSb-Regular',
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}
