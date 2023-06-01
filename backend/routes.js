import { signUp, login, checkIfLoggedIn } from "./auth-controller.js";
import { getAllStudents, getCurrentStudent, submitApplication, viewStudentClearanceStatus, updateStep, updateStudentSubmission } from "./student-controller.js";

const setUpRoutes = (app) => {
  app.get("/", (req, res) => {
    res.send("API Home");
  });

  // Authentication routes
  app.post("/signup", signUp);
  app.post("/login", login);
  app.post("/checkifloggedin", checkIfLoggedIn);

  // Student routes
  app.get("/get-all-students", getAllStudents);
  app.get("/get-current-student", getCurrentStudent);
  app.post("/submit-application", submitApplication);
  app.get("/view-student-clearance-status", viewStudentClearanceStatus);
  app.put("/update-step", updateStep);
  app.put("/update-student-submission", updateStudentSubmission);
};

export default setUpRoutes;
