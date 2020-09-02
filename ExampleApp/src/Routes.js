import * as React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './screens/login/Login';
import Dashboard from './screens/patient/Dashboard';
import Demographics from './screens/patient/Demographics';
import Available from './screens/patient/BookingList';
import MenuSlider from './screens/patient/MenuSlider';
import AddReport from './screens/patient/AddReport';
import MedicalCondition from './screens/patient/MedicalCondition';
import Vital from './screens/Vitals/Vital';
import VitalList from './screens/Vitals/VitalList';
import DrProfile from './screens/patient/DrProfile';
import PatientProfile from './screens/profile/PatientProfile';
import Patients from './screens/patient/Patients';
import AppointmentRoom from './screens/AppointmentRoom';
import MedicationAdd from './screens/medications/MedicationAdd';
import MedicationList from './screens/medications/MedicationList';
import DiagnosisAdd from './screens/diagnosis/DiagnosisAdd';
import DiagnosisList from './screens/diagnosis/DiagnosisList';
import InvestigationAdd from './screens/investigation/InvestigationAdd';
import InvestigationList from './screens/investigation/InvestigationList';
import ProcedureAdd from './screens/surgicalProcedure/ProcedureAdd';
import ProcedureList from './screens/surgicalProcedure/ProcedureList';
import TherapyAdd from './screens/suggestedTherapy/TherapyAdd';
import TherapyList from './screens/suggestedTherapy/TherapyList';
import PatientHistoryAdd from './screens/patientHistoryForm/PatientHistoryAdd';
import PatientHistoryList from './screens/patientHistoryForm/PatientHistoryList';
import UploadIllustrations from './screens/uploadIllustration/UploadIllustrations';
import IllustrationsList from './screens/uploadIllustration/IllustrationsList';
import UploadMedicalRecord from './screens/medicalRecords/UploadMedicalRecord';
import MedicalRecordList from './screens/medicalRecords/MedicalRecordList';
import Create from './screens/registrationForm/Create';
import EditProfile from './screens/profile/EditProfile';
import {Button} from 'react-native';
import AddPrescribtion from './screens/prescribeMedication/AddPrescribtion';
import WebView from './screens/web-view/WebView';

