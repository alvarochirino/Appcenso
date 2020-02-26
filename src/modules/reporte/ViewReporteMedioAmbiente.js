import React, { Component } from 'react';
import { View, Platform } from 'react-native';

import Encabezado from '../../components/encabezado'
import Body from './components/body'
import API from '../../../utils/api'

export default class ViewReporteMedioAmbiente extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaTipos: [],
        };
    }

    async componentDidMount() {
        const listaTipos = await API.getTipoProblemaAmbiental()
        if(listaTipos != null){
            this.setState({
                listaTipos: listaTipos
            });
        }
        console.log(this.state.listaTipos)
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white',}}>
                <Encabezado title="CIUDAD VERDE" subtitle="CUIDEMOS NUESTROS ÁRBOLES" subtitle2="DIRECCIÓN DE MEDIO AMBIENTE"/>
                <Body idDireccion={2} tipos={this.state.listaTipos} nombre="Indicar el tipo de daño"
                titulo="Los árboles nos proporcionan un medio ambiente sano y confortable, cuidemos nuestros árboles.!"/>
            </View>
        )
    }

}
