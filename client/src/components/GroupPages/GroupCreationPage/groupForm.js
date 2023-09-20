import React, { useContext, useState } from 'react';
import UserContext from '../../../UserContext';
import CaregiverApi from '../../../api';
import axios from 'axios';

function GroupForm() {
    const { userId } = useContext(UserContext);
    const { fullName } = useContext(UserContext);
    const [formData, setFormData] = useState({
        patientName: "",
        description: ""
    });

    const handleSubmit = (e) => { //probably add code to go to group page after group creation
        e.preventDefault();
        CaregiverApi.createGroup( {user_id: userId, user_fullName: fullName, patientName: formData.patientName, description: formData.description} );
    };

    return (
        <div class="groupForm">
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