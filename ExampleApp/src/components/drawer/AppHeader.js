import React, { Component } from 'react';
import {
  View, TouchableOpacity
} from 'react-native';

import { Header, Left, Button,  Right, Body, Title, Icon, Container } from 'native-base';

export default class AppHeader extends Component {
  render() {
    return (

      <View style={{ position: 'absolute', left: 0, top: 0, right: 0, height: 120, backgroundColor: '#fff' }}>
        <Button
          onPress={() => this.props.openDrawer()}>
          <Icon
            name="menu"
            type="MaterialIcons"
            style={{ color: '#FFF' }}
          />
        </Button>
      </View>
      //   <Header noShadow style={{backgroundColor:'white'}}>
      //    <Left>
      //    <Button transparent
      //           onPress={()=>this.props.openDrawer()}
      //    >
      //      <Icon name='menu' style={{color:'black'}}/>
      //    </Button>
      //    </Left>
      //    <Body>

      //    </Body>

      //  </Header>
    );
  }
}

module.exports = AppHeader;