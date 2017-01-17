define(["angularAMD"], function (angularAMD) {

    angularAMD
        .controller("resultsController", resultsController);

    resultsController.$inject = ["$scope", "appServices"];

    function resultsController(scope, appService) {
        var vm = this;
        vm.shortList = [];

        vm.addToShortList = function(artist) {
            vm.shortList.push(artist);
        };

        $("#btnShortList").bind("click", function() {
           scope.$$childHead.shortListCtrl.showShortList();
        });

    };

});