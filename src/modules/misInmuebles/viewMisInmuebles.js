import React, { Component } from 'react';
import { View, Platform, StyleSheet, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';

import Encabezado from '../../components/encabezado'
import Entradas from './components/entradas'
import { Dropdown } from 'react-native-material-dropdown';
import API from '../../../utils/api'

export default class ViewMisInmuebles extends Component {

   constructor(props) {
      super(props);
      this.state = {
         listaTiposInmuebles: [],
         listaRequisitos: [],
         //idTipoTramite: null,
         costo: null,
         dias: null,
      };
   }

   async componentDidMount() {
      this.setState({
         listaTiposInmuebles: await API.getTipoTramite()
      });
   }

   /* mostrarRequisitos = async () => {
      this.setState({
         listaRequisitos: await API.getRequisito(this.state.idTipoTramite)
      })
   } */

   mostrarAclaracion = async (value, index) => {
      let lista = await API.getRequisito(this.state.listaTiposInmuebles[index].id)
      if (lista != null) {
         this.setState({
            costo: this.state.listaTiposInmuebles[index].costo,
            dias: this.state.listaTiposInmuebles[index].dias,
            listaRequisitos: lista
         })
      }
      /* this.setState({
         aclaracion: this.state.listaTiposInmuebles[index].aclaracion,
         idTipoTramite: this.state.listaTiposInmuebles[index].id,
         listaRequisitos: []
      }) */
   }

   keyExtractor = item => item.nombre.toString()

   renderItem = ({ item }) => {
      return (
         <Text style={styles.text}>- {item.nombre}</Text>
      )
   }

   render() {
      return (
         <View style={{ flex: 1 }}>
            <Encabezado title="MIS INMUEBLES" subtitle="MEJORANDO PARA" subtitle2="ATENDERLO MEJOR" navigation={this.props.navigation}/>
            <ScrollView style={{ flex: 1 }}>
               <Entradas />
               {/* <View style={{ marginHorizontal: 20 }}>
                  <Dropdown
                     label='Indicar tipo de tramite'
                     fontSize={16}
                     textColor={"rgb(0, 0, 0)"}
                     data={this.state.listaTiposInmuebles}
                     onChangeText={this.mostrarAclaracion}
                  />
                  {this.state.costo ?
                     <View>
                        <Text style={styles.text}>
                           <Text style={styles.text2}>Costo: </Text>
                           {this.state.costo} Bs
                        </Text>
                        <Text style={styles.text}>
                           <Text style={styles.text2}>Días laborales aprox.: </Text>
                           {this.state.dias}
                        </Text>
                     </View>
                     : null}
                  {this.state.listaRequisitos.length > 0 ?
                     <View style={{ marginVertical: 6, backgroundColor: 'whitesmoke' }}>
                        <Text style={styles.text2}>Requisitos: </Text>
                        <FlatList
                           keyExtractor={this.keyExtractor}
                           data={this.state.listaRequisitos}
                           renderItem={this.renderItem}
                        />
                     </View>
                     : null}
               </View> */}
            </ScrollView>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   text: {
      fontSize: 16,
      paddingHorizontal: 4,
      color: 'black'
   },
   text2: {
      fontSize: 16,
      paddingHorizontal: 4,
      marginTop: 4,
      color: 'black',
      fontWeight: 'bold',
   },
   button: {
      alignItems: 'center',
      marginVertical: 6,
      width: 120,
      backgroundColor: 'rgb(227, 147, 2)',
      padding: 6,
      borderRadius: 10
   },
   buttonText: {
      color: 'white',
      textAlign: 'center',
   },
})