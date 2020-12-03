import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Text,
  Item,
  Label,
  Input,
  ScrollableTab,
  Icon,
  Picker,
  Form,
} from 'native-base';

import {DatePicker} from 'react-native-propel-kit';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import CommonStyles from '../../CommonStyles';
import Api from '../../Api';
import moment from 'moment';
import Loader from '../../components/Loader';
import {ViewUtils} from '../../Utils';
import ImagePicker from 'react-native-image-picker';
import {Configs} from '../../Configs';

export default class UploadIllustrations extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      image: null,
      imageUrl: '',
      salutation: '',
      firstName: '',
      lastName: '',
      speciality: '',
      address1: '',
      address2: '',
      doctorCode: '',
      city: '',
      country: '',
      mobile: '',
      dateOfBirth: new Date(),
      data: [],
      user: {
        personalDetails: {},
      },
    };
  }
  componentDidMount() {
    console.warn('imageeeeeeee', this.state.imageUrl);
  }

  handleChoosePhoto = () => {
    if (this.state.imageUrl != '') {
      var options = {
        title: '',
        customButtons: [{name: 'remove', title: 'Remove Profile Image'}],
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
            });
      }
    });
  };

  saveImage = () => {
    let data = {
      salutation: this.state.salutation,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.user.email,
      speciality: this.state.speciality,
      imageUrl: this.state.imageUrl,
      personalDetails: {
        city: this.state.city,
        country: this.state.country,
        dateOfBirth: this.state.dateOfBirth,
        mobile: this.state.mobile,
      },
    };

    this.setState({
      isLoading: true,
    });
    Api.instance()
      .updateProfile(data)
      .then(response => {
        console.warn('data =====>', response);
        // this.props.navigation.navigate('PatientProfile')
        this.props.navigation.goBack();

        ViewUtils.showToast('Profile has been updated successfully!');
        console.warn('dataaaaaaaaaa ===>', data);
      })
      .catch(err => {
        //ViewUtils.showToast(err);
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  };

  componentDidMount() {
    Api.instance()
      ._user()
      .then(user => {
        if (user == null) return;
        this.setState({
          firstName: user.firstName,
          lastName: user.lastName,
          salutation: user.salutation,
          speciality: user.speciality,
          doctorCode: user.doctorCode,
          city: user.personalDetails.city,
          country: user.personalDetails.country,
          mobile: user.personalDetails.mobile,
          dateOfBirth: user.personalDetails.dateOfBirth,
          imageUrl: user.imageUrl,
        });
      })
      .catch(err => 
        {
          //ViewUtils.showToast(err)
        });
  }

  render() {
    const {image} = this.state;
    return (
      <View style={[CommonStyles.container]}>
        <ImageBackground
          style={[CommonStyles.container, CommonStyles.backgroundImage]}
          source={require('../../assets/img/bwback.png')}>
          <View style={{flex: 2.3}}>
            <Text
              style={[CommonStyles.fontRegular, CommonStyles.headingTextStyle]}>
              <Text
                style={[
                  CommonStyles.textSizeLarge,
                  CommonStyles.textColorWhite,
                ]}>{`Edit Profile\n`}</Text>
              <Text
                style={[
                  CommonStyles.textSizeSmall,
                  CommonStyles.textColorWhite,
                ]}>
                Edit your Profile{' '}
              </Text>
            </Text>
          </View>

          <View style={{flex: 8, paddingHorizontal: 18, marginTop: 33}}>
            <KeyboardAwareScrollView
              style={[{backgroundColor: '#fff', borderRadius: 5}]}>
              <TouchableOpacity
                onPress={() => {
                  this.handleChoosePhoto();
                }}
                style={{marginVertical: 20, alignSelf: 'center'}}>
                {this.state.imageUrl == '' ? (
                  <Icon
                    name="user-edit"
                    type="FontAwesome5"
                    style={{fontSize: 70}}
                  />
                ) : (
                  <View
                    style={{
                      width: 120,
                      height: 120,
                      backgroundColor: '#E3E3E3',
                      borderRadius: 60,
                    }}>
                    <Image
                      source={{
                        uri: this.state.imageUrl,
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 60,
                        resizeMode: 'cover',
                      }}
                    />
                  </View>
                )}
              </TouchableOpacity>

              <Item
                picker
                style={[
                  CommonStyles.container,
                  CommonStyles.itemStyle,
                  {marginTop: 30},
                ]}>
                <Picker
                  mode="dropdown"
                  textStyle={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeMedium,
                  ]}
                  iosIcon={<Icon name="arrow-down" />}
                  placeholderStyle={{color: '#bfc6ea'}}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.salutation}
                  onValueChange={txt => this.setState({salutation: txt})}>
                  <Picker.Item
                    color="gray"
                    selected={true}
                    label="Select Salutation"
                    value=""
                  />
                  <Picker.Item label="Mr" value="Mr" />
                  <Picker.Item label="Dr" value="Dr" />
                  <Picker.Item label="Mrs" value="Mrs" />
                  <Picker.Item label="Miss" value="Miss" />
                </Picker>
              </Item>

              <Item
                stackedLabel
                style={[
                  CommonStyles.container,
                  CommonStyles.itemStyle,
                  {marginTop: 20},
                ]}>
                <Label
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeAverage,
                  ]}>
                  {' '}
                  First Name*
                </Label>
                <Input
                  value={this.state.firstName}
                  onChangeText={val => this.setState({firstName: val})}
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeMedium,
                  ]}
                />
              </Item>

              <Item
                stackedLabel
                style={[
                  CommonStyles.container,
                  CommonStyles.itemStyle,
                  {marginTop: 10},
                ]}>
                <Label
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeAverage,
                  ]}>
                  {' '}
                  Last Name*
                </Label>
                <Input
                  value={this.state.lastName}
                  onChangeText={val => this.setState({lastName: val})}
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeMedium,
                  ]}
                />
              </Item>

              <Item
                stackedLabel
                style={[
                  CommonStyles.container,
                  CommonStyles.itemStyle,
                  {marginTop: 10},
                ]}>
                <Label
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeAverage,
                  ]}>
                  {' '}
                  City
                </Label>
                <Input
                  value={this.state.city}
                  onChangeText={val => this.setState({city: val})}
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeMedium,
                  ]}
                />
              </Item>

              <Item
                stackedLabel
                style={[
                  CommonStyles.container,
                  CommonStyles.itemStyle,
                  {marginTop: 10},
                ]}>
                <Label
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeAverage,
                  ]}>
                  {' '}
                  Country
                </Label>
                <Input
                  value={this.state.country}
                  onChangeText={val => this.setState({country: val})}
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeMedium,
                  ]}
                />
              </Item>

              <Item
                stackedLabel
                style={[
                  CommonStyles.container,
                  CommonStyles.itemStyle,
                  {marginTop: 10},
                ]}>
                <Label
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeAverage,
                  ]}>
                  {' '}
                  Mobile
                </Label>
                <Input
                  keyboardType={'number-pad'}
                  value={this.state.mobile}
                  onChangeText={val => this.setState({mobile: val})}
                  style={[
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeMedium,
                  ]}
                />
              </Item>

              
              <Item 
              style={[
                CommonStyles.container,
                CommonStyles.itemStyle
              ]}>
                <DatePicker
                   placeholder="Date of Birth"
                   textStyle={{color: '#fff'}}
                  itemTextStyle={{color: 'red'}}
                  itemStyle={{backgroundColor: '#fff'}}
                   placeholderTextColor="black"
                   style={[
                    CommonStyles.fontMedium,
                    {color: 'black'},
                    CommonStyles.textSizeNormal,
                    CommonStyles.mt10,
                  ]}
                  
                  //  initialValue={this.state.dateOfBirth}
                  initialValue={this.state.dateOfBirth}
                 onChange={date => this.setState({dateOfBirth: date})}
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
                this.saveImage();
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
                UPDATE
              </Text>
            </TouchableOpacity>
          </View>
          <Loader loading={this.state.isLoading} />
          <View style={[CommonStyles.backButtonStyle]}>
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
