/// <reference path="../angular.intellisense.js" />
/// <reference path="../xml2json.js" />


var ARTIST_URL = "http://musicbrainz.org/ws/2/artist/?query=artist:"
var RELEASE_URL = "http://musicbrainz.org/ws/2/release/?query=arid:"

//The Module Declaration
var app = angular.module('ngmodule', ['ngStorage']);

//Declaring Service
app.service('ngservice', function ($http) {
    //The function to read artists
    this.getArtists = function (value) {
        var res = $http.get(ARTIST_URL + value);
        return res;
    };

    //The function to read releases
    this.getReleases = function (value) {
        var res = $http.get(RELEASE_URL + value);
        return res;
    };

});

//Declaring the Controller
app.controller('ngcontroller', function ($scope, ngservice, $localStorage) {

    $scope.filterValue = "";
    $scope.artistId = "";
    $scope.Releases = [];

    $scope.storage = $localStorage;

    if ($localStorage.releasefavourites === undefined) {
        $localStorage.releasefavourites = [];
    }
    //Function to load artists
    $scope.getFilteredData = function () {

        $scope.Releases = [];
        $scope.Artists = [];
        var promise = ngservice.getArtists($scope.filterValue);
        promise.then(function (resp) {

            var x2js = new X2JS();
            var aftCnv = x2js.xml_str2json(resp.data);
            
            $scope.Artists = aftCnv.metadata["artist-list"].artist;

        }, function (err) {
            $scope.Message = "Call Failed " + err.status;
        });
    };

    //Function to load releases of an artist
    $scope.getReleases = function (artist) {
        var promise = ngservice.getReleases(artist._id);
        promise.then(function (resp) {

            var x2js = new X2JS();
            var aftCnv = x2js.xml_str2json(resp.data);

            $scope.Releases = aftCnv.metadata["release-list"].release;

        }, function (err) {
            $scope.Message = "Call Failed " + err.status;
        });
    };



    $scope.addToReleaseStorage = function (release) {

        var index = -1;
        for (var i = 0; i < $localStorage.releasefavourites.length; i++)
            if ($localStorage.releasefavourites[i]._id === release._id) {
                index = i;
                break;
            }

        if (index < 0) {
            $localStorage.releasefavourites.push(release);

        }
       
    };

    $scope.removeFromReleaseStorage = function (release) {
        $localStorage.releasefavourites.splice($localStorage.releasefavourites.indexOf(release), 1);

    };

});

