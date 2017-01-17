define(["angularAMD"], function (angularAMD) {

    angularAMD
        .controller("shortListController", shortListController);

    shortListController.$inject = ["$scope"];

    function shortListController(scope) {
        var vm = this;

        vm.showShortList = function() {
            $("#shortListModal").modal("show");
        }  
    };

});