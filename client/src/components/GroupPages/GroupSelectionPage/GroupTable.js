import React, {useState, useEffect} from 'react';
import axios from 'axios';

//"see more" button would go to a specific group's page
const GroupTable = () => {

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
            <table>
                <tbody>
                    {groups.map((group, index) => (
                        <tr key={index}>
                            <td>{group.nameGroup}</td>
                            <td>{group.namePatient}</td>
                            <td>{group.nameCaregiver}</td>
                            <td>{group.description}</td>
                            <button onClick={ () => console.log("replace with function call")}>See More</button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GroupTable;