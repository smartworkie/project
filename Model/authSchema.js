const {Schema, model} = require('mongoose')

const authRecipeSchema = new Schema({
    username:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
})

const Auth = new model('userRecipe', authRecipeSchema);

module.exports = Auth;