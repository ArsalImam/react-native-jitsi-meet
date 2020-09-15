import React, {Component} from 'react';
import Api from '../../Api';
import CommonStyles from '../../CommonStyles';
import {ListItem, CheckBox, Divider} from 'react-native-elements';
import {Icon} from 'native-base';
import {FlatGrid} from 'react-native-super-grid';
import {CommonActions} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import {AsyncStorage} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import Loader from '../../components/Loader';

export default class ChatLogs extends Component {
  constructor(props) {
    super(props);
    if (this.props.route.params) {
      this.state = {
        isLoading: true,
        diagnosisList: [],
        appointmentId: this.props.route.params.appointmentId,
        patientId: this.props.route.params.patientId,
        doctorId: '',
      };
    } else {
      this.state = {
        isLoading: true,
        diagnosisList: [],
      };
    }
  }

  componentDidMount() {
    this._getAllChats();
  }

  async _getAllChats() {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    this.setState({doctorId: _user.id});
    database()
      .ref(
        `messages/doctor_patient/${_user.id}/${
          this.props.route.params.patientId
        }`,
      )
      .on('value', appointmentEventObj => {
        if (appointmentEventObj == null) {
          return;
        }
        var firebaseEvent1 = appointmentEventObj.val();
        console.warn('_user.id === ', _user.id);
        console.warn('patientId === ', this.props.route.params.patientId);
        console.warn('data fireabse === ', firebaseEvent1);

        var original_data = Object.keys(
          // (this.firebaseEvent1: any).conversation
          firebaseEvent1.conversation,
        );

        console.warn('original_data === ', original_data);
        this.messages = original_data.map(function(key) {
          return appointmentEventObj.val().conversation[key];
        });

        this.messages.forEach((data: any) => {
          this.messageArray.push({
            message: data.message,
            userId: data.userId,
            time: data.time,
          });
        });
      });
  }

  async _user() {
    try {
      return JSON.parse(await AsyncStorage.getItem('@user'));
    } catch (e) {
      console.warn(e);
    }
  }

  _getLogChat(chat) {
    if (chat.userId == this.state.doctorId) {
      return (
        <View>
          <Text>{chat.message}</Text>
          <Text>{new Date(chat.time).toLocaleString("en-US")}</Text>
        </View>

        // <div
        //     className="row"
        //     style={{
        //         marginBottom: "10px",
        //         marginTop: "-10px",
        //     }}
        // >
        //     <span
        //         style={{
        //             marginRight: 10,
        //             marginTop: 30,
        //         }}
        //     >
        //         <img
        //             style={{
        //                 borderRadius: "50%",
        //                 height: 30,
        //                 width: 30,
        //             }}
        //             src="../../../../images/doctorss.jpg"
        //         />
        //     </span>
        //     <span>
        //         <span
        //             style={{
        //                 borderRadius: 10,
        //                 padding: "15px",
        //                 backgroundColor: "#1565c0",
        //                 color: "white",
        //             }}
        //         >
        //             <span style={{marginRight: "10px"}}>
        //                 {chat.message}{" "}
        //             </span>
        //             <span style={{color: "#d3d3d3"}}>
        //                 {new Date(chat.time).toLocaleString("en-US")}
        //             </span>
        //         </span>
        //     </span>
        // </div>
      );
    } else if (chat.userId == this.props.route.params.patientId) {
      return (
        <View>
        <Text>{chat.message}</Text>
        <Text>{new Date(chat.time).toLocaleString("en-US")}</Text>
      </View>
      );
    }
  }

  // componentWillMount() {
  //     Api.instance().getDiagnosisList()
  //         .then((data) => {
  //             console.warn('=====>', data["Diagnosis"])
  //             this.setState({ diagnosisList: data });
  //         }
  //         ).catch(err => console.log(err))
  //         .finally(() => {
  //             this.setState({ isLoading: false });
  //         })

  // }

