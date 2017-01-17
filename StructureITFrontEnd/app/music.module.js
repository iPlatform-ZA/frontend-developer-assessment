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
    "resultsDirective"], function (angularAMD) {
        var app = angular.module("MusicApp", []);

        return angularAMD.bootstrap(app);
 });