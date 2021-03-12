import React, {Component} from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  Text,
  Item,
  Icon,
} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import CommonStyles from '../../CommonStyles';
import {DatePicker} from 'native-base';
import Api from '../../Api';
import Loader from '../../components/Loader';
import {ViewUtils} from '../../Utils';

export default class FollowUpAdd extends Component {
  constructor(props) {
    super(props);
    if (this.props.route.params) {
      this.state = {
        isLoading: false,
        answer: '',
        data: [],
        appointmentId: this.props.route.params.appointmentId,
        patientId: this.props.route.params.patientId,
      };
    } else {
      this.state = {
        isLoading: false,
        answer: '',
        data: [],
      };
    }
  }

  setDate(newDate) {
    if (!newDate) {
      newDate = new Date();
    }
    this.setState({ answer: newDate.toString().substr(4, 12), showDate: false });
  }


  _saveFollowUp = () => {

    if (this.state.appointmentId != null) {
      let data = {
        date: new Date(),
        patientId: this.state.patientId,
        answer: this.state.answer,
        notes: '',
        'setup-type': 'followup',
        active: false,
      };

      if (this.state.answer != '') {
        this.setState({isLoading: true});
        Api.instance()
          .createPrescription(data)
          .then(response => {
            this.addToConsultation(data);
            this.props.route.params.onFollowUpAdd();
            this.props.navigation.goBack();
            ViewUtils.showToast('FollowUp has been saved successfully!');
          })
          .catch(err => {
            ViewUtils.showAlert('Unable to Perform this Action');
          })
          .finally(() => {
            this.setState({isLoading: false});
          });
      } else {
        ViewUtils.showAlert('Please Provide FollowUp Date');
      }
    } else {
      let data = {
        setupType: 'followUp',
        name: this.state.answer,
        description: '',
      };

      if (this.state.answer != '') {
        this.setState({isLoading: true});
        Api.instance()
          .createMedication(data)
          .then(response => {
            this.props.route.params.onFollowUpAdd();
            this.props.navigation.goBack();
            ViewUtils.showToast('FollowUp has been saved successfully!');
          })
          .catch(err => {
            ViewUtils.showAlert('Unable to Perform this Action');
          })
          .finally(() => {
            this.setState({isLoading: false});
          });
      } else {
        ViewUtils.showAlert('Please Provide FollowUp Date');
      }
    }
  };

  addToConsultation(item) {
    Api.instance()
      .addPrescribeMedication(
        item,
        this.state.appointmentId,
        this.state.patientId,
      )

      .then(response => {
      })
      .catch(err => {})
      .finally(() => {});
  }

