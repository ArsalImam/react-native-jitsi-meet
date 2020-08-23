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
            }
        } else {
            this.state = {
                isLoading: false,
                name: '',
                data: [],
                image: null,
            }
        }
    }

    cancelAttachment = () => {
        this.props.navigation.navigate('UploadIllustrations', this.props.route.params);

        this.setState({ dialogVisible: false });
    };

    sendImage = () => {
        this.props.navigation.navigate('IllustrationsList', this.props.route.params);
        this.setState({ dialogVisible: false });
    };


    handleChoosePhoto = (mediaType) => {
        const options = { noData: true, mediaType };
        ImagePicker.showImagePicker(options, (response) => {

            console.warn('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                this.setState({
                    image: source,
                });
            }
        });
    }

    _savePatientHistory = () => {

        let data = {
            "setupType": "anatomicalIllustration",
            "name": this.state.name,
            "description": this.state.description,
        }

        this.setState({ isLoading: true })

        Api.instance()
            .createMedication(data)
            .then(response => {
                this.props.navigation.replace('PatientHistoryList');
                ViewUtils.showToast('Question has been saved successfully!');
            })
            .catch(err => {
                ViewUtils.showToast(err);
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
    };
    render() {
        const { image } = this.state;

        if (this.props.route.params.appointmentId != null) {

            return (
                <View style={{ height: '75%' }}>
                <ImageBackground style={[
                    CommonStyles.container,
                    CommonStyles.backgroundImage
                ]}
                    source={require('../../assets/img/background.png')}>
                    <View style={
                        { flex: 3, backgroundColor: '#297dec' }
                    }>
                            <Text style={[CommonStyles.fontRegular, CommonStyles.headingTextStyle]}>
                                <Text style={[CommonStyles.textSizeLarge, CommonStyles.textColorWhite]} >{`Upload Medical Record\n`}</Text>
                                <Text style={[CommonStyles.textSizeSmall, CommonStyles.textColorWhite]}>It is a list of your all booking patients </Text>
                            </Text>
                        </View>

                        <View style={{ flex: 8, paddingHorizontal: 18, marginTop: 33 }}>
                            <KeyboardAwareScrollView style={[{ backgroundColor: '#fff', borderRadius: 5, }]}>

                                <TouchableOpacity
                                    onPress={() => { this.handleChoosePhoto() }}
                                    style={{ marginVertical: 20, alignSelf: 'center' }}>
                                    <Icon name="filetext1" type="AntDesign" style={{ fontSize: 100 }} />
                                    <Icon name="camera" type="AntDesign" style={{ fontSize: 40, marginTop: -40, marginLeft: 65 }} />
                                    {image && (
                                        <Image
                                            source={{ uri: image.uri }}
                                            style={{ width: 300, height: 300 }}
                                        />
                                    )}
                                </TouchableOpacity>


                                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 20 }]}>
                                    <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Title*</Label>
                                    <Input
                                        value={this.state.notes}
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

                                        selectedValue={this.state.vitalType}
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
                                    onPress={() => { this.handleChoosePhoto() }}
                                    style={{ marginVertical: 20, alignSelf: 'center' }}>
                                    <Icon name="filetext1" type="AntDesign" style={{ fontSize: 100 }} />
                                    <Icon name="camera" type="AntDesign" style={{ fontSize: 40, marginTop: -40, marginLeft: 65 }} />
                                    {image && (
                                        <Image
                                            source={{ uri: image.uri }}
                                            style={{ width: 300, height: 300 }}
                                        />
                                    )}
                                </TouchableOpacity>


                                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 20 }]}>
                                    <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Title*</Label>
                                    <Input
                                        value={this.state.notes}
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

                                        selectedValue={this.state.vitalType}
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