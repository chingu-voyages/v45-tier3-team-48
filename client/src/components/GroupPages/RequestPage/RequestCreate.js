import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import UserContext from '../../../UserContext';
import CaregiverApi from '../../../api';

const RequestCreate = () => {
    // grab the group id from the parameter variable
    const { groupId } = useParams();

    // insert useEffect hook to check if group exists and verify user role
    

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
            (requestData.description === '-select-') |
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
        <div>
            {hasError && <p>Error: {errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="dateNeeded">Date Needed:</label>
                    <input
                        type="date"
                        name="dateNeeded"
                        id="dateNeeded"
                        min={currentDate}
                        onChange={handleChange}
                    ></input>

                    {/* message for empty date */}
                    {!requestData.dateNeeded ? (
                        <p>Date is required</p>
                    ) : (
                        ''
                    )}
                    
                    {/* message for invalid date */}
                    {requestData.dateNeeded &&
                    !isValidDate(requestData.dateNeeded) ? (
                        <p>Please enter a valid date</p>
                    ) : (
                        ''
                    )}

                    {/* message for a date in the past */}
                    {requestData.dateNeeded &&
                    !isFutureDate(requestData.dateNeeded) ? (
                        <p>Please enter a date in the future</p>
                    ) : (
                        ''
                    )}

                    {/* message for a date past the 21st century */}
                    {requestData.dateNeeded &&
                    !isDateThisCentury(requestData.dateNeeded) ? (
                        <p>Please enter a date in the current century</p>
                    ) : (
                        ''
                    )}

                    <label htmlFor="timeNeeded">Time Needed:</label>
                    <input
                        type="time"
                        name="timeNeeded"
                        id="timeNeeded"
                        onChange={handleChange}
                    ></input>

                    {/* validation message */}
                    {!requestData.timeNeeded ? (
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
                        onChange={handleChange}
                    ></input>

                    {/* message for a missing description */}
                    {!requestData.description ? (
                        <p>
                            Description is required
                        </p>
                    ) : (
                        ''
                    )}

                    {/* message for a description that is too long */}
                    {requestData.description &&
                    requestData.description.length > 100 ? (
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
                        defaultValue={''}
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
                {isRequestDataValid(requestData) ? (
                    <input type="submit" value="Submit"></input>
                ) : (
                    <input type="submit" value="Submit" disabled></input>
                )}
            </form>
        </div>
    );
};

export default RequestCreate;
