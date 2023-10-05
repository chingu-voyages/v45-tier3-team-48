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
    const { userId, groupInfo, setGroupInfo, token } = useContext(UserContext);
    const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = useState(false);

    function getUserRole(groupId, groupInfo) {
        let userRole = '';
        if (!groupInfo) return userRole;
        for (let i = 0; i < groupInfo.length; i++) {
            if (groupInfo[i]._id === groupId) {
                setUserRole(groupInfo[i].userRole);
            }
        }
    }

    const handleAddRequestButton = () => {
        setIsLoaded(false);
        navigate(`/groups/${groupId}/request/create`);
    }

    // send additional group data to the BE
    // send the groupData variable that contains all data from the backend
    function joinGroup() { //reload page after?
        CaregiverApi.joinGroup( 
            {
                user_id: userId,
                group_id: groupId, 
                description: groupData.description,
                nameCaregiver: groupData.nameCaregiver,
                namePatient: groupData.namePatient
            }
        );
        const updatedGroupInfo = [ ...groupInfo, 
                                    { 
                                        _id: groupId, 
                                        userRole: "Support", 
                                        description:groupData.description, 
                                        nameCaregiver:groupData.nameCaregiver, 
                                        namePatient:groupData.namePatient
                                    }
                                ];
        setGroupInfo(updatedGroupInfo);
        getUserRole(groupId, updatedGroupInfo);
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

    // prevents users not logged in from viewing page
    if(!token){
        navigate('/')
        return;
    } 
    
    const handleRoleButton = (userRole) => {
        if (!userRole) joinGroup();
        if (userRole === "Caregiver") navigate("/GroupEditDelete/" + groupId)
    };

    const roleButtonText = (userRole) => {
        if (!userRole) return "Join Group";
        if (userRole === "Caregiver") return "Edit Details";
        return "";
    }

    return (
        <>
            {isLoaded && (
                <>
                    <div>
                        <h1>{groupData.namePatient}</h1>
                        {(!userRole || userRole === "Caregiver") ?
                            <button onClick={() => handleRoleButton(userRole)}>{roleButtonText(userRole)}</button> : <></>
                        }
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