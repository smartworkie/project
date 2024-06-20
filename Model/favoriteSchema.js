const {Schema, model} = require('mongoose')

const favoriteSchema = new Schema({
    
    favorite:{type:[], required:true}
})

const Favorite = new model('favoriteRecipe', favoriteSchema);

module.exports = Favorite;