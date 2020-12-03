import React, {Component} from 'react';
import {Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {CheckBox} from 'react-native-elements';
import {Icon} from 'native-base';
import CommonStyles from '../../CommonStyles';
import Api from '../../Api';
import {AppointmentStatus, Roles} from '../../Configs';
import moment from 'moment';
import Loader from '../../components/Loader';
import {ViewUtils} from '../../Utils';

export default class MyPresciption extends Component {
  state = {
    appointments: [],
    isloading: true,
    role: '',
  };

  constructor(props) {
    super(props);
  }

  _generateReport(appointmentId) {
    const prescribtionUrl = Api.instance().getUrl(
      `consultation-reports/getReport?appointmentId=${appointmentId}&prescription`,
    );
    this.props.navigation.navigate('WebViewReport', {
      prescribtionUrl,
    });
  }

  _generatePrescrition(appointmentId) {
    const prescribtionUrl = Api.instance().getUrl(
      `consultation-reports/getReport?appointmentId=${appointmentId}&prescription=true`,
    );
    console.warn('=========');
    this.props.navigation.navigate('WebViewReport', {
      prescribtionUrl,
    });
  }

  componentDidMount() {
    Api.instance()
    .getUserRole()
    .then(role => this.setState({role}));
    
    Api.instance()
      .getMyAppointments(AppointmentStatus.completed, true, true)
      .then(appointments => {
        this.setState({appointments});
      })
      .catch(err => {
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
          <View
            style={[CommonStyles.container, CommonStyles.padding, {flex: 2}]}>
            <Text style={{color: '#FFFFFF', paddingLeft: 12, marginTop: '15%'}}>
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
                It is a list of all your prescriptions{' '}
              </Text>
            </Text>
          </View>
          <View style={{flex: 8, paddingHorizontal: 2, paddingBottom: 5}}>
            <FlatGrid
              itemDimension={320}
              spacing={15}
              items={this.state.appointments}
              style={[CommonStyles.container]}
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
                        {flexDirection: 'row', paddingHorizontal: 16},
                      ]}>
                      <View
                        style={[
                          CommonStyles.container,
                          {
                            justifyContent: 'space-between',
                            paddingVertical: 12,
                          },
                        ]}>
                        {this.state.role === Roles.doctor ? (
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
                              {item.patient.firstName.concat(
                                ' ' + item.patient.lastName,
                              )}
                            </Text>
                          </Text>
                        ) : (
                          <Text>
                            <Text
                              style={[
                                CommonStyles.fontRegular,
                                CommonStyles.textSizeSmall,
                                {color: '#333333'},
                              ]}>{`Clinic Name\n`}</Text>
                            <Text
                              style={[
                                CommonStyles.fontMedium,
                                CommonStyles.textSizeAverage,
                                {color: '#333333'},
                              ]}>
                              {item.clinic == undefined ? '' : item.clinic.name}
                            </Text>
                          </Text>
                        )}

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
                      CommonStyles.horizontalContainer,
                      {
                        backgroundColor: 'grey',
                        marginTop: 5,
                        borderBottomEndRadius: 5,
                        borderBottomStartRadius: 5,
                      },
                    ]}>
                    <TouchableOpacity
                      onPress={() => {
                        this._generateReport(item.id);
                      }}
                      style={[
                        CommonStyles.container,
                        CommonStyles.centerElement,
                        {flexDirection: 'row'},
                      ]}>
                      <Icon
                        name="clipboard-notes"
                        type="Foundation"
                        style={{fontSize: 20, color: '#FFF', margin: 10}}
                      />
                      <Text
                        style={[
                          CommonStyles.textColorWhite,
                          CommonStyles.centerText,
                          CommonStyles.padding,
                        ]}>
                        Medical Report
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        this._generatePrescrition(item.id);
                      }}
                      style={[
                        CommonStyles.container,
                        CommonStyles.centerElement,
                        {flexDirection: 'row'},
                      ]}>
                      <Icon
                        name="filetext1"
                        type="AntDesign"
                        style={{fontSize: 20, color: '#FFF', margin: 10}}
                      />
                      <Text
                        style={[
                          CommonStyles.textColorWhite,
                          CommonStyles.centerText,
                          CommonStyles.padding,
                        ]}>
                        Prescription
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>

          <Loader loading={this.state.isLoading} />
          <View style={[CommonStyles.backButtonStyle]}>
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
                style={{color: '#FFF'}}
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
