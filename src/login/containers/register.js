import React, {Component} from 'react';

import FormRegister from '../components/formRegister'

export default class Register extends Component{

  render() {
    return (
        <FormRegister navigation={this.props.navigation}/>
    );
  }
    
}