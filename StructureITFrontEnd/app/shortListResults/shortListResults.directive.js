define(["angularAMD"], function (angularAMD) {

    angularAMD
        .directive("shortListResults", shortListResults);

    function shortListResults() {

        var directive = {
            restrict: "E",
            controller: "shortListResultsController",
            controllerAs: "shortListResultsCtrl",
            scope: {
              data:"="  
            },
            bindToController: true,
            templateUrl: "views/shortListResultsView.html",
            link: link
        };

        return directive;

        function link(scope, el, attr, ctrl) {

        };

    };

});