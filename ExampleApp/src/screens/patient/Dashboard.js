import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground, ScrollView, StatusBar, Button, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CommonStyles from '../../CommonStyles';
import { AsyncStorage } from 'react-native';
import { Configs } from '../../Configs';
import { ViewUtils } from '../../Utils';
import Api from '../../Api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

class Dashboard extends React.Component {

    goToPatientsRooms() {
        // appointments
        var _navigateToRoom = (appointments) => {
            if (appointments.length == 0) {
                ViewUtils.showToast('No appointments has been scheduled for your patient');
                return;
            }
            var appointmentId = appointments.reverse()[0].id;
            this.props.navigation.navigate('AppointmentRoom', { appointmentId });
        };

        Api.instance()
            .getMyAppointments()
            .then(appointments => _navigateToRoom(appointments))
            .catch(err => ViewUtils.showToast(err))
    }

    render() {
        return (
            <View style={[CommonStyles.container]}>
                <ImageBackground
                    style={[CommonStyles.container, CommonStyles.backgroundImage]}
                    source={require('../../assets/img/background.png')}
                >
                    <KeyboardAwareScrollView style={[CommonStyles.container, CommonStyles.mt30,
                    { padding: 15 }]}>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 53, height: 53, marginRight: 10 }}>
                                <Image style={[CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/img/Rectangle.png')}></Image>
                            </View>
                            <View style={{ justifyContent: 'flex-end' }}>
                                <Text style={[CommonStyles.fontMedium,
                                { fontSize: 21 }]}>Hi, Akbar Raza</Text>
                                <Text style={[CommonStyles.fontMedium,
                                CommonStyles.textSizeSmall]}>
                                    <Text>Welcome to your </Text>
                                    <Text style={[CommonStyles.fontMedium,
                                    CommonStyles.textSizeSmall,
                                    { color: '#5698FF' }]}>
                                        Health Dashboard </Text>
                                </Text>
                            </View>
                        </View>

                        <View style={{ height: 4, backgroundColor: '#297DEC', marginTop: 10, width: '80%' }}></View>

                        <View style={[CommonStyles.container, CommonStyles.mt10, CommonStyles.br5,
                        { height: 146, backgroundColor: '#9cd85b' }]}>
                            <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]}
                                source={require('../../assets/img/greenback.png')}>

                                <View style={[CommonStyles.container, CommonStyles.horizontalContainer, { padding: 15, }]}>
                                    <View style={[CommonStyles.container, { justifyContent: 'space-between', }]}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Icon name='calendar' size={26} color="#335a07" />
                                            <View style={[CommonStyles.br5, CommonStyles.padding, { backgroundColor: '#7aB43B' }]}>
                                                <Text style={CommonStyles.fontMedium, CommonStyles.centerText,

                                                    { fontSize: 29, color: '#fff' }}>34</Text>
                                            </View>
                                        </View>
                                        <Text>
                                            <Text style={CommonStyles.fontMedium, { fontSize: 14, color: '#335a07' }}>{`TOTAL UPCOMING\n`}</Text>

                                            <Text style={[CommonStyles.fontMedium, { fontSize: 20, color: '#333333' }]}>APPOINTMENTS</Text>
                                        </Text>
                                    </View>
                                    <View style={[CommonStyles.container, { justifyContent: 'space-between', alignSelf: 'flex-end', alignItems: 'flex-end' }]}>
                                        <Text style={{ fontSize: 14, color: '#335a07', lineHeight: 27, }}>
                                            <Text style={CommonStyles.fontRegular, CommonStyles.textSizeSmall, { color: '#335a07' }}>{`Next Appointment\n            In `}</Text>
                                            <Text style={CommonStyles.fontMedium, { fontSize: 17, color: '#000' }}>15 min</Text>
                                            <Text style={CommonStyles.fontRegular, CommonStyles.textSizeSmall, { color: '#335a07' }}>{`\n                      Time\n`}</Text>
                                            <Text style={CommonStyles.fontMedium, { fontSize: 17, color: '#000' }}>          9.15 am</Text>
                                        </Text>
                                    </View>