import Scheduled from './screens/patient/ScheduledBooking';
import Completed from './screens/patient/CompleteBookings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, Left} from 'native-base';
import CreateClinic from './screens/clinic/CreateClinic';
import ClinicList from './screens/clinic/ClinicList';
import SideBar from './components/drawer/SideBar';
import MyPresciption from './screens/patient/MyPrescription';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default class Routes extends React.Component {
  _getDrawerComponent() {
    return (
      <Drawer.Navigator drawerContent={props => <MenuSlider {...props} />}>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Vital" component={Vital} />
        <Drawer.Screen name="VitalList" component={VitalList} />
        <Drawer.Screen name="CreateClinic" component={CreateClinic} />
        <Drawer.Screen name="ClinicList" component={ClinicList} />
        <Drawer.Screen name="MedicationList" component={MedicationList}
       /> 
        <Drawer.Screen name="DiagnosisList" component={DiagnosisList} />
        <Drawer.Screen name="InvestigationList" component={InvestigationList} />
        <Drawer.Screen name="ProcedureList" component={ProcedureList} />
        <Drawer.Screen name="TherapyList" component={TherapyList} />
        <Drawer.Screen
          name="PatientHistoryList"
          component={PatientHistoryList}
        />
        <Drawer.Screen name="IllustrationsList" component={IllustrationsList} />
        <Drawer.Screen name="MedicalRecordList" component={MedicalRecordList} />
        <Drawer.Screen name="AddPrescribtion" component={AddPrescribtion} />
        <Drawer.Screen name="MedicalCondition" component={MedicalCondition} />
        <Drawer.Screen name="PatientProfile" component={PatientProfile} />
        <Drawer.Screen name="Demographics" component={Demographics} />
        <Drawer.Screen name="AddReport" component={AddReport} />
        <Drawer.Screen name="Patients" component={Patients} />
        <Drawer.Screen name="Scheduled" component={Scheduled} />
      </Drawer.Navigator>
    );
  }

  _getAppointmentRoute() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size, type}) => {
            let iconName;
            let iconType;
            if (route.name === 'Available') {
              iconName = focused ? 'navicon' : 'navicon';
              iconType = 'EvilIcons';
              color ? '#297dec' : '#000';
            } else if (route.name === 'Completed') {
              iconName = focused ? 'playlist-check' : 'playlist-check';
              color ? '#297dec' : '#000';
              iconType = 'MaterialCommunityIcons';
            } else if (route.name === 'Scheduled') {
              iconName = focused ? 'schedule' : 'schedule';
              iconType = 'MaterialIcons';
              color ? '#297dec' : '#000';
            }
            return (
              <Icon
                name={iconName}
                type={iconType}
                style={{fontSize: 22, color: `${color}`}}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: '#297dec',
          inactiveTintColor: '#000',

          tabStyle: {
            borderTopWidth: 3,
            borderColor: '#fff',
            backgroundColor: '#F7FAFE',
          },
          labelPosition: 'beside-icon',
          labelStyle: {fontSize: 14},
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // TabBar background
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
          },
        }}>
        <Tab.Screen name="Available" component={Available} />
        <Tab.Screen name="Scheduled" component={Scheduled} />
        <Tab.Screen name="Completed" component={Completed} />
      </Tab.Navigator>
    );
  }

  render() {
    return (
      <Stack.Navigator
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: '#c0d4e2'},
          }}
        />
        <Stack.Screen
          name="MyPresciption"
          component={MyPresciption}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="MyDrawer"
          component={this._getDrawerComponent}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="MyTabs"
          component={this._getAppointmentRoute}
          options={{
            headerShown: true,
            title: '',
            headerStyle: {backgroundColor: 'transparent'},
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {color: '#fff'},
            headerTintColor: '#fff',
          }}
        />

        <Stack.Screen
          name="AppointmentRoom"
          component={AppointmentRoom}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Demographics"
          component={Demographics}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="CreateClinic"
          component={CreateClinic}
          // options={{headerShown: false}}
          options={{
            title: '',
            headerStyle: {backgroundColor: 'transparent'},
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {color: '#fff'},
            headerTintColor: '#fff',
            navigationOptions: {
              header: ({goBack}) => ({
                left: <Left onPress={goBack} />,
              }),
              cardStyle: {
                backgroundColor: 'transparent',
              },
            },
          }}
