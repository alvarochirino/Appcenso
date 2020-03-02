import React, { Component } from 'react';
import { 
    View, 
    Platform, 
} from 'react-native';

import Encabezado from '../../components/encabezado'
import Busqueda from './components/busqueda'

export default class ViewVendeCiudad extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Encabezado title="VENDE CIUDAD" subtitle="GUÍA COMERCIAL de" subtitle2='ACTIVIDADES ECONÓMICA' navigation={this.props.navigation}/>
                <Busqueda/>               
            </View>
        )
    }

}