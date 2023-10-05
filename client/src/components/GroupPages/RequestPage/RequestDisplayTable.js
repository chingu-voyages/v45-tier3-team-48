import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CaregiverApi from '../../../api';
import UserContext from '../../../UserContext';

const RequestDisplayTable = (props) => {
    
    const { groupId } = useParams();
    const { userId, fullName, token } = useContext(UserContext);
    const { userRole, requests, setRequests } = props;
    const navigate = useNavigate();

    // prevents users not logged in from viewing page
    if(!token){
        navigate('/')
        return;
    } 

    /*
    gets the index of the targeted request from the requests array. this index will be used to update state in the handleSignUpButton function below
    */
    const getRequestIndex = (requestId) => {
        let requestIndex = -1;
        for (let i = 0; i < requests.length; i++) {
            if (requests[i]._id === requestId) {
                requestIndex = i;
            }
        }
        return requestIndex;
    }

    const handleEditButton = (requestId) => {
        navigate(`/groups/${groupId}/request/edit`, {state: {requestId: requestId}});
    }

    const handleDeleteButton = (requestId) => {
        removeFromDom(requestId);
        CaregiverApi.deleteOneRequest(requestId);
    }

    const handleSignUpButton = (requestId) => {
        // get the index of the request to sign up for
        const targetRequestIndex = getRequestIndex(requestId);
        // make a copy of the target request and update the "assignedTo" info
        const updatedRequest = { ...requests[targetRequestIndex], assignedTo: { userId: userId, fullName: fullName }};
        // make a copy of the current requests array
        const updatedRequests = [...requests];
        // update the array at the target index with the new request information
        updatedRequests[targetRequestIndex] = updatedRequest;
        // update state with the updated requests array
        setRequests(updatedRequests);
        CaregiverApi.updateOneRequest(requestId, updatedRequest);
    }

    // removes the deleted request from the DOM while the database is called to delete the entry
    const removeFromDom = (requestId) => {
        setRequests((prevRequests) => prevRequests.filter(request => request._id !== requestId));
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
            {(requests && requests.length > 0) ? 
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
                        {requests.map((request, index) => {
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
                                    {(!request.assignedTo.userId && isFutureRequest(request.dateTimeUTC) && userRole === 'Support') ? 
                                        <td><button onClick={e => handleSignUpButton(request._id)}>Sign Up!</button></td> :
                                        <></>
                                    }
                                    {(userRole === 'Caregiver' && isFutureRequest(request.dateTimeUTC)) ?
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
                :
                <></>
            }
        </>
    );
};

export default RequestDisplayTable;