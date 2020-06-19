import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Button } from 'native-base';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { Icon } from 'react-native-elements'


function MenuSlider(props) {
    return (
        <View style={styles.container}>
                <DrawerContentScrollView>

                    <View style={{ marginTop: 15, alignItems: 'center' }}>
                        {/* <Avatar.Image style={{ backgroundColor: '#3976bb' }}
                            source={{
                                uri: 'https://facebook.github.io/react/img/logo_og.png'
                            }}
                            size={100}
                        /> */}
                        <View style={{ height: 90, width: 90, borderRadius: 45, alignContent: 'center', justifyContent: 'center', borderWidth: 2}}>
                            <Icon
                                name="person"
                                size={80}
                                type='material'
                            />
                        </View>

                        <Title style={{ fontSize: 15, fontWeight: 'bold', marginVertical: 10 }}>Akbar Raza</Title>
                        <View style={{ height: 2, backgroundColor: '#707070', width: '55%', marginVertical: 10 }}></View>
                    </View>

                    <Drawer.Section>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="user"
                                    color={color}
                                    size={size}
                                    type='feather'
                                />
                            )}
                            label="Personal Profile"
                        //onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem style={{ marginLeft: '24%' }}
                            icon={({ color, size }) => (
                                <Icon
                                    name="clipboard-notes"
                                    color={color}
                                    size={size}
                                    type='foundation'
                                />
                            )}
                            label="Demographics"
                        onPress={() => {props.navigation.navigate('Demographics')}}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="adduser"
                                    color={color}
                                    size={size}
                                    type='antdesign'
                                />
                            )}
                            label="Medical Profile"
                        //onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem style={{ marginLeft: '23%' }}
                            icon={({ color, size }) => (
                                <Icon
                                    name="activity"
                                    color={color}
                                    size={size}
                                    type='feather'
                                />
                            )}
                            label="Vital"
                            onPress={() => { props.navigation.navigate('Vital') }}
                        />
                        <DrawerItem style={{ marginLeft: '23%' }}
                            icon={({ color, size }) => (
                                <Icon
                                    name="medicinebox"
                                    color={color}
                                    size={size}
                                    type='antdesign'
                                />
                            )}
                            label="Medication"
                            onPress={() => { props.navigation.navigate('MadicationAdd') }}
                        />
                        <DrawerItem style={{ marginLeft: '23%' }}
                            icon={({ color, size }) => (
                                <Icon
                                    name="bed"
                                    color={color}
                                    size={size}
                                    type='font-awesome'
                                />
                            )}
                            label="Medical Condition"
                            onPress={() => {props.navigation.navigate('MedicalCondition')}}
                        />
                        <DrawerItem style={{ marginLeft: '23%' }}
                            icon={({ color, size }) => (
                                <Icon
                                    name="ios-flower"
                                    color={color}
                                    size={size}
                                    type='ionicon'
                                />
                            )}
                            label="Allergies"
                            onPress={() => { props.navigation.navigate('BookingList') }}
                        />
                        <DrawerItem style={{ marginLeft: '23%' }}
                            icon={({ color, size }) => (
                                <Icon
                                    name="box-cutter"
                                    color={color}
                                    size={size}
                                    type='material-community'
                                />
                            )}
                            label="Surgeries"
                         //   onPress={() => { props.navigation.navigate('Sample') }}
                        />
                        <DrawerItem style={{ marginLeft: '23%' }}
                            icon={({ color, size }) => (
                                <Icon
                                    name="tooth-outline"
                                    color={color}
                                    size={size}
                                    type='material-community'
                                />
                            )}
                            label="Dental Issue"
                       // onPress={() => {props.navigation.navigate('Patients')}}
                        />
                        <DrawerItem style={{ marginLeft: '25%' }}
                            icon={({ color, size }) => (
                                <Icon
                                    name="clipboard-notes"
                                    color={color}
                                    size={size}
                                    type='foundation'
                                />
                            )}
                            label="Reports"
                            onPress={() => { props.navigation.navigate('AddReport') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="settings"
                                    color={color}
                                    size={size}
                                    type='feather'
                                />
                            )}
                            label="Settings"
                        //onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem style={{ marginLeft: '23%' }}
                            icon={({ color, size }) => (
                                <Icon
                                    name="bell"
                                    color={color}
                                    size={size}
                                    type='feather'
                                />
                            )}
                            label="Change Ringtone"
                          //  onPress={() => { props.navigation.navigate('VitalAdd') }}
                        />

                    </Drawer.Section>

                </DrawerContentScrollView>

                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="exit-to-app"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Sign Out"
                        onPress={() => { props.navigation.navigate('Login')}}
                    />
                </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebf2f9',
        alignContent: 'center',
    },
    textStyle: {
        fontSize: 22,
        color: '#fff',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 12
    },
    buttonStyle: {
        width: '80%',
        height: 60,
        backgroundColor: 'black',
        borderRadius: 10,
    }
})

export default MenuSlider;