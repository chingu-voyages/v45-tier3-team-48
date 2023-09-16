import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import CaregiverApi from '../../../api';
import axios from 'axios';

// make conditional to show only user groups or all groups

// have to handle no groups on the usersGroups page
// if '/userGroups' and groupCount = false, then show 

const GroupTable = ( ) => {
    // determine path of route used
    const location = useLocation();

    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();

    const fetchAllGroupData = () => {
        CaregiverApi.getAllGroup()
        .then(data => setGroups(data));
    }

    // have to make 2 database calls because user data isn't included with the groups
    // could get user groups from useContext as another choice
    // usecontext has a tradeoff, because state needs to be updated each time across multiple components
    const fetchUserGroupData = async () => {
        await CaregiverApi.getUserGroups();

    }

    useEffect(() => {
        fetchAllGroupData();
        fetchAllGroupData();
    }, []);

    return (
        <div>
        <h1>All Groups</h1>
        <button onClick={ () => navigate("/GroupCreation") }>Create Group</button>
            <table>
                <tbody>
                    {groups.map((group, index) => (
                        <tr key={index}>
                            <td>{group.namePatient}</td>
                            <td>{group.nameCaregiver}</td>
                            <td>{group.description}</td>
                            <button onClick={ () => navigate("/GroupViewSingle/" + group._id ) }>See More</button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GroupTable;