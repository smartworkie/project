const {Schema, model} = require('mongoose')

const recipeSchema = new Schema({
    title:{type:String, required: true},
    ingredients:{type:String, required: true}, 
    instructions: {type:String, required: true},
    author:{type:String, required: true}, 
    tag: {type:String, required:true},
    created_at: {type:String, required: true}
})    

const Recipe = new model('Recipe', recipeSchema)

module.exports = Recipe