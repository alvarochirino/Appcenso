import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Actividad from './actvidad';
import Maps from 'pruebas/src/components/Maps';
import API from '../../../../utils/api';
import Icon from 'react-native-vector-icons/Feather';

import Informacion from '../../../components/informacion';

const myIcon = <Icon name="search" size={20} color={'black'} />;
const width = Dimensions.get ('window').width - 10;

export default class Busqueda extends Component {
  constructor (props) {
    super (props);
    this.state = {
      tipo: '',
      listaBusqueda: [],
      text: '',
      listaActividades: [],
      mostrarInfo: false,
    };
  }

  renderItem = ({item}) => {
    console.log (item);
    let actividad = '';
    let tipo = this.state.tipo;
    switch (tipo) {
      case 'rubro':
        actividad = item.rubro;
        break;
      case 'actividad':
        actividad = item.actividad;
        break;
      default:
        actividad = item.nombre;
        break;
    }
    return (
      <TouchableOpacity
        onPress={async () => {
          let listaActividades = [];
          switch (tipo) {
            case 'rubro':
              listaActividades = await API.buscarPorRubro (actividad);
              break;
            case 'actividad':
              listaActividades = await API.buscarPorActividad (actividad);
              break;
            default:
              listaActividades = await API.buscarPorNombre (actividad);
              break;
          }
          console.log (listaActividades);
          if (listaActividades != null) {
            this.setState ({
              listaActividades: listaActividades,
              listaBusqueda: [],
              mostrarInfo: true,
            });
          } else {
            Alert.alert ('Revise su conexión a internet');
          }
        }}
      >
        <View style={styles.containerButton}>
          {myIcon}
          <Text style={styles.text}> {actividad} </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderItem2 = ({item}) => {
    return <Actividad {...item} />;
  };

  /* _buscar = async () => {
    if (this.state.text != '') {
      let listaBusqueda = await API.buscarRubro (this.state.text);
      if (listaBusqueda != null) {
        if (listaBusqueda.length == 0) {
          listaBusqueda = await API.buscarActividad (this.state.text);
          if (listaBusqueda.length == 0) {
            listaBusqueda = await API.buscarDemas (this.state.text);
            if (listaBusqueda.length == 0) {
              Alert.alert ('No se encontro coincidencias');
            } else {
              this.setState ({
                tipo: 'nombre',
              });
            }
          } else {
            this.setState ({
              tipo: 'actividad',
            });
          }
        } else {
          this.setState ({
            tipo: 'rubro',
          });
        }
        this.setState ({
          listaBusqueda: listaBusqueda,
        });
      }
    }
  }; */

  _buscar = async () => {
    
      let listaBusqueda = await API.buscarRubro ("helados");
      if (listaBusqueda != null) {
        if (listaBusqueda.length == 0) {
          listaBusqueda = await API.buscarActividad ("helados");
          if (listaBusqueda.length == 0) {
            listaBusqueda = await API.buscarDemas ("helados");
            if (listaBusqueda.length == 0) {
              Alert.alert ('No se encontro coincidencias');
            } else {
              this.setState ({
                tipo: 'nombre',
              });
            }
          } else {
            this.setState ({
              tipo: 'actividad',
            });
          }
        } else {
          this.setState ({
            tipo: 'rubro',
          });
        }
        this.setState ({
          listaBusqueda: listaBusqueda,
        });
      }
    
  };

  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.buscar}>
          <TouchableOpacity
            onPress={this._buscar}
            style={styles.button1}
          >
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
          {/* <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={text => this.setState({text})}
          /> */}
        </View>
        <FlatList
          keyExtractor={item => item.toString ()}
          data={this.state.listaBusqueda}
          renderItem={this.renderItem}
        />
        <View style={styles.map}>
          <Maps listaMarker={this.state.listaActividades} />
        </View>
        <View style={styles.containerList}>
          <FlatList
            keyExtractor={item => item.id.toString ()}
            data={this.state.listaActividades}
            renderItem={this.renderItem2}
          />
        </View>
        {this.state.mostrarInfo ? <Informacion /> : null}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'column',
    margin: 5,
  },
  map: {
    height: width,
    marginVertical: 5,
  },
  buscar: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  button1: {
    width: 80,
    marginRight: 10,
    backgroundColor: '#808080',
    padding: 6,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  textInput: {
    flex: 1,
    height: 36,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#387d9b',
  },
  containerList: {
    marginVertical: 10,
  },
  containerButton: {
    height: 35,
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 0.6,
    borderColor: 'gray',
    borderEndColor: 'transparent',
    borderStartColor: 'transparent',
    borderTopColor: 'transparent',
  },
  text: {
    fontSize: 15,
    paddingLeft: 15,
    color: 'black',
  },
});
