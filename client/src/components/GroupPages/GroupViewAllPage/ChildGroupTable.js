import React, {useState, useEffect} from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import CaregiverApi from '../../../api';
import axios from 'axios';


const ChildGroupTable = ({groups}) => {

    const navigate = useNavigate();

    // add hasGroups
    const hasGroups = groups.length >= 1 ? true : false;

    return (
        <table className="mx-[300px] my-[50px]">
            <tbody>
                {hasGroups && groups.map((group, index) => (
                    <tr className="border-b-[2px] border-gray-300" key={index}>
                        <td className="mb-[25px]">
                            <p className="rounded-[12px] py-[12px] px-[35px] bg-light-mint text-[75px] text-dark-green my-[25px] mr-[25px]">{Array.from(group.namePatient)[0]}</p>
                        </td>
                        <td className="w-screen">
                            <div className="flex justify-between">
                                <h2 className="text-[20px]">{group.namePatient}</h2>
                                <button className="rounded-[12px] py-[5px] px-[35px] bg-dark-green text-white" onClick={ () => navigate("/GroupViewSingle/" + group._id ) }>See More</button>
                            </div>
                            <h2 className="flex mb-[10px] text-[18px]"> <i>Caregiver: {group.nameCaregiver}</i> </h2>
                            <p className="flex text-left text-black mb-[25px]">{group.description}</p>
                        </td>
                    </tr>
                ))}
                {!hasGroups && 
                    <tr>
                        <div> Not a member of any groups.  Go to <Link to='/groupviewall'><i><b>All Groups</b></i></Link> or create a new one.</div>
                    </tr>
                }
            </tbody>
        </table>
    );
}

export default ChildGroupTable;