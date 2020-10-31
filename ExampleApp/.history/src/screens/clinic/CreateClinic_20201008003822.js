// import React, { Component } from 'react';
// import { CommonActions } from '@react-navigation/native';
// import {
//   ImageBackground,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { Icon, Input, Item, Label, Picker, Text } from 'native-base';
// import Api from '../../Api';
// import CommonStyles from '../../CommonStyles';
// import Loader from '../../components/Loader';
// import { DatePicker, TimePicker } from 'react-native-propel-kit';
// import { ViewUtils } from '../../Utils'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
// export default class CreateClinic extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     startTime:new Date(),
//     endTime:new Date(),
//     selectDate:new Date(),
//     weeks:'',
//     title:'',
//     chooseFrequency:'',
//     appointmentSlots:'',
//     };
//   }

//   render() {
//     return (
//       <View style={[CommonStyles.container]}>
//         <ImageBackground
//           style={[CommonStyles.container, CommonStyles.backgroundImage]}
//           source={require('../../assets/img/bwback.png')}>
          
//           <View style={{ flex: 2}}>
//             <Text style={{ paddingLeft: 18, marginTop: 65 }}>
//               <Text
//                 style={[
//                   CommonStyles.fontRegular,
//                   CommonStyles.textSizeLarge,
//                   CommonStyles.textColorWhite,
//                 ]}>{`Create Clinic\n`}</Text>
//               <Text
//                 style={[
//                   CommonStyles.fontRegular,
//                   CommonStyles.textSizeAverage,
//                   CommonStyles.textColorWhite
//                 ]}>
//                 to create clinic{' '}
//               </Text>
//             </Text>
//           </View>

//           <View style={{ flex: 8 }}>
//             <KeyboardAwareScrollView
//               style={[
//                 {
//                   marginTop: 33,
//                   alignSelf: 'center',
//                   width: '90%',
//                   backgroundColor: '#fff',
//                   borderRadius: 5,
//                 },
//               ]}>
//               <Item
//                 style={[
//                   CommonStyles.container,
//                   CommonStyles.itemStyle,
//                   { paddingTop: 25 },
//                 ]}>
//  <DatePicker style={{ color: 'black', marginTop: 10 }} value={this.state.selectDate} onChange={date => {
//                         this.setState({ selectDate: date })
//                       }} />
//                 <Icon active name="calendar" style={{ marginLeft: 20 }} />
//               </Item>

//               <Item
//                 stackedLabel

//                 style={[CommonStyles.container, CommonStyles.itemStyle]}
//               >
//             <TimePicker style={{paddingVertical:10,paddingHorizontal:10, color: 'grey', height: '100%', width: '100%', textAlign: 'center', alignContent: 'center' }} value={this.state.startTime} onChange={date => {
//                         this.setState({ startTime: date })
//                       }} />
//               </Item>

//               <Item
//                 stackedLabel
//                 style={[CommonStyles.container, CommonStyles.itemStyle]}
//               >
//                 <TimePicker style={{paddingVertical:10,paddingHorizontal:10, color: 'grey', height: '100%', width: '100%', textAlign: 'center', alignContent: 'center' }} value={this.state.endTime} onChange={date => {
//                         this.setState({ endTime: date })
//                       }} />

//               </Item>

//               <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle]}>
//                 <Label
//                   style={[
//                     CommonStyles.fontRegular,
//                     CommonStyles.textSizeAverage,
//                   ]}>
//                   Number of Weeks
//                   </Label>
//                 <Input
//                   name="clinics"
//                   value={this.state.numberOfClinics}
//                   onChangeText={val => this.setState({ numberOfClinics: val })}
//                   keyboardType="number-pad"
//                 />
//               </Item>

//               <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle]}>
//                 <Label
//                   style={[
//                     CommonStyles.fontRegular,
//                     CommonStyles.textSizeAverage,
//                   ]}>
//                   Title
//                   </Label>
//                 <Input
//                   value={this.state.clinicTitle}
//                   onChangeText={val => this.setState({ clinicTitle: val })}
//                 />
//               </Item>

//               <Item
//                 picker
//                 style={[
//                   CommonStyles.container,
//                   CommonStyles.itemStyle,
//                   { paddingTop: 10 },
//                 ]}>
//                 {/* <Picker
//                   mode="dropdown"
//                   iosIcon={<Icon name="arrow-down" />}
//                   style={[CommonStyles.container, CommonStyles.itemStyle]}
//                   textStyle={[
//                     CommonStyles.fontRegular,
//                     CommonStyles.textSizeAverage,
//                     {
//                       textAlign: 'left',
//                       alignSelf: 'flex-start'
//                     }
//                   ]}
//                   placeholder="Choose Frequency"
//                   placeholderStyle={[
//                     CommonStyles.fontRegular,
//                     CommonStyles.textSizeAverage,
//                     { color: '#bfc6ea', marginLeft: -14 },
//                   ]}
//                   placeholderIconColor="#007aff"
//                   selectedValue={this.state.clinicFrequency}
//                   onValueChange={this.onValueChange.bind(this)}>
//                   <Picker.Item
//                     color="gray"
//                     selected={false}
//                     label="Choose Frequency"
//                     value=""
//                   />

