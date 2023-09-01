import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Information = ( {groupId} ) => {
    const [groupData, setGroupData] = useState([]);

    const fetchData = () => {
        axios.get('http://localhost:5000/individualGroups', {//remove localhost later
            params: {
                group_id: groupId
            }
        })
        .then(data => setGroupData(data.data[0]));
    }

    //check if user is logged in api call

    function joinGroup(){
        axios.post('http://localhost:5000/individualGroups/join', {// remove localhost later
            group_id: groupId
        })
    }

    //edit group api call

    useEffect(() => {
        fetchData();
    }, []);

    //'require' requests as well?

    return (
        <div>
            <h1>{groupData.nameGroup}</h1>
            <h2>{groupData.namePatient}</h2>
            <button>Edit Details</button>
            <button onClick={ () => joinGroup() }>Join Group</button>
            <p>Caregiver: {groupData.nameCaregiver}</p>
            <p>Description: {groupData.description}</p>
        </div>
    );
}

export default Information;