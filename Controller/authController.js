const Auth = require('../Model/authSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Recipe = require('../Model/recipeSchema');

const registerUser = async(req,res)=> {
    const {username, email, password} = req.body;
    if(!email){
        return res.status(400).json({message:"Please add your email"})
    }
    const existingUser = await Auth.findOne({email})
    if (existingUser){
        return res.staus(400).json({message:"User recipe account already exists... Login instead"})
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = new Auth({username, email, password:hashedPassword})
    await newUser.save()
    return res.status(200).json({
        message: "Account Created Successfully",
        user:newUser
    })
}

const authenticateUser = async(req,res)=> {
    const {username, password} = req.body;
    return res.status(200).json({message: "Done"})

}

module.exports = {registerUser, authenticateUser}
