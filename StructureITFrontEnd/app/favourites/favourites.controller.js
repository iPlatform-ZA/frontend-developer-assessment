define(["angularAMD"], function (angularAMD) {

    angularAMD
        .controller("favouritesController", favouritesController);

    favouritesController.$inject = ["$scope"];

    function favouritesController(scope) {
        var vm = this;

    };

});