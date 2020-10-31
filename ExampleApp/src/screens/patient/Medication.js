import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, ScrollView, StatusBar} from 'react-native';
import { Container, Header, Content,  Text, Item, Label, Input, ScrollableTab, } from 'native-base';
import  CommonStyles  from '../../CommonStyles';

import {DatePicker} from 'react-native-propel-kit';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

export default class Madication extends React.Component {
    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date() };
        this.setDate = this.setDate.bind(this);
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }
    render() {
        return (
            <View style={[CommonStyles.container]}>

                <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/drawable-xhdpi/bwback.png')}>

                    <View style={styles.View1}>
                        <Text style={{marginHorizontal: '7%', marginBottom: 12,}}>
                            <Text style={[CommonStyles.DINAltBold, CommonStyles.textSizeLarge, {color: '#FFf', lineHeight: 28}]} >{`Medicine Add\n`}</Text>
                            <Text style={[CommonStyles.SFProLight, CommonStyles.textSizeSmall, {color: '#fff', lineHeight: 16}]}>It is a list of all your Medications </Text>
                        </Text>
                    </View>

                    <View style={styles.View2}>

                        <Item stackedLabel style={styles.itemStyle}>
                            <Label style={[{color: '#333333', justifyContent: 'flex-start'}, CommonStyles.DINProLight, CommonStyles.textSizeSmall]} >Title</Label>
                            <Input />
                        </Item>

                        <Item stackedLabel style={styles.itemStyle}>
                            <Label style={[{color: '#333333'}, CommonStyles.DINProLight, CommonStyles.textSizeSmall]}>Start Date  </Label>
                            <DatePicker style={{ width: '100%' }}
                                defaultDate={new Date(2020, 4, 1)}
                                minimumDate={new Date(2018, 1, 1)}
                                maximumDate={new Date(2022, 12, 31)}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="  "
                                textStyle={{ color: '#3976bb' }}
                                placeHolderTextStyle={{ color: "black" }}
                                onDateChange={this.setDate}
                                disabled={false}
                            />
                        </Item>

                        <Item stackedLabel style={styles.itemStyle}>
                            <Label style={[{color: '#333333'}, CommonStyles.DINProLight, CommonStyles.textSizeSmall]}>End Date    </Label>
                            <DatePicker style={{ alignSelf: 'flex-start' }}
                                defaultDate={new Date(2020, 4, 7)}
                                minimumDate={new Date(2018, 1, 1)}
                                maximumDate={new Date(2022, 12, 31)}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="  "
                                textStyle={{ color: '#3976bb' }}
                                placeHolderTextStyle={{ color: "black" }}
                                onDateChange={this.setDate}
                                disabled={false}
                            />
                        </Item>

                        <Item stackedLabel style={[styles.itemStyle, {marginBottom: 100, }]} >
                            <Label style={[{color: '#333333'}, CommonStyles.DINProLight, CommonStyles.textSizeSmall]} > Diagnosis</Label>
                            <Input multiline />
                        </Item>

                    </View>

                    <TouchableOpacity style={styles.buttonStyle}>
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
        flex: 2.3,
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
        marginTop: 40,
        alignSelf: 'center',
        width: '86%',
        backgroundColor: '#fff',
        borderRadius: 5,

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
        marginTop: 10,
        alignSelf: 'center',
        alignContent: 'flex-start',
    //    justifyContent: "flex-start",
        width: '88%',
        height: 50,
        borderColor: '#707070',
        //   marginTop: 10,
    },
})
