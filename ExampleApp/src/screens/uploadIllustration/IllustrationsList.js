import React, { Component } from 'react';
import Api from '../../Api';
import CommonStyles from '../../CommonStyles';
import { ListItem, CheckBox, Divider } from 'react-native-elements';
import { Icon } from 'native-base';
import { FlatGrid } from 'react-native-super-grid';
import { CommonActions } from '@react-navigation/native';
import { StyleSheet, Text, View, ImageBackground, StatusBar, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import Loader from '../../components/Loader';
import Avatar from 'react-native-elements';

import FastImage from 'react-native-fast-image'
export default class PatientHistoryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            anatomicalIllustrationList: [],
        }
    }

    componentDidMount() {
        Api.instance().getAnatomicalIllustrationList()
            .then((data) => {
                console.warn('=====>', data)
                this.setState({ anatomicalIllustrationList: data });
            }
            ).catch(err => console.log(err))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }
    getImage(image) {

        if (image == null) { return '' }
        else {
            image
        }
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
                        { flex: 2.3 }
                    }>
                        <Text style={{ color: '#FFFFFF', paddingLeft: 17, marginTop: 65 }}>
                            <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeLarge,]} >{`Anatomical Illustrations\n`}</Text>
                            <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall]}>It is a list of your all Bookings </Text>
                        </Text>
                    </View>

                    <View style={{ flex: 8 }}>
                        <FlatGrid
                            itemDimension={350}
                            items={this.state.anatomicalIllustrationList}
                            spacing={15}
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

                                        <View style={[CommonStyles.container, { padding: 12, flexDirection: 'row' }]}>

                                            <View style={[CommonStyles.container, { justifyContent: 'space-between' }]}>

                                                <Text style={{ marginBottom: 10 }} >
                                                    <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall, { color: '#333333', }]}>{`Anatomical Name: \n`}</Text>
                                                    <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>{item.name}</Text>
                                                </Text>

                                                <Text >
                                                    <Text style={[CommonStyles.textSizeSmall, CommonStyles.fontRegular, { color: '#333333' }]}>{`Date: `}</Text>
                                                    <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333' }]}>{moment(item.createdAt).format('ll')}</Text>
                                                </Text>
                                            </View>

                                            <View style={[CommonStyles.container, { justifyContent: 'center' }]}>
                                                <View style={[{ alignSelf: 'flex-end'}]}>
                                                    <FastImage
                                                        style={{ width: 80, height: 110, borderRadius: 5,  }}
                                                        source={{
                                                            uri: item.imageUrl
                                                        }}
                                                        resizeMode={FastImage.resizeMode.contain}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </ImageBackground>
                                </View>
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
                                this.props.navigation.navigate('UploadIllustrations')
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
                                Add Anatomical Illustrations
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