  render() {
    if (this.state.appointmentId != null) {
      return (
        <View style={{height: '75%'}}>
          <ImageBackground
            style={[CommonStyles.container, CommonStyles.backgroundImage]}
            source={require('../../assets/img/background.png')}>
            <View style={{flex: 3, backgroundColor: '#297dec'}}>
              <Text
                style={[
                  CommonStyles.fontRegular,
                  CommonStyles.headingTextStyle,
                ]}>
                <Text
                  style={[
                    CommonStyles.textSizeLarge,
                    CommonStyles.textColorWhite,
                  ]}>{`FollowUp Add\n`}</Text>
                <Text
                  style={[
                    CommonStyles.textSizeSmall,
                    CommonStyles.textColorWhite,
                  ]}>
                  Add a new Follow up{' '}
                </Text>
              </Text>
            </View>

            <View style={{flex: 8, paddingHorizontal: 18, marginTop: 33}}>
              <KeyboardAwareScrollView
                style={[{backgroundColor: '#fff', borderRadius: 5}]}>
                  <Item style={[CommonStyles.container, CommonStyles.itemStyle]}>
                <Button title={this.state.answer || "Select Date"} onPress={() => this.setState({ showDate: true })} style={{ height: 20, backgroundColor: 'red' }} />
                  <DateTimePickerModal
                    isVisible={this.state.showDate}
                    mode="date"
                    headerTextIOS="Select Date"
                    onConfirm={(date) => { this.setDate(date); }}
                    onCancel={() => { this.setState({ showDate: false }) }}
                  />
                  <Icon active name="calendar" style={{marginLeft: 20}} />
                </Item>
              </KeyboardAwareScrollView>
            </View>

            <View
              style={[
                CommonStyles.fitToBottom,
                CommonStyles.horizontalContainer,
                {
                  backgroundColor: '#F7FAFE',
                  borderTopRightRadius: 5,
                  borderTopStartRadius: 5,
                  borderTopWidth: 3,
                  borderColor: '#FFF',
                },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  this._saveFollowUp();
                }}
                style={[
                  CommonStyles.container,
                  CommonStyles.centerText,
                  {borderRightWidth: 0.5, borderColor: '#cfd2d6'},
                ]}>
                <Text
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeNormal,
                    CommonStyles.centerText,
                    CommonStyles.margin,
                    CommonStyles.padding,
                    {opacity: 0.5},
                  ]}>
                  SAVE
                </Text>
              </TouchableOpacity>
            </View>

            <Loader loading={this.state.isLoading} />

            {/* <View
                            style={[
                                CommonStyles.backButtonStyle
                            ]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.goBack();
                                }}>
                                <Icon
                                    name="arrow-back"
                                    type="MaterialIcons"
                                    style={{ fontSize: 26, color: '#FFF' }}
                                />
                            </TouchableOpacity>
                        </View> */}
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={[CommonStyles.container]}>
          <ImageBackground
            style={[CommonStyles.container, CommonStyles.backgroundImage]}
            source={require('../../assets/img/bwback.png')}>
            <View style={{flex: 2.3}}>
              <Text
                style={[
                  CommonStyles.fontRegular,
                  CommonStyles.headingTextStyle,
                ]}>
                <Text
                  style={[
                    CommonStyles.textSizeLarge,
                    CommonStyles.textColorWhite,
                  ]}>{`FollowUp Add\n`}</Text>
                <Text
                  style={[
                    CommonStyles.textSizeSmall,
                    CommonStyles.textColorWhite,
                  ]}>
                  Add a new Follow up{' '}
                </Text>
              </Text>
            </View>

            <View style={{flex: 8, paddingHorizontal: 18, marginTop: 33}}>
              <KeyboardAwareScrollView
                style={[{backgroundColor: '#fff', borderRadius: 5}]}>
                <Item style={[CommonStyles.container, CommonStyles.itemStyle]}>
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date()}
                    locale={'en'}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'default'}
                    placeholder="mm/dd/yyyy"
                    placeholderTextColor="black"
                    style={[CommonStyles.fontRegular, {marginTop: 10}]}
                    intialValue={this.state.answer}
                    onChange={date => this.setState({answer: date})}
                    // disabled={false}
                  />
                  <Icon active name="calendar" style={{marginLeft: 20}} />
                </Item>
              </KeyboardAwareScrollView>
            </View>

            <View
              style={[
                CommonStyles.fitToBottom,
                CommonStyles.horizontalContainer,
                {
                  backgroundColor: '#F7FAFE',
                  borderTopRightRadius: 5,
                  borderTopStartRadius: 5,
                  borderTopWidth: 3,
                  borderColor: '#FFF',
                },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  this._saveFollowUp();
                }}
                style={[
                  CommonStyles.container,
                  CommonStyles.centerText,
                  {borderRightWidth: 0.5, borderColor: '#cfd2d6'},
                ]}>
                <Text
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeNormal,
                    CommonStyles.centerText,
                    CommonStyles.margin,
                    CommonStyles.padding,
                    {opacity: 0.5},
                  ]}>
                  SAVE
                </Text>
              </TouchableOpacity>
            </View>

            <Loader loading={this.state.isLoading} />

            {/* <View
                            style={[
                                CommonStyles.backButtonStyle
                            ]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.goBack();
                                }}>
                                <Icon
                                    name="arrow-back"
                                    type="MaterialIcons"
                                    style={{ fontSize: 26, color: '#FFF' }}
                                />
                            </TouchableOpacity>
                        </View> */}
          </ImageBackground>
        </View>
      );
    }
  }
}
