import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, ScrollView, StatusBar } from 'react-native';
import { Container, Header, Content, DatePicker, Text, Item, Label, Input, ScrollableTab, Icon, Picker, Form, Image } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import CommonStyles from '../../CommonStyles'
import Api from '../../Api';
import moment from 'moment'
import Loader from '../../components/Loader';
import { ViewUtils } from '../../Utils';
import ImagePicker from 'react-native-image-picker'

export default class UploadIllustrations extends React.Component {


    constructor() {
        super();
        this.state = {
            isLoading: false,
            image: null,
            salutation: '',
            firstName: '',
            lastName: '',
            speciality: '',
            address1: '',
            address2: '',
            city: '',
            country: '',
            mobile: '',
            dateOfBirth: '',
            data: [],

            user: {
                personalDetails: {}
            },



        };
    }

    handleChoosePhoto = () => {
        const options = { noData: true };
        ImagePicker.launchImageLibrary(options, (response) => {

            console.warn('Response = ', response.uri);

            if (response) {
                this.setState({ image: response.uri })
            }

        });
    }

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

                    city: user.personalDetails.city,
                    country: user.personalDetails.country,
                    mobile: user.personalDetails.mobile,
                    dateOfBirth: user.personalDetails.dateOfBirth,



                });
            })

            .catch(err => ViewUtils.showToast(err));
    }
    _updateProfile = () => {
        let data = {

            "salutation": this.state.salutation,

            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "email": this.state.user.email,
            "speciality": this.state.speciality,
            "personalDetails": {
                "city": this.state.city,
                "postalCode": "",
                "country": this.state.country,
                "dateOfBirth": this.state.dateOfBirth,
                "mobile": this.state.mobile,
            },
            "qualifications": [],
            "specialities": [],
            "expertise": [],
            "assistants": [""],
            "credit": "",
            "previousEmployments": [],
            "presentEmployments": [],

        }

        Api.instance()
            .updateProfile(data)
            .then(response => {

                this.props.navigation.replace('PatientProfile')
                ViewUtils.showToast('Profile has been updated successfully!');
                console.warn(data)
            })
            .catch(err => {
                ViewUtils.showToast(err);
            })
            .finally(() => {
                this.setState({ isLoading: true });
                Api.instance()
                ._user()
            });
    };

    render() {

        const { image } = this.state;
        return (
            <View style={[CommonStyles.container]}>

                <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/img/bwback.png')}>
                    <View style={{ flex: 2.3 }}>
                        <Text style={[CommonStyles.fontRegular, CommonStyles.headingTextStyle]}>
                            <Text style={[CommonStyles.textSizeLarge, CommonStyles.textColorWhite]} >{`Edit Profile\n`}</Text>
                            <Text style={[CommonStyles.textSizeSmall, CommonStyles.textColorWhite]}>It is a list of your all booking patients </Text>
                        </Text>
                    </View>

                    <View style={{ flex: 8, paddingHorizontal: 18, marginTop: 33 }}>
                        <KeyboardAwareScrollView style={[{ backgroundColor: '#fff', borderRadius: 5, }]}>


                            <TouchableOpacity
                                onPress={() => { this.handleChoosePhoto() }}

                                style={{ marginVertical: 20, alignSelf: 'center' }}>
                                <Icon name="user-edit" type="FontAwesome5" style={{ fontSize: 70 }} />

                            </TouchableOpacity>

                            <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 20 }]}>
                                <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>First Name*</Label>
                                <Input
                                    placeholder={this.state.user.firstName}
                                    value={this.state.firstName}
                                    onChangeText={val => this.setState({ firstName: val })}
                                    style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]} />
                            </Item>

                            <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 10 }]}>
                                <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Last Name*</Label>
                                <Input

                                    value={this.state.lastName}
                                    onChangeText={val => this.setState({ lastName: val })}
                                    style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]} />
                            </Item>



                            <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 10 }]}>
                                <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>City</Label>
                                <Input
                                    placeholder={this.state.user.personalDetails.city}
                                    value={this.state.city}
                                    onChangeText={val => this.setState({ city: val })}
                                    style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]} />
                            </Item>

                            <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 10 }]}>
                                <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Country</Label>
                                <Input
                                    placeholder={this.state.user.personalDetails.country}
                                    value={this.state.country}
                                    onChangeText={val => this.setState({ country: val })}
                                    style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]} />
                            </Item>


                            <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 10 }]}>
                                <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Mobile</Label>
                                <Input
                                    placeholder={this.state.user.personalDetails.mobile}
                                    keyboardType={'number-pad'}
                                    value={this.state.mobile}
                                    onChangeText={val => this.setState({ mobile: val })}
                                    style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]} />
                            </Item>
                            {/* 
                            <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 10 }]}>
                                <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Doctor Code</Label>
                                <Input
                                    keyboardType={'number-pad'}
                                    placeholder={this.state.user.doctorCode}
                                    value={this.state.doctorCode}
                                    onChangeText={val => this.setState({ doctorCode: val })}
                                    style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]} />
                            </Item>
 */}

                            <Label style={[{ marginTop: 10, alignSelf: 'center', width: '88%' }, CommonStyles.fontRegular, CommonStyles.textSizeSmall]}>Date of Birth</Label>


                            <Item
                                style={[
                                    CommonStyles.container,
                                    CommonStyles.itemStyle,

                                ]}>
                                <DatePicker
                                    minimumDate={new Date(1930, 1, 1)}
                                    locale={'en'}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={'slide'}
                                    androidMode={'spinner'}

                                    textStyle={[CommonStyles.fontRegular]}
                                    placeHolderTextStyle={[
                                        CommonStyles.fontRegular,
                                        CommonStyles.textSizeAverage,

                                        {

                                            paddingBottom: 12,
                                            marginLeft: -10
                                        },
                                    ]}
                                    value={moment(this.state.dateOfBirth).format('L')}
                                    onDateChange={val => this.setState({ dateOfBirth: val })}
                                    disabled={false}

                                />
                                <Icon active name="calendar" style={{ marginLeft: 20 }} />
                            </Item>

                            <Item
                                picker
                                style={[
                                    CommonStyles.container,
                                    CommonStyles.itemStyle,
                                    { marginTop: 20 }

                                ]}>
                                <Picker
                                    mode="dropdown"
                                    textStyle={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]}
                                    iosIcon={<Icon name="arrow-down" />}
                                 
                                    placeholderStyle={{ color: '#bfc6ea' }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.salutation}
                                    onValueChange={txt => this.setState({ salutation: txt })}>
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

                                style={[
                                    CommonStyles.container,
                                    CommonStyles.itemStyle,
                                    { marginTop: 20 }

                                ]}>
                                <Picker
                                    mode="dropdown"
                                    textStyle={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]}
                                    iosIcon={<Icon name="arrow-down" />}
                                    placeholderStyle={{ color: '#bfc6ea' }}
                          
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.speciality}
                                    onValueChange={txt => this.setState({ speciality: txt })}>
                                    <Picker.Item
                                        color="gray"
                                        selected={true}
                                        label="Speciality"
                                        value=""
                                    />
                                    <Picker.Item label="General Practice" value="General Practice" />
                                    <Picker.Item label="Allergy Medicine" value="Allergy Medicine" />
                                    <Picker.Item label="Audiological Medicine" value="Audiological Medicine" />
                                    <Picker.Item label="Acute Medicine" value="Acute Medicine" />
                                    <Picker.Item label="Clinical Medicine" value="Clinical Medicine" />
                                    <Picker.Item label="Clinical Neurophysiology" value="Clinical Neurophysiology" />

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
                            onPress={() => { this._updateProfile() }}
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
                                UPDATE
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