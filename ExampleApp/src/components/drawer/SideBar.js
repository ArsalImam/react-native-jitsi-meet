import React, { Component } from 'react';
import CommonStyles from '../../CommonStyles';
import Api from '../../Api';

import { Container, Header, Content, List, ListItem, Text, Icon, Left } from 'native-base';
import DrawerHeader from './AppHeader';
import { CommonActions } from '@react-navigation/native';
import {Roles} from '../.././Configs';
import RealtimeDatabase from '../../RealtimeDatabase';


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
    return (
      <Container style={{backgroundColor: '#F7FAFE', flex: 1}}>
        <Content>

        {this.state.role==Roles.doctor ? (                                                                                                                                                                                                                                                                                                                                                                                                                 
        
        <List style={{backgroundColor: '#F7FAFE', paddingBottom: 50}}>
           
        <ListItem itemDivider style={{ backgroundColor: 'grey', }}>
          <Text style={[CommonStyles.textSizeMedium, CommonStyles.textColorWhite, { textAlign: 'center', alignSelf: 'center',  }]}>EMR</Text>
        </ListItem>

        <ListItem
          button={true} onPress={() => { 
            this.props.closeDrawer();
            this.props.changeScreenHandler.navigate('PatientHistoryList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) ;RealtimeDatabase.instance()._getAppointment(this.props.appointmentId,-1)}} >
          <Left>
            <Icon active name='history' type='FontAwesome' style={{ fontSize: 21}} />
            <Text style={[CommonStyles.textSizeAverage, {marginLeft: 10}]}>History Form</Text>
          </Left>
        </ListItem>

        <ListItem
          button={true} onPress={() => { 
            this.props.closeDrawer();
            this.props.changeScreenHandler.navigate('ViewReferralLetter', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) ;RealtimeDatabase.instance()._getAppointment(this.props.appointmentId,-1)}} >
          <Left>
            <Icon active name='newsletter' type='Entypo' style={{ fontSize: 21}} />
            <Text style={[CommonStyles.textSizeAverage, {marginLeft: 10}]}>View Referral Letter</Text>
          </Left>
        </ListItem>

        <ListItem
          button={true} onPress={() => { 
            this.props.closeDrawer();
            this.props.changeScreenHandler.navigate('ViewScanMedicalRecord', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) ;RealtimeDatabase.instance()._getAppointment(this.props.appointmentId,-1)}} >
          <Left>
            <Icon active name='file-medical' type='FontAwesome5' style={{ fontSize: 21}} />
            <Text style={[CommonStyles.textSizeAverage, {marginLeft: 10}]}>View Scan Medical Records</Text>
          </Left>
        </ListItem>

        <ListItem
          button={true} onPress={() => { 
            this.props.closeDrawer();
            this.props.changeScreenHandler.navigate('ViewResultsofLabTest', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) ;RealtimeDatabase.instance()._getAppointment(this.props.appointmentId,-1)}} >
          <Left>
            <Icon active name='laboratory' type='Fontisto' style={{ fontSize: 21}} />
            <Text style={[CommonStyles.textSizeAverage, {marginLeft: 10}]}>View Results of Lab Test</Text>
          </Left>
        </ListItem>

        <ListItem
          button={true} onPress={() => { 
            this.props.closeDrawer();
            this.props.changeScreenHandler.navigate('ViewXRayScan', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) ;RealtimeDatabase.instance()._getAppointment(this.props.appointmentId,-1)}} >
          <Left>
            <Icon active name='x-ray' type='FontAwesome5' style={{ fontSize: 21}} />
            <Text style={[CommonStyles.textSizeAverage, {marginLeft: 10}]}>View X-Ray,MRI,CT,US Scans</Text>
          </Left>
        </ListItem>

        <ListItem
          button={true} onPress={() => { 
            this.props.closeDrawer();
            this.props.changeScreenHandler.navigate('ViewMiscImagesSkinLesion', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) ;RealtimeDatabase.instance()._getAppointment(this.props.appointmentId,-1)}} >
          <Left>
            <Icon active name='folder-images' type='Entypo' style={{ fontSize: 21}} />
            <Text style={[CommonStyles.textSizeAverage, {marginLeft: 10}]}>View Misc Images ECG,Skin Lesion</Text>
          </Left>
        </ListItem>

       

        <ListItem itemDivider  style={{ backgroundColor: 'grey'}}>
          <Text style={[CommonStyles.textSizeMedium, CommonStyles.textColorWhite, { textAlign: 'center', alignSelf: 'center' }]}>Doctor Advice</Text>
        </ListItem>

        <ListItem
          button={true} onPress={() => { 
            this.props.closeDrawer();
            this.props.changeScreenHandler.navigate('VitalList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) ;RealtimeDatabase.instance()._getAppointment(this.props.appointmentId,-1)}} >
          <Left>
            <Icon active name='map-signs' type='FontAwesome' style={{ fontSize: 21}} />
            <Text style={[CommonStyles.textSizeAverage, {marginLeft: 10}]}>Vital Signs</Text>
          </Left>
        </ListItem>

        <ListItem button={true} onPress={() => { 
          this.props.closeDrawer();
          this.props.changeScreenHandler.navigate('AddPrescribtion', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="medicinebox" type='AntDesign' style={[CommonStyles.textSizeMedium]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]}>Prescribe Medication</Text>
          </Left>
        </ListItem>

        {/* <ListItem button={true} onPress={() => { 
          this.props.closeDrawer();
          this.props.changeScreenHandler.navigate('MedicationList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="medical-bag" type="MaterialCommunityIcons" style={[CommonStyles.textSizeMedium]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]}>Medication</Text>
          </Left>
        </ListItem> */}

        <ListItem button={true} onPress={() => { 
          this.props.closeDrawer();
          this.props.changeScreenHandler.navigate('DiagnosisList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="diagnoses" type="FontAwesome5" style={[CommonStyles.textSizeMedium]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]}>Diagnosis</Text>
          </Left>
        </ListItem>

        <ListItem button={true} onPress={() => { 
          this.props.closeDrawer();
          this.props.changeScreenHandler.navigate('FollowUpList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="diagnoses" type="FontAwesome5" style={[CommonStyles.textSizeMedium]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]}>FollowUp</Text>
          </Left>
        </ListItem>

        <ListItem button={true} onPress={() => { 
          this.props.closeDrawer();
          this.props.changeScreenHandler.navigate('RefertoSpecialistList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="doctor" type="Fontisto" style={[CommonStyles.textSizeMedium]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]}>Refer to Specialist</Text>
          </Left>
        </ListItem>

        <ListItem button={true} onPress={() => {
          this.props.closeDrawer();
          this.props.changeScreenHandler.navigate('InvestigationList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="flower" style={[CommonStyles.textSizeLarge]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]}>Investigation</Text>
          </Left>
        </ListItem>

        <ListItem button={true} onPress={() => {
          this.props.closeDrawer();
          this.props.changeScreenHandler.navigate('ProcedureList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="box-cutter" type='MaterialCommunityIcons' style={[CommonStyles.textSizeLarge]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]}>Surgical Procedure</Text>
          </Left>
        </ListItem>


        <ListItem button={true} onPress={() => {
          this.props.closeDrawer();
          this.props.changeScreenHandler.navigate('TherapyList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="comment-medical" type='FontAwesome5' style={[CommonStyles.textSizeMedium]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]} >Suggested Therapy</Text>
          </Left>
        </ListItem>


        <ListItem button={true} onPress={() => {
          this.props.closeDrawer();
          this.props.changeScreenHandler.navigate('ObservationList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="ios-flower" type='Ionicons' style={[CommonStyles.textSizeMedium]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]} >Observation</Text>
          </Left>
        </ListItem>


        <ListItem button={true} onPress={() => {
          this.props.closeDrawer();
          this.props.changeScreenHandler.navigate('ChatLogs', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="ios-flower" type='Ionicons' style={[CommonStyles.textSizeMedium]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]} >Chat Logs</Text>
          </Left>
        </ListItem>

        {/* <ListItem button={true} onPress={() => { 
          this.props.closeDrawer();
          this.props.changeScreenHandler.navigate('IllustrationsList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="upload" type='Feather' style={[CommonStyles.textSizeMedium]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]} >Upload</Text>
          </Left>
        </ListItem> */}

      </List>
      ) : (
        <List>
            <ListItem itemDivider style={{ backgroundColor: 'grey', }}>
          <Text style={[CommonStyles.textSizeMedium, CommonStyles.textColorWhite, { textAlign: 'center', alignSelf: 'center',  }]}>MEDICAL RECORDS</Text>
        </ListItem>

        <ListItem button={true} onPress={() => {
          this.props.closeDrawer();
          this.props.changeScreenHandler.navigate('VitalList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="activity" type='Feather' style={[CommonStyles.textSizeLarge]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]}>Vital</Text>
          </Left>
        </ListItem>
          <ListItem button={true} onPress={() => {
            this.props.closeDrawer();
            this.props.changeScreenHandler.navigate('MedicalRecordList', { appointmentId: this.props.appointmentId, patientId: this.props.requestAppointment().patientId }) }} >
          <Left>
            <Icon active name="briefcase-medical" type='FontAwesome5' style={[CommonStyles.textSizeMedium]} />
            <Text style={[CommonStyles.textSizeAverage, { marginLeft: 10 }]} >Medical Records</Text>
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