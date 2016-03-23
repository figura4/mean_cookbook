var express = require('express');
var router = express.Router();
var ctrlRecipes = require('../controllers/recipes');
var ctrlIngredients = require('../controllers/ingredients');

router.post('/recipes', ctrlRecipes.recipesCreate);
router.get('/recipes/:recipeid', ctrlRecipes.recipesReadOne);
router.put('/recipes/:recipeid', ctrlRecipes.recipesUpdateOne);
router.delete('/recipes/:recipesid', ctrlRecipes.recipesDeleteOne);

router.post('/recipes/:recipeid/ingredients', ctrlIngredients.ingredientsCreate);
router.get('/recipes/:recipeid/ingredients/:ingredientid',
ctrlIngredients.ingredientsReadOne);
router.put('/recipes/:recipeid/ingredients/:ingredientid',
ctrlIngredients.ingredientsUpdateOne);
router.delete('/reviews/:reviewid/ingredients/:ingredientid',
ctrlIngredients.ingredientsDeleteOne);
module.exports = router;