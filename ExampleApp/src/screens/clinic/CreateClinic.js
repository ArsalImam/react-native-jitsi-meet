import React, {Component} from 'react';
import {CommonActions} from '@react-navigation/native';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {DatePicker, Icon, Input, Item, Label, Picker, Text} from 'native-base';
import Api from '../../Api';
import CommonStyles from '../../CommonStyles';
import Loader from '../../components/Loader';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ViewUtils} from '../../Utils'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
export default class CreateClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userObj: {},
      joinedDate: new Date(),
      chosenDate: new Date(),
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
    };
  }

  componentDidMount() {
    this.setState({
      userObj: {},
      joinedDate: new Date(),
      chosenDate: new Date(),
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
        this.setState({userObj: data});
      })
      .catch(err => console.log(err));
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }

  SelectattendAt = event => {
    if (event.type !== 'set') {
      this.setState({
        showStartTimePicker: false,
      });
      return;
    }
    let timeStamp = event.nativeEvent.timestamp;
    let attendAt = new Date(timeStamp);
    this.setState({
      attendAt,
      showStartTimePicker: false,
      startTimeText: this.getTimeFormat(attendAt),
    });
    event.nativeEvent.timestamp = 0;
  };

  SelectleftAt = event => {
    if (event.type !== 'set') {
      this.setState({
        showEndTimePicker: false,
      });
      return;
    }
    let timeStamp = event.nativeEvent.timestamp;
    let leftAt = new Date(timeStamp);
    this.setState({
      leftAt,
      showEndTimePicker: false,
      endTimeText: this.getTimeFormat(leftAt),
    });
    event.nativeEvent.timestamp = 0;
  };

  showTimepicker = time => {
    time === 'start'
      ? this.setState({showStartTimePicker: true})
      : this.setState({showEndTimePicker: true});
  };

  onValueChange(value) {
    this.setState({
      clinicFrequency: value,
    });
  }

  formatAMPM(dateToConvert) {
    var hours = dateToConvert.getHours();
    var minutes = dateToConvert.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var formattedDate = new Date('1970-01-01' + JSON.stringify(strTime));
    return formattedDate;
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
        this.state.clinicFrequencyText = 'One Off';
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
    this.state.attendAt = attendedAtDate.getTime();
    var leftAtDate = this.formatAMPM(this.state.leftAt);

    this.state.leftAt = leftAtDate.getTime();

    var selectedDate = new Date(this.state.chosenDate);
    selectedDate.setMonth(selectedDate.getMonth());

    this.state.clinicObj.doctorId = this.state.userObj.id;
    this.state.clinicObj.joinedDate = selectedDate.toString();
    this.state.clinicObj.attendAt = attendedAtDate.getTime();
    this.state.clinicObj.leftAt = leftAtDate.getTime();
    this.state.clinicObj.frequency = parseInt(this.state.clinicFrequency);
    this.state.clinicObj.numOfClinics = this.state.numberOfClinics;
    this.state.clinicObj.appointmentSlots = parseInt(
      this.state.appointmentSlots,
    );
    this.state.clinicObj.name = this.state.clinicTitle;
    this.state.clinicObj.frequencyText = this.state.clinicFrequencyText;
    this.state.clinicObj.appointmentSlotsText = this.state.appointmentSlotsText;

    this.setState({isLoading: true});
    Api.instance()
      .createClinic(this.state.clinicObj)
      .then(res => {
          console.warn(res);
         ViewUtils.showToast('Clinic has been created successfully!');
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'MyDrawer'}],
          }),
        );
      })
      .catch(err => {
        ViewUtils.showToast(err);
      })
      .finally(() => {
        this.setState({isLoading: false});
       
        // this.props.navigation.replace('ClinicList');
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={[CommonStyles.container, CommonStyles.backgroundImage]}
          source={require('../../assets/drawable-xhdpi/bwback.png')}>
          <View style={styles.View1}>
            <Text style={{marginHorizontal: '7%', marginBottom: 15}}>
              <Text
                style={[
                  CommonStyles.DINAltBold,
                  CommonStyles.textSizeLarge,
                  {
                    color: '#FFf',
                    lineHeight: 28,
                  },
                ]}>{`Create Clinic\n`}</Text>
              <Text
                style={[
                  CommonStyles.SFProLight,
                  CommonStyles.textSizeSmall,
                  {
                    color: '#fff',
                    lineHeight: 16,
                  },
                ]}>
                to create clinic{' '}
              </Text>
            </Text>
          </View>

          <View style={styles.View2}>
            <ScrollView
              style={[
                styles.View2,
                {
                  marginTop: 33,
                  alignSelf: 'center',
                  width: '86%',
                  backgroundColor: '#fff',
                  borderRadius: 5,
                },
              ]}>
              <Item
                style={[
                  CommonStyles.container,
                  CommonStyles.itemStyle,
                  {paddingTop: 40},
                ]}>
                <DatePicker
                  defaultDate={new Date()}
                  minimumDate={new Date()}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText="Select date"
                  textStyle={[CommonStyles.fontRegular, {paddingLeft: -7}]}
                  placeHolderTextStyle={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeAverage,
                    {color: '000', marginLeft: -7, paddingBottom: 15},
                  ]}
                  onDateChange={this.setDate}
                  disabled={false}
                />
                <Icon active name="calendar" style={{marginLeft: 20}} />
              </Item>

              {/* <Item style={[styles.itemStyle, {alignSelf: 'center', width: '50%'}]}>
                               

                                <DatePicker
                                    defaultDate={new Date()}
                                    minimumDate={new Date()}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Select date"
                                    textStyle={{color: "gray"}}
                                    placeHolderTextStyle={{color: "gray"}}
                                    onDateChange={this.setDate}
                                    disabled={false}
                                />
                                <Icon active name='calendar' style={{marginLeft: 20}}/>

                            </Item> */}

              <View
                style={[
                  CommonStyles.container,
                  CommonStyles.itemStyle,
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Item
                  stackedLabel
                  onPress={() => {
                    this.showTimepicker('start');
                  }}
                  style={{width: '45%'}}>
                  {/* <Label
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeAverage,
                    ]}>
                    {this.state.startTimeText}
                  </Label> */}

                  <Text
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeAverage,
                      {
                        paddingTop: 30,
                        marginLeft: -100,
                      },
                    ]}>
                    {this.state.startTimeText}
                  </Text>
                  {this.state.showStartTimePicker && (
                    <DateTimePicker
                      testID="FromTime"
                      value={this.state.attendAt}
                      mode="time"
                      is24Hour={true}
                      display="clock"
                      onChange={this.SelectattendAt}
                    />
                  )}
                </Item>

                <Item
                  stackedLabel
                  onPress={() => {
                    this.showTimepicker('end');
                  }}
                  style={{width: '45%'}}>
                  {/* <Label
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeAverage,
                    ]}>
                    {this.state.endTimeText}
                  </Label> */}

                  <Text
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeAverage,
                      {
                        paddingTop: 30,
                        marginLeft: -100,
                      },
                    ]}>
                    {this.state.endTimeText}
                  </Text>
                  {this.state.showEndTimePicker && (
                    <DateTimePicker
                      testID="ToTime"
                      value={this.state.leftAt}
                      mode="time"
                      is24Hour={true}
                      display="clock"
                      onChange={this.SelectleftAt}
                    />
                  )}
                </Item>
              </View>

              <View
                style={[
                  CommonStyles.container,
                  CommonStyles.itemStyle,
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Item stackedLabel style={{width: '45%'}}>
                  <Label
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeAverage,
                    ]}>
                    Number of Weeks
                  </Label>
                  <Input
                    name="clinics"
                    value={this.state.numberOfClinics}
                    onChangeText={val => this.setState({numberOfClinics: val})}
                    keyboardType="number-pad"
                  />
                </Item>

                <Item stackedLabel style={{width: '45%'}}>
                  <Label
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeAverage,
                    ]}>
                    Title
                  </Label>
                  <Input
                    value={this.state.clinicTitle}
                    onChangeText={val => this.setState({clinicTitle: val})}
                  />
                </Item>
              </View>

              <Item
                picker
                style={[
                  CommonStyles.container,
                  CommonStyles.itemStyle,
                  {paddingTop: 20},
                ]}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={[CommonStyles.container, CommonStyles.itemStyle]}
                  textStyle={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeAverage,
                    {paddingLeft: -14},
                  ]}
                  placeholder="Choose Frequency"
                  placeholderStyle={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeAverage,
                    {color: '#bfc6ea', marginLeft: -14},
                  ]}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.clinicFrequency}
                  onValueChange={this.onValueChange.bind(this)}>
                  <Picker.Item
                    color="gray"
                    selected={false}
                    label="Choose Frequency"
                    value=""
                  />

                  <Picker.Item label="One Off" value="172799000" />
                  <Picker.Item label="Every Week" value="604799000" />
                  <Picker.Item label="Alternate Week" value="1209599000" />
                  <Picker.Item label="Every Day" value="86399000" />
                </Picker>
              </Item>

              <Item
                picker
                style={[
                  styles.itemStyle,
                  {alignSelf: 'center', width: '88%', marginTop: 40},
                ]}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{width: '92%'}}
                  placeholder="Choose Frequency"
                  placeholderStyle={{color: '#bfc6ea'}}
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
            </ScrollView>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.createClinic();
            }}
            style={styles.buttonStyle}>
            <Text style={[styles.textStyle, CommonStyles.DINProRegular]}>
              CREATE
            </Text>
          </TouchableOpacity>
          <Loader loading={this.state.isLoading} />
          <View
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
                style={{fontSize: 26, color: '#FFF'}}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  View1: {
    flex: 2.2,
    justifyContent: 'flex-end',
  },
  textStyle: {
    fontSize: 15,
    color: '#999999',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 8,
  },
  View2: {
    flex: 8,
  },

  buttonStyle: {
    //position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: 67,
    shadowColor: '#C3D9F0',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.9,
    shadowRadius: 1.41,
    elevation: 3,
    backgroundColor: '#F7FAFE',
    borderWidth: 4,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderColor: '#fff',
    borderBottomWidth: 0,
  },
  itemStyle: {
    marginTop: 12,
    height: 50,
    borderColor: '#707070',
    //   marginTop: 10,
  },
});
