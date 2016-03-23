var express = require('express');
var router = express.Router();
var ctrlRecipes = require('../controllers/recipes');

/* Recipes pages */
router.get('/', ctrlRecipes.homelist);
router.get('/recipe', ctrlRecipes.recipeInfo);
router.get('/recipe/ingredient/new', ctrlRecipes.addIngredient);

module.exports = router;
