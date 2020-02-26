import React, { Component } from 'react';
import {
   Platform,
   StyleSheet,
   Text,
   View,
   Image,
   Alert,
   TouchableOpacity,
   ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';

const myIcon1 = <Icon name="camera" size={20} color={'red'} />;
const myIcon2 = <Icon name="image" size={20} color={'red'} />;

export default class Imagen extends Component {

   constructor(props) {
      super(props);
      this.state = {
         image: null,
         images: []
      };
   }

   pickSingleWithCamera(cropping, mediaType = 'photo') {
      ImagePicker.openCamera({
         cropping: cropping,
         width: 500,
         height: 500,
         includeExif: true,
         mediaType,
      }).then(image => {
         console.log('received image', image);
         var paso;
         for (paso = 1; paso <= 3; paso++) {
            var value = AsyncStorage.getItem('@Reporte:image' + paso);
            if (value !== null) {
               AsyncStorage.removeItem('@Reporte:image' + paso)
            }
         };
         this.setState({
            image: { uri: image.path, width: image.width, height: image.height, mime: image.mime },
            images: null
         });
         try {
            AsyncStorage.setItem('@Reporte:image1', this.state.image.uri);
         } catch (e) {
            console.error('@Reporte:image1', e.error)
         }
      }).catch(e => console.log(e));
   }

   pickMultiple() {
      ImagePicker.openPicker({
         multiple: true,
         waitAnimationEnd: false,
         includeExif: true,
         forceJpg: true,
      }).then(images => {
         AsyncStorage.removeItem('@Reporte:image')
         if (images.length < 4) {
            var paso;
            for (paso = 1; paso <= 3; paso++) {
               var value = AsyncStorage.getItem('@Reporte:image' + paso);
               if (value !== null) {
                  AsyncStorage.removeItem('@Reporte:image' + paso)
               }
            };
            this.setState({
               image: null,
               images: images.map(i => {
                  console.log('received image', i);
                  return { uri: i.path, width: i.width, height: i.height, mime: i.mime };
               })
            });
            var paso;
            for (paso = 1; paso <= this.state.images.length; paso++) {
               try {
                  AsyncStorage.setItem('@Reporte:image' + paso, this.state.images[paso-1].uri);
               } catch (e) {
                  console.error('@Reporte:image' + paso, e.error)
               }
               //console.log('asyn', AsyncStorage.getItem('@Reporte:image' + paso));
            };
         } else {
            Alert.alert('solo debe seleccionar al menos 3 imagenes')
            return
         }
      }).catch(e => console.log(e));
   }

   renderImage(image) {
      return <Image style={styles.logo} source={image} />
   }

   renderAsset(image) {
      return this.renderImage(image);
   }

   render() {
      return (
         <View style={styles.container}>
            <View style={styles.item}>
               <View style={styles.left}>
                  <Text style={styles.text}>{this.props.titulo}</Text>
               </View>
               <View style={styles.right}>
                  <TouchableOpacity
                     style={styles.icon}
                     onPress={() => this.pickSingleWithCamera(false)}
                  >
                     {myIcon1}
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={styles.icon}
                     onPress={this.pickMultiple.bind(this)}
                  >
                     {myIcon2}
                  </TouchableOpacity>
               </View>
            </View>
            <ScrollView horizontal >
               {this.state.image ? this.renderAsset(this.state.image) : null}
               {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
            </ScrollView>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   containerImage: {
      paddingHorizontal: 10,
      flexDirection: 'column',
   },
   right: {
      flex: 18,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
   },
   left: {
      flex: 82,
      flexDirection: 'row',
      justifyContent: 'center',
   },
   text: {
      color: 'black',
      margin: 3,
      fontSize: 16,
   },
   item: {
      flexDirection: 'row',
   },
   icon: {
      flex: 1,
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '#c0c0c0',
      padding: 2,
      margin: 2,
   },
});