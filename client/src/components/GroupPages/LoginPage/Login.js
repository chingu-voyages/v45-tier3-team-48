import React, {useContext, useState} from 'react';
import UserContext from '../../../UserContext';
import { useNavigate } from 'react-router-dom';


const Login= () => {
  const {loginUser} = useContext(UserContext);
  const navigate = useNavigate();

  const INITIAL_STATE = {email:'', password:''};

  const [loginFormData, setLoginFormData] = useState(INITIAL_STATE);
 
  const handleUpdate = (e) => {
    e.preventDefault();
    const { value, name } = e.target;

    setLoginFormData(data => ({...data, [name]: value}));
  };

  // validate data during submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await loginUser(loginFormData);

    setLoginFormData(INITIAL_STATE);
    // navigate('/register');
  };


  return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>CareCollab</div>
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