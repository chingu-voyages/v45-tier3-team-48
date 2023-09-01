import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import TestComp from './TestToBeDeleted';
import RegisterPage from './pages/RegisterPage';
import RequestCreate from './components/GroupPages/RequestPage/RequestCreate';

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
                {/* if no match found, redirect to page not found */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default FrontendRoutes;
