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
        try{
            let res = await this.request('login', loginData, 'post');
            console.log(res);
            return res;
        }catch(err){
            return err;
        }
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

    // Individual API routes


    static async registerUser(userData) {
        let res = await this.request('register',userData,'post');
        console.log('in Cgiver api register');
        if (res.token) {
            // Store the token in the class
            this.token = res.token;
        }
      return res;
    }
  
    static async createRequest(requestData) {
        try {
            let res = await this.request('request/create', requestData, 'post');
            return res;
        } catch (err) {
            console.log('Error:', err);
            throw err;
        }
    }

     static async createGroup(groupData) {
        try {
            let res = await this.request('individualGroups/create', {
                user_id: groupData.user_id,
                user_fullName: groupData.user_fullName,
                patientName: groupData.patientName,
                description: groupData.description
            }, 'post');
            return res;
        } catch(err) {
            throw err;
        }
     }

     static async joinGroup(groupData) {
        try {
            // pass data direction to the backend
            // destructuring variables can occur once on the backend
            let res = await this.request('individualGroups/join', groupData, 'post');
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

    static async editGroup(groupData) {
        try {
            let res = await this.request('individualGroups/edit', {group_id: groupData.group_id, patientName: groupData.patientName, description: groupData.description}, 'patch');
            return res;
        } catch(err) {
            throw err;
        }
    }

    static async deleteGroup(groupData) {
        try {
            let res = await this.request('individualGroups/delete', {group_id: groupData.group_id}, 'delete');
            return res;
        } catch(err) {
            throw err;
        }
    }

    static async getUserInfo(userId) {
        try {
            let res = await this.request(`user/getInfo/${userId}`);
            console.log(res);
            return res;
        } catch(err) {
            throw err;
        }
    }

    static async findAllRequestsForOneGroup(groupId) {
        try {
            let res = await this.request(`request/${groupId}/getall`);
            return res;
        } catch (err) {
            console.log('Error:', err);
            throw err;
        }
    }

    static async findOneRequest(requestId) {
        try {
            let res = await this.request(`request/${requestId}`);
            return res;
        } catch (err) {
            console.log('Error', err);
            throw err;
        }
    }

    static async updateOneRequest(requestId, requestData) {
        try {
            let res = await this.request(`request/edit/${requestId}`, requestData, 'put');
            return res;
        } catch (err) {
            console.log('Error', err);
            throw err;
        }
    }

    static async deleteOneRequest(requestId) {
        try {
            let res = await this.request(`request/delete/${requestId}`, {}, 'delete');
            return res;
        } catch (err) {
            console.log('Error', err);
            throw err;
        }
    }
}


export default CaregiverApi;
