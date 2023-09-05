const db = require("../services/mongodb");
const utils = require('../utils/utils');

async function index(req,res){
    try{
        const userCollection = await db.collect("users");
        const queryOptions = {
            projection: {_id:0}
        }
        const users = await userCollection.find({}, queryOptions).sort().toArray();
        res.status(200).json(users);
    }catch(error){
        res.status(404).json(error);
    }
}

async function get(req,res){
    try{
        const userCollection = await db.collect("users");
        const {id} = req.params;
        const query = { _id: id};
        const queryOptions = {
            limit: 1,
            skip: 0,
            projection: {_id:0}
        }
    
        const result = await userCollection.findOne(query, queryOptions);
        if(result)
            res.json(result);
        else
            res.status(404).json("user not found");
    }
    catch(error){
        res.status(404).json(error);
    }
}

async function create(req,res,next){
    try{
        const userCollection = await db.collect("users");
        let {name, email, password} = req.body;
        name = await utils.removeExtraSpaces(name); 
        const temp = {
            name,
            email,
            password
        }


        const tempOptions = {
            ordered : false,
            bypassDocumentValidation : true
        }

        const user = await userCollection.insertOne(temp, tempOptions);
        res.status(201).json(user);
    } catch(error){
        return res.json(error);
    }

}

async function update(req,res){

}

async function del(req,res){

}

module.exports = {
    index,
    get,
    create,
    update,
    del
}