import React, {Component} from 'react';
import {CommonActions} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import CommonStyles from '../../CommonStyles';
import {CheckBox, Item, Input, Label, Icon} from 'native-base';
import {ViewUtils} from '../../Utils';
import Api from '../../Api';
import {Configs, Roles} from '../../Configs';
import ImagePicker from 'react-native-image-picker';
import Loader from '../../components/Loader';

class PaymentAlert extends Component {
  _appointmentId = '';
  _patientId = '';
  _clinicId = '';
  _amount = '';
  state = {
    patients: [],
    generatedCode: Math.floor(100000 + Math.random() * 900000),
    isLoading: false,
    amount: '',
    slots: 1,
    image: null,
    imageUrl: '',
    check: false,
    role: '',
    userParams: this.props.route.params.user,
    appointmentId: this.props.route.params.appointmentId,
    appointmentFees: this.props.route.params.appointmentFees,
    user: {
      personalDetails: {},
    },
  };
  constructor(props) {
    super(props);
    // this.state={
    //   role:""
    // }
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

  getUserRole() {
    Api.instance()
      .getUserRole()
      .then(role => {
        console.warn('Roleee', role);
        this.setState({role});
        console.warn('Roleee2', this.state.role);
      });
  }
  componentDidMount() {
    this.getUserRole();
    this._patientId = this.props.route.params.patientId;
    this._appointmentId = this.props.route.params.appointmentId;
    this._clinicId = this.props.route.params.clinicId;
    console.warn('userParams', this.state.userParams);
    // this.user = this.props.route.params.user,

    // this.appointmentFees= this.props.route.params.appointmentFees
  }

  addCredit(patientId) {
    let that = this;
    var data = {};
    data = {
      amount: this.state.amount,
      userId: patientId,
      clinicId: this._clinicId,
      type: 'patient',
      receipt: this.state.imageUrl,
      slots: this.state.slots,
      transactionCode: this.state.generatedCode,
      isVerified: this.state.check,
      PaymentVerifiedCheck: this.state.check,
    };
    if (this.state.check) {
      Api.instance()
        .createPayments(data)
        .then(res => {
          console.warn('create payment res', res.result.transaction.id);

          Api.instance()
            .postPatientUtilizedSlots(res.result.transaction.id)
            .then(res => {
              console.warn('postPatientUtilizedSlots', res);
              ViewUtils.showToast('Successfully Added');
              that.props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'MyDrawer'}],
                }),
              );
            });
        });
    } else {
      Api.instance()
        .createPayments(data)
        .then(res => {
          console.warn('create payment res', res.result.transaction.id);
          ViewUtils.showToast('Successfully Added');
          that.props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'MyDrawer'}],
            }),
          );
        });
    }
  }

  patientCreateBtn() {
    let that = this;
    if (this.state.imageUrl == '') {
      ViewUtils.showToast('Please attach receipt');
    } else {
      // var data = {};
      let data = {
        PaymentVerifiedCheck: false,
        amount: this.state.appointmentFees,
        receipt: this.state.imageUrl,
        createdBy: this.state.userParams,
        isVerified: false,
        slots: this.state.slots,
        transactionCode: this.state.generatedCode,
        type: 'patient',
        userId: this.state.userParams,
      };
      console.warn('bisma', data);
      // if (this.state.check) {
      Api.instance()
        .createPayments(data)
        .then(res => {
          console.warn('create payment res', res.result.transaction.id);
          Api.instance()
            .postPatientUtilizedSlots(res.result.transaction.id)
            .then(res => {
              console.warn('postPatientUtilizedSlots', res);
              ViewUtils.showToast('Successfully Added');
              that.props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'MyDrawer'}],
                }),
              );
            });
        });
    }
  }

  _createAppointment(patientId) {
    let that = this;
    this.setState({isLoading: true});

    Api.instance()
      .updateAppointment(this._appointmentId, patientId)
      .then(() => {
        console.warn('appointment Id', 'patient', patientId);
        ViewUtils.showToast('Appointment has been booked successfully');
        // ViewUtils.showToast('Appointment' ,this._appointmentId ,'fkahfhd',this.patientId);
        that.props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'MyDrawer'}],
          }),
        );
      })
      .catch(err => {
        //ViewUtils.showToast(err);
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  }
  handleChoosePhoto = () => {
    if (this.state.imageUrl != '') {
      var options = {
        title: '',
        //   customButtons: [{name: 'remove', title: 'Remove Profile Image'}],
        noData: true,
        storageOption: {
          skipBackup: true,
          path: 'images',
        },
      };
    } else {
      var options = {
        title: '',
        noData: true,
        storageOption: {
          skipBackup: true,
          path: 'images',
          waitUntilSaved: true,
          cameraRoll: true,
        },
      };
    }

    ImagePicker.showImagePicker(options, response => {
      console.warn('Response = ', response);

      if (response.didCancel) {
        console.warn('User Tapped cancel');
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        this.setState({imageUrl: ''});
      } else if (response.err) {
        console.warn('Image Picker Error ', err);
      } else {
        const fileData = new FormData();
        fileData.append('uploadFile', {
          name: response.fileName,
          type: response.type,
          uri:
            Platform.OS === 'android'
              ? response.uri
              : response.uri.replace('file://', ''),
        }),
          Api.instance()
            .uploadImage(fileData)
            .then(response => {
              console.warn('reponse ==>', JSON.stringify(response));
              this.setState({
                imageUrl: Api.instance().getMediaUrl(
                  Configs.containers.images,
                  response.result.files.uploadFile[0].name,
                ),
              });
            })
            .catch(err => {
              console.warn('Error', err);
            });
      }
    });
  };

  checked() {
    this.setState({check: !this.state.check});
  }
  render() {
    return (
      <View style={[CommonStyles.modalBackground]}>
        <View style={[CommonStyles.activityIndicatorWrapper]}>
          <View
            style={{
              width: '100%',

              backgroundColor: '#fff',
              justifyContent: 'flex-end',
              alignSelf: 'flex-start',
              borderBottomWidth: 1,
            }}>
            {this.state.role == Roles.doctor ? (
              <Text
                style={[
                  CommonStyles.fontMedium,
                  CommonStyles.textSizeNormal,
                  {marginVertical: 10},
                ]}>
                Add Slots To Patient
              </Text>
            ) : (
              <Text
                style={[
                  CommonStyles.fontBold,
                  CommonStyles.textSizeNormal,
                  {marginBottom: 20},
                ]}>
                Manual Payment to A/C: 10028436
              </Text>
            )}
          </View>
          {this.state.role == Roles.doctor && (
            <View
              style={{
                marginVertical: 20,
                flexDirection: 'row',
                backgroundColor: '#fff',
                alignSelf: 'flex-start',
              }}>
              <Text style={[CommonStyles.fontMedium, {fontSize: 14}]}>
                Payment Sent
              </Text>
              <CheckBox
                style={{marginRight: 12}}
                onPress={() => this.checked()}
                checked={this.state.check}
              />
            </View>
          )}
          <View
            style={{
              marginTop: this.state.role == Roles.patient ? 20 : 0,
              flexDirection: 'row',
              backgroundColor: '#fff',
              alignSelf: 'flex-start',
            }}
          />
          <View
            style={[
              CommonStyles.container,
              CommonStyles.horizontalContainer,
              {marginVertical: 40},
            ]}>
            <Item
              stackedLabel
              style={[
                CommonStyles.container,
                CommonStyles.loginItemStyle,
                {marginRight: 5},
              ]}>
              <Label
                style={[CommonStyles.textSizeSmall, CommonStyles.fontRegular]}>
                Amount*
              </Label>
              <Label
                style={[
                  CommonStyles.textSizeNormal,
                  CommonStyles.fontBold,
                  {marginTop: 8, color: 'gray'},
                ]}>
                {this.props.route.params.amount || this.state.appointmentFees}
              </Label>
            </Item>

            <Item
              stackedLabel
              style={[
                CommonStyles.container,
                CommonStyles.loginItemStyle,
                {marginLeft: 5},
              ]}>
              <Label
                style={[CommonStyles.textSizeSmall, CommonStyles.fontRegular]}>
                Slots*
              </Label>
              <Input
                disabled={true}
                value={this.state.slots}
                onChangeText={val => this.setState({slots: val})}
                name="slots"
                placeholder={'1'}
                placeholderTextColor="gray"
                returnKeyType="next"
                autoCapitalize="none"
                selectionColor="#fff"
                autoCompleteType="email"
                keyboardType="email-address"
                style={[
                  CommonStyles.fontBold,
                  CommonStyles.textColorWhite,
                  CommonStyles.textSizeNormal,
                ]}
              />
            </Item>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.handleChoosePhoto();
            }}
            style={{marginTop: 80, marginBottom: 30, alignSelf: 'center'}}>
            {this.state.imageUrl == '' ? (
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="attachment"
                  type="Entypo"
                  style={{fontSize: 26, transform: [{rotate: '-45deg'}]}}
                />
                <Text style={{marginHorizontal: 14, paddingVertical: 5}}>
                  {' '}
                  Attach Receipt
                </Text>
              </View>
            ) : (
              <View
                style={{
                  width: 120,
                  height: 120,
                  //backgroundColor: '#E3E3E3',
                  borderRadius: 60,
                }}>
                <Image
                  source={{
                    uri: this.state.imageUrl,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                  }}
                />
              </View>
            )}
          </TouchableOpacity>
          <View
            style={[
              CommonStyles.fitToBottom,
              CommonStyles.horizontalContainer,
              {
                // backgroundColor: '#eee',
                borderTopRightRadius: 5,
                borderTopStartRadius: 5,
              },
            ]}>
            {this.state.role == Roles.doctor ? (
              <TouchableOpacity
                style={[
                  CommonStyles.container,
                  CommonStyles.centerText,
                  {backgroundColor: '#00bcd0', marginRight: 3, borderRadius: 3},
                ]}
                onPress={() => {
                  this.addCredit(this._patientId);
                }}>
                <Text
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textColorWhite,
                    CommonStyles.textSizeNormal,
                    CommonStyles.centerText,
                    //CommonStyles.margin,
                    CommonStyles.padding,

                    {margin: 3},
                  ]}>
                  Create
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  CommonStyles.container,
                  CommonStyles.centerText,
                  {backgroundColor: '#00bcd0', marginRight: 3, borderRadius: 3},
                ]}
                onPress={() => {
                  this.patientCreateBtn();
                }}>
                <Text
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textColorWhite,
                    CommonStyles.textSizeNormal,
                    CommonStyles.centerText,
                    //CommonStyles.margin,
                    CommonStyles.padding,

                    {margin: 3},
                  ]}>
                  Create
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                CommonStyles.container,
                CommonStyles.centerText,
                {backgroundColor: '#1565a0', marginLeft: 3, borderRadius: 3},
              ]}
              onPress={() => this.handleBackButton()}>
              <Text
                style={[
                  CommonStyles.fontRegular,
                  CommonStyles.textSizeNormal,
                  CommonStyles.textColorWhite,
                  CommonStyles.centerText,
                  // CommonStyles.margin,
                  CommonStyles.padding,
                  {margin: 3},
                ]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.role == 'ROLE_PATIENT' && (
            <View style={{marginVertical: 10, alignItems: 'center'}}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    backgroundColor: '#818078',
                    height: 1,
                    width: '40%',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}
                />
                <View
                  style={{
                    height: 10,
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeNormal,
                      CommonStyles.centerText,
                      //CommonStyles.margin,
                      CommonStyles.padding,

                      {margin: 3, color: '#818078'},
                    ]}>
                    OR
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#818078',
                    height: 1,
                    width: '40%',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}
                />
              </View>
              {/* 
              <TouchableOpacity
                onPress={() => {
                  console.warn("this.state.user", this.state.appointmentId)
                  this.props.navigation.navigate("Foree", {
                    user: this.state.userParams,
                    appointmentFees: this.state.appointmentFees,
                    appointmentId: this.state.appointmentId
                  })
                }}
                style={[
                  CommonStyles.centerText,
                  { marginVertical: 10, backgroundColor: '#1565a0', marginLeft: 3, borderRadius: 3, paddingHorizontal: 30 },
                ]}>
                <Text
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeNormal,
                    CommonStyles.textColorWhite,
                    CommonStyles.centerText,
                    // CommonStyles.margin,
                    CommonStyles.padding,
                    { margin: 3 },
                  ]}>Proceed with Foree</Text>
              </TouchableOpacity> */}

              <TouchableOpacity
                onPress={() => {
                  console.warn('this.state.user', this.state.appointmentId);
                  this.props.navigation.navigate('Foree', {
                    user: this.state.userParams,
                    appointmentFees: this.state.appointmentFees,
                    appointmentId: this.state.appointmentId,
                  });
                }}
                style={[
                  // CommonStyles.container,

                  CommonStyles.centerText,
                  
                  {
                    backgroundColor: 'rgb(34, 138, 127)',
                    marginTop: 10,
                    borderColor: 'rgb(94, 165, 63)',
                    borderWidth: 0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    borderRadius: 3,
                   
                  },
                ]}>
                {/* <View>
                  <Icon
                    name="location-arrow"
                    type="FontAwesome5"
                    style={{
                      fontSize: 20,
                      color: 'white',
                      transform: [{ rotate: '45deg' }],
                    }}
                  />
                </View> */}
                <Text
                  style={[
                    CommonStyles.fontMedium,
                    
                    CommonStyles.centerText,
                    CommonStyles.textColorWhite,
                    {paddingVertical: 10, paddingHorizontal: 5, margin: 3}
                  ]}>
                  Online Payment by Credit/Debit Card
                </Text>
                <View>
                  <Icon
                    name="location-arrow"
                    type="FontAwesome5"
                    style={{
                      fontSize: 20,
                      color: 'white',
                      transform: [{rotate: '45deg'}],
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Loader loading={this.state.isLoading} />
      </View>
    );
  }
}

