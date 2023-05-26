import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

import Home from './pages/Home';
import Login from './pages/Login';
import LoginAprrover from './pages/Login-Approver';
import SignUp from './pages/SignUp';
import SignUpApprover from './pages/SignUp-Approver';
import Student from './pages/Student';



const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/login-approver', element: <LoginAprrover /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/signup-approver', element: <SignUpApprover /> },
  { path: '/student', element: <Student /> }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);