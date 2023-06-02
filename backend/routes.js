import {signUp, login, checkifloggedin} from "./auth-controller.js"
import {createApproverAccount, searchApproverByName, filterNameAscending, filterNameDescending, deleteApprover, editApprover, approverLogin} from "./admin-approver-controller.js"

const setUpRoutes = (app) => {
    app.get("/", (req, res) => { res.send("API Home") });
    app.post("/signup", signUp);
    app.post("/login", login);
    app.post("/checkifloggedin", checkifloggedin);
    app.get("/search-approver-by-name", searchApproverByName);
    app.get("/sort-approver-by-name-asc", filterNameAscending);
    app.get("/sort-approver-by-name-desc", filterNameDescending);
    app.post("/delete-approver", deleteApprover);
    app.post("/edit-approver", editApprover); 
    app.post("/approver-login", approverLogin);   
  }
  
  export default setUpRoutes;