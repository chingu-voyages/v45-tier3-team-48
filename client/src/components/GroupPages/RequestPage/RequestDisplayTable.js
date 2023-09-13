import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CaregiverApi from '../../../api';
import UserContext from '../../../UserContext';

const RequestDisplayTable = () => {
    
    // grab groupId from parameter variable
    const { groupId } = useParams();

    const { userId } = useContext(UserContext);

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
                                    {/* TODO Add condition that checks if the request has already been assigned */}
                                    {(data.userRole === 'support') ? 
                                        <td><button>Sign Up!</button></td> :
                                        <></>
                                    }
                                    {(data.userRole === 'caregiver') ?
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