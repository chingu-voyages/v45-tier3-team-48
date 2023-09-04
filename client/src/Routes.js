import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import TestComp from './TestToBeDeleted';
import RegisterPage from './pages/RegisterPage';
import RequestCreate from './components/GroupPages/RequestPage/RequestCreate';
import GroupCreationPage from './pages/GroupCreationPage';
import GroupViewAllPage from './pages/GroupViewAllPage';
import GroupViewSinglePage from './pages/GroupViewSinglePage';

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
                <Route exact path="/register" Component={RegisterPage} />
                <Route
                    path="/GroupCreationPage"
                    Component={GroupCreationPage}
                />
                <Route path="/GroupViewAllPage" Component={GroupViewAllPage} />
                <Route
                    path="/GroupViewSinglePage"
                    Component={GroupViewSinglePage}
                />
                {/* if no match found, redirect to page not found */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default FrontendRoutes;
