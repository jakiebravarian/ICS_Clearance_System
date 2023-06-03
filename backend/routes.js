import { signUp, login, checkifloggedin } from "./auth-controller.js";
import { getAllStudents, getCurrentStudent, submitApplication, viewStudentClearanceStatus, updateStep, updateStudentSubmission,closeApplication } from "./student-controller.js";
import { searchApproverByName, filterNameAscending, filterNameDescending, deleteApprover, editApprover, approverLogin} from "./admin-approver-controller.js"
import { sortStudentByStudentNum, assignAdviser, sortStudentByName, getPendingStudent} from "./admin-student-controller.js";

const setUpRoutes = (app) => {
  app.get("/", (req, res) => {
    res.send("API Home");
  });

  // Authentication routes
  app.post("/signup", signUp);
  app.post("/login", login);
  app.post("/checkifloggedin", checkifloggedin);

  // Student routes
  app.get("/get-all-students", getAllStudents);
  app.get("/get-current-student", getCurrentStudent);
  app.post("/submit-application", submitApplication);
  app.get("/get-pending-student", getPendingStudent);
  app.get("/sort-student-by-name",sortStudentByName);
  app.get("/sort-student-by-sn",  sortStudentByStudentNum);
  app.get("/view-student-clearance-status", viewStudentClearanceStatus);
  app.put("/update-step", updateStep);
  app.put("/update-student-submission", updateStudentSubmission);
  app.put("/close-application", closeApplication);

  //approver routes
  app.get("/search-approver-by-name", searchApproverByName);
  app.get("/sort-approver-by-name-asc", filterNameAscending);
  app.get("/sort-approver-by-name-desc", filterNameDescending);
  app.post("/delete-approver", deleteApprover);
  app.post("/edit-approver", editApprover); 
  app.post("/approver-login", approverLogin);  
  
  //admin routes
  app.post("/assign-adviser", assignAdviser);
  
   

};
export default setUpRoutes;

