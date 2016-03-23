var mongoose = require( 'mongoose' );

var ingredientsSchema = new mongoose.Schema({
  name: {type: String, required: true},
  quantity: {type: Number, required: true},
  measure: {type: String, require: true},
});

var recipeSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: false},
  rating: {type: Number},
  tags: [String],
  ingredients: [ingredientsSchema]
});

mongoose.model('Recipe', recipeSchema);