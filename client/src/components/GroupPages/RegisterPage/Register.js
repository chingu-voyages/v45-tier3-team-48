import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../../UserContext';
import { useNavigate } from 'react-router-dom';

function Register() {
    // Retrieves the token variable from App.js
    // state controlled at App.js
  const {registerUser,token} = useContext(UserContext);
  const navigate = useNavigate();

  const INITIAL_STATE = {
    fullName: "",
    phoneNumber: "",
    email: "",
    password: ""
  }
  const [formData, setFormData] = useState(INITIAL_STATE);


    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setFormErrors(validate(formData));
        if (Object.keys(formErrors).length === 0) {
          let response = await registerUser(formData); // Use registerUser for registration
          setIsSubmit(true);
          if(response.status === 401) {
            setFormErrors({failedCreatingUser: "User already exists with this email."});
          } else if (response.status === 201) { // Handle success or redirect as needed
            console.log('Registration successful');
            setFormData(INITIAL_STATE);
            // Redirect or navigate to the login page, for example
            // navigate('/login');
          }

        }
      } catch(e) {
        console.log(e)
      }
    }
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formData);
        }
        // if (token) {
        //   // Redirect the user to the previous page
        //   navigate(-1);
        // }
    }, [token, navigate]);

    const validate = data => {
        const errors = {};
        const emailRegex =
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/i;
        //Works only for American 10-digit phoone numbers
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (!data.fullName) {
            //errors for full name
            errors.fullName = 'Full name is required!';
        }
        if (!data.phoneNumber) {
            //Erros for phone number
            errors.phoneNumber = 'Phone number is required!';
        } else if (!phoneRegex.test(data.phoneNumber)) {
            errors.phoneNumber =
                'This is not a valid phone number format! Ex: xxx-xxx-xxxx';
        }
        if (!data.email) {
            //Errors for email
            errors.email = 'Email is required!';
        } else if (!emailRegex.test(data.email)) {
            errors.email = 'This is not a valid email format!';
        }
        if (!data.password) {
            //Errors for password
            errors.password = 'Password is required!';
        } else if (data.password.length < 4) {
            errors.password = 'Password must be more than 4 characters!';
        } else if (data.password.length > 12) {
            errors.password = 'Password cannot exceed more than 12 characters!';
        }
        return errors;
    };
    console.log(formData);
    return ( 
      <div className="bg-gray-50 w-full pt-40 pb-40 flex flex-col items-center justify-center ">
        <main className="bg-white w-[285px] xs:w-[425px] sm:w-[563px] mx-auto my-0 rounded border-[1px] border-solid border-navy-100">
          <div className="text-center">
              <h1 className="text-primary-green [font-family:'Roboto_Serif',_Helvetica] font-semibold text-[20px] xs:text-[25px] sm:text-[30px] leading-8 text-center pt-[20px] xs:pt-[25px] sm:pt-[35px]">CareCollab</h1>
          </div>
          <div className="text-center">
              <h2 className="text-center  [font-family:'Open_Sans',_Helvetica] font-semibold text-black text-[12px] xs:text-[18px] sm:text-[24px] leading-6 pt-[10px] xs:pt-[14px] sm:pt-[35px]">Sign up to create an account!</h2>
          </div>
          <form className="pt-[5px] sm:pt-[35px] flex flex-col items-center" onSubmit={handleSubmit}>
            <div className=" pt-3 sm:pt-5">
              <label htmlFor="fullName" className="w-[195px]  xs:w-[252px] sm:w-[452px] h-[34px] xs:h-[40px] sm:h-[50px]">
                <div className="flex items-center w-[195px]  xs:w-[252px] sm:w-[452px] h-[34px] xs:h-[40px] sm:h-[50px] rounded-[5px] border-navy-100 border-[1px]">
                  <svg className="ml-3 mr-[10px] w-[18px] xs:w-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4C13.0609 4 14.0783 4.42143 14.8284 5.17157C15.5786 5.92172 16 6.93913 16 8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12C10.9391 12 9.92172 11.5786 9.17157 10.8284C8.42143 10.0783 8 9.06087 8 8C8 6.93913 8.42143 5.92172 9.17157 5.17157C9.92172 4.42143 10.9391 4 12 4ZM12 6C11.4696 6 10.9609 6.21071 10.5858 6.58579C10.2107 6.96086 10 7.46957 10 8C10 8.53043 10.2107 9.03914 10.5858 9.41421C10.9609 9.78929 11.4696 10 12 10C12.5304 10 13.0391 9.78929 13.4142 9.41421C13.7893 9.03914 14 8.53043 14 8C14 7.46957 13.7893 6.96086 13.4142 6.58579C13.0391 6.21071 12.5304 6 12 6ZM12 13C14.67 13 20 14.33 20 17V20H4V17C4 14.33 9.33 13 12 13ZM12 14.9C9.03 14.9 5.9 16.36 5.9 17V18.1H18.1V17C18.1 16.36 14.97 14.9 12 14.9Z" fill="#94A1B6"/>
                  </svg>
                  <input 
                  className="w-[195px]  xs:w-[252px] sm:w-[452px] h-[34px] xs:h-[40px] sm:h-[50px] rounded-[5px] border-navy-100 border-[1px] border-l-0 [font-family:'Open_Sans',_Helvetica] font-normal text-[color:var(--navy-200)] text-[10px] xs:text-[13px] sm:text-[16px]"
                  type="text"
                  onChange={onChange}
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  />
                </div>
              </label>
            </div>
            <p className="text-red-700 pt-1 font-bold text-[10px] xs:text-[14px] sm:text-[17px]">{formErrors.fullName}</p>
            <div className=" pt-3 sm:pt-5">
              <label htmlFor="phoneNumber" className="w-[195px]  xs:w-[252px] sm:w-[452px] h-[34px] xs:h-[40px] sm:h-[50px]">
                <div className="flex items-center w-[195px]  xs:w-[252px] sm:w-[452px] h-[34px] xs:h-[40px] sm:h-[50px] rounded-[5px] border-navy-100 border-[1px] ">
                  <svg className="ml-3 mr-[10px] w-[18px] xs:w-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <path d="M6.54 5C6.6 5.89 6.75 6.76 6.99 7.59L5.79 8.79C5.38 7.59 5.12 6.32 5.03 5H6.54ZM16.4 17.02C17.25 17.26 18.12 17.41 19 17.47V18.96C17.68 18.87 16.41 18.61 15.2 18.21L16.4 17.02ZM7.5 3H4C3.45 3 3 3.45 3 4C3 13.39 10.61 21 20 21C20.55 21 21 20.55 21 20V16.51C21 15.96 20.55 15.51 20 15.51C18.76 15.51 17.55 15.31 16.43 14.94C16.3307 14.904 16.2256 14.887 16.12 14.89C15.86 14.89 15.61 14.99 15.41 15.18L13.21 17.38C10.3754 15.9304 8.06961 13.6246 6.62 10.79L8.82 8.59C9.1 8.31 9.18 7.92 9.07 7.57C8.69065 6.41806 8.49821 5.2128 8.5 4C8.5 3.45 8.05 3 7.5 3Z" fill="#94A1B6"/>
                  </svg>
                  <input 
                  className="w-[195px]  xs:w-[252px] sm:w-[452px] h-[34px] xs:h-[40px] sm:h-[50px] rounded-[5px] border-navy-100 border-[1px]  border-l-0 [font-family:'Open_Sans',_Helvetica] font-normal text-[color:var(--navy-200)] text-[10px] xs:text-[13px] sm:text-[16px]"
                  type="text"
                  onChange={onChange}
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  />
                </div>
              </label>
            </div>
            <p className="text-red-700 pt-1 font-bold text-[10px] xs:text-[14px] sm:text-[17px]">{formErrors.phoneNumber}</p>
            <div className=" pt-3 sm:pt-5">
              <label htmlFor="email" className="w-[195px]  xs:w-[252px] sm:w-[452px] h-[34px] xs:h-[40px] sm:h-[50px]">
                <div className="flex items-center w-[195px]  xs:w-[252px] sm:w-[452px] h-[34px] xs:h-[40px] sm:h-[50px] rounded-[5px] border-navy-100 border-[1px] ">
                  <svg className="ml-3 mr-[10px] w-[18px] xs:w-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="#94A1B6"/>
                  </svg>
                  <input 
                  className="w-[195px]  xs:w-[252px] sm:w-[452px] h-[34px] xs:h-[40px] sm:h-[50px] rounded-[5px] border-navy-100 border-[1px]  border-l-0 [font-family:'Open_Sans',_Helvetica] font-normal text-[color:var(--navy-200)] text-[10px] xs:text-[13px] sm:text-[16px]"
                  type="text"
                  onChange={onChange}
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  />
                </div>
              </label>
            </div>
            <p className="text-red-700 pt-1 font-bold text-[10px] xs:text-[14px] sm:text-[17px]">{formErrors.email}</p>
            <div className=" pt-3 sm:pt-5">
              <label htmlFor="password" className="w-[195px]  xs:w-[252px] sm:w-[452px] h-[34px] xs:h-[40px] sm:h-[50px]">
                <div className="flex items-center w-[195px]  xs:w-[252px] sm:w-[452px] h-[34px] xs:h-[40px] sm:h-[50px] rounded-[5px] border-navy-100 border-[1px] ">
                  <svg  className="ml-3 mr-[10px] w-[18px] xs:w-[24px]" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none">
                    <path d="M12 17C11.4696 17 10.9609 16.7893 10.5858 16.4142C10.2107 16.0391 10 15.5304 10 15C10 13.89 10.89 13 12 13C12.5304 13 13.0391 13.2107 13.4142 13.5858C13.7893 13.9609 14 14.4696 14 15C14 15.5304 13.7893 16.0391 13.4142 16.4142C13.0391 16.7893 12.5304 17 12 17ZM18 20V10H6V20H18ZM18 8C18.5304 8 19.0391 8.21071 19.4142 8.58579C19.7893 8.96086 20 9.46957 20 10V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V10C4 8.89 4.89 8 6 8H7V6C7 4.67392 7.52678 3.40215 8.46447 2.46447C9.40215 1.52678 10.6739 1 12 1C12.6566 1 13.3068 1.12933 13.9134 1.3806C14.52 1.63188 15.0712 2.00017 15.5355 2.46447C15.9998 2.92876 16.3681 3.47995 16.6194 4.08658C16.8707 4.69321 17 5.34339 17 6V8H18ZM12 3C11.2044 3 10.4413 3.31607 9.87868 3.87868C9.31607 4.44129 9 5.20435 9 6V8H15V6C15 5.20435 14.6839 4.44129 14.1213 3.87868C13.5587 3.31607 12.7956 3 12 3Z" fill="#94A1B6"/>
                  </svg>
                    <input 
                    className="w-[195px] xs:w-[252px] sm:w-[452px] h-[34px] xs:h-[40px] sm:h-[50px] rounded-[5px] border-navy-100 border-[1px] border-l-0 [font-family:'Open_Sans',_Helvetica] font-normal text-[color:var(--navy-200)] text-[10px] xs:text-[13px] sm:text-[16px]"
                    type="password"
                    onChange={onChange}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    />
                </div>
              </label>
            </div>
            <p className="text-red-700 pt-1 font-bold text-[10px] xs:text-[14px] sm:text-[17px]">{formErrors.password}</p>
            <div className="pt-[10px] xs:pt-[15px] sm:pt-[25px] [font-family:'Open_Sans',_Helvetica]">
              <button className="bg-primary-green w-[193px] xs:w-[250px] sm:w-[450px]  h-[36px] xs:h-[40px] sm:h-[50px] rounded-[15px] text-white text-[12px] xs:text-[16px] sm:text-[20px] leading-7 ">SIGN UP</button>
            </div>
            <p>{formErrors.failedCreatingUser}</p>
          </form>

          <div className="pt-[10px] xs:pt-[18px] sm:pt-[25px] pb-[14px] xs:pb-[28px] sm:pb-[35px] text-center">
            <h2 className="[font-family:'Open_Sans',_Helvetica] not-italic  text-[10px] xs:text-[14px] sm:text-[16px] font-medium leading-6 text-gray-500">Already have an account? <a className="text-figma-blue" href="/login">Login here!</a> </h2>
          </div>
        </main>
        <footer className="flex justify-center  pt-[18px] sm:pt-[35px] [font-family:'Open_Sans',_Helvetica]">
          <div className=" w-[285px] xs:w-[425px]  sm:w-[560px] flex items-center justify-between text-[10px] xs:text-[14px] sm:text-[16px] leading-6 not-italic font-normal text-gray-600">
            <ul className="flex gap-[36px]">
              <li>About</li>
              <li>Privacy</li>
              <li>Terms</li>
            </ul>
            <span>CareCollab v1.0.0</span>
          </div>
        </footer>
      </div>
    )
};


export default Register;
