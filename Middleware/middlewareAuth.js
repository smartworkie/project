//Middleware for Handling Error During Registration
const registerValidation = async (req, res, next)=> {
     try{
    const {email, username, password} = req.body

    let error = [];

    if (!email){
        error.push("Please enter email")
    } else if (!isValidEmail(email)){
        error.push("Email format not valid")
    }
    if (!username){
        error.push("Please enter username")
    } else if (username.length<4){
        error.push("Username should be atleast four letters")
    }
    if (!password){
        error.push("Please enter password");
    } else{

     if (password.length<6){
        error.push("Password must be atleast six characters")
    }  if (!/[0-9]/.test(password)){
        error.push("password must contain a number")
    } if 
        
    (!checkCase(password)) {
        error.push("password should contain atleast an uppercase ")
    } 
     if (!isContainsSymbol(password)){
        error.push("password should contain atleast one special character")
    }
}
    if (error.length>0){
            return res.status(400).json({message:error})
    }
    next()
     }
     catch(error){
        return res.status(400).json({message:error.message})
     }
}
//Middleware for Handling Error During Login 
const loginValidation = async (req, res, next)=> {
    try{
    const {username, password} = req.body

    let error = [];

   
    if (!username){
        error.push("Please enter username")
    } 
    if (!password){
        error.push("Please enter password");
    } 
    
    if (error.length>0){
            return res.status(400).json({message:error})
    }
    next()
    }
    catch(error){
        return res.status(400).json({message:error.message})
    }
    
}
//Middleware for Handling Error When Changing Password 
const changePasswordValidation = (req, res, next)=>{
    try{
    const {password} = req.body;
    let error = [];
if (!password){
    error.push("Please enter password");
} else{

 if (password.length<6){
    error.push("Password must be atleast six characters")
}  if (!/[0-9]/.test(password)){
    error.push("password must contain a number")
} if 
    
(!checkCase(password)) {
    error.push("password should contain atleast an uppercase ")
} 
 if (!isContainsSymbol(password)){
    error.push("password should contain atleast one special character")
}
}
if (error.length>0){
        return res.status(400).json({message:error})
}
next()
    }
    catch(error){
        return res.status(400).json({message:error.message})
    }
}
//Middleware for Handling Error While Changing Username
const changeUsernameValidation = (req,res,next) => {
    try{
    const {username}= req.body;
    let error =[];
    if (!username){
        error.push("Please enter username")
    } else if (username.length<4){
        error.push("Username should be atleast four letters")
    }
    next();
}
catch(error){
    return res.status(400).json({message:error.message})
}
}
//More Helper Functions
const isValidEmail= (email)=> { 
    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(email);
} 
const checkCase=(character)=> {
    const symbol = /^(?=.*[A-Z]).*$/;
   return symbol.test(character)
}
const isContainsSymbol = (character) => {
  const symbol =  /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
  return symbol.test(character);
  }


module.exports = {registerValidation, loginValidation, isValidEmail, changePasswordValidation, changeUsernameValidation}