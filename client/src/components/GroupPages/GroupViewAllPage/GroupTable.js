import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const GroupTable = ( ) => {
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();

    const fetchData = () => {
        axios.get('http://localhost:5000/individualGroups/getAll') // remove localhost later
        .then(data => setGroups(data.data));
    }

    useEffect(() => {
        fetchData();
    }, []);

    function toGroupInfo(groupId) {
        navigate("/GroupViewSinglePage", { state: { groupId: groupId } } );
    }

    return (
        <div>
        <h1>All Groups</h1>
        <button>Create Group</button>
            <table>
                <tbody>
                    {groups.map((group, index) => (
                        <tr key={index}>
                            <td>{group.nameGroup}</td>
                            <td>{group.namePatient}</td>
                            <td>{group.nameCaregiver}</td>
                            <td>{group.description}</td>
                            <button onClick={ () => toGroupInfo(group._id) }>See More</button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GroupTable;