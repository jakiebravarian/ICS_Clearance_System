import {signUp, login, checkifloggedin} from "./auth-controller.js"
import {getAllStudents,getCurrentStudent} from "./student-controller.js"

const setUpRoutes = (app) => {
    app.get("/", (req, res) => { res.send("API Home") });
    app.post("/signup", signUp);
    app.post("/login", login);
    app.post("/checkifloggedin", checkifloggedin);

    app.get("/get-all-students",getAllStudents);
    app.get("/get-current-student",getCurrentStudent);
  }
  
  export default setUpRoutes;