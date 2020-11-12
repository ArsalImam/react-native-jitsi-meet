import React, {Component} from 'react';
import {View, TouchableOpacity, ImageBackground} from 'react-native';
import {Text, Item, Label, Input, Icon, Picker, Form} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import CommonStyles from '../../CommonStyles';
import BloodGlucose from '../../components/BloodGlucose';
import BloodPressure from '../../components/BloodPressure';
import BloodOxygen from '../../components/BloodOxygen';
import Api from '../../Api';
import Loader from '../../components/Loader';
import {ViewUtils} from '../../Utils';

export default class Vital extends Component {
  constructor(props) {
    super(props);
    if (this.props.route.params) {
      this.state = {
        isLoading: false,
        vitalType: '',
        notes: '',
        multipleValues: [],
        appointmentId: this.props.route.params.appointmentId,
        patientId: this.props.route.params.patientId,
      };
    } else {
      this.state = {
        isLoading: false,
        vitalType: '',
        notes: '',
        multipleValues: [],
      };
    }
  }
  componentDidMount() {
    //    console.warn('aaaaaaaaaaaaa'  , this.props.route.params)
  }

  _selectVitalComponenet = params => {
    switch (params) {
      case 'Blood Glucose':
        return <BloodGlucose ref={com => (this.glucoseComponent = com)} />;
        break;
      case 'Blood Pressure':
        return <BloodPressure ref={com => (this.pressureComponent = com)} />;
        break;
      case 'Blood Oxygen':
        return <BloodOxygen ref={com => (this.oxygenComponent = com)} />;
        break;
      default:
        return <View />;
    }
  };

  _saveVital = () => {
    var data = {};
    if (this.state.appointmentId == null) {
      data = {
        notes: this.state.notes,
      };
    } else {
      data = {
        // date: this.state.startDate,
        // "setupId": "",
        // "doctorId": "5f01d90dffd17912ce896c56",
        // "assistantId": "",

        date: new Date(),
        //          vitalType: this.state.vitalType,
        notes: this.state.notes,
        patientId: this.props.route.params.patientId,
        value: this.state.multipleValues[0],
        multipleValues: this.state.multipleValues,

        //  patientId: this.state.patientId,
        //  answer: this.state.vitalType,
        //  notes:this.state.notes,
        // endDate: this.state.endDate,
        //  'setup-type': 'vital',
        //  active: false,
      };
    }

    let childComponentData = null;
    switch (this.state.vitalType) {
      case 'Blood Glucose':
        childComponentData = this.glucoseComponent._onSave();
        console.warn('childComponentData === ', childComponentData);
        Object.assign(data, {
          multipleValues: [
            parseInt(childComponentData.value),
            childComponentData.selectedMeal,
            childComponentData.selectedMedicine,
          ],

          vitalType: 'BloodGlucose',
          value: childComponentData.value,
        });
        break;
      case 'Blood Pressure':
        childComponentData = this.pressureComponent._onSave();

        console.warn('childComponentData === ', childComponentData);
        Object.assign(data, {
          multipleValues: [
            parseInt(childComponentData.systolic),
            childComponentData.diastolic,
            childComponentData.pulse,
          ],
          vitalType: 'BloodPressure',
          value: childComponentData.systolic,
        });
        break;
      case 'Blood Oxygen':
        childComponentData = this.oxygenComponent._onSave();

        console.warn('childComponentData === ', childComponentData);

        Object.assign(data, {
          multipleValues: [parseInt(childComponentData.value)],
          vitalType: 'BloodOxygen',
          value: childComponentData.value,
        });
        break;
      default:
    }

    console.warn(
      'multipleValues === ',
      JSON.stringify(this.state.multipleValues),
    );

    if (this.state.appointmentId != null) {
      if (this.state.vitalType.trim() != '') {
        this.setState({isLoading: true});
        Api.instance()
          .createVitals(data)
          .then(response => {
            this.addToConsultation(data);
            this.props.navigation.goBack();
            ViewUtils.showToast('Vital has been saved successfully!');
          })
          .catch(err => {
            //ViewUtils.showToast(err);
            ViewUtils.showToast('Unable to Perform this Action');
          })
          .finally(() => {
            this.setState({isLoading: false});
          });
      } else {
        ViewUtils.showToast('Please Provide Vital Type');
      }
    } else {
      if (this.state.vitalType.trim() != '') {
        this.setState({isLoading: true});
        Api.instance()
          .createVital(data)
          .then(response => {
            this.props.navigation.goBack();
            ViewUtils.showToast('Vital has been saved successfully!');
          })
          .catch(err => {
            //ViewUtils.showToast(err);
            ViewUtils.showAlert('Unable to Perform this Action');
          })
          .finally(() => {
            this.setState({isLoading: false});
          });
      } else {
        ViewUtils.showToast('Please Provide Vital Type');
      }

      switch (this.state.vitalType) {
        case 'Blood Glucose':
          childComponentData = this.glucoseComponent._onSave();
          if (childComponentData.value === '') {
            ViewUtils.showToast('Please add Blood Glucose');
            return;
          }

          break;
        case 'Blood Pressure':
          childComponentData = this.pressureComponent._onSave();
          if (childComponentData.systolic === '') {
            ViewUtils.showToast('Please add Blood Pressure');
            return;
          }

          break;
        case 'Blood Oxygen':
          childComponentData = this.oxygenComponent._onSave();

          if (childComponentData.value === '') {
            ViewUtils.showToast('Please add Blood Oxygen');
            return;
          }
          break;
        default:
      }
    }     
    
  };

  addToConsultation(item) {
    Api.instance()
      .addPrescribeMedication(
        item,
        this.state.appointmentId,
        this.state.patientId,
      )

      .then(response => {
        console.warn('response', response);
      })
      .catch(err => {})
      .finally(() => {});
  }