/>

        <Stack.Screen
          name="ClinicList"
          component={ClinicList}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="MedicalCondition"
          component={MedicalCondition}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AddReport"
          component={AddReport}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Vital"
          component={Vital}
          options={{
            headerShown: false,
            cardStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />

        <Stack.Screen
          name="VitalList"
          component={VitalList}
          options={{
            headerShown: false,
            cardStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />

        <Stack.Screen
          name="MedicationAdd"
          component={MedicationAdd}
          options={{
              title: '',
              headerStyle: {backgroundColor: 'transparent'},
              headerTransparent: true,
              headerTitleAlign: 'center',
              headerTitleStyle: {color: '#fff'},
              headerTintColor: '#fff',
              navigationOptions: {
                header: ({goBack}) => ({
                  left: <Left onPress={goBack} />,
                }),
              
              },
              cardStyle: {
                backgroundColor: 'transparent',
              },
            }}
        />

        <Stack.Screen
          name="MedicationList"
          component={MedicationList}
          options={{
            headerShown: true,
            cardStyle: {
              backgroundColor: 'transparent'
            }

          }}
        />
        {/* <Stack.Screen
          name="MedicationList"
          component={MedicationList}
          // options={{
          //   // title: '',
          //   // headerStyle: {backgroundColor: 'transparent'},
          //   // headerTransparent: true,
          //   // headerTitleAlign: 'center',
          //   // headerTitleStyle: {color: '#fff'},
          //   // headerTintColor: '#fff',
          //   navigationOptions: {
          //     header: ({goBack}) => ({
          //       left: <Left onPress={goBack} />,
          //     }),
          //     cardStyle: {
          //       backgroundColor: 'transparent',
          //     },
          //   },
          // }}
        /> */}

        <Stack.Screen
          name="DiagnosisAdd"
          component={DiagnosisAdd}
          options={{
            title: '',
            headerStyle: {backgroundColor: 'transparent'},
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {color: '#fff'},
            headerTintColor: '#fff',
            navigationOptions: {
              header: ({goBack}) => ({
                left: <Left onPress={goBack} />,
              }),
              
            },
            cardStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />

        <Stack.Screen
          name="DiagnosisList"
          component={DiagnosisList}
          // options={{
          //   headerShown: false,
          //   cardStyle: {
          //     backgroundColor: 'transparent',
          //   },
          // }}

          options={{
            title: '',
            headerStyle: {backgroundColor: 'transparent'},
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {color: '#fff'},
            headerTintColor: '#fff',
            navigationOptions: {
              header: ({goBack}) => ({
                left: <Left onPress={goBack} />,
              }),
              
            },
            cardStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />

        <Stack.Screen
          name="InvestigationAdd"
          component={InvestigationAdd}
          options={{
            title: '',
            headerStyle: {backgroundColor: 'transparent'},
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {color: '#fff'},
            headerTintColor: '#fff',
            navigationOptions: {
              header: ({goBack}) => ({
                left: <Left onPress={goBack} />,
              }),
              
            },
            cardStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />

        <Stack.Screen
          name="InvestigationList"
          component={InvestigationList}
          // options={{
          //   headerShown: false,
          //   cardStyle: {
          //     backgroundColor: 'transparent',
          //   },
          // }}
          options={{
            title: '',
            headerStyle: {backgroundColor: 'transparent'},
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {color: '#fff'},
            headerTintColor: '#fff',
            navigationOptions: {
              header: ({goBack}) => ({
                left: <Left onPress={goBack} />,
              }),
              cardStyle: {
                backgroundColor: 'transparent',
              },
            },
          }}
        />

        <Stack.Screen
          name="ProcedureAdd"
          component={ProcedureAdd}
          options={{
            title: '',
            headerStyle: {backgroundColor: 'transparent'},
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {color: '#fff'},
            headerTintColor: '#fff',
            navigationOptions: {
              header: ({goBack}) => ({
                left: <Left onPress={goBack} />,
              }),
              
            },
            cardStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />

        <Stack.Screen
          name="ProcedureList"
          component={ProcedureList}
          options={{
            headerShown: false,
            cardStyle: {
              backgroundColor: 'transparent',
            },
          }}
          // options={{
          //   title: '',
          //   headerStyle: {backgroundColor: 'transparent'},
          //   headerTransparent: true,
          //   headerTitleAlign: 'center',
          //   headerTitleStyle: {color: '#fff'},
          //   headerTintColor: '#fff',
          //   navigationOptions: {
          //     header: ({goBack}) => ({
          //       left: <Left onPress={goBack} />,
          //     }),
          //     cardStyle: {
          //       backgroundColor: 'transparent',
          //     },
          //   },
          // }}
        />

        <Stack.Screen
          name="TherapyAdd"
          component={TherapyAdd}
          options={{
            title: '',
            headerStyle: {backgroundColor: 'transparent'},
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {color: '#fff'},
            headerTintColor: '#fff',
            navigationOptions: {
              header: ({goBack}) => ({
                left: <Left onPress={goBack} />,
              }),
              
            },
            cardStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />

        <Stack.Screen
          name="TherapyList"
          component={TherapyList}
          // options={{
          //   headerShown: false,
          //   cardStyle: {
          //     backgroundColor: 'transparent',
          //   },
          // }}
          options={{
            title: '',
            headerStyle: {backgroundColor: 'transparent'},
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {color: '#fff'},
            headerTintColor: '#fff',
            navigationOptions: {
              header: ({goBack}) => ({
                left: <Left onPress={goBack} />,
              }),
              cardStyle: {
                backgroundColor: 'transparent',
              },
            },
          }}
        />

        <Stack.Screen
          name="PatientHistoryAdd"
          component={PatientHistoryAdd}
          options={{
            title: '',
            headerStyle: {backgroundColor: 'transparent'},
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {color: '#fff'},
            headerTintColor: '#fff',
            navigationOptions: {
              header: ({goBack}) => ({
                left: <Left onPress={goBack} />,
              }),
              
            },
            cardStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />

        <Stack.Screen
          name="PatientHistoryList"
          component={PatientHistoryList}
          // options={{
          //   headerShown: false,
          //   cardStyle: {
          //     backgroundColor: 'transparent',
          //   },
          // }}
          options={{
            title: '',
            headerStyle: {backgroundColor: 'transparent'},
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {color: '#fff'},
            headerTintColor: '#fff',
            navigationOptions: {
              header: ({goBack}) => ({
                left: <Left onPress={goBack} />,
              }),
              cardStyle: {
                backgroundColor: 'transparent',
              },
            },
          }}
        />

        <Stack.Screen
          name="UploadIllustrations"
          component={UploadIllustrations}
          options={{
            title: '',
            headerStyle: {backgroundColor: 'transparent'},
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {color: '#fff'},
            headerTintColor: '#fff',
            navigationOptions: {
              header: ({goBack}) => ({
                left: <Left onPress={goBack} />,
              }),
              
            },
            cardStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />

        <Stack.Screen
          name="IllustrationsList"
          component={IllustrationsList}
          // options={{
          //   headerShown: false,
          //   cardStyle: {
          //     backgroundColor: 'transparent',
          //   },
          // }}
          options={{
            title: '',
            headerStyle: {backgroundColor: 'transparent'},
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {color: '#fff'},
            headerTintColor: '#fff',
            navigationOptions: {
              header: ({goBack}) => ({
                left: <Left onPress={goBack} />,
              }),
              cardStyle: {
                backgroundColor: 'transparent',
              },
            },
          }}
        />

        <Stack.Screen
          name="UploadMedicalRecord"
          component={UploadMedicalRecord}
          options={{
            headerShown: false,
            cardStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />

        <Stack.Screen
          name="MedicalRecordList"
          component={MedicalRecordList}
          options={{
            headerShown: false,
            cardStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />

        <Stack.Screen
          name="AddPrescribtion"
          component={AddPrescribtion}
          options={{
            headerShown: false,
            cardStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />

        <Stack.Screen
          name="DrProfile"
          component={DrProfile}
          options={{
            headerShown: true,
            title: '',
            headerStyle: {backgroundColor: 'transparent'},
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {color: '#fff'},
            headerTintColor: '#fff',
          }}
        />

        <Stack.Screen
          name="PatientProfile"
          component={PatientProfile}
          // options={{
          //   headerShown: false,
          // }}
          options={{
            title: '',
            headerStyle: {backgroundColor: 'transparent'},
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {color: '#fff'},
            headerTintColor: '#fff',
            navigationOptions: {
              header: ({goBack}) => ({
                left: <Left onPress={goBack} />,
              }),
              cardStyle: {
                backgroundColor: 'transparent',
              },
            },
          }}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Patients"
          component={Patients}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Create"
          component={Create}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="WebView"
          component={WebView}
          options={{
            title: '',
            headerShown: true}}
        />
      </Stack.Navigator>
    );
  }
}
