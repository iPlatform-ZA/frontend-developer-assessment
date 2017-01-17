define(["angularAMD"], function(angularAMD) {

    angularAMD
        .controller("mainContainerController", mainContainerController);

    mainContainerController.$inject = ["$scope"];

    function mainContainerController(scope) {
        var vm = this;
        vm.shortList = [];
    };

});