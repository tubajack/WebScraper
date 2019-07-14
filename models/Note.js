var mongoose = require("mongoose");

//Do not forget to reference the Schema constructor
var Schema = mongoose.Schema;

//Create the newNoteSchema
var NewNoteSchema = new Schema({
    //Title and body are both of type string
    title: String, 
    body: String
});

//Create the model from the schema, using mongoose's model method
var Note = mongoose.model("Note", NewNoteSchema);

//Export the note model when finished
module.exports = Note;