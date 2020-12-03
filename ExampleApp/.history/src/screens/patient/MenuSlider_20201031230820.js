import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Text, } from 'react-native';
import { Container, Content, Icon, Item, Label } from 'native-base';
import { FlatGrid } from 'react-native-super-grid'
import CommonStyles from '../../CommonStyles';
import { ViewUtils } from '../../Utils';
import Api from '../../Api';
import Loader from '../../components/Loader';
import { Roles } from '../.././Configs';


class MenuSlider extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            role: ''
        }
    }

    componentDidMount() {

        Api.instance().getUserRole().then(role => this.setState({ role }));
    }



    render() {

        const PersonalProfile = [
            { name: 'Basic', iconName: 'clipboard-notes', iconFamily: 'Foundation', iconSize: '18', route: 'PatientProfile' },

        ];

        const clinicList = [
            { name: 'Create Clinic', iconName: 'activity', iconFamily: 'Feather', iconSize: '18', route: 'CreateClinic' },
            { name: 'Clinic List', iconName: 'medicinebox', iconFamily: 'AntDesign', iconSize: '18', route: 'ClinicList' },

        ];

        const vital = [
            { name: 'Create Vital', iconName: 'activity', iconFamily: 'Feather', iconSize: '18', route: 'Vital' },
            { name: 'Vital List', iconName: 'medicinebox', iconFamily: 'AntDesign', iconSize: '18', route: 'VitalList' },

        ];

        const medicalProfile = [
            { name: 'Medication', iconName: 'medicinebox', iconFamily: 'AntDesign', iconSize: '18', route: 'MedicationList' },
            { name: 'Diagnosis', iconName: 'bed', iconFamily: 'FontAwesome', iconSize: '18', route: 'DiagnosisList' },
            { name: 'Investigation', iconName: 'ios-flower', iconFamily: 'Ionicon', iconSize: '18', route: 'InvestigationList' },
            { name: 'Surgical Procedure', iconName: 'box-cutter', iconFamily: 'MaterialCommunityIcons', iconSize: '18', route: 'ProcedureList' },
            { name: 'Suggested Therapy', iconName: 'tooth-outline', iconFamily: 'MaterialCommunityIcons', iconSize: '18', route: 'TherapyList' },
            { name: 'Upload', iconName: 'tooth-outline', iconFamily: 'MaterialCommunityIcons', iconSize: '18', route: 'IllustrationsList' },
            { name: 'Patient History Form', iconName: 'notebook', iconFamily: 'SimpleLineIcons', iconSize: '18', route: 'PatientHistoryList' },

            //  { name: 'My Medical Records', iconName: 'ios-flower', iconFamily: 'Ionicon', iconSize: '18', route: 'MedicalRecordList' },
            // { name: 'Medication Prescribe', iconName: 'bed', iconFamily: 'FontAwesome', iconSize: '18', route: 'AddPrescribtion' },
            //  { name: 'Allergies', iconName: 'ios-flower', iconFamily: 'Ionicon', iconSize: '18', route: 'PatientProfile'},
            // // { name: 'Surgeries', iconName: 'box-cutter', iconFamily: 'MaterialCommunityIcons', iconSize: '18', route: '' },
            // { name: 'Dental Issue', iconName: 'tooth-outline', iconFamily: 'MaterialCommunityIcons', iconSize: '18', route: '' },
            // { name: 'Reports', iconName: 'notebook', iconFamily: 'SimpleLineIcons', iconSize: '20', route: 'AddReport' },
        ];
        
        const medicalProfilePatient = [
            // { name: 'Upload', iconName: 'tooth-outline', iconFamily: 'MaterialCommunityIcons', iconSize: '18', route: 'IllustrationsList' },
            // { name: 'Patient History Form', iconName: 'notebook', iconFamily: 'SimpleLineIcons', iconSize: '18', route: 'PatientHistoryList' },
            { name: 'Medical Records', iconName: 'ios-flower', iconFamily: 'Ionicon', iconSize: '18', route: 'MedicalRecordList' },
            { name: 'Patient History Form', iconName: 'notebook', iconFamily: 'SimpleLineIcons', iconSize: '18', route: 'PatientHistoryList' },
         
        ];

        return (
            <View style={[CommonStyles.container, CommonStyles.padding, { backgroundColor: '#F7FAFE' }]}>
                <Content>

                    <View
                        style={[CommonStyles.padding, CommonStyles.mtt10]} >
                        <Label style={[CommonStyles.fontBold, CommonStyles.textSizeLarge]}>TeleMedicine</Label>
                    </View>

                    <View
                        style={[CommonStyles.padding, CommonStyles.mtt10, { borderBottomWidth: 1 }]} >
                        <Label style={[CommonStyles.fontMedium]}>Personal Profile</Label>
                    </View>

                    <FlatGrid
                        style={[CommonStyles.container, { marginTop: 5 }]}
                        itemDimension={400}
                        items={PersonalProfile}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(`${item.route}`)}>
                                <View style={[CommonStyles.container,
                                { flexDirection: 'row', }]}>
                                    <Icon style={[CommonStyles.padding, { fontSize: 22 }]}
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
                    {this.state.role == Roles.doctor && (
                        <View
                            style={[CommonStyles.padding, { borderBottomWidth: 1 }]} >
                            <Label style={[CommonStyles.fontMedium]}>Clinic</Label>
                        </View>

                    )} 
                     {this.state.role == Roles.doctor && (
                        <FlatGrid
                            style={[CommonStyles.container, { marginTop: 5 }]}
                            itemDimension={400}
                            items={clinicList}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate(`${item.route}`)}>
                                    <View style={[CommonStyles.container,
                                    { flexDirection: 'row', }]}>
                                        <Icon style={[CommonStyles.padding, { fontSize: 22 }]}
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
                     )}
                      {this.state.role == Roles.patient && (
                           <View
                           style={[CommonStyles.padding, CommonStyles.mtt10, { borderBottomWidth: 1 }]} >
                           <Label style={[CommonStyles.fontMedium]}>Vital</Label>
                       </View>

                      )} 
                       {this.state.role == Roles.patient && (
                        <FlatGrid
                            style={[CommonStyles.container, { marginTop: 5 }]}
                            itemDimension={400}
                            items={vital}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate(`${item.route}`)}>
                                    <View style={[CommonStyles.container,
                                    { flexDirection: 'row', }]}>
                                        <Icon style={[CommonStyles.padding, { fontSize: 22 }]}
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
                     )}

                    


                    <View
                        style={[CommonStyles.padding, , { borderBottomWidth: 1 }]} >
                        <Label style={[CommonStyles.fontMedium]}>Medical Profile</Label>
                    </View>

                    <FlatGrid
                        style={[CommonStyles.container, { marginTop: 5 }]}
                        itemDimension={400}
                        items={this.state.role==Roles.doctor ? medicalProfile : medicalProfilePatient}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(`${item.route}`)}>
                                <View style={[CommonStyles.container,
                                { flexDirection: 'row', }]}>
                                    <Icon style={[CommonStyles.padding, { fontSize: 22 }]}
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

                <TouchableOpacity
                    onPress={() => {
                        ViewUtils.showAlert(
                            'Are you sure, you want to sign out',
                            () => {
                                this.setState({ isLoading: true });
                                Api.instance()
                                    .removeUser()
                                    .then(response => {
                                        this.props.navigation.replace('Login')
<<<<<<< HEAD
                                        ViewUtils.showToast('You have been  sign out successfully!');
=======
                                        ViewUtils.showToast('You have signed out successfully!');
>>>>>>> e1a7792eb4f9595aa522080dd2bbeda36707e3a3
                                    })
                                    .catch(err => {
                                        //ViewUtils.showToast(err);
                                    })
                                    .finally(() => {
                                        this.setState({ isLoading: false });
                                    });

                            },
                            () => { },
                        );
                    }}
                    style={[CommonStyles.fitToBottom,
                    { flexDirection: 'row', borderWidth: 1, }]}>
                    <Icon style={[CommonStyles.padding, { fontSize: 22, }]}
                        name='exit-to-app' type='MaterialCommunityIcons' ></Icon>
                    <Text style={[CommonStyles.fontMedium,
                    CommonStyles.padding,
                    CommonStyles.centerText,
                    CommonStyles.textSizeNormal,
                    ]}>Sign Out</Text>
                </TouchableOpacity>
                <Loader loading={this.state.isLoading} />
            </View>
        )
    }
}

export default MenuSlider;