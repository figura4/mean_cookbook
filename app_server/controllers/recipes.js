/* GET 'home' page */
module.exports.homelist = function(req, res){
  res.render('recipe-list', { title: 'Home' });
};

/* GET 'Recipe info' page */
module.exports.recipeInfo = function(req, res){
  res.render('recipe-info', { title: 'Recipe info' });
};

/* GET 'Add ingredient' page */
module.exports.addIngredient = function(req, res){
  res.render('recipe-ingredient-form', { title: 'Add ingredient' });
};