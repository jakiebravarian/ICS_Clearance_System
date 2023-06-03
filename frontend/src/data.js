// all the data from the backend are stored here as well as data to be used in the frontend

// placeholder image
import Pikachu from './assets/pikachu.png';
import AdminIcon from './assets/admin_icon.jpg';
import ApproverIcon from './assets/approver.png';

// user info ; changes depending on who is logged in
export const userInfo = {
    name: "Alexandra Siocon",
    studno: "2020-12345",
    course: "BSCS",
    college: "CAS",
    classification: "Student",
    icon: Pikachu
}

export const approverInfo = {
    name: "Juan Dela Cruz",
    classification: "Adviser",
    icon: ApproverIcon
}

// export const approverInfo = {
//     name: "Juan Dela Cruz",
//     classification: "Clearance Officer",
//     icon: ApproverIcon
// }

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