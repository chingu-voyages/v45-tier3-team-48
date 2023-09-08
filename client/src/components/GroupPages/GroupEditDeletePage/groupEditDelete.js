import React, {useState} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function GroupEditDelete() {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        groupName: "",
        patientName: "",
        description: ""
    });

    function groupDelete(groupId) {
        axios.delete('http://localhost:5000/individualGroups/delete', {// remove localhost later
            params: {
                groupId : groupId
            }
        })
        .then(setTimeout( () => navigate("/groupViewAll"), 1500) ); //navigated before database is updated so added 1.5 sec delay
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.patch('http://localhost:5000/individualGroups/edit', {// remove localhost later
                groupId : groupId,
                groupName: formData.groupName,
                patientName: formData.patientName,
                description: formData.description
            })
            .then(setTimeout( () => navigate("/GroupViewSingle/" + groupId), 1500) ); //navigated before database is updated so added 1.5 sec delay
        } catch(err) {
            console.error(err);
        }
    };

    return ( //maybe style groupDelete button red to stand out more
        <div className="groupEditForm">
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={ (e) => setFormData({...formData, groupName: e.target.value})} placeholder="Group Name"/>
                <br></br>
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