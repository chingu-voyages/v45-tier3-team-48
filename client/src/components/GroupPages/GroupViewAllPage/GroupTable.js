import React, {useState, useEffect, useContext} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import CaregiverApi from '../../../api';
import UserContext from '../../../UserContext';
import axios from 'axios';
import validator from 'validator';
import ChildGroupTable from './ChildGroupTable';

// make conditional to show only user groups or all groups

// have to handle no groups on the usersGroups page
// if '/userGroups' and groupCount = false, then show 



const GroupTable = () => {


    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();


    const fetchAllGroupData = () => {
        CaregiverApi.getAllGroup()
        .then(data => setGroups(data));
    }


    useEffect(() => {
            fetchAllGroupData();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mx-[150px] pb-[50px] border-b-[4px] border-gray-300">
                <h2 className="text-[30px]">All Groups</h2>
                <button className="border-[2px] rounded-[125px] py-[15px] px-[35px] border-dark-green bg-gray-50 text-dark-green hover:bg-dark-green hover:text-white transition-color duration-300" onClick={ () => navigate("/GroupCreation") }>
                    Create new group
                </button>
            </div>
            <ChildGroupTable groups={groups}/>
        </div>
    );
}

export default GroupTable;