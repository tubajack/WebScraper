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

//This route is going to get all articles from the database
application.get("/articles", function(req, res){
    //Get al of the articles
    db.Article.find({})
    .then(function(dbArticle){
        //If we are able to find articles, report the articles found
        res.json(dbArticle);
    })
    .catch(function(error){
        //If an error happens, let the client know
        res.json(error);
    });
});

//This route is for grabbing a specific article by id
application.get("/articles/:id", function(req, res){
    //Using the id found in the parameter, find the query that matches the one in our db
    db.Article.findOne({_id: req.params.id})
    //populate all associated notes
    .populate("note")
    .then(function(dbArticle){
        //If we successfully found an article, let the client know
        res.json(dbArticle);
    })
    .catch(function(error){
        //Also let the client know if we failed to find any articles
        res.json(error);
    });
});

//This route is for updating an article's associated note
application.post("/articles/:id", function(req, res){
    //First we are going to create a new note. Then we are going to pass req.body to the entry
    db.Note.create(req.body)
    .then(function(dbNote){
        //What we are going to do is if a note was successfully created, find an article with _id related to req.params.id
        //Update the article to be associated with new note. 
        //{new: true}. We want to return the updated user. The original is returned by default 
        //The mongoose query is returning a promise. This means that we are able to chain another .then, which returns the results of the query
        return db.Article.findOneAndUpdate({_id: req.params.id}, {note: dbNote._id}, {new: true})

    })
    .then(function(dbArticle){
        //If we were successful in updating the article, let the client know
        res.json(dbArticle);

    })
    .catch(function(error){
        //If an error happened, let the client know
        res.json(error);

    });
});

//Start the server. Make sure it is ready to go. 
application.listen(PORT, function(){
    console.log("App is running on port: " + PORT + "!");
})