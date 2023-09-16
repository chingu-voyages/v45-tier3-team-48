import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import UserContext from '../../../UserContext';
import CaregiverApi from '../../../api';
import axios from 'axios';

const Information = () => {
    const [groupData, setGroupData] = useState([]);
    const [userStatus, setUserStatus] = useState([]);
    const { groupId } = useParams();
    const { userId } = useContext(UserContext);
    const navigate = useNavigate();

    const fetchData = () => {
        CaregiverApi.getIndividualGroup( {group_id: groupId} )
        .then(data => setGroupData(data))
        .then(checkUser());
        console.log('test');
    }

    function checkUser() { //make sure setUserStatus gets the correct data
        CaregiverApi.checkUser( {user_id: userId, group_id: groupId} )
        .then(data => setUserStatus(data) );
    }

    // send additional group data to the BE
    // send the groupData variable that contains all data from the backend
    function joinGroup() { //reload page after?
        CaregiverApi.joinGroup( 
            {
                user_id: userId,
                group_id: groupId, 
                description: groupData.description,
                nameCaregiver: groupData.nameCaregiver,
                nameGroup: groupData.nameGroup,
                namePatient: groupData.namePatient
            }
        );
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