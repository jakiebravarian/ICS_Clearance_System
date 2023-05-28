import {signUp, login, checkifloggedin} from "./auth-controller.js"

const setUpRoutes = (app) => {
    app.get("/", (req, res) => { res.send("API Home") });
    app.post("/signup", signUp);
    app.post("/login", login);
    app.post("/checkifloggedin", checkifloggedin);
  }
  
  export default setUpRoutes;