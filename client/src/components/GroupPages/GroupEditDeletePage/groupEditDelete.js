import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import CaregiverApi from '../../../api';
import axios from 'axios';

function GroupEditDelete() {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        patientName: "",
        description: ""
    });

    function groupDelete() {
        try{
            CaregiverApi.deleteGroup( {group_id: groupId} )
            .then(setTimeout( () => navigate("/groupViewAll"), 1500) ); //navigated before database is updated so added 1.5 sec delay
        } catch(err) {
            console.error(err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            CaregiverApi.editGroup( {group_id: groupId, patientName: formData.patientName, description: formData.description} )
            .then(setTimeout( () => navigate("/GroupViewSingle/" + groupId), 1500) ); //navigated before database is updated so added 1.5 sec delay
        } catch(err) {
            console.error(err);
        }
    };

    useEffect(() => {
        async function fetchGroupInfo() {
            let res = await CaregiverApi.getIndividualGroup( {group_id: groupId} );
            setFormData({patientName: res.namePatient, description: res.description});
        }
        fetchGroupInfo();
    }, []);

    return (
        <div className="flex justify-center font-general bg-gray-50 h-max w-full pt-40 pb-80">
            <form className="container mx-4 px-2 max-w-lg md:bg-white md:border-[2px] rounded-[10px] border-gray-300" onSubmit={handleSubmit}>
                <button className="flex mt-[20px] md:px-6 text-left" onClick={ () => navigate("/GroupViewSingle/" + groupId) }>&lt; Back</button>
                <div className="flex flex-col items-center">
                    <h2 className="text-[22px] mb-[18px] font-semibold">Edit group details</h2>
                    <input size="40" className="container max-w-md border-2 rounded-[5px] border-gray-300 outline outline-0 py-[10px] px-[20px] mb-[18px]" type="text" onChange={ (e) => setFormData({...formData, patientName: e.target.value})} value={formData.patientName} placeholder="Patient's Name" required/>
                    <div className="container max-w-md bg-white border-2 rounded-[5px] border-gray-300 mb-[28px]">
                        <textarea rows="4" className="container max-w-md outline outline-0 py-[12px] px-[20px] resize-none" maxLength="500" type="text" onChange={ (e) => setFormData({...formData, description: e.target.value})} value={formData.description} placeholder="Description" required/>
                        <p className="text-[12px] text-gray-400 text-right pb-[4px] pr-[6px]">{formData.description.length} / 500</p>
                    </div>
                </div>
                <div className="flex flex-col py-[5px] md:px-6 float-right">
                    <button className="rounded-[12px] py-[5px] px-[35px] mb-[12px] bg-dark-green text-white font-semibold" type="submit">Update Group</button>
                    <button className="rounded-[12px] py-[5px] px-[35px] mb-[30px] bg-red-800 text-white font-semibold" onClick={ () => groupDelete() }>Delete Group</button>
                </div>
            </form>
        </div>
    );
};

export default GroupEditDelete;