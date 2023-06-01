import {signUp, login, checkifloggedin} from "./auth-controller.js"
import {createApproverAccount, searchApproverByName, filterNameAscending, filterNameDescending} from "./admin-approver-controller.js"

const setUpRoutes = (app) => {
    app.get("/", (req, res) => { res.send("API Home") });
    app.post("/signup", signUp);
    app.post("/login", login);
    app.post("/checkifloggedin", checkifloggedin);
    app.get("/search-approver-by-name", searchApproverByName);
    app.get("/sort-approver-by-name-asc", filterNameAscending);
    app.get("/sort-approver-by-name-desc", filterNameDescending);
    
  }
  
  export default setUpRoutes;