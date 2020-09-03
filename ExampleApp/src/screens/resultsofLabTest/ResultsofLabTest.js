import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import Canvas from '../../components/canvas';
export default class ResultsofLabTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
    };
    this.state.entries = ['a', 'a', 'a'];
  }

  _renderItem = ({item, index}) => {
    return (
      <View>
        <Image
          style={{height: '97%', width: '100%', resizeMode: 'contain'}}
          source={require('../../assets/drawable-xxxhdpi/Mask.png')}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
         <Canvas/>
      </View>
    );
  }
}
