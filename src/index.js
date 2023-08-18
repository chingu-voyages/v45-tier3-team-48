import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

//add paths to other pages with {BrowserRouter, Route, Switch} from "react-router-dom"?

//for example...

//root.render(
    //<BrowserRouter>
    //    <Switch>
    //        <Route exact path="/" component={landingPage} />
    //        <Route path="/createAccount" component={createAccountPage} />
    //        <Route path="/dashboard" component={dashboardPage} />
     //   </Switch>
    //</BrowserRouter>,
   // rootElement
//);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
