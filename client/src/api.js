import axios from "axios";
// import token from './App';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

/** API Class.
 */

class CaregiverApi {
  // the token to interact with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { 'Authorization': `${CaregiverApi.token}`};
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      let anotherError = err.response.data;

      throw anotherError;      
    }
  }

  // Individual API routes

  // Insert new routes here:

  static async loginUser(loginData) {
    let res = await this.request('login',loginData,'post');
    console.log(loginData);
    console.log('in Cgiver api login');
    return res;
  }










  /**
   * 
   * Example routes shown below from past project
   */
  
  // static async getMeetups() {
  //   // consider adding more filtering later
  //   let res = await this.request(`meetups`);
  //   return res;
  // }

  // static async leaveMeetup(meetup_id){
  //   let res = await this.request(`meetups/${meetup_id}/leave`,{},'delete')
  //   return res;
  // }

  // static async login(loginData){
  //   try{
  //     let res = await this.request(`login`,loginData,'post');
  //     return res;
  //   }catch(err){
  //     console.log('Heres my error:',err);
  //     throw err;
  //   }

  // }
  
  // static async createMeetup(meetupData,formattedDateTime){
  //   try{
  //     meetupData['date_time_utc']=formattedDateTime;
  //     let res = await this.request('meetups/new',meetupData,'post');
  //     return res;
  //   }catch(err){
  //     console.log('Heres my error:',err);
  //     return err;
  //   }
  // }
  

}

// for now, put token ("testuser" / "password" on class)


export default CaregiverApi;