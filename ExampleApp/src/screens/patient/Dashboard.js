import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground, ScrollView, StatusBar, Button, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FlatGrid } from 'react-native-super-grid'
import { CommonStyles } from '../../CommonStyles';
import { AsyncStorage } from 'react-native';
import { Configs } from '../../Configs';


export default class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            isLoading: true,
        };
        this.arrayholder = [];
    }
    componentDidMount() {
        console.log('dashboard');
        this._retrieveData().then((res) => {
            console.log(JSON.parse(res));
        })

        fetch(`${Configs.baseUrl}Clients`)
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    data: responseJson
                })
            })
            .catch(error => console.log(error)) //to catch the errors if any
    }


    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('userObject');
            if (value !== null) {
                // We have data!!

                return value;
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    render() {

        const { data, isLoading } = this.state;

        const main = [
            { name: 'APPOINTMENTS', code: '#9ed75f', number: '10', icon: 'calendar', route: '' }
        ];
        const items = [
            { name: 'TOTAL CONSULTATIONS', number: '34', code: '#00000000', icon: 'bars', route: 'Patients' },
            { name: 'VIEW DOCTORS PROFILE', number: '98', code: '#00000000', icon: 'bars', route: 'DrProfile' },
        ];
        return (
            <View style={[CommonStyles.container, { justifyContent: 'space-between' }]}>
                <ImageBackground style={CommonStyles.backgroundImage} source={require('../../assets/drawable-xhdpi/background.png')}>
                    <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'} />
                    <View style={styles.myView1}>
                        <View style={styles.View1}>
                            <View style={styles.imageView}>
                                <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../../assets/drawable-xxxhdpi/Rectangle.png')}></Image>
                            </View>
                            <View style={styles.TextView}>
                                <Text style={[CommonStyles.DINAltBold, { fontSize: 21, lineHeight: 28, }]}>Hi, Akbar Raza</Text>
                                <Text style={[CommonStyles.DINAltBold, { fontSize: 12, }]}>
                                    <Text>Welcome to your</Text>
                                    <Text style={[CommonStyles.SFProBold, { color: '#5698FF', fontSize: 12, fontWeight: '500' }]}> Health Dashboard </Text>
                                </Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.myView2}>

                        <View style={styles.View2}>
                            <FlatGrid
                                itemDimension={320} items={main}
                                style={styles.gridView}
                                //staticDimension={300}
                                //fixed
                                // spacing={20}
                                renderItem={({ item, index }) => (
                                    <View style={[styles.greenBoxContainer]}>
                                        <ImageBackground style={{ width: null, height: null, resizeMode: 'cover', borderRadius: 5 }} source={require('../../assets/drawable-xhdpi/greenback.png')}>
                                            <View style={styles.flexDirectionView}>
                                                <View style={[styles.gContainer, { justifyContent: 'space-evenly', width: '56%', paddingLeft: 13 }]}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Icon name={item.icon} size={26} color="#335a07" />
                                                        <View style={{ backgroundColor: '#7aB43B', height: 50, width: 59, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                                                            <Text style={CommonStyles.DINAltBold, { fontSize: 40, color: '#fff' }}>{item.number}</Text>
                                                        </View>
                                                    </View>
                                                    <Text>
                                                        <Text style={CommonStyles.DINProLight, { fontSize: 14, color: '#335a07', lineHeight: 19 }}>{`TOTAL UPCOMING\n`}</Text>

                                                        <Text style={[CommonStyles.DINProRegular, { fontSize: 20, color: '#333333', lineHeight: 30 }]}>{item.name}</Text>
                                                    </Text>
                                                </View>
                                                <View style={[styles.gContainer, { alignItems: 'flex-end', alignSelf: 'flex-end', justifyContent: 'center', marginRight: 5, paddingRight: 13 }]}>
                                                    <Text style={{ fontSize: 14, color: '#335a07', lineHeight: 30}}>
                                                        <Text style={CommonStyles.DINProLight, { fontSize: 12, color: '#335a07' }}>{`Next Appointment\n          In `}</Text>
                                                        <Text style={CommonStyles.DINProRegular, { fontSize: 17, color: '#000' }}>15 min</Text>
                                                        <Text style={CommonStyles.DINProLight, { fontSize: 12, color: '#335a07' }}>{`\n                      Time\n`}</Text>
                                                        <Text style={CommonStyles.DINProRegular, { fontSize: 17, color: '#000' }}>        9.15 am</Text>
                                                    </Text>
                                                </View>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                )}
                            />
                            <FlatGrid
                                itemDimension={146}
                                items={items}
                                style={styles.gridView}
                                //staticDimension={300}
                                // fixed
                                // spacing={20}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate(`${item.route}`)}>

                                        <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                                            <View style={styles.flexDirectionView}>
                                                <Icon name={item.icon} size={18} color="#C9D7EA" />
                                                <View style={styles.TextNumberView}>
                                                    <Text style={[CommonStyles.DINAltBold, { fontSize: 32, color: '#297dec' }]}>{item.number}</Text>
                                                </View>
                                            </View>
                                            <Text style={[CommonStyles.DINProMedium, { fontSize: 13, lineHeight: 20 }]}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )} />
                        </View>

                        <View style={styles.View3}>

                            <View style={{ width: 148, height: 29, marginLeft: -50, marginBottom: 8 }}>
                                <ImageBackground style={{ width: '100%', height: '100%', resizeMode: 'center' }} source={require('../../assets/drawable-xxxhdpi/Oval.png')}>
                                    <View style={{ width: 150, height: 94, marginTop: -75, marginLeft: 25 }}>
                                        <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../../assets/drawable-xxxhdpi/calendar.png')}></Image>
                                    </View>

                                </ImageBackground>
                            </View>


                            <TouchableOpacity style={styles.ButtonStyle}
                                onPress={() => this.props.navigation.navigate('AppointmentRoom')}
                            >
                                <Text style={[CommonStyles.DINProMedium, { color: '#fff', fontSize: 15 }]}>CREATE APPOINTMENT</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View
                        style={[
                            {
                                position: 'absolute',
                                right: 0,
                                top: 40,
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                            },
                        ]}>
                        <TouchableOpacity onPress={() => { this.props.navigation.openDrawer(); }}>
                            <Icon name='bars' size={21} color='#303030' />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    View1: {
        flexDirection: 'row',
    },
    myView1: {
        borderBottomWidth: 5,
        borderColor: '#297DEC',
        flex: 1.5,
        justifyContent: 'flex-end',
        marginLeft: '6%',
        marginRight: '25%',
    },
    myView2: {
        flex: 8,
        alignSelf: 'center',
        marginHorizontal: 8,
        marginVertical: 10,
        justifyContent: 'space-between',
    },
    imageView: {
        width: 53,
        height: 53,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    TextView: {
        marginLeft: 12,
        height: 65,
        justifyContent: 'center'
    },
    View2: {
        flexGrow: 2,
        alignSelf: 'center',
        width: '100%',

    },
    View3: {
        flexGrow: 0.8,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    ButtonStyle: {
        height: 52,
        width: '91%',
        shadowColor: '#8BB3E9',
        marginVertical: 10,
        borderRadius: 4,
        backgroundColor: '#297dec',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridView: {
        flex: 1
    },
    gContainer: {
        borderRadius: 5,
        height: 146,
    },
    itemContainer: {
        justifyContent: 'space-evenly',
        borderRadius: 5,
        paddingHorizontal: 16,
        height: 146,
        borderWidth: 2,
        borderColor: '#C9D7EA'

    },
    greenBoxContainer: {
        height: '100%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#9cd85b',
        backgroundColor: '#9cd85b',
    },
    TextNumberView: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ebf2f9',
        borderRadius: 4
    },
    flexDirectionView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})