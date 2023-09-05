import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function GroupEditDelete() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ //change to show existing values on load?
        groupName: "",
        patientName: "",
        description: ""
    });

    function groupDelete(groupId) {
        axios.delete('http://localhost:5000/individualGroups/editGroup' {
            params {
                groupId : //???
            }
        });
        //.then(navigate change location to all groups view)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.patch('http://localhost:5000/individualGroups/editGroup', {// remove localhost later
                //get groupId from single view page
                groupName: formData.groupName,
                patientName: formData.patientName,
                description: formData.description
            })
            //.then(navigate change location back to single groups view)
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