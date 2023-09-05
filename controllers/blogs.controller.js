const db = require("../services/mongodb");

async function index(req,res){
    try{
        const userCollection = await db.collect("blogs"); 
        const result = await userCollection.find({}).sort().toArray();
        res.json(result);
    }catch(error){
        res.status(404).json(error);
    }
}

async function get(req,res){
    const {blogId} = req.params;
    const userCollection = await db.collect("blogs");
    const query = { _id : blogId};
    const result = userCollection.findOne(query,queryOptions);
    if(result)
        res.json(result);
    else
        res.status(404).json("blog not found");
}

async function create(req,res){
    const {title, description, user_id} = req.body;
    const userCollection = await db.collect("blogs");
    const temp = {
        title,
        description,
        user_id: user_id
    }

    const tempOptions = {
        ordered : false,
        bypassDocumentValidation : true
    }

    userCollection.insertOne(temp, tempOptions);
    res.status(201).json("blog created successfully");
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