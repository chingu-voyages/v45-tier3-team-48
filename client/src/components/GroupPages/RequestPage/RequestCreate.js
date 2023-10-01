import React, { useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import UserContext from '../../../UserContext';
import CaregiverApi from '../../../api';

const RequestCreate = () => {
    // grab the group id from the parameter variable
    const { groupId } = useParams();

    const navigate = useNavigate();

    const { userId, fullName } = useContext(UserContext);

    const [hasError, setHasError] = useState(false);

    const [errorMessage, setErrorMessage] = useState();

    const INITIAL_STATE = {
        groupId: groupId,
        dateNeeded: '',
        timeNeeded: '',
        dateTimeUTC: '',
        description: '',
        category: '',
        createdBy: { userId: userId, fullName: fullName },
        assignedTo: { userId: '', fullName: ''},
    };
    
    const [requestData, setRequestData] = useState(INITIAL_STATE);
    
    const isValidDate = (dateString) => {
        return !isNaN(new Date(dateString));
    }
    
    const isFutureDate = (dateString) => {
        const currentDate = new Date();
        const inputDate = new Date(dateString);
        return inputDate > currentDate;
    }

    const isDateThisCentury = (dateString) => {
        const upperLimitDate = new Date('2099-12-31T23:59:59-05:00');
        const inputDate = new Date(dateString);
        return inputDate < upperLimitDate;
    }

    // check if request data is valid
    const isRequestDataValid = requestData => {
        const dateNeeded = requestData.dateNeeded;
        const timeNeeded = requestData.timeNeeded;
        if (
            !dateNeeded |
            !isValidDate(dateNeeded) |
            !isFutureDate(dateNeeded) |
            !isDateThisCentury(dateNeeded) |
            !timeNeeded |
            !requestData.description |
            (requestData.description === ' Select a Category ') |
            (requestData.description.length > 100) |
            !requestData.category
        )
            return false;
        return true;
    };

    // arrow expression to generate date-time string from date and time inputs
    const createDateTimeUTC = (dateNeeded, timeNeeded) => {
        // convert date and time to ISO string: 'YYYY-MM-DDT00:00:00'
        let localTimeStamp = dateNeeded + 'T' + timeNeeded + ':00';
        // create ISO string with offset for 'America/New_York' time zone
        let localTimeStampWithTimeZone = DateTime.fromISO(localTimeStamp, {
            zone: 'America/New_York',
        }).toString();
        // create UTC Date object from updated ISO string
        let dateObject = new Date(localTimeStampWithTimeZone);
        // convert UTC Date object to ISO string: 'YYYY-MM-DDT00:00:00.000Z'
        let dateTimeString = dateObject.toISOString();
        // update state in requestData object
        return dateTimeString;
    };

    // create currentDate variable to use as the minimum value for the date input
    const currentDate = DateTime.now() // create DateTime object
        .setZone('America/New_York') // set DateTime object to 'America/New_York' time zone
        .toString() // convert DateTime object to a string
        .split('T')[0]; // split the string at the letter 'T' and return the 0th index of the resulting string array, which is the date

    const handleSubmit = async e => {
        e.preventDefault();
        const { dateNeeded, timeNeeded } = requestData;
        const dateTimeUTC = createDateTimeUTC(dateNeeded, timeNeeded);
        const updatedRequestData = { ...requestData, dateTimeUTC: dateTimeUTC };
        let res = await CaregiverApi.createRequest(updatedRequestData);
        if (typeof res.error === 'undefined') {
            setRequestData(INITIAL_STATE);
            navigate(`/groupViewSingle/${groupId}`);
        } else {
            setHasError(true);
            setErrorMessage(res.error.message);
            console.log(errorMessage);
        }
    };

    const handleChange = e => {
        setRequestData({ ...requestData, [e.target.name]: e.target.value });
    };

    return (
        <div className="sm:container sm:max-w-[527px] mx-auto sm:border sm:border-slate-300 sm:mt-[162px] sm:mb-[192px]">
            <div className="bg-white py-[40px] px-[40px]">
                <div className="grid justify-items-start">
                    <Link to={`/groupViewSingle/${groupId}`}>&#60; Back</Link>
                </div>
                {hasError && <p>Error: {errorMessage}</p>}
                <h1 className="mt-[10px] mb-[30px] text-center text-black text-2xl font-semibold">Add a Request</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <select name="category" id="category" defaultValue={''} onChange={handleChange} className={`py-[13px] px-[20px] mb-[10px] w-full rounded-[5px] border border-slate-300 ${requestData.category !== '' ? 'text-black' : 'text-slate-400' }`} >
                            <option value="" disabled>Select a Category</option>
                            <option value="Errands">Errands</option>
                            <option value="Grocery Shopping">Grocery Shopping</option>
                            <option value="Home Repairs/Maintenance">Home Repairs/Maintenance</option>
                            <option value="Housekeeping">Housekeeping</option>
                            <option value="Meal Preparation/Delivery">Meal Preparation/Delivery</option>
                            <option value="Pet Care">Pet Care</option>
                            <option value="Respite Care">Respite Care</option>
                            <option value="Technology/Telehealth Support">Technology/Telehealth Support</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Yard/Garden Maintenance">Yard/Garden Maintenance</option>
                            <option value="Other">Other</option>
                        </select>
                        
                        {/* message for unselected category */}
                        {!requestData.category ? (
                            <p className="px-[20px] text-left text-red-600 mb-[10px]">Category is required.</p>
                        ) : (
                            ''
                        )}
                    </div>
                    <div>
                        <input type="text" name="description" className="py-[13px] px-[20px] my-[10px] w-full rounded-[5px] border border-slate-300" placeholder='Description' onChange={handleChange}></input>

                        {/* message for a missing description */}
                        {!requestData.description ? (
                            <p className="px-[20px] text-left text-red-600 mb-[10px]">Description is required.</p>
                        ) : (
                            ''
                        )}

                        {/* message for a description that is too long */}
                        {requestData.description &&
                        requestData.description.length > 100 ? (
                            <p className="px-[20px] text-left text-red-600 mb-[10px]">
                                Description must not exceed 100 characters.
                            </p>
                        ) : (
                            ''
                        )}
                    </div>
                    <div>
                        <input type="date" name="dateNeeded" className={`py-[13px] px-[20px] my-[10px] w-full rounded-[5px] border border-slate-300 ${requestData.dateNeeded !== '' ? 'text-black' : 'text-slate-400' }`} min={currentDate} onChange={handleChange}></input>

                        {/* message for empty date */}
                        {!requestData.dateNeeded ? (
                            <p className="px-[20px] text-left text-red-600 mb-[10px]">Date is required.</p>
                        ) : (
                            ''
                        )}
                        
                        {/* message for invalid date */}
                        {requestData.dateNeeded &&
                        !isValidDate(requestData.dateNeeded) ? (
                            <p className="px-[20px] text-left text-red-600 mb-[10px]">Please enter a valid date.</p>
                        ) : (
                            ''
                        )}

                        {/* message for a date in the past */}
                        {requestData.dateNeeded &&
                        !isFutureDate(requestData.dateNeeded) ? (
                            <p className="px-[20px] text-left text-red-600 mb-[10px]">Please enter a date in the future.</p>
                        ) : (
                            ''
                        )}

                        {/* message for a date past the 21st century */}
                        {requestData.dateNeeded &&
                        !isDateThisCentury(requestData.dateNeeded) ? (
                            <p className="px-[20px] text-left text-red-600 mb-[10px]">Please enter a date in the current century.</p>
                        ) : (
                            ''
                        )}

                        <input type="time" name="timeNeeded" className={`py-[13px] px-[20px] my-[10px] w-full rounded-[5px] border border-slate-300 ${requestData.dateNeeded !== '' ? 'text-black' : 'text-slate-400' }`} onChange={handleChange}
                        ></input>

                        {/* validation message */}
                        {!requestData.timeNeeded ? (
                            <p className="px-[20px] text-left text-red-600 mb-[10px]">Time is required.</p>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="grid justify-items-end">
                        {isRequestDataValid(requestData) ? (
                            <input type="submit" value="ADD" className="py-[12px] px-[35px] mt-[30px] rounded-[12px] bg-dark-green text-white cursor-pointer"></input>
                        ) : (
                            <input type="submit" value="ADD" className="py-[12px] px-[35px] mt-[30px] rounded-[12px] bg-slate-300 text-white" disabled></input>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RequestCreate;
