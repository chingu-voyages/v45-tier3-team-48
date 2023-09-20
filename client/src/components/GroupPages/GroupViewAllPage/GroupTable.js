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
            <h1>All Groups</h1>
            <div>
                <button onClick={ () => navigate("/GroupCreation") }>Create Group</button>
            </div>
            <div>
                <ChildGroupTable groups={groups}/>
            </div>
        </div>
    );
}

export default GroupTable;