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

    //Make an AJAX call to the ID
    $.ajax({
        method: "GET", 
        url: "/articles/" + CurrentID
    })
        //Add the note information to the page
        .then(function(data){
            console.log(data);
    
        //What if we have a note in the article? 
        if(data.note){
            //Title goes in the title section
            $("#titleinput").val(data.note.title);
            //Body goes in the body section
            $("#bodyinput").val(data.note.body);
        }
    });
});

//Click the save note button
$(document).on("click", "#savenote", function(){
    //Grab the ID associated with the article from the submit button
    var CurrentID = $(this).attr("data-id");

    //Run a POST method. This changes the note entered in the inputs
    $.ajax({
        method: "POST", 
        url: "/articles" + CurrentID, 
        data: {
            //Values taken from the title and body inputs
            title: $("#titleinput").val(), 
            body: $("#bodyinput").val()
        }
    })
    //Once this is done
    .then(function(data){
        //Log the data
        console.log(data);
        //Then empty all of the notes
        ("#notes").empty();
    })

    //Remove the values entered in the note and text arrays when finished
    $("#titleinput").val("");
    $("#bodyinput").val("");
})