import React, {useState, useEffect} from 'react';
import axios from 'axios';

const GroupTable = ( {toGroupPage} ) => {
    const [groups, setGroups] = useState([]);

    const fetchData = () => {
        axios.get('http://localhost:5000/individualGroups/getAll') // remove localhost later
        .then(data => setGroups(data.data));
    }

    useEffect(() => {
        fetchData();
    }, []);

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
                            <button onClick={ () => toGroupPage(group._id) }>See More</button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GroupTable;