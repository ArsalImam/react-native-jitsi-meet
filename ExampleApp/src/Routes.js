import * as React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './screens/login/Login';
import Dashboard from './screens/patient/Dashboard';
import Demographics from './screens/patient/Demographics'
import Available from './screens/patient/BookingList';
import MenuSlider from './screens/patient/MenuSlider';
import AddReport from './screens/patient/AddReport';
import MedicalCondition from './screens/patient/MedicalCondition';
import Vital from './screens/Vitals/Vital';
import VitalList from './screens/Vitals/VitalList';
import DrProfile from './screens/patient/DrProfile';
import PatientProfile from './screens/patient/PatientProfile';
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


import Scheduled from './screens/patient/ScheduledBooking';
import Completed from './screens/patient/CompleteBookings';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import CreateClinic from "./screens/clinic/CreateClinic";
import ClinicList from "./screens/clinic/ClinicList";

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
        <Drawer.Screen name="MedicationList" component={MedicationList} />
        <Drawer.Screen name="DiagnosisList" component={DiagnosisList} />
        <Drawer.Screen name="InvestigationList" component={InvestigationList} />
        <Drawer.Screen name="ProcedureList" component={ProcedureList} />
        <Drawer.Screen name="TherapyList" component={TherapyList} />
        <Drawer.Screen name="PatientHistoryList" component={PatientHistoryList} />
        <Drawer.Screen name="MedicalCondition" component={MedicalCondition} />
        <Drawer.Screen name="Demographics" component={Demographics} />
        <Drawer.Screen name="AddReport" component={AddReport} />
        <Drawer.Screen name="Patients" component={Patients} />

      </Drawer.Navigator>
    );
  }

  _getAppointmentRoute() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size, type }) => {
            let iconName;
            let iconType;
            if (route.name === 'Available') {
              iconName = focused ? 'navicon' : 'navicon';
              iconType = 'EvilIcons'
              color ? '#297dec' : '#000';
            } else if (route.name === 'Completed') {
              iconName = focused ? 'playlist-check' : 'playlist-check';
              color ? '#297dec' : '#000';
              iconType = 'MaterialCommunityIcons'
            }
            else if (route.name === 'Scheduled') {
              iconName = focused ? 'schedule' : 'schedule';
              iconType = 'MaterialIcons'
              color ? '#297dec' : '#000';
            }
            return <Icon name={iconName} type={iconType} style={{ fontSize: 22, color: `${color}` }} />;
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
          labelStyle: { fontSize: 14 },
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // TabBar background
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
          }

        }} >


        <Tab.Screen name="Available" component={Available} />
        <Tab.Screen name="Scheduled" component={Scheduled} />
        <Tab.Screen name="Completed" component={Completed} />
      </Tab.Navigator>
    )
  }

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#c0d4e2' },
          }}
        />

        <Stack.Screen
          name="MyDrawer"
          component={this._getDrawerComponent}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MyTabs"
          component={this._getAppointmentRoute}

          options={{
            headerShown: true,
            title: '',
            headerStyle: { backgroundColor: 'transparent' },
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: { color: '#fff' },
            headerTintColor: '#fff',
          }}

        />

        <Stack.Screen
          name="AppointmentRoom"
          component={AppointmentRoom}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Demographics"
          component={Demographics}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CreateClinic"
          component={CreateClinic}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ClinicList"
          component={ClinicList}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MedicalCondition"
          component={MedicalCondition}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AddReport"
          component={AddReport}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Vital"
          component={Vital}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="VitalList"
          component={VitalList}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MedicationAdd"
          component={MedicationAdd}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MedicationList"
          component={MedicationList}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DiagnosisAdd"
          component={DiagnosisAdd}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DiagnosisList"
          component={DiagnosisList}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="InvestigationAdd"
          component={InvestigationAdd}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="InvestigationList"
          component={InvestigationList}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ProcedureAdd"
          component={ProcedureAdd}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ProcedureList"
          component={ProcedureList}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TherapyAdd"
          component={TherapyAdd}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TherapyList"
          component={TherapyList}
          options={{ headerShown: false }}
        />


        <Stack.Screen
          name="PatientHistoryAdd"
          component={PatientHistoryAdd}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PatientHistoryList"
          component={PatientHistoryList}
          options={{ headerShown: false }}
        />


        <Stack.Screen
          name="DrProfile"
          component={DrProfile}
          options={{
            headerShown: true,
            title: '',
            headerStyle: { backgroundColor: 'transparent' },
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: { color: '#fff' },
            headerTintColor: '#fff',
          }}
        />

        <Stack.Screen
          name="PatientProfile"
          component={PatientProfile}
          options={{
            headerShown: true,
            title: '',
            headerStyle: { backgroundColor: 'transparent' },
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: { color: '#fff' },
            headerTintColor: '#fff',
          }}
        />

        <Stack.Screen
          name="Patients"
          component={Patients}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    );
  }
}
