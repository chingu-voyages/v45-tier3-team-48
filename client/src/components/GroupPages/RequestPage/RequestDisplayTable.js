import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CaregiverApi from '../../../api';
import UserContext from '../../../UserContext';

const RequestDisplayTable = (props) => {
    
    const { groupId } = useParams();
    const { userId, fullName, token } = useContext(UserContext);
    const { userRole, requests, setRequests } = props;
    const navigate = useNavigate();

    // prevents users not logged in from viewing page
    useEffect(() => {
        if(!token){
            navigate('/')
            return;
        } 
        // eslint-disable-next-line
    }, [])

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
                <div className="container overflow-x-auto">
                    <table className="table table-auto mx-auto w-[710px] sm:w-[860px] text-start">
                        <thead className="text-gray-500 text-base font-semibold">
                            <tr>
                                <td className="p-[12px]">Date</td>
                                <td className="p-[12px]">Time</td>
                                <td className="hidden sm:table-cell p-[12px]">Category</td>
                                <td className="p-[12px]">Description</td>
                                <td className="p-[12px]">Assigned To</td>
                                <td className="p-[12px]">Actions</td>
                            </tr>
                        </thead>
                        <tbody className="text-gray-500 text-base font-normal">
                            {requests.map((request, index) => {
                                return(
                                    <tr key={index} className="border-y border-gray-400 align-middle">
                                        <td className="p-[12px]">{formatDate(request.dateTimeUTC)}</td>
                                        <td className="p-[12px] whitespace-nowrap">{formatTime(request.dateTimeUTC)}</td>
                                        <td className="hidden sm:table-cell p-[12px]">{request.category}</td>
                                        <td className="p-[12px]">{request.description}</td>
                                        {request.assignedTo ? 
                                            <td className="p-[12px] whitespace-nowrap">{request.assignedTo.fullName}</td> :
                                            <td className="p-[12px]"></td>
                                        }
                                        {(!request.assignedTo.userId && isFutureRequest(request.dateTimeUTC) && userRole === 'Support') ? 
                                            <td className="px-[12px] py-2"><button className="px-[12px] py-[6px] rounded-[12px] bg-dark-green text-white cursor-pointer" onClick={e => handleSignUpButton(request._id)}>Sign Up!</button></td> :
                                            <></>
                                        }
                                        {(userRole === 'Caregiver' && isFutureRequest(request.dateTimeUTC)) ?
                                            <td className="py-4 px-[12px] flex flex-row justify-around align-middle">
                                                {/* Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                                                <button onClick={e => handleEditButton(request._id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-slate-500 h-4 w-4"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg></button>
                                                
                                                {/* Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                                                <button onClick={e => handleDeleteButton(request._id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="fill-slate-500 h-4 w-4"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
                                            </td> :
                                            <></>
                                        }
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                :
                <></>
            }
        </>
    );
};

export default RequestDisplayTable;