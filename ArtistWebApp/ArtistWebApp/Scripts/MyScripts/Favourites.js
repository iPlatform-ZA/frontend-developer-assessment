/// <reference path="../angular.intellisense.js" />


//The Module Declaration
var app = angular.module('ngmodule', ['ngStorage']);


//Declaring the Controller
app.controller('ngcontroller', function ($scope, $localStorage) {

    $scope.storage = $localStorage;
    $scope.Artists = $localStorage.artistfavourites;
    $scope.Releases = $localStorage.releasefavourites;


    if ($localStorage.artistfavourites === undefined) {
        $scope.Artists = [];
    }

    if ($localStorage.releasefavourites === undefined) {
        $scope.Releases = [];
    }

    $scope.removeFromArtistStorage = function (artist) {
        $localStorage.artistfavourites.splice($localStorage.artistfavourites.indexOf(artist), 1);
    };

    $scope.removeFromReleaseStorage = function (release) {
        $localStorage.releasefavourites.splice($localStorage.releasefavourites.indexOf(release), 1);
    };


});