//                   <Picker.Item label="One Off" value="172799000" />
//                   <Picker.Item label="Every Week" value="604799000" />
//                   <Picker.Item label="Alternate Week" value="1209599000" />
//                   <Picker.Item label="Every Day" value="86399000" />
//                 </Picker> */}
//               </Item>

//               <Item
//                 picker
//                 style={[
//                   CommonStyles.container,
//                   CommonStyles.itemStyle,
//                   { paddingTop: 10 },
//                 ]}>
//                 {/* <Picker
//                   mode="dropdown"
//                   iosIcon={<Icon name="arrow-down" />}
//                   style={{ width: '92%' }}
//                   placeholder="Choose Frequency"
//                   placeholderStyle={{ color: '#bfc6ea' }}
//                   placeholderIconColor="#007aff"
//                   selectedValue={this.state.appointmentSlots}
//                   onValueChange={this.handleInputChangeSlots.bind(this)}>
//                   <Picker.Item
//                     color="gray"
//                     selected={false}
//                     label="Appointment Slots"
//                     value=""
//                   />
//                   <Picker.Item label="5 Minutes" value="300000" />
//                   <Picker.Item label="10 Minutes" value="600000" />
//                   <Picker.Item label="15 Minutes" value="900000" />
//                   <Picker.Item label="20 Minutes" value="1200000" />
//                   <Picker.Item label="30 Minutes" value="1800000" />
//                 </Picker> */}
//               </Item>
//             </KeyboardAwareScrollView>
//           </View>

//           <View
//             style={[
//               CommonStyles.fitToBottom,
//               CommonStyles.horizontalContainer,
//               {
//                 backgroundColor: '#F7FAFE',
//                 borderTopRightRadius: 5,
//                 borderTopStartRadius: 5,
//                 borderTopWidth: 3,
//                 borderColor: '#FFF'
//               },
//             ]}>
//             <TouchableOpacity
//               style={[
//                 CommonStyles.container,
//                 CommonStyles.centerText,
//                 { borderRightWidth: 0.5, borderColor: '#cfd2d6' },
//               ]}
//               onPress={() => {
//                 this.createClinic();
//               }}>
//               <Text

//                 style={[
//                   CommonStyles.fontRegular,
//                   CommonStyles.textSizeNormal,
//                   CommonStyles.centerText,
//                   CommonStyles.margin,
//                   CommonStyles.padding,
//                   { opacity: 0.5 },
//                 ]}>
//                 CREATE
//             </Text>
//             </TouchableOpacity>
//           </View>
//           {/* <Loader loading={this.state.isLoading} /> */}
//           <View
//             style={[
//               {
//                 position: 'absolute',
//                 left: 16,
//                 top: 40,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               },
//             ]}>
//             <TouchableOpacity
//               onPress={() => {
//                 this.props.navigation.goBack();
//               }}>
//               <Icon
//                 name="arrow-back"
//                 type="MaterialIcons"
//                 style={{ fontSize: 26, color: '#FFF' }}
//               />
//             </TouchableOpacity>
//           </View>
//         </ImageBackground>
//       </View>
//     );
//   }
// }













