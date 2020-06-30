import axios from 'axios';
// import https from 'https';
import AsyncStorage from '@react-native-community/async-storage';
import {Configs, Roles} from './Configs';

export default class Api {
  static myInstance = null;
  client;

  constructor() {
    // At instance level
    this.client = axios.create({});
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
    return response.data;
  }

  // Clinic
  async createClinic(data) {
    console.log(data);
    try {
      let response = await this.client.post(
        this.getUrl('Clinics/CreateClinic'),
        {data: data},
        this.getHeaders(),
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
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

  async getMyAppointments() {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    console.warn(JSON.stringify(_user));
    let id_param = this._relationalParamByRole(_user.role);
    let response = await this.client.get(
      this.getUrl(`Appointments?filter[where][${id_param}]=${_user.id}`),
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
