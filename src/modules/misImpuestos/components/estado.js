import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList } from 'react-native';
import API from '../../../../utils/api';

export default class Estado extends Component {

   constructor(props) {
      super(props);
      this.state = {
         gestiones: [],
         tieneMonto: false
      };
   }

   async componentDidMount() {
      this.setState({
         gestiones: await API.getInformacion(this.props.codigo, this.props.estado)
      })
      if (this.state.gestiones.length != 0 && this.state.gestiones[0].fecha_vencimiento != null) {
         this.setState({
            tieneMonto: true
         })
      }
   }

   keyExtractor = item => item.id.toString()

   itemSeparator = () => <Text style={styles.text}>,</Text>

   renderItem = ({ item }) => {
      return (
         <Text style={styles.text}> {item.gestion}</Text>
      )
   }

   render() {
      return (
         <View style={styles.container}>
            <View style={styles.left}>
               <Text style={styles.text}>{this.props.estado}:</Text>
            </View>
            <View style={styles.right}>
               {this.state.tieneMonto ?
                  <Text style={styles.text}>
                     La actual gestion vence el {this.state.gestiones[0].fecha_vencimiento}, el monto a pagar es de {this.state.gestiones[0].monto}
                  </Text>
                  :
                  <FlatList
                     horizontal
                     keyExtractor={this.keyExtractor}
                     ItemSeparatorComponent={this.itemSeparator}
                     data={this.state.gestiones}
                     renderItem={this.renderItem}
                  />
               }
            </View>
         </View >
      );
   }
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: 'white',
      flexDirection: 'row',
      padding: 5,
   },
   text: {
      fontSize: 16,
   },
   left: {
      flex: 24,
      paddingVertical: 5,
      paddingHorizontal: 2,
      
   },
   right: {
      flex: 76,
      paddingVertical: 5,
   },
})