import React, { Component } from 'react';
import {
  View,
  Image
} from 'react-native';


import DrawerHeader from './AppHeader';




import {
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Thumbnail
} from 'native-base';


export default class Sidebar extends Component {
  render() {
    return (
          <Content style={{backgroundColor:'#FFFFFF'}}>
                <DrawerHeader/>
         <List>
              <ListItem icon >
                <Left>
                  <Icon name="paper" />
                </Left>
                <Body >
                  <Text>Passbook</Text>
                </Body>
              </ListItem>
           
             
         </List>

          </Content>
    );
  }
}

module.exports = Sidebar;