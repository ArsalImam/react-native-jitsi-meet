import React, { Component } from 'react';

import { Container, Header, Content, List, ListItem, Text ,Icon } from 'native-base';
import DrawerHeader from './AppHeader';
import { CommonActions } from '@react-navigation/native';




export default class Sidebar extends Component {

  constructor(props) {
      super(props)
       this.state = {

         
       }
      }
      componentDidMount() {
console.log('========>',this.props.appointmentId)

      }
  render() {
      
    return (
          <Container>
        <Header />
        <Content>
            <List>
            <ListItem itemDivider>
              <Text>EMR</Text>
            </ListItem>      

    <ListItem  button={true}  >
              <Text>History Form</Text>
            </ListItem>

            <ListItem  button={true} onPress={() => {this.props.changeScreenHandler.navigate('Vital')}}>
              <Text>Vital Signs</Text>
            </ListItem>
           
                  <ListItem itemDivider>
              <Text>Doctor Advice</Text>
            </ListItem> 

              <ListItem  button={true} >
              <Text>Prescribe Medication</Text>
            </ListItem>

                      <ListItem  button={true} >
              <Text>Diagnosis</Text>
            </ListItem>
           

                       <ListItem  button={true} >
              <Text>Investigation</Text>
            </ListItem>


                                 <ListItem  button={true} >
              <Text>Surgical Procedure</Text>
            </ListItem>

                                       <ListItem  button={true} >
              <Text>Suggested Therapy</Text>
            </ListItem>

          </List>
        </Content>
      </Container>
    );
  }
}

module.exports = Sidebar;