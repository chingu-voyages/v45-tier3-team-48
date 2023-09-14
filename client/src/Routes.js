import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import RequestCreate from './components/GroupPages/RequestPage/RequestCreate';
import GroupCreationPage from './pages/GroupCreationPage';
import GroupViewAllPage from './pages/GroupViewAllPage';
import GroupViewSinglePage from './pages/GroupViewSinglePage';
import GroupEditDeletePage from './pages/GroupEditDeletePage';
import Login from './components/GroupPages/LoginPage/Login';
import EditProfileForm from './components/GroupPages/ProfilePage/UpdateProfile';

const FrontendRoutes = () => {
    // Create a new route for any components you'd like to render
    return (
        <div>
            <Routes>
                <Route exact path="/" />
                <Route
                    exact
                    path="/groups/:groupId/request/create"
                    element={<RequestCreate />}
                />
                <Route exact path="/login" Component={Login} />
                <Route exact path="/register" Component={RegisterPage} />
                <Route
                    path="/GroupCreation"
                    Component={GroupCreationPage}
                />
                <Route path="/GroupViewAll" Component={GroupViewAllPage} />
                <Route
                    path="/GroupViewSingle/:groupId"
                    Component={GroupViewSinglePage}
                />
                <Route path="/GroupEditDelete/:groupId" Component={GroupEditDeletePage}/>
                {/* if no match found, redirect to page not found */}

                <Route path='/editUser' Component={EditProfileForm}/>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default FrontendRoutes;
