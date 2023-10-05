import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from '../../../UserContext';
import CaregiverApi from '../../../api';

function GroupForm() {
    const { userId, fullName, groupInfo, setGroupInfo, token } = useContext(UserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        patientName: "",
        description: ""
    });

    // prevents users not logged in from viewing page
    if(!token){
        navigate('/')
        return;
    } 

    const handleSubmit = async e => {
        e.preventDefault();
        let res = await CaregiverApi.createGroup( {user_id: userId, user_fullName: fullName, patientName: formData.patientName, description: formData.description} )
        const groupId = res;
        const updatedGroupInfo = [ ...groupInfo, { _id: groupId, userRole: "Caregiver"} ];
        setGroupInfo(updatedGroupInfo);
        navigate("/groupViewSingle/" + groupId);
    };

    return (
        <div className="flex justify-center font-general bg-gray-50 h-max w-full pt-40 pb-80">
            <form className="container mx-4 px-2 max-w-lg md:bg-white md:border-[2px] rounded-[10px] border-gray-300" onSubmit={handleSubmit}>
                <button className="flex mt-[20px] md:px-6 flex-left" onClick={ () => navigate("/GroupViewAll") }>&lt; Back</button>
                <div className="flex flex-col items-center">
                    <h2 className="text-[22px] mb-[18px] font-semibold">Create a new group</h2>
                    <input size="40" className="container max-w-md border-2 rounded-[5px] border-gray-300 outline outline-0 py-[10px] px-[20px] mb-[18px]" type="text" onChange={ (e) => setFormData({...formData, patientName: e.target.value})} value={formData.patientName} placeholder="Patient's Name" required/>
                    <div className="container max-w-md bg-white border-2 rounded-[5px] border-gray-300 mb-[28px]">
                        <textarea rows="4" className="container max-w-md outline outline-0 py-[12px] px-[20px] resize-none" maxLength="500" type="text" onChange={ (e) => setFormData({...formData, description: e.target.value})} value={formData.description} placeholder="Describe the Purpose of the Group" required/>
                        <p className="text-[12px] text-gray-400 text-right pb-[4px] pr-[6px]">{formData.description.length} / 500</p>
                    </div>
                </div>
                <div className="py-[5px] md:px-6 float-right">
                    <div/>
                    <button className="rounded-[12px] py-[5px] px-[35px] mb-[12px] bg-dark-green text-white font-semibold" type="submit">Create Group</button>
                </div>
            </form>
        </div>
    );
};

export default GroupForm;