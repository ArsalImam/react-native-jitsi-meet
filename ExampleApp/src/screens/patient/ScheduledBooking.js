import React, {Component} from 'react';
import {Text, View, ImageBackground} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {CheckBox} from 'react-native-elements';
import CommonStyles from '../../CommonStyles';
import Api from '../../Api';
import {AppointmentStatus} from '../../Configs';
import moment from 'moment';
export default class ScheduledBooking extends Component {
  state = {
    appointments: [],
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Api.instance()
      .getMyAppointments(AppointmentStatus.scheduled, true)
      .then(appointments => {
        this.setState({appointments});
      })
      .catch(err => {
        ViewUtils.showToast(err);
      });
  }

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
              {marginTop: '15%'},
            ]}>
            <Text style={{color: '#FFFFFF', paddingHorizontal: 15}}>
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
                It is a list of your all booking patients{' '}
              </Text>
            </Text>

            <FlatGrid
              itemDimension={320}
              items={this.state.appointments}
              style={[CommonStyles.container, {marginTop: '9%'}]}
              renderItem={({item}) => (
                <View style={[CommonStyles.container, CommonStyles.shadow]}>
                  <ImageBackground
                    style={[
                      CommonStyles.container,
                      CommonStyles.backgroundImage,
                    ]}
                    source={require('../../assets/drawable-mdpi/Fill-1.png')}>
                    <View
                      style={[
                        CommonStyles.container,
                        {flexDirection: 'row', paddingHorizontal: 16},
                      ]}>
                      <View
                        style={[
                          CommonStyles.container,
                          {justifyContent: 'space-around'},
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
                            {item.patient.firstName.concat(
                              ' ' + item.patient.lastName,
                            )}
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
                            {moment(item.date).format('hh:mm')}
                          </Text>
                        </Text>
                      </View>
                      <View
                        style={[
                          CommonStyles.container,
                          {justifyContent: 'space-around'},
                        ]}>
                        <View
                          style={[
                            CommonStyles.container,
                            {
                              justifyContent: 'space-around',
                              alignItems: 'flex-end',
                              marginBottom: 10,
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
                </View>
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
        return '#E53935';
      case AppointmentStatus.available:
        return '#9CD85B';
      case AppointmentStatus.completed:
        return '#9CD85B';
    }
  }
}
