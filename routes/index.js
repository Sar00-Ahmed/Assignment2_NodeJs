
//express
const express = require("express");
const app = express();
app.use(express.json());

//Routers
const users = require("./users.route");
app.use("/users", users);
const blogs = require("./blogs.route");
app.use("/blogs", blogs);

//assets
app.use("/assets",express.static(`${__dirname}/public/assets`));
app.use("/node_modules",express.static(`${__dirname}/node_modules`));

//DB connect
const db = require("../services/mongodb");

app.get("/",(req,res)=>{
    res.sendFile(`${__dirname}/public/views/feed.html`);
});

app.get("/SignUp",(req,res)=>{
    res.sendFile(`${__dirname}/public/views/Signup.html`);
});

app.get("/Login",(req,res)=>{
    res.sendFile(`${__dirname}/public/views/Login.html`);
});


(async ()=> {
    await db.connectDB()
    app.listen(process.env.PORT,()=> console.log(`server started at ${process.env.PORT}`));
})()