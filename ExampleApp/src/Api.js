import axios from 'axios';
// import https from 'https';
import AsyncStorage from '@react-native-community/async-storage';
import { Configs, Roles, AppointmentStatus } from './Configs';
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
      { email, password },
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
        { data: data },
        this.getHeaders(),
      );
      return response.data;
    } catch (error) {
      return error
    }
  }


  // setup-type,
  // notes,
  // date,
  // doctorId,
  // patientId,
  // answer,
  // active,
  async addReport(item, appointmentId,patientId) {

    try {
      let user = await this._user();
      let _user = JSON.parse(JSON.stringify(user));

      let report = {
        "setup-type": item.setupType,
        "notes": item.description,
        "date": new Date(),
        "doctorId": _user.id,
        "patientId": patientId,
        "answer": item.name,
        "active": false
      }
      let customProperties = [];
      customProperties.push(report);
      console.log(customProperties);
      let response = await this.client.post(
        this.getUrl(`consultation-reports/updateCustomProps`),
        {
          data: {
            "patientId": patientId,
            "appointmentId": appointmentId,
            "doctorId": _user.id,
            "customProperties": customProperties
          }
        });
      return response.data;
    } catch (error) {
      return error
    }
  }


async patientRegister(item,drCode){
  // 843358

    let response = await this.client.get(
      this.getUrl(`Clients?filter[where][doctorCode]=${drCode}`),
    );
    let data = response.data;
    item.doctorId=data[0].id;
console.warn('doctorFound==>',data);
let patientObj=await this.savePatient(item);
      console.warn('added',patientObj.data);
      if (data.error) throw data.error.message;

}

  async addPrescribeMedication(item, appointmentId) {

    try {
      let user = await this._user();
      let _user = JSON.parse(JSON.stringify(user));

      item.doctorId=_user.id;
      item.patientId=item.patientId;
      let customProperties = [];
      customProperties.push(item);
      console.warn('===>prescription',customProperties);
      let response = await this.client.post(
        this.getUrl(`consultation-reports/updateCustomProps`),
        {
          data: {
            "patientId": item.patientId,
            "appointmentId": appointmentId,
            "doctorId": _user.id,
            "customProperties": customProperties
          }
        });
        console.warn('res',JSON.stringify(response.data))
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
        { userId: _user.id, appointmentId },
        this.getHeaders(),
      );
      return response.data;
    } catch (error) {
      return error
    }
  }
  async getAppointmentById(appointmentId){
    try {

      let response = await this.client.get(
        this.getUrl(`Appointments?filter[where][id]=${appointmentId}`),
        this.getHeaders(),
      );
      return response.data[0];
    } catch (error) {
      return error
    }

  }
  async getClinicList() {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    let response = await this.client.get(
      this.getUrl(`Clinics?filter[where][doctorId]=${_user.id}&filter[order]=createdAt%20DESC`),
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
    console.warn("TOuqeer", response.data)
    return response.data;
  }



  // Vital List
  async getVitalList() {

    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));

    let response = await this.client.get(
      this.getUrl(`Clients/${_user.id}?filter[include]=Vitals&filter[order]=createdAt%20DESC`),
    );
    let data = response.data;
    console.warn('data', data);
    if (data.error) throw data.error.message;
    return data;
  }


  // Create Medications
  async createMedication(data) {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));

    data.doctorId = _user.id;

    let response = await this.client.post(
      this.getUrl('Setups'),
      data,
      this.getHeaders(),
    );
    return response.data;
  }

  // Medication List
  async getMedicationList() {

    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    let response = await this.client.get(
      this.getUrl(`Setups?filter[where][doctorId]=${_user.id}&filter[where][setupType]=medication&filter[order]=createdAt%20DESC`),
    );
    let data = response.data;
    console.warn('data', data);
    if (data.error) throw data.error.message;
    return data;
  }

  // diagnosis List
  async getDiagnosisList() {

    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    let response = await this.client.get(
      this.getUrl(`Setups?filter[where][doctorId]=${_user.id}&filter[where][setupType]=diagnosis&filter[order]=createdAt%20DESC`),
    );
    let data = response.data;
    console.warn('data', data);
    if (data.error) throw data.error.message;
    return data;
  }

  // investigation List
  async getInvestigationList() {

    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    let response = await this.client.get(
      this.getUrl(`Setups?filter[where][doctorId]=${_user.id}&filter[where][setupType]=investigation&filter[order]=createdAt%20DESC`),
    );
    let data = response.data;
    console.warn('data', data);
    if (data.error) throw data.error.message;
    return data;
  }

  // suggestedTherapy List
  async getTherapyList() {

    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    let response = await this.client.get(
      this.getUrl(`Setups?filter[where][doctorId]=${_user.id}&filter[where][setupType]=suggestedTherapy&filter[order]=createdAt%20DESC`),
    );
    let data = response.data;
    console.warn('data', data);
    if (data.error) throw data.error.message;
    return data;
  }

  // surgicalProcedure List
  async getProcedureList() {

    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    let response = await this.client.get(
      this.getUrl(`Setups?filter[where][doctorId]=${_user.id}&filter[where][setupType]=surgicalProcedure&filter[order]=createdAt%20DESC`),
    );
    let data = response.data;
    console.warn('data', data);
    if (data.error) throw data.error.message;
    return data;
  }

  // Patient History List
  async getPatientHistoryList() {

    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    let response = await this.client.get(
      this.getUrl(`Setups?filter[where][doctorId]=${_user.id}&filter[where][setupType]=patientHistoryForm&filter[order]=createdAt%20DESC`),
    );
    let data = response.data;
    console.warn('data', data);
    if (data.error) throw data.error.message;
    return data;
  }

  // anatomicalIllustration List
  async getAnatomicalIllustrationList() {

    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    let response = await this.client.get(
      this.getUrl(`Setups?filter[where][doctorId]=${_user.id}&filter[where][setupType]=anatomicalIllustration&filter[order]=createdAt%20DESC`),
    );
    let data = response.data;
    console.warn('data', data);
    if (data.error) throw data.error.message;
    return data;
  }

  // Medical Record List
  async getMedicalRecordList() {

    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    let response = await this.client.get(
      this.getUrl(`MedicalRecords?filter[where][patientId]=${_user.id}&filter[order]=createdAt%20DESC`),
    );
    let data = response.data;
    console.warn('data', data);
    if (data.error) throw data.error.message;
    return data;
  }

  // Create Prescribe Medication
  async createPrescription(data) {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));

    data.doctorId = _user.id;

    let response = await this.client.post(
      this.getUrl('setups-patients'),
      data,
      this.getHeaders(),
    );
    return response.data;
  }

  // Update Profile
