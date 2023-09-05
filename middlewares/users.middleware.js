const utils = require('../utils/utils');

async function validateUser(req,res,next){
    let {name,email,password} = req.body;
    name = await utils.removeExtraSpaces(name);
    if(!name || !email || !password){
        console.log(`name: ${name}, email: ${email}, pass: ${password}`);
        res.status(400).json({message: "Missing required fields"});
        return;
    }
    else if(name.length < 3 || name.length > 254){
        res.status(400).json({message: "Name must be between 3 and 254 characters long"});
        return;
    }
    else if(password.length < 8 || password.length > 254){
        res.status(400).json({message: "Password must be at least 8 characters long"})
        return;
    }
    else if(!email.includes("@") || !email.includes(".") || email.length < 5 || email.length > 254 || email.indexOf("@") > email.lastIndexOf(".") || email.indexOf("@") === 0 || email.lastIndexOf(".") === email.length - 1){
        res.status(400).json({message: "Email must be a valid email address"})
        return;
    }
    else{
        next();
    }
}

module.exports = {
    validateUser
}