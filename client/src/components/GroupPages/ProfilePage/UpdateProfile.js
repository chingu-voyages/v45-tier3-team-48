import React, {useContext, useState, useEffect} from 'react';
import UserContext from '../../../UserContext';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import CaregiverApi from '../../../api';


// get current user data
// autofill data on the form

// handle submit


export default function EditProfileForm() {

  const navigate = useNavigate();

  // need user info
  const { userId } = useContext(UserContext);

  const INITIAL_STATE = {
    fullName: '',
    email: '',
    phoneNumber: '',
    password: ''
  }

  
  const [hasError, sethasError] = useState(false);
  const [errorMessage,setErrorMessage] = useState('');
  const [editProfileFormData, setEditProfileFormData] = useState(INITIAL_STATE);

  // Retrieve userProfile from BE api call
  useEffect(function getUserProfile(){
    async function retrieveProfile(){
        let res = await CaregiverApi.getUser(userId);

        setEditProfileFormData(data => (
            {
              ...data,
              fullName: res.fullName,
              phoneNumber: res.phoneNumber,
              email: res.email
            }
        ));
        console.log('test');
    }
    retrieveProfile();
  },[]);

  const handleChange = (e) => {
    e.preventDefault();
    const {value, name} = e.target;

    setEditProfileFormData(data => ({...data, [name]: value}));
  }

  // update user document in the database
  const handleSubmit = async (e) => {
    // add form validators from register page

    e.preventDefault();
    const res = await CaregiverApi.updateUser(userId,editProfileFormData);

    // handle errors
    if(res.response && res.response.data){
      // update error message
      console.log('received error.  no update possible.');
    }

    // if no errors, redirect to success page
    setEditProfileFormData(INITIAL_STATE);
    navigate('/');
  }


  return (
    <form method='post'>
      <div>
          <label htmlFor='fullName'>Full Name: </label>
          <input onChange={handleChange} name='fullName' value={editProfileFormData.fullName}/>  
      </div>

      <div>
          <label htmlFor='phoneNumber'>Phone: </label>
          <input type="text" onChange={handleChange} name='phoneNumber' value={editProfileFormData.phoneNumber}/> 
      </div>

      <div> 
          <label htmlFor='email'>Email: </label>
          <input style={{border:'5px'}} type="email" onChange={handleChange} name='email' value={editProfileFormData.email}/>  
      </div>

      {/* Add after possible to add groups to a user
      
        <div>
          <label htmlFor='select-current-group'>Current Group: </label>
          <select id='select-current-group'>
            <option value={'group1'}>Group 1</option>
            <option value={'group2'}>Group 2</option>
          </select>
      </div> */}

      <div>
          <label htmlFor='password'>Enter Password to Confirm Change: </label>
          <input onChange={handleChange} name='password' value={editProfileFormData.password}/>  
      </div>
      <button onClick={handleSubmit} type='button' style={{marginLeft:'10px', backgroundColor:'orange'}}>Update Profile</button>
      <button style={{marginLeft:'10px', backgroundColor:'red'}}>Delete Profile</button>
    </form>
  );
}