import axios from 'axios';
// import https from 'https';
import AsyncStorage from '@react-native-community/async-storage';
import {Configs, Roles, AppointmentStatus} from './Configs';
import * as AxiosLogger from 'axios-logger';

export default class Api {
  static myInstance = null;
  client;


  constructor() {
    // At instance level
    this.client = axios.create({});
    this.client.interceptors.request.use(AxiosLogger.requestLogger);
    this.client.interceptors.response.use(AxiosLogger.responseLogger);
  }

  /**
   * @returns {Api}
   */
  static instance() {
    if (Api.myInstance == null) {
      Api.myInstance = new Api();
    }
    return this.myInstance;
  }

  async login(email: string, password: string) {
    let response = await this.client.post(
      this.getUrl('Clients/login?include=user'),
      {email, password},
      this.getHeaders(),
    );
    let authData = response.data;
    if (authData.error) throw authData.error.message;
    await this.saveUser(authData.user);
    
    //update fcm
    try {
      await this.updateFcmToken(await AsyncStorage.getItem('fcmToken'))
    } catch (error) {

      //log error, to enable ease in debugging
      console.log(error);  
    }
    return response.data;
  }

  // Clinic
  // create clinic
  async createClinic(data) {
    try {
      let response = await this.client.post(
        this.getUrl('Clinics/CreateClinic'),
        {data: data},
        this.getHeaders(),
      );
      return response.data;
    } catch (error) {
     return error
    }
  }
  

    async notifyAppointment(appointmentId) {
    try {
          let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
      let response = await this.client.post(
        this.getUrl('notifies/NotifyAppointment'),  
        {userId:_user.id,appointmentId},
        this.getHeaders(),
      );
      return response.data;
    } catch (error) {
     return error
    }
  }
  
  async getClinicList() {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    let response = await this.client.get(
      this.getUrl(`Clinics?filter[where][doctorId]=${_user.id}`),
    );
    let data = response.data;
    if (data.error) throw data.error.message;
    return data;
  }

  // Create Vitals
  async createVital(data) {
      let user = await this._user();
      let _user = JSON.parse(JSON.stringify(user));

      data.patientId = _user.id;

      let response = await this.client.post(
        this.getUrl('vitals'),
        data,
        this.getHeaders(),
      );
      return response.data;
  }

// Vital List
  async getVitalList() {

    
    let response = await this.client.get(
      this.getUrl(`Clinics/5efbdcc80a400903b4517232?filter[include]=Vitals`),
    );
    let data = response.data;
    console.warn('data',data);
    if (data.error) throw data.error.message;
    return data;
  }


  _relationalParamByRole(role) {
    var id_param = 'patientId';
    switch (role) {
      case Roles.patient:
        id_param = 'patientId';
        break;
      case Roles.assistant:
        id_param = 'assistantId';
        break;
      case Roles.doctor:
        id_param = 'doctorId';
        break;
    }
    return id_param;
  }

  async updateAppointment(appointmentId, patientId) {
    let appointment = {
      patientId,
      status: AppointmentStatus.scheduled,
    };
    let response = await this.client.post(
      this.getUrl(`Appointments/upsertWithWhere?[where][id]=${appointmentId}`),
      appointment,
    );
    let data = response.data;
    if (data.error) throw data.error.message;
    return data;
  }

  async updateFcmToken(fcmToken: string) {
    if (!fcmToken) {
      throw "token not token";
    }
    
    let user = await this._user();
    if (!user) {
      throw "user not logged in yet!";
    }
    
    let _user = JSON.parse(JSON.stringify(user));
    let response = await this.client.patch(
      this.getUrl(
        `Clients/${_user.id}`
      ),
      {
        fcmToken
      },
    );
    let data = response.data;
    if (data.error) throw data.error.message;
    console.warn('fcm updated', fcmToken);
    await AsyncStorage.setItem('fcmToken', fcmToken);
    return data;
  }


  async getMyAppointments(status = '', requirePatient = false) {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));

    let id_param = this._relationalParamByRole(_user.role);
    let includes = '';
    let wheres = '';
    if (requirePatient) {
      includes = `&filter[include]=patient`;
    }

    if (status != '') {
      wheres = `&filter[where][status]=${status}`;
    }

    let response = await this.client.get(
      this.getUrl(
        `Appointments?filter[where][${id_param}]=${
          _user.id
        }${includes}${wheres}`,
      ),
    );
    let data = response.data;
    if (data.error) throw data.error.message;
    return data;
  }

  async getMyPatients() {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    let id_param = this._relationalParamByRole(_user.role);
    let response = await this.client.get(
      this.getUrl(
        `Clients?filter[where][${id_param}]=${_user.id}&[where]][role]${
          Roles.patient
        }`,
      ),
    );
    let data = response.data;
    if (data.error) throw data.error.message;
    return data;
  }

  
  async saveUser(user) {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(user));
    } catch (e) {
      console.warn(e);
    }
  }

  async _user() {
    try {
      return JSON.parse(await AsyncStorage.getItem('@user'));
    } catch (e) {
      console.warn(e);
    }
  }


  getUrl(endpoint) {
    return `${Configs.baseUrl}${endpoint}`;
  }

  getHeaders() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
  }
}
