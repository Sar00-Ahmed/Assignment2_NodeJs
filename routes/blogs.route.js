const blogs = require('express').Router()
const blogController = require("../controllers/blogs.controller");



blogs.get("/",async (req,res)=>{blogController.index(req,res)});

blogs.get("/:blogId",async(req, res)=>{blogController.get(req,res)});

blogs.post("/",async (req, res)=>{blogController.create(req,res)});

module.exports = blogs;

