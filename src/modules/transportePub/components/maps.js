import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Alert,
  View,
  PermissionsAndroid
} from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  AnimatedRegion,
  Polyline
} from "react-native-maps";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import Icon from "react-native-vector-icons/Feather";

const LATITUDE_DELTA1 = 0.08; //plaza
const LONGITUDE_DELTA1 = 0.0365;
const LATITUDE_DELTA2 = 0.02; //mi ubicacion
const LONGITUDE_DELTA2 = 0.0091;
const myIcon = <Icon name="map-pin" size={25} color={"black"} />;

export default class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: LATITUDE_DELTA2,
        longitudeDelta: LONGITUDE_DELTA2
      },
      coordinate: new AnimatedRegion({
        latitude: null,
        longitude: null,
        latitudeDelta: LATITUDE_DELTA1,
        longitudeDelta: LONGITUDE_DELTA1
      }),
      width: "101%",
      b: true
    };
  }

  requestLocationPermission = async () => {
    try {
      var granted = true
      if (Platform.OS === 'android') {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Permiso de ubicación",
            message:
              "Esta aplicación necesita acceso a su ubicación " +
              "para que podamos saber dónde estás."
          }
        );
      }
      if (
        Platform.OS !== 'android' ||
        granted === PermissionsAndroid.RESULTS.GRANTED
      ) {
        if (this.props.linea) {
          console.log("mostrara ubicacion de la plaza de Yacuiba");
          this.setState({
            region: {
              latitude: -22.013724,
              longitude: -63.677821,
              latitudeDelta: LATITUDE_DELTA1,
              longitudeDelta: LONGITUDE_DELTA1
            },
            b: false
          });
        } else {
          console.log("mostrara tu ubicacion");
          navigator.geolocation.getCurrentPosition(
            position => {
              this.setState({
                region: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: LATITUDE_DELTA2,
                  longitudeDelta: LONGITUDE_DELTA2
                },
                coordinate: new AnimatedRegion({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: LATITUDE_DELTA2,
                  longitudeDelta: LONGITUDE_DELTA2
                }),
                b: true
              });
            },
            error => {
              RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
                interval: 10000,
                fastInterval: 5000
              })
                .then(data => {
                  this.requestLocationPermission();
                })
                .catch(err => console.log(err));
            },
            { enableHightAcuracy: true, timeout: 2000 }
          );
          this.watchID = navigator.geolocation.watchPosition(position => {
            const newRegion = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA2,
              longitudeDelta: LONGITUDE_DELTA2
            };
          });
        }
      } else {
        console.log("Permiso de ubicación denegado");
      }
    } catch (err) {
      console.warn("err ", err);
    }
  };

  async componentDidMount() {
    await this.requestLocationPermission();
  }

  rutas = listaTransp => {
    if (!this.state.b) {
      this.requestLocationPermission();
    }
    if (listaTransp.ruta_geom != null) {
      var txt = listaTransp.ruta_geom;
      txt = txt.split("latitude").join('"latitude"');
      txt = txt.split("longitude").join('"longitude"');
      var obj = JSON.parse(txt);
      return (
        <Polyline
          key={listaTransp.id}
          coordinates={obj}
          strokeColor={listaTransp.color}
          strokeWidth={4}
          lineCap={"round"}
          tappable={true}
          onPress={() => this.mostrarInfo(listaTransp.value)}
        />
      );
    }
  };

  ruta = linea => {
    if (this.state.b) {
      this.requestLocationPermission();
    }
    var txt = linea.ruta_geom;
    txt = txt.split("latitude").join('"latitude"');
    txt = txt.split("longitude").join('"longitude"');
    var obj = JSON.parse(txt);
    return (
      <View>
        <Polyline coordinates={obj} strokeColor={linea.color} strokeWidth={4} />
        <MapView.Marker
          coordinate={{
            latitude: parseFloat(linea.inicio_lat),
            longitude: parseFloat(linea.inicio_lon)
          }}
          title={linea.inicio}
        >
          {myIcon}
        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: parseFloat(linea.final_lat),
            longitude: parseFloat(linea.final_lon)
          }}
          title={linea.final}
        >
          {myIcon}
        </MapView.Marker>
      </View>
    );
  };

  mostrarInfo = linea => {
    Alert.alert(linea);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.region.latitude ? (
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            //customMapStyle={MapStyle}
            style={[styles.map, { width: this.state.width }]}
            onMapReady={() => this.setState({ width: "100%" })}
            region={this.state.region}
            showsUserLocation={true}
            followsUserLocation={true}
          >
            {this.props.linea
              ? this.ruta(this.props.linea)
              : this.props.listaTransp
              ? this.props.listaTransp.map(listaTransp =>
                  this.rutas(listaTransp)
                )
              : null}
          </MapView>
        ) : null}
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
  }
});