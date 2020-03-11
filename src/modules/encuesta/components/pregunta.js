import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import API from '../../../../utils/api'
import Respuesta from './respuesta'

export default class Pregunta extends Component {
   constructor(props) {
      super(props);
      this.state = {
         hayPreguntas: false,
         respuestas: [],
      };
   }

   async componentDidMount() {
      const listaRespuestas = await API.getRespuestas(this.props.id);
      if (listaRespuestas != null) {
         this.setState({
            hayPreguntas: true,
            respuestas: listaRespuestas,
         })
      }
   }

   render() {
      const hayPreguntas = this.state.hayPreguntas;
      let respuesta;
      if (hayPreguntas) {
         respuesta = <Respuesta ListaDeRespuestas={this.state.respuestas} pos={this.props.pos} />
      }
      return (
         <View style={styles.container}>
            <Text style={styles.text}>{this.props.pregunta}</Text>
            {respuesta}
         </View>
      );
   }

}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',
   },
   text: {
      fontSize: 16,
      textAlign: 'center',
      margin: 5,
   },

});