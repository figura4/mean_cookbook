var mongoose = require('mongoose');
var Rec = mongoose.model('Recipe');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.recipesCreate = function(req, res) {
  Rec.create({
    name: req.body.name,
    description: req.body.description,
    rating: req.body.rating,
  }, function(err, recipe) {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, recipe);
    }
  });
};

module.exports.recipesReadOne = function (req, res) { 
  if (req.params && req.params.recipeid) {
  Rec
    .findById(req.params.recipeid)
    .exec(function(err, recipe) {
      if (!recipe) {
        sendJsonResponse(res, 404, {
        "message": "recipeid not found"
        });
        return;
      } else if (err) {
        sendJsonResponse(res, 404, err);
        return;
      }
      sendJsonResponse(res, 200, recipe);
    });
  } else {
    sendJsonResponse(res, 404, {
      "message": "No locationid in request"
    });
  }
};

module.exports.recipesUpdateOne = function (req, res) { 
  if (!req.params.recipeid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, recipeid is required"
    });
    return;
  }
  Rec
    .findById(req.params.recipeid)
    .select('-ingredients -rating')
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
        recipe.name = req.body.name;
        recipe.description = req.body.description;
        recipe.rating = req.body.rating;
        recipe.save(function(err, recipe) {
        if (err) {
          sendJsonResponse(res, 404, err);
        } else {
          sendJsonResponse(res, 200, recipe);
        }
      });
    }
  );
};

module.exports.recipesDeleteOne = function (req, res) { 
  var recipeid = req.params.recipeid;
  if (recipeid) {
    Rec
      .findByIdAndRemove(recipeid)
      .exec(
        function(err, recipe) {
          if (err) {
            sendJsonResponse(res, 404, err);
            return;
          }
          sendJsonResponse(res, 204, null);
        }
      );
  } else {
    sendJsonResponse(res, 404, {
      "message": "No recipeid"
    });
  }
};
