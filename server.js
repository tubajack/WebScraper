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

//To log our requests, we should use morgan logger
application.use(logger("dev"));
//Parse the JSON necessary
application.use(express.urlencoded({extended: true}));
application.use(express.json);
application.use(express.static("public"));

//Connect Mongoose
mongoose.connect("mongodb://localhost/WebScraper", {useNewUrlParser: true});

//There are a couple of routes that we are going to need on this project. 

//The first route that we are going to need is a get route. This route is needed to scrape the website. 
//The main packages used are axios and cheerio. 
application.get("/scrape", function(req, res){
    
    //Start with an axios. Axios is used to grab the body of the html. 
    axios.get("https://old.reddit.com/").then(function(response){
        console.log("This is a scrape");

        //Set up the cheerio package. Helps us sort through data retrieved from axios. 
        var $ = cheerio.load(response.data);

        $(".title").each(function(i, element){

            var articles = {};
            articles.title = $(this).text();
            articles.url = $(this).attr("href");

            //Create a new artice based on the results from scraping
            db.Article.create(result)
            .then(function(dbArticle){
                //View the result in the console
                console.log(dbArticle);
            })
            .catch(function(error){
                //Report that there was an error
                console.log(error);
            }); 
            console.log(articles);
        });
        res.send("Scrape is complete");
    });
})

//Start the server. Make sure it is ready to go. 
application.listen(PORT, function(){
    console.log("App is running on port: " + PORT + "!");
})