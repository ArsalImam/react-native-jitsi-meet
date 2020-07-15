/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';

import Api from '../Api';
import {Container, Drawer, Button, Icon} from 'native-base';
import SideBar from '../components/drawer/SideBar';
import AppHeader from '../components/drawer/AppHeader';

import {View, Text, StyleSheet, Linking} from 'react-native';
import {ViewUtils} from '../Utils';

import {TouchableOpacity} from 'react-native-gesture-handler';

export default class AppointmentRoom extends React.Component {
  appointmentId = '';
  appointment={};
  constructor (props) {
    super (props);
  }

  componentWillUnmount () {
    JitsiMeet.endCall ();
  }

  componentDidMount () {
    
    const {appointmentId} = this.props.route.params;

    this.appointmentId = appointmentId;

    Api.instance ()._user ().then (user => {
      let _user = JSON.parse (JSON.stringify (user));

      console.log (`starting conference on url =====> ${appointmentId}`);

      const url = `https://conference.evotelemedicine.live/${appointmentId}`;
      const {firstName, lastName, username} = _user;
      const userInfo = {
        displayName: `${firstName} ${lastName}`,
        email: username,
        avatar: 'https:/gravatar.com/avatar/abc123',
      };
      JitsiMeet.call (url, userInfo);


      Api.instance().getAppointmentById(appointmentId)
      .then((response)=>{
        
        this.appointment=response;

      })

    });
  }

  onConferenceTerminated (nativeEvent) {
    const prescribtionUrl = Api.instance ().getUrl (
      `consultation-reports/getReport?appointmentId=${this.appointmentId}&prescription=true`
    );
    /* Conference terminated event */

    Api.instance ()
      .updateAppointmentStatus (this.appointmentId)
      .then (response => {
        this.props.navigation.goBack ();
        this.props.navigation.navigate ('WebView', {
          prescribtionUrl,
        });
      })
      .catch (err => {
        ViewUtils.showToast (err);
      });
  }

  onConferenceJoined (nativeEvent) {
    /* Conference joined event */
  }

  onConferenceWillJoin (nativeEvent) {
    /* Conference will join event */
  }
  closeDrawer = () => {
    this.drawer._root.close ();
  };
  openDrawer = () => {
    this.drawer._root.open ();
  };

  render () {
    return (
      <Container
        style={[StyleSheet.absoluteFillObject, {backgroundColor: 'black'}]}
        header={false}
      >

        <Drawer
          ref={ref => {
            this.drawer = ref;
          }}
          content={
            <SideBar
              navigator={this.navigator}
              appointmentId={this.props.route.params.appointmentId}
              changeScreenHandler={this.props.navigation}
              appointment={this.appointment}
              requestAppointment={() => this.appointment}
            />
          }
          onClose={() => this.closeDrawer ()}
        >
          <View>
            <View
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                height: 52,
                backgroundColor: '#F7FAFE',
                zIndex: 100,
              }}
            >

              <TouchableOpacity
                style={{paddingTop: 10, paddingLeft: 10, marginVertical:10}}
                onPress={() => this.openDrawer ()}
              >
                <Icon
                  name="menu"
                  type="MaterialIcons"
                  style={{color: 'black'}}
                />
              </TouchableOpacity>
            </View>
            <JitsiMeetView
              onConferenceTerminated={e => this.onConferenceTerminated (e)}
              onConferenceJoined={e => this.onConferenceJoined (e)}
              onConferenceWillJoin={e => this.onConferenceWillJoin (e)}
              style={{height: '100%', width: '100%'}}
            />
          </View>
        </Drawer>
      </Container>
    );
  }
}
