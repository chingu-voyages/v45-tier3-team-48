import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import CaregiverApi from '../../../api';
import axios from 'axios';


const ChildGroupTable = ({groups}) => {

    const navigate = useNavigate();

    return (
            <table>
                <tbody>
                    {groups.map((group, index) => (
                        <tr key={index}>
                            <td>{group.namePatient}</td>
                            <td>{group.nameCaregiver}</td>
                            <td>{group.description}</td>
                            <div>
                                <button onClick={ () => navigate("/GroupViewSingle/" + group._id ) }>See More</button>
                            </div>        
                        </tr>
                    ))}
                </tbody>
            </table>
    );
}

export default ChildGroupTable;