// all the data from the backend are stored here as well as data to be used in the frontend

// placeholder image
import Pikachu from './assets/pikachu.png';
import AdminIcon from './assets/admin_icon.jpg';
import { useEffect, useState } from "react";

// user info ; changes depending on who is logged in
// export const userInfo = {
//     name: "Alexandra Siocon",
//     studno: "2020-12345",
//     course: "BSCS",
//     college: "CAS",
//     classification: "Student",
//     icon: Pikachu
// }    
export async function getCurrentStudent(upMail) {
  try {
    const response = await fetch("http://localhost:3001/get-current-student?" + "upMail=" + upMail);
    const body = await response.json();
    return body;
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
