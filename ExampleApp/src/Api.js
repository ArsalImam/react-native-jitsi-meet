import axios from 'axios';
// import https from 'https';
//  import AsyncStorage from '@react-native-community/async-storage';
import {Configs, Roles, AppointmentStatus} from './Configs';
import * as AxiosLogger from 'axios-logger';
import moment from 'moment';
import {AsyncStorage} from 'react-native';
import {ViewUtils} from './Utils';
export default class Api {
  static myInstance = null;
  client;
  _userRole;

  constructor() {
    // At instance level
    this.client = axios.create({});
    this.client.interceptors.request.use(AxiosLogger.requestLogger);
    this.client.interceptors.response.use(AxiosLogger.responseLogger);
    this.client.interceptors.response.use(
      function(response) {
        return response;
      },
      function(error) {
         // ViewUtils.showToast(error.response);
        return Promise.reject(error);
      },
    );
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
      await this.updateFcmToken(await AsyncStorage.getItem('fcmToken'));
    } catch (error) {
      //log error, to enable ease in debugging
      console.log(error);
    }
    return response.data;
  }

  // Clinic
  // create clinic
  async createClinic(data) {
    console.warn('data', data);
    try {
      let response = await this.client.post(
        this.getUrl('Clinics/CreateClinic'),
        {data: data},
        this.getHeaders(),
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  // setup-type,
  // notes,
  // date,
  // doctorId,
  // patientId,
  // answer,
  // active,
  async addReport(item, appointmentId, patientId) {
    try {
      let user = await this._user();
      let _user = JSON.parse(JSON.stringify(user));

      let report = {
        'setup-type': item.setupType,
        notes: item.description,
        date: new Date(),
        doctorId: _user.id,
        patientId: patientId,
        answer: item.name,
        'select Date': item.answer,
        active: false,
      };
      let customProperties = [];
      customProperties.push(report);
      console.log(customProperties);
      let response = await this.client.post(
        this.getUrl(`consultation-reports/updateCustomProps`),
        {
          data: {
            patientId: patientId,
            appointmentId: appointmentId,
            doctorId: _user.id,
            customProperties: customProperties,
          },
        },
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async patientRegister(item, drCode) {
    console.warn(item);
    let response = await this.client.get(
      this.getUrl(`Clients?filter[where][doctorCode]=${drCode}`),
    );
    let data = response.data;
    if (data.length > 0) {
      console.warn(('>', data[0].id));
      item.doctorId = data[0].id;
      let patientObj = await this.savePatient(item);
      await this.saveUser(patientObj);
      if (data.error) throw data.error.message;
    } else {
      throw 'No Doctor found with the code, you provided!';
    }
  }

  async addPrescribeMedication(item, appointmentId) {
    try {
      let user = await this._user();
      let _user = JSON.parse(JSON.stringify(user));

      item.doctorId = _user.id;
      item.patientId = item.patientId;
      let customProperties = [];
      customProperties.push(item);
      console.warn('===>prescription', customProperties);
      let response = await this.client.post(
        this.getUrl(`consultation-reports/updateCustomProps`),
        {
          data: {
            patientId: item.patientId,
            appointmentId: appointmentId,
            doctorId: _user.id,
            customProperties: customProperties,
          },
        },
      );
      console.warn('res', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async notifyAppointment(appointmentId) {
    console.warn('inide appointmentId == ', appointmentId);
    try {
      let user = await this._user();
      let _user = JSON.parse(JSON.stringify(user));
      let response = await this.client.post(
        this.getUrl('notifies/NotifyAppointment'),
        {userId: _user.id, appointmentId},
        this.getHeaders(),
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async getAppointmentById(appointmentId) {
    try {
      let response = await this.client.get(
        this.getUrl(`Appointments?filter[where][id]=${appointmentId}`),
        this.getHeaders(),
      );
      return response.data[0];
    } catch (error) {
      return error;
    }
  }
  async getClinicList() {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    let response = await this.client.get(
      this.getUrl(
        `Clinics?filter[where][doctorId]=${
          _user.id
        }&filter[order]=createdAt%20DESC`,
      ),
    );
    let data = response.data;
    if (data.error) throw data.error.message;
    return data;
  }

  // Create Vitals
  async createVital(data) {
    console.warn('touqeer data', data);
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));

    data.patientId = _user.id;

    let response = await this.client.post(
      this.getUrl('vitals'),
      data,
      this.getHeaders(),

      console.warn('asdaff', data),
    );
    console.warn('Vital Create data', response.data);
    return response.data;
  }

  // Vital List
  async getVitalList() {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));

    let response = await this.client.get(
      this.getUrl(
        `Clients/${
          _user.id
        }?filter[include]=Vitals&filter[order]=createdAt%20DESC`,
      ),
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

    console.warn('response.data == ', response.data);

    return response.data;
  }

  async getListDuringConsultation(setupType, patientId) {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    let response = await this.client.get(
      this.getUrl(
        `setups-patients?filter[where][and][0][doctorId]=${
          _user.id
        }&filter[where][and][1][patientId]=${patientId}&filter[where][and][2][setup-type]=${setupType}&filter[order]=id%20DESC`,
      ),
      
    );
    let data = response.data;
    console.warn('data', data);
    if (data.error) throw data.error.message;
    return data;
  }

  async getVitalListConsultation(patientId) {
    console.warn(patientId)
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    let response = await this.client.get(
      this.getUrl(
        `vitals?filter[where][patientId]=${
          patientId
        }&filter[order]=id%20DESC`,
      ),
    );
  
    let data = response.data;
    console.warn('data', data);
    if (data.error) throw data.error.message;
    return data;
  }


  
  // Medication List
  async getMedicationList() {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    let response = await this.client.get(
      this.getUrl(
        `Setups?filter[where][doctorId]=${
          _user.id
        }&filter[where][setupType]=medication&filter[order]=createdAt%20DESC`,
      ),
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
      this.getUrl(
        `Setups?filter[where][doctorId]=${
          _user.id
        }&filter[where][setupType]=diagnosis&filter[order]=createdAt%20DESC`,
      ),
    );
    let data = response.data;
    console.warn('data', data);
    if (data.error) throw data.error.message;
    return data;
  }

  async getObservationList() {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    let response = await this.client.get(
      this.getUrl(
        `Setups?filter[where][doctorId]=${
          _user.id
        }&filter[where][setupType]=observation&filter[order]=createdAt%20DESC`,
      ),
    );
    let data = response.data;
    console.warn('data', data);
    if (data.error) throw data.error.message;
    return data;
  }



  async getReferToSpecialistList() {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    let response = await this.client.get(
      this.getUrl(
        `Setups?filter[where][doctorId]=${
          _user.id
        }&filter[where][setupType]=referToSpecialist&filter[order]=createdAt%20DESC`,
      ),
    );
    let data = response.data;
    console.warn('data', data);
    if (data.error) throw data.error.message;
    return data;
  }

  async getSpecialists() {
    let response = await this.client.get(
      this.getUrl(
        `Clients?filter[where][role]=MEDICAL_SPECIALIST&filter[order]=id%20DESC`,
      ),
    );
    let data = response.data;
    console.warn('data', data);
    if (data.error) throw data.error.message;
    return data;
  }

  // FollowUp List
  async getFollowUpList() {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));

    let response = await this.client.get(
      this.getUrl(
        `Setups?filter[where][doctorId]=${
          _user.id
        }&filter[where][setupType]=followUp&filter[order]=createdAt%20DESC`,
      ),
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
      this.getUrl(
        `Setups?filter[where][doctorId]=${
          _user.id
        }&filter[where][setupType]=investigation&filter[order]=createdAt%20DESC`,
      ),
    );
    let data = response.data;
    console.warn('data', data);
    if (data.error) throw data.error.message;
    return data;
  }

  async getMedicalRecordImages(patientId, type) {
    console.warn('umer==', patientId, type);
    let response = await this.client.get(
      this.getUrl(
        `MedicalRecords?filter[where][patientId]=${patientId}&filter[where][type]=${type}`,
      ),
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
      this.getUrl(
        `Setups?filter[where][doctorId]=${
          _user.id
        }&filter[where][setupType]=suggestedTherapy&filter[order]=createdAt%20DESC`,
      ),
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
      this.getUrl(
        `Setups?filter[where][doctorId]=${
          _user.id
        }&filter[where][setupType]=surgicalProcedure&filter[order]=createdAt%20DESC`,
      ),
    );
    let data = response.data;
    console.warn('data', data);
    if (data.error) throw data.error.message;
    return data;
  }

  // Patient History List
  async getPatientHistoryList() {
    console.warn('a');
     let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    let response = await this.client.get(
      this.getUrl(
        `Setups?filter[where][doctorId]=${role==Roles.patient?_user.doctorId:_user.id}&filter[where][setupType]=patientHistoryForm&filter[order]=createdAt%20DESC`,
      ),
    );
    let data = response.data;
    console.warn("data === ",data)
    console.warn('data', data);
    if (data.error) throw data.error.message;
    return data;
  }



  async updatePatientHistoryList(id,updateData) {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    let response = await this.client.post(
      this.getUrl(`Setups/update?where[id]=${id}`),
      updateData,
      this.getHeaders(),
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
      this.getUrl(
        `Setups?filter[where][doctorId]=${
          _user.id
        }&filter[where][setupType]=anatomicalIllustration&filter[order]=createdAt%20DESC`,
      ),
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
      this.getUrl(
        `MedicalRecords?filter[where][patientId]=${
          _user.id
        }&filter[order]=createdAt%20DESC`,
      ),
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
    console.warn('data -- ', data);
    data.doctorId = _user.id;

    let response = await this.client.post(
      this.getUrl('setups-patients'),
      data,
      this.getHeaders(),
    );

      console.warn("response ----- ",JSON.stringify(response))

    return response.data;
  }

  async createVitals(data) {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));
    console.warn('data -- ', data);
    // data.doctorId = _user.id;

    let response = await this.client.post(
      this.getUrl('vitals'),
      data,
      this.getHeaders(),
    );

      console.warn("response ----- ",JSON.stringify(response))

    return response.data;
  }


  // Update Profile
  async updateProfile(data) {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));

    let response = await this.client.post(
      this.getUrl(
        `Clients/upsertWithWhere?where={%22email%22:%22${_user.email}%22}`,
      ),
      data,
      this.getHeaders(),
    );

    // console.warn(JSON.stringify(response));
    await this.saveUser(response.data);
    return response.data;
  }

  async updateAppointmentStatus(appointmentId) {
    console.warn('appointmentId in updae ===', appointmentId);
    let appointment = {
      status: AppointmentStatus.completed,
    };
    let response = await this.client.post(
      this.getUrl(`Appointments/upsertWithWhere?[where][id]=${appointmentId}`),
      appointment,
    );
    console.warn('response == ', response);
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

  async getUserRole() {
    if (!this._userRole) {
      let user = await this._user();
      let _user = JSON.parse(JSON.stringify(user));

      this._userRole = _user.role;
    }
    return this._userRole;
  }

  async updateFcmToken(fcmToken: string) {
    console.warn("fcmToken fcm :: ",fcmToken)
    if (!fcmToken) {
      throw 'token not token';
    }
    await AsyncStorage.setItem('fcmToken', fcmToken);
    let user = await this._user();
    if (!user) {
      throw 'user not logged in yet!';
    }

    let _user = JSON.parse(JSON.stringify(user));
    let response = await this.client.patch(this.getUrl(`Clients/${_user.id}`), {
      fcmToken,
    });
    let data = response.data;
    console.warn("data fcm :: ",data)
    if (data.error) throw data.error.message;
    console.warn('fcm updated', fcmToken);
    console.warn('fcm AsyncStorage has set');
    return data;
  }

  async getMyAppointments(status = '', requirePatient = false) {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));

    let id_param = this._relationalParamByRole(_user.role);
    let userId = _user.id;

    if (_user.role == Roles.patient && status == AppointmentStatus.available) {
      id_param = 'doctorId';
      userId = _user.doctorId;
    }
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
        `Appointments?filter[where][${id_param}]=${userId}${includes}${wheres}&filter[order]=id%20DESC`,
      ),
    );
    let data = response.data;
    if (data.error) throw data.error.message;
    return data;
  }

  //
  async getMyAppointmentsComing15Days(
    status = '',
    requirePatient = false,
    todaysDate = '',
    lastDate = '',
  ) {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));

    let id_param = this._relationalParamByRole(_user.role);
    let userId = _user.id;

    if (_user.role == Roles.patient && status == AppointmentStatus.available) {
      id_param = 'doctorId';
      userId = _user.doctorId;
    }
    let includes = '';
    let wheres = '';
    if (requirePatient) {
      includes = `&filter[include]=patient`;
    }

    if (status != '') {
      wheres = `&filter[where][status]=${status}`;
    }

    if (todaysDate != '') {
      todaysDate = `&filter[where][and][0][date][gt]=${todaysDate}`;
    }

    if (lastDate != '') {
      lastDate = `&filter[where][and][1][date][lt]=${lastDate}`;
    }

    let response = await this.client.get(
      this.getUrl(
        `Appointments?filter[where][${id_param}]=${userId}${includes}${wheres}&filter[order]=id%20DESC${todaysDate}${lastDate}`,

        //   &filter[where][and][0][date][lt]=${moment().format('YYYY-MM-DD')}&filter[where][and][1][date][gt]=${moment().subtract(7, 'days').format('YYYY-MM-DD')}`,
      ),
    );
    let data = response.data;
    if (data.error) throw data.error.message;
    return data;
  }
  //

  async getMyAppointmentsPast15Days(
    status = '',
    requirePatient = false,
    todaysDate = '',
    lastDate = '',
  ) {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));

    let id_param = this._relationalParamByRole(_user.role);
    let userId = _user.id;

    if (_user.role == Roles.patient && status == AppointmentStatus.available) {
      id_param = 'doctorId';
      userId = _user.doctorId;
    }
    let includes = '';
    let wheres = '';
    if (requirePatient) {
      includes = `&filter[include]=patient`;
    }

    if (status != '') {
      wheres = `&filter[where][status]=${status}`;
    }

    if (todaysDate != '') {
      todaysDate = `&filter[where][and][0][date][lt]=${todaysDate}`;
    }

    if (lastDate != '') {
      lastDate = `&filter[where][and][1][date][gt]=${lastDate}`;
    }

    let response = await this.client.get(
      this.getUrl(
        `Appointments?filter[where][${id_param}]=${userId}${includes}${wheres}&filter[order]=id%20DESC${todaysDate}${lastDate}`,

        //   &filter[where][and][0][date][lt]=${moment().format('YYYY-MM-DD')}&filter[where][and][1][date][gt]=${moment().subtract(7, 'days').format('YYYY-MM-DD')}`,
      ),
    );
    let data = response.data;
    if (data.error) throw data.error.message;
    return data;
  }
  // https://api.etibb.online/api/Appointments?filter[where][doctorId]=5f3154e8039d6c7964019889&filter[where][and][0][date][lt]=2020-08-26&filter[where][and][1][date][gt]=2020-8-11
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
    } catch (e) {
      console.warn(e);
    }
  }

  removeUser = async () => {
    AsyncStorage.clear();
    this._userRole = '';
  };

  async savePatient(data) {
    let response = await this.client.post(
      this.getUrl(`Clients/upsertWithWhere?[where][email]=${data.email}`),
      data,
      this.getHeaders(),
    );
    return response.data;
  }

  async uploadImage(data) {
    console.warn('image data ==>', JSON.stringify(data));
    let response = await this.client.post(
      this.getUrl(`Contents/${Configs.containers.images}/upload`),
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  }

  async saveMedicalRecord(data) {
    let user = await this._user();
    let _user = JSON.parse(JSON.stringify(user));

    data.patientId = _user.id;
    data.doctorId = _user.doctorId;
    let response = await this.client.post(
      this.getUrl(`MedicalRecords`),
      data,
      this.getHeaders(),
    );
    console.warn('response.data  === ', response.data);
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

  getMediaUrl(container, file) {
    return `${Configs.baseUrl}Contents/${container}/download/${file}`;
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
