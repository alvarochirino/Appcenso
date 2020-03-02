import React, { Component } from 'react';
import { Text, View, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import AppLayout from './src/app'
import { store, persistor } from './store'

type Props = {};
export default class App extends Component<Props> {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider
        store={store}
      >
        <PersistGate
          //loading={<Text>Cargando...</Text>}
          persistor={persistor}
        >
          <View style={{ flex: 1 }}>
            <StatusBar
              barStyle="default"
              backgroundColor="#000"
            />
            <AppLayout />
          </View>
        </PersistGate>
      </Provider>
    )
  }
}


