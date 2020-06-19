import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Alert,
  View,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-community/async-storage';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import MapView, {
  PROVIDER_GOOGLE,
  AnimatedRegion,
  Polyline,
} from 'react-native-maps';
import {
  check,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

import AppButton from 'pruebas/src/components/AppButton';

const LATITUDE_DELTA1 = 0.08; //para plaza y ubicacion dada
const LONGITUDE_DELTA1 = 0.0365;
const LATITUDE_DELTA2 = 0.02; //para mi ubicacion
const LONGITUDE_DELTA2 = 0.0091;
const myIcon = <Icon name="map-pin" size={25} color={'black'} />;
const GOOGLE_MAPS_APIKEY = 'AIzaSyDp-htU6NSLLzH9fnucwbChRMSv-Fx7fVw';

export default class Maps extends Component {
  state = {
    region: {
      latitude: null,
      longitude: null,
      latitudeDelta: LATITUDE_DELTA2,
      longitudeDelta: LONGITUDE_DELTA2,
    },
    coordinate: new AnimatedRegion ({
      latitude: null,
      longitude: null,
      latitudeDelta: LATITUDE_DELTA1,
      longitudeDelta: LONGITUDE_DELTA1,
    }),
    width: '101%',
    verRuta: false,
    showRutaLinea: true,
  };

  async componentDidMount () {
    await this.requestLocationPermission ();
  }

  requestLocationPermission = async () => {
    try {
      let granted = false;
      if (Platform.OS === 'android') {
        //permiso para activar gps
        granted = await PermissionsAndroid.request (
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permiso de ubicación',
            message: 'Esta aplicación necesita acceso a su ubicación ' +
              'para que podamos saber dónde estás.',
          }
        );
      } else {
        await check (PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
          .then (result => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                console.log ('Esta función no está disponible');
                break;
              case RESULTS.DENIED:
                console.log ('Permiso no solicitado/denegado pero solicitable');
                granted = true;
                break;
              case RESULTS.GRANTED:
                console.log ('El permiso se otorga');
                granted = true;
                break;
              case RESULTS.BLOCKED:
                console.log ('Permiso denegado y ya no se puede solicitar');
                Alert.alert (
                  'Active el permiso de ubicacion desde configuraciones y vuelva a ingresar'
                );
                openSettings ().catch (() =>
                  console.warn ('cannot open settings')
                );
                //this.props.navigation.goBack(null);
                break;
            }
          })
          .catch (error => {
            console.log ('Error check permiso', error);
          });
      }
      if (granted === true || granted === PermissionsAndroid.RESULTS.GRANTED) {
        const {linea, ubicIncidencia, ubicDada} = this.props;
        if (linea) {
          //mostrara ubicacion de la plaza de Yacuiba
          this.setState ({
            region: {
              latitude: -22.013724,
              longitude: -63.677821,
              latitudeDelta: LATITUDE_DELTA1,
              longitudeDelta: LONGITUDE_DELTA1,
            },
            showRutaLinea: false,
          });
        } else if (ubicDada) {
          console.log ('mostrara ubicacion dada');
          this.setState ({
            region: {
              latitude: parseFloat (ubicDada.latitud),
              longitude: parseFloat (ubicDada.longitud),
              latitudeDelta: LATITUDE_DELTA1,
              longitudeDelta: LONGITUDE_DELTA1,
            },
          });
        } else {
          console.log ('mostrara mi ubicacion');
          navigator.geolocation.getCurrentPosition (
            position => {
              this.setState ({
                region: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: LATITUDE_DELTA2,
                  longitudeDelta: LONGITUDE_DELTA2,
                },
                coordinate: new AnimatedRegion ({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: LATITUDE_DELTA2,
                  longitudeDelta: LONGITUDE_DELTA2,
                }),
                showRutaLinea: true,
              });
              this.guardarPosicion ();
            },
            error => {
              console.log ('error', error);
              if (Platform.OS === 'android') {
                RNAndroidLocationEnabler.promptForEnableLocationIfNeeded ({
                  interval: 10000,
                  fastInterval: 5000,
                })
                  .then (data => {
                    console.log ('RNAndroidLocationEnabler', data);
                    this.requestLocationPermission ();
                  })
                  .catch (err => console.log ('RNAndroidLocationEnabler', err));
              }
            },
            {enableHightAcuracy: true, timeout: 2000}
          );
          //Invoca la devolución de llamada correcta cada vez que cambia la ubicación
          this.watchID = navigator.geolocation.watchPosition (position => {
            const newRegion = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA2,
              longitudeDelta: LONGITUDE_DELTA2,
            };
            console.log ('newRegion', newRegion);
          });
        }
      } else {
        console.warn ('Permiso de ubicación denegado');
      }
    } catch (err) {
      console.warn ('err ', err);
    }
  };

  guardarPosicion = () => {
    const {region} = this.state;
    console.log ('region', region);
    if (this.props.ubicIncidencia) {
      AsyncStorage.setItem ('@Reporte:lat', region.latitude.toString ());
      AsyncStorage.setItem ('@Reporte:lon', region.longitude.toString ());
    } else {
      AsyncStorage.setItem ('@User:lat', region.latitude.toString ());
      AsyncStorage.setItem ('@User:lon', region.longitude.toString ());
    }
  };

  showRutas = itemLinea => {
    const {id, linea, ruta_geom, color, value} = itemLinea;
    if (!this.state.showRutaLinea) {
      this.requestLocationPermission ();
    }
    if (ruta_geom != null) {
      var ruta = ruta_geom;
      ruta = ruta.split ('latitude').join ('"latitude"');
      ruta = ruta.split ('longitude').join ('"longitude"');
      ruta = JSON.parse (ruta);
      return (
        <Polyline
          key={id}
          coordinates={ruta}
          strokeColor={color}
          strokeWidth={4}
          tappable={true}
          onPress={() => {
            Alert.alert ('Linea ' + linea, value);
          }}
        />
      );
    }
  };

  showRuta = linea => {
    const {ruta_geom, color, inicio, inicio_lat, inicio_lon} = linea;
    const {final, final_lat, final_lon} = linea;
    if (this.state.showRutaLinea) {
      this.requestLocationPermission ();
    }
    let ruta = ruta_geom;
    ruta = ruta.split ('latitude').join ('"latitude"');
    ruta = ruta.split ('longitude').join ('"longitude"');
    ruta = JSON.parse (ruta);
    return (
      <View>
        <Polyline coordinates={ruta} strokeColor={color} strokeWidth={4} />
        {this.marker (inicio_lat, inicio_lon, inicio)}
        {this.marker (final_lat, final_lon, final)}
      </View>
    );
  };

  marker = (lat, lon, title) => {
    return (
      <MapView.Marker
        coordinate={{
          latitude: parseFloat (lat),
          longitude: parseFloat (lon),
        }}
        title={title}
      >
        {!this.props.ubicDada && myIcon}
      </MapView.Marker>
    );
  };

  actualizarMarcador = e => {
    if (this.props.ubicIncidencia) {
      //console.log(e.nativeEvent.coordinate)
      try {
        this.setState ({
          region: {
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: LATITUDE_DELTA2,
            longitudeDelta: LONGITUDE_DELTA2,
          },
          coordinate: new AnimatedRegion ({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: LATITUDE_DELTA2,
            longitudeDelta: LONGITUDE_DELTA2,
          }),
        });
        AsyncStorage.setItem (
          '@Reporte:lat',
          this.state.region.latitude.toString ()
        );
        AsyncStorage.setItem (
          '@Reporte:lon',
          this.state.region.longitude.toString ()
        );
      } catch (e) {
        console.error ('actualizarMarcador', e.error);
      }
    }
  };

  verRuta = () => {
    navigator.geolocation.getCurrentPosition (
      position => {
        this.setState ({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA1,
            longitudeDelta: LONGITUDE_DELTA1,
          },
          verRuta: true,
        });
        this.guardarPosicion ();
      },
      () => {
        if (Platform.OS === 'android') {
          RNAndroidLocationEnabler.promptForEnableLocationIfNeeded ({
            interval: 10000,
            fastInterval: 5000,
          })
            .then (data => this.verRuta ())
            .catch (err => console.log (err));
        }
      },
      {enableHightAcuracy: true, timeout: 2000}
    );
  };

  render () {
    const {
      linea,
      listaTransp,
      ubicIncidencia,
      ubicDada,
      listaMarker,
    } = this.props;
    const {region, width, coordinate, verRuta} = this.state;
    const {latitud, longitud, nombre} = ubicDada || {};
    return (
      <View style={styles.container}>
        {region.latitude &&
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={[styles.map, {width}]}
            onMapReady={() => this.setState ({width: '100%'})}
            region={region}
            showsUserLocation={true}
            followsUserLocation={true}
            onPress={this.actualizarMarcador}
          >
            {linea
              ? this.showRuta (linea)
              : listaTransp && listaTransp.map (item => this.showRutas (item))}
            {ubicIncidencia &&
              <MapView.Marker.Animated
                ref={marker => (this.marker = marker)}
                coordinate={coordinate}
                title="Ubicación de la incidencia"
              />}
            {ubicDada && this.marker (latitud, longitud, nombre)}
            {verRuta &&
              <MapViewDirections
                origin={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}
                destination={{
                  latitude: parseFloat (latitud),
                  longitude: parseFloat (longitud),
                }}
                apikey={GOOGLE_MAPS_APIKEY}
                region={'BO'}
                strokeWidth={3}
                strokeColor="hotpink"
              />}
            {//para vende ciudad
            listaMarker &&
              listaMarker.map (marker => (
                <MapView.Marker
                  ref={marker => (this.marker = marker)}
                  key={marker.id}
                  coordinate={{
                    latitude: parseFloat (marker.latitud),
                    longitude: parseFloat (marker.longitud),
                  }}
                  title={marker.nombre}
                  description={marker.direccion}
                />
              ))}
          </MapView>}
        {ubicDada &&
          <AppButton title="Ver ruta" action={this.verRuta} width={100} />}
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
