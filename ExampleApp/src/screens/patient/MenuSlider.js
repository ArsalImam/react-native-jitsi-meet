import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Text, } from 'react-native';
import { Container, Content, Icon, Item, Label } from 'native-base';
import { FlatGrid } from 'react-native-super-grid'
import CommonStyles from '../../CommonStyles';
import Api from '../../Api';
import Configs, { Roles } from '../../Configs';

class MenuSlider extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            role:''
        }
    }
    componentDidMount() {
            Api.instance().getUserRole().then(role => this.setState({role}));

    }
    render() {
        const PersonalProfile = [
            { name: 'Demographics', iconName: 'clipboard-notes', iconFamily: 'Foundation', iconSize: '18', route: 'Demographics' },
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
            { name: 'My Medical Records', iconName: 'ios-flower', iconFamily: 'Ionicon', iconSize: '18', route: 'MedicalRecordList' }, 
            { name: 'Medication Prescribe', iconName: 'bed', iconFamily: 'FontAwesome', iconSize: '18', route: 'AddPrescribtion' },
             { name: 'Allergies', iconName: 'ios-flower', iconFamily: 'Ionicon', iconSize: '18', route: 'PatientProfile'},
            // { name: 'Surgeries', iconName: 'box-cutter', iconFamily: 'MaterialCommunityIcons', iconSize: '18', route: '' },
            // { name: 'Dental Issue', iconName: 'tooth-outline', iconFamily: 'MaterialCommunityIcons', iconSize: '18', route: '' },
            // { name: 'Reports', iconName: 'notebook', iconFamily: 'SimpleLineIcons', iconSize: '20', route: 'AddReport' },
        ];
        
        const medicalProfilePatient = [
            { name: 'History Form', iconName: 'notebook', iconFamily: 'SimpleLineIcons', iconSize: '18', route: 'PatientHistoryList' },
            { name: 'My Medical Records', iconName: 'ios-flower', iconFamily: 'Ionicon', iconSize: '18', route: 'MedicalRecordList' }, 
        ]; 
        
        const appointmentPatient = [
            { name: 'My Appointments', iconName: 'notebook', iconFamily: 'SimpleLineIcons', iconSize: '18', route: 'Scheduled' },
            { name: 'Book Appointment', iconName: 'md-reader-outline', iconFamily: 'Ionicon', iconSize: '18', route: 'MyTabs' }, 
        ];
        
        if(this.state.role==Roles.doctor){
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
    
                        <View
                            style={[CommonStyles.padding, { borderBottomWidth: 1 }]} >
                            <Label style={[CommonStyles.fontMedium]}>Vitals</Label>
                        </View>
    
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
                        <View
                            style={[CommonStyles.padding, , { borderBottomWidth: 1 }]} >
                            <Label style={[CommonStyles.fontMedium]}>Medical Profile</Label>
                        </View>
    
                        <FlatGrid
                            style={[CommonStyles.container, { marginTop: 5 }]}
                            itemDimension={400}
                            items={medicalProfile}
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
                        onPress={() => this.props.navigation.navigate('Login')}
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
    
                </View>
            )


        }else{
            return (
                     
            <View style={[CommonStyles.container, CommonStyles.padding, { backgroundColor: '#F7FAFE' }]}>
                <Content>
                    <View
                        style={[CommonStyles.padding, CommonStyles.mtt10]} >
                        <Label style={[CommonStyles.fontBold, CommonStyles.textSizeLarge]}>TeleMedicine</Label>
                    </View>

                    <View
                        style={[CommonStyles.padding, { borderBottomWidth: 1 }]} >
                        <Label style={[CommonStyles.fontMedium]}> Appointments</Label>
                    </View>

                    <FlatGrid
                        style={[CommonStyles.container, { marginTop: 5 }]}
                        itemDimension={400}
                        items={appointmentPatient}
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


                    <View
                        style={[CommonStyles.padding, { borderBottomWidth: 1 }]} >
                        <Label style={[CommonStyles.fontMedium]}>Vitals</Label>
                    </View>

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
                   

                    
                    <View
                        style={[CommonStyles.padding, , { borderBottomWidth: 1 }]} >
                        <Label style={[CommonStyles.fontMedium]}>Medical Profile</Label>
                    </View>

                    <FlatGrid
                        style={[CommonStyles.container, { marginTop: 5 }]}
                        itemDimension={400}
                        items={medicalProfilePatient}
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
                    onPress={() => this.props.navigation.navigate('Login')}
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

            </View>
        )}
        
    }
}

export default MenuSlider;