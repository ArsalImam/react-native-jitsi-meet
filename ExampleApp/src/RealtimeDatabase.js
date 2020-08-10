import database from '@react-native-firebase/database';
import Api from "./Api";

export default class RealtimeDatabase {
  static myInstance = null;
  handleChangeRealtime: (data) => {};

  /**
   * @returns {Api}
   */
  static instance() {
    if (RealtimeDatabase.myInstance == null) {
      RealtimeDatabase.myInstance = new RealtimeDatabase();
    }
    return this.myInstance;
  }

  appInit() {
    this.initRealtimeDatabase();
  }



   initRealtimeDatabase() {
     database().ref('forms/5c5f18035ebe0d16fca58669').on("value",(snapshot)=>{
    this.handleChangeRealtime(snapshot.val())
      });
  
  }
  
  async _getAppointment(appointmentId) {
    // try {
    //   const snapshot = await database().ref(`forms/${appointmentId}`).on('value', (snapshot) => {
    //     console.warn(snapshot.val());
    //         // this.handleChangeRealtime(appointmentId)

    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }
  // async initRealtimeDatabase() {
  //   try {
  //     const snapshot = await database().ref('forms/').once('value');
  //     const realtimeData = snapshot.val();
  //     console.log('realtimeData', realtimeData)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

}