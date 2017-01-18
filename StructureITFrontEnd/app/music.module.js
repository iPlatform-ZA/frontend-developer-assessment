define(["angularAMD",
    "angular",
    "bootstrap",
    "jquery",
    "mainContainerController",
    "mainContainerDirective",
    "searchController",
    "searchDirective",
    "appService",
    "resultsController",
    "resultsDirective",
    "shortListController",
    "shortListDirective",
    "shortListResultController",
    "shortListResultDirective",
    "lastfmController",
    "lastfmDirective",
    "favouritesController",
    "favouritesDirective",
    "musicBrainzController",
    "musicBrainzDirective"], function (angularAMD) {
        var app = angular.module("MusicApp", []);

        return angularAMD.bootstrap(app);
 });