////old/////
import React, { Component } from 'react';
import { CommonActions } from '@react-navigation/native';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {  Icon, Input, Item, Label, Picker, Text } from 'native-base';
import {DatePicker, TimePicker} from 'react-native-propel-kit';
import Api from '../../Api';
import CommonStyles from '../../CommonStyles';
import Loader from '../../components/Loader';
import moment from 'moment';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { ViewUtils } from '../../Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
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
        this.setState({ userObj: data });
      })
      .catch(err => console.log(err));
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
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
      ? this.setState({ showStartTimePicker: true })
      : this.setState({ showEndTimePicker: true });
  };

  onValueChange(value) {
    this.setState({
      clinicFrequency: value,
    });
  }

  formatAMPM(dateToConvert) {

    let startTime = moment.utc(`01-01-1970 ${moment(dateToConvert).format('HH:mm:ss')}`, "dd-MM-YYYY HH:mm:ss").unix() * 1000 - 18000000
   // let endTime = moment.utc(`01-01-1970 ${moment(this.state.endTime).format('HH:mm:ss')}`, "dd-MM-YYYY HH:mm:ss").unix();
  //   console.warn('adas', startTime)
  //   var hours = dateToConvert.getHours();
  //   var minutes = dateToConvert.getMinutes();
  //   var ampm = hours >= 12 ? 'PM' : 'AM';
  //   hours = hours % 12;
  //   hours = hours ? hours : 12; // the hour '0' should be '12'
  //   minutes = minutes < 10 ? '0' + minutes : minutes;
  //   var strTime = hours + ':' + minutes + ' ' + ampm;
  //   console.warn("strTime", strTime)

  // var formattedDate = new Date("1970-01-01T05:00:00")

    //console.warn('dateobj', formattedDate.getTime())
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



    console.warn('attendedAtDate', attendedAtDate)
    this.state.attendAt = attendedAtDate


    var leftAtDate = this.formatAMPM(this.state.leftAt);

    this.state.leftAt = leftAtDate

    console.warn('left6Date', leftAtDate)

    var selectedDate = moment.utc(this.state.chosenDate)
   // selectedDate.setMonth(selectedDate.getMonth());

   
   //console.warn('asdasdf',selectedDate)

    this.state.clinicObj.doctorId = this.state.userObj.id;
    this.state.clinicObj.joinedDate = selectedDate;
    this.state.clinicObj.attendAt = attendedAtDate
    this.state.clinicObj.leftAt = leftAtDate
    this.state.clinicObj.frequency = parseInt(this.state.clinicFrequency);
    this.state.clinicObj.numOfClinics = this.state.numberOfClinics;
    this.state.clinicObj.appointmentSlots = parseInt(
      this.state.appointmentSlots,
    );
    this.state.clinicObj.name = this.state.clinicTitle;
    this.state.clinicObj.frequencyText = this.state.clinicFrequencyText;
    this.state.clinicObj.appointmentSlotsText = this.state.appointmentSlotsText;
  

    if(this.state.startTimeText == "From"){
      ViewUtils.showToast(
        'Please select Start Time',       
    );
    return;
    }
    
    if(this.state.endTimeText == "To"){
          ViewUtils.showToast(
        'Please select End Time',       
    );
    return;
    }

    if(this.state.numberOfClinics == 0){
          ViewUtils.showToast(
        'Please Provide Number of Clinics',       
    );
    return;
    }

    if(this.state.clinicTitle == ""){
          ViewUtils.showToast(
        'Please Provide Title',       
    );
    return;
    }

    if(this.state.clinicFrequencyText == ""){
          ViewUtils.showToast(
        'Please select Frequency',       
    );
    return;
    }

    if(this.state.appointmentSlotsText == ""){
      ViewUtils.showToast(
        'Please select Appointment Slot',       
      );
    return;
      }



   this.setState({ isLoading: true });
    Api.instance()
      .createClinic(this.state.clinicObj) 
      .then(res => {
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

       //  this.props.navigation.replace('ClinicList');
      });
  }

  render() {
    return (
      <View style={[CommonStyles.container]}>
        <ImageBackground
          style={[CommonStyles.container, CommonStyles.backgroundImage]}
          source={require('../../assets/img/bwback.png')}>

          <View style={{ flex: 2  ,justifyContent:'flex-start' ,paddingTop:50}}>
            
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Icon
                name="arrow-back"
                type="MaterialIcons"
                style={{ fontSize: 26, color: '#FFF' ,marginLeft:10 }}
              />
            </TouchableOpacity>
            <Text style={{ paddingLeft: 18}}>
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
                  CommonStyles.textColorWhite
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
              <Item
                style={[
                  CommonStyles.container,
                  CommonStyles.itemStyle,
                  { paddingTop: 25 },
                ]}>
                <DatePicker
                  defaultDate={new Date()}
                  minimumDate={new Date()}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeholder="Select Date"
                  placeholderTextColor="black"
                  textStyle={[CommonStyles.fontRegular, { paddingLeft: -7, color: '#000'}]}
                  placeHolderTextStyle={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeAverage,
                    {
                      marginLeft: -7,
                    },
                  ]}
                  onChange={this.setDate}
                 // disabled={false}
                />
                <Icon active name="calendar" style={{ marginLeft: 20, marginTop: -25, }} />
              </Item>

              <Item
                stackedLabel
                onPress={() => { this.showTimepicker('start'); }}
                style={[CommonStyles.container, CommonStyles.itemStyle]}
              >
                <Text
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeAverage,
                    {
                      paddingTop: 20,
                      textAlign: 'left',
                      alignSelf: 'flex-start'
                    },
                  ]}>
                  {this.state.startTimeText}
                </Text>
                {this.state.showStartTimePicker && (
                  <TimePicker
                    testID="FromTime"
                    placeholder="00:00"
                    initialValue={this.state.attendAt}
                    // mode="time"
                    // is24Hour={true}
                    // display="clock"

                    onChange={date => {
                      this.setState({attendAt: date});
                    }}
                    //  onChange={this.SelectattendAt}
                  />
                )}
              </Item>

              <Item
                stackedLabel
                onPress={() => { this.showTimepicker('end'); }}
                style={[CommonStyles.container, CommonStyles.itemStyle]}
              >
                <Text
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeAverage,
                    {
                      paddingTop: 20,
                      textAlign: 'left',
                      alignSelf: 'flex-start',
                    },
                  ]}>
                  {this.state.endTimeText}
                </Text>
                {this.state.showEndTimePicker && (
                  <TimePicker
                    testID="ToTime"
                    initialValue={this.state.leftAt}
                    // mode="time"
                    // is24Hour={true}
                    // display="clock"

                    onChange={date => {
                      this.setState({leftAt: date});
                    }}
                    // onChange={this.SelectleftAt}
                  />
                )}
              </Item>

              <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle]}>
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

              <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle]}>
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
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: '92%' }}
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

                  <Picker.Item label="One Off" value="172799000" />
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
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: '92%' }}
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
                borderColor: '#FFF'
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
}