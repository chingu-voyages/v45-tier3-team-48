import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import DropdownMenu from './DropdownMenu'

const Navbar = () => {
    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/register');
      }

    return (
        <div className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="md:ml-10 md:text-2xl font-bold font-brand text-dark-green">
                    CareCollab
                </div>

                <div className="md:mr-10 space-x-4">
                    {!token && <a href="/login" className="text-gray-700 hover:text-gray-900">Login</a>}
                    {!token && (
                        <button onClick={handleSignUpClick} className="bg-dark-green text-white px-4 py-2 rounded-full hover:bg-blue-600">
                            Sign Up
                        </button>
                    )}
                    {token && <DropdownMenu/>}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
