import React, { Component } from 'react';
import Api from '../../Api';
import CommonStyles from '../../CommonStyles';
import { ListItem, CheckBox, Divider } from 'react-native-elements';
import { Icon } from 'native-base';
import { FlatGrid } from 'react-native-super-grid';
import { StyleSheet, Text, View, ImageBackground, StatusBar, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Loader from '../../components/Loader';

export default class ClinicList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            clinicList: [],
        }
    }

    componentDidMount() {
        Api.instance().getClinicList()
            .then((data) => {

                console.warn('list aa rahi hai', data)
                this.setState({ clinicList: data });
            }
            ).catch(err => console.log(err))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }

    render() {
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
                        <Text style={{ color: '#FFFFFF', paddingLeft: 16, marginTop: 65 }}>
                            <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeLarge,]} >{`Clinic List\n`}</Text>
                            <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>It is a list of your all Clinics </Text>
                        </Text>
                    </View>

                    <View style={{ flex: 8 }}>
                        <FlatGrid
                            itemDimension={350}
                            spacing={15}
                            items={this.state.clinicList}
                            style={[CommonStyles.container, { marginTop: 5 }
                            ]}
                            renderItem={({ item }) => (

                                <View style={[CommonStyles.container, CommonStyles.shadow, CommonStyles.br5, CommonStyles.bgColor]}>

                                    <ImageBackground
                                        style={[
                                            CommonStyles.container,
                                            CommonStyles.backgroundImage,
                                        ]}
                                        source={require('../../assets/img/bookingbg2x.png')}>

                                        <View style={[CommonStyles.container, { flexDirection: 'row', paddingVertical: 12, paddingLeft: 12 }]}>

                                            <View style={[CommonStyles.container, { justifyContent: 'space-between' }]}>
                                                <Text >
                                                    <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall, { color: '#333333', }]}>{`Clinic Name\n`}</Text>
                                                    <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>{item.name}</Text>
                                                </Text>

                                                <Text style={{ paddingVertical: 10 }}>
                                                    <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall, { color: '#333333', }]}>{`Slots\n`}</Text>
                                                    <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>{item.appointmentSlotsText}</Text>
                                                </Text>
                                                <Text style={[CommonStyles.textSizeAverage, { color: '#333333' }]}>
                                                    <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall]}>{`No.of Weeks: `}</Text>
                                                    <Text style={CommonStyles.fontMedium}>{item.numOfClinics}</Text>
                                                </Text>
                                            </View>

                                            <View style={[CommonStyles.container, { justifyContent: 'space-between', alignItems: 'flex-end', paddingVertical: 12, paddingRight: 12 }]}>
                                                <Text style={[CommonStyles.textSizeAverage, { color: '#333333' }]}>
                                                    <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall]}>{`Frequency: `}</Text>
                                                    <Text style={CommonStyles.fontMedium}>{item.frequencyText}</Text>
                                                </Text>

                                                <Text>
                                                    <Text style={[CommonStyles.textSizeSmall, CommonStyles.fontRegular, { color: '#333333' }]}>{`Date: `}</Text>
                                                    <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333' }]}>{moment(item.joinedDate).format('ll')}</Text>
                                                </Text>
                                            </View>

                                        </View>
                                    </ImageBackground>
                                </View>
                            )}
                        />
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