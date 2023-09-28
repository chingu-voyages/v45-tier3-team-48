import React, {useContext, useState, useEffect} from 'react';
import UserContext from '../../../UserContext';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import CaregiverApi from '../../../api';
import neutralProfileImage from '../../../neutral-profile-image.jpeg'

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
    password: '',
    profileImg: null
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setEditProfileFormData(data => ({...data, profileImg: file}));
  }

  // update user document in the database
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(editProfileFormData)

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

    // if no errors, redirect to success page
    setEditProfileFormData(INITIAL_STATE);
    //navigate('/');
  }

  const handleUploadClick = () => {
    document.getElementById('profileImage').click(); // Trigger the file input
  };

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
    <div>
      <div className="border-t-2 border-gray-300 border-b-2 py-5 ">
        <h1 className="text-left pl-4">
          My Profile
        </h1>
      </div>
      <form method='post' className=" flex flex-col items-center justify-center mx-auto">
        <div>
          <div>
            <img src={neutralProfileImage} alt="neutral profile image" className="w-[130px]  mx-auto pt-4 pb-2" encType="multipart/form-data"/>
              <label htmlFor="profileImage" onClick={handleUploadClick} className=" text-center cursor-pointer text-primary-green">
                Upload Photo
              </label>
              <input
                type="file"
                accept="image/*"
                id="profileImage"
                name="profileImage"
                className="hidden"
                onChange={handleImageUpload}
              />
          </div>
        </div>
        <div >
          <div className="flex flex-col justify-center items-center" >
            {hasError && <div style={{backgroundColor:'red'}}  variant="h6" component="h2">
                <p style={{color:'white'}}><b>Error: {errorMessage}</b></p>
            </div>}
            <div className="flex flex-col text-left pl-8 pt-4">
                <label htmlFor='fullName'>Full Name</label>
                <input onChange={handleChange} name='fullName' value={editProfileFormData.fullName} className="border-2 border-gray-300 w-[220px] rounded "/>  
            </div>

            <div className="flex flex-col text-left pl-8 pt-4">
                <label htmlFor='phoneNumber'>Phone </label>
                <input type="text" onChange={handleChange} name='phoneNumber' value={editProfileFormData.phoneNumber} className="border-2 border-gray-300 w-[220px] rounded "/> 
            </div>

            <div className="flex flex-col text-left pl-8 pt-4"> 
                <label htmlFor='email'>Email </label>
                <input type="email" onChange={handleChange} name='email' value={editProfileFormData.email} className="border-2 border-gray-300 w-[220px] rounded "/>  
            </div>

            {/* Add after possible to add groups to a user
            
              <div>
                <label htmlFor='select-current-group'>Current Group: </label>
                <select id='select-current-group'>
                  <option value={'group1'}>Group 1</option>
                  <option value={'group2'}>Group 2</option>
                </select>
            </div> */}

            <div className="flex flex-col text-left pl-8 pt-4 ">
              <label htmlFor='password'>Password</label>
              <input onChange={handleChange} name='password' value={editProfileFormData.password} className="border-2 border-gray-300 w-[220px] rounded "/>  
            </div>
            <div className="pl-8">
              <div className=" flex justify-center items-center pt-4 ">
                <button onClick={handleSubmit} type='button' className=" bg-primary-green rounded w-[220px]" >Save Updates</button>
              </div>
              <div className="pt-4">
                <button className="text-red-600"> Delete Account</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}