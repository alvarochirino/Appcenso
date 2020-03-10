import React, { Component } from 'react';
import {
   Text,
   View,
   StyleSheet,
   Alert,
   TextInput,
   TouchableOpacity,
   ScrollView,
   Image,
   ActivityIndicator,
   Animated, Dimensions, Keyboard, UIManager,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Textarea from 'react-native-textarea';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from "react-native-modal";

import API from '../../../../utils/api'
import Maps from '../../vendeCiudad/components/maps'

const { State: TextInputState } = TextInput;
const myIcon1 = <Icon name="camera" size={20} color={'red'} />;
const myIcon2 = <Icon name="image" size={20} color={'red'} />;

export default class Body extends Component {

   constructor(props) {
      super(props);
      this.state = {
         idTipoProblema: '',
         aclaracion: '',
         observacion: '',
         shift: new Animated.Value(0),
         image: null,
         images: [],
         modal: false,
         hayUbicacion: false,
         mostrarEnviar: true,
      };
   }

   componentWillMount() {
      this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
      this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
   }

   componentWillUnmount() {
      this.keyboardDidShowSub.remove();
      this.keyboardDidHideSub.remove();
   }

   pickSingleWithCamera(cropping, mediaType = 'photo') {
      ImagePicker.openCamera({
         cropping: cropping,
         compressImageMaxWidth: 600,
         compressImageMaxHeight: 700,
         compressImageQuality: 1,
         includeExif: true,
         mediaType,
         includeBase64: true
      }).then(image => {
         console.log('received image', image);
         for (var paso = 1; paso <= 3; paso++) {
            var value = AsyncStorage.getItem('@Reporte:image' + paso);
            if (value !== null) {
               AsyncStorage.setItem('@Reporte:image' + paso, '');
            }
         };
         this.setState({
            image: { uri: image.path, width: image.width, height: image.height, data: image.data },
            images: null
         });
         console.log('image', this.state.image);
      }).catch(e => console.log('error', e));
   }

   pickMultiple() {
      ImagePicker.openPicker({
         multiple: true,
         cropping: true,
         compressImageMaxWidth: 600,
         compressImageMaxHeight: 700,
         compressImageQuality: 1,
         waitAnimationEnd: false,
         includeExif: true,
         includeBase64: true,
      }).then(images => {
         AsyncStorage.removeItem('@Reporte:image')
         if (images.length < 4) {
            for (var paso = 1; paso <= 3; paso++) {
               var value = AsyncStorage.getItem('@Reporte:image' + paso);
               if (value !== null) {
                  AsyncStorage.setItem('@Reporte:image' + paso, '');
               }
            };
            this.setState({
               image: null,
               images: images.map(i => {
                  console.log('received image', i);
                  return { uri: i.path, width: i.width, height: i.height, data: i.data };
               })
            });
            console.log('images', this.state.images);
         } else {
            Alert.alert('Seleccionar máximo 3 imagenes')
            return
         }
      }).catch(e => console.log('error', e));
   }

   renderImage(image) {
      return <Image style={styles.image} source={image} />
   }

   renderAsset(image) {
      return this.renderImage(image);
   }

   _onPressButton = async () => {
      if (this.state.image == null && this.state.images.length == 0) {
         Alert.alert('Por favor subir una foto o imagen')
      } else if (this.state.idTipoProblema == '') {
         Alert.alert('Por favor indicar el tipo de daño')
      } else if (!this.state.hayUbicacion) {
         Alert.alert('Por favor indicar una ubicacion')
      } else {
         this.setState({ mostrarEnviar: false })
         try {
            AsyncStorage.setItem('@Reporte:idTipoProblema', this.state.idTipoProblema.toString());
            AsyncStorage.setItem('@Reporte:observacion', this.state.observacion);
            if (this.state.image != null) {
               AsyncStorage.setItem('@Reporte:image1', 'data:image/png;base64,' + this.state.image.data);
            } else {
               var paso;
               for (paso = 1; paso <= this.state.images.length; paso++) {
                  try {
                     AsyncStorage.setItem('@Reporte:image' + paso, 'data:image/png;base64,' + this.state.images[paso - 1].data);
                  } catch (e) {
                     console.error('@Reporte:image' + paso, e.error)
                  }
               };
            }
         } catch (e) {
            console.error('@Reporte', e.error)
         }
         var observacion = await AsyncStorage.getItem('@Reporte:observacion');
         console.log('observacion', observacion)
         var latitud = await AsyncStorage.getItem('@Reporte:latitud');
         console.log('latitud', latitud)
         var longitud = await AsyncStorage.getItem('@Reporte:longitud');
         console.log('longitud', longitud)
         var imagen1 = await AsyncStorage.getItem('@Reporte:image1');
         console.log('imagen1', imagen1)
         var imagen2 = await AsyncStorage.getItem('@Reporte:image2');
         console.log('imagen2', imagen2)
         var imagen3 = await AsyncStorage.getItem('@Reporte:image3');
         console.log('imagen3', imagen3)
         var idUsuario = await AsyncStorage.getItem('@User:id');
         console.log('idUsuario', idUsuario)
         var idTipoProblema = await AsyncStorage.getItem('@Reporte:idTipoProblema');
         console.log('id tipo DE problma', idTipoProblema)
         //debugger;

         let inserto = await API.guardarReporte(observacion, latitud, longitud, imagen1, imagen2, imagen3, idUsuario, idTipoProblema, this.props.idDireccion)
         //let inserto = await API.guardarReporte(observacion, latitud, longitud, imagen1, "base64", "base64", idUsuario, idTipoProblema, this.props.idDireccion)
         console.log('inserto?', inserto)
         if (inserto != null) {
            if (inserto.message == 'ok') {
               Alert.alert('Gracias por su aporte')
               this.setState({
                  image: null,
                  images: [],
               })
               this.setState({ mostrarEnviar: true })
            } else {
               Alert.alert('Hubo una error al momento de enviar, inténtelo de nuevo por favor')
               this.setState({ mostrarEnviar: true })
            }
         } else {
            Alert.alert('No se pudo enviar su reporte, inténtelo de nuevo por favor')
            this.setState({ mostrarEnviar: true })
         }
      }
   }

   mostrarMapa = () => {
      this.setState({ modal: true });
   }

   ocultarMapa = () => {
      this.setState({
         modal: false,
         hayUbicacion: true
      });
   }

   mostrarAclaracion = (value, index) => {
      this.setState({
         aclaracion: this.props.tipos[index].aclaracion,
         idTipoProblema: this.props.tipos[index].id,
      })
      //console.log(this.state.idTipoProblema)
   }

   onChange = (text) => {
      this.setState({
         observacion: text,
      })
   }

   render() {
      const { shift } = this.state;
      return (
         <Animated.ScrollView style={[styles.container, { transform: [{ translateY: shift }] }]}>
            <Modal isVisible={this.state.modal}>
               <View style={{ flex: 1, backgroundColor: 'silver' }}>
                  <Maps ubicacionIncidencia={true} />
                  <TouchableOpacity
                     style={styles.buttonModal}
                     onPress={this.ocultarMapa}>
                     <Text style={{ color: 'black' }}>Seleccionar Ubicacion y salir</Text>
                  </TouchableOpacity>
               </View>
            </Modal>

            <View style={styles.containerImage}>
               <View style={styles.item}>
                  <View style={styles.left}>
                     <Text style={styles.text}>{this.props.titulo}</Text>
                  </View>
                  <View style={styles.right}>
                     <TouchableOpacity
                        style={styles.icon}
                        onPress={() => this.pickSingleWithCamera(true)}
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

            <Dropdown
               label={this.props.nombre}
               fontSize={16}
               textColor={"rgb(0, 0, 0)"}
               data={this.props.tipos}
               onChangeText={this.mostrarAclaracion}
            />
            <Text style={styles.text}>{this.state.aclaracion}</Text>
            <Textarea
               containerStyle={styles.textareaContainer}
               style={styles.textarea}
               onChangeText={(text) => this.onChange(text)}
               maxLength={100}
               placeholder={'Escribe tu observacion'}
               placeholderTextColor={'#c7c7c7'}
               underlineColorAndroid={'transparent'}
            />

            {this.state.hayUbicacion ?
               <TouchableOpacity
                  style={styles.button3}
                  onPress={this.mostrarMapa}>
                  <Text style={styles.buttonText}>Ubicación asignada - Modificar</Text>
               </TouchableOpacity>
               :
               <TouchableOpacity
                  style={styles.button2}
                  onPress={this.mostrarMapa}>
                  <Text style={styles.buttonText}>Seleccione la ubicación</Text>
               </TouchableOpacity>
            }

            {this.state.mostrarEnviar ?
               <TouchableOpacity
                  style={styles.button}
                  onPress={this._onPressButton}>
                  <Text style={styles.buttonText}>ENVIAR</Text>
               </TouchableOpacity>
               : <ActivityIndicator style={{ margin: 18 }} />
            }
         </Animated.ScrollView>
      );
   }

   handleKeyboardDidShow = (event) => {
      const { height: windowHeight } = Dimensions.get('window');
      const keyboardHeight = event.endCoordinates.height;
      const currentlyFocusedField = TextInputState.currentlyFocusedField();
      UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
         const fieldHeight = height;
         const fieldTop = pageY;
         const gap = (windowHeight - (keyboardHeight - 150)) - (fieldTop + fieldHeight);
         if (gap >= 0) {
            return;
         }
         Animated.timing(
            this.state.shift,
            {
               toValue: gap,
               duration: 1000,
               useNativeDriver: true,
            }
         ).start();
      });
   }

   handleKeyboardDidHide = () => {
      Animated.timing(
         this.state.shift,
         {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
         }
      ).start();
   }
}