  render() {
    console.log('this.state.patientId ==== ', this.state.patientId);

    if (this.state.appointmentId != null) {
      return (
        <View style={{height: '75%'}}>
          <ImageBackground
            style={[CommonStyles.container, CommonStyles.backgroundImage]}
            source={require('../../assets/img/background.png')}>
            <View style={{flex: 3, backgroundColor: '#297dec'}}>
              <Text
                style={[
                  CommonStyles.fontRegular,
                  CommonStyles.headingTextStyle,
                ]}>
                <Text
                  style={[
                    CommonStyles.textSizeLarge,
                    CommonStyles.textColorWhite,
                  ]}>{`Vital Add\n`}</Text>
                <Text
                  style={[
                    CommonStyles.textSizeSmall,
                    CommonStyles.textColorWhite,
                  ]}>
                  Add a new Vital
                </Text>
              </Text>
            </View>

            <View style={{flex: 8, paddingHorizontal: 18, marginTop: 33}}>
              <KeyboardAwareScrollView
                style={[{backgroundColor: '#fff', borderRadius: 5}]}>
                <Item
                  picker
                  style={[
                    CommonStyles.container,
                    CommonStyles.itemStyle,
                    {paddingTop: 10},
                  ]}>
                  <Picker
                    mode="dropdown"
                    style={{textAlign: 'left'}}
                    focusable
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Select Vital Type"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.vitalType}
                    onValueChange={val => {
                      this.setState({vitalType: val});
                    }}>
                    <Picker.Item
                      color="gray"
                      selected={false}
                      label="Select Vital Type"
                      value=""
                    />
                    <Picker.Item label="Blood Glucose" value="Blood Glucose" />
                    <Picker.Item
                      label="Blood Pressure"
                      value="Blood Pressure"
                    />
                    <Picker.Item label="Blood Oxygen" value="Blood Oxygen" />
                  </Picker>
                </Item>
                {this._selectVitalComponenet(this.state.vitalType)}

                <Item
                  floatingLabel
                  style={[CommonStyles.container, CommonStyles.itemStyle]}>
                  <Label
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeMedium,
                      {marginLeft: 7},
                    ]}>
                    Notes*
                  </Label>
                  <Input
                    value={this.state.notes}
                    onChangeText={val => this.setState({notes: val})}
                    multiline={true}
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeMedium,
                      {marginLeft: 5},
                    ]}
                  />
                </Item>
              </KeyboardAwareScrollView>
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
                  this._saveVital();
                }}
                style={[
                  CommonStyles.container,
                  CommonStyles.centerText,
                  {borderRightWidth: 0.5, borderColor: '#cfd2d6'},
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
                  SAVE
                </Text>
              </TouchableOpacity>
            </View>

            <Loader loading={this.state.isLoading} />

            <View style={[CommonStyles.backButtonStyle]}>
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
        </View>
      );
    } else {
      return (
        <View style={[CommonStyles.container]}>
          <ImageBackground
            style={[CommonStyles.container, CommonStyles.backgroundImage]}
            source={require('../../assets/img/bwback.png')}>
            <View style={{flex: 2.3}}>
              <Text
                style={[
                  CommonStyles.fontRegular,
                  CommonStyles.headingTextStyle,
                ]}>
                <Text
                  style={[
                    CommonStyles.textSizeLarge,
                    CommonStyles.textColorWhite,
                  ]}>{`Vital Add\n`}</Text>
                <Text
                  style={[
                    CommonStyles.textSizeSmall,
                    CommonStyles.textColorWhite,
                  ]}>
                  Add a new Vital
                </Text>
              </Text>
            </View>

            <View style={{flex: 8, paddingHorizontal: 18, marginTop: 33}}>
              <KeyboardAwareScrollView
                style={[{backgroundColor: '#fff', borderRadius: 5}]}>
                <Item
                  picker
                  style={[
                    CommonStyles.container,
                    CommonStyles.itemStyle,
                    {paddingTop: 10},
                  ]}>
                  <Picker
                    mode="dropdown"
                    style={{textAlign: 'left'}}
                    focusable
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Select Vital Type"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.vitalType}
                    onValueChange={val => {
                      this.setState({vitalType: val});
                    }}>
                    <Picker.Item
                      color="gray"
                      selected={false}
                      label="Select Vital Type"
                      value=""
                    />
                    <Picker.Item label="Blood Glucose" value="Blood Glucose" />
                    <Picker.Item
                      label="Blood Pressure"
                      value="Blood Pressure"
                    />
                    <Picker.Item label="Blood Oxygen" value="Blood Oxygen" />
                  </Picker>
                </Item>
                {this._selectVitalComponenet(this.state.vitalType)}

                <Item
                  floatingLabel
                  style={[CommonStyles.container, CommonStyles.itemStyle]}>
                  <Label
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeMedium,
                      {marginLeft: 7},
                    ]}>
                    Notes*
                  </Label>
                  <Input
                    value={this.state.notes}
                    onChangeText={val => this.setState({notes: val})}
                    multiline={true}
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeMedium,
                      {marginLeft: 5},
                    ]}
                  />
                </Item>
              </KeyboardAwareScrollView>
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
                  this._saveVital();
                }}
                style={[
                  CommonStyles.container,
                  CommonStyles.centerText,
                  {borderRightWidth: 0.5, borderColor: '#cfd2d6'},
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
                  SAVE
                </Text>
              </TouchableOpacity>
            </View>

            <Loader loading={this.state.isLoading} />

            <View style={[CommonStyles.backButtonStyle]}>
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
        </View>
      );
    }
  }
}
