import express from "express";
import mongoose from "mongoose";
import setUpRoutes from "./routes.js";


// initialize the server
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect to MongoDB
await mongoose.connect("mongodb://127.0.0.1:27017/ICS");
console.log("Connected to MongoDB");

// allow CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Access-Control-Allow-Methods,Origin,Accept,Content-Type,X-Requested-With,Cookie");
    res.setHeader("Access-Control-Allow-Credentials","true");
    next();
});

// setup routes
setUpRoutes(app);

// start server
app.listen(3001, () => { console.log("API listening to port 3001 "); });