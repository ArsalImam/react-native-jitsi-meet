import React, { Component } from 'react';
import { Text, View, ImageBackground,TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { CheckBox } from 'react-native-elements';
import CommonStyles from '../../CommonStyles';
import { Icon, Item, Picker } from 'native-base';
import Api from '../../Api';
import { AppointmentStatus } from '../../Configs';
import moment from 'moment';
import Loader from '../../components/Loader';
import { ViewUtils } from '../../Utils';

export default class ScheduledBooking extends Component {
  state = {
    appointments: [],
    isLoading: true,
    selected: "UpcomingAppointments",
    now: new Date()

  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.navigation.addListener(
      'focus' , payload => {
        this.setState({isLoading : true})

        this.upcomingAppointments();
      }
    )
    this.onTabsChange(this.state.selected)
    console.warn('===date===' , moment().format('YYYY-MM-DD'), moment().add(15, 'days').format('YYYY-MM-DD'))
    // Api.instance()
    //   .getMyAppointments(AppointmentStatus.scheduled, true)
    //   .then(appointments => {
    //     this.setState({ appointments });
    //   })
    //   .catch(err => {
    //     ViewUtils.showToast(err);
    //   })
    //   .finally(() => {
    //     this.setState({ isLoading: false })
    //   })
    //   ;
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  onTabsChange =selected =>{
this.eventData(selected)
this.setState({selected})
  }



eventData(param){
  switch (param) {
    case 'Coming7days':
    this.coming7days()
      break;
  case 'Coming15days':
    this.coming15days()
      break;
  case 'UpcomingAppointments':
  this.upcomingAppointments()
    }
}

coming7days(){
console.warn("Ammad----v",)
  this.setState({ isLoading: true})
  Api.instance()
  .getMyAppointmentsComing15Days(AppointmentStatus.scheduled, true,moment().format('YYYY-MM-DD') ,moment().add(7, 'days').format('YYYY-MM-DD') 
     )

  .then(appointments => {
    this.setState({ appointments });
    console.warn('aaa' , appointments) 
  })
  .catch(err => {
    ViewUtils.showToast(err);  
  })
  .finally(() => {
    this.setState({ isLoading: false })
  });
}

coming15days(){
  this.setState({ isLoading: true})
  Api.instance()
   .getMyAppointmentsComing15Days(AppointmentStatus.scheduled, true, moment().format('YYYY-MM-DD') ,moment().add(15, 'days').format('YYYY-MM-DD') 
     )

  .then(appointments => {
    this.setState({ appointments });
    console.warn('aaa' , appointments) 
  })
  .catch(err => {
   // ViewUtils.showToast(err);  
  })
  .finally(() => {
    this.setState({ isLoading: false })
  });
}

upcomingAppointments(){
  return(
    // console.warn('Upcoming?Appointments')
 Api.instance()
 .getMyAppointments(AppointmentStatus.scheduled , true)
 .then(appointments => {
  this.setState({appointments});
  console.warn('upcomingAppointments' , appointments)
  
})
  .catch(err => {
    //ViewUtils.showToast(err)
  })
  .finally(() => {
    this.setState({isLoading :false})
  })  
 )
  
}

  

  render() {
    const { navigate } = this.props.navigation;
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
                ]}>{`Scheduled\n`}</Text>
              <Text
                style={[
                  CommonStyles.fontRegular,
                  CommonStyles.textSizeAverage,
                ]}>
                It is a list of your all scheduled bookings{' '}
              </Text>
            </Text>
          </View>
          <Item
            picker
            style={[
              CommonStyles.container,
              CommonStyles.itemStyle,
              { marginVertical: 10, paddingTop: 10 },
            ]}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}

              placeholder="Choose Frequency"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.selected}
              onValueChange={this.onTabsChange.bind(this)}>
              {/* <Picker.Item
                                            color="gray"
                                            selected={false}
                                            label="Select Vital Type"
                                            value=""
                                        /> */}
              <Picker.Item  label="Coming 7 days" value="Coming7days" />
              <Picker.Item label="Coming 15 days" value="Coming15days" />
              <Picker.Item label="Upcoming Appointments" value="UpcomingAppointments" />
            </Picker>
          </Item>
          <View style={{ flex: 8, paddingHorizontal: 2, paddingBottom: 55 }}>
            <FlatGrid
              itemDimension={320}
              spacing={15}
              items={this.state.appointments.slice().reverse()}
              style={[CommonStyles.container]}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    console.warn("item.id == ",item.id)
                    ViewUtils.showAlert(
                      'Are you sure, you want to open consultation room?',
                      () => {
                        Api.instance().notifyAppointment(item.id).then().catch();
                        navigate('AppointmentRoom', {
                          appointmentId: item.id,
                        });
                      },
                      () => { },
                    );
                  }}
                  style={[CommonStyles.container, CommonStyles.shadow, CommonStyles.br5, CommonStyles.bgColor]}>
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
                            {item.patient.firstName.concat(
                              ' ' + item.patient.lastName,
                            )}
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
                          <Text>
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
                  <View style={[CommonStyles.container, { justifyContent: 'center', backgroundColor: '#297DEC', marginTop: 5, borderBottomEndRadius: 5, borderBottomStartRadius: 5 }]}>
                    <View style={[CommonStyles.container, CommonStyles.centerElement, { flexDirection: 'row' }]}>
                              
                    <Icon
                        name="phone"
                        type='Fontisto'
                        style={{ fontSize: 20, color: '#FFF', margin: 10 }}
                      />
                      <Text style={[CommonStyles.textColorWhite, CommonStyles.centerText, CommonStyles.padding]}>CALL</Text>

                    </View>
                    
                    
                    {/* <TouchableOpacity
                      onPress={() => { }}
                      style={[CommonStyles.container, CommonStyles.centerElement, { flexDirection: 'row' }]}
                    >

                      <Icon
                        name="phone"
                        type='Fontisto'
                        style={{ fontSize: 20, color: '#FFF', margin: 10 }}
                      />
                      <Text style={[CommonStyles.textColorWhite, CommonStyles.centerText, CommonStyles.padding]}>CALL</Text>

                    </TouchableOpacity> */}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>

          <Loader
            loading={this.state.isLoading} />
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
