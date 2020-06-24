import axios from 'axios';
// import https from 'https';
import AsyncStorage from '@react-native-community/async-storage';
import { Configs, Roles } from './Configs';

export default class Api {

    static myInstance = null;
    client;
    _user;

    constructor() {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        // At instance level
        this.client = axios.create({
        });
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

    getHeaders() {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
    }
    // headers
    async login(email: string, password: string) {
        console.log(this.getUrl('Clients/login?include=user'));
        let response = await this.client.post(this.getUrl('Clients/login?include=user'), { email, password }, this.getHeaders());
        let authData = response.data;
        if (authData.error) throw authData.error.message;
        console.log(JSON.stringify(authData));
        // await this.user(authData.user);

        await AsyncStorage.setItem('@user1', JSON.stringify(authData));


        // throw "asd";
        return response.data;
    }

    async getMyAppointments() {

        let _user = JSON.parse(await AsyncStorage.getItem('@user1')).user;

        var id_param = 'patientId';
        // let _user = await this.getUser();
        switch (_user.role) {
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


        console.log("getMyAppointments ===> ", `Appointments?filter[where][${id_param}]=${_user.id}`);

// &filter[where][status]=Scheduled
        let response = await this.client.get(
            this.getUrl(`Appointments?filter[where][${id_param}]=${_user.id}`));
        let data = response.data;
        if (data.error) throw data.error.message;
        return data;
    }

    async user(user) {
        this._user = user;
        return Promise.resolve({});
        // try {
        // await AsyncStorage.setItem('@user', JSON.stringify(user), err => console.error(err));
        // } catch (e) {
        // console.warn(e);
        // }
        // this.user();
    }
    async getUser() {
        return Promise.resolve(this._user);
        // try {
        //     console.log("user ==> ", await AsyncStorage.getItem('@user'));
        //     return JSON.parse(await AsyncStorage.getItem('@user'));
        // } catch (e) {
        //     console.warn(e);
        // }
        // return null;
    }

    getUrl(endpoint) {
        return `${Configs.baseUrl}${endpoint}`;
    }
}