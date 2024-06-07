const {Schema, model} = require('mongoose')

const recipeSchema = new Schema({
    name:{type:String, required: true},
    ingredient:{type:String}
})    

const Recipe = new model('Recipe', recipeSchema)

module.exports = Recipe