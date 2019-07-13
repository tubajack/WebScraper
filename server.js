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