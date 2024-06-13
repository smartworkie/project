const recipeValidation = async(req, res, next) => {
 
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
module.exports = recipeValidation;