export default PaymentAlert;

// import React, { Component } from 'react';
// import { CommonActions } from '@react-navigation/native';
// import {
//   StyleSheet,
//   View,
//   Text,
//   Modal,
//   ActivityIndicator,
//   StatusBar,
//   TouchableOpacity,
//   Image,
//   Alert,
// } from 'react-native';
// import CommonStyles from '../../CommonStyles';
// import { CheckBox, Item, Input, Label, Icon } from 'native-base';
// import { ViewUtils } from '../../Utils';
// import Api from '../../Api';
// import { Configs } from '../../Configs';
// import ImagePicker from 'react-native-image-picker';
// import Loader from '../../components/Loader';

// class PaymentAlert extends Component {
//   _appointmentId = '';
//   _patientId = '';
//   _clinicId = '';
//   _amount = '';
//   state = {
//     patients: [],
//     generatedCode: Math.floor(100000 + Math.random() * 900000),
//     isLoading: false,
//     amount: '',
//     slots: 1,
//     image: null,
//     imageUrl: '',
//     check: false,
//     user: {
//       personalDetails: {},
//     },
//   };
//   constructor(props) {
//     super(props);
//     this.state = {
//       role: ''
//     }
//   }

//   handleBackButton = () => {
//     Alert.alert(
//       'E-tibb',
//       'Are you sure, You want to cancel the payment process?',
//       [
//         {
//           text: 'Cancel',
//           onPress: () => console.log('Cancel Pressed'),
//           style: 'cancel',
//         },
//         {
//           text: 'OK',
//           onPress: () => this.props.navigation.goBack(),
//         },
//       ],
//       {
//         cancelable: false,
//       },
//     );
//     return true;
//   };

