const Auth = require('../Model/authSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utilities')


const registerUser = async(req,res)=> {
    try{
    const {username, email, password} = req.body;
  
    const existingUser = await Auth.findOne({email})
    if (existingUser){
        return res.status(400).json({message:"User recipe account already exists... Login instead"})
    }
    const existingUser2 = await Auth.findOne({username})
    if (existingUser2){
        return res.status(400).json({message:"Username used alraedy... Choose another"})
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = new Auth({username, email, password:hashedPassword})
    await newUser.save()

    //Send Email 
    const result = await sendEmail(user.username, user.email,
                'Account Creation', `Welcome ${user.username}. Your Recipe Account Has Been Created`)
    
    return res.status(200).json({
        message: "Account Created Successfully",
        user:newUser
    })
}
    catch(error){
        res.status(400).json({message:error.message})
    }
}

const authenticateUser = async(req,res)=> {
    try{
    const {username, password} = req.body;
  
    const user = await Auth.findOne({username});
    if(!user){
        return res.status(404).json({message: "User not found"})
    }
    const matchedPassword = await bcrypt.compare(password, user.password)
    console.log(matchedPassword)
        if (!matchedPassword){
            return res.status(400).json({
                message:"Incorrect email or password"
            })
        }
        const userPayload = {
            id: user._id,
            email:user.email
        }
        const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN , {expiresIn: '30m'})

    return res.status(200).json({
        message: "Done",
        identify: user.email,
        greetings: `Welcome ${user.username}`,
        accessToken
        })
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
}

const getOneUser = async(req,res) =>{ 
    try{
 
    const user = await Auth.findById(id);
    return res.status(200).json({message:  `${user.username} is here`, user})
}
    catch(error) {
        res.status(400).json({message:error.message})
    }
}

const getAllUsers= async(req,res) => {
    try{
    const users = await Auth.find()
    return res.status(200).json({
        message:"All users are here!",
        users
    })
}
    catch(error){
        return res.status(400).json({message:error.message})
    }
}

const changePassword = async(req,res)=>{
    try{
    const {id} = req.params

    const { password } = req.body

    const updatedUser = await Auth.findByIdAndUpdate(
        id,
        { password },
        {new: true}
    )

    //Send Email
    const result = await sendEmail(updatedUser.username, updatedUser.email,
                    'Account Reset Password', `Congratulations, your password has been changed!`)

    return res.status(200).json({
        message: `${updatedUser.username}, your password has been updated`,
        user: updatedUser
    })
}
catch(error){
    return res.status(400).json({message:error.message})
}
}

const changeUsername = async(req,res)=>{
    try{
    const {id} = req.params 
    const {username} = req.body;

const updatedUsername= await Auth.findByIdAndUpdate(
    id, {username}, {new:true}
)

//Send Email
const result = await sendEmail(updatedUsername.username, upadatedUsername.email,
                            'Account Change of Username', `Congratulations, your username is now ${updatedUsername.username}`)
return res.status(200).json({
    message:`Your new username is ${updatedUsername.username}`,
    user: updatedUsername
})
}

catch(error){
    return res.status(400).json({message:error.message})
}
}

const forgotPassword = async (req, res) =>{
    try{
    const {email} = req.body;
    const user = await Auth.findOne({email})

    if(!user){
        return res.status(404).json({message:"User with email address not found. Check the email again!"})
    }

    const userPayload = {
        id:user._id,
        email:user.email
    }
    const token = process.env.ACCESS_TOKEN

    //Generate Access
    const accessToken = jwt.sign(userPayload, token, {expiresIn:'10m'})

     //Send Email
    const result = await sendEmail(user.username, user.email,'Change Your Password',
                        'Follow the link below to change your password')

    return res.status(200).json({message:"A message has been sent to your email.", accessToken})
    }
   
    
    catch(error){
        return res.status(400).json({message:error.message})
    } 
}

const deleteUser = async (req, res) => {
    try{
        const {id} = req.params 
       
        const deletedUser = Auth.findByIdAndDelete(id)
       

        //Send Email
        const response = await sendEmail(deletedUser.email, deletedUser.username, 'User Deletion', 'Oopss... This user has been deleted from the system')
       
        res.status(200).json({message:"This user has been successfully deleted"})

    }
    catch(error) {
        res.status(400).json({message:error.message})
    }
}
module.exports = {registerUser, authenticateUser, getOneUser, getAllUsers, changePassword, changeUsername, forgotPassword, deleteUser}
