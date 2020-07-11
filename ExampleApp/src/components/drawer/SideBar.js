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

    <ListItem  button={true}  onPress={() => {this.props.changeScreenHandler.navigate('PatientHistoryList',this.props.appointmentId)}} >
              <Text>History Form</Text>
            </ListItem>

            <ListItem  button={true} onPress={() => {this.props.changeScreenHandler.navigate('VitalList',this.props.appointmentId)}}>
              <Text>Vital Signs</Text>
            </ListItem>
           
                  <ListItem itemDivider>
              <Text>Doctor Advice</Text>
            </ListItem> 

              <ListItem  button={true} onPress={() => {this.props.changeScreenHandler.navigate('MedicationList',this.props.appointmentId)}} >
              <Text>Medication</Text>
            </ListItem>

                      <ListItem  button={true} onPress={() => {this.props.changeScreenHandler.navigate('DiagnosisList',this.props.appointmentId)}} >
              <Text>Diagnosis</Text>
            </ListItem>
           

                       <ListItem  button={true}  onPress={() => {this.props.changeScreenHandler.navigate('InvestigationList',this.props.appointmentId)}} >
              <Text>Investigation</Text>
            </ListItem>


                                 <ListItem  button={true}  onPress={() => {this.props.changeScreenHandler.navigate('ProcedureList',this.props.appointmentId)}} >
              <Text>Surgical Procedure</Text>
            </ListItem>

                                       <ListItem  button={true}  onPress={() => {this.props.changeScreenHandler.navigate('TherapyList',this.props.appointmentId)}}>
              <Text>Suggested Therapy</Text>
            </ListItem>

          </List>
        </Content>
      </Container>
    );
  }
}

module.exports = Sidebar;