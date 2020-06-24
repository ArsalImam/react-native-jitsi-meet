import React from 'react';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';
import Api from '../Api';

export default class AppointmentRoom extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        JitsiMeet.endCall();
    }

    componentDidMount() {
        const { appointmentId } = this.props.route.params;
        const url = `https://conference.evotelemedicine.live/${appointmentId}`;
        const { firstName, lastName, username } = Api.instance().getUser();
        const userInfo = {
            displayName: `${firstName} ${lastName}`,
            email: username,
            avatar: 'https:/gravatar.com/avatar/abc123',
        };
        JitsiMeet.call(url, userInfo);
        /* Você também pode usar o JitsiMeet.audioCall (url) para chamadas apenas de áudio */
        /* Você pode terminar programaticamente a chamada com JitsiMeet.endCall () */
    }

    onConferenceTerminated(nativeEvent) {
        /* Conference terminated event */
        console.log(nativeEvent)
    }

    onConferenceJoined(nativeEvent) {
        /* Conference joined event */
        console.log(nativeEvent)
    }

    onConferenceWillJoin(nativeEvent) {
        /* Conference will join event */
        console.log(nativeEvent)
    }

    render() {

        return (
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
        )
    }
}
