import React from 'react';
import DashTable from '../components/GroupPages/GroupSelectionPage/GroupTable';
import Information from '../components/GroupPages/GroupSelectionPage/Information';
const GroupSelectionPage= () => {
    return (
      <div>
        <Information/>
        <GroupTable/>
      </div>
    );
}

export default GroupSelectionPage;