import React, {Component} from 'react';
import Api from '../../Api';
import CommonStyles from '../../CommonStyles';
import { ListItem, CheckBox, Divider } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import { StyleSheet, Text, View, ImageBackground, StatusBar, ActivityIndicator, FlatList } from 'react-native';
import moment from 'moment';

export default class ClinicList extends Component {

  constructor(props) {
        super(props);
          this.state = {
              clinicList:[],
          }
  }
  
    componentDidMount() {
      Api.instance().getClinicList()
            .then((data) => {
                    this.setState({clinicList: data});
                }
            ).catch(err => console.log(err));
           
   
    }


    render() {

    
          return ( <View style={[CommonStyles.container]}>

                <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/img/bwback.png')}>

                    <View style={[CommonStyles.container,
                    CommonStyles.padding,
                    { paddingHorizontal: 15, marginTop: '15%' }
                    ]}>

                        <Text style={{ color: '#FFFFFF', }}>
                            <Text style={[CommonStyles.DINAltBold, CommonStyles.textSizeLarge,]} >{`Clinic List\n`}</Text>
                            <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeAverage]}>It is a list of your all Clinics </Text>
                        </Text>

                        <FlatGrid
                            itemDimension={350}
                            items={this.state.clinicList}
                            style={[CommonStyles.container,
                            { marginTop: '11%' },
                            ]}
                            renderItem={({ item }) => (

                                <View style={[CommonStyles.container, CommonStyles.centerText, CommonStyles.shadow  ]}>
                                    <ImageBackground style={[CommonStyles.container, CommonStyles.backgroundImage]} source={require('../../assets/drawable-mdpi/Fill-1.png')}>

                                        <View style={[CommonStyles.container, { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 5 }]}>

                                            <View style={[CommonStyles.container, { justifyContent: 'space-around' }]}>
                                                <Text>
                                                    <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall, { color: '#333333', }]}>{`Clinic Name\n`}</Text>
                                                    <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>{item.name}</Text>
                                                </Text>

                                                <Text>
                                                    <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall, { color: '#333333', }]}>{`Slots\n`}</Text>
                                                    <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333', }]}>{item.appointmentSlotsText}</Text>
                                                </Text>
                                                <Text style={[CommonStyles.textSizeAverage, { color: '#333333' }]}>
                                                    <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall]}>{`No.of Weeks: `}</Text>
                                                    <Text style={CommonStyles.fontMedium}>{item.numOfClinics}</Text>
                                                </Text>
                                            </View>
                                            <View style={[CommonStyles.container, { justifyContent: 'space-around' }]}>
                                                <View style={[CommonStyles.container, { justifyContent: 'space-around', alignItems: 'flex-end', marginBottom: 10 }]}>

                                                <Text style={[CommonStyles.textSizeAverage, { color: '#333333' }]}>
                                                    <Text style={[CommonStyles.fontRegular, CommonStyles.textSizeSmall]}>{`Frequency: `}</Text>
                                                    <Text style={CommonStyles.fontMedium}>{item.frequencyText}</Text>
                                                </Text>
                                                    {/* <CheckBox
                                                        containerStyle={{ backgroundColor: 'rgba(52, 52, 52, 0.0)', borderColor: 'rgba(52, 52, 52, 0.0)', marginRight: -12 }}
                                                        textStyle={[CommonStyles.textSizeSmall, { color: '#497C12', fontWeight: '600' }]}
                                                        iconRight
                                                        iconType='material'
                                                        checkedIcon='check-box'
                                                        uncheckedIcon='add'
                                                        checkedColor='#9CD85B'
                                                        uncheckedColor='#9CD85B'
                                                        title='Accepted'
                                                        checked={this.state.checked}
                                                    /> */}
                                                    <Text style={{ marginBottom: 6 }}>
                                                        <Text style={[CommonStyles.textSizeSmall, CommonStyles.fontRegular, { color: '#333333' }]}>{`Date: `}</Text>
                                                        <Text style={[CommonStyles.fontMedium, CommonStyles.textSizeAverage, { color: '#333333' }]}>{moment(item.joinedDate).format('ll')}</Text>
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
            </View>);
        
    }
}