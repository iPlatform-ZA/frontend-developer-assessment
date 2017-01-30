$(document).ready(function () {
    userName = ''; //clear name
    $('#divinfo').hide(); // by default this is not seen by the user
    $('#divTotal').hide();
    $('#divMessage').hide();

    //gets the specific id of the artist row clicked
    $(document).on("click", "#artistTbl td", function (e) {
        var clickedArtist = $(this).attr('id');
        console.log("Clicked artist is " + clickedArtist);

        if (clickedArtist != "undefined") {
            addToFavourites(clickedArtist);
        }
    });
    $('#btnsearch').click(function () {
        $('#divinfo').hide();
        userName = $('#artistName').val();
        if (userName != '') { // no need to go and fetch data if no name has been provided
            console.log(userName);
            getArtistInfo(userName)
           .error(function (req, status, errorObj) {
               $('#divinfo').show();
               $("#lblerror").text("Some error occured whilst retrieving data");
           })
           .done(function (data) {
               extractData(data);//extract data returned from ajax call

           });
        }
        else {
            $('#divinfo').show();
            $("#lblerror").text("Please provide artist name");
        }

    });

});

function getArtistInfo(userName) {
    var url = 'http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + userName + '&api_key=759eaf51b7b1b678e7616ef6a95d1ba5&format=json';
    console.log("Url is " + url);
    return $.ajax({
        type: "GET",
        url: url,
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true
    });
} //gets artist info through an ajax call
function extractData(response) {
    var objectlength = isEmpty(response);
    console.log("Response is empty : " + objectlength);
    if (!objectlength) {
        if (typeof (response.results.artistmatches.artist) != "undefined") {
            var resultsLength = response.results.artistmatches.artist.length
            console.log(resultsLength + " returned.");
            if (resultsLength > 0) {
                //save the data to local storage
                saveData(response);
                showResults(response, resultsLength);
            }
            else {
                noResultsFound();
            }

        }
        else {
            noResultsFound();
        }
    }
    else {
        noResultsFound();
    }
}//extracts data from the give response result set
function noResultsFound() {
    $('#divinfo').show();
    $("#lblerror").text("No results returned by search.");

} // shows that no results were found
function isEmpty(response) {
    return Object.keys(response).length === 0;
} // checks if object has keys
function showResults(results, resultsLength) {
    console.dir(results);
    //loop through and retrieve the desired artist data
    for (i = 0; i < resultsLength; i++) {
        currentArtist = results.results.artistmatches.artist[i];
        var Id = currentArtist.name;
        $('#artistTbl').append('<tr><td> <img src="' + currentArtist.image["0"]["#text"] + '"/></td><td>' + currentArtist.name + '</td><td  id= "' + Id + '"><a href="#"><span class="glyphicon glyphicon-plus-sign" style="color:green"></span></a></td></tr>');
    }
    console.log("Finished loading artists");
    $("#lblTotal").text("Total Results :" + resultsLength);
    $('#divTotal').show();
} //displays data on table
function saveData(results) {
    // Put the results into storage
    localStorage.setItem('artistResults', JSON.stringify(results));
    console.log("Saved to local storage");
}; // saves data to local storage
function addToFavourites(clickedArtist) {
    if (clickedArtist == undefined)
    { return; } // no need to save meaningless data
    // Parse any JSON previously stored in Favourites
    var existingEntries = JSON.parse(localStorage.getItem("Favourites"));
    if (existingEntries == null) existingEntries = [];
    var favouriteArtist = {
        "Artistname": clickedArtist

    };
    localStorage.setItem("entry", JSON.stringify(favouriteArtist));
    // Save allEntries back to local storage
    existingEntries.push(favouriteArtist);
    localStorage.setItem("Favourites", JSON.stringify(existingEntries));
    console.log(clickedArtist + " added to favourites");
    $('#divMessage').show();;
    $("#lblMessage").text(clickedArtist + " added to favourites.");
} //add artists to favourites 