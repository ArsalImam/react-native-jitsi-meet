import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Text,
  Item,
  Label,
  Input,
  ScrollableTab,
  Icon,
  Picker,
  Form,
  Image,
} from 'native-base';

import {DatePicker} from 'react-native-propel-kit';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import CommonStyles from '../../CommonStyles';
import Api from '../../Api';
import Loader from '../../components/Loader';
import {ViewUtils} from '../../Utils';
import ImagePicker from 'react-native-image-picker';
import {FlatGrid} from 'react-native-super-grid';

export default class AddPrescribtion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      medicine: '',
      strength: '',
      dose: '',
      frequency: '',
      route: '',
      reason: '',
      startDate: null,
      endDate: null,
      notes: '',
      appointmentId: this.props.route.params.appointmentId,
      patientId: this.props.route.params.patientId,
      data: [],
      // patientId,
      // patientId,
    };

    console.warn('this.props.route.params ======= ', this.props.route.params);
  }

  _savePrescribeMedication = () => {
    let data = {
      date: this.state.startDate,
      // "setupId": "",
      // "doctorId": "5f01d90dffd17912ce896c56",
      // "assistantId": "",
      patientId: this.state.patientId,
      appointmentId: this.state.appointmentId,
      answer: '',
      medication: this.state.medicine,
      strength: this.state.strength,
      dose: this.state.dose,
      frequency: this.state.frequency,
      route: this.state.route,
      reason: this.state.reason,
      endDate: this.state.endDate,
      'setup-type': 'medication',
      active: false,
      // "id": "5f02b75d03468351d147025b",
      // "createdAt": "2020-07-06T05:32:13.265Z",
      // "updatedAt": "2020-07-06T05:32:13.265Z",
      description: this.state.notes,
    };

    console.warn('data', data);

    if (this.state.medicine.trim() == '') {
      ViewUtils.showToast('Please Provide Medicine');
      return;
    } else if (this.state.strength.trim() == '') {
      ViewUtils.showToast('Please Provide Strength');
      return;
    } else if (this.state.dose.trim() == '') {
      ViewUtils.showToast('Please Provide Dose');
      return;
    } else if (this.state.frequency.trim() == '') {
      ViewUtils.showToast('Please Provide Frequency');
      return;
    } else if (this.state.route.trim() == '') {
      ViewUtils.showToast(' Please Provide Route');
      return;
    } else if (this.state.reason.trim() == '') {
      ViewUtils.showToast('Please Provide Reason');
      return;
    }
    // else if (this.state.startDate == null) {
    //   ViewUtils.showAlert('Please Provide Start Date');
    //   return;
    // }
    else if (this.state.notes.trim() == '') {
      ViewUtils.showToast('Please Provide Notes');
      return;
    }

    this.setState({isLoading: true});
    Api.instance()
      .createPrescription(data)
      .then(response => {
        this.addToConsultation(data);
        this.props.navigation.goBack();
        ViewUtils.showToast('Medication has been saved successfully!');
        console.warn(data);
      })
      .catch(err => {
        console.warn('err === ', err);
        ViewUtils.showToast('Please Fill Fields');
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  };

  _getMedicationList() {
    this.setState({isLoading: true});
    Api.instance()
      .getDataCenterlizedListDuringConsultation('medication')
      .then(data => {
        this.arrayHolder = data;
      })
      .catch(err => console.log(err))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  componentDidMount() {
    this._getMedicationList();
  }

  setSearchText(text) {
    this.setState({isLoading: true});
    const searchText = text.toLowerCase();
    const abc = this.arrayHolder.filter(searchedText => {
      let userName = searchedText.name;
      return userName.toLowerCase().match(searchText);
    });
    this.setState({
      data: abc,
      isLoading: false,
    });
  }

  setData(text) {
    this.setState({
      medicine: text,
      data: [],
    });
  }

  addToConsultation(item) {
    Api.instance()
      .addPrescribeMedication(
        item,
        this.state.appointmentId,
        this.state.patientId,
      )

      .then(response => {
        console.warn('response', response);
        ViewUtils.showToast('Medication has been added to Prescription');
      })
      .catch(err => {})
      .finally(() => {});
  }
  render() {
    console.warn('ddd');
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
                  ]}>{`Prescribe Medication\n`}</Text>
                <Text
                  style={[
                    CommonStyles.textSizeSmall,
                    CommonStyles.textColorWhite,
                  ]}>
                  Add a new Prescription{' '}
                </Text>
              </Text>
            </View>

            <View style={{flex: 8, paddingHorizontal: 18, marginTop: 33}}>
              <KeyboardAwareScrollView
                style={[{backgroundColor: '#fff', borderRadius: 5}]}>
                <Item
                  stackedLabel
                  style={[
                    CommonStyles.container,
                    CommonStyles.itemStyle,
                    {marginTop: 20},
                  ]}>
                  <Label
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeAverage,
                    ]}>
                    Medicine
                  </Label>
                  <Input
                    value={this.state.medicine}
                    onChangeText={val =>
                      this.setSearchText(val) ??  this.setState({medicine: val}) 
                    }
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeMedium,
                    ]}
                  />
                </Item>

                
                  <FlatGrid
                    itemDimension={350}
                    items={this.state.data}
                    spacing={20}
                    style={[CommonStyles.container]}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => this.setData(item.name)}
                        style={[CommonStyles.container]}>
                        <Text
                          style={[
                            CommonStyles.fontMedium,
                            CommonStyles.textSizeNormal,
                            {color: '#333333', marginLeft: '4%'},
                          ]}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                
                <Item
                  stackedLabel
                  style={[CommonStyles.container, CommonStyles.itemStyle]}>
                  <Label
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeAverage,
                    ]}>
                    Strength
                  </Label>
                  <Input
                    value={this.state.strength}
                    onChangeText={val => this.setState({strength: val})}
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeMedium,
                    ]}
                  />
                </Item>

                <Item
                  stackedLabel
                  style={[CommonStyles.container, CommonStyles.itemStyle]}>
                  <Label
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeAverage,
                    ]}>
                    Dose
                  </Label>
                  <Input
                    value={this.state.dose}
                    onChangeText={val => this.setState({dose: val})}
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeMedium,
                    ]}
                  />
                </Item>

                <Item
                  stackedLabel
                  style={[CommonStyles.container, CommonStyles.itemStyle]}>
                  <Label
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeAverage,
                    ]}>
                    Frequency
                  </Label>
                  <Input
                    value={this.state.frequency}
                    onChangeText={val => this.setState({frequency: val})}
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeMedium,
                    ]}
                  />
                </Item>

                <Item
                  stackedLabel
                  style={[CommonStyles.container, CommonStyles.itemStyle]}>
                  <Label
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeAverage,
                    ]}>
                    Route
                  </Label>
                  <Input
                    value={this.state.route}
                    onChangeText={val => this.setState({route: val})}
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeMedium,
                    ]}
                  />
                </Item>

                <Item
                  stackedLabel
                  style={[CommonStyles.container, CommonStyles.itemStyle]}>
                  <Label
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeAverage,
                    ]}>
                    Reason
                  </Label>
                  <Input
                    value={this.state.reason}
                    onChangeText={val => this.setState({reason: val})}
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeMedium,
                    ]}
                  />
                </Item>

                <Label
                  style={[
                    {marginTop: 10, alignSelf: 'center', width: '88%'},
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeSmall,
                  ]}>
                  Start Date{' '}
                </Label>

                <Item style={[CommonStyles.container, CommonStyles.itemStyle]}>
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date()}
                    locale={'en'}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'default'}
                    placeholder="mm/dd/yyyy"
                    placeholderTextColor="black"
                    textStyle={[CommonStyles.fontRegular]}
                    placeHolderTextStyle={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeAverage,

                      {
                        paddingBottom: 12,
                        marginLeft: -10,
                      },
                    ]}
                    intialValue={this.state.startDate}
                    onChange={val => this.setState({startDate: val})}
                    // disabled={false}
                  />
                  <Icon active name="calendar" style={{marginLeft: 20}} />
                </Item>

                <Label
                  style={[
                    {marginTop: 10, alignSelf: 'center', width: '88%'},
                    CommonStyles.fontRegular,
                    CommonStyles.textSizeSmall,
                  ]}>
                  End Date{' '}
                </Label>
                <Item style={[CommonStyles.container, CommonStyles.itemStyle]}>
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date()}
                    locale={'en'}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'default'}
                    placeholder="mm/dd/yyyy"
                    placeholderTextColor="black"
                    textStyle={[CommonStyles.fontRegular]}
                    placeHolderTextStyle={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeAverage,
                      {
                        paddingBottom: 12,
                        marginLeft: -10,
                      },
                    ]}
                    intialValue={this.state.endDate}
                    onChange={val => this.setState({endDate: val})}
                    // disabled={false}
                  />
                  <Icon active name="calendar" style={{marginLeft: 20}} />
                </Item>

                <Item
                  stackedLabel
                  style={[
                    CommonStyles.container,
                    CommonStyles.itemStyle,
                    {marginBottom: 20},
                  ]}>
                  <Label
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeAverage,
                    ]}>
                    Notes
                  </Label>
                  <Input
                    value={this.state.notes}
                    onChangeText={val => this.setState({notes: val})}
                    style={[
                      CommonStyles.fontRegular,
                      CommonStyles.textSizeMedium,
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
                  this._savePrescribeMedication();
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
