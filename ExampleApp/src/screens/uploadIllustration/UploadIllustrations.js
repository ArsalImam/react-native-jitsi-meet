import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StatusBar,Image
} from 'react-native';
import {
  Container,
  Header,
  Content,
  DatePicker,
  Text,
  Item,
  Label,
  Input,
  ScrollableTab,
  Icon,
  Picker,
  Form,
  
} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import CommonStyles from '../../CommonStyles';
import Api from '../../Api';
import Loader from '../../components/Loader';
import {ViewUtils} from '../../Utils';
import ImagePicker from 'react-native-image-picker';
import {Configs} from '../../Configs';

export default class UploadIllustrations extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.route.params) {
      this.state = {
        isLoading: false,
        uri: '',
        name: '',
        imageUri: '',
        image: null,
        filePath: {},
        appointmentId: this.props.route.params.appointmentId,
        patientId: this.props.route.params.patientId,
      };
    } else {
      this.state = {
        isLoading: false,
        uri: '',
        name: '',
        imageUri: '',
        image: null,
        filePath: {},
      };
    }
  }

  handleChoosePhoto = () => {
    const options = {
      title: '',
      noData: true,
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.warn('Response = ', response);

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

        Api.instance()
          .uploadImage(fileData)
          .then(response => {
            console.warn('=====heyssssss===', JSON.stringify(response));
            this.setState({
              imageUri: Api.instance().getMediaUrl(
                Configs.containers.images,
                response.result.files.uploadFile[0].name,
              )});
console.warn('uriiiii' , this.state.imageUri)
        });

        const source = {uri: response.uri};
      }
    });
  };
  
  _savePatientHistory = () => {
    if (this.state.imageUri != '' && this.state.name.trim() != '') {
      let data = {
        setupType: 'anatomicalIllustration',
        name: this.state.name,
        description: this.state.description,
        url: this.state.imageUri,
      };

      this.setState({isLoading: true});

      Api.instance()
        .createMedication(data)
        .then(response => {
          console.warn('tesssssssssssst', response);
          this.props.route.params.onAddAnatomicalIllustration();
          this.props.navigation.goBack();
          ViewUtils.showToast('Question has been saved successfully!');
        })
        .catch(err => {
          //ViewUtils.showToast(err);
        })
        .finally(() => {
          this.setState({isLoading: false});
        });
    } else {
      ViewUtils.showAlert('All Fields Required');
    }
  };
  render() {
    const {image} = this.state;

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
                  ]}>{`Upload Anatomical Illustrations\n`}</Text>
                <Text
                  style={[
                    CommonStyles.textSizeSmall,
                    CommonStyles.textColorWhite,
                  ]}>
                  It is a list of all your Upload Illustrations{' '}
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
                    Anatomical Name*
                  </Label>
                  <Input
                    value={this.state.notes}
                    onChangeText={val => this.setState({name: val})}
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeMedium,
                    ]}
                  />
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
                  ]}>{`Upload Anatomical Illustrations\n`}</Text>
                <Text
                  style={[
                    CommonStyles.textSizeSmall,
                    CommonStyles.textColorWhite,
                  ]}>
                  It is a list of all your Upload Illustrations{' '}
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
                      style={{width: 300, height: 300,backgroundColor:'#E3E3E3'}}
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
                    Anatomical Name*
                  </Label>
                  <Input
                    value={this.state.notes}
                    onChangeText={val => this.setState({name: val})}
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeMedium,
                    ]}
                  />
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
                onPress={() => this._savePatientHistory()}
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
          </ImageBackground>
        </View>
      );
    }
  }
}
