import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, ScrollView, StatusBar } from 'react-native';
import { Container, Header, Content, DatePicker, Text, Item, Label, Input, ScrollableTab, Icon, Picker } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import CommonStyles from '../../CommonStyles'
import BloodGlucose from '../../components/BloodGlucose';
import BloodPressure from '../../components/BloodPressure';
import BloodOxygen from '../../components/BloodOxygen';


export default class VitalAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: ""
        };
    }
    _createVitals() {

    }
    onValueChange(value) {
        this.setState({
            selected: value
        });
    }
    clickme = (params) => {
        switch (params) {
            case 'key0':
                return <BloodGlucose />;
                break
            case 'key1':
                return <BloodPressure />;
                break
            case 'key2':
                return <BloodOxygen />;
                break
            default:
                return <View />;
        }
    }
    render() {

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
                            <Text style={[CommonStyles.fontRegular, { marginTop: 65, paddingHorizontal: 18 }]}>
                                <Text style={[CommonStyles.textSizeLarge, CommonStyles.textColorWhite]} >{`Vital Add\n`}</Text>
                                <Text style={[CommonStyles.textSizeSmall, CommonStyles.textColorWhite]}>It is a list of your all booking patients </Text>
                            </Text>
                        </View>

                        <View style={{ flex: 8, paddingHorizontal: 18, marginTop: 33 }}>
                            <KeyboardAwareScrollView style={[styles.View2, { backgroundColor: '#fff', borderRadius: 5, }]}>
                                <Item
                                    picker
                                    style={[
                                        CommonStyles.container,
                                        CommonStyles.itemStyle,
                                        { marginVertical: 10, paddingTop: 10 },
                                    ]}>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}

                                        placeholder="Choose Frequency"
                                        placeholderStyle={{ color: '#bfc6ea' }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.selected}
                                        onValueChange={this.onValueChange.bind(this)}>
                                        <Picker.Item
                                            color="gray"
                                            selected={false}
                                            label="Select Vital Type"
                                            value=""
                                        />
                                        <Picker.Item label="Blood Glucose" value="key0" />
                                        <Picker.Item label="Blood Pressure" value="key1" />
                                        <Picker.Item label="Blood Oxygen" value="key2" />
                                    </Picker>
                                </Item>
                                {this.clickme(this.state.selected)}

                                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle]}>
                                    <Label style={[{ color: '#333333' }, CommonStyles.fontRegular, CommonStyles.textSizeSmall]} >Notes*</Label>
                                    <Input />
                                </Item>

                                {/* <View style={{ width: '88%', height: 80, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>
    
                                    <Item stackedLabel style={[styles.itemStyle, { alignSelf: 'center', width: '46%' }]}>
                                        <Label style={[{ color: '#333333' }, CommonStyles.DINProLight, CommonStyles.textSizeSmall]} >Weight</Label>
                                        <Input />
                                    </Item>
    
                                    <Item stackedLabel style={[styles.itemStyle, { alignSelf: 'center', width: '46%' }]}>
    
                                        <Label style={[{ color: '#333333' }, CommonStyles.DINProLight, CommonStyles.textSizeSmall]} >Height</Label>
                                        <Input />
                                    </Item>
    
                                </View>
    
                                <View style={{ width: '88%', height: 80, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>
    
                                    <Item stackedLabel style={[styles.itemStyle, { alignSelf: 'center', width: '46%' }]}>
                                        <Label style={[{ color: '#333333' }, CommonStyles.DINProLight, CommonStyles.textSizeSmall]} >Temperature</Label>
                                        <Input />
                                    </Item>
    
                                    <Item stackedLabel style={[styles.itemStyle, { alignSelf: 'center', width: '46%' }]}>
    
                                        <Label style={[{ color: '#333333' }, CommonStyles.DINProLight, CommonStyles.textSizeSmall]} >Temperature Method</Label>
                                        <Input />
                                    </Item>
    
                                </View>
    
                                <View style={{ width: '88%', height: 80, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>
    
                                    <Item stackedLabel style={[styles.itemStyle, { alignSelf: 'center', width: '46%' }]}>
                                        <Label style={[{ color: '#333333' }, CommonStyles.DINProLight, CommonStyles.textSizeSmall]} >Pulse</Label>
                                        <Input />
                                    </Item>
    
                                    <Item stackedLabel style={[styles.itemStyle, { alignSelf: 'center', width: '46%' }]}>
                                        <Label style={[{ color: '#333333' }, CommonStyles.DINProLight, CommonStyles.textSizeSmall]} >Respiration</Label>
                                        <Input />
                                    </Item>
    
                                </View>
    
                                <Item stackedLabel style={[styles.itemStyle, { alignSelf: 'center', width: '88%' }]}>
    
                                    <Label style={[{ color: '#333333' }, CommonStyles.DINProLight, CommonStyles.textSizeSmall]} >Waist Circumstances</Label>
                                    <Input />
                                </Item>
    
    
    
                                <Item stackedLabel style={[styles.itemStyle, { alignSelf: 'center', width: '88%' }]}>
                                    <Label style={[CommonStyles.DINProRegular, CommonStyles.textSizeSmall,]} >Head Circumstances</Label>
    
                                    <Input multiline />
                                </Item> */}


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
                            >
                                <Text
                                    onPress={() => { this._createVitals() }}
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



                        <View
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
                        </View>
                    </ImageBackground>
                </View>
            );
        } else {
            return (

                <View style={[CommonStyles.container]}>

                    <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/img/bwback.png')}>
                        <View style={{ flex: 2.3 }}>
                            <Text style={[CommonStyles.fontRegular, { marginTop: 65, paddingHorizontal: 18 }]}>
                                <Text style={[CommonStyles.textSizeLarge, CommonStyles.textColorWhite]} >{`Vital Add\n`}</Text>
                                <Text style={[CommonStyles.textSizeSmall, CommonStyles.textColorWhite]}>It is a list of your all booking patients </Text>
                            </Text>
                        </View>

                        <View style={{ flex: 8, paddingHorizontal: 18, marginTop: 33 }}>
                            <KeyboardAwareScrollView style={[styles.View2, { backgroundColor: '#fff', borderRadius: 5, }]}>
                                <Item
                                    picker
                                    style={[
                                        CommonStyles.container,
                                        CommonStyles.itemStyle,
                                        { marginVertical: 10, paddingTop: 10 },
                                    ]}>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}

                                        placeholder="Choose Frequency"
                                        placeholderStyle={{ color: '#bfc6ea' }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.selected}
                                        onValueChange={this.onValueChange.bind(this)}>
                                        <Picker.Item
                                            color="gray"
                                            selected={false}
                                            label="Select Vital Type"
                                            value=""
                                        />
                                        <Picker.Item label="Blood Glucose" value="key0" />
                                        <Picker.Item label="Blood Pressure" value="key1" />
                                        <Picker.Item label="Blood Oxygen" value="key2" />
                                    </Picker>
                                </Item>
                                {this.clickme(this.state.selected)}

                                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle]}>
                                    <Label style={[{ color: '#333333' }, CommonStyles.fontRegular, CommonStyles.textSizeSmall]} >Notes*</Label>
                                    <Input />
                                </Item>

                                {/* <View style={{ width: '88%', height: 80, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>

                                <Item stackedLabel style={[styles.itemStyle, { alignSelf: 'center', width: '46%' }]}>
                                    <Label style={[{ color: '#333333' }, CommonStyles.DINProLight, CommonStyles.textSizeSmall]} >Weight</Label>
                                    <Input />
                                </Item>

                                <Item stackedLabel style={[styles.itemStyle, { alignSelf: 'center', width: '46%' }]}>

                                    <Label style={[{ color: '#333333' }, CommonStyles.DINProLight, CommonStyles.textSizeSmall]} >Height</Label>
                                    <Input />
                                </Item>

                            </View>

                            <View style={{ width: '88%', height: 80, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>

                                <Item stackedLabel style={[styles.itemStyle, { alignSelf: 'center', width: '46%' }]}>
                                    <Label style={[{ color: '#333333' }, CommonStyles.DINProLight, CommonStyles.textSizeSmall]} >Temperature</Label>
                                    <Input />
                                </Item>

                                <Item stackedLabel style={[styles.itemStyle, { alignSelf: 'center', width: '46%' }]}>

                                    <Label style={[{ color: '#333333' }, CommonStyles.DINProLight, CommonStyles.textSizeSmall]} >Temperature Method</Label>
                                    <Input />
                                </Item>

                            </View>

                            <View style={{ width: '88%', height: 80, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>

                                <Item stackedLabel style={[styles.itemStyle, { alignSelf: 'center', width: '46%' }]}>
                                    <Label style={[{ color: '#333333' }, CommonStyles.DINProLight, CommonStyles.textSizeSmall]} >Pulse</Label>
                                    <Input />
                                </Item>

                                <Item stackedLabel style={[styles.itemStyle, { alignSelf: 'center', width: '46%' }]}>
                                    <Label style={[{ color: '#333333' }, CommonStyles.DINProLight, CommonStyles.textSizeSmall]} >Respiration</Label>
                                    <Input />
                                </Item>

                            </View>

                            <Item stackedLabel style={[styles.itemStyle, { alignSelf: 'center', width: '88%' }]}>

                                <Label style={[{ color: '#333333' }, CommonStyles.DINProLight, CommonStyles.textSizeSmall]} >Waist Circumstances</Label>
                                <Input />
                            </Item>



                            <Item stackedLabel style={[styles.itemStyle, { alignSelf: 'center', width: '88%' }]}>
                                <Label style={[CommonStyles.DINProRegular, CommonStyles.textSizeSmall,]} >Head Circumstances</Label>

                                <Input multiline />
                            </Item> */}


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
                            >
                                <Text
                                    onPress={() => { this._createVitals() }}
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



                        <View
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
                        </View>
                    </ImageBackground>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    View1: {
        flex: 2.2,
        justifyContent: 'flex-end'
    },
    textStyle: {
        fontSize: 15,
        color: '#999999',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 8
    },
    View2: {
        flex: 8,
    },
    buttonStyle: {
        //position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        height: 67,
        shadowColor: '#C3D9F0',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: .9,
        shadowRadius: 1.41,
        elevation: 3,
        backgroundColor: '#F7FAFE',
        borderWidth: 4,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        borderColor: '#fff',
        borderBottomWidth: 0,
    },
    itemStyle: {
        marginTop: 12,
        height: 50,
        borderColor: '#707070',
        //   marginTop: 10,
    },
})
