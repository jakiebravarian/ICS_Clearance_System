import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

import Home from './pages/Login-Signup/Home';
import Login from './pages/Login-Signup/Login';
import LoginAprrover from './pages/Login-Signup/Login-Approver';
import SignUp from './pages/Login-Signup/SignUp';
import Verify from './pages/Login-Signup/Verify';
import MainScreen from './pages/Approver/MainScreen';
import Student from './pages/Student/Student';
import Returned from './pages/Student/Returned';
import ManageApplications from './pages/Admin/Manage-Applications';
import ManageApprovers from './pages/Admin/Manage-Approvers';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/login-approver', element: <LoginAprrover /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/verify', element: <Verify /> },
  { path: '/approver', element: <MainScreen /> },
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