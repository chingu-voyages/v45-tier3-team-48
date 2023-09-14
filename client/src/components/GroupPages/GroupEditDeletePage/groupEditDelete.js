import React, {useState} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import CaregiverApi from '../../../api';
import axios from 'axios';

function GroupEditDelete() {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        patientName: "",
        description: ""
    });

    function groupDelete() {
        try{
            CaregiverApi.deleteGroup( {group_id: groupId} )
            .then(setTimeout( () => navigate("/groupViewAll"), 1500) ); //navigated before database is updated so added 1.5 sec delay
        } catch(err) {
            console.error(err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            CaregiverApi.editGroup( {group_id: groupId, patientName: formData.patientName, description: formData.description} )
            .then(setTimeout( () => navigate("/GroupViewSingle/" + groupId), 1500) ); //navigated before database is updated so added 1.5 sec delay
        } catch(err) {
            console.error(err);
        }
    };

    return ( //maybe style groupDelete button red to stand out more
        <div className="groupEditForm">
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={ (e) => setFormData({...formData, patientName: e.target.value})} value={formData.patientName} placeholder="Patient Name"/>
                <br></br>
                <input type="text" onChange={ (e) => setFormData({...formData, description: e.target.value})} value={formData.description} placeholder="Description"/>
                <br></br>
                <button type="submit">Edit Group</button>
            </form>
            <br></br>
            <button onClick={ () => groupDelete() }>Delete Group</button>
        </div>
    );
};

export default GroupEditDelete;