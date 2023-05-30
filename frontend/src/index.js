import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { redirect } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import LoginAprrover from './pages/Login-Approver';
import SignUp from './pages/SignUp';
import CreateApproverAccount from './pages/Create-Approver';
import Verify from './pages/Verify';
import Student from './pages/Student';
import Returned from './pages/Returned';
import ManageApplications from './pages/Manage-Applications';
import ManageApprovers from './pages/Manage-Approvers';

const checkIfLoggedInOnHome = async () => {
  const res = await fetch("http://localhost:3001/checkifloggedin",
    {
      method: "POST",
      credentials: "include" 
    });

  const payload = await res.json();
  
    if (payload.isLoggedIn) {
      return redirect("/verify")
    } else {
      return 0
    }
}

// Send a POST request to API to check if the user is logged in. Redirect the user back to / if not logged in
const checkIfLoggedInOnDash = async () => {
  const res = await fetch("http://localhost:3001/checkifloggedin",
    {
      method: "POST",
      credentials: "include" 
    });


  const payload = await res.json();
    if (payload.isLoggedIn) {
      return true
    } else {
      return redirect("/")
    }
}


const router = createBrowserRouter([
  { path: '/', element: <Home />,loader: checkIfLoggedInOnHome },
  { path: '/login', element: <Login />, loader: checkIfLoggedInOnHome},
  { path: '/login-approver', element: <LoginAprrover /> },
  { path: '/signup', element: <SignUp />,loader: checkIfLoggedInOnHome },
  { path: '/create-approver', element: <CreateApproverAccount /> },
  { path: '/verify', element: <Verify />, loader: checkIfLoggedInOnDash },
  { path: '/student', element: <Student />, loader: checkIfLoggedInOnDash },
  { path: '/returned', element: <Returned /> },
  { path: '/manage-applications', element: <ManageApplications /> },
  { path: '/manage-approvers', element: <ManageApprovers /> }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);