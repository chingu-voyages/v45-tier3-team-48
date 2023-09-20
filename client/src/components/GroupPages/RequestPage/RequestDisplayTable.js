import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CaregiverApi from '../../../api';
import UserContext from '../../../UserContext';

const RequestDisplayTable = () => {
    
    // grab groupId from parameter variable
    const { groupId } = useParams();

    const { userId, fullName } = useContext(UserContext);

    const navigate = useNavigate();

    const [data, setData] = useState({
        userInfo: {},
        requests: [],
        isLoaded: false,
        userRole: ''
    });

    const getUserRole = (groupId, groupInfo) => {
        let userRole = '';
        if (!groupId || !groupInfo) return userRole;
        groupInfo.forEach((group) => {
            if (group.groupId === groupId) {
                userRole = group.userRole;
            }
        });
        return userRole;
    }

    useEffect(() => {
        async function fetchData() {
            const [userInfo, requests] = await Promise.all([
                CaregiverApi.getUserInfo(userId),
                CaregiverApi.findAllRequestsForOneGroup(groupId)
            ]);
            setData({
                userInfo,
                requests,
                isLoaded: true,
                userRole: getUserRole(groupId, userInfo.groupInfo)
            });
        }
        fetchData();
    }, [userId, groupId]);

    // gets the index of the targeted request from the data.requests array
    // this index will be used to update state in the handleSignUpButton function below
    const getRequestIndex = (requestId) => {
        let requestIndex = -1;
        for (let i = 0; i < data.requests.length; i++) {
            if (data.requests[i]._id === requestId) {
                requestIndex = i;
            }
        }
        return requestIndex;
    }

    const handleEditButton = (requestId) => {
        navigate(`/groups/${groupId}/request/edit`, {state: {requestId: requestId}});
    }

    const handleDeleteButton = (requestId) => {
        CaregiverApi.deleteOneRequest(requestId);
        removeFromDom(requestId);
    }

    const handleSignUpButton = (requestId) => {
        // get the index of the request to sign up for
        const targetRequestIndex = getRequestIndex(requestId);
        // use the index to isolate the request in the data.requests array
        const targetRequest = data.requests[targetRequestIndex];
        // make a copy of the request and add the "assignedTo" info
        const updatedRequest = { ...targetRequest, assignedTo: { ...targetRequest.assignedTo, userId: userId, fullName: fullName }};
        // make a new data object by inserting the updated request into the data.requests array
        const newData = { 
            ...data, 
            requests: [ 
                ...data.requests.slice(0, targetRequestIndex), 
                updatedRequest, 
                ...data.requests.slice(targetRequestIndex + 1)]
        };
        // update state
        setData(newData);
        CaregiverApi.updateOneRequest(requestId, updatedRequest);
    }

    // removes the deleted request from the DOM while the database is called to delete the entry
    const removeFromDom = (requestId) => {
        setData({ ...data, requests: data.requests.filter(request => request._id !== requestId)});
    }

    const formatDate = (isoString) => {
        const dateObject = new Date(isoString);
        return dateObject.toLocaleDateString({}, {day: '2-digit', month: '2-digit', year: '2-digit'})
    }

    const formatTime = (isoString) => {
        const dateObject = new Date(isoString);
        return dateObject.toLocaleTimeString({}, {hour: 'numeric', minute: '2-digit'});
    }

    /* 
    Checks if a given request is in the future. Needed for determining whether
    or not to allow a user to sign up for a request or edit a request.
    */
    const isFutureRequest = (isoString) => {
        const requestDateTimeValue = new Date(isoString).valueOf();
        const currentDateTimeValue = Date.now();
        if (requestDateTimeValue > currentDateTimeValue) return true;
        return false;
    }

    return (
        <>
            {data.isLoaded && (
                <table>
                    <thead>
                        <tr>
                            <td>Date Needed</td>
                            <td>Time Needed</td>
                            <td>Category</td>
                            <td>Description</td>
                            <td>Assigned To</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.requests.map((request, index) => {
                            return(
                                <tr key={index}>
                                    <td>{formatDate(request.dateTimeUTC)}</td>
                                    <td>{formatTime(request.dateTimeUTC)}</td>
                                    <td>{request.category}</td>
                                    <td>{request.description}</td>
                                    {request.assignedTo ? 
                                        <td>{request.assignedTo.fullName}</td> :
                                        <td></td>
                                    }
                                    {(!request.assignedTo.userId && isFutureRequest(request.dateTimeUTC) && data.userRole === 'support') ? 
                                        <td><button onClick={e => handleSignUpButton(request._id)}>Sign Up!</button></td> :
                                        <></>
                                    }
                                    {(data.userRole === 'caregiver' && isFutureRequest(request.dateTimeUTC)) ?
                                        <td>
                                            <button onClick={e => handleEditButton(request._id)}>Edit</button>
                                            <button onClick={e => handleDeleteButton(request._id)}>Delete</button>
                                        </td> :
                                        <></>
                                    }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default RequestDisplayTable