import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import CommonStyles from '../../CommonStyles';

import moment from 'moment';
import {
  Item,
  Input,
  Container,
  Picker,
  Icon,
  Label,
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Api from '../../Api';
import { ViewUtils } from '../../Utils';
import Loader from '../../components/Loader';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      password: '',
      confirmPasword: '',
      drCode: '',
      dateOfBirth: '',
      mobile: '',
      personalDetails: {},
    };
  }

  setDate(newDate) {
    if (!newDate) {
      newDate = new Date();
    }
    this.setState({ dateOfBirth: newDate.toString().substr(4, 12), showDate: false });
  }


  _validateField() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/;
    if (this.state.firstName.trim() == '') {
      ViewUtils.showToast('First Name Field');
      return false;
    } else if (this.state.lastName.trim() == '') {
      ViewUtils.showToast('Last Name Field');
      return false;
    } else if (this.state.gender == '') {
      ViewUtils.showToast('Gender Field');
      return false;
    } else if (this.state.email.trim() == '') {
      ViewUtils.showToast('Email Field');
      return false;
    } else if (reg.test(this.state.email) === false) {
      ViewUtils.showToast('Please enter valid email.');
      return false;
    } else if (this.state.password.trim() == '') {
      ViewUtils.showToast('Password Field');
      return false;
    } else if (this.state.confirmPasword.trim() == '') {
      ViewUtils.showToast('Confirm Password Field');
      return false;
    } else if (this.state.password != this.state.confirmPasword) {
      ViewUtils.showToast('Password and Confirm Password dont match');
      return false;
    } else if (this.state.dateOfBirth == '') {
      ViewUtils.showToast('DOB cannot be empty');
      return false;
    } else if (this.state.mobile.trim() == '') {
      ViewUtils.showToast('Mobile Number cannot be empty');
      return false;
    } else if (this.state.city.trim() == '') {
      ViewUtils.showToast('City cannot be empty');
      return false;
    } else if (this.state.drCode.trim() == '') {
      ViewUtils.showToast('Doctor Code cannot be empty');
      return false;
    }
    return true;
  }

  _registerPatient = () => {
    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      confirmPasword: this.state.confirmPasword,
      username: this.state.firstName + this.state.lastName,
      personalDetails: {
        gender: this.state.gender,
        mobile: this.state.mobile,
        dateOfBirth: this.state.dateOfBirth,
        city: this.state.city,
        country: 'Pakistan',
        postalCode: '',
        address2: '',
        address1: '',
      },
      qualifications: [],
      specialities: [],
      expertise: [],
      assistants: [''],
      credit: '',
      previousEmployments: [],
      presentEmployments: [],

      role: 'ROLE_PATIENT',
    };

    if (this._validateField()) {

      this.setState({ isLoading: true })

      Api.instance()
        .getClients()
        .then(res => {
          console.log("response returned", res)

          this.setState({ isLoading: false })

          let mapEmails = res.map(x => {
            let emails = x.email
            return emails
          })
          console.log("abcabcabc", mapEmails)
          var findEmail = (mapEmails.indexOf(data.email) > -1);
          if (findEmail == true) {
            console.log("TrueTrueTrueTrueTrueTrue")
            ViewUtils.showToast("Email already exist")

          } else {
            Api.instance()
              .patientRegister(data, this.state.drCode)
              .then(response => {
                ViewUtils.showToast('Registration Successfully!');
                this.props.navigation.goBack();
              })
              .catch(err => {
                ViewUtils.showToast('Doctor Code is Invalid!');
              })
              .finally(() => {
                this.setState({ isLoading: false });
              });

          }
        })


    }
  };

  render() {
    return (
      <View style={[CommonStyles.container]}>
        <ImageBackground
          style={[CommonStyles.container, CommonStyles.backgroundImage]}
          source={require('../../assets/img/loginbg(2).png')}>
          <KeyboardAwareScrollView style={CommonStyles.container}>
            <View
              style={[
                CommonStyles.margin,
                { paddingTop: 30, paddingHorizontal: 10 },
              ]}>
              <Text
                style={[
                  CommonStyles.fontMedium,
                  {
                    fontSize: 32,
                    color: '#FFF',
                  },
                ]}>
                Registration
              </Text>
              <Text
                style={[
                  CommonStyles.textSizeNormal,
                  CommonStyles.textColorWhite,
                  { marginTop: 5 },
                ]}>
                Enter your details to register for Etibb
              </Text>

              <View style={{ marginTop: 60 }}>
                <View
                  style={[
                    CommonStyles.container,
                    CommonStyles.horizontalContainer,
                  ]}>
                  <Item
                    regular
                    style={[
                      CommonStyles.container,
                      CommonStyles.loginItemStyle,
                      { marginRight: 5 },
                    ]}>
                    <Input
                      value={this.state.firstName}
                      onChangeText={val => this.setState({ firstName: val })}
                      name="username"
                      placeholder={'First Name*'}
                      placeholderTextColor="#FFF"
                      returnKeyType="next"
                      autoCapitalize="none"
                      selectionColor="#fff"
                      autoCompleteType="email"
                      keyboardType="email-address"
                      style={[
                        CommonStyles.fontMedium,
                        CommonStyles.textColorWhite,
                        CommonStyles.textSizeNormal,
                      ]}
                    />
                  </Item>

                  <Item
                    regular
                    style={[
                      CommonStyles.container,
                      CommonStyles.loginItemStyle,
                      { marginLeft: 5 },
                    ]}>
                    <Input
                      value={this.state.lastName}
                      onChangeText={val => this.setState({ lastName: val })}
                      name="username"
                      placeholder={'Last Name*'}
                      placeholderTextColor="#FFF"
                      returnKeyType="next"
                      autoCapitalize="none"
                      selectionColor="#fff"
                      autoCompleteType="email"
                      keyboardType="email-address"
                      style={[
                        CommonStyles.fontMedium,
                        CommonStyles.textColorWhite,
                        CommonStyles.textSizeNormal,
                      ]}
                    />
                  </Item>
                </View>

                <Item regular
                  style={[
                    CommonStyles.mt10,
                    CommonStyles.container,
                    CommonStyles.fontRegular,
                    CommonStyles.fontMedium,
                    CommonStyles.loginItemStyle23,
                  ]}>
                    <TouchableOpacity style={{ backgroundColor: 'transparent' }} onPress={() => this.setState({ showDate: true })} >
                        <Text style={[
                          CommonStyles.fontMedium,
                          CommonStyles.textColorWhite,

                          CommonStyles.textSizeNormal,

                          , {
                            marginVertical: 12, marginLeft: 5
                          }
                        ]}>
                          {this.state.dateOfBirth || "Select Date"}
                        </Text>
                      </TouchableOpacity>
                      <DateTimePickerModal
                        isVisible={this.state.showDate}
                        mode="date"
                        headerTextIOS="Date of Birth"
                        onConfirm={(date) => { this.setDate(date); }}
                        onCancel={() => { this.setState({ showDate: false }) }}
                      />


                  {/* <DatePicker

                    placeholder="Date of Birth"
                    placeholderTextColor="#FFF"
                    style={[
                      CommonStyles.fontMedium,
                      CommonStyles.textColorWhite,
                      CommonStyles.textSizeNormal,
                      CommonStyles.padding13

                    ]}

                    // initialValue={this.state.startDate}
                    initialValue={this.state.dateOfBirth}
                    onChange={date => this.setState({ dateOfBirth: date })}
                  // disabled={false}
                  /> */}
                  <Icon name="calendar" style={{ color: '#fff', position: 'absolute', right: 5 }} />
                </Item>

                <Item
                  regular
                  picker
                  style={[
                    CommonStyles.mt10,
                    CommonStyles.container,
                    CommonStyles.fontRegular,
                    CommonStyles.fontMedium,
                    CommonStyles.loginItemStyle23,
                  ]}>
                  <Picker
                    textStyle={{ color: '#fff' }}
                    itemTextStyle={{ color: 'red' }}
                    style={{ color: '#fff' }}
                    itemStyle={{ backgroundColor: '#fff' }}
                    placeholder="Gender*"
                    placeholderStyle={{ color: '#FFF' }}
                    placeholderIconColor="#fff"
                    selectedValue={this.state.gender}
                    onValueChange={txt => this.setState({ gender: txt })}
                    style={[
                      CommonStyles.fontMedium,
                      CommonStyles.textColorWhite,
                      CommonStyles.textSizeNormal,
                    ]}
                  >

                    <Picker.Item
                      color="grey"
                      selected={false}
                      label="Gender"
                      value=""

                    />

                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                  </Picker>

                  <Icon
                    name="arrow-dropdown"
                    style={{ color: '#fff', position: 'absolute', right: 5 }}
                  />
                </Item>

                <Item
                  regular
                  style={[CommonStyles.loginItemStyle, CommonStyles.mt10]}>
                  <Input
                    value={this.state.email}
                    onChangeText={val => this.setState({ email: val })}
                    placeholder={'Email Address*'}
                    placeholderTextColor="#FFF"
                    returnKeyType="next"
                    autoCapitalize="none"
                    selectionColor="#fff"
                    autoCompleteType="email"
                    keyboardType="email-address"
                    style={[
                      CommonStyles.fontMedium,
                      CommonStyles.textColorWhite,
                      CommonStyles.textSizeNormal,
                    ]}
                  />
                </Item>
                <Item
                  regular
                  style={[CommonStyles.loginItemStyle, CommonStyles.mt10]}>
                  <Input
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    secureTextEntry
                    autoCapitalize="none"
                    returnKeyType="done"
                    selectionColor="#fff"
                    autoCompleteType="password"
                    textContentType="password"
                    name="password"
                    placeholder={'Password'}
                    placeholderTextColor="#FFF"
                    style={[
                      CommonStyles.fontMedium,
                      CommonStyles.textColorWhite,
                      CommonStyles.textSizeNormal,
                    ]}
                  />
                </Item>

                <Item
                  regular
                  style={[CommonStyles.loginItemStyle, CommonStyles.mt10]}>
                  <Input
                    value={this.state.confirmPasword}
                    onChangeText={val => this.setState({ confirmPasword: val })}
                    secureTextEntry
                    autoCapitalize="none"
                    returnKeyType="done"
                    selectionColor="#fff"
                    autoCompleteType="password"
                    textContentType="password"
                    name="password"
                    placeholder={'Confirm Password'}
                    placeholderTextColor="#FFF"
                    style={[
                      CommonStyles.fontMedium,
                      CommonStyles.textColorWhite,
                      CommonStyles.textSizeNormal,
                    ]}
                  />
                </Item>

                <Item
                  regular
                  style={[CommonStyles.loginItemStyle, CommonStyles.mt10]}>
                  <Input
                    autoCapitalize="none"
                    returnKeyType="done"
                    selectionColor="#fff"
                    textContentType="password"
                    name="password"
                    placeholder={'Mobile Number'}
                    placeholderTextColor="#FFF"
                    keyboardType={'number-pad'}
                    value={this.state.mobile}
                    onChangeText={val => this.setState({ mobile: val })}
                    style={[
                      CommonStyles.fontMedium,
                      CommonStyles.textColorWhite,
                      CommonStyles.textSizeNormal,
                    ]}
                  />
                </Item>

                <Item
                  regular
                  style={[CommonStyles.loginItemStyle, CommonStyles.mt10]}>
                  <Input
                    autoCapitalize="none"
                    returnKeyType="done"
                    selectionColor="#fff"
                    textContentType="city"
                    name="city"
                    placeholder={'City'}
                    placeholderTextColor="#FFF"
                    value={this.state.city}
                    onChangeText={val => this.setState({ city: val })}
                    style={[
                      CommonStyles.fontMedium,
                      CommonStyles.textColorWhite,
                      CommonStyles.textSizeNormal,
                    ]}
                  />
                </Item>

                <Item
                  regular
                  style={[CommonStyles.loginItemStyle, CommonStyles.mt10]}>
                  <Input
                    value={this.state.drCode}
                    onChangeText={drCode => this.setState({ drCode })}
                    secureTextEntry={false}
                    autoCapitalize="none"
                    returnKeyType="done"
                    selectionColor="#fff"
                    autoCompleteType="password"
                    textContentType="password"
                    name="password"
                    placeholder={'Enter Doctor Code'}
                    placeholderTextColor="#FFF"
                    style={[
                      CommonStyles.fontMedium,
                      CommonStyles.textColorWhite,
                      CommonStyles.textSizeNormal,
                    ]}
                  />
                </Item>
              </View>
            </View>
          </KeyboardAwareScrollView>

          <Loader loading={this.state.isLoading} />
        </ImageBackground>

        <View
          style={[
            CommonStyles.fitToBottom,
            CommonStyles.horizontalContainer,
            {
              backgroundColor: '#eee',
              borderTopRightRadius: 5,
              borderTopStartRadius: 5,
            },
          ]}>
          <TouchableOpacity
            style={[CommonStyles.container, CommonStyles.centerText]}
            onPress={() => {
              this._registerPatient();
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
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Create;