//   componentDidMount() {
//     this.getUserRole()
//     this._patientId = this.props.route.params.patientId;
//     this._appointmentId = this.props.route.params.appointmentId;
//     this._clinicId = this.props.route.params.clinicId;

//   }

//   getUserRole() {
//     Api.instance()
//       .getUserRole()
//       .then(role => {
//         this.setState({ role })
//         console.warn("Roleee", this.state.role)

//       })
//   }

//   addCredit(patientId) {
//     let that = this;
//     var data = {};
//     data = {
//       amount: this.state.amount,
//       userId: patientId,
//       clinicId: this._clinicId,
//       type: 'patient',
//       receipt: this.state.imageUrl,
//       slots: this.state.slots,
//       transactionCode: this.state.generatedCode,
//       isVerified: this.state.check,
//       PaymentVerifiedCheck: this.state.check,
//     };
//     if (this.state.check) {
//       Api.instance()
//         .createPayments(data)
//         .then(res => {
//           console.warn('create payment res', res.result.transaction.id);

//           Api.instance()
//             .postPatientUtilizedSlots(res.result.transaction.id)
//             .then(res => {
//               console.warn('postPatientUtilizedSlots', res);
//               ViewUtils.showToast('Successfully Added');
//               that.props.navigation.dispatch(
//                 CommonActions.reset({
//                   index: 1,
//                   routes: [{ name: 'MyDrawer' }],
//                 }),
//               );
//             });
//         });
//     } else {
//       Api.instance()
//         .createPayments(data)
//         .then(res => {
//           console.warn('create payment res', res.result.transaction.id);
//           ViewUtils.showToast('Successfully Added');
//           that.props.navigation.dispatch(
//             CommonActions.reset({
//               index: 1,
//               routes: [{ name: 'MyDrawer' }],
//             }),
//           );
//         });

