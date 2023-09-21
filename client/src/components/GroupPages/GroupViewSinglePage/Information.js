import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import UserContext from '../../../UserContext';
import CaregiverApi from '../../../api';
import RequestDisplayTable from '../RequestPage/RequestDisplayTable';

const Information = () => {
    const [groupData, setGroupData] = useState();
    const [userRole, setUserRole] = useState('');
    const [requests, setRequests] = useState([]);
    const { groupId } = useParams();
    const { userId, groupInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = useState(false);

    function getUserRole(groupId, groupInfo) {
        let userRole = '';
        if (!groupInfo) return userRole;
        for (let i = 0; i < groupInfo.length; i++) {
            if (groupInfo[i].groupId === groupId) {
                setUserRole(groupInfo[i].userRole);
            }
        }
        console.log(userRole);
        return userRole;
    }

    const handleAddRequestButton = () => {
        setIsLoaded(false);
        navigate(`/groups/${groupId}/request/create`);
    }

    function joinGroup() { //reload page after?
        CaregiverApi.joinGroup( {user_id: userId, group_id: groupId} );
    }

    useEffect(() => {
        async function fetchData() {
            let res = await CaregiverApi.getIndividualGroup( {group_id: groupId} );
            setGroupData(res);
            getUserRole(groupId, groupInfo);
            let requests = await CaregiverApi.findAllRequestsForOneGroup(groupId);
            setRequests(requests);
            setIsLoaded(true);
        }
        fetchData();
    }, []);

    let roleButton;
    if (userRole === 'Caregiver') {
        roleButton = <button onClick={() => navigate("/GroupEditDelete/" + groupId )}>Edit Details</button>;
    } else if (userRole !== 'Caregiver' && userRole !== 'Support') {
        roleButton = <button onClick={() => joinGroup()}>Join Group</button>;
    }

    return (
        <>
            {isLoaded && (
                <>
                    <div>
                        <h1>{groupData.namePatient}</h1>
                        {roleButton}
                        <p>Caregiver: {groupData.nameCaregiver}</p>
                        <p>Description: {groupData.description}</p>
                    </div>
                    {userRole === "Caregiver" ? 
                        <button onClick={handleAddRequestButton}>Add Request</button> :
                        <></>
                    }
                    {(requests && requests.length > 0) ? 
                        <RequestDisplayTable userRole={userRole} requests={requests} setRequests={setRequests} />
                        :
                        (userRole === "Caregiver") ? 
                            <p>Click the "Add Request" button to begin adding support requests to your group.</p> :
                            <p>No support requests yet.</p>
                    }
                    
                </>
            )}
        </>
    );
};

export default Information;