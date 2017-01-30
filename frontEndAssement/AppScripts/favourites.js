$(document).ready(function () {
    $('#divinfo').hide();
    $('#divTotal').hide();
    $('#divMessage').hide();
    setUpFavourites();// sets up and formats favourites from local storage
    //gets the specific id of the artist row clicked
    $(document).on("click", "#artistTbl td", function (e) {
        var clickedArtist = $(this).attr('id');
        console.log("Clicked artist is " + clickedArtist);

        if (typeof (clickedArtist) != "undefined") {
            removeFromFavourites(clickedArtist);
        }
    });
});
function setUpFavourites() {
    //retrive favourites from local storage
    var currentFavourites = getFavourites();
    //populate favourites into table
    showResults(currentFavourites);
}

function getFavourites() {
    console.log(localStorage.Favourites);
    // Parse any JSON previously stored in allEntries
    var existingEntries = JSON.parse(localStorage.getItem("Favourites"));
    if (existingEntries == null) existingEntries = [];
    console.dir(existingEntries);
    return existingEntries
};

function showResults(results) {
    console.dir(results);
    //loop through and retrieve the desired artist data
    var resultsLength = results.length;
    for (i = 0; i < resultsLength; i++) {
        favouriteArtist = results[i];
        var Id = favouriteArtist.Artistname;
        $('#artistTbl').append('<tr><td id= "' + Id + '"><a href="#"><span class="glyphicon glyphicon-minus-sign"  style="color:red"></span></a></td><td>' + favouriteArtist.Artistname + '</td></tr>');

    }
    console.log("Finished loading artists");
    $('#divTotal').show();;
    $("#lblTotal").text("Total Results :" + resultsLength);
}

function removeFromFavourites(clickedArtist) {

    // Parse any JSON previously stored in Favourites
    var existingEntries = JSON.parse(localStorage.getItem("Favourites"));
    if (existingEntries == null) existingEntries = [];
    var index = -1;
    var obj = JSON.parse(localStorage.getItem("Favourites")) || {}; //fetch artists  from local storage called Favourites
    var items = obj.products || []; //get favourite artists
    for (var i = 0; i < existingEntries.length; i++) { //loop over the collection
        if (existingEntries[i].Artistname === clickedArtist) { //see if names match
            existingEntries.splice(i, 1); //remove item from array
            break; //exit loop
        }
    }
    localStorage.setItem("Favourites", JSON.stringify(existingEntries)); //set item back into storage
    console.log(clickedArtist + " removed from favourites.");
    $('#divMessage').show();;
    $("#lblMessage").text(clickedArtist + " removed to favourites.");
    clearArtistTable();//clear table rows first and prepare for a fresh load
    setUpFavourites();// sets up and formats favourites from local storage
    console.log(localStorage.Favourites);
}

function clearArtistTable() {

    $("#artistTbl").find("tr:not(:first)").remove();

};