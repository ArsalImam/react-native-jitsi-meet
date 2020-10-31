import React, {Component} from 'react';
import {Text, View, Image, StyleSheet,Dimensions,ImageBackground,TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import Canvas from '../../components/canvas';
import {Icon} from 'native-base';
import Api from '../../Api';
import CommonStyles from '../../CommonStyles';
export default class ViewXRayScan extends Component {
  constructor(props) {
    super(props);
      this.state = {
        isLoading: true,
        appointmentId: this.props.route.params.appointmentId,
        patientId: this.props.route.params.patientId,
        images: [],
        type:"xRay",
        imageUri:'',
        noRecord:''
      };

    } 
  

  componentDidMount(){
    this._getMedicalRecordImages(this.state.patientId,this.state.type)
  }

  _getMedicalRecordImages(patientId,type) {
    this.setState({isLoading: true});
    Api.instance()
      .getMedicalRecordImages(patientId,type)
      .then(data => {
        let urls = data.map(x => x.url)
        this.setState({images: urls})
        if(this.state.images.length == 0){
          this.setState({noRecord:'No Record Found'})
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }


  _renderItem = ({item, index}) => {
    return (
      <View style={{justifyContent: 'center',alignItems: 'center'}}>
        <Image
          style={{height: '75%', width: '100%', resizeMode: 'cover',backgroundColor: '#E3E3E3'}}
          source={{uri: item}}
        />
      </View>
    );
  };
 
  render() {
    return (
      <View style={{height: '75%'}}>
      <ImageBackground
        style={[CommonStyles.container, CommonStyles.backgroundImage]}
        source={require('../../assets/img/bwback.png')}>
        <View style={{flex: 3, backgroundColor: '#297dec'}}>
          <Text style={{color: '#FFFFFF', paddingLeft: 17, marginTop: 65}}>
            <Text
              style={[
                CommonStyles.fontRegular,
                CommonStyles.textSizeLarge,
              ]}>{`View Xray Scan\n`}</Text>
            <Text
              style={[
                CommonStyles.fontRegular,
                CommonStyles.textSizeSmall,
              ]}>
              It is a list of all your Xray Scans{' '}
            </Text>
          </Text>
        </View>
        {/* <Loader loading={this.state.isLoading} /> */}
        <View style={{flex: 8,justifyContent: 'center',alignItems: 'center'}}>
        {this.state.images.length != 0 ? (
              <Carousel
                ref={c => {
                  this._carousel = c;
                }}
                data={this.state.images}
                renderItem={this._renderItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={300}
              />
            ) : (
              <Text>{this.state.noRecord}</Text>

            )}
         {/* <Canvas/> */}
      </View>
        <View style={[CommonStyles.backButtonStyle]}>
          <TouchableOpacity
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
}
