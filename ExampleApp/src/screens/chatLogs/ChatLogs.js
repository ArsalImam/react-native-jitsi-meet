import React, {Component} from 'react';
import Api from '../../Api';
import CommonStyles from '../../CommonStyles';
import {ListItem, CheckBox, Divider} from 'react-native-elements';
import {Icon} from 'native-base';
import {FlatGrid} from 'react-native-super-grid';
import {CommonActions} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import {AsyncStorage} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import Loader from '../../components/Loader';

export default class ChatLogs extends Component {
  constructor(props) {
    super(props);
    if (this.props.route.params) {
      this.state = {
        isLoading: true,
        appointmentId: this.props.route.params.appointmentId,
        patientId: this.props.route.params.patientId,
        doctorId: '',
        messages: [],
      };
    } else {
      this.state = {
        isLoading: true,
      };
    }
  }

  componentDidMount() {
    this._getAllChats();
  }

  async _getAllChats() {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    this.setState({doctorId: _user.id});
    database()
      .ref(
        `messages/doctor_patient/${_user.id}/${
          this.props.route.params.patientId
        }`,
      )
      .on('value', appointmentEventObj => {
        if (appointmentEventObj == null) {
          return;
        }
        var firebaseEvent1 = appointmentEventObj.val();

        if (firebaseEvent1 == null) {
          return;
        }
        console.warn('_user.id === ', _user.id);
        console.warn('patientId === ', this.props.route.params.patientId);
        console.warn('data fireabse === ', firebaseEvent1);

        var original_data = Object.keys(
          // (this.firebaseEvent1: any).conversation
          firebaseEvent1.conversation,
        );

        console.warn('original_data === ', original_data);
        this.messages = original_data.map(function(key) {
          return appointmentEventObj.val().conversation[key];
        });

        this.setState({messages: this.messages});

        console.warn('this.messages == ', this.messages);

        // this.messages.forEach((data: any) => {
        //   this.messageArray.push({
        //     message: data.message,
        //     userId: data.userId,
        //     time: data.time,
        //   });
        // });
      });
  }

  async _user() {
    try {
      return JSON.parse(await AsyncStorage.getItem('@user'));
    } catch (e) {
      console.warn(e);
    }
  }

  _getLogChat(chat) {
    console.warn('loggsssss');
    console.warn('chat :: ', chat);
    console.warn('chat.userId :: ', chat.userId);
    console.warn('this.state.doctorId :: ', this.state.doctorId);

    if (chat.userId == this.state.doctorId) {
      console.warn('chat.time -- ', chat.time);
      return (
        <View
          style={[CommonStyles.container, {flexDirection: 'row', padding: 12}]}>
          <View
            style={[CommonStyles.container, {justifyContent: 'space-between'}]}>
            <Text style={{marginBottom: 10}}>
              <Text
                style={[
                  CommonStyles.fontRegular,
                  CommonStyles.textSizeSmall,
                  {color: '#333333'},
                ]}>{`Doctor Message: \n`}</Text>
              <Text
                style={[
                  CommonStyles.fontMedium,
                  CommonStyles.textSizeAverage,
                  {color: '#333333'},
                ]}>
                {chat.message}
              </Text>
            </Text>
          </View>

          <View
            style={[
              CommonStyles.container,
              {
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              },
            ]}>
            <Text>
              <Text
                style={[
                  CommonStyles.textSizeSmall,
                  CommonStyles.fontRegular,
                  {color: '#333333'},
                ]}>{`Date: `}</Text>
              <Text
                style={[
                  CommonStyles.fontMedium,
                  CommonStyles.textSizeAverage,
                  {color: '#333333'},
                ]}>
                {moment(chat.time).format('ll')}
              </Text>
            </Text>
          </View>
        </View>
      );
    } else if (chat.userId == this.props.route.params.patientId) {
      return (
        <View
          style={[CommonStyles.container, {flexDirection: 'row', padding: 12}]}>
          <View
            style={[CommonStyles.container, {justifyContent: 'space-between'}]}>
            <Text style={{marginBottom: 10}}>
              <Text
                style={[
                  CommonStyles.fontRegular,
                  CommonStyles.textSizeSmall,
                  {color: '#333333'},
                ]}>{`Patient Message: \n`}</Text>
              <Text
                style={[
                  CommonStyles.fontMedium,
                  CommonStyles.textSizeAverage,
                  {color: '#333333'},
                ]}>
                {chat.message}
              </Text>
            </Text>
          </View>

          <View
            style={[
              CommonStyles.container,
              {
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              },
            ]}>
            <Text>
              <Text
                style={[
                  CommonStyles.textSizeSmall,
                  CommonStyles.fontRegular,
                  {color: '#333333'},
                ]}>{`Date: `}</Text>
              <Text
                style={[
                  CommonStyles.fontMedium,
                  CommonStyles.textSizeAverage,
                  {color: '#333333'},
                ]}>
                {moment(chat.time).format('ll')}
              </Text>
            </Text>
          </View>
        </View>
      );
    }
  }

  render() {
    if (this.state.appointmentId != null) {
      return (
        <View style={{height: '75%'}}>
          <ImageBackground
            style={[CommonStyles.container, CommonStyles.backgroundImage]}
            source={require('../../assets/img/background.png')}>
            <View style={{flex: 3, backgroundColor: '#297dec'}}>
              <Text style={{color: '#FFFFFF', paddingLeft: 17, marginTop: 65}}>
                <Text
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeLarge,
                  ]}>{`Chat Logs\n`}</Text>
                <Text
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeSmall,
                  ]}>
                  It is a list of your all Chat Logs{' '}
                </Text>
              </Text>
            </View>

            <View style={{flex: 8}}>
              <FlatGrid
                itemDimension={350}
                items={this.state.messages}
                spacing={15}
                style={[CommonStyles.container, {marginTop: 5}]}
                renderItem={({item}) => (
                  <View
                    style={[
                      CommonStyles.container,
                      CommonStyles.shadow,
                      CommonStyles.br5,
                      CommonStyles.bgColor,
                    ]}>
                    <ImageBackground
                      style={[
                        CommonStyles.container,
                        CommonStyles.backgroundImage,
                      ]}
                      source={require('../../assets/img/bookingbg2x.png')}>
                      {this._getLogChat(item)}
                    </ImageBackground>
                  </View>
                )}
              />
            </View>
            <View style={[CommonStyles.backButtonStyle]}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Icon
                  name="arrow-back"
                  type="MaterialIcons"
                  style={{color: '#FFF'}}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}
