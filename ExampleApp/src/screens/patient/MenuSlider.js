import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Text, } from 'react-native';
import { Container, Content, Icon, Item, Label } from 'native-base';
import { FlatGrid } from 'react-native-super-grid'
import CommonStyles from '../../CommonStyles';


class MenuSlider extends React.Component {
    render() {
        const main = [
            { name: 'Vital', iconName: 'activity', iconFamily: 'Feather', iconSize: '18', route: 'Vital' },
            { name: 'Medication', iconName: 'medicinebox', iconFamily: 'AntDesign', iconSize: '18', route: 'MadicationAdd' },
            { name: 'Medical Condition', iconName: 'bed', iconFamily: 'FontAwesome', iconSize: '18', route: 'MedicalCondition' },
            { name: 'Allergies', iconName: 'ios-flower', iconFamily: 'Ionicon', iconSize: '18', route: 'MyTabs' },
            { name: 'Surgeries', iconName: 'box-cutter', iconFamily: 'MaterialCommunityIcons', iconSize: '18', route: '' },
            { name: 'Dental Issue', iconName: 'tooth-outline', iconFamily: 'MaterialCommunityIcons', iconSize: '18', route: '' },
            { name: 'Reports', iconName: 'notebook', iconFamily: 'SimpleLineIcons', iconSize: '20', route: '' },       
        ];

        return (
            <View style={[CommonStyles.container, CommonStyles.padding, { backgroundColor: '#297dec', }]}>
                <Content>
                    <View 
                        style={[CommonStyles.padding, CommonStyles.mtt10, {borderColor: "#fff", borderBottomColor: '#FFF', borderBottomWidth: 1 }]} >
                        <Label style={[CommonStyles.fontRegular, { color: '#fff' }]}> Personal Profile</Label>
                    </View>

                    <View style={[CommonStyles.container,
                    { flexDirection: 'row', paddingLeft: 25 , marginTop: 10 }]}>
                        <Icon style={[CommonStyles.padding, { fontSize: 20, color: '#FFF' }]}
                            name='clipboard-notes' type='Foundation' ></Icon>
                        <Text style={[CommonStyles.fontRegular,
                        CommonStyles.padding,
                        //CommonStyles.margin,
                        CommonStyles.centerText,
                        { color: '#FFF', }
                        ]}>Demographics</Text>
                    </View>
                    
                    <View 
                        style={[CommonStyles.padding, CommonStyles.mtt10, {borderColor: "#fff", borderBottomColor: '#FFF', borderBottomWidth: 1 }]} >
                        <Label style={[CommonStyles.fontRegular, { color: '#fff' }]}> Medical Profile</Label>
                    </View>


                    <FlatGrid
                        style={[CommonStyles.container, {marginTop: 5}]}
                        itemDimension={400}
                        items={main}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(`${item.route}`)}>
                                <View style={[CommonStyles.container,
                                { flexDirection: 'row', marginLeft: item.marginleft, paddingLeft: 15 }]}>
                                    <Icon style={[CommonStyles.padding, { fontSize: 20, color: '#FFF' }]}
                                        name={item.iconName} type={item.iconFamily} ></Icon>
                                    <Text style={[CommonStyles.fontRegular,
                                    CommonStyles.padding,
                                    //CommonStyles.margin,
                                    CommonStyles.centerText,
                                    { color: '#FFF', }
                                    ]}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />

                  
                </Content>


                <View style={[CommonStyles.fitToBottom, 
                    { flexDirection: 'row', paddingLeft: 15, borderWidth: 1, borderColor: '#fff'}]}>
                        <Icon style={[CommonStyles.padding, { fontSize: 20, color: '#FFF' }]}
                            name='exit-to-app' type='MaterialCommunityIcons' ></Icon>
                        <Text style={[CommonStyles.fontRegular,
                        CommonStyles.padding,
                        //CommonStyles.margin,
                        CommonStyles.centerText,
                        { color: '#FFF', }
                        ]}>Sign Out</Text>
                    </View>

            </View>
        )
    }
}

export default MenuSlider;


