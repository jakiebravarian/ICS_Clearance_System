import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { redirect } from 'react-router-dom';

import Home from './pages/Login-Signup/Home';
import Login from './pages/Login-Signup/Login';
import LoginAprrover from './pages/Login-Signup/Login-Approver';
import LoginAdmin from './pages/Login-Signup/Login-Admin';
import SignUp from './pages/Login-Signup/SignUp';
import Verify from './pages/Login-Signup/Verify';
import Student from './pages/Student/Student';
import Returned from './pages/Student/Returned';
import ManageApplications from './pages/Admin/Manage-Applications';
import ManageApprovers from './pages/Admin/Manage-Approvers';
import ViewStudentApplication from './pages/Approver/ViewStudentApplication';
import Reject from './pages/Login-Signup/Reject';
import MainScreen from './pages/Approver/MainScreen';
import { PDFGenerator } from './pages/Student/StudentComponents';
const checkIfLoggedInOnHome = async () => {
  const res = await fetch("http://localhost:3001/checkifloggedin",
    {
      method: "POST",
      credentials: "include"
    });

  const payload = await res.json();

  if (payload.isLoggedIn) {
    return redirect("/student")
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
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/login-approver', element: <LoginAprrover /> },
  { path: '/login-admin', element: <LoginAdmin /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/verify', element: <Verify /> },
  { path: '/reject', element: <Reject /> },
  { path: '/approver', element: <MainScreen /> },
  { path: '/view/:appId', element: <ViewStudentApplication /> },
  { path: '/student', element: <Student /> },
  { path: '/returned/:appId', element: <Returned /> },
  { path: '/manage-applications', element: <ManageApplications /> },
  { path: '/manage-approvers', element: <ManageApprovers /> },
  { path: '/pdf-generator', element: <PDFGenerator /> },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);