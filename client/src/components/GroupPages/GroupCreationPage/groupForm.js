import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from '../../../UserContext';
import CaregiverApi from '../../../api';
import axios from 'axios';

function GroupForm() {
    const { userId } = useContext(UserContext);
    const { fullName } = useContext(UserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        patientName: "",
        description: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        let groupId = "";
        CaregiverApi.createGroup( {user_id: userId, user_fullName: fullName, patientName: formData.patientName, description: formData.description} )
        .then(data => groupId = data)
        .then(setTimeout( () => navigate("/groupViewSingle/" + groupId), 1500) ); //navigated before database is updated so added 1.5 sec delay
    };

    return (
        <div className="flex justify-center font-general bg-gray-50 h-max w-full pt-40 pb-80">
            <form className="bg-white w-[500px] border-[2px] rounded-[10px] border-gray-300" onSubmit={handleSubmit}>
                <button className="flex mt-[20px] ml-[40px] text-left" onClick={ () => navigate("/GroupViewAll") }>&lt; Back</button>
                <h2 className="text-[22px] mb-[18px] font-semibold">Create a new group</h2>
                <input size="40" className="border-2 rounded-[5px] border-gray-300 outline outline-0 py-[10px] px-[20px] mb-[18px]" type="text" onChange={ (e) => setFormData({...formData, patientName: e.target.value})} value={formData.patientName} placeholder="Patient's Name" required/>
                <br/>
                <div className="border-2 rounded-[5px] border-gray-300 mx-[41px] mb-[28px]">
                    <textArea rows="4" cols="38" className="outline outline-0 py-[12px] px-[20px] resize-none" maxlength="500" type="text" onChange={ (e) => setFormData({...formData, description: e.target.value})} value={formData.description} placeholder="Describe the Purpose of the Group" required/>
                    <p className=" text-[12px] text-gray-400 text-right pb-[4px] pr-[6px]">{formData.description.length} / 500</p>
                </div>
                <div className="flex flex-col py-[5px] px-[40px] float-right">
                    <button className="rounded-[12px] py-[5px] px-[35px] mb-[12px] bg-dark-green text-white font-semibold" type="submit">Create Group</button>
                </div>

            </form>
        </div>
    );
};

export default GroupForm;