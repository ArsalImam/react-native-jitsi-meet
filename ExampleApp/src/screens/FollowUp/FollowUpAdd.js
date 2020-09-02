
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, ScrollView, StatusBar } from 'react-native';
import { Container, Header, Content, DatePicker, Text, Item, Label, Input, ScrollableTab, Icon, Picker, Form } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import CommonStyles from '../../CommonStyles'
import Api from '../../Api';
import Loader from '../../components/Loader';
import { ViewUtils } from '../../Utils'

export default class FollowUpAdd extends Component {

    constructor(props) {
        super(props);
        if (this.props.route.params) {

            this.state = {
                isLoading: false,
                name: '',
                startDate: '',
                data: [],
                appointmentId: this.props.route.params.appointmentId,
                patientId: this.props.route.params.patientId,
            }
        } else {

            this.state = {
                isLoading: false,
                name: '',
                startDate: '',
                data: []
            }
        }
    }

    _saveFollowUp = () => {

        let data = {
            "setupType": "followUp",
            date: this.state.startDate,
        }

        
        if(this.state.name != ""){
            this.setState({ isLoading: true })
            Api.instance()
            .createMedication(data)
            .then(response => {
               // this.props.navigation.replace('DiagnosisList');
                this.props.route.params.onFollowUpAdd();
                this.props.navigation.goBack();
                ViewUtils.showToast('FollowUp has been saved successfully!');
            })
            .catch(err => {
                ViewUtils.showAlert(
                    'Unable to Perform this Action',       
                );
               // ViewUtils.showToast(err);
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
        }else {
            ViewUtils.showAlert(
                'Please Provide followUp Name',       
            );    
        }
        
    };
    render() {
        if (this.state.appointmentId != null) {
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
                                <Text style={[CommonStyles.textSizeLarge, CommonStyles.textColorWhite]} >{`FollowUp Add\n`}</Text>
                                <Text style={[CommonStyles.textSizeSmall, CommonStyles.textColorWhite]}>It is a list of your all booking patients </Text>
                            </Text>
                        </View>

                        <View style={{ flex: 8, paddingHorizontal: 18, marginTop: 33 }}>
                            <KeyboardAwareScrollView style={[{ backgroundColor: '#fff', borderRadius: 5, }]}>

                            <Label
                  style={[
                    {marginTop: 10, alignSelf: 'center', width: '88%'},
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeSmall,
                  ]}>
                  Start Date{' '}
                </Label>

                <Item style={[CommonStyles.container, CommonStyles.itemStyle]}>
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date()}
                    locale={'en'}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'default'}
                    placeHolderText="mm/dd/yyyy"
                    textStyle={[CommonStyles.fontRegular]}
                    placeHolderTextStyle={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeAverage,

                      {
                        paddingBottom: 12,
                        marginLeft: -10,
                      },
                    ]}
                    value={this.state.startDate}
                    onDateChange={val => this.setState({startDate: val})}
                    disabled={false}
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
                                    borderColor: '#FFF'
                                },
                            ]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this._saveFollowUp();
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

                        {/* <View
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
                        </View> */}
                    </ImageBackground>
                </View>
            );
        } else {
            return (

                <View style={[CommonStyles.container]}>

                    <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/img/bwback.png')}>
                        <View style={{ flex: 2.3 }}>
                            <Text style={[CommonStyles.fontRegular, CommonStyles.headingTextStyle]}>
                                <Text style={[CommonStyles.textSizeLarge, CommonStyles.textColorWhite]} >{`FollowUp Add\n`}</Text>
                                <Text style={[CommonStyles.textSizeSmall, CommonStyles.textColorWhite]}>It is a list of your all booking patients </Text>
                            </Text>
                        </View>

                        <View style={{ flex: 8, paddingHorizontal: 18, marginTop: 33 }}>
                            <KeyboardAwareScrollView style={[{ backgroundColor: '#fff', borderRadius: 5, }]}>

                            <Label
                  style={[
                    {marginTop: 10, alignSelf: 'center', width: '88%'},
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeSmall,
                  ]}>
                  Start Date{' '}
                </Label>

                <Item style={[CommonStyles.container, CommonStyles.itemStyle]}>
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date()}
                    locale={'en'}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'default'}
                    placeHolderText="mm/dd/yyyy"
                    textStyle={[CommonStyles.fontRegular]}
                    placeHolderTextStyle={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeAverage,

                      {
                        paddingBottom: 12,
                        marginLeft: -10,
                      },
                    ]}
                    value={this.state.startDate}
                    onDateChange={val => this.setState({startDate: val})}
                    disabled={false}
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
                                    borderColor: '#FFF'
                                },
                            ]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this._saveFollowUp();
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

                        {/* <View
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
                        </View> */}
                    </ImageBackground>
                </View>
            );
        }
    }
}