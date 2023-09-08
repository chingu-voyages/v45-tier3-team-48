import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import UserContext from '../../../UserContext';
import CaregiverApi from '../../../api';
import axios from 'axios';

const Information = () => {//use useEffect for the methods?
    const [groupData, setGroupData] = useState([]);
    const [userStatus, setUserStatus] = useState([]);
    const { groupId } = useParams();
    const { userId } = useContext(UserContext);//token isn't passing its payload to req.body
    const navigate = useNavigate();

    const fetchData = () => {
        CaregiverApi.getIndividualGroup( {group_id: groupId} )
        .then(data => setGroupData(data))
        .then(checkUser());
    }

    function checkUser() { //change backend method after database change
        CaregiverApi.checkUser( {user_id: userId, group_id: groupId} )
        .then(data => setUserStatus(data.role) );
    }

    function joinGroup() { //reload page after?
        CaregiverApi.joinGroup( {user_id: userId, group_id: groupId} );
    }

    useEffect(() => {
        fetchData();
    }, []);

    let roleButton;
    if (userStatus === 'Caregiver') {
        roleButton = <button onClick={() => navigate("/GroupEditDelete/" + groupId )}>Edit Details</button>;
    } else if (userStatus !== 'Caregiver' && userStatus !== 'Support') {
        roleButton = <button onClick={() => joinGroup()}>Join Group</button>;
    }

    return (
        <div>
            <h1>{groupData.nameGroup}</h1>
            <h2>{groupData.namePatient}</h2>
            {roleButton}
            <p>Caregiver: {groupData.nameCaregiver}</p>
            <p>Description: {groupData.description}</p>
        </div>
    );
};

export default Information;