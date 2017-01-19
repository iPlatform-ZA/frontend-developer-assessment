define(["angularAMD"], function (angularAMD) {

    angularAMD
        .controller("musicBrainzController", musicBrainzController);

    musicBrainzController.$inject = ["$scope"];

    function musicBrainzController(scope) {
        var vm = this;

    };

});