const styles = StyleSheet.create({
   container: {
      margin: 10,
      marginTop: 0,
      flexDirection: 'column',
   },
   textareaContainer: {
      height: 90,
      padding: 5,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: 'rgb(38, 168, 193)',
   },
   textarea: {
      textAlignVertical: 'top',  // hack android
      height: 80,
   },
   button: {
      alignItems: 'center',
      marginVertical: 6,
      width: 100,
      backgroundColor: '#808080',
      padding: 8,
      borderRadius: 10
   },
   button2: {
      alignItems: 'center',
      marginTop: 6,
      backgroundColor: '#808080',
      padding: 8,
      borderRadius: 10
   },
   button3: {
      alignItems: 'center',
      marginTop: 6,
      backgroundColor: 'rgb(38, 168, 193)',
      padding: 8,
      borderRadius: 10
   },
   buttonText: {
      color: 'white',
      textAlign: 'center',
   },

   containerImage: {
      paddingHorizontal: 5,
      flexDirection: 'column',
   },
   right: {
      flex: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
   },
   left: {
      flex: 80,
      flexDirection: 'row',
      justifyContent: 'center',
   },
   text: {
      color: 'black',
      margin: 5,
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
   image: {
      width: 120,
      height: 170,
      resizeMode: 'contain',
      margin: 2
   },
   /* input: {
      //backgroundColor: 'white',
      borderColor: 'gray',
      borderWidth: 1,
   }, */
   buttonModal: {
      alignItems: 'center',
      padding: 10
   },
})