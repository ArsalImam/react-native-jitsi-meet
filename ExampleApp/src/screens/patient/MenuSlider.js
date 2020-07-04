import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Text, } from 'react-native';
import { Container, Content, Icon, Item, Label } from 'native-base';
import { FlatGrid } from 'react-native-super-grid'
import CommonStyles from '../../CommonStyles';


class MenuSlider extends React.Component {
    render() {

        const PersonalProfile = [
            { name: 'Demographics', iconName: 'clipboard-notes', iconFamily: 'Foundation', iconSize: '18', route: 'Demographics' },

        ];

        const clinicList = [
            { name: 'Create Clinic', iconName: 'activity', iconFamily: 'Feather', iconSize: '18', route: 'CreateClinic' },
            { name: 'Clinic List', iconName: 'medicinebox', iconFamily: 'AntDesign', iconSize: '18', route: 'ClinicList' },

        ];

        const medicalProfile = [
            { name: 'Vital', iconName: 'activity', iconFamily: 'Feather', iconSize: '18', route: 'Vital' },
            { name: 'Medication', iconName: 'medicinebox', iconFamily: 'AntDesign', iconSize: '18', route: 'MadicationAdd' },
            { name: 'Medical Condition', iconName: 'bed', iconFamily: 'FontAwesome', iconSize: '18', route: 'MedicalCondition' },
            { name: 'Allergies', iconName: 'ios-flower', iconFamily: 'Ionicon', iconSize: '18', route: 'Patients' },
            { name: 'Surgeries', iconName: 'box-cutter', iconFamily: 'MaterialCommunityIcons', iconSize: '18', route: 'VitalAdd' },
            { name: 'Dental Issue', iconName: 'tooth-outline', iconFamily: 'MaterialCommunityIcons', iconSize: '18', route: '' },
            { name: 'Reports', iconName: 'notebook', iconFamily: 'SimpleLineIcons', iconSize: '20', route: 'AddReport' },
        ];

        return (
            <View style={[CommonStyles.container, CommonStyles.padding, { backgroundColor: '#F7FAFE'}]}>
                <Content>

                    <View
                        style={[CommonStyles.padding, CommonStyles.mtt10]} >
                        <Label style={[CommonStyles.fontBold, CommonStyles.textSizeLarge]}>TeleMedicine</Label>
                    </View>

                    <View
                        style={[CommonStyles.padding, CommonStyles.mtt10, { borderBottomWidth: 1 }]} >
                        <Label style={[CommonStyles.fontMedium]}> Personal Profile</Label>
                    </View>

                    <FlatGrid
                        style={[CommonStyles.container, { marginTop: 5 }]}
                        itemDimension={400}
                        items={PersonalProfile}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(`${item.route}`)}>
                                <View style={[CommonStyles.container,
                                { flexDirection: 'row', }]}>
                                    <Icon style={[CommonStyles.padding, { fontSize: 22}]}
                                        name={item.iconName} type={item.iconFamily} ></Icon>
                                    <Text style={[CommonStyles.fontMedium,
                                    CommonStyles.padding,
                                    CommonStyles.textSizeNormal,
                                    CommonStyles.centerText,

                                    ]}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />

                    <View
                        style={[CommonStyles.padding, { borderBottomWidth: 1 }]} >
                        <Label style={[CommonStyles.fontMedium]}>Clinic</Label>
                    </View>

                    <FlatGrid
                        style={[CommonStyles.container, { marginTop: 5 }]}
                        itemDimension={400}
                        items={clinicList}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(`${item.route}`)}>
                                <View style={[CommonStyles.container,
                                { flexDirection: 'row', }]}>
                                    <Icon style={[CommonStyles.padding, { fontSize: 22}]}
                                        name={item.iconName} type={item.iconFamily} ></Icon>
                                    <Text style={[CommonStyles.fontMedium,
                                    CommonStyles.padding,
                                    CommonStyles.textSizeNormal,
                                    CommonStyles.centerText,

                                    ]}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />

                    <View
                        style={[CommonStyles.padding,, { borderBottomWidth: 1 }]} >
                        <Label style={[CommonStyles.fontMedium]}> Medical Profile</Label>
                    </View>

                    <FlatGrid
                        style={[CommonStyles.container, { marginTop: 5 }]}
                        itemDimension={400}
                        items={medicalProfile}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(`${item.route}`)}>
                                <View style={[CommonStyles.container,
                                { flexDirection: 'row', }]}>
                                    <Icon style={[CommonStyles.padding, { fontSize: 22}]}
                                        name={item.iconName} type={item.iconFamily} ></Icon>
                                    <Text style={[CommonStyles.fontMedium,
                                    CommonStyles.padding,
                                    CommonStyles.centerText,
                                    CommonStyles.textSizeNormal,
                                    ]}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />

                </Content>


                <View style={[CommonStyles.fitToBottom,
                { flexDirection: 'row', borderWidth: 1, }]}>
                    <Icon style={[CommonStyles.padding, { fontSize: 22, }]}
                        name='exit-to-app' type='MaterialCommunityIcons' ></Icon>
                    <Text style={[CommonStyles.fontMedium,
                    CommonStyles.padding,
                    CommonStyles.centerText,
                    CommonStyles.textSizeNormal,
                    ]}>Sign Out</Text>
                </View>

            </View>
        )
    }
}

export default MenuSlider;
