const express = require('express');
const {registerUser, authenticateUser, getOneUser, getAllUsers, changePassword, changeUsername, forgotPassword, deleteUser} = require ('../Controller/authController')
const {handleNewRecipe, handleOneRecipe, handleAllRecipes, handleUpdateRecipe, handleDeleteRecipe, handleCategory} = require('../Controller/recipeController')

const {registerValidation, loginValidation, changePasswordValidation
    ,changeUsernameValidation} = require('../Middleware/middlewareAuth')
const recipeValidation = require('../Middleware/middlewareRecipe')



const router = express.Router();

//Router for users
router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation,  authenticateUser)
router.get('/getoneuser/:id', getOneUser)
router.get('/getallusers', getAllUsers)
router.post('/changepassword/:id', changePasswordValidation, changePassword)
router.post('/changeusername/:id', changeUsernameValidation, changeUsername)
router.patch('/forgotpassword', forgotPassword)
router.delete('/deleteuser/:id', deleteUser)

//Routes for Recipes 
router.post('/newrecipe', recipeValidation, handleNewRecipe);
router.get('/onerecipe/:id', handleOneRecipe );
router.get('/allrecipes', handleAllRecipes);
router.post('/updaterecipe/:id', handleUpdateRecipe)
router.delete('/deleterecipe/:id', handleDeleteRecipe)
router.post('/category', handleCategory)

module.exports = router;

