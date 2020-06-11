import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import AppLayout from './src/app';

export default class App extends Component {
  componentDidMount () {
    SplashScreen.hide ();
  }

  render () {
    return (
      <>
        <StatusBar barStyle="default" backgroundColor="#000" />
        <AppLayout />
      </>
    );
  }
}