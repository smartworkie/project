const Recipe = require('../Model/recipeSchema');

const sendEmail = require('../utilities.js')

const handleNewRecipe = async (req, res) => {
    try{
    const {title, ingredients, instructions, author, tag, created_at} = req.body;
    
    const newRecipe = await new Recipe({title, ingredients, instructions, author, tag, created_at})
        await newRecipe.save();
        
    return res.status(200).json({message:newRecipe})
    }

    catch(error) {
        res.status(400).json({message: error.message})
    }
}

const handleOneRecipe = async(req,res)=>{
try{
    const {id} = req.params;
const oneRecipe = await Recipe.findById(id)

res.status(200).json({message: `Here is ${oneRecipe.title}`, oneRecipe})
}
catch(error){
    res.status(200).json({message: error.message})
}

}

const handleAllRecipes = async(req,res) => {
    try{
        const allRecipe = await Recipe.find()

        res.status(200).json({message: "All recipes are here", allRecipe})
    }
    catch(error){
        res.status(200).json({message: error.message})
    }
}

const handleUpdateRecipe = async (req, res) => {
    try{
     const {id} = req.params;
    
     const {title, instructions, ingredients, tag, author, created_at}   = req.body;
     const updateRecipe = await Recipe.findByIdAndUpdate(id, {title,instructions, ingredients, tag, author, created_at}
        , {new:true}
     )

     res.status(200).json({message:"All update has been made", updateRecipe})


    }
    catch(error){
        res.status(200).json({message: error.message})
    }
}

const handleDeleteRecipe = async (req, res) => {
    try{
    const {id} = req.params 
        const deleteRecipe = await Recipe.findByIdAndDelete(id);

        res.status(200).json({message:"Recipe Deleted", deleteRecipe})
    }
    catch(error){
        res.status(200).json({message: error.message})
    }
}

// To categorise Recipe (tags)
const handleCategory = async (req, res) => {
    try{
        const {tag} = req.body
        const category = await Recipe.find({tag})

        res.status(200).json({message: "All the recipes in these categories are ", category})
    }
    catch(error){
        res.status(200).json({message: error.message})
    }
}

module.exports ={handleNewRecipe, handleOneRecipe, handleAllRecipes, handleUpdateRecipe, handleDeleteRecipe, handleCategory}