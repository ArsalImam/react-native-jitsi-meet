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
}