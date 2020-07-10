import React, { Component } from 'react';

import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import DrawerHeader from './AppHeader';




export default class Sidebar extends Component {
  render() {
    return (
          <Container>
        <Header />
        <Content>
          <List>
            <ListItem>
              <Text>Simon Mignolet</Text>
            </ListItem>
            <ListItem>
              <Text>Nathaniel Clyne</Text>
            </ListItem>
            <ListItem>
              <Text>Dejan Lovren</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

module.exports = Sidebar;