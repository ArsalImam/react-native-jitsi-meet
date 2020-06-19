/**

 * @format
 * @flow
 */
import SplashScreen from 'react-native-splash-screen'
import 'react-native-gesture-handler';
import React,  {Component }from 'react';
import {Container, Text} from 'native-base';
import Routes from './Routes'
import {View, StyleSheet, StatusBar} from 'react-native';


class App extends React.Component {

  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }
  
 
  render() {
  return (
    <Routes />
  )
};
}

export default App;
