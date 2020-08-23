import React, { Component } from 'react';
import Api from '../../Api';
import CommonStyles from '../../CommonStyles';
import { ListItem, CheckBox, Divider } from 'react-native-elements';
import { Icon } from 'native-base';
import { FlatGrid } from 'react-native-super-grid';
import { CommonActions } from '@react-navigation/native';
import { StyleSheet, Text, View, ImageBackground, StatusBar, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Loader from '../../components/Loader';
import BloodGlucose from '../../components/BloodGlucose';

export default class VitalList extends Component {

    constructor(props) {
        super(props);
        if (this.props.route.params) {

            this.state = {
                isLoading: false,
                vitalList: [],
                appointmentId: this.props.route.params.appointmentId,
                patientId: this.props.route.params.patientId,
            }
        } else {

            this.state = {
                isLoading: false,
                vitalList: [],
            }
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true })

        Api.instance().getVitalList()
            .then((data) => {
                console.warn('=====>', data["Vitals"])
                this.setState({ vitalList: data["Vitals"] });
            }
            ).catch(err => console.log(err))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }

    addToConsultation(item) {
        Api.instance().addReport(item, this.state.appointmentId, this.state.patientId)
            .then(response => {
                console.warn(response);
                this.props.navigation.goBack();
            }).catch(err => {

            })
            .finally(() => {

            });
    }


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
                            <Text style={{ color: '#FFFFFF', paddingLeft: 17, marginTop: 65 }}>
                                <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeLarge,]} >{`Vital List\n`}</Text>
                                <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>It is a list of your all Bookings </Text>
                            </Text>
                        </View>

                        <View style={{ flex: 8 }}>
                            <FlatGrid
                                itemDimension={350}
                                items={this.state.vitalList}
                                spacing={15}
                                style={[CommonStyles.container, { marginTop: 5 }
                                ]}
                                renderItem={({ item }) => (

                                    <TouchableOpacity style={[CommonStyles.container, CommonStyles.shadow, CommonStyles.br5, CommonStyles.bgColor]}
                                        onPress={() => { this.addToConsultation(item) }}
                                    >

                                        <ImageBackground
                                            style={[
                                                CommonStyles.container,
                                                CommonStyles.backgroundImage,
                                            ]}
                                            source={require('../../assets/img/Group-16.png')}>

                                            <View style={[CommonStyles.container, { flexDirection: 'row', padding: 12 }]}>

                                                <View style={[CommonStyles.container, { justifyContent: 'space-between' }]}>

                                                    <Text >
                                                        <Text style={[CommonStyles.textSizeSmall, CommonStyles.fontRegular, { color: '#333333' }]}>{`Date: `}</Text>
                                                        <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333' }]}>{moment(item.createdAt).format('ll')}</Text>
                                                    </Text>

                                                    <Text style={{ paddingVertical: 10 }} >
                                                        <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall, { color: '#333333', }]}>{`Vital Type: \n`}</Text>
                                                        {item.vitalType === "BloodGlucose" && (
                                                            <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>Blood Glucose</Text>

                                                        )}

                                                        {item.vitalType === "BloodPressure" && (
                                                            <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>Blood Pressure</Text>

                                                        )}

                                                        {item.vitalType === "BloodOxygen" && (
                                                            <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>Blood Oxygen</Text>

                                                        )}


                                                    </Text>

                                                    <Text>
                                                        <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall, { color: '#333333', }]}>{`Notes: \n`}</Text>
                                                        <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>{item.notes}</Text>
                                                    </Text>

                                                </View>

                                                <View style={[CommonStyles.container, { justifyContent: 'space-between', alignItems: 'flex-start' }]}>

                                                    {item.vitalType === "BloodGlucose" && (
                                                        <Text style={[{ color: '#333333' }]}>
                                                            <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>Blood Glucose (mg/dL){`\n`}</Text>

                                                            <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall]}>{item.multipleValues[0]}{`\n`}</Text>
                                                            <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>Meal{`\n`}</Text>

                                                            <Text style={CommonStyles.fontRegular, CommonStyles.textSizeSmall}>{item.multipleValues[1]}{`\n`}</Text>
                                                            <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>Medication{`\n`}</Text>

                                                            <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall]}>{item.multipleValues[2]}{`\n`}</Text>
                                                        </Text>
                                                    )}

                                                    {item.vitalType === "BloodPressure" && (
                                                        <Text style={[{ color: '#333333' }]}>
                                                            <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>Systolic (mmHg){`\n`}</Text>

                                                            <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall]}>{item.multipleValues[0]}{`\n`}</Text>
                                                            <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>Diastolic (mmHg){`\n`}</Text>

                                                            <Text style={CommonStyles.fontRegular, CommonStyles.textSizeSmall}>{item.multipleValues[1]}{`\n`}</Text>
                                                            <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>Pulse (Beats/Min){`\n`}</Text>

                                                            <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall]}>{item.multipleValues[2]}{`\n`}</Text>
                                                        </Text>
                                                    )}

                                                    {item.vitalType === "BloodOxygen" && (
                                                        <Text style={[{ color: '#333333' }]}>
                                                            <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>Oxygen Saturation{`\n`}</Text>

                                                            <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall]}>{item.multipleValues[0]}{'%'}</Text>


                                                        </Text>
                                                    )}




                                                </View>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                )}
                            />
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
                                    this.props.navigation.navigate('Vital', { appointmentId: this.state.appointmentId, })
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
                                    Add Vital
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
                                    style={{ color: '#FFF' }}
                                />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            )
        } else {

            return (
                <View style={[CommonStyles.container]}>
                    <ImageBackground style={[
                        CommonStyles.container,
                        CommonStyles.backgroundImage
                    ]}
                        source={require('../../assets/img/bwback.png')}>
                        <View style={
                            { flex: 2.1 }
                        }>
                            <Text style={{ color: '#FFFFFF', paddingLeft: 17, marginTop: 65 }}>
                                <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeLarge,]} >{`Vital List\n`}</Text>
                                <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>It is a list of your all Bookings </Text>
                            </Text>
                        </View>

                        <View style={{ flex: 8 }}>
                            <FlatGrid
                                itemDimension={350}
                                items={this.state.vitalList}
                                spacing={15}
                                style={[CommonStyles.container, { marginTop: 5 }
                                ]}
                                renderItem={({ item }) => (

                                    <TouchableOpacity style={[CommonStyles.container, CommonStyles.shadow, CommonStyles.br5, CommonStyles.bgColor]}>

                                        <ImageBackground
                                            style={[
                                                CommonStyles.container,
                                                CommonStyles.backgroundImage,
                                            ]}
                                            source={require('../../assets/img/Group-16.png')}>

                                            <View style={[CommonStyles.container, { flexDirection: 'row', padding: 12 }]}>

                                                <View style={[CommonStyles.container, { justifyContent: 'space-between' }]}>

                                                    <Text >
                                                        <Text style={[CommonStyles.textSizeSmall, CommonStyles.fontRegular, { color: '#333333' }]}>{`Date: `}</Text>
                                                        <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333' }]}>{moment(item.createdAt).format('ll')}</Text>
                                                    </Text>

                                                    <Text style={{ paddingVertical: 10 }} >
                                                        <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall, { color: '#333333', }]}>{`Vital Type: \n`}</Text>

                                                        {item.vitalType === "BloodGlucose" && (
                                                            <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>Blood Glucose</Text>

                                                        )}

                                                        {item.vitalType === "BloodPressure" && (
                                                            <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>Blood Pressure</Text>

                                                        )}

                                                        {item.vitalType === "BloodOxygen" && (
                                                            <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>Blood Oxygen</Text>

                                                        )}

                                                    </Text>

                                                    <Text>
                                                        <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall, { color: '#333333', }]}>{`Notes: \n`}</Text>
                                                        <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>{item.notes}</Text>
                                                    </Text>

                                                </View>

                                                <View style={[CommonStyles.container, { justifyContent: 'space-between', alignItems: 'flex-start' }]}>

                                                    {item.vitalType === "BloodGlucose" && (
                                                        <Text style={[{ color: '#333333' }]}>
                                                            <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>Blood Glucose (mg/dL){`\n`}</Text>

                                                            <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall]}>{item.multipleValues[0]}{`\n`}</Text>
                                                            <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>Meal{`\n`}</Text>

                                                            <Text style={CommonStyles.fontRegular, CommonStyles.textSizeSmall}>{item.multipleValues[1]}{`\n`}</Text>
                                                            <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>Medication{`\n`}</Text>

                                                            <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall]}>{item.multipleValues[2]}{`\n`}</Text>
                                                        </Text>
                                                    )}

                                                    {item.vitalType === "BloodPressure" && (
                                                        <Text style={[{ color: '#333333' }]}>
                                                            <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>Systolic (mmHg){`\n`}</Text>

                                                            <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall]}>{item.multipleValues[0]}{`\n`}</Text>
                                                            <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>Diastolic (mmHg){`\n`}</Text>

                                                            <Text style={CommonStyles.fontRegular, CommonStyles.textSizeSmall}>{item.multipleValues[1]}{`\n`}</Text>
                                                            <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>Pulse (Beats/Min){`\n`}</Text>

                                                            <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall]}>{item.multipleValues[2]}{`\n`}</Text>
                                                        </Text>
                                                    )}

                                                    {item.vitalType === "BloodOxygen" && (
                                                        <Text style={[{ color: '#333333' }]}>
                                                            <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>Oxygen Saturation{`\n`}</Text>

                                                            <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall]}>{item.multipleValues[0]}{'%'}</Text>


                                                        </Text>
                                                    )}




                                                </View>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                )}
                            />
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
                                    this.props.navigation.navigate('Vital')
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
                                    Add Vital
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
                                    style={{ color: '#FFF' }}
                                />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            )

        }
    }
}