import React, {Component} from 'react';
import {View, TouchableOpacity, BackHandler, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import { Header, Left, Right, Body, Icon, Container, Button, Title,} from 'native-base';
import CommonStyles from '../../CommonStyles';
import {ViewUtils} from '../../Utils';
import {Configs, Roles, AppointmentStatus} from '../../Configs';

export default class Foree extends Component {
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

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {
   
    const endPoint = 'TransactionLogs/getForeePage';
   //const endPoint = 'https://github.com/react-native-community/react-native-webview';
   
    // const runFirst = `
    //   document.body.style.backgroundColor = 'red';
    //   setTimeout(function() { window.alert('hi') }, 5000);
    //   true; // note: this is required, or you'll sometimes get silent failures
    // `;
    return (
      <Container style={{flex: 1, backgroundColor: '#000'}}>
        <Header style={{height: 70, backgroundColor: '#297dec'}}>
          <Left style={{}}>
            <Button
              transparent
              style={{margin: 20}}
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
            uri: `${Configs.baseUrl}${endPoint}`,
          }}
        //  onMessage={event => {}}
          // injectedJavaScript={runFirst}
        />
      </Container>
    );
  }
}