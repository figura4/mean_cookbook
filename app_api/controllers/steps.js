var mongoose = require('mongoose');
var Rec = mongoose.model('Recipe');

var doAddStep = function(req, res, recipe) {
  if (!recipe) {
    sendJsonResponse(res, 404, {
      "message": "recipeid not found"
    });
  } else {
    recipe.steps.push({
      description: req.body.description,
      order: req.body.order,
    });
    recipe.save(function(err, recipe) {
      var thisStep;
        if (err) {
          sendJsonResponse(res, 400, err);
        } else {
          thisStep = recipe.steps[recipe.steps.length - 1];
          sendJsonResponse(res, 201, thisStep);
        }
      });
  }
};

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.stepsCreate = function (req, res) { 
  var recipeid = req.params.recipeid;
  if (recipeid) {
  Rec
    .findById(recipeid)
    .select('steps')
    .exec(
      function(err, recipe) {
        if (err) {
          sendJsonResponse(res, 400, err);
        } else {
          doAddStep(req, res, recipe);
        }
      }
    );
  } else {
    sendJsonResponse(res, 404, {
    "message": "Not found, recipeid required"
  });
  }
};


module.exports.stepsReadOne = function (req, res) { };
module.exports.stepsUpdateOne = function (req, res) { };
module.exports.stepsDeleteOne = function (req, res) { };
