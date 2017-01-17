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
    "shortListResultDirective"], function (angularAMD) {
        var app = angular.module("MusicApp", []);

        return angularAMD.bootstrap(app);
 });