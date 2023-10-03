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
    e.preventDefault();

    // check for errors on the form
    const errors = validateForm(editProfileFormData);
    if(errors.length){
      sethasError(true);
      setErrorMessage(errors[0]);
      return;
    }

    const formData = new FormData();
    formData.append('fullName', editProfileFormData.fullName );
    formData.append('email', editProfileFormData.email);
    formData.append('phoneNumber', editProfileFormData.phoneNumber);
    formData.append('password', editProfileFormData.password);
    setEditProfileFormData(formData)

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

    <div>
      
      <div className="border-t-2 border-gray-300 border-b-2 lg:border-b-0 py-10">
        <h1 className="text-left pl-4 font-medium text-xl lg:text-4xl lg:pl-36">
          My Profile
        </h1>

      </div>
      <form  className=" pt-40 ">
        <div className="lg:flex lg:gap-[90px] lg:justify-center lg:w-[950px] lg:pt-8 lg:border-t-4 lg:mx-auto lg:border-t-gray-300">
          <div>
            <div className="flex justify-center">
              <svg className="w-[140px] xs:w-[170px] sm:w-[200px] " height="210" viewBox="0 0 210 210" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="210" height="209" rx="20" fill="#D7E9E6"/>
                <path d="M121.464 172.187C127.617 175.096 132.864 179.623 136.642 185.284C140.421 190.945 142.589 197.526 142.914 204.325C142.957 204.947 142.875 205.573 142.673 206.163C142.471 206.754 142.153 207.298 141.738 207.765C141.323 208.231 140.818 208.609 140.255 208.878C139.691 209.147 139.08 209.3 138.456 209.329C137.833 209.358 137.21 209.263 136.623 209.048C136.037 208.833 135.5 208.503 135.043 208.077C134.586 207.652 134.219 207.14 133.963 206.57C133.707 206.001 133.567 205.386 133.551 204.762C133.211 197.54 130.102 190.727 124.871 185.737C119.639 180.747 112.687 177.963 105.458 177.963C98.2279 177.963 91.2758 180.747 86.0446 185.737C80.8133 190.727 77.7046 197.54 77.3639 204.762C77.2797 205.985 76.7202 207.125 75.8053 207.94C74.8903 208.755 73.6926 209.18 72.4687 209.122C71.2447 209.065 70.0918 208.531 69.2569 207.634C68.4219 206.738 67.9713 205.55 68.0014 204.325C68.3256 197.527 70.4922 190.945 74.2696 185.284C78.0469 179.623 83.2926 175.096 89.4452 172.187C85.5015 168.898 82.6668 164.473 81.3267 159.516C79.9867 154.558 80.2062 149.308 81.9556 144.48C83.7049 139.652 86.8991 135.479 91.1037 132.531C95.3083 129.582 100.319 128 105.455 128C110.59 128 115.601 129.582 119.805 132.531C124.01 135.479 127.204 139.652 128.954 144.48C130.703 149.308 130.922 154.558 129.582 159.516C128.242 164.473 125.408 168.898 121.464 172.187ZM121.083 152.981C121.083 148.837 119.436 144.863 116.506 141.932C113.576 139.002 109.602 137.356 105.458 137.356C101.314 137.356 97.3394 139.002 94.4091 141.932C91.4789 144.863 89.8327 148.837 89.8327 152.981C89.8327 157.125 91.4789 161.099 94.4091 164.029C97.3394 166.96 101.314 168.606 105.458 168.606C109.602 168.606 113.576 166.96 116.506 164.029C119.436 161.099 121.083 157.125 121.083 152.981Z" fill="#416F5D"/>
              </svg>
            </div>
          </div>
          <div >
            <div className="flex flex-col justify-center items-center" >
              {hasError && <div   variant="h6" component="h2">
                  <p className="text-red-700 pt-1 font-bold text-[12px] xs:text-[14px] sm:text-[17px] w-[16em] sm:w-[24em]"><b>Error: {errorMessage}</b></p>
              </div>}
              <div className="flex flex-col text-left pt-4 [font-family:'Open_Sans',_Helvetica] text-sm xs:text-base sm:text-xl">
                  <label htmlFor='fullName' className="pb-2">Full Name</label>
                  <input onChange={handleChange} name='fullName' value={editProfileFormData.fullName} className="border-[1px] border-gray-500 w-[220px] xs:w-[380px] sm:w-[510px] lg:w-[650px] rounded h-10 pl-2 text-gray-600 [font-family: 'Open_Sans',_Helvetica] "/>  
              </div>

              <div className="flex flex-col text-left pt-4 [font-family:'Open_Sans',_Helvetica] text-sm xs:text-base sm:text-xl">
                  <label htmlFor='phoneNumber' className="pb-2">Phone </label>
                  <input type="text" onChange={handleChange} name='phoneNumber' value={editProfileFormData.phoneNumber} className="border-[1px] border-gray-500 w-[220px] xs:w-[380px] sm:w-[510px] lg:w-[650px] rounded h-10 pl-2 text-gray-600 [font-family: 'Open_Sans',_Helvetica] "/> 
              </div>

              <div className="flex flex-col text-left pt-4 [font-family:'Open_Sans',_Helvetica] text-sm xs:text-base sm:text-xl"> 
                  <label htmlFor='email' className="pb-2">Email </label>
                  <input type="email" onChange={handleChange} name='email' value={editProfileFormData.email} className="border-[1px] border-gray-500 w-[220px] xs:w-[380px] sm:w-[510px] lg:w-[650px] rounded h-10 pl-2 text-gray-600 [font-family: 'Open_Sans',_Helvetica] "/>  
              </div>

              {/* Add after possible to add groups to a user
              
                <div>
                  <label htmlFor='select-current-group'>Current Group: </label>
                  <select id='select-current-group'>
                    <option value={'group1'}>Group 1</option>
                    <option value={'group2'}>Group 2</option>
                  </select>
              </div> */}

              <div className="flex flex-col text-left pt-4 [font-family:'Open_Sans',_Helvetica] text-sm xs:text-base sm:text-xl">
                <label htmlFor='password' className="pb-2">Password</label>
                <input onChange={handleChange} name='password' value={editProfileFormData.password} className="border-[1px] border-gray-500 w-[220px] xs:w-[380px] sm:w-[510px] lg:w-[650px] rounded h-10 pl-2 text-gray-600 [font-family: 'Open_Sans',_Helvetica] "/>  
              </div>
              <div>
                <div className=" flex justify-center items-center pt-6 ">
                  <button onClick={handleSubmit} type='button' className=" bg-primary-green rounded-lg font-semibold leading-7 w-[220px] xs:w-[380px] sm:w-[510px] lg:w-[650px] text-white text-center py-[11px] [font-family:'Open_Sans',_Helvetica]" >Save Updates</button>
                </div>
                <div className="pt-4">
                  <button className="text-red-600 font-semibold leading-5"> DELETE ACCOUNT</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <footer className="flex justify-center pb-40 pt-[18px] sm:pt-[35px] [font-family:'Open_Sans',_Helvetica]">
          <div className=" w-[270px] xs:w-[425px] sm:w-[560px] lg:w-[900px] flex items-center justify-between text-[10px] xs:text-[14px] sm:text-[16px] leading-6 not-italic font-normal text-gray-600">
            <ul className="flex gap-[36px]">
              <li>About</li>
              <li>Privacy</li>
              <li>Terms</li>
            </ul>
            <span>CareCollab v1.0.0</span>
          </div>
        </footer>
    </div>
  );
}