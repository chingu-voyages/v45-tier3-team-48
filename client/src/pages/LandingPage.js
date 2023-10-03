
import '../App.css';
import React, { useContext, useEffect } from 'react';
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom';




const HomePage = () => {

    const { token } = useContext(UserContext);
    const navigate = useNavigate();

    // if logged in, go to all groups instead
    useEffect(()=>{
        if(token) navigate('/GroupViewAll');
      },[token]);

    // redirect to signup page
    const handleClick = () => {
        navigate('/register');
      }

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full h-screen relative overflow-x-hidden">
    
            <div className="relative flex flex-col items-center justify-center w-full md:h-[820px] mb-8"> 
                <img className="z-0 md:mt-10 absolute w-full max-w-[820px]" alt="Oval" src="/Oval.svg" />
  
                <div className="z-10 max-w-[290px] md:max-w-[500px] font-brand font-medium text-4xl md:mt-10 md:text-[60px] text-center leading-tight md:leading-[70px]">
                    Where caring comes together
                </div>
  
                <p className="z-10 mt-4 w-full max-w-[427px] text-black text-lg md:text-xl text-center">
                    Experience the power of collaboration in easing the caregiving journey. Join CareCollab today and transform
                    the way you care.
                </p>
  
                <button className="z-10 mt-4">
                    <div className="flex justify-center pt-2 md:pt-[10px] w-[125px] md:w-[202px] h-[50px] md:h-[58px] bg-dark-green rounded-full md:rounded-[125px] shadow-md">
                        <div className="text-white text-xl">
                            <button onClick={handleClick} >Sign up</button> 
                        </div>
                    </div>
                </button>
            </div>
  
            {/* SVG Images */}
            <div className='flex justify-center items-center'>
                <img className="hidden md:block z-10 w-1/3 max-w-[540px] mx-2" alt="Left person" src="/LeftPerson.svg" />
                <img className="z-10 sm:w-1/4 sm:max-w-[440px] md:w-1/3 md:max-w-[540px] mx-2" alt="Center person" src="/CenterPerson.svg" />
                <img className="hidden md:block z-10 w-1/3 max-w-[540px] mx-2" alt="Right person" src="/RightPerson.svg" />
            </div>
  
          </div>
        </>
    );
}

export default HomePage;