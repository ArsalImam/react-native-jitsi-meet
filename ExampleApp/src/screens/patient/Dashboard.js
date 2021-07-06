import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CommonStyles from '../../CommonStyles';
import Api from '../../Api';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import moment from 'moment';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-community/async-storage';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upComingCount: 0,
      totalPrescription: 0,
      totalConsultation: 0,
      totalPatients: 0,
      appointments: [],
      user: {
        personalDetails: {},
      },
      lastestAppointment: {time: '0:00 am', timeLeft: '0 mins'},
      showLoader: false,
      role: '',
      imageUrl: '',
    };
  }
  _getAllAppointments() {
    Api.instance()
      .getMyAppointments()
      .then(appointments => {
        let schAppointment = appointments.filter(x => x.status == 'Scheduled');
        this.setState({
          upComingCount: schAppointment.length,
        });

        let completedAppointment = appointments.filter(
          x => x.status == 'Completed',
        );

        if (schAppointment.length > 0) {
          let lastAppointment = schAppointment.reverse()[0];
          let date = moment(lastAppointment.date);
          let diff = '';

          if (date.isAfter(moment(Date.now()))) {
            diff = date.fromNow();
          } else {
            let duration = moment.duration(
              moment(Date.now()).milliseconds() - date.milliseconds(),
              'milliseconds',
            );
            diff = moment(duration.milliseconds()).format('mm[m] ss[s]');
          }
          let lastestAppointment = {
            time: moment(lastAppointment.date).format('hh:mm a'),
            timeLeft: diff,
          };
          this.setState({
            lastestAppointment,
          });
        }
        this.setState({
          totalConsultation: appointments.length,
          appointments,
        });

        this.setState({
          totalPrescription: completedAppointment.length,
        });
      })

      .catch(err => {
        // ViewUtils.showToast(err);
        console.log("Err" , err)
      })
      .finally(() => {
        this.setState({showLoader: false});
      });
  }

  _getAllPatients() {
    Api.instance()
      .getMyPatients()
      .then(response => this._filterOnlyPatients(response))
      .catch(err => {
        // ViewUtils.showToast(err);
        console.log("Err" , err)

      });
  }

  _filterOnlyPatients(response) {
    let patients = response.filter(x => x.role == 'ROLE_PATIENT');
    this.setState({totalPatients: patients.length});
  }
  componentDidMount() {
    this.props.navigation.addListener('focus', payload => {
      this.setState({showLoader: true});

      Api.instance()
        .getUserRole()
        .then(role => this.setState({role}));
      try {
        AsyncStorage.getItem('fcmToken')
          .then(token => {
            return Api.instance().updateFcmToken(token);
          })
          .catch(er => console.log(er));
      } catch (error) {
        console.log(error);
      }
      //updating appointments
      this._getAllAppointments();

      //updating patients
      this._getAllPatients();

      //getting user data
      Api.instance()
        ._user()
        .then(user => {
          if (user == null) return;
          this.setState(
            {
              user,
            },

            () => {
              global.role = this.state.user.role;
            },
          );
          if (this.state.user.imageUrl) {
            let imageData = new FormData();
            imageData.append('file', {
              url: this.state.user.imageUrl,
              name: this.state.user.imageUrl,
            });
          }
        })
        .catch(err => console.log(err));
    });
  }

  goToPatientsRooms() {
    this.props.navigation.navigate('MyTabs', {screen: 'Available'});
  }

  render() {
    return (
      <View style={[CommonStyles.container]}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
        <ImageBackground
          style={[CommonStyles.container, CommonStyles.backgroundImage]}
          source={require('../../assets/img/background.png')}>
          <KeyboardAwareScrollView
            style={[CommonStyles.container, {paddingHorizontal: 15}]}>
            <View
              style={[
                CommonStyles.container,
                CommonStyles.mt30,
                {flexDirection: 'row'},
              ]}>
              <View style={[{width: 53, height: 53, marginRight: 10}]}>
                {this.state.user.imageUrl != '' ? (
                  <Image
                    style={{
                      height: '97%',
                      width: '100%',
                      resizeMode: 'contain',
                    }}
                    source={{uri: this.state.user.imageUrl}}
                  />
                ) : (
                  <View
                    style={[
                      {
                        width: 53,
                        height: 53,
                        justifyContent: 'center',
                        marginLeft: 10,
                        marginTop: 5,
                      },
                    ]}>
                    <Icon
                      name="user"
                      type="FontAwesome5"
                      size={30}
                      color="black"
                    />
                  </View>
                )}
              </View>
              <View style={{justifyContent: 'flex-end'}}>
                <Text style={[CommonStyles.fontMedium, {fontSize: 21}]}>
                  Hi, {this.state.user.firstName} {this.state.user.lastName}
                </Text>
                <Text
                  style={[CommonStyles.fontMedium, CommonStyles.textSizeSmall]}>
                  <Text>Welcome to your </Text>
                  <Text
                    style={[
                      CommonStyles.fontMedium,
                      CommonStyles.textSizeSmall,
                      {color: '#5698FF'},
                    ]}>
                    Health Dashboard{' '}
                  </Text>
                </Text>
              </View>
            </View>

            <View
              style={{
                height: 4,
                backgroundColor: '#297DEC',
                marginTop: 10,
                width: '80%',
              }}
            />

            <TouchableOpacity
              style={[
                CommonStyles.container,
                CommonStyles.mt10,
                CommonStyles.br5,
                {backgroundColor: '#9cd85b'},
              ]}
              onPress={() => {
                this.props.navigation.navigate('MyTabs', {screen: 'Scheduled'});
              }}>
              <ImageBackground
                style={[CommonStyles.container, CommonStyles.backgroundImage]}
                source={require('../../assets/img/greenback.png')}>
                <View
                  style={[
                    CommonStyles.container,
                    CommonStyles.horizontalContainer,
                    {padding: 15},
                  ]}>
                  <View
                    style={[
                      CommonStyles.container,
                      {justifyContent: 'space-between'},
                    ]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Icon name="calendar" size={26} color="#335a07" />
                      <View
                        style={[
                          CommonStyles.br5,
                          CommonStyles.padding,
                          {backgroundColor: '#7aB43B'},
                        ]}>
                        <Text
                          style={
                            (CommonStyles.fontMedium,
                            CommonStyles.centerText,
                            {fontSize: 29, color: '#fff'})
                          }>
                          {this.state.upComingCount}
                        </Text>
                      </View>
                    </View>
                    <Text style={{marginTop: 10}}>
                      <Text
                        style={
                          (CommonStyles.fontMedium,
                          {fontSize: 14, color: '#335a07'})
                        }>{`TOTAL UPCOMING\n`}</Text>

                      <Text
                        style={[
                          CommonStyles.fontMedium,
                          {fontSize: 20, color: '#333333'},
                        ]}>
                        APPOINTMENTS
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={[
                      CommonStyles.container,
                      {
                        justifyContent: 'space-between',
                        alignSelf: 'flex-end',
                        alignItems: 'flex-end',
                      },
                    ]}>
                    <Text
                      style={{fontSize: 14, color: '#335a07', lineHeight: 27}}>
                      <Text
                        style={
                          (CommonStyles.fontRegular,
                          CommonStyles.textSizeSmall,
                          {color: '#335a07'})
                        }>{`Next Appointment\n        `}</Text>

                      {this.state.upComingCount != 0 ? (
                        <Text
                          style={
                            (CommonStyles.fontMedium,
                            {fontSize: 17, color: '#000'})
                          }>
                          is {this.state.lastestAppointment.timeLeft}
                        </Text>
                      ) : (
                        <Text
                          style={
                            (CommonStyles.fontMedium,
                            {
                              fontSize: 17,
                              color: '#000',
                              textAlign: 'right',
                              alignSelf: 'flex-end',
                            })
                          }>
                          is 0 min
                        </Text>
                      )}
                      <Text
                        style={
                          (CommonStyles.fontRegular,
                          CommonStyles.textSizeSmall,
                          {color: '#335a07'})
                        }>
                        {`\nAppointment Time\n             `}
                      </Text>
                      {this.state.upComingCount != 0 ? (
                        <Text
                          style={
                            (CommonStyles.fontMedium,
                            {fontSize: 17, color: '#000'})
                          }>
                          {this.state.lastestAppointment.time}
                        </Text>
                      ) : (
                        <Text
                          style={
                            (CommonStyles.fontMedium,
                            {fontSize: 17, color: '#000'})
                          }>
                          00:00 am
                        </Text>
                      )}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            <View style={[CommonStyles.mt10, CommonStyles.horizontalContainer]}>
              <TouchableOpacity
                style={[
                  CommonStyles.container,
                  CommonStyles.br5,
                  {
                    borderColor: '#C9D7EA',
                    borderWidth: 2,
                    padding: 15,
                    justifyContent: 'space-between',
                    marginRight: 5,
                  },
                ]}
                onPress={() =>
                  this.props.navigation.navigate('MyTabs', {
                    screen: 'Completed',
                  })
                }>
                <View style={[CommonStyles.horizontalContainer]}>
                  <Icon name="bars" size={18} color="#C9D7EA" />
                  <View
                    style={[
                      CommonStyles.centerText,
                      CommonStyles.br5,
                      {backgroundColor: '#ebf2f9'},
                    ]}>
                    <Text
                      style={[
                        CommonStyles.fontMedium,
                        CommonStyles.padding,
                        CommonStyles.centerText,
                        {fontSize: 32, color: '#297dec'},
                      ]}>
                      {this.state.totalPrescription}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    CommonStyles.fontMedium,
                    {fontSize: 15, marginTop: 10},
                  ]}>
                  Past Appointments
                </Text>
              </TouchableOpacity>

              {this.state.role == 'ROLE_PATIENT' ? (
                <TouchableOpacity
                  style={[
                    CommonStyles.container,
                    CommonStyles.br5,
                    {
                      borderColor: '#C9D7EA',
                      borderWidth: 2,
                      padding: 15,
                      justifyContent: 'space-between',
                      marginRight: 5,
                    },
                  ]}
                  onPress={() =>
                    this.props.navigation.navigate('MyPresciption')
                  }>
                  <View style={[CommonStyles.horizontalContainer]}>
                    <Icon name="bars" size={18} color="#C9D7EA" />
                    <View
                      style={[
                        CommonStyles.centerText,
                        CommonStyles.br5,
                        {backgroundColor: '#ebf2f9'},
                      ]}>
                      <Text
                        style={[
                          CommonStyles.fontMedium,
                          CommonStyles.padding,
                          CommonStyles.centerText,
                          {fontSize: 32, color: '#297dec'},
                        ]}>
                        {this.state.totalPrescription}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      CommonStyles.fontMedium,
                      {fontSize: 15, marginTop: 10},
                    ]}>
                    Total Prescriptions
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    CommonStyles.container,
                    CommonStyles.br5,
                    {
                      borderColor: '#C9D7EA',
                      borderWidth: 2,
                      padding: 15,
                      justifyContent: 'space-between',
                      marginLeft: 5,
                    },
                  ]}
                  onPress={() => {
                    this.props.navigation.navigate(`Patients`, {
                      appointmentId: null,
                      moveTo: 'PatientDetail',
                    });
                  }}>
                  <View style={[CommonStyles.horizontalContainer]}>
                    <Icon name="bars" size={18} color="#C9D7EA" />
                    <View
                      style={[
                        CommonStyles.centerText,
                        CommonStyles.padding,
                        CommonStyles.br5,
                        {backgroundColor: '#ebf2f9'},
                      ]}>
                      <Text
                        style={[
                          CommonStyles.fontMedium,
                          {fontSize: 32, color: '#297dec'},
                        ]}>
                        {this.state.totalPatients}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      CommonStyles.fontMedium,
                      {fontSize: 15, marginTop: 10},
                    ]}>
                    Total Patients
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View
              style={[
                CommonStyles.container,
                {alignSelf: 'center', marginTop: 70},
              ]}>
              <View style={[CommonStyles.container]}>
                <Image
                  style={[CommonStyles.container, {resizeMode: 'contain'}]}
                  source={require('../../assets/img/calander2.png')}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => this.goToPatientsRooms()}
              style={[
                CommonStyles.container,
                CommonStyles.mt10,
                CommonStyles.centerText,
                CommonStyles.br5,
                {backgroundColor: '#297DEC', marginBottom: 15},
              ]}>
              <Text
                style={[
                  CommonStyles.fontMedium,
                  CommonStyles.padding,
                  CommonStyles.centerText,

                  {color: '#fff', fontSize: 15, margin: 5},
                ]}>
                Book an appointment
              </Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>

          <Loader loading={this.state.showLoader} />

          <View
            style={[
              {
                position: 'absolute',
                right: 17,
                top: 40,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.openDrawer();
              }}>
              <Icon name="bars" size={21} color="#303030" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default Dashboard;
