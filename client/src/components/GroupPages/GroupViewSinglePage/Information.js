import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Information = () => {
    const [groupData, setGroupData] = useState([]);
    const [userStatus, setUserStatus] = useState([]);
    const location = useLocation();

    const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

    const fetchData = () => {
        axios
            .get(`${BASE_URL}/individualGroups`, {
                //remove localhost later
                params: {
                    group_id: location.state.groupId,
                },
            })
            .then(data => setGroupData(data.data))
            .then(checkUser());
    };

    function checkUser() {
        axios
            .get(`${BASE_URL}/individualGroups/checkUser`, {
                // remove localhost later
                params: {
                    group_id: location.state.groupId,
                },
            })
            .then(data => setUserStatus(data.data.role));
    }

    function joinGroup() {
        axios.post(`${BASE_URL}/individualGroups/join`, {
            // remove localhost later
            group_id: location.state.groupId,
        });
    }

    //edit group api call

    useEffect(() => {
        fetchData();
    }, []);

    //'require' requests as well?

    let roleButton;

    if (userStatus === 'Caretaker') {
        roleButton = <button>Edit Details</button>;
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
