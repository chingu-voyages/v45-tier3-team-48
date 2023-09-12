import React, { useContext } from 'react';
import UserContext from '../../UserContext';
import { useNavigate } from 'react-router-dom';


const Navbar= () => {
    
    const { logoutUser, token } = useContext(UserContext);

    const navigate = useNavigate();

    const handleClick = () => {
      logoutUser();
      navigate('/login');
    }

    return (
      <div>
        {token && (
          <button onClick={handleClick}>Log Out</button>
        )}
      </div>
    );
}

export default Navbar;