import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const Information = () => {
    const [groupData, setGroupData] = useState([]);
    const [userStatus, setUserStatus] = useState([]);
    const { groupId } = useParams();
    const navigate = useNavigate();

    const fetchData = () => {
        axios.get('http://localhost:5000/individualGroups', {//remove localhost later
            params: {
                group_id: groupId
            }
        })
        .then(data => setGroupData(data.data))
        .then(checkUser());
    }

    function checkUser() {
        axios.get('http://localhost:5000/individualGroups/checkUser', {// remove localhost later
            params: {
                group_id: groupId
            }
        })
        .then(data => setUserStatus(data.data.role));
    }

    function joinGroup(){
        axios.post('http://localhost:5000/individualGroups/join', {// remove localhost later
            group_id: groupId
        })
    }

    function toEditGroupPage() {
        navigate("/GroupEditDelete/" + groupId );
    }

    useEffect(() => {
        fetchData();
    }, []);

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