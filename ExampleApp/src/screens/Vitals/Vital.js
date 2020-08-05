import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, ScrollView, StatusBar } from 'react-native';
import { Container, Header, Content, DatePicker, Text, Item, Label, Input, ScrollableTab, Icon, Picker, Form } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import CommonStyles from '../../CommonStyles'
import BloodGlucose from '../../components/BloodGlucose';
import BloodPressure from '../../components/BloodPressure';
import BloodOxygen from '../../components/BloodOxygen';
import Api from '../../Api';
import Loader from '../../components/Loader';
import { ViewUtils } from '../../Utils'

export default class Vital extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            vitalType: '',
            notes: '',
            multipleValues: [],
            userObj: {},
            vitalObj: {
                multipleValues: [],
                patientId: '',
                note: '',
                data: [],
            },
        };
    }

    _selectVitalComponenet = (params) => {
        switch (params) {
            case 'BloodGlucose':
                return <BloodGlucose ref={com => this.glucoseComponent = com} />;
                break
            case 'BloodPressure':
                return <BloodPressure ref={com => this.pressureComponent = com} />;
                break
            case 'BloodOxygen': 
                return <BloodOxygen ref={com => this.oxygenComponent = com} />;
                break
            default:
                return <View />;
        }
    }

    _saveVital = () => {
        let data = {
            "notes": this.state.notes,
        };
        let childComponentData = null;

        switch (this.state.vitalType) {
            case 'BloodGlucose':
                childComponentData = this.glucoseComponent._onSave();
                Object.assign(data, {
                    "multipleValues": [

                        "Blood Glucose: ",
                        childComponentData.value,

                        "Meal: ",
                        childComponentData.selectedMeal,

                        "Medication: ",
                        childComponentData.selectedMedicine
                    ], 
                    
                    "vitalType": "Blood Glucose",
                    "value": childComponentData.value,
                });
                break;
            case 'BloodPressure':
                childComponentData = this.pressureComponent._onSave();
                Object.assign(data, {
                    "multipleValues": [
                        "Systolic: ",
                        childComponentData.systolic,

                        "Diastolic: ",
                        childComponentData.diastolic,

                        "Pulse: ",
                        childComponentData.pulse
                    ],
                    "vitalType": "Blood Pressure",
                    "value": childComponentData.systolic
                });
                break
            case 'BloodOxygen':
                childComponentData = this.oxygenComponent._onSave();
                Object.assign(data, {
                    "multipleValues": [
                        "Blood Oxygen: ",
                        childComponentData.value
                    ],
                    "vitalType": "Blood Oxygen",
                    "value": childComponentData.value,
                });
                break
            default:

        }

        this.setState({ isLoading: true });
        Api.instance()
            .createVital(data)
            .then(response => {
                this.props.navigation.replace('MyDrawer');
                ViewUtils.showToast('Vital has been saved successfully!');
            })
            .catch(err => {
                ViewUtils.showToast(err);
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
    };


    render() {
        return (

            <View style={[CommonStyles.container]}>

                <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/img/bwback.png')}>
                    <View style={{ flex: 2.3 }}>
                        <Text style={[CommonStyles.fontRegular, CommonStyles.headingTextStyle]}>
                            <Text style={[CommonStyles.textSizeLarge, CommonStyles.textColorWhite]} >{`Vital Add\n`}</Text>
                            <Text style={[CommonStyles.textSizeSmall, CommonStyles.textColorWhite]}>It is a list of your all booking patients </Text>
                        </Text>
                    </View>

                    <View style={{ flex: 8, paddingHorizontal: 18, marginTop: 33 }}>
                        <KeyboardAwareScrollView style={[{ backgroundColor: '#fff', borderRadius: 5, }]}>
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
                                        label="Select Vital Type"
                                        value=""
                                    />
                                    <Picker.Item label="Blood Glucose" value="BloodGlucose" />
                                    <Picker.Item label="Blood Pressure" value="BloodPressure" />
                                    <Picker.Item label="Blood Oxygen" value="BloodOxygen" />
                                </Picker>
                            </Item>
                            {this._selectVitalComponenet(this.state.vitalType)}

                            <Item floatingLabel style={[CommonStyles.container, CommonStyles.itemStyle]}>
                                <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium, { marginLeft: 7, }]}>Notes*</Label>
                                <Input
                                    value={this.state.notes}
                                    onChangeText={val => this.setState({ notes: val })}

                                    multiline={true} style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium, { marginLeft: 5 }]} />
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
                                this._saveVital();
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