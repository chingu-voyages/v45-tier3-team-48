import React, {useContext} from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from '../../../UserContext';
import ChildGroupTable from './ChildGroupTable';


const UserGroups = () => {

    const { groupInfo } = useContext(UserContext);
    
    const navigate = useNavigate();

    return (
        <div className="font-general bg-gray-50 h-max w-full pt-6 md:pt-12">
            <div className="container max-w-screen-xl px-6 flex justify-between items-center mx-auto pb-[50px] border-b-[4px] border-gray-300">
                <h2 className="md:text-[30px]">My Groups</h2>
                <button className="border-[2px] rounded-[125px] py-[8px] px-[15px] md:py-[15px] md:px-[35px] border-dark-green bg-gray-50 text-dark-green hover:bg-dark-green hover:text-white transition-color duration-300" onClick={ () => navigate("/GroupCreation") }>
                    Create new group
                </button>
            </div>
            <ChildGroupTable groups={groupInfo}/>
        </div>
    );
}

export default UserGroups;