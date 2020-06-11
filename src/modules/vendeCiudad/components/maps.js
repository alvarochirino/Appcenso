import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, AnimatedRegion} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {
  check,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

import AppButton from 'pruebas/src/components/AppButton';

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
const LATITUDE_DELTA2 = 0.04;
const LONGITUDE_DELTA2 = 0.018;
const GOOGLE_MAPS_APIKEY = 'AIzaSyDp-htU6NSLLzH9fnucwbChRMSv-Fx7fVw';

export default class Maps extends Component {
  state = {
    region: {
      /* latitude: -17.79,
            longitude: -63.18, */
      latitude: null,
      longitude: null,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    coordinate: new AnimatedRegion ({
      latitude: null,
      longitude: null,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    width: '101%',
    verRuta: false,
  };

  requestLocationPermission = async () => {
    try {
      var granted = false;
      if (Platform.OS === 'android') {
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
        if (this.props.ubicacion) {
          console.log ('mostrara su ubicacion');
          this.setState ({
            region: {
              latitude: parseFloat (this.props.ubicacion.latitud),
              longitude: parseFloat (this.props.ubicacion.longitud),
              latitudeDelta: LATITUDE_DELTA2,
              longitudeDelta: LONGITUDE_DELTA2,
            },
          });
        }
      } else {
        console.log ('Permiso de ubicación denegado');
      }
    } catch (err) {
      console.warn (err);
    }
  };

  async componentWillMount () {
    await this.requestLocationPermission ();
  }

  verRuta = () => {
    navigator.geolocation.getCurrentPosition (
      position => {
        this.setState ({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          verRuta: true,
        });
      },
      () => {
        if (Platform.OS === 'android') {
          RNAndroidLocationEnabler.promptForEnableLocationIfNeeded ({
            interval: 10000,
            fastInterval: 5000,
          })
            .then (data => {
              this.verRuta ();
            })
            .catch (err => console.log (err));
        }
      },
      {enableHightAcuracy: true, timeout: 2000}
    );
  };

  render () {
    const {ubicacion, listaMarker} = this.props;
    const {region, width, verRuta} = this.state;
    return (
      <View style={styles.container}>
        {region.latitude &&
          <MapView
            provider={PROVIDER_GOOGLE}
            style={[styles.map, {width: width}]}
            onMapReady={() => this.setState ({width: '100%'})}
            region={region}
            showsUserLocation={true}
            followsUserLocation={true}
          >
            {ubicacion &&
              <MapView.Marker
                coordinate={{
                  latitude: parseFloat (ubicacion.latitud),
                  longitude: parseFloat (ubicacion.longitud),
                }}
                title={ubicacion.nombre}
              />}
            {verRuta &&
              <MapViewDirections
                origin={{
                  latitude: region.latitude,
                  longitude: region.longitude,
                }}
                //origin={{ latitude: -17.83, longitude: -63.21 }}
                destination={{
                  latitude: parseFloat (ubicacion.latitud),
                  longitude: parseFloat (ubicacion.longitud),
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
                  ref={marker => {
                    this.marker = marker;
                  }}
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
        {ubicacion &&
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
