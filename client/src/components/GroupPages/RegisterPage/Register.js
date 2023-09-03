import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from './/UserContext';
import './register.css';

function Register(){
  // Retrieves the token variable from App.js
    // state controlled at App.js
  //const {token, userId, email, fullName} = useContext(UserContext);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setFormErrors(validate(formData));
        const response = await axios.post('http://localhost:5000/register', 
          {//Remove localhost later
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            password: formData.password,
          }
        );
        setIsSubmit(true);
        // Assuming  backend responds with a success message
        if (response.status === 201) {
          console.log('Data sent successfully');
        }
      } catch(err) {
        console.error('An error occurred:', err);
      }
    }
    
    const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
      console.log(formErrors);
      if(Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formData);
      }
    })

    const validate = (data) => {
      const errors = {};
      const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/i;
      //Works only for American 10-digit phoone numbers
      const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
      if(!data.fullName) {//errors for full name
        errors.fullName = "Full name is required!";
      }
      if(!data.phoneNumber) {//Erros for phone number
        errors.phoneNumber = "Phone number is required!";
      } else if(!phoneRegex.test(data.phoneNumber)){
        errors.phoneNumber = "This is not a valid phone number format! Ex: xxx-xxx-xxxx"
      }
      if(!data.email) {//Errors for email
        errors.email = "Email is required!"
      } else if (!emailRegex.test(data.email)){
        errors.email = "This is not a valid email format!";
      }
      if(!data.password) {//Errors for password
        errors.password = "Password is required!";
      } else if(data.password.length < 4) {
        errors.password = 'Password must be more than 4 characters!';
      } else if(data.password.length > 12) {
        errors.password = 'Password cannot exceed more than 12 characters!';
      }
      return errors

    }
    console.log(formData);
    return ( 
      <>
        <main>
          <div>
              <h1>CareCollab</h1>
          </div>
          <div>
              <h2>Sign up to create an account!</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <input 
              type="text"
              onChange={onChange}
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              />
            </div>
            <p>{formErrors.fullName}</p>
            <div>
              <input 
              type="text"
              onChange={onChange}
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              />
            </div>
            <p>{formErrors.phoneNumber}</p>
            <div>
              <input 
              type="text"
              onChange={onChange}
              name="email"
              placeholder="Email"
              value={formData.email}
              />
            </div>
            <p>{formErrors.email}</p>
            <div>
              <input 
              type="text"
              onChange={onChange}
              name="password"
              placeholder="Password"
              value={formData.password}
              />
              <p>{formErrors.password}</p>
            </div>
            <button>Submit</button>
          </form>
          <div>
            <h2>Already have an account? <a href="/login">Login here!</a> </h2>
          </div>
        </main>
        <footer>
          <div>
            <ul>
              <li>About</li>
              <li>Privacy</li>
              <li>Terms</li>
            </ul>
            <span>CareCollab v1.0.0</span>
          </div>
        </footer>
      </>
    )
};

export default Register;