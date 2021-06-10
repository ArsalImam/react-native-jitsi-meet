import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { Component } from 'react';
import { CommonActions } from '@react-navigation/native';
import {
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon, Input, Item, Label, Picker, Text } from 'native-base';
import Api from '../../Api';
import CommonStyles from '../../CommonStyles';
import Loader from '../../components/Loader';
import moment from 'moment';
import { ViewUtils } from '../../Utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

export default class CreateClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userObj: {},
      joinedDate: new Date(),
      chosenDate: '',
      date: new Date(1598051730000),
      attendAt: new Date(),
      leftAt: new Date(),
      setMode: '',
      mode: 'time',
      show: false,
      showStartTimePicker: false,
      showEndTimePicker: false,
      clinicFrequency: '',
      clinicFrequencyText: '',
      numberOfClinics: 0,
      appointmentSlots: '',
      appointmentSlotsText: '',
      clinicTitle: '',
      clinicObj: {},
      startTimeText: 'From',
      endTimeText: 'To',
      isLoading: false,
      showDate: false,
    };
  }

  componentDidMount() {
    this.setState({
      userObj: {},
      joinedDate: new Date(),
      chosenDate: '',
      date: new Date(1598051730000),
      attendAt: new Date(),
      leftAt: new Date(),
      setMode: '',
      mode: 'time',
      show: false,
      showStartTimePicker: false,
      showEndTimePicker: false,
      clinicFrequency: '',
      clinicFrequencyText: '',
      numberOfClinics: 0,
      appointmentSlots: '',
      appointmentSlotsText: '',
      clinicTitle: '',
      clinicObj: {},
      startTimeText: 'From',
      endTimeText: 'To',
      isLoading: false,
    });
    this.setDate = this.setDate.bind(this);
    Api.instance()
      ._user()
      .then(data => {
        this.setState({ userObj: data });
      })
      .catch(err => console.log(err));
  }

  setDate(newDate) {
    if (!newDate) {
      newDate = new Date();
    }
    this.setState({ chosenDate: newDate.toString().substr(4, 12), showDate: false });
    console.log("chosen date", this.state.chosenDate)

    console.log("this.state.chosenDate with utc", moment.utc(this.state.chosenDate))
    console.log("this.state.chosenDate", moment(this.state.chosenDate))
  }

  SelectattendAt = event => {
    let timeStamp = event;
    let attendAt = new Date(timeStamp);
    this.setState({
      attendAt,
      showStartTimePicker: false,
      startTimeText: this.getTimeFormat(attendAt),
    });
  };

  SelectleftAt = event => {
    let timeStamp = event;
    let leftAt = new Date(timeStamp);
    this.setState({
      leftAt,
      showEndTimePicker: false,
      endTimeText: this.getTimeFormat(leftAt),
    });
  };

  showTimepicker = time => {
    time === 'start'
      ? this.setState({ showStartTimePicker: true })
      : this.setState({ showEndTimePicker: true });
  };

  onValueChange(value) {
    this.setState({
      clinicFrequency: value,
    });
  }

  formatAMPM(dateToConvert) {
    let startTime =
      moment
        .utc(
          `01-01-1970 ${moment(dateToConvert).format('HH:mm:ss')}`,
          'dd-MM-YYYY HH:mm:ss',
        )
        .unix() *
      1000 -
      18000000;
    return startTime;
  }

  getTimeFormat(dateToConvert) {
    var hours = dateToConvert.getHours();
    var minutes = dateToConvert.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  handleInputChangeSlots = event => {
    if (/^\d+$/.test(event)) {
      this.setState({
        appointmentSlots: event,
      });
    }
  };

  createClinic() {
    let reg = /^\d+$/;

    let appSlot = parseInt(this.state.appointmentSlots);
    switch (appSlot) {
      case 300000:
        this.state.appointmentSlotsText = '5 Minutes';
        break;
      case 600000:
        this.state.appointmentSlotsText = '10 Minutes';
        break;

      case 900000:
        this.state.appointmentSlotsText = '15 Minutes';
        break;

      case 1200000:
        this.state.appointmentSlotsText = '20 Minutes';
        break;
      case 1800000:
        this.state.appointmentSlotsText = '30 Minutes';
        break;

      default:
        break;
    }

    let freq = parseInt(this.state.clinicFrequency);

    switch (freq) {
      case 172799000:
        this.state.clinicFrequencyText = 'Alternate Days';
        break;

      case 604799000:
        this.state.clinicFrequencyText = 'Every Week';
        break;
      case 1209599000:
        this.state.clinicFrequencyText = 'Alternate Week';
        break;

      case 86399000:
        this.state.clinicFrequencyText = 'Every Day';
        break;
      default:
        break;
    }

    var attendedAtDate = this.formatAMPM(this.state.attendAt);
    this.state.attendAt = attendedAtDate;

    var leftAtDate = this.formatAMPM(this.state.leftAt);

    this.state.leftAt = leftAtDate;
    var selectedDate = moment.utc(this.state.chosenDate);
    this.state.clinicObj.doctorId = this.state.userObj.id;
    this.state.clinicObj.joinedDate = selectedDate;
    this.state.clinicObj.attendAt = attendedAtDate;
    this.state.clinicObj.leftAt = leftAtDate;
    this.state.clinicObj.frequency = parseInt(this.state.clinicFrequency);
    this.state.clinicObj.numOfClinics = this.state.numberOfClinics;
    this.state.clinicObj.appointmentSlots = parseInt(
      this.state.appointmentSlots,
    );
    this.state.clinicObj.name = this.state.clinicTitle;
    this.state.clinicObj.frequencyText = this.state.clinicFrequencyText;
    this.state.clinicObj.appointmentSlotsText = this.state.appointmentSlotsText;


    if (this.state.chosenDate == '') {
      ViewUtils.showToast('Please select Date');
      return;
    }

    if (this.state.startTimeText == 'From') {
      ViewUtils.showToast('Please select Start Time');
      return;
    }

    if (this.state.endTimeText == 'To') {
      ViewUtils.showToast('Please select End Time');
      return;
    }

    if ((this.state.leftAt < this.state.attendAt) || (this.state.leftAt == this.state.attendAt)) {
      ViewUtils.showToast('End time must be greater than start time!');
      return;
    }

    if (this.state.numberOfClinics <= 0) {
      ViewUtils.showToast('Please Provide Number of Clinics');
      return;
    }
    if (reg.test(this.state.numberOfClinics) == false) {
      ViewUtils.showToast('Number of clinics must be integers');
      return;
    }
    // if (this.state.numberOfClinics.isInteger()) {
    //   ViewUtils.showToast('is not an integer');
    //   return;
    // }


    if (this.state.clinicTitle.trim() == '') {
      ViewUtils.showToast('Please Provide Title');
      return;
    }

    if (this.state.clinicFrequencyText == '') {
      ViewUtils.showToast('Please select Frequency');
      return;
    }

    if (this.state.appointmentSlotsText == '') {
      ViewUtils.showToast('Please select Appointment Slot');
      return;
    }

    this.setState({ isLoading: true });
    console.log("this.state.clinicObj" ,this.state.clinicObj)
    Api.instance()
      .createClinic(this.state.clinicObj)
      .then(res => {
        console.log("resres ===>" , JSON.stringify(res))
        ViewUtils.showToast('Clinic has been created successfully!');
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'MyDrawer' }],
          }),
        );
      })
      .catch(err => {
        //ViewUtils.showToast(err);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <View style={[CommonStyles.container]}>
        <ImageBackground
          style={[CommonStyles.container, CommonStyles.backgroundImage]}
          source={require('../../assets/img/bwback.png')}>
          <View style={{ flex: 2, justifyContent: 'flex-start', paddingTop: 50 }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Icon
                name="arrow-back"
                type="MaterialIcons"
                style={{ fontSize: 26, color: '#FFF', marginLeft: 10 }}
              />
            </TouchableOpacity>
            <Text style={{ paddingLeft: 18 }}>
              <Text
                style={[
                  CommonStyles.fontRegular,
                  CommonStyles.textSizeLarge,
                  CommonStyles.textColorWhite,
                ]}>{`Create Clinic\n`}</Text>
              <Text
                style={[
                  CommonStyles.fontRegular,
                  CommonStyles.textSizeAverage,
                  CommonStyles.textColorWhite,
                ]}>
                to create clinic{' '}
              </Text>
            </Text>
          </View>

          <View style={{ flex: 8 }}>
            <KeyboardAwareScrollView
              style={[
                {
                  marginTop: 33,
                  alignSelf: 'center',
                  width: '90%',
                  backgroundColor: '#fff',
                  borderRadius: 5,
                },
              ]}>


              <View>{this._renderDateAndTimeForiOS()}</View>

              <Item
                stackedLabel
                style={[CommonStyles.container, CommonStyles.itemStyle]}>
                <Label
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeAverage,
                  ]}>
                  Days/Weeks
                </Label>
                <Input
                  name="clinics"
                  value={this.state.numberOfClinics}
                  onChangeText={val => this.setState({ numberOfClinics: val })}
                  keyboardType="number-pad"
                />
              </Item>

              <Item
                stackedLabel
                style={[CommonStyles.container, CommonStyles.itemStyle]}>
                <Label
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeAverage,
                  ]}>
                  Title
                </Label>
                <Input
                  value={this.state.clinicTitle}
                  onChangeText={val => this.setState({ clinicTitle: val })}
                />
              </Item>

              <Item
                picker
                style={[
                  CommonStyles.container,
                  CommonStyles.itemStyle,
                  { paddingTop: 10 },
                ]}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name='keyboard-arrow-down' type='MaterialIcons' />}
                  style={Platform.OS === 'android' ? {width: '88%', height: 45} : {}}
                  placeholder="Choose Frequency"
                  placeholderStyle={{ color: '#bfc6ea' }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.clinicFrequency}
                  onValueChange={this.onValueChange.bind(this)}>
                  <Picker.Item
                    color="gray"
                    selected={false}
                    label="Choose Frequency"
                    value=""
                  />

                  <Picker.Item label="Alternate Day" value="172799000" />
                  <Picker.Item label="Every Week" value="604799000" />
                  <Picker.Item label="Alternate Week" value="1209599000" />
                  <Picker.Item label="Every Day" value="86399000" />
                </Picker>
              </Item>

              <Item
                picker
                style={[
                  CommonStyles.container,
                  CommonStyles.itemStyle,
                  { paddingTop: 10 },
                ]}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name='keyboard-arrow-down' type='MaterialIcons' />}
                  style={Platform.OS === 'android' ? {width: '88%', height: 45} : {}}
                  placeholder="Choose Frequency"
                  placeholderStyle={{ color: '#bfc6ea' }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.appointmentSlots}
                  onValueChange={this.handleInputChangeSlots.bind(this)}>
                  <Picker.Item
                    color="gray"
                    selected={false}
                    label="Appointment Slots"
                    value=""
                  />
                  <Picker.Item label="5 Minutes" value="300000" />
                  <Picker.Item label="10 Minutes" value="600000" />
                  <Picker.Item label="15 Minutes" value="900000" />
                  <Picker.Item label="20 Minutes" value="1200000" />
                  <Picker.Item label="30 Minutes" value="1800000" />
                </Picker>
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
              style={[
                CommonStyles.container,
                CommonStyles.centerText,
                { borderRightWidth: 0.5, borderColor: '#cfd2d6' },
              ]}
              onPress={() => {
                this.createClinic();
              }}>
              <Text
                style={[
                  CommonStyles.fontRegular,
                  CommonStyles.textSizeNormal,
                  CommonStyles.centerText,
                  CommonStyles.margin,
                  CommonStyles.padding,
                  { opacity: 0.5 },
                ]}>
                CREATE
              </Text>
            </TouchableOpacity>
          </View>
          <Loader loading={this.state.isLoading} />
          {/* <View
            style={[
              {
                position: 'absolute',
                left: 16,
                top: 40,
                justifyContent: 'center',
                alignItems: 'center',
              },
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


  _renderDateAndTimeForiOS() {
    return (
      <View>
        <Item
          style={[
            CommonStyles.container,
            CommonStyles.itemStyle,
            { paddingTop: 25 },
          ]}>

          <TouchableOpacity style={{ backgroundColor: 'transparent' }} onPress={() => this.setState({ showDate: true })} >
            <Text style={[
              CommonStyles.fontMedium,
              CommonStyles.gray,
              CommonStyles.textSizeNormal,
              , {
                marginBottom: 10
              }
            ]}>
              {this.state.chosenDate || "Select Date"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            minimumDate={new Date()}
            isVisible={this.state.showDate}
            mode="date"
            headerTextIOS="Select Date"
            onConfirm={(date) => { this.setDate(date); }}
            onCancel={() => { this.setState({ showDate: false }) }}
          />
          <Icon
            active
            name="calendar"
            style={{ marginLeft: 20, marginTop: -25 }}
          />
        </Item>
        <Item
          stackedLabel
          onPress={() => {
            this.showTimepicker('start');
          }}
          style={[CommonStyles.container, CommonStyles.itemStyle]}>
          <Text
            style={[
              CommonStyles.fontRegular,
              CommonStyles.textSizeAverage,
              {
                paddingTop: 10,
                textAlign: 'left',
                alignSelf: 'flex-start',
              },
            ]}>
            {this.state.startTimeText}
          </Text>
          <DateTimePickerModal
            isVisible={this.state.showStartTimePicker}
            mode="time"
            headerTextIOS="Start Time"
            onConfirm={(date) => { this.SelectattendAt(date) }}
            onCancel={() => { this.setState({ showStartTimePicker: false }) }}
          />
        </Item>

        <Item
          stackedLabel
          onPress={() => {
            this.showTimepicker('end');
          }}
          style={[CommonStyles.container, CommonStyles.itemStyle]}>
          <Text
            style={[
              CommonStyles.fontRegular,
              CommonStyles.textSizeAverage,
              {
                paddingTop: 10,
                textAlign: 'left',
                alignSelf: 'flex-start',
              },
            ]}>
            {this.state.endTimeText}
          </Text>
          <DateTimePickerModal
            isVisible={this.state.showEndTimePicker}
            mode="time"
            headerTextIOS="End Time"
            onConfirm={(date) => { this.SelectleftAt(date); }}
            onCancel={() => { this.setState({ showEndTimePicker: false }) }}
          />
        </Item>
      </View>
    );
  }
}