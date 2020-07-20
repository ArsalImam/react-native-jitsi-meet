import React, { Component } from 'react';
import CommonStyles from '../../CommonStyles';
import Api from '../../Api';

import { Container, Header, Content, List, ListItem, Text, Icon, Left } from 'native-base';
import DrawerHeader from './AppHeader';
import { CommonActions } from '@react-navigation/native';
import {Roles} from '../.././Configs';



export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      role: ''
    }
  }
  componentDidMount() {

    Api.instance().getUserRole().then(role => this.setState({role}));
  }

  render() {
    console.warn(this.state.role);
  
    return (
      <Container style={{ backgroundColor: '#F7FAFE' }}>
        <Content>

        {this.state.role==Roles.doctor ? (
        
        <List>
           
        <ListItem itemDivider style={{ backgroundColor: 'grey', }}>
          <Text style={[CommonStyles.textSizeMedium, CommonStyles.textColorWhite, { textAlign: 'center', alignSelf: 'center',  }]}>EMR</Text>
        </ListItem>

        <ListItem
          button={true} onPress={() => { this.props.changeScreenHandler.navigate('PatientHistoryList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name='history' type='FontAwesome' style={{ fontSize: 21}} />
            <Text style={[CommonStyles.textSizeAverage, {marginLeft: 10}]}>History Form</Text>
          </Left>
        </ListItem>

        <ListItem button={true} onPress={() => { this.props.changeScreenHandler.navigate('VitalList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="activity" type='Feather' style={[CommonStyles.textSizeLarge]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]}>Vital</Text>
          </Left>
        </ListItem>


        <ListItem itemDivider  style={{ backgroundColor: 'grey'}}>
          <Text style={[CommonStyles.textSizeMedium, CommonStyles.textColorWhite, { textAlign: 'center', alignSelf: 'center' }]}>Doctor Advice</Text>
        </ListItem>


        <ListItem button={true} onPress={() => { this.props.changeScreenHandler.navigate('AddPrescribtion', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="medicinebox" type='AntDesign' style={[CommonStyles.textSizeMedium]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]}>Prescribe Medication</Text>
          </Left>
        </ListItem>

        <ListItem button={true} onPress={() => { this.props.changeScreenHandler.navigate('MedicationList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="medical-bag" type="MaterialCommunityIcons" style={[CommonStyles.textSizeMedium]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]}>Medication</Text>
          </Left>
        </ListItem>

        <ListItem button={true} onPress={() => { this.props.changeScreenHandler.navigate('DiagnosisList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="diagnoses" type="FontAwesome5" style={[CommonStyles.textSizeMedium]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]}>Diagnosis</Text>
          </Left>
        </ListItem>

        <ListItem button={true} onPress={() => { this.props.changeScreenHandler.navigate('InvestigationList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="flower" style={[CommonStyles.textSizeLarge]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]}>Investigation</Text>
          </Left>
        </ListItem>

        <ListItem button={true} onPress={() => { this.props.changeScreenHandler.navigate('ProcedureList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="box-cutter" type='MaterialCommunityIcons' style={[CommonStyles.textSizeLarge]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]}>Surgical Procedure</Text>
          </Left>
        </ListItem>


        <ListItem button={true} onPress={() => { this.props.changeScreenHandler.navigate('TherapyList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="ios-flower" type='Ionicons' style={[CommonStyles.textSizeMedium]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]} >Suggested Therapy</Text>
          </Left>
        </ListItem>

        <ListItem button={true} onPress={() => { this.props.changeScreenHandler.navigate('IllustrationsList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="upload" type='Feather' style={[CommonStyles.textSizeMedium]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]} >Upload</Text>
          </Left>
        </ListItem>

      </List>
      ) : (
        <List>
            <ListItem itemDivider style={{ backgroundColor: 'grey', }}>
          <Text style={[CommonStyles.textSizeMedium, CommonStyles.textColorWhite, { textAlign: 'center', alignSelf: 'center',  }]}>MEDICAL RECORDS</Text>
        </ListItem>

          <ListItem button={true} onPress={() => { this.props.changeScreenHandler.navigate('MedicalRecordList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="briefcase-medical" type='FontAwesome5' style={[CommonStyles.textSizeMedium]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]} >My Medical Records</Text>
          </Left>
        </ListItem>  
      </List>
      )}
         
        </Content>
      </Container>
    );
  }
}

module.exports = Sidebar;