//     }
//   }

//   _createAppointment(patientId) {
//     let that = this;
//     this.setState({ isLoading: true });

//     Api.instance()
//       .updateAppointment(this._appointmentId, patientId)
//       .then(() => {
//         console.warn('appointment Id', 'patient', patientId);
//         ViewUtils.showToast('Appointment has been booked successfully');
//         // ViewUtils.showToast('Appointment' ,this._appointmentId ,'fkahfhd',this.patientId);
//         that.props.navigation.dispatch(
//           CommonActions.reset({
//             index: 1,
//             routes: [{ name: 'MyDrawer' }],
//           }),
//         );
//       })
//       .catch(err => {
//         //ViewUtils.showToast(err);
//       })
//       .finally(() => {
//         this.setState({ isLoading: false });
//       });
//   }
//   handleChoosePhoto = () => {
//     if (this.state.imageUrl != '') {
//       var options = {
//         title: '',
//         //   customButtons: [{name: 'remove', title: 'Remove Profile Image'}],
//         noData: true,
//         storageOption: {
//           skipBackup: true,
//           path: 'images',
//         },
//       };
//     } else {
//       var options = {
//         title: '',
//         noData: true,
//         storageOption: {
//           skipBackup: true,
//           path: 'images',
//           waitUntilSaved: true,
//           cameraRoll: true,
//         },
//       };
//     }

