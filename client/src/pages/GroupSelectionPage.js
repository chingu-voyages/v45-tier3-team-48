import React, {useState} from 'react';
import GroupTable from '../components/GroupPages/GroupSelectionPage/GroupTable';
import Information from '../components/GroupPages/GroupSelectionPage/Information';

const GroupSelectionPage = () => {
    const [groupId, setGroupId] = useState([]);

    function toGroupPage(currentGroup) {
            setGroupId(currentGroup);
    }

    if(groupId.length === 0) {
        return <GroupTable toGroupPage={toGroupPage}/>;
    }
    else {
        return <Information groupId={groupId}/>;
    }
}

export default GroupSelectionPage;