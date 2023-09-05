const users = require('express').Router()
const usersController = require("../controllers/users.controller")
const middlewares = require("../middlewares/users.middleware");

users.post("/",middlewares.validateUser,async (req,res, next)=>{ usersController.create(req,res,next)});

users.get("/", async(req, res)=>{usersController.index(req,res)});

users.get("/:id",async(req, res)=>{usersController.get(req,res)});


module.exports = users;