import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import Textarea from 'react-native-textarea';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import {
  check,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

import API from '../../../../utils/api';
import Maps from 'pruebas/src/components/Maps';
import Dropdown from 'pruebas/src/components/DropDown';
import AppButton from 'pruebas/src/components/AppButton';

const myIcon1 = <Icon name="camera" size={20} color={'red'} />;
const myIcon2 = <Icon name="image" size={20} color={'red'} />;

export default class Body extends Component {
  constructor (props) {
    super (props);
    this.state = {
      idTipoProblema: '',
      aclaracion: '',
      observacion: '',
      image: null,
      images: [],
      modal: false,
      hayUbicacion: false,
      mostrarEnviar: true,
    };
  }

  pickSingleWithCamera (cropping, mediaType = 'photo') {
    ImagePicker.openCamera ({
      cropping: cropping,
      compressImageMaxWidth: 650,
      compressImageMaxHeight: 800,
      compressImageQuality: 1,
      includeExif: true,
      mediaType,
      includeBase64: true,
    })
      .then (image => {
        console.log ('received image', image);
        //TODO revisar
        for (var paso = 1; paso <= 3; paso++) {
          var value = AsyncStorage.getItem ('@Reporte:image' + paso);
          if (value !== null) {
            AsyncStorage.setItem ('@Reporte:image' + paso, '');
          }
        }
        this.setState ({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            data: image.data,
          },
          images: null,
        });
      })
      .catch (e => {
        console.log ('error', e);
        if (Platform.OS === 'ios') {
          check (PERMISSIONS.IOS.CAMERA)
            .then (result => {
              switch (result) {
                case RESULTS.UNAVAILABLE:
                  console.log ('Esta función no está disponible');
                  break;
                case RESULTS.BLOCKED:
                  console.log ('Permiso denegado y ya no se puede solicitar');
                  Alert.alert (
                    'Permiso denegado',
                    'Active el permiso de camara desde configuraciones'
                  );
                  openSettings ().catch (() =>
                    console.warn ('cannot open settings')
                  );
                  break;
              }
            })
            .catch (error => {
              console.log ('Error check permiso', error);
            });
        }
      });
  }

  pickMultiple () {
    ImagePicker.openPicker ({
      multiple: true,
      compressImageMaxHeight: 800,
      compressImageMaxWidth: 650,
      compressImageQuality: 1,
      waitAnimationEnd: false,
      includeExif: true,
      includeBase64: true,
    })
      .then (images => {
        //TODO revisar
        AsyncStorage.removeItem ('@Reporte:image');
        if (images.length < 4) {
          for (var paso = 1; paso <= 3; paso++) {
            var value = AsyncStorage.getItem ('@Reporte:image' + paso);
            if (value !== null) {
              AsyncStorage.setItem ('@Reporte:image' + paso, '');
            }
          }
          this.setState ({
            image: null,
            images: images.map (i => {
              console.log ('received image', i);
              return {
                uri: i.path,
                width: i.width,
                height: i.height,
                data: i.data,
              };
            }),
          });
        } else {
          Alert.alert ('Aviso', 'Seleccionar máximo 3 imagenes');
          return;
        }
      })
      .catch (e => {
        console.log ('error', e);
        if (Platform.OS === 'ios') {
          check (PERMISSIONS.IOS.PHOTO_LIBRARY)
            .then (result => {
              switch (result) {
                case RESULTS.UNAVAILABLE:
                  console.log ('Esta función no está disponible');
                  break;
                case RESULTS.BLOCKED:
                  console.log ('Permiso denegado y ya no se puede solicitar');
                  Alert.alert (
                    'Permiso denegado',
                    'Active el permiso de camara desde configuraciones'
                  );
                  openSettings ().catch (() =>
                    console.warn ('cannot open settings')
                  );
                  break;
              }
            })
            .catch (error => {
              console.log ('Error check permiso', error);
            });
        }
      });
  }

  renderImage (image) {
    return <Image style={styles.image} source={image} />;
  }

  renderAsset (image) {
    return this.renderImage (image);
  }

  _enviar = async () => {
    if (this.state.image == null && this.state.images.length == 0) {
      Alert.alert ('Imagen', 'Por favor subir una foto o imagen');
    } else if (this.state.idTipoProblema == '') {
      Alert.alert ('Tipo de daño', 'Por favor indicar el tipo de daño');
    } else if (!this.state.hayUbicacion) {
      Alert.alert ('Ubicación', 'Por favor indicar una ubicación');
    } else {
      this.setState ({mostrarEnviar: false});
      //TODO revisar y modificar
      try {
        AsyncStorage.setItem (
          '@Reporte:idTipoProblema',
          this.state.idTipoProblema.toString ()
        );
        AsyncStorage.setItem ('@Reporte:observacion', this.state.observacion);
        if (this.state.image != null) {
          AsyncStorage.setItem (
            '@Reporte:image1',
            'data:image/png;base64,' + this.state.image.data
          );
        } else {
          var paso;
          for (paso = 1; paso <= this.state.images.length; paso++) {
            try {
              AsyncStorage.setItem (
                '@Reporte:image' + paso,
                'data:image/png;base64,' + this.state.images[paso - 1].data
              );
            } catch (e) {
              console.error ('@Reporte:image' + paso, e.error);
            }
          }
        }
      } catch (e) {
        console.error ('@Reporte', e.error);
      }
      var observacion = await AsyncStorage.getItem ('@Reporte:observacion');
      console.log ('observacion', observacion);
      var latitud = await AsyncStorage.getItem ('@Reporte:lat');
      console.log ('latitud', latitud);
      var longitud = await AsyncStorage.getItem ('@Reporte:lon');
      console.log ('longitud', longitud);
      var imagen1 = await AsyncStorage.getItem ('@Reporte:image1');
      console.log ('imagen1', imagen1);
      var imagen2 = await AsyncStorage.getItem ('@Reporte:image2');
      console.log ('imagen2', imagen2);
      var imagen3 = await AsyncStorage.getItem ('@Reporte:image3');
      console.log ('imagen3', imagen3);
      var idUsuario = await AsyncStorage.getItem ('@User:id');
      console.log ('idUsuario', idUsuario);
      var idTipoProblema = await AsyncStorage.getItem (
        '@Reporte:idTipoProblema'
      );
      console.log ('id tipo DE problma', idTipoProblema);
      //debugger;
      let inserto = await API.guardarReporte (
        observacion,
        latitud,
        longitud,
        imagen1,
        imagen2,
        imagen3,
        idUsuario,
        idTipoProblema,
        this.props.idDireccion
      );
      console.log ('inserto?', inserto);
      if (inserto && inserto.message == 'ok') {
        Alert.alert ('Gracias por su aporte');
        this.setState ({image: null, images: []});
      } else {
        Alert.alert (
          'No se pudo enviar su reporte',
          'Hubo una inconveniente al momento de enviar, inténtelo de nuevo por favor'
        );
      }
      this.setState ({mostrarEnviar: true});
    }
  };

  ocultarMapa = () => {
    this.setState ({
      modal: false,
      hayUbicacion: true,
    });
  };

  mostrarAclaracion = (value, index) => {
    this.setState ({
      aclaracion: this.props.tipos[index].aclaracion,
      idTipoProblema: this.props.tipos[index].id,
    });
  };

  render () {
    const {modal, image, images, aclaracion, hayUbicacion} = this.state;
    const {titulo, nombre, tipos} = this.props;
    return (
      <ScrollView style={styles.container}>
        <Modal isVisible={modal}>
          <View style={styles.containerModal}>
            {/* <Maps ubicacionIncidencia={true} /> */}
            <Maps ubicIncidencia={true} />
            <View style={styles.containerCenter}>
              <AppButton
                title="Seleccionar ubicación y salir"
                action={this.ocultarMapa}
              />
            </View>
          </View>
        </Modal>
        <View style={styles.containerImage}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.txt, {flex: 8}]}>{titulo}</Text>
            <View style={styles.right}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => this.pickSingleWithCamera (false)}
              >
                {myIcon1}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={this.pickMultiple.bind (this)}
              >
                {myIcon2}
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView horizontal>
            {image && this.renderAsset (image)}
            {images &&
              images.map (i => <View key={i.uri}>{this.renderAsset (i)}</View>)}
          </ScrollView>
        </View>
        <View style={styles.containerCenter}>
          <Dropdown
            label={nombre}
            data={tipos}
            onChangeText={this.mostrarAclaracion}
          />
          <Text style={styles.txt}>{aclaracion}</Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.textarea}
            onChangeText={text => this.setState ({observacion: text})}
            maxLength={100}
            placeholder={'Escribe tu observacion'}
            placeholderTextColor={'#c7c7c7'}
            underlineColorAndroid={'transparent'}
          />
          {hayUbicacion
            ? <AppButton
                title="Ubicación asignada - Modificar"
                action={() => this.setState ({modal: true})}
                color={'rgb(38, 168, 193)'}
              />
            : <AppButton
                title="Seleccione la ubicación"
                action={() => this.setState ({modal: true})}
              />}
          {this.state.mostrarEnviar
            ? <AppButton title="ENVIAR" action={this._enviar} width={100} />
            : <ActivityIndicator style={{margin: 18}} />}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    margin: 10,
  },
  containerCenter: {
    alignItems: 'center',
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'silver',
  },
  containerImage: {
    paddingHorizontal: 5,
    flexDirection: 'column',
  },
  right: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: 'black',
    marginBottom: 4,
    fontSize: 16,
    textAlign: 'left',
  },
  textareaContainer: {
    height: 90,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgb(38, 168, 193)',
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 80,
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
    margin: 2,
  },
});
