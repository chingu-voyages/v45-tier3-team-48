import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import UserContext from '../../../UserContext';

const RequestEdit = (props) => {
    
    // grab the group id from the parameter variable
    const { groupId } = useParams;

    // TODO : be sure to send the requestId to this component through props
    // grab the request id from props
    const { requestId } = props;

    // get the user id from UserContext
    const { userId } = useContext(UserContext);

    const [requestData, setRequestData] = useState({})

    // set isLoaded variable to false so form can populate before component loads
    const [isLoaded, setIsLoaded] = useState(false);

    // TODO: add check to see if user is authorized to edit request
    
    useEffect(() => {
        
    })
    
    return (
        <div>RequestEdit</div>
    )
}

export default RequestEdit