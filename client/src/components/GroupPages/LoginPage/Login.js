import React, {useContext, useState} from 'react';
import UserContext from '../../../UserContext';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';


const Login= () => {
  const {loginUser} = useContext(UserContext);
  const navigate = useNavigate();

  const INITIAL_STATE = {email:'', password:''};

  const [hasError, sethasError] = useState(false);
  const [errorMessage,setErrorMessage] = useState('');
  const [loginFormData, setLoginFormData] = useState(INITIAL_STATE);
 
  const handleUpdate = (e) => {
    e.preventDefault();
    const { value, name } = e.target;

    setLoginFormData(data => ({...data, [name]: value}));
  };

  // validate data during submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate the form before api call
    // validate returns list of errors
    const errors = validateForm(loginFormData);
    if(errors.length){
      sethasError(true);
      setErrorMessage(errors[0]);
      return;
    }

    let res = await loginUser(loginFormData);

    // handle errors from BE for invalid email/password combination
    if(res.status === 401){
      sethasError(true);
      setErrorMessage(res.data.message);
      return;
    }

    // update login form data
    setLoginFormData(INITIAL_STATE);
    navigate('/usergroups');
  };

  const validateForm = data => {
    const errors = [];

    // check email
    if(!validator.isEmail(data.email)){
      errors.push('Must provide valid email');
      return errors;
    }

    // check password length
    // if wrong set error message
    if(!validator.isLength(data.password, {min:4, max:12})){
      errors.push('Password must be between 4 and 12 characters long');
      return errors;
    }
    return errors;
  }


  return (
      <div className="bg-gray-50 w-full pt-40 pb-40 flex flex-col items-center justify-center">
        <main className="bg-white w-[285px] xs:w-[425px] sm:w-[563px] mx-auto my-0 rounded border-[1px] border-solid border-navy-100">
          <form className="pt-[5px] sm:pt-[35px] flex flex-col items-center" onSubmit={handleSubmit}>
            <div className="text-center">
                <h1 className="text-primary-green [font-family:'Roboto_Serif',_Helvetica] font-semibold text-[20px] xs:text-[25px] sm:text-[30px] leading-8 text-center pt-[20px] xs:pt-[25px] sm:pt-[35px]">CareCollab</h1>
            </div>
            {hasError && <div className='p-[10px]'>
                <div style={{backgroundColor:'red'}}  variant="h6" component="h2">
                <p style={{color:'white'}}><b>Error: {errorMessage}</b></p>
              </div>
            </div>}
            <div className=" pt-3 sm:pt-5">
                <label htmlFor="email" className="w-[195px]  xs:w-[252px] sm:w-[452px] h-[34px] xs:h-[40px] sm:h-[50px]"/>
                <div className="flex items-center w-[195px]  xs:w-[252px] sm:w-[452px] h-[34px] xs:h-[40px] sm:h-[50px] rounded-[5px] border-navy-100 border-[1px]">
                  <svg className="ml-3 mr-[10px] w-[18px] xs:w-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                        <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="#94A1B6"/>
                  </svg>
                  <input 
                    className="w-[195px]  xs:w-[252px] sm:w-[452px] h-[34px] xs:h-[40px] sm:h-[50px] rounded-[5px] border-navy-100 border-[1px]  border-l-0 [font-family:'Open_Sans',_Helvetica] font-normal text-[color:var(--navy-200)] text-[10px] xs:text-[13px] sm:text-[16px]"
                    onChange={handleUpdate} 
                    name='email' 
                    placeholder='Email'
                    value={loginFormData.email} 
                  />
                </div>
            </div>
            <div className=" pt-3 sm:pt-5">
                <label htmlFor="password" className="w-[195px]  xs:w-[252px] sm:w-[452px] h-[34px] xs:h-[40px] sm:h-[50px]"/>
                  <div className="flex items-center w-[195px]  xs:w-[252px] sm:w-[452px] h-[34px] xs:h-[40px] sm:h-[50px] rounded-[5px] border-navy-100 border-[1px]">
                    <svg  className="ml-3 mr-[10px] w-[18px] xs:w-[24px]" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none">
                      <path d="M12 17C11.4696 17 10.9609 16.7893 10.5858 16.4142C10.2107 16.0391 10 15.5304 10 15C10 13.89 10.89 13 12 13C12.5304 13 13.0391 13.2107 13.4142 13.5858C13.7893 13.9609 14 14.4696 14 15C14 15.5304 13.7893 16.0391 13.4142 16.4142C13.0391 16.7893 12.5304 17 12 17ZM18 20V10H6V20H18ZM18 8C18.5304 8 19.0391 8.21071 19.4142 8.58579C19.7893 8.96086 20 9.46957 20 10V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V10C4 8.89 4.89 8 6 8H7V6C7 4.67392 7.52678 3.40215 8.46447 2.46447C9.40215 1.52678 10.6739 1 12 1C12.6566 1 13.3068 1.12933 13.9134 1.3806C14.52 1.63188 15.0712 2.00017 15.5355 2.46447C15.9998 2.92876 16.3681 3.47995 16.6194 4.08658C16.8707 4.69321 17 5.34339 17 6V8H18ZM12 3C11.2044 3 10.4413 3.31607 9.87868 3.87868C9.31607 4.44129 9 5.20435 9 6V8H15V6C15 5.20435 14.6839 4.44129 14.1213 3.87868C13.5587 3.31607 12.7956 3 12 3Z" fill="#94A1B6"/>
                    </svg>
                    <input 
                      className="w-[195px]  xs:w-[252px] sm:w-[452px] h-[34px] xs:h-[40px] sm:h-[50px] rounded-[5px] border-navy-100 border-[1px]  border-l-0 [font-family:'Open_Sans',_Helvetica] font-normal text-[color:var(--navy-200)] text-[10px] xs:text-[13px] sm:text-[16px]"
                      onChange={handleUpdate} 
                      type='password'
                      name='password'
                      placeholder='Password'
                      value={loginFormData.password} 
                    />
                  </div>
            </div>
            {/* pt-[10px] xs:pt-[18px] sm:pt-[25px] pb-[14px] xs:pb-[28px] sm:pb-[35px] text-center */}
            <div className=" pt-[10px] xs:pt-[15px] sm:pt-[25px] [font-family:'Open_Sans',_Helvetica]">
                <button className="bg-primary-green w-[193px] xs:w-[250px] sm:w-[450px]  h-[36px] xs:h-[40px] sm:h-[50px] rounded-[15px] text-white text-[12px] xs:text-[16px] sm:text-[20px] leading-7 ">LOGIN</button>
            </div>
          </form >
          <div className="pt-[10px] xs:pt-[15px] sm:pt-[15px] pb-[10px] xs:pb-[28px] sm:pb-[35px] text-center">
              <h2 className="[font-family:'Open_Sans',_Helvetica] not-italic  text-[10px] xs:text-[14px] sm:text-[16px] font-medium leading-6 text-gray-500">Don't have an account? <a className="text-figma-blue" href="/register">Sign up here!</a> </h2>
          </div>
        </main>

      </div>

  );
}

export default Login;