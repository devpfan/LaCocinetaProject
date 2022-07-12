require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

/**  
*GET/
*homepage
 */
exports.homepage = async(req,res)=> {
    try {
        
        const limitNumber =5;
        const categories =await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
        const col = await Recipe.find({'category':'Colombiana'}).limit(limitNumber);
        const chinese = await Recipe.find({'category':'China'}).limit(limitNumber);
        const arab= await Recipe.find({'category':'Arabe'}).limit(limitNumber);
        
        const food = {latest, col, chinese, arab};

        res.render('index',{ title:'La Cocineta Project', categories, food});
    }   catch (error) {
        res.status(500).send({message: error.message||"Hubo un error"});  
    }
}


/**  
*GET/ categorias
*categories
 */
exports.exploreCategories = async(req,res)=> {
    try {
        //const limitNumber =20;
        //const categories =await Category.find({}).limit(limitNumber);
        const categories =await Category.find({});//con esto traigo todas las categorias
        res.render('categories',{ title:'La Cocineta Project - Categorias', categories});
    }   catch (error) {
        res.status(500).send({message: error.message||"Hubo un error"});  
    }
}


/**  
*GET/ categorias/:id
*categorias por id
 */
exports.exploreCategoriesById = async(req,res)=> {
    try {
        let categoryId = req.params.id;
        const limitNumber = 20;
        const categoryById = await Recipe.find({'category': categoryId}).limit(limitNumber);
        res.render('categories',{ title:'La Cocineta Project - Categorias', categoryById});
    }   catch (error) {
        res.status(500).send({message: error.message||"Hubo un error"});  
    }
}

/*GET/recipe/:id
*recetas
 */
exports.exploreRecipe = async(req,res)=> {
    try {
        
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
        res.render('recipe',{ title:'La Cocineta Project - Recetas', recipe});
    }   catch (error) {
        res.status(500).send({message: error.message||"Hubo un error"});  
    }
}

/**  
*POST / Busqueda
*Recipe
 */
exports.searchRecipe = async(req,res)=> {
    try {
       let searchTerm = req.body.searchTerm;
       let recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true}});
       res.render('search',{ title:'La Cocineta Project - Busqueda', recipe});
    }catch (error) {
        res.status(500).send({message: error.message||"Hubo un error"});  
    }
}

/*GET/ultimas
*explorar ultimas
 */
exports.exploreLatest = async(req,res)=> {
    try {
        
        const limitNumber =20;
        const recipe = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
        res.render('explore-latest',{ title:'La Cocineta Project - Ultimas recetas', recipe});
    }   catch (error) {
        res.status(500).send({message: error.message||"Hubo un error"});  
    }
}

/*GET/Aleatoria
*explorar random
 */
exports.exploreRandom = async(req,res)=> {
    try {
        
       let count = await Recipe.find().countDocuments();
       let random = Math.floor(Math.random() * count);
       let recipe = await Recipe.findOne().skip(random).exec();  
       res.render('explore-random',{ title:'La Cocineta Project - Ultimas recetas', recipe});
    }  catch (error) {
       res.status(500).send({message: error.message||"Hubo un error"});  
    }
}



/*GET/subir
*subir receta
 */
exports.submitRecipe= async(req,res)=> {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
res.render('submit-recipe',{ title:'La Cocineta Project - Subir receta', infoErrorsObj, infoSubmitObj});

}

/*POST/subir
*subir receta
 */
exports.submitRecipeOnPost= async(req,res)=> {
    try{
        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files||Object.keys(req.files).length === 0){
         console.log('No se subio ninguna imagen');
        }else{
            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;

            uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

            imageUploadFile.mv(uploadPath, function(err){
                if(err) return res.status(500).send(err);
            })
        }

const newRecipe = new Recipe({
    
    name: req.body.name,
    description: req.body.description,
    email: req.body.email,
    ingredients: req.body.ingredients,
    category: req.body.category,
    image: newImageName
});

    await newRecipe.save();

        req.flash('infoSubmit', 'Receta subida correctamente');
        res.redirect('/submit-recipe');
    }   catch(error){
        //res.json(error);
        req.flash('infoErrors', error);
        res.redirect('/submit-recipe');
    }
}  


//Contacto
exports.exploreContact = async(req,res)=>{
    try{
        res.render('contact', {title:'La Cocineta Project -  Acerca de'});
    }catch(error){
        res.status(500).send({message: error.mesage || "Hubo un error"});
    }
}



//acerca de

exports.exploreAbout = async(req,res)=> {
    try {
        res.render('about',{ title:'La Cocineta Project - Acerca de'});
    }catch (error) {
        res.status(500).send({message: error.message||"Hubo un error"});
     }
}





//Update - en construccion
async function updateRecipe(){
 try {
    const res = await Recipe.updateOne({name: 'receta nueva de prueba'},{name: 'Nueva receta actualizada'});
    res.n;
    res.nModified;
 } catch (error) {
    console.log(error);
 }

}

//delete - en construccion
async function deleteRecipe(){
    try {
       await Recipe.deleteOne({name: 'receta nueva de prueba'});
      } catch (error) {
       console.log(error);
    }
   
   }


/*
async function insertarRecetaTemporal(){

    try {
        await Recipe.insertMany([
            {
                "name": "Cayeye",
                "description":`Firstly, peel the green bananas and put them in a pot with water and salt, cook the green bananas. Let them cook until they are tender, and while hot, mash them with a fork until you have a fine and smooth texture.
                Then, In a frying pan over medium heat, heat the oil. Put the onions and the garlic, and cook for 2 minutes.  Put the salt and the pepper, cover and reserve.
                After that, Add the butter to the mashed banana and half of the “costeño” cheese; mix well.
                Next, In a saucepan, heat the mash with the sauté over low heat (reserving 4 tablespoons to add on top of the cayeye when serving).
                Finally, to serve put the cayeye on the plates, on top of each one you add a tablespoon of the sauté, one of whey and grated cheese. You can also include some scramble eggs or one or two slices of cheese to accompany it.
                `,
                "email": "elasanchez27@gmail.com",
                "ingredients":["Green bananas (6)","Butter(2 tbsp)","oil (1 tbsp)","finely chopped red onion (1 cup)","finely chopped long onion (1 cup)","cloves of garlic finely chopped (3)","Salt and pepper (to taste)"],
                "category": "Arabe",
                "image": "cayeye.jpg"
            }

        ]);
    }catch (error){
        console.log('err', +error)
    }}
    
    insertarRecetaTemporal();

*/

/*
async function insertDymmyCategoryData(){

    try {
        await Category.insertMany([

            {
                "name": "Thai",
                "image": "thai-food.jpg"
            },

            {
                "name": "Española",
                "image": "spanish-food.jpg"
            },

            {
                "name": "China",
                "image": "chinese-food.jpg"
            },

            {
                "name": "Arabe",
                "image": "arab-food.jpg"
            },

            {
                "name": "Indú",
                "image": "indian-food.jpg"
            },

            {
                "name": "Mexicana",
                "image": "mexican-food.jpg"
            }

        ]);
    } catch (error) {
        console.log('Err'+error)
        
    }

}

insertDymmyCategoryData();
*/