import './App.css';
import FrontendRoutes from './Routes';
import Navbar from './components/shared/NavBar';
import Footer from './components/shared/Footer';
import {BrowserRouter} from 'react-router-dom';
import UserContext from './UserContext';
import { useState, useEffect } from 'react';
import CaregiverApi from './api';

function App() {

  // get tokens from localStorage or set to null
  const [token,setToken] = useState(()=>{
    if(!window.localStorage.getItem('token')){
      return '';
    }else{
      return window.localStorage.getItem('token');
    }
  });

  const [userId,setUserId] = useState(()=>{
    if(window.localStorage.getItem('userId') === null){
      return null;
    }else{
      return window.localStorage.getItem('userId');
    }
  });

  const [email,setEmail] = useState(()=>{
    if(!window.localStorage.getItem('email')){
      return '';
    }else{
      return window.localStorage.getItem('email');
    }
  });

  const [fullName,setFullName] = useState(()=>{
    if(!window.localStorage.getItem('fullName')){
      return '';
    }else{
      return window.localStorage.getItem('fullName');
    }
  });

  useEffect(()=>{
    window.localStorage.setItem('userId',userId);
    window.localStorage.setItem('token',token);
    window.localStorage.setItem('email',email);
    window.localStorage.setItem('fullName',fullName);
  },[token, userId, email, fullName]);


  const loginUser = async (loginData) => {
    try{
      // call FE api
      console.log('inside login function');
      let res = await CaregiverApi.loginUser(loginData);
      // window.localStorage.setItem('token',res.token);

      // // set all corresponding data
      setToken(res.token);
      setUserId(res.id);
      setEmail(res.email);
      setFullName(res.fullName);
      
      return res.id;
    }catch(err){
      return err;
    }
  }

  const groupInfo = [{
    _id: '65037d371c42ad243e73a197',
    description: 'aaa',
    nameCaregiver: 'Ken Barbie',
    namePatient:'sss'
  }];


  const registerUser = async (userData) => {
    try {
      // Call FE api registerUser function
      console.log('inside register function in app.js');
      let res = await CaregiverApi.registerUser(userData);

      //Set all corresponding data
      setToken(res.user.token);
      setUserId(res.user._id);
      setEmail(res.user.email);
      setFullName(res.user.fullName);
      return res;
    } catch (err) {
      return err;
    }
  };
  
  const logoutUser = () => {
    window.localStorage.clear();
    setToken('');
    setUserId(null);
    setEmail('');
    setFullName('');
  }

  CaregiverApi.token = token;
  
  return (
    <div className="App">

      <BrowserRouter> 

        <UserContext.Provider value={{groupInfo, token, userId, email, fullName, loginUser, logoutUser ,registerUser}}>

          <Navbar/>
          <FrontendRoutes/>
          <Footer/>
        </UserContext.Provider>
      </BrowserRouter>

    </div>
  );
}

export default App;
