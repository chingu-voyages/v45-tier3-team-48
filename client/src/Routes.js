import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import RequestCreate from './components/GroupPages/RequestPage/RequestCreate';
import GroupCreationPage from './pages/GroupCreationPage';
import GroupViewAllPage from './pages/GroupViewAllPage';
import GroupViewSinglePage from './pages/GroupViewSinglePage';
import GroupEditDeletePage from './pages/GroupEditDeletePage';
import Login from './components/GroupPages/LoginPage/Login';
import RequestDisplayTable from './components/GroupPages/RequestPage/RequestDisplayTable';
import RequestEdit from './components/GroupPages/RequestPage/RequestEdit';
import EditProfileForm from './components/GroupPages/ProfilePage/UpdateProfile';
import UserGroupPage from './pages/UserGroupsPage';

const FrontendRoutes = () => {
    // Create a new route for any components you'd like to render
    return (
        <div>
            <Routes>
                <Route exact path="/" Component={LandingPage}/>
                {/* will remove the route below after testing and add component to GroupViewSinglePage */}
                <Route exact path="/groups/:groupId" element={<RequestDisplayTable />} />
                <Route exact path="/groups/:groupId/request/create" element={<RequestCreate />} />
                <Route exact path="/groups/:groupId/request/edit" element={<RequestEdit />} />
                <Route exact path="/login" Component={Login} />
                <Route exact path="/register" Component={RegisterPage} />
                <Route path="/GroupCreation" Component={GroupCreationPage} />
                <Route path="/GroupViewAll" Component={GroupViewAllPage} />
                <Route path="/GroupViewSingle/:groupId" Component={GroupViewSinglePage} />
                <Route path="/GroupEditDelete/:groupId" Component={GroupEditDeletePage}/>
                <Route path='/editUser' Component={EditProfileForm}/>
                <Route path='/usergroups' Component={UserGroupPage}/>

                {/* if no match found, redirect to page not found */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default FrontendRoutes;