//     ImagePicker.showImagePicker(options, response => {
//       console.warn('Response = ', response);

//       if (response.didCancel) {
//         console.warn('User Tapped cancel');
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//         this.setState({ imageUrl: '' });
//       } else if (response.err) {
//         console.warn('Image Picker Error ', err);
//       } else {
//         const fileData = new FormData();
//         fileData.append('uploadFile', {
//           name: response.fileName,
//           type: response.type,
//           uri:
//             Platform.OS === 'android'
//               ? response.uri
//               : response.uri.replace('file://', ''),
//         }),
//           Api.instance()
//             .uploadImage(fileData)
//             .then(response => {
//               console.warn('reponse ==>', JSON.stringify(response));
//               this.setState({
//                 imageUrl: Api.instance().getMediaUrl(
//                   Configs.containers.images,
//                   response.result.files.uploadFile[0].name,
//                 ),
//               });
//             })
//             .catch(err => {
//               console.warn('Error', err);
//             });
//       }
//     });
//   };

//   checked() {
//     this.setState({ check: !this.state.check });
//   }
//   render() {

//     return (
//       <View style={[CommonStyles.modalBackground]}>
//         <View style={[CommonStyles.activityIndicatorWrapper]}>
//           <View
//             style={{
//               width: '100%',

//               backgroundColor: '#fff',
//               justifyContent: 'flex-end',
//               alignSelf: 'flex-start',
//               borderBottomWidth: 1,
//             }}>
//             <Text
//               style={[
//                 CommonStyles.fontMedium,
//                 CommonStyles.textSizeNormal,
//                 { marginVertical: 10 },
//               ]}>
//               Add Slots To Patient
//             </Text>
//           </View>
//           <View
//             style={{
//               marginVertical: 30,
//               flexDirection: 'row',
//               backgroundColor: '#fff',
//               alignSelf: 'flex-start',
//             }}>
//             <Text style={[CommonStyles.fontMedium, { fontSize: 14 }]}>
//               Payment Sent
//             </Text>
//             <CheckBox
//               style={{ marginRight: 12 }}
//               onPress={() => this.checked()}
//               checked={this.state.check}
//             />
//           </View>
//           <View
//             style={[
//               CommonStyles.container,
//               CommonStyles.horizontalContainer,
//               { marginVertical: 30 },
//             ]}>
//             <Item
//               stackedLabel
//               style={[
//                 CommonStyles.container,
//                 CommonStyles.loginItemStyle,
//                 { marginRight: 5 },
//               ]}>
//               <Label
//                 style={[CommonStyles.textSizeSmall, CommonStyles.fontRegular]}>
//                 Amount*
//               </Label>
//               <Label
//                 style={[CommonStyles.textSizeNormal, CommonStyles.fontBold, { marginTop: 8, color: 'gray' }]}>
//                 {this.props.route.params.amount}
//               </Label>
//             </Item>

