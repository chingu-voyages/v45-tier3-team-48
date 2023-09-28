import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import UserContext from '../../../UserContext';
import CaregiverApi from '../../../api';
import { DateTime } from 'luxon';

const RequestEdit = (props) => {
    
    // grab the group id from the parameter variable
    const { groupId } = useParams();

    // grab the requestId from location state
    const location = useLocation();
    const requestId = location.state.requestId;

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
    }, [requestId]);

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
                <div>
                    {data.hasError && <p>Error: {data.errorMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="dateNeeded">Date Needed:</label>
                            <input
                                type="date"
                                name="dateNeeded"
                                id="dateNeeded"
                                min={currentDate}
                                onChange={handleChange}
                                value={data.requestData.dateNeeded}
                            ></input>

                            {/* message for empty date */}
                            {!data.requestData.dateNeeded ? (
                                <p>Date is required</p>
                            ) : (
                                ''
                            )}
                            
                            {/* message for invalid date */}
                            {data.requestData.dateNeeded &&
                            !isValidDate(data.requestData.dateNeeded) ? (
                                <p>Please enter a valid date</p>
                            ) : (
                                ''
                            )}

                            {/* message for a date in the past */}
                            {data.requestData.dateNeeded &&
                            !isFutureDate(data.requestData.dateNeeded) ? (
                                <p>Please enter a date in the future</p>
                            ) : (
                                ''
                            )}

                            {/* message for a date past the 21st century */}
                            {data.requestData.dateNeeded &&
                            !isDateThisCentury(data.requestData.dateNeeded) ? (
                                <p>Please enter a date in the current century</p>
                            ) : (
                                ''
                            )}

                            <label htmlFor="timeNeeded">Time Needed:</label>
                            <input
                                type="time"
                                name="timeNeeded"
                                id="timeNeeded"
                                value={data.requestData.timeNeeded}
                                onChange={handleChange}
                            ></input>

                            {/* validation message */}
                            {!data.requestData.timeNeeded ? (
                                <p>Time is required</p>
                            ) : (
                                ''
                            )}
                        </div>
                        <div>
                            <label htmlFor="description">Description:</label>
                            <input
                                type="text"
                                name="description"
                                id="description"
                                value={data.requestData.description}
                                onChange={handleChange}
                            ></input>

                            {/* message for a missing description */}
                            {!data.requestData.description ? (
                                <p>
                                    Description is required
                                </p>
                            ) : (
                                ''
                            )}

                            {/* message for a description that is too long */}
                            {data.requestData.description &&
                            data.requestData.description.length > 100 ? (
                                <p>
                                    Request description must not exceed 100 characters
                                </p>
                            ) : (
                                ''
                            )}

                            <label htmlFor="category">Category:</label>
                            <select
                                name="category"
                                id="category"
                                value={data.requestData.category}
                                onChange={handleChange}
                            >
                                <option value="" disabled>
                                    Select one
                                </option>
                                <option value="Meal">Meal</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Other">Other</option>
                            </select>

                            {/* validation message not needed since users can only select valid options */}
                        </div>
                        {isRequestDataValid(data.requestData) ? (
                            <input type="submit" value="Submit"></input>
                        ) : (
                            <input type="submit" value="Submit" disabled></input>
                        )}
                    </form>
                </div>
            )}
        </>
    )
}

export default RequestEdit