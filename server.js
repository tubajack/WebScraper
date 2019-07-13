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

//There are a couple of routes that we are going to need on this project. 

//The first route that we are going to need is a get route. This route is needed to scrape the website. 
//The main packages used are axios and cheerio. 
application.get("/scrape", function(req, res){
    
    //Start with an axios. Axios is used to grab the body of the html. 
    axios.get("https://old.reddit.com/").then(function(response){

    })
    
    res.json("");
})

//Start the server. Make sure it is ready to go. 
application.listen(PORT, function(){
    console.log("App is running on port: " + PORT + "!");
})