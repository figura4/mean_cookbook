var express = require('express');
var router = express.Router();
var ctrlRecipes = require('../controllers/recipes');
var ctrlIngredients = require('../controllers/ingredients');
var ctrlSteps = require('../controllers/steps');

/* recipes */
router.post('/recipes', ctrlRecipes.recipesCreate);
router.get('/recipes/:recipeid', ctrlRecipes.recipesReadOne);
router.put('/recipes/:recipeid', ctrlRecipes.recipesUpdateOne);
router.delete('/recipes/:recipeid', ctrlRecipes.recipesDeleteOne);

/* ingredients */
router.post('/recipes/:recipeid/ingredients', ctrlIngredients.ingredientsCreate);
router.get('/recipes/:recipeid/ingredients/:ingredientid', ctrlIngredients.ingredientsReadOne);
router.put('/recipes/:recipeid/ingredients/:ingredientid', ctrlIngredients.ingredientsUpdateOne);
router.delete('/recipes/:recipeid/ingredients/:ingredientid', ctrlIngredients.ingredientsDeleteOne);


/* steps */
router.post('/recipes/:recipeid/steps', ctrlSteps.stepsCreate);
router.get('/recipes/:recipeid/steps/:stepsid', ctrlSteps.stepsReadOne);
router.put('/recipes/:recipeid/steps/:stepsid', ctrlSteps.stepsUpdateOne);
router.delete('/reviews/:reviewid/steps/:stepsid', ctrlSteps.stepsDeleteOne);

module.exports = router;