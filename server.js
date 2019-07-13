var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

//Make sure we require all of the models 
var db = require("./models");

//Set up the express application 
var application = express();
var PORT = process.env.PORT || 3000;

//Connect Mongoose
mongoose.connect("mongodb://localhost/WebScraper", {useNewUrlParser: true});

//Start the server. Make sure it is ready to go. 
application.listen(PORT, function(){
    console.log("App is running on port: " + PORT + "!");
})