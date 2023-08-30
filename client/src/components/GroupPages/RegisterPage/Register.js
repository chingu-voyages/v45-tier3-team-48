import React, { useState } from 'react';
import axios from 'axios';
import UserContext from './/UserContext';


function Register() {

    // Retrieves the token variable from App.js
    // state controlled at App.js
    const {token, userId, email, fullName} = useContext(UserContext);

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
         try {
            const response = await axios.post('http://localhost:5000/register', 
            {//Remove localhost later
                fullName: formData.fullName,
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                password: formData.password,
            });
  
        // Assuming  backend responds with a success message
        if (response.status === 201) {
          console.log('Data sent successfully');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        }
    }

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
                        <input type="text" onChange={(e) => setFormData({...formData,   fullName: e.target.value })}  value={formData.fullName}  placeholder="Full Name" required/>
                    </div>
                    <div>
                        <input type="tel" onChange={(e) => setFormData({...formData,   phoneNumber: e.target.value })} value={formData.phoneNumber}  placeholder="Phone Number" required/>
                    </div>
                    <div>
                        <input type="email" onChange={(e) => setFormData({...formData,   email: e.target.value })} value={formData.email}  placeholder="Email Address" required/> 
                    </div>
                    <div>
                        <input type="password" onChange={(e) => setFormData({...formData,   password: e.target.value })} value={formData.password}   placeholder="Password" required/>
                    </div>
                    <div>
                        <input type="submit" value="Sign Up"/>
                    </div>
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
}

export default Register;