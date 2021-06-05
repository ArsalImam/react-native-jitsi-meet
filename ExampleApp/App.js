import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Root} from 'native-base';
import Routes from './src/Routes';
import CommonStyles from './src/CommonStyles';
import FCM from './src/FCM';
import RealtimeDatabase from './src/RealtimeDatabase';
import {StatusBar, SafeAreaView} from 'react-native';
class App extends React.Component {
  navigationRef: any;
  constructor(props) {
    super(props);

    let that = this;
    try {
      FCM.instance().notifyUser = (title, message) => {
        if (!message) {
          return;
        }
        const currentRouteName = that.navigationRef.getCurrentRoute().name;

        if (!message.data) {
          message.data = message;
        }

        if (
          currentRouteName != 'AppointmentRoom' &&
          (message.data['type'] == 'appointment' ||
            message.type == 'appointment')
        ) {
          let appointmentId = message.data['id'] || message.id;

          that.navigationRef.navigate('IncomingCall', {appointmentId});
        }
      };
    } catch (e) {}

    RealtimeDatabase.instance().handleChangeRealtime = data => {};
  }

  componentDidMount() {
    if (!__DEV__) console.log = () => null
    FCM.instance().appInit();
    RealtimeDatabase.instance().appInit();
    SplashScreen.hide();
  }

  componentWillUnmount() {
    FCM.instance().appDesroyed();
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