import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, ScrollView, StatusBar } from 'react-native';
import { Container, Header, Content, DatePicker, Text, Item, Label, Input, ScrollableTab, } from 'native-base';
import  CommonStyles from '../../CommonStyles'
export default class Vital extends Component {
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

            <View style={styles.container}>

                <ImageBackground style={[ CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/drawable-xhdpi/bwback.png')}>
                    <View style={styles.View1}>
                        <Text style={{ marginHorizontal: '7%', marginBottom: 15 }}>
                            <Text style={[CommonStyles.DINAltBold, CommonStyles.textSizeLarge, { color: '#FFf', lineHeight: 28}]} >{`Vital Add\n`}</Text>
                            <Text style={[CommonStyles.SFProLight, CommonStyles.textSizeSmall, { color: '#fff', lineHeight: 16 }]}>It is a list of your all booking patients </Text>
                        </Text>
                    </View>

                    <View style={styles.View2}>
                        <ScrollView style={[styles.View2, { marginTop: 33, alignSelf: 'center', width: '86%', backgroundColor: '#fff', borderRadius: 5, }]}>
                            <Item stackedLabel style={[styles.itemStyle, { alignSelf: 'center', width: '88%' }]}>
                                <Label style={[{ color: '#333333' }, CommonStyles.DINProLight, CommonStyles.textSizeSmall]} >Systolic Blood Pressure</Label>
                                <Input />
                            </Item>

                            <Item stackedLabel style={[styles.itemStyle, { alignSelf: 'center', width: '88%' }]}>
                                <Label style={[{ color: '#333333' }, CommonStyles.DINProLight, CommonStyles.textSizeSmall]} >Diastolic Blood Pressure</Label>
                                <Input />
                            </Item>

                            <View style={{ width: '88%', height: 80, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>

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
                                <Label style={[ CommonStyles.DINProRegular, CommonStyles.textSizeSmall,]} >Head Circumstances</Label>
                               
                                <Input multiline />
                               </Item>
                            

                        </ScrollView>


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