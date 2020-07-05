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
import { useNavigationState } from '@react-navigation/native';
import FCM from "./src/FCM";
import { View, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { ViewUtils } from "./src/Utils";
// Import the react-native-sound module
var Sound = require('react-native-sound');

// Enable playback in silence mode
Sound.setCategory('Playback');

class App extends React.Component {
  navigationRef:any;
  whoosh:any;
  constructor(props) {
    super(props);

    this._initSound();
    let that = this;
    FCM.instance().notifyUser = (title, message) => {
      debugger;
      const currentRouteName = that.navigationRef.getCurrentRoute().name
      
      if (currentRouteName != 'AppointmentRoom' && message["type"] == 'appointment') {

          let appointmentId = message['id'];

          //playing audio
          that._playAudio();

          //showing toast with accept button
          ViewUtils.showToast('You have an appointment call', 'Answer', 10 * 1000, () => {
            that.whoosh.stop();
            that.navigationRef.navigate('AppointmentRoom', {appointmentId});
          });
      } 
    }
  }

  _initSound() {
    // Load the sound file 'whoosh.mp3' from the app bundle
    // See notes below about preloading sounds within initialization code below.
    this.whoosh = new Sound('iphone.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + this.whoosh.getDuration() + 'number of channels: ' + this.whoosh.getNumberOfChannels());
    });
  }
  _playAudio() {
    console.warn('_playAudio')
    // Play the sound with an onEnd callback
      this.whoosh.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
  }
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
    FCM.instance().appInit();
  }

  componentWillUnmount() {
      FCM.instance().appDesroyed();
      this.whoosh.stop();
  }

  render() {
    return (
      <Root>
        <StatusBar translucent backgroundColor='transparent' barStyle={'dark-content'} />
        <SafeAreaView style={CommonStyles.container}>
          <NavigationContainer ref={navigationRef => this.navigationRef = navigationRef}>
            <Routes />
          </NavigationContainer>
        </SafeAreaView>
      </Root>
    );
  }
}

export default App;
