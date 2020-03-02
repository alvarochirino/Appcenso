import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Carousel from 'react-native-banner-carousel';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import API from '../../utils/api'
import Pages from './PagesView'

const myIcon = <Icon name="youtube-play" size={40} color={'red'} />;

class AppViewInvitadoContainers extends Component {

   constructor(props) {
      super(props);
      this.state = {
         imagenes: [],
      };
   }

   async componentDidMount() {
      const listaImagenes = await API.getImagenCampaña();
      if (listaImagenes.length != null) {
         this.setState({
            imagenes: listaImagenes,
         })
      }
   }

   volver = () => {
      this.props.navigation.goBack(null);
      return true;
   }

   verVideos = (url) => {
      let inicio = url.indexOf("v=");
      let final = url.indexOf("&");
      if (final == -1) final = url.length
      let id = url.substring(inicio + 2, final);
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
         <ScrollView style={styles.container}>
            <View style={styles.containerImage}>
               {this.state.imagenes.length > 0 ?
                  <Carousel
                     autoplay
                     autoplayTimeout={6000}
                     loop
                     index={0}
                  >
                     {this.state.imagenes.map((image, index) => this.renderPage(image, index))}
                  </Carousel>
                  : (<View style={styles.containerImage}>
                     <ActivityIndicator />
                     <Text>Cargando...</Text>
                  </View>)
               }
            </View>
            <Pages navigation={this.props.navigation} />
            <View style={styles.containerLogo} >
               <TouchableOpacity onPress={this.volver} style={styles.button}>
                  <Text style={styles.buttonText}>Volver a login</Text>
               </TouchableOpacity>
               <Image style={styles.logo} source={require('../../assets/smartcat.png')} />
            </View>
         </ScrollView>
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
   },
});

export default AppViewInvitadoContainers 