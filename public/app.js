//Grab each of these articles as JSON
$.getJSON("/articles", function(data){
    //For each JSON article
    for(var antonio = 0; antonio < data.length; antonio++){
        $("#articles").append("<p data-id = '" + data[antonio]._id + "'>" + data[antonio].title + "<br />" + data[antonio].link + "<p>");
    }

});