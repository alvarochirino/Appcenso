import React, { Component } from 'react';
import { View, Platform, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux'

import API from '../../../utils/api'
import Encabezado from '../../components/encabezado'
import Informacion from '../../components/informacion'
import Separator from '../encuesta/components/vertical-separator'
import ListaInstituciones from './listaInstituciones'

function mapStateToProps(state) {
   return {
      list: state.listaTipos
   }
}

class ViewMiMunicipio extends Component {

   constructor(props) {
      super(props);
      /* this.state = {
        listaTipos: [],
      }; */
   }

   async componentDidMount() {
      const listaTipos = await API.getTiposInstituciones();
      if(listaTipos != null){
         /* console.log(listaTipos)
         this.setState({
           listaTipos: listaTipos,
         }) */
         this.props.dispatch({
            type: 'SET_TIPOS_INSTITUCIONES_LIST',
            payload: {
               listaTipos
            }
         })
      }
   }

   keyExtractor = item => item.nombre.toString()

   itemSeparator = () => <Separator />

   renderItem = ({ item }) => {
      return (
         <ListaInstituciones {...item} />
      )
   }

   render() {
      return (
         <View style={{ flex: 1 }}>
            <Encabezado title="MI MUNICIPIO" subtitle="GUÍA TELEFÓNICA" subtitle2="NÚMEROS DE EMERGENCIA" navigation={this.props.navigation}/>
            <FlatList
               keyExtractor={this.keyExtractor}
               ItemSeparatorComponent={this.itemSeparator}
               data={this.props.list}
               renderItem={this.renderItem}
            />
            <Informacion />
         </View>
      )
   }
}

export default connect(mapStateToProps)(ViewMiMunicipio);