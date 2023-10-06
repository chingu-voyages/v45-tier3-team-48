import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import CaregiverApi from '../../../api';
import ChildGroupTable from './ChildGroupTable';

// make conditional to show only user groups or all groups

// have to handle no groups on the usersGroups page
// if '/userGroups' and groupCount = false, then show 



const GroupTable = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();


    const fetchAllGroupData = () => {
        CaregiverApi.getAllGroup()
        .then(data => {
            setGroups(data);
            setIsLoading(false);
        });
    }


    useEffect(() => {
            fetchAllGroupData();
    }, []);

    return (
        <div className="font-general bg-gray-50 h-max w-full pt-6 md:pt-12">
            <div className="container max-w-screen-xl px-6 flex justify-between items-center mx-auto pb-[50px] border-b-[4px] border-gray-300">
                <h2 className="md:text-[30px]">All Groups</h2>
                <button className="border-[2px] rounded-[125px] py-[8px] px-[15px] md:py-[15px] md:px-[35px] border-dark-green bg-gray-50 text-dark-green hover:bg-dark-green hover:text-white transition-color duration-300" onClick={ () => navigate("/GroupCreation") }>
                    Create new group
                </button>
            </div>
            {!isLoading && <ChildGroupTable groups={groups}/>}
        </div>
    );
}

export default GroupTable;