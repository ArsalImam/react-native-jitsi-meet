import React, {useCallback} from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import CommonStyles from '../../CommonStyles';
import Api from '../../Api';
import Methods from '../../Methods';

var Sound = require('react-native-sound');

Sound.setCategory('Playback');
export default class IncomingCall extends React.Component {
  whoosh: any;
  constructor(props) {
    super(props);

    this.state = {
      appointmentId: '',
      user: {
        personalDetails: {},
      },
    };

    this._initSound();
    let that = this;
  }

  componentDidMount() {
    const {appointmentId} = this.props.route.params;
    this.setState({appointmentId: appointmentId});
    this._getUser();
    Methods.instance()._pushIncomingCall(true);
  }

  componentWillUnmount() {
    Methods.instance()._pushIncomingCall(false);
  }

  _getUser() {
    Api.instance()
      ._user()
      .then(user => {
        if (user == null) return;
        this.setState({
          user,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <View style={[CommonStyles.container, {backgroundColor: '#222222'}]}>
        <ImageBackground
          style={[CommonStyles.container, CommonStyles.backgroundImage]}
          source={require('../../assets/img/back.jpg')}>
          <View style={{flex: 1, alignItems: 'center', marginTop: 100}}>
            <Image
              style={{width: 150, height: 150}}
              source={require('../../assets/img/person-icon.png')}
            />
            {this.state.user.role == 'ROLE_PATIENT' ? (
              <Text style={{marginTop: 15, fontSize: 22, color: 'white'}}>
                Doctor is Calling
              </Text>
            ) : (
              <Text style={{marginTop: 15, fontSize: 22, color: 'white'}}>
                Patient is Calling
              </Text>
            )}
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.whoosh.stop();
                this.props.navigation.replace('AppointmentRoom', {
                  appointmentId: this.state.appointmentId,
                });
              }}>
              <Image
                style={{width: 70, height: 70}}
                source={require('../../assets/img/call1.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.whoosh.stop();
                this.props.navigation.goBack();
              }}>
              <Image
                style={{width: 70, height: 70}}
                source={require('../../assets/img/call2.png')}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }

  _initSound() {
    let ringtone = 'https://etibb.s3-ap-southeast-1.amazonaws.com/ringtone.mp3'
  
    this.whoosh = new Sound(ringtone, null, error => {
      if (error) {
        return;
      } else {
        this._playAudio();
      }
    });
  }
  _playAudio() {
    this.whoosh.play(success => {
      if (success) {
      } else {
      }
    });
    
    this.whoosh.setNumberOfLoops(3);
  }
}