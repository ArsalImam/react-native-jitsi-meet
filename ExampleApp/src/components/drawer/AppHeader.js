import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

import {Header,Left,Button,Icon,Right,Body,Title} from 'native-base';

export default class AppHeader extends Component {
  render() {
    return (
      <Header noShadow style={{backgroundColor:'white'}}>
       <Left>
       <Button transparent
              onPress={()=>this.props.openDrawer()}
       >
         <Icon name='menu' style={{color:'black'}}/>
       </Button>
       </Left>
       <Body>
        
       </Body>
 
     </Header>
    );
  }
}

module.exports = AppHeader;