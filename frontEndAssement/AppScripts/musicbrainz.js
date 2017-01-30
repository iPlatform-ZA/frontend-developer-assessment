$(document).ready(function () {
    userName = ''; //clear name
    $('#divinfo').hide(); // by default this is not seen by the user
    $('#divTotal').hide();
    $('.showRelease').click(function (element) {//gets the specific id of the artist row clicked
        var clickedArtist = $(this).attr('id');
        console.log("Clicked artist is " + clickedArtist);
        if (clickedArtist != "undefined") {
            showArtistReleases(clickedArtist);
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
               // parse data to json
               var jsonData = $.xml2json(data);
               console.dir(jsonData);
               extractData(jsonData);//extract data returned from ajax call as json

           });
        }
        else {
            $('#divinfo').show();
            $("#lblerror").text("Please provide artist name");
        }

    });
    $(document).on("click", "#artistTbl td", function (e) {
        var clickedArtist = $(this).attr('id');
        console.log("Clicked artist is " + clickedArtist);

        if (clickedArtist != "undefined") {
            showArtistReleases(clickedArtist);
        }
    });
});

function getArtistInfo(userName) {
    var url = 'http://musicbrainz.org/ws/2/artist/?query=artist:' + userName;
    console.log("Url is " + url);
    return $.ajax({
        type: "GET",
        url: url,
        dataType: "xml"
    });
} //gets artist info through an ajax call
function extractData(response) {
    var objectlength = isEmpty(response);
    console.log("Response is empty : " + objectlength);

    if (!objectlength) {
        if (typeof (response["#document"].metadata["artist-list"].artist) != "undefined") {
            var resultsLength = response["#document"].metadata["artist-list"].artist.length;
            console.log(resultsLength + " returned");
            if (resultsLength > 0) {
                showResults(response, resultsLength);
            }

        }
        else {
            noResultsFound();
        }
    }
    else {
        noResultsFound();
    }

}
function showResults(results, resultsLength) {
    console.dir(results);
    //loop through and retrieve the desired artist data
    for (i = 0; i < resultsLength; i++) {
        currentArtist = results["#document"].metadata["artist-list"].artist[i];
        var Id = currentArtist.name;
        $('#artistTbl').append('<tr><td>' + currentArtist.name + '</td><td id= "' + Id + '"><a href="#">Show Releases</a></td></tr>');

    }
    console.log("Finished loading artists");
    $('#divTotal').show();
    $("#lblTotal").text("Total Results :" + resultsLength);
} // shows results when searching for artists in the musicBrainz DB //extract musicalBrainz artist data

function getArtistReleases(artist) {
    var url = 'http://musicbrainz.org/ws/2/release/?query=release:' + artist;
    console.log("Release Url is " + url);
    return $.ajax({
        type: "GET",
        url: url,
        dataType: "xml"

    });
} //gets artist  release info through an ajax call
function showArtistReleases(clickedArtist) {

    getArtistReleases(clickedArtist) // make an ajaxCall to get artist releases
           .error(function (req, status, errorObj) {
               $('#divinfo').show();
               $("#lblerror").text("Some error occured whilst retrieving data");
           })
           .done(function (data) {
               // parse data to json
               var jsonData = $.xml2json(data);
               console.dir(jsonData);
               extractReleaseData(jsonData);//extract data returned from ajax call as json

           });
} //shows artist releases when button is clicked
function extractReleaseData(response) {
    var objectlength = isEmpty(response); //check if object has keys
    console.log("Response is empty : " + objectlength);
    if (!objectlength) {
        if (typeof (response["#document"].metadata["release-list"].release != "undefined")) {
            var resultsLength = response["#document"].metadata["release-list"].release.length;
            console.log(resultsLength + " returned");
            if (resultsLength > 0) {
                showReleaseResults(response, resultsLength);
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
} //extracts release data of artist // code for showing artist releases
function populateTable(results, count) {
    console.dir(results);
    //loop through and retrieve the desired artist data
    for (i = 0; i < count; i++) {
        var label = '';
        currentRelease = results["#document"].metadata["release-list"].release[i];
        if (typeof (currentRelease["label-info-list"]) == "undefined") { //this is to catch on an error once label-info-list for some releases have not been defined.
            label = "Unknown Label";
        }
        else {
            if (typeof (currentRelease["label-info-list"]["label-info"].label) == "undefined") {
                label = "Unknown Label";
            }
            else {
                label = currentRelease["label-info-list"]["label-info"].label.name;
            }
        }

        $('#releaseTbl').append('<tr><td><span class="glyphicon glyphicon-star"style="color:blue"></span></td><td>' + currentRelease.date + '</td><td>' + currentRelease.title + '</td><td>' + label + '</td><td>' + currentRelease["medium-list"]["track-count"] + '</td></tr>');

    }
    console.log("Finished loading releases");
    $('#divModalTotal').show();
    $("#lblModalTotal").text("Total Results :" + count);
}
function showReleaseResults(dataResponse, resultsCount) {
    $("#releaseModal").modal("show");
    $("#releaseModal").on('show.bs.modal', populateTable(dataResponse, resultsCount));

} // showing artist releases

function noResultsFound() {
    $('#divinfo').show();
    $("#lblerror").text("No results returned by search.");

} // shows that no results were found
function isEmpty(response) {
    return Object.keys(response).length === 0;
} // checks if object has keys // other supporting