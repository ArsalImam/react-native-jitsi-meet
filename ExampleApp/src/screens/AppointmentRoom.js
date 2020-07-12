/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';
import Api from '../Api';
import { Container, Drawer, Button, Icon } from 'native-base';
import SideBar from '../components/drawer/SideBar';
import AppHeader from '../components/drawer/AppHeader';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class AppointmentRoom extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    JitsiMeet.endCall();
  }

  componentDidMount() {
    const { appointmentId } = this.props.route.params;

    Api.instance()
      ._user()
      .then(user => {
        let _user = JSON.parse(JSON.stringify(user));

        const url = `https://conference.evotelemedicine.live/${appointmentId}`;
        const { firstName, lastName, username } = _user;
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
      <Container style={[StyleSheet.absoluteFillObject, { backgroundColor: 'black' }]} header={false}>

        <Drawer
          ref={ref => {
            this.drawer = ref;
          }}
          content={<SideBar navigator={this.navigator} appointmentId={this.props.route.params.appointmentId} changeScreenHandler={this.props.navigation} />}
          onClose={() => this.closeDrawer()}>
          <View>
            <View style={{ position: 'absolute', left: 0, top: 0, right: 0, height: 52, backgroundColor: 'white', zIndex: 100 }}>

              <TouchableOpacity onPress={() => this.props.openDrawer()}>
                <Icon
                  name="menu"
                  type="MaterialIcons"
                  style={{ color: 'black' }}
                /></TouchableOpacity>
            </View>
            {/* <View style={{ position: 'absolute', left: 0, top: 0, right: 0, height: 120, backgroundColor: 'white', zIndex: 100 }}>
            <Button
              onPress={() => this.props.openDrawer()}>
              <Icon
                name="menu"
                type="MaterialIcons"
                style={{ color: '#FFF' }}
              />
            </Button>
          </View>
          <JitsiMeetView
            onConferenceTerminated={e => this.onConferenceTerminated(e)}
            onConferenceJoined={e => this.onConferenceJoined(e)}
            onConferenceWillJoin={e => this.onConferenceWillJoin(e)}
            style={{ flex: 1, height: '100%', width: '100%', }} /> */}
            <JitsiMeetView
              onConferenceTerminated={e => this.onConferenceTerminated(e)}
              onConferenceJoined={e => this.onConferenceJoined(e)}
              onConferenceWillJoin={e => this.onConferenceWillJoin(e)}
              style={{ flex: 1, height: '100%', width: '100%', }} />
          </View>
        </Drawer>
      </Container>

    );
  }
}
