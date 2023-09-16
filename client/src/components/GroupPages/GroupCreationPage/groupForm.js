import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from '../../../UserContext';
import CaregiverApi from '../../../api';
import axios from 'axios';

function GroupForm() {
    const { userId } = useContext(UserContext);
    const { fullName } = useContext(UserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        groupName: "",
        patientName: "",
        description: ""
    });

    const handleSubmit = (e) => { //how to get new groupId
        e.preventDefault();
        let groupId = "";
        CaregiverApi.createGroup( {user_id: userId, user_fullName: fullName, patientName: formData.patientName, description: formData.description} )
        .then(data => groupId = data)
        .then(setTimeout( () => navigate("/groupViewSingle/" + groupId), 1500) ); //navigated before database is updated so added 1.5 sec delay
    };

    return (
        <div className="groupForm">
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={ (e) => setFormData({...formData, patientName: e.target.value})} value={formData.patientName} placeholder="Patient Name"/>
                <br></br>
                <input type="text" onChange={ (e) => setFormData({...formData, description: e.target.value})} value={formData.description} placeholder="Describe the Purpose of the Group"/>
                <br></br>
                <button type="submit">Create Group</button>
            </form>
        </div>
    );
};

export default GroupForm;