/// <reference path="../angular.intellisense.js" />

var BASE_URL = "http://ws.audioscrobbler.com/2.0/?api_key=be5e616c3738d4e8e896b2b4defa2a69&format=json";

//The Module Declaration
var app = angular.module('ngmodule', ['ngStorage']);

//Declaring Service
app.service('ngservice', function ($http) {
    //Gets the lists of  matching artists from last.fm
    this.getArtists = function (value) {
        var res = $http.get(BASE_URL + '&method=artist.search&artist=' + value);
        return res;
    };

});

//Declaring the Controller
app.controller('ngcontroller', function ($scope, ngservice, $localStorage) {
    $scope.filterValue = ""; //The object used to read value entered into textbox for filtering information from table
    $scope.artistId = "";
    $scope.ArtistsB = [];
    $scope.storage = $localStorage;

    if ($localStorage.artistfavourites === undefined) {
        $localStorage.artistfavourites = [];
    }

    $scope.moveToListFavourite = function (artist) {
        $scope.ArtistsB.push(artist);
        $scope.Artists.splice($scope.Artists.indexOf(artist), 1);
    };
    $scope.moveToListArtist = function (artist) {
        $scope.Artists.push(artist);
        $scope.ArtistsB.splice($scope.ArtistsB.indexOf(artist), 1);
    };


    //Function to load artists
    $scope.getFilteredData = function () {
        var promise = ngservice.getArtists($scope.filterValue);
        promise.then(function (resp) {
            $scope.Artists = resp.data.results.artistmatches.artist;

        }, function (err) {
            $scope.Message = "Call Failed " + err.status;
        });
    };


    $scope.addToArtistStorage = function (artist) {

        var index = -1;
        for (var i = 0; i < $localStorage.artistfavourites.length; i++)
            if ($localStorage.artistfavourites[i].mbid === artist.mbid)
            {
                index = i;
                break;
            }

        if (index < 0)
        {
            $localStorage.artistfavourites.push(artist);
        }

    };

    $scope.removeFromArtistStorage = function (artist) {

        $localStorage.artistfavourites.splice($localStorage.artistfavourites.indexOf(artist), 1);
    };

});

