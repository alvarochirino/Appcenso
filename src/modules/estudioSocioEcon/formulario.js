import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert,
  Platform,
} from 'react-native';
import {
  check,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';

import API from '../../../utils/api';
import Bono from './components/bono';
import Integrantes from './integrantes';
import Trabajo from './components/trabajo';
import Maps from 'pruebas/src/components/Maps';
import RadioGroup from './components/radioGroup';
import Dropdown from 'pruebas/src/components/DropDown';
import AppButton from 'pruebas/src/components/AppButton';
import Separator from 'pruebas/src/components/VerticalSeparador';

import {
  ficha,
  tipoFamilia,
  cantidad,
  trabajosImp,
  tipoTenencia,
  servicios,
} from './listas';

export default class FichaEstudio extends Component {
  constructor () {
    super ();
    this.state = {
      numInmu: '',
      idTipoFamilia: 0,
      aclaracion: '',
      cantFamilia: 0,
      idTenencia: 0,
      observac: '',
      image: null,
      mostrarEnviar: true,
      guardado: false,
    };
    global.ficha = ficha;
    global.datosTrabajo = [];
  }

  async componentDidMount () {
    const ficha = await AsyncStorage.getItem ('@User:fichaFam');
    if (ficha !== null) {
      this.setState ({guardado: true});
    }
  }

  elegirTipoFamilia = (value, index) => {
    this.setState ({
      aclaracion: tipoFamilia[index].aclaracion,
      idTipoFamilia: tipoFamilia[index].id,
    });
  };

  elegirCantidadFamilia = (value, index) => {
    this.setState ({
      cantFamilia: cantidad[index].id,
    });
  };

  elegirTipoTenencia = (value, index) => {
    this.setState ({
      idTenencia: tipoTenencia[index].id,
    });
  };

  validarIntegrantes = async () => {
    await global.datosIntegr.map (item => {
      if (
        !(item.nombre === '' && item.edad === '' && item.idRol === 0) &&
        !(item.nombre !== '' && item.edad !== '' && item.idRol !== 0)
      ) {
        Alert.alert ('Completar datos del integrante número ' + item.posicion);
        global.estructuraValid[item.posicion - 1] = 0;
      } else {
        global.estructuraValid[item.posicion - 1] = 1;
      }
    });
    let cont = 0;
    await global.estructuraValid.map (item => {
      cont += item;
    });
    return cont === global.estructuraValid.length;
  };

  validarTrabajos = async () => {
    let cont = 3;
    await global.datosTrabajo.map (item => {
      const {descrip, idTipoTrab, idIngreso, posicion} = item;
      if (
        !(descrip === '' && idTipoTrab === 0 && idIngreso === 0) &&
        !(descrip !== '' && idTipoTrab > 0 && idIngreso > 0)
      ) {
        Alert.alert ('Completar datos del ' + posicion + ' trabajo');
        cont--;
      }
    });
    return cont === 3;
  };

  _enviar = async () => {
    try {
      this.setState ({mostrarEnviar: false});
      const {numInmu, idTipoFamilia, cantFamilia, idTenencia} = this.state;
      const {observac, image} = this.state;
      if (idTipoFamilia === 0) {
        Alert.alert ('Debe seleccionar el tipo de familia');
      } else if (cantFamilia === 0) {
        Alert.alert ('Seleccionar la cantidad de familias que vive en el lote');
      } else if (idTenencia === 0) {
        Alert.alert ('Debe seleccionar el tipo de tenencia');
      } else if (image === null) {
        Alert.alert ('Debe tomar una foto');
      } else if (image.height > image.width) {
        Alert.alert ('La foto debe ser tomada en forma horizontal');
      } else {
        const valido1 = await this.validarIntegrantes ();
        const valido2 = await this.validarTrabajos ();
        console.log ('valido1', valido1);
        console.log ('valido2', valido2);
        if (valido1 && valido2) {
          //cumple con todo
          const fichaCopia = global.ficha;
          let numeroInmueble = 0;
          if (numInmu !== '') {
            numeroInmueble = parseInt (numInmu);
          }
          fichaCopia.numInmu = numeroInmueble;
          fichaCopia.idTipoFamilia = idTipoFamilia;
          fichaCopia.cantFamilia = cantFamilia;
          fichaCopia.idTenencia = idTenencia;
          fichaCopia.observac = observac;
          await global.datosTrabajo.map (item => {
            switch (item.posicion) {
              case 'primer':
                if (item.descrip !== '') {
                  fichaCopia.descripT1 = item.descrip;
                  fichaCopia.tipoT1 = item.idTipoTrab;
                  fichaCopia.ingresoT1 = item.idIngreso;
                }
                break;
              case 'segundo':
                fichaCopia.descripT2 = item.descrip;
                fichaCopia.tipoT2 = item.idTipoTrab;
                fichaCopia.ingresoT2 = item.idIngreso;
                break;
              case 'tercer':
                fichaCopia.descripT3 = item.descrip;
                fichaCopia.tipoT3 = item.idTipoTrab;
                fichaCopia.ingresoT3 = item.idIngreso;
                break;
              default:
                console.log ('entro default');
            }
          });
          fichaCopia.lat = await AsyncStorage.getItem ('@User:lat');
          fichaCopia.lon = await AsyncStorage.getItem ('@User:lon');
          const idUsuario = await AsyncStorage.getItem ('@User:id');
          fichaCopia.idUsuario = parseInt (idUsuario);
          fichaCopia.foto = 'data:image/png;base64,' + image.data;
          global.ficha = fichaCopia;
          console.log ('fichaglo', global.ficha);
          console.log ('datos', global.datosIntegr);
          console.log ('trabajos', global.datosTrabajo);
          let familia = await API.guardarFamilia (global.ficha);
          console.log ('familia', familia);
          if (familia) {
            global.datosIntegr.map (item => {
              this.insertarIntegrantes (item, familia);
            });
            const ficha = await AsyncStorage.getItem ('@User:fichaFam');
            if (ficha !== null) {
              AsyncStorage.removeItem ('@User:fichaFam');
              AsyncStorage.removeItem ('@User:integrFam');
            }
            Alert.alert ('Enviado correctamente');
            this.props.navigation.navigate ('Home');
          } else {
            Alert.alert (
              'No se pudo enviar el formulario',
              '¿Desea guardar el formulario para enviarlo despúes?',
              [
                {text: 'Cancelar'},
                {
                  text: 'Guardar',
                  onPress: () => {
                    this.setState ({guardado: true});
                    Alert.alert (
                      'Formulario guardado',
                      'Puede enviarlo desde el boton que se encuentra al inicio del formulario!'
                    );
                    const fichaGuardar = JSON.stringify (global.ficha);
                    const integrGuardar = JSON.stringify (global.datosIntegr);
                    AsyncStorage.setItem ('@User:fichaFam', fichaGuardar);
                    AsyncStorage.setItem ('@User:integrFam', integrGuardar);
                  },
                },
              ],
              {cancelable: false}
            );
          }
        }
      }
      this.setState ({mostrarEnviar: true});
    } catch (error) {
      console.log ('errorEnviar', error);
    }
  };

  insertarIntegrantes = async (item, idFamilia) => {
    if (item.nombre !== '') {
      let inserto = await API.guardarIntegrante (item, idFamilia);
      console.log ('integr', inserto);
    }
  };

  enviarGuardado = async () => {
    this.setState ({mostrarEnviar: false});
    const ficha = await AsyncStorage.getItem ('@User:fichaFam');
    global.ficha = await JSON.parse (ficha);
    const datosIntegr = await AsyncStorage.getItem ('@User:integrFam');
    global.datosIntegr = await JSON.parse (datosIntegr);
    console.log ('fichaglo', global.ficha);
    console.log ('datos', global.datosIntegr);
    let familia = await API.guardarFamilia (global.ficha);
    console.log ('familia', familia);
    if (familia) {
      global.datosIntegr.map (item => {
        this.insertarIntegrantes (item, familia);
      });
      AsyncStorage.removeItem ('@User:fichaFam');
      AsyncStorage.removeItem ('@User:integrFam');
      Alert.alert ('Enviado correctamente');
      this.props.navigation.navigate ('Home');
    }
    this.setState ({mostrarEnviar: true});
  };

  renderItem1 = ({item}) => {
    return <Trabajo {...item} />;
  };

  renderItem2 = ({item}) => {
    return <RadioGroup {...item} />;
  };

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
        this.setState ({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            data: image.data,
          },
        });
      })
      .catch (e => {
        console.log ('errorCamera', e);
        if (Platform.OS === 'ios') {
          check (PERMISSIONS.IOS.CAMERA)
            .then (result => {
              switch (result) {
                case RESULTS.UNAVAILABLE:
                  console.log ('Esta función no está disponible');
                  break;
                case RESULTS.BLOCKED:
                  console.log ('Permiso denegado y ya no se puede solicitar');
                  //TODO revisar alert
                  Alert.alert (
                    'Permiso denegado',
                    'Active el permiso de camara desde configuraciones'
                  );
                  openSettings ().catch (() =>
                    console.warn ('no se pudo abrir las configuraciones')
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

  render () {
    const {guardado, numInmu, aclaracion, image, mostrarEnviar} = this.state;
    return (
      <ScrollView>
        {guardado &&
          <View style={styles.containerCenter}>
          {mostrarEnviar
            ? 
            <AppButton
              title="Enviar formulario guardado"
              action={this.enviarGuardado}
              color={'green'}
              width={140}
            />
            : <ActivityIndicator style={{margin: 18}} />}
          </View>}
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.txt1}>Número de inmueble:</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState ({numInmu: text})}
            keyboardType={'number-pad'}
            value={numInmu}
          />
        </View>
        <Integrantes />
        <View style={styles.containerCenter}>
          <Dropdown
            label="Tipo de familia"
            data={tipoFamilia}
            onChangeText={this.elegirTipoFamilia}
          />
          <Text style={styles.txt1}>{aclaracion}</Text>
          <Dropdown
            label="Cantidad de familias que viven en el lote"
            data={cantidad}
            onChangeText={this.elegirCantidadFamilia}
          />
        </View>
        <FlatList
          style={styles.flatList}
          keyExtractor={item => item.id.toString ()}
          data={trabajosImp}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={this.renderItem1}
        />
        <View>
          <Text style={styles.txt1}>Bonos que recibe la familia:</Text>
          <Bono posicion={1} />
          <Bono posicion={2} />
          <Bono posicion={3} />
          <Bono posicion={4} />
        </View>
        <View style={styles.containerCenter}>
          <Dropdown
            label="Tipo de tenencia"
            data={tipoTenencia}
            onChangeText={this.elegirTipoTenencia}
          />
          <Text style={styles.txt1}>
            Servicios con los que cuenta el predio
          </Text>
          <FlatList
            keyExtractor={item => item.id.toString ()}
            data={servicios}
            renderItem={this.renderItem2}
          />
        </View>
        <Text style={styles.txt1}>Observaciones:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState ({observac: text})}
        />
        <View style={styles.containerCenter}>
          <Text style={styles.txt1}>
            Agregar una foto delante de la fachada del predio con el jefe de
            hogar y todos los miembros de la familia presentes
          </Text>
          <Text style={styles.txt2}>
            Por favor tomar la foto en dirección horizontal
          </Text>
          <AppButton
            title="TOMAR FOTO"
            action={() => this.pickSingleWithCamera (false)}
          />
          {image && this.renderImage (image)}
        </View>
        <View style={{height: 200}}>
          <Text style={styles.txt1}>
            Se enviará la siguiente posición en el mapa:
          </Text>
          <Maps />
        </View>
        <View style={styles.containerCenter}>
          {mostrarEnviar
            ? <AppButton
                title="ENVIAR FORMULARIO"
                action={this._enviar}
                width={140}
              />
            : <ActivityIndicator style={{margin: 18}} />}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create ({
  containerCenter: {
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 34,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginHorizontal: 4,
  },
  txt1: {
    fontSize: 16,
    color: '#000',
    //fontFamily: 'ConthraxSb-Regular',
    margin: 4,
    textAlign: 'center',
  },
  txt2: {
    color: 'red',
    margin: 2,
  },
  separator: {
    borderTopWidth: 2,
    borderTopColor: '#000',
    marginHorizontal: 10,
  },
  flatList: {
    margin: 4,
    paddingTop: 4,
    backgroundColor: '#eee',
  },
  image: {
    height: 190,
    resizeMode: 'contain',
    margin: 2,
  },
});
