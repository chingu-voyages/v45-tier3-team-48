import React, {useState, useEffect, useContext} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import CaregiverApi from '../../../api';
import UserContext from '../../../UserContext';
import axios from 'axios';
import validator from 'validator';
import ChildGroupTable from './ChildGroupTable';


const UserGroups = () => {

    const { groupInfo } = useContext(UserContext);
    
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex justify-between items-center mx-[150px] pb-[50px] border-b-[4px] border-gray-300">
                <h2 className="text-[30px]">My Groups</h2>
                <button className="border-[2px] rounded-[125px] py-[15px] px-[35px] border-dark-green bg-gray-50 text-dark-green hover:bg-dark-green hover:text-white transition-color duration-300" onClick={ () => navigate("/GroupCreation") }>
                    Create new group
                </button>
            </div>
            <ChildGroupTable groups={groupInfo}/>
        </div>
    );
}

export default UserGroups;