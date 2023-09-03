
let DB;

const express = require("express");
const app = express();
app.use(express.json());

app.use("/assets",express.static(`${__dirname}/public/assets`));
app.use("/node_modules",express.static(`${__dirname}/node_modules`));





app.get("/",(req,res)=>{
    res.sendFile(`${__dirname}/public/views/feed.html`);
});

app.get("/SignUp",(req,res)=>{
    res.sendFile(`${__dirname}/public/views/Signup.html`);
});

app.get("/Login",(req,res)=>{
    res.sendFile(`${__dirname}/public/views/Login.html`);
});


app.get("/users/:userId",(req, res)=>{
    const {userId} = req.params;
    const user = DB.users.find((user) => user.id === userId);
    if(user)
        res.json(user);
    else
        res.status(404).json("user not found");
});
app.post("/users",(req,res)=>{
    const {name, email, password} = req.body;
    console.log(`name: ${name}`);
    DB.usersNo++;
    DB.users.push(
        {
            name,
            email,
            password,
            id: DB.users.length + 1,
        }
    )
});
app.get("/blogs",(res,req)=>{
    if(DB)
        res.json(DB.blogs);
});
app.get("/blogs/:blogId",(res, req)=>{
    const {blogId} = req.params;
    const blog = DB.blogs.find((blog) => blog.id === blogId);
    if(blog)
        res.json(blog);
    else
        res.status(404).json("blog not found");
});
app.post("/blogs",(req, res)=>{
    const {title, description, user_id} = req.body;
    DB.blogsNo++;
    DB.blogs.push(
        {
            title,
            description,
            user_id,
            id: DB.blogs.length + 1,
        }
    )
});

app.listen(5000,()=> console.log("server started at 5000"));