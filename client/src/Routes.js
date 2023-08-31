import React from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
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


export default FrontendRoutes;