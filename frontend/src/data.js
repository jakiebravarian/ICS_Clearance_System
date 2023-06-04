// all the data from the backend are stored here as well as data to be used in the frontend

// placeholder image
import Pikachu from './assets/pikachu.png';
import AdminIcon from './assets/admin_icon.jpg';
import { useEffect, useState } from "react";
import ApproverIcon from './assets/approver.png';

// user info ; changes depending on who is logged in
export async function getCurrentStudent(upMail) {
    try {
      const response = await fetch("http://localhost:3001/get-current-student?" + "upMail=" + upMail);
  
      const studentData = await response.json();
      
      return studentData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

export const adminInfo = {
    name: "Juan Dela Cruz",
    classification: "Administrator",
    icon: AdminIcon
}

export const remarks = {
    remarks: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis ."
}

export const studentApps = [
    {
        studentNumber: "2020-xxxxx",
        studentName: "BRABANTE, Jakie Ashley, Cacho"
    },
    {
        studentNumber: "2020-xxxxx",
        studentName: "DELA ROSA, Maria, Hernandez"
    },
    {
        studentNumber: "2020-xxxxx",
        studentName: "JEPSEN, Carly Rae"
    }
]

export const approversList = [
    {
        firstName: "Jakie",
        middleName: "Hernandez",
        lastName: "Bravante",
        email: "jhbravante@up.edu.ph",
        password: "hello, world",
        approverType: "Clearance Officer"
    },
    {
        firstName: "Peter",
        middleName: "Johnson",
        lastName: "Parker",
        email: "pjparker@up.edu.ph",
        password: "hello, world",
        approverType: "Clearance Officer"
    }
]

export const approverInfo = {
    name: "Juan Dela Cruz",
    classification: "Clearance Officer",
    icon: ApproverIcon
}