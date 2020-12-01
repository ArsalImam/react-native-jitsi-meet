import {CommonActions} from '@react-navigation/native';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import CommonStyles from '../../CommonStyles';
import {Icon} from 'native-base';
import Api from '../../Api';
import Loader from '../../components/Loader';
import {ViewUtils} from '../../Utils';

export default class Patients extends Component {
  _appointmentId = '';
  _moveTo = '';
  _clinicId = '';
  state = {
    patients: [],
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this._appointmentId = this.props.route.params.appointmentId;
    this._moveTo = this.props.route.params.moveTo;
    this._clinicId = this.props.route.params.clinicId;

    this.setState({isLoading: true});
    Api.instance()
      .getMyPatients()
      .then(response => this._filterOnlyPatients(response))
      .catch(err => {
        //ViewUtils.showToast(err);
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  _filterOnlyPatients(response) {
    let patients = response.filter(x => x.role == 'ROLE_PATIENT');
    this.setState({patients});
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
            <Text style={{color: '#FFFFFF', paddingLeft: 15}}>
              <Text
                style={[
                  CommonStyles.DINAltBold,
                  CommonStyles.textSizeLarge,
                ]}>{`Patients\n`}</Text>
              <Text
                style={[
                  CommonStyles.fontRegular,
                  CommonStyles.textSizeAverage,
                ]}>
                It is a list of all your booking patients{' '}
              </Text>
            </Text>

            <FlatGrid
              itemDimension={320}
              items={this.state.patients}
              style={[CommonStyles.container, {marginTop: '11%'}]}
              spacing={15}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    console.warn('item >>>>', item);
                    if (this._moveTo === 'createAppointment') {
                      this._createAppointment(item.id);
                    } else {
                      this.props.navigation.navigate('DrProfile', {
                        patientId: item.id,
                        patient: item,
                      });
                    }
                  }}
                  style={[
                    CommonStyles.container,
                    CommonStyles.shadow,
                    CommonStyles.br5,
                    {flexDirection: 'row', backgroundColor: '#FFF'},
                  ]}>
                  <View
                    style={{
                      width: 50,
                      marginHorizontal: 8,
                      marginTop: -7,
                      marginBottom: 8,
                    }}>
                    {item.imageUrl == '' ? (
                      <Image
                        style={[
                          CommonStyles.container,
                          CommonStyles.backgroundImage,
                        ]}
                        source={require('../../assets/drawable-xxxhdpi/Rectangle.png')}
                      />
                    ) : (
                      <Image
                        style={[
                          CommonStyles.container,
                          CommonStyles.backgroundImage,
                        ]}
                        source={{
                          uri: item.imageUrl,
                        }}
                      />
                    )}
                  </View>
                  <View
                    style={[
                      CommonStyles.container,
                      CommonStyles.centerElement,
                    ]}>
                    <Text
                      style={[
                        CommonStyles.fontMedium,
                        CommonStyles.textSizeNormal,
                        CommonStyles.padding,
                      ]}>
                      {item.firstName.concat(' ').concat(item.lastName)}
                    </Text>
                  </View>

                  <View style={{justifyContent: 'center', marginRight: 10}}>
                    <Icon
                      name="exclamationcircleo"
                      type="AntDesign"
                      style={{fontSize: 24, color: '#000'}}
                    />
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>

          <View
            style={[
              {
                position: 'absolute',
                left: 16,
                top: 40,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Icon
                name="arrow-back"
                type="MaterialIcons"
                style={{fontSize: 26, color: '#FFF'}}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <Loader loading={this.state.isLoading} />
      </View>
    );
  }

  _createAppointment(patientId) {
    let that = this;
    ViewUtils.showAlert(
      'Do you want to create appointment?',
      () => {
        Api.instance()
          .getPatientUtilizedSlots(patientId)
          .then(res => {
            console.warn('res >>>> getUtilized', res)
            if (!res[0]) {
              this.props.navigation.navigate('PaymentAlert', {
                appointmentId: this._appointmentId,
                patientId,
                clinicId: this._clinicId,
              });
            } else {
              this.setState({isLoading: true});
              Api.instance()
                .updateAppointment(this._appointmentId, patientId)

                .then(() => {
                  console.warn(
                    'appointment Id',
                    this._appointmentId,
                    'patient',
                    patientId,
                  );
                  ViewUtils.showToast(
                    'Appointment has been booked successfully',
                  );
                  // ViewUtils.showToast('Appointment' ,this._appointmentId ,'fkahfhd',this.patientId);
                  that.props.navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [{name: 'MyDrawer'}],
                    }),
                  );
                })
                .catch(err => {
                  //ViewUtils.showToast(err);
                })
                .finally(() => that.setState({isLoading: false}));
            }
          });
      },
      () => {},
    );
  }
}
