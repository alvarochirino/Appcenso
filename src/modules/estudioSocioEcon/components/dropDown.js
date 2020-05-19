import React, {Component} from 'react';
import {Dropdown} from 'react-native-material-dropdown';

export default class DropdownComp extends Component {

  render () {
    const {label, data, onChangeText} = this.props;
    return (
      <Dropdown
        label={label}
        data={data}
        onChangeText = {onChangeText}
        fontSize={16}
        baseColor={'rgb(0, 0, 0)'}
        textColor={'rgb(0, 0, 0)'}
        containerStyle={{width: '85%'}}
      />
    );
  }
}
