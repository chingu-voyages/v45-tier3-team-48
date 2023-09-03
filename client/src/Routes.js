import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import TestComp from "./TestToBeDeleted";
import RegisterPage from './pages/RegisterPage'
import Login from "./components/GroupPages/LoginPage/Login";



const FrontendRoutes = () => {

  // Create a new route for any components you'd like to render
  return (
    <div>
      <Routes>
          <Route exact path="/" Component={TestComp}/>
          <Route exact path="/register" Component={RegisterPage}/>
          <Route exact path="/login" Component={Login}/>

          {/* if no match found, redirect to page not found */}
          <Route path="*" element={<Navigate to='/' replace />}/>
      </Routes>
    </div>
  );
}

=======
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
                <Route path="/GroupCreationPage" Component={GroupSelectionPage}/>
                <Route path="/GroupViewAllPage" Component={GroupViewAllPage}/>
                <Route path="/GroupViewSinglePage" Component={GroupViewSinglePage}/>
                {/* if no match found, redirect to page not found */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};
>>>>>>> development

export default FrontendRoutes;