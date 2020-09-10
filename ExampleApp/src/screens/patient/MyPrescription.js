import React, { Component } from 'react';
import { Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { CheckBox } from 'react-native-elements';
import { Icon } from 'native-base';
import CommonStyles from '../../CommonStyles';
import Api from '../../Api';
import { AppointmentStatus } from '../../Configs';
import moment from 'moment';
import Loader from '../../components/Loader';
import { ViewUtils } from '../../Utils';

export default class MyPresciption extends Component {
    
  state = {
    appointments:[],
    isloading: true,
  };

  constructor(props) {
    super(props);
  }


  _generateReport(appointmentId) {
    
    const prescribtionUrl = Api.instance().getUrl(
      `consultation-reports/getReport?appointmentId=${appointmentId}&prescription`
    );
        this.props.navigation.navigate('WebViewReport', {
          prescribtionUrl,
        });
       
    
  }

  _generatePrescrition(appointmentId) {
    const prescribtionUrl = Api.instance().getUrl(
      `consultation-reports/getReport?appointmentId=${appointmentId}&prescription=true`
      );
    console.warn('=========')
        this.props.navigation.navigate('WebViewReport', {
          prescribtionUrl,
        
        });
    
  }

  componentDidMount() {
    Api.instance()
      .getMyAppointments(AppointmentStatus.completed, true)
      .then(appointments => { 
        this.setState({ appointments });
      })
      .catch(err => {
        ViewUtils.showToast(err);
      })
      .finally(() => {
        this.setState({ isLoading: false })
      });
      
    //  console.warn('data', this.state.appointments)


     // const filterAppointments = this.state.appointments.filter(x => {moment(this.state.appointments.date).subtract(7, 'days').calendar()})
   //   console.warn('filterAppointments', filterAppointments) 
     // console.warn('filterAppointments', moment(this.state.appointments.date).subtract(7, 'days').unix()*1000 - moment(this.state.appointments.date).unix()*1000)
  }



  // handlePieChartData(dayToSet, moment) {
  //   var days = 0;
  //   var date = new Date();
  //   var last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);

  //   if (dayToSet) {
  //     days = dayToSet;
  //     last =
  //       moment == "upcoming"
  //         ? new Date(date.getTime() + days * 24 * 60 * 60 * 1000)
  //         : new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
  //   }
  //   var day = last.getDate();
  //   var month = last.getMonth() + 1;
  //   var year = last.getFullYear();
  //   var previousDay = last.getDate() - 1;
  //   var nextDay = last.getDate() + 1;
  //   var today = new Date().toISOString().slice(0, 10);
  //   var previousDate = year + "-" + month + "-" + previousDay;
  //   var nextDate = year + "-" + month + "-" + nextDay;
  //   var daysAgo = year + "-" + month + "-" + day;

  //   if (!dayToSet) {
  //     this.api.pieChardData(previousDate, nextDate).then((response) => {
  //       const filtered = response.filter((a) => a.status === "Completed")
  //         .length;
  //       this.chartData.todayAppointment = filtered;
  //     });
  //   } else if (moment == "upcoming") {
  //     this.api.pieChardData(today, daysAgo).then((response) => {
  //       const filtered = response.filter((a) => a.status === "Scheduled");
  //       this.chartData.upcomingAppointment = filtered.length;

  //       if (this.isFirstLoaded) {
  //         this.isFirstLoaded = false;
  //         if (this.chartData.upcomingAppointment == 0) {
  //           this.upcomingAppointmentText = "No Upcoming Appointment Found...";
  //         } else {
  //           this.upcomingAppointmentText = `Your next appointment is in: <span style="color: rgb(245, 78, 78);">${require("moment")(
  //             response[0].createdAt
  //           ).fromNow(true)}</span>.`;
  //         }
  //       }
  //     });
  //   } else {
  //     this.api.pieChardData(daysAgo, today).then((response) => {
  //       const filtered = response.filter((a) => a.status === "Completed")
  //         .length;
  //       this.chartData.pastAppointment = filtered;
  //     });
  //   }
  // }


  
  render() {

   
    return (
      <View style={[CommonStyles.container]}>
        <ImageBackground
          style={[CommonStyles.container, CommonStyles.backgroundImage]}
          source={require('../../assets/img/bwback.png')}>
          <View
            style={[
              CommonStyles.container,
              CommonStyles.padding,
              { flex: 2, }
            ]}>
            <Text style={{ color: '#FFFFFF', paddingLeft: 12, marginTop: '15%' }}>
              <Text
                style={[
                  CommonStyles.DINAltBold,
                  CommonStyles.textSizeLarge,
                ]}>{`My Prescription\n`}</Text>
              <Text
                style={[
                  CommonStyles.fontRegular,
                  CommonStyles.textSizeAverage,
                ]}>
                It is a list of your all booking patients{' '}
              </Text>
            </Text>

          </View>
          <View style={{ flex: 8, paddingHorizontal: 2, paddingBottom: 5 }}>
            <FlatGrid
              itemDimension={320}
              spacing={15}
              items={this.state.appointments}
              style={[CommonStyles.container]}
              renderItem={({ item }) => (
                <View
                  style={[CommonStyles.container, CommonStyles.shadow, CommonStyles.br5, CommonStyles.bgColor]}
                >

                  <ImageBackground
                    style={[
                      CommonStyles.container,
                      CommonStyles.backgroundImage,
                    ]}
                    source={require('../../assets/img/bookingbg2x.png')}>
                    <View
                      style={[
                        CommonStyles.container,
                        { flexDirection: 'row', paddingHorizontal: 16 },
                      ]}>
                      <View
                        style={[
                          CommonStyles.container,
                          { justifyContent: 'space-between', paddingVertical: 12 },
                        ]}>
                        <Text>
                          <Text
                            style={[
                              CommonStyles.fontRegular,
                              CommonStyles.textSizeSmall,
                              { color: '#333333' },
                            ]}>{`Patient Name\n`}</Text>
                          <Text
                            style={[
                              CommonStyles.fontMedium,
                              CommonStyles.textSizeAverage,
                              { color: '#333333' },
                            ]}>
                            {( item.patient && item.patient.firstName) ? item.patient.firstName.concat(
                              ' ' + item.patient.lastName,
                            ) : 'NA'}
                          </Text>
                        </Text>

                        <Text
                          style={[
                            CommonStyles.textSizeAverage,
                            { color: '#333333' },
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
                          { justifyContent: 'space-between' },
                        ]}>
                        <View
                          style={[
                            CommonStyles.container,
                            {
                              justifyContent: 'space-between',
                              alignItems: 'flex-end',
                              marginBottom: 8,
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
                          <Text style={{ marginBottom: 6 }}>
                            <Text
                              style={[
                                CommonStyles.textSizeSmall,
                                CommonStyles.fontRegular,
                                { color: '#333333' },
                              ]}>{`Date: `}</Text>
                            <Text
                              style={[
                                CommonStyles.fontMedium,
                                CommonStyles.textSizeAverage,
                                { color: '#333333' },
                              ]}>
                              {moment(item.date).format('DD-MM-yyyy')}
                            </Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                  <View style={[CommonStyles.container, CommonStyles.horizontalContainer, { backgroundColor: 'grey', marginTop: 5, borderBottomEndRadius: 5, borderBottomStartRadius: 5 }]}>
                    <TouchableOpacity
                    

                    onPress={() => {this._generateReport(item.id)}}
                      style={[CommonStyles.container, CommonStyles.centerElement, { flexDirection: 'row' }]}
                    >
                      <Icon
                        name="clipboard-notes"
                        type='Foundation'
                        style={{ fontSize: 20, color: '#FFF', margin: 10 }}
                      />
                      <Text style={[CommonStyles.textColorWhite, CommonStyles.centerText, CommonStyles.padding]}>Medical Report</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => {this._generatePrescrition(item.id)}}
                      style={[CommonStyles.container, CommonStyles.centerElement, { flexDirection: 'row' }]}
                    >
                      <Icon
                        name="filetext1"
                        type='AntDesign'
                        style={{ fontSize: 20, color: '#FFF', margin: 10 }}
                      />
                      <Text style={[CommonStyles.textColorWhite, CommonStyles.centerText, CommonStyles.padding]}>Prescription</Text>

                    </TouchableOpacity>
                  </View>

                </View>

              )}

            />
          </View>

          <Loader
            loading={this.state.isLoading} />
             <View
                            style={[
                                CommonStyles.backButtonStyle
                            ]}>
                            <TouchableOpacity
                            // style={{
                            //     marginTop:-10
                            // }}
                                onPress={() => {
                                    this.props.navigation.goBack();
                                }}>
                                <Icon
                                    name="arrow-back"
                                    type="MaterialIcons"
                                    style={{ color: '#FFF' }}
                                />
                            </TouchableOpacity>
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
}