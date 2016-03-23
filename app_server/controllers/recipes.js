/* GET 'home' page */
module.exports.homelist = function(req, res){
  res.render('recipe-list', { 
    title: 'Mean cookbook - find recipes for you',
    pageHeader: {
      title: 'Mean cookbook',
      strapline: 'find recipes for you'
    },
    recipes: [{
      name: 'Carbonara',
      description: 'pasta alla carbonara',
      rating: 5,
      tags: [
        'primo',
        'pasta',
        'porcello',
      ],
      ingredients: [{
        name: 'pasta',
        measure: 'g',
        quantity: '400'
      }, {
        name: 'porcello',
        measure: 'g',
        quantity: '500'
      }],
    }, {
      name: 'Puttanesca',
      description: 'pasta alla puttanesca',
      rating: 4,
      tags: [
        'primo',
        'pasta',
        'no porcello',
      ],
      ingredients: [{
        name: 'pasta',
        measure: 'g',
        quantity: '300'
      }, {
        name: 'olive',
        measure: 'g',
        quantity: '300'
      }],
    }]
  });
};

/* GET 'Recipe info' page */
module.exports.recipeInfo = function(req, res){
  res.render('recipe-info', {
    title: 'Mean cookbook - Carbonara',
    pageHeader: {
      title: 'Carbonara',
    },
    recipe: {
      name: 'Carbonara',
      description: 'pasta alla carbonara',
      rating: 5,
      tags: [
        'primo',
        'pasta',
        'porcello',
      ],
      ingredients: [{
        name: 'pasta',
        measure: 'g',
        quantity: '400'
      }, {
        name: 'porcello',
        measure: 'g',
        quantity: '500'
      }],
      steps: [
        'butta la pasta',
        'rompi le uova',
        'picchia il porcello'
      ]
    },
  });
};

/* GET 'Add ingredient' page */
module.exports.addIngredient = function(req, res){
  res.render('recipe-ingredient-form', { title: 'Add ingredient' });
};