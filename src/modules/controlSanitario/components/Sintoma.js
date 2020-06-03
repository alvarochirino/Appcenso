import React, {Component} from 'react';

import {CheckBox} from 'react-native-elements';

class Sintoma extends Component {
  constructor (props) {
    super (props);
    this.state = {
      checked: false,
      covid: props.covid,
      dengue: props.dengue,
    };
  }

  _onPress = async () => {
    await this.setState ({checked: !this.state.checked});
    const {checked, covid, dengue} = this.state;
    if (checked) {
      global.resultadoSum[0] += covid;
      global.resultadoSum[1] += dengue;
    } else {
      global.resultadoSum[0] -= covid;
      global.resultadoSum[1] -= dengue;
    }
  };

  render () {
    const {pregunta, numero} = this.props;
    let preg = pregunta;
    if (numero !== 0) {
      preg += ' ' + numero + ')';
    }
    return (
      <CheckBox
        title={preg}
        right
        iconRight
        checked={this.state.checked}
        onPress={this._onPress}
        textStyle={{
          flex: 1,
          textAlign: 'left',
          fontSize: 16,
        }}
        containerStyle={{
          paddingHorizontal: 4,
        }}
      />
    );
  }
}

export default Sintoma;
