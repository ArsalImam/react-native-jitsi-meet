import React, {Component} from 'react';
import {ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {DatePicker, Icon, Input, Item, Label, Picker, Text} from 'native-base';
import Api from '../../Api';

import CommonStyles from '../../CommonStyles'

import DateTimePicker from '@react-native-community/datetimepicker';
import {ViewUtils} from "../../Utils";

export default class CreateClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userObj: {},
            joinedDate: new Date(),
            chosenDate: new Date(),
            date: new Date(1598051730000),
            attendAt: new Date(),
            leftAt: new Date(),
            setMode: '',
            mode: 'time',
            show: false,
            showStartTimePicker: false,
            showEndTimePicker: false,
            clinicFrequency: '',
            clinicFrequencyText: '',
            numberOfClinics: 0,
            appointmentSlots: '',
            appointmentSlotsText: '',
            clinicTitle: '',
            clinicObj: {},
        };
        this.setDate = this.setDate.bind(this);
    }

    componentDidMount() {
        Api.instance()._user()
            .then((data) => {
                    this.setState({userObj: data});
                }
            ).catch(err => console.log(err));
    }

    setDate(newDate) {
        this.setState({chosenDate: newDate});
    }

    SelectattendAt = (event) => {
        let timeStamp = event.nativeEvent.timestamp;
        event.type === 'set' ? this.setState({attendAt: new Date(timeStamp),showStartTimePicker:false}) : this.setState({attendAt: null,showStartTimePicker:false});

    };
    SelectleftAt = (event) => {
        let timeStamp = event.nativeEvent.timestamp;
        event.type === 'set' ? this.setState({leftAt: new Date(timeStamp),showEndTimePicker:false}) : this.setState({leftAt: null,showEndTimePicker:false});
    };

    showTimepicker = (time) => {
        time === 'start' ? this.setState({showStartTimePicker: true}) : this.setState({showEndTimePicker: true})
    };

    onValueChange(value) {
        this.setState({
            clinicFrequency: value
        });
    }



    titleChange = (event) => {
        if (/^\d+$/.test(event)) {
            this.setState({
                clinicTitle: event
            });
        }
    }

    handleInputChangeWeeks = (text) => {

        if (/^\d+$/.test(text)) {
            this.setState({
                numberOfClinics: text
            });
        }
    }
    handleInputChangeSlots = (event) => {
        if (/^\d+$/.test(event)) {
            this.setState({
                appointmentSlots: event
            });
        }
    }


    createClinic() {

          switch (parseInt(this.state.appointmentSlots)) {
              case 300000:
                  this.setState({appointmentSlotsText: '5 Minutes'});
                  break;
              case 600000:
                  this.setState({appointmentSlotsText: '10 Minutes'});
                  break;

              case 900000:
                  this.setState({appointmentSlotsText: '15 Minutes'});

                  break;

              case 1200000:
                  this.setState({appointmentSlotsText: '20 Minutes'});

                  break;
              case 1800000:
                  this.setState({appointmentSlotsText: '30 Minutes'});

                  break;

              default:
                  break;

          }


          switch (parseInt(this.state.clinicFrequency)) {
              case 604799000:
                  this.setState({clinicFrequencyText: 'Every Week'});
                  break;
              case 1209599000:
                  this.setState({clinicFrequencyText: 'Alternate Week'});
                  break;

              default:
                  break;

          }

          var attendedAtDate = new Date(`1970-01-01 ${this.state.attendAt}`);
          var leftAtDate = new Date(`1970-01-01 ${this.state.leftAt}`);
          var selectedDate = new Date(this.state.joinedDate);
          selectedDate.setMonth(selectedDate.getMonth());


          this.state.clinicObj.doctorId = this.state.userObj.id;
          this.state.clinicObj.joinedDate = selectedDate.toString();
          this.state.clinicObj.attendAt = attendedAtDate.getTime();
          this.state.clinicObj.leftAt = leftAtDate.getTime();
          this.state.clinicObj.frequency = parseInt(this.state.clinicFrequency);
          this.state.clinicObj.numOfClinics = this.state.numberOfClinics;
          this.state.clinicObj.appointmentSlots = parseInt(this.state.appointmentSlots);
          this.state.clinicObj.name = this.state.clinicTitle;
          this.state.clinicObj.frequencyText = this.state.clinicFrequencyText;
          this.state.clinicObj.appointmentSlotsText = this.state.appointmentSlotsText;
console.log(this.state.clinicObj);
          Api.instance().createClinic(this.state.clinicObj)
              .then(res => {
                  this.props.navigation.navigate('MyTabs')

              })
              .catch(err => {
                  ViewUtils.showToast(err);
              })
              .finally(() => {
                  this.setState({showLoader: false})
              });
    }

    render() {
        return (

            <View style={styles.container}>

                <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]}
                                 source={require('../../assets/drawable-xhdpi/bwback.png')}>
                    <View style={styles.View1}>
                        <Text style={{marginHorizontal: '7%', marginBottom: 15}}>
                            <Text style={[CommonStyles.DINAltBold, CommonStyles.textSizeLarge, {
                                color: '#FFf',
                                lineHeight: 28
                            }]}>{`Create Clinic\n`}</Text>
                            <Text style={[CommonStyles.SFProLight, CommonStyles.textSizeSmall, {
                                color: '#fff',
                                lineHeight: 16
                            }]}>to create clinic </Text>
                        </Text>

                    </View>

                    <View style={styles.View2}>
                        <ScrollView style={[styles.View2, {
                            marginTop: 33,
                            alignSelf: 'center',
                            width: '86%',
                            backgroundColor: '#fff',
                            borderRadius: 5,
                        }]}>
                            <Item style={[styles.itemStyle, {alignSelf: 'center', width: '50%'}]}>
                                {/*<Label  style={[{color: '#333333'}, CommonStyles.DINProLight, CommonStyles.textSizeSmall]}></Label>*/}

                                <DatePicker
                                    defaultDate={new Date()}
                                    minimumDate={new Date()}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Select date"
                                    textStyle={{color: "gray"}}
                                    placeHolderTextStyle={{color: "gray"}}
                                    onDateChange={this.setDate}
                                    disabled={false}
                                />
                                <Icon active name='calendar' style={{marginLeft: 20}}/>

                            </Item>

                            <Item onPress={() => {
                                this.showTimepicker('start');
                            }} style={[styles.itemStyle, {alignSelf: 'center', width: '50%'}]}>

                                <Label
                                    style={[{color: '#333333'}, CommonStyles.DINProLight, CommonStyles.textSizeSmall]}>Select
                                    To</Label>
                                {this.state.showStartTimePicker && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={this.state.date}
                                        mode='time'
                                        is24Hour={true}
                                        display="clock"
                                        onChange={this.SelectattendAt}
                                    />
                                )}
                            </Item>

                            <Item onPress={() => {
                                this.showTimepicker('end');
                            }} style={[styles.itemStyle, {alignSelf: 'center', width: '50%'}]}>

                                <Label
                                    style={[{color: '#333333'}, CommonStyles.DINProLight, CommonStyles.textSizeSmall]}>Select
                                    End Date</Label>
                                {this.state.showEndTimePicker && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={this.state.date}
                                        mode='time'
                                        is24Hour={true}
                                        display="clock"
                                        onChange={this.SelectleftAt}
                                    />
                                )}
                            </Item>

                            <Item picker stackedLabel style={[styles.itemStyle, {alignSelf: 'center', width: '88%'}]}>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down"/>}
                                    style={{width: '92%'}}
                                    placeholder="Choose Frequency"
                                    placeholderStyle={{color: "#bfc6ea"}}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.clinicFrequency}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    <Picker.Item color='gray' selected={false} label="Choose Frequency" value=""/>
                                    <Picker.Item label="Every Week" value="604799000"/>
                                    <Picker.Item label="Alternate Week" value="1209599000"/>
                                </Picker>
                            </Item>


                            <  Item stackedLabel style={[styles.itemStyle, {alignSelf: 'center', width: '88%'}]}>
                                <Label
                                    style={[{color: '#333333'}, CommonStyles.DINProLight, CommonStyles.textSizeSmall]}>Number
                                    of Weeks</Label>
                                <Input name="clinics" value={this.state.numberOfClinics}
                                       onChange={this.handleInputChangeWeeks.bind(this)} keyboardType="number-pad"/>
                            </Item>


                            <Item picker stackedLabel style={[styles.itemStyle, {alignSelf: 'center', width: '88%'}]}>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down"/>}
                                    style={{width: '92%'}}
                                    placeholder="Choose Frequency"
                                    placeholderStyle={{color: "#bfc6ea"}}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.appointmentSlots}
                                    onValueChange={this.handleInputChangeSlots.bind(this)}
                                >
                                    <Picker.Item color='gray' selected={false} label="Appointment Slots" value=""/>
                                    <Picker.Item label="5 Minutes" value="300000"/>
                                    <Picker.Item label="10 Minutes" value="600000"/>
                                    <Picker.Item label="15 Minutes" value="900000"/>
                                    <Picker.Item label="20 Minutes" value="1200000"/>
                                    <Picker.Item label="30 Minutes" value="1800000"/>

                                </Picker>
                            </Item>
                            <Item stackedLabel style={[styles.itemStyle, {alignSelf: 'center', width: '46%'}]}>
                                <Label
                                    style={[{color: '#333333'}, CommonStyles.DINProLight, CommonStyles.textSizeSmall]}>Title</Label>
                                <Input onChange={this.titleChange.bind(this)}/>
                            </Item>


                            <Item stackedLabel style={[styles.itemStyle, {alignSelf: 'center', width: '46%'}]}>
                                <Label
                                    style={[{color: '#333333'}, CommonStyles.DINProLight, CommonStyles.textSizeSmall]}> </Label>
                                <Input/>
                            </Item>


                        </ScrollView>


                    </View>
                    <TouchableOpacity onPress={() => {
                        this.createClinic();
                    }} style={styles.buttonStyle}>
                        <Text style={[styles.textStyle, CommonStyles.DINProRegular]}>SAVE</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
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
