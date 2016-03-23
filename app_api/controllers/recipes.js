var mongoose = require('mongoose');
var Rec = mongoose.model('Recipe');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


module.exports.recipesCreate = function (req, res) { 
  sendJsonResponse(res, 200, {"status" : "success"});
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

module.exports.recipesUpdateOne = function (req, res) { };

module.exports.recipesDeleteOne = function (req, res) { };
