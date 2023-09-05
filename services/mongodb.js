const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.DATABASE_URL);

async function connectDB(){
    await client.connect();
    console.log('database connected')
}


async function collect(collectionName){
    const db = client.db("semicolon");
    const userCollection = db.collection(collectionName);
    return userCollection;
}

module.exports = {
    connectDB,
    collect
}