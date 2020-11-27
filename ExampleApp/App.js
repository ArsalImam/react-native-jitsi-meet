/**

 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Root} from 'native-base';
import Routes from './src/Routes';
import CommonStyles from './src/CommonStyles';
import {useNavigationState} from '@react-navigation/native';
import FCM from './src/FCM';
import RealtimeDatabase from './src/RealtimeDatabase';

import {View, StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import {ViewUtils} from './src/Utils';
import Api from './src/Api';
import Methods from './src/Methods';
// Import the react-native-sound module
//var Sound = require('react-native-sound');

// Enable playback in silence mode
//Sound.setCategory('Playback');

class App extends React.Component {
  navigationRef: any;
  //whoosh:any;
  constructor(props) {
    super(props);

    //this._initSound();
    let that = this;
    try {
      FCM.instance().notifyUser = (title, message) => {
        console.warn('agae call');
        if (!message) {
          return;
        }
        // var message = message_key;
     //   setTimeout(() => {
          const currentRouteName = that.navigationRef.getCurrentRoute().name;

         
          // console.log("kjabsjkndkasjnkjdnaskjdnaskjsndjkan" + JSON.stringify(message_key));
          // debugger;
          if (!message.data ) {
            message.data = message;
          }
          

          
          //console.warn('message ::: backgound >>>>', message.data);
          if ( currentRouteName != 'AppointmentRoom' && (message.data['type'] == 'appointment' || message.type == 'appointment')) {
            console.warn('andr aya');
            let appointmentId = message.data['id'] || message.id;

            //playing audio
            //that._playAudio();

            //showing toast with accept button
            that.navigationRef.navigate('IncomingCall', {appointmentId});

            // ViewUtils.showToast('You have an appointment call', 'Answer', 10 * 1000, () => {
            //   that.whoosh.stop();
            //   console.warn("APPP)))) appointmentId --- ",appointmentId)
            //   that.navigationRef.navigate('AppointmentRoom', {appointmentId});
            // });
          }
   //     }, 1 * 1000);
      };
    } catch (e) {
      console.warn('error at fcm ::: ', e);
    }

    RealtimeDatabase.instance().handleChangeRealtime = data => {
      console.warn('firebase data', data);
    };
  }

  // _initSound() {

  //   // Load the sound file 'whoosh.mp3' from the app bundle
  //   // See notes below about preloading sounds within initialization code below.
  //   let ringtone = Api.instance().getMediaUrl('images','ringtone.mp3');

  //   this.whoosh = new Sound(ringtone, Sound.MAIN_BUNDLE, (error) => {
  //     if (error) {
  //       console.warn('failed to load the sound', error);
  //       return;
  //     }
  //     // loaded successfully
  //     console.warn('duration in seconds: ' + this.whoosh.getDuration() + 'number of channels: ' + this.whoosh.getNumberOfChannels());
  //   });
  // }
  // _playAudio() {
  //   console.warn('_playAudio')
  //   // Play the sound with an onEnd callback
  //     this.whoosh.play((success) => {
  //       console.warn("success === ",success)
  //       if (success) {
  //         console.warn('successfully finished playing');
  //       } else {
  //         console.warn('playback failed due to audio decoding errors');
  //       }
  //     });
  // }
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    FCM.instance().appInit();
    RealtimeDatabase.instance().appInit();

    SplashScreen.hide();
  }

  componentWillUnmount() {
    FCM.instance().appDesroyed();
    //this.whoosh.stop();
  }

  render() {
    return (
      <Root>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
        <SafeAreaView style={CommonStyles.container}>
          <NavigationContainer
            ref={navigationRef => (this.navigationRef = navigationRef)}>
            <Routes />
          </NavigationContainer>
        </SafeAreaView>
      </Root>
    );
  }
}

export default App;