//             <Item
//               stackedLabel
//               style={[
//                 CommonStyles.container,
//                 CommonStyles.loginItemStyle,
//                 { marginLeft: 5 },
//               ]}>
//               <Label
//                 style={[CommonStyles.textSizeSmall, CommonStyles.fontRegular]}>
//                 Slots*
//               </Label>
//               <Input
//                 disabled={true}
//                 value={this.state.slots}
//                 onChangeText={val => this.setState({ slots: val })}
//                 name="slots"
//                 placeholder={'1'}
//                 placeholderTextColor="gray"
//                 returnKeyType="next"
//                 autoCapitalize="none"
//                 selectionColor="#fff"
//                 autoCompleteType="email"
//                 keyboardType="email-address"
//                 style={[
//                   CommonStyles.fontBold,
//                   CommonStyles.textColorWhite,
//                   CommonStyles.textSizeNormal,
//                 ]}
//               />
//             </Item>
//           </View>
//           <TouchableOpacity
//             onPress={() => {
//               this.handleChoosePhoto();
//             }}
//             style={{ marginTop: 80, marginBottom: 30, alignSelf: 'center' }}>
//             {this.state.imageUrl == '' ? (
//               <View style={{ flexDirection: 'row' }}>
//                 <Icon
//                   name="attachment"
//                   type="Entypo"
//                   style={{ fontSize: 26, transform: [{ rotate: '-45deg' }] }}
//                 />
//                 <Text style={{ marginHorizontal: 14, paddingVertical: 5 }}>
//                   {' '}
//                   Attach Receipt
//                 </Text>
//               </View>
//             ) : (
//                 <View
//                   style={{
//                     width: 120,
//                     height: 120,
//                     //backgroundColor: '#E3E3E3',
//                     borderRadius: 60,
//                   }}>
//                   <Image
//                     source={{
//                       uri: this.state.imageUrl,
//                     }}
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       resizeMode: 'cover',
//                     }}
//                   />
//                 </View>
//               )}
//           </TouchableOpacity>
//           <View
//             style={[
//               CommonStyles.fitToBottom,
//               CommonStyles.horizontalContainer,
//               {
//                 // backgroundColor: '#eee',
//                 borderTopRightRadius: 5,
//                 borderTopStartRadius: 5,
//               },
//             ]}>
//             <TouchableOpacity
//               style={[
//                 CommonStyles.container,
//                 CommonStyles.centerText,
//                 { backgroundColor: '#00bcd0', marginRight: 3, borderRadius: 3 },
//               ]}
//               onPress={() => {
//                 this.addCredit(this._patientId);
//               }}>
//               <Text
//                 style={[
//                   CommonStyles.fontRegular,
//                   CommonStyles.textColorWhite,
//                   CommonStyles.textSizeNormal,
//                   CommonStyles.centerText,
//                   //CommonStyles.margin,
//                   CommonStyles.padding,

//                   { margin: 3 },
//                 ]}>
//                 Create
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 CommonStyles.container,
//                 CommonStyles.centerText,
//                 { backgroundColor: '#1565a0', marginLeft: 3, borderRadius: 3 },
//               ]}
//               onPress={() => this.handleBackButton()}>
//               <Text
//                 style={[
//                   CommonStyles.fontRegular,
//                   CommonStyles.textSizeNormal,
//                   CommonStyles.textColorWhite,
//                   CommonStyles.centerText,
//                   // CommonStyles.margin,
//                   CommonStyles.padding,
//                   { margin: 3 },
//                 ]}>
//                 Cancel
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {this.state.role == "ROLE_PATIENT" &&
//             <View style={{ marginVertical: 10,alignItems:"center" }}>
//               <Text>
//                 OR
//             </Text>
//               <TouchableOpacity
//                style={[
//                 CommonStyles.centerText,
//                 {marginVertical:10, backgroundColor: '#1565a0', marginLeft: 3, borderRadius: 3 , paddingHorizontal:30},
//               ]}>
//                  <Text
//                 style={[
//                   CommonStyles.fontRegular,
//                   CommonStyles.textSizeNormal,
//                   CommonStyles.textColorWhite,
//                   CommonStyles.centerText,
//                   // CommonStyles.margin,
//                   CommonStyles.padding,
//                   { margin: 3 },
//                 ]}>Proceed with Foree</Text>
//               </TouchableOpacity>

//             </View>
//           }
//         </View>
//         <Loader loading={this.state.isLoading} />
//       </View>
//     );
//   }
// }

// export default PaymentAlert;
