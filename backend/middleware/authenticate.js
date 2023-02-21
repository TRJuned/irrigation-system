const jwt = require("jsonwebtoken");
const userdb = require("../models/user-post");
const keysecret = "tazanrabbanijunedzibonnessazibua"

const authenticate = async(req,res,next)=>{
    try {
        const token = req.headers.authorization;
        console.log(token);
    } catch (error) {
        
    }
}


module.exports = authenticate