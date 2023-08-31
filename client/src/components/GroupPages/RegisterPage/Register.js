import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './/UserContext';
import FormInput from './FormInput';

function Register() {
    // Retrieves the token variable from App.js
    // state controlled at App.js
    const { token, userId, email, fullName } = useContext(UserContext);

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
    });

    const inputs = [
        {
            id: 1,
            name: 'fullName',
            type: 'text',
            placeholder: 'Full Name',
            errorMessage:
                'It should only include letters, no numbers or special characters!',
            pattern: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
            required: true,
        },
        {
            id: 2,
            name: 'phoneNumber',
            type: 'text',
            placeholder: 'Phone Number',
            errorMessage: 'Please enter a proper phone number',
            pattern: '^(?{1,3}[- ]?)?{10}$',
            required: true,
        },
        {
            id: 3,
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            errorMessage: 'It should be a valid email address!',
            required: true,
        },
        {
            id: 4,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            errorMessage:
                'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
    ];

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:5000/register',
                {
                    //Remove localhost later
                    fullName: formData.fullName,
                    phoneNumber: formData.phoneNumber,
                    email: formData.email,
                    password: formData.password,
                }
            );

            // Assuming  backend responds with a success message
            if (response.status === 201) {
                console.log('Data sent successfully');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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
                    <h1>Register</h1>
                    {inputs.map(input => (
                        <FormInput
                            key={input.id}
                            {...input}
                            value={formData[input.name]}
                            onChange={onChange}
                        />
                    ))}
                    <button>Submit</button>
                </form>
                <div>
                    <h2>
                        Already have an account?{' '}
                        <a href="/login">Login here!</a>{' '}
                    </h2>
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
    );
}

export default Register;
