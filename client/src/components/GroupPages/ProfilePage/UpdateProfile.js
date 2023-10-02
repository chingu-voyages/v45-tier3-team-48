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
  const { userId, fullName, email } = useContext(UserContext);

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
    e.preventDefault();

    // check for errors on the form
    const errors = validateForm(editProfileFormData);
    if(errors.length){
      sethasError(true);
      setErrorMessage(errors[0]);
      return;
    }

    const res = await CaregiverApi.updateUser(userId,editProfileFormData);

    // handle errors
    if(res.response && res.response.data){
      // update error message
      sethasError(true);
      setErrorMessage(res.response.data.error);
      return;
    }

    // update localStorage with updated data from form
    window.localStorage.setItem('email',editProfileFormData.email);
    window.localStorage.setItem('fullName',editProfileFormData.fullName);

    // if no errors, redirect to success page
    setEditProfileFormData(INITIAL_STATE);
    navigate('/usergroups');
  }

  // confirm data for each form field is valid
  const validateForm = data => {
    const errors = [];
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

    if (validator.isEmpty(data.fullName)) {
      //errors for full name
      errors.push('Full name is required!');
    }

    if (validator.isEmpty(data.phoneNumber)) {
      //Erros for phone number
      errors.push('Phone number is required!');
    }
    
    if (validator.isEmpty(data.phoneNumber)) {
      //Erros for phone number
      errors.push('Phone number is required!');
    } else if (!phoneRegex.test(data.phoneNumber)) {
      errors.push('This is not a valid phone number format! Ex: xxx-xxx-xxxx');
  }

    // check email
    if(!validator.isEmail(data.email)){
      errors.push('Must provide valid email');
    }

    return errors;
  }


  return (
    <form method='post'>
      {hasError && <div style={{backgroundColor:'red'}}  variant="h6" component="h2">
          <p style={{color:'white'}}><b>Error: {errorMessage}</b></p>
      </div>}
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
      <div>
          <label htmlFor='password'>Enter Password to Confirm Change: </label>
          <input onChange={handleChange} name='password' type='password' value={editProfileFormData.password}/>  
      </div>
      <button onClick={handleSubmit} type='button' style={{marginLeft:'10px', backgroundColor:'orange'}}>Update Profile</button>
      <button style={{marginLeft:'10px', backgroundColor:'red'}}>Delete Profile</button>
    </form>
  );
}