//Grab each of these articles as JSON
$.getJSON("/articles", function(data){
    //For each JSON article
    for(var antonio = 0; antonio < data.length; antonio++){
        $("#articles").append("<p data-id = '" + data[antonio]._id + "'>" + data[antonio].title + "<br />" + data[antonio].url + "<p>");
    }

});

//What will happen if we decide to click a p tag
$(document).on("click", "p", function(){
    //Empty all of our notes from the p section
    $("#notes").empty();
    //Save the id from the p tag
    var CurrentID = $(this).attr("data-id");


    //What if we have a note in the article? 
    if(data.note){
        //Title goes in the title section
        $("#titleinput").val(data.note.title);
        //Body goes in the body section
        $("#bodyinput").val(data.note.body);
    }

});