import React, { Component } from 'react';
import CommonStyles from '../../CommonStyles';

import { Container, Header, Content, List, ListItem, Text, Icon } from 'native-base';
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
    console.log("appointment id", JSON.stringify(this.props.appointment))
    return (
      <Container>
        <Content>
          <List>
            <ListItem  itemDivider>
              <Text style={[CommonStyles.textSizeLarge, {textAlign: 'center', alignSelf: 'center'}]}>EMR</Text>
            </ListItem>

            <ListItem button={true} onPress={() => { this.props.changeScreenHandler.navigate('PatientHistoryList', {appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId}) }} >
              <Text >History Form</Text>
            </ListItem>

            <ListItem button={true} onPress={() => { this.props.changeScreenHandler.navigate('VitalList', {appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId}) }}>
              <Text>Vital</Text>
            </ListItem>

            <ListItem itemDivider>
              <Text style={[CommonStyles.textSizeLarge, {textAlign: 'center', alignSelf: 'center'}]}>Doctor Advice</Text>
            </ListItem>

            <ListItem button={true} onPress={() => { this.props.changeScreenHandler.navigate('AddPrescribtion',{appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId}) }} >
              <Text>Prescribe Medication</Text>
            </ListItem>

            <ListItem button={true} onPress={() => { this.props.changeScreenHandler.navigate('MedicationList',{appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId}) }} >
              <Text>Medication</Text>
            </ListItem>

            <ListItem button={true} onPress={() => { this.props.changeScreenHandler.navigate('DiagnosisList', {appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId}) }} >
              <Text>Diagnosis</Text>
            </ListItem>


            <ListItem button={true} onPress={() => { this.props.changeScreenHandler.navigate('InvestigationList', {appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId}) }} >
              <Text>Investigation</Text>
            </ListItem>


            <ListItem button={true} onPress={() => { this.props.changeScreenHandler.navigate('ProcedureList', {appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId}) }} >
              <Text>Surgical Procedure</Text>
            </ListItem>

            <ListItem button={true} onPress={() => { this.props.changeScreenHandler.navigate('TherapyList', {appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId}) }}>
              <Text>Suggested Therapy</Text>
            </ListItem>

            <ListItem button={true} onPress={() => { this.props.changeScreenHandler.navigate('IllustrationsList', {appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId}) }}>
              <Text>Upload</Text>
            </ListItem>

            <ListItem button={true} onPress={() => { this.props.changeScreenHandler.navigate('MedicalRecordList', {appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId}) }}>
              <Text>Upload Medical Record</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

module.exports = Sidebar;