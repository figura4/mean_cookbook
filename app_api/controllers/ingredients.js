var mongoose = require('mongoose');
var Rec = mongoose.model('Recipe');

var doAddIngredient = function(req, res, recipe) {
  if (!recipe) {
    sendJsonResponse(res, 404, {
      "message": "recipeid not found"
    });
  } else {
    recipe.ingredients.push({
      name: req.body.name,
      measure: req.body.measure,
      quantity: req.body.quantity
    });
    recipe.save(function(err, recipe) {
      var thisIngredient;
        if (err) {
          sendJsonResponse(res, 400, err);
        } else {
          thisIngredient = recipe.ingredients[recipe.ingredients.length - 1];
          sendJsonResponse(res, 201, thisIngredient);
        }
      });
  }
};

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.ingredientsCreate = function (req, res) { 
  var recipeid = req.params.recipeid;
  if (recipeid) {
  Rec
    .findById(recipeid)
    .select('ingredients')
    .exec(
      function(err, recipe) {
        if (err) {
          sendJsonResponse(res, 400, err);
        } else {
          doAddIngredient(req, res, recipe);
        }
      }
    );
  } else {
    sendJsonResponse(res, 404, {
    "message": "Not found, recipeid required"
  });
  }
};


module.exports.ingredientsReadOne = function (req, res) { 
  console.log("Getting single ingredient");
  if (req.params && req.params.recipeid && req.params.ingredientid) {
    Rec
      .findById(req.params.recipeid)
      .select('name ingredients')
      .exec(
        function(err, recipe) {
          console.log(recipe);
          var response, ingredient;
          if (!recipe) {
            sendJsonResponse(res, 404, {
              "message": "recipeid not found"
            });
            return;
          } else if (err) {
            sendJsonResponse(res, 400, err);
            return;
          }
          if (recipe.ingredients && recipe.ingredients.length > 0) {
            ingredient = recipe.ingredients.id(req.params.ingredientid);
            if (!ingredient) {
              sendJsonResponse(res, 404, {
                "message": "ingredientid not found"
              });
            } else {
              response = {
                recipe: {
                  name: recipe.name,
                  id: req.params.recipeid
                },
                ingredient: ingredient
              };
              sendJsonResponse(res, 200, response);
            }
          } else {
            sendJsonResponse(res, 404, {
              "message": "No ingredients found"
            });
          }
        }
    );
  } else {
    sendJsonResponse(res, 404, {
      "message": "Not found, recipeid and locationid are both required"
    });
  }
};

module.exports.ingredientsUpdateOne = function (req, res) { 
  if (!req.params.recipeid || !req.params.ingredientid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, recipeid and ingredientid are both required"
    });
    return;
  }
  Rec
    .findById(req.params.recipeid)
    .select('ingredients')
    .exec(
      function(err, recipe) {
        var thisIngredient;
        if (!recipe) {
          sendJsonResponse(res, 404, {
            "message": "recipeid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        if (recipe.ingredients && recipe.ingredients.length > 0) {
          thisIngredient = recipe.ingredients.id(req.params.ingredientid);
          if (!thisIngredient) {
            sendJsonResponse(res, 404, {
              "message": "ingredientid not found"
            });
          } else {
            thisIngredient.name = req.body.name;
            thisIngredient.measure = req.body.measure;
            thisIngredient.quantity = req.body.quantity;
            recipe.save(function(err, recipe) {
              if (err) {
                sendJsonResponse(res, 404, err);
              } else {
                sendJsonResponse(res, 200, thisIngredient);
              }
            });
          }
        } else {
          sendJsonResponse(res, 404, {
            "message": "No ingredient to update"
          });
        }
      }
  );
};

module.exports.ingredientsDeleteOne = function (req, res) { 
  if (!req.params.recipeid || !req.params.ingredientid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, recipeid and ingredientid are both required"
    });
    return;
  }
  Rec
    .findById(req.params.recipeid)
    .select('ingredients')
    .exec(
      function(err, recipe) {
        if (!recipe) {
          sendJsonResponse(res, 404, {
            "message": "recipeid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        if (recipe.ingredients && recipe.ingredients.length > 0) {
          if (!recipe.ingredients.id(req.params.ingredientid)) {
            sendJsonResponse(res, 404, {
              "message": "recipeid not found"
            });
          } else {
            recipe.ingredients.id(req.params.ingredientid).remove();
            recipe.save(function(err) {
              if (err) {
                sendJsonResponse(res, 404, err);
              } else {
                sendJsonResponse(res, 204, null);
              }
            });
          }
        } else {
          sendJsonResponse(res, 404, {
            "message": "No ingredient to delete"
          });
        }
      }
  );
};
