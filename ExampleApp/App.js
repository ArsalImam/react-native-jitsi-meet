/**

 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Root } from 'native-base';
import Routes from './src/Routes';
import CommonStyles from './src/CommonStyles';
import { View, StyleSheet, StatusBar, SafeAreaView } from 'react-native';

class App extends React.Component {

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }

  render() {
    return (
      <Root>
        <SafeAreaView style={CommonStyles.container}>
          <NavigationContainer>
          <StatusBar translucent backgroundColor='transparent' barStyle={'light-content'} />

            <Routes />
          </NavigationContainer>
        </SafeAreaView>
      </Root>
    );
  }
}

export default App;
