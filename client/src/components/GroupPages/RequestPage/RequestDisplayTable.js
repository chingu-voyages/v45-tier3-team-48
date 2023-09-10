import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CaregiverApi from '../../../api';
import UserContext from '../../../UserContext';

const RequestDisplayTable = () => {
    
    // grab groupId from parameter variable
    const { groupId } = useParams();

    const { userId } = useContext(UserContext);

    const [userInfo, setUserInfo] = useState({})

    const [requests, setRequests] = useState();

    const [isLoaded, setIsLoaded] = useState(false);

    const userRole = 'caregiver';

    useEffect(() => {
        async function getRequests(groupId) {
            let res = await CaregiverApi.findAllRequestsForOneGroup(groupId);
            setRequests(res);
            setIsLoaded(true);
        }
        // TODO Add function to load user info to get user's auth level for this group
        getRequests(groupId);
    }, [groupId]);

    const formatDate = (isoString) => {
        const dateObject = new Date(isoString);
        return dateObject.toLocaleDateString({}, {day: '2-digit', month: '2-digit', year: '2-digit'})
    }

    const formatTime = (isoString) => {
        const dateObject = new Date(isoString);
        return dateObject.toLocaleTimeString({}, {hour: 'numeric', minute: '2-digit'});
    }

    return (
        <>
            {isLoaded && (
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
                                    {/* TODO Add condition that checks if the request has already been assigned */}
                                    {(userRole === 'support') ? 
                                        <td><button>Sign Up!</button></td> :
                                        <></>
                                    }
                                    {(userRole === 'caregiver') ?
                                        <td>
                                            <button>Edit</button>
                                            <button>Delete</button>
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