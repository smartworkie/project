const jwt = require('jsonwebtoken')
const Auth = require('../Model/authSchema');

//Ensures all fields are filled for recipe creation
const recipeValidation = async(req, res, next) => {
        try{
        const{title, ingredients, instructions, tag, created_at} = req.body;
    
        let error = [];
        if (!title){
            error.push("Please give title to the recipe")
        }
        if (!ingredients){
            error.push("Please input ingredients")
        }
        if (!instructions){
            error.push("Please give instructions")
        }
        if (!tag){
            error.push("Please give tags to the recipe")
        }
        if (!created_at){
            error.push("Please put a date")
        }
        if (error.length>0){
            return res.status(400).json({message:error})
    }
    next()
}
catch(error){
    return res.status(400).json({message: error.message})
}
}

//Ensures only login user can work on recipe
const recipeAuthorization = async (req, res, next) => {
    try{
    const tokenBearer = req.header('Authorization');
    
        if(!tokenBearer){
            return res.status(400).json({message: 'No token provided'})
        }
        tokenArray = tokenBearer.split(" ")
        token = tokenArray[1]
        
    const verifiedToken = jwt.verify(token, `${process.env.ACCESS_TOKEN}`)
    if(!verifiedToken){
        return res.status(401).json({message: 'Access Denied'});
    }
  
    
    const user =await Auth.findOne({email:verifiedToken.email})
    
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    req.user= user;
    next()
}
catch(error){
    return res.status(500).json({message:error.message})
}
}

module.exports = {recipeValidation, recipeAuthorization};