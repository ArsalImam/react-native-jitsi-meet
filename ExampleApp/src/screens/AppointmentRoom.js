import React, { Component } from 'react';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';
import { View } from 'react-native';

export default class AppointmentRoom extends React.Component {
    constructor(props) {
        super(props);
        // this.onConferenceTerminated = this.onConferenceTerminated.bind(this);
        // this.onConferenceJoined = this.onConferenceJoined.bind(this);
        // this.onConferenceWillJoin = this.onConferenceWillJoin.bind(this);
    }

    componentDidMount() {
        // setTimeout(() => {
            const url = 'https://conference.eclinic.org.pk/5ebed61b9f414008b11921b8'; // can also be only room name and will connect to jitsi meet servers
        //     // const url = 'https://meet.jit.si/abc'; // can also be only room name and will connect to jitsi meet servers
            const userInfo = { displayName: 'User', email: 'user@example.com', avatar: 'https:/gravatar.com/avatar/abc123' };
            JitsiMeet.call(url, userInfo);
        //     /* You can also use JitsiMeet.audioCall(url) for audio only call */
        //     /* You can programmatically end the call with JitsiMeet.endCall() */
        // }, 1000);
    }

    // onConferenceTerminated(nativeEvent) {
    //     /* Conference terminated event */
    // }

    // onConferenceJoined(nativeEvent) {
    //     /* Conference joined event */
    // }

    // onConferenceWillJoin(nativeEvent) {
    //     /* Conference will join event */
    // }
/* <View style={{ backgroundColor: 'black', flex: 1 }}>
                <JitsiMeetView onConferenceTerminated={this.onConferenceTerminated} onConferenceJoined={this.onConferenceJoined} onConferenceWillJoin={this.onConferenceWillJoin} style={{ flex: 1, height: '100%', width: '100%' }} />
            </View> */
    render() {
        return (
            <View style={{ backgroundColor: 'black', flex: 1 }}>
                <JitsiMeetView onConferenceTerminated={this.onConferenceTerminated} onConferenceJoined={this.onConferenceJoined} onConferenceWillJoin={this.onConferenceWillJoin} style={{ flex: 1, height: '100%', width: '100%' }} />
            </View> 
        );
    }
}