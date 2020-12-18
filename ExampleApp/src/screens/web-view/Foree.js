import React, {Component} from 'react';
import {View, TouchableOpacity, BackHandler, Alert, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  Header,
  Left,
  Right,
  Body,
  Icon,
  Container,
  Button,
} from 'native-base';
import {ViewUtils} from '../../Utils';
import {Configs, Roles, AppointmentStatus} from '../../Configs';
import Api from '../../Api';
export default class Foree extends Component {
  state = {};
  injectedJavascript = `(function() {
    window.postMessage = function(data) {
  window.ReactNativeWebView.postMessage(data);
};
})()`;
  constructor(props) {
    super(props);
    this.webView = null;
  }

  reloadWebView() {
    this.setState({
      forceReload: true,
    });
  }
  handleBackButton = () => {
    Alert.alert(
      'E-tibb',
      'Are you sure, You want to cancel the payment process?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.props.navigation.goBack(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  BackButton = () => {
    ViewUtils.showToast(
      'E-tibb',
      'Are you sure, You want to cancel the payment process?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.props.navigation.goBack(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.setState({
      userId: this.props.route.params.user,
      appointmentId: this.props.route.params.appointmentId,
      appointmentFees: this.props.route.params.appointmentFees,
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {
    var Code = Math.floor(1000 + Math.random() * 9000);

    const endPoint = `${Configs.foreeUrl}?amount=${
      this.state.appointmentFees
    }&userId=${this.state.userId}&createdBy=${
      this.state.userId
    }&isProd=true&type=patient&slots=1&transactionCode=${Code}&paymentType=foree&url=${
      Configs.baseUrlForee
    }`;
    return (
      <Container style={{flex: 1, backgroundColor: '#000'}}>
        <Header
          androidStatusBarColor="#00000000"
          style={{height: 70, backgroundColor: '#297dec'}}>
          <Left style={{}}>
            <Button
              transparent
              style={{margin: 20, marginTop: 30}}
              onPress={() => this.handleBackButton()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body />
          <Right>
            <Button transparent />
          </Right>
        </Header>

        <WebView
          source={{
            uri: `${endPoint}`,
            forceReload: true,
          }}
          startInLoadingState={true}
          javaScriptEnabledAndroid={true}
          javaScriptEnabled={true}
          ref={webView => (this.webView = webView)}
          onMessage={event => {
            console.warn('event === ', event);
            if (event.nativeEvent.data == 'success' && event.nativeEvent.canGoBack ) {
              Api.instance()
                ._user()
                .then(user => {
                  Api.instance()
                    .updateAppointment(this.state.appointmentId, user.id)
                    .then(() => {
                      console.warn('user.id ::: ', user.id);
                      ViewUtils.showToast(
                        'Appointment has been booked successfully',
                      );
                      this.props.navigation.replace('MyTabs', {
                        screen: 'Scheduled',
                      });
                    })
                    .catch(err => {
                      ViewUtils.showToast(err);
                    })
                    .finally();
                });
            }
          }}
          injectedJavaScript={this.injectedJavascript}                                                                      
        />
      </Container>
    );
  }
}