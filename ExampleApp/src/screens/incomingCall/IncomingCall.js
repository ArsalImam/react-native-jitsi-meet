import React, {useCallback} from 'react';
import {View, Image, ImageBackground, Text} from 'react-native';
import CommonStyles from '../../CommonStyles';
import Api from '../../Api';
import {TouchableOpacity} from 'react-native-gesture-handler';

var Sound = require('react-native-sound');

// Enable playback in silence mode
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
  }


  _getUser(){
    Api.instance()
    ._user()
    .then(user => {
      if (user == null) return;
      this.setState(
        {
          user,
        },
      );
      console.warn('user user ===>', this.state.user); 
    })
    .catch(err => {
     // ViewUtils.showToast(err)
    });
  }


  render() {
    console.warn("firstName :: ",this.state.user.firstName)
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
              <Text style={{marginTop: 15, fontSize: 22, color: 'white'}}>Doctor is Calling</Text>
            ) : (
              <Text style={{marginTop: 15, fontSize: 22, color: 'white'}}>Patient is Calling</Text>
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
                // console.warn('APPP)))) appointmentId --- ', this.appointmentId);
                this.props.navigation.replace('AppointmentRoom', {
                  appointmentId: this.state.appointmentId,
                });
              }}>
              <Image
                style={{width: 70, height: 70}}
                source={require('../../assets/img/call1.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                this.whoosh.stop();
                this.props.navigation.goBack();}}>
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

    // Load the sound file 'whoosh.mp3' from the app bundle
    // See notes below about preloading sounds within initialization code below.
   let ringtone = Api.instance().getMediaUrl('images','ringtone.mp3');
    console.warn("ringtone :: ",ringtone)
    this.whoosh = new Sound(ringtone, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.warn('failed to load the sound', error);
        return;
      }else{
        this._playAudio();
      }
      // loaded successfully
      console.warn('duration in seconds: ' + this.whoosh.getDuration() + 'number of channels: ' + this.whoosh.getNumberOfChannels());
    });
  }
  _playAudio() {
    console.warn('_playAudio')
    // Play the sound with an onEnd callback
      this.whoosh.play((success) => {
        console.warn("success === ",success)
        if (success) {
          console.warn('successfully finished playing');
        } else {
          console.warn('playback failed due to audio decoding errors');
        }
      });

      this.whoosh.setNumberOfLoops(3);
  }
}
