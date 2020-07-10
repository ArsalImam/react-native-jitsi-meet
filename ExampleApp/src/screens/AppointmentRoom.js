/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';
import Api from '../Api';
import {Container, Drawer} from 'native-base';
import SideBar from '../components/drawer/SideBar';
import AppHeader from '../components/drawer/AppHeader';
import {View, Text} from 'react-native';
export default class AppointmentRoom extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    JitsiMeet.endCall();
  }

  componentDidMount() {
    const {appointmentId} = this.props.route.params;

    Api.instance()
      ._user()
      .then(user => {
        let _user = JSON.parse(JSON.stringify(user));

        const url = `https://conference.evotelemedicine.live/${appointmentId}`;
        const {firstName, lastName, username} = _user;
        const userInfo = {
          displayName: `${firstName} ${lastName}`,
          email: username,
          avatar: 'https:/gravatar.com/avatar/abc123',
        };
        JitsiMeet.call(url, userInfo);
      });

    /* Você também pode usar o JitsiMeet.audioCall (url) para chamadas apenas de áudio */
    /* Você pode terminar programaticamente a chamada com JitsiMeet.endCall () */
  }

  onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    console.log(nativeEvent);
  }

  onConferenceJoined(nativeEvent) {
    /* Conference joined event */
    console.log(nativeEvent);
  }

  onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
    console.log(nativeEvent);
  }
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    return (
    
      <Drawer
        ref={ref => {
          this._drawer = ref;
        }}
        content={<SideBar navigator={this._navigator} />}
        onClose={() => this.closeDrawer()}>
        <AppHeader openDrawer={this.openDrawer.bind(this)} />
        <JitsiMeetView
          onConferenceTerminated={e => this.onConferenceTerminated(e)}
          onConferenceJoined={e => this.onConferenceJoined(e)}
          onConferenceWillJoin={e => this.onConferenceWillJoin(e)}
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
          }}
        />
      </Drawer>
    );
  }
}
