import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import CaregiverApi from '../../../api';
import { DateTime } from 'luxon';
import UserContext from '../../../UserContext';

const RequestEdit = (props) => {
    
    // grab the group id from the parameter variable
    const { groupId } = useParams();
    const { token } = useContext(UserContext);


    // grab the requestId from location state
    const location = useLocation();
    const requestId = token ? location.state.requestId: null;

    const navigate = useNavigate();

    const [data, setData] = useState({
        hasError: false,
        errorMessage: [],
        requestData: {},
        isLoaded: false
    });

    // create currentDate variable to use as the minimum value for the date input
    const currentDate = DateTime.now() // create DateTime object
        .setZone('America/New_York') // set DateTime object to 'America/New_York' time zone
        .toString() // convert DateTime object to a string
        .split('T')[0]; // split the string at the letter 'T' and return the 0th index of the resulting string array, which is the date

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
    
    useEffect(() => {
        // redirect user if not logged in
        if(!token){
            navigate('/')
          }

        async function fetchData() {
            const res = await CaregiverApi.findOneRequest(requestId);
            setData({
                hasError: false,
                errorMessage: [],
                requestData: res,
                isLoaded: true
            });
        }
        fetchData();
    }, [requestId, token]);



     // check if request data is valid
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
            (requestData.description === '-select-') |
            (requestData.description.length > 100) |
            !requestData.category
        )
            return false;
        return true;
    };

    const handleChange = e => {
        setData({ ...data, requestData: { ...data.requestData, [e.target.name]: e.target.value}})
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const { dateNeeded, timeNeeded } = data.requestData;
        const dateTimeUTC = createDateTimeUTC(dateNeeded, timeNeeded);
        // creating updated data object
        const updatedRequestData = { ...data, requestData: { ...data.requestData, dateTimeUTC: dateTimeUTC }};
        // setting updated request data object in state
        setData(updatedRequestData);
        const res = await CaregiverApi.updateOneRequest(requestId, updatedRequestData.requestData);
        if (typeof res.error === 'undefined') {
            navigate(`/groupViewSingle/${groupId}`);
        } else {
            setData({ ...data, hasError: true, errorMessage: res.error.message});
            console.log(data.errorMessage);
        }
    }

    
    return (
        <>
            {data.isLoaded && (
                <div className="sm:container sm:max-w-[527px] mx-auto sm:border sm:border-slate-300 sm:mt-[162px] sm:mb-[192px]">
                    <div className="bg-white py-[40px] px-[40px]">
                        <div className="grid justify-items-start">
                            <Link to={`/groupViewSingle/${groupId}`}>&#60; Back</Link>
                        </div>
                        <h1 className="mt-[10px] mb-[30px] text-center text-black text-2xl font-semibold">Edit Your Request</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <select name="category" id="category" onChange={handleChange} className={`py-[13px] px-[20px] mb-[10px] w-full rounded-[5px] border border-slate-300 ${data.requestData.category !== '' ? 'text-black' : 'text-slate-400' }`} value={data.requestData.category} >
                                    <option value="">Select a Category</option>
                                    <option value="Errands">Errands</option>
                                    <option value="Groceries">Groceries</option>
                                    <option value="Home Repairs">Home Repairs</option>
                                    <option value="Housekeeping">Housekeeping</option>
                                    <option value="Meals">Meals</option>
                                    <option value="Pet Care">Pet Care</option>
                                    <option value="Respite Care">Respite Care</option>
                                    <option value="Tech Support">Tech Support</option>
                                    <option value="Transportation">Transportation</option>
                                    <option value="Yard/Garden">Yard/Garden</option>
                                    <option value="Other">Other</option>
                                </select>
                                
                                {/* message for unselected category */}
                                {!data.requestData.category ? (
                                    <p className="px-[20px] text-left text-red-600 mb-[10px]">Category is required.</p>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div>
                                <input type="text" name="description" className="py-[13px] px-[20px] my-[10px] w-full rounded-[5px] border border-slate-300" placeholder='Description' value={data.requestData.description} onChange={handleChange}></input>
        
                                {/* message for a missing description */}
                                {!data.requestData.description ? (
                                    <p className="px-[20px] text-left text-red-600 mb-[10px]">Description is required.</p>
                                ) : (
                                    ''
                                )}
        
                                {/* message for a description that is too long */}
                                {data.requestData.description &&
                                data.requestData.description.length > 100 ? (
                                    <p className="px-[20px] text-left text-red-600 mb-[10px]">
                                        Description must not exceed 100 characters.
                                    </p>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div>
                                <input type="date" name="dateNeeded" className={`py-[13px] px-[20px] my-[10px] w-full rounded-[5px] border border-slate-300 ${data.requestData.dateNeeded !== '' ? 'text-black' : 'text-slate-400' }`} min={currentDate} value={data.requestData.dateNeeded} onChange={handleChange}></input>
        
                                {/* message for empty date */}
                                {!data.requestData.dateNeeded ? (
                                    <p className="px-[20px] text-left text-red-600 mb-[10px]">Date is required.</p>
                                ) : (
                                    ''
                                )}
                                
                                {/* message for invalid date */}
                                {data.requestData.dateNeeded &&
                                !isValidDate(data.requestData.dateNeeded) ? (
                                    <p className="px-[20px] text-left text-red-600 mb-[10px]">Please enter a valid date.</p>
                                ) : (
                                    ''
                                )}
        
                                {/* message for a date in the past */}
                                {data.requestData.dateNeeded &&
                                !isFutureDate(data.requestData.dateNeeded) ? (
                                    <p className="px-[20px] text-left text-red-600 mb-[10px]">Please enter a date in the future.</p>
                                ) : (
                                    ''
                                )}
        
                                {/* message for a date past the 21st century */}
                                {data.requestData.dateNeeded &&
                                !isDateThisCentury(data.requestData.dateNeeded) ? (
                                    <p className="px-[20px] text-left text-red-600 mb-[10px]">Please enter a date in the current century.</p>
                                ) : (
                                    ''
                                )}
        
                                <input type="time" name="timeNeeded" className={`py-[13px] px-[20px] my-[10px] w-full rounded-[5px] border border-slate-300 ${data.requestData.dateNeeded !== '' ? 'text-black' : 'text-slate-400' }`} value={data.requestData.timeNeeded} onChange={handleChange}
                                ></input>
        
                                {/* validation message */}
                                {!data.requestData.timeNeeded ? (
                                    <p className="px-[20px] text-left text-red-600 mb-[10px]">Time is required.</p>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="grid justify-items-end">
                                {isRequestDataValid(data.requestData) ? (
                                    <input type="submit" value="SUBMIT" className="py-[12px] px-[35px] mt-[30px] rounded-[12px] bg-dark-green text-white cursor-pointer"></input>
                                ) : (
                                    <input type="submit" value="SUBMIT" className="py-[12px] px-[35px] mt-[30px] rounded-[12px] bg-slate-300 text-white" disabled></input>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default RequestEdit