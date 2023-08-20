import React, {useState} from 'react';
import axios from 'axios';

function GroupForm() {

    const [formData, setFormData] = useState({
        groupName: "",
        patientName: "",
        description: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:5000/individualGroups/create', {// remove localhost later
                groupName: formData.groupName, //add current user's ID
                patientName: formData.patientName,
                description: formData.description
            })
            //should add a response in the backend + something to handle it here
        } catch(err) {
            console.error(err);
        }
    };

    return (
        <div className="groupForm">
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={ (e) => setFormData({...formData, groupName: e.target.value})} placeholder="Group Name"/>
                <br></br>
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