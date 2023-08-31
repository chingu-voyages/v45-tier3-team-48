import './App.css';
import FrontendRoutes from './Routes';
import Navbar from './components/shared/NavBar';
import Footer from './components/shared/Footer';
import {BrowserRouter} from 'react-router-dom';
import UserContext from './UserContext';
import { useState, useEffect } from 'react';

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
  },[token, userId, email]);


  return (
    <div className="App">

      <BrowserRouter> 
        <UserContext.Provider value={{token, userId, email, fullName}}>
          <Navbar/>
          <FrontendRoutes/>
          <Footer/>
        </UserContext.Provider>
      </BrowserRouter>

    </div>
  );
}

export default App;
