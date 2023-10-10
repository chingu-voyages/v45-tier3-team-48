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
    function joinGroup() {
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
                description: groupData.description,
                nameCaregiver: groupData.nameCaregiver,
                namePatient: groupData.namePatient
            }
        ];
        setGroupInfo(updatedGroupInfo);
        getUserRole(groupId, updatedGroupInfo);
    }

    useEffect(() => {
        
        // prevents users not logged in from viewing page
        if(!token){
            navigate('/')
            return;
        } 
        
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
                <div className="container mx-auto px-20 pb-20">
                    <div className='py-10' >
                        <div className="lg:relative lg:h-96 border-gray-300 border-b-2 pb-10">
                            <div className="lg:absolute lg:top-5 lg:left-0 flex justify-center ">
                                <img className="rounded-[10px] w-[140px] xs:w-[170px] sm:w-[200px]" src="https://images.unsplash.com/photo-1548536646-b8bebe870011?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" alt="Two people hugging"/>
                            </div>
                            <div className='lg:absolute lg:text-top lg:left-36 lg:top-5 text-center px-5 xs:px-20 sm:px-30' style={{color: 'black', fontSize: 36, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}>{groupData.namePatient}</div>
                            <div className='lg:absolute lg:left-36 top-24'>
                                <div className="font-normal px-5 xs:px-20 sm:px-30 text-lg [font-family:'Open_Sans'] text-left"><span className='font-semibold italic'>Caregiver:  </span>{groupData.nameCaregiver}</div>
                                <div className="font-normal px-5 xs:px-20 sm:px-30 text-lg [font-family:'Open_Sans'] text-left"><span className='font-semibold italic'>Description:  </span>{groupData.description}</div>
                            </div>
                            {(!userRole || userRole === "Caregiver") ? 
                                <button onClick={() => handleRoleButton(userRole)} className="lg:w-40 mt-[10px] lg:mt-0 lg:absolute lg:top-5 lg:right-0 border-[2px] rounded-[125px] py-[8px] px-[15px] md:py-[10px] md:px-[25px] border-dark-green bg-gray-50 text-dark-green hover:bg-dark-green hover:text-white transition-color duration-300">
                                    {roleButtonText(userRole)}
                                </button> : <></>
                            }
                            {userRole === "Caregiver" ? 
                                <button className="lg:w-40 ml-[5px] mt-[10px] lg:mt-0 lg:absolute lg:top-[75px] lg:right-0 border-[2px] rounded-[125px] py-[8px] px-[15px] md:py-[10px] md:px-[25px] border-dark-green bg-gray-50 text-dark-green hover:bg-dark-green hover:text-white transition-color duration-300" onClick={handleAddRequestButton}>
                                    Add Request
                                </button> : <></>
                            }
                        </div>
                    </div>
                    {(requests && requests.length > 0) ? 
                        <RequestDisplayTable userRole={userRole} requests={requests} setRequests={setRequests} />
                        :
                        (userRole === "Caregiver") ? 
                            <div className="mx-auto my-[20px]">
                                <p className="font-normal text-base">Click the "Add Request" button to begin adding support requests to your group.</p>
                            </div>
                             :
                            <div className="mx-auto my-[20px]">
                                <p className="font-normal text-base">No support requests yet.</p>
                            </div>
                            
                    }

                    
                </div>
            )}
        </>
    );
};

export default Information;