import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  PermissionsAndroid,
  TouchableOpacity
} from "react-native";
import MapView, { PROVIDER_GOOGLE, AnimatedRegion } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import AsyncStorage from "@react-native-community/async-storage";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import {
  check,
  PERMISSIONS,
  RESULTS,
  openSettings
} from "react-native-permissions";

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
const LATITUDE_DELTA1 = 0.03;
const LONGITUDE_DELTA1 = 0.0137;
const LATITUDE_DELTA2 = 0.04;
const LONGITUDE_DELTA2 = 0.018;
const GOOGLE_MAPS_APIKEY = "AIzaSyDp-htU6NSLLzH9fnucwbChRMSv-Fx7fVw";
const REGION = "BO";

export default class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        /* latitude: -17.79,
            longitude: -63.18, */
        latitude: null,
        longitude: null,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      coordinate: new AnimatedRegion({
        latitude: null,
        longitude: null,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }),
      width: "101%",
      verRuta: false
    };
  }

  requestLocationPermission = async () => {
    try {
      var granted = false;
      if (Platform.OS === "android") {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Permiso de ubicación",
            message:
              "Esta aplicación necesita acceso a su ubicación " +
              "para que podamos saber dónde estás."
          }
        );
      } else {
        await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
          .then(result => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                console.log(
                  "Esta función no está disponible (en este dispositivo / en este contexto)"
                );
                break;
              case RESULTS.DENIED:
                console.log(
                  "El permiso no se ha solicitado / se niega pero solicitable"
                );
                break;
              case RESULTS.GRANTED:
                console.log("El permiso se otorga");
                granted = true;
                break;
              case RESULTS.BLOCKED:
                console.log(
                  "El permiso es denegado y ya no se puede solicitar"
                );
                Alert.alert(
                  "Active el permiso de ubicacion desde configuraciones y vuelva a ingresar"
                );
                openSettings().catch(() =>
                  console.warn("cannot open settings")
                );
                break;
            }
          })
          .catch(error => {
            console.log("Error check permiso", error);
          });
      }
      if (granted === true || granted === PermissionsAndroid.RESULTS.GRANTED) {
        if (this.props.ubicacionIncidencia) {
          console.log("mostrara tu ubicacion");
          navigator.geolocation.getCurrentPosition(
            position => {
              this.setState({
                region: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: LATITUDE_DELTA1,
                  longitudeDelta: LONGITUDE_DELTA1
                },
                coordinate: new AnimatedRegion({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: LATITUDE_DELTA1,
                  longitudeDelta: LONGITUDE_DELTA1
                })
              });
              try {
                AsyncStorage.setItem(
                  "@Reporte:latitud",
                  this.state.region.latitude.toString()
                );
                AsyncStorage.setItem(
                  "@Reporte:longitud",
                  this.state.region.longitude.toString()
                );
              } catch (e) {
                console.error("@Reporte:ubic", e.error);
              }
            },
            () => {
              if (Platform.OS === "android") {
                RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
                  interval: 10000,
                  fastInterval: 5000
                })
                  .then(data => {
                    this.requestLocationPermission();
                  })
                  .catch(err => console.log(err));
              }
            },
            { enableHightAcuracy: true, timeout: 2000 }
          );
        } else if (this.props.ubicacion == null) {
          console.log("mostrara tu ubicacion");
          navigator.geolocation.getCurrentPosition(
            position => {
              this.setState({
                region: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA
                },
                coordinate: new AnimatedRegion({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA
                })
              });
            },
            error => {
              if (Platform.OS === "android") {
                RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
                  interval: 10000,
                  fastInterval: 5000
                })
                  .then(data => {
                    this.requestLocationPermission();
                  })
                  .catch(err => console.log(err));
              }
            },
            { enableHightAcuracy: true, timeout: 2000 }
          );
          this.watchID = navigator.geolocation.watchPosition(position => {
            const newRegion = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            };
          });
        } else {
          console.log("mostrara su ubicacion");
          this.setState({
            region: {
              latitude: parseFloat(this.props.ubicacion.latitud),
              longitude: parseFloat(this.props.ubicacion.longitud),
              latitudeDelta: LATITUDE_DELTA2,
              longitudeDelta: LONGITUDE_DELTA2
            }
          });
        }
      } else {
        console.warn("Permiso de ubicación denegado");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async componentWillMount() {
    await this.requestLocationPermission();
  }

  onPress = () =>
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          },
          verRuta: true
        });
      },
      () => {
        if (Platform.OS === "android") {
          RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000
          })
            .then(data => {
              this.onPress();
            })
            .catch(err => console.log(err));
        }
      },
      { enableHightAcuracy: true, timeout: 2000 }
    );

  actualizarMarcador = e => {
    if (this.props.ubicacionIncidencia) {
      //console.log(e.nativeEvent.coordinate)
      this.setState({
        region: {
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
          latitudeDelta: LATITUDE_DELTA1,
          longitudeDelta: LONGITUDE_DELTA1
        },
        coordinate: new AnimatedRegion({
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
          latitudeDelta: LATITUDE_DELTA1,
          longitudeDelta: LONGITUDE_DELTA1
        })
      });
      try {
        AsyncStorage.setItem(
          "@Reporte:latitud",
          this.state.region.latitude.toString()
        );
        AsyncStorage.setItem(
          "@Reporte:longitud",
          this.state.region.longitude.toString()
        );
      } catch (e) {
        console.error("@Reporte:ubic", e.error);
      }
    }
  };

  render() {
    let verRuta;
    if (this.props.ubicacion != null) {
      verRuta = (
        <TouchableOpacity onPress={this.onPress} style={styles.button}>
          <Text style={styles.buttonText}>Ver ruta</Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.container}>
        {this.state.region.latitude ? (
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={[styles.map, { width: this.state.width }]}
            onMapReady={() => this.setState({ width: "100%" })}
            region={this.state.region}
            showsUserLocation={true}
            followsUserLocation={true}
            onPress={this.actualizarMarcador}
          >
            {this.props.ubicacion ? (
              <MapView.Marker
                coordinate={{
                  latitude: parseFloat(this.props.ubicacion.latitud),
                  longitude: parseFloat(this.props.ubicacion.longitud)
                }}
                title={this.props.ubicacion.nombre}
                description=""
              />
            ) : null}
            {this.state.verRuta ? (
              <MapViewDirections
                origin={{
                  latitude: this.state.region.latitude,
                  longitude: this.state.region.longitude
                }}
                //origin={{ latitude: -17.83, longitude: -63.21 }}
                destination={{
                  latitude: parseFloat(this.props.ubicacion.latitud),
                  longitude: parseFloat(this.props.ubicacion.longitud)
                }}
                apikey={GOOGLE_MAPS_APIKEY}
                region={REGION}
                strokeWidth={3}
                strokeColor="hotpink"
              />
            ) : null}
            {this.props.ubicacionIncidencia ? (
              <MapView.Marker.Animated
                ref={marker => {
                  this.marker = marker;
                }}
                coordinate={this.state.coordinate}
                title="Ubicacion de la incidencia"
              />
            ) : null}

            {//para vende ciudad
            this.props.listaMarker
              ? this.props.listaMarker.map(marker => (
                  <MapView.Marker
                    ref={marker => {
                      this.marker = marker;
                    }}
                    key={marker.id}
                    coordinate={{
                      latitude: parseFloat(marker.latitud),
                      longitude: parseFloat(marker.longitud)
                    }}
                    title={marker.nombre}
                    description={marker.direccion}
                  />
                ))
              : null}
          </MapView>
        ) : null}
        {verRuta}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  button: {
    margin: 10,
    backgroundColor: "#2196F3",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  }
});
