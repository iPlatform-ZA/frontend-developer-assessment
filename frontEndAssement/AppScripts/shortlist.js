$(document).ready(function () {
    $('#divinfo').hide();
    $('#divTotal').hide();
    var results = retriveData(); //gets results from local storage
    if (results != null) {
        showResults(results);
    }
    else {
        $('#divinfo').show();
        $("#lblerror").text("No results returned by search.");
    }
});
function showResults(results) {
    console.dir(results);
    var resultsLength = results.results.artistmatches.artist.length;
    //loop through and retrieve the desired artist data
    for (i = 0; i < resultsLength; i++) {
        currentArtist = results.results.artistmatches.artist[i];
        $('#artistTbl').append('<tr><td><span class="glyphicon glyphicon-star"style="color:blue"></span></td><td>' + currentArtist.name + '</td></tr>');
    }
    console.log("Finished loading artists");
    $('#divTotal').show();
    $("#lblTotal").text("Total Results :" + resultsLength);
} // format results and show them in the table
function retriveData() {
    // Retrieve the results from storage
    var retrievedResults = localStorage.getItem('artistResults');
    var retrievedData = JSON.parse(retrievedResults);//pass back to json
    console.log('retrievedResults: ', retrievedData);
    return retrievedData;
}; // retrieve data from the localstorage