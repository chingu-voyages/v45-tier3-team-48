import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

const RequestCreate = () => {
    const { groupId } = useParams();

    const [requestData, setRequestData] = useState({
        groupId: groupId,
        dateNeeded: '',
        timeNeeded: '',
        dateTimeUTC: '',
        description: '',
        category: '',
        createdBy: '',
        assignedTo: '',
    });

    // check if form data is valid

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

    const handleSubmit = e => {
        e.preventDefault();
        const { dateNeeded, timeNeeded } = requestData;
        const dateTimeUTC = createDateTimeUTC(dateNeeded, timeNeeded);
        setRequestData({ ...requestData, dateTimeUTC: dateTimeUTC });
        // change to call the frontend API
        console.log(requestData);
    };

    const handleChange = e => {
        setRequestData({ ...requestData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="dateNeeded">Date Needed:</label>
                    <input
                        type="date"
                        name="dateNeeded"
                        min={currentDate}
                        onChange={handleChange}
                    ></input>
                    <label htmlFor="timeNeeded">Time Needed:</label>
                    <input
                        type="time"
                        name="timeNeeded"
                        onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        name="description"
                        onChange={handleChange}
                    ></input>
                    <label htmlFor="category">Category:</label>
                    <select name="category">
                        <option>-select-</option>
                        <option value="Meal">Meal</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
};

export default RequestCreate;
