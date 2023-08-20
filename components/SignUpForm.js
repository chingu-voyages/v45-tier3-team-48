import React, { useState } from 'react';
import axios from 'axios';


async function SignUpForm() {

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]:value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    }
    try {
        const response = await axios.post('/signUp', formData);
  
        // Assuming your backend responds with a success message
        if (response.status === 201) {
          console.log('Data sent successfully');
        }
      } catch (error) {
        console.error('An error occurred:', error);
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
                        <input type="text" name="fullName"  value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" required/>
                    </div>
                    <div>
                        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" required/>
                    </div>
                    <div>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" required/> 
                    </div>
                    <div>
                        <input type="password" name="password" value={formData.password}  onChange={handleInputChange} placeholder="Password" required/>
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

export default SignUpForm;