import firebase from 'react-native-firebase';
import Api from "./Api";

export default class FCM {
  static myInstance = null;
  notifyUser: (title, message) => {};

 /**
   * @returns {Api}
   */
  static instance() {
    if (FCM.myInstance == null) {
      FCM.myInstance = new FCM();
    }
    return this.myInstance;
  }

  appInit() {
       this.checkPermission();
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
        await this.createNotificationListeners();
    } else {
        this.requestPermission();
    }
    }

async getToken() {
    let fcmToken = '';
    try {
        fcmToken = await firebase.messaging().getToken();
      } catch (error) {
        console.error(error);
    }
       if (fcmToken) {
            await Api.instance().updateFcmToken(fcmToken);
        }   
  
}

async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}



  appDesroyed() {
    console.warn('appDesroyed', 'appDesroyed');
    if (this.notificationListener) {
      this.notificationListener();
      this.notificationOpenedListener();
    }
  }


  async createNotificationListeners() {
    console.warn('createNotificationListeners');
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        this.onMessage(null, notification._data);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        this.onMessage(null, notificationOpen.notification._data);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
        this.onMessage(null,  notificationOpen.notification._data);
    }

    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
          //process data message
      this.onMessage(null, message);
    });
  }

  onMessage(title, body) {
    if (this.notifyUser) {
      this.notifyUser(title, body);
    }
  }
}