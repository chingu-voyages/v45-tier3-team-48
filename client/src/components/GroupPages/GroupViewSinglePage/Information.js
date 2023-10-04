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
    const { userId, groupInfo, setGroupInfo } = useContext(UserContext);
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
                    {/* <div style={{width: 1101, height: 228, left: 169, top: 154, position: 'absolute'}}>
                        <div style={{width: 1101, height: 0, left: 0, top: 228, position: 'absolute', border: '4px #D1D5DB solid'}}></div>
                        <div style={{left: 214, top: 0, position: 'absolute', color: 'black', fontSize: 36, fontFamily: 'Open Sans', fontWeight: '600', lineHeight: 40, wordWrap: 'break-word'}}>Jane Smith</div>
                        <div style={{left: 214, top: 73, position: 'absolute', color: 'black', fontSize: 18, fontFamily: 'Open Sans', fontStyle: 'italic', fontWeight: '600', lineHeight: 28, wordWrap: 'break-word'}}>Caregiver:</div>
                        <div style={{left: 214, top: 117, position: 'absolute', color: 'black', fontSize: 18, fontFamily: 'Open Sans', fontStyle: 'italic', fontWeight: '600', lineHeight: 28, wordWrap: 'break-word'}}>Description:</div>
                        <div style={{width: 764, height: 41, left: 337, top: 125, position: 'absolute', color: 'black', fontSize: 18, fontFamily: 'Open Sans', fontWeight: '400', lineHeight: 28, wordWrap: 'break-word'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et dictum nibh. Cas laoreet arcu. Nulla sed commodo velit, luctus velit. Pellentesque elemenm.</div>
                        <div style={{left: 337, top: 73, position: 'absolute', color: 'black', fontSize: 18, fontFamily: 'Open Sans', fontWeight: '400', lineHeight: 28, wordWrap: 'break-word'}}>John Doe</div>
                        <div style={{width: 205, height: 58, left: 896, top: 0, position: 'absolute'}}>
                            <div style={{width: 205, height: 58, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 125, border: '2px #638262 solid'}} />
                            <div style={{width: 123.58, height: 26, left: 40.71, top: 16, position: 'absolute', textAlign: 'center', color: '#638262', fontSize: 20, fontFamily: 'Open Sans', fontWeight: '400', lineHeight: 28, wordWrap: 'break-word'}}>Edit Details</div>
                        </div>
                    </div> */}
{/* border-t-2 border-gray-300 border-b-2 lg:border-b-0 py-10 */}
                    <div className="border-t-2 border-gray-300 border-b-2 lg:border-b-0 py-10">
                        <div className="flex justify-center ">
                            <img className="w-[140px] xs:w-[170px] sm:w-[200px]" src="https://images.unsplash.com/photo-1548536646-b8bebe870011?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"/>
                        </div>
                        <div style={{color: 'black', fontSize: 36, fontFamily: 'Open Sans', fontWeight: '600', wordWrap: 'break-word'}}>{groupData.namePatient}</div>
                        {/* cgiver/des */}
                        <div className=''>
                            <div className="font-normal px-5 text-lg [font-family:'Open_Sans'] text-left"><span className='font-semibold italic'>Caregiver:  </span>{groupData.nameCaregiver}</div>
                            <div className="font-normal px-5 text-lg [font-family:'Open_Sans'] text-left"><span className='font-semibold italic'>Description:  </span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et dictum nibh. Cas laoreet arcu. Nulla sed commodo velit, luctus velit. Pellentesque elemenm.</div>
                        </div>
                        <div className='pt-2'>
                            <button className="border-[2px] rounded-[125px] py-[8px] px-[15px] md:py-[15px] md:px-[35px] border-dark-green bg-gray-50 text-dark-green hover:bg-dark-green hover:text-white transition-color duration-300">Edit Group Details</button>
                        </div>
                    </div>
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