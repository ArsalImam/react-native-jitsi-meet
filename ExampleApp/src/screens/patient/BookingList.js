import React, {Component} from 'react';
import {Text, View, ImageBackground} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {CheckBox} from 'react-native-elements';
import CommonStyles from '../../CommonStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Api from '../../Api';
import {AppointmentStatus} from '../../Configs';
import moment from 'moment';
import {ViewUtils} from '../../Utils';

export default class BookingList extends Component {
  state = {
    appointments: [],
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Api.instance()
      .getMyAppointments(AppointmentStatus.available, true)
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
            style={[CommonStyles.container, CommonStyles.padding,  {flex: 2}]}>
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
                It is a list of your all booking patients{' '}
              </Text>
            </Text>
          </View>
          <View style={{flex: 8, paddingHorizontal: 2, paddingBottom: 55}}>
            <FlatGrid
              itemDimension={320}
              spacing={15}
              items={this.state.appointments}
              style={[CommonStyles.container]}
              renderItem={({item}) => (
                <TouchableOpacity
                 style={[CommonStyles.container, CommonStyles.shadow, CommonStyles.br5, CommonStyles.bgColor]}
                onPress={() => {
                    this.props.navigation.navigate(`Patients`, {
                      appointmentId: item.id,
                      moveTo: 'createAppointment',
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
}
