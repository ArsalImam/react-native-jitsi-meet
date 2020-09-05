import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, ScrollView, StatusBar } from 'react-native';
import { Container, Header, Content, DatePicker, Text, Item, Label, Input, ScrollableTab, Icon, Picker, Form, Image } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import CommonStyles from '../../CommonStyles'
import Api from '../../Api';
import Loader from '../../components/Loader';
import { ViewUtils } from '../../Utils';
import ImagePicker from 'react-native-image-picker'

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
            }
        } else {
            this.state = {
                isLoading: false,
                name: '',
                data: [],
                image: null,
                imageUri: '',

            }
        }
    }

    // cancelAttachment = () => {
    //     this.props.navigation.navigate('UploadIllustrations', this.props.route.params);

    //     this.setState({ dialogVisible: false });
    // };

    // sendImage = () => {
    //     this.props.navigation.navigate('IllustrationsList', this.props.route.params);
    //     this.setState({ dialogVisible: false });
    // };


    // handleChoosePhoto = (mediaType) => {
    //     const options = { noData: true, mediaType };
    //     ImagePicker.showImagePicker(options, (response) => {

    //         console.warn('Response = ', response);

    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else if (response.customButton) {
    //             console.log('User tapped custom button: ', response.customButton);
    //         } else {
    //             const source = { uri: response.uri };

    //             this.setState({
    //                 image: source,
    //             });
    //         }
    //     });
    // }
    

    // handleChoosePhoto = () => {

    //     const options = {
    //         title: '',
    //         noData: true,
    //         // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    //         storageOptions: {
    //             skipBackup: true,
    //             path: 'images',
    //         },
    //     };

    //     ImagePicker.showImagePicker(options, (response) => {
    //         console.warn('Response = ', response);

    //         if (response.didCancel) {
    //             console.warn('User cancelled image picker');
    //         } else if (response.error) {
    //             console.warn('ImagePicker Error: ', response.error);
    //         } else {
    //             console.warn('else called')
    //             // this.setState({
    //             //     imageUri: response.uri,
    //             //   });
    //             // show loader
    //             const fileData = new FormData();
    //             this.setState({
    //                 imageUri: response.uri,
    //               });
    //             // fileData.append('uploadFile', {
                 
    //             //     name: response.fileName,
    //             //     type: response.type,
    //             //     uri: Platform.OS === 'android' ? response.uri : response.uri.replace('file://', ''),
                 
    //             // });
    //         }
    //     });
    //    }

    // handleChoosePhoto = () => {

    //     const options = {
    //         title: '',
    //         noData: true,
    //         // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    //         storageOptions: {
    //             skipBackup: true,
    //             path: 'images',
    //         },
    //     };


    //     ImagePicker.showImagePicker(options, (response) => {
    //         console.warn('Response = ', response);

    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else {
    //             // show loader
    //             const fileData = new FormData();
    //             fileData.append('uploadFile', {
    //                 name: response.fileName,
    //                 type: response.type,
    //                 uri: Platform.OS === 'android' ? response.uri : response.uri.replace('file://', '')
    //             });

    //             Api.instance().uploadImage(fileData)
    //                 .then((response)=>{
    //                    console.warn(JSON.stringify(response));
    //                    console.warn("response.result.uploadFile.name == ",response.result.uploadFile.name)
    //                    this.state.imageUri = "Contents/${container}/download/${fileName}"
    //                 });
    //             const source = {uri: response.uri};

    //             // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    //             // this.setState({
    //             //     filePath: source,
    //             // });
    //         }
    //     });
    //     /* ImagePicker.launchImageLibrary(options, (response) => {
    //          console.warn('Response = ', response.uri);
    //          if (response) {
    //              this.setState({ image: response.uri })
    //      }
    //      });*/
    // }


imagePicker = () => {
   
      var options = {
        title: '',
        noData:true,
        storageOptions: {
          skipBackup: true,
          path: 'images',
         },
      };
      ImagePicker.showImagePicker(options, response => {
        if (response.didCancel) {
                console.warn('User cancelled image picker');
        } else if (response.error) {
          console.warn('ImagePicker Error: ', response.error);
        }  else {
            
            console.warn('image set' ,this.state.imageUri )
          this.setState({
            imageUri: response.uri,
            imageFilename : response.fileName
          });
//         let imageData = new FormData();
//         imageData.append('file', {
// uri: response.uri , 
// name:response.fileName,

//         });
// console.warn('imageeee Data' ,imageFilename )

// Api.instance()
// .uploadImage(imageData)

// .then(response => {
// console.warn('tesssssssssssst' , response.body);
// })
        }
      });
    
  };
    
    _savePatientHistory = () => {

        if (this.state.imageUri) {
            console.warn('Image URl', this.state.imageUri);
            let imageData = new FormData();
            imageData.append('file', {
              uri: this.state.imageUri,
              name: this.state.imageFilename,
              
            });
        

        let data = {
            // "setupType": "medicalRecord",
            // "name": this.state.name,
            // "description": this.state.description,
            "url":this.state.imageUri,
            // "filenmae":this.state.imageFilename,
            // "vital Type" :this.state.vitalType
        }

        this.setState({ isLoading: true })
console.warn('Bisma' , data)
                       Api.instance()
            .uploadImage(data)
                       //    .uploadImage(data)
                   
            .then(response => {
                console.warn('tesssssssssssst' , response.data);
                this.props.navigation.replace('MedicalRecordList');
                ViewUtils.showToast('Saved successfully!');
            console.warn('=======response=======' , response)    
            })
            .catch(err => {
                ViewUtils.showToast(err);
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
        }
        else{
            console.warn('not working')
        }
    };
    render() {
        // const { image } = this.state;

        if (this.state.appointmentId != null) {

            return (
                <View style={{ height: '75%' }}>
                <ImageBackground style={[
                    CommonStyles.container,
                    CommonStyles.backgroundImage
                ]}
                    source={require('../../assets/img/background.png')}>
                    <View style={{ 
                        flex: 3, 
                        backgroundColor: '#297dec' 
                    }}>
                            <Text style={[CommonStyles.fontRegular, CommonStyles.headingTextStyle]}>
                                <Text style={[CommonStyles.textSizeLarge, CommonStyles.textColorWhite]} >{`Upload Medical Record\n`}</Text>
                                <Text style={[CommonStyles.textSizeSmall, CommonStyles.textColorWhite]}>It is a list of your all booking patients </Text>
                            </Text>
                        </View>

                        <View style={{ flex: 8, paddingHorizontal: 18, marginTop: 33 }}>
                            <KeyboardAwareScrollView style={[{ backgroundColor: '#fff', borderRadius: 5, }]}>

                                <TouchableOpacity
                                    onPress={() =>this.imagePicker()}
                                    style={{ marginVertical: 20, alignSelf: 'center' }}>
                                    <Icon name="filetext1" type="AntDesign" style={{ fontSize: 100 }} />
                                    <Icon name="camera" type="AntDesign" style={{ fontSize: 40, marginTop: -40, marginLeft: 65 }} />
                                    {/* {image && ( */}
                                        {/* <Image
                                            source={{ uri: this.state.imageUri }}
                                            style={{ width: 300, height: 300 }}
                                        /> */}
                                    {/* )} */}
                                </TouchableOpacity>


                                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 20 }]}>
                                    <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Title*</Label>
                                    <Input
                                        // value={this.state.name}
                                        onChangeText={val => this.setState({ name: val })}
                                        style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]} />
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
                                        style={{ textAlign: 'left' }}
                                        focusable
                                        iosIcon={<Icon name="arrow-down" />}
                                        placeholder="Select Vital Type"
                                        placeholderStyle={{ color: '#bfc6ea' }}
                                        placeholderIconColor="#007aff"

                                        // selectedValue={this.state.vitalType}
                                        onValueChange={val => { this.setState({ vitalType: val }) }}>
                                        <Picker.Item
                                            color="gray"
                                            selected={false}
                                            label="Document Type"
                                            value=""
                                        />
                                        <Picker.Item label="Referral Letter" value="BloodGlucose" />
                                        <Picker.Item label="Scanned Medical Records" value="BloodPressure" />
                                        <Picker.Item label="Results of Laboratory Test" value="BloodOxygen" />
                                        <Picker.Item label="X-rays, MRI, CT, US, Scans " value="BloodOxygen" />
                                        <Picker.Item label="Misc Images ECG, Skin Lesion etc" value="BloodOxygen" />
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
                                onPress={() => {
                                    this._savePatientHistory();
                                }}
                                style={[
                                    CommonStyles.container,
                                    CommonStyles.centerText,
                                    { borderRightWidth: 0.5, borderColor: '#cfd2d6' },
                                ]}
                            >
                                <Text
                                    style={[
                                        CommonStyles.fontRegular,
                                        CommonStyles.textSizeNormal,
                                        CommonStyles.centerText,
                                        CommonStyles.margin,
                                        CommonStyles.padding,
                                        { opacity: 0.5 },
                                    ]}>
                                    SAVE
                                 </Text>
                            </TouchableOpacity>
                        </View>

                        <Loader loading={this.state.isLoading} />

                        <View
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
                        </View>
                    </ImageBackground>
                </View>
            );
        } else {
            return (
                <View style={[CommonStyles.container]}>

                    <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/img/bwback.png')}>
                        <View style={{ flex: 2.3 }}>
                            <Text style={[CommonStyles.fontRegular, CommonStyles.headingTextStyle]}>
                                <Text style={[CommonStyles.textSizeLarge, CommonStyles.textColorWhite]} >{`Upload Medical Record\n`}</Text>
                                <Text style={[CommonStyles.textSizeSmall, CommonStyles.textColorWhite]}>It is a list of your all booking patients </Text>
                            </Text>
                        </View>

                        <View style={{ flex: 8, paddingHorizontal: 18, marginTop: 33 }}>
                            <KeyboardAwareScrollView style={[{ backgroundColor: '#fff', borderRadius: 5, }]}>

                                <TouchableOpacity
                                    onPress={() => { 
                                        this.handleChoosePhoto()
                                     }}
                                
                                    style={{ marginVertical: 20, alignSelf: 'center' }}>
                                    <Icon name="filetext1" type="AntDesign" style={{ fontSize: 100 }} />
                                    <Icon name="camera" type="AntDesign" style={{ fontSize: 40, marginTop: -40, marginLeft: 65 }} />
                                    {image && (
                                        <Image
                                            source={{ uri: image.uri}}
                                            style={{ width: 300, height: 300 }}
                                        />
                                    )}
                                    
                                </TouchableOpacity>


                                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 20 }]}>
                                    <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Title*</Label>
                                    <Input
                                        // value={this.state.notes}
                                        onChangeText={val => this.setState({ name: val })}
                                        style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]} />
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
                                        style={{ textAlign: 'left' }}
                                        focusable
                                        iosIcon={<Icon name="arrow-down" />}
                                        placeholder="Select Vital Type"
                                        placeholderStyle={{ color: '#bfc6ea' }}
                                        placeholderIconColor="#007aff"

                                        // selectedValue={this.state.vitalType}
                                        onValueChange={val => { this.setState({ vitalType: val }) }}>
                                        <Picker.Item
                                            color="gray"
                                            selected={false}
                                            label="Document Type"
                                            value=""
                                        />
                                        <Picker.Item label="Referral Letter" value="BloodGlucose" />
                                        <Picker.Item label="Scanned Medical Records" value="BloodPressure" />
                                        <Picker.Item label="Results of Laboratory Test" value="BloodOxygen" />
                                        <Picker.Item label="X-rays, MRI, CT, US, Scans " value="BloodOxygen" />
                                        <Picker.Item label="Misc Images ECG, Skin Lesion etc" value="BloodOxygen" />
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
                                onPress={() => {
                                    this._savePatientHistory();
                                }}
                                style={[
                                    CommonStyles.container,
                                    CommonStyles.centerText,
                                    { borderRightWidth: 0.5, borderColor: '#cfd2d6' },
                                ]}
                            >
                                <Text
                                    style={[
                                        CommonStyles.fontRegular,
                                        CommonStyles.textSizeNormal,
                                        CommonStyles.centerText,
                                        CommonStyles.margin,
                                        CommonStyles.padding,
                                        { opacity: 0.5 },
                                    ]}>
                                    SAVE
                             </Text>
                            </TouchableOpacity>
                        </View>

                        <Loader loading={this.state.isLoading} />

                        <View
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
                        </View>
                    </ImageBackground>
                </View>
            );
        }
    }
}