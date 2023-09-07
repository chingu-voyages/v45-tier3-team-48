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

    // handle errors from BE with res.errors
    
    setLoginFormData(INITIAL_STATE);
    // navigate('/register');
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
      <div>
        <form onSubmit={handleSubmit}>
          <div>CareCollab</div>
          {hasError && <div style={{backgroundColor:'red'}}  variant="h6" component="h2">
            <p style={{color:'white'}}><b>Error: {errorMessage}</b></p>
        </div>}
          <div>
              <input onChange={handleUpdate} name='email' placeholder='Email Address' />
          </div>
          <div>
              <input onChange={handleUpdate} type="password" name='password' placeholder='Password'/>
          </div>
          <button>Login</button>
        </form >
      </div>
  );
}

export default Login;