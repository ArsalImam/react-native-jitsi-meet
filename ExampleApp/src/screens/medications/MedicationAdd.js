import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, ScrollView, StatusBar } from 'react-native';
import { Container, Header, Content, DatePicker, Text, Item, Label, Input, ScrollableTab, Icon, Picker, Form } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import CommonStyles from '../../CommonStyles'
import Api from '../../Api';
import Loader from '../../components/Loader';
import { ViewUtils } from '../../Utils'

export default class MedicationAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            drugName: '',
            drugBrand: '',
            drugSku: '',
            description: '',
            data: []

        };

        this.props.route.params = [
            {
                appointmentId:""
            }
        ];
    }

    _saveMedication = () => {

        let data = {
            "setupType": "medication",
            "name": this.state.drugName,
            "description": this.state.description,
            "drugBrand": this.state.drugBrand,
            "drugSku": this.state.drugSku

        }

        

        if(this.state.drugName != "" ){
            this.setState({ isLoading: true })
            Api.instance()
            .createMedication(data)
            .then(response => {
                this.props.navigation.navigate('MedicationList');
               
                ViewUtils.showToast('Medication has been saved successfully!');
                
            })
            .catch(err => {
                ViewUtils.showAlert(
                    'Unable to Perform this Action',       
                );
                //ViewUtils.showToast(err);
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
        }else{
            ViewUtils.showAlert(
                'Please Provide Medication Name',       
            );
        }

        
    };
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
                            <Text style={[CommonStyles.fontRegular, CommonStyles.headingTextStyle]}>
                                <Text style={[CommonStyles.textSizeLarge, CommonStyles.textColorWhite]} >{`Medication Add\n`}</Text>
                                <Text style={[CommonStyles.textSizeSmall, CommonStyles.textColorWhite]}>It is a list of your all booking patients </Text>
                            </Text>
                        </View>

                        <View style={{ flex: 8, paddingHorizontal: 18, marginTop: 33 }}>
                            <KeyboardAwareScrollView style={[{ backgroundColor: '#fff', borderRadius: 5, }]}>

                                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 20 }]}>
                                    <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Drug Name*</Label>
                                    <Input
                                        value={this.state.notes}
                                        onChangeText={val => this.setState({ drugName: val })}
                                        style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]} />
                                </Item>
                                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 10 }]}>
                                    <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Drug Brand*</Label>
                                    <Input
                                        value={this.state.notes}
                                        onChangeText={val => this.setState({ drugBrand: val })}
                                        style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]} />
                                </Item>

                                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 10 }]}>
                                    <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Drug SKU*</Label>
                                    <Input
                                        value={this.state.notes}
                                        onChangeText={val => this.setState({ drugSku: val })}
                                        style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]} />
                                </Item>

                                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 10 }]}>
                                    <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Description</Label>
                                    <Input
                                        value={this.state.notes}
                                        onChangeText={val => this.setState({ description: val })}
                                        multiline={true}
                                        style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]} />
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
                                    this._saveMedication();
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
                                <Text style={[CommonStyles.textSizeLarge, CommonStyles.textColorWhite]} >{`Medication Add\n`}</Text>
                                <Text style={[CommonStyles.textSizeSmall, CommonStyles.textColorWhite]}>It is a list of your all booking patients </Text>
                            </Text>
                        </View>

                        <View style={{ flex: 8, paddingHorizontal: 18, marginTop: 33 }}>
                            <KeyboardAwareScrollView style={[{ backgroundColor: '#fff', borderRadius: 5, }]}>

                                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 20 }]}>
                                    <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Drug Name*</Label>
                                    <Input
                                        value={this.state.notes}
                                        onChangeText={val => this.setState({ drugName: val })}
                                        style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]} />
                                </Item>
                                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 10 }]}>
                                    <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Drug Brand*</Label>
                                    <Input
                                        value={this.state.notes}
                                        onChangeText={val => this.setState({ drugBrand: val })}
                                        style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]} />
                                </Item>

                                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 10 }]}>
                                    <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Drug SKU*</Label>
                                    <Input
                                        value={this.state.notes}
                                        onChangeText={val => this.setState({ drugSku: val })}
                                        style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]} />
                                </Item>

                                <Item stackedLabel style={[CommonStyles.container, CommonStyles.itemStyle, { marginTop: 10 }]}>
                                    <Label style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>Description</Label>
                                    <Input
                                        value={this.state.notes}
                                        onChangeText={val => this.setState({ description: val })}
                                        multiline={true}
                                        style={[CommonStyles.fontRegular, CommonStyles.textSizeMedium]} />
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
                                    this._saveMedication();
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