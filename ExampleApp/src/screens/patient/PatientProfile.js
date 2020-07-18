import React, { Component } from 'react';
import {Icon} from 'native-base'
import { StyleSheet, Text, View, ImageBackground, StatusBar, Image, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import CommonStyles from '../../CommonStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

export default class PatientProfile extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            user: {
                personalDetails: {},
                qualifications: [],
            },
            showLoader: true,
        };
    }
    componentDidMount() {

        Api.instance()
        ._user()

        Api.instance()
            ._user()
            .then(user => {
                if (user == null) return;
                this.setState({
                    user,
                });
            })
            .catch(err => ViewUtils.showToast(err))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }

    render() {
       
        return (

            <View style={[CommonStyles.container]}>

                <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/img/background.png')}>

                    <KeyboardAwareScrollView style={[CommonStyles.container]}>

                        <View style={[CommonStyles.container]}>
                            <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]}
                                source={require('../../assets/img/hdpi.png')}>

                                <View style={[CommonStyles.container,
                                {
                                    paddingHorizontal: 16,
                                    paddingVertical: 67
                                }
                                ]}>
                                    <View style={[{ flexDirection: 'row', alignContent: 'flex-start', height: 105 }]}>
                                        <View style={[{ backgroundColor: '#7DEE00', borderBottomLeftRadius: 5, borderTopLeftRadius: 5, width: 105 }]}>
                                            <Image style={{ height: '97%', width: '100%', resizeMode: 'cover', }}
                                                source={require('../../assets/drawable-xxxhdpi/Mask.png')}>

                                            </Image>
                                        </View>
                                        <View style={[CommonStyles.container, { justifyContent: 'flex-end', marginLeft: 10, marginBottom: -7 }]}>
                                            <Text>
                                                <Text style={[CommonStyles.fontRegular, { color: '#7DEE00' }]}>Online{`\n`}</Text>
                                                <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage, CommonStyles.textColorWhite]}>Islamabad, Pakistan{`\n`}</Text>
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[CommonStyles.container, { marginTop: 10 }]}>
                                        <Text style={[CommonStyles.fontRegular, CommonStyles.textColorWhite]} >
                                            <Text style={[{ fontSize: 32 }]}>Dr. Iqbal Memon{`\n`}</Text>
                                            <Text style={[{ fontSize: 20 }]}>FCPS, FCPS{`\n`}</Text>
                                        </Text>

                                        <Text style={[CommonStyles.textColorWhite, CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>
                                            {`Doctor Code: `} {this.state.user.doctorCode} {`\n`}
                                            {`\nCall: `} {this.state.user.personalDetails.mobile} {`\n`}
                                            {`\nAge: `} {moment(this.state.user.personalDetails.dateOfBirth).fromNow().split(" ")[0]}{` `}{moment(this.state.user.personalDetails.dateOfBirth).fromNow().split(" ")[1]}
                                        </Text>
                                    </View>
                                </View>

                            </ImageBackground>
                        </View>

                        <TouchableOpacity style={[CommonStyles.container, CommonStyles.br5,
                        {
                            backgroundColor: '#333333',
                            marginTop: -30,
                            marginHorizontal: 15
                        }
                        ]}>
                            <Text style={[CommonStyles.fontRegular, CommonStyles.padding, CommonStyles.margin, CommonStyles.centerText, CommonStyles.textColorWhite]}>ONLINE CONSULTAION</Text>
                        </TouchableOpacity>
                        <View style={{ paddingHorizontal: 10 }}>

                            <FlatGrid

                                items={this.state.user.qualifications}
                                style={[CommonStyles.container]}
                                //staticDimension={300}
                                //fixed
                                spacing={15}
                                renderItem={({ item, index }) => (

                                    <View style={[CommonStyles.container, CommonStyles.bgColor, CommonStyles.br5, { padding: 12 }]}>
                                        <Text>
                                            <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeLarge]}>{item.qualification}{`\n`}</Text>
                                           
                                        </Text>
                                        <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#999999', }]}>
                                            <Text >{item.yearQualified}{`\n`}</Text>
                                            <Text >{item.qualifiedFrom}</Text>
                                        </Text>
                                    </View>
                                )}
                            />
                        </View>
                    </KeyboardAwareScrollView>

                    <Loader loading={this.state.isLoading} />
                    <View
                        style={[
                            {
                                position: 'absolute',
                                right: 17,
                                top: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                            },
                        ]}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('EditProfile')
                            }}>
                            <Icon name="edit" type='Feather' style={{ fontSize: 21, color: '#fff' }} />
                        </TouchableOpacity>
                    </View>

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
        );
    }
}