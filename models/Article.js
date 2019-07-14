var mongoose = require("mongoose");

//Reference the Schema constructor. 
//This is fairly similar to sequeize.
var Schema = mongoose.Schema; 

//Create our new UserSchema object. 
var NewArticleSchema = new Schema({
    //There are going to be three components. 
    //2 of them: title and link are of type string
    //The other one, note is an object
    title: {
        type: String, 
        required: true
    },
    link: {
        type: String, 
        required: true
    },
    note: {
        type: Schema.Types.ObjectId, 
        ref: "Note"
    }
});

//Create our model from the schema, using the model method provided by mongoose
var Article = mongoose.model("Article", NewArticleSchema);

//Export the Article module when finished
module.exports = "Article";