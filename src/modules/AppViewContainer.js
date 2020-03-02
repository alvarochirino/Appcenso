import React, { Component } from 'react';
import { Text, ActivityIndicator, View, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, ImageBackground, SafeAreaView } from 'react-native';
import Carousel from 'react-native-banner-carousel';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import API from '../../utils/api'
import Pages from './PagesView'
import ViewEncuesta from './encuesta/ViewEncuesta'

const myIcon = <Icon name="youtube-play" size={40} color={'red'} />;

export default class AppViewContainer extends Component {

   constructor(props) {
      super(props);
      this.state = {
         imagenes: [],
         mensaje: '',
      };
   }

   async componentDidMount() {
      const listaImagenes = await API.getImagenCampaña();
      if (listaImagenes != null) {
         this.setState({
            imagenes: listaImagenes,
         })
      }
   }


   logout = () => {
      AsyncStorage.removeItem('@User:access_token')
      AsyncStorage.removeItem('@User:id')
      if (true) {//logout
         const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
         });
         this.props.navigation.dispatch(resetAction);
      }
   }

   mensaje() {
      /* setTimeout(() => {
         if(this.state.imagenes.length == 0){
            this.setState({
               mensaje: 'Compruebe su conexión a internet',
            })
            Alert.alert(this.state.mensaje)
         }
      }, 10000) */
   }

   verVideos = (url) => {
      let inicio = url.indexOf("v=");
      let final = url.indexOf("&");
      if (final == -1) final = url.length
      let id = url.substring(inicio + 2, final);
      //console.log(id);
      if (true) {
         this.props.navigation.navigate('ViewVideos', { video: id });
      }
   }

   renderPage(image, index) {
      return (
         <View key={index}>
            {image.link ?
               <View>
                  <View style={styles.backgroundContainer}>
                     <Image style={styles.image} source={{ uri: image.imagen }} />
                  </View>
                  <View style={styles.icon}>
                     <TouchableOpacity onPress={() => this.verVideos(image.link)}>
                        {myIcon}
                     </TouchableOpacity>
                  </View>
               </View>
               :
               <Image style={styles.image} source={{ uri: image.imagen }} />
            }
         </View>
      );
   }

   render() {
      return (
          <View  style={styles.container}>
          <SafeAreaView style={{backgroundColor: 'green'}}>
         <ScrollView>
          
            <View style={styles.containerImage}>
               {this.state.imagenes.length > 0 ?
                  <Carousel
                     autoplay
                     autoplayTimeout={5000}
                     loop
                     index={0}
                  >
                     {this.state.imagenes.map((image, index) => this.renderPage(image, index))}
                  </Carousel>
                  : (<View style={styles.containerImage}>
                     <ActivityIndicator />
                     <Text>Cargando...</Text>
                     {this.mensaje()}
                  </View>)
               }
            </View>
            <ViewEncuesta />
            <Pages navigation={this.props.navigation} />
            <View style={styles.containerLogo} >
               <TouchableOpacity onPress={this.logout} style={styles.button}>
                  <Text style={styles.buttonText}>Cerrar Sesion</Text>
               </TouchableOpacity>
               <Image style={styles.logo} source={require('../../assets/smartcat.png')} />
            </View>
                                                  
         </ScrollView>
                                                  </SafeAreaView>
                                                  </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column'
   },
   containerImage: {
      height: 280,
      alignItems: 'center',
      justifyContent: 'center'
   },
   backgroundContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
   },
   image: {
      height: 280,
      resizeMode: 'contain',
      //backgroundColor: 'gray'
   },
   containerLogo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 5,
      marginHorizontal: 10,
   },
   logo: {
      width: '33%',
      height: 12,
      resizeMode: 'contain',
   },
   button: {
      width: 100,
      padding: 4,
      borderRadius: 10
   },
   buttonText: {
      color: 'black',
      textAlign: 'center',
      textDecorationLine: 'underline'
   },
   icon: {
      position: 'absolute',
      top: 125,
      right: '43.5%',
      /* flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'red' */
   },
});
