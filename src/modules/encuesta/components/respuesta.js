import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

export default class Respuesta extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: this.props.ListaDeRespuestas,
      };
   }

   componentDidMount() {   
      global.MyVar[this.props.pos] = this.state.data[0].id
      console.log('global.MyVar', global.MyVar)
   }

   onPress = () => { 
      global.MyVar[this.props.pos] = this.state.data.find(e => e.selected == true).id,
      console.log('global.MyVar', global.MyVar)
   }

   render() {  
      return (
         <View style={styles.container}>
            <RadioGroup radioButtons={this.state.data} onPress={this.onPress} />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
   },
   text: {
      fontSize: 14,
      textAlign: 'center',
      margin: 5,
   },

});