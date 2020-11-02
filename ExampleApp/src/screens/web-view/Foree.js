import React, {Component} from 'react';
import {View, TouchableOpacity, BackHandler, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import { Header, Left, Right, Body, Icon, Container, Button, Title,} from 'native-base';
import CommonStyles from '../../CommonStyles';
import {ViewUtils} from '../../Utils';
import {Configs, Roles, AppointmentStatus} from '../../Configs';
import Api from '../../Api';
export default class Foree extends Component {
 state={}
  constructor(props) {
    super(props);
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
    // Api.instance()
    // .getUserRole()
    // .then(role => {
    //   this.setState({userRole:role})
    // })
  console.warn('roue params',this.props.route.params.user)
  this.setState({clinicId:this.props.route.params.clinicId,userId:this.props.route.params.user,appointmentId:this.props.route.params.appointmentId})
    
}

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

<<<<<<< HEAD
  render() {
   
    const endPoint = 'TransactionLogs/getForeePage';
   //const endPoint = 'https://github.com/react-native-community/react-native-webview';
   
    // const runFirst = `
    //   document.body.style.backgroundColor = 'red';
    //   setTimeout(function() { window.alert('hi') }, 5000);
    //   true; // note: this is required, or you'll sometimes get silent failures
    // `;
=======
  render () {

    var Code=Math.floor(1000 + Math.random() * 9000);
    
    const endPoint = `${Configs.foreeUrl}?amount=1000&userId=${this.state.userId}&createdBy=${this.state.userId}&isProd=true&type=patient&slots=1&transactionCode=${Code}&paymentType=foree&url=${Configs.baseUrlForee}`;
    //  console.warn(`${Configs.foreeUrl}?amount=1000&userId=${this.state.userId}&createdBy=${this.state.userId}&isProd=true&type=patient&slots=1&transactionCode=${Code}&paymentType=foree&url=${Configs.baseUrlForee}`);
    //  const endPoint = 'https://github.com/react-native-community/react-native-webview';
  
>>>>>>> fccdbfe4bad926bb09125306005d65e8582f2f04
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
            uri: `${endPoint}`,
          }}
<<<<<<< HEAD
        //  onMessage={event => {}}
=======
        
          onMessage={(event)=> Alert.alert(event.nativeEvent.data) }
        //  onMessage={event => {
        //    console.warn('event === ',event)
        //    if(event.success==1){
        //       Api.instance()
        //         ._user()
        //         .then(user => {
        //           Api.instance()
        //             .updateAppointment(this.state.appointmentId, user.id)
        //             .then(() => {
        //               console.warn('user.id ::: ', user.id);
        //               ViewUtils.showToast(
        //                 'Appointment has been booked successfully',
        //               );
        //               this.refreshList();
        //             })
        //             .catch(err => {
        //               ViewUtils.showToast(err);
        //             })
        //             .finally();
        //         });
        //    }
        //  }}
>>>>>>> fccdbfe4bad926bb09125306005d65e8582f2f04
          // injectedJavaScript={runFirst}
        />
      </Container>
    );
  }
}