//  https://api.evotelemedicine.live/api/Clients/upsertWithWhere?where={%22email%22:%22drhafeez@gmail.com%22}
async updateProfile(data) {
  console.warn("data", data)
  let user = await this._user();
  let _user = JSON.parse(JSON.stringify(user));
  let response = await this.client.post(
    this.getUrl(`Clients/upsertWithWhere?where={"email":${_user.email}}`),
    data,
    this.getHeaders(),
  );
  return response.data;
}



  async updateAppointmentStatus(appointmentId) {
    let appointment = {
      status: AppointmentStatus.completed,
    };
    let response = await this.client.post(
      this.getUrl(`Appointments/upsertWithWhere?[where][id]=${appointmentId}`),
      appointment,
    );
    let data = response.data;
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
        }${includes}${wheres}&filter[order]=id%20DESC`,
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
        }&filter[order]=id%20DESC`,
      ),
    );
    let data = response.data;
    if (data.error) throw data.error.message;
    return data;
  }


  async saveUser(user) {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      console.warn("User", user)
    } catch (e) {
      console.warn(e);
    }
  }

  async savePatient(data) {
   console.warn('data to send==>',data);
    let response = await this.client.post(
      this.getUrl(`Clients/upsertWithWhere?[where][email]=${data.email}`),
      data,
      this.getHeaders(),
    );
    return response.data;
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
