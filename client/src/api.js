import axios from 'axios';
// import token from './App';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

/** API Class.
 */

class CaregiverApi {
    // the token to interact with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = 'get') {
        console.debug('API Call:', endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `${CaregiverApi.token}` };
        const params = method === 'get' ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            let anotherError = err.response;

            return err;
        }
    }

    static async loginUser(loginData) {
        let res = await this.request('login', loginData, 'post');
        console.log(loginData);
        console.log('in Cgiver api login');
        return res;
    }

    static async getUser(id){
        try {
            let res = await this.request(`editUser/${id}`);
            return res;
        } catch (err) {
            console.log('Error:', err);
            throw err;
        }
    }

    static async updateUser(id, updatedUserData){
        try {
            let res = await this.request(`editUser/${id}`,updatedUserData,'patch');

            return res;
            
        } catch (err) {
            return err;
        }
    }

    static async createRequest(requestData) {
        console.log(requestData);
        try {
            let res = await this.request('request/create', requestData, 'post');
            return res;
        } catch (err) {
            console.log('Error:', err);
            throw err;
        }
    }

     //the token information isn't showing up in the middleware so i'm using UserContext to get token info
     static async createGroup(groupData) {
        try {
            let res = await this.request('individualGroups/create', {groupData}, 'post');
            return res;
        } catch(err) {
            throw err;
        }
     }

     static async joinGroup(groupData) {
        try {
            let res = await this.request('individualGroups/join', {user_id: groupData.user_id, group_id: groupData.group_id}, 'post');
            return res;
        } catch(err) {
            throw err;
        }
     }

    //  check user group data
     static async checkUser(groupData) { //change backend method after database change
        try {
            let res = await this.request('individualGroups/checkUser', {user_id: groupData.user_id, group_id: groupData.group_id}, 'get');
            return res;
        } catch(err) {
            throw err;
        }
     }

    static async getIndividualGroup(groupData) {
        try {
            let res = await this.request('individualGroups/', {group_id: groupData.group_id}, 'get');
            return res;
        } catch(err) {
            throw err;
        }
    }

    static async getAllGroup() {
        try {
            let res = await this.request('individualGroups/getAll', {}, 'get');
            return res;
        } catch(err) {
            throw err;
        }
    }

}


export default CaregiverApi;
