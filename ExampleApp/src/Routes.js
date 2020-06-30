import * as React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './screens/login/Login';
import Dashboard from './screens/patient/Dashboard';
import Demographics from './screens/patient/Demographics';
import BookingList from './screens/patient/BookingList';
import MenuSlider from './screens/patient/MenuSlider';
import VitalAdd from './screens/patient/VitalAdd';
import AddReport from './screens/patient/AddReport';
import MadicationAdd from './screens/patient/MedicationAdd';
import MedicalCondition from './screens/patient/MedicalCondition';
import Vital from './screens/patient/Vital';
import DrProfile from './screens/patient/DrProfile';
import Patients from './screens/patient/Patients';
import AppointmentRoom from './screens/AppointmentRoom';
import ScheduledBooking from './screens/patient/ScheduledBooking';
import CompleteBookings from './screens/patient/CompleteBookings';
import CreateClinic from './screens/clinic/CreateClinic';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default class Routes extends React.Component {
  _getDrawerComponent() {
    return (
      <Drawer.Navigator drawerContent={props => <MenuSlider {...props} />}>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Vital" component={Vital} />
        <Drawer.Screen name="CreateClinic" component={CreateClinic} />
        <Drawer.Screen name="MadicationAdd" component={MadicationAdd} />
        <Drawer.Screen name="MedicalCondition" component={MedicalCondition} />
        <Drawer.Screen name="Demographics" component={Demographics} />
        <Drawer.Screen name="AddReport" component={AddReport} />

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
            let iconColor;

            if (route.name === 'AVIAILABLE') {
              iconName = focused ? 'navicon' : 'navicon';
              iconType = 'EvilIcons'
              iconColor
            } else if (route.name === 'COMPLETED') {
              iconName = focused ? 'playlist-check' : 'playlist-check';
              iconColor = color ? 'red' : 'green';
              iconType = 'MaterialCommunityIcons'
            }
            else if (route.name === 'SCHEDULED') {
              iconName = focused ? 'schedule' : 'schedule';
              iconType = 'MaterialIcons'
            }
            return <Icon name={iconName} type={iconType} style={color= `${iconColor}`}/>;
          },
        })}

        tabBarOptions={{
          pressColor: '#297dec',
          activeTintColor: '#297dec',
          inactiveTintColor: '#000',

          tabStyle: {borderWidth: 3,
            borderColor: '#fff',
            borderRadius: 7,
            backgroundColor: '#F7FAFE',
          },
          labelPosition: 'beside-icon',

        }} >

        <Tab.Screen name="AVAILABLE" component={BookingList} />
        <Tab.Screen name="COMPLETED" component={CompleteBookings} />
        <Tab.Screen name="SCHEDULED" component={ScheduledBooking} />
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
          options={{ headerShown: true ,
          title: '',
          headerStyle: { backgroundColor: 'transparent' },
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTitleStyle: { color: '#fff' },
          headerTintColor: '#fff', }}
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
          name="VitalAdd"
          component={VitalAdd}
          options={{ headerShown: false }}
        />

          <Stack.Screen
              name="CreateClinic"
              component={CreateClinic}
              options={{ headerShown: false }}
          />
        <Stack.Screen
          name="MadicationAdd"
          component={MadicationAdd}
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
          name="Patients"
          component={Patients}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    );
  }
}
