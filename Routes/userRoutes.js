const express = require('express');
const {registerUser, authenticateUser, getOneUser, getAllUsers, changePassword, changeUsername, forgotPassword, deleteUser} = require ('../Controller/authController')
const {handleNewRecipe, handleOneRecipe, handleAllRecipes, 
    handleUpdateRecipe, handleDeleteRecipe, handleCategory, handleFavorite, handleAllFavorites} = require('../Controller/recipeController')

const {registerValidation, loginValidation, changePasswordValidation
    ,changeUsernameValidation} = require('../Middleware/middlewareAuth')
const {recipeValidation, recipeAuthorization} = require('../Middleware/middlewareRecipe')

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
router.post('/newrecipe', recipeValidation, recipeAuthorization, handleNewRecipe);
router.get('/onerecipe/:id', recipeAuthorization, handleOneRecipe );
router.get('/allrecipes',  recipeAuthorization, handleAllRecipes);
router.post('/updaterecipe/:id', recipeAuthorization, handleUpdateRecipe)
router.delete('/deleterecipe/:id', recipeAuthorization, handleDeleteRecipe)
router.post('/category', recipeAuthorization, handleCategory)
router.post('/favorite/:id', recipeAuthorization, handleFavorite)
router.get('/allfavorites', recipeAuthorization, handleAllFavorites)


module.exports = router;

