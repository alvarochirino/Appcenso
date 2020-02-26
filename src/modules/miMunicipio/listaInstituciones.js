import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux'

import Institucion from './institucion'
import API from '../../../utils/api'

/* function mapStateToProps(state){
   return {
      list: state.listaInstituciones
   }
} */

export default class ViewListaInstituciones extends Component {

   constructor(props) {
      super(props);
      this.state = {
         Instituciones: []
      };
   }

   async componentDidMount() {
      const listaInstituciones = await API.getInstituciones(this.props.id);
      if(listaInstituciones != null){
         //console.log('listaInstituciones', listaInstituciones)
         this.setState({
            Instituciones: listaInstituciones,
         })
         /* this.props.dispatch({
            type: 'SET_INSTITUCIONES_LIST'+this.props.id,
            payload: {
               listaInstituciones
            },
            id: this.props.id
         }) */
      }
   }

   keyExtractor = item => item.id.toString()

   renderItem = ({ item }) => {
      return (
         <Institucion {...item} />
      )
   }

   render() {
      return (
         <View>
            <FlatList
               keyExtractor={this.keyExtractor}
               //data={this.props.list}
               data={this.state.Instituciones}
               renderItem={this.renderItem}
            />
         </View>
      )
   }
}

//export default connect(mapStateToProps)(ViewListaInstituciones);