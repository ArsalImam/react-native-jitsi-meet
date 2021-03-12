import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StatusBar,
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
import {Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import CommonStyles from '../../CommonStyles';
import Api from '../../Api';
import Loader from '../../components/Loader';
import {ViewUtils} from '../../Utils';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {Configs} from '../../Configs';

export default class UploadMedicalRecord extends Component {
  constructor(props) {
    super(props);
    if (this.props.route.params) {
      this.state = {
        isLoading: false,
        name: '',
        data: [],
        image: null,
        appointmentId: this.props.route.params.appointmentId,
        patientId: this.props.route.params.patientId,
        imageUri: '',
        uri: '',
        vitalType:''
      };
    } else {
      this.state = {
        isLoading: false,
        name: '',
        data: [],
        image: null,
        imageUri: '',
        uri: '',
        vitalType:''
      };
    }
  }

  handleChoosePhoto = () => {
    const options = {
      title: '',
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // show loader
        const fileData = new FormData();
        fileData.append('uploadFile', {
          name: response.fileName,
          type: response.type,
          uri:
            Platform.OS === 'android'
              ? response.uri
              : response.uri.replace('file://', ''),
        });
        this.setState({isLoading: true});
        Api.instance()
          .uploadImage(fileData)
          .then(response => {
            this.setState({isLoading: false});
            this.setState({
              imageUri: Api.instance().getMediaUrl(
                Configs.containers.images,
                response.result.files.uploadFile[0].name,
              ),
            });
          })
          .catch(err => console.log(err))
          .finally(() => {
            this.setState({isLoading: false});
          });
        const source = {uri: response.uri};
      }
    });
  };

  imagePicker = () => {
    var options = {
      title: '',
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        let imageData = new FormData();
        imageData.append('file', {
          uri: response.uri,
          name: response.fileName,
        });
        Api.instance()
          .uploadImage(imageData)

          .then(response => {
          });
      }
    });
  };

  _savePatientHistory = () => {

    
    if (this.state.imageUri != '' && this.state.name.trim() != '' && this.state.vitalType.trim() != '') {
      let data = {
        title: this.state.name,
        url: this.state.imageUri,
        type: this.state.vitalType,
      };

      this.setState({isLoading: true});

      Api.instance()
        .saveMedicalRecord(data)

        .then(response => {
          this.props.route.params.onUploadMedicalRecord();
          this.props.navigation.goBack();
          ViewUtils.showToast('Saved successfully!');
        })
        .catch(err => {
          ViewUtils.showAlert('Unable to Perform this Action');
        })
        .finally(() => {
          this.setState({isLoading: false});
        });
    } else {
      ViewUtils.showToast('All Fields Required');
    }
  };
  render() {
    if (this.state.appointmentId != null) {
      return (
        <View style={{height: '75%'}}>
          <ImageBackground
            style={[CommonStyles.container, CommonStyles.backgroundImage]}
            source={require('../../assets/img/background.png')}>
            <View
              style={{
                flex: 3,
                backgroundColor: '#297dec',
              }}>
              <Text
                style={[
                  CommonStyles.fontRegular,
                  CommonStyles.headingTextStyle,
                ]}>
                <Text
                  style={[
                    CommonStyles.textSizeLarge,
                    CommonStyles.textColorWhite,
                  ]}>{`Upload Medical Record\n`}</Text>
                <Text
                  style={[
                    CommonStyles.textSizeSmall,
                    CommonStyles.textColorWhite,
                  ]}>
                  Upload new Medical Record{' '}
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
                  {this.state.imageUri == '' ? (
                    <View>
                      <Icon
                        name="filetext1"
                        type="AntDesign"
                        style={{fontSize: 100}}
                      />
                      <Icon
                        name="camera"
                        type="AntDesign"
                        style={{fontSize: 40, marginTop: -40, marginLeft: 65}}
                      />
                    </View>
                  ) : (
                    <Image
                      source={{uri: this.state.imageUri}}
                      style={{
                        width: 300,
                        height: 300,
                        backgroundColor: '#E3E3E3',
                      }}
                    />
                  )}
                </TouchableOpacity>

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
                    Title* 
                  </Label>
                  <Input
                    onChangeText={val => this.setState({name: val})}
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeMedium,
                    ]}
                  />
                </Item>

                <Item
                  picker
                  style={[
                    CommonStyles.container,
                    CommonStyles.itemStyle,
                    {paddingTop: 10},
                  ]}>
                  <Picker
                    mode="dropdown"
                    style={{textAlign: 'left'}}
                    focusable
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Select Vital Type"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.vitalType}
                    onValueChange={val => {
                      this.setState({vitalType: val});
                    }}>
                    <Picker.Item
                      color="gray"
                      selected={false}
                      label="Document Type"
                      value=""
                    />
                    <Picker.Item
                      label="Referral Letter"
                      value="referralLetter"
                    />
                    <Picker.Item
                      label="Scanned Medical Records"
                      value="medicalRecord"
                    />
                    <Picker.Item
                      label="Results of Laboratory Test"
                      value="labReport"
                    />
                    <Picker.Item
                      label="X-rays, MRI, CT, US, Scans "
                      value="xRay"
                    />
                    <Picker.Item
                      label="Misc Images ECG, Skin Lesion etc"
                      value="misc"
                    />
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
                onPress={() => {
                  this._savePatientHistory();
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
                  ]}>{`Upload Medical Record\n`}</Text>
                <Text
                  style={[
                    CommonStyles.textSizeSmall,
                    CommonStyles.textColorWhite,
                  ]}>
                  Upload new Medical Record{' '}
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
                  {this.state.imageUri == '' ? (
                    <View>
                      <Icon
                        name="filetext1"
                        type="AntDesign"
                        style={{fontSize: 100}}
                      />
                      <Icon
                        name="camera"
                        type="AntDesign"
                        style={{fontSize: 40, marginTop: -40, marginLeft: 65}}
                      />
                    </View>
                  ) : (
                    <Image
                      source={{uri: this.state.imageUri}}
                      style={{
                        width: 300,
                        height: 300,
                        backgroundColor: '#E3E3E3',
                      }}
                    />
                  )}
                </TouchableOpacity>

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
                    Title* 
                  </Label>
                  <Input
                    onChangeText={val => this.setState({name: val})}
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeMedium,
                    ]}
                  />
                </Item>

                <Item
                  picker
                  style={[
                    CommonStyles.container,
                    CommonStyles.itemStyle,
                    {paddingTop: 10,},
                  ]}>
                  <Picker
                    mode="dropdown"
                    style={{textAlign: 'left'}}
                    focusable
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Select Vital Type"
                    placeholderStyle={{color: '#bfc6ea',}}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.vitalType}
                    onValueChange={val => {
                      this.setState({vitalType: val});
                    }}>
                     <Picker.Item
                      color="gray"
                      selected={false}
                      label="Document Type"
                      value=""
                    />
                    <Picker.Item
                      label="Referral Letter"
                      value="referralLetter"
                    />
                    <Picker.Item
                      label="Scanned Medical Records"
                      value="medicalRecord"
                    />
                    <Picker.Item
                      label="Results of Laboratory Test"
                      value="labReport"
                    />
                    <Picker.Item
                      label="X-rays, MRI, CT, US, Scans "
                      value="xRay"
                    />
                    <Picker.Item
                      label="Misc Images ECG, Skin Lesion etc"
                      value="misc"
                    />
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
                onPress={() => {
                  this._savePatientHistory();
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
}