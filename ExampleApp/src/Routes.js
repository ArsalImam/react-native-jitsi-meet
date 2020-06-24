import * as React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './screens/patient/Login';
import Dashboard from './screens/patient/Dashboard';
import Demographics from './screens/patient/Demographics';
import BookingList from './screens/patient/BookingList';
import MenuSlider from './screens/patient/MenuSlider'
import VitalAdd from './screens/patient/VitalAdd';
import AddReport from './screens/patient/AddReport';
import MadicationAdd from './screens/patient/MedicationAdd';
import MedicalCondition from './screens/patient/MedicalCondition';
import Vital from './screens/patient/Vital';
import DrProfile from './screens/patient/DrProfile';
import Patients from './screens/patient/Patients';
import AppointmentRoom from './screens/AppointmentRoom';
import Sample from './screens/patient/Sample';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default class Routes extends React.Component {

  _getDrawerComponent() {
    return (
      <Drawer.Navigator drawerContent={props => <MenuSlider {...props} />}>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
      </Drawer.Navigator>
    );
  }


  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false, headerTitleAlign: 'center', headerStyle: { backgroundColor: '#c0d4e2' } }} />

          <Stack.Screen
            name="MyDrawer"
            component={this._getDrawerComponent}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="BookingList"
            component={BookingList}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="AppointmentRoom"
            component={AppointmentRoom}
            options={{ headerShown: false }} />



          <Stack.Screen
            name="Demographics"
            component={Demographics}
            options={{ headerShown: false }} />


          <Stack.Screen
            name="VitalAdd"
            component={VitalAdd}
            options={{ headerShown: false }} />


          <Stack.Screen
            name="MadicationAdd"
            component={MadicationAdd}
            options={{ headerShown: false }} />


          <Stack.Screen
            name="MedicalCondition"
            component={MedicalCondition}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="AddReport"
            component={AddReport}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="Vital"
            component={Vital}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="DrProfile"
            component={DrProfile}
            options={{ headerShown: true, title: '', headerStyle: { backgroundColor: 'transparent' }, headerTransparent: true, headerTitleAlign: 'center', headerTitleStyle: { color: '#fff' }, headerTintColor: '#fff' }} />

          <Stack.Screen
            name="Patients"
            component={Patients}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="Sample"
            component={Sample}
            options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}