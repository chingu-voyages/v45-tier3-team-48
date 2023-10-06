import React from 'react';
import { useNavigate, Link } from "react-router-dom";


const ChildGroupTable = ({groups}) => {

    const navigate = useNavigate();

    // add hasGroups
    const hasGroups = groups.length >= 1 ? true : false;
//mx-[300px] or mx-auto
    return (
        <table className="container max-w-screen-md mx-auto md:my-[50px]">
            <tbody>
                {hasGroups && groups.map((group, index) => (
                    <tr className="border-b-[2px] border-gray-300" key={index}>
                        <td className="mb-[25px] pl-6">
                            <p className="rounded-[12px] py-[16px] px-[28px] md:py-[12px] md:px-[35px] bg-light-mint text-[25px] md:text-[75px] text-dark-green my-[25px] mr-[25px]">{Array.from(group.namePatient)[0]}</p>
                        </td>
                        <td className="w-screen pr-6">
                            <div className="flex justify-between">
                                <h2 className="text-[16px] md:text-[20px]">{group.namePatient}</h2>
                                <button className="rounded-[12px] py-[3px] px-[20px] md:py-[5px] md:px-[35px] bg-dark-green text-white" onClick={ () => navigate("/GroupViewSingle/" + group._id ) }>See More</button>
                            </div>
                            <h2 className="flex mb-[10px] text-[14px] md:text-[18px]"> <i>Caregiver: {group.nameCaregiver}</i> </h2>
                            <p className="flex text-left text-black mb-[25px] hidden md:block">{group.description}</p>
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