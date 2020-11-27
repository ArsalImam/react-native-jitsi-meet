import {AsyncStorage} from 'react-native';

export default class Methods {
  static myInstance = null;
  isInComingCallOpen = false;
  navigatePush = -1;
  eventNavigationValue = 'Live';
  _id = null;
  activeCourse = false;
  /**
   * @returns {Methods}
   */
  static instance() {
    if (Methods.myInstance == null) {
      Methods.myInstance = new Methods();
    }
    return this.myInstance;
  }

  constructor() {
    this.navigatePush = -1;
    this.eventNavigationValue = 'Live';
    this._id = null;
    this.activeCourse = false;
    this.isInComingCallOpen = false;
  }

  _eventNavigation(eventNavigationValue) {
    this.eventNavigationValue = eventNavigationValue;
  }
  eventNavigation() {
    return this.eventNavigationValue;
  }

  pushNavigation() {
    return this.navigatePush;
  }

  _pushIncomingCall(isInComingCallOpen) {
    this.isInComingCallOpen = isInComingCallOpen;
  }

  pushIncomingCall() {
    return this.isInComingCallOpen;
  }

  pushActiveCourse() {
    return this.activeCourse;
  }

  _pushActiveCourse(activeCourse) {
    this.activeCourse = activeCourse;
  }

  // getTabInitialRoute() {
  //   let screenName = '';
  //   console.log('navigatePush =================================> ', this.navigatePush);
  //   switch (this.navigatePush) {

  //     case 0:
  //       screenName = 'Event';
  //     // this.props.navigation.replace('Tabs', {}, {screen: 'Event'});
  //       break;
  //     case 1:
  //       // this.props.navigation.replace('Event', {type});
  //       break;
  //     case 2:
  //       // this.props.navigation.replace('Event', {type});
  //       break;

  //       default:
  //       screenName = 'Home';
  //   }
  //   return screenName;
  // }

  _pushNavigation(screenTag) {
    this.navigatePush = screenTag;
  }

  _pushId(_id) {
    this._id = _id;
  }
  pushId() {
    return this._id;
  }
}
