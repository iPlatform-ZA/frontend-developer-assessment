define(["angularAMD"], function (angularAMD) {

    angularAMD
        .controller("shortListResultsController", shortListResultsController);

    shortListResultsController.$inject = ["$scope"];

    function shortListResultsController(scope) {
        var vm = this;
    };

});