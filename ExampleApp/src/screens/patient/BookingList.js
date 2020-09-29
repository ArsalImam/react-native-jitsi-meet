import React, {Component} from 'react';
import {Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {CheckBox} from 'react-native-elements';
import CommonStyles from '../../CommonStyles';
import Api from '../../Api';
import {Icon} from 'native-base';
import Loader from '../../components/Loader';
import {AppointmentStatus, Roles} from '../../Configs';
import moment from 'moment';
import {ViewUtils} from '../../Utils';

export default class BookingList extends Component {
  state = {
    appointments: [],
    isLoading: false,
    todaysAppointments: [],
    isScheduled: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    this.setState({isLoading: true});
    Api.instance()
      .getMyAppointments(AppointmentStatus.available, true)
      .then(appointments => {
        console.warn("appointments :: ",appointments.reverse())
        // let data = appointments.reverse()
        // console.warn("appointments :: ",data)
        this.setState({appointments});
      })
      .catch(err => {
        console.warn("erororor  :: ",err)
        //ViewUtils.showToast(err);
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  render() {

    return (
      <View style={[CommonStyles.container]}>
        <ImageBackground
          style={[CommonStyles.container, CommonStyles.backgroundImage]}
          source={require('../../assets/img/bwback.png')}>
          <Loader loading={this.state.isLoading} />

          <View
            style={[CommonStyles.container, CommonStyles.padding, {flex: 2}]}>
            <Text style={{color: '#FFFFFF', paddingLeft: 12, marginTop: '15%'}}>
              <Text
                style={[
                  CommonStyles.DINAltBold,
                  CommonStyles.textSizeLarge,
                ]}>{`Available\n`}</Text>
              <Text
                style={[
                  CommonStyles.fontRegular,
                  CommonStyles.textSizeAverage,
                ]}>
                It is a list of your all available bookings{' '}
              </Text>
            </Text>
          </View>
          <View style={{flex: 8, paddingHorizontal: 2, paddingBottom: 55}}>
            <FlatGrid
              itemDimension={320}
              spacing={15}
              items={this.state.appointments.slice().reverse()}
              style={[CommonStyles.container]}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    CommonStyles.container,
                    CommonStyles.shadow,
                    CommonStyles.br5,
                    CommonStyles.bgColor,
                  ]}
                  
                  onPress={() => {
                    Api.instance()
                      .getUserRole()
                      .then(role => {
                        if (role === Roles.patient) {
                          this._createAppointment(item.id);
                        } else {
                          this.props.navigation.navigate(`Patients`, {
                            appointmentId: item.id,
                            moveTo: 'createAppointment',
                          });
                        }
                      });
                  }}>
                  <ImageBackground
                    style={[
                      CommonStyles.container,
                      CommonStyles.backgroundImage,
                    ]}
                    source={require('../../assets/img/bookingbg2x.png')}>
                    <View
                      style={[
                        CommonStyles.container,
                        {
                          flexDirection: 'row',
                          paddingHorizontal: 20,
                          paddingVertical: 5,
                        },
                      ]}>
                      <View
                        style={[
                          CommonStyles.container,
                          {
                            justifyContent: 'space-between',
                            paddingVertical: 12,
                          },
                        ]}>
                        <Text>
                          <Text
                            style={[
                              CommonStyles.fontRegular,
                              CommonStyles.textSizeSmall,
                              {color: '#333333'},
                            ]}>{`Patient Name\n`}</Text>
                          <Text
                            style={[
                              CommonStyles.fontMedium,
                              CommonStyles.textSizeAverage,
                              {color: '#333333'},
                            ]}>
                            {'-'}
                          </Text>
                        </Text>

                        <Text
                          style={[
                            CommonStyles.textSizeAverage,
                            {color: '#333333'},
                          ]}>
                          <Text
                            style={[
                              CommonStyles.fontRegular,
                              CommonStyles.textSizeSmall,
                            ]}>{`Time: `}</Text>
                          <Text style={CommonStyles.fontMedium}>
                            {moment(item.date).format('hh:mm A')}
                          </Text>
                        </Text>
                      </View>
                      <View
                        style={[
                          CommonStyles.container,
                          {justifyContent: 'space-between'},
                        ]}>
                        <View
                          style={[
                            CommonStyles.container,
                            {
                              justifyContent: 'space-between',
                              alignItems: 'flex-end',
                              marginBottom: 7,
                            },
                          ]}>
                          <CheckBox
                            containerStyle={{
                              backgroundColor: 'rgba(52, 52, 52, 0.0)',
                              borderColor: 'rgba(52, 52, 52, 0.0)',
                              marginRight: -12,
                            }}
                            textStyle={[
                              CommonStyles.textSizeSmall,
                              {
                                color: this._getCheckboxColor(item.status),
                                fontWeight: '600',
                              },
                            ]}
                            iconRight
                            iconType="material"
                            checkedIcon="check-box"
                            uncheckedIcon="add"
                            checkedColor={this._getCheckboxColor(item.status)}
                            uncheckedColor="#9CD85B"
                            title={item.status}
                            checked={true}
                          />
                          <Text style={{marginBottom: 6}}>
                            <Text
                              style={[
                                CommonStyles.textSizeSmall,
                                CommonStyles.fontRegular,
                                {color: '#333333'},
                              ]}>{`Date: `}</Text>
                            <Text
                              style={[
                                CommonStyles.fontMedium,
                                CommonStyles.textSizeAverage,
                                {color: '#333333'},
                              ]}>
                              {moment(item.date).format('DD-MM-yyyy')}
                            </Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                  <View
                    style={[
                      CommonStyles.container,
                      {
                        justifyContent: 'center',
                        backgroundColor: '#E53935',
                        marginTop: 5,
                        borderBottomEndRadius: 5,
                        borderBottomStartRadius: 5,
                      },
                    ]}>
                    <View
                      style={[
                        CommonStyles.container,
                        CommonStyles.centerElement,
                        {flexDirection: 'row'},
                      ]}>
                      <Icon
                        name="clock"
                        type="Fontisto"
                        style={{fontSize: 20, color: '#FFF', margin: 10}}
                      />
                      <Text
                        style={[
                          CommonStyles.textColorWhite,
                          CommonStyles.centerText,
                          CommonStyles.padding,
                        ]}>
                        BOOK NOW
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
  _getCheckboxColor(status) {
    switch (status) {
      case AppointmentStatus.scheduled:
        return '#1976d2';
      case AppointmentStatus.available:
        return '#E53935';
      case AppointmentStatus.completed:
        return '#9CD85B';
    }
  }

  // _getTodaysAppointments() {
  //   let that = this;
  //   Api.instance()
  //     ._user()
  //     .then(user => {
  //       Api.instance()
  //         .getTodaysAppointments(user.id)
  //         .then(response => {
  //           console.warn("response ::: ",response)
  //           if(response.length > 0){
  //             this.setState({todaysAppointments: response});
  //           }
  //         })
  //         .catch(err => {
  //           ViewUtils.showToast(err);
  //         })
  //         .finally(() => that.setState({isLoading: false}));
  //     });
  // }

  _getScheduledAppointments(appointmentId){
    Api.instance()
    .getScheduledAppointments()
    .then(res => {
      console.warn("res sss ::: ",res)
      if(res.length > 0){
        ViewUtils.showAlert('Cannot create more than one appointment in a day.')
      }else{
          let that = this;
          ViewUtils.showAlert(
            'Do you want to create appointment?',
            () => {
              this.setState({isLoading: true});
              Api.instance()
                ._user()
                .then(user => {
                  Api.instance()
                    .updateAppointment(appointmentId, user.id)
                    .then(() => {
                      console.warn('user.id ::: ', user.id);
                      ViewUtils.showToast(
                        'Appointment has been booked successfully',
                      );
                      this.refreshList();
                    })
                    .catch(err => {
                      //ViewUtils.showToast(err);
                    })
                    .finally(() => that.setState({isLoading: false}));
                });
            },
            () => {},
          );
      }
      //console.warn("res ::: ",res)
    })
    .catch(err => {
      console.warn("erororor  :: ",err)
      //ViewUtils.showToast(err);
    })
    .finally(() => {
      this.setState({isLoading: false});
    });
  }


  _createAppointment(appointmentId) {

    this._getScheduledAppointments(appointmentId);

    console.warn("this.state.isScheduled === ",this.state.isScheduled)
    
  }
}
