import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground, ScrollView, StatusBar } from 'react-native';
import { Container, Header, Content, DatePicker, Text, Item, Label, Input, ScrollableTab, } from 'native-base';
import  CommonStyles  from '../../CommonStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Icon } from 'react-native-elements';

export default class AddReport extends Component {

    render() {
        return (
            <View style={styles.container}>
                
                    <ImageBackground style={[CommonStyles.container,  CommonStyles.backgroundImage]}
                        source={require('../../assets/drawable-xhdpi/bwback.png')}>

                        <View style={styles.View1}>
                            <Text style={{ marginHorizontal: '7%', marginBottom: 12, }}>
                                <Text style={[CommonStyles.DINAltBold, CommonStyles.textSizeLarge, { color: '#FFf', lineHeight: 28 }]} >{`Add Report\n`}</Text>
                                <Text style={[CommonStyles.SFProLight, CommonStyles.textSizeSmall, { color: '#fff', lineHeight: 16 }]}>It is a list of your all booking patients </Text>
                            </Text>
                        </View>

                        <View style={styles.View2}>

                            <TouchableOpacity style={{ marginVertical: 20 }}>
                                <Icon 
                                name="filetext1" 
                                type="antdesign"
                                size={100}
                                color="#303030"/>
                                <Icon containerStyle={{ marginTop: -40, marginRight: -65 }} name="camera" type="antdesign" size={40} color='#303030'/>
                            </TouchableOpacity>


                            <Item stackedLabel style={styles.itemStyle}>
                                <Label style={[{ color: '#333333' }, CommonStyles.DINProLight, CommonStyles.textSizeSmall]} >Title</Label>
                                <Input />
                            </Item>


                            <Item stackedLabel 
                            style={[styles.itemStyle, { marginBottom: 70 }]} >
                                <Label style={[{ color: '#333333' }, CommonStyles.DINProLight, CommonStyles.textSizeSmall]} >Description</Label>
                                <Input multiline />
                            </Item>

                        </View>

                    </ImageBackground>
            
                <TouchableOpacity style={styles.buttonStyle}>
                    <Text style={[styles.textStyle, CommonStyles.DINProRegular]}>SAVE</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'space-between'
    },
    View1: {
        flex: 2.1,
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
        marginTop: 35,
        alignSelf: 'center',
        width: '86%',
        backgroundColor: '#fff',
        borderRadius: 6,

    },
    buttonStyle: {
        position: 'absolute',
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
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        borderColor: '#fff',
        borderBottomWidth: 0,
    },
    itemStyle: {
        marginTop: 10,
        alignSelf: 'center',
        width: '88%',
        height: 50,
        borderColor: '#707070',
    },
})