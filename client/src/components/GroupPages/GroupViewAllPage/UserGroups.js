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



const UserGroups = () => {

    // extract groupInfo from App
    const { groupInfo } = useContext(UserContext);
    
    const navigate = useNavigate();

    // have to make 2 database calls because user data isn't included with the groups
    // could get user groups from useContext as another choice
    // usecontext has a tradeoff, because state needs to be updated each time across multiple components
    // const fetchUserGroupData = async () => {
        // can retrieve from useContext var
        // update groups through setGroups
        
        // groups = [groupInfo];
        // useLocation to know which update to do

    //     console.log('test');
    // }

    return (
        <div>
            <h1>My Groups</h1>
            <div>
                <button onClick={ () => navigate("/GroupCreation") }>Create Group</button>
            </div>
            <ChildGroupTable groups={groupInfo}/>
        </div>
    );
}

export default UserGroups;