// <View style={styles.container}>
//         <DrawerContentScrollView>                              <Icon
//                             name="adduser"
//                             color={color}
//                             size={size}
//                             type='antdesign'
//                         />
//                     )}
//                     label="Medical Profile"
//                 //onPress={() => {props.navigation.navigate('Profile')}}
//                 />
//                 <DrawerItem style={{ marginLeft: '23%' }}
//                     icon={({ color, size }) => (
//                         <Icon
//                             name="activity"
//                             color={color}
//                             size={size}
//                             type='feather'
//                         />
//                     )}
//                     label="Vital"
//                     onPress={() => { props.navigation.navigate('Vital') }}
//                 />
//                 <DrawerItem style={{ marginLeft: '23%' }}
//                     icon={({ color, size }) => (
//                         <Icon
//                             name="medicinebox"
//                             color={color}
//                             size={size}
//                             type='antdesign'
//                         />
//                     )}
//                     label="Medication"
//                     onPress={() => { props.navigation.navigate('MadicationAdd') }}
//                 />
//                 <DrawerItem style={{ marginLeft: '23%' }}
//                     icon={({ color, size }) => (
//                         <Icon
//                             name="bed"
//                             color={color}
//                             size={size}
//                             type='font-awesome'
//                         />
//                     )}
//                     label="Medical Condition"
//                     onPress={() => {props.navigation.navigate('MedicalCondition')}}
//                 />
//                 <DrawerItem style={{ marginLeft: '23%' }}
//                     icon={({ color, size }) => (
//                         <Icon
//                             name="ios-flower"
//                             color={color}
//                             size={size}
//                             type='ionicon'
//                         />
//                     )}
//                     label="Allergies"
//                     onPress={() => { props.navigation.navigate('BookingList') }}
//                 />
//                 <DrawerItem style={{ marginLeft: '23%' }}
//                     icon={({ color, size }) => (
//                         <Icon
//                             name="box-cutter"
//                             color={color}
//                             size={size}
//                             type='material-community'
//                         />
//                     )}
//                     label="Surgeries"
//                  //   onPress={() => { props.navigation.navigate('Sample') }}
//                 />
//                 <DrawerItem style={{ marginLeft: '23%' }}
//                     icon={({ color, size }) => (
//                         <Icon
//                             name="tooth-outline"
//                             color={color}
//                             size={size}
//                             type='material-community'
//                         />
//                     )}
//                     label="Dental Issue"
//                // onPress={() => {props.navigation.navigate('Patients')}}
//                 />
//                 <DrawerItem style={{ marginLeft: '25%' }}
//                     icon={({ color, size }) => (
//                         <Icon
//                             name="clipboard-notes"
//                             color={color}
//                             size={size}
//                             type='foundation'
//                         />
//                     )}
//                     label="Reports"
//                     onPress={() => { props.navigation.navigate('AddReport') }}
//                 />
//                 <DrawerItem
//                     icon={({ color, size }) => (
//                         <Icon
//                             name="settings"
//                             color={color}
//                             size={size}
//                             type='feather'
//                         />
//                     )}
//                     label="Settings"
//                 //onPress={() => {props.navigation.navigate('Profile')}}
//                 />
//                 <DrawerItem style={{ marginLeft: '23%' }}
//                     icon={({ color, size }) => (
//                         <Icon
//                             name="bell"
//                             color={color}
//                             size={size}
//                             type='feather'
//                         />
//                     )}
//                     label="Change Ringtone"
//                   //  onPress={() => { props.navigation.navigate('VitalAdd') }}
//                 />

//             </Drawer.Section>

//         </DrawerContentScrollView>

//         <Drawer.Section style={styles.bottomDrawerSection}>
//             <DrawerItem
//                 icon={({ color, size }) => (
//                     <Icon
//                         name="exit-to-app"
//                         color={color}
//                         size={size}
//                     />
//                 )}
//                 label="Sign Out"
//                 onPress={() => { props.navigation.navigate('Login')}}
//             />
//         </Drawer.Section>
// </View>


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#ebf2f9',
//         alignContent: 'center',
//     },
//     textStyle: {
//         fontSize: 22,
//         color: '#fff',
//         justifyContent: 'center',
//         alignSelf: 'center',
//         padding: 12
//     },
//     buttonStyle: {
//         width: '80%',
//         height: 60,
//         backgroundColor: 'black',
//         borderRadius: 10,
//     }
// })
