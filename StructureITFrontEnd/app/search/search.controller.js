define(["angularAMD"], function (angularAMD) {

    angularAMD
        .controller("searchController", searchController);

    searchController.$inject = ["$scope", "appServices"];

    function searchController(scope, appService) {
        var vm = this;


        $("#btnSearch").bind("click", function() {
            appService.search($("#txtSearch").val()).then(function(response) {
                scope.mainContainerCtrl.data = response.data;
            });
        });
    };

});