  render() {
    return <Text>hhhhhhh</Text>;
    // if (this.state.appointmentId != null) {
    //   return (
    //     <View style={{height: '75%'}}>
    //       <ImageBackground
    //         style={[CommonStyles.container, CommonStyles.backgroundImage]}
    //         source={require('../../assets/img/background.png')}>
    //         <View style={{flex: 3, backgroundColor: '#297dec'}}>
    //           <Text style={{color: '#FFFFFF', paddingLeft: 17, marginTop: 65}}>
    //             <Text
    //               style={[
    //                 CommonStyles.fontRegular,
    //                 CommonStyles.textSizeLarge,
    //               ]}>{`Diagnosis List\n`}</Text>
    //             <Text
    //               style={[
    //                 CommonStyles.fontRegular,
    //                 CommonStyles.textSizeSmall,
    //               ]}>
    //               It is a list of your all Bookings{' '}
    //             </Text>
    //           </Text>
    //         </View>

    //         <View style={{flex: 8}}>
    //           <FlatGrid
    //             itemDimension={350}
    //             items={this.state.diagnosisList}
    //             spacing={15}
    //             style={[CommonStyles.container, {marginTop: 5}]}
    //             renderItem={({item}) => (
    //               <View
    //                 style={[
    //                   CommonStyles.container,
    //                   CommonStyles.shadow,
    //                   CommonStyles.br5,
    //                   CommonStyles.bgColor,
    //                 ]}>
    //                 <ImageBackground
    //                   style={[
    //                     CommonStyles.container,
    //                     CommonStyles.backgroundImage,
    //                   ]}
    //                   source={require('../../assets/img/bookingbg2x.png')}>
    //                   <TouchableOpacity
    //                     style={[
    //                       CommonStyles.container,
    //                       {flexDirection: 'row', padding: 12},
    //                     ]}
    //                     onPress={() => {
    //                       this.addDiagnosis(item);
    //                     }}>
    //                     <View
    //                       style={[
    //                         CommonStyles.container,
    //                         {justifyContent: 'space-between'},
    //                       ]}>
    //                       <Text style={{marginBottom: 10}}>
    //                         <Text
    //                           style={[
    //                             CommonStyles.fontRegular,
    //                             CommonStyles.textSizeSmall,
    //                             {color: '#333333'},
    //                           ]}>{`Diagnosis Name: \n`}</Text>
    //                         <Text
    //                           style={[
    //                             CommonStyles.fontMedium,
    //                             CommonStyles.textSizeAverage,
    //                             {color: '#333333'},
    //                           ]}>
    //                           {item.answer}
    //                         </Text>
    //                       </Text>

    //                       <Text>
    //                         <Text
    //                           style={[
    //                             CommonStyles.fontRegular,
    //                             CommonStyles.textSizeSmall,
    //                             {color: '#333333'},
    //                           ]}>{`Description: \n`}</Text>
    //                         <Text
    //                           style={[
    //                             CommonStyles.fontMedium,
    //                             CommonStyles.textSizeAverage,
    //                             {color: '#333333'},
    //                           ]}>
    //                           {item.notes}
    //                         </Text>
    //                       </Text>
    //                     </View>

    //                     <View
    //                       style={[
    //                         CommonStyles.container,
    //                         {
    //                           justifyContent: 'space-between',
    //                           alignItems: 'flex-end',
    //                         },
    //                       ]}>
    //                       <Text>
    //                         <Text
    //                           style={[
    //                             CommonStyles.textSizeSmall,
    //                             CommonStyles.fontRegular,
    //                             {color: '#333333'},
    //                           ]}>{`Date: `}</Text>
    //                         <Text
    //                           style={[
    //                             CommonStyles.fontMedium,
    //                             CommonStyles.textSizeAverage,
    //                             {color: '#333333'},
    //                           ]}>
    //                           {moment(item.createdAt).format('ll')}
    //                         </Text>
    //                       </Text>
    //                     </View>
    //                   </TouchableOpacity>
    //                 </ImageBackground>
    //               </View>
    //             )}
    //           />
    //         </View>

    //         <View
    //           style={[
    //             CommonStyles.fitToBottom,
    //             CommonStyles.horizontalContainer,
    //             {
    //               backgroundColor: '#F7FAFE',
    //               borderTopRightRadius: 5,
    //               borderTopStartRadius: 5,
    //               borderTopWidth: 3,
    //               borderColor: '#FFF',
    //             },
    //           ]}>
    //           <TouchableOpacity
    //             onPress={() => {
    //               this.props.navigation.navigate('DiagnosisAdd', {
    //                 appointmentId: this.props.route.params.appointmentId,
    //                 patientId: this.props.route.params.patientId,
    //                 onDiagnosisAdd: () => this._getDiagnosisList(),
    //               });
    //             }}
    //             style={[
    //               CommonStyles.container,
    //               CommonStyles.centerText,
    //               {borderRightWidth: 0.5, borderColor: '#cfd2d6'},
    //             ]}>
    //             <Text
    //               style={[
    //                 CommonStyles.fontRegular,
    //                 CommonStyles.textSizeNormal,
    //                 CommonStyles.centerText,
    //                 CommonStyles.margin,
    //                 CommonStyles.padding,
    //                 {opacity: 0.5},
    //               ]}>
    //               Add Diagnosis
    //             </Text>
    //           </TouchableOpacity>
    //         </View>
    //         <Loader loading={this.state.isLoading} />
    //         <View style={[CommonStyles.backButtonStyle]}>
    //           <TouchableOpacity
    //             onPress={() => {
    //               this.props.navigation.goBack();
    //             }}>
    //             <Icon
    //               name="arrow-back"
    //               type="MaterialIcons"
    //               style={{color: '#FFF'}}
    //             />
    //           </TouchableOpacity>
    //         </View>
    //       </ImageBackground>
    //     </View>
    //   );
    // } else {
    //   return (
    //     <View style={[CommonStyles.container]}>
    //       <ImageBackground
    //         style={[CommonStyles.container, CommonStyles.backgroundImage]}
    //         source={require('../../assets/img/bwback.png')}>
    //         <View style={{flex: 2.3}}>
    //           <Text style={{color: '#FFFFFF', paddingLeft: 17, marginTop: 65}}>
    //             <Text
    //               style={[
    //                 CommonStyles.fontRegular,
    //                 CommonStyles.textSizeLarge,
    //               ]}>{`Diagnosis List\n`}</Text>
    //             <Text
    //               style={[
    //                 CommonStyles.fontRegular,
    //                 CommonStyles.textSizeSmall,
    //               ]}>
    //               It is a list of your all Bookings{' '}
    //             </Text>
    //           </Text>
    //         </View>

    //         <View style={{flex: 8}}>
    //           <FlatGrid
    //             itemDimension={350}
    //             items={this.state.diagnosisList}
    //             spacing={15}
    //             style={[CommonStyles.container, {marginTop: 5}]}
    //             renderItem={({item}) => (
    //               <View
    //                 style={[
    //                   CommonStyles.container,
    //                   CommonStyles.shadow,
    //                   CommonStyles.br5,
    //                   CommonStyles.bgColor,
    //                 ]}>
    //                 <ImageBackground
    //                   style={[
    //                     CommonStyles.container,
    //                     CommonStyles.backgroundImage,
    //                   ]}
    //                   source={require('../../assets/img/bookingbg2x.png')}>
    //                   <View
    //                     style={[
    //                       CommonStyles.container,
    //                       {flexDirection: 'row', padding: 12},
    //                     ]}>
    //                     <View
    //                       style={[
    //                         CommonStyles.container,
    //                         {justifyContent: 'space-between'},
    //                       ]}>
    //                       <Text style={{marginBottom: 10}}>
    //                         <Text
    //                           style={[
    //                             CommonStyles.fontRegular,
    //                             CommonStyles.textSizeSmall,
    //                             {color: '#333333'},
    //                           ]}>{`Diagnosis Name: \n`}</Text>
    //                         <Text
    //                           style={[
    //                             CommonStyles.fontMedium,
    //                             CommonStyles.textSizeAverage,
    //                             {color: '#333333'},
    //                           ]}>
    //                           {item.name}
    //                         </Text>
    //                       </Text>

    //                       <Text>
    //                         <Text
    //                           style={[
    //                             CommonStyles.fontRegular,
    //                             CommonStyles.textSizeSmall,
    //                             {color: '#333333'},
    //                           ]}>{`Description: \n`}</Text>
    //                         <Text
    //                           style={[
    //                             CommonStyles.fontMedium,
    //                             CommonStyles.textSizeAverage,
    //                             {color: '#333333'},
    //                           ]}>
    //                           {item.description}
    //                         </Text>
    //                       </Text>
    //                     </View>

    //                     <View
    //                       style={[
    //                         CommonStyles.container,
    //                         {
    //                           justifyContent: 'space-between',
    //                           alignItems: 'flex-end',
    //                         },
    //                       ]}>
    //                       <Text>
    //                         <Text
    //                           style={[
    //                             CommonStyles.textSizeSmall,
    //                             CommonStyles.fontRegular,
    //                             {color: '#333333'},
    //                           ]}>{`Date: `}</Text>
    //                         <Text
    //                           style={[
    //                             CommonStyles.fontMedium,
    //                             CommonStyles.textSizeAverage,
    //                             {color: '#333333'},
    //                           ]}>
    //                           {moment(item.createdAt).format('ll')}
    //                         </Text>
    //                       </Text>
    //                     </View>
    //                   </View>
    //                 </ImageBackground>
    //               </View>
    //             )}
    //           />
    //         </View>

    //         <View
    //           style={[
    //             CommonStyles.fitToBottom,
    //             CommonStyles.horizontalContainer,
    //             {
    //               backgroundColor: '#F7FAFE',
    //               borderTopRightRadius: 5,
    //               borderTopStartRadius: 5,
    //               borderTopWidth: 3,
    //               borderColor: '#FFF',
    //             },
    //           ]}>
    //           <TouchableOpacity
    //             onPress={() => {
    //               this.props.navigation.navigate('DiagnosisAdd', {
    //                 onDiagnosisAdd: () => this._getDiagnosisList(),
    //               });
    //             }}
    //             style={[
    //               CommonStyles.container,
    //               CommonStyles.centerText,
    //               {borderRightWidth: 0.5, borderColor: '#cfd2d6'},
    //             ]}>
    //             <Text
    //               style={[
    //                 CommonStyles.fontRegular,
    //                 CommonStyles.textSizeNormal,
    //                 CommonStyles.centerText,
    //                 CommonStyles.margin,
    //                 CommonStyles.padding,
    //                 {opacity: 0.5},
    //               ]}>
    //               Add Diagnosis
    //             </Text>
    //           </TouchableOpacity>
    //         </View>
    //         <Loader loading={this.state.isLoading} />
    //         <View style={[CommonStyles.backButtonStyle]}>
    //           <TouchableOpacity
    //             onPress={() => {
    //               this.props.navigation.goBack();
    //             }}>
    //             <Icon
    //               name="arrow-back"
    //               type="MaterialIcons"
    //               style={{color: '#FFF'}}
    //             />
    //           </TouchableOpacity>
    //         </View>
    //       </ImageBackground>
    //     </View>
    //   );
    // }
  }
}
