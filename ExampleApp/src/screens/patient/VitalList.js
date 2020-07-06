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

export default class VitalList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            vitalList: [],
        }
    }

    componentDidMount() {

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
                        <Text style={{ color: '#FFFFFF', paddingLeft: 18, marginTop: 63 }}>
                            <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeLarge,]} >{`Vital List\n`}</Text>
                            <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>It is a list of your all Bookings </Text>
                        </Text>
                    </View>

                    <View style={{ flex: 8, paddingHorizontal: 2 }}>
                        <FlatGrid
                            itemDimension={350}
                            items={this.state.vitalList}
                            style={[CommonStyles.container, { marginTop: 5 }
                            ]}
                            renderItem={({ item }) => (

                                <View style={[CommonStyles.container, CommonStyles.shadow, CommonStyles.br5, { backgroundColor: '#FFF', padding: 12 }]}>

                                    <View style={[CommonStyles.container, { flexDirection: 'row' }]}>

                                        <View style={[CommonStyles.container, { justifyContent: 'space-between' }]}>

                                            <Text >
                                                <Text style={[CommonStyles.textSizeSmall, CommonStyles.fontRegular, { color: '#333333' }]}>{`Date: `}</Text>
                                                <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333' }]}>{moment(item.createdAt).format('ll')}</Text>
                                            </Text>

                                            <Text style={{ paddingVertical: 10 }} >
                                                <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall, { color: '#333333', }]}>{`Vital Type: \n`}</Text>
                                                <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>{item.vitalType}</Text>
                                            </Text>

                                            <Text>
                                                <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall, { color: '#333333', }]}>{`Notes: \n`}</Text>
                                                <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>{item.notes}</Text>
                                            </Text>

                                        </View>

                                        <View style={[CommonStyles.container, { justifyContent: 'space-between', alignItems: 'flex-end', }]}>
                                            <Text style={[CommonStyles.textSizeAverage, { color: '#333333' }]}>
                                                <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall]}>{`Values:\n `}</Text>
                                                <Text style={CommonStyles.fontMedium}>{item.multipleValues[0]}{`\n`}</Text>
                                                <Text style={CommonStyles.fontMedium}>{item.multipleValues[1]}{`\n`}</Text>
                                                <Text style={CommonStyles.fontMedium}>{item.multipleValues[2]}</Text>
                                            </Text>


                                        </View>

                                    </View>
                                </View>
                            )}
                        />
                    </View>
                    <Loader loading={this.state.isLoading} />

                    <View
                        style={[
                            {
                                position: 'absolute',
                                left: 15,
                                top: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                            },
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