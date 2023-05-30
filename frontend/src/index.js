import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

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

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/login-approver', element: <LoginAprrover /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/create-approver', element: <CreateApproverAccount /> },
  { path: '/verify', element: <Verify /> },
  { path: '/student', element: <Student /> },
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