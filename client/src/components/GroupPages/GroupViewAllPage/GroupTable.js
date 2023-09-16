import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import CaregiverApi from '../../../api';
import axios from 'axios';

const GroupTable = ( ) => {
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();

    const fetchData = () => {
        CaregiverApi.getAllGroup()
        .then(data => setGroups(data));
    }

    useEffect(() => {
        fetchData();
    }, []);
    //align button and text
    //get bg color to fill space under the table
    return (
        <div class="font-general bg-gray-50 h-max w-full pt-[50px]">
            <div class="flex justify-between items-center mx-[150px] pb-[50px] border-b-[4px] border-gray-300">
                <h2 class="text-[30px]">All Groups</h2>
                <button class="border-[2px] rounded-[125px] py-[15px] px-[35px] border-dark-green bg-gray-50 text-dark-green hover:bg-dark-green hover:text-white transition-color duration-300" onClick={ () => navigate("/GroupCreation") }>
                    Create new group
                </button>
            </div>
            <table class="mx-[300px] my-[50px]">
                <tbody>
                    {groups.map((group, index) => (
                        <tr class="border-b-[2px] border-gray-300" key={index}>
                            <td class="mb-[25px]">
                                <p class="rounded-[12px] py-[12px] px-[35px] bg-light-mint text-[75px] text-dark-green my-[25px] mr-[25px]">{Array.from(group.namePatient)[0]}</p>
                            </td>
                            <td>
                                <div class="flex justify-between">
                                    <h2 class="text-[20px]">{group.namePatient}</h2>
                                    <button class="rounded-[12px] py-[5px] px-[35px] bg-dark-green text-white" onClick={ () => navigate("/GroupViewSingle/" + group._id ) }>See More</button>
                                </div>
                                <h2 class="flex mb-[10px] text-[18px]"> <i>Caregiver: {group.nameCaregiver}</i> </h2>
                                <p class="flex text-left text-black mb-[25px]">{group.description}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GroupTable;