                                </View>
                            </ImageBackground>
                        </View>

                        <View style={[CommonStyles.mt10, CommonStyles.horizontalContainer, ,
                        { height: 146 }]}>


                            <TouchableOpacity style={[CommonStyles.container, CommonStyles.br5,
                            { borderColor: '#C9D7EA', 
                            borderWidth: 2, 
                            padding: 15, 
                            justifyContent: 'space-between', 
                            marginRight: 5 }]} 
                            onPress={() => this.props.navigation.navigate('MyTabs')}
                            >
                                <View style={[CommonStyles.horizontalContainer]}>
                                    <Icon name="bars" size={18} color="#C9D7EA" />
                                    <View style={[CommonStyles.centerText, CommonStyles.br5, { backgroundColor: '#ebf2f9' }]} >
                                        <Text style={[CommonStyles.fontMedium,
                                        CommonStyles.padding,
                                        CommonStyles.centerText,
                                        { fontSize: 32, color: '#297dec' }]}>34</Text>
                                    </View>
                                </View>
                                <Text style={[CommonStyles.fontMedium, { fontSize: 14, }]}>TOTAL CONSULTATION</Text>
                            </TouchableOpacity>






                            <TouchableOpacity style={[CommonStyles.container, CommonStyles.br5,
                            { borderColor: '#C9D7EA', borderWidth: 2, padding: 15, justifyContent: 'space-between', marginLeft: 5 }]}
                            onPress={() => this.props.navigation.navigate('DrProfile')}
                            >
                                <View style={[CommonStyles.horizontalContainer]}>
                                    <Icon name="bars" size={18} color="#C9D7EA" />
                                    <View style={[CommonStyles.centerText, CommonStyles.padding,
                                    CommonStyles.br5, { backgroundColor: '#ebf2f9' }]} >
                                        <Text style={[CommonStyles.fontMedium, { fontSize: 32, color: '#297dec' }]}>34</Text>
                                    </View>
                                </View>
                                <Text style={[CommonStyles.fontMedium,
                                { fontSize: 14 }]}>VIEW DOCTORS PROFILE</Text>
                            </TouchableOpacity>


                        </View>
                        <View style={[CommonStyles.container, { justifyContent: 'center', alignSelf: 'center', marginTop: 130 }
                        ]}>

                            <View style={{ width: 148, height: 29, marginLeft: -50, }}>
                                <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/img/Oval.png')}>
                                    <View style={{ width: 150, height: 94, marginTop: -75, marginLeft: 25 }}>
                                        <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                                            source={require('../../assets/img/calendar.png')}></Image>
                                    </View>

                                </ImageBackground>
                            </View>

                        </View>


                        <TouchableOpacity
                            onPress={() => this.goToPatientsRooms()}
                            style={[CommonStyles.container,
                            CommonStyles.mt10,
                            CommonStyles.centerText,
                            CommonStyles.br5,
                            { backgroundColor: '#297DEC' }]}>
                            <Text style={[CommonStyles.fontMedium,
                            CommonStyles.padding,
                            CommonStyles.centerText,
                            { color: '#fff', fontSize: 15, margin: 5 }]}>
                                CONSULTATION ROOM</Text>
                        </TouchableOpacity>
                    </KeyboardAwareScrollView>

                    <View
                        style={[
                            {
                                position: 'absolute',
                                right: 15,
                                top: 60,
                                justifyContent: 'center',
                                alignItems: 'center',
                            },
                        ]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.openDrawer(); }}>
                            <Icon name='bars' size={21} color='#303030' />
                        </TouchableOpacity>
                    </View>



                </ImageBackground >
            </View >
        );
    }
}

export default Dashboard;