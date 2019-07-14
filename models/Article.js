var mongoose = require("mongoose");

//Reference the Schema constructor. 
//This is fairly similar to sequeize.
var Schema = mongoose.Schema; 

//Create our model from the schema, using the model method provided by mongoose
var Article = mongoose.model("Article", ArticleSchema);

//Export the Article module when finished
module.exports = "Article";