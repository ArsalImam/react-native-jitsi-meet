import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import Canvas from '../../components/canvas';
export default class ViewMiscImagesSkinLesion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
    };
    this.state.entries = ['a', 'a', 'a'];
  }

 
  render() {
    return (
      <View style={{flex: 1}}>
         <Canvas/>
      </View>
    );
  }
}
