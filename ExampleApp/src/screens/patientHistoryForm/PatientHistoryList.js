import React, { Component } from 'react';
import Api from '../../Api';
import CommonStyles from '../../CommonStyles';
import { ListItem, CheckBox, Divider,Input , Button } from 'react-native-elements';
import { Icon } from 'native-base';
import { FlatGrid } from 'react-native-super-grid';
import { CommonActions } from '@react-navigation/native';
import { StyleSheet, Text, View, ImageBackground, StatusBar, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Loader from '../../components/Loader';
import {Roles} from '../.././Configs';
import { ViewUtils } from '../../Utils'

// import { Button } from 'react-native-paper';

export default class PatientHistoryList extends Component {
                 constructor(props) {
                   super(props);
                   if (this.props.route.params) {
                     this.state = {
                       isLoading: true,
                       patientHistoryList: [],
                       appointmentId: this.props.route.params
                         .appointmentId,
                       patientId: this.props.route.params
                         .patientId,
                       description: '',
                       
                     };
                   } else {
                     this.state = {
                       isLoading: true,
                       patientHistoryList: [],
                       role:''
                     };
                   }
                 }


                 componentDidMount(){
                  Api.instance().getUserRole().then(role => this.setState({role}));

                   this._getPatientHistoryList();

                 }
                 _getPatientHistoryList(){
                   this.setState({isLoading: true});
                   console.warn("kahin")
                   Api.instance()
                     .getPatientHistoryList()
                     .then(data => {
                       this.setState({patientHistoryList: data});
                     })
                     .catch(err => console.log(err))
                     .finally(() => {
                       this.setState({isLoading: false});
                     });
                 }


                 componentDidMount(){
                   this._getPatientHistoryList()
                 }


                 addToConsultation(item) {
                   item.setupType = 'patientHistoryForm';
                   Api.instance()
                     .addReport(
                       item,
                       this.state.appointmentId,
                       this.state.patientId,
                     )
                     .then(response => {
                       console.warn(response);
                       this.props.navigation.goBack();
                     })
                     .catch(err => {})
                     .finally(() => {});
                 }

                  handleChange(evt) {
                  const value = evt.target.value;
                  setState({
                    ...state,
                    [evt.target.name]: value
                  });
                }

                 updateAnswer = id => {
                 let data = {
                      "setupType": "patientHistoryForm",
                       "description": this.state.description,
                      }
                 
                   Api.instance()
                     .updatePatientHistoryList(id, data)
                     .then(res => {
                       console.warn(res);
                     })
                     .catch(err => {
                       ViewUtils.showAlert('Unable to Update');
                     });
                 };

                 _handleMultiInput(name) {
                  return (text) => {
                      this.setState({ [name]:text })
                  }
              }

                 render() {
                   if (this.state.appointmentId != null) {
                     return (
                       <View style={{height: '75%'}}>
                         <ImageBackground
                           style={[
                             CommonStyles.container,
                             CommonStyles.backgroundImage,
                           ]}
                           source={require('../../assets/img/background.png')}>
                           <View
                             style={{
                               flex: 3,
                               backgroundColor: '#297dec',
                             }}>
                             <Text
                               style={{
                                 color: '#FFFFFF',
                                 paddingLeft: 17,
                                 marginTop: 65,
                               }}>
                               <Text
                                 style={[
                                   CommonStyles.fontRegular,
                                   CommonStyles.textSizeLarge,
                                 ]}>{`Patient History List\n`}</Text>
                               <Text
                                 style={[
                                   CommonStyles.fontRegular,
                                   CommonStyles.textSizeSmall,
                                 ]}>
                                 It is a list of Patient History{' '}
                               </Text>
                             </Text>
                           </View>

                           <View style={{flex: 8}}>
                             <FlatGrid
                               itemDimension={350}
                               items={
                                 this.state.patientHistoryList
                               }
                               spacing={15}
                               style={[
                                 CommonStyles.container,
                                 {marginTop: 5},
                               ]}
                               renderItem={({item}) => (
                                 <View
                                   style={[
                                     CommonStyles.container,
                                     CommonStyles.shadow,
                                     CommonStyles.br5,
                                     CommonStyles.bgColor,
                                   ]}>
                                   <ImageBackground
                                     style={[
                                       CommonStyles.container,
                                       CommonStyles.backgroundImage,
                                     ]}
                                     source={require('../../assets/img/bookingbg2x.png')}>
                                     <TouchableOpacity
                                       style={[
                                         CommonStyles.container,
                                         {padding: 12},
                                       ]}
                                       onPress={() => {
                                         this.addToConsultation(
                                           item,
                                         );
                                       }}>
                                       <View
                                         style={[
                                           CommonStyles.container,
                                           {
                                             justifyContent:
                                               'space-between',
                                           },
                                         ]}>
                                         <Text
                                           style={{
                                             marginBottom: 10,
                                           }}>
                                           <Text
                                             style={[
                                               CommonStyles.fontRegular,
                                               CommonStyles.textSizeSmall,
                                               {
                                                 color:
                                                   '#333333',
                                               },
                                             ]}>{`Question: \n`}</Text>
                                           <Text
                                             style={[
                                               CommonStyles.fontMedium,
                                               CommonStyles.textSizeAverage,
                                               {
                                                 color:
                                                   '#333333',
                                               },
                                             ]}>
                                             {item.name}
                                           </Text>
                                         </Text>

                                         <Text>
                                           <Text
                                             style={[
                                               CommonStyles.textSizeSmall,
                                               CommonStyles.fontRegular,
                                               {
                                                 color:
                                                   '#333333',
                                               },
                                             ]}>{`Date: `}</Text>
                                           <Text
                                             style={[
                                               CommonStyles.fontMedium,
                                               CommonStyles.textSizeAverage,
                                               {
                                                 color:
                                                   '#333333',
                                               },
                                             ]}>
                                             {moment(
                                               item.createdAt,
                                             ).format('ll')}
                                           </Text>
                                         </Text>
                                       </View>
                                     </TouchableOpacity>
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
                                 borderColor: '#FFF',
                               },
                             ]}>
                             <TouchableOpacity
                               onPress={() => {
                                 this.props.navigation.navigate(
                                   'PatientHistoryAdd',
                                   {
                                     appointmentId: this.state
                                       .appointmentId,
                                     onPatientHistoryAdd: () =>
                                       this._getPatientHistoryList(),
                                   },
                                 );
                               }}
                               style={[
                                 CommonStyles.container,
                                 CommonStyles.centerText,
                                 {
                                   borderRightWidth: 0.5,
                                   borderColor: '#cfd2d6',
                                 },
                               ]}>
                               <Text
                                 style={[
                                   CommonStyles.fontRegular,
                                   CommonStyles.textSizeNormal,
                                   CommonStyles.centerText,
                                   CommonStyles.margin,
                                   CommonStyles.padding,
                                   {opacity: 0.5},
                                 ]}>
                                 Add Patient History
                               </Text>
                             </TouchableOpacity>
                           </View>
                           <Loader
                             loading={this.state.isLoading}
                           />
                           <View
                             style={[
                               CommonStyles.backButtonStyle,
                             ]}>
                             <TouchableOpacity
                               onPress={() => {
                                 this.props.navigation.goBack();
                               }}>
                               <Icon
                                 name="arrow-back"
                                 type="MaterialIcons"
                                 style={{color: '#FFF'}}
                               />
                             </TouchableOpacity>
                           </View>
                         </ImageBackground>
                       </View>
                     );
                   } else {
                     return (
                       <View style={[CommonStyles.container]}>
                         <ImageBackground
                           style={[
                             CommonStyles.container,
                             CommonStyles.backgroundImage,
                           ]}
                           source={require('../../assets/img/bwback.png')}>
                           <View style={{flex: 2.3}}>
                             <Text
                               style={{
                                 color: '#FFFFFF',
                                 paddingLeft: 17,
                                 marginTop: 65,
                               }}>
                               <Text
                                 style={[
                                   CommonStyles.fontRegular,
                                   CommonStyles.textSizeLarge,
                                 ]}>{`Patient History List\n`}</Text>
                               <Text
                                 style={[
                                   CommonStyles.fontRegular,
                                   CommonStyles.textSizeSmall,
                                 ]}>
                                 It is a list of Patient History{' '}
                               </Text>
                             </Text>
                           </View>

                           <View style={{flex: 8}}>
                             <FlatGrid
                               itemDimension={350}
                               items={
                                 this.state.patientHistoryList
                               }
                               spacing={15}
                               style={[
                                 CommonStyles.container,
                                 {marginTop: 5},
                               ]}
                               renderItem={({item}) => (
                                 <View
                                   style={[
                                     CommonStyles.container,
                                     CommonStyles.shadow,
                                     CommonStyles.br5,
                                     CommonStyles.bgColor,
                                   ]}>
                                   <ImageBackground
                                     style={[
                                       CommonStyles.container,
                                       CommonStyles.backgroundImage,
                                     ]}
                                     source={require('../../assets/img/bookingbg2x.png')}>
                                     <View
                                       style={[
                                         CommonStyles.container,
                                         {padding: 12},
                                       ]}>
                                       <View
                                         style={[
                                           CommonStyles.container,
                                           {
                                             justifyContent:
                                               'space-between',
                                           },
                                         ]}>
                                         <Text
                                           style={{
                                             marginBottom: 10,
                                           }}>
                                           <Text
                                             style={[
                                               CommonStyles.fontRegular,
                                               CommonStyles.textSizeSmall,
                                               {
                                                 color:
                                                   '#333333',
                                               },
                                             ]}>{`Question: \n`}</Text>
                                           <Text
                                             style={[
                                               CommonStyles.fontMedium,
                                               CommonStyles.textSizeAverage,
                                               {
                                                 color:
                                                   '#333333',
                                               },
                                             ]}>
                                             {item.name}
                                           </Text>
                                         </Text>

                                         <Text
                                           style={{
                                             marginBottom: 10,
                                           }}>
                                           <Text
                                             style={[
                                               CommonStyles.fontRegular,
                                               CommonStyles.textSizeSmall,
                                               {
                                                 color:
                                                   '#333333',
                                               },
                                             ]}>{`Answer: \n`}</Text>
                                           <Text
                                             style={[
                                               CommonStyles.fontMedium,
                                               CommonStyles.textSizeAverage,
                                               {
                                                 color:
                                                   '#333333',
                                               },
                                             ]}>
                                             {item.description}
                                           </Text>
                                         </Text>
                                         {this.state.role ==
                                           Roles.patient && (
                                           <Input
                                           placeholder="Answer.."
                                           onChangeText={this._handleMultiInput('description')}
                                           
                                            //  placeholder="Answer.."
                                            //  value={
                                            //    this.state
                                            //      .description
                                            //  }
                                            //  onChangeText={val =>
                                            //    this.setState({
                                            //      description: val,
                                            //    })
                                            //  }
                                           />
                                         )}

                                         <Text>
                                           <Text
                                             style={[
                                               CommonStyles.textSizeSmall,
                                               CommonStyles.fontRegular,
                                               {
                                                 color:
                                                   '#333333',
                                               },
                                             ]}>{`Date: `}</Text>
                                           <Text
                                             style={[
                                               CommonStyles.fontMedium,
                                               CommonStyles.textSizeAverage,
                                               {
                                                 color:
                                                   '#333333',
                                               },
                                             ]}>
                                             {moment(
                                               item.createdAt,
                                             ).format('ll')}
                                           </Text>
                                         </Text>
                                       </View>
                                     </View>
                                     {this.state.role ==
                                       Roles.patient && (
                                       <Button
                                         title="Answer"
                                         type="solid"
                                         onPress={() => {
                                           this.updateAnswer(
                                             item.id,
                                           );
                                         }}
                                       />
                                     )}
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
                                 borderColor: '#FFF',
                               },
                             ]}>
                             <TouchableOpacity
                               onPress={() => {
                                 this.props.navigation.navigate(
                                   'PatientHistoryAdd',
                                   {
                                     onPatientHistoryAdd: () =>
                                       this._getPatientHistoryList(),
                                   },
                                 );
                               }}
                               style={[
                                 CommonStyles.container,
                                 CommonStyles.centerText,
                                 {
                                   borderRightWidth: 0.5,
                                   borderColor: '#cfd2d6',
                                 },
                               ]}>
                               {this.state.role !=
                                 Roles.patient && (
                                 <Text
                                   style={[
                                     CommonStyles.fontRegular,
                                     CommonStyles.textSizeNormal,
                                     CommonStyles.centerText,
                                     CommonStyles.margin,
                                     CommonStyles.padding,
                                     {opacity: 0.5},
                                   ]}>
                                   Add Patient History
                                 </Text>
                               )}
                             </TouchableOpacity>
                           </View>
                           <Loader
                             loading={this.state.isLoading}
                           />
                           <View
                             style={[
                               CommonStyles.backButtonStyle,
                             ]}>
                             <TouchableOpacity
                               onPress={() => {
                                 this.props.navigation.goBack();
                               }}>
                               <Icon
                                 name="arrow-back"
                                 type="MaterialIcons"
                                 style={{color: '#FFF'}}
                               />
                             </TouchableOpacity>
                           </View>
                         </ImageBackground>
                       </View>
                     );
                   }
                 }
               }